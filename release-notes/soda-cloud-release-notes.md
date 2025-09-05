---
description: >-
  Review release notes for Soda Cloud, a web app that enables you visualize data
  quality test results and set alerts and notifications.
---

# Soda Cloud - Release notes

## v4 initial release

<sup>01 September, 2025</sup>

* Implemented new dataset onboarding process to easily onboard datasets with metric monitoring

### Data Testing

* Introduced Data Contracts to formalize requirements and expectations of user datasets
  * Supported checks:
    * Dataset-level: row count, schema, freshness, duplicate, failed rows, custom metrics.
    * Column-level: missing, invalid, duplicate, aggregate, failed rows, custom metrics.
  * Available on supported data sources:
    * Athena, Bigquery, Databricks, DuckDB, Fabric, Postgres, Redshift, Snowflake, SQL Server, Synapse.
  * Schedule your contract verifications with a Data Contract Schedule.
* Introduced the new Collaborative Authoring UI that allows business and technical users to collaborate on Data Contracts.
* Introduced Contract Requests to request and propose changes for Data Contracts.
  * Stay up-to-date with your requests and proposals with e-mail notifications.
* Introduced Automated Contract Generation to kickstart your Data Contracts.
* Introduced Secret Manager to securely store your data source connection credentials.

### Metric Monitoring

* Introduced AI-powered metrics observability.
  * Supported monitors:
    * Dataset-level: total row count, total row count change, last modification time, schema changes, partition row count, most recent timestamp.
    * Column-level: missing values percentage, duplicate percentage, count, unique count, most recent timestamp, sum, minimum, maximum, average, standard deviation, variance, first quartile (Q1), median (Q2), third quartile (Q3), average length, minimum length, maximum length.
    * Group column-level monitor by any column to get insights per segment.
  * Available on supported data sources:
    * Athena, Bigquery, Databricks, Fabric, Postgres, Redshift, Snowflake, SQL Server, Synapse
  * Set a daily schedule for your monitors.
  * Fine-tune metric monitoring:
    * Set threshold strategy, exclusion values, and sensitivity,
    * Give feedback to improve detection,
    * Create incidents.
* Introduced Cloud API to fetch your observability metrics.
* Introduced programmatic configuration of metric monitoring
* Introduced historical metric collection: calculate past data quality metrics retroactively for up to 365 days.
* Introduced metric monitor pages with interactive plots to understand and fine-tune your monitors.
