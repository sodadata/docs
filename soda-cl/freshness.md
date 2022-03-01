---
layout: default
title: Freshness checks
description: 
parent: SodaCL
---

# Freshness checks

A freshness check measures how old the youngest row in a table is. It is to ensure that the latest data is available. Data is considered fresh when the time between the oldest row in a table and "now" is not too big. Typically tables have a `created_at` timestamp or so to indicate when the object was created. So if you see rows with a `created_at` of not that long ago, then you know that you have fresh data.

Take into account that these freshness checks are not evaluated constantly. They are executed on the scan schedule. So if you want to be alerted if data is not available and fresh by 9am, you need a schedule that executes a scan at 9am daily and have checks for availability (row count) and freshness.
```yaml
checks for CUSTOMERS:
  - freshness using row_added_ts < 1h
```

"now" by default will be taken from the scan variable `NOW` if it is specified. If this variable is not specified by the user it will be initialized in the beginning of the scan using the current machine time.

It is recommended to ensure that variable `NOW` is specified and linked to the data instead of the scan execution time. Connecting it to the data means that supplying a now variable that is based on the schedule or the same variable in the environment on which the data pipeline is based. When it is connected to the data, checks can be re-executed for example after <a href="https://www.startdataengineering.com/post/how-to-backfill-sql-query-using-apache-airflow/" target="_blank">backfilling</a>.

If you pass a variable with a timestamp, it should use the iso 8601 format. Eg `"2022-02-16 21:00:00"` or `"2022-02-16T21:00:00"`. For more details on what can be are valid variable texts to pass, see Python format <a href="https://docs.python.org/3/library/datetime.html#datetime.datetime.fromisoformat" target="_blank"> `datetime.fromisoformat`</a>.

The next example shows how to specify a specific variable name. To use variable `DATA_END_TS` instead of `NOW`:
```yaml
checks for CUSTOMERS:
  - freshness using row_added_ts with DATA_END_TS < 1h
```

Syntax for freshness check: `freshness using' {column_name} [with {now_variable_name}] < {duration}` where `[...]` indicates that the now variable name is optional

* `column_name` is the name of a timestamp column in the table
* `now_variable_name` is optional and specifies the timestamp variable name to use for "now". Default variable used is NOW
* `duration` is an indication of the max time in one of these formats
  * `3d` 1 days
  * `1d6` 1 day and 6 hours
  * `1h` 1 hour
  * `1h30` 1 hour and 30 minutes
  * `30m` 30 minutes
  * `3m30` 3 minutes and 30 seconds

To specify a warn level or both a fail and a warn level. The next example shows how to generate a warning if the most recent data is more than 1 hour old, and a failure if the data is more than 12 hours old.
```yaml
checks for CUSTOMERS:
  - freshness using row_added_ts:
      warn: when > 1h
      fail: when > 12h
```

## Timezone handling

* Freshness check assumes UTC timezone if no timezone information is provided either in the check timestamp or in the checked data coming from the data source.
* Both timestamps are converted to UTC so that comparison works as expected.

---
{% include docs-footer.md %}