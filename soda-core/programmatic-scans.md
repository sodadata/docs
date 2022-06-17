---
layout: default
title: Define programmatic scans
description: To automate the search for "bad" data, you can use the Soda Sore Python library to programmatically execute scans.
sidebar: core
parent: Soda Core (Beta)
---

# Define programmatic scans
![beta](/assets/images/beta.png){:height="50px" width="50px"}

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
scan.execute()

# Inspect the scan result
#########################
scan.assert_no_error_logs()
scan.assert_no_checks_fail()
scan.has_error_logs()
scan.get_error_logs_text()
scan.get_checks_fail()
scan.get_checks_fail_text()
scan.assert_no_checks_warn_or_fail()
scan.get_checks_warn_or_fail()
scan.has_checks_warn_or_fail()
scan.get_checks_warn_or_fail_text()
scan.get_all_checks_text()
```

<!--
## PySpark

```python
scan = Scan()
scan.set_data_source_name("events")
scan.set_schedule_name("Default events schedule 6am UTC")

# Spark
###########
spark_session = None
df1 = None
df2 = None
# If the spark_session is connected to a Hive catalog, all the table names will be known already in the spark_session
# If the dataframes referenced in the SodaCL files are not registered in a connected catalog,
# users can link the dataframes manually to the name referenced in the SodaCL files
df1.createOrReplaceTempView("df1")
df2.createOrReplaceTempView("df2")
scan.add_configuration_spark_session(spark_session=spark_session, data_source_name="the_spark_data_source")

scan.add_variables({"date": "2022-01-01"})

scan.execute()

scan.assert_no_error_logs()
scan.assert_no_checks_fail()
scan.has_error_logs()
scan.get_error_logs_text()
scan.get_checks_fail()
scan.has_checks_fail()
scan.get_checks_fail_text()
scan.assert_no_checks_warn_or_fail()
scan.get_checks_warn_or_fail()
scan.has_checks_warn_or_fail()
scan.get_checks_warn_or_fail_text()
scan.get_all_checks_text()
```
-->

### Scan exit codes

Soda Core's scan output includes an exit code which indicates the outcome of the scan.

| 0 | all checks passed, all good from both runtime and Soda perspective |
| 1 | Soda issues a warning on a check(s) |
| 2 | Soda issues a failure on a check(s) |
| 3 | Soda encountered a runtime issue |

---
{% include docs-core-footer.md %}
