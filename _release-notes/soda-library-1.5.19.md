---
name: "1.5.19"
date: 2024-07-23
products:
  - soda-library
---

## 1.5.19 Fixes

* Always reset logger when new Scan instance is created. by @jzalucki in #277
* Use SHOW TABLES and SHOW VIEWS instead of spark session catalog API. by @jzalucki in #278
* Fix: apply cast to numerical for ms sqlserver by @bastienboutonnet in #279
