# soda-core-v3.0.10

### New features

* Dremio: First version of Dremio support by @vijaykiran in #1618
* Core: Sample size is configurable for all failed row checks by @m1n0 in #1608

### Enhancements and bug fixes

* Core: Skip change over time checks when historical measurements not available by @m1n0 in #1615
* Core: Include psycopg2 requirement for redshift by @m1n0 in #1620
* Core: Use correct dicts when building scan result by @m1n0 in #1612
* Cloud/dbt: Add Check source field for cloud by @m1n0 in #1614
* Scientific feat: check historical metrics are not None or log helpful message by @bastienboutonnet in #1600
* Scientific fix: handle very large bin sizes by filtering out outliers for dro generation by @baturayo in #1616
* Scientific fix: ensure PSI and SWD can deal with decimal.Decimal type by @tituskx in #1611

Refer to the [Soda Core Release Notes ](https://github.com/sodadata/soda-core/releases)for details.
