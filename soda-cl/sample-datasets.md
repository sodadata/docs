---
layout: default
title: Display sample data in Soda Cloud
description: Use SodaCL to send sample data to Soda Cloud to quickly review the contents of your dataset.
parent: SodaCL
---

# Display sample data in Soda Cloud 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use the `sample datasets` configuration to send 100 sample rows to Soda Cloud. Examine the sample rows to gain insight into the type checks you can prepare to test for data quality.<br />
*Requires Soda Cloud.*
{% include code-header.html %}
```yaml
sample datasets:
  datasets:
    - dim_customer
    - include prod%
    - exclude test%
```

[Prerequisites](#prerequisites)<br />
[Define sample datasets](#define-sample-datasets)<br />
[Optional check configurations](#optional-check-configurations) <br />
[Inclusion and exclusion rules](#inclusion-and-exclusion-rules)<br />
[Disable samples in Soda Cloud](#disable-samples-in-soda-cloud)<br />
[Go further](#go-further) <br />
<br />


## Prerequisites

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Configure in Soda Cloud</label>
  <label class="tab" id="two-tab" for="two">Configure using Soda Core </label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

* You have <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank">signed up for a Soda Cloud account</a>.
* You have [Administrator rights]({% link soda-cloud/roles-and-rights.md %}) within your organization's Soda Cloud account.
* You, or an Administrator in your organization's Soda Cloud account, has [deployed a Soda Agent]({% link soda-agent/deploy.md %}) which enables you to connect to a data source in Soda Cloud.

To define samples for datasets, follow the guided steps to create a new data source and add the sample configuration in step 4 [Profile datasets]({% link soda-cloud/add-datasource.md %}#4-profile-datasets). Reference the [section below](#define-an-automated-monitoring-check) for how to configure profiling using SodaCL. 

  </div>
  <div class="panel" id="two-panel" markdown="1">

* You have installed a [Soda Core package]({% link soda-library/install.md %}) in your environment.
* You have [configured Soda Core]({% link soda-library/configure.md %}) to connect to a data source using a `configuration.yml` file. 
* You have created and [connected a Soda Cloud account]({% link soda-library/configure.md %}) to Soda Core. <br />

Reference the [section below](#define-an-automated-monitoring-check) for how to configure profiling in a checks YAML file using SodaCL. 

  </div>
  </div>
</div>


## Define sample datasets

This configuration is limited in its syntax variation, with only a couple of mutable parts to specify the datasets from which to gather and send sample rows to Soda Cloud. You can add this configuration to one of two places:
* to your `checks.yml` file <br />
OR<br />
*  to either step [3. Discover Datasets]({% link soda-cloud/add-datasource.md %}#3-discover-datasets) or step [4. Profile Datasets]({% link soda-cloud/add-datasource.md %}#4-profile-datasets) when you add a data source directly in Soda Cloud. 

The example configuration below uses a wildcard character (`%`) to specify that Soda Core sends sample rows to Soda Cloud for all datasets with names that begin with `customer`, and *not* to send samples for any dataset with a name that begins with `test`.
{% include code-header.html %}
```yaml
sample datasets:
  datasets:
    - include customer%
    - exclude test%
```

<br />

You can also specify individual datasets to include or exclude, as in the following example.
{% include code-header.html %}
```yaml
sample datasets:
  datasets:
    - include retail_orders
```

<br />

### Scan results in Soda Cloud

1. To review the sample rows in Soda Cloud, first [run a scan]({% link soda-library/run-a-scan.md %}) of your data source so that Soda Core can gather and send samples to Soda Cloud.
2. In Soda Cloud, navigate to the **Datasets** dashboard, then click a dataset name to open the dataset's info page. 
3. Access the **Sample Data** tab to review the sample rows.

![Example sample datasets screenshot](../assets/images/soda-sample-datasets.png)

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
|   | Define a name for sample data configuration. |  - |
|   | Add an identity to a check. |  -  |
|   | Define alert configurations to specify warn and fail thresholds. | - |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
|   | Use quotes when identifying dataset names. | - |
| ✓ | Use wildcard characters ({% raw %} % {% endraw %} with dataset names in the check; see [example](#example-with-wildcards). | - |
|   | Use for each to apply anomaly score checks to multiple datasets in one scan. | - |
|   | Apply a dataset filter to partition data during a scan. |  -  |

#### Example with wildcards 
{% include code-header.html %}
```yaml
sample datasets:
  datasets:
    - include prod%
    - exclude test%
```

## Inclusion and exclusion rules

* If you configure `sample datasets` to include specific datasets, Soda implicitly *excludes* all other datasets from sampling. 
* If you combine an include config and an exclude config and a dataset fits both patterns, Soda excludes the dataset from sampling.

## Disable samples in Soda Cloud

Where your datasets contain sensitive or private information, you may *not* want to send samples from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}

<br />
Note that you cannot use an `exclude_columns` configuration to disable sample row collections from specific columns in a dataset. That configuration applies _only_ to [disabling failed rows sampling]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).

## Go further
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
* Use a [freshness check]({% link soda-cl/freshness.md %}) to gauge how recently your data was captured.
* Use [reference checks]({% link soda-cl/reference.md %}) to compare the values of one column to another.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}