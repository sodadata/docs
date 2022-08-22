---
layout: default
title: Add scans to a pipeline
description: Integrate Soda Core with a data orchestration tool such as, Airflow, to automate and schedule your search for "bad" data.
sidebar: core
parent: Soda Core 
---

# Add scans to a pipeline 

Integrate Soda Core with a data orchestration tool such as, Airflow, to automate and schedule your search for "bad" data. 

Configure actions that the orchestration tool can take based on scan output. For example, if the output of a scan reveals a large number of failed tests, the orchestration tool can automatically block "bad" data from contaminating your data pipeline.

[Apache Airflow using BashOperator](#apache-airflow-using-bashoperator)<br />
[Apache Airflow using PythonOperator](#apache-airflow-using-pythonoperator)<br />
&nbsp;&nbsp;&nbsp;&nbsp; [Example DAG](#example-dag)
<br />

{% include orchestrate.md %}

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-core-footer.md %}