---
layout: default
title: Soda Set up guide
description: TBD
parent: Get Started
redirect_from: /soda-core/community.html
---

# Soda set up guide
*Last modified on {% last_modified_at %}*

## Quick install

simplest/quickest way to scan results
POC, test things out, see it in action --> Take a sip

## Setup overview

1. Choose a flavour of Soda: AGENT vs. NO AGENT
2. Get an account.
3. Deploy a Soda Agent or install Soda Library (or neither if invoking programmatically)
3. Connect to data sources: DATA SOURCE vs. CONFIGURATION YML
4. Write checks. AGREEMENT vs. CHECKS YML
5. Run a scan.  SCAN DEF vs. MANUAL vs. PROGRAMMATIC

## Choose a flavor of Soda

Guide to right fit installation model for them; 
AGENT vs. AGENT-LESS
include diagrams

Help them with example use cases to decide which model
Matrix this info somehow
* data migration
* data testing in development
* data testing in a pipeline for circuit breaking
* self-serve analytics, or for governance like for a data steward
* data as a product (like HF)
* starting from scratch, need data profiling and monitoring

Reference use case setuo guides 
* Take a sip <-- POC  NO AGENT
* Test in a pipeline  NO AGENT
* Test during development with GH Action  NO AGENT
* Self-serve data quality  AGENT
* Automated data quality monitoring AGENT
* Cloud data migration  EITHER
* Data as a product  AGENT
* Invoke in a Databricks Notebook  NO AGENT

why do I need Soda Cloud?
    <details>
        <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
    To validate your account license or free trial, the Soda Library Docker image that the GitHub Action uses to execute scans must communicate with a Soda Cloud account via API keys. <br />Create <a href="https://go.soda.io/api-keys" target="_blank">new API keys</a> in your Soda Cloud account, then use them to configure the connection between the Soda Library Docker image and your account in step 4 of this procedure. <br /><br />
    </details>

Options:
* set up SSO
* use a a PrivateLink
* invite others, and why
* reporting API


## Set up Soda using a Soda Agent

Start with Soda Cloud sign up
short version of Agent install that doesn’t include how to set up a K8s cluster; refer to more extensive agent docs..?
generate API keys
Connect to data source via Agent in Soda Cloud > add a data source
4. Configure dataset discovery  REQUIRES AGENT
5. Configure profiling  REQUIRES AGENT
6. Configure ownership REQUIRES AGENT

## Set up Soda using Soda Library

Start with Soda Cloud sign up
step-by-step instructions to install and connect to cloud: Windows, MacOs/Linux, Docker
generate API keys
Connect to data source via configuration YAML



Next step options:
- write checks
- what can I do with soda?
- organize datasets with metadata
- start a migration project
- start collaborating with end-users
- and more



---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No" popup_disabled="true"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}