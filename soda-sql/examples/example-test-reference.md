---
layout: default
title: Example test with reference
parent: Examples
---

# Example test with reference

Where you need to reference a different dataset when testing your data, you can use Soda SQL [custom metrics]({% link soda-sql/documentation/glossary.md %}#custom-metrics) to reference another table.

To illustrate how to reference a separate dataset in a Soda SQL test, imagine an e-commerce company that fulfills orders for shipment to customers. The information associated with each customer is stored in a customer table in a database, and the valid country codes are stored in a separate table. Here is how they can define a test that uses the country codes table to ensure that country codes in the customer table are valid.

Scan YAML:
```yaml
table_name: customer
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ... 
sql_metrics:
  - sql: |
      SELECT count(*) AS invalid_countrycode_count
      FROM customer
      WHERE countrycode NOT IN (SELECT countrycode FROM countrycodes );
    tests:
      - invalid_countrycode_count == 0
```

Then, the engineer [runs a Soda SQL scan]({% link soda-sql/documentation/scan.md %}#run-a-scan) as follows:

Scan command:

```soda scan warehouse.yml tables/customer.yml```


Scan output:

```
Coming soon.
```