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

Installed in your environment, you use the Soda Core command-line tools to securely connect to a data source using system variables to store login credentials.

{% include nat-gateway.md %}

## Single sign-on with Soda Cloud

Organizations that use a SAML 2.0 single sign-on (SSO) identity provider can add Soda Cloud as a service provider. Once added, employees of the organization can gain authorized and authenticated access to the organization's Soda Cloud account by successfully logging in to their SSO. Refer to [Single sign-on with Soda Cloud]({% link soda-cloud/sso.md %}) for details.

## Sending data to Soda Cloud

Soda Core usse a secure API to connect to Soda Cloud. When Soda Core completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application.

Notably, your Soda Cloud account does *not* store the raw data that Soda Core scans. Soda Core pushes metadata to Soda Cloud; by default all your data stays inside your private network.

Soda Cloud does store the following:
* metadata, such as column names
* aggregated metrics, such as averages
* sample rows and failed rows, if you explicitly set up your configuration to send this data to Soda Cloud

Where your datasets contain <a href="https://ec.europa.eu/info/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/sensitive-data/what-personal-data-considered-sensitive_en" target="_blank"> sensitive data</a> or private information, you may *not* want to send failed row samples from your data source to Soda Cloud. In such a circumstance, you can [disable the failed row samples feature entirely]({% link soda-cloud/failed-rows.md %}#disable-failed-row-samples) in Soda Cloud.

Read more about Soda's <a href="https://www.soda.io/privacy-policy" target="_blank">Privacy Policy</a>. 

## Compliance and reporting

In April 2022, an independent review of Soda's source code was conducted and the result indicated that the code is sound.

As a result of an independent review in April 2022, Soda has been found to be **SOCII Type 2** compliant. Contact <a href="mailto:support@soda.io">support@soda.io</a> for more information.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}