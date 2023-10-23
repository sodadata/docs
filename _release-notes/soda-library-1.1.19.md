---
name: "1.1.19"
date: 2023-10-23
products:
  - soda-library
---

## Fixes and features

* Fix: compute value counts in DB rather than in python for categoric distribution checks by @baturayo in #116
* Run scientific unit tests in CI by @baturayo in #121
* Raise a warning instead of exception when dataset name is incorrect in suggestions by @baturayo in #126
* Add support for custom dask data source name by @dirkgroenen in #120