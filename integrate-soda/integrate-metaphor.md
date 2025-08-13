---
description: >-
  Integrate Soda with Metaphor to access details about the quality of your data
  from right within the data catalog.
hidden: true
---

# Integrate Soda with Metaphor

Integrate Soda with Metaphor to access details about the quality of your data from within the data catalog. The following video illustrates how to take advantage of the integration.

{% embed url="https://player.vimeo.com/video/656375442?app_id=58479&autopause=0&badge=0&h=a811ec4d0f&player_id=0" %}

## Prerequisites

* You have completed at least one [Soda scan](../run-a-scan/) to validate that the data source’s datasets appear in Soda Cloud as expected.
* You have a Metaphor account with the privileges necessary to allow you to add a data source.
* You have a git repository in which to store the integration project files.

## Set up the integration

1. Sign into your Soda Cloud account and confirm that you see the datasets you expect to see in the data source you wish to test for quality.
2.  To connect your Soda Cloud account to your Metaphor account, create an `.env` file in your integration project in your git repo and include details according to the example below. To obtain the values for your Soda API keys, refer to [Configure Soda Library](../use-case-guides/api-keys.md).\


    ```yaml
    SODA_HOST=cloud.soda.i
    SODA_API_KEY_ID
    SODA_API_KEY_SECRET
    METAPHOR_ACCESS_KEY_ID
    METAPHOR_SECRET_ACCESS_KEY
    # s3 bucker path without trailing slash
    METAPHOR_S3_PATH
    SODA_LOGGING_LEVEL=INF
    ```

## Run the integration

Contact [support@soda.io](mailto:support@soda.io)directly to acquire the assets and instructions to run the integration and view Soda Cloud details in your Metaphor catalog.

## Use the integration

Log in to Soda Cloud to [create no-code checks](../soda-cl-overview/#define-sodacl-checks) or [create agreements](../soda-cl-overview/#define-sodacl-checks) that execute checks against datasets in your data source each time you [run a Soda scan manually](../run-a-scan/#scan-for-data-quality), or [orchestrate a scan](../run-a-scan/orchestrate-scans.md) using a data pipeline tool such as Airflow. Soda Cloud pushes data quality scan results to the corresponding data source in Metaphor so that users can review data quality information from within the catalog.

Refer to video above for details.

## Go further

* Access a list of [all integrations](https://www.soda.io/integrations) that Soda Cloud supports.

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
