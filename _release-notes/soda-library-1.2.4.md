---
name: "1.2.4"
date: 2024-01-31
products:
  - soda-library
---

## Fixes and features

* Feature: implement severity level paramaters by @baturayo in #169
* Fix for min_confidence_interval_ratio parameter by @baturayo in #170
* Always use datasource specifis COUNT expression (#2003) by @m1n0 in #172
* Send result to Cloud if data source connection issue by @m1n0 in #171
* CLOUD-6805: avoid sending empty error location when logging configuration file parsing errors by @Antoninj in #173
* CLOUD-6817: Catch Cloud exceptions (failed insertions) properly by @dirkgroenen in #174