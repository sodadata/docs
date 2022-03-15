---
layout: default
title: For each checks
description: 
sidebar: cl
parent: SodaCL
---

# For each checks

You can specify a list of checks on a multiple tables. 

First, in your checks.yml file, specify the list of tables using `for each table T`. The purpose of the `T` is only to ensure that every `for each` check has a unique name. Next, write the checks you wish to execute against the tables.

```yaml
for each table T:
  tables:
    # include the table 
    - CUSTOMERS
    # include all tables matching the wildcard expression
    - new_%
    # (optional) explicitly add the word include to make the list more readable
    - include CUSTOMERS
    # exclude a specific table
    - exclude fact_survey_response
    # exclude any tables matching the wildcard expression
    - exclude prospective_%
checks:
  - row_count > 0
  - duplicate_count = 0
```

### Notes

* Soda Core resolves all table names in the scan's default data source.
* You can use `%` as a wildcard in both data source name and table name filters.
* Soda Core table names matching is case insensitive.

---
{% include docs-footer.md %}
