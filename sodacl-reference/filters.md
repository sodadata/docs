---
description: >-
  Instead of checking whole sets of data, use filters to specify a portion of
  data against which to execute a check. Use variables to specify values at scan
  time.
---

# Filters and variables

Use filters or variables to specify portions of data in your dataset against which Soda executes checks during a scan.

```yaml
# In-check filter
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: sales_territory_key = 11
```

```yaml
# Dataset filter with variables
filter CUSTOMERS [daily]:
  where: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - row_count = 6
  - missing(cat) = 2
```

```yaml
# In-check variable 
checks for ${DATASET}:
  - invalid_count(last_name) = 0:
      valid length: 10 
```

## In-check vs. dataset filters

The following expanation aims to help you decide when to use an in-check filter, and when to use a dataset filter.

Use **dataset filters** to create one or more partitions of data, commonly time partitions, upon which you want to execute large volumes of checks.

Instead of executing a great many checks on _all_ the data in a dataset, you can specify a smaller portion of data against which to execute all the checks. Doing so helps avoid having to repeatedly apply the same filter to many checks, and it produces a `WHERE` clause in the SQL query that Soda prepares and executes against your data.

* Except with a `NOW` variable, you cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.
* _Known issue:_ Dataset filters are not compatible with [failed rows checks which use a SQL query](failed-rows-checks.md#define-failed-rows-checks). With such a check, Soda does not apply the dataset filter at scan time.

Use **in-check filters** to exclude rows from an individual check evaluation.

In-check filters provide the ability to create conditions, or business rules, that data in a column must meet before Soda includes a row in a check evaluation. In other words, Soda first finds rows that match the filter, _then_ executes the check on those rows. As an example, you may wish to use an in-check filter to support a use case in which "Column X must be filled in for all rows that have value Y in column Z".

When you find yourself adding the same in-check filters to multiple checks, you may wish to promote an in-check filter to a dataset filter.

<details>

<summary>How Soda applies filters</summary>

Soda uses the checks you define to prepare SQL queries that it executes against the datasets in your data source. It puts as many checks under the same `checks for` header into a single query as it can. An in-check filter translates to a [CASE syntax](https://www.w3schools.com/sql/sql_case.asp) which Soda puts into that same query with other unfiltered checks.\
\
For a dataset filter, Soda generates a separate query and, again, attempts to put all checks under a `checks for` header into one query including any checks that also have a in-check filter. If your checks YAML has defined some unfiltered checks for a dataset, and applied a dataset filter to other checks on a particular partition of that data, Soda prepares two queries, each of which has several calculated metrics in the `SELECT` statement and which then flow back to their respective checks to evaluate whether they pass, warn, or fail.

</details>

## Configure in-check filters

✖️    Requires Soda Core Scientific (included in a Soda Agent)\
✔️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✔️    Supported in Soda Cloud Agreements + Soda Agent\
✔️    Available as a no-code check with a self-hosted Soda Agent connected to any Soda-supported data source, except Spark, and Dask and Pandas\
&#x20;       OR\
&#x20;       with a Soda-hosted Agent connected to a BigQuery, Databricks SQL, MS SQL Server, MySQL, PostgreSQL, Redshift, or Snowflake data source

Add a filter to a check to apply conditions that specify a portion of the data against which Soda executes the check. For example, you may wish to use an in-check filter to support a use case in which “Column X must be filled in for all rows that have value Y in column Z”.

Add a filter as a nested key:value pair, as in the following example which filters the scan results to display only those rows with a value of 81 or greater and which contain `11` in the `sales_territory_key` column. You cannot use a variable to specify an in-check filter.

```yaml
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: sales_territory_key = 11
```

If your filter uses a string as a value, be sure to wrap the string in single quotes, as in the following example.

```yaml
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: middle_name = 'Henry'
```

You can use `AND` or `OR` to add multiple filter conditions to a filter key:value pair to further refine your results, as in the following example.

```yaml
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: sales_territory_key = 11 AND salaried_flag = 1
```

To improve the readability of multiple filters in a check, consider adding filters as separate line items, as per the following example.

```yaml
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: sales_territory_key = 11 AND 
              sick_leave_hours > 0 OR
              pay_frequency > 1
```

If your column names use quotes, these quotes produce invalid YAML syntax which results in an error message. Instead, write the check without the quotes or, if the quotes are mandatory for the filter to work, prepare the filter in a text block as in the following example.

```yaml
checks for my_dataset:
  - missing_count("Email") = 0:
      name: missing email
      filter: |
        "Status" = 'Client'  
```

\


Be aware that if no rows match the filter parameters you set, Soda does not evaluate the check. In other words, Soda first finds rows that match the filter, _then_ executes the check on those rows.

If, in the example above, none of the rows contained a value of `11` in the `sales_territory_key` column, Soda does not evaluate the check and returns a `NOT EVALUATED` message in the CLI scan output, such as the following.

```sh
Soda Library 1.0.x
Soda Core 3.0.x
Scan summary:
1/1 check NOT EVALUATED: 
    dim_employee in adventureworks
      Too many vacation hours for US Sales [NOT EVALUATED]
        check_value: None
1 checks not evaluated.
Apart from the checks that have not been evaluated, no failures, no warnings and no errors.
```

> See also: [Troubleshoot SodaCL](troubleshoot.md#errors-when-using-in-check-filters).

### List of compatible metrics and checks

* all numeric metrics, _except_ `duplicate_count` and `duplicate_percent`
* both missing metrics
* both validity metrics

## Configure dataset filters

✖️    Requires Soda Core Scientific (included in a Soda Agent)\
✔️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✖️    Supported in Soda Cloud Agreements + Soda Agent\
✖️    Available as a no-code check



It can be time-consuming to check exceptionally large datasets for data quality in their entirety. Instead of checking whole datasets, you can use a **dataset filter** to specify a portion of data in a dataset against which Soda Library executes a check.

* Except with a `NOW` variable, you cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.
* _Known issue:_ Dataset filters are not compatible with [failed rows checks which use a SQL query](failed-rows-checks.md#define-failed-rows-checks). With such a check, Soda does not apply the dataset filter at scan time.

1. In your checks YAML file, add a section header called `filter`, then append a dataset name and, in square brackets, the name of the filter. The name of the filter _cannot_ contain spaces. Refer to the example below.
2. Nested under the `filter` header, use a SQL expression to specify the portion of data in a dataset that Soda Library must check.
   * The SQL expression in the example references two variables: `ts_start` and `ts_end`.
   * Variables must use the following syntax: `${VAR_NAME}`.
   *   When you run the `soda scan` command, you must include these two variables as options in the command; see step 5.

       ```yaml
       filter CUSTOMERS [daily]:
          where: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'
       ```
3. Add a separate section for `checks for your_dataset_name [filter name]`. Any checks you nest under this header execute _only_ against the portion of data that the expression in the filter section defines. Refer to the example below.
4.  Write any checks you wish for the dataset and the columns in it.

    ```yaml
    checks for CUSTOMERS [daily]:
      - row_count = 6
      - missing(cat) = 2
    ```
5.  When you wish to execute the checks, use Soda Library to run a scan of your data source and use the `-v` option to include each value for the variables you included in your filter expression, as in the example below.

    ```sh
    soda scan -d snowflake_customer_data -v ts_start=2022-03-11 -v ts_end=2022-03-15 checks.yml
    ```

If you wish to run checks on the same dataset _without_ using a filter, add a separate section for `checks for your_dataset_name` without the appended filter name. Any checks you nest under this header execute against all the data in the dataset.

## Configure a time partition using the NOW variable

If your data source is partitioned, or if you wish to apply checks in your agreement to a specific interval of time, you can do so using a dataset filter.

Use the built-in `NOW` variable to specify a relative time partition. Reference the following example to add a dataset filter to either your checks YAML file, or to the **Write Checks** step in the agreement workflow in Soda Cloud. The `where` clause in the example defines the time partition to mean "now, less one day".

```yaml
filter sodatest_dataset [daily]:
  where: ts > TIMESTAMP '${NOW}' - interval '1d'

checks for sodatest_dataset [daily]:
  - duplicate_count(email_address) < 5
```

## Configure variables in SodaCL

✖️    Requires Soda Core Scientific (included in a Soda Agent)\
✔️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✖️    Supported in Soda Cloud Agreements + Soda Agent\
✖️    Available as a no-code check\
\


You can use variables in SodaCL to:

* define dynamic [dataset filters](filters.md#configure-dataset-filters)
* customize dynamic [check names](filters.md#example-customize-a-check-name)
* define dynamic in-check values; see examples below
* define dynamic in-check filters; see [example below](filters.md#example-use-a-variable-in-an-in-check-filter)

Except with a `NOW` variable, you cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.

To provide a variable at scan time, as with dynamic dataset filters or with in-check values, add a `-v` option to the scan command and specify the key:value pair for the variable, as in the following example.

```shell
soda scan -d aws_postgres_retail -c configuration.yml -v TODAY=2022-03-31 checks.yml
```

If you wish, you can provide the value more than one variable at scan time, as in the following example.

```shell
soda scan -d aws_postgres_retail duplicate_count_filter.yml -v date=2022-07-25 -v name='rowcount check'
```

\


#### Example: customize a check name

> See also: [Customize check names](optional-config.md#customize-check-names).

```yaml
variables:
  name: Customers UK
checks for dim_customer:
  - row_count > 1:
     name: Row count in ${name}
```

\


#### Example: provide a dataset name at scan time

```yaml
checks for ${DATASET}:
  - invalid_count(last_name) = 0:
      valid length: 10 
```

Scan command:

```shell
soda scan -d my_datasource_name -c configuration.yml -v DATASET=dim_customer checks.yml
```

\


#### Example: provide a column name at scan time

```yaml
checks for dim_customer:
  - invalid_count(${COLUMN}) = 0:
      valid length: 10 
```

Scan command:

```shell
soda scan -d my_datasource_name -c configuration.yml -v COLUMN=last_name checks.yml
```

\


#### Example: provide a threshold value at scan time

```yaml
checks for dim_customer:
  - invalid_count(last_name) = ${LENGTH}:
      valid length: 10 
```

Scan command:

```shell
soda scan -d my_datasource_name -c configuration.yml -v LENGTH=0 checks.yml
```

#### Example: use a variable in an in-check filter

```yaml
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: sales_territory_key = ${SALES_TER}
```

#### Example: use a variable for a check identity

Read more about adding a [check identity](optional-config.md#add-a-check-identity).

```yaml
checks for dim_product:
  - row_count > 0:
      identity: ${IDENTITY}
```

\


### Configure variables for connection configuration

You can use variables to:

* resolve credentials in configuration files using system variables; see [Configure Soda](../quick-start-sip/install.md#provide-credentials-as-system-variables)
* pass variables for values in configuration files; see instructions below

If you use Soda Library to execute Soda scans for data quality, you can pass variables at scan time to provide values for data source connection configuration keys in your configuration YAML file. For example, you may wish to pass a variable for the value of `password` in your configuration YAML. Except with a `NOW` variable, you cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.

1. Adjust the data source connection configuration in your configuration YAML to include a variable.

```shell
data_source adventureworks:
  type: postgres
  host: localhost
  username: noname
  password: ${PASSWORD}
  database: sodacore
  schema: public
```

2. Save then file, then run a scan that uses a `-v` option to include the value of the variable in the scan command.

```shell
soda scan -d adventureworks -c configuration.yml -v PASSWORD=123abc checks.yml
```

You can provide the values for multiple variables in a single scan command.

```shell
soda scan -d adventureworks -c configuration.yml -v USERNAME=sodacore -v PASSWORD=123abc -v FRESH_NOW=2022-05-31 21:00:00 checks.yml
```

\


### Configuration details and limitations

* Variables must use the following syntax: `${VAR_NAME}`.
* For consistency, best practice dictates that you use upper case for variable names, though you can use lower case if you wish.
* If you do not explicitly specify a variable value at scan time to resolve credentials for a connection configuration, Soda uses environment variables.
* You cannot use a variable to provide a scan-time value for a [configuration key](validity-metrics.md#list-of-configuration-keys) value, such as the value for `valid length` for an `invalid_count` check.
* You may need to wrap date values for variables in single quotes for a check to execute properly. The use of single quotes is bound to the data source, so if your data source demands single quotes around date values for SQL queries, you must also include them when providing date values in SodaCL. Refer to the [Dataset filter with variables](filters.md#filters-and-variables) example at the top of this page.
* Except for using the `${NOW}` variable in a dataset filter to [configure a time partition](filters.md#configure-a-time-partition-using-the-now-variable) for checks, you cannot use variables when defining checks in an agreement in Soda Cloud. When using variables, you normally pass the values for those variables at scan time, adding them to the `soda scan` command with a `-v` option. However, because scans that execute checks defined in an agreement run according to a scan definition, there is no opportunity to add dynamic values for variables at scan time.
* _Known issue:_ SodaCL does not support using variables in \[profiling configurations]\().
* Except with a `NOW` variable, you cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.

## Go further

* Reference [tips and best practices for SodaCL](../soda-cl-overview/quick-start-sodacl.md#tips-and-best-practices-for-sodacl).
* Use a [for each](for-each.md) configuration to execute checks on multiple datasets.
* Learn more about [Optional check configurations](optional-config.md).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
