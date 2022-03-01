---
layout: default
title: Duplicate checks
description: 
parent: SodaCL
---

# Duplicate checks

`duplicates` counts the number of distinct values which occur more than once.

So the following checks that column `id` does not contain any duplicates
```yaml
checks for CUSTOMERS:
  - duplicates(id) = 0
```

Specify multiple columns if the combination of the columns have to be unique
```yaml
checks for CUSTOMERS:
  - duplicates(cat, country, zip) = 0
```

Specify multiple columns if the combination of the columns have to be unique
```yaml
checks for CUSTOMERS:
  - duplicates(cat, country, zip) = 0
```

[Limitation] Duplicates can not yet be used with partitions and do not yet apply global column configurations for missing and valid values of the used columns.

---
{% include docs-footer.md %}