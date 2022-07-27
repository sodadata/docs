---
name: "3.0.3"
date: 2022-07-27
products:
  - soda-core
---

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


Refer to the <a href="https://github.com/sodadata/soda-core/releases" target="_blank">Soda Core Release Notes </a> for details.