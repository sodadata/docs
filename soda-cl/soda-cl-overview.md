---
layout: default
title: SodaCL 
description: Soda Checks Language is a human-readable, domain-specific language for data reliability. You use SodaCL to define Soda Checks in a checks YAML file.
parent: SodaCL
redirect_from: 
- /soda-cl/
- /soda-core/soda-cl.html
---

# Write SodaCL checks 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Soda Checks Language: a human-readable, domain-specific language for data reliability. Add more.
{% include code-header.html %}
```yaml
# Checks for basic validations
checks for dim_customer:
  - row_count between 10 and 1000
  - missing_count(birth_date) = 0
  - invalid_percent(phone) < 1 %:
      valid format: phone number
  - invalid_count(number_cars_owned) = 0:
      valid min: 1
      valid max: 6
  - duplicate_count(phone) = 0
```
{% include code-header.html %}
```yaml
checks for dim_product:
  - avg(safety_stock_level) > 50
# Checks for schema changes
  - schema:
      name: Find forbidden, missing, or wrong type
      warn:
        when required column missing: [dealer_price, list_price]
        when forbidden column present: [credit_card]
        when wrong column type:
          standard_cost: money
      fail:
        when forbidden column present: [pii*]
        when wrong column index:
          model_name: 22
```
{% include code-header.html %}
```yaml
# Check for freshness 
  - freshness (start_date) < 1d
```
{% include code-header.html %}
```yaml
# Check for referential integrity
checks for dim_department_group:
  - values in (department_group_name) must exist in dim_employee (department_name)
```

## Define SodaCL checks

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <input class="radio" id="three" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda Cloud</label>
  <label class="tab" id="two-tab" for="two">Checks YAML</label>
  <label class="tab" id="three-tab" for="three">Programmatic</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

In Soda Cloud, you define SodaCL checks within an agreement. An agreement is a contract between stakeholders that stipulates the expected and agreed-upon state of data quality in a data source. 

Use SodaCL checks to define the state of "good quality" for data in this data source, then identify and get approval from stakeholders in your organization. Define whom Soda Cloud will notify when a check in this Agreement fails, then set a schedule to regularly execute the Soda Checks to uphold the tenets of the agreement.

## Prerequisites

* You have created a <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank">Soda Cloud account</a>.
* You, or an [Admin]({% link soda-cloud/roles-and-rights.md %}) on your Soda Cloud account, has [deployed a Soda Agent]({% link soda-agent/deploy.md %}) and connected it to your Soda Cloud account.
* You, or an [Admin]({% link soda-cloud/roles-and-rights.md %}) on your Soda Cloud account, has [added a new datasource]({% link soda-cloud/add-datasource.md %}) via the Soda Agent in your Soda Cloud account.
* (Optional) An Admin on your Soda Cloud account has [integrated with Slack]({% link soda/integrate-slack.md %}) or another [third-party service provider]({% link soda/integrate-webhooks.md %}) to enable Soda Cloud to send alert notifications to your team. If you do not integrate with another service-provider, Soda Cloud can send notifications via email.

## Create a new agreement

For a new agreement, you define several details including which data to check, what checks to execute during a scan, and whom to notify when bad data triggers an alert.

In Soda Cloud, navigate to the **Agreements** dashboard, then click **New Agreement**. Follow the guided steps to complete the new agreement. Use the sections below for insight into the values to enter in the fields and editing panels in the guided steps.  

#### 1. Select a Data Source

