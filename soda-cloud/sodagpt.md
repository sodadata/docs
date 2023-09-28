---
layout: default
title: Write checks with SodaGPT
description: Use SodaGPT to turn natural language into production-ready data quality checks in SodaCL.
parent: Soda Cloud
---

# Write checks with SodaGPT <br/>
*Last modified on {% last_modified_at %}* <br />
![preview](/assets/images/preview.png){:height="85px" width="85px"}<br/>

**SodaGPT** is a generative AI assistant for data quality testing.

<a href="https://cloud.soda.io/login" target="_blank">Log in</a> to your **Soda Cloud** account, click the **Ask SodaGPT** button in the main nav, then provide natural language instructions to the interface to receive fully-formed, syntax-correct checks in the [Soda Checks Language (SodaCL)]({% link soda-cl/metrics-and-checks.md %}). If you do not already have an account, <a href="https://cloud.soda.io/signup" target="_blank">sign up for Soda Cloud</a> for a 45-day free trial.

Use the generated checks to test data quality in your data pipeline, in your development workflow, and in your Soda Agreements to prevent data quality issues from causing downstream impact.

![sodagpt](/assets/images/sodagpt.png){:height="500px" width="500px"}


## Instruction parameters

Log in to your **Soda Cloud** account, click the **Ask SodaGPT** button in the main nav, then provide natural language instructions to the interface to receive fully-formed, syntax-correct checks in the Soda Checks Language (SodaCL).

* Provide instructions in English.
* SodaGPT is capable of writing one data quality check at a time.
* SodaGPT *only* outputs SodaCL.
* Provide the following information in your instruction:
    * the name of your dataset
    * the name of at least one column in that dataset
* SodaGPT is capable of writing the following types of SodaCL checks:
    * [missing]({% link soda-cl/missing-metrics.md %})
    * [validity]({% link soda-cl/validity-metrics.md %})
    * [freshness]({% link soda-cl/freshness.md %})
    * [duplicate]({% link soda/quick-start-sodacl.md %}#duplicate-check)
    * [anomaly score]({% link soda-cl/anomaly-score.md %})
    * [schema]({% link soda-cl/schema.md %})
    * all [numeric]({% link soda-cl/numeric-metrics.md %}) (`avg`, `sum`, `max`, etc.)
* SodaGPT does not retain a history of interactions, so it cannot reference a previously-asked question or response.


## About the AI

SodaGPT uses Soda technology to translate natural language requirements into SodaCL checks. It is not related to GPT3, CPT4, chatGPT or OpenAI. 

For SodaGPT's functionality, Soda trained a very specialized Large Language Model (LLM) based on the open-source Falcon-7b model. The model currently does not learn from user input, and will never learn sensitive information from one user and expose it to another.

SodaGPT only accepts the instructions you input in the chat; it does not collect or store any other data. Soda does not send the input to third parties. 

## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
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