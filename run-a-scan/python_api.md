---
description: Access Python reference content for the Soda Scan class and its methods.
---

# Soda Library Python API reference

Use the Python API to programmatically execute Soda scans. The following content offers a reference for the Soda scan class and its methods.

Refer to [Program a scan](./#scan-for-data-quality), Program a scan tab, for instructional details and an example of a complete file.

## Classes

Use the `Scan` class to programmatically define and execute data quality scans. See [Invoke Soda Library](../quick-start-sip/programmatic.md) for an example of how to use the Soda Library Python API in a programmatic scan.

```python
class Scan()
```

## Methods

Use this method to execute the scan. When executed, Soda returns an integer exit code as per the table that follows.

```python
def execute(self) -> int
```

| Exit code | Description                                                                          |
| :-------: | ------------------------------------------------------------------------------------ |
|     0     | All checks passed. No runtime errors.                                                |
|     1     | Soda recorded a warn result for one or more checks.                                  |
|     2     | Soda recorded a fail result for one or more checks.                                  |
|     3     | Soda encountered a runtime issue but was able to send check results to Soda Cloud.   |
|     4     | Soda encountered a runtime issue and was unable to send check results to Soda Cloud. |

\
\


### Provide required scan settings

Specify the data source on which Soda executes the checks.

```python
def set_data_source_name(self, data_source_name: str)
```

\


Provide the scan definition name if the scan has been defined in Soda Cloud. By providing this value, Soda correlates subsequent scans from the same pipeline.

To retrieve this value, navigate to the **Scans** page in Soda Cloud, then select the scan definition you wish to execute remotely and copy the scan name, which is the smaller text under the label. For example, weekday\_scan\_schedule.

```python
def set_scan_definition_name(self, scan_definition_name: str)
```

\


### Add configurations to a scan

Add data source and Soda Cloud connection configurations from a YAML file. `file_path` is a string that points to a configuration file. `~` expands to the user's home directory.

```python
def add_configuration_yaml_file(self, file_path: str)
```

\


Optionally, add all connection configurations from all matching YAML files in the file path according to your specifications.

* `path` is a string that is the path to a directory, but you can use it as a path to a configuration file. `~` expands to the user's home directory or the directory in which to search for configuration files.
* `recursive` requires a boolean value that controls whether Soda scans nested directories. If unspecified, the default value is `true`.
* `suffixes` is an optional list of strings that you use when recursively scanning directories to load only those files with a specific extension. If unspecified, the default values are `.yml` and `.yaml`.

```python
def add_configuration_yaml_files(self, path: str, recursive: bool | None = True, suffixes: str | None = None)
```

\


Optionally, add connection configurations from a YAML-formatted string.

* `environment_yaml_str` is a string that represents a configuration and must be YAML-formatted.
* `file_path` is an optional string that you use to get the location of errors in the logs.

```python
def add_configuration_yaml_str(self, environment_yaml_str: str, file_path: str = "yaml string")
```

\


### Add SodaCL checks to a scan

Add a SodaCL checks YAML file to the scan according to a file path you specify. `file_path` is a string that identifies a checks YAML file.

```python
def add_sodacl_yaml_file(self, file_path: str)
```

\


Optionally, add all the files in a directory to the scan as SodaCL checks YAML files.

* `path` is a string that identifies a directory, but you can use it as a path to a configuration file. `~` expands to the user's home directory or the directory in which to search for checks YAML files.
* `recursive` is an optional boolean value that controls whether Soda scans nested directories. If unspecified, the default value is `true`.
* `suffixes` is an optional list of strings that you use when recursively scanning directories to load only those files with a specific extension. If unspecified, the default values are `.yml` and `.yaml`.

```python
def add_sodacl_yaml_files(self, path: str, recursive: bool | None = True, suffixes: list[str] | None = None)
```

\


Optionally, add SodaCL checks from a YAML-formatted string.

* `sodacl_yaml_str` is a string that represents the SodaCL checks and must be YAML-formatted.
* `file_path` is an optional string that you use to get the location of errors in the logs.

```python
def add_sodacl_yaml_str(self, sodacl_yaml_str: str, file_name: str | None = None):
```

\


If you use a [check template](../sodacl-reference/check-template.md) for SodaCL checks, add a SodaCL template file to the scan. `file_path` is a string that identifies a SodaCL template file.

```python
def add_template_file(self, file_path: str)
```

\


If you use multiple [check templates](../sodacl-reference/check-template.md) for SodaCL checks, add all the template files in a directory to the scan. `path` is a string that identifies the directory that contains the SodaCL template files.

```python
def add_template_files(self, path: str)
```

\


### Add local data to a scan

If you use Pandas, add a Pandas Dataframe dataset to the scan.

* `dataset_name` is a string to identify a dataset.
* `pandas_df` is a Pandas Dataframe object.
* `data_source_name` is a string to identify a data source.

```python
def add_pandas_dataframe(self, dataset_name: str, pandas_df, data_source_name: str = "dask")
```

\


If you use Dask, add a Dask Dataframe dataset to the scan.

* `dataset_name` is a string used to identify a dataset.
* `dask_df` is a Dask Dataframe object.
* `data_source_name` is a string to identify a data source.

```python
def add_dask_dataframe(self, dataset_name: str, dask_df, data_source_name: str = "dask")
```

\


If you use PySpark, add a Spark session to the scan.

* `spark_session` is a Spark session object.
* `data_source_name` is a string to identify a data source.

```python
def add_spark_session(self, spark_session, data_source_name: str = "spark_df")
```

\


If you use a pre-existing DuckDB connection object as a data source, add a DuckDB connection to the scan.

* `duckdb_connection` is a DuckDB connection object.
* `data_source_name` is a string to identify a data source.

```python
def add_duckdb_connection(self, duckdb_connection, data_source_name: str = "duckdb")
```

\


### Add optional scan settings

Configure a scan to output verbose log information. This is useful when you wish to see the SQL queries that Soda executes or to troubleshoot scan issues.

```python
def set_verbose(self, verbose_var: bool = True)
```

\


Configure Soda to prevent it from sending scan results to Soda Cloud. This is useful if, for example, you are testing checks locally and do not wish to muddy the measurements in your Soda Cloud account with test run metadata.

```python
def set_is_local(self, local_var: bool = True)
```

\


Configure a scan to have access to custom variables that can be referenced in your SodaCL files.`variables` is a dictionary with string keys and string values.

```python
def add_variables(self, variables: dict[str, str])
```

\


### Add configurations to handle scan results

Use the following configurations to handle errors and/or warnings that occurred during a Soda scan.

Instruct Soda to raise an `AssertionError` when errors occur in the scan logs.

```python
def assert_no_error_logs(self)
```

\


Instruct Soda to raise an `AssertionError` when errors or warnings occur in the scan logs.

```python
def assert_no_error_nor_warning_logs(self)
```

\


Instruct Soda to raise an `AssertionError` when a specific error message occurs in the scan logs. Use `expected_error_message` to specify the error message as a string.

```python
def assert_has_error(self, expected_error_message: str)
```

\


Instruct Soda to return a boolean value to indicate that errors occurred in the scan logs.

```python
def has_error_logs(self) -> bool
```

\


Instruct Soda to return a boolean value to indicate that errors or warnings occurred in the scan logs.

```python
def has_error_or_warning_logs(self) -> bool
```

\


Instruct Soda to return a string that represents the logs from the scan.

```python
def get_logs_text(self) -> str | None
```

\


Instruct Soda to return a list of strings of scan errors in the logs.

```python
def get_error_logs(self) -> list[Log]
```

\


Instruct Soda to return a list of strings of scan errors and warnings in the logs.

```python
def get_error_or_warning_logs(self) -> list[Log]
```

\


Instruct Soda to return a string of all scan errors in the logs.

```python
def get_error_logs_text(self) -> str | None
```

\


Instruct Soda to return a dictionary containing the results of the scan.

```python
def get_scan_results(self) -> dict
```

The scan results dictionary includes the following keys:

```
"definitionName"
"defaultDataSource"
"dataTimestamp"
"scanStartTimestamp"
"scanEndTimestamp"
"hasErrors"
"hasWarnings"
"hasFailures"
"metrics"
"checks"
"checksMetadata"
"queries"
"automatedMonitoringChecks"
"profiling"
"metadata"
"logs"
```

\


### Add configurations to handle check results

Use the following configurations to handle the results of checks executed during a Soda scan.

Instruct Soda to raise an `AssertionError` when any check execution results in a fail state.

```python
def assert_no_checks_fail(self)
```

\


Instruct Soda to raise an `AssertionError` when any check execution results in a fail or warn state.

```python
def assert_no_checks_warn_or_fail(self)
```

\


Instruct Soda to return a boolean value to indicate that one or more checks executed during the scan resulted in a fail state.

```python
def has_check_fails(self) -> bool
```

\


Instruct Soda to return a boolean value to indicate that one or more checks executed during the scan resulted in a warn state.

```python
def has_check_warns(self) -> bool
```

\


Instruct Soda to return a boolean value to indicate that one or more checks executed during the scan resulted in a fail or warn state.

```python
def has_check_warns_or_fails(self) -> bool
```

\


Instruct Soda to return a list of strings of checks that resulted in a fail state.

```python
def get_checks_fail(self) -> list[Check]
```

\


Instruct Soda to return a string of checks that resulted in a fail state.

```python
def get_checks_fail_text(self) -> str | None
```

\


Instruct Soda to return a list of strings of checks that resulted in a fail or warn state.

```python
def get_checks_warn_or_fail(self) -> list[Check]
```

\


Instruct Soda to return a string of checks that resulted in a fail or warn state.

```python
def get_checks_warn_or_fail_text(self) -> str | None
```

\


Instruct Soda to return a string of all check results.

```python
def get_all_checks_text(self) -> str | None
```

\


## Attributes

Configure the datasource-level samples limit for the failed rows sampler. This is useful when scanning Pandas, Dask, or Spark Dataframes.

```python
self._configuration.samples_limit: int
```

\


Replace the failed rows sampler with a custom sampler. See [Configure a custom sampler](failed-row-samples.md#configure-a-python-custom-sampler) for instructions about how to define a custom sampler.

```python
self.sampler: Sampler
```

***

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
