---
description: >-
  The Check Suggestions CLI assisstant is designed to simplify the process of
  auto-generating basic data quality checks in SodaCL.
---

# Adopt check suggestions

{% hint style="warning" %}
This feature is not supported in **Soda Core OSS**.

[Migrate](https://docs.soda.io/soda/upgrade.html#migrate-from-soda-core) to **Soda Library** in minutes to start using this feature for free with a 45-day trial.
{% endhint %}

**Check suggestions** assists Soda users in auto-generating basic data quality checks using the Soda Checks Language (SodaCL), a domain-specific language for data quality testing.

A Soda check is a test that Soda executes when it scans a dataset in your data source. SodaCL includes over 25 built-in metrics and checks that you can use to write Soda Checks for data quality, including metrics for missing values, duplicates, schema changes, and freshness. When using Soda Library, you use a `checks.yml` file to store the checks you write using SodaCL.

Instead of writing your own data quality checks from scratch, check suggestions profiles your dataset and prompts you through a series of questions so that it can leverage the built-in Soda metrics and quickly prepare data quality checks tailored to that individual dataset.

✔️    Requires Soda Core Scientific\
✖️    Supported in Soda Core\
✔️    Requires Soda Library + Soda Cloud\
✔️    Compatible with BigQuery, PostgreSQL, Snowflake data sources\
✖️    Supported in Soda Cloud + Soda Agent

***

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
│   - anomaly detection for row_count                                                                                   │
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

## Compatibility

You can use check suggestions with the following data sources:

* GCP BigQuery
* PostgreSQL
* Snowflake

## Prerequisites

* You have installed Python 3.10 or greater.
* You have installed a [Soda Library package](../quick-start-sip/install.md#install-soda-library) for BigQuery, PostgreSQL, or Snowflake in your environment and [configured Soda Library](../quick-start-sip/install.md#configure-soda) to connect to your data source.
* You have installed [Soda Scientific](../quick-start-sip/install.md#install-soda-scientific-in-a-virtual-environment-recommended).

## Run check suggestions

Use the following command to run the check suggestions assistant. Refer to the table below for input values for the command options.

```sh
soda suggest -d adventureworks -c configuration.yml -ds dataset_name
```

| Option                                                              | Required? | Value                                                                                                                                                                                   |
| ------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><code>-d TEXT</code> OR<br><code>--datasource TEXT</code></p>    | required  | Identify the name of your data source.                                                                                                                                                  |
| <p><code>-c TEXT</code> OR<br><code>--configuration TEXT</code></p> | required  | Identify the filepath and filename of your own `configuration.yml` file.                                                                                                                |
| <p><code>-o TEXT</code> OR<br><code>--output-dir TEXT</code></p>    | optional  | Specify the output directory for the `checks.yml` file check suggestions generates. If you do not specify a location, it saves the `checks.yml` file in your current working directory. |
| <p><code>-ds TEXT</code> OR<br><code>--dataset TEXT</code></p>      | optional  | Specify the dataset name for the `checks.yml` file. If you do not specify a name, it asks you to identify a dataset during the suggestion workflow.                                     |
| `--disable-color BOOLEAN`                                           | optional  | Set to `false` if don’t wish to see colors.                                                                                                                                             |

When running, check suggestions automatically prompts you with a series of questions to gather information about your data and the quality checks that you ought to apply. After you answer, or skip the questions, it generates a `checks.yml` file with suggested checks based on your input.

Following best practice, check suggestions prepares one `checks.yml` file per dataset; if you wish, you can run `soda suggest` multiple times to prepare suggested checks and `checks.yml` files for each dataset in your data source. After it generates the `checks.yml` file, you can manually add, remove, or modify data quality checks in the file as you wish.

With both a `configuration.yml` and a prepared `checks.yml` file, you can follow the assistant’s final prompt to run a scan for data quality.

#### **Select a dataset**

Check suggestions prompts you to select a dataset from the list of available datasets in the data source. It prepares one `checks.yml` file per dataset.

#### **Select checks**

The assistant prompts you to select the checks for basic data quality coverage you wish to include in the `checks.yml`. It can prepare only the following types of basic checks:

* [schema](../sodacl-reference/schema.md)
* [row count](../sodacl-reference/numeric-metrics.md)
* [freshness](../sodacl-reference/freshness.md)
* [validity](../sodacl-reference/validity-metrics.md)
* [missing](../sodacl-reference/missing-metrics.md)
* [duplicate](../sodacl-reference/numeric-metrics.md)

#### **Set column filtering**

If your dataset contains more than 20 columns, the assisstant prompts you to shorten the list by asking you to select the column names to which you wish to add checks for missing and duplicate values.

#### **Add a schema check**

This type of check validates the schema, or structure, of your data. It ensures that the columns you expect to exist are present in the dataset, and that they have the correct data type and index location.

Refer to [Schema checks](../sodacl-reference/schema.md) for more information.

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

#### **Add row count checks**

This step adds two checks: one to confirm that the dataset is not empty, and one to ensure that the current row count is not significantly different from the expected row count. Soda determines the expected row count relative to the previous row count value using a time series-based anomaly detection model.

Refer to [Anomaly detection checks](../sodacl-reference/anomaly-detection.md) for more information.

```yaml
checks for dataset_A:
  - row_count > 0
  - anomaly detection for row_count
```

#### **Add time-based partitioning**

Also referred to as dataset filtering, this step prompts you to specify a time range on which to apply the data quality checks.

By default, check suggestions sets the time-based partition to one day if the column contains DATE type data, and the preceding 24 hours if the column contains DATETIME data. When generating a list of candidate columns to which to apply the time-based partition, the assisstant uses heuristic methods to automatically identify and rank column names.

<details>

<summary>Read more about heuristic ranking</summary>

The heuristic ranking strategy identifies the most suitable columns for effectively partitioning your data. The algorithm it uses for ranking applies several criteria and heuristic scoring to assess the columns' incrementality, standard deviation, maximum date, missing values, and column names.\


1. Incrementality: This criterion checks whether the values in a time-based column incrementally change over time. It assesses if the date or time values consistently increase as new records are added. Columns with higher incrementality scores are more likely to provide a meaningful partitioning mechanism.
2. Standard Deviation: Check suggestions uses standard deviation between dates to assess the uniformity or distribution of values in a time-based column. Columns with low standard deviation indicate that the dates are closely packed together, suggesting a more consistent and evenly-spaced distribution.
3. Maximum Date: This step examines the maximum date value in a column and compares it to the current date. Columns with a maximum date value that is less than the current date receive a higher score. This criterion helps identify columns with recent data.
4. Missing Value: Check suggestions considers the number of missing values in a column; those with fewer missing values receive a higher score. This criterion helps identify columns with more complete data.
5. Column Name: Check suggestions analyzes the names of the columns to determine their relevance for partitioning. The algorithm assigns higher points to columns with names that contain keywords such as "create", "insert", "generate", etc. This criterion aims to identify columns that are likely to represent meaningful, time-based information.

After calculating scores from each of the five criteria, the algorithm combines them to obtain a comprehensive score for each time-based column. The assistant then ranks the columns from highest to lowest score, providing guidance on the partitioning suitability of each column.

</details>

Refer to [Configure dataset filters](../sodacl-reference/filters.md#configure-dataset-filters) for more information.

```yaml
filter customer [daily]:
where: created_at > TIMESTAMP '${NOW}' - interval '1d'

checks for customer [daily]:
  - missing_count(name) < 5
  - duplicate_count(phone) = 0
```

#### **Add a freshness check**

A freshness check ensures that the data in the dataset is up-to-date according to the latest value entered in a column containing date or timestamp values. Check suggestions uses the same heuristic methods with the time based partitioning to rank the columns. After ranking the columns, the CLI estimates the threshold by using the standard error of date differences. It then prompts you to select the column and threshold to use for the freshness check.

Refer to [Freshness checks](../sodacl-reference/freshness.md) for more information.

```yaml
checks for dataset_A:
  - freshness(date_first_purchase) < 24h
```

#### **Add validity checks**

A validity check compares the data in text columns to a specific format (see the list that follows) to determine whether the content is valid. For example, such a check can validate that all rows in an `id` column contain UUID-formatted values.

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

Refer to [Validity metrics](../sodacl-reference/validity-metrics.md) for more information.

```yaml
checks for dataset_A:
  - invalid_count(email_address) = 0:
      valid format: email
```

#### **Add missing checks**

A missing check automatically identifies any NULL values within your dataset. Check suggestions prompts you to select the columns to which you want to apply a missing check. By default, it sets each check threshold to `0`, which means that a check fails if there are any NULL values in the column.

Refer to [Missing metrics](../sodacl-reference/missing-metrics.md) for more information.

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

#### **Add duplicate checks**

A duplicate check identifies duplicate records or entries within your dataset. By default, it sets each check threshold to `0`, which means that a check fails if there are any duplicate values in the column.

Refer to [Numeric metrics](../sodacl-reference/numeric-metrics.md) for more information.

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

* With both a `configuration.yml` and a prepared `checks.yml` file, you can manually [run a Soda scan](../run-a-scan/) for data quality.
* Read more about Soda [metrics and checks](../sodacl-reference/metrics-and-checks.md).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
