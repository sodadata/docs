---
layout: default
title: Invoke Soda Library
description: Use Soda Library to programmatically execute scans and automate the checks for bad-quality data.
parent: Get started
redirect_from:
- /soda-core/programmatic-scans.html
- /soda-core/programmatic.html
---

# Invoke Soda Library
*Last modified on {% last_modified_at %}*

To automate the search for bad-quality data, you can use **Soda library** to programmatically set up and execute scans. As a Python library, you can invoke Soda just about anywhere you need it; the invocation instructions below offers a very simple invocation example to extrapolate from. Consult the [Use case guides]({% link soda/use-case-guides.md %}) for more examples of how to programmatically run Soda scans for data quality.

Alternatively, you can install and use the Soda Library CLI to run scans; see [Install Soda Library]({% link soda-library/install.md %}). 

As a step in the **Get started roadmap**, this guide offers instructions to set up, install, and configure Soda in a [programmatic deployment model]({% link soda/setup-guide.md %}#programmatic).

#### Get started roadmap

1. <s><font color="#777777"> Choose a flavor of Soda </font></s> 
2. **Set up Soda: programmatic** 📍 You are here! <br />
&nbsp;&nbsp;&nbsp;&nbsp; a. [Review requirements](#requirements)<br />
&nbsp;&nbsp;&nbsp;&nbsp; b. [Create a Soda Cloud account](#create-a-soda-cloud-account)<br />
&nbsp;&nbsp;&nbsp;&nbsp; c. [Set up basic programmatic invocation in Python](#set-up-basic-programmatic-invocation-in-python)<br />
3. Write SodaCL checks 
4. Run scans and review results 
5. Organize, alert, investigate 

<br />

## Requirements

To use Soda Library, you must have installed the following on your system.

* Python 3.8 or greater
* Pip 21.0 or greater
* A Soda Cloud account; see next section.

## Create a Soda Cloud account

1. In a browser, navigate to <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank">cloud.soda.io/signup</a> to create a new Soda account, which is free for a 45-day trial. If you already have a Soda account, log in. 
2. Navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys. 
3. Copy+paste the API key values to a temporary, secure place in your local environment.

<details>
    <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
To validate your account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library. <br /><a href="https://docs.soda.io/soda/get-started-roadmap.html#about-soda">Learn more</a><br /><br />
</details>

## Set up basic programmatic invocation in Python

As in the simple example below, invoke the Python library and provide:
* your data source connection configuration details, including environment variables, using one of the listed methods; consult [Data source reference]({% link soda/connect-athena.md %}) for data source-specific connection config
* your Soda Cloud account API key values: use cloud.soda.io for EU region; use cloud.us.soda.io for US region

{% include code-header.html %}
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

# Set scan definition name, equivalent to CLI -s option;
# see Tips and best practices below
##################
scan.set_scan_definition_name("YOUR_SCHEDULE_NAME")


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

## Tips and best practices

* You can save Soda Library scan results anywhere in your system; the `scan_result` object contains all the scan result information. To import Soda Library in Python so you can utilize the `Scan()` object, [install a Soda Library package]({% link soda-library/install.md %}), then use `from soda.scan import Scan`.
* Be sure to include any variables in your programmatic scan *before* the check YAML files. Soda requires the variable input for any variables defined in the check YAML files. 
* Because Soda Library pushes scan results to Soda Cloud, you may not want to change the scan definition name with each scan. Soda Cloud uses the scan definition name to correlate subsequent scan results, thus retaining an historical record of the measurements over time. <br /> Sometimes, changing the name is useful, like when you wish to configure a single scan to run in multiple environments. Be aware, however, that if you change the scan definition name with each scan for the same environment, Soda Cloud recognizes each set of scan results as independent from previous scan results, thereby making it appear as though it records a new, separate check result with each scan and archives or "disappears" previous results. See also: [Missing check results in Soda Cloud]({% link soda-cl/troubleshoot.md %}#missing-check-results-in-soda-cloud)

## Scan exit codes

Soda Library's scan output includes an exit code which indicates the outcome of the scan.

| 0 | all checks passed, all good from both runtime and Soda perspective |
| 1 | Soda issues a warning on a check(s) |
| 2 | Soda issues a failure on a check(s) |
| 3 | Soda encountered a runtime issue |

To obtain the exit code, you can add the following to your programmatic scan.
{% include code-header.html %}
```python
exit_code = scan.execute()
print(exit_code)
```


## Next

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777">Set up Soda: programmatic</font></s> 
3. **[Write SodaCL checks]({% link soda-cl/soda-cl-overview.md %})**
4. Run scans and review results
5. Organize, alert, investigate


Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />
---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
