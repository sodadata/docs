---
layout: default
title: What's new in Soda docs?
description: Review a changelog of additions and revisions to Soda documentation.
parent: Learning resources
---

# What's new in Soda docs?

<br />

#### October 25, 2023
* Added to the list of supported check types in [SodaGPT]({% soda-cloud/sodagpt.md %}#instruction-parameters).
* Added another example to [Group By checks]({% link soda-cl/group-by.md %}).

#### October 24, 2023
* Added instructions to [Connect Soda to Spark]({% link soda/connect-spark.md %}#connect-to-spark-dataframes) to recommend changing the name of the `data_source_name` in step 5.

#### October 23, 2023
* Added [release notes]({% link release-notes/all.md %}) documentation for Soda Library 1.1.19.
* Clarify instructions about adding a check identity to a check; see [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity).
* Corrected the syntax for data source connection values when using the GitHub Action for Soda in a Workflow; needed spaces before and after variables in single curly braces. See [Add the GitHub Action for Soda to a Workflow]({% link soda/quick-start-dev.md %}#add-the-github-action-for-soda-to-a-workflow).
* Added Slack icon in header to link to Soda Community.

#### October 17, 2023
* Deprecated sampling from [distribution check]({% link soda-cl/distribution.md %}) DRO generation.
* Documented the support for adding alert coniditions to a [failed row check.]({% link soda-cl/failed-rows-checks.md %}#optional-check-configurations).
* Added instructions for applying check attributes to [multiple checks]({% link soda-cl/check-attributes.md %}(#apply-an-attribute-to-one-or-more-checks)) in a single `checks for dataset_name` block. 

#### October 13, 2023
* Added new content to clarify what an [active check]({% link soda/active-check.md %}) is. Soda's licensing model can inlcude volume-based measures of active checks.
* Added link to new video for [Atlan integration]({% link soda/integrate-atlan.md %}).

#### October 12, 2023
* Added [release notes]({% link release-notes/all.md %}) documentation for Soda Library 1.1.17 - 1.1.18.
* Removed support for quotes in dataset name identifiers in checks; see [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check).
* Adjusted instructions for [Connect Soda using Dask and Pandas]({% link soda/connect-dask.md %}).

#### October 11, 2023
* Refactored the content on docs.soda.io to focus more on use cases, tasks, and reader goals. The goal of the project was to pivot from a products-based set of documentation to task-based/use case-based content. <br />You may notice a change to the navigation on docs.soda.io that is organized by actions (Install, Deploy, Run Scans, Set alerts, etc.) instead of by product (Soda Library, Soda Cloud, Soda Agent, etc.)
  * Access a new [Get started roadmap]({% link soda/get-started-roadmap.md %}) with recommendations to help you quickly become productive and confident using Soda for data quality testing. 
  * Get inspired by new [Use case guides]({% link soda/use-case-guides.md %}) to offer guidance in setting up Soda to meet a specific need.
  * Get your Soda account [organized]({% link soda-cloud/collaborate.md %}) and set up to maximize your team's data quality testing efficiency.
* Updated [Integrate Soda with dbt]({% link soda/integrate-dbt.md %}) to install sub-packages with double-quotes. 
* Update best practices for [reconciliation checks]({% link soda-cl/recon.md %}) to recommend creating a separate agreement for a reconciliation project.
* Added [release notes]({% link release-notes/all.md %}) documentation for Soda Library 1.1.15 - 1.1.16 and Soda Core 3.0.51.

#### October 6, 2023
* Updated `session_parameters` config to `session_params` in [Snowflake]({% link soda/connect-snowflake.md %}) connection config reference.
* Added instructions for how to [reset anomaly history]({% link soda-cl/anomaly-score.md %}#reset-anomaly-history) for an anolamy score check.
* Added detail to [programmatic scan]({% link soda-library/programmatic.md %}#basic-programmatic-scan) to include a filename in a scan when checks are included inline.
* Added [release notes]({% link release-notes/all.md %}) documentation for Soda Library 1.1.14.

#### October 5, 2023
* Added [release notes]({% link release-notes/all.md %}) documentation for Soda Cloud dashboard.
* Added `schema_name` parameter to [DuckDB configuration]({% link soda/connect-duckdb.md %}).

#### September 27, 2023
* Added clarifying information about user input and how it is used by [SodaGPT]({% link soda-cloud/sodagpt.md %}#about-the-ai).
* Added [release notes]({% link release-notes/all.md %}) documentation for Soda Library 1.1.13 and Soda Core 3.0.50.

#### September 26, 2023
* Added documentation for reconciliation schema checks which now support [data type mapping]({% link soda-cl/recon.md %}#schema-reconciliation-checks).
* Documented a new scan option, `--local` that you can add to a `soda scan` command to prevent Soda Library from pushing any check results to Soda Cloud. See: [Add scan options]({% link soda-library/run-a-scan.md %}#add-scan-options) and Scan output in Soda Cloud.
* Revised and tigtened [Soda Core]({% link soda-core/overview-main.md %}) information.
* Documented the global configuration to disable sending any samples of data to Soda Cloud; see [Disable samples in Soda Cloud]({% link soda-cl/sample-datasets.md %}#disable-samples-in-soda-cloud).

#### September 21, 2023
* Updated support for dbt for [ingesting tests]({% link soda/integrate-dbt.md %}#prerequisites) into Soda Cloud. You must now install a `soda-dbt` subpackage that uses dbt 1.5 or 1.6.
* Added [release notes]({% link release-notes/soda-library.md %}) documentation for Soda Library 1.1.12. 

#### September 20, 2023
* Updated [schema reconciliation checks]({% link soda-cl/recon.md %}#types-of-reconciliation-checks) to clarify that the check validates columns names *and* data types.

#### September 19, 2023
* Added [release notes]({% link release-notes/all.md %}) documentation for Soda Library 1.1.11 and Soda Core 3.0.49.

#### September 18, 2023
* Added to [Reference check documentation]({% link soda-cl/reference.md %}#define-reference-checks) for the new configuration `must not exist`.
* Updated support for dbt-core 1.3, 1.5, and 1.6 for [ingesting tests]({% link soda/integrate-dbt.md %}#prerequisites) into Soda Cloud. 
* Added documentation for [schema reconciliation checks]({% link soda-cl/recon.md %}#types-of-reconciliation-checks).

#### September 14, 2023
* Removed known issue for inability to use check identity with failed row checks. This is now supported in Soda Library.

#### September 13, 2023
* Added [release notes]({% link release-notes/soda-library.md %}) documentation for Soda Library 1.1.10.

#### September 12, 2023
* Added [release notes]({% link release-notes/soda-library.md %}) documentation for Soda Library 1.1.9.

#### September 11, 2023
* Added [release notes]({% link release-notes/soda-library.md %}) documentation for Soda Library 1.1.6 - 1.1.8.
* Added a new section for [Best practice for using reconciliation checks]({% link soda-cl/recon.md %}#best-practice-for-using-reconciliation-checks)

#### September 1, 2023
* Added [release notes]({% link release-notes/soda-library.md %}) documentation for Soda Library 1.1.0 - 1.1.5.
* Added item to [Troubleshoot]({% link soda/connect-snowflake.md %}#troubleshoot) section for Snowflake.

#### August 31, 2023
* Added documentation for SodaCL [reconciliation checks]({% link soda-cl/recon.md %}), tailored for data migration use cases.
* Added [release notes]({% link release-notes/soda-library.md %}) documentation for Soda Library 1.1.0 - 1.1.5.

#### August 30, 2023
* Added instructions for integrating with an [external secrets manager]({% link soda-agent/secrets.md %}#integrate-with-a-secrets-manager) with a Soda Agent to manage frequently-changed data source login credentials.
* Added screenchots to [Integrate Soda with Atlan]({% link soda/integrate-atlan.md %}) documentation.
* Added to [Troubleshoot]({% link soda-library/run-a-scan.md %}#troubleshoot) content for running a scan that produces an SSL certificate error.

#### August 24, 2023
* Added documentation for the new, native integration of [Soda in Atlan]({% link soda/integrate-atlan.md %}).
* Updated [orchestration]({% link soda-library/orchestrate-scans.md %}) documentation to include a link to an Astronomer tutorial for Data Quality Checks with Airflow, Snowflake, and Soda.
* Added to item to Troublshoot SodaCL for dealing with unexpected [missing checks]({% link soda-cl/troubleshoot.md %}#errors-with-missing-checks) behaviour.

#### August 23, 2023
* Update agreement documentation to reflect the change in behaviour where scans do not run until stakeholders have approved of the agreement.

#### August 21, 2023
* Removed "What the Action does" section from [Integrate Soda with a GitHub Workflow]({% link soda/integrate-github.md %}).

#### August 11, 2023
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.48.
* Added [release notes]({% link release-notes/soda-library.md %}) documentation for Soda Library 1.0.6 - 1.0.8.
* Added Known issue: [Failed rows checks]({% link soda-cl/failed-rows-checks.md %}#optional-check-configurations) do not support the check identity parameter. <!--SAS-2005-->
* Added a note to Create an agreement to clarify that you can only create agreements using data sources that have been added to Soda Cloud via a Soda Agent.
* Added [collection]({% link soda/glossary.md %}#collection) as a new term in the Glossary.

#### August 10, 2023
* Published new documentation for the [GitHub Action for Soda]({% link soda/integrate-github.md %}).
* Updated [Test data during development]({% link soda/quick-start-dev.md %}) to replace the GitHub Action recipe with the new <a href="https://github.com/marketplace/actions/soda-library-action" target="_blank">GitHub Action for Soda</a>.

#### August 8, 2023
* Revised documentation to reflect the new **Checks** dashboard, that displays checks and their latest scan results. This replaces the **Check Results** dashboard, that displayed all individual check results.

#### August 7, 2023
* Moved [Check suggestions]({% link soda-library/check-suggestions.md %}) documentation from SodaCL section to Soda Library.

#### July 26, 2023
* Added [release notes]({% link release-notes/soda-library.md %}) documentation for Soda Library 1.0.5.
* Added detail to [schema check]({% link soda-cl/schema.md %}) documentation for new `schema_name` parameter.

#### July 24, 2023
* Added support for failed row checks when using [check templates]({% link soda-cl/check-template.md %}).

#### July 21, 2023
* Added documentation to complement [Google CloudSQL]({% link soda/connect-cloudsql.md %}) support.
* Added [release notes]({% link release-notes/soda-library.md %}) documentation for Soda Library 1.0.3 and Soda Library 1.0.4.
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.42 - 3.0.47.
* Added new `http_headers` configuration parameter for [Trino data source]({% link soda/connect-trino.md %}).

#### July 6, 2023
* Added documentation for the `samples columns` check configuration for metrics and checks that implicitly collect failed row samples: [missing]({% link soda-cl/missing-metrics.md %}#failed-row-samples), [validity]({% link soda-cl/validity-metrics.md %}#failed-row-samples), [duplicates]({% link soda-cl/numeric-metrics.md %}#failed-row-samples), [reference]({% link soda-cl/reference.md %}#failed-row-samples).

#### July 4, 2023
* Updated commands for [installing]({% link soda-library/install.md %}#install) Soda Library using a Docker image.

#### June 27, 2023
* Documentation to accompany the preview launch of [SodaGPT]({% link soda-cloud/sodagpt.md %}).

#### June 23, 2023
* Changed requirement for [check template]({% link soda-cl/check-template.md %}) to include the dataset identifier in the first line of the check so that Soda Cloud can properly render the check results.
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.40 and Soda Core 3.0.41.
* Added [release notes]({% link release-notes/soda-library.md %}) documentation for Soda Library 1.0.1 and Soda Library 1.0.2.
* Reverted Soda Agent to describe configuring Soda Core settings instead of Library. Will update to Soda Library details when updates are complete.

#### June 15, 2023
* Introducing Soda Library, a commercial extension of the Soda Core open-source software. It leverages all the power of Soda Core and SodaCL, and offers new features and functionality for Soda customers.
* New documentation for the new [Group by]({% link soda-cl/group-by.md %}) configuration and [Group evolution check]({% link soda-cl/group-evolution.md %}), both available with Soda Library.
* New documentation for [Check suggestions]({% link soda-library/check-suggestions.md %}) using the Soda Library CLI.
* New documentation for [Check template configuration]({% link soda-cl/check-template.md %}) supported by Soda Library.
* Revised syntax guidance regarding multiple thresholds for an alert. See [Optional check configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations).
* All <a href="https://github.com/sodadata/soda-core/tree/main/docs" target="_blank">documentation for Soda Core</a>, the open-source Python library and CLI tool, has moved to the <a href="https://github.com/sodadata/soda-core" target="_blank">Soda Core repository</a> on GitHub.

#### June 12, 2023
* Remove "Preview" tag from the [Reporting API v1]({% link api-docs/reporting-api-v1.md %}) documentation.

#### June 9, 2023
* Added Known Issue for using BigQuery and specifying numeric [missing values]({% link soda-cl/missing-metrics.md %}#specify-missing-values-or-missing-regex) or [valid values]({% link soda-cl/validity-metrics.md %}#specify-valid-or-invalid-values) with single quotes. TL;DR: Don't use single quotes.
* Added clarification to the value for `path` when connecting a [DuckDB data source]({% link soda/connect-duckdb.md %}).
* Removed incorrect syntax guidance regarding multiple thresholds for an alert. Each `warn` or `fail` condition can contain only one threshold. See [Optional check configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations).
* Updated instructions for configuring a `soda_cloud` connection in a `configuration.yml` file. New instructions involve copying the whole configuration instead of just API Key values.

#### June 8, 2023
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.38 and Soda Core 3.0.39.

#### May 31, 2023
* Added instructions and event payload details for using a [webhook]({% link soda/integrate-webhooks.md %}#webhooks-for-soda-cloud-agreement-notifications) to notify a third-party of new, deleted, or changed Soda agreements.

#### May 30, 2023
* Added a new parameter, `datasource_container_id` to the `.datasource-mapping.yml` file neede to map a [Soda Cloud-Alation]({% link soda/integrate-alation.md %}#set-up-the-integration) catalog integration.

#### May 25, 2023
* Added a step for [configuring]({% link soda/connect-spark.md %}#connect-to-spark-for-databricks-sql) `soda-core-spark[databricks]` to be sure to install `databricks-sql-connector` as well.

#### May 23, 2023
* Added a video overview showcasing the integration of [Soda and Alation]({% link soda/integrate-alation.md %}).
* Added a note for a [Known Issue]({% link soda-cl/profile.md %}#limitations-and-known-issues) regarding the use of variables in profiling configurations.

#### May 20, 2023
* Added documentation for using [private key authentication for Snowflake]({% link soda-agent/secrets.md %}#use-a-values-file-to-store-private-key-authentication-values-for-snowflake) when deploying a Soda Agent. 

#### May 15, 2023
* Replaced getting started guides with entirely new content with a focus on data engineering. 
  * [Take a sip of Soda]({% link soda/quick-start-sip.md %})
  * [Test data in a pipeline]({% link soda/quick-start-prod.md %})
  * [Test data during development]({% link soda/quick-start-dev.md %})
  * [Enable end users to test data]({% link soda/quick-start-end-user.md %})
* Replaced the [product overview]({% link soda/product-overview.md %}) with newly-written material.

#### May 11, 2023
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.33 and Soda Core 3.0.34.
* Added instructions for [user-defined metrics]({% link soda-cl/user-defined.md %}#define-user-defined-checks) to access and use queries in separate SQL files.
* Adjusted content for the revised CLI and Soda Cloud scan output for [schema checks]({% link soda-cl/schema.md %}#expect-one-check-result). Schema check results now display the output for all alerts triggered during a scan.

#### May 9, 2023
* Added the install package to each connector's page.
* Added a connectivity troubleshooting tip to [Connect to Snowflake]({% link soda/connect-snowflake.md %}#troubleshoot).

#### May 2, 2023
* Published content regarding the set up of [multiple Soda Cloud organizations]({% link soda-cloud/roles-and-rights.md %}#add-multiple-organizations) for use with different environments in your network infrastructure.
* Added a note about selecting a region when you sign up for a new Soda Cloud account.

#### April 28, 2023
* Corrected the explanation of the [`duplicate_count` check]({% link soda/quick-start-sodacl.md %}#duplicate-check) regarding checks that included multiple arguments (columns).

#### April 18, 2023
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.31 and Soda Core 3.0.32.

#### April 11, 2023
* Added a copy-to-clipboard button to most code snippets in documentation.
* Added attribute mapping details to add Soda Cloud to [Google Workspace as a SAML app]({% link soda-cloud/sso.md %}#add-soda-cloud-to-google-workspace).

#### March 29, 2023
* Revised instructions to add Soda Cloud to [Google Workspace as a SAML app]({% link soda-cloud/sso.md %}#add-soda-cloud-to-google-workspace).

#### March 28, 2023
* Added to Soda Agent documentation to include a setting for which Soda Cloud endpoint to use, according to region. See [Deploy an Soda Agent in a Kubernetes cluster]({% link soda-agent/deploy.md %}#deploy-using-cli-only).

#### March 24, 2023
* Added content to [Troubleshoot SodaCL]({% link soda-cl/troubleshoot.md %}#filter-not-passed-with-reference-check) to address challenges when using a reference check with a dataset filter.
* Added instructions to add Soda Cloud to [Google Workspace as a SAML app]({% link soda-cloud/sso.md %}#add-soda-cloud-to-google-workspace).
* Added parameter to Snowflake connection details for using private key encryption for [private key authentication]({% link soda/connect-snowflake.md %}#private-key-authentication).

#### March 21, 2023
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.29 and Soda Core 3.0.30.
* Added instructions for [limiting samples]({% link soda-cl/failed-rows-checks.md %}#set-a-sample-limit) for an entire data source.

#### March 9, 2023
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.28.

#### March 8, 2023
* Added to [Troubleshoot SodaCL]({% link soda-cl/troubleshoot.md %}#checks-not-evaluated) with information about checks that return `[NOT EVALUATED]` results.
* Added new content with advice to [Compare data using SodaCL]({% link soda-cl/compare.md %}).
* Documented how to prevent Soda from collecting failed rows samples and sending them to Soda Cloud using a [samples limit]({% link soda-cl/optional-config.md %}#disable-failed-row-samples-for-individual-checks).
* Corrected a prerequisite in Add a data source to indicate that you can deploy a Soda Agent in any Kubernetes cluster, not just Amazon EKS.

#### March 7, 2023
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.26 & 3.0.27.

#### February 28, 2023
* Published instructions for setting up private connectivity to a Soda Cloud account using AWS PrivateLink.

#### February 23, 2023
* Documented known issue with freshness check. See [Troubleshoot errors with freshness checks]({% link soda-cl/freshness.md %}#troubleshoot-errors-with-freshness-checks).
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.24 & 3.0.25.

#### February 22, 2023
* Removed preview status from agent deployment documentation for Azure Kubernetes Service (AKS) and Google Kubernetes Engine (GKE).
* Added instructions for programmatically running a Soda scan of the contents of a [local file]({% link soda/connect-file.md %}) using Dask.

#### February 21, 2023
* Revised documentation to clarify that you cannot wrap dataset names in quotes with [profiling or dataset discovery]({% link soda-cl/profile.md %}#limitations-and-known-issues), with [sample collection]({% link soda-cl/sample-datasets.md %}#optional-check-configurations), or in [for each]({% link soda-cl/for-each.md %}#limitations-and-specifics) configurations.
* Added advice about [avoiding reuse of check names]({% link soda-cl/optional-config.md %}#customize-check-names) in multiple agreements.

#### February 16, 2023
* Added documentation for the `invalid values` configuration key. Refer to [Validity metrics]({% link soda-cl/validity-metrics.md %}#list-of-configuration-keys) documentation.
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.23.
* Corrected custom check templates to use `fail condition` syntax, not `fail expression`. 
* Added instructions to [Configure a time partition using the NOW variable]({% link soda-cl/filters.md %}#configure-a-time-partition-using-the-now-variable).
* Added a note for limitations on using variables in checks in agreements in Soda Cloud. 

#### February 10, 2023
* Added a new section to Distribution check documentation for [defining a sample size]({% link soda-cl/distribution.md %}#define-the-sample-size).

#### February 9, 2023
* Add new documentation for [generating API keys]({% link soda-cloud/api-keys.md %}) for use with Soda Cloud.

#### January 25, 2023
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.22.
* Added a detail for adding an optional scheme property to `soda_cloud` configuration when connecting Soda Core to Soda Cloud. 
* Added documentation to accompany new support for [Dask and Pandas (Experimental)]({% link soda/connect-dask.md %}).

#### January 24, 2023
* Added documentation to accompany new support for [Vertica (Experimental)]({% link soda/connect-vertica.md %}).
* Added [troubleshooting tip]({% link soda-cl/troubleshoot.md %}#metrics-were-not-computed-for-check) for errors in which Soda does not compute metrics for a dataset that includes a schema in its identifier.

#### January 20, 2023
* Updated [agent upgrade]({% link soda/upgrade.md %}) docs with more detail.

#### January 19, 2023
* Added clarity to the documentation for [adding a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) and using a scan definition name.
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.20.
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.21.
* Updated screenshots of Soda Cloud for [deploying an agent]({% link soda-agent/deploy.md %}#create-a-soda-cloud-account-and-api-keys).
* Added [explicit detail]({% link soda-cl/filters.md %}#configuration-details-and-limitations) about when to wrap date variables in single quotes.
* Added a custom check templates for validating event sequence with date columns.
* Updated the Soda product feature list.

#### January 13, 2023

* Updated Soda Agent for GKE documentation so that the instructions for using a file reference for a Big Query data source connection use a Kubernetes secret instead of an Kubernetes ConfigMap.  

#### January 11, 2023
* Added documentation for the ability to create and use [check attributes]({% link soda-cl/check-attributes.md %}).
* Adjusted documentation for [adding dataset attributes]({% link soda-cloud/organize-datasets.md %}) to correspond with the new check attributes feature.
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.18.
* Removed the known issue for using `duplicate_count` and `duplicate_percent` metrics with an in-check filter.

#### January 10, 2023
* Added note about the new ability to add co-owners to an agreement.

#### December 28, 2022
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.17.

#### December 20, 2022
* Added preview documentation for [deploying a Soda Agent in a GKE cluster]({% link soda-agent/deploy.md %}). 

#### December 15, 2022
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.16.
* Corrected data types on which `max` and `min` metrics can be used. See [Numeric metrics]({% link soda-cl/numeric-metrics.md %}#list-of-numeric-metrics).

#### December 12, 2022
* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.15.

#### December 8, 2022
* Added preview documentation for the [Soda Cloud Reporting API v1]({% link api-docs/reporting-api-v1.md %}).
* Corrected documentation to properly reflect that you can add only one column against which to execute a metric in a check.
* Reverted the statement about using variables to pass any value *anywhere* in syntax or configuration at scan time. Refer to [variables documentation]({% link soda-cl/filters.md %}#configure-variables-in-sodacl) for details on how to use them.

#### December 2, 2022

* Added preview documentation for [deploying a Soda Agent in an AKS cluster]({% link soda-agent/deploy.md %}). Reorganized and expanded Soda Agent documentation in general.
* Added documentation to cast a column so as to use TEXT type data in a [freshness check]({% link soda-cl/freshness.md %}#details-and-limitations).
* Documented troubleshooting tips for Soda Cloud 400 response.

#### December 1, 2022

* Added [release notes]({% link release-notes/soda-core.md %}) documentation for Soda Core 3.0.14.
* Documented connection configuration for [Denodo (Experimental)]({% link soda/connect-denodo.md %}).
* Documented improvments to the feature for [rerouting failed rows samples]({% link soda-cl/failed-rows-checks.md %}#reroute-failed-rows-samples) to an HTTP endpoint.
* Documented [how to pass scan time variables]({% link soda-cl/filters.md %}#configure-variables-for-connection-configuration) for data source connection configuration values.
* Add an example to demonstrate how to define a [variable in an in-check filter]({% link soda-cl/filters.md %}#example-use-a-variable-in-an-in-check-filter).
* Documented how to [add an identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) to a check to preserve check result history in Soda Cloud when a check is modified.

#### November 30, 2022

* Adjusted the documentation for dataset discovery because, as of Soda Core v3.0.14, the action no longer derives a `row_count` metric; see [Dataset discovery]({% link soda-cl/profile.md %}#discover-datasets).
* Added documentation for the preview of the [alert notification rules]({% link soda-cloud/notif-rules.md %}) feature. 

#### November 28, 2022

* Added [troubleshooting instructions]({% link soda-library/install.md %}#error-library-not-loaded) for Soda Core Scientific on an M1 MacOS machine.

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

* Corrected the location in which to [opt out]({% link soda-library/usage-stats.md %}#opt-out-of-usage-statistics) of sending Soda Core usage statistics.

#### November 10, 2022

* Added [private key authentication]({% link soda/connect-snowflake.md %}#private-key-authentication) detail to Snowflake connection documentation.
* Updated the [list of numeric metrics]({% link soda-cl/numeric-metrics.md %}#list-of-numeric-metrics) for updated data source support. 
* Added a simple list of all SodaCL metrics to [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}#list-of-sodacl-metrics-and-checks) documentation.

#### November 8, 2022

* Added an [example webhook integration]({% link soda/integrate-webhooks.md %}#example-webhook-with-servicenow-for-soda-cloud-incidents) for Soda Cloud and ServiceNow.

#### November 7, 2022

* Added examples for using [in-check variables]({% link soda-cl/filters.md %}#configure-variables-in-SodaCL) to provide dynamic values at scan time.

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

* Removed the Preview status from self-serve features which are now generally available in Soda Cloud, such as agreements and [profiling]({% link soda-cl/profile.md %}).
* Migrated custom metric templates from Soda SQL to SodaCL.

#### October 19, 2022

* Added [release notes]({% link release-notes/all.md %}) to correspond with the release of Soda Core 3.0.11.
* Documented connection configuration for [Azure Synapse (Experimental)]({% link soda/connect-synapse.md %}).
* Added documentation for an enhancement for [change-over-time checks]({% link soda-cl/numeric-metrics.md %}#change-over-time-thresholds) to gauge changes relative to the same day last week or month.
* Added documentation for the new `test-connection` command in Soda Core. See [Connect Soda to Amazon Athena]({% link soda/connect-athena.md %}#test-the-data-source-connection) for an example.

#### October 13, 2022

* Added notes about specifying the type of [quotes]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) you use in SodaCL checks must match that which the data source uses. 
* Added short snippet as an example to obtain scan exit codes in a [programmatic scan]({% link soda-library/programmatic.md %}#scan-exit-codes). 
* Added detail about using [multiple checks files]({% link soda-library/run-a-scan.md %}#anatomy-of-a-scan-command) in one scan command.
* Added detail about [re-using user-defined metrics]({% link soda-cl/user-defined.md %}#define-user-defined-checks) in multiple checks in the same checks YAML file.

#### October 11, 2022

* Added documentation for [grouping failed checks results]({% link soda-cl/failed-rows-checks.md %}#group-results-by-category) by one or more categories. 

#### October 5, 2022

* Added release notes to correspond with the release of Soda Core 3.0.10.
* Revised the value for the default number of [failed row samples]({% link soda-cl/optional-config.md %}#collect-failed-row-samples) that Soda automatically collects and displays in Soda Cloud from 1000 to 100.
* Added documentation to accompany new support for [Dremio]({% link soda/connect-dremio.md %}).
* Added documentation to accompany new support for [ClickHouse (Experimental)]({% link soda/connect-clickhouse.md %}).

#### September 29, 2022

* Added a link to a community contribution for Prefect 2.0 collection for Soda Core.
* Updated Reference checks documentation for [displaying failed]({% link soda-cl/reference.md %}#failed-row-samples) rows in Soda Cloud.

#### September 28, 2022

* Added release notes to correspond with the release of Soda Core 3.0.9.
* Added documentation for a new `samples limit` configuration key that you can add to checks that use [missing]({% link soda-cl/missing-metrics.md %}#failed-row-samples), [validity]({% link soda-cl/validity-metrics.md %}#failed-row-samples), or [duplicate_count]({% link soda-cl/numeric-metrics.md %}#failed-row-samples) metrics which automatically send 1000 failed row samples to Soda Cloud.
* Added instructions to [save failed row samples to a file]({% link soda-library/programmatic.md %}#save-failed-row-samples-to-a-file).
* Added [Windows-specific instructions]({% link soda-library/install.md %}) for installing Soda Core using a virtual environment.
* Removed known issue for in-check variables which are supported as of Soda Core 3.0.9: "Except for customizing [dynamic names for checks]({% link soda-cl/optional-config.md %}#customize-check-names), you *cannot* use in-check variables. For example, Soda does not support the following check:

```yaml
checks for dim_customers:
  - row_count > ${VAR_2}
```

#### September 23, 2022

* Added documentation to set up [integration with Microsoft Teams]({% link soda/integrate-webhooks.md %}) so that Soda Cloud can send alert notifications or incident events to MS Teams.
* Added detail for programmatically inspecting scan results; see [programmatic scans]({% link soda-library/programmatic.md %}). Available with Soda Core 3.0.9.
* Added details for using various [authentication methods]({% link soda/connect-bigquery.md %}#authentication-methods) to connect to BigQuery.

#### Septemeber 22, 2022

* Added release notes to correspond with the release of Soda Core 3.0.8.
* Removed Known issue: Connections to MS SQL Server do not support checks that use regex, such as with [missing metrics]({% link soda-cl/missing-metrics.md %}#list-of-missing-metrics) or [validity metrics]({% link soda-cl/validity-metrics.md %}#list-of-validity-metrics).

#### September 14, 2022

* Added instructions for [configuring a custom sampler for failed rows]({% link soda-cl/failed-rows-checks.md %}#configure-a-failed-row-sampler).

#### September 13, 2022

* Added documentation to correspond with the release of Soda Core 3.0.7, including an update to [freshness check results]({% link soda-cl/freshness.md %}#freshness-check-results).
* Removed the known issue for using variables in the SQL or CTE of a [user-defined check]({% link soda-cl/user-defined.md %}). See <a href="https://github.com/sodadata/soda-core/issues/1577" target="_blank">GitHub Issue 1577</a>.
* Added instructions for configuring the same scan to run in multiple environments.
* Added information about [passing parameters]({% link soda/connect-snowflake.md %}) to a Snowflake data source in connection configurations, specifically which parameter to use to authenticate a connection via SSO with a SAML 2.0-compliant identity provider (IdP).

#### Septemeber 12, 2022

* Documented [Soda Cloud resources]({% link soda-cloud/soda-cloud-architecture.md %}#soda-cloud-resources) to add visual context to the parts that exist in Soda Cloud, and how they relate to each other, particularly when you delete a resource.
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
* Added details for obtaining info when [upgrading]({% link soda/upgrade.md %}#troubleshoot) a Soda Agent.
* Organized and tightened Soda Core documentation.

#### August 26, 2022

* Added documentation for how to use Soda Core for SparkDF with a Notebook to connect to [Databricks]({% link soda/connect-spark.md %}#use-soda-core-with-spark-dataframes-on-databricks).
* Adjusted the configuration for connecting to [MS SQL Server]({% link soda/connect-mssql.md %}) based on community feedback.

#### August 24, 2022

* Adjusted [configuration instructions]({% link soda/connect-spark.md %}) for `soda-core-spark-df` to separately install dependencies for Hive and ODBC as needed.
* Added content to correspond with Soda Core's new support for [Trino]({% link soda/connect-trino.md %}).
* Removed the known issue: The `missing format` configuration does not function as expected.

#### August 22, 2022

* Added an [example DAG]({% link soda-library/orchestrate-scans.md %}#example-dag) for using Soda with Airflow PythonOperator.
* Added [Tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl) documentation.
* Expanded [For each]({% link soda-cl/for-each.md %}) documentation with optional configurations and examples.
* Published a new Quick start for Soda Cloud (Preview) that outlines how to use preview features in Soda Cloud to connect to a data source, then write a new agreement for stakeholder approval.

#### August 11, 2022

* Added documentation for the new `-t` option for use with scan commands to overwrite scan output in Soda Cloud.

#### August 10, 2022

* Added content to correspond with Soda Core's new support for [MySQL]({% link soda/connect-mysql.md %}).
* Validated and clarified documentation for using [filters and variables]({% link soda-cl/filters.md %}).

#### August 9, 2022

* Added documentation to describe the migration path from Soda SQL to Soda Core.

#### August 2, 2022

* Adjusted the instructions for [Slack integration]({% link soda/integrate-slack.md %}) to correspond with a slightly changed UI experience.
* Added limitation to the [for each]({% link soda-cl/for-each.md %}) as the configuration is not compatible with dataset filters (also known as partitions).


#### August 1. 2022

* Added a "was this helpful" counter to most documentation pages.
* Added details for [connecting `soda-core-spark-df` to Soda Cloud]({% link soda/connect-spark.md %}#connect-soda-for-sparkdf-to-soda-cloud). 

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

* Added details to Soda Core documentation for using system variables.  to store sensitive credentials.
* Updated the Quick start for Soda Core and Soda Cloudwith slightly changed instructions.

#### June 20, 2022

* Changed all references to `table` in SodaCL to `dataset`, notably used with [for each]({% link soda-cl/freshness.md %}) and [distribution]({% link soda-cl/distribution.md %}) check syntax.
* Added deprecation warning banners to all Soda SQL and Soda Spark content.
* Revised and reorganized content to reframe focus on Soda Core in lieu of Soda SQL.
* New [How Soda Core works]({% link soda-library/how-library-works.md %}) documentation.
* Added more Soda Core documentation to main docs set. 
* Updated [Soda product overview]({% link soda/product-overview.md %}) to reflect new focus on Soda Core and imminent deprecation of Soda SQL and Soda Spark.
* Updated Soda Cloud documentation to reflect new focus on Soda Core.
* Update links on [docs home page]({% link index.html %}) to point to most recent content and shift Soda SQL and Soda Core to a Legacy section.

#### June 14, 2022

* Added documentation corresponding to Soda Core support for [Apache Spark DataFrames]({% link soda/connect-spark.md %}). For use with [programmatic Soda scans]({% link soda-library/programmatic.md %}), only.
* Updated the syntax for [freshness checks]({% link soda-cl/freshness.md %}) to remove `using` from the syntax and identify column name instead by wrapping in parentheses.
    * old: `freshness using created_at < 3h`
    * new: `freshness(created_at) < 3h`
* Added clarification to the context-specific measning of a [BigQuery dataset]({% link soda/connect-bigquery.md %}) versus a dataset in the context of Soda.
* Added instructions for setting a [default notification channel]({% link soda/integrate-slack.md %}#set-a-default-slack-channel-for-notifications) in Slack for Soda Cloud alerts.
* Added an explanation about [anomaly score check results]({% link soda-cl/anomaly-score.md %}#anomaly-score-check-results) and the minimum number of measurements required to gauge an anomaly.
* Moved installation instructions for Soda Core Scientific to a sub-section of Install Soda Core.
* Added expanded example for setting up [Soda Core Spark DataFrames]({% link soda/connect-spark.md %}).

#### June 9, 2022

* Added some new Soda Core content to documentation.
* Moved Soda SQL and Soda Spark in documentation leftnav.
* Updated Home page with links to new Soda Core documentation.
* Fixed formatting in Quick start for Soda Core and Soda Cloud.

#### June 8, 2022

* Updated the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) with an example of a check for duplicates.
* Added documentation for installing Soda Spark on Windows.
* Updated the [Distribution check]({% link soda-cl/distribution.md %}) documentation to record a change in syntax for the check and the addition of two more methods available to use with distribution checks.

#### June 7, 2022

* Added new documentation for Install Soda Core Scientifc.
* Add a new [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}).

#### June 6, 2022

* Added clarifying details to [Cross checks]({% link soda-cl/cross-row-checks.md %}) and updated images on [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).
* Added [Use Docker to run Soda Core]({% link soda-library/install.md %}) to Soda Core installation documentation.

#### June 2, 2022

* Revised the SodaCL [User-defined checks]({% link soda-cl/user-defined.md %}) documentation.
* Revised [For each]({% link soda-cl/for-each.md %}) and [Filters]({% link soda-cl/filters.md %}) documentation.
* Updated [Glossary]({% link soda/glossary.md %}) with SodaCL terminology.

#### June 1, 2022

* Updated SodaCL [Freshness checks]({% link soda-cl/freshness.md %}) and [Cross checks]({% link soda-cl/cross-row-checks.md %}) (fka. Row count checks).
* Added new documentation for SodaCL [Failed rows checks]({% link soda-cl/failed-rows-checks.md %}) 

#### May 31, 2022

* Updated SodaCL [Schema checks]({% link soda-cl/schema.md %}) and [Reference checks]({% link soda-cl/reference.md %}) documentation.
* Corrected Soda Cloud connection syntax in the Quick start for Soda Core and Soda Cloud.
* Removed separate Duplicate checks documentation, redirecting to [Numeric metrics]({% link soda-cl/numeric-metrics.md %}).

#### May 26, 2022

* Updated various Soda Core documents to include support for Amazon Athena. See [Connect to Amazon Athena]({% link soda/connect-athena.md %}).
* Update [Optional check configurations]({% link soda-cl/optional-config.md %}) to include instructions for use an in-check filter to check a portion of your data.
* Added new documentation for [Missing metrics]({% link soda-cl/missing-metrics.md %}) and [Validity metrics]({% link soda-cl/validity-metrics.md %}).

#### May 25, 2022

* Revised and renamed **Data observability** to **Data concepts**.

#### May 24, 2022

* Updated the documentation for the [distribution check]({% link soda-cl/distribution.md %}) in SodaCL, including instructions to install Soda Core Scientific.

#### May 19, 2022

* Added new SodaCL documentation to elaborate on some configuration and offer broad language rules. See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}), [Optional check configurations]({% link soda-cl/optional-config.md %}), [Numeric metrics]({% link soda-cl/numeric-metrics.md %}), [Filters]({% link soda-cl/filters.md %}), [Anomaly score check]({% link soda-cl/anomaly-score.md %}) and [For each]({% link soda-cl/for-each.md %}).

#### May 18, 2022

* Updated the details pertaining to connecting Soda Core to Soda Cloud. The syntax for the key-value pairs for API keys changed from `api_key` and `api_secret` to `api_key_id` and `api_key_secret`.

#### May 9, 2022

* Updated the [Soda Core installation documentation]({% link soda-library/install.md %}) to indicate that Python 3.8 or greater is required.

#### April 26, 2022

* Updated a set of Soda product comparison matrices to illustrate the features and functionality available with different Soda tools.

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

* New documentation for the beta release of Soda Core, a free, open-source, command-line tool that enables you to use the Soda Checks Language to turn user-defined input into aggregated SQL queries.
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
