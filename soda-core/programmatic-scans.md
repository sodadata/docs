---
layout: default
title: Define programmatic scans
description: 160 char description
sidebar: core
parent: Soda Core
---

# Define programmatic scans

! This page is a work in progress

## Plain Python

```python
scan = Scan()
scan.set_data_source_name("events")
scan.set_schedule_name("Default events schedule 6am UTC")

# Add configuration files
#########################
scan.add_configuration_yaml_file(file_path="~/.soda/my_local_soda_environment.yml")
scan.add_configuration_yaml_from_env_var(env_var_name="SODA_ENV")
scan.add_configuration_yaml_from_env_vars(prefix="SODA_")
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

# Add SodaCL files
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
scan.has_checks_fail()
scan.get_checks_fail_text()
scan.assert_no_checks_warn_or_fail()
scan.get_checks_warn_or_fail()
scan.has_checks_warn_or_fail()
scan.get_checks_warn_or_fail_text()
scan.get_all_checks_text()
```

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



---
{% include docs-core-footer.md %}