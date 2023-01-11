---
name: "3.0.18"
date: 2023-01-11
products:
  - soda-core
---

## Features and fixes

* Core: apply in-check filters to duplicate check by @m1n0 in #1748
* Core: Deprecate global data source ‘disable_samples’, use one from sampler by @m1n0 in #1749
* Core: Fix for user defined query check failure on zero result by @vijaykiran in #1750
* Core: Remove unused soda_cloud property by @m1n0 in #1753
* Core: Better warning message for invalid check without valid spec by @m1n0 in #1752
* Cloud: Get available check attributes schema using correct cloud api by @m1n0 in #1751
* Cloud: Skip all checks if invalid attributes found by @m1n0 in #1758
* Profiling: Add row count to profiling by @baturayo in #1747
* Dremio: Fix profiling for schemas with . s by @vijaykiran in #1757


Refer to the <a href="https://github.com/sodadata/soda-core/releases" target="_blank">Soda Core Release Notes </a> for details.