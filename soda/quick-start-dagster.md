---
layout: default
title: Test data quality in a Dagster pipeline.
description: Use this guide as an example of how to invoke Soda data quality tests in a Dagster pipeline.
parent: Use case guides
---

# Test data quality in a Dagster pipeline
*Last modified on {% last_modified_at %}*

Use this guide as an example for how to use Soda to test for data quality in an ETL pipeline in Dagster. 

![dagster-flow](/assets/images/dagster-flow.png){:height="700px" width="700px"}

[About this guide](#about-this-guide)<br />
[Prerequisites](#prerequisites)<br />
[Create a Soda Cloud account](#create-a-soda-cloud-account)<br />

[Go further](#go-further)<br />
<br />

## About this guide

The instructions below offers an example of how to execute several Soda Checks Language (SodaCL) checks for data quality at multiple points within a Dagster pipeline.

For context, the example follows a fictional organization that operates several bicyle retail stores in different regions. As a result, the Data Analysts at the company are struggling with their sales forecasts and reporting dashboards. The company has tasked the Data Engineering team to automate the ETL pipeline that uses Dagster and dbt to orchestrate the ingestion and transformation of data before exporting it for use by Data Analysts in their business intelligence tools. 

The pipeline automates a flow which:
1. Tests data before ingestion: Uploaded from various stores into S3, the Data Engineers run Soda data quality checks *before* copying the data to a Redshift data source. To do so, they use Soda Library to load the files into DataFrames, then and run a Soda scan for data quality to catch any issues with incomplete, missing, or invalid data early in the pipeline. For any Soda checks that fail, the team routes failed row samples, which contain sensitive data, back to their own S3 bucket to use to investigate dat quality issues.
2. Loads data: After addressing any data quality issues in the retail data in S3, they load the data into Redshift.
3. Transforms data in staging: Using dbt, the Data Engineers build the models in a staging environment which transform the data for efficient use by the Data Analysts.
4. Tests transformed data: In a Soda Cloud staging environment, Data Analysts can prepare no-code checks for data quality based on their knowledge of the reports and dashboards that the data feeds. The Data Engineers use the Soda Cloud API to execute remote Soda scans for data quality that include the checks the Data Analysts defined. 
5. Transforms data in production: After addressing any data quality issues after transformation in staing, the Data Engineers can build the dbt models in the production environment.
6. Exports data quality results: The Data Engineers use the Soda Cloud API to load the data quality results into Redshift.

As a final step, outside the Dagster pipeline, the Data Engineeris integrate Soda with Slack to set up notifications that alert the team when new data quality issues occu. They also link to Tableau for Data Analyst reporting, and with Atlan to offer their colleagues at-a-glance data quality status of datasets in the data catalog.


## Prerequisites

The Data Engineers in this example uses the following:
* Python 3.8, 3.9, or 3.10
* Pip 21.0 or greater
* dbt-core and the required database adapter (dbt-redshift)
* a Dagster account
* access permission and connection crednetials and details for Amazon Redshift  
* access permission and connection crednetials and details for an Amazon S3 bucket
* access to a Tableau account
* access and permission to integrate Slack
* access to an Atlan catalog


## Install dbt, Dagster, and Soda Library

Though listed as prerequisites, the following instructions include details for installing and initializing dbt-cre and Dagster.

1. From the command-line, a Data Engineer installs dbt-core and the required database adapter for Redshift, and initializes a dbt project directory. Consult <a href="https://docs.getdbt.com/docs/core/pip-install" target="_blank">dbt documentation</a> for details.
    ```shell
    pip install \
      dbt-core \
      dbt-redshift \

    cd project-directory
    dbt init project-name
    ```
2. In the same directory that contains the `dbt_project.yml`, they install and initialize the Dagster project inside the dbt project. Consult the Dagster <a href="https://docs.dagster.io/getting-started/install#installing-dagster-into-an-existing-python-environment" target="_blank">install</a> and <a href="https://docs.dagster.io/getting-started/create-new-project" target="_blank">new project<a/> documentation for details.
    ```shell
    cd project-name
    pip install dagster-dbt dagster-webserver dagster-aws
    dagster-dbt project scaffold --project-name my-dagster-project
    cd my-dagster-project
    ```
3. Lastly, they install the Soda Library packages they need to run data quality scans in both Redshift and on data in DataFrames using Dask and Pandas.
    ```shell
    pip install -i https://pypi.cloud.soda.io soda-redshift
    pip install -i https://pypi.cloud.soda.io soda-pandas-dask
    ```
4. They a file in the `~/.dbt/` directory named `profiles.yml`, then add the following configuration to use dbt with Dagster. Consult the <a href="https://docs.dagster.io/integrations/dbt/using-dbt-with-dagster-plus" target="_balnk">Dagster documentation</a>.
    ```yaml
    project-name: bike_retail
      target: dev
      outputs:
        dev:
          host: # DB host
          method: database 
          port: 5439
          schema: demo # schema name
          threads: 2 # threads in the concurrency of dbt tasks
          type: redshift # DB source connection
          dbname: # the target db name 
          user: # username
          password: # password
    ```
5. Lastly, they make sure that Dagster can read the dbt project directories in `project.py`.
    ```python
    from pathlib import Path
    from dagster_dbt import DbtProject

    dbt_project = DbtProject(
        project_dir=Path(__file__).joinpath("..", "..", "..").resolve(),
        packaged_project_dir=Path(__file__).joinpath("..", "..", "dbt-project").resolve(),
    )
    dbt_project.prepare_if_dev()
    ```

## Create and connect a Soda Cloud account

To validate an account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library.

1. In a browser, a Data Engineer navigates to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account, which is free for a 45-day trial. 
2. They navigate to **your avatar** > **Profile**, access the **API keys** tab, then click the plus icon to generate new API keys. 
3. They create a new file called `configuration.yml` in the same directory in which they installed the Soda Library packages, then copy+paste the API key values into the file according to the following configuration. This config enables Soda Library to connect to Soda Cloud via API.
```yaml
soda_cloud:
  # For host, use cloud.us.soda.io for US regions; use cloud.soda.io for European region
  host: cloud.soda.io 
  api_key_id: 5r-xxxx-t6
  api_key_secret: Lvv8-xxx-xxx-sd0m
```

<details>
    <summary style="color:#00BC7E">No Redshift connection details in configuration.yml?</summary>
    Normally, when connecting Soda Library to a data source so it can run data quality scans, you must configure data source connection details in a <code>configuration.yml</code> file, as instructed in <a href="https://docs.soda.io/soda/connect-redshift.html" target="_blank">Soda documentation</a>. <br /> <br />

    However, in this example, because the Data Engineers need only use Soda Library to programmatically run scans on data loaded as DataFrames from S3, it is not necessary to provide the connection config details. See: <a href="https://docs.soda.io/soda/connect-dask.html" target="_blank">Connect Soda to Dask and Pandas</a>. <br /> <br />
    
    Later in this example, when the Data Engineers run Soda scans remotely, they do so via calls to Soda Cloud API endpoints. Soda Cloud is configured to connect to the Redshift data source and Soda executes the scan via the Soda-hosted Agent included out-of-the-box with the Soda Cloud account. Learn more about the <a href="https://docs.soda.io/soda/setup-guide.html" target="_blank">flavors of Soda</a>.

</details>


## Set up Soda

To empower their Data Analyst colleagues to write their own no-code checks for data quality, a Data Engineer volunteers to set up Soda to:
* connect to the Redshift data source that will contain the ingested data
* discover the datasets and make them accessible by others in the Soda Cloud user interface
* create check attributes to keep data quality check results organized

1. Logged in to Soda Cloud, the Data Engineer, who, as the initiator of the Soda Cloud account for the organization is automatically the Soda Admin, decides to use the  out-of-the-box Soda-hosted agent made available for every Soda Cloud organization to securely connect to their Redshift data source.  
2. The Data Engineer follows the guided workflow to [Add a new data source]({% link soda-agent/managed-agent.md %}#add-a-new-data-source) to the Soda Cloud account to connect to their Redshift data source, making sure to include all dataset during [discovery]({% link soda-agent/managed-agent.md %}#3-discover), and exclude datasets from [profiling]({% link soda-agent/managed-agent.md %}#4-profile) to avoid exposing any customer information in the Soda Cloud UI.
3. Lastly, they follow the instructions to create [check attributes]({% link soda-cl/check-attributes.md %}), which serve to label and sort check results by department, priority, location, etc. 


## Write pre-ingestion checks for data quality

Before the Data Engineer loads the existing retail data from S3 to Redshift, they prepare several data quality tests using the Soda Checks Language (SodaCL), a YAML-based, domain-specific language for data reliability. Read more: [SodaCL reference]({% link soda-cl/metrics-and-checks.md %})<br />

After creating a new `checks.yaml` file in the same directory in which they installed the Soda Library packages, the Data Engineer consults with their colleagues and defines the following checks for four datasets -- stores, stocks, customers, and orders -- being sure to add attributes to each to keep the check results organized.

{% include code-header.html %}
```yaml
checks for stores:
  - row_count > 0:
      name: Invalid row count
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Completeness
        data_domain: Location
        weight: 3
  - missing_count(store_id) = 0:
      name: Store must have ID
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Completeness
        data_domain: Location
        weight: 2
  - invalid_count(email) = 0:
      valid format: email
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Validity
        data_domain: Location
        weight: 1
  - invalid_count(phone) = 0:
      valid format: phone number
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Validity
        data_domain: Location
        weight: 1

checks for stocks:
  - row_count > 0:
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Completeness
        data_domain: Product
        weight: 3
  - values in (store_id) must exist in stores (store_id):
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Consistency
        data_domain: Product
        weight: 2
  - values in (product_id) must exist in products (product_id):
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Consistency
        data_domain: Product
        weight: 2
  - min(quantity) >= 0:
      name: No negative quantities
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Validity
        data_domain: Product
        weight: 2

checks for customers:
  - missing_count(phone) < 5% :
      name: Missing phone number
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Completeness
        data_domain: Product
        weight: 1
  - missing_count(email) < 5% :
      name: Missing email address
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Completeness
        data_domain: Product
        weight: 1
  - invalid_count(email) = 0:
      valid format: email
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Validity
        data_domain: Location
        weight: 1
  - invalid_count(phone) = 0:
      valid format: phone number
      attributes:
        pipeline_stage: Pre-ingestion
        data_quality_dimension:
          - Validity
        data_domain: Location
        weight: 1

checks for orders:
    - failed rows:
        name: Shipment Late
        fail query: |
            select order_id as failed_orders
            from orders
            where shipped_date < required_date;
        attributes:
            pipeline_stage: Pre-ingestion
            data_quality_dimension:
            - Timeliness
            data_domain: Transaction
            weight: 3
```

## Prepare pre-ingestion checks

In the assets.py file, the DE can begin defining the first assets under the @asset decorator.
They start with an ingestion check to load the S3 data into dataframes, and run the checks on them before they are loaded onto Redshift. Since they are dealing with sensitive customer info, the DE opted to use Soda’s custom sampler in order to send the failed records back to S3 instead of the Soda Cloud. This can all be done using the Soda Library programmatically. The DE will use the just created config.yml with the API keys and the checks.yml with all the SodaCL to execute the scans.


## Load data into Redshift and define staging transformations


## Write post-transformation checks for data quality

Invite Data Analyst colleagues to write no-code checks...


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}