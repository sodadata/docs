---
description: >-
  Integrate Soda Library with a data orchestration tool to automate and schedule
  your search for "bad" data.
---

# Configure orchestrated scans

Integrate Soda Library with a data orchestration tool such as, Airflow, to automate and schedule your search for bad-quality data.

Configure actions that the orchestration tool can take based on scan output. For example, if the output of a scan reveals a large number of failed tests, the orchestration tool can automatically block "bad" data from contaminating your data pipeline.

> 📚 Consider following the [Test data in an Airflow pipeline](../use-case-guides/quick-start-prod.md) guide for specific details about embedding Soda tests in an Airflow pipeline.
>
> 🎥 Consider following a 30-minute Astronomer tutorial for [Data Quality Checks with Airflow, Snowflake and Soda](https://www.youtube.com/watch?v=YZTcIi5o7FI).

## About Soda and Airflow

If you have an internal requirement to run Soda tasks in isolated environments in Airflow or Astro, you can do so using one of the following options; refer to [Astro documentation](https://docs.astronomer.io/learn/airflow-isolated-environments) for more detail.

* A Virtualenv operator uses the same Python runtime as Airflow, but it creates a new virtual environment. Python considers this a separated runtime environment, but it uses the same Python executable as does Airflow.
* An External Python operator works almost the same as Virtualenv operator, but this environment is set up outside of Airflow so it can use different Python executables, or use a different version of Python, etc.
* A Kubernetes + Docker setup offers a completely separated environment; this is the only one that is fully detached from Airflow/Astro, but it requires a Kubernetes cluster. Soda provides a Docker image that you can use in a cluster; see Install Soda Library > Docker tab for details.

As a Python library, Soda can handle big data engineering tasks. Soda compute occurs almost solely in the data source and it runs queries to gather metrics in the data source, and then only evaluates the outcome of the metrics in Python. Soda does not extract large volumes of data out of the data source to process in Python. There are two exceptions to this rule:

* For user-defined failed rows queries, Soda executes the query as provided, so if user includes `select * …` , then Soda loads data in Python.
* For record-level reconciliation checks, Soda loads all data into memory, but only one row at a time (or a defined batch of rows based on configuration). However, this does not result in large volumes of data in memory as rows just pass through during processing.

## Airflow using PythonOperator

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

Also, configure the following:

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
    requirements=["-i https://pypi.cloud.soda.io", "soda-postgres"],
    system_site_packages=False,
    dag=dag
)

publish_data_op = DummyOperator(
    task_id='publish_data'
)

ingest_data_op >> soda_core_scan_op >> publish_data_op
```

## Go further

* Learn more about the [Metrics and checks](../sodacl-reference/metrics-and-checks.md) you can use to check for data quality.
* Follow an example implementation in [Test data in an Airflow pipeline](../use-case-guides/quick-start-prod.md).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
