You can use variables to:
* resolve credentials in configuration files; see [Configure Soda Core]({% link soda-core/configuration.md %}#provide-credentials-as-system-variables)
* define dynamic [dataset filters]({% link soda-cl/filters.md %}#configure-dataset-filters)
* customize dynamic [check names]({% link soda-cl/optional-config.md %}#customize-check-names)

For example, you can use a variable in a check to customize the check at scan time, as in the following example.
```yaml
checks for dim_customers:
  - row_count > ${VAR_2}
```

<br />

To use a variable at scan time, as with a dataset filter, add a `-v` option to the scan command and specify the key:value pair for the variable, as in the following example.
```shell
soda scan -d aws_postgres_retail -c configuration.yml -v TODAY=2022-03-31 checks.yml
```

If you wish, you can use more than one variable at scan time, as in the following example.

```shell
soda scan -d aws_postgres_retail duplicate_count_filter.yml -v date=2022-07-25 -v name='rowcount check'
```

<br />

###  Configuration details and limitations
* Variables must use the following syntax: `${VAR_NAME}`.
* If you do not explicitly specify a variable value at scan time, Soda uses environment variables.
* For consistency, best practice dictates that you use upper case for variable names, though you can use lower case if you wish.