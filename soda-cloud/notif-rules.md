---
layout: default
title: Set notification rules
description: Use Soda Cloud to set alert notification rules for multiple checks across datasets in your account.
parent: Organize, alert, investigate
redirect_from: /soda-cloud/edit-checks.html
---

# Set notification rules 

In Soda Cloud, you can define where and when to send alert notifications when check results warn or fail. You can define these parameters for:
* **agreements** as you create or edit them; see [Define SodaCL checks]({% link soda-cl/soda-cl-overview.md %}#define-sodacl-checks) for Use an agreement.
* **no-code checks** after you have created them; see [Define SodaCL checks]({% link soda-cl/soda-cl-overview.md %}#define-sodacl-checks) for Use a no-code check.
* **multiple checks** by defining notification rules; read on!

For example, you can define a notification rule to instruct Soda Cloud to send an alert to your #sales-engineering Slack channel whenever a data quality check on the `snowflake_sales` data source fails.

[Default rules](#default-rules)<br />
[Set new rules](#set-new-rules) <br />
[Edit or delete rules](#edit-or-delete-rules)<br />
[Go further](#go-further)<br />
<br />

## Default rules

By default, Soda Cloud establishes two notification rules on your Soda Cloud account by default. You can [edit or delete](#edit-or-delete-rules) these rules if you wish.

| Send all check alerts to the Check Owner | Soda Cloud sends all check results that fail or warn to the Soda Cloud user who created or owns an individual check. |
| Send all check alerts to the Dataset Owner | Soda Cloud sends all check results that fail or warn to the Soda Cloud user who created or owns the dataset to which the checks are associated. |

Refer to [Data source, dataset, agreement, and check owners]({% link soda-cloud/roles-and-rights.md %}#data-source-dataset-agreement-and-check-owners) for details on resource ownership.

## Set new rules

{% include notif-rule.md %}

## Edit or delete rules

Navigate to **your avatar** > **Notification Rules**, then click the stacked dots at the right of a check and select **Edit Notification Rule** or **Delete Notification Rule**. 


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn more about SodaCL [metrics and checks]({% link soda-cl/metrics-and-checks.md %}).
* Integrate your Soda Cloud account with your [Slack workspace]({% link soda/integrate-slack.md %}).
* Integrate your Soda Cloud account with a third-party tool using a [webhook]({% link soda/integrate-webhooks.md %}).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}