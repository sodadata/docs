---
layout: default
title: Reference data checks
description: 

parent: SodaCL (Beta)
---

# Reference data checks ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

A reference check validates that the values in a column in a table are present in a column in a different table. The example below checks that the values in the `customer_id_nok` column in the `CUSTOMERS` table exist in the `id` column in the `RAW_CUSTOMERS` table. If the values are not in the `id` column, the check fails.

```yaml
checks for CUSTOMERS:
        - values in customer_id_nok must exist in RAW_CUSTOMERS id
```
<!--
Multi-column reference check
```yaml
checks for ORDERS:
  - values in (customer_country, customer_zip) must exist in CUSTOMERS (country, zip)
```
-->

Note that Soda CL considers missing values in the source column as invalid.

---
{% include docs-footer.md %}
