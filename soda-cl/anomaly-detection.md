---
layout: default
title: Anomaly Detection Checks
description: Anomaly detection checks use a machine learning algorithm to automatically detect anomalies in your time-series data.
parent: Soda CL reference
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

### Example with quotes

{% include code-header.html %}

```yaml
checks for dim_product:
  - anomaly detection for avg("order_price")
```

### Example with for each

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

## Optional Anomaly Detection Model Configurations

To enhance the flexibility of anomaly detection, we offer optional configurations that allow you to tailor the model according to your specific needs. These configurations can be applied to the training dataset, facebook prophet model, and the anomaly detection check itself.

### Training Dataset Configuration

The training dataset is crucial as it trains the anomaly detection model.The `training_dataset` configuration allows you to specify the `frequency`, `window_length`, and `aggregation_function` for your training dataset. You can customize the training dataset configurations by specifying the following parameters:

```yaml
checks for dim_customer:
  - anomaly detection for row_count:
      training_dataset:
        frequency: auto
        window_length: 1000
        aggregation_function: last
```

**frequency**: The `frequency` parameter determines how often your data is aggregated for training purposes. The default is `auto`, where the system automatically detects the best frequency based on your time series data. However, you can set specific frequencies like minutely, hourly, daily, etc. For example, if you execute your data quality checks every day, the frequency of the training dataset is `D` (daily). The available options are:

- `auto`: Default value. The frequency is automatically determined based on the time series data.
- `T` or `min`: Minutely frequency
- `H`: Hourly frequency
- `D`: Calendar day frequency
- `B`: Business day frequency
- `W`: Weekly frequency
- `M`: Month end frequency
- `MS`: Month start frequency
- `Q`: Quarter end frequency
- `QS`: Quarter start frequency
- `A`: Year end frequency
- `AS`: Year start frequency
- Multiple Frequencies:
  - Example: `5H` for every 5 hours

**window_length**: It sets the size of the rolling window used for training. It uses the last `window_length` data points for model training, ensuring that the model is always updated with the most recent data. The default length is `1000`. For instance, if your frequency is hourly (H), the model trains on the last 1000 hours of data.

**aggregation_function**: This parameter defines how the data within each window is aggregated. The default `aggregation_function` is last, but there are several other options:

- `last`: Uses the last non-null value in the window.
- `first`: Uses the first non-null value.
- `mean`: Calculates the average.
- `min`: Finds the minimum value.
- `max`: Finds the maximum value.
- `quantile`: Calculates a specified quantile (e.g., 0.25, 0.5, 0.75).

### Facebook Prophet Model Configuration

Anomaly detection uses Facebook Prophet to train the model. The `model` configuration allows you to specify or automatically tune the `hyperparameters` of your Facebook Prophet model.

#### Hyperparameter Profile Configuration

Facebook Prophet, the underlying engine for our anomaly detection model, comes with a variety of default hyperparameters. These hyperparameters are critical as they influence the model's ability to accurately detect anomalies in time-series data. However, tuning these parameters requires a deep understanding of the model's mechanics and can be a complex task.

Recognizing this, we have introduced a profile configuration option. This feature allows users to easily select from two different profiles, `coverage` and `mape`. Each profile is tailored to suit different types of time series data and anomaly detection requirements. The SodaCL configuration for the `coverage` profile is shown below:

```yaml
checks for dim_customer:
  - anomaly detection for row_count:
      name: "Anomaly detection for row_count"
      model: # optional
        type: prophet 
        hyperparameters:
          static:
            profile: "coverage" # default value is "coverage"
```

