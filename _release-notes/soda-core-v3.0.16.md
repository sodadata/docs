---
name: "3.0.16"
date: 2022-12-15
products:
  - soda-core
---

## Features and fixes

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


Refer to the <a href="https://github.com/sodadata/soda-core/releases" target="_blank">Soda Core Release Notes </a> for details.