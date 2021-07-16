---
layout: default
title: Scan multiple data sources or datasets
parent: Soda SQL
redirect_from: /soda-sql/documentation/scan-different-datasets.html
---

# Scan multiple data sources or datasets

You can run a single [scan]({% link soda/glossary.md %}#scan %}) against different [data sources]({% link soda/glossary.md %}#data-source) in your environments. For example, you can run the same scan against data in a development environment and data in a production environment.

You can also run a single scan against different [datasets]({% link soda/glossary.md %}#dataset %}) in your data source using [custom metrics]({% link soda/glossary.md %}#custom-metric). 

## Run a basic scan

{% include run-a-scan.md %}

## Scan multiple data sources

To run the same scan against different data sources, proceed as follows.

1. Prepare one [warehouse YAML file]({% link soda-sql/warehouse.md %}) for each data source you wish to scan. For example:
* `warehouse_postgres_dev.yml`
```yaml
name: my_postgres_datawarehouse_dev
connection:
  type: postgres
  host: localhost
  port: '5432'
  username: env_var(POSTGRES_USERNAME)
  password: env_var(POSTGRES_PASSWORD)
  database: dev
  schema: public
```
* `warehouse_postgres_prod.yml`
```yaml
name: my_postgres_datawarehouse_prod
connection:
  type: postgres
  host: dbhost.example.com
  port: '5432'
  username: env_var(POSTGRES_USERNAME)
  password: env_var(POSTGRES_PASSWORD)
  database: prod
  schema: public
```
2. Prepare a [scan YAML file]({% link soda-sql/scan-yaml.md %}) to define all the tests you wish to run against your data sources. See [Define tests]({% link soda-sql/tests.md %}) for details.
3. Run separate Soda SQL scans against each data source by specifying which warehouse YAML to scan and using the same scan YAML file. For example:
```shell
soda scan warehouse_postgres_dev.yml tables/my_dataset_scan.yml 
soda scan warehouse_postgres_prod.yml tables/my_dataset_scan.yml
```

## Scan multiple datasets

Use a single scan YAML file to run tests on different datasets in your data source.

Prepare one [scan YAML file]({% link soda-sql/scan-yaml.md %}) to define the tests you wish to apply against multiple datasets. Use custom metrics to write SQL queries and subqueries that run against multiple datasets. When you run a scan, Soda SQL uses your SQL queries to query data in the datasets you specified in your scan YAML file. 


## Go further

* See [Example tests by metric]({% link soda-sql/examples-by-metric.md %}) to learn more about defining tests.
* Learn [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Learn more about [Metrics]({% link soda/metrics.md %}).
* Learn how to [apply dynamic filters]({% link soda-sql/filtering.md %}) to your scan.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.