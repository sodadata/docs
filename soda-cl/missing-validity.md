---
layout: default
title: Missing and validity checks
description:
 
parent: SodaCL
---

# Missing and validity checks

Soda SQL makes sure that your checks do not interfere. In simpler solutions, missing and invalid counts often get mixed up leading to false positives and too many alerts. By clearly separating missing from invalid values, It is easier to diagnose issues when they alert.

In a column, all values are split into 3 categories:
* missing
* invalid
* valid

So for a column c, `missing_count(c)` + `invalid_count(c)` + `valid_count(c)` will always add up to the row count. 

And the `missing_percent(c)` + `invalid_percent(c)` + `valid_percent(c)` will add up to 100. 

Important! Configuring missing or valid values globally for a dataset will affect all checks. This means that if value `0` is configured as a missing value on column `value`, it will also be ignored in all checks, i.e. it will be ignored in aggregation check like `avg(value) between 30 and 70`

Fixed threshold on the missing values for column `name`.
```yaml
checks for CUSTOMERS:
  - missing_count(name) < 100
```

Relative percentage threshold: Missing values of column `name` should less than 1 percent of the total row count.
```yaml
checks for CUSTOMERS:
  - missing_percent(name) < 1
```

Percentage metrics are between 0 and 100. (and hence not between 0 and 1)

[Note] It is optional to add a percentage marker to the value So `- missing_percent(name) < 1%` is equivalent to `- missing_percent(name) < 1`

A `NULL` value is always considered a missing value. But the set of values that is considered missing can be customized locally on the check. Local configurations will only apply to the check.
```yaml
checks for CUSTOMERS:
  - missing_percent(name) < 1:
      missing values: [N/A, None, No value]
  - missing_percent(name) < 1:
      # All name values starting with XX will be considered missing
      missing regex: ^XX.*
```

The configuration of missing values can also be centralized so that it applies to all checks.
```yaml
checks for CUSTOMERS:
  - missing_percent(growth_pct) < 1
  - avg(growth_pct) between 30 and 70
  - min(growth_pct) >= 0
  - max(growth_pct) <= 100

configurations for CUSTOMERS:
  # Value -1 will be excluded from all the aggregation checks above
  - missing values for growth_pct: [-1]
```

Similarly, valid values can be defined (and only applied) locally inside a check:

TODO: When explaining valid values list, also point to reference data check which covers a different variant of validity.

```yaml
checks for CUSTOMERS:
  - invalid_percent(category) < 1%:
      valid values:
        - HIGH
        - MEDIUM
        - LOW
  - invalid_count(id) = 0:
      valid format: uuid
  - invalid_count(email_masked) = 0:
      valid regex: ^[a-z]+\*\*\*[a-z]+$
  - invalid_count(usage_pct) = 0:
      valid min: 0
      valid max: 100
  - invalid_count(name) = 0:
      valid min length: 3
      valid max length: 60
  - invalid_count(product_code) = 0:
      valid length: 7
```

or the above valid configurations can also be defined centrally so all checks on that column will leverage them.

```yaml
configurations for CUSTOMERS:
  valid values for id: [HIGH, MEDIUM, LOW]
  valid format for id: uuid
  valid regex for email_masked: ^[a-z]+\*\*\*[a-z]+$
  valid min for "usage_PCT": 0
  valid max for "usage_PCT": 100
  valid min length for name: 3
  valid max length for name: 60
  valid length for product_code: 7
```

General format for the configurations: `{configuration type} for {column name}: {config value}`. See details in the reference docs

[Warning] Column names can be specified with or without quotes, *but* quoting and case must match where they are used. So if you refer to column `"size"` in the column configurations section, the configurations will not be applied to checks referring to column `size` and `"Size"`

[Note] Missing and invalidity checks can also be combined with [table filters]({% link soda-cl/table-filters.md %})

Advanced: When both global column configurations as well as check-local configurations are specified, they combined in case of different properties. If the same property is specified both locally and globally, local wins.

```yaml
checks for CUSTOMERS:
 - invalid_percent(category) < 1%:
     missing values: [N/A, No value, null]
     valid values: [HIGH, MEDIUM, LOW]
configurations for CUSTOMERS:
  missing values for category: [N/A, No value]
  valid min length for category: 3
  valid max length for category: 6
```

Configurations used in check `invalid_percent(category) < 1%`:

| Configuration property | value |
| ---------------------- | ----- |
| missing values | [`'N/A'`, `'No value'`, `'null'`] |
| valid min length | 3 |
| valid max length | 6 |

## Failed rows

Feature requires Soda Cloud Enterprise account

Metrics `missing`, `missing_percent`, `invalid`, `invalid_percent` will store failed rows when connected to Soda Cloud enterprise account for diagnostic purposes.

`duplicates` will store a table of value / frequency for all value combinations with frequency greater than 1 for diagnostic purposes.

Using the open source Soda Core only, it is still possible to log the failed rows on the console.

## Column configurations

Column configurations can be specified both at the check level as well as the global level. These are all the column configurations:

| Column configuration name | Description | Applicable to | Example value |
| ------------------------- | ----------- | ------------- | ------------- |
| valid values  | List of valid values | text columns | `[NA, No value]` |
| valid format  |   |   |   | 		
| valid regex	  |   |   |   | 			
| valid min  |   |   |   | 				
| valid max  |   |   |   | 			
| valid min length  |   |   |   | 				
| valid max length  |   |   |   | 				
| valid length  |   |   |   | 				
| missing values  |   |   |   | 				
| missing format  |   |   |   | 				
| missing regex  |   |   |   | 				

List of all the named formats:

TODO Document the full list of all the formats as in `core/soda_core/configuration/format_cfg.py`

---
{% include docs-footer.md %}
