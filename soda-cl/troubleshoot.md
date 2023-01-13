---
layout: default
title: Troubleshoot SodaCL
description: Access guidance for resolving issues with Soda Checks Language checks and metrics.
parent: SodaCL
---

# Troubleshoot SodaCL
*Last modified on {% last_modified_at %}*

[Errors with invalid format](#errors-with-invalid-format)<br />
[Soda does not recognize variables](#soda-does-not-recognize-variables)<br />
[Missing check results in Soda Cloud](#missing-check-results-in-soda-cloud)<br />
<br />

## Errors with invalid format

**Problem:** You have written a check using an `invalid_count` or `invalid_percent` metric and used an `invalid format` config key to specify the values that qualify as invalid, but Soda errors on scan.

**Solution:** The `invalid format` configuration key only works with data type TEXT. See [Specify valid format]({% link soda-cl/validity-metrics.md %}#specify-valid-format).

See also: [Tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl)

<br />

### Soda does not recognize variables 

**Problem:** You execute a programmatic scan using Soda Core, but Soda does not seem to recognize the variables you included in the programmatic scan. 

**Solution:** Be sure to include any variables in your programmatic scan *before* the check YAML file identification. Refer to [Basic programmatic scan]({% link soda-core/programmatic.md %}#basic-programmatic-scan) for an example.

<br />

### Missing check results in Soda Cloud

**Problem:** You have written checks for a single dataset and use variables to provide check input at scan time, as in the example below. However, when you provide a different value for the variable and run the scan, the check result for the previous scan that used a different variable disappears or appears to be overwritten. 
```yaml
checks for test_table_${expected_country}:
  - failed rows:
      name: Check for ${expected_country}
      fail query: |
          select * from test_table where country = ${expected_country}
```

**Problem:** You wrote one or more checks for a dataset and the scan produced check results for the check as expected. Then, you adjusted the check -- for example, to apply to a different dataset, as in the example below -- and ran another scan. The latest scan appears in the check results, but the previous check result seems to have disappeared or been archived.
```yaml
checks for dataset_1:
  - failed rows:
      identity: failed-row-1
      fail query: |
        SELECT DISTINCT busbreakdown_id
        FROM breakdowns
```
```yaml
checks for dataset_2:
  - failed rows:
      identity: failed-row-2
      fail query: |
        SELECT DISTINCT busbreakdown_id
        FROM breakdowns
```

**Solution:** Soda Cloud archives check results if they have been removed, by deletion or alteration, from the check file. If two scans run using the same checks YAML file, but an alteration or deletion of the checks in the file took place between scans, Soda Cloud automatically archives the check results of any check that appeared in the file for the first scan, but does not exist in the same checks YAML file during the second scan.

To force Soda Cloud to retain the check results of previous scans, you can use one of the following options:
* Write individual checks and keep them static, unchanged between scan executions.
* Add the same check to different checks YAML files, then execute the scan command to include two separate checks YAML files. 

```shell
soda scan -d adventureworks -c configuration.yml checks_test.yml checks_test2.yml
```

* Use the `-s` scan definition option in the scan command to explicitly specify separate scan definitions for each scan. [Read more]({% link soda-core/scan-core.md %}#configure-the-same-scan-to-run-in-multiple-environments).

```shell
soda scan -d subscription_statuses -s subscription_statuses-BE   -c configuration.yml -v country=BE checks.yml 

soda scan -d subscription_statuses -s subscription_statuses-CA   -c configuration.yml -v country=CA checks.yml 
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