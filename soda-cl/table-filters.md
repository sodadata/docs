---
layout: default
title: Table filters
description: Instead of checking whole tables, you can use SodaCL (Beta) table filters to specify a portion of data in a table against which Soda Core executes a check.
parent: SodaCL (Beta)
---

# Table filters ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

It can be time-consuming to check exceptionally large tables for data quality in their entirety. Instead of checking whole tables, you can use table filters to specify a portion of data in a table against which Soda Core executes a check.

Use a filter SQL expression to specify the portion of data in a table that Soda Core must check. The following example defines a `daily` filter 
for the `CUSTOMERS` table. The SQL expression in the example references two variables: `ts_start` and `ts_end`. When you run the `soda scan` command, you must include these two variables as options in the command, as in the example below.

Checks.yml:
```yaml
filter CUSTOMERS [daily]:
  where: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - row_count = 6
  - missing(cat) = 2
```
Scan command:
```shell
soda scan -d snowflake_customer_data -v ts_start=2022-03-11 ts_end=2022-03-15 checks.yml
```


Note that in a single checks.yml file, you can declare checks on both a portion of a table and the full table.

---
{% include docs-footer.md %}
