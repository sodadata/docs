# Query based

These monitors require executing queries against the data itself to surface usage and content recency patterns, for example:

* [**Most recent timestamp**](most-recent-timestamp-dataset.md): the latest event or ingestion time across all rows
* [**Partition row count**](partition-row-count.md): the number of records within the current partition (e.g. today’s data)

Query-based monitors give you a window into data flow and freshness, helping detect lags in ingestion pipelines or staleness in source systems.
