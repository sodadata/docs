# 1.6.0 Features and Fixes

* Comparison check: Fix "other" table filter by @jzalucki in #304
* Oracle: Bug fixes by @m1n0 in #260
* Failed rows: Always expose failing sql for failed rows and user defined metric if failing query is available. by @jzalucki in #305
* Failed rows: Add column property to failed rows and user defined metric checks. by @jzalucki in #307
* Failed rows: Templatize rerouted sample message. by @jzalucki in #310
* Observability: Catch issues when orchestrating profiling by @m1n0 in #311
* Observability: Fall back to 1M if partition fails by @m1n0 in #312
* Observability: Set duplicate percentage to None when zero rows in partition by @jzalucki in #301
* Observability: Warn user when 24h partition is empty. by @jzalucki in #306
