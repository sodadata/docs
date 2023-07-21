---
name: "1.0.3 & 1.0.4"
date: 2023-07-21
products:
  - soda-library
---

## Fixes and features

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
* [sqlserver] fix port configuration by @vijaykiran in #50
* Set metric for failed rows check by @m1n0 in #48
* Block soda suggest if cloud config is missing by @m1n0 in #51
* Fix templates for failed rows by @vijaykiran in #53
* Introduce schema_name property for schema checks by @vijaykiran in #54
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
* TRINO: add http_headers option by @vijaykiran in #35
* HIVE: add configuration parameters by @vijaykiran in #36
* CLOUD-3861 pass scanType with cicd option by @gregkaczan in #34

Refer to the <a href="https://github.com/sodadata/soda-library/releases" target="_blank">Soda Library Release Notes </a> for details.