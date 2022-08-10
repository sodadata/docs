It can be time-consuming to check exceptionally large datasets for data quality in their entirety. Instead of checking whole datasets, you can use a **dataset filter** to specify a portion of data in a dataset against which Soda Core executes a check. 

1. In your checks YAML file, add a section header called `filter`, then append a dataset name and, in square brackets, the name of the filter. The name of the filter *cannot* contain spaces. Refer to the example below.
2. Nested under the `filter` header, use a SQL expression to specify the portion of data in a dataset that Soda Core must check. 
* The SQL expression in the example references two variables: `ts_start` and `ts_end`. 
* Variables must use the following syntax: `${VAR_NAME}`. 
* When you run the `soda scan` command, you must include these two variables as options in the command; see step 5.
```yaml
filter CUSTOMERS [daily]:
  where: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'
```
3. Add a separate section for `checks for your_dataset_name [filter name]`. Any checks you nest under this header execute *only* against the portion of data that the expression in the filter section defines. Refer to the example below.
4. Write any checks you wish for the dataset and the columns in it.
```yaml
checks for CUSTOMERS [daily]:
  - row_count = 6
  - missing(cat) = 2
```
5. When you wish to execute the checks, use Soda Core to run a scan of your data source and use the `-v` option to include the values for the variables you included in your filter expression, as in the example below. 
```shell
soda scan -d snowflake_customer_data -v ts_start=2022-03-11 ts_end=2022-03-15 checks.yml
```

If you wish to run checks on the same dataset *without* using a filter, add a separate section for `checks for your_dataset_name` without the appended filter name. Any checks you nest under this header execute against all the data in the dataset. 