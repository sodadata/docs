---
layout: default
title: For each checks
description: 
parent: SodaCL
---

# For each checks

## For each table

For each table allow to specify a list of checks on a group of tables. Several styles of referring to tables can be combined:
```yaml
for each table T:
  tables:
    # Include the table name
    - TEST_CUSTOMERS
    # Include all table names matching this wildcard expression
    - PROD_%
    # The include directive is optional, it can be used to make the list more readable in case excludes are also specified
    - include TEST_CUSTOMERS
    # Exclude a specific table name
    - exclude SALARIES
    # Exclude a tables matching this wildcard
    - exclude SALAR%
  checks:
    - count > 0
    - missing(id) = 0
```

All table names are resolved in the scan's default data source.

The purpose of the table name `T` is only to ensure that every `for each` check has a unique name.

Both data source name and table name filters can use `%` as a wildcard.

Table name matching is done case insensitive.

---
{% include docs-footer.md %}