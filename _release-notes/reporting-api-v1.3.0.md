# reporting-api-v1.3.0

Fields related to **creator** information (with `creator_` prefix) are now deprecated from the `/checks`, `/check_results`, `datasets` endpoints.\
Those fields were legacy from soda-sql. With soda-sql data removed from our system the concept of `creator` is also removed from the reporting API. Use the `owner_` fields instead.
