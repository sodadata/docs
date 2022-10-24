---
layout: default
title: Reporting API v1 Migration Guide
description: Find out all you need to know on what has changed in the new version of the reporting API.
parent: API Documentation
fullwidth: false
---

# v1, What's changed?

## Update Frequency

The new version of the reporting API (`v1`) is now getting all of its data from pre-processed and aggregated data sources. Deriving some metrics such as health and coverage can be heavy to perform "on the fly" and often lead to a significant impact on the Cloud application performance.

The data for all of the endpoints will be refreshed **once a day between 4 AM and 5 AM CEST **(10 PM - 11 PM EST)**.** This frequency may increase in the future if the need for intra-day reporting arises internally or based on your feedback. For the foreseeable future, however, we do not intend to get anywhere near real-time.

## Endpoint Deprecations

Due to low usage and limitations (e.g., sign-ups and sign-ins done via SSO) on the accuracy of some endpoints available in v0 we have decided to deprecate several endpoints. Those will be re-introduced when built on more reliable sources. The endpoints we have deprecated are:

- `/adoption/sign_ups`
- `/adoption/sign_ins`
- `/adoption/daily_account_activity`
- `/adoption/scans_run`
- `/impact/alerts_sent`

## Contract Changes

Some endpoints have both querying and response-breaking changes. We will list endpoints with breaking changes below. Endpoints that have not changed in their query or response behaviors are not mentioned here.

## Coverage Endpoints

### `tests` is renamed to `checks`

Users can query checks by providing a list of `dataset_ids` or `check_ids` and will get attributes about checks.

Owner and creator information is now denormalized into their fields instead of being provided as nested objects. Check the [API documentation](#reporting-api-v1) for more information.

![](/assets/images/checks-endpoint-diff.png)
*Diff Courtesy of Diffchecker: [https://www.diffchecker.com/37Oq7Zni]()*

### `datasets`

Can now be filtered by providing a **list** of `dataset_ids` as opposed to a single dataset ID per request.
Owner and creator information is now denormalized into their fields instead of being provided as nested objects. Check the [API documentation](#reporting-api-v1) for more information.

![](/assets/images/datasets-endpoint-diff.png)
*Diff Courtsey of Diffchecker: [https://www.diffchecker.com/v5MY2Go9]()*

### `dataset_coverage`

Can now be filtered by providing a list of `dataset_ids`

The `include_deleted` boolean is removed as deleted datasets are not kept historically at the moment and led to inconsistencies in the previous version.

![](/assets/images/dataset-coverage-endpoint-diff.png)
*Diff Courtsey of Diffchecker: [https://www.diffchecker.com/VY5cQCcI]()*

## Quality Endpoints

### `dataset_health`

- **The limitation to 1 dataset per query is now lifted**! The endpoint will accept a list of `dataset_ids` .
- The `output_all_dates` boolean is removed, and the API will return a row of data per day even if no scan has been executed.
- It is still possible to optionally filter results by date via the `from_datetime` parameter.

![](/assets/images/dataset-health-endpoint-diff.png)
*Diff Courtsey of Diffchecker: [https://www.diffchecker.com/bOWED2xx]()*

### `tests_and_results` is renamed to `check_results`

- Users can query check results by providing a list of `dataset_ids` and optionally a `from_datetime` ISO timestamp corresponding to the moment the checks were evaluated as part of a scan.
- Owner information is now denormalized into its fields instead of being provided as nested objects. Check the [API documentation](#reporting-api-v1) for more information.

![](/assets/images/check-results-endpoint-diff.png)
*Diff Courtsey of Diffchecker: [https://www.diffchecker.com/zb2S7jQo]()*

## Platform Impact

## `incidents` is now a newly available endpoint

This endpoint will provide incidents created on the platform along with their attributes. You can filter results by providing a list of `dataset_ids` for which you want to retrieve linked incidents. Further filtering around resolution status and time parameters is also available.

Check the v1 docs for full information.

## Pagination

Most of the endpoints are paginated. Because most endpoints have the potential to retrieve large amounts of records (especially when unfiltered or filtered too broadly), which could cause timeouts in API clients.

Endpoint that are paginated will contain "[Paginated]" in their title in our documentation.

Pagination allows you to control the number of records you pull per request. It is controlled by the following parameters: `size` and `page`. The `size` parameter controls the number of records that you will retrieve per page (`{"size": 200}` would return 200 records. The `page` parameter controls the "location," also known as "offset," from which the records will be retrieved. Let's say that you have a total of 600 records from a given endpoint. If you query it with the following parameters:

```json
{ "page": 1, "size": 200 }
```

You will retrieve the first 200 records. To get the next ones, you'll issue a new request with the following parameters:

```json
{ "page": 2, "size": 200 }
```

and so on.

**NOTE:**the `size` parameter is not currently capped. We believe you should have some flexibility here. The API will use:

```json
{ "page": 2, "size": 400 }
```

as defaults in case, you do not override them.

All paginated endpoints will accompany the set of records with the following indicators: `total`, `page`, and `size`. The `total` field will indicate the number of records you would pull with that query. The `page` and `size` parameters are just there so that you can keep track of your location and the pages, and the jumps you're making.

If you query a page that would make you exceed the number of records, the endpoint will return no content. Coming back to our earlier example of a table with 600 records, If you were to query with:

```json
{ "page": 4, "size": 200 }
```

You would receive nothing: `4 * 200 = 800`. You've exceeded and obtained all your records, and stopping at page 3 was enough.
