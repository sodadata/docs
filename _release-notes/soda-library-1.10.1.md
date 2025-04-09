---
name: "1.10.1"
date: 2025-03-31
products:
  - soda-library
---

## 1.10.1 Features and Fixes
* Relax numpy requirement to < 3.0.0 by @adkinsty in #453
* Oracle: add schema to dataset prefix, support custom prefix by @m1n0 in #460
* Redshift: add keepalive by @m1n0 in #480
* Group by: apply global attributes by @m1n0 in #475

### Metric Monitoring
* Enable checking for column addition by @mivds in #462
* Report metadata metrics using query time by @mivds in #461
* Fix schema filter in snowflake metadata query by @mivds in #463
* Fall back to default userConfig if not available by @mivds in #465
* Update metric monitoring check names by @mivds in #467
* Limit generation of userConfig missing warning by @mivds in #466
* Inform user when metadata is not available by @mivds in #470
* Fix backfilling scan with no data in date range by @mivds in #469
* Fix warning when there are no matching tables by @mivds in #471
* Fix backfilling missing partition row count by @mivds in #472
* Fix backfilling for 'most recent timestamp' metric by @mivds in #476
* Rename partition row count by @mivds in #479
* Fix handling of partition column as datetime by @mivds in #478
* Alert on lower threshold for time metrics by @mivds in #477
* updating algorithm's use of feedback by @nikosml in #468
* Add rounding and more algorithm testing by @nikosml in #464