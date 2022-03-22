---
layout: default
title: Freshness checks
description: Use a SodaCL (Beta) freshness check to infer data freshness according to the age of the most recently added row in a table.
parent: SodaCL (Beta)
---

# Freshness checks ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

A freshness check measures the age of the youngest row in a table. You can infer data freshness according to the age of the most recently added row in a table. If, for example, you use the data in a table to prepare a daily report at 9:00am, you can run a scan to check for freshness immediately before 9:00am to ensure that the report uses good-quality data.

The following example checks if the most recently added row in the `CUSTOMERS` table was added no later than one day ago. 

Checks.yml:
```yaml
checks for CUSTOMERS:
  - freshness using row_added_ts < 1d
```
<br />
The following list describes the elements that form the syntax of a freshness check.

```yaml
- freshness using {column_name} [with {now_variable_name}] < {duration}
```
* `freshness using` is the name of the check
* `column_name` is the name of a timestamp column in the table
* `now_variable_name` is optional input that specifies the timestamp variable name to use as the value for `NOW`. See [Variables with freshness checks](#variables-with-freshness-checks) below.
* `<` is the operand 
* `duration` is an indication of acceptable age of the youngest column in the table relative to `NOW`
  * `3d` 3 days
  * `1d6` 1 day and 6 hours
  * `1h` 1 hour
  * `1h30` 1 hour and 30 minutes
  * `30m` 30 minutes
  * `3m30` 3 minutes and 30 seconds

You can also specify thresholds that define the type of check status a freshness check produces. In the example below, Soda Core triggers a warning if the most recent data is more than one hour old, and returns a fail status if the data is more than 12 hours old.
```yaml
checks for CUSTOMERS:
  - freshness using row_added_ts:
      warn: when > 1h
      fail: when > 12h
```


## Variables with freshenss checks

SodaCL measures freshness relative to the value of `NOW`. Unless you specify otherwise using a variable in your scan command, the default value of `NOW` is the current time on your local machine. 

For example, to use the variable `DATA_END_TS` instead of `NOW`, you include `with DATA_END_TS` in the freshness check.

```yaml
checks for example_table:
  - freshness using row_added_ts with DATA_END_TS < 1h
```

If no timezone information is available in either the timestamp of the check, or in the data from the data source, a freshness check assumes UTC timezone. Soda Core converts both timestamps to UTC so that comparison to check for freshness works as expected.

If you decide to specify a non-default value for `NOW`, best practice dictates that you link the value to the data, and not the scan execution time. 
Connecting the value of `NOW` to the data means that the variable you supply for the check uses the same schedule or the same variable in the environment your data pipeline uses. For example, when you connect the value to the data, you can re-execute checks after <a href="https://www.startdataengineering.com/post/how-to-backfill-sql-query-using-apache-airflow/" target="_blank">backfilling</a> using Apache Airflow.

In your scan command, if you use a variable with a timestamp, the variable must be in ISO8601 format such as `"2022-02-16 21:00:00"` or `"2022-02-16T21:00:00"`. Refer to Python format <a href="https://docs.python.org/3/library/datetime.html#datetime.datetime.fromisoformat" target="_blank"> `datetime.fromisoformat`</a> for more detail on valid variable formats you can use.


---
{% include docs-footer.md %}