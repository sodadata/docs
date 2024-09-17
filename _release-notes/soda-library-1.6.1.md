---
name: "1.6.1"
date: 2024-09-17
products:
  - soda-library
---

## 1.6.1 Features and Fixes

* Dataset level configuration for attributes and samples columns. by @jzalucki in #313
* Do not collect samples if collecting of default samples were disabled in the cloud. by @jzalucki in #314
* Use default cloud samples columns. by @jzalucki in #315
* Fix: Handle cases where database returns NaN instead of NULL in aggs and frequent values queries by @bastienboutonnet in #316
* Add support for collect failed rows table and checks level. by @jzalucki in #317
* CLOUD-8251 - Fix Oracle in CI by @dakue-soda in #302
* Add custom message to DefaultSampler depending on samples disabled reason. by @jzalucki in #319
* Send soda library version during file upload, if fileId not present mark sample as not persisted with a message. by @jzalucki in #318
