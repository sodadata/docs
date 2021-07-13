When you run a scan, Soda SQL uses the configurations in your [scan YAML file]({% link soda-sql/scan-yaml.md %}) and Soda Cloud [monitors]({% link soda/glossary.md %}#monitor) to prepare, then run SQL queries against data in your data source. The default tests and metrics Soda SQL configured when it created the YAML file focus on finding missing, invalid, or unexpected data in your datasets.

Each scan requires the following as input:
- a warehouse YAML file, which represents a connection to your data source
- a scan YAML file, including its filepath, which contains the metric and test instructions that Soda SQL uses to scan datasets in your data source

#### Example command 
```shell
$ soda scan warehouse.yml tables/demodata.yml
```