---
layout: default
title: Display column metrics
parent: Soda Cloud
---

# Display column metrics

Using the information Soda SQL discovered about your [datasets]({% link soda/glossary.md %}#dataset), you can optionally instruct it to capture and send **column metrics** to Soda Cloud for individual datasets during the next [scan]({% link soda/scan.md %}). Enabling column metrics gives you at-a-glance information about your datasets in the **Datasets** dashboard and in the dataset's **Column** tab, as in the images below. 

Datasets dashboard
![display-column-metrics](/assets/images/display-column-metrics.png){:height="650px" width="650px"}

A dataset's **Columns** tab
![column-tab](/assets/images/column-tab.png){:height="650px" width="650px"}


1. If you are the [Admin]({% link soda-cloud/roles-and-rights.md %}) of the organization, or have a Manager or Editor role for the dataset, navigate to the **Datasets** dashboard, then open the dataset for which you want to enable column metrics.
2. Click the gear icon on the right in the table header row in the **Columns** tab.
3. When prompted, check the box to **Enable Column Metrics**, then save. 

During the next scan of your dataset, Soda SQL captures and sends column metrics for each dataset to Soda Cloud where you can access the information in the **Dataset** dashboard and in the dataset's **Column** tab. Use the column metrics to help you make informed choices when you [create a new monitor]({% link soda-cloud/monitors.md %}).


## Go further

* [Create monitors and alerts]({% link soda-cloud/monitors.md %}) in Soda Cloud.
* Learn how to display [sample data]({% link soda-cloud/display-samples.md %}) for individual datasets.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.