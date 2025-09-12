---
description: >-
  Review release notes for Soda Library, a Python library and CLI for testing
  data quality.
---

# Release notes for Soda Library

### \[soda-library] 1.12.22

<sup>8 September 2025</sup>

### 1.12.22 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Bump `deepdiff~=8.6` to fix [CVE-2025-58367](https://github.com/advisories/GHSA-mw26-5g2v-hqw3))
* Fix data type for Redshift metadata row count

### \[soda-library] 1.12.21

<sup>3 September 2025</sup>

### 1.12.21 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Quote identitifiers in queries
* Add private key auth support for snowflake

### \[soda-library] 1.12.20

<sup>3 September 2025</sup>

### 1.12.20 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Fix calculating total row count change metric
* Introduce OAuth client credentials flow for trino
* Enable OAuth client credentials flow for snowflake

### \[soda-library] 1.12.19

<sup>28 August 2025</sup>

### 1.12.19 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Fix using known partition column for v4 datasets

***

### \[soda-library] 1.12.18

<sup>27 August 2025</sup>

### 1.12.18 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Fix for Fabric metadata row counts and schema discovery
* Fix default port for v4 datasources
* Set default driver for SQL Server on v4
* PLATL-127 - Refactor data source secrets, use AWS Secretsmanager and organization variables
* Prevent duplicate quoting of schemas on databricks
* Add Athena support
* Fix main pipeline
* Add MM support for different time partition units

***

### \[soda-library] 1.12.17

<sup>19 August 2025</sup>

### 1.12.17 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Fix generating defaults when partition is empty
* Treat dates as midnight for MM
* Impute missing groups
* Fix handling cloud-generated dataset monitors
* Limit max number of groups in group monitor
* Fix check name for monitor groups
* Fix group monitor names & defaults

***

### \[soda-library] 1.12.16

<sup>13 August 2025</sup>

### 1.12.16 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Fix handling `None` values in MM algorithm
* Add MS Fabric support
* Attempt to fix main workflow for Fabric on Python 3.9
* Redshift - case sensitive identifiers in v4
* Add support for group by monitors
* Fix python 3.9 compatibility

***

### \[soda-library] 1.12.15

<sup>06 August 2025</sup>

### 1.12.15 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Add more hourly frequencies support and fix test assets files
* Maintain consistency with soda-core: Oracle, DQN

***

### \[soda-library] 1.12.14

<sup>04 August 2025</sup>

### 1.12.14 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* R-109: implement PK detection

***

### \[soda-library] 1.12.13

<sup>01 August 2025</sup>

### 1.12.13 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Improve handling of silent failures
* Update default reviewer list
* Add soda-synapse pkg to publish-pypi workflow

***

### \[soda-library] 1.12.12

<sup>30 July 2025</sup>

### 1.12.12 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Synapse add full support from scratch

***

### \[soda-library] 1.12.11

<sup>29 July 2025</sup>

### 1.12.11 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Updating Metric Monitoring Algorithm
* Stabilize BigQuery CI
* R-96: implement onboarding of datasets
* Fix python 3.9 compatibility

***

### \[soda-library] 1.12.10

<sup>22 July 2025</sup>

### 1.12.10 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Redshift add v4 connection
* PLATL-120 - Add manual data source pipeline for soda-library data source
* Fix API reporting for v4 connection failure

***

### \[soda-library] 1.12.9

<sup>16 July 2025</sup>

### 1.12.9 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Potential fix for Bigquery CI failures
* Bugfix for wrong timestamp being imputed for missing scans
* Added testing for v4 data sources in metric monitoring
* Obsl 511 bigquery add v4 support
* Configure profiling sampling strategy from cloud
* Fix python 3.9 compatibility

***

### \[soda-library] 1.12.8

<sup>03 July 2025</sup>

### 1.12.8 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Added support for v4 table identity profiling
* Enable metadata collection & backfilling for redshift
* Implemented v4 datasource for SQLServer
* Add v4 data source: Oracle
* fix(recon\_row\_diff): ensure cursor is drained prior to executing another query

***

### \[soda-library] 1.12.7

<sup>26 June 2025</sup>

### 1.12.7 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Bigquery support backfilling using metadata
* Added length based metrics: min, max and avg
* Bigquery get time partition column from metadata
* Added duplicate\_percentage metric
* Added quantile metrics
* Include `version` field in Soda Cloud requests
* Add support for disabling metrics
* Add support for more metrics
* Skip metadata test on BigQuery
* Rename to `duplicate_values_percentage`
* Fix missing value percentage metric
* Fix qualified table quoting
* Quick fix for metadata backfilling for BigQuery
* fix(group\_evo\_metric): diff query -> diff metric identity
* Query postgres row count using `SELECT COUNT(*)`

***

### \[soda-library] 1.12.6

<sup>19 June 2025</sup>

### 1.12.6 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* fix(json\_helper): convert numpy int/floats to native int/floats

***

### \[soda-library] 1.12.5

<sup>18 June 2025</sup>

### 1.12.5 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Updated names for metrics

***

### \[soda-library] 1.12.3

<sup>13 June 2025</sup>

### 1.12.3 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Improve connection test for snowflake
* Remove suggest generator & `ia-questionary` dependency
* Fix handling cased table names on postgres
* Added more authentication methods for Postgres v4 connector
* Update test casing expectations for redshift
* Add `sum`, `distinct` and `non_missing_count` metrics

***

### \[soda-library] 1.12.1

<sup>12 June 2025</sup>

### 1.12.1 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Support partition column suggestion per dataset
* Fix `connection_type` for v4 databricks
* Fix total row count change metric
* Add support for env variables for v4 data sources
* Use legacy behavior when `--upload-mode` not set
* Limit databricks retries to 3 attempts in 1s-5s
* Rename timeliness to `Last modification time`
* Add support for Snowflake v4 data source

***

### \[soda-library] 1.12.0

<sup>09 June 2025</sup>

### 1.12.0 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Metric Monitoring General Availability in a separate package

***

### \[soda-library] 1.11.17

<sup>09 June 2025</sup>

### 1.11.17 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Skip data-based metrics when no partition column
* Dtl 768/split library
* Fix CI
* Fix ci
* Fix CI + remove obs package from requirements to exclude it from docker

***

### \[soda-library] 1.11.16

<sup>05 June 2025</sup>

### 1.11.16 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Add support for v4 data sources
* Fix python 3.9 compatibility
* Add `--upload-mode` CLI option
* Filter out system schemas from discovery
* Obsl 425 Create Postgres v4 Datasource

***

### \[soda-library] 1.11.15

<sup>03 June 2025</sup>

### 1.11.15 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* Fix metric monitoring on postgres for capitalized partition column names

