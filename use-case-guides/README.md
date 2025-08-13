---
description: >-
  Access examples of Soda implementations according to use case and data quality
  testing needs.
---

# Use case guides

Use the following guides as example implementations based on how you intend to use Soda for data quality testing. For standard set up instructions, see [Get started](../quick-start-sip/get-started-roadmap.md).

| [Test data in an Airflow pipeline](quick-start-prod.md)                        | Use this guide as an example for how to set up Soda to test the quality of your data in an Airflow pipeline that uses dbt transformations. | <p>Soda Library<br>Soda Cloud</p> |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| [Test data quality in an ADF pipeline](quick-start-adf.md)                     | Learn how to invoke Soda data quality tests in an ETL pipeline in Azure Data Factory.                                                      | <p>Soda Library<br>Soda Cloud</p> |
| [Test data quality in a Dagster pipeline](quick-start-dagster.md)              | Learn how to invoke Soda data quality tests in a Dagster pipeline.                                                                         | <p>Soda Library<br>Soda Cloud</p> |
| [Test data quality in Databricks pipeline](quick-start-databricks-pipeline.md) | Learn how to use Databricks notesbooks with Soda to test data quality before feeding a machine learning model.                             | <p>Soda Library<br>Soda Cloud</p> |
| [Test data before migration](quick-start-migration.md)                         | Use this guide to set up Soda to test before and after data migration between data sources.                                                | <p>Soda Library<br>Soda Cloud</p> |
| [Self-serve Soda](quick-start-end-user.md)                                     | Use this guide to set up Soda Cloud to enable users across your organization to serve themselves when it comes to testing data quality.    | <p>Soda Cloud<br>Soda Agent</p>   |
| [Test data during development](quick-start-dev.md)                             | Use this guide to set up Soda to test the quality of your data during your development lifecycle in a GitHub Workflow.                     | <p>Soda Library<br>Soda Cloud</p> |
| [Automate monitoring](quick-start-automate.md)                                 | Use this guide to set up Soda to automatically monitor data quality.                                                                       | <p>Soda Cloud<br>Soda Agent</p>   |

\
Use the following How tos for practical advice, examples, and instructions for using Soda.

| [Build a Sigma dashboard](reporting-api-to-overview-dashboards.md) | Learn how to build a customized data quality reporting dashboard in Sigma using the Soda Cloud API.                                                                                    | <p>Soda Library<br>Soda Cloud</p>      |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [Build a Grafana dashboard](public-api-to-grafana.md)              | Learn how to build a customized data quality reporting dashboard in Grafana using the Soda Cloud API.                                                                                  | Soda Cloud                             |
| [Invoke Soda in Databricks](quick-start-databricks.md)             | Learn how to invoke Soda data quality tests in a Databricks notebook.                                                                                                                  | <p>Soda Library<br>Soda Cloud</p>      |
| [Use a Secrets Manager](quick-start-secrets.md)                    | Learn how to set up a Soda Agent to use an External Secrets Manager to retrieve frequently-rotated data source passwords.                                                              | <p>Soda Cloud<br>Self-hosted Agent</p> |
| [Generate API keys](api-keys.md)                                   | Learn how to use Soda Cloud API keys to securely communicate with other entities such as Soda Library and self-hosted Soda Agents, and to provide secure access to Soda Cloud via API. | Soda Cloud                             |
| [Manage sensitive data](sensitive-data.md)                         | Learn how to adjust several configurable settings that help you manage access to sensitive data in Soda Cloud.                                                                         | Soda Cloud                             |
| [Reroute failed row samples](../run-a-scan/failed-row-samples.md)  | Learn how to programmatically set up Soda Library to display failed row samples in the command-line.                                                                                   | <p>Soda Library<br>Soda Cloud</p>      |
| [Double-onboard a data source](double-onboard-datasource.md)       | Learn how to onboard a data source in Soda Cloud that you have already onboarded via Soda Library.                                                                                     | <p>Soda Library<br>Soda Cloud</p>      |

> Need help? Join the [Soda community on Slack](https://community.soda.io/slack).
