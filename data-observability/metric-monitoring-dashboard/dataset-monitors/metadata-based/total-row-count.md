# Total row count

### Definition

The total number of rows in the dataset at scan time.

### Source

metadata

### Computation

Through the row count value provided by the metadata, which is calculated differently for every database.

{% hint style="info" %}
For example:

In Oracle, the total row count is calculated by doing a `count(*)`. As in Oracle, this is not available by default.

BigQuery, on the other hand, provides metadata information through the `INFORMATION_SCHEMA.TABLE_STORAGE` metadata table. Specifically, Soda uses the `total_rows` column from that table.
{% endhint %}
