---
layout: default
title: Adopt check Suggestions
description: The Check Suggestions CLI assisstant is designed to simplify the process of auto-generating basic data quality checks in SodaCL.
parent: Write SodaCL checks
redirect_from:
- /soda-cl/check-suggestions.html
---

# Adopt check suggestions
*Last modified on {% last_modified_at %}*

{% include banner-upgrade.md %}

**Check suggestions** assists Soda users in auto-generating basic data quality checks using the Soda Checks Language (SodaCL), a domain-specific language for data quality testing.

A Soda check is a test that Soda executes when it scans a dataset in your data source. SodaCL includes over 25 built-in metrics and checks that you can use to write Soda Checks for data quality, including metrics for missing values, duplicates, schema changes, and freshness. When using Soda Library, you use a `checks.yml` file to store the checks you write using SodaCL.

Instead of writing your own data quality checks from scratch, check suggestions profiles your dataset and prompts you through a series of questions so that it can leverage the built-in Soda metrics and quickly prepare data quality checks tailored to that individual dataset. 

<small>✔️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Requires Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Compatible with BigQuery, PostgreSQL, Snowflake data sources</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud + Soda Agent</small><br />
<br />

[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Run check suggestions](#run-check-suggestions)<br />
[Go further](#go-further)<br />
<br />
<br />

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
* You have installed a [Soda Library package]({% link soda-library/install.md %}#install-soda-library-1) for BigQuery, PostgreSQL, or Snowflake in your environment and [configured Soda Library]({% link soda-library/install.md %}#configure-soda) to connect to your data source.
* You have installed [Soda Scientific]({% link soda-library/install.md %}#install-soda-library-1).

## Run check suggestions

{% include check-suggest.md %}

## Go further

* With both a `configuration.yml` and a prepared `checks.yml` file, you can manually [run a Soda scan]({% link soda-library/run-a-scan.md %}) for data quality.
* Read more about Soda [metrics and checks]({% link soda-cl/metrics-and-checks.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

{% include like-widget.md %}

{% include docs-footer.md %}
