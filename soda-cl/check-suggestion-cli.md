---
layout: default
title: Check Suggestions
description: The Check Suggestion CLI is a command-line interface tool designed to simplify the process of generating  basic data quality checks in SodaCL.
parent: Soda Cloud
---


# Check suggestions

*Last modified on {% last_modified_at %}*

**Check suggestions** is a command-line interface tool that assists Soda users in generating basic data quality checks using the **Soda Checks Language (SodaCL)**, a domain-specific language for data quality testing.

A Soda check is a test that Soda executes when it scans a dataset in your data source. SodaCL includes over 25 built-in metrics and checks that you can use to write Soda Checks for data quality, including metrics for missing values, duplicates, schema changes, and freshness. You use a `checks.yml` file to store the checks you write using SodaCL.

Instead of writing your own data quality checks from scratch, the check suggestions tool prompts you through a series of questions about a dataset in your data source so that it can leverage the built-in Soda metrics and quickly prepare data quality checks tailored to that individual dataset.  

[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Install and use](#install-and-use)<br />
[Suggestion details](#suggestion-details)<br />
[Go further](#go-further)<br />
<br />
<br />

## Compatibility

You can add to connect with the following data sources:

{% include compatible-datasources.md %}

## Prerequisites

* You have installed Python 3.10 or greater.
* You have installed a [Soda Core package]({% link soda-core/installation.md %}#install) in your environment.

## Install and use

1. In the same directory and virtual environment (if applicable) in which you installed Soda Core, run the following command to install the check suggestion CLI tool.

    ```bash
    pip install soda-generator
    ```

2. Use the following command to verify the installation.

    ```bash
    soda-generator --help
    ```

3. If you have not already done so, prepare a `configuration.yml` file to connect Soda Core to your data source. Refer to [Configure Soda Core]({% link soda-core/configuration.md %}#configuration-instructions) for details.

4. Use the following command to run the check suggestion CLI tool. Refer to the table below for input values for the command options.

    ```bash
    soda-generator --configuration path-to-configuration.yml --datasource datasource-name --output-dir path-to-directory --dataset dim-customer-usa
    ```

| Option | Required? | Value |
| ------ | --------- | ----- |
| `--configuration` | required | Identify the filepath and filename of your own `configuration.yml` file. |
| `--datasource` | required | Identify the name of your data source. |
| `--output-dir` | optional | Specify the output directory for the `checks.yml` file the tool generates. If you do not specify a location, the check suggestion tool saves the `checks.yml` file in your current working directory.|
| `--dataset` | optional | Specify the dataset name for the `checks.yml` file. If you do not specify a name, the check suggestion tool asks you to identify a dataset during the suggestion workflow.

When running, the check suggestion tool automatically prompts you with a series of questions to gather information about your data and the quality checks that you ought to apply; see the [section below](#suggestion-steps). After you answer, or skip the questions, the tool generates a `checks.yml` file with suggested checks based on your input.

Following best practice, the check suggestion tool prepares one `checks.yml` file per dataset; if you wish, you can run the tool multiple times to prepare suggested checks and `checks.yml` files for each dataset in your data source. After it generates the `checks.yml` file, you can manually add, remove, or modify data quality checks in the file as you wish.

With both a `configuration.yml` and a prepared `checks.yml` file, you can proceed to [Run a Soda scan]({% link soda-core/scan-core.md %}) for data quality.

## Suggestion details

**Select a dataset** If you have not used the `--dataset` option in the `soda-generator` command above, the tool prompts you to select a dataset from the list of available datasets in the data source. The check suggestion tool prepares one `checks.yml` file per dataset.

**Select checks for basic data quality coverage** The tool prompts you to select the checks you wish to include in the `checks.yml`. It can prepare the following types of basic checks:

* schema
* row count
* freshness
* validity
* missing
* duplicate

**Set column filtering** If your dataset contains more than 20 columns, the tool prompts you to shorten the list by asking you to select the column names to which you wish to add checks for missing and duplicate values.

**Add a schema check** This type of check validates the schema, or structure, of your data. It ensures that the columns you expect to exist are present in the dataset, and that they have the correct data type and index location.

Refer to [Schema checks]({% link soda-cl/schema.md %}) for more information.

```yaml
checks for dataset_A:
  - schema:
      name: Any schema changes
      fail:
        when schema changes:
          - column delete
          - column add
          - column index change
          - column type change
```

**Add row count checks** This step adds two checks: one to confirm that the dataset is not empty, and one to ensure that the current row count is not significantly different from the expected row count. Soda determines the expected row count relative to the previous row count value using a time series-based anomaly detection model.

Refer to [Anomaly score checks]({% link soda-cl/anomaly-score.md %}) for more information.

```yaml
checks for dataset_A:
  - row_count > 0
  - anomaly score for row_count < default
```

**Add time-based partitioning** Also referred to as dataset filtering, this step prompts you to specify a time range on which to apply the data quality checks. By default, the check suggestion tool sets the time-based partition to one day. When generating a list of candidate columns to which to apply the time-based partition, the tool uses heuristic methods to automatically identify and rank column names.

<br>
<details>
  <summary style="color:#00BC7E">Heuristic to rank time based columns</summary>
  The partition step in the Check Suggestion CLI involves determining the ranking of time-based columns for partitioning purposes. This ranking strategy helps identify the most suitable columns for partitioning your data effectively. The algorithm applies several criteria and heuristic scoring to assess the columns' incrementality, standard deviation, maximum date, missing values, and column names.
  <br><br>
  The ranking strategy consists of the following steps:
  
  1. **Incrementality**: This criterion checks whether the values in a time-based column increment over time. It assesses if the dates or time values consistently increase as new records are added. Columns with higher incrementality scores are more likely to provide a meaningful partitioning mechanism.

  2. **Standard Deviation**: The standard deviation between dates is used as a measure to assess the uniformity or distribution of values in a time-based column. Columns with low standard deviation indicate that the dates are closely packed together, suggesting a more consistent and evenly spaced distribution.

  3. **Maximum Date**: This step examines the maximum date value in a column and compares it with the current date. Columns with a maximum date value that is not greater than the current date receive a higher score. This criterion helps identify columns with recent or up-to-date data.

  4. **Missing Value**: The number of missing values in a column is considered in this step. Columns with fewer missing values receive a higher score. This criterion helps identify columns with more complete data.

  5. **Column Name**: In this step, the names of the columns are analyzed to determine their relevance for partitioning. The algorithm assigns higher points to columns with names that contain keywords such as "create", "insert", "generate", etc. This criterion aims to identify columns that are likely to represent meaningful time-based information.

  After calculating scores from each of the five criteria, the algorithm combines them to obtain a comprehensive score for each time-based column. The columns are then ranked from highest to lowest score, providing guidance on the suitability of each column for partitioning.

  By using this ranking strategy, the partition step in your Check Suggestion CLI helps you identify the most appropriate time-based columns for partitioning your data effectively.


</details>

Refer to [Configure dataset filters]({% link soda-cl/filters.md %}#configure-dataset-filters) for more information.

```yaml
filter customer [daily]:
where: created_at > TIMESTAMP '${NOW}' - interval '1d'

checks for customer [daily]:
  - missing_count(name) < 5
  - duplicate_count(phone) = 0
```

**Add a freshness check** A freshness check ensures that the data in the dataset is up-to-date according to the latest value entered in a column containing date or timestamp values. The check suggestion tool uses the same heuristic methods with the time based partitioning to rank the columns. After ranking the columns, the CLI estimates the threshold by using the standard error of date differences. It then prompts you to select the column and threshold to use for the freshness check.

Refer to [Freshness checks]({% link soda-cl/freshness.md %}) for more information.

```yaml
checks for dataset_A:
  - freshness(date_first_purchase) < 24h
```

**Add validity checks** A validity check compares the data in text columns to a specific format (see the list that follows) to determine whether the content is valid. For example, such a check can validate that all rows in an `id` column contain UUID-formatted values.

The tool prompts you to select the columns that are candidates for validity checks, which must contain text type data such as CHAR, VARCHAR, or TEXT.

Valid formats:

* UUID
* email
* phone number
* credit card number
* IP address (IPv4 and IPv6)
* money
* timestamp
* date
* time

Refer to [Validity metrics]({% link soda-cl/validity-metrics.md %}) for more information.

```yaml
checks for dataset_A:
  - invalid_count(email_address) = 0:
      valid format: email
```

**Add missing checks** A missing check automatically identifies any NULL values within your dataset. The tool prompts you to select the columns to which you want to apply a missing check. By default, the tool sets each check threshold to `0`, which means that a check fails if there are any NULL values in the column.

Refer to [Missing metrics]({% link soda-cl/missing-metrics.md %}) for more information.

```yaml
checks for dataset_A:
  - missing_count(customer_key) = 0
  - missing_count(geography_key) = 0
  - missing_count(customer_alternate_key) = 0
  - missing_count(title) = 0
  - missing_count(first_name) = 0
  - missing_count(middle_name) = 0
  - missing_count(last_name) = 0
  - missing_count(name_style) = 0
  - missing_count(birth_date) = 0
  - missing_count(marital_status) = 0
  - missing_count(suffix) = 0
  - missing_count(gender) = 0
```

**Add duplicate checks** A duplicate check identifies duplicate records or entries within your dataset. By default, the tool sets each check threshold to `0`, which means that a check fails if there are any duplicate values in the column.

Refer to [Numeric metrics]({% link soda-cl/numeric-metrics.md %}#list-of-numeric-metrics) for more information.

```yaml
checks for dataset_A:
  - duplicate_count(customer_key) = 0
  - duplicate_count(geography_key) = 0
  - duplicate_count(customer_alternate_key) = 0
  - duplicate_count(title) = 0
  - duplicate_count(first_name) = 0
  - duplicate_count(middle_name) = 0
  - duplicate_count(last_name) = 0
  - duplicate_count(name_style) = 0
  - duplicate_count(birth_date) = 0
  - duplicate_count(marital_status) = 0
  - duplicate_count(suffix) = 0
  - duplicate_count(gender) = 0
```

## Go further

* With both a `configuration.yml` and a prepared `checks.yml` file, you can proceed to [run a Soda scan]({% link soda-core/scan-core.md %}) for data quality.
* Read more about Soda [metrics and checks]({% link soda-cl/metrics-and-checks.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