***

### \[soda-library] 1.11.14

<sup>03 June 2025</sup>

### 1.11.14 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* Updated approach for acquiring last modification for OracleDB
* Work around dependency resolution errors in pip 25.1
* Update last modification timestamp for SQL Server
* Updated Oracle implementation for new definition latest modification

***

### \[soda-library] 1.11.12

<sup>23 May 2025</sup>

### 1.11.12 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* Cloud 5988 custom identity jinja resolve

***

### \[soda-library] 1.11.11

<sup>22 May 2025</sup>

### 1.11.11 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* Replace `sodaCoreHistoricMeasurements` API
  * This addresses an issue for the `total row count change` metric. Due to using an old API it could return the change in row count between now and a random point in history, rather than between now and yesterday.

***

### \[soda-library] 1.11.10

<sup>22 May 2025</sup>

### 1.11.10 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* Fix handling of `null` row count for MM

***

### \[soda-library] 1.11.9

<sup>20 May 2025</sup>

### 1.11.9 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

#### Metric monitoring

* Fix handling empty partition column
* Remove old observability based on profiling
  * This also fixes an issue for discovery performed as part of metric monitoring on SQL Server
* Handle case where metadata is missing
* Fix observability discovery
* Fix missing user configuration defaults

***

### \[soda-library] 1.11.8

<sup>07 May 2025</sup>

### 1.11.8 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* Fix duplicate metrics & schema identity for MM
* Use new optimized historic data queries
* Fix freshness metric for empty partitions
* Clean up redundant diagnostics mapping

***

### \[soda-library] 1.11.7

<sup>06 May 2025</sup>

### 1.11.7 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* Remove error for invalid datasource names

***

### \[soda-library] 1.11.6

<sup>30 April 2025</sup>

### 1.11.6 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* Ignore v4 data source configurations
* Add missing values column metric to MM
* Use cloud-generated name for column monitors
* Fix checking for exclusion zone when alerting
* Fix missing `userConfiguration` in DTO
* Fix monitor error when partition doesn't have data
* Fix python 3.9 compatibility
* Extend column monitors
* Fix getting history for column metric checks
* Fix missing metadata metrics after backfilling
* Verify dtype for suggested partition columns
* Fix handling table without metrics

***

### \[soda-library] 1.11.5

<sup>18 April 2025</sup>

### 1.11.5 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* Fix handling feedback when there is gaps in the data

***

### \[soda-library] 1.11.4

<sup>17 April 2025</sup>

### 1.11.4 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

#### Anomaly detection checks

* Fix prophet error on gaps in user feedback

#### Metric monitoring

* Fix handling `NaN` values in total row count
* added indexing to also feedback and predicted anomalies arrays
* fix comment
* Prevent recalculating imputed values

***

### \[soda-library] 1.11.3

<sup>11 April 2025</sup>

### 1.11.3 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* update rounding\_type logic to not require user input
* Bump opentelemetry
* Clean up misplaced group evolution test

***

### \[soda-library] 1.11.2

<sup>07 April 2025</sup>

### 1.11.2 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* Trino: fix query pagination

***

### \[soda-library] 1.11.1

<sup>04 April 2025</sup>

### 1.11.1 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* New: Reconciliation Reference check

***

### \[soda-library] 1.10.4

<sup>03 April 2025</sup>

### 1.10.4 Features and Fixes <a href="#id-1104-features-and-fixes" id="id-1104-features-and-fixes"></a>

* fix(dbt): handle missing column\_name in test node by @adkinsty in #486

***

### \[soda-library] 1.10.3

<sup>03 April 2025</sup>

### 1.10.3 Features and Fixes <a href="#id-1103-features-and-fixes" id="id-1103-features-and-fixes"></a>

* Skip databricks history until table creation by @mivds in #482
* Fix backfilling when there is no partition column by @mivds in #484
* Fix incorrect row count for `REPLACE TABLE` by @mivds in #483
* Fix 1-interval offset for table creation history by @mivds in #485
* Use partition column suggestions from soda cloud by @mivds in #481
* Limit `partition_row_count` metric to data range by @mivds in #487
* Set `numba` log level to `WARNING` by @mivds in #489

***

### \[soda-library] 1.10.2

<sup>01 April 2025</sup>

### 1.10.2 Features and Fixes <a href="#id-1102-features-and-fixes" id="id-1102-features-and-fixes"></a>

* dbt: support ingestion of dbt test results from all versions of dbt by @adkinsty in #474

***

### \[soda-library] 1.10.1

<sup>31 March 2025</sup>

### 1.10.1 Features and Fixes <a href="#id-1101-features-and-fixes" id="id-1101-features-and-fixes"></a>

* Relax numpy requirement to < 3.0.0 by @adkinsty in #453
* Oracle: add schema to dataset prefix, support custom prefix by @m1n0 in #460
* Redshift: add keepalive by @m1n0 in #480
* Group by: apply global attributes by @m1n0 in #475

#### Metric Monitoring <a href="#metric-monitoring" id="metric-monitoring"></a>

* Enable checking for column addition by @mivds in #462
* Report metadata metrics using query time by @mivds in #461
* Fix schema filter in snowflake metadata query by @mivds in #463
* Fall back to default userConfig if not available by @mivds in #465
* Update metric monitoring check names by @mivds in #467
* Limit generation of userConfig missing warning by @mivds in #466
* Inform user when metadata is not available by @mivds in #470
* Fix backfilling scan with no data in date range by @mivds in #469
* Fix warning when there are no matching tables by @mivds in #471
* Fix backfilling missing partition row count by @mivds in #472
* Fix backfilling for ‘most recent timestamp’ metric by @mivds in #476
* Rename partition row count by @mivds in #479
* Fix handling of partition column as datetime by @mivds in #478
* Alert on lower threshold for time metrics by @mivds in #477
* updating algorithm’s use of feedback by @nikosml in #468
* Add rounding and more algorithm testing by @nikosml in #464

***

### \[soda-library] 1.10.0

<sup>25 March 2025</sup>

### 1.10.0 Features and Fixes <a href="#id-1100-features-and-fixes" id="id-1100-features-and-fixes"></a>

* Enable metric monitoring using new algorithm by @mivds in #455
* Remove support for python 3.8 by @mivds in #458

***

### \[soda-library] 1.9.3

<sup>14 March 2025</sup>

### 1.9.3 Features and Fixes <a href="#id-193-features-and-fixes" id="id-193-features-and-fixes"></a>

