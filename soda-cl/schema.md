---
layout: default
title: Schema checks
description: Use a SodaCL schema check to validate column presence, absence, or position in a table, or the type of data column contains.
parent: SodaCL
redirect_from: /soda-cloud/schema-evolution.html
---

# Schema checks 

Use a schema check to validate the presence, absence or position of columns in a dataset, or to validate the type of data column contains. Read more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general. 

```yaml
checks for dim_product:
  - schema:
      name: Confirm that required columns are present
      warn:
        when required column missing: [weight_unit_measure_code, product_subcategory_key, made_up_column]
      fail:
        when required column missing:
          - product_key 
          - product_alternate_key
  - schema:
      warn:
        when forbidden column present: [credit_card]
        when wrong column type:
          standard_cost: money
      fail:
        when forbidden column present: [pii*]
        when wrong column type:
          reorder_point: smallint
  - schema:
      name: Columns out of order
      warn:
        when wrong column index:
          style: 1
      fail:
        when wrong column index:
          model_name: 22
# Requires a Soda Cloud account
  - schema:
      name: Any schema changes
      warn: 
        when schema changes: any
```

[Define schema checks](#define-schema-checks) <br />
[Optional check configurations](#optional-check-configurations)<br />
[List of validation keys](#list-of-validation-keys) <br />
[Expect one check result](#expect-one-check-result)<br />
[Go further](#go-further)<br />
<br />


## Define schema checks

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}check-types), schema checks are unique. Schema checks always employ alert configurations -- specifying warn and/or fail alert conditions -- with **validation keys** that are unique to this type of check. Refer to [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) for exhaustive alert configuration details.

The validation key:value pairs in schema checks set the conditions for a warn or a fail check result. See a [List of validation keys](#list-of-validation-keys) below. 

For example, the following check uses the `when required column missing` validation key to validate that specific columns are present in a dataset; if any of columns in the list are absent, the check result is fail.

```yaml
checks for dim_product:
  - schema:
      fail:
        when required column missing:
          - standard_cost
          - list_price
          - weight
```

In the example above, the value for the validation key is in a nested list format, but you can use an inline list of comma-separated values inside square brackets instead. The following example yields identical checks results to the example above.

```yaml
checks for dim_product:
  - schema:
      fail:
        when required column missing: [standard_cost, list_price, weight]

```

You can define a schema check with both warn and fail alert conditions, each with multiple validation keys. Refer to [Configure multiple alerts]({% link soda-cl/optional-config.md %}configure-multiple-alerts) for details. Be aware, however, that a single schema check only ever produces a *single check result*. See [Expect one check result](#expect-one-check-result) below for details.

The following example is a single check; Soda executes each of its validations during a scan. Note that unlike the nested list of column names in the example above, the nested key:value pairs that form the value for these validation keys are indented, but do not use a `-`.

```yaml
checks for dim_product:
  - schema:
      warn:
        when forbidden column present: [standard_cost]
        when wrong column type:
          standard_cost: money
          weight: double precision
      fail:
        when forbidden column present: [sombrero]
        when wrong column type:
          reorder_point: smallint
```

<br />

### Define schema evolution checks

Rather than specifying exact parameters for column changes, you can use the `when schema changes` validation key to warn or fail when indistinct changes occur in a dataset.

This type of validation key requires a **Soda Cloud** account. If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account where Soda Cloud stores all the previously-measured, historic values for your checks in the Cloud Metric Store. SodaCL can then use these stored values to establish a relative state against which to evaluate future schema checks. Therefore, you must have a created and [connected a Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to use schema evolution checks.

```yaml
checks for dim_customer:
  - schema:
      warn:
        when schema changes: any
      fail:
        when schema changes: 
         - column delete
         - column add
         - column index change
         - column type change
```


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a schema check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Define alert configurations to specify warn and fail alert conditions; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
|  | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes) | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓ | Use wildcard characters  ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check; see [example](#example-with-wildcards). | See note in [example](#example-with-wildcards) below. |
| ✓ | Use for each to apply schema checks to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |


#### Example with check name

```yaml
checks for dim_product:
  - schema:
      name: Confirm that required columns are present
      warn:
        when required column missing: [weight_unit_measure_code, product_subcategory_key]
```

#### Example with alert configuration

```yaml
checks for dim_product:
  - schema:
      warn:
        when forbidden column present: [standard_cost]
```

#### Example with quotes

```yaml
checks for dim_product:
  - schema:
      warn:
        when wrong column type:
          standard_cost: "money"
```

#### Example with wildcards

You can use `*` or `%` as wildcard characters in a list of column names.  If the column name begins with a wildcard character, add single quotes as per the example below. 
```yaml
checks for dim_product:
  - schema:
      fail:
        when forbidden column present:
          - credit_card
          - obsolete_%
          - '%SALARY%'
          - pii*
```

#### Example with for each

```yaml
for each dataset T:
  datasets:
    - dim_product_%
  checks:
    schema:
      warn:
        when schema changes: any
```

#### Example with dataset filter

```yaml
coming soon
```

<br />


## List of validation keys

| Validation key | Values | Requires a Soda<br />Cloud account | 
| -------------- | ------ | :-------------------------: |
| `when required column missing` | one or more column names in an inline <br />list of comma-separated values, or a nested list |  |
| `when forbidden column present` | one or more column names in an inline <br />list of comma-separated values, or a nested list |  |
| `when wrong column type` | nested key:value pair to identify column:expected_data_type |  |
| `when wrong column index` | nested key:value pair to identify <br />column:expected_position_in_dataset_index |  |
| `when schema changes` | `any` as an inline value<br /> `column add` as a nested list item<br /> `column delete` as a nested list item<br /> `column index change` as a nested list item <br /> `column type change` as a nested list item | ✓ |



## Expect one check result

{% include expect-one-result.md %}


## Go further

* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Use a [reference check]({% link soda-cl/reference.md %}) to validate matching contents between datasets.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}