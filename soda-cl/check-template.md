---
layout: default
title: Check template
description: Use a check template to write one SQL query that you can reuse in multiple Soda checks for data quality.
parent: SodaCL reference
---

# Check template
*Last modified on {% last_modified_at %}*

Use a check template to define a reusable, user-defined metric that you can apply to many checks in multiple checks files.
{% include code-header.html %}
```yaml
templates:
  - name: template_alpha
    description: Reusable SQL for writing checks.
    author: Jean-Claude
    metric: alpha
    query: |
      SELECT count(*) as alpha FROM ${table}
```

{% include code-header.html %}
```yaml
checks for dim_account:
  - $template_alpha:
      parameters:
        table: dim_account
      fail: when > 0
```
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✖️ &nbsp;&nbsp; Available as a no-code check</small>

<br />
[Define a check template](#define-a-check-template)<br />
[Optional check configruations](#optional-check-configurations)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases)<br />
[Go further](#go-further)<br />
<br />

## Define a check template
*Requires Soda Library* <br />
*Not yet supported in Soda Cloud*

A check template involves both a **template YAML** file in which you define resuable user-defined metrics, and at least one **checks YAML** file, in which you use the metric in a check for data quality. 

A check template borrows from the [user-defined check]({% link soda-cl/user-defined.md %}) syntax and has several parameters to define:

| a name | 
| a description| 
| an author |
| a metric |
| a query |  

In the very simple example below, in a file called `template.yml`, the SQL query defines a metric called `alpha`. Together with the other parameters, this user-defined metric forms the template named `template_alpha`. The SQL query uses a variable for the value of `table` so that Soda uses the value for the `table` parameter that you provide when you write the SodaCL check in the `checks.yml` file.
{% include code-header.html %}
```yaml
templates:
  - name: template_alpha
    description: Reusable SQL for writing checks.
    author: Jean-Paul
    metric: alpha
    query: |
      SELECT count(*) as alpha FROM ${table}
```

| a name | `template_alpha`
| a description| `Reusable SQL for writing checks.`
| an author | `Jean-Paul`
| a metric | `alpha`
| a query | `SELECT count(*) as alpha FROM ${table}`

Having defined the check template, you can now use it in a check in your `checks.yml` file, as in the following example. 
* Because the SQL query in the check template uses a variable for the value of `table`, you must supply the value in the check as a parameter.  
* Be sure to add an identifier for the dataset in the first line, even if you supply the name of the dataset in the check using a parameter. To render properly in Soda Cloud, the check must include a dataset identifier.
* The check must include at least one [alert configuration]({% link soda-cl/optional-config.md %}#add-alert-configurations) to define when the check result ought to fail or warn.
{% include code-header.html %}
```yaml
checks for dim_account:
  - $template_alpha:
      parameters:
        table: dim_account
      fail: when > 0
```

When you run a scan from the command-line, you must incude a `-T` option to idenfity the file path and file name of the template YAML file in which you defined your reuseable metric(s). In a programmatic scan, add the path to the template file.

Command:
{% include code-header.html %}
```shell
soda scan -d adventureworks -c configuration.yml checks.yml -T templates.yml
```

Add to programmatic scan:
{% include code-header.html %}
```python
scan.add_template_files(template_path)
```

Output:
```shell
Soda 1.0.x
Soda Core 3.0.x
Loaded check templates from templates.yml
Processing template $template_alpha
Scan summary:
1/1 checks FAILED: 
    $template_alpha fail when > 0 [FAILED]
      check_value: 99.0
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
```

<br />

In a variation of the example above, you can use a template within a [failed row check]({% link soda-cl/failed-rows-checks.md %}) so as to collect failed row samples, as in the example below.  

```yaml
checks for dim_account:
  - failed rows:
      $template_alpha:
        parameters:
          table: dim_account
```

<br />

In the following example, the same `template.yml` file contains a second template definition for `beta`. Together with the other parameters, this user-defined metric forms the template named `template_beta` and does not use a variable for the table name.
{% include code-header.html %}
```yaml
  - name: template_beta
    description: Simplified reusable SQL query.
    author: Jean-Claude
    metric: beta
    query: |
      SELECT count(*) as beta FROM dim_customer
```

You can then use the template in a check in the same, or different, `checks.yml` file. Even though the name of the dataset is included in the SQL query, you need to identify it in the check. The check must include at least one [alert configuration]({% link soda-cl/optional-config.md %}#add-alert-configurations) to define when the check result ought to fail or warn.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - $template_beta:
      warn: when between 1000 and 9999
```

When you run a scan from the command-line, you must incude a `-T` option to idenfity the file path and file name of the template YAML file in which you defined your reuseable metric(s). In a programmatic scan, add the path to the template file.

CLI command:
{% include code-header.html %}
```shell
soda scan -d adventureworks -c configuration.yml checks.yml -T templates.yml
```

Add to programmatic scan:
{% include code-header.html %}
```python
scan.add_template_files(template_path)
```

Output:
```shell
soda scan -d adventureworks -c configuration.yml checks2.yml -T templates.yml
Soda 1.0.x
Soda Core 3.0.x
Loaded check templates from templates.yml
Processing template $template_beta 
Scan summary:
1/1 check PASSED: 
    $template_beta warn when between 1000 and 9999 [PASSED]
All is good. No failures. No warnings. No errors.
```
<br />



## Optional check configurations


| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a freshness check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail thresholds; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓ | Use wildcard characters in the value in the check. | Use wildcard values as you would with CTE or SQL. |
|   | Use for each to apply checks that use templates to multiple datasets in one scan. | - |
|   | Apply a dataset filter to partition data during a scan. <br />*Known issue:* Dataset filters are not compatible with user-defined metrics in check templates.  <!--SODA-1260-->| - |

#### Example with check name
{% include code-header.html %}
```yaml
checks:
  - $template_beta:
      warn: when between 1000 and 9999
      name: Check with beta template
```

#### Example with alert configuration
{% include code-header.html %}
```yaml
checks:
  - $template_alpha:
      parameters:
        table: dim_account
      fail: when > 0
```

#### Example with quotes
{% include code-header.html %}
```yaml
checks:
  - $template_alpha:
      parameters:
        table: "dim_account"
      fail: when > 0
```
<br />

## List of comparison symbols and phrases

{% include list-symbols.md %}


## Go further

* Learn more about [user-defined checks]({% link soda-cl/user-defined.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}


