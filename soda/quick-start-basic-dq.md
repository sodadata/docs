---
layout: default
title: Set up basic data quality testing
description: Use this guide to set the most basic tests for data quality in nearly any dataset.
parent: Use case guides
---

# Set up basic data quality testing
*Last modified on {% last_modified_at %}*

Use this guide to prepare the most basic tests for data quality in nearly any dataset. Arrange to run your tests according to a regular schedule and get notified when Soda surfaces missing, invalid, or unexpected data.


[About this guide](#about-this-guide)<br />
[Go further](#go-further)<br />
<br />

## About this guide

The instructions below are for users new to Soda and data quality monitoring and offer guidance on how to start monitoring your data for basic quality. 

With a Soda Cloud account set up and connected to a data source, learn how to examine your data and write basic tests for data quality that ensure that your datasets are not missing information, do not contain invalid or duplicate entries, and that any column changes are brought to your attention. Learn how to schedule a regular scan of your data for data quality and set up alert notifications so that nothing fails silently.

Tailored for users who are new to data monitoring, this guide focuses on writing data quality tests and not on setting up Soda for the first time. For guidance on set up, refer to the [Get started roadmap]({% link soda/get-started-roadmap.md %}).


```yaml
checks for registered_users:
  - row_count > 0:
      name: data must not be empty
  - missing_count(id) = 0:
      name: id must not have blanks
  - missing_count(last_name) = 0:
      name: last_name must not have blanks
  - missing_count(first_name) = 0:
      name: first_name must not have blanks
  - invalid_count(sign_up_date) = 0:
      valid format: date eu
      name: sign_up_date must have the format date eu
  - invalid_percent(phone) = 0:
      valid format: phone number
      name: phone must have the format phone
  - invalid_percent(email_address) = 0:
      valid format: email
      name: email_address must have the format email
  - duplicate_count(id) = 0:
      name: id must be unique
  - duplicate_count(email_address) = 0:
      name: email_address must be unique
```



## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn more about [reconciliation checks]({% link soda-cl/recon.md %}) in general.
* Write reconciliation checks that produce [failed row samples]({% link soda-cl/recon.md %}#failed-row-samples) in Soda Cloud to help you investigate the root cause of data quality issues.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}