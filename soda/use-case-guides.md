---
layout: default
title: Use case guides
description: Access examples of Soda implmentations according to use case and data quality testing needs.
parent: Use case guides
---

# Use case guides
*Last modified on {% last_modified_at %}*

Use the following guides as example implementations based on how you intend to use Soda for data quality testing. For standard set up instructions, see [Get started]({% link soda/get-started-roadmap.md %}).

| Guide | Description | [Soda product]({% link soda/product-overview.md %}) <br/>requirements |
| ----- | ----------- | ------------ |
| [Test data in an Airflow pipeline]({% link soda/quick-start-prod.md %}) | Use this guide as an example for how to set up Soda to test the quality of your data in an Airflow pipeline that uses dbt transformations.| Soda Library<br /> Soda Cloud |
| [Test data quality in an ADF pipeline]({% link soda/quick-start-adf.md %}) | Learn how to invoke Soda data quality tests in an ETL pipeline in Azure Data Factory. | Soda Library<br /> Soda Cloud |
| [Test data quality in a Dagster pipeline]({% link soda/quick-start-adf.md %}) | Learn how to invoke Soda data quality tests in a Dagster pipeline. | Soda Library<br /> Soda Cloud |
| [Test data quality in Databricks pipeline]({% link soda/quick-start-databricks-pipeline.md %}) | Learn how to use Databricks notesbooks with Soda to test data quality before feeding a machine learning model. | Soda Library<br /> Soda Cloud |
| [Test data before migration]({% link soda/quick-start-migration.md %}) | Use this guide to set up Soda to test before and after data migration between data sources. |  Soda Library<br /> Soda Cloud |
| [Self-serve Soda]({% link soda/quick-start-end-user.md %}) | Use this guide to set up Soda Cloud to enable users across your organization to serve themselves when it comes to testing data quality. | Soda Cloud<br /> Soda Agent |
| [Test data during development]({% link soda/quick-start-dev.md %}) | Use this guide to set up Soda to test the quality of your data during your development lifecycle in a GitHub Workflow. | Soda Library<br /> Soda Cloud |
| [Automate monitoring]({% link soda/quick-start-automate.md %}) | Use this guide to set up Soda to automatically monitor data quality.  | Soda Cloud<br /> Soda Agent |

<br />

Use the following How tos for practical advice, examples, and instructions for using Soda.

| How to | Description | [Soda product]({% link soda/product-overview.md %}) <br/>requirements |
| ----- | ----------- | ------------ |
| [Invoke Soda in Databricks]({% link soda/quick-start-databricks.md %}) | Learn how to invoke Soda data quality tests in a Databricks notebook. | Soda Library<br /> Soda Cloud |
| [Use a Secrets Manager]({% link soda/quick-start-secrets.md %}) | Learn how to set up a Soda Agent to use an External Secrets Manager to retrieve frequently-rotated data source passwords.| Soda Cloud<br /> Self-hosted Agent |
| [Generate API keys]({% link soda-cloud/api-keys.md %}) | Learn how to use Soda Cloud API keys to securely communicate with other entities such as Soda Library and self-hosted Soda Agents, and to provide secure access to Soda Cloud via API. | Soda Cloud |
| [Manage sensitive data]({% link soda/sensitive-data.md %}) | Learn how to adjust several configurable settings that help you manage access to sensitive data in Soda Cloud. | Soda Cloud | 
| [Reroute failed row samples]({% link soda/route-failed-rows.md %}) | Learn how to programmatically set up Soda Library to display failed row samples in the command-line. | Soda Library<br /> Soda Cloud |
| [Double-onboard a data source]({% link soda-cloud/double-onboard-datasource.md %}) | Learn how to onboard a data source in Soda Cloud that you have already onboarded via Soda Library. | Soda Library<br /> Soda Cloud |


Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
