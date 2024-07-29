---
layout: default
title: Add Soda to a Databricks pipeline
description: Use this guide to invoke Soda data quality tests in a Databricks pipeline.
parent: Use case guides
---

# Add Soda to a Databricks pipeline
*Last modified on {% last_modified_at %}*

Use this guide as an example for how to set up and use Soda to test the quality of your data in a databricks workflow. Automatically catch data quality issues after ingestion or transformation and before training your machine learning model to prevent negative downstream impact.


Flow:
Datasource: unity catalog + DBFS(Databricks File System) 
Soda check after ingestion 
ETL transformation  
Soda check after transformation and before training ML model
Train ML model 
Export soda metadata 
DQ dashboard  



## About this guide

The instructions below provide Data Engineers and Data Scientists with an example of how to execute SodaCL checks for data quality within a Databricks pipeline while training a machine learning (ML) model.
For context, this guide demonstrates a Data Scientist working with HR data to build a prediction or forecast model around employee attrition. The Data Scientist uses Databricks notebooks to gather data from SQL tables and files, transforms the data into the correct format for their ML model, and then trains the model.
The pipeline includes various Soda checks, which are embedded at different stages, such as after data ingestion and after data transformation. At the end of the process, the checks' metadata is stored in a Databricks table and fed into a data quality (DQ) dashboard.
The Data Scientist utilizes Databricks workflows to schedule and trigger this process on a daily basis.



## Create a Soda Cloud account

To validate your account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library. <a href="https://docs.soda.io/soda/about.html">Learn more</a>

1. In a browser, navigate to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account, which is free for a 45-day trial. If you already have a Soda account, log in.
2. Navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys. 
3. Copy+paste the API key values to a temporary, secure place in your local environment.


## Go further

* Learn more about [SodaCL checks and metrics]({% link soda-cl/metrics-and-checks.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}