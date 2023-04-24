---
layout: default
title: Test data quality in a data pipeline
description: 
parent: Get started
---

# Test data quality in a data pipeline
*Last modified on {% last_modified_at %}*

Install soda-core

Create account

Connect & configure

Define checks:
* Ingestion: In general I would suggest after ingestion - schema, freshness, reference, not null, format, duplicate - this is in approximate order of importance from most to least important. Row count check is useful if there is any reasonable range or threshold available
* Transform: after transformation - this highly depends on what the transformation is - if tables are being joined, then not null on the joined tables could make sense. Format would generally not be that important since it has already been checked and whatever new is created is under control of the transformation, but it could still be used to verify if some sort of complicated formatting transformation is in place. Row count can be very useful, e.g. if aggregation happens then row count per group would make sense. Then it goes into more domain specific checks, where I would imagine a user defined check, but this is highly dependent on the use case, the data
* End-user tests: … 

Configure Airflow Operator in the right places

Setup slack integration

Setup notification rules

Run your Airlfow pipeline

Receive alerts for failed checks

Examine/investigate alerts

~~Setup catalog~~

~~Setup reporting~~



## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}