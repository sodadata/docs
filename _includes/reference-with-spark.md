If you are using reference checks with a Spark or Databricks data source to validate the existence of values in two datasets within the same schema, you must first convert your DataFrames into temp views to add them to the Spark session, as in the following example.
```python
# after adding your Spark session to the scan
df.createOrReplaceTempView("df")
df2.createOrReplaceTempView("df2")
```