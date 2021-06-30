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
* samples and failed rows, if you explicitly set up your configuration to send this data to Soda Cloud

If you are working with [sensitive data](https://ec.europa.eu/info/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/sensitive-data/what-personal-data-considered-sensitive_en) that must not leave your organisation's network, do not enable the sample data and failed rows features for Soda SQL scans. Refer to [Scan YAML]({% link soda-sql/scan-yaml.md %}#scan-yaml-configuration-keys) for information on sample data.

Read more about Soda's [Privacy Policy](https://www.soda.io/privacy-policy).

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.