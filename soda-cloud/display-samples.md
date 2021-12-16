---
layout: default
title: Display sample data
parent: Soda Cloud
---

# Display sample data for a dataset 

When creating new [monitors]({% link soda/glossary.md %}#monitor) in Soda Cloud, you may find it useful to review sample data from your [dataset]({% link soda/glossary.md %}#dataset) to help you determine the kinds of [tests]({% link soda-sql/tests.md %}) to run when Soda SQL scans your data; see the image below. For this reason, you may wish to use Soda SQL to to configure a `samples` [configuration key]({% link soda-sql/scan-yaml.md %}#scan-yaml-configuration-keys).

![sample-data](/assets/images/sample-data.png){:height="650px" width="650px"}


Using the information Soda SQL discovered about your datasets, you can optionally instruct it to capture and send **sample data** to Soda Cloud for specific datasets during the next scan. Enable sample data to display sample rows of data in Soda Cloud (to a maximum of 1000) so that you can make informed choices about the tests to run against your data when you create a monitor. A sample contains the first *n* number of rows from the dataset, according to the limit you specify.

## Send sample data to Soda Cloud

DO NOT send sample data to Soda Cloud if your dataset contains sensitive information or personally identifiable information (PII). For security, you can [disable the sample data](#disable-sample-data) feature entirely, or configure Soda SQL to [reroute failed sample data]({% link soda-sql/samples.md %}#reroute-sample-data-for-a-dataset) to an alternate location.

{% include add-sample-config-key.md %}


## Disable sample data

Where your datasets contain sensitive or private information, you may *not* want to send sample data from your data source to Soda Cloud. In such a circumstance, you can disable the feature entirely in Soda Cloud.

{% include disable-all-samples.md %}

If you use Soda SQL to programmatically schedule scans of individual datasets, you can configure Soda SQL to send a dataset's samples to a secure location within your organization's infrastructure, such as an Amazon S3 bucket or Google Big Query. Refer to [Reroute sample data]({% link soda-sql/samples.md %}#reroute-sample-data-for-a-dataset) for details.

## Go further

- If you use Soda SQL, you can add a [`samples` configuration key]({% link soda-sql/samples.md %}) to your scan YAML file to send sample data.
- Read more about [failed row]({% link soda-cloud/failed-rows.md %}) samples in Soda Cloud.
- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a Soda Cloud account.
- [Create monitors]({% link soda-cloud/monitors.md %}) in Soda Cloud.
- Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
- Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.