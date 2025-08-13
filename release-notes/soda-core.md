---
description: >-
  Review release notes for Soda Core, an open-source tool for testing and
  monitoring data quality.
---

# Release notes for Soda Core

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

### \[soda-core] 3.4.4

<sup>07 January 2025</sup>

### 3.4.4 Features and fixes <a href="#id-344-features-and-fixes" id="id-344-features-and-fixes"></a>

* Remove autoescape from jinja - allow use of special chars in variables. by @jzalucki in #2193
* Add support for numbers in identifier. by @jzalucki in #2197

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.3.13

<sup>29 July 2024</sup>

### 3.3.13 Fixes <a href="#id-3313-fixes" id="id-3313-fixes"></a>

* Always reset logger when new scan instance is created. by @jzalucki in #2136

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.3.12

<sup>18 July 2024</sup>

### 3.3.12 Fixes <a href="#id-3312-fixes" id="id-3312-fixes"></a>

* Scan context: support list keys in getter by @m1n0 in #2135

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.3.10

<sup>08 July 2024</sup>

### 3.3.10 Features and fixes <a href="#id-3310-features-and-fixes" id="id-3310-features-and-fixes"></a>

* Bugfix for the Atlan integration when using soda-core & contracts

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.3.5

<sup>24 May 2024</sup>

### Features and fixes <a href="#features-and-fixes" id="features-and-fixes"></a>

* Failed rows: fix warn/fail thresholds for fail condition by @m1n0 in #2084
* Upgrade to latest version of ibm-db python client by @Antoninj in #2076
* User defined metric check: support fail query by @m1n0 in #2089

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.3.2

<sup>24 April 2024</sup>

### Features and fixes <a href="#features-and-fixes" id="features-and-fixes"></a>

* Rename argument in set\_scan\_results\_file method by @ozgenbaris1 in #2047
* Dremio: support disableCertificateVerification option by @m1n0 in #2049
* Denodo: fix connection timeout attribute by @m1n0 in #2065
* DB2: support security option by @4rahulae in #2063

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.2.3

<sup>05 March 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: implement daily and monthly seasonality to external regressor … by @baturayo in #2027
* Dremio: Fix token support by @m1n0 in #2028

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.1.3

<sup>03 January 2024</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Feature: implement warn\_only for anomaly score (#156) by @baturayo in #1980

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.1.1

<sup>04 December 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Update python api docs by @m1n0 in #1967
* Make custom identity fixed as v4 by @m1n0 in #1968
* Freshness: support in-check filters by @m1n0 in #1970. Documentation to follow shortly.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.1.0

<sup>16 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

Introducing the launch of [data contracts](https://docs.soda.io/soda/data-contracts.html), Soda’s experimental way to set data quality standards for data products.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.0.52 & 3.0.53

<sup>02 November 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Freshness: support mixed thresholds by @m1n0 in #1957
* Add License to every package by @m1n0 in #1958
* Fix: compute value counts in DB rather than in python for categoric d… by @baturayo in #1948
* Feature: Add Dask/Pandas configurable data source naming support by @dirkgroenen in #1951

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.51

<sup>11 October 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Allow specification of virtual file name for add sodacl string by @m1n0 in #1943
* Duckdb: support csv, parquet and json file formats by @PaoloLeonard in #1942
* BigQuery: support job Labels by @data-fool in #1947

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

***

### \[soda-core] 3.0.50

<sup>27 September 2023</sup>

### Fixes and features <a href="#fixes-and-features" id="fixes-and-features"></a>

* Add thresholds and diagnostics to scan result by @m1n0 in #1939
* Fix databricks numeric types profiling by @m1n0 in #1941

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.0.48

<sup>11 August 2023</sup>

### Fixes <a href="#fixes" id="fixes"></a>

* Update docs to include experimental support for soda-core-teradata by @janet-can in #1916
* Remove duckdb constraint by @JCZuurmond in #1921
* Remove Vertica from build by @vijaykiran in #1923
* Fix boolean attributes formatting by @m1n0 in #1925; addresses 400 error in sending results to Soda Cloud that involve checks with a boolean attribute such as a checkbox.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 3.0.1

<sup>29 June 2022</sup>

* Re-introduce Spark for the Docker image by @jmarien in #1458
* Build: require strict prophet v1.0.0 in scientific library by @bastienboutonnet in #1459
* Comment for pinned prophet version by @m1n0 in #1460
* Fix the e parameter by @jmarien in #1461

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.

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

### \[soda-core] 0.0.1 Beta

<sup>22 March 2022</sup>

This release marks the launch, or first beta release, of **Soda Core** and **Soda Checks Language**.

Reference the [Soda Core OSS](https://docs.soda.io/soda-core/overview.html) and [SodaCL](https://docs.soda.io/soda-cl/soda-cl-overview.html) documentation for information on how to use the new CLI tool and domain-specific language for reliability.
