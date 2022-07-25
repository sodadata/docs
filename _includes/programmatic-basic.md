To automate the search for "bad" data, you can use the **Soda Core Python library** to programmatically execute scans.

Based on a set of conditions or a specific event schedule, you can instruct Soda Core to automatically scan a data source. For example, you may wish to scan your data at several points along your data pipeline, perhaps when new data enters a data source, after it is transformed, and before it is exported to another data source.

You can save Soda Core scan results anywhere in your system; the `scan_result` object contains all the scan result information. To import the Soda Core library in Python so you can utilize the `Scan()` object, [install a Soda Core package]({% link soda-core/installation.md %}), then use `from soda.scan import Scan`.

## Basic programmatic scan

```python
from soda.scan import Scan

scan = Scan()
scan.set_data_source_name("events")

# Add configuration YAML files
#########################
# Multiple strategies available:
# 1) From a file
scan.add_configuration_yaml_file(file_path="~/.soda/my_local_soda_environment.yml")
# 2) From explicit environment variable(s)
scan.add_configuration_yaml_from_env_var(env_var_name="SODA_ENV")
# 3) From environment variables using a prefix
scan.add_configuration_yaml_from_env_vars(prefix="SODA_")
# 4) In code.
scan.add_configuration_yaml_str(
    """
    data_source events:
      type: snowflake
      connection:
      host: ${SNOWFLAKE_HOST}
      username: ${SNOWFLAKE_USERNAME}
      password: ${SNOWFLAKE_PASSWORD}
      database: events
      schema: public
"""
)

# Add check YAML files
##################
scan.add_sodacl_yaml_file("./my_programmatic_test_scan/sodacl_file_one.yml")
scan.add_sodacl_yaml_file("./my_programmatic_test_scan/sodacl_file_two.yml")
scan.add_sodacl_yaml_files("./my_scan_dir")
scan.add_sodacl_yaml_files("./my_scan_dir/sodacl_file_three.yml")

# Add variables
###############
scan.add_variables({"date": "2022-01-01"})

# Execute the scan
##################
# Set logs to verbose mode, equivalent to CLI -V option
scan.set_verbose(True)

# Execute the scan
scan.execute()

# Inspect the scan result
#########################
# Inspect the scan logs.
scan.get_logs_text()

# Typical checking
scan.assert_no_error_logs()
scan.assert_no_checks_fail()

# More advanced scan execution log introspection methods
scan.has_error_logs()
scan.get_error_logs_text()

# More advanced check results details methods
scan.get_checks_fail()
scan.has_check_fails()
scan.get_checks_fail_text()
scan.assert_no_checks_warn_or_fail()
scan.get_checks_warn_or_fail()
scan.has_checks_warn_or_fail()
scan.get_checks_warn_or_fail_text()
scan.get_all_checks_text()
```
