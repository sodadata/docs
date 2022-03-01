---
layout: default
title: Statistical checks
description: 
parent: SodaCL
---

# Statistical checks

Stats in every data source
```yaml
checks for CUSTOMER:
  - min(size) >= 0
  - max(size) <= 5000
  - avg(size) between 100 and 1000
  - sum(market_share_pct) = 100
```

On postgres, these extra statistical metrics are also supported:
```yaml
checks for CUSTOMER:
  - stddev(size) between 3 and 4
  - stddev_pop(size) between 3 and 4
  - stddev_samp(size) between 3 and 4
  - variance(size) between 9 and 11
  - var_pop(size) between 9 and 11
  - var_samp(size) between 9 and 11
  - percentile(distance, 0.95) > 500
```

---
{% include docs-footer.md %}