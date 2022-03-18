---
layout: default
title: User-defined checks
description: 

parent: SodaCL
---

# User-defined checks

A user-defined check enables you to define elements of a check using SQL expressions or queries.

[Failed rows SQL expression for tables](#failed-rows-sql-expression for tables)<br />
[Failed rows SQL query](#failed-rows-swl-query)<br />
[User-defined table expression metric checks](#user-defined-table-expression-metric-checks)<br />
[User-defined single-metric query](#user-defined-single-metric-query)<br />
<br />


## Failed rows SQL expression for tables

Use SQL expressions to write failed rows checks that ought to return no rows. If the check does return rows, Soda stores these rows so that you can examine them in an effort to diagnose the cause of the failed state. 

Failed row checks use two key-value pairs.
* The value for `fail condition` is a SQL expression that defines the conditions that qualify as failed; it selects failed rows. 
* The value for `label` is a short description that states the property that non-failed rows must have. Soda Core uses the `label` in error messages.

```yaml
checks for CUSTOMERS:
  - failed rows:
      name: High customers must have size less than 3
      fail condition: cat = 'HIGH' and size >= 3
```

<!--
(Coming soon) add example that shows how variables are used in the rows fail when expression

(Coming soon) doc when/how Soda Cloud sync identity gets updated, how to prevent it.
-->

## Failed rows SQL query

Use SQL queries to write scan-level checks which are not associated with any table. The failed checks ought to return no rows. If the check does return rows, they contain information to help you diagnose the cause of the failed state.

Failed row checks use two key-value pairs.
* The value for `fail query` is a SQL query that selects failed rows. Soda Core executes the query as it is written, including joins.
* The value for `label` is a short description that states the property that non-failed rows must have. Soda Core uses the `label` in error messages.

```yaml
checks:
  - failed rows:
      name: customer contacts must have a valid email
      fail query: |
        SELECT *
        FROM customers as customer
             JOIN contact as contact on contact.customer_id = customer.id
        WHERE contact.type = 'email'
              AND contact.status = 'invalid'
```

Specify failed row queries  under the `checks:` section of a `checks.yml` file, or under a specific `checks for TABLE-NAME:` section. Where a failed row check is associated with a specific table, Soda Core pushes that association information to Soda Cloud, if you have connected Soda Core to your Soda Cloud account.


## User-defined table expression metric checks

The syntax for a table expression metric check, `{metric_name} expression`, is a SQL aggregation expression that computes the value for the metric in the check.

The following example demonstrates how to use a check to specify user-defined aggregation SQL expressions.
```yaml
checks for CUSTOMERS:
  - avg_surface between 1068 and 1069:
      avg_surface expression: AVG(size * distance)
```

<br />

The next example illustrates how to specify a name, and warn and fail levels for a user-defined aggregation SQL expression.
```yaml
checks for CUSTOMERS:
  - avg_surface:
      name: Average surface
      avg_surface expression: AVG(size * distance)
      warn: when < 30
      fail: when < 10
```

The following are standard check configurations that you can apply: 
* `label` 
* `filter`
* `warn`
* `fail`

## User-defined single-metric query

The following is an example of a single-metric query associated with a table.
```yaml
checks for CUSTOMERS:
  - mins_maxs between 100 and 1000:
      mins_maxs query: |
        SELECT MIN(MAX(a)+MAX(b))
        FROM CUSTOMERS
        WHERE cat = 'HIGH'
```

<br />

While best practice dictates that you associate single-metric queries with a table where applicable, it is not required. The following example defines the same check as the previous example, but without a table association.
```yaml
checks:
  - mins_maxs between 100 and 1000:
      mins_maxs query: |
        SELECT MIN(MAX(a)+MAX(b))
        FROM CUSTOMERS
        WHERE cat = 'HIGH'
```
<!--
## User-defined multi numeric metrics query

(Coming soon)
```yaml
checks:
  - min_maxs between 100 and 1000:
  - max_mins between 10 and 500:

queries:
   mins and maxs: |
       SELECT MIN(MAX(a)+MAX(b)) as min_maxs,
       MAX(MIN(a)+MIN(b)) as max_mins
       FROM CUSTOMERS
       WHERE cat = 'HIGH'
```

Aliases in the select statement will be used to map the query results to metrics in the checks and then checks are executed with the query results.
-->
---
{% include docs-footer.md %}
