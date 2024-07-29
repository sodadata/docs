---
layout: default
title: Write checks with Ask AI
description: Use Soda's Ask AI assistant to turn natural language into production-ready data quality checks in SodaCL.
parent: Write SodaCL checks
redirect_from: /soda-cloud/sodagpt.html
---

# Write checks with Ask AI <br/>
*Last modified on {% last_modified_at %}* 

**Ask AI** is an in-product generative AI assistant for data quality testing. <br />
Ask AI replaces SodaGPT, the original implementation of a generative AI assistant.

<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud + Soda Agent</small><br />
<br />

<a href="https://cloud.soda.io/login" target="_blank">Log in</a> to your **Soda Cloud** account, click the **Ask AI** button in the main nav, then provide natural language instructions to the interface to:
* receive fully-formed, syntax-correct checks in the [Soda Checks Language (SodaCL)]({% link soda-cl/metrics-and-checks.md %})
* get answers to questions about how to configure or use Soda 
* obtain advice about how to resolve an error while using Soda

![ask-ai3](/assets/images/ask-ai3.png){:height="600px" width="600px"}

![askai-2](/assets/images/ask-ai2.png){:height="600px" width="600px"} 

## Enable Ask AI

If you do not already have an account, <a href="https://cloud.soda.io/signup" target="_blank">sign up for Soda Cloud</a> for a 45-day free trial. Then, as an Admin user, navigate to **your avatar** > **Organization Settings**, then check the box to **Enable Ask AI powered by Kapa**.

![enable-ask-ai](/assets/images/enable-ask-ai.png){:height="600px" width="600px"}

<details>
    <summary style="color:#00BC7E">Can't see the Ask AI button?</summary>
    <br />
    If you are an existing Soda customer, you must accept Soda's revised terms and conditions for service that includes the use of third-party tools that facilitate generative AI capabilites. Reply to Soda's Terms & Conditions email to accept the revisions, or contact <a href="mailto:support@soda.io">Soda Support</a> to arrange acceptance and enable the feature.<br /><br />
    If you have accepted the revised terms and conditions but still cannot see the Ask AI button, as an Admin user, navigate to <strong>your avatar</strong> > <strong>Organization Settings</strong>, then check the box to <strong>Enable Ask AI powered by Kapa</strong>.
</details>

<br />

## About Ask AI

{% include ask-ai.md %}
 

## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Create [no-code checks]({% link soda-cl/soda-cl-overview.md %}#define-sodacl-checks) via the Soda Cloud user interface.
* Get started with Soda by following a [tutorial]({% link soda/quick-start-sip.md %}).
* Consider using [check suggestions]({% link soda-library/check-suggestions.md %}) to profile your data and suggest basic checks for data quality.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
