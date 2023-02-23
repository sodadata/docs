---
layout: default
title: Troubleshoot SodaCL
description: Access guidance for resolving issues with Soda Checks Language checks and metrics.
parent: SodaCL
---

# Troubleshoot SodaCL
*Last modified on {% last_modified_at %}*

[Errors with valid format](#errors-with-valid-format)<br />
[Soda does not recognize variables](#soda-does-not-recognize-variables)<br />
[Missing check results in Soda Cloud](#missing-check-results-in-soda-cloud)<br />
[Metrics were not computed for check](#metrics-were-not-computed-for-check)<br />
[Errors with freshness checks](#errors-with-freshness-checks)<br />
<br />

## Errors with valid format

**Problem:** You have written a check using an `invalid_count` or `invalid_percent` metric and used a `valid format` config key to specify the values that qualify as valid, but Soda errors on scan.

**Solution:** The `valid format` configuration key only works with data type TEXT. See [Specify valid format]({% link soda-cl/validity-metrics.md %}#specify-valid-format).

See also: [Tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl)

<br />

### Soda does not recognize variables 

**Problem:** You execute a programmatic scan using Soda Core, but Soda does not seem to recognize the variables you included in the programmatic scan. 

**Solution:** Be sure to include any variables in your programmatic scan *before* the check YAML file identification. Refer to [Basic programmatic scan]({% link soda-core/programmatic.md %}#basic-programmatic-scan) for an example.

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

See also: [Configure a single scan to run in multiple environments]({% link soda-core/configuration.md %}#configure-the-same-scan-to-run-in-multiple-environments).


## Metrics were not computed for check

**Problem, variation 1:** You have written a check using the exact syntax provided in SodaCL documentation but when you run a scan, Soda produces an error that reads something like, `Metrics 'schema' were not computed for check 'schema'`.

**Problem, variaion 2:** You can run scans succesfully on some datasets but one or two of them always produce errors when trying to execute checks. 

**Solution:** In your checks YAML file, you cannot use a dataset identifier that includes a schema, such as `soda.test_table`. You can only use a dataset name as an identifier, such as `test_table`. 

However, if you were including the schema in the dataset identifier in an attempt to run the same set of checks against multiple environments, you can do so using the instructions to [Configure a single scan to run in multiple environments]({% link soda-core/configuration.md %}##configure-the-same-scan-to-run-in-multiple-environments).

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