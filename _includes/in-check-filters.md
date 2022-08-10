Add a filter to a check to specify a portion of the data against which Soda executes the check.  

Add a filter as a nested key:value pair, as in the following example which filters the check results to display only those rows with a value of 81 or greater and which contain `11` in the `sales_territory_key` column. You cannot use a variable to specify an in-check filter.

```yaml
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: sales_territory_key = 11
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
<br />

Be aware that if no rows match the filter parameters you set, Soda does not evaluate the check. In other words, Soda first finds rows that match the filter, *then* executes the check on those rows. 

If, in the example above, none of the rows contained a value of `11` in the `sales_territory_key` column, Soda does not evaluate the check and returns a `NOT EVALUATED` message in the CLI scan output, such as the following.

```shell
Soda Core 3.0.xxx
Scan summary:
1/1 check NOT EVALUATED: 
    dim_employee in adventureworks
      Too many vacation hours for US Sales [NOT EVALUATED]
        check_value: None
1 checks not evaluated.
Apart from the checks that have not been evaluated, no failures, no warnings and no errors.
```