---
layout: default
title: Sample data with Soda
description: Configure Soda Cloud to retrieve sample data from your datasets so you can leverage the information to write SodaCL checks for data quality.
parent: Write SodaCL checks
---

# Sample data with Soda 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

When you add or edit a data source in Soda Cloud, use the `sample datasets` configuration to send 100 sample rows to Soda Cloud. Examine the sample rows to gain insight into the type of checks you can prepare to test for data quality.

{% include code-header.html %}
```yaml
sample datasets:
  datasets:
    - dim_customer
    - include prod%
    - exclude test%
```
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />

<br />

[Sample datasets](#sample-datasets)<br />
[Add quotes to all datasets](#add-quotes-to-all-datasets)<br />
[Inclusion and exclusion rules](#inclusion-and-exclusion-rules)<br />
[Disable samples in Soda Cloud](#disable-samples-in-soda-cloud)<br />
[Specify columns for failed row sampling](#specify-columns-for-failed-row-sampling)<br />
[Go further](#go-further) <br />
<br />


## Sample datasets

Sample datasets captures sample rows from datasets you identify. You add sample datasets configurations as part of the guided workflow to create a new data source or edit an existing one. Navigate to **your avatar** > **Data Sources** > **New Data Source**, or select an existing data source, to begin. You can add this configuration to one of two places:
* to either step [3. Discover Datasets]({% link soda-agent/deploy.md %}#3-discover-datasets) <br />
OR<br />
*   or step [4. Profile Datasets]({% link soda-agent/deploy.md %}#4-profile-datasets) 

The example configuration below uses a wildcard character (`%`) to specify that Soda Library sends sample rows to Soda Cloud for all datasets with names that begin with `customer`, and *not* to send samples for any dataset with a name that begins with `test`.
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

1. To review the sample rows in Soda Cloud, first [run a scan]({% link soda-library/run-a-scan.md %}) of your data source so that Soda can gather and send samples to Soda Cloud.
2. In Soda Cloud, navigate to the **Datasets** dashboard, then click a dataset name to open the dataset's info page. 
3. Access the **Sample Data** tab to review the sample rows.

![Example sample datasets screenshot](../assets/images/soda-sample-datasets.png)

<br />


## Add quotes to all datasets

{% include quotes-tables.md %}

<br />

## Inclusion and exclusion rules

* If you configure `sample datasets` to include specific datasets, Soda implicitly *excludes* all other datasets from sampling. 
* If you combine an include config and an exclude config and a dataset fits both patterns, Soda excludes the dataset from sampling.

## Disable samples in Soda Cloud

Where your datasets contain sensitive or private information, you may *not* want to send samples from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}

<br />
Note that you cannot use an `exclude_columns` configuration to disable sample row collections from specific columns in a dataset. That configuration applies _only_ to [disabling failed rows sampling]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).

## Specify columns for failed row sampling

Beyond collecting samples of data from datasets, you can also use a `samples columns` configuration to an individual check to specify the columns for which Soda must implicitly collect failed row sample values. Soda only collects the check's failed row samples for the columns you specify in the list, as in the `duplicate_count` example below. 

Soda implicitly collects failed row samples for the following checks:
* [reference check]({% link soda-cl/reference.md %}#failed-row-samples) 
* checks that use a [missing metric]({% link soda-cl/missing-metrics.md %}#failed-row-samples)
* checks that use a [validity metric]({% link soda-cl/validity-metrics.md %}#failed-row-samples)
* checks that use a [duplicate_count or duplicate_percent metric]({% link soda-cl/numeric-metrics.md %}#failed-row-samples)

Note that the comma-separated list of samples columns does not support wildcard characters (%).
```yaml
checks for dim_customer:
  - duplicate_count(email_address) < 50:
      samples columns: [last_name, first_name]
```

See also: [About failed row samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples)

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