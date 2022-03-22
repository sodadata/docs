---
layout: default
title: Quotes
description: Use the quoting style that your data source uses in a SodaCL (Beta) check. Soda Core (Beta) uses the quoting style in the SQL queries it prepares for a scan. 
parent: SodaCL (Beta)
---

# Quotes ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

You can use the quoting style that your data source uses in SodaCL. Soda Core uses the quoting style in the aggregated SQL queries it prepares when it runs a scan. 

## Table name examples

Write a check referencing a table name *without* quotes in a checks.yml file to produce a SQL query that references the table name without quotes.

checks.yml
```yaml
checks for CUSTOMERS:
  - row_count > 0
```

SQL query
```sql
SELECT
  COUNT(*)
FROM CUSTOMERS
```

<br />

Write a check referencing a table name *with* quotes in a checks.yml file to produce a SQL query that references the table name with quotes.

checks.yml
```yaml
checks for "CUSTOMERS":
  - row_count > 0
```

SQL query
```sql
SELECT
  COUNT(*)
FROM "CUSTOMERS"
```

## Column name examples

Write a check referencing a column name *without* quotes in a checks.yml file to produce a SQL query that references the column name without quotes.

checks.yml
```yaml
checks for CUSTOMERS:
  - missing(id) = 0
```

SQL query
```sql
SELECT
  COUNT(CASE WHEN id IS NULL THEN 1 END)
FROM CUSTOMERS
```

<br />

Write a check referencing a column name *with* quotes in a checks.yml file to produce a SQL query that references the column name with quotes.

checks.yml

```yaml
checks for CUSTOMERS:
  - missing("id") = 0
```

SQL query
```sql
SELECT
  COUNT(CASE WHEN "id" IS NULL THEN 1 END)
FROM CUSTOMERS
```


---
{% include docs-footer.md %}
