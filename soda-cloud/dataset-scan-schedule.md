---
layout: default
title: Adjust a dataset scan schedule
parent: Soda Cloud
---

# Adjust a dataset scan schedule 

By default, Soda Cloud conducts a scan of each dataset in your data source according to the schedule you set when you configured the data source connection. If you wish, you can set a scan schedule specific to an individual datasest. For example, you can specify a more frequent scan schedule for a dataset that changes often.

![onboarding-scan-schedules](/assets/images/onboarding-scan-schedules.png){:height="350px" width="350px"}
 
1. In the **Dataset** dashboard, click the stacked dots icon of the dataset you wish to edit. 
2. In the **Scan Schedule** tab, uncheck the box to **Use Data Source Default Schedule**, then adjust the scan schedule as needed.  <br > If you wish to trigger Soda scans externally, select **Schedule Externally** in the **Dataset Scan Schedule** field, then copy the JSON or CURL snippet to use outside Soda Cloud to send a POST call to https://cloud.soda.io/api/command. 
3. Save your changes, then wait for Soda Cloud to complete the next scan of your dataset according to the new scan schedule you set.


## Go further

* Next step in Soda Cloud Onboarding: [Automatically detect anomalies]({% link soda-cloud/anomaly-detection.md %})
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.