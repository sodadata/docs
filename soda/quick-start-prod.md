---
layout: default
title: Test data quality in a data pipeline
description: Follow this guide to set up and run scheduled Soda scans for data quality in your Airflow data pipeline.
parent: Get started
---

# Test data quality in a data pipeline
*Last modified on {% last_modified_at %}*

Use this guide to install and set up Soda to test the quality of your data in your Airflow pipeline. Automatically catch data quality issues after ingestion or transformation and get alerts about issues and prevent negative downstream impact.

1. Learn the basics of Soda in [two minutes](#soda-basics).
2. [Get context](#about-this-guide) for this guide.
3. [Install Soda from the command-line](#install-soda-from-the-command-line).
4. [Connect Soda](#connect-soda-to-a-data-source-and-a-platform-account) to your data source and platform account.
5. [Write checks](#write-checks-for-data-quality) for data quality.
6. Configure [Airflow Operator](#configure-airflow-operator-in-the-right-places) in the right places.
7. Set up [Slack integration and notification rules](#set-up-slack-integration-and-notification-rules).
8. Run your Airflow pipeline and [examine scan results](#run-your-airflow-pipeline-and-examine-scan-results).
<br />


## Soda basics

{% include about-soda.md %}

## About this guide

The instructions below offer Data Engineers an example of how to execute SodaCL checks for data quality on data in an <a href="https://airflow.apache.org/" target="_blank">Apache Airflow</a> pipeline after ingestion and transformation. 

For context, the example assumes that you use Airflow for scheduling and monitoring workflows for your data, including data ingestion and transformation events. After such events, you can schedule Soda scans for data quality to run, then push results to the Soda platform. 

Where the scan results indicate an issue with data quality, Soda notifies the team via a notification in Slack so that they can potentially stop the pipeline and investigate and address any issues before the issue causes problems further down the pipeline.

Borrow from this guide to connect to your own data source, set up scan points in your pipeline, and execute your own relevant tests for data quality.

(Not quite ready for this big gulp of Soda? 🥤Try [taking a sip]({% link soda/quick-start-sip.md %}), first.)

## Install Soda from the command-line

{% include quick-start-install.md %}


## Connect Soda to your data source and platform account

To connect to a data source such as Snowflake, PostgreSQL, Amazon Athena, or GCP Big Query, you use a `configuration.yml` file which stores access details for your data source. 

This guide also instructs you to connect to a Soda platform account using API keys that you create and add to the same `configuration.yml` file. Available for free as a 45-day trial, your Soda platform account gives you access to visualized scan results, tracks trends in data quality over time, enables you to set alert notifications, and much more.

1. In the directory in which you work with your pipeline, create a directory to contain your Soda configuration and check YAML files.
2. In your new directory, create a new file called `configuration.yml`. 
3. Something about safely storing credential values.
4. Open the `configuration.yml` file in a code editor, then copy and paste the data source connection configuration for the [data source]({% link soda/connect-athena.md %}) that you use. The example below is the connection configuration for a Snowflake data source.
```yaml
data_source my_datasource_name:
  type: snowflake
  connection:
    username: ${SNOWFLAKE_USER}
    password: ${SNOWFLAKE_PASS}
    account: plu449.us-west-1
    database: sodadata_test
    warehouse: compute_wh
    role: analyst
    session_parameters:
      QUERY_TAG: soda-queries
      QUOTED_IDENTIFIERS_IGNORE_CASE: false
  schema: public
```
5. Next, add the following configuration that connects Soda to your new platform account, leaving the values blank for a moment. Be sure to add the syntax for `soda_cloud` at the root level of the YAML file, *not* nested under the `data_source` syntax.
```yaml
soda_cloud:
  host: cloud.soda.io
  api_key_id:
  api_key_secret:
```
6. In a browser, navigate to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account. If you already have a Soda account, log in. 
7. In your new account, navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys.
  * Copy the **API Key ID**, then paste it into the `configuration.yml` as the value for `api_key_id`.
  * Copy the **API Key Secret**, then paste it into the `configuration.yml` as the value for `api_key_secret`.
8. Save the `configuration.yml` file and close the API modal in your Soda account.
9. In Terminal, run the following command to test Soda's connection to your data source, replacing the value of `my_datasource_name` with your own value.<br />
```shell
soda test-connection -d my_datasource_name -c configuration.yml
```

## Write checks for data quality

A check is a test that Soda executes when it scans a dataset in your data source. The `checks.yml` file stores the checks you write using the [Soda Checks Language (SodaCL)]({% link soda-cl/soda-cl-overview.md %}). You can create multiple `checks.yml` files to organize your data quality checks and run all, or some of them, at scan time.

Learn more about [SodaCL]({% link soda/quick-start-sodacl.md %}).

* Ingestion: In general I would suggest after ingestion - schema, freshness, reference, not null, format, duplicate - this is in approximate order of importance from most to least important. Row count check is useful if there is any reasonable range or threshold available
* Transform: after transformation - this highly depends on what the transformation is - if tables are being joined, then not null on the joined tables could make sense. Format would generally not be that important since it has already been checked and whatever new is created is under control of the transformation, but it could still be used to verify if some sort of complicated formatting transformation is in place. Row count can be very useful, e.g. if aggregation happens then row count per group would make sense. Then it goes into more domain specific checks, where I would imagine a user defined check, but this is highly dependent on the use case, the data

## Configure Airflow Operator in the right places

1. Configure Airflow PythonOperator.
```python
class SodaScanOperator(PythonOperator):
    def __init__(self,
                 task_id: str,
                 dag: DAG,
                 data_sources: list,
                 soda_cl_path: str,
                 variables: dict = None,
                 airflow_variables: list = None,
                 airflow_variables_json: list = None,
                 soda_cloud_api_key: Optional[str] = None,
                 soda_cloud_api_key_var_name: Optional[str] = None):
        if variables is None:
            variables = {}
        if isinstance(airflow_variables, list):
            for airflow_variable in airflow_variables:
                variables[airflow_variable] = Variable.get(airflow_variable)
        if isinstance(airflow_variables_json, list):
            for airflow_variable in airflow_variables_json:
                variables[airflow_variable] = Variable.get(airflow_variable, deserialize_json=True)
        if not soda_cloud_api_key and soda_cloud_api_key_var_name:
            soda_cloud_api_key = Variable.get(soda_cloud_api_key_var_name)
        super().__init__(
            task_id=task_id,
            python_callable=SodaAirflow.scan,
            op_kwargs={
                'scan_name': f'{dag.dag_id}.{task_id}',
                'data_sources': data_sources,
                'soda_cl_path': soda_cl_path,
                'variables': variables,
                'soda_cloud_api_key': soda_cloud_api_key
            },
            dag=dag
        )
class SodaAirflow:

    @staticmethod
    def scan(datasource_name,
             data_sources: list,
             soda_cl_path: str,
             schedule_name: Optional[str] = None,
             variables: dict = None,
             soda_cloud_api_key: str = None):
        scan = Scan()
        scan.set_data_source_name('')
        if data_sources:
            for data_source_details in data_sources:
                data_source_properties = data_source_details.copy()
                data_source_name = data_source_properties.pop('data_source_name')
                airflow_conn_id = data_source_properties.pop('airflow_conn_id')
                connection = Variable.get(f'conn.{airflow_conn_id}')
                scan.add_environment_provided_data_source_connection(
                    connection=connection,
                    data_source_name=data_source_name,
                    data_source_properties=data_source_properties
                )
        scan.add_sodacl_yaml_files(soda_cl_path)
        scan.add_variables(variables)
        scan.add_soda_cloud_api_key(soda_cloud_api_key)
        scan.execute()
        scan.assert_no_error_logs()
        scan.assert_no_checks_fail()
```
2. Create your Airflow DAG. <br />
```python
        from airflow import DAG
        from airflow.models.variable import Variable
        from airflow.operators.python import PythonVirtualenvOperator
        from airflow.operators.dummy import DummyOperator
        from airflow.utils.dates import days_ago
        from datetime import timedelta
        import os
        from airflow.exceptions import AirflowFailException
default_args = {
    'owner': 'soda_core',
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}
def run_soda_scan():
    from soda.scan import Scan
    print("Running Soda Scan ...")
    config_file = "/Users/path-to-your-config-file/configuration.yml"
    checks_file = "/Users/path-to-your-checks-file/checks.yml"
    data_source = "srcdb"
    scan = Scan()
    scan.set_verbose()
    scan.add_configuration_yaml_file(config_file)
    scan.set_data_source_name(data_source)
    scan.add_sodacl_yaml_files(checks_file)
    scan.execute()
    print(scan.get_logs_text())
    if scan.has_check_fails():
         raise ValueError(f"Soda Scan failed with errors!")
    else:
        print("Soda scan successful")
        return 0
dag = DAG(
    'soda_core_python_venv_op',
    default_args=default_args,
    description='A simple Soda Core scan DAG',
    schedule_interval=timedelta(days=1),
    start_date=days_ago(1),
)
ingest_data_op = DummyOperator(
    task_id='ingest_data'
)
soda_core_scan_op = PythonVirtualenvOperator(
    task_id='soda_core_scan_demodata',
    python_callable=run_soda_scan,
    requirements=["soda-core-postgres==3.0.0b9"],
    system_site_packages=False,
    dag=dag
)
publish_data_op = DummyOperator(
    task_id='publish_data'
)
ingest_data_op >> soda_core_scan_op >> publish_data_op
```
3. ...

## Set up Slack integration and notification rules

{% include quick-start-notifs.md %}

## Run your Airflow pipeline and examine scan results

1. ...
2. ...
3. Access your Slack workspace, then navigate to the channel to which you directed Soda to send fail notifications in the **Notification Rule** you created. Notice the alert notification of the check that purposely failed during the Soda scan. <br />
![slack-alert](/assets/images/slack-alert.png){:width="500px"}
4. Navigate to your Soda platform account, then click **Checks** to access the **Check Results** page. The results from the scan that Soda performed during the GitHub Action job appear in the results table where you can click each line item to learn more about the results...  <br />
![gh-actions-check-results](/assets/images/gh-actions-check-results.png){:width="700px"}
...including, for some types of checks, samples of failed rows to help in your investigation of a data quality issue.
![gh-failed-rows](/assets/images/gh-failed-rows.png){:width="700px"}


✨Well done!✨ You've taken the first step towards a future in which you and your colleagues can prevent data quality issues from having downstream impact. Huzzah!


## Now what?
<div class="docs-html-content">
    <section class="docs-section" style="padding-top:0">
        <div class="docs-section-row">
            <div class="docs-grid-3cols">
                <div>
                    <img src="/assets/images/icons/icon-pacman@2x.png" width="54" height="40">
                    <h2>Experiment</h2>
                    <a href="/soda/quick-start-sodacl.html">SodaCL tutorial</a>                    
                    <a href="/soda-cl/metrics-and-checks.html">Study metrics and checks</a>
                    <a href="/soda-cl/user-defined.md">Write custom SQL checks</a>
                    <a href="/soda-cl/compare.html">Compare data</a>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-new@2x.png" width="54" height="40">
                    <h2>Sip more Soda</h2>
                    <a href="/soda/integrate-webhooks.html" target="_blank">Integrate with your tools</a>
                    <a href="/soda-cl/check-attributes.html">Add check attributes</a>
                    <a href="/soda-cloud/failed-rows.html">Examine failed row samples</a>
                    <a href="/api-docs/reporting-api-v1.html">Report on data health</a>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-dev-tools@2x.png" width="54" height="40">
                    <h2>Choose your adventure</h2>
                    <a href="/soda/quick-start-dev.html">Test data during development</a>
                    <a href="/soda/quick-start-end-user.html">Enable end-user testing</a>
                    <a href="/soda/integrate-alation.html">Integrate with Alation</a>
                </div>
            </div>
        </div>
    </section>
</div>



## Need help?

* <a href="https://www.soda.io/schedule-a-demo" target="_blank">Request a demo</a>. Hey, what can Soda do for you?
* Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}