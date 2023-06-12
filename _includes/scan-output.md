As a result of a scan, each check results in one of three default states:
* **pass**: the values in the dataset match or fall within the thresholds you specified
* **fail**: the values in the dataset _do not_ match or fall within the thresholds you specified
* **error**: the syntax of the check is invalid

A fourth state, **warn**, is something you can explicitly configure for individual checks. See [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations).

The scan results appear in your Soda Library command-line interface (CLI) and in the **Check Results** dashboard in the Soda Cloud web application. 

```shell
Soda Library 1.0.x
Soda Core 3.0.x
Sending failed row samples to Soda Cloud
Scan summary:
1/1 check PASSED: 
    dim_customer in adventureworks
      row_count > 0 [PASSED]
All is good. No failures. No warnings. No errors.
Sending results to Soda Cloud
Soda Cloud Trace: 4774***8
```

![configure-results](/assets/images/configure-results.png){:height="700px" width="700px"}