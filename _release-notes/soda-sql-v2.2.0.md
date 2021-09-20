---
name: "Week 39: Celeborn release"
date: 2021-09-20
products:
  - soda-sql
---
Bringing another new weekly round of Soda SQL updates containing:

- Core: fix time option as it's always set to now by default ([#473](https://github.com/sodadata/soda-sql/blob/main/CHANGELOG.md))
- Core: Update dev requirements
- Core: Update readme with dialect status (#477)
- Core: Update Tox in dev requirements to prevent version deadlock (#474)
- BigQuery: fix NoneType issue when credentials are not sufficient for BigQuery (#472)
- BigQuery: Update bigquery dependency version (#470)
- MySQL: Fix MySQL dialect issues (#475)
