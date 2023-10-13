---
layout: default
title: Active checks
description: Learn more about active checks as they are defined in Soda's licensing model.
parent: Soda CL
---

# Active checks
*Last modified on {% last_modified_at %}*

Soda's licensing model can include volume-based measures of **active checks**.  

An active check is one that Soda has executed during a scan at least once in the past 90 days. A single check, whether it has been executed during one scan, fifty scans, or five hundred scans in the last 90 days counts as one active check.

A single check is identifiable as a test that yields a single result.

A check with one or more [alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) counts as a single check. The following is an example of a single check as it only ever yields one result: pass, warn, fail, or error.  Note, A check that results in an error counts as an active check. Soda executes the check during a scan in order to yield a result; if the result is an error, it is still a result.
```yaml
checks for dim_reseller:
  - duplicate_count(phone):
      warn: when between 1 and 10
      fail: when > 10
```

<br />
A check that is included as part of a [for each]({% link soda-cl/for-each.md %}) configuration yields a single result for *each* dataset against which it is executed. The following example produces four check results and, thus, has four checks.
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

<br />
Similarly, a single check that is included in a scan against two data sources, or two environments such as staging and production, counts as two active checks. The following example `checks.yml` file contains as a single check. The scan commands that follow instruct Soda to execute the check on two different environments which counts as two active checks. See also: [Configure the same scan in multiple environments]({% link soda-library/run-a-scan.md %}#configure-the-same-scan-to-run-in-multiple-environments).
```yaml
checks for dim_customer:
    - row_count > 0
```
```shell
soda scan -d snowflake_prod -c configuration.yml -s prod_run checks.yml
soda scan -d snowflake_staging -c configuration.yml -s stage_run checks.yml
```

<br />
A check that involves data comparison between multiple datasets in the same, or different, data sources counts as a single check. The following example has four checks, two [cross checks]({% link soda-cl/cross-row-checks.md %}) and two [reference checks]({% link soda-cl/reference.md %}).
```yaml
checks for dim_customer:
  - row_count same as dim_department_group
  - row_count same as retail_customers in aws_postgres_retail
checks for dim_department_group:
  - values in (department_group_name) must exist in dim_employee (department_name)
  - values in (birthdate) must not exist in dim_department_group_prod (birthdate)
```

<br />
Similarly, a [reconciliation check]({% link soda-cl/recon.md %}) that compares data between source and target datasets in the same, or different, data sources counts as a single check. The following example has five checks.
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

<br />
Where a check involves grouping its results by category, as in a [Group By]({% link soda-cl/group-by.md %}) configuration, the check itself still counts as a single check. The following example has one check.
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

<br />
Using Soda Library CLI, you have the option of running the scan locally, which is to say that Soda Library prints results in the command-line, but does not push results to Soda Cloud. As the scan executed the check, the check counts as active. The following example has one check which counts as active when you run the scan command below it. See also: [Add scan options]({% link soda-library/run-a-scan.md %}#add-scan-options)
```yaml
checks for dim_customer:
    - row_count > 0
```
```shell
soda scan -d adventureworks -c configuration.yml --local checks.yml
```

## Go further

* Access information about [optional configurations]({% link soda-cl/optional-config.md %}) that you can use in SodaCL checks.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}