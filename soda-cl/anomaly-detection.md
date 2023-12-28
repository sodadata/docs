---
layout: default
title: Anomaly Detection Checks []
description: Anomaly detection checks use a machine learning algorithm to automatically detect anomalies in your time-series data.
parent: Soda CL reference
redirect_from: /soda-cloud/anomaly-detection.html
---

# Anomaly detection checks
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use an anomaly detection check to automatically discover anomalies in your check metrics. <br>
*Requires Soda Scientific.*<br />
{% include code-header.html %}

**Basic Anomaly Detection Example for Row Count**
```yaml
checks for dim_customer:
  - anomaly detection for row_count
```

**Advanced Anomaly Detection Example with Optional Configurations**
```yaml
checks for dim_customer:
  - anomaly detection for row_count:
      name: "Anomaly detection for row_count" # optional
      identity: "anomaly-detection-row-count" # optional
      training_dataset: # optional
        frequency: auto
        window_length: 1000
        aggregation_function: last
      model: # optional
        type: prophet 
        hyperparameters:
          static:
            profile:
              custom_hyperparameters:
                changepoint_prior_scale: 0.05
                seasonality_prior_scale: 10
                seasonality_mode: additive
                interval_width: 0.999
                changepoint_range: 0.8
          tune:
            objective_metric: ["mape", "rmse"]
            parallel: True
            cv_period: 2
            parameter_grid:
              changepoint_prior_scale: [0.001]
              seasonality_prior_scale: [0.01, 0.1]
              seasonality_mode: ['additive', 'multiplicative']
              changepoint_range: [0.8]
              interval_width: [0.999]
```

