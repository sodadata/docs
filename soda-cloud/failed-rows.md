---
layout: default
title: Examine failed rows
parent: Soda Cloud
redirect_from: /soda-sql/documentation/failed-rows.html
---

# Examine failed rows

When a [scan]({% link soda/glossary.md %}#scan) results in a failed [test]({% link soda/glossary.md %}#test), Soda Cloud displays details of the scan results in each monitor's **Monitor History** view. To offer more insight into the data that failed a test during a scan, Soda Cloud can display **failed rows** in a monitor's history. 

Note: The current implementation of failed rows is evolving to better serve user needs.
<br />

![failed-rows](/assets/images/failed-rows.png){:height="600px" width="600px"}

{% include failed-row-samples.md %}

When Soda Cloud runs its next scheduled scan of your dataset, it collects and displays a sample of failed rows for the monitors that use the above-listed metric types.

If you are a Soda SQL user and have [connected to your Soda Cloud account]({% link soda-cloud/connect_to_cloud.md %}), you can add configurations to your scan YAML file to explicitly send failed row samples to Soda Cloud. See [Send failed rows to Soda Cloud]({% link soda-sql/send-failed-rows.md %}) for instructions.

## Go further

- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a free Soda Cloud account.
- [Create monitors]({% link soda-cloud/monitors.md %}) in Soda Cloud.
- Learn more about [scans in Soda Cloud]({% link soda/scan.md %}#scan-output-in-soda-cloud).
- Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.