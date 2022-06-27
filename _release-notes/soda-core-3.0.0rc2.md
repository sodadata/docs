---
name: "3.0.0rc2 Beta"
date: 2022-06-22
products:
  - soda-core
---

* feat: add wasserstein distance and PSI methods to distribution checks by @tituskx in #1395
* CORE-24 New freshness syntax by @tombaeyens in #1400
* Verify that in spark-df arrays & structs don't break anything by @tombaeyens in #1397
* feat: add column exclusion to profile columns by @bastienboutonnet in #1396
* feat: log no threshold error during parsing and provide more informative error during check summary by @tituskx in #1401
* CORE-44 Fixed some extra timestamps to utc by @tombaeyens in #1405
* [pre-commit.ci] pre-commit autoupdate by @pre-commit-ci in #1407
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

Refer to the <a href="https://github.com/sodadata/soda-core/releases" target="_blank">Soda Core Release Notes </a> for details.