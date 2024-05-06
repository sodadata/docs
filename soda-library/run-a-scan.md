---
layout: default
title: Run a scan and view results
description:  Soda uses the input in the checks and data source connection configurations to prepare a scan that it runs against the data in a dataset.
parent: Run scans and view results
redirect_from:
- /soda-core/first-scan.html
- /soda-core/scan-reference.html
- /soda-core/scan-core.html
- /soda-cloud/scan-output.html
- /soda-library/cli-reference.html
---

# Run a scan and view results
*Last modified on {% last_modified_at %}*

Soda uses checks and the data source connection configurations to prepare a scan that it runs against datasets to extract metadata and gauge data quality.

A check is a test that Soda performs when it scans a dataset in your data source. Soda uses the checks you defined as no-code checks in Soda Cloud, or wrote in a checks YAML file, to prepare SQL queries that it runs against the data in a dataset. Soda can execute multiple checks against one or more datasets in a single scan.

As a step in the **Get started roadmap**, this guide offers instructions to schedule a Soda scan, run a scan, or invoke a scan programmatically.

#### Get started roadmap

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777"> Set up Soda: install, deploy, or invoke</font></s>
3. <s><font color="#777777"> Write SodaCL checks</font></s>
4. **Run scans and review results** 📍 You are here! <br />
&nbsp;&nbsp;&nbsp;&nbsp; a. [Scan for data quality](#scan-for-data-quality)<br />
&nbsp;&nbsp;&nbsp;&nbsp; b. [View scan results](#view-scan-results)<br />
5. Organize, alert, investigate

## Scan for data quality

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <input class="radio" id="three" name="group" type="radio">
  <input class="radio" id="four" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Schedule a scan</label>
  <label class="tab" id="two-tab" for="two">Run a scan</label>
  <label class="tab" id="three-tab" for="three">Program a scan</label>
  <label class="tab" id="four-tab" for="four">Remotely run a scan</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

### Set a scan definition in a no-code check
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Core</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Requires Soda Agent + Soda Cloud</small><br />
<br />

When you create a no-code check in Soda Cloud, one of the required fields asks that you associate the check with an existing scan definition, or that you create a new scan definition.

If you wish to change a no-code check's existing scan definition:
1. As an Admin, or Manager or Editor of a dataset in which the no-code check exists, navigate to the dataset.
2. From the dataset's page, locate the check you wish to adjust, and click the stacked dots at right, then select **Edit Check**. You can only edit a check via the no-code interface if it was first created as a no-code check, as indicated by the cloud icon in the **Origin** column of the table of checks.
3. Adjust the value in the **Add to Scan Definition** field as needed, then save. Soda executes the check during the next scan according to the definition you selected.

If you wish to schedule a *new* scan to execute a no-code check more or less frequently, or at a different time of day:
1. From the dataset's page, locate the check you wish to adjust and click the stacked dots at right, then select **Edit Check**. You can only edit a check via the no-code interface if it was first created as a no-code check, as indicated by the cloud icon in the **Origin** column of the table of checks.
2. Use the dropdown in the **Add to Scan Definition** field to access the **create a new Scan Definition** link. 
3. Fill out the form to define your new scan definition, then save it. Save the change to your no-code check. Soda executes the check during the next scan according to your new definition.

### Set a scan definition in an agreement
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Core</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Requires Soda Agent + Soda Cloud</small><br />
<br />

When you create a Soda Agreement in Soda Cloud, the last step in the flow demands that you select a **scan definition**. The scan definition indicates which Soda Agent to use to execute the scan, on which data source, and when. Effectively, a scan definition defines the what, when, and where to run a scheduled scan.

If you wish to change an agreement's existing scan definition:
1. Navigate to **Agreements**, then click the stacked dots next to the agreement you wish to change and select **Edit Agreement**.
2. In the **Set a Scan schedule** tab, then use the dropdown menu to select a different scan definition.
3. **Save** your change. The agreement edit triggers a new stakeholder approval request to all stakeholders. Your revised agreement *does not run again* until all stakehoders have approved it.

If you wish to schedule a *new* scan to execute the checks in an agreement more or less frequently, or at a different time of day:
1. Navigate to **Agreements**, then click the stacked dots next to the agreement you wish to change and select **Edit Agreement**.
2. In the **Set a Scan schedule** tab, then click the **new Scan Definition** link and populate the fields as in the example below.
3. **Save** your change. The agreement edit triggers a new stakeholder approval request to all stakeholders. Your revised agreement *does not run again* until all stakehoders have approved it.

![new-scan-sched](/assets/images/new-scan-sched.png){:height="600px" width="600px"}

  </div>
  <div class="panel" id="two-panel" markdown="1">

[Run a scan for a no-code check](#run-a-scan-for-a-no-code-check)<br />
[Run a scan in an agreement](#run-a-scan-in-an-agreement)<br />
[Run a scan from the command-line](#run-a-scan-from-the-command-line)<br />
[Input scan-time variables](#input-scan-time-variables)<br />
[Prevent pushing scan results to Soda Cloud](#prevent-pushing-scan-results-to-soda-cloud)
[Configure the same scan to run in multiple environments](#configure-the-same-scan-to-run-in-multiple-environments)<br />
[Add scan options](#add-scan-options)<br />
[Troubleshoot](#troubleshoot)<br />


### Run a scan for a no-code check
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Core</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Requires Soda Agent + Soda Cloud</small><br />
<br />

If you wish to run a scan immediately to see the scan results for a no-code check, you can execute an ad hoc scan for a single check.

1. As an Admin, or Manager or Editor of a dataset with the no-code check you wish to execute, navigate to the dataset.
2. In the table of checks, locate the check you wish to execute and click the stacked dots, then select **Execute Check**. Alternatively, click the check and in the check's page, click **Execute**. You can only execute an individual check if it was first created as a no-code check, as indicated by the cloud icon in the **Origin** column of the table of checks.
3. Soda executes *only* your check.

You can also run and ad hoc scan to execute all checks associated with a scan definition. 

1. In Soda Cloud, navigate to Scans.
2. In the list of scan definitions, click the one that is associated with the checks you wish to execute. 
3. In the scan definition page, click **Run Scan** to immediately execute all checks that use this scan definition.

### Run a scan in an agreement
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Core</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Requires Soda Agent + Soda Cloud</small><br />
<br />

{% include ad-hoc-scan.md %}


### Run a scan from the command-line
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Agent + Soda Cloud</small><br />
<br />

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

<br />

### Input scan-time variables
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Agent + Soda Cloud</small><br />
<br />

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
soda scan -d aws_postgres_retail duplicate_count_filter.yml -c configuration.yml -v date=2022-07-25 -v name='rowcount check'
```

### Prevent pushing scan results to Soda Cloud

If you wish, you can execute a scan using the Soda Library CLI and avoid sending any scan results to Soda Cloud. This is useful if, for example, you are testing checks locally and do not wish to muddy the measurements in your Soda Cloud account with test run metadata.

To do so, add a `--local` option to your scan command in the CLI, as in the following example.

```shell
soda scan -d aws_postgres_retail -c configuration.yml checks.yml --local
```

### Configure the same scan to run in multiple environments

When you want to run a scan that executes the same checks on different environments or schemas, such as development, production, and staging, you must apply the following configurations to ensure that Soda Cloud does not incomprehensibly merge the checks results from scans of multiple environments.

1. In your `configuration.yml` file, provide separate connection configurations for each environment, as in the following example.
```yaml
data_source nyc_dev:
  type: postgres
  host: host
  port: '5432'
  username: ${POSTGRES_USER}
  password: ${POSTGRES_PASSWORD}
  database: postgres
  schema: staging
data_source nyc_prod:
  type: postgres
  host: host
  port: '5432'
  username: ${POSTGRES_USER}
  password: ${POSTGRES_PASSWORD}
  database: postgres
  schema: public
```
2. Provide a `scan definition` name at scan time using the `-s` option. The scan definition helps Soda Cloud to distinguish different scan contexts and therefore plays a crucial role when the `checks.yml` file names and the checks themselves are the same.
```shell
# for NYC data source for dev
soda scan -d nyc_dev -c configuration.yml -s nyc_a checks.yml
# for NYC data source for prod
soda scan -d nyc_prod -c configuration.yml -s nyc_b checks.yml
```

See also: [Troubleshoot missing check results]({% link soda-cl/troubleshoot.md %}#missing-check-results-in-soda-cloud)<br />
See also: [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity)


### Add scan options

When you run a scan in Soda Library, you can specify some options that modify the scan actions or output. Add one or more of the following options to a `soda scan` command.

| Option | Required | Description and examples |
| ------ | :------: | ---------------------- |
| `-c TEXT` or<br /> `--configuration TEXT` | ✓ | Use this option to specify the file path and file name for the configuration YAML file.|
| `-d TEXT` or<br /> `--data-source TEXT` |  ✓ | Use this option to specify the data source that contains the datasets you wish to scan.|
| `-l` or<br /> `--local` |  | Use this local option to prevent Soda Library from pushing check results or any other metadata to Soda Cloud. |
| `-s TEXT` or<br /> `--scan-definition TEXT` |  | Use this option to provide a scan definition name so that Soda Cloud keeps check results from different environments (dev, prod, staging) separate. See [Configure a single scan to run in multiple environments](#configure-the-same-scan-to-run-in-multiple-environments).|
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
Because Soda Library pushes scan results to Soda Cloud, you may not want to change the scan definition name with each scan. Soda Cloud uses the scan definition name to correlate subsequent scan results, thus retaining a historical record of the measurements over time. <br /> Sometimes, changing the name is useful, like when you wish to [Configure a single scan to run in multiple environments](#configure-the-same-scan-to-run-in-multiple-environments). Be aware, however, that if you change the scan definition name with each scan for the same environment, Soda Cloud recognizes each set of scan results as independent from previous scan results, thereby making it appear as though it records a new, separate check result with each scan and archives or "disappears" previous results. See also: [Missing check results in Soda Cloud]({% link soda-cl/troubleshoot.md %}#missing-check-results-in-soda-cloud)

<br />

**Problem:** In a Windows environment, you see an error that reads `[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (ssl_c:997)`.

**Short-term solution:** Use `pip install pip-system-certs` to temporarily resolve the issue. This install works to resolve the issue only on Windows machines where the Ops team installs all the certificates needed through Group Policy Objects, or similar. However, the fix is short-term because when you try to run this in a pipeline on another machine, the error will reappear.

**Short-term solution:** Contact your Operations or System Admin team to obtain the proxy certificate.

  </div>
  <div class="panel" id="three-panel" markdown="1">

### Run a basic programmatic scan using Python
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Agent + Soda Cloud</small><br />
<br />

Based on a set of conditions or a specific event schedule, you can programmatically invoke Soda Library to automatically scan a data source. For example, you may wish to scan your data at several points along your data pipeline, perhaps when new data enters a data source, after it is transformed, and before it is exported to another data source.

{% include custom-sampler.md %}

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
# 2) Inline in the code
scan.add_configuration_yaml_str(
    """
    data_source events:
      type: snowflake
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

  </div>
  <div class="panel" id="four-panel" markdown="1">

[Trigger a scan via API](#trigger-a-scan-via-api)<br />
[Run a Soda Cloud scan from the command-line](#run-a-soda-cloud-scan-from-the-command-line)<br />
<br />

### Trigger a scan via API
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Core</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Requires Soda Agent + Soda Cloud</small><br />
<br />

You can programmatically initiate a scan your team defined in Soda Cloud using the Soda Cloud API. 

If you have defined a [scan definition]({% link soda/glossary.md %}#scan-definition) in Soda Cloud, and the scan definition executes on a schedule via a self-hosted or Soda-hosted agent, and you have [Admin]({% link soda-cloud/roles-and-rights.md %}) rights in your Soda Cloud account, you can use the API to:
* retrieve information about checks and datasets in your Soda Cloud account 
* execute scans
* retrieve information about the state of a scan during execution
* access the scan logs of an executed scan

Access the [Soda Cloud API]({% link api-docs/public-cloud-api-v1.md %}) documentation to get details about how to programmatically get info and execute Soda Cloud scans.

<br />

### Run a Soda Cloud scan from the command-line
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✖️ &nbsp;&nbsp; Requires Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Requires Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Requires Soda Agent + Soda Cloud</small><br />
<br />

You can initiate a scan your team defined in Soda Cloud using the Soda Library CLI.

If you have defined a [scan definition]({% link soda/glossary.md %}#scan-definition) in Soda Cloud, and the scan definition executes on a schedule via a self-hosted or Soda-hosted agent, and you have [Admin]({% link soda-cloud/roles-and-rights.md %}) rights in your Soda Cloud account, you can use Soda Library CLI to: 
* execute a remote scan and synchronously receive logs of the scan execution result
* execute a remote scan and asynchronously retrieve status and logs of the scan during, and after its execution

<br />

To execute a remote scan and synchonously receive scan results:
1. In Soda Cloud, navigate to **Scans**, then, from the list of scans, click to open the one which you wish to execute remotely.
2. To retrieve the scan definition ID that you need for the remote scan command, copy the scan definition identifier; see image below.
![scan-def-id](/assets/images/scan-def-id.png){:height="600px" width="600px"}
3. Run the following command to execute the Soda Cloud scan remotely, where the value of the `-s` option is the scan definition identifier you copied from the URL.
```shell
soda scan -c configuration.yml --remote -s paxstats_default_scan
```
4. The Soda Agent that executes your scan definition proceeds to run the scan and returns the result of the scan in the CLI output. A truncated example follows. <br />Notice that the version of Soda Library that you use to execute the remote scan command *may be different* from the version of Soda Library that is deployed as an Agent in your environment and which performs the actual scan execution. This does not present any issues for remote scan execution.
```shell
Soda Library 1.3.x
Soda Core 3.0.x
By downloading and using Soda Library, you agree to Sodas Terms & Conditions (https://go.soda.io/t&c) and Privacy Policy (https://go.soda.io/privacy). 
Remote scan sync mode
Remote Scan started.
Status URL: https://dev.sodadata.io/api/v1/scans/14b38f00-bc69-47dc-801b-676e676e676
Waiting for remote scan to complete.
Remote scan completed.
Fetching scan logs.
Scan logs fetched.
Soda Library 1.2.4
Soda Core 3.0.47
Reading configuration file "datasources/soda_cloud_configuration.yml"
Reading configuration file "datasources/configuration_paxstats.yml"
...
Scan summary:
48/48 queries OK
  paxstats.discover-tables-find-tables-and-row-counts [OK] 0:00:00.156126
  ...
2/2 checks PASSED: 
    paxstats in paxstats
      anomaly score for row_count < default [scan_definitions/paxstats_default_scan/automated_monitoring_paxstats.yml] [PASSED]
        check_value: None
      Schema Check [scan_definitions/paxstats_default_scan/automated_monitoring_paxstats.yml] [PASSED]
        schema_measured = [id integer, index integer, activity_period character varying, operating_airline character varying, ...]
All is good. No failures. No warnings. No errors.
Sending results to Soda Cloud
Soda Cloud Trace: 3015***
```
5. In your Soda Cloud account, refresh the scan definition page to display the results of the scan you ran remotely. 

<br />

To execute a remote scan and asynchonously retrieve the status and results of the scan:
1. In Soda Cloud, navigate to **Scans**, then, from the list of scans, click to open the one which you wish to execute remotely.
2. To retrieve the scan definition ID that you need for the remote scan command, copy the scan definition identifier; see image below. 
![scan-def-id](/assets/images/scan-def-id.png){:height="600px" width="600px"}
3. Run the following command to execute the Soda Cloud scan remotely, where the value of the `-s` option is the scan definition identifier you copied from the URL.
```shell
soda scan -c configuration.yml --remote -s paxstats_default_scan -rm async
```
4. The Soda Agent that executes your scan definition proceeds to run the scan. The agent does not automatically return scan status or logs to the CLI output. Instead, it returns a unique value for `Status URL`. Copy the last part of the URL that identifies the scan you started.
```shell
[10:38:36] Soda Library 1.3.3
[10:38:36] Soda Core 3.0.47
[10:38:36] By downloading and using Soda Library, you agree to Sodas Terms & Conditions (https://go.soda.io/t&c) and Privacy Policy (https://go.soda.io/privacy). 
[10:38:38] Remote scan async mode
[10:38:39] Remote Scan started.
[10:38:39] Status URL: https://cloud.soda.io/api/v1/scans/4651ba64-04ae-4b21-9fad-552314552314
[10:38:39] Remote scan started in async mode.
```
5. To retrieve the status of the scan as it executes and completes, use the following command, pasting the value you copied from the `Status URL` as the scan identifier. Refer to the [Soda Cloud API documentation](https://docs.soda.io/api-docs/public-cloud-api-v1.html#/operations/GET/api/v1/scans/{scanId}) for the possible status messages the Soda Agent can return. <br />Notice that the version of Soda Library that you use to execute the remote scan command *may be different* from the version of Soda Library that is deployed as an Agent in your environment and which performs the actual scan execution. This does not present any issues for remote scan execution.
```shell
soda scan-status -c configuration.yml -s 4651ba64-04ae-4b21-9fad-552314552314
```
Truncated output:
```shell
Soda Library 1.3.3
Soda Core 3.0.47
Retrieving state of the scan '4651ba64-04ae-4b21-9fad-552314552314'.
Current state of the scan: 'completed'.
Fetching scan logs.
Parsing scan logs.
Soda Library 1.2.4
Soda Core 3.0.47
Reading configuration file "datasources/soda_cloud_configuration.yml"
Reading configuration file "datasources/configuration_paxstats.yml"
...
Scan summary:
48/48 queries OK
  paxstats.discover-tables-find-tables-and-row-counts [OK] 0:00:00.156002
  ...
2/2 checks PASSED: 
    paxstats in paxstats
      anomaly score for row_count < default [scan_definitions/paxstats_default_scan/automated_monitoring_paxstats.yml] [PASSED]
        check_value: None
      Schema Check [scan_definitions/paxstats_default_scan/automated_monitoring_paxstats.yml] [PASSED]
        schema_measured = [id integer, index integer, activity_period character varying, ...]
All is good. No failures. No warnings. No errors.
Sending results to Soda Cloud
Soda Cloud Trace: 6974126***
```
6. In your Soda Cloud account, refresh the scan definition page to display the results of the scan you ran remotely.

  </div>

  </div>
</div>


#### Troubleshoot

**Problem:** When running a programmatic scan or a scan from the command-line, I get an error that reads `Error while executing Soda Cloud command response code: 400`.

**Solution:** While there may be several reasons Soda returns a 400 error, you can address the following which may resolve the issue:
* Upgrade to the [latest version]({% link soda/upgrade.md %}#upgrade-soda-library) of Soda Library.
* Confirm that all the checks in your checks YAML file identify a dataset against which to execute. For example, the following syntax yields a 400 error because the `checks:` does not identify a dataset.

```yaml
checks:
    - schema:
        warn:
            when schema changes: any
```
<br />


## View scan results

[Scan failed](#scan-failed)<br />
[Examine scan logs](#examine-scan-logs)<br />
[Examine a scan's SQL queries in the command-line output](#examine-a-scans-sql-queries-in-the-command-line-output)<br />
[Programmatically use scan output](#programmatically-use-scan-output)<br />
<br />


Soda Cloud displays the latest status of all of your checks in the **Checks** dashboard. There two methods through which a check and its latest result appears on the dashboard.
* When you define checks in a checks YAML file and use Soda Library to run a scan, the checks and their latest results manifest in the **Checks** dashboard in Soda Cloud.
* Any time Soda Cloud runs a scheduled scan of your data as part of an agreement, it displays the checks and their latest results in the **Checks** dashboard.

{% include scan-output.md %}



### Scan failed

Check results indicate whether check passed, warned, or failed during the scan. However, if a scan itself failed to complete successfully, Soda Cloud displays a warning in the **Datasets** dashboard to indicate the dataset for which a scheuled scan has failed. 

See [Manage scheduled scans]({% link soda-cloud/scan-mgmt.md %}) for instructions on how to set up scan failure alerts.

![scan-failed](/assets/images/scan-failed.png){:height="550px" width="550px"}


### Examine scan logs

{% include scan-logs.md %}

Alternatively, you can access the scan logs from within an agreement.

1. To examine a detailed scan log of the lastest scan for an agreement, navigate to **Agreements**, then click to select an agreement.
2. In the **Agreement** dashboard, click **See results** in the **Last scan** tile, then click the **Scan Logs** tabs.

![scan-logs](/assets/images/scan-logs.png){:height="550px" width="550px"}


### Examine a scan's SQL queries in the command-line output

To examine the SQL queries that Soda Library prepares and executes as part of a scan, you can add the `-V` option to your `soda scan` command. This option prints the queries as part of the scan results.
{% include code-header.html %}
```shell
soda scan -d postgres_retail -c configuration.yml -V checks.yml
```


### Programmatically use scan output

Optionally, you can insert the output of Soda Library scans into your data orchestration tool such as Dagster, or Apache Airflow.

You can save Soda Library scan results anywhere in your system; the `scan_result` object contains all the scan result information. To import the Soda Library library in Python so you can utilize the `Scan()` object, install a Soda Library package, then use `from soda.scan import Scan`. Refer to [Define programmatic scans]({% link soda-library/programmatic.md %}) and [Test data in a pipeline]({% link soda/quick-start-prod.md %}) for details.
<br />

## Next

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777">Set up Soda: install, deploy, or invoke</font></s>
3. <s><font color="#777777">Write SodaCL checks</font></s>
4. <s><font color="#777777">Run scans and review results</font></s>
5. **[Organize, alert, investigate]({% link soda-cloud/collaborate.md %})**

Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
