# 1.5.22 Fixes

* Observability: minimize metadata retrieval, do not push data into dis… by @m1n0 in #282
* Handle SQL exception nicely for failed rows and user-defined check. by @jzalucki in #286
* Spark: send discovery data despite errors. by @jzalucki in #290
* Quote column names during observability partition detection. by @jzalucki in #288
* Spark: failed rows should not be limited to max 100 total results. by @jzalucki in #292
