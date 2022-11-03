---
name: "3.0.11"
date: 2022-10-19
products:
  - soda-core
---

## New features

* Cloud: Change over time - add same day/month support by @m1n0 in #1645
* Core: Verify data source connection command by @m1n0 in #1636

## Enhancements and bug fixes

* Core: Parse cli variables correctly, fix cli tests to actually assert result. by @m1n0 in #1634
* Core: variable substitution in schema check query by @ceyhunkerti in #1628
* Redshift: use SVV_COLUMNS to get table metadata by @m1n0 in #1635
* Scientific: fix: limit the bin size and handle zero division for continious DRO by @baturayo in #1624
* Scientific: fix: handle DRO generation for columns with 0 rows by @baturayo in #1627
* Scientific: chore: pin prophet to >=1.1 by @bastienboutonnet in #1629
* Scientific: refactor: add bins and weights doc link to DRO exception handling logs by @baturayo in #1633
* Scientific: (anomaly_check): only send outcomeReasons with severity “warn” or “error” by @tituskx in #1640
* Snowflake: use upper case in table metadata query by @m1n0 in #1639
* Trino: fix py310 type hints by @m1n0 in #1641
* BiQuery: fixing bq separate compute storage project by @thiagodeschamps in #1638
* BiQuery:  fix distribution check by @m1n0 in #1647

Refer to the <a href="https://github.com/sodadata/soda-core/releases" target="_blank">Soda Core Release Notes </a> for details.

