You can use variables to:
* resolve credentials in configuration files; see [Configure Soda Core]({% link soda-core/configuration.md %}#provide-credentials-as-system-variables)
* define dynamic [dataset filters]({% link soda-cl/filters.md %}#configure-dataset-filters)
* customize dynamic [check names](#customize-a-check-name)
* define dynamic in-check values; see examples below


To provide a variable at scan time, as with dynamic dataset filters or with in-check values, add a `-v` option to the scan command and specify the key:value pair for the variable, as in the following example.
```shell
soda scan -d aws_postgres_retail -c configuration.yml -v TODAY=2022-03-31 checks.yml
```

If you wish, you can provide the value more than one variable at scan time, as in the following example.

```shell
soda scan -d aws_postgres_retail duplicate_count_filter.yml -v date=2022-07-25 -v name='rowcount check'
```

<br />

#### Example: customize a check name

```yaml
variables:
  name: Customers UK
checks for dim_customer:
  - row_count > 1:
     name: Row count in ${name}
```

<br />

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

<br />

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

<br />

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

<br />


###  Configuration details and limitations

* Variables must use the following syntax: `${VAR_NAME}`.
* You cannot use a variable to provide a scan-time value for a [configuration key]({% link soda-cl/validity-metrics.md %}#list-of-configuration-keys) value, such as the value for `valid length` for an `invalid_count` check.
* If you do not explicitly specify a variable value at scan time to resolve credentials, Soda uses environment variables.
* For consistency, best practice dictates that you use upper case for variable names, though you can use lower case if you wish.