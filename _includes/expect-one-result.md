Be aware that a check that contains one or more alert configurations only ever yields a *single* check result; one check yields one check result. If your check triggers both a `warn` and a `fail`, the check result only displays the more severe, failed check result. 

Using the following example, Soda Core, during a scan, discovers that the data in the dataset triggers both alerts, but the check result is still `Only 1 warning`. Nonetheless, the results in the CLI still display both alerts as having both triggered a `warn`.

```yaml
checks for dim_employee:
  - schema:
      warn:
        when required column missing: [not_so_important_column]
        when forbidden column present: [birth_date]
```
```shell
Soda Core 3.0.xxx
Scan summary:
1/1 check WARNED: 
    dim_employee in adventureworks
      schema [WARNED]
        missing_column_names = [not_so_important_column]
        forbidden_present_column_names = [birth_date]
        schema_measured = [employee_key integer, ...]
Only 1 warning. 0 failure. 0 errors. 0 pass.
Sending results to Soda Cloud
```

Adding to the example check above, the check in the example below data triggers both `warn` alerts and the `fail` alert, but only returns a single check result, the more severe `Oops! 1 failures.`

```yaml
checks for dim_employee:
  - schema:
      warn:
        when required column missing: [not_so_important_column]
        when forbidden column present: [birth_date]
      fail:
        when required column missing: [very_important_column]
```
```shell
Soda Core 3.0.xxx
Scan summary:
1/1 check FAILED: 
    dim_employee in adventureworks
      schema [FAILED]
        missing_column_names = [very_important_column]
        schema_measured = [employee_key integer, ...]
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
Sending results to Soda Cloud
```