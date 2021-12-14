---
layout: default
title: Integrate Soda Cloud with Metaphor
parent: Integrate Soda
---

# Integrate Soda Cloud with Metaphor

Integrate Soda with Metaphor to access details about the quality of your data from within the data catalog. The following video illustrates how to take advantage of the integration.

<div style="padding:50% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/656375442?h=a811ec4d0f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="metaphor.mov"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>


## Prerequisites

* You have a Soda Cloud account with [Admin permissions]({% link soda-cloud/roles-and-rights.md %}), [connected]({% link soda-cloud/connect_to_cloud.md %}) to an instance of Soda SQL.
* You have [configured Soda SQL]({% link soda-sql/configure.md %}) to access the data source on which you want to run quality checks.
* You have completed at least one [Soda scan]({% link soda/scan.md %}) to validate that the data source’s datasets appear in Soda Cloud as expected.
* You have a Metaphor account with the privileges necessary to allow you to add a data source.
* You have a git repository in which to store the integration project files.


## Set up the integration

1. Sign into your Soda Cloud account and confirm that you see the datasets you expect to see in the data source you wish to test for quality.
2. To connect your Soda Cloud account to your Metaphor account, create an `.env` file in your integration project in your git repo and include details according to the example below. To obtain the values for your Soda API keys, refer to the [Connect to Soda Cloud documentation]({% link soda-cloud/connect_to_cloud.md %}). <br />

```yaml
SODA_HOST=cloud.soda.io
SODA_API_KEY_ID=
SODA_API_KEY_SECRET=

METAPHOR_ACCESS_KEY_ID=
METAPHOR_SECRET_ACCESS_KEY=
# s3 bucker path without trailing slash.
METAPHOR_S3_PATH=

SODA_LOGGING_LEVEL=INFO
```


## Run the integration

Contact <a href="mailto:support@soda.io">Soda Support</a> directly to acquire the assets and instructions to run the integration and view Soda Cloud details in your Metaphor catalog.


## Use the integration

Access Soda Cloud to [create monitors]({% link soda-cloud/monitors.md %}) that execute tests against datasets in your data source each time you [run a Soda scan manually]({% link soda/scan.md %}#run-a-scan), or [orchestrate a scan]({% link soda-sql/orchestrate_scans.md %}) using a data pipeline tool such as Airflow. Soda Cloud pushes data quality scan results to the corresponding data source in Metaphor so that users can review data quality information from within the catalog. 

Refer to video above for details.


## Go further

* Learn more about [creating monitors]({% link soda-cloud/monitors.md %}) in Soda Cloud.
* Learn more about [anomaly detection]({% link soda-cloud/anomaly-detection.md %}) and [schema evolution]({% link soda-cloud/schema-evolution.md %}) monitors in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.