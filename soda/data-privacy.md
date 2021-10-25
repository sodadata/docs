---
layout: default
title: Data privacy
parent: Soda
redirect_from: /soda-sql/documentation/data-privacy.html
---

# Data security and privacy

Soda works in several ways to ensure your data and systems remain private.

## Making secure connections

Installed in your environment, you use the Soda SQL command-line tool to securely connect to a [data source]({% link soda/glossary.md %}#data-source) using [environment variables]({% link soda-sql/warehouse.md %}#env_vars-yaml-file) to store login credentials.

{% include nat-gateway.md %}

## Single sign-on with Soda Cloud

Organizations that use a SAML 2.0 single sign-on (SSO) identity provider can add Soda Cloud as a service provider. Once added, employees of the organization can gain authorized and authenticated access to the organization's Soda Cloud account by successfully logging in to their SSO. See [Single sign-on with Soda Cloud]({% link soda-cloud/sso.md %}) for details.

## Sending data to Soda Cloud

Soda SQL uses a secure API to connect to Soda Cloud. When it completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application.

Notably, your Soda Cloud account does *not* store the raw data that Soda SQL scans. Soda SQL pushes metadata to Soda Cloud; by default all your data stays inside your private network.

Soda Cloud does store the following:
* metadata, such as column names
* aggregated metrics, such as averages
* sample rows and failed rows, if you explicitly set up your configuration to send this data to Soda Cloud

Where your datasets contain <a href="https://ec.europa.eu/info/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/sensitive-data/what-personal-data-considered-sensitive_en" target="_blank"> sensitive data</a> or private information, you may *not* want to send sample data from your data source to Soda Cloud. In such a circumstance, you can [disable the samples feature entirely]({% link soda-sql/samples.md %}#disable-sample-data) in Soda Cloud.

If you use Soda SQL to programmatically schedule scans of individual datasets, you can configure Soda SQL to send a dataset's samples or failed row samples to a secure location within your organization's infrastructure, such as an Amazon S3 bucket or Google Big Query. Refer to [Reroute sample data]({% link soda-sql/samples.md %}#reroute-sample-data-for-a-dataset) and [Reroute failed row samples]({% link soda-sql/send-failed-rows.md %}#reroute-failed-row-samples-for-a-dataset) for details.

Read more about Soda's [Privacy Policy](https://www.soda.io/privacy-policy).

## Compliance and reporting

In September 2021, an independent review of Soda's source code was conducted and the result indicated that the code is sound.

As a result of an independent review in September 2021, Soda has been found to be SOCII Type 1 compliant. Soda is scheduled for SOCII Type 2 accreditation as soon as the minimum time interval from Type 1 accreditation has elapsed.  Contact <a href="mailto:support@soda.io">support@soda.io</a> for more information.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.