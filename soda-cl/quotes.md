---
layout: default
title: Quotes
description:
sidebar: cl 
parent: SodaCL
---

# Quotes

Use your data_source quoting style in SodaCL. Soda Tools will be pass the used quoting style to the generated SQL queries transparently.

For all situations where Soda Tools builds up the query, quotes will be kept as specified in the file.

Reference a table (or view) name in SodaCL without quotes like this:
```yaml
checks for CUSTOMERS:
  - row_count > 0
```

will lead to queries like
```sql
SELECT
  COUNT(*)
FROM CUSTOMERS
```

And when you add quotes to table names in SodaCL like this:
```yaml
checks for "CUSTOMERS":
  - row_count > 0
```

it will lead to quoted table name in the generated queries like this:
```sql
SELECT
  COUNT(*)
FROM "CUSTOMERS"
```

It is similar for columns. When referring to column names without quotes like this,
```yaml
checks for CUSTOMERS:
  - missing(id) = 0
```

the column names in the generated queries will not be quoted:
```sql
SELECT
  COUNT(CASE WHEN id IS NULL THEN 1 END)
FROM CUSTOMERS
```

And quoting the column name in SodaCL like this:
```yaml
checks for CUSTOMERS:
  - missing("id") = 0
```

will lead to a prefixed quoted table name in the generated queries like this:
```sql
SELECT
  COUNT(CASE WHEN "id" IS NULL THEN 1 END)
FROM CUSTOMERS
```


---
{% include docs-footer.md %}
