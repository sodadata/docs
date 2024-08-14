---
layout: default
title: Test data quality in a Databricks workflow
description: Use this guide to invoke Soda data quality tests in a Databricks workflow.
parent: Use case guides
---

# Test data quality in a Databricks workflow
*Last modified on {% last_modified_at %}*

Use this guide as an example for how to set up and use Soda to test the quality of data in a Databricks workflow. Automatically catch data quality issues after ingestion or transformation, and before using the data to train a machine learning model to prevent negative downstream impact.


Flow:
Datasource: unity catalog + DBFS(Databricks File System) 
Soda check after ingestion 
ETL transformation  
Soda check after transformation and before training ML model
Train ML model 
Export soda metadata 
DQ dashboard  



## About this guide

The instructions below offer Data Scientists an example of how to execute Soda Checks Language (SodaCL) checks for data quality within a Databricks pipeline that handles data which trains a machine learning (ML) model.

For context, this guide demonstrates a Data Scientist working with Human Resources data to build a prediction or forecast model for employee attrition. The Data Scientist uses a Databricks notebook to gather data from SQL-accessible dataset, transforms the data into the correct format for their ML model, then uses the data to train the model.

Though they do not have direct access to the data to be able to resolve inssues themselves, the Data Scientist can use Soda to detect data quality issues before the data model trains on poor-quality data. The pipeline the Data Scientst creates includes various SodaCL checks embedded at different stages in the pipeline, such as after data ingestion and after data transformation. At the end of the process, the pipeline stores the checks' metadata in a Databricks table which feeds into a data quality dashboard. The Data Scientist utilizes Databricks workflows to schedule this process on a daily basis.

## Prerequisites

The Data Scientist in this example uses the following:
* Python 3.8, 3.9, or 3.10
* Pip 21.0 or greater
* a Databricks account 
* access to a Unity catalog


## Create a Soda Cloud account

To validate an account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library. <a href="https://docs.soda.io/soda/about.html">Learn more</a>

1. In a browser, the Data Scientist navigates to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account, which is free for a 45-day trial. 
2. They navigate to **your avatar** > **Profile**, then access the **API keys** tab, then click the plus icon to generate new API keys. 
3. They copy+paste the API key values to a temporary, secure place in their local environment.

## Connect Soda Cloud to Soda Library and data source

1. Within Databricks, the Data Scientist creates two notebooks:
* Data Ingestion Checks, which runs scans for data quality after data is ingested into a Unity catalog 
* Input Data Checks, which prepares data for training a machine learning model and runs data quality scans before submitting to the model for training
2. To connect Soda to the Unity catalog, the Data Scientist prepares a `soda_conf.yml` file which stores data source connection details. In the same directory as the Databricks notebooks, the Data Scientist creates a `soda_settings` directory to contain the Soda configuration and check YAML files that Soda needs to run scans. 
3. In the new directory, they create a new file called `soda_conf.yml`. To the file, they add the data source connection configuration to the Unity catalog that contains the Human Resources data the Data Scientist uses, then they save the file. 
{% include code-header.html %}
```yaml
data_source employee_info:
 type: spark
 method: databricks
 catalog: unity_catalog
 schema: employees 
 host:  hostname_from_Databricks_SQL_settings
 http_path: http_path_from_Databricks_SQL_settings
 token: my_access_token
```

<br />

Read more: [Use Soda Library with Spark DataFrames on Databricks]({% link soda/connect-spark.md %}#use-soda-library-with-spark-dataframes-on-databricks)<br />
Read more: [How Soda works]({% link soda-library/how-library-works.md %})  <br />

## Write checks for data quality

A check is a test that Soda executes when it scans a dataset in your data source. The `checks.yml` file stores the checks you write using the Soda Checks Language. You can create multiple checks files to organize your data quality checks and run all, or some of them, at scan time.

In this example, the Data Scientist creates two checks files, one to execute quality checks after data ingestion into the Unity catalog in the Data Ingestion Checks notebook, and another to execute quality checks after transformation, and before using it to train their ML model in the Input Data Checks notebook. 

The raw data in this example is divided into two main categories. 
* The first category is Human Resources data, which the Unity catalog contains in three datasets: basic employee information, results of manager surveys, and results of employee surveys. The survey datasets are updated on a monthly basis. 
* The second category is application login data that is updated daily.

Read more: [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %})

### Post-ingestion checks

The Data Scientist create a checks YAML file to write checks that apply to each dataset they use in the transformation process. The pipeline exectues these checks after the data is ingested, but before it is transformed. For any checks that fail, the Data Scientiest can notify upstream Data Engineers or Data Product Owners to address issues such as missing categories and subcategories.

