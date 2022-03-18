---
layout: default
title: Reference data checks
description: 

parent: SodaCL
---

# Reference data checks

Check if values in column `ORDERS.customer_id` are present in column `CUSTOMERS.id`.
```yaml
checks for ORDERS:
  - values in customer_id must exist in CUSTOMERS id
```

Check if combination of multiple column values in table ORDERS occur in table CUSTOMERS
```yaml
checks for ORDERS:
  - values in (customer_country, customer_zip) must exist in CUSTOMERS (country, zip)
```

---
{% include docs-footer.md %}
