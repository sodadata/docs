---
layout: default
title: Test for uniqueness
parent: Examples
---

# Test for uniqueness

Where your table contains records that ought to be unique, such as item identifiers, you may wish to test the data to ensure there are no duplicates or that each value in a column is distinct. 

There are a few metrics you can use to test data in tables in your warehouse for unique values:
* `distinct`
* `duplicate_count`
* `unique_count`
* `uniqueness`

## Test for distinct values

Use the `distinct` column metric in your tests to ensure that each value in a column is distinct from all other values in the same column. Use with `metric_groups: duplicates` at table or column level. See [Metric groups and dependencies]({% link soda-sql/documentation/sql_metrics.md %}#metric-groups-and-dependencies).

Scan YAML:
```yaml
table_name: demodata
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
metric_groups:
  - duplicates
columns:
  id:
    tests: 
      - distinct > 1
  size:
    tests:
      - distinct > 1
```

Scan output:
```shell
  | 2.x.x
  | Scanning tables/demodata.yml ...
  | ...
FROM group_by_value
  | SQL took 0:00:00.007346
  | Query measurement: distinct(id) = 65
  | Query measurement: unique_count(id) = 65
  | Derived measurement: duplicate_count(id) = 0
  | Derived measurement: uniqueness(id) = 100
  | ...
FROM group_by_value
  | SQL took 0:00:00.003017
  | Query measurement: distinct(size) = 65
  | Query measurement: unique_count(size) = 65
  | Derived measurement: duplicate_count(size) = 0
  | Derived measurement: uniqueness(size) = 100
  | Test column(id) test(distinct > 1) passed with metric values {"distinct": 65}
  | Test column(size) test(distinct > 1) passed with metric values {"distinct": 65}
  | Executed 8 queries in 0:00:00.056644
  | Scan summary ------
  | 88 measurements computed
  | 2 tests executed
  | All is good. No tests failed.
  | Exiting with code 0

```


## Test for duplicate values

Use the `duplicate_count` column metric to test for duplicate values in a column. Use with `metric_groups: duplicates` at table or column level. See [Metric groups and dependencies]({% link soda-sql/documentation/sql_metrics.md %}#metric-groups-and-dependencies). 

Scan YAML, zero duplicate values:
```yaml
table_name: demodata
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
metric_groups:
  - duplicates
columns:
  id:
    tests: 
      - duplicate_count == 0
```

Scan output:
```shell
  | 2.x.x
  | Scanning tables/demodata.yml ...
  | ...
FROM group_by_value
  | SQL took 0:00:00.002620
  | Query measurement: distinct(id) = 65
  | Query measurement: unique_count(id) = 65
  | Derived measurement: duplicate_count(id) = 0
  | Derived measurement: uniqueness(id) = 100
  | ...
  | Test column(id) test(duplicate_count == 0) passed with metric values {"duplicate_count": 0}
  | Executed 8 queries in 0:00:00.047606
  | Scan summary ------
  | 88 measurements computed
  | 1 tests executed
  | All is good. No tests failed.
  | Exiting with code 0
```

Scan YAML, low threshold for duplicate values
```yaml
table_name: demodata
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
metric_groups:
  - duplicates
columns:
  id:
    tests: 
      - duplicate_count < 3
```

Scan output:
```shell
  | 2.x.x
  | Scanning tables/demodata.yml ...
  | ...
FROM group_by_value
  | SQL took 0:00:00.002413
  | Query measurement: distinct(country) = 4
  | Query measurement: unique_count(country) = 0
  | Derived measurement: duplicate_count(country) = 4
  | Derived measurement: uniqueness(country) = 4.6875
  | Test column(id) test(duplicate_count < 3) passed with metric values {"duplicate_count": 0}
  | Executed 8 queries in 0:00:00.048232
  | Scan summary ------
  | 88 measurements computed
  | 2 tests executed
  | All is good. No tests failed.
  | Exiting with code 0
```

## Test for unique values

Use the `unique_count` column metric in your test to ensure that a column in your table contains unique values, relative to other values in the column. Use with `metric_groups: duplicates` at table or column level. See [Metric groups and dependencies]({% link soda-sql/documentation/sql_metrics.md %}#metric-groups-and-dependencies).

Scan YAML:
```yaml
table_name: demodata
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
metric_groups:
  - duplicates
columns:
  id:
    tests: 
      - unique_count > 0
```

Scan output:
```shell
  | 2.x.x
  | Scanning tables/demodata.yml ...
  | ...
FROM group_by_value
  | SQL took 0:00:00.003185
  | Query measurement: distinct(id) = 65
  | Query measurement: unique_count(id) = 65
  | Derived measurement: duplicate_count(id) = 0
  | Derived measurement: uniqueness(id) = 100
  | ...
  | Test column(id) test(unique_count > 0) passed with metric values {"unique_count": 65}
  | Executed 8 queries in 0:00:00.054074
  | Scan summary ------
  | 88 measurements computed
  | 1 tests executed
  | All is good. No tests failed.
  | Exiting with code 0
```


## Test for uniqueness

Use the `uniqueness` column metric to gauge the relative uniqueness of values in a column. This test produces a number between 0 and 100 that indicates how unique a column is: `0` indicates that all the values are the same; `100` indicates that all the values in the column are unique. Use with `metric_groups: duplicates` at table or column level. See [Metric groups and dependencies]({% link soda-sql/documentation/sql_metrics.md %}#metric-groups-and-dependencies).

Scan YAML, all values are unique:
```yaml
table_name: demodata
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
metric_groups:
  - duplicates
columns:
  id:
    tests: 
      - uniqueness == 100
```

Scan output:
```shell
  | 2.x.x
  | Scanning tables/demodata.yml ...
  | ...
FROM group_by_value
  | SQL took 0:00:00.002458
  | Query measurement: distinct(id) = 65
  | Query measurement: unique_count(id) = 65
  | Derived measurement: duplicate_count(id) = 0
  | Derived measurement: uniqueness(id) = 100
  | ...
  | Test column(id) test(uniqueness == 100) passed with metric values {"uniqueness": 100.0}
  | Executed 8 queries in 0:00:00.049126
  | Scan summary ------
  | 88 measurements computed
  | 1 tests executed
  | All is good. No tests failed.
  | Exiting with code 0
```

Scan YAML, no values are unique:
```yaml
table_name: demodata
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
metric_groups:
  - duplicates
columns:
  id:
    tests: 
      - uniqueness == 0
```

Scan output:
```shell
  | 2.x.x
  | Scanning tables/demodata.yml ...
  | ...
FROM group_by_value
  | SQL took 0:00:00.002458
  | Query measurement: distinct(id) = 65
  | Query measurement: unique_count(id) = 65
  | Derived measurement: duplicate_count(id) = 0
  | Derived measurement: uniqueness(id) = 100
  | ...
  | Test column(id) test(uniqueness == 0) failed with metric values {"uniqueness": 100.0}
  | Executed 8 queries in 0:00:00.050528
  | Scan summary ------
  | 88 measurements computed
  | 2 tests executed
  | 1 of 2 tests failed:
  |   Test column(id) test(uniqueness == 0) failed with metric values {"uniqueness": 100.0}
  | Exiting with code 1
```