---
name: "Reporting API v1.3.0"
date: 2023-11-08
products:
  - reporting-api
---

Fields related to **creator** information (with `creator_` prefix) are now deprecated from the `/checks` endpoint.
Those fields were legacy from soda-sql. With soda-sql data removed from our system the concept of `creator` is also removed from the reporting API. Use the `owner_` fields instead.
