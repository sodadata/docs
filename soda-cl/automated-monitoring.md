---
layout: default
title: Add automated monitoring checks
description: Use a SodaCL automated monitoring check to automatically check for row count anomalies and schema changes.
parent: Write SodaCL checks
---

# Add automated monitoring checks 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use automated monitoring checks to instruct Soda to automatically check for row count anomalies and schema changes in a dataset.<br />

{% include code-header.html %}
```yaml
automated monitoring:
  datasets:
    - include %
    - exclude test%
```

<small>✔️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud + self-hosted Soda Agent connected to any <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Soda-supported data source, except Spark, and Dask and Pandas</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud + Soda-hosted Agent</small><br />
<small>✖️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✖️ &nbsp;&nbsp; Available as no-code checks</small>
<br /><br />

[About automated monitoring checks](#about-automated-monitoring-checks)<br />
[Add automated monitoring checks](#add-automated-monitoring-checks-1)<br />
[Add quotes to all datasets](#add-quotes-to-all-datasets)<br />
[Go further](#go-further) <br />
<br />

## About automated monitoring checks

When you add automated monitoring checks to a data source connected to your Soda Cloud account via a self-hosted agent, Soda prepares and executes two checks on all the datasets you indicated as `included` in the configuration.

**Anomaly score check on row count**: This check counts the number of rows in a dataset during scan and registers anomalous counts relative to previous measurements for the row count metric. Refer to [Anomaly score checks]({% link soda-cl/anomaly-score.md %}) for details. <br />
Anomaly score checks require a minimum of four data points (four scans at stable intervals) to establish a baseline against which to gauge anomalies. If you do not see check results immediately, allow Soda Library to accumulate the necessary data points for relative comparison. 

**Schema evolution check**: This check monitors schema changes in datasets, including column addition, deletion, data type changes, and index changes. By default, this automated check results in a failure if a column is deleted, its type changes, or its index changes; it results in a warning if a column is added. Refer to [Schema checks]({% link soda-cl/schema.md %}) for details.<br />
Schema checks require a minimum of one data point to use as a baseline against which to gauge schema changes. If you do not see check results immediately, wait until after you have scanned the dataset twice.


## Add automated monitoring checks

<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud + self-hosted Soda Agent connected to any <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Soda-supported data source, except Spark, and Dask and Pandas</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud + Soda-hosted Agent</small><br />

Add automated monitoring checks as part of the guided workflow to create a new data source only in deployment models that use a self-hosted Soda agent, not a Soda-hosted Soda agent. For a Soda-hosted agent, consider using the automated [anomaly detection dashboard]({% link soda-cloud/anomaly-dashboard.md %}) for observability into basic data quality in your datasets.

If you are using a self-operated deployment model that leverages Soda Library, add the column profiling configuration outlined below to your checks YAML file.

Navigate to **your avatar** > **Data Sources** > **New Data Source** to begin. 

In step **5. Check** of the guided workflow, you have the option of listing the datasets to which you wish to automatically add anomaly score and schema evolution checks. The example check below uses a wildcard character (`%`) to specify that Soda Library executes automated monitoring checks against all datasets with names that begin with `prod`, and *not* to execute the checks against any dataset with a name that begins with `test`.
{% include code-header.html %}
```yaml
automated monitoring:
  datasets:
    - include prod%
    - exclude test%
```

<br />

You can also specify individual datasets to include or exclude, as in the following example.
{% include code-header.html %}
```yaml
automated monitoring:
  datasets:
    - include orders
```

### Scan results in Soda Cloud

To review the check results for automated monitoring checks in Soda Cloud, you can:
* navigate to the **Checks** dashboard to see the check results
* navigate to the **Datasets** dashboard to see the check results for an individual dataset

<br />

## Add quotes to all datasets

{% include quotes-tables.md %}

<br />

## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn more about the [anomaly detection dashboard]({% link soda-cloud/anomaly-dashboard.md %}) for datasets.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
* Use a [freshness check]({% link soda-cl/freshness.md %}) to gauge how recently your data was captured.
* Use [reference checks]({% link soda-cl/reference.md %}) to compare the values of one column to another.

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
