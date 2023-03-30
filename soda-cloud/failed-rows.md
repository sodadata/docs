---
layout: default
title: Analyze failed rows 
description: To offer more insight into the data that failed a test during a scan, Soda Cloud displays samples and information about failed rows.
parent: Soda Cloud
redirect_from: /soda-sql/documentation/failed-rows.html
---

# Analyze failed rows
*Last modified on {% last_modified_at %}*

When a Soda scan results in a failed check, Soda Cloud displays details of the scan results in each check's **Check History** view. To offer more insight into the data that failed a check during a scan, Soda Cloud can display **failed row analysis** details for a check, including failed row samples. 

[Failed rows analysis and samples](#failed-rows-analysis-and-samples)<br />
[Set a sample limit](#set-a-sample-limit)<br />
[Disable failed rows samples](#disable-failed-row-samples)<br />
[Go further](#go-further)<br />
<br />


## Failed rows analysis and samples

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda Cloud with Soda Agent</label>
  <label class="tab" id="two-tab" for="two">Soda Cloud with Soda Core </label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

### Prerequisites

* You have a Soda Cloud account connected to data sources via a **Soda Agent**.
* You are running Soda scans on one of the data sources that [support](#compatibility) Failed Row Analysis.
* You have defined checks in your agreement that implicitly collect failed row samples: 
  * missing
  * validity
  * duplicate
  * reference


### Compatibility

The following data sources support Failed Row Analysis.

<table>
  <tr>
    <td>Amazon Athena<br /> Amazon Redshift<br /> GCP Big Query</td>
    <td>MySQL<br > PostgreSQL<br /> Snowflake</td>
  </tr>
</table>

### Examine the analysis

If you have connected it to a **Soda Agent**, Soda Cloud displays summary and analysis information, and samples of failed rows for failed check results for checks that implicitly collect failed rows samples. Soda Cloud does *not* display failed row analysis details for checks you have defined using a common table expression (CTE) or SQL query in a [failed rows check]({% link soda-cl/failed-rows-checks.md %}).

Implicitly, Soda automatically collects 100 failed row samples and displays **Failed Row Analysis** details for the following checks:
* [reference check]({% link soda-cl/reference.md %}#failed-row-samples) 
* checks that use a [missing metric]({% link soda-cl/missing-metrics.md %}#failed-row-samples)
* checks that use a [validity metric]({% link soda-cl/validity-metrics.md %}#failed-row-samples)
* checks that use a [duplicate_count or duplicate_percent metric]({% link soda-cl/numeric-metrics.md %}#failed-row-samples)

From the **Checks Results** dashboard, select a check result to navigate to that indivdual check's result history page, then click the **Failed Row Analysis** tab (pictured below) to examine samples and analytical information associated with a failed check result. 

Adjust the **Segment By** setting to examine the results by column. By default, Soda sorts categorical columns from the one with the fewest distinct values to the one with the most, or by cardinality. Columns with the highest cardinality (the most distinct values) are more complex and are more likely to provide insight into your failed rows investigation. 

![failed-row-analysis](/assets/images/failed-row-analysis.png){:height="600px" width="600px"}

#### Troubleshoot

{% include troubleshoot-failed-rows.md %}


  </div>
  <div class="panel" id="two-panel" markdown="1">

### Prerequisites

* You have a Soda Cloud account connected to data sources via a **Soda Core**.
* You are running Soda scans on one of the data sources that [support](#compatibility) failed row samples.

### Compatibility

The following data sources support the Failed Row samples.

{% include compatible-cloud-datasources.md %}

### Examine failed rows

If you have connected it to **Soda Core**, Soda Cloud displays samples of failed rows for failed check results for which you have implicitly or explicitly collect failed row samples. 

* Implicitly, Soda automatically collects 100 failed row samples for the following checks:
  * [reference check]({% link soda-cl/reference.md %}#failed-row-samples) 
  * checks that use a [missing metric]({% link soda-cl/missing-metrics.md %}#failed-row-samples)
  * checks that use a [validity metric]({% link soda-cl/validity-metrics.md %}#failed-row-samples)
  * checks that use a [duplicate_count or duplicate_percent metric]({% link soda-cl/numeric-metrics.md %}#failed-row-samples)
* Explicitly, you can use a common table expression (CTE) or SQL query in a [failed rows check]({% link soda-cl/failed-rows-checks.md %}) to collect failed row samples.

Soda Cloud with Soda Core does not display failed row summary or analysis details, only failed row samples. See **Soda Cloud with Soda Agent** tab.

From the **Checks Results** dashboard, select a check result to navigate to that indivdual check's result history page, then click the **Failed Row Analysis** tab (pictured below) to examine samples associated with a failed check result. 

![failed-rows](/assets/images/failed-rows.png){:height="600px" width="600px"}


#### Troubleshoot

{% include troubleshoot-failed-rows.md %}


  </div>
  </div>
</div>


## Set a sample limit

By default, Soda Core sends 100 failed row samples to Soda Cloud. You can limit the number of sample rows that Soda Core using the `samples limit` configuration key:value pair in your agreement or in your checks YAML file, as in the following example.

```yaml
checks for dim_customer:
# Explicitly sending failed rows samples
  - failed rows:
      samples limit: 50
      fail condition: total_children = '2' and number_cars_owned >= 3
# Implicitly sending failed rows samples
  - missing_percent(email_address) < 50:
      samples limit: 20
```


## Disable failed row samples

Where your datasets contain sensitive or private information, you may *not* want to send failed row samples from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}

### Disable sampling for specific columns

For checks which implicitly or explcitly collect [failed rows samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples), you can add a configuration to your data source connection details to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. 

Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).


## Go further

* <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a Soda Cloud account.
* Learn more about [scans in Soda Cloud]({% link soda-cloud/scan-output.md %}).
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}