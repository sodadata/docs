---
layout: default
title: Getting from Reporting API to Overview Dashboards
parent: API Docs
apidoc: true
fullwidth: false
---

!! This tutorial assumes that you have some knowledge of Python and are familiar with `pandas` and HTTP request libraries such as `httpx`.
!!
!! The code provided in this tutorial is compatible with versions of Python 3.8 and later.

Today, Soda announced its Reporting API Beta to the public INSERT LINK TO BLOGPOST. If you've been using the platform for a while, you are probably wondering if your team is using it and how healthy your data is.

But don't worry, the reporting API has got you covered! In this step-by-step guide, we will show you how you can start building dashboards on top of the Reporting API in a matter of minutes.


## High-Level Components

By the end of this tutorial, you will have built a system similar to the system that the following diagram represents
![Overview of API to Dashboards system](assets/images/rep-api-system-diagram.png)

## Familiarize yourself with the API

You can find the API documentation in the [Reporting API Documentation Section]({% link api-docs/reporting-api.md %}). The documentation is always consistent with the code and is versioned, so no surprises!

INSERT SCREEN CAP OF DOCS WHEN DEPLOYED

Each endpoint is listed under broad, use-case categories such as Tool Adoption, Coverage, and Data Quality.

Each endpoint's documentation includes:

-   a high-level explanation of what the endpoint will give you **INSERT CAPTURE**
-   an example response payload **INSERT CAPTURE**
-   detailed field definitions for each schema response **INSERT GIF*

You can also "Try Out" each endpoint directly from the documentation pages **GIF + CHECK IF THIS WILL BE POSSIBLE IN THE SOLUTION WE OFFER**

# Start Building: Set up your Python Environment

1.  Following best practice, set up a Python virtual environment for each project you have so that you can keep your setups isolated and avoid library clashes. The tool you use to manage and create your virtual environments is entirely up to you. We'll show one example using the [`venv`](https://docs.python.org/3/library/venv.html) built-in module.

```bash
python3 -m venv ~/venvs/soda-reporting-api-ingest
```

    2. Once created, activate it with the following command:

```bash
source ~/venvs/soda-reporting-api-ingest
```

    3. Depending on your shell and the folder you work in, the output appears like this in your terminal:

```bash
(soda-reporting-api-ingest) -> ~/workspace/soda_reporting_ingestion git(main):
```

To deactivate your virtual environment using `venv` , run the following command:

```bash
deactivate
```

## Set Up Python Ingestion

