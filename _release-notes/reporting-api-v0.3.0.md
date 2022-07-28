---
name: "0.3.0"
date: 2022-07-28
products:
    - reporting-api
---
### Deprecations

- The `datasets` endpoint will not return the `is_deleted` on any of the dataset records as this field has been deprecated by the backend and was never a good indicator of dataset deletion due to hard-deletes.
