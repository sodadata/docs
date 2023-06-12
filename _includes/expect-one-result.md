Be aware that a check that contains one or more alert configurations only ever yields a *single* check result; one check yields one check result. If your check triggers both a `warn` and a `fail`, the check result only displays the more severe, failed check result. (Schema checks behave slightly differently; see [Schema checks]({% link soda-cl/schema.md %}#expect-one-check-result).)

Using the following example, Soda Library, during a scan, discovers that the data in the dataset triggers both alerts, but the check result is still `Only 1 warning`. Nonetheless, the results in the CLI still display both alerts as having both triggered a `[WARNED]` state.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - row_count:
      warn:
        when > 2
        when > 3
```
```shell
Soda Library 1.0.x
Soda Core 3.0.xx
Scan summary:
1/1 check WARNED: 
    dim_customer in adventureworks
      row_count warn when > 2 when > 3 [WARNED]
        check_value: 18484
Only 1 warning. 0 failure. 0 errors. 0 pass.
Sending results to Soda Cloud
Soda Cloud Trace: 42812***
```

The check in the example below data triggers both `warn` alerts and the `fail` alert, but only returns a single check result, the more severe `Oops! 1 failures.`
{% include code-header.html %}
```yaml
checks for dim_product:
  - sum(safety_stock_level):
      name: Stock levels are safe
      warn:
        when > 0
      fail:
        when > 0
```
```shell
Soda Library 1.0.x
Soda Core 3.0.xx
Scan summary:
1/1 check FAILED: 
    dim_product in adventureworks
      Stock levels are safe [FAILED]
        check_value: 275936
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
Sending results to Soda Cloud
Soda Cloud Trace: 6016***
```