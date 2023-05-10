---
layout: default
title: Test data quality in a data pipeline
description: Follow this guide to set up and run scheduled Soda scans for data quality in your Airflow data pipeline.
parent: Get started
---

# Test data quality in a data pipeline
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use this guide to install and set up Soda to test the quality of your data in your Airflow pipeline. Automatically catch data quality issues after ingestion or transformation and get alerts about issues and prevent negative downstream impact.

**[01](#soda-basics)** Learn the basics of Soda<br />
**[02](#about-this-guide)** Get context for this guide<br />
**[03](#install-soda-from-the-command-line)** Install Soda from the command-line<br />
**[04](#connect-soda-to-a-data-source-and-platform-account)** Connect Soda to a data source and platform account<br />
**[05](#write-checks-for-data-quality)** Write checks for data quality<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[a](#transformation-checks)** Transformation checks<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[b](#ingestion-checks)** Ingestion checks<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[c](#pre-load-checks)** Pre-load checks<br />
**[06](#run-a-scan)** Run a scan locally<br />
**[07](#set-up-slack-integration-and-notification-rules)** Set up Slack integration and notification rules<br />
**[08](#create-an-airflow-dag)** Create an Airflow DAG <br />
**[09](#run-your-airflow-pipeline-and-examine-scan-results)** Run the pipeline and examine th results <br />
<br />


## Soda basics

{% include about-soda.md %}

## About this guide

The instructions below offer Data Engineers an example of how to execute SodaCL checks for data quality on data in an <a href="https://airflow.apache.org/" target="_blank">Apache Airflow</a> pipeline. 

For context, this guide presents an example of a Data Engineer at a small firm who was tasked with building a simple products report of sales by category for <a href="/assets/adventureworks_schema.png" target="_blank">AdventureWorks data</a>. This Engineer uses <a href="https://www.getdbt.com/" target="_blank">dbt</a> to build a simple model transformation to gather data, then models to push gathered information to a reporting and visualization tool. The Engineer uses Airflow for scheduling and monitoring workflows, including data ingestion and transformation events. 

The Engineer's goal in this example is to make sure that after such events, and before pushing information into a reporting tool, they run scans to check the quality of the data.  Where the scan results indicate an issue with data quality, Soda notifies the Engineer via a notification in Slack so that they can potentially stop the pipeline and investigate and address any issues before the issue causes problems in the report.

Borrow from this guide to connect to your own data source, set up scan points in your pipeline, and execute your own relevant tests for data quality.

(Not quite ready for this big gulp of Soda? 🥤Try [taking a sip]({% link soda/quick-start-sip.md %}), first.)

## Install Soda from the command-line

With Python 3.8 installed, the Engineer creates a virtual environment in Terminal, then installs the Soda package for PostgreSQL using the following command.

{% include code-header.html %}
```shell
pip install soda-core-postgres
```

Refer to [complete install instructions]({% link soda-core/installation.md %}) for all supported data sources, if you wish.

## Connect Soda to a data source and platform account

To connect to a data source such as Snowflake, PostgreSQL, Amazon Athena, or Big Query, you use a `configuration.yml` file which stores access details for your data source. 

This guide also includes instructions for how to connect to a Soda platform account using API keys that you create and add to the same `configuration.yml` file. Available for free as a 45-day trial, a Soda platform account gives you access to visualized scan results, tracks trends in data quality over time, enables you to set alert notifications, and much more.

1. In the directory in which they work with their dbt models, the Data Engineer creates a `soda` directory to contain the Soda configuration and check YAML files.
2. In the new directory, they create a new file called `configuration.yml`. 
3. In the `configuration.yml` file, they add the data source connection configuration for the PostgreSQL data source that contains the AdventureWorks data. The example below is the connection configuration for a PostgreSQL data source. See a complete list of supported [data sources]({% link soda/connect-athena.md %}).
```yaml
data_source adventureworks:
  type: postgres
  connection:
    host: localhost
    username: postgres
    password: secret
  database: postgres
  schema: public
```
5. Next, they add the following configuration that connects Soda to their new platform account, leaving the values blank for a moment. The syntax for `soda_cloud` must be at the root level of the YAML file, *not* nested under the `data_source` syntax.
```yaml
soda_cloud:
  host: 
  api_key_id:
  api_key_secret:
```
6. In a browser, they navigate to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a free, 45-day trial Soda account.  
7. In the new account, they navigate to **avatar** > **Profile**, then access the **API keys** tab and click the plus icon to generate new API keys.
  * Copy the **API Key ID**, then paste it into the `configuration.yml` as the value for `api_key_id`.
  * Copy the **API Key Secret**, then paste it into the `configuration.yml` as the value for `api_key_secret`.
  * Enter the value for `host` according to the region the Soda platform account uses: `cloud.soda.io` for EU region; `cloud.us.soda.io` for USA region.
8. They save the `configuration.yml` file and close the API modal in the Soda account.
9. In Terminal, they run the following command to test Soda's connection to the data source.<br />
```shell
soda test-connection -d adventureworks -c configuration.yml
```

## Write checks for data quality

A check is a test that Soda executes when it scans a dataset in your data source. The `checks.yml` file stores the checks you write using the [Soda Checks Language (SodaCL)]({% link soda-cl/soda-cl-overview.md %}). You can create multiple `checks.yml` files to organize your data quality checks and run all, or some of them, at scan time. 

In this example, the Data Engineer creates multiple checks after ingestion, after transformation, and before pushing the information to a visualization and reporting tool.

### Transformation checks

After building a simple dbt model transformation that creates a new fact table which gathers data about products, product categories, and subcategories [dbt/models/category/fact_product_category.sql], the Engineer realizes that some of the products in the dataset do not have an assigned category or subcategory, which means those values would not be included in the report. To mitigate the issue and get a warning when these values are missing, they write the following checks on the `fact_product_category` dataset that the transformation produced.

fact_product_category.yml
{% include code-header.html %}
```yaml
checks for fact_product_category:
  # Check warns when any NULL values exist in the column
  - missing_count(category_key): 
      name: All products have a category
      warn: when > 0
  # Check warns when any NULL values exist in the column
  - missing_count(subcategory_key): 
      name: All products have a subcategory
      warn: when > 0
  # Check warns when any NULL values exist in the column
  - missing_count(product_key) = 0:
      name: All products have a key
```


### Ingestion checks

Because the Enginner does not have the ability to fix upstream data, they also write checks to apply to each dataset they use in the transformation, *after* the data is ingested, but before transforming.

dim_product.yml
{% include code-header.html %}
```yaml
checks for dim_product:
  # Check fails when product_key or english_product_name is missing, OR
  # when the data type of those columns is other than specified
  - schema:
      fail:
        when required column missing: [product_key, english_product_name]
        when wrong column type:
          product_key: integer
          english_product_name: varchar
  # Check fails when any NULL values exist in the column
  - missing_count(product_key) = 0:
      name: All products have a key
  # Check fails when any NULL values exist in the column
  - missing_count(english_product_name) = 0:
      name: All products have a name
  # Check fails when any NULL values exist in the column
  - missing_count(product_subcategory_key):
      name: All products have a subcategory
      warn: when > 0     
  # Check fails when the number of products, relative to the
  # previous scan, changes by 10 or more
  # Requires a Soda platform account
  - change for row_count < 10:
      name: Products are stable
```

dim_product_category.yml
{% include code-header.html %}
```yaml
checks for dim_product_category:
  # Check fails when product_category_key or english_product_category name 
  # is missing, OR
  # when the data type of those columns is other than specified
  - schema:
      fail:
        when required column missing:
          [product_category_key, english_product_category_name]
        when wrong column type:
          product_category_key: integer
          english_product_category_name: varchar
  # Check fails when any NULL values exist in the column
  - missing_count(product_category_key) = 0:
      name: All categories have a key
  # Check fails when any NULL values exist in the column
  - missing_count(english_product_category_name) = 0:
      name: All categories have a name
  # Check fails when the number of categories, relative to the
  # previous scan, changes by 5 or more
  # Requires a Soda platform account
  - change for row_count < 5:
      name: Categories are stable
```

dim_product_subcategory.yml
{% include code-header.html %}
```yaml
checks for dim_product_subcategory:
  # Check fails when product_subcategory_key or english_product_subcategory_name 
  # is missing, OR
  # when the data type of those columns is other than specified
  - schema:
      fail:
        when required column missing:
          [product_subcategory_key, english_product_subcategory_name]
        when wrong column type:
          product_subcategory_key: integer
          english_product_subcategory_name: varchar
  # Check fails when any NULL values exist in the column
  - missing_count(product_subcategory_key) = 0:
      name: All subcategories have a key
  # Check fails when any NULL values exist in the column
  - missing_count(english_product_subcategory_name) = 0:
      name: All subcategories have a name
  # Check fails when the number of categories, relative to the
  # previous scan, changes by 5 or more
  # Requires Soda platform account
  - change for row_count < 5:
      name: Subcategories are stable
```

fact_internet_sales.yml
{% include code-header.html %}
```yaml
checks for fact_internet_sales:
  # Check fails when product_key, order_quantity, or sales_amount 
  # is missing, OR
  # when the data type of those columns is other than specified
  - schema:
      fail:
        when required column missing:
          [product_key, order_quantity, sales_amount]
        when wrong column type:
          product_key: integer
          order_quantity: smallint
          sales_amount: money
  # Check fails when any NULL values exist in the column
  - missing_count(product_key) = 0:
      name: All sales have a product associated
  # Check fails when any order contains no items 
  - min(order_quantity) > 0:
      name: All sales have a non-zero order quantity
  # Check fails when the amount of any sales order is zero
  - failed rows:
      name: All sales have a non-zero order amount
      fail query: |
        SELECT sales_order_number, sales_amount::NUMERIC
          FROM fact_internet_sales
        WHERE sales_amount::NUMERIC <= 0
  # Check warns when there are fewer than 5 new internet sales 
  # relative to the previous scan resuls
  # Check fails when there are more than 500 new internet sales
  # relative to the previous scan resuls
  # Requires Soda platform account
  - change for row_count:
      warn: when < 5 
      fail: when > 500 
      name: Sales are within expected range
  # Check fails when the average of the column is abnormal
  # relative to previous measurements for average sales amount
  # Requires Soda platform account
  # sales_amount is cast from data type MONEY to enable calculation
  - anomaly score for avg(sales_amount::NUMERIC) < default
```


## Pre-load checks

The Engineer then builds category and subcategory sales report models and queries using dbt. [dbt/models/category/report_category_sales.sql] and [dbt/models/category/report_subcategory_sales.sql] The checks files they create to run on the new models contain similiar user-defined checks. Ultimately, the Engineer wants data quality checks to fail if the sales of uncategorized products rises above normal (0.85%), and if the sum of sales orders in the model that prepares the report differs greatly from the sum of raw sales order number.


soda/checks/report/report_category_sales.yml
{% include code-header.html %}
```yaml
checks for report_category_sales:
  # Check fails if the percentage of sales of products with no 
  # catgory exceeds 0.90%
  - uncategorized_sales_percent < 0.9:
      uncategorized_sales_percent query: >
        select ROUND(CAST((sales_total * 100) / (select sum(sales_total) from report_category_sales) AS numeric), 2) as uncategorized_sales_percent from report_category_sales where category_key is NULL
      name: Most sales are categorized
  # Check fails if the sum of sales produced by the model is different
  # than the sum of sales in the fact_internet_sales dataset
  - sales_diff = 0:
      name: Category sales total matches
      sales_diff query: >
        SELECT CAST((SELECT SUM(fact_internet_sales.sales_amount) FROM fact_internet_sales)
        - (SELECT SUM(report_category_sales.sales_total) FROM report_category_sales) as numeric) AS sales_diff
```
 
soda/checks/report/report_subcategory_sales.yml
{% include code-header.html %}
```yaml
checks for report_subcategory_sales:
  # Check fails if the percentage of sales of products with no 
  # subcategory exceeds 0.90%
  - uncategorized_sales_percent < 0.9:
      uncategorized_sales_percent query: >
        select ROUND(CAST((sales_total * 100) / (select sum(sales_total) from report_subcategory_sales) AS numeric), 2) as uncategorized_sales_percent from report_subcategory_sales where category_key is NULL OR subcategory_key is NULL
      name: Most sales are categorized
  # Check fails if the sum of sales produced by the model is different
  # than the sum of sales in the fact_internet_sales dataset
  - sales_diff = 0:
      name: Subcategory sales total matches
      sales_diff query: >
        SELECT CAST((SELECT SUM(fact_internet_sales.sales_amount) FROM fact_internet_sales)
        - (SELECT SUM(report_subcategory_sales.sales_total) FROM report_subcategory_sales) as numeric) AS sales_diff
```


## Run a scan

Then they run a local scan of the data to validate that the check yield expected results.
{% include code-header.html %}
```shell
soda scan -d adventureworks -c configuration.yml fact_product_category.yml dim_product.yml dim_product_category.yml dim_product_subcategory.yml fact_internet_sales.yml report_category_sales.yml report_subcategory_sales.yml
```



## Set up Slack integration, notification rules, and tags

Use this integration to enable Soda to send alert notifications to a Slack channel to notify your team of warn and fail check results. If your team does not use Slack, you can skip this step and Soda sends alert notifications via email.

1. As an [Admin]({% link soda-cloud/roles-and-rights.md %}), login to your Soda platform account and navigate to **your avatar** > **Organization Settings**, then navigate to the **Integrations** tab and click the **+** icon to add a new integration.
2. Follow the guided steps to authorize Soda to connect to your Slack workspace. If necessary, contact your organization's Slack Administrator to approve the integration with Soda. 
* **Configuration** tab: select the public channels to which Soda can post messages; Soda cannot post to private channels.
* **Scope** tab: select the Soda features, both alert notifications and incidents, which can access the Slack integration. 
3. To dictate where Soda should send alert notifications for checks that fail, create a new notification rule. Navigate to **your avatar** > **Notification Rules**, then click **New Notification Rule**. Follow the guided steps to complete the new rule directly Soda to send check results that fail to a specific channel in your Slack workspace.

Learn more about [Integrating with Slack]({% link soda/integrate-slack.md %}).<br />
Learn more about [Setting notification rules]({% link soda-cloud/notif-rules.md %}).

## Create an Airflow DAG

1. Configure an Airflow PythonOperator.
2. Create your Airflow DAG. 


## Run your Airflow pipeline and examine scan results

1. ...
2. ...
3. Access your Slack workspace, then navigate to the channel to which you directed Soda to send fail notifications in the **Notification Rule** you created. Notice the alert notification of the check that purposely failed during the Soda scan. <br />
![slack-alert](/assets/images/slack-alert.png){:width="500px"}
4. Navigate to your Soda platform account, then click **Checks** to access the **Check Results** page. The results from the scan that Soda performed during the GitHub Action job appear in the results table where you can click each line item to learn more about the results...  <br />
![gh-actions-check-results](/assets/images/gh-actions-check-results.png){:width="700px"}
...including, for some types of checks, samples of failed rows to help in your investigation of a data quality issue.
![gh-failed-rows](/assets/images/quick-sip-failed-rows.png){:width="700px"}


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