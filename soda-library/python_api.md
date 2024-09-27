---
layout: default
title: Soda Library Python API Reference
description: A Python reference for the Soda Scan class and its methods
parent: Get started
---

# Soda Library Python API Reference
*Last modified on {% last_modified_at %}*

## **Classes**
```python
class Scan()
```
The Scan class is used to programmatically define and execute data quality scans.
See the [Invoke Soda Library page]({% link soda-library/programmatic.md %}) for an example of how the Soda Library Python API is used in a programmatic scan.

## Methods
```python
def execute(self) -> int
```
Executes the scan. Returns an integer exit code:

| 0 | all checks passed, all good from both runtime and Soda perspective |
| 1 | Soda issues a warning on a check(s) |
| 2 | Soda issues a failure on a check(s) |
| 3 | Soda encountered a runtime issue, and was able to submit scan results to Soda Cloud |
| 4 | Soda encountered a runtime issue, but was unable to submit any results to Soda Cloud |

<br/><br/>
### Required scan settings
```python
def set_data_source_name(self, data_source_name: str)
```
Specifies which datasource to use for the checks.
<br/><br/>

```python
def set_scan_definition_name(self, scan_definition_name: str)
```
The scan definition name is required if the scan is connected to Soda Cloud in order to correlate subsequent scans from the same pipeline.
<br/><br/>

### Adding configurations to the scan (at least one is required)

```python
def add_configuration_yaml_file(self, file_path: str)
```
Adds configurations from a YAML file on the given path.

`file_path` is a string pointing to a configuration file. ~ will be expanded to the user home dir.
<br/><br/>


```python
def add_configuration_yaml_files(self, path: str, recursive: bool | None = True, suffixes: str | None = None)
```
Adds all configurations all YAML files matching the given file path or scanning the given path as a directory.

`path` is a string that typically is the path to a directory, but it can also be a configuration file. ~ will be expanded to the user home dir the directory in which to search for configuration files.

`recursive` is a bool that controls if nested directories also will be scanned.  Default recursive=True.

`suffixes` is an optional list of strings and is used when recursively scanning directories to only load files having a given extension or suffix. Default suffixes=[".yml", ".yaml"]
<br/><br/>

```python
def add_configuration_yaml_str(self, environment_yaml_str: str, file_path: str = "yaml string")
```
Adds configurations from a YAML-formatted string.

`environment_yaml_str` is a string that represents a configuration; must be YAML-formatted.

`file_path` is an optional string and can be used to get the location of the log/error in the logs.
<br/><br/>

### Adding checks to the scan
```python
def add_sodacl_yaml_files(self, path: str, recursive: bool | None = True, suffixes: list[str] | None = None)
```
Adds all the files in the given directory to the scan as SodaCL files.

`path` is a string that typically represents a directory, but it can also be a SodaCL file.
~ will be expanded to the user home dir the directory in which to search for SodaCL files.

`recursive` is a bool that controls if nested directories also will be scanned.  Default recursive=True.

`suffixes` is an optional list of strings and is used when recursive scanning directories to only load files
having a given extension or suffix. Default suffixes=[".yml", ".yaml"]
<br/><br/>


```python
def add_sodacl_yaml_file(self, file_path: str)
```
Add a SodaCL YAML file to the scan on the given file_path.

`file_path` is a string that represents a SodaCL file.
<br/><br/>


```python
def add_sodacl_yaml_str(self, sodacl_yaml_str: str, file_name: str | None = None):
```
Add a SodaCL YAML string to the scan.

`sodacl_yaml_str` is a string that represents SodaCL checks; must be YAML-formatted.

`file_path` is an optional string and can be used to get the location of the log/error in the logs.
<br/><br/>

```python
def add_template_files(self, path: str)
```
Adds all the files in the given directory to the scan as SodaCL template files.

`path` is a string that represents a directory containing SodaCL template files.
<br/><br/>


```python
def add_template_file(self, file_path: str)
```
Adds a SodaCL template file to the scan.

`file_path` is a string that represents a SodaCL template file.
<br/><br/>

### Adding local data to the scan (required if scanning local data)
```python
def add_pandas_dataframe(self, dataset_name: str, pandas_df, data_source_name: str = "dask")
```
Add a pandas dataframe dataset to the scan. Only required in case of pandas data scans.

`dataset_name` is a string used to name the dataset.

`pandas_df` is a pandas dataframe object.

`data_source_name` is a string used to name the datasource.
<br/><br/>


```python
def add_dask_dataframe(self, dataset_name: str, dask_df, data_source_name: str = "dask")
```
Add a dask dataframe dataset to the scan. Only required in case of dask data scans.

`dataset_name` is string used to name the dataset.

`dask_df` is a dask dataframe object.

`data_source_name` is a string used to name the datasource.
<br/><br/>


