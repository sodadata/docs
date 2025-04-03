---
layout: default
title: Data privacy
description: Soda works in several ways to ensure your data and systems remain private. We offer secure connections, SSO, and observe compliance and reporting regulations.
parent: Learning resources
redirect_from: 
- /soda-sql/documentation/data-privacy.html
- /soda/data-concepts.html
---

# Data security and privacy
*Last modified on {% last_modified_at %}*

Soda works in several ways to ensure your data and systems are secure and remain private.

[Compliance and reporting](#compliance-and-reporting)<br />
[Using a Soda-hosted agent](#using-a-soda-hosted-agent)<br />
[Connecting with Soda Library](#connecting-with-soda-library)<br />
[Sending data to Soda Cloud](#sending-data-to-soda-cloud)<br />
[Single sign-on with Soda Cloud](#single-sign-on-with-soda-cloud)<br />
<br />

See also: <a href="https://www.soda.io/privacy-policy" target="_blank">Soda Privacy Policy</a>
<br />

## Compliance and reporting

As a result of an independent review in April 2024, Soda has been found to be **SOCII Type 2** compliant. Contact <a href="mailto:support@soda.io">support@soda.io</a> for more information.

![soc2](/assets/images/soc2.png){:width="100px"}

## Using a Soda-hosted agent

Soda hosts agents in a secure environment in Amazon AWS. As a SOC 2 Type 2 certified business, Soda responsibly manages Soda-hosted agents to ensure that they remain private, secure, and independent of all other hosted agents. 

* Soda encrypts values pertaining to data source connections and only uses the values to access the data to perform scans for data quality. It uses <a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html" target="_blank">asymmetric keys in AWS KMS</a> to encrypt and store  the values you provide for access to your data source. AMS KMS keys are certified under the <a href="https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4523" target="_blank">FIPS 140-2 Cryptographic Module Validation Program</a>. 
* Soda encrypts the secrets you provide via Soda Cloud both in transit and at rest. This <a href="https://en.wikipedia.org/wiki/End-to-end_encryption" target="_blank">end-to-end encryption</a> means that secrets leave your browser already encrypted and can only be decrypted using a Private Key that only the Soda Agent can access.
* Once you enter data source access credentials into Soda Cloud, neither you or any user or entity can access the values because they have been encrypted and can only be decrypted by the Soda Agent. 
* If your data source accepts allowlisted IP addresses, add the Soda Cloud IP address to the allowlist to access your data sources via the Soda-hosted Agent. Obtain this IP address in Soda Cloud when connecting a new data source.

## Connecting with Soda Library

Installed in your environment, you use the Soda Library command-line tools to securely connect to a data source using system variables to store login credentials.


## Sending data to Soda Cloud

Soda Library uses a secure API to connect to Soda Cloud. When Soda Library completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application.

Notably, your Soda Cloud account does *not* store the raw data that Soda Library scans. Soda Library pushes metadata to Soda Cloud; by default all your data stays inside your private network.

Soda Cloud does store the following:
* metadata, such as column names
* aggregated metrics, such as averages
* sample rows and failed rows, if you explicitly set up your configuration to send this data to Soda Cloud

Where your datasets contain <a href="https://ec.europa.eu/info/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/sensitive-data/what-personal-data-considered-sensitive_en" target="_blank"> sensitive data</a> or private information, you may *not* want to send failed row samples from your data source to Soda Cloud. In such a circumstance, you can [disable the failed row samples feature entirely]({% link soda-cl/failed-row-samples.md %}#disable-all-failed-row-samples) in Soda Cloud.

Read more about Soda's <a href="https://www.soda.io/privacy-policy" target="_blank">Privacy Policy</a>. 

## Receiving events from Soda Cloud
You can set up Soda Cloud to send events to your services using integrations like Soda Webhooks. If your destination services are behind a firewall, you may need to passlist Soda Cloud's egress IP addresses to allow communication. The current IP addresses used by Soda Cloud are:

- EU: `54.78.91.111`, `52.49.181.67`
- US: `34.208.202.240`, `52.35.114.145`

Ensure these addresses are allowed in your firewall settings to avoid any disruptions in receiving events from Soda Cloud.

## Single sign-on with Soda Cloud

Organizations that use a SAML 2.0 single sign-on (SSO) identity provider can add Soda Cloud as a service provider. Once added, employees of the organization can gain authorized and authenticated access to the organization's Soda Cloud account by successfully logging in to their SSO. Refer to [Set up single sign-on with Soda Cloud]({% link soda-cloud/sso.md %}) for details.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
