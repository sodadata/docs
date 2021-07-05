---
layout: default
title: Display column metrics
parent: Soda Cloud
---

# Display column metrics

Using the information Soda Cloud discovered about your [datasets]({% link soda/glossary.md %}#dataset) during its [first scan of your data]({% link soda-cloud/add-datasets.md %}), you can optionally instruct it to capture **column metrics** for all datasets during the next scheduled [scan]({% link soda/scan.md %}). Enabling column metrics gives you at-a-glance information about your datasets in the **Datasets** dashboard and in the dataset's **Column** tab. 

Datasets dashboard
![display-column-metrics](/assets/images/display-column-metrics.png){:height="650px" width="650px"}

Dataset's Columns tab
![column-tab](/assets/images/column-tab.png){:height="650px" width="650px"}

Consider *not* enabling column metrics if your data source contains a large volume of datasets. Soda Cloud's performance may be affected if it must fetch and display metadata from a great number of datasets.

1. From the **Datasets** dashboard, click the link in the "Almost done!" banner, or click the gear icon.
2. When prompted, check the box to **Enable Column Metrics**, then save. If you see a message that asks you to review time partitioning settings before enabling, TODO: what now? do you have to review the time partitioning settings for each dataset?

During the next scheduled scan, Soda Cloud captures column metrics for each dataset and displays the information in the **Dataset** dashboard and in the dataset's **Column** tab. Use the column metrics to help you make informed choices when you [create a new monitor]({% link soda-cloud/monitors.md %}).



## Go further

* Learn more about [adding datasets]({% link soda-cloud/add-datasets.md %}) to your Soda Cloud account.
* [Create monitors and alerts]({% link soda-cloud/monitors.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.