* Fix scan time reporting by @mivds in #428
* Validity check: fix complex mixed rules query (#2219) by @m1n0 in #440
* fix(trino): handle period character in schema name by @adkinsty in #444

***

### \[soda-library] 1.9.2

<sup>26 February 2025</sup>

### 1.9.2 Features and Fixes <a href="#id-192-features-and-fixes" id="id-192-features-and-fixes"></a>

* Postgres: treat missing setting as warning by @mivds in #403
* Use calendar chart for schema check by @mivds in #401
* Fix reporting profiling for distributed scans by @mivds in #407

***

### \[soda-library] 1.9.1

<sup>24 February 2025</sup>

### 1.9.1 Features and Fixes <a href="#id-191-features-and-fixes" id="id-191-features-and-fixes"></a>

* Extend observability metadata support by @mivds in #399
* Remove deprecated anomaly detection diagnostics by @mivds in #395
* Fix date formatting for years before 1000 by @mivds in #397

***

### \[soda-library] 1.9.0

<sup>21 February 2025</sup>

### 1.9.0 Features and Fixes <a href="#id-190-features-and-fixes" id="id-190-features-and-fixes"></a>

* Trino: Add CI / CD, fix tests by @dakue-soda in #384
* Profiling: Skip profiling if disabled on Cloud by @m1n0 in #389
* Metric Monitoring: Wip MM with backfilling by @m1n0 in #387
* Athena: Add session token parameter by @m1n0 in #391
* Postgres: Handle unsupported options parameter by @m1n0 in #392
* Chore: Remove unused MarkupSafe dependency by @m1n0 in #393
* Chore: Relax opentelemetry version contraint by @m1n0 in #394

***

### \[soda-library] 1.8.19

<sup>14 February 2025</sup>

### 1.8.19 Features and Fixes <a href="#id-1819-features-and-fixes" id="id-1819-features-and-fixes"></a>

* Fix dask COUNT queries on windows by @mivds in #385
* DT-158 - add JWT authentication to Trino data sources by @dakue-soda in #386

***

### \[soda-library] 1.8.18

<sup>04 February 2025</sup>

### 1.8.18 Features and Fixes <a href="#id-1818-features-and-fixes" id="id-1818-features-and-fixes"></a>

* Fix in dask wrong count query when row\_count used with duplicate check on two columns. by @jzalucki in #381
* Custom identity: support in Reference and Group Evolution (#2208) by @m1n0 in #382
* ISO 8601 date: accept 24-hr times (#2133) by @m1n0 in #383

***

### \[soda-library] 1.8.17

<sup>30 January 2025</sup>

### 1.8.17 Features and Fixes <a href="#id-1817-features-and-fixes" id="id-1817-features-and-fixes"></a>

* Replace the conditional logic by proper dependency specification syntax. by @nielsn in #380

***

### \[soda-library] 1.8.16

<sup>29 January 2025</sup>

### 1.8.16 Features and Fixes <a href="#id-1816-features-and-fixes" id="id-1816-features-and-fixes"></a>

* Update soda-dbt to support dbt artifacts from dbt-core >=1.5, <2.0 by @adkinsty in #375
* SAS-5475 - fix CVE on duckdb and python-mysql-connector by @dakue-soda in #377
* Restore support for Python 3.8 by @nielsn in #378
* REALLY fix support for Python 3.8 by @nielsn in #379

***

### \[soda-library] 1.8.14

<sup>28 January 2025</sup>

### 1.8.14 Features and Fixes <a href="#id-1814-features-and-fixes" id="id-1814-features-and-fixes"></a>

* Added fix for bug of NoneType by @teresama in #372
* Run in managed distributed mode when scan type is managedAgentDistributed. by @jzalucki in #371
* Failed rows: fix check value if samples disabled by @m1n0 in #373

***

### \[soda-library] 1.8.13

<sup>09 January 2025</sup>

### 1.8.13 Features and Fixes <a href="#id-1813-features-and-fixes" id="id-1813-features-and-fixes"></a>

* Revert of CLOUD-9009 by @jzalucki in #370

***

### \[soda-library] 1.8.12

<sup>08 January 2025</sup>

### 1.8.12 Features and Fixes <a href="#id-1812-features-and-fixes" id="id-1812-features-and-fixes"></a>

* Observability: Fix quoting in query parts by @m1n0 in #369
* Logs: Add dataset/column info to Logs, support in obs by @m1n0 in #367

***

### \[soda-library] 1.8.10 - 1.8.11

<sup>07 January 2025</sup>

### 1.8.10 - 11 Features and Fixes <a href="#id-1810---11-features-and-fixes" id="id-1810---11-features-and-fixes"></a>

* Add support for numbers in identifier. by @jzalucki in #365
* Move batched scan to scan execute method. by @jzalucki in #364
* Move TIMEUNIT above IDENTIFIER\_UNQUOTED. by @jzalucki in #368

***

### \[soda-library] 1.8.6 - 1.8.9

<sup>06 January 2025</sup>

### 1.8.6 - 9 Features and Fixes <a href="#id-186---9-features-and-fixes" id="id-186---9-features-and-fixes"></a>

* Profiling datetime fix after release by @teresama in #360
* Removed time profiling. Added test for timestamp with timezone by @teresama in #356
* Run partition detection algorithm during observability. by @jzalucki in #357
* Chore: relax jinja autoescape by @m1n0 in #358
* Feature: CLOUD 8690 implementation of date time profiling by @teresama in #336

***

### \[soda-library] 1.8.5

<sup>02 December 2024</sup>

### 1.8.5 Features and Fixes <a href="#id-185-features-and-fixes" id="id-185-features-and-fixes"></a>

* Pydantic: implicit v1 support for programmatic scans by @m1n0 in #352
* Add include null to valid\_count and invalid\_count and percentage version. by @jzalucki in #351
* Yaml: read and parse files thread-safe (#2188) by @m1n0 in #354

***

### \[soda-library] 1.8.4

<sup>27 November 2024</sup>

### 1.8.4 Features and Fixes <a href="#id-184-features-and-fixes" id="id-184-features-and-fixes"></a>

* Fix profiling. by @jzalucki in #350

***

### \[soda-library] 1.8.3

<sup>26 November 2024</sup>

### 1.8.3 Features and Fixes <a href="#id-183-features-and-fixes" id="id-183-features-and-fixes"></a>

BROKEN RELEASE - DO NOT USE

* Run all prerequisite jobs before performance testing. by @jzalucki in #341
* Reference check: support identity by @m1n0 in #345
* Fix doc link for soda-scientific package by @dirkgroenen in #347
* First implementation of batch queue logger. by @jzalucki in #348

***

### \[soda-library] 1.8.2

<sup>14 November 2024</sup>

### 1.8.2 Features and Fixes <a href="#id-182-features-and-fixes" id="id-182-features-and-fixes"></a>

* Send mininum profiling information for observability scan. by @jzalucki in #344
* Chore: Use jinja sandbox for templates by @m1n0 in #343

***

### \[soda-library] 1.8.1

<sup>13 November 2024</sup>

### 1.8.1 Features and Fixes <a href="#id-181-features-and-fixes" id="id-181-features-and-fixes"></a>

* Pydantic: Fix v1 support by @m1n0 in #340
* Foreach: Resolve vars in queries by @m1n0 in #342

***

### \[soda-library] 1.8.0

<sup>29 October 2024</sup>

### 1.8.0 Features and Fixes <a href="#id-180-features-and-fixes" id="id-180-features-and-fixes"></a>

* CLOUD-8739: orchestrate observability by @jzalucki in #339

***

### \[soda-library] 1.7.1

<sup>25 October 2024</sup>

### 1.7.1 Features and Fixes <a href="#id-171-features-and-fixes" id="id-171-features-and-fixes"></a>

* Anomaly Detection check: add alert\_directionality
* Comparison row count check: secondary datasource filter fix (#2165) by @m1n0 in #337
* Reconciliation row: fix multiple checks with filters by @m1n0 in #338

***

### \[soda-library] 1.7.0

<sup>17 October 2024</sup>

### 1.7.0 Features and Fixes <a href="#id-170-features-and-fixes" id="id-170-features-and-fixes"></a>

* Support both pydantic v1 and v2 by @m1n0 in #328

***

### \[soda-library] 1.6.5

<sup>17 October 2024</sup>

### 1.6.5 Features and Fixes <a href="#id-165-features-and-fixes" id="id-165-features-and-fixes"></a>

* Feature: changed `auto_exclude_anomaly` under TrainingDatasetParameters by @teresama in #333
* Chore: performance testing CI pipeline

***

### \[soda-library] 1.6.4

<sup>08 October 2024</sup>

### 1.6.4 Features and Fixes <a href="#id-164-features-and-fixes" id="id-164-features-and-fixes"></a>

* Chore: Changed pandas version to be compatible with python 3.8 by @teresama in #323
* Add tracing to bunch of classes + allow 1.6.4.dev0 by @jzalucki in #325
* Update obs extreme values test after pandas2 by @m1n0 in #329
* Run perf nightly, add more dd tags, fix none hostname. by @jzalucki in #330
* Feature: offer user control to automatically exclude classified anomalies from training auto\_exclude\_anomalies in anomaly checks by @teresama in #327
* Fix obs test for py38 by @m1n0 in #331
* \[CLOUD-8480] Revert “Put back global 10k query limit temporarily (#324)” by @dirkgroenen in #332

***

### \[soda-library] 1.6.3

<sup>26 September 2024</sup>

### 1.6.3 Features and Fixes <a href="#id-163-features-and-fixes" id="id-163-features-and-fixes"></a>

* Put back global 10k query limit temporarily by @m1n0 in #324

***

### \[soda-library] 1.6.2

<sup>24 September 2024</sup>

### 1.6.2 Features and Fixes <a href="#id-162-features-and-fixes" id="id-162-features-and-fixes"></a>

* Remove global hard limit on queries by @m1n0 in #321
* Fix: exclude NaNs (as NULLS) from aggregate queries in databricks by @bastienboutonnet in #322

***

### \[soda-library] 1.6.1

<sup>17 September 2024</sup>

### 1.6.1 Features and Fixes <a href="#id-161-features-and-fixes" id="id-161-features-and-fixes"></a>

* Dataset level configuration for attributes and samples columns. by @jzalucki in #313
* Do not collect samples if collecting of default samples were disabled in the cloud. by @jzalucki in #314
* Use default cloud samples columns. by @jzalucki in #315
* Fix: Handle cases where database returns NaN instead of NULL in aggs and frequent values queries by @bastienboutonnet in #316
* Add support for collect failed rows table and checks level. by @jzalucki in #317
* CLOUD-8251 - Fix Oracle in CI by @dakue-soda in #302
* Add custom message to DefaultSampler depending on samples disabled reason. by @jzalucki in #319
* Send soda library version during file upload, if fileId not present mark sample as not persisted with a message. by @jzalucki in #318

***

### \[soda-library] 1.6.0

<sup>04 September 2024</sup>

### 1.6.0 Features and Fixes <a href="#id-160-features-and-fixes" id="id-160-features-and-fixes"></a>

* Comparison check: Fix “other” table filter by @jzalucki in #304
* Oracle: Bug fixes by @m1n0 in #260
* Failed rows: Always expose failing sql for failed rows and user defined metric if failing query is available. by @jzalucki in #305
* Failed rows: Add column property to failed rows and user defined metric checks. by @jzalucki in #307
* Failed rows: Templatize rerouted sample message. by @jzalucki in #310
* Observability: Catch issues when orchestrating profiling by @m1n0 in #311
* Observability: Fall back to 1M if partition fails by @m1n0 in #312
* Observability: Set duplicate percentage to None when zero rows in partition by @jzalucki in #301
* Observability: Warn user when 24h partition is empty. by @jzalucki in #306

***

### \[soda-library] 1.5.25

<sup>14 August 2024</sup>

### 1.5.25 Fixes <a href="#id-1525-fixes" id="id-1525-fixes"></a>

* Spark: Replicate implicit ‘include all’ in profiling by @m1n0 in #300 and #303
* Freshness: Support variables in thresholds by @m1n0

***

### \[soda-library] 1.5.24

<sup>13 August 2024</sup>

### 1.5.24 Fixes <a href="#id-1524-fixes" id="id-1524-fixes"></a>

* Adapt anomaly detector outcome messages for observability by @bastienboutonnet in #296
* Always clean DB even on GH. by @jzalucki in #295
* Group evolution: fix group changes not being detected by @m1n0 in #297
* Feature: smaller min confidence interval ratio by @bastienboutonnet in #298
* Execute observability checks outside of regular flow. by @jzalucki in #299

***

### \[soda-library] 1.5.23

<sup>02 August 2024</sup>

### 1.5.23 Fixes <a href="#id-1523-fixes" id="id-1523-fixes"></a>

* Attempt to always show freshness even if last 24 hours partition does not return data. by @jzalucki in #291
* Observability: Always add partition column to profiling result by @m1n0 in #293

***

### \[soda-library] 1.5.22

<sup>01 August 2024</sup>

### 1.5.22 Fixes <a href="#id-1522-fixes" id="id-1522-fixes"></a>

* Observability: minimize metadata retrieval, do not push data into dis… by @m1n0 in #282
* Handle SQL exception nicely for failed rows and user-defined check. by @jzalucki in #286
* Spark: send discovery data despite errors. by @jzalucki in #290
* Quote column names during observability partition detection. by @jzalucki in #288
* Spark: failed rows should not be limited to max 100 total results. by @jzalucki in #292

***

### \[soda-library] 1.5.21

<sup>31 July 2024</sup>

### 1.5.21 Fixes <a href="#id-1521-fixes" id="id-1521-fixes"></a>

* Add nchar, nvarchar and binary to text types for profiling. by @jzalucki in #281
* CLOUD 8061: alias table names in sql queries by @jzalucki in #280
* Oracle data source properties prefix should be None instead of “None” when no service name is provided. by @jzalucki in #283
* Sqlserver: use appropriate aggregate methods to build queries by @jzalucki in #284
* Cross row count check should support custom identity. by @jzalucki in #285
* Copyedit on frequency detection error message by @janet-can in #287
* Chore: update auto-assignments by @milanaleksic in #289

***

### \[soda-library] 1.5.20

<sup>24 July 2024</sup>

### 1.5.20 Fixes <a href="#id-1520-fixes" id="id-1520-fixes"></a>

* Fix: make sure labelling incorrect anomalies always returns something by @bastienboutonnet in #265

***

### \[soda-library] 1.5.19

<sup>23 July 2024</sup>

### 1.5.19 Fixes <a href="#id-1519-fixes" id="id-1519-fixes"></a>

* Always reset logger when new Scan instance is created. by @jzalucki in #277
* Use SHOW TABLES and SHOW VIEWS instead of spark session catalog API. by @jzalucki in #278
* Fix: apply cast to numerical for ms sqlserver by @bastienboutonnet in #279

***

### \[soda-library] 1.5.18

<sup>22 July 2024</sup>

### 1.5.18 Fixes <a href="#id-1518-fixes" id="id-1518-fixes"></a>

* Use spark session catalog to get all table names including temporary views. by @jzalucki in #276

***

### \[soda-library] 1.5.17

<sup>17 July 2024</sup>

### 1.5.17 Fixes <a href="#id-1517-fixes" id="id-1517-fixes"></a>

* Reconciliation: support custom source/target query with deepdiff strategy by @jzalucki in #269
* Observability: apply 1M rows limit with time partition. by @jzalucki in #270
* Snowflake: support custom hostname and port (#2109) by @m1n0 in #271
* Add sslmode support to postgres and denodo (#2066) by @m1n0 in #273
* Add Scan Context to read/write data from/to a scan (#2134) by @m1n0 in #272
* Better user provided queries sanitize. (#2131) by @jzalucki in #275

***

### \[soda-library] 1.5.16

<sup>16 July 2024</sup>

### 1.5.16 Fixes <a href="#id-1516-fixes" id="id-1516-fixes"></a>

* Observability: get all metric history by @m1n0 in #268

***

### \[soda-library] 1.5.15

<sup>15 July 2024</sup>

### 1.5.15 Fixes <a href="#id-1515-fixes" id="id-1515-fixes"></a>

* Fix: cast SUM query to NUMERIC in BQ by @bastienboutonnet in #266
* Fix: output outlier holidays even when no country holiday by @bastienboutonnet in #267

***

### \[soda-library] 1.5.14

<sup>02 July 2024</sup>

### 1.5.14 Fixes <a href="#id-1514-fixes" id="id-1514-fixes"></a>

* Http Sampler: Do not invoke when no failed rows by @m1n0 in #264
* Missing Count: Fix sample query by @m1n0 in #264
* Between threshold: Fix error when using variables by @m1n0 in #264
* Profiling: Fix discovery metadata bug by @m1n0 in #263

***

### \[soda-library] 1.5.13

<sup>28 June 2024</sup>

### 1.5.13 Fixes <a href="#id-1513-fixes" id="id-1513-fixes"></a>

* Databricks: run tests in CI by @m1n0 in #239
* Fix CI by @m1n0 in #261
* Set minimum version of the freshness detector to 0.0.7 by @bastienboutonnet in #262

***

### \[soda-library] 1.5.12

<sup>27 June 2024</sup>

### 1.5.12 Fixes <a href="#id-1512-fixes" id="id-1512-fixes"></a>

* SAS-3334 For duckdb do not use database as filter at all. by @jzalucki in #259
* Fix: explictly construct country holiday df and concat with outliers by @bastienboutonnet in #256

***

### \[soda-library] 1.5.11

<sup>24 June 2024</sup>

### 1.5.11 Fixes and features <a href="#id-1511-fixes-and-features" id="id-1511-fixes-and-features"></a>

* Fix: leave warning bounds and only make level be pass when warn by @bastienboutonnet in #257
* Fix: handle overflowing timestamps for nanosecond precision overflow issues by @bastienboutonnet in #258

***

### \[soda-library] 1.5.10

<sup>21 June 2024</sup>

### 1.5.10 Fixes and features <a href="#id-1510-fixes-and-features" id="id-1510-fixes-and-features"></a>

* CLOUD-7426 Add scan\_time to http payload. by @jzalucki in #255
* Feature: exclude outliers from training via holiday interface by @bastienboutonnet in #254

***

### \[soda-library] 1.5.9

<sup>20 June 2024</sup>

### 1.5.9 Fixes and features <a href="#id-159-fixes-and-features" id="id-159-fixes-and-features"></a>

* Oracle: fix profiling/discovery queries by @m1n0 in #253

***

### \[soda-library] 1.5.7 & 1.5.8

<sup>18 June 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Observability: Fix Anomaly Detection check history retrieval by @m1n0 in #246
* Spark: profiling support more text types (#2099) by @m1n0 in #250
* Feature: use fail\_only flag instead of warning 0 by @bastienboutonnet in #249
* Oracle: fix queries, profiling and other by @m1n0 in #251
* Duplicate check: support sample exclude columns fully by @m1n0 in #241
* Spark: profiling support more numeric types by @m1n0 in #242
* Fix: make gap removal wait for at least 5 days and implement simpler thresholds by @bastienboutonnet in #243
* Profiling: support casting numericals to large data type by @m1n0 in #244
* Cloud: better error handling and logging by @m1n0 in #245

***

### \[soda-library] 1.5.6

<sup>10 June 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Freshness in obs: add log msg when no data by @m1n0 in #238
* Obs: get all metadata only when enabled, make tests more robust by @m1n0 in #240

***

### \[soda-library] 1.5.5

<sup>05 June 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* SAS-3519 CLOUD-7769: Correctly map statuses from remote scans by @dirkgroenen in #232
* Bump requests and tox/docker by @m1n0 in #236
* Feature: make all non critical error messages be warnings in profiling by @bastienboutonnet in #235
* Feature: observability anomalies are considered correctly classified unless negative feedback given by @bastienboutonnet in #234
* Duplicate check: fail gracefully in case of error in query by @m1n0 in #237

***

### \[soda-library] 1.5.4

<sup>29 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* CLOUD-7751 - fix nightly CI pipeline, use Snowflake CI account config… by @dakue-soda in #229
* Feature: use partition row count (via aggregates) and use in duplicate percent by @bastienboutonnet in #230

***

### \[soda-library] 1.5.3

<sup>28 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* CLOUD-7400: Improve memory usage for Queries by @dirkgroenen in #227
* CLOUD-7702: Add Snowflake CI account to pipeline for soda-library by @dakue-soda in #223
* CLOUD-7725: use newer thrift 0.20.0 by @milanaleksic in #228

***

### \[soda-library] 1.5.2

<sup>24 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Observability: handle one row scenario by @m1n0 in #224
* User defined metric check: support failed rows query by @m1n0 in #226

***

### \[soda-library] 1.5.1

<sup>22 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Fix float comparisons in tests by @m1n0 in #222
* Observability: hash metric identities by @m1n0 in #225

***

### \[soda-library] 1.5.0

<sup>20 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Observability beta (behind feature flag) @m1n0 in #198

***

### \[soda-library] 1.4.10

<sup>17 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Failed rows: fix warn/fail thresholds for fail condition (#2084) by @m1n0 in #221
* upgrade sqlparse version inside soda base package by @Antoninj in #220

***

### \[soda-library] 1.4.9

<sup>14 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* CLOUD-7400 Stream query data through memory, reducing memory footprint by @dirkgroenen in #210

***

### \[soda-library] 1.4.8

<sup>07 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* CLOUD-7362: add base exception to error log messages cloud payload by @Antoninj in #212
* Fix automated monitoring, prevent duplicate queries by @m1n0 in #90
* Denodo: fix connection timeout attribute (#2065) by @m1n0 in #215
* DB2: Update db2\_data\_source.py (#2063) by @m1n0 in #216
* Update autoflake precommit by @m1n0 in #214
* SAS-3361: upgrade to latest version of ibm-db python client by @Antoninj in #213
* Hive: support scheme by @m1n0 in #217
* Bump dev requirements by @m1n0 in #218

***

### \[soda-library] 1.4.7

<sup>10 April 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Rename argument in set\_scan\_results\_file method (#2047)
* Dremio: support disableCertificateVerification option (#2049)

***

### \[soda-library] 1.4.5 & 1.4.6

<sup>04 April 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* SAS-3165 Only reset sampler when originally SodaCloudSampler by @dirkgroenen in #207
* Feature: enable new anomaly detection algo in group by checks by @bastienboutonnet in #208

***

### \[soda-library] 1.4.4

<sup>23 March 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Failed rows: fix warn/fail thresholds by @m1n0 in #204
* Bump opentelemetry to 1.22 by @m1n0 in #205

***

### \[soda-library] 1.4.3

<sup>20 March 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Add missing import for type annotations backwards compatibility by @Antoninj in #196
* Refactor: Parse access\_url from dbt config for new multicell org by @bastienboutonnet in #194
* Timestamp conversion fixes by @Antoninj in #200
* SAS-2966 Remove scan reference exception throw in local mode by @dirkgroenen in #199
* Add test for checks level attributes by @m1n0 in #201
* Fix: Attribute handler timezone test by @m1n0 in #202
* Feature: Better legend wording and nicer tooltip formatting by @bastienboutonnet in #203

***

### \[soda-library] 1.4.2

<sup>05 March 2024</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Dremio: fix token support (#2028) by @m1n0 in #195

***

### \[soda-library] 1.4.1

<sup>01 March 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* IA-533: Implement daily and monthly seasonality to external regressor by @baturayo in #189
* Support GMT (Zulu) and microseconds time format by @m1n0 in #193

***

### \[soda-library] 1.4.0

<sup>28 February 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Cloud 6550: remote scans by @m1n0 in #192

***

### \[soda-library] 1.3.4

<sup>28 February 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Fix: timezone mismatch between the recent and historical ad results by @baturayo in #188
* Feature: in anomaly detection simulator use soda core historic check results endpoint instead of test results by @baturayo in #190
* Update dask-sql by @m1n0 in #191

***

### \[soda-library] 1.3.3

<sup>13 February 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Fix: include simulator assets folder into the setup.py by @baturayo in #186

***

### \[soda-library] 1.3.2

<sup>13 February 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Fix: simulator import and streamlit path by @m1n0 in #182
* Oracle: create dsn if not provided (#2012) by @m1n0 in #183
* Oracle: cast config to str/int to prevent oracledb errors (#2018) by @m1n0 in #184
* Oracle: fix Cloud integration by @m1n0 in #185

***

### \[soda-library] 1.3.1

<sup>09 February 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: correctly identified anomalies are excluded from training data by @baturayo in #178
* Fix: show more clearly the detected frequency using warning message first by @baturayo in #180
* Pin segment analytics and typing-extensions by @m1n0 in #181

***

### \[soda-library] 1.3.0

<sup>08 February 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: anomaly detection simulator by @baturayo in #163
* Feature: added dremio token support (#2009) by @m1n0 in #179
* Temporarily affix Segment Analytics version by @dirkgroenen in #177
* Cloud 6693 improve group by by @m1n0 in #176

***

### \[soda-library] 1.2.4

<sup>31 January 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: implement severity level paramaters by @baturayo in #169
* Fix for min\_confidence\_interval\_ratio parameter by @baturayo in #170
* Always use datasource specifis COUNT expression (#2003) by @m1n0 in #172
* Send result to Cloud if data source connection issue by @m1n0 in #171
* CLOUD-6805: avoid sending empty error location when logging configuration file parsing errors by @Antoninj in #173
* CLOUD-6817: Catch Cloud exceptions (failed insertions) properly by @dirkgroenen in #174

***

### \[soda-library] 1.2.2 & 1.2.3

<sup>26 January 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Hive data source improvements by @robertomorandeira in sodadata/soda-core#1982
* Feature: Implement migrate from anomaly score check config by @baturayo in sodadata/soda-core#1998
* Bump Prophet by @m1n0 in sodadata/soda-core#2000
* Tests: Use approx comparison for floats by @m1n0 in sodadata/soda-core#1999

\\

* Support token auth by @m1n0 in #159
* Schema check: Support custom identity (#1988) by @m1n0 in #161
* CLI: Omit exception if no cli args by @m1n0 in #162
* Add semver release for major, minor and latest by @dirkgroenen in #164
* Bug: Handle null values for continuous dist by @baturayo in #165
* IA-486: implement new anomaly detection logic and syntax by @baturayo in #153
* Fix Python3.8 type issues for new AD syntax by @baturayo in #166
* Feature: Support built in prophet public holidays by @baturayo in #167

***

### \[soda-library] 1.2.0

<sup>16 January 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* cbt: improve parsing logs by @m1n0 in #157
* Sampler: fix link href by @m1n0 in #158
* BREAKING: Row Reconciliation, new simple strategy for batch processing by @m1n0 in #155

***

### \[soda-library] 1.2.1

<sup>14 January 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Recon row fixes by @m1n0 in #160

***

### \[soda-library] 1.1.29

<sup>03 January 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: implement warn\_only for anomaly score by @baturayo in #156

***

### \[soda-library] 1.1.28

<sup>15 December 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Fix frequency aggregation bug for anomaly detection by @baturayo in #152
* Bump pydantic from v1 to v2 by @baturayo in #151
* Adding support for authentication via a chained list of delegate accounts by @m1n0 in #154

***

### \[soda-library] 1.1.27

<sup>15 December 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Group by: support anomaly/cot, better names by @m1n0 in #147

***

### \[soda-library] 1.1.26

<sup>04 December 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Freshness: support in-check filters (#1970) by @m1n0 in #150. Documentation to follow shortly.

***

### \[soda-library] 1.1.24 & 1.1.25

<sup>24 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Reconciliation row: expose deepdiff config, lower sensitivity by @m1n0 in #149
* Make custom identity fixed as v4 by @m1n0 in #143
* Reconciliation row: fix key cols mapping, bugfixes by @m1n0 in #148

***

### \[soda-library] 1.1.23

<sup>19 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Align usage of database/catalog and implement fallback by @dirkgroenen in #142
* Remove segment logs by @m1n0 in #145
* Align usage of exit codes and add exit\_code(4) by @dirkgroenen in #146

***

### \[soda-library] 1.1.22

<sup>14 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Cloud: Add ScanId by @dirkgroenen in #137
* Athena: Set default catalog name by @dirkgroenen in #139
* Sqlserver: remove % from pattern (#1956) by @m1n0 in #140
* Sqlserver: support quoting tables with brackets, “quote\_tables” mode by @m1n0 in #141

***

### \[soda-library] 1.1.20 & 1.1.21

<sup>02 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Freshness: support mixed thresholds by @m1n0 in #134
* Duckdb: Rename path to database by @dirkgroenen in #135
* Failed rows: new ‘empty’ type, handle no rows scenario better by @m1n0 in #132
* Extend Data Source identity migration to spark\_df by @dirkgroenen in #133

***

### \[soda-library] 1.1.19

<sup>23 October 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Fix: compute value counts in DB rather than in python for categoric distribution checks by @baturayo in #116
* Run scientific unit tests in CI by @baturayo in #121
* Raise a warning instead of exception when dataset name is incorrect in suggestions by @baturayo in #126
* Add support for custom dask data source name by @dirkgroenen in #120

***

### \[soda-library] 1.1.17 & 1.1.18

<sup>12 October 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Remove quotes from dataset name in check payload by @m1n0 in #124
* Fix package specific tests by @m1n0 in #123
* Cloud 4311 nightly dev builds by @vijaykiran in #125
* Add threshold support to failed row query/condition checks by @vijaykiran in #127

***

### \[soda-library] 1.1.15 & 1.1.16

<sup>11 October 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Change dbt version marker in extras\_reqiure. To install soda-dbt, use either `pip install -i https://pypi.cloud.soda.io "soda-dbt[ver16]"` or `pip install -i https://pypi.cloud.soda.io "soda-dbt[ver15]"`.
* Fix error on invalid check attributes by @vijaykiran in #117
* CLOUD-5705 Fix schema attributes validation by @vijaykiran in #118
* Add attributes to checks level by @vijaykiran in #119
* Add tests for reconciliation checks, minor bugfixes by @m1n0 in #122

***

### \[soda-library] 1.1.14

<sup>05 October 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Chore: rename Soda Library docker image build step by @Antoninj in #109
* Fix threshold cloud payload for freshness checks by @vijaykiran in #112
* Fix schema reconciliation config parsing by @m1n0 in #113
* Allow to specify virtual file name for add sodacl string by @m1n0 in #115
* Check type segment tracking by @m1n0 in #114

***

### \[soda-library] 1.1.13

<sup>27 September 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Reconciliation schema: support type mapping by @m1n0 in #110
* Fix databricks numeric types profiling by @m1n0 in #111

***

### \[soda-library] 1.1.12

<sup>21 September 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Add PR auto assign reviewer GH workflow by @Antoninj in #103
* Fix: nofile payload when http sampler is used by @m1n0 in #104
* Trino: fix dataset prefix by @m1n0 in #105
* Row reconciliation improve sample by @m1n0 in #106
* Schema reconciliation improve diagnostics by @m1n0 in #107
* Add thresholds and diagnostics to scan result by @m1n0 in #108

***

### \[soda-library] 1.1.11

<sup>19 September 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: Support dbt 1.5 and 1.6 by @vijaykiran in #99
* Feature: Reference check: support must NOT exist by @m1n0 in #100
* Fix: Reconciliation variables support by @m1n0 in #93
* Fix: Catch exceptions while building results file by @dirkgroenen in #63
* Fix: Row diff: fix python 3.8 compatibility by @vijaykiran in #101
* Improvement: Reconciliation row diff better config logging by @m1n0 in #102

***

### \[soda-library] 1.1.10

<sup>13 September 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Reconciliation row diff handle incompatible schema by @m1n0 in #97
* Fix: api\_key\_id tracking in check suggestions by @baturayo in #98

***

### \[soda-library] 1.1.9

<sup>12 September 2023</sup>

### Fix <a href="#fix" id="fix"></a>

Soda Library 1.1.9 includes a fix for reconciliation check results that have been overwriting historical results data in Soda Cloud.

Upon upgrading, Soda Cloud will archive any existing check history for reconciliation checks, only. With 1.1.9, reconciliation check results start collecting a fresh history of results with an improved check identify algorithm that properly retains check history.

#### Action <a href="#action" id="action"></a>

1. Upgrade to Soda Library 1.1.9 to leverage the fix.
2. Initiate a new scan that involves your reconciliation checks.
3. Review the refreshed check results in Soda Cloud, the start of new, properly-retained historical results.

***

### \[soda-library] 1.1.6 - 1.1.8

<sup>11 September 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Discussion scan type by @m1n0 in #91
* Reconciliation schema remove warn, adjust pass graph numbers by @m1n0 in #92
* Apply filter in row reconciliation by @m1n0 in #94
* Reconciliation schema check by @m1n0 in #89
* Reconciliation freshness check fix cloud ingest by @m1n0 in #87

***

### \[soda-library] 1.1.0 - 1.1.5

<sup>31 August 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Remove label from recon checks by @m1n0 in #82
* Recon row sample more intuitive header by @m1n0 in #83
* Handle recon metric division by zero by @m1n0 in #84
* WIP row recon column mapping by @m1n0 in #85
* Add Presto support by @vijaykiran in #86
* Push recon metric diagnostics to Soda Cloud by @m1n0 in #77
* Fix key columns related issue by @vijaykiran in #78
* CLOUD-4549 change source/target column to source/target columns by @vijaykiran in #79
* Fix recon row column handling by @m1n0 in #80
* Fix divide by zero when the metric value is 0 by @vijaykiran in #81
* Fix recon group type by @m1n0 in #72
* Update recon label behaviour by @m1n0 in #73
* Row reconciliation samples by @m1n0 in #70
* Support custom identity for failed rows check type by @m1n0 in #65
* Row recon metric send count only by @m1n0 in #66
* Source and target key columns support by @m1n0 in #67
* Ingest recon checks as groups, add summary and diagnostics by @m1n0 in #68
* Row reconciliation samples by @m1n0 in #69

***

### \[soda-library] 1.0.6 - 1.0.8

<sup>11 August 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Metrics-based recon checks WIP by @m1n0 in #52
* Fix typo in recon check name construction by @m1n0 in #57
* CLOUD-4314: Make abs default for reconciliation checks by @vijaykiran in #58
* CLOUD-4320: Fix between thresholds for reconciliation by @vijaykiran in #59
* Build cleanup by @vijaykiran in #60
* CLOUD-4319: Add support for metric expressions by @vijaykiran in #61
* CLOUD-3993: Apply the CI/CD fix from soda-core to CI/CD by @milanaleksic in #62
* Reconciliation row diff checks WIP by @vijaykiran in #64
* Recon row diff: fix threshold-based outcome WIP

***

### \[soda-library] 1.0.5

<sup>26 July 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Trino connector has new options: source, client\_tags
* Fix for optional schema\_name property added to schema checks (743811c)

***

### \[soda-library] 1.0.3 & 1.0.4

<sup>21 July 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* CLOUD-4112 pass scan reference by @gregkaczan in #37
* Source owner property in scan insert payload by @m1n0 in #39
* Remove code that was originaly copied over from core by @m1n0 in #41
* CLOUD-4144 add attributes to cross-checks by @vijaykiran in #42
* Evaluate group evolution conditions if no historical data is present by @m1n0 in #40
* Add dict as an overridable field by @vijaykiran in #43
* Samples columns support by @m1n0 in #38
* Fix filter in failed rows samples with parenthesis by @m1n0 in #44
* Add app identifier to datasources by @vijaykiran in #45
* Bug: skipping partition suggestion were causing the app to fail by @baturayo in #46
* CLOUD-4170 expose cloud url by @gregkaczan in #49
* \[sqlserver] fix port configuration by @vijaykiran in #50
* Set metric for failed rows check by @m1n0 in #48
* Block soda suggest if cloud config is missing by @m1n0 in #51
* Fix templates for failed rows by @vijaykiran in #53
* Introduce schema\_name property for schema checks by @vijaykiran in #54
* Bump requirements by @vijaykiran in #55
* Bug: fix keyboard interrupt tracking in check suggestions by @baturayo in #21
* CLOUD-3967 merge soda scientific into main package by @vijaykiran in #20
* Include template definition in check definition by @m1n0 in #23
* DB prefix set to None if no info available by @m1n0 in #27
* Improve templates not found/provided msgs by @m1n0 in #26
* Update check suggestion links by @janet-can in #25
* Fix boolean attributes+add tests by @m1n0 in #28
* Update PR Workflow for merge queue support by @vijaykiran in #29
* Templates support for failed rows check by @m1n0 in #30
* Feature: track supported and unsupported data sources by @baturayo in #32
* CLOUD-3862 push ci info file contents to cloud scan results by @gregkaczan in #31
* Fix link to attributes by @vijaykiran in #33
* TRINO: add http\_headers option by @vijaykiran in #35
* HIVE: add configuration parameters by @vijaykiran in #36
* CLOUD-3861 pass scanType with cicd option by @gregkaczan in #34

***

### \[soda-library] 1.0.1 & 1.0.2

<sup>23 June 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Add dispatch pipeline for pushing to Dockerhub by @dakue-soda in #10
* Fix container build, the reference to our own pypi was m… by @dakue-soda in #11
* Allow newer version of pyyaml by @m1n0 in #13
* Handle scenario where schema cannot be obtained by @m1n0 in #14
* Set default for group by name by @vijaykiran in #16
* Include checks metadata in scan result by @m1n0 in #17
* Upgrade BigQuery client to 3.x by @m1n0 in #19
* Include basic data source info in scan payload by @m1n0 in #15

***

### \[soda-library] 1.0.0

<sup>15 June 2023</sup>

### General availability release <a href="#general-availability-release" id="general-availability-release"></a>

Introducing the launch of Soda Library, a Python library and CLI tool for testing data quality.

Built on top of Soda Core, Soda Library leverages all the features and functionality of the open-source tool, with newly added features. [Install Soda Library](https://docs.soda.io/soda-library/install.html) from the command line, then configure it to connect to Soda Cloud using API keys that are valid for a free, 45-day trial.

```
pip install -i https://pypi.cloud.soda.io soda-postgres
```

If you already use Soda Core, you can seamlessly upgrade to Soda Library without changing any configurations, checks, or integrations. See [Migrate from Soda Core](https://docs.soda.io/soda-library/install.html#migrate-from-soda-core) for details.

### Features <a href="#features" id="features"></a>

* Soda Library supports SodaCL’s newest checks: [Group By](https://docs.soda.io/soda-cl/group-by.html) and [Group Evolution](https://docs.soda.io/soda-cl/group-evolution.html).
  * For an individual dataset, add a **Group By** configuration to specify the categories into which Soda must group the check results. When you run a scan, Soda groups the results according to the unique values in the column you identified.
  * Use a **Group Evolution** check to validate the presence or absence of a group in a dataset, or to check for changes to groups in a dataset relative to their previous state.
* Soda Library supports [**Check Suggestions**](https://docs.soda.io/soda-library/check-suggestions.html), a helpful CLI tool that assists you in generating basic data quality checks. Instead of writing your own data quality checks from scratch, the check suggestions assisstant profiles your dataset, then prompts you through a series of questions so that it can leverage the built-in Soda metrics and auto-generate quality checks tailored to your data.
* Soda Library supports [**Check template**](https://docs.soda.io/soda-cl/check-template.html) configurations that enable you to prepare a user-defined metric that you can reuse in checks in multiple checks YAML files.
