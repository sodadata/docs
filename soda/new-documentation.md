---
layout: default
title: What's new in Soda docs?
parent: Soda
---

# What's new in Soda docs?

<br />

#### December 16, 2021

* Added documentation for how to [integrate Soda with dbt]({% link soda/integrate-dbt.md %}). Access the test results from a dbt run directly within your Soda Cloud account.

#### December 14, 2021

* Added documentation to accompany the new [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}) feature. Collaborate with your team in Soda Cloud and in Slack to investigate and resolve data quality issues.

#### December 13, 2021

* Added instructions for how to [integrate Soda with Metaphor]({% link soda/integrate-metaphor.md %}). Review data quality information from within the Metaphor UI.

#### December 6, 2021

* Added documenation for the new [audit trail]({% link soda-cloud/roles-and-rights.md %}#download-an-audit-trail) feature for Soda Cloud.
* Added further detail about which rows Soda SQL sends to Soda Cloud as samples; see [Define a samples configuration key to send failed rows]({% link soda-sql/send-failed-rows.md %}#define-a-samples-configuration-key-to-send-failed-rows).

#### December 2, 2021

* Updated [Quick start tutorial for Soda Cloud]({% link soda-cloud/quick-start.md %}).
* Added information about [using regex]({% link soda-sql/sql_metrics.md %}#using-regex-with-column-metrics) in a YAML file.

#### November 30, 2021

* Added documentation about the anonymous Soda SQL usage statistics that Soda collects. Learn more about the [information]({% link soda-sql/global-configuration.md %}) Soda collects and how to opt out of sending statistics.

#### November 26, 2021

* Added instructions for how to [integrate Soda Cloud with Alation data catalog]({% link soda/integrate-alation.md %}). Review Soda Cloud data quality information from within the Alation UI.

#### November 24, 2021

* Added new API docs for the [Soda Cloud Reporting API]({% link api-docs/reporting-api.md %}).
* Added instructions to [Build a reporting dashboard]({% link api-docs/reporting-api-to-overview-dashboards.md %}) using the Soda Cloud Reporting API.

#### November 23, 2021

* Revised the [Quick start tutorial for Soda SQL]({% link soda-sql/5_min_tutorial.md %}) to use the same demo repo as the [interactive demo]({% link soda-sql/interactive-demo.md %}).

#### November 15, 2021

* Added a new, embedded [interactive demo]({% link soda-sql/interactive-demo.md %}) for Soda SQL. 
* New documentation to accompany the soft-launch of [Soda Spark]({% link soda-spark/install-and-use.md %}), an extension of Soda SQL functionality.

#### November 9, 2021

* New documentation to accompany the new, preview release of [historic metrics]({% link soda/metrics.md %}#historic-metrics). This type of metric enables you to use Soda SQL to access the historic measurements in the Cloud Metric Store and write tests that use those historic measurements.

#### October 29, 2021

* Added SSO identity providers to the list of third-party IdPs to which you can add Soda Cloud as a service provider.

#### October 25, 2021

* Removed the feature to Add datasets directly in Soda Cloud. Instead, users [add datasets using Soda SQL]({% link soda-sql/configure.md %}).
* Added support for [Snowflake session parameter configuration]({% link soda/warehouse_types.md %}#snowflake) in the warehouse YAML file. 

#### October 18, 2021

* New documentation to accompany the new [Schema Evolution Monitor]({% link soda-cloud/schema-evolution.md %}) in Soda Cloud. Use this monitor type to get notifications when columns are changed, added, or deleted in your dataset.

#### October 17, 2021

* New documentation to accompany the new feature to [disable]({% link soda-sql/samples.md %}#disable-sample-data) or [reroute]({% link soda-sql/samples.md %}#reroute-sample-data-for-a-dataset) sample data to Soda Cloud.

#### September 30, 2021

* New documentation to accompany the release of [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}).

#### September 28, 2021

* New documentation to accompany the release of [SSO integration]({% link soda-cloud/sso.md %}) for Soda Cloud.


#### September 17, 2021

* Added Soda Cloud metric names to [master list of column metrics]({% link soda/metrics.md %}#column-metrics).

#### September 9, 2021

* Published documentation for _time partitioning_, _column metrics_, and _sample data_ in Soda Cloud.

#### September 1, 2021

* Added information for new command options included in Soda CLI version 2.1.0b15 for
    * [limiting the datasets that Soda SQL analyzes]({% link soda-sql/configure.md %}#add-analyze-options),
    * [preventing Soda SQL from sending scan results]({% link soda/scan.md %}#add-scan-options) to Soda Cloud after a scan, and
    * [instructing Soda SQL to skip confirmations]({% link soda/scan.md %}#add-scan-options) before running a scan.
* Added information about how to use a new option, [`account_info_path`]({% link soda/warehouse_types.md %}#gcp-big-query), to direct Soda SQL to your Big Query service account JSON key file for configuration details.

#### August 31, 2021

* Added documentation for the feature that allows you to [include or exclude specific datasets]({% link soda-sql/configure.md %}#add-analyze-options) in your `soda analyze` command.

#### August 30, 2021

* Updated content and changed the name of **Data monitoring** documentation to **[Data quality]({% link soda/data-monitoring.md %})**.

#### August 23, 2021

* New document for [custom metric templates]({% link soda-sql/custom-metric-templates.md %}) that you can copy and paste into scan YAML files.

#### August 9, 2021

* Added details for Apache Spark support. See [Install Soda SQL]({% link soda-sql/installation.md %}#compatibility).
* Updated _Adjust a dataset scan schedule_ to include details instructions for triggering a Soda scan externally.

#### August 2, 2021

* Added new document to ouline the [Support]({% link soda/support.md %}) that Soda provides its users and customers.
* Updated [Big Query]({% link soda/warehouse_types.md %}#gcp-big-query) data source configuration to include `auth_scopes`.


#### July 29, 2021

* Added instructions for configuring [BigQuery permissions]({% link soda/warehouse_types.md %}#big-query-permissions) to run Soda scans.
* Added an example of a [programmatic scan using a lambda function]({% link soda-sql/programmatic_scan.md %}#programmatic-scan-using-lambda-function).
* Added instructions for [overwriting scan output in Soda Cloud]({% link soda/scan.md %}#overwrite-scan-output-in-soda-cloud).
* New document for [Example test to compare row counts; moved to [Custom metric templates]({% link soda-sql/custom-metric-templates.md %}#validate-that-row-counts-are-equal)

#### July 26. 2021

* Added Soda SQL documentation for [configuring `excluded_columns`]({% link soda-sql/scan-yaml.md %}#scan-yaml-configuration-keys) during scans.
* Updated compatible data sources for [Soda SQL]({% link soda-sql/installation.md %}#compatibility) to include **MySQL (experimental)**, and [Soda Cloud]({% link soda-cloud/quick-start.md %}#sign-up-and-add-datasets) to improve accuracy.
* Updated [Create monitors and alerts]({% link soda-cloud/monitors.md %}#metric-types) to include custom metrics as part of creation flow; updated prerequisites.
* Updated Product overview [comparison]({% link soda/product-overview.md %}#compare-features-and-functionality) for new `excluded_columns` functionality and custom metrics in Soda Cloud.
* Minor adjustments to reflect new and changed elements in the <a href="https://github.com/sodadata/soda-sql/blob/main/CHANGELOG.md#210b12---2021-07-23-frodo-baggins" target="_blank">Soda SQL 2.1.0b12</a> release.


#### July 16, 2021

* Added early iteraction of content for [Best practices for defining tests and running scans]({% link soda-sql/tests.md %}#best-practices-for-defining-tests-and-running-scans).
* Added a link to the docs footer to open a Github issue to report issues with docs.

#### July 13, 2021

* New Add datasets documentation for the newly launched feature that enables your to connect to data sources and add datasets directly in Soda Cloud.
* New [Collaborate on data monitoring]({% link soda-cloud/collaborate.md %}) documentation that incorporates how to integrate with Slack, and how to include your team in your efforts to monitor your data.
* New _Adjust a dataset scan schedule_ content to help you refine how often Soda scans a particular dataset.
* Revised [Quick start tutorial for Soda Cloud]({% link soda-cloud/quick-start.md %}) that incorporates the new feature to add datasets.
* Improved Soda product overview page with a [comparison chart]({% link soda/product-overview.md %}#compare-features-and-functionality) for features and functionality.

#### July 6, 2021

* Improved [Home](/index.html) page design.
* New [Soda product overview]({% link soda/product-overview.md %}) documentation.



---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.