You can only create an agreement that uses a data source that has been added to Soda Cloud via a Soda Agent. See: [Prerequisites](#prerequisites) and [Add a data source]({% link soda-cloud/add-datasource.md %}#add-a-new-data-source).

| Field or Label  | Guidance |
| -----------------  | ----------- |
| Agreement Label  | Provide a name for your agreement. |
| Data Source | Select the data source that contains the datasets to which your agreement applies. <br /> If you have no options to select in the dropdown, it is because you have not added a data source via a Soda Agent. You can only create agreements on datasets that are in a data source that has been onboarded into Soda Cloud via a Soda Agent. <br /> See [Create a data source]({% link soda-cloud/add-datasource.md %}).|

<br />

#### 2. Write Checks

Use [SodaCL]({% link soda-cl/soda-cl-overview.md %}) to define the checks that Soda Cloud executes on a regular schedule to uphold the tenets of this agreement. If any of these checks fail during a regularly-scheduled scan, Soda Cloud notifies the stakeholders you specify in the Notifications section.

* For help writing your first checks, consider following the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}), including the [Tips and best practices]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl) section.
* Avoid applying the same [customized check names]({% link soda-cl/optional-config.md %}#customize-check-names) in multiple agreements. Soda Cloud associates check results with agreements according to name so if you reuse custom names, Soda Cloud may become confused about which agreement to which to link check results.
* Avoid using an [anomaly score check]({% link soda-cl/anomaly-score.md %}) to test the agreements workflow. The ML algorithm that anomaly score checks use requires a minimum of four, regular-frequency scans before it has collected enough historic measurements against which to gauge an anomaly. Consider using checks with [numeric]({% link soda-cl/numeric-metrics.md %}), [missing]({% link soda-cl/missing-metrics.md %}), or [validity]({% link soda-cl/validity-metrics.md %}) metrics, instead.
* Note that any checks you test in the context of this step in the agreements workflow _do not_ appear as "real" checks in the **Checks** dashboard. 
* Do not use variables to define dynamic values in your checks as you cannot provide scan-time values for those variables with scheduled scans. See [Configuration details and limitations]({% link soda-cl/filters.md %}#configuration-details-and-limitations) for details.

<br />

#### 3. Identify Stakeholders

Add Stakeholders to this agreement who have an interest in maintaining or using the good-quality data in this data source. Consider adding a co-owner to your agreement for redundancy should you, as the agreement author, be absent.

Soda Cloud sends emails to request review and approval from all stakeholders, and waits to run scans which execute checks in the agreement until all stakeholders have approved the agreement.

<br />

#### 4. Set Notifications

By default, Soda Cloud includes an out-of-the-box email notification to all the agreement's stakeholders when a check in your agreement fails. You can remove or adjust this notification, or use the search bar to add more. Access [Scan output]({% link soda-cloud/scan-output.md %}#) to learn more about pass, warn, and fail check results.

If you have integrated your Soda Cloud account with [Slack]({% link soda/integrate-slack.md %}) or another third-party service provider via a [webhook]({% link soda/integrate-webhooks.md %}), use the search field to type a channel name to add the channel as a notification recipient. Alternatively, use the field to enter names of individual teammates with whom you collaborate in Soda Cloud.

Note that Soda Cloud does not send a notification when a *scan* fails because of an error, only when *checks* pass, warn, or fail. Refer to [Scan output]({% link soda-cloud/scan-output.md %}#scan-failed) for details.

<br />

#### 5. Set a Scan Schedule

After you have set up a new agreement, Soda Cloud sends approval requests to the stakeholders you identified in step 3. When stakeholders approve or reject your agreement, Soda Cloud sends you an email notification.

Regardless of the approval status of the agreement, however, Soda Cloud begins running scans of your data according to the scan schedule you set. Soda Cloud sends notifications after each scan according to the settings you defined in step 4. 

(Optional) You can create a new [scan definition]({% link soda/glossary.md %}#scan-definition) if you wish to run a scan to execute the checks in this agreement more or less frequently, or a different time of day, relative to the default scan definition for the data source. 

To review existing scan definitions, navigate to **your avatar** > **Scans & Data** > **Scan Definitions** tab. 

<br />

## Run an ad hoc scan

{% include ad-hoc-scan.md %}


## Edit an agreement

1. Navigate to the **Agreements** dashboard, then click the stacked dots at the right of the agreement you wish to edit and select **Edit Agreement**.
2. Navigate the tabs to locate the details you wish to change.  
3. When you **Save**, Soda Cloud sends new approval request emails to all the agreement's stakeholders.  The next scheduled scan applies your changes, regardless of stakeholder approval status.



  </div>
  <div class="panel" id="two-panel" markdown="1">

A Soda Check is a test that Soda Library performs when it scans a dataset in your data source. The checks YAML file stores the Soda Checks you write using [SodaCL]({% link soda-cl/soda-cl-overview.md %}). 

1. Copy+paste the following basic check syntax in your file, then adjust the value for `dataset_name` to correspond with the name of one of the datasets in your data source.
```yaml
checks for dataset_name:
  - row_count > 0
```
2. Save the changes to the `checks.yml` file.
3. Use the following command to run a scan of the data in your data source. Replace the value for `my_datasource` with the name of the data source you added to your `configuration.yml` file. Read more about [scans]({% link soda-library/run-a-scan.md %}).
```shell
soda scan -d my_datasource -c configuration.yml checks.yml
```
Command-line Output:
```shell
Soda Library 1.0.x
Scan summary:
1/1 check PASSED: 
    dim_customer in adventureworks
      row_count > 0 [PASSED]
All is good. No failures. No warnings. No errors.
Sending results to Soda Cloud
Soda Cloud Trace: 67592***474
```
4. Access your Soda Cloud account in your browser and navigate to **Checks** to review the same scan output that Soda Library printed in the command-line.
![configure-results](/assets/images/configure-results.png){:height="700px" width="700px"}


  </div>
  <div class="panel" id="three-panel" markdown="1">

To automate the search for bad-quality data, you can use **Soda library** to programmatically execute scans. Alternatively, you can install and use the Soda Library CLI to run scans; see [Install Soda Library]({% link soda-library/install.md %}).

Based on a set of conditions or a specific event schedule, you can instruct Soda Library to automatically scan a data source. For example, you may wish to scan your data at several points along your data pipeline, perhaps when new data enters a data source, after it is transformed, and before it is exported to another data source.

[Basic programmatic scan](#basic-programmatic-scan)<br />
[Tips and best practices](#tips-and-best-practices)<br />
[Scan exit codes](#scan-exit-codes)<br />
[Configure a failed row sampler](#configure-a-failed-row-sampler)<br />
[Save failed row samples to an alternate destination](#save-failed-row-samples-to-an-alternate-destination)<br />
[Go further](#go-further)<br />
<br />

## Basic programmatic scan
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

## Tips and best practices

* You can save Soda Library scan results anywhere in your system; the `scan_result` object contains all the scan result information. To import Soda Library in Python so you can utilize the `Scan()` object, [install a Soda Library package]({% link soda-library/install.md %}), then use `from soda.scan import Scan`.
* Be sure to include any variables in your programmatic scan *before* the check YAML files. Soda requires the variable input for any variables defined in the check YAML files. 
* Because Soda Library pushes scan results to Soda Cloud, you may not want to change the scan definition name with each scan. Soda Cloud uses the scan definition name to correlate subsequent scan results, thus retaining an historical record of the measurements over time. <br /> Sometimes, changing the name is useful, like when you wish to [Configure a single scan to run in multiple environments]({% link soda-library/configure.md %}##configure-the-same-scan-to-run-in-multiple-environments). Be aware, however, that if you change the scan definition name with each scan for the same environment, Soda Cloud recognizes each set of scan results as independent from previous scan results, thereby making it appear as though it records a new, separate check result with each scan and archives or "disappears" previous results. See also: [Missing check results in Soda Cloud]({% link soda-cl/troubleshoot.md %}#missing-check-results-in-soda-cloud)

  </div>
  </div>
</div>

<br />





---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}