---
layout: default
title: Write SodaCL checks 
description: Soda Checks Language is a human-readable, domain-specific language for data reliability. You use SodaCL to define Soda Checks in a checks YAML file.
parent: Write SodaCL checks
redirect_from: 
- /soda-cl/
- /soda-core/soda-cl.html
---

# Write SodaCL checks 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

**Soda Checks Language (SodaCL)** is a YAML-based, domain-specific language for data reliability. Used in conjunction with Soda tools, you use SodaCL to write checks for data quality, then run a scan of the data in your data source to execute those checks. A **Soda Check** is a test that Soda performs when it scans a dataset in your data source.  

A **Soda scan** executes the checks you write in an agreement, in a checks YAML file, or inline in a programmatic invocation, and returns a result for each check: pass, fail, or error. Optionally, you can configure a check to warn instead of fail by setting an [alert configuration]({% link soda-cl/optional-config.md %}#add-alert-configurations).

As a step in the **Get started roadmap**, this guide offers instructions to write your first SodaCL checks in the Soda Cloud UI, in a checks YAML file, or within a programmatic invocation of Soda.

#### Get started roadmap

1. <s><font color="#777777"> Choose a flavor of Soda </font></s> 
2. <s><font color="#777777">Set up Soda: install, deploy, or invoke</font></s> 
3. **Write SodaCL checks** 📍 You are here! 
4. Run scans and review results 
5. Organize, alert, investigate 

<br/>

#### Examples
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

# Check for freshness 
  - freshness (start_date) < 1d

# Check for referential integrity
checks for dim_department_group:
  - values in (department_group_name) must exist in dim_employee (department_name)
```


## Define SodaCL checks

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Business Users</label>
  <label class="tab" id="two-tab" for="two">Data Engineers</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

As a business user of Soda Cloud, you write SodaCL checks directly in the user interface within a **Soda Agreement**. An agreement is a contract between stakeholders that stipulates the expected and agreed-upon state of data quality in a data source. <br />
*Requires Soda Agent*<br />

In an agreement, use SodaCL checks to define the state of "good quality" for data in this data source, then identify and get approval from stakeholders in your organization. Define whom Soda Cloud will notify when a check in the agreement fails, then set a schedule to regularly execute the Soda Checks to uphold the tenets of the agreement.

### Prerequisites

* You, or an Admin on your Soda Cloud account, has [deployed a Soda Agent]({% link soda-agent/deploy.md %}) and connected it to your Soda Cloud account.
* You, or an Admin on your Soda Cloud account, has [added a new datasource]({% link soda-agent/deploy.md %}#add-a-new-data-source) via the Soda Agent in your Soda Cloud account.

### Create a new agreement

For a new agreement, you define several details including which data to check, what checks to execute during a scan, and whom to notify when bad data triggers an alert.

In Soda Cloud, navigate to the **Agreements** dashboard, then click **New Agreement**. Follow the guided steps to complete the new agreement. Use the sections below for insight into the values to enter in the fields and editing panels in the guided steps.  

#### 1. Select a Data Source

You can only create an agreement that uses a data source that has been added to Soda Cloud via a Soda Agent. 

| Field or Label  | Guidance |
| -----------------  | ----------- |
| Agreement Label  | Provide a name for your agreement. |
| Data Source | Select the data source that contains the datasets to which your agreement applies. <br /> If you have no options to select in the dropdown, it is because you have not added a data source via a Soda Agent. You can only create agreements on datasets that are in a data source that has been onboarded into Soda Cloud via a Soda Agent. |

<br />

#### 2. Write Checks

Use SodaCL to define the checks that Soda Cloud executes on a regular schedule to uphold the tenets of this agreement. If any of these checks fail during a regularly-scheduled scan, Soda Cloud notifies the stakeholders you specify in the Notifications section.

Be sure to click **Test checks** to validate that the SodaCL syntax you have written is valid, and that Soda can execute the checks against your datasets without errors.

For help writing your first checks:
* browse the library of **SodaCL snippets** that insert correctly-formatted syntax for the most commonly-used checks for basic data quality
* use **Ask SodaGPT**, a generative AI assistant that turns natural-language requests into production-ready SodaCL checks. [Read more]({% link soda-cloud/sodagpt.md %})
* consider following the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}), including the [Tips and best practices]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl) section
* refer to [SodaCL reference]({% link soda-cl/metrics-and-checks.md %}) for exhaustive details on every type of metric and check

![sodacl-start](/assets/images/sodacl-start.png){:height="700px" width="700px"}

<br />

#### 3. Identify Stakeholders

Add Stakeholders to this agreement who have an interest in maintaining or using the good-quality data in this data source. Consider adding a co-owner to your agreement for redundancy should you, as the agreement author, be absent.

Soda Cloud sends emails to request review and approval from all stakeholders, and waits to run scans which execute checks in the agreement until all stakeholders have approved the agreement.

<br />

#### 4. Set Notifications

By default, Soda Cloud includes an out-of-the-box email notification to all the agreement's stakeholders when a check in your agreement fails. You can remove or adjust this notification, or use the search bar to add more. Access [View scan results]({% link soda-library/run-a-scan.md %}#view-scan-results) to learn more about pass, warn, and fail check results.

Note that Soda Cloud does not send a notification when a *scan* fails because of an error, only when *checks* pass, warn, or fail. Refer to [Scan output]({% link soda-library/run-a-scan.md %}#scan-failed) for details.

(Optional) If you have integrated your Soda Cloud account with [Slack]({% link soda/integrate-slack.md %}) or another third-party service provider via a [webhook]({% link soda/integrate-webhooks.md %}), use the search field to type a channel name to add the channel as a notification recipient. Alternatively, use the field to enter names of individual teammates with whom you collaborate in Soda Cloud.

<br />

#### 5. Set a Scan Schedule

After you have set up a new agreement, Soda Cloud sends approval requests to the stakeholders you identified in step 3. When stakeholders approve or reject your agreement, Soda Cloud sends you an email notification.

Regardless of the approval status of the agreement, however, Soda Cloud begins running scans of your data according to the scan schedule you set. Soda Cloud sends notifications after each scan according to the settings you defined in step 4. 

(Optional) You can create a new [scan definition]({% link soda/glossary.md %}#scan-definition) if you wish to run a scan to execute the checks in this agreement more or less frequently, or a different time of day, relative to the default scan definition for the data source. 

To review existing scan definitions, navigate to **your avatar** > **Scans & Data** > **Scan Definitions** tab. 

<br />


### Agreement tips and best practices

Further, take into account the following tips and best practices when writing SodaCL checks in an agreement.
* Avoid applying the same [customized check names]({% link soda-cl/optional-config.md %}#customize-check-names) in multiple agreements. Soda Cloud associates check results with agreements according to name so if you reuse custom names, Soda Cloud may become confused about which agreement to which to link check results.
* If you use an [anomaly score check]({% link soda-cl/anomaly-score.md %}), be aware that when you **Test Checks**, this type of checks results in `[NOT EVALUATED]`. The ML algorithm that anomaly score checks use requires a minimum of four, regular-frequency scans before it has collected enough historic measurements against which to gauge an anomaly. Therefore, until it has collected enough historical measurements to use to gauge anomolies, Soda does not evaluate the check.
* Note that any checks you test in the context of this step in the agreements workflow _do not_ appear as "real" checks in the **Checks** dashboard. 
* Except with a NOW variable with freshness checks, you cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.

See also: [Tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl)

  </div>
  <div class="panel" id="two-panel" markdown="1">

As a Data Engineer, you can write SodaCL checks directly in a `checks.yml` file, or leverage check suggestions in the Soda Library CLI to prepare a basic set of data quality checks for you. Alternatively, you can add SodaCL checks to a progrmmatic invocation of Soda Library.

[Manually write SodaCL checks](#manually-write-sodacl-checks)<br />
[Use check suggestions](#use-check-suggestions)<br />
[Programmatically add checks](#programmatically-add-checks)<br />
<br />

### Manually write SodaCL checks

The checks YAML file stores the Soda Checks you write using SodaCL. Use this file to manually write your own SodaCL checks. 

1. Using a code editor, create a new file called `checks.yml`.
2. Copy+paste the following basic check syntax in your file, then adjust the value for `dataset_name` to correspond with the name of one of the datasets in your data source.
```yaml
checks for dataset_name:
  - row_count > 0
```
3. Save the changes to the `checks.yml` file.
4. To test the check and confirm the syntax is valid and error-free, use the following command to run a scan of the data in your data source. Replace the value for `my_datasource` with the name of the data source you added to your `configuration.yml` file. Read more about [scans]({% link soda-library/run-a-scan.md %}).
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
5. Add more checks to the `checks.yml` file to test for multiple data quality metrics. Consult the [SodaCL tutorial]({% link soda/quick-start-sodacl.md %}) for advice and the [Use case guides]({% link soda/use-case-guides.md %}) for example checks. Refer to [SodaCL reference]({% link soda-cl/metrics-and-checks.md %}) for exhaustive details on every type of metric and check.

### Use check suggestions

**Check suggestions** assists Soda users in auto-generating basic data quality checks using the Soda Checks Language (SodaCL), a domain-specific language for data quality testing.<br /> 
*Requires Soda Scientific*<br />
*Compatible with Big Query, PostgreSQL, and Snowflake data sources*

Instead of writing your own data quality checks from scratch, check suggestions profiles your dataset and prompts you through a series of questions so that it can leverage the built-in Soda metrics and quickly prepare data quality checks tailored to that individual dataset.  

#### Compatibility

You can use check suggestions with the following data sources:
* GCP Big Query
* PostgreSQL
* Snowflake

#### Prerequisites

* You have installed Python 3.10 or greater.
* You have installed a [Soda Library package]({% link soda-library/install.md %}#install-soda-library-1) for Big Query, PostgreSQL, or Snowflake in your environment and [configured]({% link soda-library/install.md %}#configure-soda) it to connect to your data source.

#### Run check suggestions

{% include check-suggest.md %}

### Programmatically add checks

Follow the [steps above](#manually-write-sodacl-checks) to create a `checks.yml` file to define your checks for data quality. Then, add the file(s) to your Python program as in the example below.<br /> Be sure to include any variables in your programmatic scan *before* the check YAML files. Soda requires the variable input for any variables defined in the check YAML files. 

{% include code-header.html %}
```python
from soda.scan import Scan

scan = Scan()
scan.set_data_source_name("events")

scan.add_configuration_yaml_file(file_path="~/.soda/my_local_soda_environment.yml")


# Add variables
###############
scan.add_variables({"date": "2022-01-01"})


# Add check YAML files
##################
scan.add_sodacl_yaml_file("./my_programmatic_test_scan/sodacl_file_one.yml")
scan.add_sodacl_yaml_file("./my_programmatic_test_scan/sodacl_file_two.yml")
scan.add_sodacl_yaml_files("./my_scan_dir")
scan.add_sodacl_yaml_files("./my_scan_dir/sodacl_file_three.yml")
```

  </div>
  </div>
</div>


## Next

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777">Set up Soda: install, deploy, or invoke</font></s> 
3. <s><font color="#777777">Write SodaCL checks</font></s> 
4. **[Run scans and review results]({% link soda-library/run-a-scan.md %})**
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