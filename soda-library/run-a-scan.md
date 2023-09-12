---
layout: default
title: Run a Soda scan
description:  Soda uses the input in the checks and data source connection configurations to prepare a scan that it runs against the data in a dataset.
parent: Run scans, review results
redirect_from:
- /soda-core/first-scan.html
- /soda-core/scan-reference.html
- /soda-core/scan-core.html
---

# Run a Soda scan 
*Last modified on {% last_modified_at %}*

Soda uses checks and the data source connection configurations to prepare a scan that it runs against datasets to extract metadata and gauge data quality. 

A check is a test that Soda performs when it scans a dataset in your data source. Soda uses the checks you define in a Soda Agreement, or in checks YAML file, to prepare SQL queries that it runs against the data in a dataset. Soda can execute multiple checks against one or more datasets in a single scan. 

As a step in the **Get started roadmap**, this guide offers instructions to schedule a Soda scan, run a scan, or invoke a scan programmatically.

#### Get started roadmap

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777"> Set up Soda: self-operated</font></s>
3. <s><font color="#777777"> Write SodaCL checks</font></s>
4. **Run scans, review results** 📍 You are here! <br />
&nbsp;&nbsp;&nbsp;&nbsp; a. [Scan for data quality](#scan-for-data-quality)<br />
&nbsp;&nbsp;&nbsp;&nbsp; b. [Review scan output](#review-scan-output)<br />
5. Organize, alert, investigate

## Scan for data quality

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <input class="radio" id="three" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Schedule a scan</label>
  <label class="tab" id="two-tab" for="two">Run a scan</label>
  <label class="tab" id="three-tab" for="three">Program a scan</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

### Set a scan definition
*Requires Soda Agent*
<br/>*Requires Soda Cloud*

When you create a Soda Agreement in Soda Cloud, the last step in the flow demands that you select a **scan definition**. A scan definition is a collection of files that contain the checks for data quality you wish to scan at a specific time, including details for which Soda Agent to use to connect to which data source. Effectively, a scan definition provides the what, when, and where to run a scheduled scan.

If you wish to change an agreement's existing scan definition/scan schedule: 
1. Navigate to **Agreements**, then click the stacked dots next to the agreement you wish to change and select **Edit Agreement**.
2. In the **Set a Scan Defintion** tab, then use the dropdown menu to select a different scan schedule. 
3. **Save** your change. The agreement edit triggers a new stakeholder approval request to all stakeholders. Your revised agreement *does not run again* until all stakehoders have approved it.

If you wish to schedule a new scan to execute the checks in an agreement more or less frequently, or at a different time of day: 
1. Navigate to **Agreements**, then click the stacked dots next to the agreement you wish to change and select **Edit Agreement**.
2. In the **Set a Scan Defintion** tab, then click **new Scan Definition** and populate the fields as in the example below.
3. **Save** your change. The agreement edit triggers a new stakeholder approval request to all stakeholders. Your revised agreement *does not run again* until all stakehoders have approved it.

![new-scan-def](/assets/images/new-scan-def.png){:height="600px" width="600px"}

  </div>
  <div class="panel" id="two-panel" markdown="1">

[Run a scan in Soda Cloud](#run-a-scan-in-soda-cloud)<br />
[Run a scan from the command-line](#run-a-scan-from-the-command-line)<br />
[Input variables](#input-variables)<br />
[Configure the same scan to run in multiple environments](#configure-the-same-scan-to-run-in-multiple-environments)<br />
[Add scan options](#add-scan-options)<br />
[Troubleshoot](#troubleshoot)<br />

### Run a scan in Soda Cloud
*Requires Soda Agent*
<br/>*Requires Soda Cloud*

{% include ad-hoc-scan.md %}

### Run a scan from the command-line 
*Requires Soda Library*
<br/>*Requires Soda Cloud*

Each scan requires the following as input:

* the name of the data source that contains the dataset you wish to scan, identified using the `-d` option
* a `configuration.yml` file, which contains details about how Soda Library can connect to your data source, identified using the `-c` option
* a `checks.yml` file which contains the checks you write using SodaCL

Scan command:
{% include code-header.html %}
```shell
soda scan -d postgres_retail -c configuration.yml checks.yml
```
<br />

Note that you can use the `-c` option to include **multiple configuration YAML files** in one scan execution. Include the filepath of each YAML file if you stored them in a directory other than the one in which you installed Soda Library.
{% include code-header.html %}
```shell
soda scan -d postgres_retail -c other-directory/configuration.yml other-directory/checks.yml
```

<br />

You can also include **multiple checks YAML files** in one scan execution. Use multiple checks YAML files to execute different sets of checks during a single scan. 
{% include code-header.html %}
```shell
soda scan -d postgres_retail -c configuration.yml checks_stats1.yml checks_stats2.yml
```

<br />
Use the soda `soda scan --help` command to review options you can include to customize the scan. See also: [Add scan options](#add-scan-options).

### Input variables

There are several ways you can use variables in checks, filters, and in your data source configuration to pass values at scan time; a few examples follow. 

Refer to the comprehensive [Filters and variables]({% link soda-cl/filters.md %}) documentation for details.
{% include code-header.html %}
```yaml
# Dataset filter with variables
filter CUSTOMERS [daily]:
  where: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - row_count = 6
  - missing(cat) = 2

# In-check variable 
checks for ${DATASET}:
  - invalid_count(last_name) = 0:
      valid length: 10 
```

To provide a variable at scan time, as with dynamic dataset filters or with in-check values, add a `-v` option to the scan command and specify the key:value pair for the variable, as in the following example.
```shell
soda scan -d aws_postgres_retail -c configuration.yml -v TODAY=2022-03-31 checks.yml
```

If you wish, you can provide the value more than one variable at scan time, as in the following example.

```shell
soda scan -d aws_postgres_retail duplicate_count_filter.yml -v date=2022-07-25 -v name='rowcount check'
```


### Configure the same scan to run in multiple environments

{% include scan-multiple-envs.md %}

### Add scan options

When you run a scan in Soda Library, you can specify some options that modify the scan actions or output. Add one or more of the following options to a `soda scan` command.

| Option | Required | Description and examples |
| ------ | :------: | ---------------------- |
| `-c TEXT` or<br /> `--configuration TEXT` | ✓ | Use this option to specify the file path and file name for the configuration YAML file.|
| `-d TEXT` or<br /> `--data-source TEXT` |  ✓ | Use this option to specify the data source that contains the datasets you wish to scan.|
| `-s TEXT` or<br /> `--scan-definition TEXT` |  | Use this option to provide a [scan definition name]({% link soda/glossary.md %}#scan-definition-name) so that Soda Cloud keeps check results from different environments (dev, prod, staging) separate. See [Configure a single scan to run in multiple environments]({% link soda-library/configure.md %}#configure-the-same-scan-to-run-in-multiple-environments).|
| `-srf` or <br /> `--scan-results-file TEXT` |  | Specify the file name and file path to which Soda Library sends a JSON file of the scan results. You can use this in addition to, or instead of, sending results to Soda Cloud. <br /> `soda scan -d adventureworks -c configuration.yml -srf test.json checks.yml`|
| `-t TEXT` or<br /> `--data-timestamp TEXT` |  | Placeholder, only. |
| `-T TEXT` or<br /> `--template TEXT` | Use this option to specify the file path and file name for a [templates YAML]({% link soda-cl/check-template.md %}) file.|
| `-v TEXT` or<br /> `--variable TEXT` |  | Replace `TEXT` with variables you wish to apply to the scan, such as a [filter for a date]({% link soda-cl/filters.md %}). Put single or double quotes around any value with spaces. <br />  `soda scan -d my_datasource -v start=2020-04-12 -c configuration.yml checks.yml` |
| `V` or <br /> `--verbose` |  | Return scan output in verbose mode to review query details. |

### Troubleshoot

**Problem:** When you run a scan, you get an error that reads, `Exception while exporting Span batch.`

**Solution:** Without an internet connection, Soda Library is unable to communicate with `soda.connect.io` to transmit anonymous usage statistics about the software. <br /> If you are using Soda Library offline, you can resolve the issue by setting `send_anonymous_usage_stats: false` in your `configuration.yml` file. Refer to [Soda Library usage statistics]({% link soda-library/usage-stats.md %}) for further details.

<br />

**Problem:** Check results to be missing in Soda Cloud.

**Solution:** <br />
Because Soda Library pushes scan results to Soda Cloud, you may not want to change the scan definition name with each scan. Soda Cloud uses the scan definition name to correlate subsequent scan results, thus retaining a historical record of the measurements over time. <br /> Sometimes, changing the name is useful, like when you wish to [Configure a single scan to run in multiple environments]({% link soda-library/configure.md %}##configure-the-same-scan-to-run-in-multiple-environments). Be aware, however, that if you change the scan definition name with each scan for the same environment, Soda Cloud recognizes each set of scan results as independent from previous scan results, thereby making it appear as though it records a new, separate check result with each scan and archives or "disappears" previous results. See also: [Missing check results in Soda Cloud]({% link soda-cl/troubleshoot.md %}#missing-check-results-in-soda-cloud)

<br />

**Problem:** In a Windows environment, you see an error that reads `[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (ssl_c:997)`. 

**Short-term solution:** Use `pip install pip-system-certs` to temporarily resolve the issue. This install works to resolve the issue only on Windows machines where the Ops team installs all the certificates needed through Group Policy Objects, or similar. However, the fix is short-term because when you try to run this in a pipeline on another machine, the error will reappear.

**Short-term solution:** Contact your Operations or System Admin team to obtain the proxy certificate.

  </div>
  <div class="panel" id="three-panel" markdown="1">

### Run a basic programmatic scan using Python

Based on a set of conditions or a specific event schedule, you can programmatically invoke Soda Library to automatically scan a data source. For example, you may wish to scan your data at several points along your data pipeline, perhaps when new data enters a data source, after it is transformed, and before it is exported to another data source.

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

# Add variables
###############
scan.add_variables({"date": "2022-01-01"})


# Add check YAML files
##################
scan.add_sodacl_yaml_file("./my_programmatic_test_scan/sodacl_file_one.yml")
scan.add_sodacl_yaml_file("./my_programmatic_test_scan/sodacl_file_two.yml")
scan.add_sodacl_yaml_files("./my_scan_dir")
scan.add_sodacl_yaml_files("./my_scan_dir/sodacl_file_three.yml")


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

### Tips and best practices

* You can save Soda Library scan results anywhere in your system; the `scan_result` object contains all the scan result information. To import Soda Library in Python so you can utilize the `Scan()` object, [install a Soda Library package]({% link soda-library/install.md %}), then use `from soda.scan import Scan`.
* Be sure to include any variables in your programmatic scan *before* the check YAML files. Soda requires the variable input for any variables defined in the check YAML files. 


  </div>

  </div>
</div>

## Review scan output

add from scan-output

### Scan exit codes

Soda Library's scan output includes an exit code which indicates the outcome of the scan.

| 0 | all checks passed, all good from both runtime and Soda perspective |
| 1 | Soda issues a warning on a check(s) |
| 2 | Soda issues a failure on a check(s) |
| 3 | Soda encountered a runtime issue |

To obtain the exit code, you can add the following to a programmatic scan.
{% include code-header.html %}
```python
exit_code = scan.execute()
print(exit_code)
```

### Programmatically use scan output

Optionally, you can insert the output of Soda Library scans into your data orchestration tool such as Dagster, or Apache Airflow. 

You can save Soda Library scan results anywhere in your system; the `scan_result` object contains all the scan result information. To import the Soda Library library in Python so you can utilize the `Scan()` object, [install a Soda Library package]({% link soda-library/install.md %}), then use `from soda.scan import Scan`. Refer to [Define programmatic scans]({% link soda-library/programmatic.md %}) and [Test data in a pipeline]({% link soda/quick-start-prod.md %}) for details.


## Next

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777">Set up Soda: programmatic</font></s> 
3. <s><font color="#777777">Write SodaCL checks</font></s> 
4. <s><font color="#777777">Run scans, review results</font></s>
5. **[Organize, alert, investigate]({% link soda-cl/check-attributes.md %})**

Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}