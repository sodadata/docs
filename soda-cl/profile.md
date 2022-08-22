---
layout: default
title: Send profile info to Soda Cloud
description: Use SodaCL to send dataset and column profile information to Soda Cloud to quickly review the contents of your dataset.
parent: SodaCL
---

# Send profile information to Soda Cloud ![preview](/assets/images/preview.png){:height="70px" width="70px" align="top"}

{% include banner-preview.md %}

Use the `discover datasets` and/or `profile columns` configurations in your checks YAML file to send information about datasets and columns to Soda Cloud. Examine the profile information to gain insight into the type checks you can prepare to test for data quality.<br />
*Requires Soda Cloud.*

**Known issue:** Currently, SodaCL *does not* support column exclusion for the column profiling and dataset discovery configurations when using a Spark data source.

```yaml
discover datasets:
  datasets:
    - prod_%
    - include prod_%
    - exclude dev_%

profile columns:
  columns:
    - dataset_a.column_a
    - dataset_a.%
    - dataset_%.column_a
    - dataset_%.%
    - %.%
    - include dataset_a.%
    - exclude datset_a.prod_%
    - exclude dim_geography
```

[Prerequisites](#prerequisites)<br />
[Define dataset discovery](#define-dataset-discovery) <br />
[Define column profiling](#define-column-profiling)<br />
[Optional check configurations](#optional-check-configurations) <br />
[Go further](#go-further) <br />
<br />


## Prerequisites
* You have installed a [Soda Core package]({% link soda-core/installation.md %}) in your environment.
* You have [configured Soda Core]({% link soda-core/configuration.md %}) to connect to a data source using a `configuration.yml` file. 
* You have created and [connected a Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to Soda Core.


## Define dataset discovery

Dataset discovery captures basic information about each dataset, including a dataset's schema and the columns it contains.

This configuration is limited in its syntax variation, with only a couple of mutable parts to specify the datasets from which to gather and send sample rows to Soda Cloud.

The example configuration below uses a wildcard character (`%`) to specify that, during a scan, Soda Core discovers all the datasets the data source contains *except* those with names that begin with `test_`. 


```yaml
discover datasets:
  datasets:
    - include %
    - exclude test_%
```

<br />

You can also specify individual datasets to include or exclude, as in the following example.

```yaml
discover datasets:
  datasets:
    - include retail_orders
```

<br />

### Scan results in Soda Cloud

1. To review the discovered datasets in Soda Cloud, first [run a scan]({% link soda-core/scan-core.md %}) of your data source so that Soda Core can gather and send dataset information to Soda Cloud.
2. In Soda Cloud, navigate to the **Datasets** dashboard, then click a dataset name to open the dataset's info page. 
3. Access the **Columns** tab to review the datasets that Soda Core discovered, including the type of data each column contains.

![discover datasets](../assets/images/discover-datasets.png)


## Define column profiling

Column profile information includes details such as the calculated mean value of data in a column, the maximum and minimum values in a column, and the number of rows with missing data. Column profiling can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. 

This configuration is limited in its syntax variation, with only a couple of mutable parts to specify the datasets from which to gather and send sample rows to Soda Cloud.

The example configuration below uses a wildcard character (`%`) to specify that, during a scan, Soda Core captures the column profile information for all the columns in the dataset named `retail_orders`. The `.`in the syntax separates the dataset name from the column name. 


```yaml
profile columns:
  columns:
    - retail_orders.%
```

<br />

You can also specify individual columns to profile, as in the following example.

```yaml
profile columns:
  columns:
    - retail_orders.billing_address
```

Refer to the top of the page for more example configurations for column profiling.
<br />

### Scan results in Soda Cloud

1. To review the profiled columns in Soda Cloud, first [run a scan]({% link soda-core/scan-core.md %}) of your data source so that Soda Core can gather and send column profile information to Soda Cloud.
2. In Soda Cloud, navigate to the **Datasets** dashboard, then click a dataset name to open the dataset's info page. 
3. Access the **Columns** tab to review the columns that Soda Core profiled.

![profile columns](../assets/images/profile-columns.png)


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
|   | Define a name for sample data configuration. |  - |
|   | Define alert configurations to specify warn and fail thresholds. | - |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset names; see [example](#example-with-quotes) | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓ | Use wildcard characters ({% raw %} % {% endraw %} with dataset names in the check; see [example](#example-with-wildcards). | - |
|   | Use for each to apply anomaly score checks to multiple datasets in one scan. | - |
|   | Apply a dataset filter to partition data during a scan. |  -  |

#### Example with quotes

```yaml
discover datasets:
  datasets:
    - include "prod_customer"
```

#### Example with wildcards 

```yaml
profile columns:
  columns:
    - retail_orders.%
```

## Go further
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
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