---
layout: default
title: Check Suggestions
description: The Check Suggestions CLI assisstant is designed to simplify the process of auto-generating basic data quality checks in SodaCL.
parent: Soda Cloud
---


# Check suggestions

*Last modified on {% last_modified_at %}*

**Check suggestions** assists Soda users in auto-generating basic data quality checks using the Soda Checks Language (SodaCL), a domain-specific language for data quality testing.<br /> *Requires Soda Library*

A Soda check is a test that Soda executes when it scans a dataset in your data source. SodaCL includes over 25 built-in metrics and checks that you can use to write Soda Checks for data quality, including metrics for missing values, duplicates, schema changes, and freshness. You use a `checks.yml` file to store the checks you write using SodaCL.

Instead of writing your own data quality checks from scratch, check suggestions profiles your dataset and prompts you through a series of questions so that it can leverage the built-in Soda metrics and quickly prepare data quality checks tailored to that individual dataset.  

```shell
$ soda suggest -d adventureworks -c configuration.yml -ds dim_customer
✅ Connected to 'adventureworks' successfully!
No valid checks found, 0 checks evaluated.
✅ All dataset and column names are fetched successfully from 'adventureworks'!


──────────────────────────────────────── Select checks for basic data quality coverage ────────────────────────────────────────
? Select the checks to apply to 'dim_customer':  done (6 selections)


──────────────────────────────────────────────────── Set column filtering ─────────────────────────────────────────────────────
╭─ Info ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ dim_customer has 31 columns. Filter candidate column names on which you will want to get suggestions for Missing Value      │
│ Check and Duplicate Values Check that you don’t have to go through a large list                                             │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
? Page 1/2 - Filter columns done (6 selections)
? Page 2/2 - Filter columns done (3 selections)
╭─ Info ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ You chose to receive suggestions for Missing Value Check and Duplicate Values Check on the following columns:               │
│  ['customer_key', 'last_name', 'email_address', 'phone', 'date_first_purchase']                                             │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯


──────────────────────────────────── Add a schema check - https://go.soda.io/schema [1/7] ─────────────────────────────────────
? Apply a schema check to 'dim_customer':  Yes, warn when the schema changes


───────────────────────────────── Add a row count check - https://go.soda.io/row-count [2/7] ──────────────────────────────────
? Confirm that 'dim_customer' has more than 0 rows: (Y/n, <b> go previous step) Yes
? Apply row count anomaly detection to 'dim_customer': (Y/n, <b> go previous step) Yes


────────────────────────────────── Add freshness check - https://go.soda.io/freshness [3/7] ───────────────────────────────────
? Apply a freshness check for 'dim_customer' (Soda orders the columns by relevance):  freshness(date_first_purchase) < 19h


─────────────────────────────────── Add validity checks - https://go.soda.io/invalid [4/7] ────────────────────────────────────
? Apply validity checks to the following columns in 'dim_customer':  ['email_address' column has 'email' semantic type]


───────────────────────────────── Add missing value checks - https://go.soda.io/missing [5/7] ─────────────────────────────────
? Apply missing value checks to the filtered columns in 'dim_customer':  done (6 selections)


─────────────────────────────── Add duplicate value checks - https://go.soda.io/duplicate [6/7] ───────────────────────────────
? Apply duplicate value checks to the following columns in 'dim_customer':  done (1 selection)


──────────────────────────────────────────── Run a scan to test data quality [7/7] ────────────────────────────────────────────
╭─ Generated SodaCL Summary - sodacl_dim_customer_2023_06_13_09_31_56.yaml ───────────────────────────────────────────────────╮
│                                                                                                                             │
│ checks for dim_customer:                                                                                                    │
│                                                                                                                             │
│   # Add a schema check - https://go.soda.io/schema                                                                          │
│   - schema:                                                                                                                 │
│       name: Any schema changes                                                                                              │
│       warn:                                                                                                                 │
│         when schema changes:                                                                                                │
│           - column delete                                                                                                   │
│           - column add                                                                                                      │
│           - column index change                                                                                             │
│           - column type change                                                                                              │
│                                                                                                                             │
│   # Add a row count check - https://go.soda.io/row-count                                                                    │
│   - row_count > 0                                                                                                           │
│   - anomaly score for row_count < default                                                                                   │
│                                                                                                                             │
│   # Add freshness check - https://go.soda.io/freshness                                                                      │
│   - freshness(date_first_purchase) < 19h                                                                                    │
│                                                                                                                             │
│   # Add validity checks - https://go.soda.io/invalid                                                                        │
│   - invalid_count(email_address) = 0:                                                                                       │
│       valid format: email                                                                                                   │
│                                                                                                                             │
│   # Add missing value checks - https://go.soda.io/missing                                                                   │
│   - missing_count(customer_key) = 0                                                                                         │
│   - missing_count(last_name) = 0                                                                                            │
│   - missing_count(email_address) = 0                                                                                        │
│   - missing_count(phone) = 0                                                                                                │
│   - missing_count(date_first_purchase) = 0                                                                                  │
│                                                                                                                             │
│   # Add duplicate value checks - https://go.soda.io/duplicate                                                               │
│   - duplicate_count(email_address) = 0                                                                                      │
│                                                                                                                             │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
? Run suggested sodacl file for sodacl_dim_customer_2023_06_13_09_31_56.yaml (Y/n, <b> go previous step) Yes
🌑  Running Soda Scan...
```

