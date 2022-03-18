---
layout: default
title: Reference checks
description: 
sidebar: cl
parent: SodaCL
---

# Reference checks

A reference check validates that the values in a column in a table are present in a column in a different table. The example below checks that the values in the `customer_id_nok` column in the `CUSTOMERS` table exist in the `id` column in the `RAW_CUSTOMERS` table. If the values are not in the `id` column, the check fails.

```yaml
checks for {orders_table_name}:
        - values in customer_id_nok must exist in {customers_table_name} id
```
<!--
Multi-column reference check
```yaml
checks for ORDERS:
  - reference from (customer_country, customer_zip) to CUSTOMERS (country, zip)
```
-->

Note that Soda CL considers missing values in the source column as invalid.

---
{% include docs-footer.md %}