---
layout: default
title: Schema checks
description: Use a SodaCL (Beta) schema check to validate column presence, absence, or position in a table, or the type of data column contains.
parent: SodaCL (Beta)
---

# Schema checks ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

A schema check validates column presence, absence, or position in a table, or the type of data column contains. SodaCL schema checks are case insensitive for column names.

[Schema checks for column presence](#schema-checks-for-column-presence)<br />
[Schema checks with warnings](#schema-checks-with-warnings)<br />
[Schema checks for data type](#schema-checks-for-data-type)<br />
[Schema checks for index order](#schema-checks-for-index-order)<br />
<br />

## Schema checks for column presence

The following example validates that three columns exist in a table.
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when required column missing:
          # Each of the items in this list requires a (-) at the beginning of the line
          - id
          - sizetxt
          - distance
```

<br />

You can write the same check using a YAML list notation, as in the following example.
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when required column missing: [id, sizetxt, distance]
```

<br />

Use a schema check to validate that forbidden columns do not exist in a table, as in the example below. You can use `*` or `%` as wildcard characters in the list of items; if the item begins with a wildcard character, add quotes to the item. 
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when forbidden column present:
          - salary
          - obsolete_%
          - '%SALARY%'
```

## Schema checks with warnings

Where most checks yield pass or fail check results, you have the option of defining a warning threshold for a schema check. To do so, you define a threshold that, when reached or surpassed, triggers a warning check result.
```yaml
checks for CUSTOMERS:
  - schema:
      warn:
        when required column missing: [id, sizetxt, distance]
```

<br />

You can configure a single schema check to contain multiple `warn` and `fail` validations, as in the following example. Note that an individual check only ever yields one check result. If your check triggers both a `warn` and a `fail`, the check result only displays the more serious, failed check result. 
```yaml
checks for CUSTOMERS:
  - schema:
      warn:
        when required column missing: [not_so_important_column]
        when forbidden column present:
          - credit_card
      fail:
        when required column missing: [id, other_important_column]
        when wrong column type:
          size: integer
        when wrong column index:
          absence_period: 23
```

## Schema checks for data type
Use a schema check to validate the type of data in a column, as in the following example.
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when wrong column type:
          # The items in this list DO NOT require a (-) at the beginning of the line
          address: character varying
          size: integer
```

Optionally, you can identify the data type of a column in a schema check using a data type alias. In other words, rather than specifying the data type of a column as `character varying`, you can specify the data type as `varchar`. For more information on data type aliases for each data source, refer to `packages/[data source]/soda_core/data_sources/[data source]_data_source.py` variable `SCHEMA_CHECK_TYPES_MAPPING` in the Soda Core repo in GitHub.

## Schema checks for index order
Use a schema check to confirm a specific index position of a column in a table, as in the following example. Indexes start from `0`. 
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when wrong column index:
          # The items in this list DO NOT require a (-) at the beginning of the line
          absence_period: 23
          size: 24
```

<!--
Verify schema changes over time.

(Coming soon)

This check will warn when anything changes in the schema:
```yaml
checks for CUSTOMERS:
  - schema:
      warn:
        when schema changes: any
```

`when schema changes` requires at least a Free Developer Soda Cloud account for storing the historic schema measurements

But it is also possible to list individual changes on which to fail or warn:
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when schema changes:
          # Each of the following schema changes is optional.  When you want to fail on any of the
          # changes, consider using 'all' like in the above example
          - column add
          - column delete
          - column type change
          - column index change
```
-->

---
{% include docs-footer.md %}