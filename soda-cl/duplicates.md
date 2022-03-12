---
layout: default
title: Duplicate checks
description: 
parent: SodaCL
---

# Duplicate checks

The number of rows that contain distinct values which occur more than once, relative to the column.

The following checks that the column `email_address` does not contain any duplicates.

```yaml
checks for dim_customer:
  - duplicate_count(email_address) = 0
```

The following executes the `duplicate_count` check on two columns. If either column contains a duplicate value relative to itself, the check fails.
```yaml
checks for dim_customer:
  - duplicate_count(email_address, last_name) = 0
```

### Notes

* You cannot use `duplicate_count` with table filters.
* If you have defined global column configurations for missing and valid values, you cannot use `duplicate_count` to check for those globally-configured values in columns in a table.

---
{% include docs-footer.md %}
