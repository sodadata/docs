---
layout: default
title: Build a reporting dashboard
description: This example helps you build a reporting dashboard using the Reporting API. Use it to see how healthy your data is and how the team is using Soda Cloud. 
parent: API Documentation
fullwidth: false
---

# Build a reporting dashboard 
*Last modified on {% last_modified_at %}*

This example aims to help you build a data quality reporting dashboard using the Soda Cloud Reporting API. The dashboard enables your team to understand how healthy your data is and how the team is using Soda Cloud. The following diagram represents the system this example builds.

![Overview of API to Dashboards system](/assets/images/rep-api-system-diagram.png){:height="900px" width="900px"}

[Prerequisites and limitations](#prerequisites-and-limitions)<br />
[Set up a virtual Python environment](#set-up-a-virtual-python-environment)<br />
[Set up Python ingestion](#set-up-python-ingestion)<br />
[Capture data from your Soda Cloud account](#capture-data-from-your-soda-cloud-account)<br />
[Move the captured data into a SQL warehouse](#move-the-captured-data-into-a-sql-warehouse)<br />
[Build a Dataset Health-Over-Time dashboard](#build-a-dataset-health-over-time-dashboard)<br />
[Go further](#go-further)<br />
<br />
<br />

## Prerequisites and limitations
* You have some knowledge of Python and are familiar with `pandas` and HTTP request libraries such as `httpx`.
* You have installed Python 3.8 or later.
* You have a Soda Cloud account.
* You have [installed Soda Library]({% link soda-library/install.md %}) in your environment and [connected]({% link soda-library/configure.md %}) it to your Soda Cloud account.
* You have used Soda Library to run at least one scan against data in a dataset.
* You are familiar with the [Soda Cloud Reporting API]({% link api-docs/reporting-api.md %}). 
* This example does not support SSO.

## Set up a virtual Python environment

1. As per best practice, set up a Python virtual environment for each project you have so that you can keep your setups isolated and avoid library clashes. The example below uses the built-in <a href="https://docs.python.org/3/library/venv.html" target="_blank">`venv` module</a>.
```bash
python3 -m venv ~/venvs/soda-reporting-api-ingest
```
2. Activate the virtual environment using the following command.
```bash
source ~/venvs/soda-reporting-api-ingest
```
Example output:
```bash
(soda-reporting-api-ingest) -> ~/workspace/soda_reporting_ingestion git(main):
```
3. When you have completed this tutorial, you can deactivate your virtual environment using the following command.
```bash
deactivate
```

## Set up Python ingestion

1. To connect to the API endpoints you want to acccess, use an HTTP request library. This tutorial uses <a href="https://www.python-httpx.org/" target="_blank">`httpx`</a>; use the following command to install it.
```bash
pip install httpx pandas sqlalchemy
```
2. This examples moves the data it captures from your Soda Cloud account into a Snowflake data source; it requires the <a href="https://pypi.org/project/snowflake-sqlalchemy/" target="_blank">`snowflake-sqlalchemy`</a> <a href="https://www.sqlalchemy.org/" target="_blank">SQLAlchemy plugin</a>. If you use a different type of warehouse, find a corresponding plugin, or check <a href="https://docs.sqlalchemy.org/en/14/dialects/" target="_blank">SQLAlchemy built-in</a> database compatibility. <br />Alternatively, you can list and save all the requirements in a `requirements.txt` file and install them from the command-line using `pip install -r requirements.txt`.
3. Configure a few variables in a Python dictionary to contain static information such as the API URL and the endpoints to which you want to connect. Because the Soda Cloud Reporting API must identify your Soda Cloud account, create a data class to contain your Soda Cloud authentication credentials as per the following. You authenticate to the Reporting API using HTTP Basic Authentication and your Soda Cloud username and password.
    ```python
    from dataclasses import dataclass
    from typing import Dic
    import httpx
    import pandas as p
    API_MAIN_URL = "https://reporting.cloud.soda.io/v1
    ENDPOINTS = {
        "dataset_health": "/quality/dataset_health",
        "datasets": "/coverage/datasets",

    # you can assign defaults in the classes, if you prefer
    @dataclass
    class ApiAuth:
    	soda_username: str
    	soda_password: str
    ```
4. All the Soda Cloud Reporting API payloads have a structure as per the following example.
```json
{
  "resource": "string",
  "data": ...
}
```
In most cases, the `data` object is a `list` of `dicts` but for the `dataset_coverage` endpoint, it is a `dict` of `dicts`. Therefore, you must define a function called `get_results` which issues the HTTP request and returns a well-formed pandas DataFrame.
```python
def get_results(url: str, api_credentials: ApiAuth) -> pd.DataFrame:
	request_result = httpx.post(url, auth=(api_credentials.soda_username, api_credentials.soda_password))

	# check that the response is good
	if request_result.status_code == 200:
		result_json = request_result.json().get("data", {})
		return pd.DataFrame.from_records(result_json)
	else:
		raise httpx.RequestError(f"{request_result.status_code=}, {request_result.json()=}")
```

## Capture data from your Soda Cloud account

1. Use the following code to capture data from the `datasets` endpoint.
    ```python
    api_credentials = ApiAuth(soda_username='fizz@soda.io', soda_password='fizzIsMoreThanBuzzAtSoda')

    datasets = get_results(
    	f"{API_MAIN_URL}{ENDPOINTS['datasets']}",
    	api_credentials
    )
    ```
2. Because the `dataset` object is a `pandas.DataFrame`, view its `head` with the following `pandas` command.
```python
datasets.head()
```
The output appears similar to the following example.
```shell
| dataset_id                           | dataset_name | tags | number_of_failed_tests | is_deleted | last_scan_time                   | 
| ------------------------------------ | ------------ | ---- | ---------------------- | ---------- | -------------------------------- |
| 0301f146-3a0f-4437-b8cf-974936cbffda | subscription | []   | 0                      | False      | 2021-09-16T12:43:59.493882+00:00 |
| 3927e0eb-e543-4ef5-9626-08cb220cc43a | esg          | []   | 1                      | False      | 2021-07-05T09:26:48.948338+00:00 |
| 39628650-59f5-4801-8dfe-5b063e5d611c | products     | []   | 3                      | False      | 2021-11-04T08:13:15.173895+00:00 |
| 3b6b8f89-c450-4eb0-b910-92a29a0757a9 | booleancheck | []   | 0                      | False      | 2021-08-25T12:42:22.133490+00:00 |
| 450f5de3-3b79-4fe5-a781-3e7441e06a70 | customers    | []   | 3                      | False      | 2021-11-04T08:12:43.519556+00:00 |
```
3. Ensure that the content of the `tags` column is compatible with most SQL databases. Because tags in Soda are a list of strings, convert the array into a string of comma-separated strings.
```python
datasets["tags"] = datasets["tags"].str.join(',')
```
4. The `dataset_health` endpoint tracks the number of tests that passed per dataset per scan date and calculates a `percentage_of_passing_tests` to use as your dataset health score. Capture the data from this endpoint as the following.
    ```python
    dataset_health = get_results(
    	f"{API_MAIN_URL}{ENDPOINTS['dataset_health']}",
    	api_credentials
    )

    dataset_health.head()
    ```
Example output:
```shell
| dataset_id                           | scan_date  | critical | info | warning | number_of_tests | percentage_passing_tests |
| ------------------------------------ | ---------- | -------- | ---- | ------- | --------------- | ------------------------ |
| 0301f146-3a0f-4437-b8cf-974936cbffda | 2021-09-16 | 0        | 1    | 0       | 1               | 100.000000               |
| 3927e0eb-e543-4ef5-9626-08cb220cc43a | 2021-06-24 | 0        | 6    | 0       | 6               | 100.000000               |
| 3927e0eb-e543-4ef5-9626-08cb220cc43a | 2021-06-25 | 1        | 5    | 0       | 6               | 83.333333                |
| 3927e0eb-e543-4ef5-9626-08cb220cc43a | 2021-06-26 | 2        | 4    | 0       | 6               | 66.666667                |
| 3927e0eb-e543-4ef5-9626-08cb220cc43a | 2021-06-27 | 1        | 5    | 0       | 6               | 83.333333                |
```
The results from the second query produce a `dataset_id`, but no name or any of the information you get from the `datasets` query. When you build a dashboard, you can join the two results so that you can present the `dataset_name` in the reporting dashboard, rather than `dataset_id`.


## Move the captured data into a SQL warehouse

Having captured the Soda Cloud data that your Analytics Engineers need to compose dashboards, move the data into the storage-and-compute space that your reporting tools use, such as a SQL warehouse. This example uses a Snowflake data source and leverages panda's <a href="https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_sql.html?highlight=to_sql#pandas.DataFrame.to_sql" target="_blank">`to_sql()` method</a>, which itself leverages the database abstraction Python library known as <a href="https://www.sqlalchemy.org/" target="_blank">`SQLAlchemy`</a>.

1. Define a data class to contain the data source credentials and a function that enables you to move data into a table. If you use a non-Snowflake data source, you may need to modify the credentials class to contain the appropriate parameters.
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
2. Move the two sets of data into the data source.
```python
push_to_db(SnowflakeCredentials(), datasets, 'datasets_report')
push_to_db(SnowflakeCredentials(), dataset_health, 'dataset_health_report')
```

## Build a Dataset Health-Over-Time dashboard

To build a dashboard, this example uses <a href="https://redash.io/" target="_blank">Redash</a>, an open-source, self-hosted service. You may wish to use a different solution such as Metabase, Lightdash, Looker, or Tableau. To complete the data transformations, this example performs simple transformations directly in Redash, but you may wish to use a transformation tool such as <a href="https://www.getdbt.com/" target="_blank">dbt</a>, instead.

1. Use a `join` to enrich the `dataset_health` data with the `datasets` data so as to extract the dataset's name. This example also adds a Common Table Expression (CTE) that enables you to derive the total number of tests in your account at any given time, and the median number of tests to plot some benchmarks in the visualization.
    ```sql
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
2. In Redash, this example uses the alias `dataset_name::filter` to set up a <a href="https://redash.io/help/user-guide/querying/query-filters" target="_blank">query-filter</a> to filter the whole dashboard. Plot the "% passing test" metric from the `dataset_health` over time. In Redash, this example sets up the plot as per the following image. <br /><br />
![% passing tests metric in Redash](/assets/images/rep-api-pcent-passing-tests-redash.png)<br />
3. Make a second plot that displays the number of checks implemented on each dataset over time, as well as a project-wide benchmark, using the median calculation we derived in the SQL query above. Use two other metrics: 
* {% raw %}#{% endraw %}of tests on dataset
* median number of tests in project<br />
By setting the median number of tests metric as a line, viewers get insight into the check coverage of your dataset relative to other datasets in your project. You can also get similar information from the [`dataset_coverage` endpoint]({% link api-docs/reporting-api.md %}#/operations/dataset_coverage_v0_coverage_dataset_coverage_post).<br /><br />
![Plot of dataset test coverage over time](/assets/images/rep-api-test-setup-over-time.png)
<br />
4. Make a third plot to get an overview of the latest Dataset Health results for your project. For this plot, the SQL query captures only the last-known scan date for each dataset.
    ```sql
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
5. Create a table visualization to identify the health of your datasets, as per the following image. <br /><br />
![Dataset health last snapshot overview visualization](/assets/images/rep-api-dataset-health-last-snapshot.png)
<br />
6. After creating each visualization from a query, you can add them all to a dashboard that your colleagues can access. In Redash, the example dashboard appears as per the image below and includes a fourth query drawn from the `dataset_coverage` endpoint. <br /><br />
![Example of a finished overview dashboard in Redash](/assets/images/rep-api-all-in-dashboard.png)

## Go further

* Access the <a href="https://github.com/sodadata/reporting-api-examples" target="_blank">Reporting API examples repository</a>) in GitHub to get all the code snippets as a Python script that you can run and/or modify. Clone the repo to get started.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Open issues on the [Reporting API examples repository](https://github.com/sodadata/reporting-api-examples) in GitHub.
<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
