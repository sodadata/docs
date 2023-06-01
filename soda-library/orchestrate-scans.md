---
layout: default
title: Configure orchestrated scans
description: Integrate Soda Library with a data orchestration tool to automate and schedule your search for "bad" data.
parent: Soda Library
redirect_from:
- /soda-core/scans-pipeline.html
- /soda-core/orchestrate-scans.html
---

# Configure orchestrated scans 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Integrate Soda Library with a data orchestration tool such as, Airflow, to automate and schedule your search for bad-quality data. 

Configure actions that the orchestration tool can take based on scan output. For example, if the output of a scan reveals a large number of failed tests, the orchestration tool can automatically block "bad" data from contaminating your data pipeline.

Consider following the [Test data in a pipeline]({% link soda/quick-start-prod.md %}) guide for specific details about embedding Soda tests in an Airflow pipeline.

[Apache Airflow using PythonOperator](#apache-airflow-using-pythonoperator)<br />
&nbsp;&nbsp;&nbsp;&nbsp; [Example DAG](#example-dag)<br />
<br />

<!--
## Apache Airflow using BashOperator

Access a guide published by <a href="https://www.astronomer.io/" target="_blank">Astronomer</a> for setting up and using <a href="https://www.astronomer.io/guides/soda-data-quality/" target="_blank">Soda Core with Airflow</a>. -->

## Apache Airflow using PythonOperator
{% include code-header.html %}
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
```

Also, configure the following.
{% include code-header.html %}
```python
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

#### Example DAG
{% include code-header.html %}
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
    description='A simple Soda Library scan DAG',
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


<!--
## Soda Core and Prefect

A contribution from our Soda Community, read the documentation for the <a href="https://sodadata.github.io/prefect-soda-core/" target="_blank">Prefect 2.0 collection for Soda Core</a>.
-->

## Go further

* Learn more about the [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}) you can use to check for data quality.
* Learn how to prepare [programmatic scans]({% link soda-library/programmatic.md %}) of your data.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}