---
layout: default
title: What's new in Soda docs?
description: Review a changelog of additions and revisions to Soda documentation.
parent: Reference
---

# What's new in Soda docs?

<br />

#### August 22, 2022

* Added an [example DAG]({% link soda-core/orchestrate-scans.md %}#example-dag) for using Soda with Airflow PythonOperator.
* Added [Tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl) documentation.
* Expanded [For each]({% link soda-cl/for-each.md %}) documentation with optional configurations and examples.
* Published a new [Quick start for Soda Cloud (Preview)]({% link soda/quick-start-sodacloud.md %}) that outlines how to use preview features in Soda Cloud to connect to a data source, then write a new agreement for stakeholder approval.

#### August 11, 2022

* Added documentation for the new `-t` option for use with scan commands to [overwrite scan output in Soda Cloud]({% link soda-cloud/scan-output.md %}#overwrite-scan-output-in-soda-cloud).

#### August 10, 2022

* Added content to correspond with Soda Core's new support for [MySQL]({% link soda-core/configuration.md %}#connect-to-mysql).
* Validated and clarified documentation for using [filters and variables]({% link soda-cl/filters.md %}).

#### August 9, 2022

* Added documentation to describe the [migration path]({% link soda-core/migrate.md %}) from Soda SQL to Soda Core.

#### August 2, 2022

* Adjusted the instructions for [Slack integration]({% link soda/integrate-slack.md %}) to correspond with a slightly changed UI experience.
* Added limitation to the [for each]({% link soda-cl/for-each.md %}) as the configuration is not compatible with dataset filters (also known as partitions).


#### August 1. 2022

* Added a "was this helpful" counter to most documentation pages.
* Added details for [connecting `soda-core-spark-df` to Soda Cloud]({% link soda-core/connect-core-to-cloud.md %}#connect-soda-core-for-sparkdf-to-soda-cloud). 

#### July 27, 2022

* Added content to correspond with Soda Core's new support for [MS SQL Server]({% link soda-core/configuration.md %}#connect-to-ms-sql-server) and [IBM DB2]({% link soda-core/configuration.md %}#connect-to-ibm-db2).

#### July 20, 2022

* Published documentation associated with the preview release of Soda Cloud's self-serve features and functionality. This is a limited access preview release, so please ask us for access at <a href="mailto:support@soda.io">support@soda.io</a>.

#### June 29, 2022

* Added documentation to correspond with the new `samples limit` configuration for [Failed rows checks]({% link soda-cl/failed-rows-checks.md %}#define-failed-rows-checks)
* Added documentation for setting the [default role for dataset owners]({% link soda-cloud/roles-and-rights.md %}#change-the-default-access-to-datasets) in Soda Cloud.

#### June 28, 2022

* Revised documentation to reflect the general availability of Soda Core and SodaCL.
* Archived the deprecated documentation for [Soda SQL]({% link soda-sql/overview.md %}) and [Soda Spark]({% link soda-spark/install-and-use.md %}).

#### June 23, 2022

* Added backlog of [Soda Core release notes]({% link release-notes/soda-core.md %}).
* Refined the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) with details on how to run a scan.
* Corrected the explanation of the [`duplicate_count` check]({% link soda/quick-start-sodacl.md %}#duplicate-check) regarding checks that included multiple arguments (columns).
* Removed a Known Issue from [freshness check]({% link soda-cl/freshness.md %}) that recorded problem when defining a custom name to the check.

#### June 22, 2022

* Added documentation to correspond with the new `percent` argument you can use in checks with [dynamic thresholds]({% link soda-cl/numeric-metrics.md %}#fixed-and-dynamic-thresholds).

#### June 21, 2022

* Added details to Soda Core documentation for using [system variables]({% link soda-core/configuration.md %}#provide-credentials-as-system-variables).  to store sensitive credentials.
* Updated the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}) with slightly changed instructions.

#### June 20, 2022

* Changed all references to `table` in SodaCL to `dataset`, notably used with [for each]({% link soda-cl/freshness.md %}) and [distribution]({% link soda-cl/distribution.md %}) check syntax.
* Added deprecation warning banners to all Soda SQL and Soda Spark content.
* Revised and reorganized content to reframe focus on Soda Core in lieu of Soda SQL.
* New [How Soda Core works]({% link soda-core/how-core-works.md %}) documentation.
* Added more Soda Core documentation to main docs set. 
* Updated [Soda product overview]({% link soda/product-overview.md %}) to reflect new focus on Soda Core and imminent deprecation of Soda SQL and Soda Spark.
* Updated Soda Cloud documentation to reflect new focus on Soda Core.
* Update links on [docs home page]({% link index.html %}) to point to most recent content and shift Soda SQL and Soda Core to a Legacy section.

#### June 14, 2022

* Added documentation corresponding to Soda Core support for [Apache Spark DataFrames]({% link soda-core/configuration.md %}#connect-to-apache-spark-dataframes). For use with [programmatic Soda scans]({% link soda-core/programmatic-scans.md %}), only.
* Updated the syntax for [freshness checks]({% link soda-cl/freshness.md %}) to remove `using` from the syntax and identify column name instead by wrapping in parentheses.
    * old: `freshness using created_at < 3h`
    * new: `freshness(created_at) < 3h`
* Added clarification to the context-specific measning of a [BigQuery dataset]({% link soda-core/configuration.md %}#connect-to-gcp-bigquery) versus a dataset in the context of Soda.
* Added instructions for setting a [default notification channel]({% link soda/integrate-slack.md %}#set-a-default-slack-channel-for-notifications) in Slack for Soda Cloud alerts.
* Added an explanation about [anomaly score check results]({% link soda-cl/anomaly-score.md %}#anomaly-score-check-results) and the minimum number of measurements required to gauge an anomaly.
* Moved installation instructions for Soda Core Scientific to a sub-section of [Install Soda Core]({% link soda-core/installation.md %}#install-soda-core-scientific).
* Added expanded example for setting up [Soda Core Spark DataFrames]({% link soda-core/configuration.md %}#connect-to-apache-spark-dataframes).

#### June 9, 2022

* Added some new [Soda Core content]({% link soda-core/overview-main.md %}) to documentation.
* Moved Soda SQL and Soda Spark in documentation leftnav.
* Updated Home page with links to new Soda Core documentation.
* Fixed formatting in [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}).

#### June 8, 2022

* Updated the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) with an example of a check for duplicates.
* Added documentation for [installing Soda Spark on Windows]({% link soda-spark/install-and-use.md %}#install-soda-spark-on-windows).
* Updated the [Distribution check]({% link soda-cl/distribution.md %}) documentation to record a change in syntax for the check and the addition of two more methods available to use with distribution checks.

#### June 7, 2022

* Added new documentation for [Install Soda Core Scientifc]({% link soda-core/installation.md %}#install-soda-core-scientific).
* Add a new [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}).

#### June 6, 2022

* Added clarifying details to [Cross checks]({% link soda-cl/cross-row-checks.md %}) and updated images on [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).
* Added [Use Docker to run Soda Core]({% link soda-core/installation.md %}#use-docker-to-run-soda-core) to Soda Core installation documentation.

#### June 2, 2022

* Revised the SodaCL [User-defined checks]({% link soda-cl/user-defined.md %}) documentation.
* Revised [For each]({% link soda-cl/for-each.md %}) and [Filters]({% link soda-cl/filters.md %}) documentation.
* Updated [Glossary]({% link soda/glossary.md %}) with SodaCL terminology.

#### June 1, 2022

* Updated SodaCL [Freshness checks]({% link soda-cl/freshness.md %}) and [Cross checks]({% link soda-cl/cross-row-checks.md %}) (fka. Row count checks).
* Added new documentation for SodaCL [Failed rows checks]({% link soda-cl/failed-rows-checks.md %}) 

#### May 31, 2022

* Updated SodaCL [Schema checks]({% link soda-cl/schema.md %}) and [Reference checks]({% link soda-cl/reference.md %}) documentation.
* Corrected Soda Cloud connection syntax in the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}).
* Removed separate Duplicate checks documentation, redirecting to [Numeric metrics]({% link soda-cl/numeric-metrics.md %}).

#### May 26, 2022

* Updated various Soda Core documents to include support for Amazon Athena. See [Connect to Amazon Athena]({% link soda-core/configuration.md %}#connect-to-amazon-athena).
* Update [Optional check configurations]({% link soda-cl/optional-config.md %}) to include instructions for use an in-check filter to check a portion of your data.
* Added new documentation for [Missing metrics]({% link soda-cl/missing-metrics.md %}) and [Validity metrics]({% link soda-cl/validity-metrics.md %}).

#### May 25, 2022

* Revised and renamed **Data observability** to **[Data concepts]({% link soda/data-concepts.md %})**.

#### May 24, 2022

* Updated the documentation for the [distribution check]({% link soda-cl/distribution.md %}) in SodaCL, including instructions to install Soda Core Scientific.

#### May 19, 2022

* Added new SodaCL documentation to elaborate on some configuration and offer broad language rules. See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}), [Optional check configurations]({% link soda-cl/optional-config.md %}), [Numeric metrics]({% link soda-cl/numeric-metrics.md %}), [Filters]({% link soda-cl/filters.md %}), [Anomaly score check]({% link soda-cl/anomaly-score.md %}) and [For each]({% link soda-cl/for-each.md %}).

#### May 18, 2022

* Updated the details pertaining to connecting Soda Core to Soda Cloud. The syntax for the key-value pairs for API keys changed from `api_key` and `api_secret` to `api_key_id` and `api_key_secret`.

#### May 9, 2022

* Updated the [Soda Core installation documentation]({% link soda-core/installation.md %}) to indicate that Python 3.8 or greater is required.

#### April 26, 2022

* Updated a set of [Soda product comparison]({% link soda/product-matrix.md %}) matrices to illustrate the features and functionality available with different Soda tools.

#### April 25, 2022

* Updated the [Soda product overview]({% link soda/product-overview.md %}) with a more thorough explanation of the product suite and how the parts work together to establish and maintain data reliability.

#### April 22, 2022

* Replaced the quick start tutorials for Soda SQL and Soda Cloud with two new tutorials: 
  * [Quick start for Soda SQL and Soda Cloud]({% link soda-sql/quick-start-soda-sql.md %})
  * [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %})

#### April 6, 2022

* Added details to the [Freshness check]({% link soda-cl/freshness.md %}) to clarify limitations when specifying duration.
* Added documentation for how to [use system variables to store property values]({% link soda-sql/warehouse.md %}#provide-credentials-as-system-variables) instead of storing values in the `env_vars.yml` file.
* Updated Soda Core documentation to remove aspirational content from Adding scans to a pipeline.

#### April 1, 2022

* Added documentation for the `dataset_name` identifier in a [scan YAML]({% link soda-sql/scan-yaml.md %}#add-a-dataset-name-for-soda-cloud) file. Use the identifier to send more precise dataset information to Soda Cloud. 

#### March 22, 2022

* New documentation for the beta release of [Soda Core]({% link soda-core/overview-main.md %}), a free, open-source, command-line tool that enables you to use the Soda Checks Language to turn user-defined input into aggregated SQL queries.
* New documentation for the beta release of [SodaCL]({% link soda-cl/soda-cl-overview.md %}), a domain-specific language you can use to define Soda Checks in a checks YAML file.


#### February 15, 2022

* Added content to explain how Soda Cloud notifies users of a [scan failure]({% link soda-sql/scan.md %}#scan-output-in-soda-cloud). 

#### February 10, 2022

* Added documentation to offer advice on [organizing your datasets]({% link soda-cloud/organize-datasets.md %}) in Soda Cloud using attributes and tags.

#### January 18, 2022

* Add details to [Integrate Soda with dbt]({% link soda/integrate-dbt.md %}#ingest-results-from-dbt-cloud-into-soda-cloud) documentation for running `soda-ingest` using job ID or run ID.

#### January 17, 2022

* Added text to [Roles and rights]({% link soda-cloud/roles-and-rights.md %}#access-an-audit-trail) documentation about the option to use the Reporting API to access Audit Trail data.

#### January 12, 2022

* Added documentation regarding [Licenses]({% link soda-cloud/roles-and-rights.md %}#review-member-licenses) and [changing default access to datasets]({% link soda-cloud/roles-and-rights.md %}#change-the-default-access-to-datasets) in Soda Cloud.

#### January 11, 2022

* Added requirement for installing Soda Spark on a Databricks cluster. See [Soda Spark Requirements]({% link soda-spark/install-and-use.md %}#requirements).

#### December 22, 2021

* Added data types information for [Trino]({% link soda-sql/supported-data-types.md %}#trino-experimental) and [MySQL]({% link soda-sql/supported-data-types.md %}#mysql-experimental).
* Adjusted the docs footer to offer users ways to suggest or make improve our docs.

#### December 16, 2021

* Added documentation for how to [integrate Soda with dbt]({% link soda/integrate-dbt.md %}). Access the test results from a dbt run directly within your Soda Cloud account.

#### December 14, 2021

* Added documentation to accompany the new [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}) feature. Collaborate with your team in Soda Cloud and in Slack to investigate and resolve data quality issues.

#### December 13, 2021

* Added instructions for how to [integrate Soda with Metaphor]({% link soda/integrate-metaphor.md %}). Review data quality information from within the Metaphor UI.

#### December 6, 2021

* Added documenation for the new [audit trail]({% link soda-cloud/roles-and-rights.md %}#access-an-audit-trail) feature for Soda Cloud.
* Added further detail about which rows Soda SQL sends to Soda Cloud as samples; see [Define a samples configuration key to send failed rows]({% link soda-sql/send-failed-rows.md %}#define-a-samples-configuration-key-to-send-failed-rows).

#### December 2, 2021

* Updated Quick start tutorial for Soda Cloud.
* Added information about [using regex]({% link soda-sql/sql_metrics.md %}#using-regex-with-column-metrics) in a YAML file.

#### November 30, 2021

* Added documentation about the anonymous Soda SQL usage statistics that Soda collects. Learn more about the [information]({% link soda-sql/global-configuration.md %}) Soda collects and how to opt out of sending statistics.

#### November 26, 2021

* Added instructions for how to [integrate Soda Cloud with Alation data catalog]({% link soda/integrate-alation.md %}). Review Soda Cloud data quality information from within the Alation UI.

#### November 24, 2021

* Added new API docs for the [Soda Cloud Reporting API]({% link api-docs/reporting-api.md %}).
* Added instructions to [Build a reporting dashboard]({% link api-docs/reporting-api-to-overview-dashboards.md %}) using the Soda Cloud Reporting API.

#### November 23, 2021

* Revised the [Quick start tutorial for Soda SQL]({% link soda-sql/quick-start-soda-sql.md %}) to use the same demo repo as the interactive demo.

#### November 15, 2021

* Added a new, embedded interactive demo for Soda SQL.
* New documentation to accompany the soft-launch of [Soda Spark]({% link soda-spark/install-and-use.md %}), an extension of Soda SQL functionality.

#### November 9, 2021

* New documentation to accompany the new, preview release of [historic metrics]({% link soda-sql/metrics.md %}#historic-metrics). This type of metric enables you to use Soda SQL to access the historic measurements in the Cloud Metric Store and write tests that use those historic measurements.

#### October 29, 2021

* Added SSO identity providers to the list of third-party IdPs to which you can add Soda Cloud as a service provider.

#### October 25, 2021

* Removed the feature to Add datasets directly in Soda Cloud. Instead, users [add datasets using Soda SQL]({% link soda-sql/configure.md %}).
* Added support for [Snowflake session parameter configuration]({% link soda-sql/warehouse_types.md %}#snowflake) in the warehouse YAML file.

#### October 18, 2021

* New documentation to accompany the new Schema Evolution Monitor in Soda Cloud. Use this monitor type to get notifications when columns are changed, added, or deleted in your dataset.

#### October 17, 2021

* New documentation to accompany the new feature to [disable]({% link soda-sql/samples.md %}#disable-sample-data) or [reroute]({% link soda-sql/samples.md %}#reroute-sample-data-for-a-dataset) sample data to Soda Cloud.

#### September 30, 2021

* New documentation to accompany the release of [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}).

#### September 28, 2021

* New documentation to accompany the release of [SSO integration]({% link soda-cloud/sso.md %}) for Soda Cloud.


#### September 17, 2021

* Added Soda Cloud metric names to [master list of column metrics]({% link soda-sql/metrics.md %}#column-metrics).

#### September 9, 2021

* Published documentation for _time partitioning_, _column metrics_, and _sample data_ in Soda Cloud.

#### September 1, 2021

* Added information for new command options included in Soda CLI version 2.1.0b15 for
    * [limiting the datasets that Soda SQL analyzes]({% link soda-sql/configure.md %}#add-analyze-options),
    * [preventing Soda SQL from sending scan results]({% link soda-sql/scan.md %}#add-scan-options) to Soda Cloud after a scan, and
    * [instructing Soda SQL to skip confirmations]({% link soda-sql/scan.md %}#add-scan-options) before running a scan.
* Added information about how to use a new option, [`account_info_path`]({% link soda-sql/warehouse_types.md %}#gcp-big-query), to direct Soda SQL to your Big Query service account JSON key file for configuration details.

#### August 31, 2021

* Added documentation for the feature that allows you to [include or exclude specific datasets]({% link soda-sql/configure.md %}#add-analyze-options) in your `soda analyze` command.

#### August 30, 2021

* Updated content and changed the name of **Data monitoring** documentation to **Data quality**.

#### August 23, 2021

* New document for [custom metric templates]({% link soda-sql/custom-metric-templates.md %}) that you can copy and paste into scan YAML files.

#### August 9, 2021

* Added details for Apache Spark support. See [Install Soda SQL]({% link soda-sql/installation.md %}#compatibility).
* Updated _Adjust a dataset scan schedule_ to include details instructions for triggering a Soda scan externally.

#### August 2, 2021

* Added new document to ouline the [Support]({% link soda/support.md %}) that Soda provides its users and customers.
* Updated [Big Query]({% link soda-sql/warehouse_types.md %}#gcp-big-query) data source configuration to include `auth_scopes`.


#### July 29, 2021

* Added instructions for configuring [BigQuery permissions]({% link soda-sql/warehouse_types.md %}#big-query-permissions) to run Soda scans.
* Added an example of a [programmatic scan using a lambda function]({% link soda-sql/programmatic_scan.md %}#programmatic-scan-using-lambda-function).
* Added instructions for [overwriting scan output in Soda Cloud]({% link soda-sql/scan.md %}#overwrite-scan-output-in-soda-cloud).
* New document for [Example test to compare row counts; moved to [Custom metric templates]({% link soda-sql/custom-metric-templates.md %}#validate-that-row-counts-are-equal)

#### July 26. 2021

* Added Soda SQL documentation for [configuring `excluded_columns`]({% link soda-sql/scan-yaml.md %}#scan-yaml-table-configuration-keys) during scans.
* Updated compatible data sources for [Soda SQL]({% link soda-sql/installation.md %}#compatibility) to include **MySQL (experimental)**, and Soda Cloud to improve accuracy.
* Updated Create monitors and alerts to include custom metrics as part of creation flow; updated prerequisites.
* Updated Product overview [comparison]({% link soda/product-overview.md %}#compare-features-and-functionality) for new `excluded_columns` functionality and custom metrics in Soda Cloud.
* Minor adjustments to reflect new and changed elements in the <a href="https://github.com/sodadata/soda-sql/blob/main/CHANGELOG.md#210b12---2021-07-23-frodo-baggins" target="_blank">Soda SQL 2.1.0b12</a> release.


#### July 16, 2021

* Added early iteraction of content for [Best practices for defining tests and running scans]({% link soda-sql/tests.md %}#best-practices-for-defining-tests-and-running-scans).
* Added a link to the docs footer to open a Github issue to report issues with docs.

#### July 13, 2021

* New Add datasets documentation for the newly launched feature that enables your to connect to data sources and add datasets directly in Soda Cloud.
* New Collaborate on data monitoring documentation that incorporates how to integrate with Slack, and how to include your team in your efforts to monitor your data.
* New _Adjust a dataset scan schedule_ content to help you refine how often Soda scans a particular dataset.
* Revised Quick start tutorial for Soda Cloud that incorporates the new feature to add datasets.
* Improved Soda product overview page with a [comparison chart]({% link soda/product-overview.md %}#compare-features-and-functionality) for features and functionality.

#### July 6, 2021

* Improved [Home](/index.html) page design.
* New [Soda product overview]({% link soda/product-overview.md %}) documentation.



---

*Last modified on {% last_modified_at %}*
