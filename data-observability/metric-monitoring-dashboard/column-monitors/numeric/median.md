# Median

{% hint style="warning" %}
This metric is not supported in MySQL.
{% endhint %}

### Definition

Quartiles divide all non-NULL values in the column within the latest partition into four equal parts based on value: Q2 represents the 50th percentile, that is, the median.

### Source

data (numeric)

### Computation

* For data sources supporting exact percentiles (e.g. PostgreSQL’s `PERCENTILE_DISC(0.5)`), Soda uses that function.
* For data sources that provide approximations (such as BigQuery, SQLServer, Redshift and Trino), Soda uses those approximated values.
