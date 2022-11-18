---
layout: default
title: Legacy Soda OSS tools
description: Data quality is all about making sure that people can trust the data they use. Ensuring data reliability involves layers of tools and best practices.
parent: Reference
redirect_from: 
- /soda-sql/
- /soda-sql/documentation/index
- /soda-sql/getting-started/configure.html
- /soda-sql/configure.html
- /soda-sql/documentation/concepts.html
- /soda-sql/concepts.html
- /soda-sql/documentation/cli.html
- /soda-sql/cli.html
- /soda-sql/documentation/connect_to_cloud.html
- /soda-cloud/connect_to_cloud.html
- /soda-sql/connect_to_cloud.html
- /soda-sql/example-compare-rowcounts.html
- /soda-sql/custom-metric-templates.html
- /soda-sql/examples/examples-test-missing.html
- /soda-sql/examples-test-missing.html
- /soda-sql/examples/examples-test-unique.html
- /soda-sql/examples-test-unique.html
- /soda-sql/examples/examples-test-valid.html
- /soda-sql/examples-test-valid.html
- /soda-sql/examples/examples-by-metric.html
- /soda-sql/examples-by-metric.html
- /soda-sql/documentation/filtering.html
- /soda-sql/filtering.html
- /soda-sql/documentation/config.html
- /soda-sql/config.html
- /soda-sql/getting-started/installation.html
- /soda-sql/installation.html
- /soda/metrics.html
- /soda-sql/metrics.html
- /soda-sql/documentation/orchestrate_scans.html
- /soda-sql/orchestrate_scans.html
- /soda-sql/overview.html
- /soda-sql/documentation/programmatic_scan.html
- /soda-sql/programmatic_scan.html
- /soda-sql/getting-started/5_min_tutorial.html
- /soda-sql/5_min_tutorial.html
- /soda-cloud/quick-start.html
- /soda/quick-start-soda-sql.html
- /soda-sql/quick-start-soda-sql.html
- /soda-sql/documentation/samples.html
- /soda-cloud/samples.html
- /soda-sql/samples.html
- /soda-sql/documentation/scan-different-datasets.html
- /soda-sql/scan-different-datasets.html
- /soda-sql/documentation/scan-yaml.html
- /soda-sql/scan-yaml.html
- /soda-sql/documentation/scan.html
- /soda/scan.html
- /soda-sql/scan.html
- /soda-sql/send-failed-rows.html
- /soda-sql/documentation/sql_metrics.html
- /soda-sql/sql_metrics.html
- /soda-sql/documentation/supported-data-types.html
- /soda/supported-data-types.html
- /soda-sql/supported-data-types.html
- /soda-sql/documentation/tests.html
- /soda-sql/tests.html
- /soda-sql/documentation/troubleshoot.html
- /soda/troubleshoot.html
- /soda-sql/troubleshoot.html
- /soda-sql/documentation/warehouse_types.html
- /soda/warehouse_types.html
- /soda-sql/warehouse_types.html
- /soda-sql/documentation/warehouse.html
- /soda-sql/warehouse.html
- /soda-spark/install-and-use.html
- /release-notes/soda-spark.md
- /release-notes/soda-sql.md
---

# Legacy Soda OSS tools

The very first Soda OSS tools, Soda SQL and Soda Spark, served their community well since 2021. They have been deprecated. 

* ![soda-sql-logo](/assets/images/soda-sql-logo.png){:height="80px" width="80px"} was the original command-line tool that Soda created to test for data quality. It has been replaced by [Soda Core]({% link soda-core/overview-main.md %}).

* ![soda-spark-logo](/assets/images/soda-spark-logo.png){:height="103px" width="103px"} was an extension of Soda SQL that allowed you to run Soda SQL functionality programmatically on a Spark DataFrame. It has been replaced by Soda Core configured to [connect with Apache Spark]({% link soda/connect-spark.md %}). 

## Documentation

The GitHub repository for the legacy tools has been archived but is still read-only accessible, including the documentation:
* <a href="https://github.com/sodadata/soda-sql/tree/main/docs" target="_blank">Soda SQL</a>
* <a href="https://github.com/sodadata/soda-sql/tree/main/docs" target="_blank">Soda Spark</a>