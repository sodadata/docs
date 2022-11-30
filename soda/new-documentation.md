---
layout: default
title: What's new in Soda docs?
description: Review a changelog of additions and revisions to Soda documentation.
parent: Reference
---

# What's new in Soda docs?

<br />

#### November 30, 2022

* Adjusted the documentation for dataset discovery because, as of Soda Core v3.0.14, the action no longer derives a `row_count` metric; see [Dataset discovery]({% link soda-cl/profile.md %}#discover-datasets).

#### November 28, 2022

* Added [troubleshooting insturctions]({% link soda-core/installation.md %}#error-library-not-loaded) for Soda Core Scientific on an M1 MacOS machine.

#### November 23, 2022

* Updated [version compatibility]({% link soda-agent/deploy.md %}#compatibility) for Kubernetes clusters when deploying a Soda Agent. 
* Updated [version compatibility]({% link soda/connect-oracle.md %}#compatibility) for OracleDB data sources.
* Updated [version compatibility]({% link soda/connect-dremio.md %}#compatibility) for Dremio data sources.

#### November 18, 2022

* Added a [list of valid formats]({% link soda-cl/validity-metrics.md %}#formats-supported-with-soda-for-ms-sql-server) for validity metrics that Soda for MS SQL Server supports.
* Added documentation for [rerouting failed rows samples]({% link soda-cl/failed-rows-checks.md %}#reroute-failed-rows-samples) to an HTTP endpoint; supported as of Soda Core 3.0.13.
* Removed content for overwriting Soda Cloud checks results using `-t` option.
* Archived all Soda SQL and Soda Spark content to the <a href="https://github.com/sodadata/soda-sql/tree/main/docs" target="_blank">sodadata/soda-sql</a> repository in GitHub. 

#### November 16, 2022

* Added content to more explictly describe the metrics that dataset discovery and column profiling derive, and the potential [compute costs]({% link soda-cl/profile.md %}#compute-consumption-and-cost-considerations) associated with these configurations.

#### November 15, 2022

* Added release notes documentation for Soda Core 3.0.13.
* Adjusted [freshness check]({% link soda-cl/freshness.md %}) documentation to reflect new support for columns that contain data type DATE.
* Added documentation to accompany new support for [OracleDB]({% link soda/connect-oracle.md %}).

#### November 14, 2022

* Corrected the location in which to [opt out]({% link soda-core/usage-stats.md %}l#opt-out-of-usage-statistics) of sending Soda Core usage statistics.

#### November 10, 2022

* Added [private key authentication]({% link soda/connect-snowflake.md %}#private-key-authentication) detail to Snowflake connection documentation.
* Updated the [list of numeric metrics]({% link soda-cl/numeric-metrics.md %}#list-of-numeric-metrics) for updated data source support. 
* Added a simple list of all SodaCL metrics to [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}#list-of-sodacl-metrics-and-checks) documentation.

#### November 8, 2022

* Added an [example webhook integration]({% link soda/integrate-webhooks.md %}#example-webhook-with-servicenow-for-soda-cloud-incidents) for Soda Cloud and ServiceNow.

#### November 7, 2022

* Added examples for using [in-check variables]({% link soda-cl/filters.md %}#configure-variables) to provide dynamic values at scan time.

#### November 3, 2022

* Added [release notes]({% link release-notes/all.md %}) to correspond with the release of Soda Core 3.0.12.
* Added documentation for a new numeric metric: `duplicate_percent`. See [Numeric metrics]({% link soda-cl/numeric-metrics.md %}#list-of-numeric-metrics).
* Removed known issue regarding Soda Core for SparkDF not supporting anomaly score or distribution checks; now the checks are supported.
* Added documentation for a new feature to [disable failed rows samples for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).
* Added documentation for distribution checks which now support dataset and in-check filters. See [Distribution check optional check configurations]({% link soda-cl/distribution.md %}#optional-check-configurations).

#### November 2, 2022

* Removed `missing format` as a valid configuration key for [missing metrics]({% link soda-cl/missing-metrics.md %}).
* Added an independent [Connect to Databricks]({% link soda/connect-databricks.md %}) page that points to documentation to use Soda Core packages for Apache Spark to connect.

#### November 1, 2022

* Added [Limitations and known issues]({% link soda-cl/profile.md %}#limitations-and-known-issues) section to Display Profile information in Soda Cloud.

#### October 26, 2022

* Removed the Preview status from self-serve features which are now generally available in Soda Cloud, such as [agreements]({% link soda-cloud/agreements.md %}) and [profiling]({% link soda-cl/profile.md %}).
* Migrated custom metric templates from Soda SQL to SodaCL; see [Custom check templates]({% link soda-cl/check-templates.md %}).

#### October 19, 2022

* Added [release notes]({% link release-notes/all.md %}) to correspond with the release of Soda Core 3.0.11.
* Documented connection configuration for Azure Synapse (Experimental).
* Added documentation for an enhancement for [change-over-time checks]({% link soda-cl/numeric-metrics.md %}#change-over-time-thresholds) to gauge changes relative to the same day last week or month.
* Added documentation for the new `test-connection` command in Soda Core. See [Connect Soda to Amazon Athena]({% link soda/connect-athena.md %}#test-the-data-source-connection) for an example.

#### October 13, 2022

* Added notes about specifying the type of [quotes]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) you use in SodaCL checks must match that which the data source uses. 
* Added short snippet as an example to obtain scan exit codes in a [programmatic scan]({% link soda-core/programmatic.md %}#scan-exit-codes). 
* Added detail about using [multiple checks files]({% link soda-core/scan-core.md %}#anatomy-of-a-scan-command) in one scan command.
* Added detail about [re-using user-defined metrics]({% link soda-cl/user-defined.md %}#define-user-defined-checks) in multiple checks in the same checks YAML file.

#### October 11, 2022

* Added documentation for [grouping failed checks results]({% link soda-cl/failed-rows-checks.md %}#group-results-by-category) by one or more categories. 

#### October 5, 2022

* Added release notes to correspond with the release of Soda Core 3.0.10.
* Revised the value for the default number of [failed row samples]({% link soda-cl/optional-config.md %}#collect-failed-row-samples) that Soda automatically collects and displays in Soda Cloud from 1000 to 100.
* Added documentation to accompany new support for [Dremio]({% link soda/connect-dremio.md %}).
* Added documentation to accompany new support for [ClickHouse (Experimental)]({% link soda/connect-clickhouse.md %}).

#### September 29, 2022

* Added a [link]({% link soda-core/orchestrate-scans.md %}#soda-core-and-prefect) to a community contribution for Prefect 2.0 collection for Soda Core.
* Updated Reference checks documentation for [displaying failed]({% link soda-cl/reference.md %}#failed-row-samples) rows in Soda Cloud.

#### September 28, 2022

* Added release notes to correspond with the release of Soda Core 3.0.9.
* Added documentation for a new `samples limit` configuration key that you can add to checks that use [missing]({% link soda-cl/missing-metrics.md %}#failed-row-samples), [validity]({% link soda-cl/validity-metrics.md %}#failed-row-samples), or [duplicate_count]({% link soda-cl/numeric-metrics.md %}#failed-row-samples) metrics which automatically send 1000 failed row samples to Soda Cloud.
* Added instructions to [save failed row samples to a file]({% link soda-core/programmatic.md %}#save-failed-row-samples-to-a-file).
* Added [Windows-specific instructions]({% link soda-core/installation.md %}) for installing Soda Core using a virtual environment.
* Removed known issue for in-check variables which are supported as of Soda Core 3.0.9: "Except for customizing [dynamic names for checks]({% link soda-cl/optional-config.md %}#customize-check-names), you *cannot* use in-check variables. For example, Soda does not support the following check:

```yaml
checks for dim_customers:
  - row_count > ${VAR_2}
```

#### September 23, 2022

* Added documentation to set up [integration with Microsoft Teams]({% link soda/integrate-webhooks.md %}) so that Soda Cloud can send alert notifications or incident events to MS Teams.
* Added detail for programmatically inspecting scan results; see [programmatic scans]({% link soda-core/programmatic.md %}). Available with Soda Core 3.0.9.
* Added details for using various [authentication methods]({% link soda/connect-bigquery.md %}#authentication-methods) to connect to BigQuery.

#### Septemeber 22, 2022

* Added release notes to correspond with the release of Soda Core 3.0.8.
* Removed Known issue: Connections to MS SQL Server do not support checks that use regex, such as with [missing metrics]({% link soda-cl/missing-metrics.md %}#list-of-missing-metrics) or [validity metrics]({% link soda-cl/validity-metrics.md %}#list-of-validity-metrics).

#### September 14, 2022

* Added instructions for [configuring a custom sampler for failed rows]({% link soda-cl/failed-rows-checks.md %}#configure-a-failed-row-sampler).

#### September 13, 2022

* Added documentation to correspond with the release of Soda Core 3.0.7, including an update to [freshness check results]({% link soda-cl/freshness.md %}#freshness-check-results).
* Removed the known issue for using variables in the SQL or CTE of a [user-defined check]({% link soda-cl/user-defined.md %}). See <a href="https://github.com/sodadata/soda-core/issues/1577" target="_blank">GitHub Issue 1577</a>.
* Added instructions for [configuring the same scan to run in multiple environments]({% link soda-core/configuration.md %}#configure-the-same-scan-to-run-in-multiple-environments).
* Added information about [passing parameters]({% link soda/connect-snowflake.md %}) to a Snowflake data source in connection configurations, specifically which parameter to use to authenticate a connection via SSO with a SAML 2.0-compliant identity provider (IdP).

#### Septemeber 12, 2022

* Documented [Soda Cloud resources]({% link soda-cloud/resource-map.md %}) to add visual context to the parts that exist in Soda Cloud, and how they relate to each other, particularly when you delete a resource.
* Added documentation to correspond with Soda Cloud's new support for [webhooks]({% link soda/integrate-webhooks.md %}) to integrate with third-party service providers to send alert notifications or create and track incidents externally.
* Corrected documentation to indicate that [reference checks]({% link soda-cl/reference.md %}) do *not* support dataset filters.

#### September 9, 2022

* Decoupled data source connection configuration details from Soda Core. Created a separate page for each data source's connection config details. See [Connect a data source]({% link soda/connect-athena.md %}).

#### September 8, 2022

* Added inclusion and exclusion rules for [dataset discovery]({% link soda-cl/profile.md %}#define-dataset-discovery), [column profiling]({% link soda-cl/profile.md %}#define-column-profiling), and [dataset sampling]({% link soda-cl/sample-datasets.md %}#inclusion-and-exclusion-rules).

#### September 7, 2022

* Added content to correspond with Soda Core's new support for [Spark for Databricks SQL]({% link soda/connect-spark.md %}#connect-to-spark-for-databricks-sql).
* Adjusted documentation to reflect that Soda Core now supports the ingestion of [dbt tests]({% link soda/integrate-dbt.md %}).

#### August 30, 2022

* Recorded known issue: Soda Core for SparkDF does not support anomaly score or distribution checks.

#### August 29, 2022

* Added instructions for how to [disable dataset discovery]({% link soda-cl/profile.md %}#disable-dataset-discovery) and [disable column profiling]({% link soda-cl/profile.md %}#disable-column-profiling).
* Added details for obtaining info when [upgrading]({% link soda-agent/upgrade.md %}#troubleshoot) a Soda Agent.
* Organized and tightened Soda Core documentation.

#### August 26, 2022

* Added documentation for how to use Soda Core for SparkDF with a Notebook to connect to [Databricks]({% link soda/connect-spark.md %}#use-soda-core-with-spark-dataframes-on-databricks).
* Adjusted the configuration for connecting to [MS SQL Server]({% link soda/connect-mssql.md %}) based on community feedback.

#### August 24, 2022

* Adjusted [configuration instructions]({% link soda/connect-spark.md %}) for `soda-core-spark-df` to separately install dependencies for Hive and ODBC as needed.
* Added content to correspond with Soda Core's new support for [Trino]({% link soda/connect-trino.md %}).
* Removed the known issue: The `missing format` configuration does not function as expected.

#### August 22, 2022

* Added an [example DAG]({% link soda-core/orchestrate-scans.md %}#example-dag) for using Soda with Airflow PythonOperator.
* Added [Tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl) documentation.
* Expanded [For each]({% link soda-cl/for-each.md %}) documentation with optional configurations and examples.
* Published a new [Quick start for Soda Cloud (Preview)]({% link soda/quick-start-sodacloud.md %}) that outlines how to use preview features in Soda Cloud to connect to a data source, then write a new agreement for stakeholder approval.

#### August 11, 2022

* Added documentation for the new `-t` option for use with scan commands to [overwrite scan output in Soda Cloud]({% link soda-cloud/scan-output.md %}#overwrite-scan-output-in-soda-cloud).

#### August 10, 2022

* Added content to correspond with Soda Core's new support for [MySQL]({% link soda/connect-mysql.md %}).
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

* Added content to correspond with Soda Core's new support for [MS SQL Server]({% link soda/connect-mssql.md %}) and [IBM DB2]({% link soda/connect-db2.md %}).

#### July 20, 2022

* Published documentation associated with the preview release of Soda Cloud's self-serve features and functionality. This is a limited access preview release, so please ask us for access at <a href="mailto:support@soda.io">support@soda.io</a>.

#### June 29, 2022

* Added documentation to correspond with the new `samples limit` configuration for [Failed rows checks]({% link soda-cl/failed-rows-checks.md %}#define-failed-rows-checks)
* Added documentation for setting the [default role for dataset owners]({% link soda-cloud/roles-and-rights.md %}#change-the-default-access-to-datasets) in Soda Cloud.

#### June 28, 2022

* Revised documentation to reflect the general availability of Soda Core and SodaCL.
* Archived the deprecated documentation for Soda SQL and Soda Spark.

#### June 23, 2022

* Added backlog of [Soda Core release notes]({% link release-notes/soda-core.md %}).
* Refined the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) with details on how to run a scan.
* Corrected the explanation of the [`duplicate_count` check]({% link soda/quick-start-sodacl.md %}#duplicate-check) regarding checks that included multiple arguments (columns).
* Removed a Known Issue from [freshness check]({% link soda-cl/freshness.md %}) that recorded problem when defining a custom name to the check.

#### June 22, 2022

* Added documentation to correspond with the new `percent` argument you can use in checks with [change-over-time thresholds]({% link soda-cl/numeric-metrics.md %}#change-over-time-thresholds).

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

* Added documentation corresponding to Soda Core support for [Apache Spark DataFrames]({% link soda/connect-spark.md %}). For use with [programmatic Soda scans]({% link soda-core/programmatic.md %}), only.
* Updated the syntax for [freshness checks]({% link soda-cl/freshness.md %}) to remove `using` from the syntax and identify column name instead by wrapping in parentheses.
    * old: `freshness using created_at < 3h`
    * new: `freshness(created_at) < 3h`
* Added clarification to the context-specific measning of a [BigQuery dataset]({% link soda/connect-bigquery.md %}) versus a dataset in the context of Soda.
* Added instructions for setting a [default notification channel]({% link soda/integrate-slack.md %}#set-a-default-slack-channel-for-notifications) in Slack for Soda Cloud alerts.
* Added an explanation about [anomaly score check results]({% link soda-cl/anomaly-score.md %}#anomaly-score-check-results) and the minimum number of measurements required to gauge an anomaly.
* Moved installation instructions for Soda Core Scientific to a sub-section of [Install Soda Core]({% link soda-core/installation.md %}#install-soda-core-scientific).
* Added expanded example for setting up [Soda Core Spark DataFrames]({% link soda/connect-spark.md %}).

#### June 9, 2022

* Added some new [Soda Core content]({% link soda-core/overview-main.md %}) to documentation.
* Moved Soda SQL and Soda Spark in documentation leftnav.
* Updated Home page with links to new Soda Core documentation.
* Fixed formatting in [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}).

#### June 8, 2022

* Updated the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) with an example of a check for duplicates.
* Added documentation for installing Soda Spark on Windows.
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

* Updated various Soda Core documents to include support for Amazon Athena. See [Connect to Amazon Athena]({% link soda/connect-athena.md %}).
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
  * Quick start for Soda SQL and Soda Cloud
  * Quick start for Soda Core and Soda Cloud

#### April 6, 2022

* Added details to the [Freshness check]({% link soda-cl/freshness.md %}) to clarify limitations when specifying duration.
* Added documentation for how to use system variables to store property values#provide-credentials-as-system-variables) instead of storing values in the `env_vars.yml` file.
* Updated Soda Core documentation to remove aspirational content from Adding scans to a pipeline.

#### April 1, 2022

* Added documentation for the `dataset_name` identifier in a scan YAML file. Use the identifier to send more precise dataset information to Soda Cloud. 

#### March 22, 2022

* New documentation for the beta release of [Soda Core]({% link soda-core/overview-main.md %}), a free, open-source, command-line tool that enables you to use the Soda Checks Language to turn user-defined input into aggregated SQL queries.
* New documentation for the beta release of [SodaCL]({% link soda-cl/soda-cl-overview.md %}), a domain-specific language you can use to define Soda Checks in a checks YAML file.


#### February 15, 2022

* Added content to explain how Soda Cloud notifies users of a scan failure. 

#### February 10, 2022

* Added documentation to offer advice on [organizing your datasets]({% link soda-cloud/organize-datasets.md %}) in Soda Cloud using attributes and tags.

#### January 18, 2022

* Add details to [Integrate Soda with dbt]({% link soda/integrate-dbt.md %}#ingest-results-from-dbt-cloud-into-soda-cloud) documentation for running `soda-ingest` using job ID or run ID.

#### January 17, 2022

* Added text to [Roles and rights]({% link soda-cloud/roles-and-rights.md %}#access-an-audit-trail) documentation about the option to use the Reporting API to access Audit Trail data.

#### January 12, 2022

* Added documentation regarding [Licenses]({% link soda-cloud/roles-and-rights.md %}#review-member-licenses) and [changing default access to datasets]({% link soda-cloud/roles-and-rights.md %}#change-the-default-access-to-datasets) in Soda Cloud.

#### January 11, 2022

* Added requirement for installing Soda Spark on a Databricks cluster. See Soda Spark Requirements.

#### December 22, 2021

* Added data types information for Trino and MySQL.
* Adjusted the docs footer to offer users ways to suggest or make improve our docs.

#### December 16, 2021

* Added documentation for how to [integrate Soda with dbt]({% link soda/integrate-dbt.md %}). Access the test results from a dbt run directly within your Soda Cloud account.

#### December 14, 2021

* Added documentation to accompany the new [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}) feature. Collaborate with your team in Soda Cloud and in Slack to investigate and resolve data quality issues.

#### December 13, 2021

* Added instructions for how to [integrate Soda with Metaphor]({% link soda/integrate-metaphor.md %}). Review data quality information from within the Metaphor UI.

#### December 6, 2021

* Added documenation for the new [audit trail]({% link soda-cloud/roles-and-rights.md %}#access-an-audit-trail) feature for Soda Cloud.
* Added further detail about which rows Soda SQL sends to Soda Cloud as samples.

#### December 2, 2021

* Updated Quick start tutorial for Soda Cloud.
* Added information about using regex in a YAML file.

#### November 30, 2021

* Added documentation about the anonymous Soda SQL usage statistics that Soda collects. Learn more about the information Soda collects and how to opt out of sending statistics.

#### November 26, 2021

* Added instructions for how to [integrate Soda Cloud with Alation data catalog]({% link soda/integrate-alation.md %}). Review Soda Cloud data quality information from within the Alation UI.

#### November 24, 2021

* Added new API docs for the [Soda Cloud Reporting API]({% link api-docs/reporting-api.md %}).
* Added instructions to [Build a reporting dashboard]({% link api-docs/reporting-api-to-overview-dashboards.md %}) using the Soda Cloud Reporting API.

#### November 23, 2021

* Revised the Quick start tutorial for Soda SQL to use the same demo repo as the interactive demo.

#### November 15, 2021

* Added a new, embedded interactive demo for Soda SQL.
* New documentation to accompany the soft-launch of Soda Spark, an extension of Soda SQL functionality.

#### November 9, 2021

* New documentation to accompany the new, preview release of historic metrics. This type of metric enables you to use Soda SQL to access the historic measurements in the Cloud Metric Store and write tests that use those historic measurements.

#### October 29, 2021

* Added SSO identity providers to the list of third-party IdPs to which you can add Soda Cloud as a service provider.

#### October 25, 2021

* Removed the feature to Add datasets directly in Soda Cloud. Instead, users add datasets using Soda SQL.
* Added support for Snowflake session parameter configuration in the warehouse YAML file.

#### October 18, 2021

* New documentation to accompany the new Schema Evolution Monitor in Soda Cloud. Use this monitor type to get notifications when columns are changed, added, or deleted in your dataset.

#### October 17, 2021

* New documentation to accompany the new feature to disable or reroute sample data to Soda Cloud.

#### September 30, 2021

* New documentation to accompany the release of [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}).

#### September 28, 2021

* New documentation to accompany the release of [SSO integration]({% link soda-cloud/sso.md %}) for Soda Cloud.


#### September 17, 2021

* Added Soda Cloud metric names to primary list of column metrics.

#### September 9, 2021

* Published documentation for _time partitioning_, _column metrics_, and _sample data_ in Soda Cloud.

#### September 1, 2021

* Added information for new command options included in Soda CLI version 2.1.0b15 for
    * limiting the datasets that Soda SQL analyzes,
    * preventing Soda SQL from sending scan results to Soda Cloud after a scan, and
    * instructing Soda SQL to skip confirmations before running a scan.
* Added information about how to use a new option, `account_info_path`, to direct Soda SQL to your Big Query service account JSON key file for configuration details.

#### August 31, 2021

* Added documentation for the feature that allows you to include or exclude specific datasets in your `soda analyze` command.

#### August 30, 2021

* Updated content and changed the name of **Data monitoring** documentation to **Data quality**.

#### August 23, 2021

* New document for custom metric templates that you can copy and paste into scan YAML files.

#### August 9, 2021

* Added details for Apache Spark support. See Install Soda SQL.
* Updated _Adjust a dataset scan schedule_ to include details instructions for triggering a Soda scan externally.

#### August 2, 2021

* Added new document to ouline the [Support]({% link soda/support.md %}) that Soda provides its users and customers.
* Updated Big Query data source configuration to include `auth_scopes`.


#### July 29, 2021

* Added instructions for configuring BigQuery permissions to run Soda scans.
* Added an example of a programmatic scan using a lambda function.
* Added instructions for overwriting scan output in Soda Cloud.
* New document for Example test to compare row counts.

#### July 26. 2021

* Added Soda SQL documentation for configuring `excluded_columns` during scans.
* Updated compatible data sources for Soda SQL to include **MySQL (experimental)**, and Soda Cloud to improve accuracy.
* Updated Create monitors and alerts to include custom metrics as part of creation flow; updated prerequisites.
* Updated Product overview [comparison]({% link soda/product-overview.md %}#compare-features-and-functionality) for new `excluded_columns` functionality and custom metrics in Soda Cloud.
* Minor adjustments to reflect new and changed elements in the <a href="https://github.com/sodadata/soda-sql/blob/main/CHANGELOG.md#210b12---2021-07-23-frodo-baggins" target="_blank">Soda SQL 2.1.0b12</a> release.


#### July 16, 2021

* Added early iteraction of content for Best practices for defining tests and running scans.
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
