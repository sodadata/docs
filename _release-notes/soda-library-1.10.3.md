# 1.10.3 Features and Fixes

* Skip databricks history until table creation by @mivds in #482
* Fix backfilling when there is no partition column by @mivds in #484
* Fix incorrect row count for `REPLACE TABLE` by @mivds in #483
* Fix 1-interval offset for table creation history by @mivds in #485
* Use partition column suggestions from soda cloud by @mivds in #481
* Limit `partition_row_count` metric to data range by @mivds in #487
* Set `numba` log level to `WARNING` by @mivds in #489
