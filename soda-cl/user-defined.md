---
layout: default
title: User-defined checks
description: 
sidebar: cl
parent: SodaCL
---

# User-defined checks

Failed rows checks are based on user defined SQL that should return no rows. If the query does return rows, these rows are stored and can be used to diagnose the problem.

## Failed rows table expression

The simplest form of checking for `failed rows` is to use a failed rows check in the list of checks for a table. Specify a SQL expression that selects failed rows.
```yaml
checks for CUSTOMERS:
  - failed rows:
      name: High customers must have size less than 3
      fail condition: cat = 'HIGH' and size >= 3
```

For failed rows, the `name` configuration is required to get proper error messages. We recommend a short line that states the property that good rows must have.

The `fail condition` configuration is a SQL expression that selects failed rows. [Variables]({% link soda-core/variables.md %}) can be used in the fail condition

(Coming soon) add example that shows how variables are used in the rows fail when expression

(Coming soon) doc when/how Soda Cloud sync identity gets updated, how to prevent it.

## Failed rows query

In the scan level checks (not associated to any table), failed checks can be specified by providing a complete SQL query that should return no rows. If it does return rows, they should contain the right information to diagnose the problem.

The query is executed as-is and can include joins.

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

Failed rows queries can be specified under the `checks:` section as well as under a specific `checks for TABLE_NAME:` section. The only difference is that in the latter case the check will be associated with the table in the case it's pushed to Soda Cloud.

For failed rows checks, the `name` configuration is required to get proper error messages. We recommend a short line that states the property that good rows must have.

The `fail query` configuration is a SQL query that selects failed rows. Variables]({% link soda-core/variables.md %}) can be used in the query.

## User-defined table expression metric checks

Checks can be based on user defined aggregation expressions like this:
```yaml
checks for CUSTOMERS:
  - avg_surface between 1068 and 1069:
      avg_surface expression: AVG(size * distance)
```

Configuration `{metric_name} expression` is a SQL aggregation expression that computes the value for the metric in the check.

Example of specifying a name, warn and fail levels for a user defined aggregation expression:
```yaml
checks for CUSTOMERS:
  - avg_surface:
      name: Average surface
      avg_surface expression: AVG(size * distance)
      warn: when < 30
      fail: when < 10
```

Other standard check configurations that apply: `name`, `filter`, `warn`, `fail`

## User-defined single metric query

Single metric query associated with a table.
```yaml
checks for CUSTOMERS:
  - mins_maxs between 100 and 1000:
      mins_maxs query: |
        SELECT MIN(MAX(a)+MAX(b))
        FROM CUSTOMERS
        WHERE cat = 'HIGH'
```

While we recommend an associating single metric queries with a table where applicable, it is not required. The next example runs the exact same check without a table association.
```yaml
checks:
  - mins_maxs between 100 and 1000:
      mins_maxs query: |
        SELECT MIN(MAX(a)+MAX(b))
        FROM CUSTOMERS
        WHERE cat = 'HIGH'
```

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

---
{% include docs-footer.md %}
