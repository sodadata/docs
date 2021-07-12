---
layout: default
title: Define time partitioning for dataset scans
parent: Soda Cloud
---

# Define time partitioning for dataset scans

By default, Soda Cloud scans all the data in your [datasets]({% link soda/glossary.md %}#dataset) each time it conducts a [scan]({% link soda/scan.md %}). If you wish, you can adjust the **time partitioning** of a dataset to instruct Soda Cloud to scan *only* the data that has been added to the dataset since the time it last conducted a scan. For example, you can enable time partitioning on a dataset with a large volume of static data to which small volumes of data are regularly added.

1. In the **Datasets** dashboard, click the stacked dots icon of the dataset you wish to edit. 
2. In the **Time Partitioning** tab, use SQL syntax to define a time partition for scans using two variables: {% raw %} `{{ lastScanTime }}` {% endraw %} and {% raw %} `{{ scanTime }}` {% endraw %}. 
3. Save your changes, then wait for Soda Cloud to complete the next scan of your dataset according to its schedule.



## Go further

* Learn more about [adding datasets]({% link soda-cloud/add-datasets.md %}) to your Soda Cloud account.
* [Create monitors and alerts]({% link soda-cloud/monitors.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.