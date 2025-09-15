---
description: >-
  Review release notes for Soda Core, an open-source tool for testing and
  monitoring data quality.
---

# Soda Core - Release notes

## v4 initial release

<sup>01 September, 2025</sup>

* Introduced support for parsing, publishing and (both locally and remotely) verifying data contracts.
* Introduced "Missing", "Invalid", "Duplicate", "Aggregate", "Failed Rows", "Metric" checks in data contract.
* Introduced **data contracts** support for multiple data sources:
  * Postgres, Snowflake, Bigquery, Databricks, Redshift, SQL Server, Fabric, Synapse, Athena, DuckDB (in memory).
* Introduced **metrics monitoring** support for multiple data sources:
  * Postgres, Snowflake, Bigquery, Databricks, SQL Server, Fabric, Synapse, Athena.
* Introduced new CLI with a noun-verb structure and better integration with the Soda Cloud APIs (e.g. contract fetching based on a dataset identifier)
* Introduced support for `variables` in contracts, allowing you to parameterize contracts.
* Introduced support for extending functionality using plugins.
* Introduced extensible check types.
* Introduced hooks for contract generation, a first plugin.
* Introduced concept and hooks for contract verification result handlers, allowing post processing of the contract verification results.

### Extensions

* Implemented the contract generation plugin.
* Implemented the diagnostics warehouse plugin.
* Implemented reconciliation checks.
* Implemented group-by checks.
* Implemented support for Oracle as a data source.
* Implemented support for contract requests.
