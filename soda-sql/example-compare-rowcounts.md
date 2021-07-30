---
layout: default
title: Example test to compare row counts
parent: Soda SQL
---

# Example test to compare row counts

This scan YAML file offers an example of how to use [custom metrics]({% link soda-sql/sql_metrics.md %}#custom-metrics) to compare row counts between datasets in the same data source. In this example, the test fails if the row counts of the two datasets, `fullfillment` and `product`, are not the same. 

```yaml
table_name: fullfillment
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
sql_metrics:
  - sql: select count(*) as instock_count from fullfillment
  - sql: select count(*) as product_count from product
tests:
 - instock_count == product_count
```


<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.