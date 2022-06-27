---
name: "3.0.0rc3 Beta"
date: 2022-06-27
products:
  - soda-core
---

* Doc: add comment about ordinal_position ordering by @bastienboutonnet in #1428
* Refactor: use filesystem abstractions in distribution check by @baturayo in #1423
* Fix: distribution check athena compatibility by @bastienboutonnet in #1429
* Feat: profile and discover view tables by @baturayo in #1416
* Code style section in contrib docs by @m1n0 in #1432
* Unify data source api, remove redundant code. by @m1n0 in #1433
* Fix: support athena in column profiling by @bastienboutonnet in #1430
* Column profiling metadata fix by @tombaeyens in #1431
* Feat: Support profile columns inclusion/exclusion behaviour for Spark by @baturayo in #1437
* CORE-63 Added relative percentage change over time by @tombaeyens in #1435
* Feat: Raise a MissingBinsAndWeights exception if soda scan runs without distribution_reference present by @tituskx in #1421
* Flatten data source configuration schema by @m1n0 in #1441
* Fix: Suppress prophet's pandas: frame.append deprecation warning by @tituskx in #1440
* Feat: send outcome reason to cloud for anomaly detection and schema checks by @baturayo in #1390
* Add private key and other extra params to snowflake by @m1n0 in #1446
* Feat: refer to DROs by name by @tituskx in #1422
* Change: rename the update command to update-dro as it better describes what the command is used for by @tituskx in #1444
* Feat/fix: ensure empty bins for integer columns are not created and fix bin width derivation by @baturayo in #1447
* Do not quote table names in for-each block by @m1n0 in #1449
* Feat: add env based option to run tests on views by @vijaykiran in #1442


Refer to the <a href="https://github.com/sodadata/soda-core/releases" target="_blank">Soda Core Release Notes </a> for details.