---
name: "0.2.0"
date: 2022-04-01
products:
    - reporting-api
---
### Features

- [#128](https://github.com/sodadata/reporting/issues/128) - `tests_and_results` endpoint must now be queried with a single `dataset_id`. Docs are updated to reflect this to users and errors are thrown by the API.
  - `dataset_health` endpoint must now be queried with a single `dataset_id`. Docs are updated to reflect this to users and errors are thrown by the API.

### Under The Hood/Misc

- [#22](https://github.com/sodadata/reporting/issues/22) Endpoint usage is now tracked in segment. Every time a query is made to any of the end points we will push an event that contains the following:

  - user_id
  - organization_id
  - endpoint_name
  - environment