[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Run check suggestions](#run-check-suggestions)<br />
[Suggestion details](#suggestion-details)<br />
[Go further](#go-further)<br />
<br />
<br />

## Compatibility

You can use check suggestions with the following data sources:

* [GCP Big Query]({% link soda/connect-bigquery.md %})
* [PostgreSQL]({% link soda/connect-postgres.md %})
* [Snowflake]({% link soda/connect-snowflake.md %})

## Prerequisites

* You have installed Python 3.10 or greater.
* You have installed a [Soda Library package]({% link soda-library/install.md %}#install) for Big Query, PostgreSQL, or Snowflake in your environment.
* You have [configured Soda Library]({% link soda-library/configure.md %}) to connect to your data source.

## Run check suggestions
*Requires Soda Library*<br />
Use the following command to run the check suggestions assisstant. Refer to the table below for input values for the command options. 
{% include code-header.html %}
```shell
soda suggest -d adventureworks -c configuration.yml -ds dataset_name
```

| Option | Required? | Value |
| ------ | --------- | ----- |
| `-d TEXT` OR<br /> `--datasource TEXT` | required | Identify the name of your data source. |
| `-c TEXT` OR<br />`--configuration TEXT` | required | Identify the filepath and filename of your own `configuration.yml` file. |
| `-o TEXT` OR<br />`--output-dir TEXT` | optional | Specify the output directory for the `checks.yml` file check suggestions generates. If you do not specify a location, it saves the `checks.yml` file in your current working directory.|
| `-ds TEXT` OR<br />`--dataset TEXT` | optional | Specify the dataset name for the `checks.yml` file. If you do not specify a name, it asks you to identify a dataset during the suggestion workflow.
| `--disable-color BOOLEAN` | optional | Set to `false` if don't wish to see colors. |

When running, check suggestions automatically prompts you with a series of questions to gather information about your data and the quality checks that you ought to apply; see the [section below](#suggestion-steps). After you answer, or skip the questions, it generates a `checks.yml` file with suggested checks based on your input.

Following best practice, check suggestions prepares one `checks.yml` file per dataset; if you wish, you can run `soda suggest` multiple times to prepare suggested checks and `checks.yml` files for each dataset in your data source. After it generates the `checks.yml` file, you can manually add, remove, or modify data quality checks in the file as you wish.

With both a `configuration.yml` and a prepared `checks.yml` file, you can follow the assistant's final prompt to run a scan for data quality, or [Run a Soda scan]({% link soda-library/run-a-scan.md %}) manually when wish.

## Suggestion details

**Select a dataset** Check suggestions prompts you to select a dataset from the list of available datasets in the data source. It prepares one `checks.yml` file per dataset.

**Select checks for basic data quality coverage** The assistant prompts you to select the checks you wish to include in the `checks.yml`. It can prepare only the following types of basic checks:

* [schema]({% link soda-cl/schema.md %})
* [row count]({% link soda-cl/numeric-metrics.md %})
* [freshness]({% link soda-cl/freshness.md %})
* [validity]({% link soda-cl/validity-metrics.md %})
* [missing]({% link soda-cl/missing-metrics.md %})
* [duplicate]({% link soda-cl/numeric-metrics.md %})

**Set column filtering** If your dataset contains more than 20 columns, the assisstant prompts you to shorten the list by asking you to select the column names to which you wish to add checks for missing and duplicate values.

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

**Add time-based partitioning** Also referred to as dataset filtering, this step prompts you to specify a time range on which to apply the data quality checks. 

By default, check suggestions sets the time-based partition to one day if the column contains DATE type data, and the preceding 24 hours if the column contains DATETIME data. When generating a list of candidate columns to which to apply the time-based partition, the assisstant uses heuristic methods to automatically identify and rank column names.

<details>
  <summary style="color:#00BC7E">Read more about heuristic ranking</summary>
  The heuristic ranking strategy identifies the most suitable columns for effectively partitioning your data. The algorithm it uses for ranking applies several criteria and heuristic scoring to assess the columns' incrementality, standard deviation, maximum date, missing values, and column names.
  <br /> 
  <ol>
  <li> Incrementality: This criterion checks whether the values in a time-based column incrementally change over time. It assesses if the date or time values consistently increase as new records are added. Columns with higher incrementality scores are more likely to provide a meaningful partitioning mechanism.</li>
  <li>Standard Deviation: Check suggestions uses standard deviation between dates to assess the uniformity or distribution of values in a time-based column. Columns with low standard deviation indicate that the dates are closely packed together, suggesting a more consistent and evenly-spaced distribution.</li>
  <li>Maximum Date: This step examines the maximum date value in a column and compares it to the current date. Columns with a maximum date value that is less than the current date receive a higher score. This criterion helps identify columns with recent data.</li>
  <li>Missing Value: Check suggestions considers the number of missing values in a column; those with fewer missing values receive a higher score. This criterion helps identify columns with more complete data.</li>
  <li>Column Name: Check suggestions analyzes the names of the columns to determine their relevance for partitioning. The algorithm assigns higher points to columns with names that contain keywords such as "create", "insert", "generate", etc. This criterion aims to identify columns that are likely to represent meaningful, time-based information.</li>
  </ol>

  After calculating scores from each of the five criteria, the algorithm combines them to obtain a comprehensive score for each time-based column. The assistant then ranks the columns from highest to lowest score, providing guidance on the partitioning suitability of each column.
</details>

Refer to [Configure dataset filters]({% link soda-cl/filters.md %}#configure-dataset-filters) for more information.

```yaml
filter customer [daily]:
where: created_at > TIMESTAMP '${NOW}' - interval '1d'

checks for customer [daily]:
  - missing_count(name) < 5
  - duplicate_count(phone) = 0
```

**Add a freshness check** A freshness check ensures that the data in the dataset is up-to-date according to the latest value entered in a column containing date or timestamp values. Check suggestions uses the same heuristic methods with the time based partitioning to rank the columns. After ranking the columns, the CLI estimates the threshold by using the standard error of date differences. It then prompts you to select the column and threshold to use for the freshness check.

Refer to [Freshness checks]({% link soda-cl/freshness.md %}) for more information.

```yaml
checks for dataset_A:
  - freshness(date_first_purchase) < 24h
```

**Add validity checks** A validity check compares the data in text columns to a specific format (see the list that follows) to determine whether the content is valid. For example, such a check can validate that all rows in an `id` column contain UUID-formatted values.

Check suggestions prompts you to select the columns that are candidates for validity checks, which must contain text type data such as CHAR, VARCHAR, or TEXT.

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

**Add missing checks** A missing check automatically identifies any NULL values within your dataset. Check suggestions prompts you to select the columns to which you want to apply a missing check. By default, it sets each check threshold to `0`, which means that a check fails if there are any NULL values in the column.

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

**Add duplicate checks** A duplicate check identifies duplicate records or entries within your dataset. By default, it sets each check threshold to `0`, which means that a check fails if there are any duplicate values in the column.

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

* With both a `configuration.yml` and a prepared `checks.yml` file, you can manually [run a Soda scan]({% link soda-library/run-a-scan.md %}) for data quality.
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
