---
description: Review release notes for the Soda Cloud Reporting API.
---

# Release notes for Soda Cloud Reporting API

### \[reporting-api] Reporting API v1.3.1

<sup>09 November 2023</sup>

Bug fix following the removal of `creator_` fields causing SQL query errors for `check_results` and `dataset` endpoints.

***

### \[reporting-api] Reporting API v1.3.0

<sup>08 November 2023</sup>

Fields related to **creator** information (with `creator_` prefix) are now deprecated from the `/checks`, `/check_results`, `datasets` endpoints. Those fields were legacy from soda-sql. With soda-sql data removed from our system the concept of `creator` is also removed from the reporting API. Use the `owner_` fields instead.

***

### \[reporting-api] 0.3.0

<sup>07 November 2023</sup>

#### Deprecated <a href="#deprecated" id="deprecated"></a>

The Soda Cloud Reporting API v0 is now deprecated. Please use [Reporting API v1](../reporting-api-v1/).

***

### \[reporting-api] Reporting API v1.0.1

<sup>09 June 2023</sup>

Released as generally available.

Read more in the [Reporting API Changelog and v1 migration guide](../reporting-api-v1/reporting-api-v1-migration-guide.md).

***

### \[reporting-api] Reporting API v1 (Preview)

<sup>15 December 2022</sup>

Released in Preview state, version 1 offers improvements and additions to Soda Cloud’s Reporting API endpoints.

* Better performance as the API retrieves all of its data from pre-processed and aggregated data sources.
* “Tests” have been renamed “checks”.
* Most endpoints now use pagination.
* A few endpoints have been deprecated, a new one, Incidents, has been added, and some have changed for the better.

Read more in the [Reporting API Changelog and v1 migration guide](../reporting-api-v1/reporting-api-v1-migration-guide.md).

***

### \[reporting-api] 0.3.0

<sup>28 July 2022</sup>

#### Deprecations <a href="#deprecations" id="deprecations"></a>

* The `datasets` endpoint will not return the `is_deleted` on any of the dataset records as this field has been deprecated by the backend and was never a good indicator of dataset deletion due to hard-deletes.

***

### \[reporting-api] 0.2.2

<sup>21 April 2022</sup>

#### Features <a href="#features" id="features"></a>

* The `datasets` endpoint now provides `creator_info` and `owner_info` along with `number_of_rows`.

***

### \[reporting-api] 0.2.1

<sup>19 April 2022</sup>

#### Features <a href="#features" id="features"></a>

* The reporting API now accepts Soda Cloud’s API keys via headers `API_KEY_ID` and `API_KEY_SECRET` to allow users with SSO to use the API.

***

### \[reporting-api] 0.2.0

<sup>01 April 2022</sup>

#### Features <a href="#features" id="features"></a>

* Users must now query the `tests_and_results` endpoint with a single `dataset_id`. Documentation reflects this to users and the API throws the errors.
* Users must now query the `dataset_health` endpoint with a single `dataset_id`. Documentation reflect this to users the API throws the errors.

#### Miscellaneous <a href="#miscellaneous" id="miscellaneous"></a>

* Endpoint usage is now tracked in segment. Every time you send a query to any of the end points, the Reporting API pushes an event that contains the following information:
  * user\_id
  * organization\_id
  * endpoint\_name
  * environment
