---
layout: default
title: Soda Core scan reference
description: Soda Core uses the input in the checks YAML file to prepare a scan that it runs against the data in a table. 
sidebar: core
parent: Soda Core 
---

# Soda Core scan reference 

A **scan** is a command that executes checks to extract information about data in a table.

Soda Core uses the input in the checks YAML file to prepare SQL queries that it runs against the data in a table. A single scan can execute checks against multiple datasets in a data source. 

[Anatomy of a scan command](#anatomy-of-a-scan-command)<br />
[Variables](#variables)<br />
[Scan output](#scan-output)<br />
<br />

## Anatomy of a scan command

Each scan requires the following as input:

* the name of the data source that contains the datasets of data you wish to scan, identified using the `-d` option
* a `configuration.yml` file, which contains details about how Soda Core can connect to your data source, identified using the `-c` option <!--<br /> You do not need to explicitly identify your `configuration.yml` files in the scan command. During a scan, Soda Core uses the following path and filename by default: `~/.soda/configuration.yml`. -->
* a `checks.yml` file, including its filepath if stored in a different directory, which contains the checks you write using SodaCL

Scan command:
```shell
soda scan -d postgres_retail checks.yml
```

Scan command with explicit `configuration.yml` path:
```shell
soda scan -d postgres_retail -c configuration.yml checks.yml
```

<br />
Use the soda `soda scan --help` command to review options you can include to customize the scan.

## Variables

{% include variables.md %}

## Scan output

During a scan, all checks return a status that represents the result of each check: pass, fail, warn, or error.

* If a check **passes**, you know your data is sound.
* If a check **fails**, it means the scan discovered data that falls outside the expected or acceptable parameters you defined in your check.
* If a check triggers a **warning**, it means the data falls within the parameters you defined as “worthy of a warning” in your check.
* If a check returns an **error**, it means there is a problem with the check itself, such as a syntax error.

Example output with a check that passed:
```shell
Soda Core 3.0.xx
Scan summary:
1/1 check PASSED: 
    CUSTOMERS in postgres_retail
      row_count > 0 [PASSED]
All is good. No failures. No warnings. No errors.
```

Example output with a check that triggered a warning:
```shell
Soda Core 0.0.x
Scan summary:
1/1 check WARNED: 
    CUSTOMERS in postgres_retail
      schema [WARNED]
        missing_column_names = [sombrero]
        schema_measured = [geography_key, customer_alternate_key, title, first_name, last_name ...]
Only 1 warning. 0 failure. 0 errors. 0 pass.
```

Example output with a check that failed:
```shell
Soda Core 0.0.x
Scan summary:
1/1 check FAILED: 
    CUSTOMERS in postgres_retail
      freshness (full_date_alternate_key) < 3d [FAILED]
        max_column_timestamp: 2020-06-24 00:04:10+00:00
        max_column_timestamp_utc: 2020-06-24 00:04:10+00:00
        now_variable_name: NOW
        now_timestamp: 2022-03-10T16:30:12.608845
        now_timestamp_utc: 2022-03-10 16:30:12.608845+00:00
        freshness: 624 days, 16:26:02.608845
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.

```

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-core-footer.md %}