[About anomaly detection checks](#about-anomaly-detection-checks)<br />
[Install Soda Scientific](#install-soda-scientific)<br />
[Define an anomaly detection check](#define-an-anomaly-detection-check) <br />
[Anomaly detection check results](#anomaly-detection-check-results) <br />
[Reset anomaly history](#reset-anomaly-history)<br />
[Optional check configurations](#optional-check-configurations) <br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Track anomalies and relative changes by group](#track-anomalies-and-relative-changes-by-group)<br />
[Troubleshoot Soda Scientific installation](#troubleshoot-soda-scientific-installation)<br />
[Go further](#go-further) <br />
<br />

## About Anomaly Detection Checks

This section details the anomaly detection feature, which is a critical component for ensuring data quality. Our anomaly detection is powered by a machine learning algorithm, specifically leveraging [Facebook Prophet](https://facebook.github.io/prophet/). Here's how it works:

- **Time Series Analysis**: The core function of this feature is to analyze metrics that are tracked over time. These metrics could be anything that you measure regularly as part of your data quality checks.

- **Learning Patterns**: At its heart, the algorithm is designed to understand and learn from the historical patterns in your data. This includes recognizing typical trends and seasonal variations in your metrics.

- **Identifying Anomalies**: Once the algorithm has learned the normal behavior of your metrics, it becomes capable of detecting when something deviates from this norm. These deviations are flagged as anomalies.

- **Use Case**: For instance, if your data typically shows a certain trend or pattern over the course of a week or a month, the algorithm will learn this. Then, if there's a sudden and unusual change in this pattern, it's identified as an anomaly. This could signal an issue in your data quality that requires attention.

By using Facebook Prophet, this anomaly detection check offers a robust way to monitor your data quality metrics, ensuring that any irregularities are caught promptly and accurately. Another benefit of Facebook Prophet is that it's designed to be easy to use and tune, so you don't need to be an expert in machine learning to take advantage of this feature.

<!---
TODO: Add a screenshot of the anomaly detection check from the UI
-->

## Install Soda Scientific

To use an anomaly detection check, you must install Soda Scientific in the same directory or virtual environment in which you installed Soda Library. Soda Scientific is included in Soda Agent deployment. Best practice recommends installing Soda Library and Soda Scientific in a virtual environment to avoid library conflicts, but you can [Install Soda Scientific locally](#install-soda-scientific-locally) if you prefer.

{% include install-soda-scientific.md %}

Refer to [Troubleshoot Soda Scientific installation](#troubleshoot-soda-scientific-installation) for help with issues during installation.

## Define an Anomaly Detection Check

Anomaly detection checks can be applied to various metrics such as [numeric]({% link soda-cl/numeric-metrics.md %}), [missing]({% link soda-cl/missing-metrics.md %}), or [validity]({% link soda-cl/validity-metrics.md %}). Below are examples of how to configure anomaly detection checks for different types of metrics in YAML format.

### Example 1: Row Count Anomaly Detection

Apply an anomaly detection check for the `row_count` metric in a `dim_customer` dataset.

```yaml
# Anomaly Detection Check for Row Count
checks for dim_customer:
  - anomaly detection for row_count
```

### Example 2: Average Order Price Anomaly Detection

This example sets up an anomaly detection check for the average of order_price in an orders dataset.

```yaml
checks for orders:
  - anomaly detection for avg(order_price)
```

### Example 3: Missing Values Anomaly Detection

Configure anomaly detection for the count of missing values in the `id` column of an `orders` dataset. The `missing_values` parameter is used to define which values are considered missing.

```yaml
checks for orders:
  - anomaly detection for missing_count(id):
      missing values: [None, "No Value"]
```

### Example 4: Anomaly Detection with Validity Metric

This example sets up an anomaly detection check for the count of invalid values in the `user_email` column of a `dim_customer` dataset. The `invalid_values` parameter is used to define which values are considered invalid.

```yaml
checks for dim_customer:
  - anomaly detection for invalid_count(user_email):
      valid format: email
```

## Anomaly detection check results
<!--Linked to UI, access Shlink-->

Because the anomaly detection check requires at least four data points before it can start detecting what counts as an anomalous measurement, your first few scans will yield a check result that indicates that Soda does not have enough data.

```shell
Soda Library 1.0.x
Soda Core 3.0.0x
Anomaly Detection Frequency Warning: Coerced into daily dataset with last daily time point kept
Data frame must have at least 4 measurements
Skipping anomaly metric check eval because there is not enough historic data yet
Scan summary:
1/1 check NOT EVALUATED: 
    dim_customer in adventureworks
      anomaly detection for missing_count(last_name) [NOT EVALUATED]
        check_value: None
1 checks not evaluated.
Apart from the checks that have not been evaluated, no failures, no warnings and no errors.
Sending results to Soda Cloud
```

Though your first instinct may be to run several scans in a row to product the four measurments that the anomaly detection needs, the measurements don’t “count” if the frequency of occurrence is too random, or rather, the measurements don't represent enough of a stable frequency.

If, for example, you attempt to run eight back-to-back scans in five minutes, the anomaly detection does not register the measurements resulting from those scans as a reliable pattern against which to evaluate an anomaly.

Consider using the Soda library to set up a [programmatic scan]({% link soda-library/programmatic.md %}) that produces a check result for an anomaly detection check on a regular schedule.

## Reset anomaly history

If you wish, you can reset an anomaly detection's history, effectively recalibrating what Soda considers anomalous on a dataset.

1. In Soda Cloud, navigate to the **Check History** page of the anomaly check you wish to reset.
2. Click to select a node in the graph that represents a measurement, then click **Feedback**.
3. In the modal that appears, you can choose to exclude the individual measurement, or all previous data up to that measurement, the latter of which resets the anomaly detection's history.

![reset-anomaly-detection](/assets/images/reset-anomaly-detection.png){:height="600px" width="600px"}

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for an anomaly detection check. |  - |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
|   | Define alert configurations to specify warn and fail thresholds. | - |
| ✓ | Apply an in-check filter to return results for a specific portion of the data in your dataset; see [example](#example-with-filter). | [Add an in-check filter to a check]({% link soda-cl/optional-config.md %}#add-a-filter-to-a-check) |
| ✓ | Use quotes when identifying dataset names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. |  - |
| ✓ | Use for each to apply anomaly detection checks to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |

#### Example with quotes

{% include code-header.html %}

```yaml
checks for dim_product:
  - anomaly detection for avg("order_price")
```

#### Example with for each

{% include code-header.html %}

```yaml
for each dataset T:
  datasets:
    - dim_customer
  checks:
    - anomaly detection for row_count
```

<br />

## Track anomalies and relative changes by group

{% include group-anomaly.md %}

## Troubleshoot Soda Scientific installation

While installing Soda Scientific works on Linux, you may encounter issues if you install Soda Scientific on Mac OS (particularly, machines with the M1 ARM-based processor) or any other operating system. If that is the case, consider using one of the following alternative installation procedures.

- [Install Soda Scientify locally](#install-soda-scientific-locally)
- [Troubleshoot Soda Scientific installation in a virtual env](#troubleshoot-soda-scientific-installation-in-a-virtual-env)
- [Use Docker to run Soda Library](#use-docker-to-run-soda-library)

Need help? Ask the team in the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

### Install Soda Scientific Locally

{% include install-soda-scientific.md %}

### Use Docker to run Soda Library

{% include docker-soda-library.md %}

### Troubleshoot Soda Scientific installation in a virtual env

{% include troubleshoot-anomaly-check-tbb.md %}

## Go further

- Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
- Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName[e](0);a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
