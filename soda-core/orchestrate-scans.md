---
layout: default
title: Configure orchestrated scans
description: Integrate Soda Core with a data orchestration tool to automate and schedule your search for "bad" data.
parent: Soda Core
---

# Configure orchestrated scans 

Integrate Soda Core with a data orchestration tool such as, Airflow, to automate and schedule your search for "bad" data. 

Configure actions that the orchestration tool can take based on scan output. For example, if the output of a scan reveals a large number of failed tests, the orchestration tool can automatically block "bad" data from contaminating your data pipeline.

[Apache Airflow using BashOperator](#apache-airflow-using-bashoperator)<br />
[Apache Airflow using PythonOperator](#apache-airflow-using-pythonoperator)<br />
&nbsp;&nbsp;&nbsp;&nbsp; [Example DAG](#example-dag)
<br />

{% include orchestrate.md %}

## Go further

* Learn more about the [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}) you can use to check for data quality.
* Learn how to [Connect to Soda Cloud]({% link soda-core/connect-core-to-cloud.md %}).
* Learn how to prepare [programmatic scans]({% link soda-core/programmatic.md %}) of your data.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}