In our anomaly detection model, we have focused on fine-tuning key hyperparameters to optimize performance. Specifically, our tuning targets two main objectives: `coverage` and `mape (Mean Absolute Percentage Error)`. These objectives guide our adjustments to two critical hyperparameters: `changepoint_prior_scale` and `seasonality_prior_scale`. For detailed insights into the most effective combinations of these hyperparameters, refer to the best practices outlined [here](###Best-Practices-for-Prophet-Model)

- **coverage**: This is the default recommended value. Coverage refers to the percentage of actual data points that fall within the model's predicted confidence intervals. When a prediction lies outside these intervals, it's flagged as an anomaly. A higher coverage indicates that the model is less sensitive to anomalies, making it more resilient to noise in your data. However, this might lead to underfitting, potentially causing the model to miss some anomalies. In such situations, optimizing for `MAPE` (Mean Absolute Percentage Error) might be more appropriate. For your reference, specific hyperparameters are set for the coverage profile as shown below.

  ```python
    # Non-default tuned hyperparameters for coverage profile
    seasonality_mode = "multiplicative"
    seasonality_prior_scale = 0.01
    changepoint_prior_scale = 0.001
    interval_width = 0.999
    
    # Other default hyperparameters by Facebook Prophet 
    growth = "linear"
    changepoints = None
    n_changepoints: = 25
    changepoint_range = 0.8
    yearly_seasonality = "auto"
    weekly_seasonality = "auto"
    daily_seasonality = "auto"
    holidays = None
    holidays_prior_scale = 10.0
    mcmc_samples = 0
    uncertainty_samples = 1000
    stan_backend = None
    scaling = "absmax"
    holidays_mode = None
  ```

- **mape**: [Mean absolute percentage error (MAPE)](https://en.wikipedia.org/wiki/Mean_absolute_percentage_error) is a statistical measure of how accurate a forecasting method is. It calculates the average percentage error between the forecasted and the actual values. The lower the `MAPE` value, the more accurate the model's predictions are. When optimizing for `MAPE`, the model becomes more sensitive to changepoints and seasonal variations, providing a tighter fit to the training data. However, this increased sensitivity can sometimes lead to overfitting. In such cases, the model might mistakenly identify normal data points as anomalies. If overfitting becomes an issue, switching to `coverage` profile might be more beneficial. For your guidance, specific hyperparameters are associated with the `MAPE` as shown below:

  ```python
    # Non-default tuned hyperparameters for coverage profile
    seasonality_mode = "multiplicative"
    seasonality_prior_scale = 0.1
    changepoint_prior_scale = 0.1
    interval_width = 0.999

    # Other default hyperparameters by Facebook Prophet
    ...
  ```

#### Custom Hyperparameter Configuration

You can customize the Prophet hyperparameters with the  `custom_hyperparameter` configuration. This feature lets you tailor the model to suit your specific data and forecasting requirements.

We recommend that you first familiarize yourself with the hyperparameters and their effects. For in-depth guidance, please refer to the official Prophet hyperparameter tuning guide available [here](https://facebook.github.io/prophet/docs/diagnostics.html#hyperparameter-tuning:~:text=Parameters%20that%20can%20be%20tuned). This guide will help you understand the best practices for adjusting hyperparameters.

In our example below, we show you how to change the `seasonality_mode` and `interval_width` hyperparameters. We set all other hyperparameters to the values from the [`coverage` profile](####Hyperparameter-Profile-Configuration), ensuring a solid base for your customizations.

You have the option to modify any hyperparameter supported by Facebook Prophet in the `custom_hyperparameters` section of your configuration. This flexibility allows you to optimize the model for precise anomaly detection.

```yaml
checks for dim_customer:
  - anomaly detection for row_count:
      name: "Anomaly detection for row_count"
      model:
        type: prophet
        hyperparameters:
          static:
            profile:
              custom_hyperparameters:
                seasonality_mode: additive
                interval_width: 0.8
```

#### Automatic Hyperparameter Tuning Configuration

You have the option to automatically tune your model's hyperparameters using the `tune` configuration. This feature reevaluates and selects the best hyperparameters before each scan. However, it's important to note that hyperparameter tuning can be time-consuming and resource-intensive. As such, we recommend using this feature only when absolutely necessary.

Here's an example of how you can set up automatic hyperparameter tuning in your YAML configuration:

```yaml
checks for dim_customer:
  - anomaly detection for row_count:
      model:
        type: prophet
        hyperparameters:
          tune:
            objective_metric: ["coverage", "smape"]
            parallel: True
            cv_period: 5
            parameter_grid:
              changepoint_prior_scale: [0.001, 0.01, 0.1, 0.5]
              seasonality_prior_scale: [0.01, 0.1, 1.0, 10.0]
              seasonality_mode: ['additive', 'multiplicative']
```

This configuration allows the anomaly detection model to adapt and improve over time by finding the most effective hyperparameter settings for your specific data. Remember, though, to weigh the benefits of improved accuracy against the increased computational demands of this process.

The `tune` configuration in your anomaly detection model provides several parameters to optimize hyperparameter tuning:

- **objective_metric**: This is a crucial parameter used to evaluate the model's performance. You can choose from metrics like `MSE`, `RMSE`, `MAE`, `MAPE`, `MDAPE`, `SMAPE`, `coverage`. You can set it as a single string or a list of strings. If you provide a list, the model optimizes each metric in sequence. For example, with `["coverage", "smape"]`, it first optimizes for `coverage`, then `smape` in the event of a tie. This parameter is essential for automatic tuning. We recommend using `coverage` as the first objective metric and `smape` as the second objective metric to come up with a robust model that is less sensitive to the noise in the data.

- **parallel**: If `True`, it will use the `multiprocess` to parallelize the cross validations to save time. It is recommended to set this parameter to `True` if you have multiple cores. This parameter is optional with the default set to `True`.

- **cv_period**: This parameter sets the number of periods for each cross-validation fold. For example, with a daily frequency (`D`) and `cv_period` of `5`, the model conducts cross-validation in 5-day intervals. It trains on the first `n-5` days, then tests on the `n-4`th day. Subsequently, it trains on `n-4` days, testing on the `n-3`rd day, and so forth. Cross validation process is crucial to compute `objective_metric` across different data segments for each hyperparameter combination. Then, we choose the best `objective_metric` based on our configuration. `cv_period` parameter is optional with the default set to `5`.

- **parameter_grid**: This is a dictionary that lists hyperparameters and their possible values. The model tests every possible combination to find the best one. The default settings are `changepoint_prior_scale: [0.001, 0.01, 0.1, 0.5]` and `seasonality_prior_scale: [0.01, 0.1, 1.0, 10.0]`, as these have a significant impact on the model's performance. Other hyperparameters follow the defaults set in the [`coverage` profile](####Hyperparameter-Profile-Configuration). Additionally, you can include any other Prophet supported hyperparameters, like `seasonality_mode: ['additive', 'multiplicative']`. This parameter is optional, allowing for flexibility in model tuning.

### Best Practices for Prophet Model

1. **Use `coverage` profile as a default option.** It is less sensitive and it is more robust for small noises in the data that may lead to false positive alarms. If you need a very sensitive model, then try to use `MAPE` profile.

2. **Use `custom_hyperparameters` configuration if you know how Facebook Prophet works.** Before customizing make sure to read the official documentation of Facebook Prophet to understand the hyperparameters from [here](https://facebook.github.io/prophet/docs/diagnostics.html#hyperparameter-tuning:~:text=Parameters%20that%20can%20be%20tuned). `change_point_prior_scale` and `seasonality_prior_scale` hyperparameters have the most impact on the model. Therefore, we recommend to start playing with these two hyperparameters before trying other parameters.

3. **Use different `interval_width` hyperparameter if you want more sensitive model**. The default value is `0.999` which means that the model will use 99.9% confidence interval. It means that if the predicted value is outside of 99.9% interval, it will be marked as an anomaly. If you want to have a more sensitive model, you can try to decrease this value. However, it may lead to false positive alarms.

4. **Use `tune` configuration only if it is necessary.** Hyperparameter tuning is an expensive process since the model tries all possible combinations of the hyperparameters. Therefore, we discourage using hyperparameter tuning unless it is really necessary. If you need to use hyperparameter tuning, then we recommend to tune `change_point_prior_scale` and `seasonality_prior_scale` hyperparameters. These two hyperparameters have the most impact on the model.

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
