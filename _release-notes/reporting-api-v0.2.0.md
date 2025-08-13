# reporting-api-v0.2.0

#### Features

* Users must now query the `tests_and_results` endpoint with a single `dataset_id`. Documentation reflects this to users and the API throws the errors.
* Users must now query the `dataset_health` endpoint with a single `dataset_id`. Documentation reflect this to users the API throws the errors.

#### Miscellaneous

* Endpoint usage is now tracked in segment. Every time you send a query to any of the end points, the Reporting API pushes an event that contains the following information:
  * user\_id
  * organization\_id
  * endpoint\_name
  * environment