```python
def add_spark_session(self, spark_session, data_source_name: str = "spark_df")
```
Add a spark_session to the scan.  Only required in case of PySpark scans.

`spark_session` is a spark session object.

`data_source_name` is a string used to name the datasource
<br/><br/>


```python
def add_duckdb_connection(self, duckdb_connection, data_source_name: str = "duckdb")
 ```
Adds a duckdb connection to the scan. Only requireed in case of using a pre-existing duckdb connection object as a data source.

`duckdb_connection` is a duckdb connection object.

`data_source_name` is a string used to name the datasource
<br/><br/>

### Optional scan settings

```python
def set_verbose(self, verbose_var: bool = True)
```
Configures the scan to output verbose logs.
<br/><br/>


```python
def set_is_local(self, local_var: bool = True)
```
Prevents the scan results from uploading to the Soda Cloud.
<br/><br/>

### Handling scan results
```python
def assert_no_checks_fail(self)
```
Raises `AssertionError` in case any checks failed when running the scan.
<br/><br/>

```python
def assert_no_checks_warn_or_fail(self)
```
Raises an `AssertionError` in case any checks warned or failed when running the scan.
<br/><br/>

```python
def assert_no_error_logs(self)
```
Raises an `AssertionError` in case there were errors in the logs from the scan.
<br/><br/>

```python
def assert_no_error_nor_warning_logs(self)
```
Raises an `AssertionError` in case there were errors or warnings in the logs from the scan.
<br/><br/>

```python
def assert_has_error(self, expected_error_message: str)
```
Raises an `AssertionError` in case a specific error message is in the logs from the scan.

`expected_error_message` is a string representing the error message of interest. 
<br/><br/>

```python
def has_check_fails(self) -> bool
```
Returns a bool representing whether any checks failed in the scan.
<br/><br/>

```python
def has_check_warns(self) -> bool
```
Returns a bool representing whether any checks warned in the scan.
<br/><br/>

```python
def has_check_warns_or_fails(self) -> bool
```
Returns a bool representing whether any checks failed or warned in the scan.
<br/><br/>

```python
def has_checks_warn_or_fail(self) -> bool
```
Returns a bool representing whether any checks failed or warned in the scan.
<br/><br/>

```python
def has_error_or_warning_logs(self) -> bool
```
Returns a bool representing whether any errors or warnings are in the logs from the scan.
<br/><br/>

```python
def has_error_logs(self) -> bool
```
Returns a bool representing whether any errors are in the logs from the scan.
<br/><br/>

```python
def get_scan_results(self) -> dict
```
Returns a dictionary containing the results of the scan.
The scan results dictionary has the following keys:
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
<br/><br/>
```python
def get_logs_text(self) -> str | None
```
Returns a string representing the logs from the scan.
<br/><br/>

```python
def get_error_logs(self) -> list[Log]
```
Returns a list of strings representing each error in the logs from the scan.
<br/><br/>

```python
def get_error_logs_text(self) -> str | None
```
Returns a string representing all errors in the logs from the scan.
<br/><br/>

```python
def get_error_or_warning_logs(self) -> list[Log]
```
Returns a list of strings representing each error or warning in the logs from the scan.
<br/><br/>

```python
def get_checks_fail(self) -> list[Check]
```
Returns a list of strings representing each failed check from the scan.
<br/><br/>

```python
def get_checks_fail_text(self) -> str | None
```
Returns a string representing all failed checks from the scan.
<br/><br/>

```python
def get_checks_warn_or_fail(self) -> list[Check]
```
Returns a list of strings representing each failed or warned check from the scan.
<br/><br/>

```python
def get_checks_warn_or_fail_text(self) -> str | None
```
Returns a string representing all failed or warned checks from the scan.
<br/><br/>

```python
def get_all_checks_text(self) -> str | None
```
Returns a string representing all checks from the scan.
<br/><br/>

### Methods for remote scans (beta)
These methods are used to trigger and get the results of scans defined in the Soda Cloud UI.
Remote scans are orchestrated by the Soda Agent specified in the scan definition.
These methods provide a Python interface for the Scans endpoint in the Soda Cloud API.
<br/><br/>

```python
def set_remote(self, is_remote=True, remote_mode: bool)
```
Sets up the scan to run in remote mode.

`remote_mode` is a bool that controls whether the scan will run in remote mode.
<br/><br/>
```python
def execute_remote(self)
```
Executes a remote scan based on the scan name that was set with the method `self.set_scan_definition_name()`.
<br/><br/>
```python
def get_remote_scan_logs(self, scan_id: str | None = None) -> str
```
Returns a string containing the logs from the remote scan.
This will throw an error if the scan has not finished.

`scan_id` is a string representing the latest scan run.
If no value is given, this will be obtained from the class attribute `self.scan_id`.
<br/><br/>

Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />
---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}