Many of the checks that the Data Scientist prepares include [check attribtues]({% link soda-cl/check-attributes.md %}) which they created in Soda Cloud. When added to checks, the Data Scientist can use the attributes to filter check results in Soda Cloud, build custom views (Collections), and stay organized as they monitor data quality in the Soda Cloud UI. 

The Data Scientist also added a [dataset filter]({% link soda-cl/filters.md %}#configure-dataset-filters) to the quality checks that apply to the application login data. The filter serves to partition the data against which Soda executes the checks; instead of checking for quality on the entire dataset, the filter limits the scan to the previous day's data.

ingestion_checks.yml
{% include code-header.html %}
```yaml
checks for employee_info:
 - invalid_count(Department) = 0:
     valid values: ['Sales', 'Research & Development', 'Human Resources']
     name: Only correct departments are present in the dataset
     attributes:
       dimension: [Validity]
       pipeline_stage: Ingest
       team: Data Engineering
 - missing_count(EmployeID) = 0:
     name: No null values in the Employee ID column
     attributes:
       dimension: [Completeness]
       pipeline_stage: Ingest
       team: Data Engineering
 - duplicate_count(EmployeeID) = 0:
     name: No duplicate IDs
     attributes:
       dimension: [Uniqueness]
       pipeline_stage: Ingest
       team: Data Engineering
 - invalid_count(Gender) = 0:
     valid values: ['Female', 'Male', 'Non-binary']
     name: Value for gender is valid
     attributes:
       dimension: [Validity]
       pipeline_stage: Ingest
       team: Data Engineering
 - invalid_count(Age) = 0:
     valid min: 18
     name: All employees are over 18
     attributes:
       dimension: [Validity]
       pipeline_stage: Ingest
       team: Data Engineering
 - failed rows:
     name: Monthly Salary equals or exceeds legally required salary
     fail condition: MonthlyIncome < 11000
 - schema:
     warn:
       when schema changes: any
     name: Columns have not been added, removed, or changed
     attributes:
       dimension: [Consistency]
       pipeline_stage: Ingest
       team: Data Engineering


checks for employee_survey:
 - invalid_count(EnvironmentSatisfaction) = 0:
     valid min: 1
     valid max: 5
     name: Values are formatted are in range 1-5
     attributes:
       dimension: [Validity]
       pipeline_stage: Ingest
       team: Data Engineering
 - duplicate_count(EmployeeID) = 0:
     name: No duplicate IDs
     attributes:
       dimension: [Uniqueness]
       pipeline_stage: Ingest
       team: Data Engineering
 - invalid_count(WorkLifeBalance) = 0:
     valid min: 1
     valid max: 5
     name: Values are formatted are in range 1-5
     attributes:
       dimension: [Validity]
       pipeline_stage: Ingest
       team: Data Engineering
 - schema:
     warn:
       when schema changes: any
     name: Columns have not been added, removed, or changed
 - values in EmployeeID must exist in employee_info EmployeeID:
    name: EmployeeID Integrity Check for employee survey


checks for manager_survey:
 - invalid_count(PerformanceRating) = 0:
     valid min: 1
     valid max: 5
     name: Values are formatted are in range 1-5
     attributes:
       dimension: [Validity]
       pipeline_stage: Ingest
       team: Data Engineering
 - schema:
     warn:
       when schema changes: any
     name: Columns have not been added, removed, or changed
     attributes:
       dimension: [Consistency]
       pipeline_stage: Ingest
       team: Data Engineering
 - values in EmployeeID must exist in employee_info EmployeeID:
    name: EmployeeID integrity check for manager survey

# Add a filter to partition data included in quality scan
# because the data in the dataset lags by one day 
filter login_logout [daily]:
  where: LogoutTime < CAST(current_date() AS TIMESTAMP) - INTERVAL 1 DAY AND LoginTime > CAST(current_date() AS TIMESTAMP) - INTERVAL 2 DAY

checks for login_logout [daily]:
 - invalid_count(LoginTime):
     valid regex: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+-]\\\
       d{2}:\\d{2})$"
     name: Login time format
     fail: when > 0
     attributes:
       dimension: [Validity]
       pipeline_stage: Ingest
       team: Data Engineering
 - values in EmployeeID must exist in employee_info EmployeeID:
    name: EmployeeID Integrity Check for login times
 - freshness(LogoutTime) < 2d:
     name: Data is updated
     attributes:
       dimension: [Timeliness]
       pipeline_stage: Ingest
       team: Data Engineering
```

## Post-transformation checks

The Data Scientists also prepared a second set of SodaCL checks in a separate file to run after transformation in the Input Data Checks notebook.

Two of the checks the Data Scientist prepares involve checking groups of data.  The [group evolution check]({% link soda-cl/group-evolution.md %}) validates the presence or absence of a group in a dataset, or to check for changes to groups in a dataset relative to their previous state; in this case, it confirms the presence of the `Married` group in the data, and when any group changes. Further, the [group by check]({% link soda-cl/group-by.md %}) collects and presents check results by category; in this case, it groups the results according to `JobLevel`.


input_data_checks.yml
{% include code-header.html %}
```yaml
filter input_data_attrition_model [daily]:
  where: PartitionDate < CAST(current_date() AS TIMESTAMP) - INTERVAL 1 DAY AND PartitionDate > CAST(current_date() AS TIMESTAMP) - INTERVAL 2 DAY


checks for input_data_attrition_model [daily]:
 - missing_count(Attrition)=0::
     name: Target value is not missing
     attributes:
       pipeline: Transform
       team: Data Science
       dimension: [Completeness]
 - invalid_percent(TotalWorkingYears):
     valid min: 0
     name: Working years can't be negatve
     warn: when > 0%
     fail: when > 10%
     attributes:
       pipeline: Transform
       team: Data Science
       attibute: [Validity]
 - values in EmployeeID must exist in employee_info EmployeeID:
    name: EmployeeID Integrity Check
 - failed rows:
     name: Overtime detected
     fail query: |
       SELECT *
       FROM input_data_attrition_model
       WHERE WorkingMinutes > 750
     attributes:
       pipeline: Transform
       team: Data Science
 - freshness(PartitionDate) < 2d:
     name: Data is fresh
     attributes:
       pipeline: Transform
       team: Data Science
       dimension: [Timeliness]
 - group evolution:
     name: Marital status
     query: |
       SELECT MaritalStatus FROM input_data_attrition_model GROUP BY 1
     fail:
       when required group missing: [Married]
     warn:
       when groups change: any
     attributes:
       pipeline: Transform
       team: Data Science
       dimension: [Consistency]
 - group by:
     query: |
       SELECT JobLevel, min(MonthlyIncome) AS salary
       FROM input_data_attrition_model
       GROUP BY 1
     fields:
       - JobLevel
     checks:
       - salary:
           warn: when < 0
           fail: when < -1
           name: Min Salary Normalised cannot be below -1
           attributes:
             pipeline: Transform
             team: Data Science
             dimension: [Accuracy]
```

## Invoke Soda in Databricks notebooks

Once the ingestion checks are evaluated and pass, the Data Scientist combines all the clean data to prepare it for model training which includes enforcing data types, standardization, and one-hot encoding. 
Once the notebook runs successfully, it populates the input table for the next step: training the model. Applying data checks at this stage is crucial to ensure that there are no surprises during the training process. An example of checks after transformation looks like the following:




2. Within each notebook, dds two lines to install the relevant Soda Libraries.
* The first library is necessary to execute data quality checks against datasets in a Unity catalog.
* The second library executes data quality checks against files stored in Databricks File Storage (DBFS). <br />
```python
pip install -i https://pypi.cloud.soda.io soda-spark[databricks]
pip install -i https://pypi.cloud.soda.io soda-spark-df
```

The Data Scientist adds to their Databricks notebook to bring this data together and perform basic checks after ingestion. For more information on how to add Soda to Databricks, you can follow the relevant guide. To extend the information found in the guide, the data scientist stores both checks and configuration outside the notebook itself. In order to add this information to the scan object, they would use a method similar to the example provided below:

```python
# Access the checks file
with open(settings_path/"ingestion_checks.yml") as ing_checks:
   ingestion = ing_checks.read()


# Create a file-like object from the YAML content
ingestion_checks = StringIO(ingestion)


# Use the scan.add_sodacl_yaml method to retrieve the checks
scan.add_sodacl_yaml_str(ingestion_checks)


# Retrieve the conf file and use the scan.add_sodacl_yaml method
with open(settings_path/"soda_conf.yml") as cfg:
   cfg_content = cfg.read()


# Create a file-like object from the YAML content
conf = StringIO(cfg_content)


# Add the connection configuration to the scan
scan.add_configuration_yaml_str(conf)
```








## Go further

* Learn more about [SodaCL checks and metrics]({% link soda-cl/metrics-and-checks.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}