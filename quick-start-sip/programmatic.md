---
description: >-
  Use Soda Library to programmatically execute scans and automate the checks for
  bad-quality data.
---

# Invoke Soda Library

{% hint style="warning" %}
The Soda environment has been updated since this tutorial.

> Refer to [v4 documentation](https://app.gitbook.com/s/A2PmHkO5cBgeRPdiPPOG/quickstart) for updated tutorials.
{% endhint %}

To automate the search for bad-quality data, you can use **Soda library** to programmatically set up and execute scans. As a Python library, you can invoke Soda just about anywhere you need it; the invocation instructions below offers a very simple invocation example to extrapolate from. Consult the [Use case guides](../use-case-guides/) for more examples of how to programmatically run Soda scans for data quality.

Alternatively, you can install and use the Soda Library CLI to run scans; see [Install Soda Library](install.md).

As a step in the **Get started roadmap**, this guide offers instructions to set up, install, and configure Soda in a [programmatic deployment model](setup-guide.md#programmatic).

#### Get started roadmap

1. ~~Choose a flavor of Soda~~
2. **Set up Soda: programmatic** 📍 You are here!\
   &#x20;    a. [Review requirements](programmatic.md#requirements)\
   &#x20;    b. [Create a Soda Cloud account](programmatic.md#create-a-soda-cloud-account)\
   &#x20;    c. [Set up basic programmatic invocation in Python](programmatic.md#set-up-basic-programmatic-invocation-in-python)
3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate

## Requirements

To use Soda Library, you must have installed the following on your system.

* Python 3.8, 3.9, or 3.10
* Pip 21.0 or greater
* A Soda Cloud account; see next section.
* A Soda Cloud account; see next section.

<details>

<summary>Python versions Soda supports</summary>

Soda officially supports Python versions 3.8, 3.9, and 3.10.\
Though largely functional, efforts to fully support Python 3.11 and 3.12 are ongoing.\
\
Using Python 3.11, some users might have some issues with dependencies constraints. At times, extra the combination of Python 3.11 and dependencies constraints requires that a dependency be built from source rather than downloaded pre-built.\
\
The same applies to Python 3.12, although there is some anecdotal evidence that indicates that 3.12 might not work in all scenarios due to dependencies constraints.

</details>

## Create a Soda Cloud account

1. In a browser, navigate to [cloud.soda.io/signup](https://cloud.soda.io/signup?utm_source=docs) to create a new Soda account, which is free for a 45-day trial. If you already have a Soda account, log in.
2. Navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys.
3. Copy+paste the API key values to a temporary, secure place in your local environment.

<details>

<summary>Why do I need a Soda Cloud account?</summary>

To validate your account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library. [Learn more](get-started-roadmap.md#about-soda)

</details>

## Set up basic programmatic invocation in Python

As in the simple example below, invoke the Python library and provide:

* your data source connection configuration details, including environment variables, using one of the listed methods; consult [Data source reference](../data-source-reference/) for data source-specific connection config
* your Soda Cloud account API key values:
  * use cloud.soda.io for EU region
  * use cloud.us.soda.io for US region

Use the following guidance for optional elements of a programmatic scan.

* You can save Soda Library scan results anywhere in your system; the `scan_result` object contains all the scan result information. To import Soda Library in Python so you can utilize the `Scan()` object, [install a Soda Library package](programmatic.md#set-up-basic-programmatic-invocation-in-python), then use `from soda.scan import Scan`.
* If you provide a name for the scan definition to identify inline checks in a programmatic scan as independent of other inline checks in a different programmatic scan or pipeline, be sure to set a unique scan definition name for each programmatic scan. Using the same scan definition name in multiple programmatic scans results in confused check results in Soda Cloud.
* If you wish to collect samples of failed rows when a check fails, you can employ a custom sampler; see [Configure a failed row sampler](../run-a-scan/failed-row-samples.md#configure-a-python-custom-sampler).
* Be sure to include any variables in your programmatic scan _before_ the check YAML files. Soda requires the variable input for any variables defined in the check YAML files.

```python
from soda.scan import Scan

scan = Scan()
scan.set_data_source_name("events")

# Add configuration YAML files
#########################
# Choose one of the following to specify data source connection configurations :
# 1) From a file
scan.add_configuration_yaml_file(file_path="~/.soda/my_local_soda_environment.yml")
# 2) Inline in the code
# For host, use cloud.soda.io for EU region; use cloud.us.soda.io for US region
scan.add_configuration_yaml_str(
    """
    data_source events:
      type: snowflake
      host: ${SNOWFLAKE_HOST}
      username: ${SNOWFLAKE_USERNAME}
      password: ${SNOWFLAKE_PASSWORD}
      database: events
      schema: public

    soda_cloud:
      host: cloud.soda.io
      api_key_id: 2e0ba0cb-your-api-key-7b
      api_key_secret: 5wd-your-api-key-secret-aGuRg
      scheme:
"""
)

# Add variables
###############
scan.add_variables({"date": "2022-01-01"})


# Add check YAML files
##################
scan.add_sodacl_yaml_file("./my_programmatic_test_scan/sodacl_file_one.yml")
scan.add_sodacl_yaml_file("./my_programmatic_test_scan/sodacl_file_two.yml")
scan.add_sodacl_yaml_files("./my_scan_dir")
scan.add_sodacl_yaml_files("./my_scan_dir/sodacl_file_three.yml")

# OR

# Define checks using SodaCL
##################
checks = """
checks for cities:
    - row_count > 0
"""

# Add template YAML files, if used
##################
scan.add_template_files(template_path)


# Add the checks to the scan
####################
scan.add_sodacl_yaml_str(checks)

# OR Add the checks to scan with virtual filename identifier
# for advanced use cases such as partial/concurrent scans
####################
scan.add_sodacl_yaml_str(
    checks
    file_name=f"checks-{scan_name}.yml",
)

# Execute the scan
##################
scan.execute()


# Set logs to verbose mode, equivalent to CLI -V option
##################
scan.set_verbose(True)

# Set scan definition name, equivalent to CLI -s option
# The scan definition name MUST be unique to this scan, and
# not duplicated in any other programmatic scan
##################
scan.set_scan_definition_name("YOUR_SCHEDULE_NAME")

# Do not send results to Soda Cloud, equivalent to CLI -l option;
##################
scan.set_is_local(True)


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

See the [Python API Reference page](../run-a-scan/python_api.md) for detailed documentation of the `Scan` class in Soda Library.

## Tips and best practices

* You can save Soda Library scan results anywhere in your system; the `scan_result` object contains all the scan result information. To import Soda Library in Python so you can utilize the `Scan()` object, [install a Soda Library package](install.md), then use `from soda.scan import Scan`.
* Be sure to include any variables in your programmatic scan _before_ the check YAML files. Soda requires the variable input for any variables defined in the check YAML files.
* Because Soda Library pushes scan results to Soda Cloud, you may not want to change the scan definition name with each scan. Soda Cloud uses the scan definition name to correlate subsequent scan results, thus retaining an historical record of the measurements over time.\
  Sometimes, changing the name is useful, like when you wish to configure a single scan to run in multiple environments. Be aware, however, that if you change the scan definition name with each scan for the same environment, Soda Cloud recognizes each set of scan results as independent from previous scan results, thereby making it appear as though it records a new, separate check result with each scan and archives or "disappears" previous results. See also: [Missing check results in Soda Cloud](../sodacl-reference/troubleshoot.md#missing-check-results-in-soda-cloud).

## Scan exit codes

Soda Library’s scan output includes an exit code which indicates the outcome of the scan.

|   |                                                                                      |
| - | ------------------------------------------------------------------------------------ |
| 0 | all checks passed, all good from both runtime and Soda perspective                   |
| 1 | Soda issues a warning on a check(s)                                                  |
| 2 | Soda issues a failure on a check(s)                                                  |
| 3 | Soda encountered a runtime issue, and was able to submit scan results to Soda Cloud  |
| 4 | Soda encountered a runtime issue, but was unable to submit any results to Soda Cloud |

To obtain the exit code, you can add the following to your programmatic scan.

```python
exit_code = scan.execute()
print(exit_code)
```

## Next

1. ~~Choose a flavor of Soda~~
2. ~~Set up Soda: programmatic~~
3. [**Write SodaCL checks**](../soda-cl-overview/)
4. Run scans and review results
5. Organize, alert, investigate

> Need help? Join the [Soda community on Slack](https://community.soda.io/slack).
