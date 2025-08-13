---
description: >-
  Learn more about active checks and datasets as they are defined in Soda's
  licensing model.
---

# Active checks and datasets

Soda’s licensing model can include volume-based measures of active checks, or a similar model based on active datasets.

An **active dataset** is one for which Soda has executed at least one check, excluding empty datasets. A dataset counts as active if you add configuration for:

* a check
* automated monitoring checks; see [Add automated monitoring checks](../soda-cl-overview/automated-monitoring.md)
* an anomaly detection dashboard (available in 2025); see [Activate anomaly dashboards](../collaborate/anomaly-dashboard.md)

An **active check** is one that Soda has executed during a scan at least once in the past 90 days. A single check, whether it has been executed during one scan, fifty scans, or five hundred scans in the last 90 days counts as one active check.

A single check is identifiable as a test that yields a single result.

A check with one or more [alert configurations](../sodacl-reference/optional-config.md#add-alert-configurations) counts as a single check. The following is an example of a single active check as it only ever yields one result: pass, warn, fail, or error. Note, A check that results in an error counts as an active check. Soda executes the check during a scan in order to yield a result; if the result is an error, it is still a result.

```yaml
checks for dim_reseller:
  - duplicate_count(phone):
      warn: when between 1 and 10
      fail: when > 10
```

A check that is included as part of a [for each](../sodacl-reference/for-each.md) configuration yields a single result for _each_ dataset against which it is executed. The following example produces four check results and, thus, has four active checks and four active datasets.

```yaml
for each dataset T:
  datasets:
    - dim_employee
    - dim_customer
    - dim_product
    - dim_reseller
  checks:
    - row_count:
        fail:
          when < 5
        warn:
          when > 10
```

\
Similarly, a single check that is included in a scan against two data sources, or two environments such as staging and production, counts as two active checks for two active datasets. The following example `checks.yml` file contains as a single check. The scan commands that follow instruct Soda to execute the check on two different environments which counts as two active checks for two active datasets. See also: [Configure the same scan in multiple environments](../run-a-scan/#configure-the-same-scan-to-run-in-multiple-environments).

```yaml
checks for dim_customer:
    - row_count > 0
```

```sh
soda scan -d snowflake_prod -c configuration.yml -s prod_run checks.yml
soda scan -d snowflake_staging -c configuration.yml -s stage_run checks.yml
```

\
A check that involves data comparison between multiple datasets in the same, or different, data sources counts as a single check. The following example has four checks, two [cross checks](../sodacl-reference/cross-row-checks.md) and two [reference checks](../sodacl-reference/reference.md), and counts as two active datasets.

```yaml
checks for dim_customer:
  - row_count same as dim_department_group
  - row_count same as retail_customers in aws_postgres_retail
checks for dim_department_group:
  - values in (department_group_name) must exist in dim_employee (department_name)
  - values in (birthdate) must not exist in dim_department_group_prod (birthdate)
```

\
Similarly, a [reconciliation check](../sodacl-reference/recon.md) that compares data between source and target datasets in the same, or different, data sources counts as a single active check running against a single active dataset which, for this type of check, is the target dataset. The following example has five active checks for five active datasets.

```yaml
reconciliation Production:
  datasets:
    source:
      dataset: dim_customer
      datasource: mysql_adventureworks
    target:
      dataset: dim_customer
      datasource: snowflake_retail
  checks:
    - row_count diff = 0
    - duplicate_count(last_name):
        fail: when diff > 10%
        warn: when diff is between 5% and 9%
    - avg(total_children) diff < 10
    - rows diff < 5
    - schema:
        types:
          - source: bit
            target: boolean
          - source: enum
            target: string
```

\
Where a check involves grouping its results by category, as in a [group by](../sodacl-reference/group-by.md) configuration, the check itself still counts as a single check. The following example has one active check for one active dataset.

```yaml
checks for fact_internet_sales:
  - group by:
      group_limit: 10
      query: |
        SELECT sales_territory_key, AVG(discount_amount) as average_discount
        FROM fact_internet_sales
        GROUP BY sales_territory_key
      fields:
        - sales_territory_key
      checks:
        - average_discount:
            fail: when > 40
            name: Average discount percentage is less than 40% (grouped-by sales territory)
```

## Go further

* Access information about [optional configurations](../sodacl-reference/optional-config.md) that you can use in SodaCL checks.

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
