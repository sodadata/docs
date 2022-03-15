---
layout: default
title: Schema checks
description: 
sidebar: cl
parent: SodaCL
---

# Schema checks

Simply checking for required columns.
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when required column missing:
          # Pay attention! Dashes (-) at the beginning of the next lines
          - id
          - sizetxt
          - distance
```

Or the same in short YAML list notation:
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when required column missing: [id, sizetxt, distance]
```

Or configure a `warn` instead of a fail outcome
```yaml
checks for CUSTOMERS:
  - schema:
      warn:
        when required column missing: [id, sizetxt, distance]
```

Verify column types like this:
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when wrong column type:
          # Pay attention! No - at the beginning of the next lines
          address: varchar
          size: integer
```

Type aliasing:

It is possible to use type aliasing when specifying column types. This makes writing the checks a bit more intuitive, e.g. it is possible to use `varchar` instead of `character varying` when checking a postgresql column. More info on type aliases for each data source in `packages/[data source]/soda_core/data_sources/[data source]_data_source.py` variable `SCHEMA_CHECK_TYPES_MAPPING`.

Verify that columns occur on a given index position like this. Indexes start from 0.
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when wrong column index:
          # Pay attention! No - at the beginning of the next lines
          absence_period: 23
          size: 24
```

Verify that forbidden columns do not occur like this. Use `*` or `%` as wildcards and do not forget to quote the expression if it starts with a wildcard like eg `- '%SALARY%'`
```yaml
checks for CUSTOMERS:
  - schema:
      fail:
        when forbidden column present:
          - salary
          - obsolete_%
```

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

It is also possible to combine warn and fail levels in a schema check like eg:
```yaml
checks for CUSTOMERS:
  - schema:
      warn:
        when required column missing: [not_so_important_column]
        when schema changes: any
      fail:
        when required column missing: [id, other_important_column]
        when wrong column type:
          size: integer
        when wrong column index:
          absence_period: 23
```

Column checks are done case insensitive.

---
{% include docs-footer.md %}