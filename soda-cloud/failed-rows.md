---
layout: default
title: Examine failed rows
description: To offer more insight into the data that failed a test during a scan, Soda Cloud can display failed rows in a monitor’s history.
parent: Soda Cloud
redirect_from: /soda-sql/documentation/failed-rows.html
---

# Examine failed rows


<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda Cloud with Soda Core </label>
  <label class="tab" id="two-tab" for="two">Soda Cloud with Soda SQL</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

When a Soda Core scan results in a failed check, Soda Cloud displays details of the scan results in each check's **Monitor History** view. To offer more insight into the data that failed a check during a scan, Soda Cloud can display **failed rows** in a check's history. 

![failed-rows](/assets/images/failed-rows.png){:height="600px" width="600px"}

## Use metrics to send failed row samples

In Soda Cloud, you can only create new monitors and alerts for datasets connected to an instance of Soda SQL; you cannot create monitors for datasets connected to Soda Core, yet. 

Instead, you can use SodaCL to write a check that uses a [duplicate_count]({% link soda-cl/numeric-metrics.md %}#send-failed-rows-to-soda-cloud), [missing]({% link soda-cl/missing-metrics.md %}#send-failed-rows-to-soda-cloud) or [validity]({% link soda-cl/validity-metrics.md %}#send-failed-rows-to-soda-cloud) metric in a [checks YAML file]({% link soda-core/configuration.md %}) for Soda Core to execute during a scan. You can [connect]({% link soda-core/connect-core-to-cloud.md %}) Soda Core to your Soda Cloud account to see the check results after each scan. 

If you use one of the above-listed metrics in checks you write using SodaCL, Soda Core automatically sends a sample of the failed rows associated with the failed check to Soda Cloud with the scan results.
<br />

#### Troubleshoot

{% include troubleshoot-failed-rows.md %}



## Use checks to send failed rows 

Use a [failed rows check]({% link soda-cl/failed-rows-checks.md %}) to explicitly send samples of rows that failed a check to Soda Cloud.

## Disable failed row samples

Where your datasets contain sensitive or private information, you may *not* want to send failed row samples from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}

  </div>
  <div class="panel" id="two-panel" markdown="1">

{% include banner-sql.md %}

When a [scan]({% link soda/glossary.md %}#scan) results in a failed [test]({% link soda/glossary.md %}#test), Soda Cloud displays details of the scan results in each monitor's **Monitor History** view. To offer more insight into the data that failed a test during a scan, Soda Cloud can display **failed rows** in a monitor's history. 

![failed-rows](/assets/images/failed-rows.png){:height="600px" width="600px"}

## Use a missing-value Metric Type to collect failed row samples

{% include failed-row-samples.md %}

When Soda SQL next runs a scan of your dataset, it collects and displays a sample of failed rows for the monitors that use the above-listed metric types. A sample contains the first five examples of failed rows from the dataset.

If you are a Soda SQL user and have [connected to your Soda Cloud account]({% link soda-sql/connect_to_cloud.md %}), you can add configurations to your scan YAML file to explicitly send failed row samples to Soda Cloud. See [Send failed rows to Soda Cloud]({% link soda-sql/send-failed-rows.md %}) for instructions.

#### Troubleshoot

{% include troubleshoot-failed-rows.md %}

## Disable failed row samples

Where your datasets contain sensitive or private information, you may *not* want to send failed row samples from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}

If you use Soda SQL to programmatically schedule scans of individual datasets, you can configure Soda SQL to send a dataset's failed row samples to a secure location within your organization's infrastructure, such as an Amazon S3 bucket or Google Big Query. Refer to [Reroute failed row samples]({% link soda-sql/send-failed-rows.md %}#reroute-failed-row-samples-for-a-dataset) for details.


  </div>
  </div>
</div>

## Go further

* <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a Soda Cloud account.
* [Create monitors]({% link soda-cloud/monitors.md %}) in Soda Cloud.
* Learn more about [scans in Soda Cloud]({% link soda-sql/scan.md %}#scan-output-in-soda-cloud).
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
{% include docs-footer.md %}