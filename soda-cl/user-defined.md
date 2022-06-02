---
layout: default
title: User-defined checks
description: Use a SodaCL (Beta) user-defined check to define elements of a check using SQL expressions or queries.
parent: SodaCL (Beta)
---

# User-defined checks ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

A user-defined check enables you to define elements of a check using SQL expressions or queries.

[User-defined table expression metric checks](#user-defined-table-expression-metric-checks)<br />
[User-defined single-metric query](#user-defined-single-metric-query)<br />
<br />


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
* `name` 
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
