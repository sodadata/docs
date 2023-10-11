---
layout: default
title: Group evolution checks
description: Use a SodaCL group evolution data quality check to validate changes to the categorical groups you defined.
parent: SodaCL reference
---

# Group evolution checks
*Last modified on {% last_modified_at %}*

Use a group evolution check to validate the presence or absence of a group in a dataset, or to check for changes to groups in a dataset relative to their previous state. <br /> 
*Not supported in Soda Core*

{% include code-header.html %}
```yaml
checks for dim_customer:
  - group evolution:
      name: Marital status
      query: |
        SELECT marital_status FROM dim_employee GROUP BY marital_status
      warn:
        when required group missing: [M]
        when forbidden group present: [T]
      fail:
        when groups change: any
```

[Define group evolution checks](#define-group-evolution-checks) <br />
[Optional check configurations](#optional-check-configurations)<br />
[List of validation keys](#list-of-validation-keys) <br />
[Expect one check result](#expect-one-check-result)<br />
[Go further](#go-further)<br />
<br />


## Define group evolution checks

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}#check-types), group by checks are unique. Evolution checks always employ a custom SQL query and an alert configuration -- specifying warn and/or fail alert conditions -- with **validation keys**. Refer to [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) for exhaustive alert configuration details.

The validation key:value pairs in group evolution checks set the conditions for a warn or a fail check result. See a [List of validation keys](#list-of-validation-keys) below. 

For example, the following check uses a `group by` configuration to execute a check on a dataset and return check results in groups. In a `group evolution` check, the `when required group missing` validation key confirms that specific groups are present in a dataset; if any of groups in the list are absent, the check result is warn.
{% include code-header.html %}
```yaml
checks for dim_product:
  - group by:
      query: |
        SELECT style, AVG(days_to_manufacture) as rare
        FROM dim_product 
        GROUP BY style
      fields:
        - style
      checks:
        - rare > 3:
            name: Rare

  - group evolution:
      query: | 
        SELECT style FROM dim_product GROUP BY style
      warn:
        when required group missing:
          - U
          - W
```

In the example above, the values for the validation key are in a nested list format, but you can use an inline list of comma-separated values inside square brackets instead. The following example yields identical checks results to the example above.
{% include code-header.html %}
```yaml
checks for dim_product:
  - group evolution:
      query: | 
        SELECT style FROM dim_product GROUP BY style
      warn:
        when required group missing: [U, W]
```

You can define a group evolution check with both warn and fail alert conditions, each with multiple validation keys. Refer to [Configure multiple alerts]({% link soda-cl/optional-config.md %}#configure-multiple-alerts) for details. Be aware, however, that a single group evolution check only ever produces a *single check result*. See [Expect one check result](#expect-one-check-result) below for details.

The following example is a single check; Soda executes each of its validations during a scan and returns a single result for the check: pass, warn, or fail. 
{% include code-header.html %}
```yaml
checks for dim_employee:
  - group evolution:
      name: Marital status
      query: |
        SELECT marital_status FROM dim_employee GROUP BY marital_status
      warn:
        when required group missing: [M]
        when forbidden group present: [S]
      fail:
        when required group missing: [T]
```

<br />

### Define group changes

Rather than specifying exact parameters for group changes, you can use the `when groups change` validation key to warn or fail when indistinct changes occur in a dataset.

Soda Cloud must have at least two measurements to yield a check result for group changes. In other words, the first time you run a scan to execute a group evolution check, Soda does not evaluate the check because it has nothing against which to compare; the second scan that executes the check yields a check result.
{% include code-header.html %}
```yaml
- group evolution:
    name: Rare product
    query: | 
      SELECT style FROM dim_product GROUP BY style
    warn:
      when groups change: any
    fail:
      when groups change: 
        - group delete
        - group add
```


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a group evolution check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail alert conditions; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
|  | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓ | Use wildcard characters  ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check; see [example](#example-with-wildcards). | See note in [example](#example-with-wildcards) below. |
|   | Use for each to apply group evolution checks to multiple datasets in one scan. | - |
|   | Apply a dataset filter to partition data during a scan. | - |


#### Example with check name
{% include code-header.html %}
```yaml
- group evolution:
    name: Rare product
    query: | 
      SELECT style FROM dim_product GROUP BY style
    warn:
      when groups change: any
```

#### Example with alert configuration
Be aware that Soda only ever returns a single check result per check. See [Expect one check result](#expect-one-check-result) for details.
{% include code-header.html %}
```yaml
- group evolution:
    name: Rare product
    query: | 
      SELECT style FROM dim_product GROUP BY style
    warn:
      when forbidden column present: [T]
    fail:
      when groups change: 
        - group delete
        - group add
```

#### Example with quotes
{% include code-header.html %}
```yaml
- group evolution:
    name: Marital status
    query: |
      SELECT marital_status FROM "dim_employee" GROUP BY marital_status
    warn:
      when required group missing: ["M"]
      when forbidden group present: ["T"]
```

#### Example with wildcards

You can use `*` or `%` as wildcard characters in a list of column names.  If the column name begins with a wildcard character, add single quotes as per the example below.
{% include code-header.html %} 
```yaml
- group evolution:
    name: Rare product
    query: | 
      SELECT style FROM dim_product GROUP BY style
    warn:
      when forbidden column present: [T%]
```

<br />


## List of validation keys

| Validation key | Values | 
| -------------- | ------ | 
| `when required group missing` | one or more column names in an inline <br />list of comma-separated values, or a nested list |  
| `when forbidden group present` | one or more column names in an inline <br />list of comma-separated values, or a nested list |  
| `when groups change` | `any` as an inline value<br /> `group add` as a nested list item<br /> `group delete` as a nested list item<br />  |



## Expect one check result

{% include expect-one-result.md %}


## Go further

* Use a [group by]({% link soda-cl/group-by.md %}) configuration to categorize your check results into groups.
* Learn more about [alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations).
* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}