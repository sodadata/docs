---
name: "3.0.2"
date: 2022-07-18
products:
  - soda-core
---

**Enhancements and New Features**
* IBM db2 support
* Support cli --version to output core version
* Warn users when quotes are present in include excludes identifiers
* Add samples limit to failed rows checks
* BQ expose remaining client params and auth methods
* Enable Snowflake Tokens
* Treat zero missing or invalid rows as zero percent

**Bug Fixes**
* Make name optional for failed rows
* Use exception rather than exc_info to render traceback in soda-core logger’s call of prophet model
* Stored row count in cloud is wrong
* Handle exceptions from scientific library and log them instead or letting them raise
* Spark DF: update example api usage
* Change default scan definition name
* BQ: remove schema, use dataset only
* Use default distribution comparison method when user has not provided one
* Fix utc timezone handling
* Improve profiling test for all tables and all columns
* Fix utc timezone handling
* Set redshift host before trying to fetch credentials
* Change unassigned min and max variables for profiling logs
* Use check name in Metric checks
* If anomaly detection fails other check results are not sent to cloud
* Prevent empty table list from running all tables
* Profile column parsing fails when user provides illegal column spec
* Join check text with newlines instead of /n

**Infra/CI**
* Async Docker image building through Actions and dispatch


Refer to the <a href="https://github.com/sodadata/soda-core/releases" target="_blank">Soda Core Release Notes </a> for details.