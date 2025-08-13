# soda-core-v3.0.5

**New features**

* Support for Trino data source by @ScottAtDisney in #1553

**Enhancements and bug fixes**

* Fix ‘missing format’ in numeric metrics by @m1n0 in #1549
* Fix duplicate query by @m1n0 in #1543
* Refactor: turn no matching table error into a warning to avoid scan failing when all tables are excluded by @bastienboutonnet in #1533
* Add comments explaining cloud payload by @m1n0 in #1545
* Add data source contributing docs by @m1n0 in #1546
* Feature, profiling: add support for extra numeric and text datatypes by @bastienboutonnet in #1534
* Change spark installation to decouple dependencies for Hive and ODBC by @vijaykiran in #1554 \[Read more]\() about installing the dependencies separately, as needed.

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.
