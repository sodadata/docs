Integrate Soda Core with a data orchestration tool such as, Airflow, to automate and schedule your search for "bad" data. 

Configure actions that the orchestration tool can take based on scan output. For example, if the output of a scan reveals a large number of failed tests, the orchestration tool can automatically block "bad" data from contaminating your data pipeline.

<!--
## Apache Airflow

```python
soda_sql_scan_op = SodaScanOperator(
    task_id='soda_scan_xyz',
    dag=dag,
    data_sources=[{ 
        'data_source_name': 'soda_data_source_nameone',
        'airflow_conn_id': 'airflow_conn_id_one', 
        'database': 'the_db_in_the_connection',
        'schema': 'the_schema_in_the_db'
    }],
    soda_cl_path='../SodaCL',
    variables={ 'soda_var_name': 'value' },
    airflow_variables=['airflow_var_name1', 'airflow_var_name2'],
    airflow_variables_json=['airflow_var_name1', 'airflow_var_name2'],
    soda_cloud_api_key = '9s8df9s8d7f98sd',
    soda_cloud_api_key_var_name = 'the_airflow_soda_api_key_key_var_name'
)
```

* `data_sources` maps data_source names to the the details Soda Core needs to create a data_source from an Airflow connection.
* `soda_cl_path` is a file or directory containing the [checks.yml files]({% link soda-core/first-scan.md %}#the-checks-yaml-file) that you must identify in a `soda scan` command.
* `variables` is a dict and that Soda Core passe "as is" to the scan.
* `airflow_variables` is a list of Airflow variable names that must propagate to `soda scan` variables with `Variable.get("varname")`.
* `airflow_variables_json` is a list of Airflow variable names that must propagate to `soda scan` variables with `Variable.get("varname", deserialize_json=True)`
-->

## Apache Airflow using PythonOperator

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
