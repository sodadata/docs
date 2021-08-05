---
layout: default
title: Trigger scans via API
parent: Soda Cloud
---

# Trigger scans via API

In Soda Cloud, you [set a schedule]({% link soda-cloud/dataset-scan-schedule.md %}) for Soda to regularly scan your dataset. However, rather than defining a can schedule in Soda Cloud, you can send a call to an API to trigger Soda scans.

1. Obtain the API token.
2. In your Soda Cloud account, navigate to the **Dataset** dashboard, then click the stacked dots icon of the dataset you wish to edit.  
3. In the **Scan Schedule** tab, uncheck the box to **Use Data Source Default Schedule**,then select **Schedule Externally** in the **Dataset Scan Schedule** field. 
4. Copy the JSON or CURL snippet to use outside Soda Cloud to send a POST call to https://cloud.soda.io/api/command. 
5. Save your changes.


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.