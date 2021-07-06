---
layout: default
title: Soda product overview
parent: Soda
---

# Soda product overview

<br />

![soda-sql-logo](/assets/images/soda-sql-logo.png){:height="150px" width="150px"}

**Soda SQL** is a free, open-source command-line tool. It utilizes user-defined input to prepare SQL queries that run tests on tables in a database to find invalid, missing, or unexpected data. When tests fail, they surface the data that you defined as "bad" in the tests. Armed with this information, you and your data engineering team can diagnose where the "bad" data entered your data pipeline and take steps to prioritize and resolve issues based on downstream impact.

Use Soda SQL on its own to manually or programmatically scan the data that your organization uses to make decisions. Optionally, you can integrate Soda SQL with your data orchestration tool to schedule scans and automate actions based on scan results. Further, you can connect Soda SQL to a free **Soda Cloud** account where you and your team can use the web application to monitor test results and collaborate to keep your data issue-free.

Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).

<br />

![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="175px" width="175px"}

**Soda Cloud** is the web application to which Soda SQL pushes the results of its scans. Log in to the web app to examine the visualized results of Soda SQL scans, view historical scan data, and set up alerts that automatically notify your team when there is an issue with your data. 

**Soda Cloud** and **Soda SQL** work together to help you monitor your data and alert you when there is a data quality issue. 

Installed in your environment, you use the Soda SQL command-line tool to [scan]({% link soda/glossary.md %}#scan) data in your [warehouses]({% link soda/glossary.md %}#warehouse). Soda SQL uses a secure API to connect to Soda Cloud. When it completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application. 

Learn more about how to [set up]({% link soda-cloud/quick-start.md %}) your Soda Cloud account to start monitoring your data.

## Go further

* [Install Soda SQL]({% link soda-sql/installation.md %}) and sign up for a free Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
* Contribute to Soda SQL development on GitHub: <a href="https://github.com/sodadata/soda-sql" target="_blank">github.com/sodadata/soda-sql</a>
* Automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data using Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.