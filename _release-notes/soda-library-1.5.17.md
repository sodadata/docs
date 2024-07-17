---
name: "1.5.17"
date: 2024-07-17
products:
  - soda-library
---

## 1.5.17 Fixes

* Reconciliation: support custom source/target query with deepdiff strategy by @jzalucki in #269
* Observability: apply 1M rows limit with time partition. by @jzalucki in #270
* Snowflake: support custom hostname and port (#2109) by @m1n0 in #271
* Add sslmode support to postgres and denodo (#2066) by @m1n0 in #273
* Add Scan Context to read/write data from/to a scan (#2134) by @m1n0 in #272
* Better user provided queries sanitize. (#2131) by @jzalucki in #275
