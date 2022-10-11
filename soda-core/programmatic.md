---
layout: default
title: Define programmatic scans
description: Use the Soda Sore Python library to programmatically execute scans and automate the checks for "bad" data.
parent: Soda Core
redirect_from: /soda-core/programmatic-scans.html
---

# Define programmatic scans

To automate the search for "bad" data, you can use the **Soda Core Python library** to programmatically execute scans.

Based on a set of conditions or a specific event schedule, you can instruct Soda Core to automatically scan a data source. For example, you may wish to scan your data at several points along your data pipeline, perhaps when new data enters a data source, after it is transformed, and before it is exported to another data source.

You can save Soda Core scan results anywhere in your system; the `scan_result` object contains all the scan result information. To import the Soda Core library in Python so you can utilize the `Scan()` object, [install a Soda Core package]({% link soda-core/installation.md %}), then use `from soda.scan import Scan`.

[Basic programmatic scan](#basic-programmatic-scan)<br />
[Scan exit codes](#scan-exit-codes)<br />
[Configure a failed row sampler](#configure-a-failed-row-sampler)<br />
[Save failed row samples to a file](#save-failed-row-samples-to-a-file)<br />
[Go further](#go-further)<br />
<br />

## Basic programmatic scan

```python
from soda.scan import Scan

scan = Scan()
scan.set_data_source_name("events")

# Add configuration YAML files
#########################
# Choose one of the following to specify data source connection configurations :
# 1) From a file
scan.add_configuration_yaml_file(file_path="~/.soda/my_local_soda_environment.yml")
# 2) From explicit environment variable(s)
scan.add_configuration_yaml_from_env_var(env_var_name="SODA_ENV")
# 3) From environment variables using a prefix
scan.add_configuration_yaml_from_env_vars(prefix="SODA_")
# 4) Inline in the code
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

# Set logs to verbose mode, equivalent to CLI -V option
scan.set_verbose(True)


# Inspect the scan result
#########################
scan.get_scan_results()

# Inspect the scan logs
#######################
scan.get_logs_text()

# Typical log inspection
##################
scan.assert_no_error_logs()
scan.assert_no_checks_fail()

# Advanced methods to inspect scan execution logs 
#################################################
scan.has_error_logs()
scan.get_error_logs_text()

# Advanced methods to review check results details
########################################
scan.get_checks_fail()
scan.has_check_fails()
scan.get_checks_fail_text()
scan.assert_no_checks_warn_or_fail()
scan.get_checks_warn_or_fail()
scan.has_checks_warn_or_fail()
scan.get_checks_warn_or_fail_text()
scan.get_all_checks_text()
```


## Scan exit codes

Soda Core's scan output includes an exit code which indicates the outcome of the scan.

| 0 | all checks passed, all good from both runtime and Soda perspective |
| 1 | Soda issues a warning on a check(s) |
| 2 | Soda issues a failure on a check(s) |
| 3 | Soda encountered a runtime issue |


## Configure a failed row sampler

Optionally, you can add a custom sampler to collect samples of rows with a `fail` check result. Refer to the following example that prints the failed row samples in the CLI.

```python
from soda.scan import Scan
from soda.sampler.sampler import Sampler
from soda.sampler.sample_context import SampleContext


# Create a custom sampler by extending the Sampler class
class CustomSampler(Sampler):
    def store_sample(self, sample_context: SampleContext):
        # Retrieve the rows from the sample for a check
        rows = sample_context.sample.get_rows()
        # Check SampleContext for more details that you can extract
        # This example simply prints the failed row samples
        print(sample_context.query)
        print(sample_context.sample.get_schema())
        print(rows)


if __name__ == '__main__':
    # Create Scan object
    s = Scan()
    # Configure an instance of custom sampler
    s.sampler = CustomSampler()

    s.set_scan_definition_name("test_scan")
    s.set_data_source_name("aa_vk")
    s.add_configuration_yaml_str(f"""
    data_source test:
      type: postgres
      schema: public
      connection:
        host: localhost
        port: 5433
        username: ***
        password: ***
        database: postgres
    """)

    s.add_sodacl_yaml_str(f"""
    checks for dim_account:
        - invalid_percent(account_type) = 0:
            valid format: email

    """)
    s.execute()
    print(s.get_logs_text())
```

### Save failed row samples to alternate desination

If you prefer to send the output of the failed row sampler to a destination other than Soda Cloud, you can do so by customizing the sampler as above, then using the Python API to save the rows to a JSON file. Refer to <a href="https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" target="_blank">docs.python.org</a> for details.


## Go further
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
* Learn more about configuring [orchestrated scans]({% link soda-core/orchestrate-scans.md %}).


---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
