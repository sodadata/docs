1. If you have not already done so, [connect Soda SQL to your Soda Cloud account]({% link soda-sql/connect_to_cloud.md %}).
2. Add a `samples` configuration key to your scan YAML file according to the Scan YAML example below; use `table_limit` to define a value that represents the numerical threshold of rows in a dataset that Soda SQL sends to Soda Cloud after it executes a test during a scan. It yields a sample of the data from your dataset in the **Sample Data** tab when you are creating a new monitor; see image above. A sample contains the first *n* number of rows from the dataset, according to the limit you specify.
3. Save the changes to your scan YAML file, then run a scan on that dataset.
```shell
soda scan warehouse.yml/tables/orders.yml
```
4. In your Soda Cloud account, navigate to the **Monitors** dashboard. Click the stacked-dots icon to **Create Monitor**. Note that in the first step of the guided monitor creation, you can review sample data from your dataset that Soda SQL collected during its last scan of your dataset. 

#### Scan YAML Example

```yaml
table_name: orders
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  ...
samples:
  table_limit: 50
tests:
  - row_count > 0
columns:
  orderid:
    valid_format: uuid
    tests:
      - invalid_percentage <= 3
```

Using the example scan YAML above, the scan executes both tests against all the data in the dataset, but it only sends a maximum of 50 rows of data and metadata to Soda Cloud for review as sample data when creating a new monitor for the `orders` dataset.

The snippet below displays the CLI output of the query that counts the rows in the dataset; Soda SQL counts 193 rows but only sends 50 as a sample to Soda Cloud.

```shell
  | ...
  | Executing SQL query:
SELECT *
FROM "public"."orders"
LIMIT 50;
  | SQL took 0:00:00.074957
  | Sent sample orders.sample (50/193) to Soda Cloud
  | ...
```