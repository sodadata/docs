---
layout: default
title: Data privacy
parent: Soda
redirect_from: /soda-sql/documentation/data-privacy.html
---

# Data security and privacy

Soda works to ensure your data remains private.

Installed in your environment, you use the Soda SQL command-line tool to scan data in your warehouses. Soda SQL uses a secure API to connect to Soda Cloud. When it completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application. 

Notably, your Soda Cloud account does *not* store the raw data that Soda SQL scans. Soda SQL pushes metadata to Soda Cloud; by default all your data stays inside your private network.

Soda Cloud does store the following:
* metadata, such as column names 
* aggregated metrics, such as averages 
* sample rows and failed rows, if you explicitly set up your configuration to send this data to Soda Cloud

If you are working with [sensitive data](https://ec.europa.eu/info/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/sensitive-data/what-personal-data-considered-sensitive_en) that must not leave your organisation's network, do not enable the sample data and failed rows features for Soda SQL scans. Refer to [Send sample data to Soda Cloud]({% link soda-sql/samples.md %}) and [Send failed rows to Soda Cloud]({% link soda-sql/send-failed-rows.md %}) for more information.

If you wish, you can configure Soda SQL to send sample rows and failed rows but explicitly instruct it *not* to scan columns that contain sensitive or personally identifiable information (PII). Read more about how to use [`excluded_columns`]({% link soda-sql/scan-yaml.md %}#scan-yaml-configuration-keys) to specify columns that Soda SQL should NOT scan and send to Soda Cloud as samples of rows or failed rows. 

Read more about Soda's [Privacy Policy](https://www.soda.io/privacy-policy).

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.