The first thing to do is connect to the API endpoints you want via an HTTP request library. In this example, we have chosen to use [`httpx`](https://www.python-httpx.org/) as it is evolving as the next-generation HTTP client for Python, but feel free to use any alternative you like.

To install it in your freshly-created Python environment, execute the following:

```bash
pip install httpx pandas sqlalchemy
```

In our example, we show you how to move data into a [Snowflake](https://www.snowflake.com/) warehouse. Our code has an additional requirement on the [`snowflake-sqlalchemy`](https://pypi.org/project/snowflake-sqlalchemy/) [SQLAlchemy](https://www.sqlalchemy.org/) plugin. If you use another warehouse, make sure you can find a corresponding plugin, or check [SQLAlchemy built-in](https://docs.sqlalchemy.org/en/14/dialects/) database compatibility.


Alternatively, you can list and save all those requirements in a `requirements.txt` file and have pip install them via the `pip install -r requirements.txt` command.


Next, we must configure a few variables to hold static information such as the API URL and the endpoints we want to connect to in an easy-to-access Python dictionary. Since Soda Reporting API is not open to the entire web, and we need to know the organization you belong to, we also make a data class to hold your Soda Cloud authentication credentials.

Still in beta, you can authenticate to the API via HTTP Basic Authentication using your Soda Cloud username and password.

```python
from dataclasses import dataclass
from typing import Dict

import httpx
import pandas as pd

API_MAIN_URL = "https://reporting.cloud.soda.io/v0"

ENDPOINTS = {
    "dataset_health": "/quality/dataset_health",
    "datasets": "/coverage/datasets",
}

# you can already assign defaults in the classes if you prefer.
@dataclass
class ApiAuth:
	soda_username: str
	soda_password: str
```

As you may have seen from the [API Documentation](#familiarize-yourself-with-the-api), all the payloads have the following structure.

```json
{
  "resource": "string",
  "data": ...
}
```

In most cases, the `data` object is a `list` of `dicts` but for one of the endpoints, namely the `dataset_coverage` endpoint, it is a `dict` of `dicts`.

We must also define a function called `get_results` which issues the HTTP request and returns a well-formed [`pandas`](https://pandas.pydata.org/) `DataFrame`. We chose to use `pandas` as it is widely used in the Python data community and allows for easy transformation and database interaction, but feel free to use something else if it makes sense in your setup.

```python
def get_results(url: str, api_credentials: ApiAuth) -> pd.DataFrame:
	request_result = httpx.post(url, auth=(api_credentials.soda_username, api_credentials.soda_password))

	# check that the response is good. A good response has a 200 status co
	if request_result.status_code == 200:
		result_json = request_result.json().get("data", {})
		return pd.DataFrame.from_records(result_json)
	else:
		raise httpx.RequestError(f"{request_result.status_code=}, {request_result.json()=}")
```

## Capture Your Organization's Datasets Report

Start by capturing the `datasets` endpoint since it is a good starting point for what we want to do later.

```python
api_credentials = ApiAuth(soda_username='fizz@soda.io', soda_password='fizzIsMoreThanBuzzAtSoda')

datasets = get_results(
	f"{API_MAIN_URL}{ENDPOINTS['datasets']}",
	api_credentials
)
```

Since the `dataset` object we just loaded is a `pandas.DataFrame` , we can view its `head` with the following `pandas` command.

```python
datasets.head()
```

The output appears similar to the example output below:

-   [ ] TODO: Check that we render this as pretty markdown table when we move it in our blog and/or docs.


| dataset_id                           | dataset_name | tags | number_of_failed_tests | is_deleted | last_scan_time                   |
| ------------------------------------ | ------------ | ---- | ---------------------- | ---------- | -------------------------------- |
| 0301f146-3a0f-4437-b8cf-974936cbffda | subscription | []   | 0                      | False      | 2021-09-16T12:43:59.493882+00:00 |
| 3927e0eb-e543-4ef5-9626-08cb220cc43a | esg          | []   | 1                      | False      | 2021-07-05T09:26:48.948338+00:00 |
| 39628650-59f5-4801-8dfe-5b063e5d611c | products     | []   | 3                      | False      | 2021-11-04T08:13:15.173895+00:00 |
| 3b6b8f89-c450-4eb0-b910-92a29a0757a9 | booleancheck | []   | 0                      | False      | 2021-08-25T12:42:22.133490+00:00 |
| 450f5de3-3b79-4fe5-a781-3e7441e06a70 | customers    | []   | 3                      | False      | 2021-11-04T08:12:43.519556+00:00 |


Before we move the data to the database, make sure that the content of the `tags` column is compatible with most SQL databases. Since tags in Soda are a list of strings, it makes sense to convert the array into a string of comma-separated strings. In `pandas` we do it like this:

```python
datasets["tags"] = datasets["tags"].str.join(',')
```

## Capture Your Organization's Dataset Health Report

Now that we have your datasets info with human-readable names, whether or not they are active, and such, we can capture the convenient `dataset_health` information from the reporting API.

The `dataset_health` tracks the number of passing (`info`), `warning` or `critical` tests per dataset and per scan date, and calculates a `percentage_of_passing_tests` to use as your dataset health score.

Now that we have functionalized the code, we can get data from another endpoint, as we only need to change point to a different key in out endpoint `dict` :

```python
dataset_health = get_results(
	f"{API_MAIN_URL}{ENDPOINTS['dataset_health']}",
	api_credentials
)

dataset_health.head()
```

The output should be similar to the following example:


| dataset_id                           | scan_date  | critical | info | warning | number_of_tests | percentage_passing_tests |
| ------------------------------------ | ---------- | -------- | ---- | ------- | --------------- | ------------------------ |
| 0301f146-3a0f-4437-b8cf-974936cbffda | 2021-09-16 | 0        | 1    | 0       | 1               | 100.000000               |
| 3927e0eb-e543-4ef5-9626-08cb220cc43a | 2021-06-24 | 0        | 6    | 0       | 6               | 100.000000               |
| 3927e0eb-e543-4ef5-9626-08cb220cc43a | 2021-06-25 | 1        | 5    | 0       | 6               | 83.333333                |
| 3927e0eb-e543-4ef5-9626-08cb220cc43a | 2021-06-26 | 2        | 4    | 0       | 6               | 66.666667                |
| 3927e0eb-e543-4ef5-9626-08cb220cc43a | 2021-06-27 | 1        | 5    | 0       | 6               | 83.333333                |


At this point, you may want to skip ahead to [Move the datasets to your warehouse](#move-the-datasets-into-your-sql-warehouse) if you plan to transform the data in your warehouse rather than in Python. As you can see, the results from the second query only give you a `dataset_id` but no name or any of the information you get from the `datasets` query. When you build a dashboard, you will probably want to have the two results joined so that you can present the `dataset_name` to your stakeholders rather than a less human-friendly `dataset_id`.

We consider it best practice to do the transformations (the T of ELT) in SQL using tools like [dbt](https://www.getdbt.com/), and keep your Python logic to just the L of ELT. Therefore, we load this data into a warehouse and add to it later in the [Build your dashboard step](#build-a-dataset-health-overtime-report).

## Move the Datasets into Your SQL Warehouse

Now that you have the data pieces your Analytics Engineers need to compose dashboards, move them into a storage-and-compute space that powers your reporting tools, such as a SQL warehouse.

In this example, we use [Snowflake](https://www.snowflake.com/) and leverage `pandas`'s [`to_sql()`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_sql.html?highlight=to_sql#pandas.DataFrame.to_sql) method, which itself leverages the database abstraction Python library known as [`SQLAlchemy`](https://www.sqlalchemy.org/).

Since `to_sql()` works on top of a `SQLAlchemy` engine, it is likely that your database is either supported as a [built-in database](https://docs.sqlalchemy.org/en/14/dialects/), or via plugins, as is the case for Snowflake. However, feel free to use any other set of tools, or generate `INSERT` statements programmatically, if you prefer.

First, define a data class to hold the database credentials and a convenient function that allows us to move data into a database table:

```python
from sqlalchemy import create_engine
from snowflake.sqlalchemy import URL

@dataclass
class SnowflakeCredentials:
    account: str = "<your_snowflake_account"
    user: str = "<your_username3"
    password: str = "<your_password"
    database: str = "<target_database>"
    schema: str = "<target_schema>"
    warehouse: str = "<snowflake_warehouse_to_use>"

def push_to_db(
    db_credentials: SnowflakeCredentials,
    df: pd.DataFrame,
    qualified_target_table_name: str,
    if_exists: str = "replace",
):
    db_url_string = URL(
        account=db_credentials.account,
        user=db_credentials.user,
        password=db_credentials.password,
        database=db_credentials.database,
        schema=db_credentials.schema,
        warehouse=db_credentials.warehouse,
    )
    engine = create_engine(db_url_string)
    df.to_sql(qualified_target_table_name, con=engine, if_exists=if_exists, index=False)
```

!! If you use a different database, you may need to modify the credentials class to hold the appropriate parameters, as this differs from database to database.

Now, move the two sets of data into the warehouse:

```python
push_to_db(SnowflakeCredentials(), datasets, 'datasets_report')
push_to_db(SnowflakeCredentials(), dataset_health, 'dataset_health_report')
```

If all goes well, your data should now be waiting for you in your chosen warehouse 🎉.

## Build a Dataset Health-Over-Time Report

In this tutorial, we use [Redash](https://redash.io/), an open-source, self-hosted service that is sufficient for the simple dashboard we want to build. You and your team might already use another open-source BI solution such as Metabase or Lightdash or more feature-rich solutions such as Looker or Tableau.

You may also have a different approach regarding where to do transformations. We recommend preparing your reporting tables so that very little SQL or business logic exists in the BI tool, and, instead, use a transformation tool such as [dbt](https://www.getdbt.com/). However, to keep this tutorial on the shorter side, we do a few simple transformations directly in the BI tool to illustrate our point, butdo not let that break any of your preferred best practices!

### Enrich Your dataset_health_report Table

As in the data snippets above, the data we get from the `dataset_health` endpoint only contains the `dataset_id`. IDs are great for machines, less so for humans. Since humans will consume these dashboards, we will enrich the `dataset_health` data with the `datasets` data so that we can get its name. In SQL, this is done with a `join`.

Our reporting tool for this tutorial is [Redash](https://redash.io/), which allows us to add a quick SQL transformation on the way towards visualization. We also add a quick [CTE](https://learnsql.com/blog/what-is-cte/) that allows us to derive the total number of tests in our account at any given time, as well as the median number of tests to plot some benchmarks in our visualization:

```plsql
with descriptives as (
    select
        scan_date,
        median(number_of_tests) median_tests_in_project
    from reporting_api.dataset_health
    group by 1
)
select
    datasets.dataset_name as "dataset_name::filter",  -- alias for re-dash dataset-level filter
    h.scan_date,
    h.percentage_passing_tests as passing_tests,
    h.number_of_tests,
    d.median_tests_in_project,
    d.stddev_tests_in_project

from reporting_api.dataset_health_report h

join descriptives d
    on to_date(h.scan_date) = to_date(d.scan_date)

join reporting_api.datasets_report datasets
    on h.dataset_id = datasets.dataset_id

where datasets.is_deleted = false
```
### Make Some Plots

In Redash, the alias `dataset_name::filter` allows us to set up a [query-filter](https://redash.io/help/user-guide/querying/query-filters) that we can use to filter the whole dashboard.

Plot the "% passing test" metric from the `dataset_health` over time. In Redash, we set up the plot as follows:

![% passing tests metric in Redash](assets/images/rep-api-pcent-passing-tests-redash.png)

In order to contextualize this chart, we could make another plot that displays the number of tests implemented on each dataset over time, as well as a project-wide benchmark, using the `median` calculation we derived in the [SQL query above](#enrich-your-dataset_health_report-table).

!! You could plot all of these on the same chart, but it is a bit too crowded for our taste, so we made two plots, instead.

![Plot of dataset test coverage over time](assets/images/rep-api-test-setup-over-time.png)

By setting the median number of tests metric as a line, you can also get an idea of the test coverage of your dataset relative to other datasets in your project.

!! You can also get similar information from the `dataset_coverage` endpoint (see API Documentation INSERT LINK)

Make one final plot from this query to get an overview of the latest dataset health results for your project. For this plot, we set up a slightly different SQL query to capture only the latest-known scan date for each dataset.

```plsql
select
    dataset_name,
    percentage_passing_tests,
    number_of_tests,
    scan_date

from reporting_api.dataset_health_report r

join reporting_api.datasets_report d
    on r.dataset_id = d.dataset_id

where number_of_tests > 0

qualify row_number() over (partition by dataset_name order by scan_date desc) = 1

order by 2
```

Finally, we make a simple table visualization that we use to quickly identify datasets whose health is poor or great. The setup of the visualization looks like the following:

![Dataset health last snapshot overview visualization](assets/images/rep-api-dataset-health-last-snapshot.png)

### Add the Plots to a Dashboard

This is specific to Redash, but once you have created each visualization from a query, you can add them all to a dashboard that your users can access and interact with. Our dashboard looks something like the following:

!! We added another quick query from the `dataset_coverage` endpoint. We didn't cover data extraction as it follows the same principles and code as outlined above.

![Example of a finished overview dashboard in Redash](assets/images/rep-api-all-in-dashboard.png)

### **One Last Thing**

We thought it would be even nicer to share the code snippets as a Python script that you can simply run and modify at will. Access the [reporting API examples repo](https://github.com/sodadata/reporting-api-examples), clone it, then get started in a matter of minutes.

# Get involved!

At Soda, we love feedback! If we didn't do a good job at explaining any of the steps or you have any other feedback, let us know.

-   Join our [Slack community](https://join.slack.com/t/soda-community/shared_invite/zt-pf67xl6u-n3wexBNDl71VC6vK8fSPjg). If you want to talk about this guide or the reporting API, be sure to join the #reporting-api channel.
-   Open issues on the [reporting API examples repo](https://github.com/sodadata/reporting-api-examples)
-   DM @Bastien Boutonnet directly on Slack

Happy reporting!

