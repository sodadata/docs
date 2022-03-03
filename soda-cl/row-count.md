---
layout: default
title: Row count checks
description: 
parent: SodaCL
---

# Row count checks

## Row count threshold checks

Row count must be greater than 0:
```yaml
checks for CUSTOMERS:
  - count > 0
```

Row count must be between 1000 and 2000:
```yaml
checks for CUSTOMERS:
  - count between 1000 and 2000
```

See the reference docs for all other threshold flavours

## Filtered row count checks

There must be between 1000 and 2000 rows with category 'HIGH':
```yaml
checks for TABLE_NAME:
  - count between 1000 and 2000:
      filter: category = 'HIGH'
```

`filter` is a SQL condition that will be used as-is in the query, so include quoting appropriately.

This type of row count check is based on an aggregation metric:

## Cross table row count checks

Check if the row count of a table is the same as another table in the same data source
```yaml
checks for CUSTOMERS:
  - count same as RAW_CUSTOMERS
```

## Cross data source row count checks

Check if the row count of a table is the same as another table in another data source

```yaml
checks for CUSTOMERS:
  - count same as RAW_CUSTOMERS in other_snowflake_data_source
```

## Cross table row count checks with table filters

(Coming soon)

TODO Consider if we should push it to the user to define the right variables and avoid clashes between the variable names when comparing?

Check if the row count of a table is the same as another table in the same data source
```yaml
checks for CUSTOMERS [daily_date]:
  - count same as RAW_CUSTOMERS [daily_timestamp]
```

where in the same or another file:

```yaml
table filter CUSTOMERS [daily_date]:
  filter: date = DATE '${date}'

table filter RAW_CUSTOMERS [daily_timestamp]:
  filter: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'
```

Row count comparison with table filter also works cross data source.

Learn more on table filters

## Change over time row count checks

```yaml
checks for CUSTOMERS:
  - change for count < 50
  - change avg last 7 for count < 50
  - change min last 7 for count < 50
  - change max last 7 for count < 50
```

---
{% include docs-footer.md %}