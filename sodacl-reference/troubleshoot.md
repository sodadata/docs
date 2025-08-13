---
description: >-
  Access guidance for resolving issues with Soda Checks Language checks and
  metrics.
---

# Troubleshoot SodaCL

## NoneType object is not iteratable

**Problem:** During a scan, Soda returns an error that reads `| NoneType object is not iteratable`.

**Solution:** The most likely cause of the error is incorrect indentation of your SodaCL. Double check that nested items in checks have proper indentation; refer to [SodaCL reference docs](metrics-and-checks.md) to validate your syntax.

## Errors with valid format

**Problem:** You have written a check using an `invalid_count` or `invalid_percent` metric and used a `valid format` config key to specify the values that qualify as valid, but Soda errors on scan.

**Solution:** The `valid format` configuration key only works with data type TEXT. See [Specify valid format](validity-metrics.md#specify-valid-format).

> See also: [Tips and best practices for SodaCL](../soda-cl-overview/quick-start-sodacl.md#tips-and-best-practices-for-sodacl)

## Errors with missing checks

**Problem:** You have implemented a `missing_count` check on a Redshift dataset and it was able to properly detect NULL values, but when applying the same check to an Athena dataset, the check will not detect the missing values.

**Solution:** In some data sources, rather than detecting NULL values, Soda ought to look for empty strings. Configure your missing check to explicitly check for empty strings as in the example below.

```yaml
- missing_count(column) = 0:
      missing values: ['']
```

\


### Soda does not recognize variables

**Problem:** You execute a programmatic scan using Soda Library, but Soda does not seem to recognize the variables you included in the programmatic scan.

**Solution:** Be sure to include any variables in your programmatic scan _before_ the check YAML file identification. Refer to a [basic programmatic scan](../quick-start-sip/programmatic.md#set-up-basic-programmatic-invocation-in-python) for an example.

## Missing check results in Soda Cloud

**Problem:** You wrote one or more checks for a dataset and the scan produced check results for the check as expected. Then, you adjusted the check -- for example, to apply a different threshold value, as in the example below -- and ran another scan. The latest scan appears in the check results, but the previous check result seems to have disappeared or been archived.

```yaml
checks for dataset_1:
  - row_count > 0
```

```yaml
checks for dataset_1:
  - row_count > 10
```

**Solution:** Soda Cloud archives check results if they have been removed, by deletion or alteration, from the check file. If two scans run using the same checks YAML file, but an alteration or deletion of the checks in the file took place between scans (such as adjusting the threshold in the example above), Soda Cloud automatically archives the check results of any check that appeared in the file for the first scan, but does not exist in the same checks YAML file during the second scan.

Note that this behavior _does not_ apply to changing values that use an in-check variable, as in the example below.

```yaml
checks for dataset_1:
  - row_count > ${VAR}
```

To force Soda Cloud to retain the check results of previous scans, you can use one of the following options:

* Write individual checks and keep them static between scan executions.
* Add the same check to different checks YAML files, then execute the scan command to include two separate checks YAML files.

```shell
soda scan -d adventureworks -c configuration.yml checks_test.yml checks_test2.yml
```

* [Add a check identity](optional-config.md#add-a-check-identity) parameter to the check so that Soda Cloud can accurately correlate new measurements from scan results to the same check, thus maintaining the history of check results.

## Metrics were not computed for check

**Problem, variation 1:** You have written a check using the exact syntax provided in SodaCL documentation but when you run a scan, Soda produces an error that reads something like, `Metrics 'schema' were not computed for check 'schema'`.

**Problem, variation 2:** You can run scans successfully on some datasets but one or two of them always produce errors when trying to execute checks.

**Solution:** In your checks YAML file, you cannot use a dataset identifier that includes a schema, such as `soda.test_table`. You can only use a dataset name as an identifier, such as `test_table`.

However, if you were including the schema in the dataset identifier in an attempt to run the same set of checks against multiple environments, you can do so using the instructions to [Configure a single scan to run in multiple environments](../run-a-scan/) in the Run a scan tab.

> See also: [Add a check identity](optional-config.md#add-a-check-identity)

## Errors with freshness checks

**Problem:** When you run a scan to execute a freshness check, the CLI returns one of the following error message.

```shell
Invalid staleness threshold "when < 3256d"
  +-> line=2,col=5 in checks_test.yml

```

```shell
Invalid check "freshness(start_date) > 1d": no viable alternative at input ' >'
```

**Solution:** The error indicates that you are using an incorrect comparison symbol. Remember that freshness checks can only use `<` in check, unless the freshness check employs an alert configuration, in which case it can only use `>` in the check.

\


**Problem:** When you run a scan to execute a freshness check that uses a NOW variable, the CLI returns an following error message for `Invalid check`.

```shell
Invalid check "freshness(end_date) ${NOW} < 1d": mismatched input '${NOW}' expecting {'between', 'not', '!=', '<>', '<=', '>=', '=', '<', '>'}
```

**Solution:** Until the known issue is resolved, use a deprecated syntax for freshness checks using a NOW variable, and ignore the `deprecated syntax` message in the output. For example, define a check as per the following.

```yaml
checks for dim_product:
  - freshness using end_date with NOW < 1d
```

\


## Checks not evaluated

**Problem:** You have written a check that has accurate syntax but which returns scan results that include a `[NOT EVALUATED]`message like the following:

```shell
1/3 checks NOT EVALUATED: 
INFO:soda.scan:[13:50:53]     my_df in dask
INFO:soda.scan:[13:50:53]       time_key_duplicates < 1 [soda-checks/checks.yaml] [NOT EVALUATED]
INFO:soda.scan:[13:50:53]         check_value: None
INFO:soda.scan:[13:50:53] 1 checks not evaluated.
```

**Solution:** The cause of the issue may be one of the following:

* Where a check returns `None`, it means there are no results or the values is `0`, which Soda cannot evaluate. In the example above, the check involved calculating a sum which resulted in a value of `0` which, consequently, translates as `[NOT EVALUATED]` by Soda.
* For a [change-over-time check](numeric-metrics.md#change-over-time-thresholds), if the previous measurement value is `0` and the new value is `0`, Soda calculates the relative change as `0%`. However, if the previous measurement value is `0` and the new value is not `0`, then Soda indicates the check as `[NOT EVALUATED]` because the calculation is a division by zero.
* If your check involves a threshold that compares relative values, such as [change-over-time checks](numeric-metrics.md#change-over-time-thresholds), [anomaly detection checks](anomaly-detection.md), or [schema checks](schema.md), Soda needs a value for a previous measurement before it can make a comparison. In other words, if you are executing these checks for the first time, there is no previous measurement value against which Soda can compare, so it returns a check result of `[NOT EVALUATED]`.\
  Soda begins evaluating schema check results after the first scan; anomaly detection after four scan of regular frequency.

## Filter not passed with reference check

**Problem:** When trying to run a Soda Library reference against a partitioned dataset in combination with a dataset filter, Soda does not pass the filter which results in an execution error.

**Solution:** Where both datasets in a [reference check](reference.md) have the same name, the [dataset filter](filters.md#configure-dataset-filters) cannot build a valid query because it does not know to which dataset to apply the filter.

For example, this reference check compares values of columns in datasets with the same name, `customers_c8d90f60`. In this case, Soda does not know which `ts` column to use to apply the WHERE clause because the column is present in both datasets. Thus, it produces an error.

```yaml
filter customers_c8d90f60 [daily]:
  where: ts > TIMESTAMP '${NOW}' - interval '100y'

checks for customers_c8d90f60 [daily]:
  - values in (cat) must exist in customers_c8d90f60 (cat2)
# This is a reference check using the same dataset name as both target and source of the comparison.
```

As a workaround, you can create a separate dataset filter for such a reference check and prefix the column name with wither `SOURCE.` or `TARGET.` to identify to Soda the column to which it should apply the filter.

In a separate filter in the example below, the `ts` uses the prefix `SOURCE.` to specify that Soda ought to apply the dataset filter to the source of the comparison and not the target.

```yaml
filter customers_c8d90f60 [daily]:
  where: ts > TIMESTAMP '${NOW}' - interval '100y'

filter customers_c8d90f60 [daily-ref]:
  where: SOURCE.ts > TIMESTAMP '${NOW}' - interval '100y'

checks for customers_c8d90f60 [daily]:
  - duplicate_count(cat) < 10
  - row_count > 10

checks for customers_c8d90f60 [daily-ref]:
  - values in (cst_size, cat) must exist in customers_c8d90f60 (cst_size, cat)
```

## Failed row check with CTE error

**Problem:** Running scan with a failed row check produces and error that reads `YAML syntax error while parsing a block mapping`.

**Solution:**\
If you are using a failed row check with a CTE fail condition, the syntax checker does not accept an expression that begins with double-quotes. In that case, as a workaround, add a meaningless `true and` to the beginning of the CTE, as in the following example.

```yaml
checks for corp_value:
  - failed rows:
      fail condition: true and "column.name.PX" IS NOT null
```

## Errors when column names contain periods or colons

**Problem**: A check you've written executes against a column with a name that includes a period or colon, and scans produce an error.

**Solution**: Column names that contain colons or periods can interfere with SodaCL’s YAML-based syntax. For any column names that contain these punctuation marks, [apply quotes](optional-config.md#use-quotes-in-a-check) to the column name in the check to prevent issues.

## Errors when using in-check filters

**Problem:** When preparing an in-check filter using quotes for the column names, the Soda scan produces an error.\


```yaml
checks for my_dataset:
- missing_count("Email") = 0:
    name: missing email
    filter: "Status" = 'Client'
```

**Solution:** The quotes are the cause of the problem; they produce invalid YAML syntax which results in an error message. Instead, write the check without the quotes or, if the quotes are mandatory for the filter to work, prepare the filter in a text block as in the following example.\


```yaml
checks for my_dataset:
  - missing_count("Email") = 0:
      name: missing email
      filter: |
        "Status" = 'Client'  
```

## Using reference checks with Spark DataFrames

If you are using reference checks with a Spark or Databricks data source to validate the existence of values in two datasets within the same schema, you must first convert your DataFrames into temp views to add them to the Spark session, as in the following example.

```python
# after adding your Spark session to the scan
df.createOrReplaceTempView("df")
df2.createOrReplaceTempView("df2")
```

## Single quotes in valid values list result in error

**Problem:** Using an `invalid_count` check, the list of `valid_values` includes a value with a single quote, such as `Tuesday's orders`. During scanning, he check results in and error because it does not recognize the special character.

**Solution:** When using single-quoted strings, any single quote `'` inside its contents must be doubled to escape it. For example, `Tuesday''s orders`.

## Databricks issue with column names that being with a number

**Problem:** When running scans on Databricks, Soda encounters an error on columns that begin with a number.

**Solution:** In Databricks, when dealing with column names that start with numbers or contain special characters such as spaces, you typically need to use backticks to enclose the column identifier. This is because Databricks uses a SQL dialect that is similar to Hive SQL, which supports backticks for escaping identifiers. For example:

```yaml
checks for soda_test:
  - missing_count(`1_bigint`):
      name: test
      fail: when > 0
```

## Go further

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
