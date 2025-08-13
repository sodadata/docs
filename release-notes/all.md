---
description: Review release notes for all Soda data observability products.
---

# Release notes for Soda products

Join to the [#release-alerts](https://soda-community.slack.com/archives/C078NT3730W) channel in Slack to get notifications of Soda product releases.\[soda-library] 1.11.2

<sup>07 April 2025</sup>

### 1.11.2 Features and Fixes <a href="#id-1112-features-and-fixes" id="id-1112-features-and-fixes"></a>

* Trino: fix query pagination by @m1n0 in #490

***

### \[soda-agent] 1.1.46

<sup>07 April 2025</sup>

### 1.1.46 <a href="#id-1146" id="id-1146"></a>

* Bump library to 1.11.2 by @m1n0 in #120

***

### \[soda-library] 1.11.1

<sup>04 April 2025</sup>

### 1.11.1 Features and Fixes <a href="#id-1111-features-and-fixes" id="id-1111-features-and-fixes"></a>

* New: Reconciliation Reference check by @m1n0 in #488

***

### \[soda-agent] 1.1.45

<sup>04 April 2025</sup>

### 1.1.45 <a href="#id-1145" id="id-1145"></a>

* Bump library to 1.11.1 by @m1n0 in #119

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

### \[soda-agent] 1.1.44

<sup>03 April 2025</sup>

### 1.1.44 <a href="#id-1144" id="id-1144"></a>

* Bump soda-library to v1.10.3 by @mivds in #118

***

### \[soda-library] 1.10.2

<sup>01 April 2025</sup>

### 1.10.2 Features and Fixes <a href="#id-1102-features-and-fixes" id="id-1102-features-and-fixes"></a>

* dbt: support ingestion of dbt test results from all versions of dbt by @adkinsty in #474

***

### \[soda-agent] 1.1.43

<sup>01 April 2025</sup>

### 1.1.43 <a href="#id-1143" id="id-1143"></a>

* Bump library to 1.10.2 by @m1n0 in #117

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

### \[soda-agent] 1.1.42

<sup>25 March 2025</sup>

### 1.1.42 <a href="#id-1142" id="id-1142"></a>

* Bump soda-library and soda-scan-launcher versions by @mivds in #116

***

### \[soda-agent] 1.1.41

<sup>25 March 2025</sup>

### 1.1.41 <a href="#id-1141" id="id-1141"></a>

* Bump soda-library and soda-scan-launcher versions by @mivds in #116

***

### \[soda-library] 1.9.3

<sup>14 March 2025</sup>

### 1.9.3 Features and Fixes <a href="#id-193-features-and-fixes" id="id-193-features-and-fixes"></a>

* Fix scan time reporting by @mivds in #428
* Validity check: fix complex mixed rules query (#2219) by @m1n0 in #440
* fix(trino): handle period character in schema name by @adkinsty in #444

***

### \[soda-agent] 1.1.40

<sup>05 March 2025</sup>

### 1.1.40 <a href="#id-1140" id="id-1140"></a>

* Bump soda-scan-launcher & orchestrator versions by @Antoninj in #115

***

### \[soda-agent] 1.1.39

<sup>27 February 2025</sup>

### 1.1.39 <a href="#id-1139" id="id-1139"></a>

Releases Soda Library 1.8.19.\


* Improve the documentation a bit by @milanaleksic in #111
* Add support for soda-contract-launcher (a.k.a. v4) by @nielsn in #112
* Bump soda-library and soda-scan-launcher versions by @mivds in #114

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

### \[soda-core] 3.5.0

<sup>20 February 2025</sup>

### 3.5.0 Features and fixes <a href="#id-350-features-and-fixes" id="id-350-features-and-fixes"></a>

* Custom identity: Support in Reference and Group Evolution by @m1n0 in #2208
* Validity: Accept 24-hr times in ISO 8601 dates by @pholser in #2133
* Dask: Fix wrong count query when row\_count used with duplicate check on two columns. by @jzalucki in #2209
* Dask: Fix COUNT queries on windows by @mivds in #2210
* Impala: Add support for Apache Impala by @marcocharlie in #2191
* Athena: Add session token parameter by @ruixuantan in #2095
* Postgres: Handle unsupported options parameter by @RekunDzmitry in #2176
* Duckdb: Relax duckdb dependency to < 1.1.0 by @tombaeyens in #2162
* Docs: Fix typo by @crazyshrut in #2151
* Docs: Fix workflow path for CI by @syou6162 in #2206
* Chore: Remove unused MarkupSafe dependency (#2103) by @ghjklw in #2200
* Chore: Relax opentelemetry version contraint (#2192) by @ghjklw in #2199

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-agent] 1.1.38

<sup>04 February 2025</sup>

### 1.1.38 <a href="#id-1138" id="id-1138"></a>

Releases Soda Library 1.8.18.\


Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-core] 3.4.4

<sup>07 January 2025</sup>

### 3.4.4 Features and fixes <a href="#id-344-features-and-fixes" id="id-344-features-and-fixes"></a>

* Remove autoescape from jinja - allow use of special chars in variables. by @jzalucki in #2193
* Add support for numbers in identifier. by @jzalucki in #2197

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-agent] 1.1.37

<sup>12 December 2024</sup>

### 1.1.37 <a href="#id-1137" id="id-1137"></a>

Removes reported CVEs from the internally used `dtzar/helm-kubectl` image by replacing it for `sodadata/soda-agent-utils`.\


Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 1.1.36

<sup>10 December 2024</sup>

### 1.1.36 <a href="#id-1136" id="id-1136"></a>

Fixes a bug introduced in 1.1.35.\


Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 1.1.35

<sup>10 December 2024</sup>

### 1.1.35 <a href="#id-1135" id="id-1135"></a>

Releases Soda Library 1.8.9.\


Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.8.5

<sup>02 December 2024</sup>

### 1.8.5 Features and Fixes <a href="#id-185-features-and-fixes" id="id-185-features-and-fixes"></a>

* Pydantic: implicit v1 support for programmatic scans by @m1n0 in #352
* Add include null to valid\_count and invalid\_count and percentage version. by @jzalucki in #351
* Yaml: read and parse files thread-safe (#2188) by @m1n0 in #354

***

### \[soda-core] 3.4.3

<sup>02 December 2024</sup>

### 3.4.3 Features and fixes <a href="#id-343-features-and-fixes" id="id-343-features-and-fixes"></a>

* Add include null to valid\_count and invalid\_count and percentage version. by @jzalucki in #2186
* Yaml: read and parse files thread-safe by @m1n0 in #2188

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.4.2

<sup>28 November 2024</sup>

### 3.4.2 Features and fixes <a href="#id-342-features-and-fixes" id="id-342-features-and-fixes"></a>

* Foreach: Resolve vars in queries by @m1n0 in #2183
* Chore: Use jinja sandbox for templates by @m1n0 in #2185

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-agent] 1.1.34

<sup>19 November 2024</sup>

### 1.1.34 <a href="#id-1134" id="id-1134"></a>

This release maps to [Soda Library 1.8.2](https://docs.soda.io/release-notes/soda-library.html).\


Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 1.1.33

<sup>15 November 2024</sup>

### 1.1.33 <a href="#id-1133" id="id-1133"></a>

This release maps to [Soda Library 1.8.2](https://docs.soda.io/release-notes/soda-library.html).\


Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-agent] 1.1.32

<sup>29 October 2024</sup>

### 1.1.32 <a href="#id-1132" id="id-1132"></a>

This release maps to [Soda Library 1.6.4](https://docs.soda.io/release-notes/soda-library.html).\


* CLOUD-8265: Add ability to refer to existing secret containing API Key by @dirkgroenen in #104
* CLOUD-8558: Secure execution of Soda Agent with least-privilege in mind by @dirkgroenen in #105

Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.7.1

<sup>25 October 2024</sup>

### 1.7.1 Features and Fixes <a href="#id-171-features-and-fixes" id="id-171-features-and-fixes"></a>

* Anomaly Detection check: add alert\_directionality
* Comparison row count check: secondary datasource filter fix (#2165) by @m1n0 in #337
* Reconciliation row: fix multiple checks with filters by @m1n0 in #338

***

### \[soda-core] 3.4.1

<sup>22 October 2024</sup>

### 3.4.1 Features and fixes <a href="#id-341-features-and-fixes" id="id-341-features-and-fixes"></a>

* Add documentation for MS fabric package install + config by @janet-can in #2180
* Fix: Comparison row count check secondary datasource filter by @asantoz in #2165

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.4.0

<sup>21 October 2024</sup>

### 3.4.0 Features and fixes <a href="#id-340-features-and-fixes" id="id-340-features-and-fixes"></a>

* Add support for Azure SQL, Synapse, and Microsoft Fabric and extend support for SQL Server by @sdebruyn in #2160
* Add page to docs folder for data contracts language reference by @janet-can in #2166

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-cloud] Bulk-edit dataset responsibilities and attributes

<sup>17 October 2024</sup>

Soda’s newest feature enables you to apply attributes, or assign users or user groups, and set their permissions, for more than one dataset at a time. To do so, access the Datasets page in the UI, select multiple datasets, then select **Edit**. Changes you make apply to all the selected datasets.

***

### \[soda-agent] 1.1.31

<sup>16 October 2024</sup>

### 1.1.31 <a href="#id-1131" id="id-1131"></a>

This release maps to [Soda Library 1.6.4](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 1.1.30

<sup>09 October 2024</sup>

### 1.1.30 <a href="#id-1130" id="id-1130"></a>

This release maps to [Soda Library 1.6.4](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-agent] 1.1.29

<sup>26 September 2024</sup>

### 1.1.29 <a href="#id-1129" id="id-1129"></a>

This release maps to [Soda Library 1.6.3](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-cloud] Introducing custom roles

<sup>26 September 2024</sup>

To manage the actions of users that belong to a single organization, Soda Cloud uses roles, groups, and access permissions. These roles and groups and their associated permissions enforce limits on the abilities for users to access or make changes to resources, or to make additions and changes to organization settings and default access permissions.

New in Soda Cloud, you can create and edit new global or dataset roles to customize access to resources and functionalities in your organization.

See: [Manage global roles, user groups, and settings](https://docs.soda.io/soda-cloud/roles-global.html)\
See: [Manage dataset roles](https://docs.soda.io/soda-cloud/roles-dataset.html)

***

### \[soda-agent] 1.1.28

<sup>25 September 2024</sup>

### 1.1.28 <a href="#id-1128" id="id-1128"></a>

This release maps to [Soda Library 1.6.2](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.6.2

<sup>24 September 2024</sup>

### 1.6.2 Features and Fixes <a href="#id-162-features-and-fixes" id="id-162-features-and-fixes"></a>

* Remove global hard limit on queries by @m1n0 in #321
* Fix: exclude NaNs (as NULLS) from aggregate queries in databricks by @bastienboutonnet in #322

***

### \[soda-agent] 1.1.27

<sup>18 September 2024</sup>

### 1.1.27 <a href="#id-1127" id="id-1127"></a>

This release maps to [Soda Library 1.6.1](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-core] 3.3.15 - 22

<sup>12 September 2024</sup>

### 3.3.15 - 3.3.22 Fixes <a href="#id-3315---3322-fixes" id="id-3315---3322-fixes"></a>

* Removing the data source name lower case requirement by @tombaeyens in #2161
* Fixing Spark session API by @tombaeyens in #2159
* Fixing the lacking data source error message on contract build by @tombaeyens in #2158
* Fixing test library dependencies for test table creation by @tombaeyens in #2157
* Fixing atlan source contract yaml and lacking schema error message by @tombaeyens in #2153
* Fixed the Atlan integration glue db-schema switch by @tombaeyens in #2152
* Comparison check - fix other table filter by @jzalucki in #2149
* Contracts7 : Fixing the integration correlation issue by @tombaeyens in #2148

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-agent] 1.1.26

<sup>04 September 2024</sup>

### 1.1.26 <a href="#id-1126" id="id-1126"></a>

This release maps to [Soda Library 1.6.0](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 1.1.25

<sup>19 August 2024</sup>

### 1.1.25 <a href="#id-1125" id="id-1125"></a>

This release maps to [Soda Library 1.5.25](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.5.25

<sup>14 August 2024</sup>

### 1.5.25 Fixes <a href="#id-1525-fixes" id="id-1525-fixes"></a>

* Spark: Replicate implicit ‘include all’ in profiling by @m1n0 in #300 and #303
* Freshness: Support variables in thresholds by @m1n0

***

### \[soda-core] 3.3.14

<sup>14 August 2024</sup>

### 3.3.14 Fixes <a href="#id-3314-fixes" id="id-3314-fixes"></a>

* Cross row count check should support custom identity. by @jzalucki in #2139
* Handle SQL exception nicely for failed rows and user-defined check. by @jzalucki in #2140
* Spark: Send discovery data despite errors. by @jzalucki in #2142
* Spark: Failed rows should not be limited to max 100 total results. by @jzalucki in #2143
* Freshness: Support variables in thresholds by @m1n0 in #2146
* Spark: replicate implicit ‘include all’ in profiling consistently wit… by @m1n0 in #2147

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-agent] 1.1.24

<sup>13 August 2024</sup>

### 1.1.24 <a href="#id-1124" id="id-1124"></a>

This release maps to [Soda Library 1.5.24](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.5.23

<sup>02 August 2024</sup>

### 1.5.23 Fixes <a href="#id-1523-fixes" id="id-1523-fixes"></a>

* Attempt to always show freshness even if last 24 hours partition does not return data. by @jzalucki in #291
* Observability: Always add partition column to profiling result by @m1n0 in #293

***

### \[soda-agent] 1.1.23

<sup>02 August 2024</sup>

### 1.1.23 <a href="#id-1123" id="id-1123"></a>

This release maps to [Soda Library 1.5.23](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-agent] 1.1.22

<sup>01 August 2024</sup>

### 1.1.22 <a href="#id-1122" id="id-1122"></a>

This release maps to [Soda Library 1.5.22](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-core] 3.3.13

<sup>29 July 2024</sup>

### 3.3.13 Fixes <a href="#id-3313-fixes" id="id-3313-fixes"></a>

* Always reset logger when new scan instance is created. by @jzalucki in #2136

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Sync user groups with IdP

<sup>25 July 2024</sup>

Soda Cloud introduces a new feature that enables Admins to regularly one-way sync the user groups you have defined in Okta or Azure Active Directory into Soda Cloud via SSO integration.

Doing so obviates the need to manually create user groups in Soda Cloud that you have already defined in your IdP, and enables your team to select an IdP-managed user groups when assigning ownership access permissions to a resource, in addition to any user groups you may have created manually in Soda Cloud.

[Learn more](https://docs.soda.io/soda-cloud/sso.html#sync-user-groups-from-okta-or-azure-ad)

***

### \[soda-library] 1.5.20

<sup>24 July 2024</sup>

### 1.5.20 Fixes <a href="#id-1520-fixes" id="id-1520-fixes"></a>

* Fix: make sure labelling incorrect anomalies always returns something by @bastienboutonnet in #265

***

### \[soda-agent] 1.1.21

<sup>24 July 2024</sup>

### 1.1.21 <a href="#id-1121" id="id-1121"></a>

This release maps to [Soda Library 1.5.19](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-core] 3.3.12

<sup>18 July 2024</sup>

### 3.3.12 Fixes <a href="#id-3312-fixes" id="id-3312-fixes"></a>

* Scan context: support list keys in getter by @m1n0 in #2135

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 1.1.20

<sup>18 July 2024</sup>

### 1.1.20 <a href="#id-1120" id="id-1120"></a>

This release maps to [Soda Library 1.5.17](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-core] 3.3.11

<sup>17 July 2024</sup>

### 3.3.11 Features and fixes <a href="#id-3311-features-and-fixes" id="id-3311-features-and-fixes"></a>

* Date formats: improve date format regex by @pholser in #2128
* Duckdb: fix schema check for db in file by @m1n0 in #2130
* Snowflake: support custom hostname and port @whummer in #2109
* Improve user provided query sanitization. by @jzalucki in #2131
* Scan Context: read/write data from/to a scan by @m1n0 in #2134
* Add sslmode support to postgres and denodo by @m1n0 in #2066
* Sqlserver: add support for custom parameters. by @jzalucki in #2132

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-library] 1.5.16

<sup>16 July 2024</sup>

### 1.5.16 Fixes <a href="#id-1516-fixes" id="id-1516-fixes"></a>

* Observability: get all metric history by @m1n0 in #268

***

### \[soda-agent] 1.1.19

<sup>16 July 2024</sup>

### 1.1.19 <a href="#id-1119" id="id-1119"></a>

This release maps to [Soda Library 1.5.14](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.5.15

<sup>15 July 2024</sup>

### 1.5.15 Fixes <a href="#id-1515-fixes" id="id-1515-fixes"></a>

* Fix: cast SUM query to NUMERIC in BQ by @bastienboutonnet in #266
* Fix: output outlier holidays even when no country holiday by @bastienboutonnet in #267

***

### \[soda-cloud] User groups

<sup>08 July 2024</sup>

Create user groups in Soda Cloud to manage role-based permissions (**Admin**, **Manager**, **Editor**, **Viewer**) to resources. Once created, assign role-based permission to access a dataset to user groups, or assign user groups as alert notification rules recipients, and more.

Refer to [Create custom user groups](https://docs.soda.io/soda-cloud/roles-global.html#manage-user-groups) for details.

***

### \[soda-core] 3.3.10

<sup>08 July 2024</sup>

### 3.3.10 Features and fixes <a href="#id-3310-features-and-fixes" id="id-3310-features-and-fixes"></a>

* Bugfix for the Atlan integration when using soda-core & contracts

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 1.1.17 & 1.1.18

<sup>03 July 2024</sup>

### 1.1.17 - 18 <a href="#id-1117---18" id="id-1117---18"></a>

These releases map to [Soda Library 1.5.13 and 1.5.14](https://docs.soda.io/release-notes/soda-library.html), respectively.\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-core] 3.3.7 & 3.3.8 & 3.3.9

<sup>28 June 2024</sup>

### 3.3.7 - 9 Features and fixes <a href="#id-337---9-features-and-fixes" id="id-337---9-features-and-fixes"></a>

* Contracts4 by @tombaeyens in #2116
* Duplicate check: Remove unused aggregated query by @m1n0 in #2118
* Updated readme by @janet-can in #2104
* Oracle: Fix formats, freshness, other minor fixes by @m1n0 in #2106
* Sampler: Do not invoke http endpoint if no failed rows present by @jzalucki in #2115
* Missing count: Fix sample query by @jzalucki in #2114
* Between threshold: Fix error when using variables by @jzalucki in #2113

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 1.1.15 & 1.1.16

<sup>28 June 2024</sup>

### 1.1.15 - 16 <a href="#id-1115---16" id="id-1115---16"></a>

These releases map to [Soda Library 1.5.13](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.5.12

<sup>27 June 2024</sup>

### 1.5.12 Fixes <a href="#id-1512-fixes" id="id-1512-fixes"></a>

* SAS-3334 For duckdb do not use database as filter at all. by @jzalucki in #259
* Fix: explictly construct country holiday df and concat with outliers by @bastienboutonnet in #256

***

### \[soda-agent] 1.1.14

<sup>27 June 2024</sup>

### 1.1.14 <a href="#id-1114" id="id-1114"></a>

This release maps to [Soda Library 1.5.12](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.5.11

<sup>24 June 2024</sup>

### 1.5.11 Fixes and features <a href="#id-1511-fixes-and-features" id="id-1511-fixes-and-features"></a>

* Fix: leave warning bounds and only make level be pass when warn by @bastienboutonnet in #257
* Fix: handle overflowing timestamps for nanosecond precision overflow issues by @bastienboutonnet in #258

***

### \[soda-agent] 1.1.13

<sup>24 June 2024</sup>

### 1.1.13 <a href="#id-1113" id="id-1113"></a>

This release maps to [Soda Library 1.5.11](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.5.10

<sup>21 June 2024</sup>

### 1.5.10 Fixes and features <a href="#id-1510-fixes-and-features" id="id-1510-fixes-and-features"></a>

* CLOUD-7426 Add scan\_time to http payload. by @jzalucki in #255
* Feature: exclude outliers from training via holiday interface by @bastienboutonnet in #254

***

### \[soda-agent] 1.1.12

<sup>21 June 2024</sup>

### 1.1.12 <a href="#id-1112" id="id-1112"></a>

This release maps to [Soda Library 1.5.9](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.5.9

<sup>20 June 2024</sup>

### 1.5.9 Fixes and features <a href="#id-159-fixes-and-features" id="id-159-fixes-and-features"></a>

* Oracle: fix profiling/discovery queries by @m1n0 in #253

***

### \[soda-core] 3.3.6

<sup>20 June 2024</sup>

### 3.3.6 Features and fixes <a href="#id-336-features-and-fixes" id="id-336-features-and-fixes"></a>

* CLOUD-7708 - Add Snowflake CI account to pipeline for soda-core by @dakue-soda in #2088
* CLOUD-7400 - Improve memory usage by @dirkgroenen in #2081
* Duplicate check: fail gracefully in case of error in query by @m1n0 in #2093
* Bump requests and tox/docker by @m1n0 in #2094
* Duplicate check: support sample exclude columns fully by @m1n0 in #2096
* Spark: profiling support more text types by @m1n0 in #2099
* Spark: profiling support more numeric types by @m1n0 in #2100
* Oracle: fix profiling/discovery queries, add numeric profiling by @m1n0 in #2101

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-agent] 1.1.10 & 1.1.11

<sup>18 June 2024</sup>

These releases map to [Soda Library 1.5.7 & 1.5.8](https://docs.soda.io/release-notes/soda-library.html), respectively.\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.5.6

<sup>10 June 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Freshness in obs: add log msg when no data by @m1n0 in #238
* Obs: get all metadata only when enabled, make tests more robust by @m1n0 in #240

***

### \[soda-agent] 1.1.9

<sup>10 June 2024</sup>

This release maps to [Soda Library 1.5.7](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 1.1.8

<sup>07 June 2024</sup>

This release maps to [Soda Library 1.5.5](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 1.1.7

<sup>06 June 2024</sup>

This release maps to [Soda Library 1.5.5](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-cloud] Soda AI

<sup>30 May 2024</sup>

Announcing **Soda AI**, a suite of generative AI (GenAI) features made generally available, and available for preview upon request.

**Soda AI SQL Assistant** and **Soda AI Regex Assistant**\
Powered by OpenAI’s GPT-3.5 & GPT-4, the generative SQL and regular expression assistants available in Soda Cloud’s no-code checks helps you write the queries and expressions you can add to validity, missing, SQL failed rows, and SQL metric checks. The Soda AI SQL or Regex Assistants are enabled for _new_ Soda Cloud accounts by default. If you do not wish to use them, navigate to **your avatar** > **Organization Settings**, then click to remove the check from the box for **Enable SQL and Regex Assistants Powered By Powered by OpenAI**.\
Read more in [Write SodaCL checks](https://docs.soda.io/soda-cl/soda-cl-overview.html#about-soda-ai-assistants).

**Ask AI Assistant**\
Powered, in part, by kapa.ai, the Ask AI Assistant in Soda Cloud answers almost any question you have about Soda, from how to integrate with other tools, to writing SodaCL, to addressing errors, and beyond. [Request preview access](https://go.soda.io/join-soda-ai-preview) to begin experimenting with the power of GenAI-driven data quality testing.

***

### \[soda-library] 1.5.4

<sup>29 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* CLOUD-7751 - fix nightly CI pipeline, use Snowflake CI account config… by @dakue-soda in #229
* Feature: use partition row count (via aggregates) and use in duplicate percent by @bastienboutonnet in #230

***

### \[soda-agent] 1.1.5 & 1.1.6

<sup>29 May 2024</sup>

These releases map to [Soda Library 1.5.4](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.5.3

<sup>28 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* CLOUD-7400: Improve memory usage for Queries by @dirkgroenen in #227
* CLOUD-7702: Add Snowflake CI account to pipeline for soda-library by @dakue-soda in #223
* CLOUD-7725: use newer thrift 0.20.0 by @milanaleksic in #228

***

### \[soda-agent] 1.1.4

<sup>27 May 2024</sup>

This release maps to [Soda Library 1.5.2](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.5.2

<sup>24 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Observability: handle one row scenario by @m1n0 in #224
* User defined metric check: support failed rows query by @m1n0 in #226

***

### \[soda-core] 3.3.5

<sup>24 May 2024</sup>

### Features and fixes <a href="#features-and-fixes" id="features-and-fixes"></a>

* Failed rows: fix warn/fail thresholds for fail condition by @m1n0 in #2084
* Upgrade to latest version of ibm-db python client by @Antoninj in #2076
* User defined metric check: support fail query by @m1n0 in #2089

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 1.1.3

<sup>24 May 2024</sup>

This releases maps to [Soda Library 1.5.2](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-cloud] Anomaly Dashboard

<sup>23 May 2024</sup>

Introducing Soda’s **Anomaly Dashboard for observability**. Use the dashboard driven by machine learning to get automated insights into basic data quality metrics for your datasets. [Learn more](https://docs.soda.io/soda-cloud/anomaly-dashboard.html)

Supported by Soda deployments that use a self-hosted or Soda-hosted Agent to connect to data sources.

![profile-anomalies](https://docs.soda.io/assets/images/profile-anomalies.png)

***

### \[soda-library] 1.5.1

<sup>22 May 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Fix float comparisons in tests by @m1n0 in #222
* Observability: hash metric identities by @m1n0 in #225

***

### \[soda-agent] 1.1.2

<sup>22 May 2024</sup> This releases maps to [Soda Library 1.5.1](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-agent] 1.1.1

<sup>14 May 2024</sup>

This releases maps to [Soda Library 1.4.8](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-core] 3.3.3 & 3.3.4

<sup>07 May 2024</sup>

### Features and fixes <a href="#features-and-fixes" id="features-and-fixes"></a>

* Fix automated monitoring, prevent duplicate queries by @m1n0 in #2075
* Hive support scheme by @m1n0 in #2077
* Bump deps by @m1n0 in #2079
* Update autoflake precommit by @m1n0 in #2070
* Contracts v3 by @tombaeyens in #2067

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 1.1.0

<sup>25 April 2024</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* CLOUD-7385: Update probes for Spring Boot by @s4got10dev in #67

This releases maps to [Soda Library 1.4.7](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-core] 3.3.2

<sup>24 April 2024</sup>

### Features and fixes <a href="#features-and-fixes" id="features-and-fixes"></a>

* Rename argument in set\_scan\_results\_file method by @ozgenbaris1 in #2047
* Dremio: support disableCertificateVerification option by @m1n0 in #2049
* Denodo: fix connection timeout attribute by @m1n0 in #2065
* DB2: support security option by @4rahulae in #2063

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 1.0.8, 1.0.9, 1.0.10

<sup>22 April 2024</sup>

These releases map to [Soda Library 1.4.7](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.4.7

<sup>10 April 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Rename argument in set\_scan\_results\_file method (#2047)
* Dremio: support disableCertificateVerification option (#2049)

***

### \[soda-agent] 1.0.7

<sup>10 April 2024</sup>

This release maps to [Soda Library 1.4.7](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 1.0.6

<sup>09 April 2024</sup>

This release maps to [Soda Library 1.4.6](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.4.5 & 1.4.6

<sup>04 April 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* SAS-3165 Only reset sampler when originally SodaCloudSampler by @dirkgroenen in #207
* Feature: enable new anomaly detection algo in group by checks by @bastienboutonnet in #208

***

### \[soda-cloud] Soda AI Assistants

<sup>28 March 2024</sup>

Powered by OpenAI’s GPT-3.5 & GPT-4, the generative SQL and regular expression assistants available in Soda Cloud’s no-code checks helps you write the queries and expressions you can add to validity, missing, SQL failed rows, and SQL metric checks.

Soda’s SQL or Regex assistants are enabled for new Soda Cloud accounts by default. If you do not wish to use them, navigate to **your avatar** > **Organization Settings**, then click to remove the check from the box for **Enable SQL and Regex Assistants Powered By Powered by OpenAI**.

Read more in [Write SodaCL checks](https://docs.soda.io/soda-cl/soda-cl-overview.html#about-sql-and-regex-assistants).

***

### \[soda-agent] 1.0.4 & 1.0.5

<sup>24 March 2024</sup>

These releases map to [Soda Library 1.4.5 & 1.4.6](https://docs.soda.io/release-notes/soda-library.html), respectively.\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 1.0.3

<sup>24 March 2024</sup>

This release maps to [Soda Library 1.4.4](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.4.4

<sup>23 March 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Failed rows: fix warn/fail thresholds by @m1n0 in #204
* Bump opentelemetry to 1.22 by @m1n0 in #205

***

### \[soda-core] 3.3.1

<sup>23 March 2024</sup>

### Features and fixes <a href="#features-and-fixes" id="features-and-fixes"></a>

* Feature: improved wording and tooltip formatting in simulator by @bastienboutonnet in #2038
* Failed rows: fix warn/fail thresholds by @m1n0 in #2042
* Bump opentelemetry to 1.22 by @m1n0 in #2043
* Bump dev requirements by @m1n0 in #2045

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.3.0

<sup>15 March 2024</sup>

### Features <a href="#features" id="features"></a>

* Contracts 2nd iteration @tombaeyens in #2006

Soda Core 3.3.0 supports the newest, experimental version of `soda-contracts`. The new version introduces changes that may not be compatible with the previous experimental version of `soda-contracts`. To continue using the first version of `soda-contracts` without any adjustments, upgrade to Soda Core 3.2.4 for the latest in bug fixes and updates.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.2.4

<sup>15 March 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Fix: Support attributes on multiple checks by @milanaleksic in #2032
* Use dbt’s new access\_url pattern to access cloud API by @bastienboutonnet in #2035

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-library] 1.4.2

<sup>05 March 2024</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Dremio: fix token support (#2028) by @m1n0 in #195

***

### \[soda-core] 3.2.3

<sup>05 March 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: implement daily and monthly seasonality to external regressor … by @baturayo in #2027
* Dremio: Fix token support by @m1n0 in #2028

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 1.0.2

<sup>05 March 2024</sup>

This release maps to [Soda Library 1.4.2](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 1.0.1

<sup>05 March 2024</sup>

This release maps to [Soda Library 1.4.1](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-agent] 0.9.2

<sup>05 March 2024</sup>

This release maps to [Soda Library 1.4.2](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.4.1

<sup>01 March 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* IA-533: Implement daily and monthly seasonality to external regressor by @baturayo in #189
* Support GMT (Zulu) and microseconds time format by @m1n0 in #193

***

### \[soda-agent] 1.0.0

<sup>29 February 2024</sup>

This release maps to [Soda Library 1.3.2](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

**Upgrade to 1.0.0**

This release includes several key changes to the way the Soda Agent works. If you already use a Soda Agent, carefully consider the changes that Soda Agent 1.0.0 introduces and make appropriate changes to your configured parameters.

* Soda Agent 1.0.0 removes idle mode in the `scan-launcher`. The new agent version starts a separate job for each scan, ensuring better concurrency and resource utilization and obviates the need for [Redis](https://redis.io/docs/about/). When you upgrade your agent, be sure to remove the following properties, if you have configured them, as they will not be supported in future releases:
  * `soda.core.idle`
  * `soda.core.replicas`
  * `soda.scanlauncher.idle.*`
  * `soda.agent.redis.*`
  * `externalRedis`

\


* Soda Agent 1.0.0 no longer uses logging sidecars and, instead, offers the optional ability to produce logs as console output in plain text or JSON formats. Optionally, you can add the configure the `soda.agent.logFormat` and `soda.agent.loglevel` parameters to produce logs; see [Deploy a Soda Agent in a Kubernetes cluster](https://docs.soda.io/soda-agent/deploy.html#deploy-a-soda-agent-in-a-kubernetes-cluster). When you upgrade your agent, be sure to remove the following properties, if you have configured them, as they will not be supported in future releases:
  * `loggingJsonOff`
  * `soda.agent.loggingSidecar`
  * `soda.scanlauncher.loggingSidecar`

\


* Soda Agent 1.0.0 changes the default value for `soda.polling.interval` to `5 seconds`. Do not change this value. If you have already configured a custom polling interval, remove the setting.

\


* Soda Agent 1.0.0 does not use Kubernetes Cron jobs for executing scans. When you upgrade your agent, be sure to remove the following properties, if you have configured them, as they will not be supported in future releases:
  * `soda.scanlauncher.failedJobsHistoryLimit`
  * `soda.scanlauncher.successfulJobsHistoryLimit`

\


* Soda Agent 1.0.0 favors manged or self-managed node groups over AWS Fargate, AKS Virtual Nodes, or GKE Autopilot profiles. Though this version of the agent still works with those profiles, the scan performance is slower because the profiles provision new nodes for each scan. To migrate your agent to a managed node group:
  1. Add a managed node group to your Kubernetes cluster.
  2. Check your cloud-services provider’s recommendations for node size and adapt it for your needs based on volume of scans you anticipate. Best practice dictates that you set your cluster to have at least 2 CPU and 2GB of RAM, which, in general is sufficient to run up to six scans in parallel.
  3. [Upgrade to Soda Agent 1.0.0](https://docs.soda.io/soda/upgrade.html#upgrade-a-self-hosted-soda-agent), configuring the helm chart to _not_ use Fargate, Virtual Nodes, or GKE Autopilot by:
     * removing the `provider.eks.fargate.enabled` property, or setting the value to `false`
     * removing the `provider.aks.virtualNodes.enabled` property, or setting the value to `false`
     * removing the `provider.gke.autopilot.enabled` property, or setting the value to `false`
     * removing the `soda.agent.target` property
  4. Remove the Fargate profiles, and drain existing workloads from virtual nodes in the namespace in which you deployed the Soda Agent so that the agent uses the node group to execute scans, not the profiles.

***

### \[soda-cloud] New Soda Cloud onboarding

<sup>29 February 2024</sup>

Leveraging the release of the new Soda-hosted Agent, the Soda Cloud onboarding experience for new users has changed to a more streamlined experience setting up a new data source connection and preparing OOTB automated-monitoring checks within a few minutes. [Sign up](https://cloud.soda.io/signup) for Soda Cloud, then click **Get Started** to quickly get set up in the user interface and start checking your data for quality.

Additionally, **schema checks** are now acessible via no-code check user interface in Soda Cloud.

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

### \[soda-core] 3.2.2

<sup>28 February 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Fix assets folder by @m1n0 in #2020
* Fix: timezone mismatch between the recent and historical ad results by @baturayo in #2023
* Feature: in anomaly detection simulator use soda core historic check results endpoint instead of test results by @baturayo in #2025
* Update dask-sql by @m1n0 in #2026

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 0.9.1

<sup>26 February 2024</sup>

### Features and improvements <a href="#features-and-improvements" id="features-and-improvements"></a>

* CLOUD-7005: Change agent type from client-hosted to self-hosted by @s4got10dev in #55

This release maps to [Soda Library 1.3.2](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[cloud-api] 0.1.0

<sup>21 February 2024</sup>

Introducing Soda Cloud API v0. This API enables you and your team to access check and dataset information in Soda Cloud, and execute scans programmatically.

Access the [Soda Cloud API](https://docs.soda.io/api-docs/public-cloud-api-v1.html) documentation to learn more.

***

### \[soda-agent] 0.9.0

<sup>20 February 2024</sup>

This release maps to [Soda Library 1.3.2](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-core] 3.2.1

<sup>13 February 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: correctly identified anomalies are excluded from training data by @baturayo in #2013
* Fix: show more clearly the detected frequency using warning message first by @baturayo in #2014
* Fix: simulator streamlit path by @m1n0 in #2017
* \[pre-commit.ci] pre-commit autoupdate by @pre-commit-ci in #2016
* Update oracle\_data\_source.py by @vinod901 in #2012
* Oracle: cast config to str/int to prevent oracledb errors by @m1n0 in #2018

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 0.8.57

<sup>13 February 2024</sup>

This release includes bug fixes and features and maps to [Soda Library 1.3.2](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-core] 3.2.0

<sup>08 February 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: implement severity level paramaters by @baturayo in #2001
* Always use datasource specifis COUNT expression by @m1n0 in #2003
* Fix: anomaly detection feedbacks by @baturayo in #2005
* Feature: anomaly detection simulator (#163) by @baturayo in #2010
* Dremio Token Support by @JorisTruong in #2009

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 0.8.56

<sup>02 February 2024</sup>

This release includes bug fixes and features and maps to [Soda Library 1.2.4](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-cloud] Soda-hosted Agent

<sup>01 February 2024</sup>

Introducing a secure, out-of-the-box Soda-hosted Agent to manage access to data sources from within your Soda Cloud account. Quickly configure connections to your data sources in the Soda Cloud user interface, then empower all your colleagues to explore datasets, access check results, customize collections, and create their own no-code checks for data quality.

Learn how to [Set up a Soda-hosted agent](https://docs.soda.io/soda-agent/managed-agent.html).

***

### \[soda-agent] 0.8.55

<sup>01 February 2024</sup>

This release includes bug fixes and features and maps to [Soda Library 1.2.3](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

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

### \[soda-agent] 0.8.54

<sup>29 January 2024</sup>

This release includes bug fixes and features and maps to [Soda Library 1.2.3](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.2.2 & 1.2.3

<sup>26 January 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Hive data source improvements by @robertomorandeira in sodadata/soda-core#1982
* Feature: Implement migrate from anomaly score check config by @baturayo in sodadata/soda-core#1998
* Bump Prophet by @m1n0 in sodadata/soda-core#2000
* Tests: Use approx comparison for floats by @m1n0 in sodadata/soda-core#1999

\


* Support token auth by @m1n0 in #159
* Schema check: Support custom identity (#1988) by @m1n0 in #161
* CLI: Omit exception if no cli args by @m1n0 in #162
* Add semver release for major, minor and latest by @dirkgroenen in #164
* Bug: Handle null values for continuous dist by @baturayo in #165
* IA-486: implement new anomaly detection logic and syntax by @baturayo in #153
* Fix Python3.8 type issues for new AD syntax by @baturayo in #166
* Feature: Support built in prophet public holidays by @baturayo in #167

***

### \[soda-core] 3.1.4 & 3.1.5

<sup>24 January 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Hive data source improvements by @robertomorandeira in #1982
* Featire: Implement migrate from anomaly score check config by @baturayo in #1998
* Bump Prophet by @m1n0 in #2000
* Tests: Use approx comparison for floats by @m1n0 in #1999

\


* Dbt: Improve parsing logs by @m1n0 in #1981
* Sampler: Fix link href by @m1n0 in #1983
* Document group by example for Soda Core with failed rows check by @janet-can in #1984
* Schema check: Support custom identity by @m1n0 in #1988
* SAS-2735 Add semver release for major, minor and latest by @dirkgroenen in #1993
* Bug: Handle null values for continuous dist (#165) by @baturayo in #1994
* pre-commit autoupdate by @pre-commit-ci in #1977
* Feature: Implement new anomaly detection in soda core by @baturayo in #1995
* Feature: Support built-in prophet public holidays by @baturayo in #1997

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.1.3

<sup>03 January 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: implement warn\_only for anomaly score (#156) by @baturayo in #1980

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.1.2

<sup>15 December 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* GCP Delegate Authentication support by @nathadfield in #1973
* Fix anomaly detection frequency aggregation bug by @baturayo in #1975
* Upgrade pydantic from v1 to v2 by @baturayo in #1974
* \[pre-commit.ci] pre-commit autoupdate by @pre-commit-ci in #1938

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 0.8.53

<sup>15 December 2023</sup>

This release includes bug fixes and features and maps to [Soda Library 1.1.27](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-cloud] Soda Cloud offers no-code checks

<sup>07 December 2023</sup>

Soda Cloud now supports no-code check creation.

To create no-code checks, you must be working with a dataset that has been onboarded via a data source connected using a Soda Agent. You must also have Admin, Manager, or Editor rights to add a no-code check to a dataset.

See: [Define SodaCL checks](https://docs.soda.io/soda-cl/soda-cl-overview.html#define-sodacl-checks)

***

### \[soda-library] 1.1.26

<sup>04 December 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Freshness: support in-check filters (#1970) by @m1n0 in #150. Documentation to follow shortly.

***

### \[soda-core] 3.1.1

<sup>04 December 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Update python api docs by @m1n0 in #1967
* Make custom identity fixed as v4 by @m1n0 in #1968
* Freshness: support in-check filters by @m1n0 in #1970. Documentation to follow shortly.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] 0.8.51 & 0.8.52

<sup>04 December 2023</sup>

These releases includes bug fixes and features and map to [Soda Library 1.1.26](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.1.24 & 1.1.25

<sup>24 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Reconciliation row: expose deepdiff config, lower sensitivity by @m1n0 in #149
* Make custom identity fixed as v4 by @m1n0 in #143
* Reconciliation row: fix key cols mapping, bugfixes by @m1n0 in #148

***

### \[soda-agent] 0.8.50

<sup>22 November 2023</sup>

This release includes bug fixes and maps to [Soda Library 1.1.23](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-cloud] Manage scheduled scans

<sup>21 November 2023</sup>

Soda Cloud now supports scan failure alerts and improved scan visibility and management. Upgrade to Soda Agent v0.8.49 to access scan management features.

See [Manage scheduled scans](https://docs.soda.io/soda-cloud/scan-mgmt.html) for details.

***

### \[soda-agent] 0.8.49

<sup>20 November 2023</sup>

This release maps to [Soda Library 1.1.23](https://docs.soda.io/release-notes/soda-library.html).\
Access [Soda documentation](https://docs.soda.io/soda/upgrade.html#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

***

### \[soda-library] 1.1.23

<sup>19 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Align usage of database/catalog and implement fallback by @dirkgroenen in #142
* Remove segment logs by @m1n0 in #145
* Align usage of exit codes and add exit\_code(4) by @dirkgroenen in #146

***

### \[soda-core] 3.1.0

<sup>16 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

Introducing the launch of [data contracts](https://docs.soda.io/soda/data-contracts.html), Soda’s experimental way to set data quality standards for data products.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-library] 1.1.22

<sup>14 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Cloud: Add ScanId by @dirkgroenen in #137
* Athena: Set default catalog name by @dirkgroenen in #139
* Sqlserver: remove % from pattern (#1956) by @m1n0 in #140
* Sqlserver: support quoting tables with brackets, “quote\_tables” mode by @m1n0 in #141

***

### \[soda-core] 3.0.54

<sup>14 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Failed rows check: support thresholds by @m1n0 in #1960
* Updated install doc to include MotherDuck support via DuckDB by @janet-can in #1963
* Sqlserver: remove % from pattern by @chuwangBA in #1956
* Sqlserver: support quoting tables using brackets, “quote\_tables” mode by @m1n0 in #1959

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[reporting-api] Reporting API v1.3.1

<sup>09 November 2023</sup>

Bug fix following the removal of `creator_` fields causing SQL query errors for `check_results` and `dataset` endpoints.

***

### \[reporting-api] Reporting API v1.3.0

<sup>08 November 2023</sup>

Fields related to **creator** information (with `creator_` prefix) are now deprecated from the `/checks`, `/check_results`, `datasets` endpoints. Those fields were legacy from soda-sql. With soda-sql data removed from our system the concept of `creator` is also removed from the reporting API. Use the `owner_` fields instead.

***

### \[reporting-api] 0.3.0

<sup>07 November 2023</sup>

#### Deprecated <a href="#deprecated" id="deprecated"></a>

The Soda Cloud Reporting API v0 is now deprecated. Please use [Reporting API v1](https://docs.soda.io/api-docs/reporting-api-v1.html).

***

### \[soda-library] 1.1.20 & 1.1.21

<sup>02 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Freshness: support mixed thresholds by @m1n0 in #134
* Duckdb: Rename path to database by @dirkgroenen in #135
* Failed rows: new ‘empty’ type, handle no rows scenario better by @m1n0 in #132
* Extend Data Source identity migration to spark\_df by @dirkgroenen in #133

***

### \[soda-core] 3.0.52 & 3.0.53

<sup>02 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Freshness: support mixed thresholds by @m1n0 in #1957
* Add License to every package by @m1n0 in #1958
* Fix: compute value counts in DB rather than in python for categoric d… by @baturayo in #1948
* Feature: Add Dask/Pandas configurable data source naming support by @dirkgroenen in #1951

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-library] 1.1.19

<sup>23 October 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Fix: compute value counts in DB rather than in python for categoric distribution checks by @baturayo in #116
* Run scientific unit tests in CI by @baturayo in #121
* Raise a warning instead of exception when dataset name is incorrect in suggestions by @baturayo in #126
* Add support for custom dask data source name by @dirkgroenen in #120

***

### \[soda-cloud] 90-day check history

<sup>13 October 2023</sup>

In addition to seven, 30, and 60 days, Soda Cloud now offers 90 days of check result history.

![90-day-history](https://docs.soda.io/assets/images/90-day-history.png)

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

### \[soda-core] 3.0.51

<sup>11 October 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Allow specification of virtual file name for add sodacl string by @m1n0 in #1943
* Duckdb: support csv, parquet and json file formats by @PaoloLeonard in #1942
* BigQuery: support job Labels by @data-fool in #1947

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-cloud] Data quality dashboard

<sup>05 October 2023</sup>

Today marks the launch of the new Data Quality Dashboard in Soda Cloud. Get at-a-glance insight into check performance, overall data health, and activity information about users, active checks, and alert notifications. Access the **Dashboard** in the main navigation bar in Soda Cloud.

***

### \[soda-library] 1.1.13

<sup>27 September 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Reconciliation schema: support type mapping by @m1n0 in #110
* Fix databricks numeric types profiling by @m1n0 in #111

***

### \[soda-core] 3.0.50

<sup>27 September 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Add thresholds and diagnostics to scan result by @m1n0 in #1939
* Fix databricks numeric types profiling by @m1n0 in #1941

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.0.49

<sup>19 September 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: Reference check: support must NOT exist by @m1n0 in #1937
* Chore: remove redundant workflow by @dirkgroenen in #1931
* Catch exceptions while building results file by @m1n0 in #1936
* Pre-commit.ci: pre-commit autoupdate by @pre-commit-ci in #1935

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-cloud] Soda Cloud agreements only run on approval

<sup>23 August 2023</sup>

The agreement behavior in Soda Cloud has been changed.

As of this release, agreements do not run scans without stakeholder approval. When all stakeholders have approved an agreement, Soda Cloud begins running scans of your data according to the agreement’s scan definition.

Previously, Soda did not require stakeholder approval before running scans scheduled in an agreement.

See: [Schedule a scan](https://docs.soda.io/soda-library/run-a-scan.html#scan-for-data-quality)

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

### \[soda-core] 3.0.48

<sup>11 August 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Update docs to include experimental support for soda-core-teradata by @janet-can in #1916
* Remove duckdb constraint by @JCZuurmond in #1921
* Remove Vertica from build by @vijaykiran in #1923
* Fix boolean attributes formatting by @m1n0 in #1925; addresses 400 error in sending results to Soda Cloud that involve checks with a boolean attribute such as a checkbox.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Collections

<sup>10 August 2023</sup>

The **Checks** dashboard in Soda Cloud now offers a feature to save **Collections**. Craft a combination of Soda Cloud filters to display your ideal set of data quality checks, then click **Save Collection** to name the custom filtered view so you can quickly access it again in the future.

***

### \[soda-cloud] Checks dashboard

<sup>08 August 2023</sup>

Soda Cloud now uses a new **Checks** dashboard which displays checks and their latest scan results. This replaces the **Check Results** dashboard, that displayed all individual check results.

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

### \[soda-core] 3.0.42 - 3.0.47

<sup>21 July 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Bump requests and markupsafe by @m1n0 in #1908
* Create postgres\_example.md by @rolandrmgservices in #1915
* Pre-commit.ci: pre-commit autoupdate by @pre-commit-ci in #1905
* Refactor: fix dask warnings for deprecated function by @baturayo in #1914
* Added support for source and client\_tags in trino data source by @deenkar in #1909
* Set metric for failed rows check by @m1n0 in #1904
* Add experimental Teradata support by @gpby in #1907
* Fix multiple group by checks by @vijaykiran in #1918

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.0.40 & 3.0.41

<sup>23 June 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Do not qualify metadata queries by @m1n0 in #1896
* Pin dask-sql by @m1n0 in #1890
* Added Soda Core docs by @janet-can in #1893
* Formatting adjustments to docs by @janet-can in #1894
* Handle scenario where schema cannot be obtained by @m1n0 in #1895

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

***

### \[reporting-api] Reporting API v1.0.1

<sup>09 June 2023</sup>

Released as generally available.

Read more in the [Reporting API Changelog and v1 migration guide](https://docs.soda.io/api-docs/reporting-api-v1-migration-guide.html).

***

### \[soda-core] 3.0.38 & 3.0.39

<sup>08 June 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Core: Upgrade compatible duckdb version by @vijaykiran in #1875
* Core: Revised README slightly for updated language by @janet-can in #1876
* Cloud related code cleanup + simple log buffer by @m1n0 in #1881
* Core Fix: Athena timestamp precision by @m1n0 in #1886

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.35, 3.0.36, 3.0.37

<sup>11 May 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Snowflake: Add database.schema prefix for snowflake by @vijaykiran in #1872
* No Changes in 3.0.36 & 3.0.37 - due to [PyPi incident](https://status.python.org/incidents/6zgs59xbw9s4) package publishing was broken during 3.0.36 release.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.33 & 3.0.34

<sup>10 May 2023</sup>

### Fixes and Features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Core: user defined checks using sql file by @vijaykiran in #1859
* Scientific: implement optional sample field for DRO update by @baturayo in #1848
* Core: Improved graphs and diagnostics for Schema check in Cloud by @m1n0 in #1789
* Core: total failed rows for derived checks by @m1n0 in #1857
* Core: dbt - use generic check type by @m1n0 in #1858
* Core: snowflake - remove unnecessary dependencies by @vijaykiran in #1862
* Core: pre-commit autoupdate by @pre-commit-ci in #1855
* Core Generic check type for Schema check by @m1n0 in #1789
* Scientific: pin pandas<2.0.0 on scientific lib by @bastienboutonnet in #1869

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Regions and multiple organizations

<sup>02 May 2023</sup>

* Soda Cloud users may set up [multiple Soda Cloud organizations](https://docs.soda.io/soda-cloud/roles-global.html) for use with different environments in a network infrastructure, such as staging and production.
* New Soda Cloud users must select a region in which to store their account data when creating a Soda Cloud account.

***

### \[soda-core] 3.0.31 & 3.0.32

<sup>18 April 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Core: Document Analyze Table in tests by @m1n0 in #1844
* Core: Apply dataset filters to reference check by @m1n0 in #1846
* Core: Cleanup Group Evolution by @vijaykiran in #1853
* Scientific: Fix: improve error handling when invalid metric is provided to AnomalyMetricCheck by @tituskx in #1850
* Scientific: feat: derive bins and weights for categorical DRO in SQL warehouse by @tituskx in #1847
* Core: Upgrade snowflake connector version by @vijaykiran in #1854

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.29 & 3.0.30

<sup>21 March 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Core: Use correct failing/passing query on aggregatedd query checks by @m1n0 in #1837
* Core: Group by by @vijaykiran in #1840
* Core: Fix wrong parsing of scheme for soda\_cloud by @milanaleksic in #1841
* Scientific: Fix: do not return anomalyProbability by @tituskx in #1807
* Core: Add group evolution check by @vijaykiran in #1843

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.28

<sup>09 March 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Cloud: Fix freshness check cloud payload by @m1n0 in #1814
* Cloud: Send the link details from sample configuration by @vijaykiran in #1832
* Vertica: Fix profiling by @m1n0 in #1826
* Core: Duplicate check: specify table for \* query by @m1n0 in #1829
* Duckdb: Support connection configuration by @m1n0 in #1830
* Trino: Remove experimental python types arg by @vijaykiran in #1831

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] AWS PrivateLink

<sup>28 February 2023</sup>

Soda Cloud users may now set up private connectivity to a Soda Cloud account using [AWS PrivateLink](https://docs.soda.io/soda-agent/deploy.html).

***

### \[soda-core] 3.0.24 & 3.0.25

<sup>23 February 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Cloud: Fix freshness check cloud payload by @m1n0 in #1814
* Core: Duplicate check: get/send both raw and aggregated rows by @m1n0 in #1818
* Core: Fix condition for fail queries by @vijaykiran in #1811
* Core: Do not create sample rows when limit is 0 by @m1n0 in #1820
* Dremio: Update dremio\_data\_source.py by @aayush16 in #1824
* CI: Distinct PR and Nightly test runs by @m1n0 in #1821
* CI: Fix tests run by @m1n0 in #1825
* Core: Initial group by check support by @vijaykiran in #1827

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.24 & 3.0.25

<sup>23 February 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Core: Updates to README by @baturayo @janet-can
* Core: Tiny update to readme subtitle byin #1806
* Core: Improve profiling tests by @m1n0 in #1805
* Core: Fix sampler parsing by @vijaykiran in #1813
* Core: Ground work for query generation changes, and refactor reference check into two queries by @m1n0 in #1812
* Core: Bump telemetry versions by @vijaykiran in #1810
* Scientific: Fix: return yhat not trend as anomalyPredictedValue by @tituskx in #1802
* Scientific: Refactor: only use last n\_points in detect\_anomalies method by @tituskx in #1808
* Scientific: Fix: skip/ignore measurements does not work by @tituskx in #1799
* Scientific: Fix anomaly result to expect feedback outside of anomaly diagnostics by @baturayo in #1797
* Cloud: generic check API changes by @m1n0 in #1778
* Cloud: Check attributes: send numeric type as string by @m1n0 in #1798

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Soda Agents made generally available

<sup>23 February 2023</sup>

Soda Agent deployment instructions have been made generally available, no longer in Preview state. See:

* [Deploy a Soda Agent in Azure AKA](https://docs.soda.io/soda-agent/deploy.html)
* [Deploy a Soda Agent in Google GKE](https://docs.soda.io/soda-agent/deploy.html)

***

### \[soda-core] 3.0.23

<sup>16 February 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Core: Optimize duplicate query by @m1n0 in #1781
* Core: Pin duckdb version by @baturayo in #1791
* Core: Invalid values/format/regex for validity checks by @m1n0 in #1793
* Core: Data source utils: support config as string by @m1n0 in #1796
* Profiling refactor: profiler implementation by @baturayo in #1775
* Anomaly detection: Fix - confidence bounds of anomaly detection sit too close together by @tituskx in #1780
* Anomaly detection: Bug - anomaly detection doesn’t use more than 3 historical check results by @baturayo in #1787
* Cloud: Fix verbose mode in cloud requests by @m1n0 in #1792
* CI: Update workflow.yml by @vijaykiran in #1794

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Scheme property for connecting Core to Cloud

<sup>30 January 2023</sup>

The connection configuration for connecting Soda Core to Soda Cloud now includes the option to add a scheme property. This property allows you to provide a value for the scheme property to indicate which scheme to use to initialize the URI instance.

***

### \[soda-cloud] Multiple owners of agreements

<sup>26 January 2023</sup>

For all our Soda Cloud Agreements users, we’ve made it possible to assign multiple owners to agreements.

***

### \[soda-cloud] Check attributes

<sup>26 January 2023</sup>

Soda Cloud added a new feature to define check attributes that your team can apply to checks when they write them in an agreement or in a checks YAML file for Soda Core.

Read more in [Add check attributes](https://docs.soda.io/soda-cl/check-attributes.html).

***

### \[soda-core] 3.0.22

<sup>25 January 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Vertica: Add Vertica Support by @mkovalyshev in #1771
* Dask/Pandas: Dask and Pandas support by @baturayo in #1671
* Profiling: Fix table and column inclusion/exclusion works correctly for profiling by @tituskx in #1735
* Cloud: Add support for link text for failed row sampler messages by @vijaykiran in #1772
* Cloud: Gather all queries in the query object by @m1n0 in #1773
* Cloud: Add possibility to configure the URL scheme for Soda Cloud by @dakue-soda in #1776

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.21

<sup>19 January 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Core: Check attributes: Enable tests and fix support on all check types by @m1n0 in #1767
* Core: CI: Use the Github token from the pipeline as a dispatch token by @dakue-soda in #1768

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.20

<sup>19 January 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Dremio: Fixes for profiling and discovery by @vijaykiran in #1764
* Core: Attributes: add timezone to dates by @m1n0 in #1765
* Core: Deprecation: actually remove execution of row count query in dataset discovery by @bastienboutonnet in #1763
* Core: Add dataset filter test case starting with % by @baturayo in #1756

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.19

<sup>11 January 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Fix Docker build issue.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.18

<sup>11 January 2023</sup>

### Features and fixes <a href="#features-and-fixes" id="features-and-fixes"></a>

* Core: apply in-check filters to duplicate check by @m1n0 in #1748
* Core: Deprecate global data source ‘disable\_samples’, use one from sampler by @m1n0 in #1749
* Core: Fix for user defined query check failure on zero result by @vijaykiran in #1750
* Core: Remove unused soda\_cloud property by @m1n0 in #1753
* Core: Better warning message for invalid check without valid spec by @m1n0 in #1752
* Cloud: Get available check attributes schema using correct cloud api by @m1n0 in #1751
* Cloud: Skip all checks if invalid attributes found by @m1n0 in #1758
* Profiling: Add row count to profiling by @baturayo in #1747
* Dremio: Fix profiling for schemas with . s by @vijaykiran in #1757

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.17

<sup>28 December 2022</sup>

### Features and fixes <a href="#features-and-fixes" id="features-and-fixes"></a>

* Core: Custom query null result handling by @m1n0 in #1739
* Core: Duplicate count workaround for complex types by @m1n0 in #1738
* Core: Warn about unsupported multi-argument numeric checks by @m1n0 in #1741 and #1742
* Core: Send check attributes to cloud by @m1n0 in #1743
* API: Experimental connection API by @vijaykiran in #1745
* Dremio: fix profiling issues by @vijaykiran in #1746

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Notification rules made generally available

<sup>20 December 2022</sup>

Soda Cloud notification rules have been made generally available, no longer in Preview state. See [Set notification rules](https://docs.soda.io/soda-cloud/notif-rules.html).

***

### \[soda-cloud, soda-agent] Deploy a Soda Agent in a GKE cluster (Preview)

<sup>20 December 2022</sup>

Released in Preview state, you can now deploy a Soda Agent in a Google Kubernetes Engine cluster.

Access the [documentation](https://docs.soda.io/soda-agent/deploy.html) to learn how to set up a cluster, then deploy an agent that connects to your Soda Cloud via account API keys.

***

### \[soda-core] 3.0.16

<sup>15 December 2022</sup>

### Features and fixes <a href="#features-and-fixes" id="features-and-fixes"></a>

* Cloud: Do not upload more than 100 rows to Cloud when no limit is specified by @m1n0 in #1719
* Core: Bump requests version by @m1n0 in #1721
* Core: Fix history-loss when custom identity is provided by @vijaykiran in #1720
* Core: Fix json serialisation for HTTPSampler by @vijaykiran in #1723
* Core: Bump dependency versions by @vijaykiran in #1728
* Core: Remove cloud traces from telemetry by @m1n0 in #1729
* Dremio: Fix profiling query by @vijaykiran in #1730
* Scientific: Log metric identity when getting historical metrics for anomaly check for easier debugging by @bastienboutonnet in #1731
* Databricks/Spark: Fix listing of tables by @vijaykiran in #1736
* Sparkdf: Fix schema info with partition info by @vijaykiran in #1737
* Snowflake: Add snowflake arg to allow temp credential file in Linux by @wintersrd in #1714

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[reporting-api] Reporting API v1 (Preview)

<sup>15 December 2022</sup>

Released in Preview state, version 1 offers improvements and additions to Soda Cloud’s Reporting API endpoints.

* Better performance as the API retrieves all of its data from pre-processed and aggregated data sources.
* “Tests” have been renamed “checks”.
* Most endpoints now use pagination.
* A few endpoints have been deprecated, a new one, Incidents, has been added, and some have changed for the better.

Read more in the [Reporting API Changelog and v1 migration guide](https://docs.soda.io/api-docs/reporting-api-v1-migration-guide.html).

***

### \[soda-cloud] Disable or reroute failed row samples

<sup>15 December 2022</sup>

Use these new ways of managing exposure to sensitive data such as personally identifiable information (PII), when collecting failed row samples.

* Disable failed rows samples for specific columns to effectively “turn off” failed row collection for specific columns in datasets.
* Reroute any failed rows samples that Soda collects to a secure, internal location rather than Soda Cloud. To do so, add the storage configuration to your sampler configuration to specify the columns you wish to exclude.

***

### \[soda-core] 3.0.15

<sup>12 December 2022</sup>

### Features and fixes <a href="#features-and-fixes" id="features-and-fixes"></a>

* Core-267 variables by @m1n0 in #1716
* Add snowflake arg to allow temp credential file in Linux by @wintersrd in #1714
* Do not upload more than 100 rows to Cloud when no limit is specified by @m1n0 in #1719
* Bump requests version by @m1n0 in #1721
* Fix history-loss when custom identity is provided by @vijaykiran in #1720
* Check attributes by @m1n0 in #1718
* Fix json serialisation for HTTPSampler by @vijaykiran in #1723

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud, soda-agent] Deploy a Soda Agent in a AKS cluster (Preview)

<sup>02 December 2022</sup>

Released in Preview state, you can now deploy a Soda Agent in an Azure Kubernetes Service cluster.

Access the [documentation](https://docs.soda.io/soda-agent/deploy.html) to learn how to set up a regular or virtual cluster, then deploy an agent that connects to your Soda Cloud via account API keys.

***

### \[soda-core] 3.0.14

<sup>01 December 2022</sup>

### New features and improvements <a href="#new-features-and-improvements" id="new-features-and-improvements"></a>

* Core: Date format fixes by @vijaykiran in #1691
* Core: Variables everywhere by @m1n0 in #1700
* Core: Update docker by @vijaykiran in #1699
* Core: Refactor duplicate check into two queries by @m1n0 in #1698
* Core: Remove row-count derivation from dataset discovery by @bastienboutonnet in #1706
* Core: Support variables in configuration by @m1n0 in #1705
* Core: Fix schema checks with table filter by @m1n0 in #1704
* Core: Update CI to test support for python 3.10 @vijaykiran
* SQL Server: Fix email regex, do not allow empty string by @m1n0 in #1688
* Spark: Respect verbose setting when running a test query by @m1n0 in #1697
* Spark: Remove unnecessary logging by @vijaykiran
* Cloud: Updates to HTTP Sampler by @vijaykiran in #1702
* Cloud: Ensure that profiling does not lowercase columns by @tituskx in #1687
* Docs: Updates to list of compatible data sources. by @janet-can in #1694
* New data source: Duckdb support (experimental) by @vijaykiran in #1709
* New data source: Denodo support (experimental) by @vijaykiran in #1710

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Notification rules (Preview)

<sup>01 December 2022</sup>

Introducing the ability to set notification rules in your Soda Cloud account. Released as a Preview feature, you can define where and when to send multiple alert notifications when check results warn or fail.

[Read more](https://docs.soda.io/soda-cloud/notif-rules.html) about how to set up and use notification rules.

***

### \[soda-core] 3.0.13

<sup>15 November 2022</sup>

### New features and improvements <a href="#new-features-and-improvements" id="new-features-and-improvements"></a>

* Core: Support Date type in freshness checks by @m1n0 in #1667
* Core: Log current time to logs by @m1n0 in #1676
* Core: Fixes to sampler, add logging by @vijaykiran in #1690
* Core: Add file/check location to scan summary by @m1n0 in #1675
* Core: Regex: support ‘+’ in email format by @m1n0 in #1677
* Core: Generate passing query for built-in checks by @m1n0 in #1668
* Core: Test statistical functions on all data sources by @m1n0 in #1678
* Core: Add samples limit to queries by @m1n0 in #1685
* Cloud: Add message configuration option to sampler by @vijaykiran in #1686
* Oracle Oracle DB Support by @vijaykiran in #1682
* Scientific: feat: support sampling for distribution checks by @baturayo in #1666

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.12

<sup>03 November 2022</sup>

### New features and improvements <a href="#new-features-and-improvements" id="new-features-and-improvements"></a>

* Core: Duplicate percent check by @m1n0 in #1649
* Core: Change over time - remove ‘same day last month’ by @m1n0 in #1648
* Core: Failed rows exclude columns by @m1n0 in #1657
* Core: Introduce http sampler by @vijaykiran in #1665
* Core: Modify Test Column Names by @tdstark in #1652
* Cloud: Do not send null file ref, when failed rows are disabled by @vijaykiran in #1650
* Scientific feat: Allow use of in-check filters for distribution checks by @tituskx in #1655
* Trino: Update trino\_data\_source.py by @ScottAtDisney in #1658
* MS SQL Server: Change count to big\_count by @vijaykiran in #1660

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] General availability release

<sup>26 October 2022</sup>

This release marks the general availbility of the Soda Agent.\
Access [Soda Agent documentation](https://docs.soda.io/soda-agent/deploy.html) for details.

***

### \[soda-cloud] Soda Cloud self-serve features, GA

<sup>26 October 2022</sup>

Introducing the general availability of the new self-serve features in Soda Cloud.

* [Deploy a Soda Agent](https://docs.soda.io/soda-agent/deploy.html)
* [Add a data source in Soda Cloud](https://docs.soda.io/soda-agent/deploy.html#add-a-new-data-source)
* [Create an agreement](https://docs.soda.io/soda-cl/soda-cl-overview.html#define-sodacl-checks)

Note that with this launch, all documentation now refers to “checks” as the replacement for “monitors” in Soda Cloud. Refer to [Glossary](https://docs.soda.io/soda/glossary.html) for details.

***

### \[soda-core] 3.0.11

<sup>19 October 2022</sup>

### New features <a href="#new-features" id="new-features"></a>

* Cloud: Change over time - add same day/month support by @m1n0 in #1645
* Core: Verify data source connection command by @m1n0 in #1636

### Enhancements and bug fixes <a href="#enhancements-and-bug-fixes" id="enhancements-and-bug-fixes"></a>

* Core: Parse cli variables correctly, fix cli tests to actually assert result. by @m1n0 in #1634
* Core: variable substitution in schema check query by @ceyhunkerti in #1628
* Redshift: use SVV\_COLUMNS to get table metadata by @m1n0 in #1635
* Scientific: fix: limit the bin size and handle zero division for continious DRO by @baturayo in #1624
* Scientific: fix: handle DRO generation for columns with 0 rows by @baturayo in #1627
* Scientific: chore: pin prophet to >=1.1 by @bastienboutonnet in #1629
* Scientific: refactor: add bins and weights doc link to DRO exception handling logs by @baturayo in #1633
* Scientific: (anomaly\_check): only send outcomeReasons with severity “warn” or “error” by @tituskx in #1640
* Snowflake: use upper case in table metadata query by @m1n0 in #1639
* Trino: fix py310 type hints by @m1n0 in #1641
* BiQuery: fixing bq separate compute storage project by @thiagodeschamps in #1638
* BiQuery: fix distribution check by @m1n0 in #1647

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Customizable failed rows and samples

<sup>18 October 2022</sup>

Introducing the ability to prevent Soda Cloud from receiving any sample data or failed row samples for any datasets in any data sources to which you have connected your Soda Cloud account.

Alternatively, learn how to reroute sample data and failed row samples to a secure location within your organization’s infrastructure, such as an Amazon S3 bucket.

***

### \[soda-core] 3.0.10

<sup>05 October 2022</sup>

### New features <a href="#new-features" id="new-features"></a>

* Dremio: First version of Dremio support by @vijaykiran in #1618
* Core: Sample size is configurable for all failed row checks by @m1n0 in #1608

### Enhancements and bug fixes <a href="#enhancements-and-bug-fixes" id="enhancements-and-bug-fixes"></a>

* Core: Skip change over time checks when historical measurements not available by @m1n0 in #1615
* Core: Include psycopg2 requirement for redshift by @m1n0 in #1620
* Core: Use correct dicts when building scan result by @m1n0 in #1612
* Cloud/dbt: Add Check source field for cloud by @m1n0 in #1614
* Scientific feat: check historical metrics are not None or log helpful message by @bastienboutonnet in #1600
* Scientific fix: handle very large bin sizes by filtering out outliers for dro generation by @baturayo in #1616
* Scientific fix: ensure PSI and SWD can deal with decimal.Decimal type by @tituskx in #1611

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.9

<sup>28 September 2022</sup>

### Enhancements and bug fixes <a href="#enhancements-and-bug-fixes" id="enhancements-and-bug-fixes"></a>

* Limit failed rows sample limit to 1000 by @m1n0 in #1599
* Add scan result getter by @m1n0 in #1602
* BigQuery separate project for compute and storage. by @m1n0 in #1598
* Scan results file argument by @vijaykiran in #1603
* Chore/move snowflake account by @jmarien in #1607
* Use filename in check identity by @m1n0 in #1606

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

### Troubleshoot <a href="#troubleshoot" id="troubleshoot"></a>

**Problem:** When you run a scan using Soda Core 3.0.9, you get an error message that reads, `from google.protobuf.pyext import _message ImportError: dlopen(.../site-packages/google/protobuf/pyext/_message.cpython-310-darwin.so, 0x0002): symbol not found in flat namespace`

**Solution:** This is the result of a transitive dependency from open telemetry that gathers OSS usage statistics. To resolve:

1. From the command-line, in the directory in which you installed your soda-core package, run `pip uninistall protobuf`.
2. Reinstall protobuf with the command `pip install protobuf==3.19.4`.

***

### \[soda-cloud] MS Teams integration

<sup>23 September 2022</sup>

Soda Cloud provides a built-in way to integration with Microsoft Teams so you can send alert notifications or incident events to MS Teams.

Read more in [Integrate with Microsoft Teams](https://docs.soda.io/soda/integrate-msteams.html).

***

### \[soda-core] 3.0.8

<sup>22 September 2022</sup>

* Soda Core: Add variable resolution to queries/thresholds @vijaykiran in #1597
* Soda Core: Scan results dict API method by @m1n0 in #1595
* Soda Core: Minor edits to CLI help messages. by @janet-can in #1590
* Soda Cloud: Fix change-over-time checks with percentage with no extra config by @m1n0 in #1592
* Soda Cloud: Prevent empty message in outcomeReasons by @bastienboutonnet in #1596
* Soda Scientific: Raise more user-friendly log messages when importing sci library fails by @bastienboutonnet in #1584
* dbt: Fix sending correct table name to Soda Cloud @vijaykiran in #1587
* BigQuery: Add context authentication and impersonation for BigQuery by @tooobsias in #1588
* SQLServer: Basic Sqlserver regex support by @m1n0 in #1586
* MySQL/MariaDB: Fix mysql/mariadb compatibility for regex by @vijaykiran in #1591

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.7

<sup>13 September 2022</sup>

* Core: Update freshness value to be milliseconds and add measure by @vijaykiran in #1575
* Core: Resolve variables in user defined queries by @vijaykiran in #1577
* dbt: Add configurable API URL for dbt cloud by @vijaykiran in #1576
* dbt: Add `dbt:` prefix to dbt check results in Soda Cloud by @vijaykiran in #1574
* dbt: Fix dbt cloud ingest, improve logging. by @m1n0 in #1578
* dbt: Fix dbt checks not being sent properly to Soda Cloud by @vijaykiran in #1580
* MySQL: Fixed port option a @ScottAtDisney in #1579
* MySQL: Fix regex tests for mysql by @vijaykiran in #1583

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Webhooks and deletions

<sup>12 September 2022</sup>

Soda Cloud introduces two new features:

* Configure a [webhook](https://docs.soda.io/soda/integrate-webhooks.html) in Soda Cloud to send alert notifications or incident updates to a third-party tool such as Jira, ServiceNow, PagerDuty and more.
* Clean up and organize your Soda Cloud account by deleting stale or unused resources such as old datasets. You can bulk delete your old resources.

***

### \[soda-core] 3.0.6

<sup>07 September 2022</sup>

* Fixed: add identityB to add datasource name in identity by @vijaykiran in #1556
* Databricks SQL support by @vijaykiran in #1559
* Added application flag to snowflake connect by @tombaeyens in #1561
* Added identites by @vijaykiran in #1569
* Added support for custom sampler by @vijaykiran in #1570
* Handle numerical column/table names by @m1n0 in #1572
* dbt ingestion support by @m1n0 in #1552

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.5

<sup>24 August 2022</sup>

**New features**

* Support for Trino data source by @ScottAtDisney in #1553

**Enhancements and bug fixes**

* Fix ‘missing format’ in numeric metrics by @m1n0 in #1549
* Fix duplicate query by @m1n0 in #1543
* Refactor: turn no matching table error into a warning to avoid scan failing when all tables are excluded by @bastienboutonnet in #1533
* Add comments explaining cloud payload by @m1n0 in #1545
* Add data source contributing docs by @m1n0 in #1546
* Feature, profiling: add support for extra numeric and text datatypes by @bastienboutonnet in #1534
* Change spark installation to decouple dependencies for Hive and ODBC by @vijaykiran in #1554 [Read more](https://docs.soda.io/soda/connect-spark.html) about installing the dependencies separately, as needed.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.4

<sup>10 August 2022</sup>

* Testing switch to 22.04 for GA by @jmarien in #1521
* Log and trace Soda Cloud trace IDs by @m1n0 in #1520
* Update docker image for sqlserver support by @vijaykiran in #1522
* Add option to set scan datatime by @vijaykiran in #1531
* Add MySQL Support by @vijaykiran in #1526

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[reporting-api] 0.3.0

<sup>28 July 2022</sup>

#### Deprecations <a href="#deprecations" id="deprecations"></a>

* The `datasets` endpoint will not return the `is_deleted` on any of the dataset records as this field has been deprecated by the backend and was never a good indicator of dataset deletion due to hard-deletes.

***

### \[soda-core] 3.0.3

<sup>27 July 2022</sup>

**New Features**

* MS SQLServer support by @vijaykiran in #1515
* IBM DB2 support

**Bug Fixes**

* Fix: better logging messages for profiling and discover datasets by @baturayo in #1498
* Fix config file creation when first path is not writable by @m1n0 in #1504
* fix: Failed rows don’t consider filter by @vijaykiran in #1505
* Fix log message by @m1n0 in #1507
* Fix reference check for null values in source column by @m1n0 in #1509
* Attach sample rows to reference check by @m1n0 in #1508
* Make sure results to sodacloud are sent when there is an exception by @vijaykiran in #1510
* Fix for regex on collated columns in Snowflake by @ScottAtDisney in #1516

**Enhancements**

* Check name refactor by @m1n0 in #1502
* Set basic telemetry scan data even in case of exceptions by @m1n0 in #1512
* Improve athena text fixture auth setup by @m1n0 in #1501
* Publish data source packages for python 3.7 by @m1n0 in #1514
* Inform about wrong check indentation in logs by @m1n0 in #1517
* Feat: skip row count query during column profiling by @bastienboutonnet in #1518
* Feat: support ‘text’ data type in column profiling by @bastienboutonnet in #1519

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Dataset and column profiling

<sup>20 July 2022</sup>

Released the discover datasets and/or profile columns configurations to send information about datasets and columns to Soda Cloud. Examine the profile information to gain insight into the type checks you can prepare to test for data quality.

Read more in [Display profile information in Soda Cloud](https://docs.soda.io/soda-cl/profile.html).

***

### \[soda-cloud] Automated monitoring

<sup>20 July 2022</sup>

When connecting a data source to your Soda Cloud account, you can add automated monitoring checks to instruct Soda to automatically check for row count anomalies and schema changes in datasets.

Read more in [Automated monitoring checks](https://docs.soda.io/soda-cl/automated-monitoring.html).

***

### \[soda-core] 3.0.2

<sup>18 July 2022</sup>

**Enhancements and New Features**

* IBM db2 support
* Support cli –version to output core version
* Warn users when quotes are present in include excludes identifiers
* Add samples limit to failed rows checks
* BQ expose remaining client params and auth methods
* Enable Snowflake Tokens
* Treat zero missing or invalid rows as zero percent

**Bug Fixes**

* Make name optional for failed rows
* Use exception rather than exc\_info to render traceback in soda-core logger’s call of prophet model
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

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-agent] Preview release

<sup>06 July 2022</sup>

This release marks the initial, preview release of the Soda Agent.\
Access [Soda Agent documentation](https://docs.soda.io/soda-agent/deploy.html) for details.

***

### \[soda-cloud] Soda Cloud self-serve features, preview

<sup>04 July 2022</sup>

Introducing the preview availability of the new self-serve features in Soda Cloud.

Contact [support@soda.io](mailto:support@soda.io) to request a demo or preview access to experiment with the latest and greatest.

* Deploy a Soda Agent
* Add a data source in Soda Cloud
* Create an agreement

Note that with this launch, all documentation now refers to “checks” as the replacement for “monitors” in Soda Cloud. Refer to [Glossary](https://docs.soda.io/soda/glossary.html) for details.

***

### \[soda-core] 3.0.1

<sup>29 June 2022</sup>

* Re-introduce Spark for the Docker image by @jmarien in #1458
* Build: require strict prophet v1.0.0 in scientific library by @bastienboutonnet in #1459
* Comment for pinned prophet version by @m1n0 in #1460
* Fix the e parameter by @jmarien in #1461

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Default responsibility for dataset owner

<sup>29 June 2022</sup>

For datasets that are newly added to Soda Cloud, Soda Admins can define the default responsibility given to the data owner, either **Manager** or **Editor**.

Read more in [Roles and Rights in Soda Cloud](https://docs.soda.io/soda-cloud/roles-global.html).

***

### \[soda-core] 3.0.0

<sup>28 June 2022</sup>

This is the general availability release for Soda Core with Soda CL.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0rc3 Beta

<sup>27 June 2022</sup>

* Doc: add comment about ordinal\_position ordering by @bastienboutonnet in #1428
* Refactor: use filesystem abstractions in distribution check by @baturayo in #1423
* Fix: distribution check athena compatibility by @bastienboutonnet in #1429
* Feat: profile and discover view tables by @baturayo in #1416
* Code style section in contrib docs by @m1n0 in #1432
* Unify data source api, remove redundant code. by @m1n0 in #1433
* Fix: support athena in column profiling by @bastienboutonnet in #1430
* Column profiling metadata fix by @tombaeyens in #1431
* Feat: Support profile columns inclusion/exclusion behaviour for Spark by @baturayo in #1437
* CORE-63 Added relative percentage change over time by @tombaeyens in #1435
* Feat: Raise a MissingBinsAndWeights exception if soda scan runs without distribution\_reference present by @tituskx in #1421
* Flatten data source configuration schema by @m1n0 in #1441
* Fix: Suppress prophet’s pandas: frame.append deprecation warning by @tituskx in #1440
* Feat: send outcome reason to cloud for anomaly detection and schema checks by @baturayo in #1390
* Add private key and other extra params to snowflake by @m1n0 in #1446
* Feat: refer to DROs by name by @tituskx in #1422
* Change: rename the update command to update-dro as it better describes what the command is used for by @tituskx in #1444
* Feat/fix: ensure empty bins for integer columns are not created and fix bin width derivation by @baturayo in #1447
* Do not quote table names in for-each block by @m1n0 in #1449
* Feat: add env based option to run tests on views by @vijaykiran in #1442

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0rc2 Beta

<sup>22 June 2022</sup>

* feat: add wasserstein distance and PSI methods to distribution checks by @tituskx in #1395
* CORE-24 New freshness syntax by @tombaeyens in #1400
* Verify that in spark-df arrays & structs don’t break anything by @tombaeyens in #1397
* feat: add column exclusion to profile columns by @bastienboutonnet in #1396
* feat: log no threshold error during parsing and provide more informative error during check summary by @tituskx in #1401
* CORE-44 Fixed some extra timestamps to utc by @tombaeyens in #1405
* \[pre-commit.ci] pre-commit autoupdate by @pre-commit-ci in #1407
* SODA-23 table dataset rename by @tombaeyens in #1404
* feat: send distribution check results to cloud so that they can be plotted by @tituskx in #1402
* Update README to include support for Amazon Athena by @stuart-robinson in #1409
* refactor: Refactor scan.py to remove code duplicates by @baturayo in #1391
* Update CONTRIBUTING to stipulate that users fork the repo. by @janet-can in #1413
* Core 70 clean test schemas by @tombaeyens in #1415
* fix: hotfix for historic measurements having none values by @baturayo in #1418
* CORE-26 Fix change over time results value parsing by @vijaykiran in #1419
* CORE-57 improved exception handling when creating data source by @tombaeyens in #1411
* Another approach for the Docker image for Soda Core by @jmarien in #1398
* Added 5 random chars to CI schema names by @tombaeyens in #1424
* Fix drop table statement in test suite by @m1n0 in #1425
* SODA-44 Added Z to timestamps in soda cloud json by @tombaeyens in #1408
* Added docs on running tests by @tombaeyens in #1426
* Fix schema check title by @vijaykiran in #1427
* fix: more useful profiling warnings by @bastienboutonnet in #1420
* CORE-37 Fixed schema type comparison for BigQuery by @tombaeyens in #1410

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0rc1 Beta

<sup>08 June 2022</sup>

* 1175 spark by @m1n0 in #1382

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0b19 Beta

<sup>02 June 2022</sup>

* fix: handle %.% in profile columns properly and other bugs by @bastienboutonnet in #1377
* Fix: cope with cloud disabled samples. by @m1n0 in #1393
* BQ: regex switch to ‘r’ instead of backslash escaping by @m1n0 in #1394

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0b18 Beta

<sup>01 June 2022</sup>

* Scientific package tests on Athena. by @m1n0 in #1374
* Update OT with scan/check counts by @vijaykiran in #1386
* feat: add ability to send dataset samples to soda cloud (SODA-284) by @baturayo in #1372
* fix: typo in data source package import by @bastienboutonnet in #1387
* 627 Added default sampler returning a sample that is is not persistent by @tombaeyens in #1385
* feat: cap distribution check to 1M rows by default by @tituskx in #1379
* refactor: clean up logging for anomaly detection by @bastienboutonnet in #1389
* fix: avoid parsing DRO name in distribution check until fully implemented by @bastienboutonnet in #1388
* Downgrade markupsafe dependency by @m1n0 in #1392

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0b17 Beta

<sup>26 May 2022</sup>

* Pin versions in core by @vijaykiran in #1383

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0b16 Beta

<sup>26 May 2022</sup>

* Fixing suffix scanning of configuration and check files by @tombaeyens in #1365
* Refactored to actual table and actual column names by @tombaeyens in #1370
* Send Soda Cloud logs by @tombaeyens in #1380
* Prevent upload when no sample rows are present by @tombaeyens in #1378
* refactor: inform when columns are skipped in profiling via logs by @bastienboutonnet in #1375

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0b15 Beta

<sup>23 May 2022</sup>

* refactor: remove darts dependency by @bastienboutonnet in #1362
* refactor: remove code duplication in sodacl\_parser by @baturayo in #1361
* SODA-248 fixed change over time checks by @tombaeyens in #1366
* Athena support by @m1n0 in #1367
* Added for each schema check by @tombaeyens in #1368

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0b14 Beta

<sup>19 May 2022</sup>

* Add defaultDataSource to cloud payload by @vijaykiran in #1359
* fix: provide docker image with soda-scientific packaged by @bastienboutonnet in #1355
* Fixing data source validity error message by @tombaeyens in #1357
* Added cython to the setup.py file by @tituskx in #1360
* \#1353 SODA-494 Fixing recursive loading of files by @tombaeyens in #1356

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0b13 Beta

<sup>18 May 2022</sup>

* 1237 samples2 by @tombaeyens in #1340
* Getting disable samples from cloud config by @tombaeyens in #1348
* Test anomaly detection for numeric metrics by @baturayo in #1349
* Updated contributing, fixed logs and added hint in comment how to add… by @tombaeyens in #1350
* Fix: Automated monitoring revert issues SODA-489 by @baturayo in #1351
* Soda 159 - Test anomaly detection for nested metrics by @baturayo in #1354

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.0b12 Beta

<sup>16 May 2022</sup>

* Fix date eu/us formats. by @m1n0 in #1334
* 1237 samples by @tombaeyens in #1328
* feat: column profiling by @bastienboutonnet in #1322
* Switch to latest prophet by @vijaykiran in #1335
* throw log error and return empty string if histogram assumption broken by @bastienboutonnet in #1337
* Freshness send microseconds to cloud. by @m1n0 in #1338
* Cloud: timestamps use seconds resolution by @m1n0 in #1339
* Deleted docs folder by @tombaeyens in #1343
* feat: implement automated monitoring executor/runner by @baturayo in #1323
* feat: add table discovery by @bastienboutonnet in #1341
* fix(profiling): allow null results in text column aggregates by @bastienboutonnet in #1344
* Fix: update check identity in case of automated monitoring by @baturayo in #1346

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-cloud] Display dataset for each Monitor Result

<sup>06 May 2022</sup>

In the [**Monitors**](https://cloud.soda.io/monitors) dashboard, the table of **Monitor Results** now includes the name of the dataset to which each monitor is associated.

[![Dataset names in Monitor Results](https://docs.soda.io/assets/images/monitor-results-dataset.png)](https://docs.soda.io/assets/images/monitor-results-dataset.png)

***

### \[soda-cloud] Dataset health indicators

<sup>29 April 2022</sup>

Soda Cloud introduces a new feature that enables you to gauge a dataset’s overall health using graphic indicators. Accces a set of three indicators in the **Dashboards** tab of the **Datasets** dashboard to see:

* the volume of monitors associated with the dataset(s)
* a chart that offers insight into the number of failed monitor results over time for the dataset(s)
* the volume of recent Incidents associated with the dataset(s)

Use the health indicators to prioritize your work in ameliorating the quality of data in datasets that need improvement.

***

### \[reporting-api] 0.2.2

<sup>21 April 2022</sup>

#### Features <a href="#features" id="features"></a>

* The `datasets` endpoint now provides `creator_info` and `owner_info` along with `number_of_rows`.

***

### \[reporting-api] 0.2.1

<sup>19 April 2022</sup>

#### Features <a href="#features" id="features"></a>

* The reporting API now accepts Soda Cloud’s API keys via headers `API_KEY_ID` and `API_KEY_SECRET` to allow users with SSO to use the API.

***

### \[reporting-api] 0.2.0

<sup>01 April 2022</sup>

#### Features <a href="#features" id="features"></a>

* Users must now query the `tests_and_results` endpoint with a single `dataset_id`. Documentation reflects this to users and the API throws the errors.
* Users must now query the `dataset_health` endpoint with a single `dataset_id`. Documentation reflect this to users the API throws the errors.

#### Miscellaneous <a href="#miscellaneous" id="miscellaneous"></a>

* Endpoint usage is now tracked in segment. Every time you send a query to any of the end points, the Reporting API pushes an event that contains the following information:
  * user\_id
  * organization\_id
  * endpoint\_name
  * environment

***

### \[soda-core] 0.0.1 Beta

<sup>22 March 2022</sup>

This release marks the launch, or first beta release, of **Soda Core** and **Soda Checks Language**.

Reference the [Soda Core OSS](https://docs.soda.io/soda-core/overview.html) and [SodaCL](https://docs.soda.io/soda-cl/soda-cl-overview.html) documentation for information on how to use the new CLI tool and domain-specific language for reliability.

***

### \[soda-cloud] Attributes and filtering

<sup>10 February 2022</sup>

Organize great volumes of datasets in your Soda Cloud account using [attributes and tags](https://docs.soda.io/soda-cloud/organize-datasets.html). Coupled with the new feature that enables you to apply filters to the Datasets dashboard, you can more easily access the data quality information you’re looking for.

***

### \[soda-cloud] Change default access settings for datasets

<sup>12 January 2022</sup>

Change the default access settings for new datasets in to Soda Cloud. Access the Change the default access to datasets section in our documentation to learn more.

***

### \[soda-cloud] Integrate dbt with Soda

<sup>16 December 2021</sup>

Review dbt test results from within the Soda Cloud UI. Access the documentation to learn how to integrate [Soda with dbt](https://docs.soda.io/soda/integrate-dbt.html).

***

### \[soda-cloud] Incidents

<sup>14 December 2021</sup>

Create an Incident in Soda Cloud to track your team’s investgation and resolution of a data quality issue. Use an Incident’s built-in ability to create an incident-specific Slack channel where you and your team can collaborate on the issue investigation.

See [Create and track incidents](https://docs.soda.io/soda-cloud/incidents.html) for details.

***

### \[soda-cloud] Integrate Soda with Metaphor

<sup>13 December 2021</sup>

Review Soda data quality information from within the Metaphor catalog UI. Access the documentation to learn how to integrate [Soda with Metaphor](https://docs.soda.io/soda/integrate-metaphor.html).

***

### \[soda-cloud] Audit Trail in Soda Cloud

<sup>06 December 2021</sup>

, you can download an Audit Trail that records the activities of all of the users in your Soda Cloud account. Read the [Download an audit trail docs](https://docs.soda.io/soda-cloud/roles-global.html#access-an-audit-trail) to learn more.

***

### \[soda-cloud] Reporting API

<sup>23 November 2021</sup>

Introducing Soda Cloud Reporting API v0. This API enables you and your team to access Soda Cloud data to build reporting dashboards that share information about:

* Soda Cloud adoption throughout your organization
* test and monitor result status
* dataset test coverage, and dataset health

Access the [Soda Cloud Reporting API](https://docs.soda.io/api-docs/reporting-api-v1.html) documentation to learn more. Read the [step-by-step guide](https://docs.soda.io/api-docs/reporting-api-to-overview-dashboards.html) to learn how to build your own reporting dashboard.

***

### \[soda-cloud] Remove Add datasets feature

<sup>25 October 2021</sup>

Soda Cloud no longer offers the feature to Add datasets directly in Soda Cloud. Instead, users add datasets using Soda SQL. With the removal of this feature, users can no longer:

* edit data source connection details in Soda Cloud
* define data source or dataset scan schedules in Soda Cloud
* set time-partitioning parameters for scheduled scans

***

### \[soda-cloud] Schema Evolution Monitor in Soda Cloud

<sup>14 October 2021</sup>

New Schema Evolution monitor is now available in Soda Cloud.

***

### \[soda-cloud] Roles and rights in Soda Cloud

<sup>30 September 2021</sup>

Role-based user access control support is now available for Soda Cloud. Read the Roles and rights docs to learn more.

***

### \[soda-cloud] Single sign-on (SSO) with Soda Cloud

<sup>28 September 2021</sup>

Single sign-on support is now available for Soda Cloud with SAML 2.0 Identity Providers (IdP), Okta and Azure AD. Contact [Soda Support](mailto:support@soda.io) to set up Soda Cloud as a service provider in your SSO IdP so that users in your organization must log in to Soda Cloud via the IdP. Read the [Single sign-on docs](https://docs.soda.io/soda-cloud/sso.html) to learn more about activating and using SSO with Soda Cloud.
