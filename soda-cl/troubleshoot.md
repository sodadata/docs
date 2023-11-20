---
layout: default
title: Troubleshoot SodaCL
description: Access guidance for resolving issues with Soda Checks Language checks and metrics.
parent: SodaCL reference
---

# Troubleshoot SodaCL
*Last modified on {% last_modified_at %}*

[Errors with valid format](#errors-with-valid-format)<br />
[Errors with missing checks](#errors-with-missing-checks)<br />
[Soda does not recognize variables](#soda-does-not-recognize-variables)<br />
[Missing check results in Soda Cloud](#missing-check-results-in-soda-cloud)<br />
[Metrics were not computed for check](#metrics-were-not-computed-for-check)<br />
[Errors with freshness checks](#errors-with-freshness-checks)<br />
[Checks not evaluated](#checks-not-evaluated)<br />
[Filter not passed with reference check](#filter-not-passed-with-reference-check)<br />
[Failed row check with CTE error](#failed-row-check-with-cte-error)<br />
[Errors with column names containing periods or colons](#errors-when-column-names-containing-periods-or-colons)<br />
[Errors when using in-check filters](#errors-when-using-in-check-filters)<br />
<br />

## Errors with valid format

**Problem:** You have written a check using an `invalid_count` or `invalid_percent` metric and used a `valid format` config key to specify the values that qualify as valid, but Soda errors on scan.

**Solution:** The `valid format` configuration key only works with data type TEXT. See [Specify valid format]({% link soda-cl/validity-metrics.md %}#specify-valid-format).

See also: [Tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl)

<br />

## Errors with missing checks

**Problem:** You have implemented a `missing_count` check on a Redshift dataset and it was able to properly detect NULL values, but when applying the same check to an Athena dataset, the check will not detect the missing values.

**Solution:** In some data sources, rather than detecting NULL values, Soda ought to look for empty strings. Configure your missing check to explicitly check for empty strings as in the example below.
```yaml
- missing_count(column) = 0:
      missing values: ['']
```

<br />

### Soda does not recognize variables 

**Problem:** You execute a programmatic scan using Soda Library, but Soda does not seem to recognize the variables you included in the programmatic scan. 

**Solution:** Be sure to include any variables in your programmatic scan *before* the check YAML file identification. Refer to a [basic programmatic scan]({% link soda-library/programmatic.md %}#set-up-basic-programmatic-invocation-in-python) for an example.

<br />

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

Note that this behaviour *does not* apply to changing values that use an in-check variable, as in the example below.
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

* [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) parameter to the check so that Soda Cloud can accurately correlate new measurements from scan results to the same check, thus maintaining the history of check results.



## Metrics were not computed for check

**Problem, variation 1:** You have written a check using the exact syntax provided in SodaCL documentation but when you run a scan, Soda produces an error that reads something like, `Metrics 'schema' were not computed for check 'schema'`.

**Problem, variaion 2:** You can run scans succesfully on some datasets but one or two of them always produce errors when trying to execute checks. 

**Solution:** In your checks YAML file, you cannot use a dataset identifier that includes a schema, such as `soda.test_table`. You can only use a dataset name as an identifier, such as `test_table`. 

However, if you were including the schema in the dataset identifier in an attempt to run the same set of checks against multiple environments, you can do so using the instructions to [Configure a single scan to run in multiple environments]({% link soda-library/run-a-scan.md %}) in the Run a scan tab.

See also: [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity)

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

<br />

**Problem:** When you run a scan to execute a freshness check that uses a NOW variable, the CLI returns an following error message for `Invalid check`. <!--CORE-449-->

```shell
Invalid check "freshness(end_date) ${NOW} < 1d": mismatched input '${NOW}' expecting {'between', 'not', '!=', '<>', '<=', '>=', '=', '<', '>'}
```

**Solution:** Until the known issue is resolved, use a deprecated syntax for freshness checks using a NOW variable, and ignore the `deprecated syntax` message in the output. For example, define a check as per the following.

```yaml
checks for dim_product:
  - freshness using end_date with NOW < 1d
```

<br />

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
* For a [change-over-time check]({% link soda-cl/numeric-metrics.md %}#change-over-time-thresholds), if the previous measurement value is `0` and the new value is `0`, Soda calculates the relative change as `0%`. However, if the previous measurement value is `0` and the new value is not `0`, then Soda indicates the check as `[NOT EVALUATED]` because the calculation is a division by zero. 
* If your check involves a threshold that compares relative values, such as [chage-over-time checks]({% link soda-cl/numeric-metrics.md %}#change-over-time-thresholds), [anomaly score checks]({% link soda-cl/anomaly-score.md %}), or [schema checks]({% link soda-cl/schema.md %}), Soda needs a value for a previous measurement before it can make a comparison. In other words, if you are executing these checks for the first time, there is no previous measurement value against which Soda can compare, so it returns a check result of `[NOT EVALUATED]`. <br />
Soda begins evaluating shema check results after the first scan; anomaly score after four scan of regular frequency.

## Filter not passed with reference check

**Problem:** When trying to run a Soda Library reference against a partitioned dataset in combination with a dataset filter, Soda does not pass the filter which results in an execution error.

**Solution:** Where both datasets in a [reference check]({% link soda-cl/reference.md %}) have the same name, the [dataset filter]({% link soda-cl/filters.md %}#configure-dataset-filters) cannot build a valid query because it does not know to which dataset to apply the filter.

For example, this reference check compares values of columns in datasets with the same name, `customers_c8d90f60`. In this case, Soda does not know which `ts` column to use to apply the WHERE clause because the column is present in both datsets. Thus, it produces an error.

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

**Solution:**
If you are using a failed row check with a CTE fail condition, the syntax checker does not accept an expression that begins with double-quotes. In that case, as a workaround, add a meaningless `true and` to the beginning of the CTE, as in the following example. 

```yaml
checks for corp_value:
  - failed rows:
      fail condition: true and "column.name.PX" IS NOT null
```

## Errors when column names containing periods or colons

**Problem**: A check you've written executes against a column with a name that includes a period or colon, and scans produce an error.

**Solution**: Column names that contain colons or periods can interfere with SodaCL's YAML-based syntax. For any column names that contain these punctuation marks, [apply quotes]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) to the column name in the check to prevent issues. <br />


## Errors when using in-check filters

**Problem:** When preparing an in-check filter using quotes for the column names, the Soda scan produces an error.<br>
```yaml
checks for my_dataset:
- missing_count("Email") = 0:
    name: missing email
    filter: "Status" = 'Client'
```

**Solution:** The quotes are the cause of the problem; they produce invalid YAML syntax which results in an error message. Instead, write the check without the quotes or, if the quotes are mandatory for the filter to work, escape the quotes using one of the following syntaxes: <br />
```yaml
checks for my_dataset:
  - missing_count("Email") = 0:
      name: missing email
      filter: \"Status\" = 'Client'

#OR

checks for my_dataset:
  - missing_count("Email") = 0:
      name: missing email
      filter: |
        "Status" = 'Client'  
```
## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}