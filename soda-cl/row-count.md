---
layout: default
title: Row count checks
description: 
sidebar: cl
parent: SodaCL
---

# Row count checks

A row count check validates the number of rows in a table. Row count checks do not apply to columns.

[Row count checks with thresholds](#row-count-checks-with-thresholds)<br />
[Row count checks with filters](#row-count-checks-with-filters)<br />
[Cross-table row count checks](#cross-table-row-count-checks)<br />
[Cross-data source row count checks](#cross-data-source-row-count-checks)<br />
[Change-over-time row count checks](#change-over-time-row-count-checks)<br />
<br />


## Row count checks with thresholds

The following example validates that the table contains more than `0` rows or, in other words, that the table is not empty.
```yaml
checks for CUSTOMERS:
  - row_count > 0
```

<br />

The following example validates that the volume of rows falls within a specific range.
```yaml
checks for CUSTOMERS:
  - row_count between 1000 and 2000
```

Reference the [Metrics and thresholds]({% link soda-cl/metrics-thresholds.md %}#fixed-thresholds-and-boundaries) documentation for a list of all thresholds that numeric checks can use.

## Row count checks with filters

You can add a filter to a row count check to define the portion of data in a table against which Soda Core executes the check. A `filter` is a SQL condition that SodaCL uses exactly as you specify in the query, so include quoting appropriately.

The following example validates that there are between 1000 and 2000 rows in the table with a category of `'HIGH'`. 
```yaml
checks for CUSTOMERS:
  - row_count between 1000 and 2000:
      filter: category = 'HIGH'
```


## Cross-table row count checks

You can use a row count check to compare the volume of rows in two tables in the same data source. 

The following example compares the row counts of the `CUSTOMERS` and `RAW_CUSTOMERS` tables.
```yaml
checks for CUSTOMERS:
  - row_count same as RAW_CUSTOMERS
```

## Cross-data source row count checks

You can use a row count check to compare the volume of rows in two tables in the different data sources. 

The following example compares the row counts of the `CUSTOMERS` table in one data source and the `RAW_CUSTOMERS` table in `other_snowflake_data_source`.

```yaml
checks for CUSTOMERS:
  - row_count same as RAW_CUSTOMERS in other_snowflake_data_source
```

<!--
## Cross table row count checks with filters

(Coming soon)

TODO Consider if we should push it to the user to define the right variables and avoid clashes between the variable names when comparing?

Check if the row count of a table is the same as another table in the same data source
```yaml
checks for CUSTOMERS [daily_date]:
  - row_count same as RAW_CUSTOMERS [daily_timestamp]
```

where in the same or another file:

```yaml
filter CUSTOMERS [daily_date]:
  where: date = DATE '${date}'

filter RAW_CUSTOMERS [daily_timestamp]:
  where: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'
```

Row count comparison with table filter also works cross data source.

Learn more on [table filters](./table-filters.md)
-->

## Change-over-time row count checks

Refer to [Change-over-time thresholds]({% link soda-cl/metrics-thresholds.md %}#change-over-time-thresholds) for full details.

```yaml
checks for CUSTOMERS:
  - change for row_count < 50
  - change avg last 7 for row_count < 50
  - change min last 7 for row_count < 50
  - change max last 7 for row_count < 50
```

---
{% include docs-footer.md %}
