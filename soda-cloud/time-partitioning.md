---
layout: default
title: Define time partitioning
parent: Soda Cloud
---

# Define time partitioning for dataset scans

By default, Soda Cloud scans all the data in your [datasets]({% link soda/glossary.md %}#dataset) each time it conducts a [scan]({% link soda/scan.md %}). If you wish, you can adjust the **time partitioning** of a dataset to instruct Soda Cloud to scan *only* the data that has been added to the dataset since the time it last conducted a scan. For example, you can enable time partitioning on a dataset with a large volume of static data to which small volumes of data are regularly added.

1. If you are the [Admin]({% link soda-cloud/roles-and-rights.md %}) of the organization, or have a Manager or Editor role for the dataset, navigate to the **Datasets** dashboard, click the stacked dots icon of the dataset you wish to edit, then select **Edit Dataset**. 
2. In the **Time Partitioning** tab, use SQL `WHERE` clause to define a time partition for scans using two ISO 8601 variables: {% raw %} `{{ prevScanTime }}` {% endraw %} and {% raw %} `{{ scanTime }}` {% endraw %}. 
3. Save your changes, then wait for Soda Cloud to complete the next scan of your dataset according to its schedule.



## Go further

* Learn more about [adding datasets]({% link soda-cloud/add-datasets.md %}) to your Soda Cloud account.
* Learn how to adjust the [scan schedule]({% link soda-cloud/dataset-scan-schedule.md %}) for individual datasets.
* Learn how to display [sample data]({% link soda-cloud/display-samples.md %}) for individual datasets.
* Learn how to display [column metrics]({% link soda-cloud/display-column-metrics.md %}) for datasets.
* [Create monitors and alerts]({% link soda-cloud/monitors.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.