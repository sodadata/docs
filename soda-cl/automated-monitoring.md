---
layout: default
title: Automated monitoring checks
description: Use a SodaCL automated monitoring check to automatically check for row count anomalies and schema changes.
parent: SodaCL
---

# Automated monitoring checks ![preview](/assets/images/preview.png){:height="70px" width="70px" align="top"}

{% include banner-preview.md %}

Use automated monitoring checks to instruct Soda to automatically check for row count anomalies and schema changes in a dataset.<br />
*Requires Soda Cloud and Soda Core Scientific.*

```yaml
automated monitoring:
  datasets:
    - include %
    - exclude test%
```
[About automated monitoring checks](#about-automated-monitoring-checks)<br />
[Prerequisites](#prerequisites)<br />
[Install Soda Core Scientific](#install-soda-core-scientific)<br />
[Connect Soda Core to Soda Cloud](#connect-soda-core-to-soda-cloud)<br />
[Define an automated monitoring check](#define-an-automated-monitoring-check)<br />
[Optional check configurations](#optional-check-configurations) <br />
[Troubleshoot Soda Core Scientific installation](#troubleshoot-soda-core-scientific-installation)<br />
[Go further](#go-further) <br />
<br />

## About automated monitoring checks

When you add automated monitoring checks to your checks.yml file, Soda Core prepares and executes two checks on all the datasets you indicate as included in your checks YAML file. 

**Anomaly score check on row count**: This check counts the number of rows in a dataset during scan and registers anomalous counts relative to previous measurements for the row count metric. Refer to [Anomaly score checks]({% link soda-cl/anomaly-score.md %}) for details. <br />
Anomaly score checks require a minimum of four data points (four scans at stable intervals) to establish a baseline against which to gauge anomalies. If you do not see check results immediately, allow Soda Core to accumulate the necessary data points. 

**Schema checks**: This check monitors schema changes in datasets, including column addition, deletion, data type changes, and index changes. By default, this automated check results in a failure if a column is deleted, its type changes, or its index changes; it results in a warning if a column is added. Refer to [Schema checks]({% link soda-cl/schema.md %}) for details.<br />
Schema checks require a minimum of one data point to use as a baseline against which to gauge schema changes. If you do not see check results immediately, wait until after you have scanned the dataset twice.

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account where Soda Cloud stores all the previously-measured, historic values for your checks in the Cloud Metric Store. SodaCL can then use these stored values to establish a baseline of normal metric values against which to evaluate future metric values to identify anomalies and schema changes. Therefore, you must have a created and [connected a Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to use automated monitoring checks. 

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda Core</label>
  <label class="tab" id="two-tab" for="two">Soda Cloud (Preview)</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">


## Prerequisites
* You have installed a [Soda Core package]({% link soda-core/installation.md %}) in your environment.
* You have [configured Soda Core]({% link soda-core/configuration.md %}) to connect to a data source using a `configuration.yml` file. 
* You have [installed Soda Core Scientific](#install-soda-core-scientific) in the same directory or virtual environment in which you installed Soda Core.
* You have created and [connected a Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to Soda Core.

## Install Soda Core Scientific

To use automated monitoring, you must install Soda Core Scientific in the same directory or virtual environment in which you installed Soda Core.

{% include install-soda-core-scientific.md %}

Refer to [Troubleshoot Soda Core Scientific installation](#troubleshoot-soda-core-scientific-installation) for help with issues during installation.



## Define an automated monitoring check

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}check-types), automated monitoring checks are unique. This check employs the `anomaly score` and `schema` checks, but is limited in its syntax variation, with only a couple of mutable parts to specify which datasets to automatically apply the anomaly and schema checks.

The example check below uses a wildcard character (`%`) to specify that Soda Core executes automated monitoring checks against all datasets with names that begin with `prod`, and *not* to execute the checks against any dataset with a name that begins with `test`.

```yaml
automated monitoring:
  datasets:
    - include prod%
    - exclude test%
```

<br />

You can also specify individual datasets to include or exclude, as in the following example.

```yaml
automated monitoring:
  datasets:
    - include orders
```

### Scan results in Soda Cloud

To review the checks results for automated monitoring checks in Soda Cloud, navigate to the **Checks** dashboard to see the automated monitoring check results with an INSIGHT tag. 


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
|   | Define a name for an automated monitoring check. |  - |
|   | Define alert configurations to specify warn and fail thresholds. | - |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
|   | Use quotes when identifying dataset names. | - |
| ✓ | Use wildcard characters ({% raw %} % {% endraw %} with dataset names in the check; see [example](#example-with-wildcards). | - |
|   | Use for each to apply anomaly score checks to multiple datasets in one scan. | - |
|   | Apply a dataset filter to partition data during a scan. |  -  |


#### Example with wildcards 

```yaml
automated monitoring:
  datasets:
    - include prod%
    - exclude test%
```


## Troubleshoot Soda Core Scientific installation

While installing Soda Core Scientific works on Linux, you may encounter issues if you install Soda Core Scientific on Mac OS (particularly, machines with the M1 ARM-based processor) or any other operating system. If that is the case, consider using one of the following alternative installation procedures.
* [Use Docker to run Soda Core (Recommended)](#use-docker-to-run-soda-core)
* [Install Soda Core locally (Limited support)](#install-soda-core-locally)

Need help? Ask the team in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

### Use Docker to run Soda Core

{% include docker-soda-core.md %}

### Install Soda Core Scientific Locally 

{% include install-local-soda-core-scientific.md %}

  </div>
  <div class="panel" id="two-panel" markdown="1">
![preview](/assets/images/preview.png){:height="70px" width="70px" align="top"}
<br />
You cannot create automated monitoring checks in Soda Cloud, yet. However, you can preview the functionality by requesting limited preview access. <a href="mailto:support@soda.io">Email us</a> to ask!

When the functionality in Soda Cloud becomes generally available, you will be able to add automated monitoring checks in the guided steps to [create a new data source]({% link soda-cloud/add-datasource.md %}#5-check-datasets). 
  </div>
  </div>
</div>


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
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
