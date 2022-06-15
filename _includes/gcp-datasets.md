A note about BigQuery datasets: Google uses the term dataset slightly differently than Soda (and many others) do. 
* In the context of Soda, a [dataset]({% link soda/glossary.md %}#dataset) is a representation of a tabular data structure with rows and columns. A dataset can take the form of a table in PostgreSQL or Snowflake, a stream in Kafka, or a DataFrame in a Spark application. 
* In the context of BigQuery, a <a href="https://cloud.google.com/bigquery/docs/datasets-intro" target="_blank"> dataset</a> is "a top-level container that is used to organize and control access to your tables and views. A table or view must belong to a dataset..."

Instances of "dataset" in Soda documentation always reference the former.