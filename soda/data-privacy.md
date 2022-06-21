---
layout: default
title: Data privacy
description: Soda works in several ways to ensure your data and systems remain private. We offer secure connections, SSO, and observe compliance and reporting regulations.
parent: Reference
redirect_from: /soda-sql/documentation/data-privacy.html
---

# Data security and privacy

Soda works in several ways to ensure your data and systems remain private.

## Making secure connections

Installed in your environment, you use the Soda SQL or Soda Core command-line tools to securely connect to a data source using environment variables to store login credentials.

{% include nat-gateway.md %}

## Single sign-on with Soda Cloud

Organizations that use a SAML 2.0 single sign-on (SSO) identity provider can add Soda Cloud as a service provider. Once added, employees of the organization can gain authorized and authenticated access to the organization's Soda Cloud account by successfully logging in to their SSO. See [Single sign-on with Soda Cloud]({% link soda-cloud/sso.md %}) for details.

## Sending data to Soda Cloud

Soda SQL and Soda Core use a secure API to connect to Soda Cloud. When Soda SQL or Soda Core completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application.

Notably, your Soda Cloud account does *not* store the raw data that Soda SQL or Soda Core scans. Soda SQL pushes metadata to Soda Cloud; by default all your data stays inside your private network.

Soda Cloud does store the following:
* metadata, such as column names
* aggregated metrics, such as averages
* sample rows and failed rows, if you explicitly set up your configuration to send this data to Soda Cloud

Where your datasets contain <a href="https://ec.europa.eu/info/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/sensitive-data/what-personal-data-considered-sensitive_en" target="_blank"> sensitive data</a> or private information, you may *not* want to send sample data from your data source to Soda Cloud. In such a circumstance, you can [disable the samples feature entirely]({% link soda-sql/samples.md %}#disable-sample-data) in Soda Cloud.

If you use Soda SQL to programmatically schedule scans of individual datasets, you can configure Soda SQL to send a dataset's samples or failed row samples to a secure location within your organization's infrastructure, such as an Amazon S3 bucket or Google Big Query. Refer to [Reroute sample data]({% link soda-sql/samples.md %}#reroute-sample-data-for-a-dataset) and [Reroute failed row samples]({% link soda-sql/send-failed-rows.md %}#reroute-failed-row-samples-for-a-dataset) for details.

Read more about Soda's [Privacy Policy](https://www.soda.io/privacy-policy).

## Compliance and reporting

In April 2022, an independent review of Soda's source code was conducted and the result indicated that the code is sound.

As a result of an independent review in April 2022, Soda has been found to be SOCII Type 2 compliant. Contact <a href="mailto:support@soda.io">support@soda.io</a> for more information.

<br />

---
{% include docs-footer.md %}