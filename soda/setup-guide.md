---
layout: default
title: Choose a flavor of Soda
description: TBD
parent: Get started
redirect_from: /soda-core/community.html
---

# Choose a flavor of Soda
*Last modified on {% last_modified_at %}*

A lightweight, verstile tool for testing amd monitoring data quality, you can have several options for deploying Soda in your environment.

As the first step in the **Get started roadmap**, this guide helps you decide how to set up Soda to best meet your data quality testing and monitoring needs. After choosing a flavor of Soda (type of deployment model), access the corresponding [Set up Soda](#next) instructions below.
<br />

#### Get started roadmap

1. **Choose a flavor of Soda** 📍 You are here!
2. Set up Soda: install, deploy, or invoke
3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate



## Choose a flavor of Soda

This guide helps you decide how to set up Soda to best meet your data quality testing and monitoring needs. After choosing your flavor of Soda (type of deployment model), access the corresponding [Set up Soda](#next-set-up-soda) below.

You can set up Soda in one of three (soon to be four!) flavors: 

| Flavor | Description | Soda<br />Library | Soda<br />Agent | Soda<br />Cloud |
| ----- | ----------- | :--: | :--: | :--: |
| [Self-operated](#self-operated) | A simple setup in which you install Soda Library locally and connect it to Soda Cloud via API keys. | ![done](/assets/images/done.png){:width="20px"} |   | ![done](/assets/images/done.png){:width="20px"} |
| [Self-hosted agent](#self-hosted-agent)<br /> | ***Recommended*** <br />A setup in which you deploy a Soda Agent in a Kubernetes cluster in a cloud-services environment and connect it to Soda Cloud via different API keys. |   | ![done](/assets/images/done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
| Fully-managed SaaS | **Coming soon!**<br />A setup in which you manage data quality entirely from your Soda Cloud account. |  |  | ![done](/assets/images/done.png){:width="20px"} |
| [Programmatic](#programmatic-setup) | A setup in which you invoke Soda Library programmatically. | ![done](/assets/images/done.png){:width="20px"} |   | ![done](/assets/images/done.png){:width="20px"} |

<details>
    <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
To validate your account license or free trial, Soda Library or a Soda Agent must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library or a Soda Agent. <br /><a href="https://docs.soda.io/soda/about.html">Learn more</a><br /><br />
</details>

<br />

#### Self-operated 

This simple setup enables you to `pip install` Soda Library from the command-line, then prepare YAML files to:
* configure connections to your data sources to run scans
* configure the connection to your Soda Cloud account to validate your license and visualize and share data quality check results
* write data quality checks

Use this setup for: <br />
✅ **A small team**: Manage data quality within a small data engineering team or data anlytics team who is comfortable working with the command-line and YAML files to design and execute scans for data quality. <br />
✅ **POC**: Conduct a proof-of-concept evaluation of Soda as a data quality testing and monitoring tool. See: [Take a sip of Soda]({% link soda/quick-start-sip.md %})<br />
✅ **Basic DQ**: Start from scratch to set up basic data quality checks on key datasets. See: TBD w/ check suggetions

Requirements:
* Python 3.8 or greater
* Pip 21.0 or greater
* Login credentials for your data source (Snowflake, Athena, MS SQL Server, etc.)

![with-library](/assets/images/with-library.png){:height="500px" width="500px"}

<br />

#### Self-hosted agent <br />
*Recommended*

This setup enables a data or infrastructure engineer to deploy Soda Libary as an agent in a Kubernetes cluster within a cloud-services environment such as Google Cloud Platform, Azure, or AWS. 

The engineer can manage access to data sources while giving Soda Cloud end-users easy access to Soda check results and enabling to write their own checks for data quality. Users connect to data sources and write checks for data quality directly in the Soda Cloud user interface.

Use this setup for:<br />
✅ **Self-serve data quality**: Empower data analysts and scientists to self-serve and write their own checks for data quality. See: [Self-serve data quality]({% link soda/quick-start-end-user.md %})<br />
✅ **Data migration**: Migrate good-quality data from one data source to another. See: [Test during data migration]({% link soda/quick-start-migration.md %})<br />
✅ **Data products**: Test data products to ensure clients, customers, or downstream users can trust the data they use for analysis and decisions. See: [Test data as a product]({% link soda/quick-start-product.md %})<br />
✅ **Automated data monitoring**: Set up data profiling and automated data quality monitoring. See: [Automate data quality tests]({% link soda/quick-start-automate.md %})<br />
✅ **Data catalog integration**: Integrate Soda with a data catalog such as Atlan, Alation, or Metaphor. See: [Add Soda to a data catalog]({% link soda/quick-start-catalog.md %})<br />

Requirements:
* Access to your cloud-services environment, plus the authorization to deploy containerized apps in a new or existing Kubernetes cluster
* Login credentials for your data source (Snowflake, Athena, MS SQL Server, etc.)

![with-agent](/assets/images/with-agent.png){:height="60px" width="600px"}

<br />

#### Programmatic 

Use this setup to invoke Soda programmatically in, for example, and Airflow DAG or GitHub Workflow. You provide connection details for data sources and Soda Cloud inline or in external YAML files, and similarly define data quality checks inline or in a separate YAML file.

Use this setup for:<br />
✅ **Testing during development**: Test data before and after ingestion and transformation during development.  See: [Test data during development]({% link soda/quick-start-dev.md %}) <br />
✅ **Circuit-breaking in a pipeline**: Test data in a pipeline so as enable circuit breaking that prevents bad-quality data from having a downstream impact. See: [Test data in production]({% link soda/quick-start-prod.md %})<br />
✅ **Databricks Notebook**: Invoke Soda data quality scans in a Databricks Notebook. See: [Add Soda to a Databricks notebook]({% link soda/quick-start-notebook.md %})<br />

Requirements:
* Python 3.8 or greater
* Pip 21.0 or greater
* Login credentials for your data source (Snowflake, Athena, MS SQL Server, etc.)

![programmatic](/assets/images/programmatic.png){:height="500px" width="500px"}

<br />

<!--
Consult the following matrix for further guidance on which flavor best suits your needs.

| Use case or data quality need | Flavor | Example setup | 
| Manage data quality within a small data engineering team or data anlytics team who is comfortable working with the command-line and YAML files to design and execute scans for data quality. |  Local  | [Take a sip of Soda]({% link soda/quick-start-sip.md %}) |
| Conduct a proof-of-concept evaluation of Soda as a data quality testing and monitoring tool. | Local |[Take a sip of Soda]({% link soda/quick-start-sip.md %})|
| Tackle a data migration project from one data source to another. | Local | [Test during data migration]({% link soda/quick-start-migration.md %})|
| Start from scratch to set up basic data quality checks on key datasets. | Local | TBD w/ check suggetions |
| Empower data analysts and scientists to self-serve and write their own checks for data quality. | Agent | [Self-serve data quality]({% link soda/quick-start-end-user.md %})|
| Test data products to ensure clients, customers, or downstream users can trust the data they use for analysis and decisions. | Agent | [Test data as a product]({% link soda/quick-start-product.md %})|
| Set up data profiling and automated data quality monitoring.| Agent |[Automate data quality tests]({% link soda/quick-start-automate.md %}) |
| Integrate Soda with a data catalog such as Atlan, Alation, or Metaphor.| Agent |[Add Soda to a data catalog]({% link soda/quick-start-catalog.md %})|
| Test data before and after ingestion and transformation during development.| Programmatic | [Test data during development]({% link soda/quick-start-dev.md %})|
| Test data in a pipeline so as enable circuit breaking that prevents bad-quality data from having a downstream impact.| Programmatic |[Test data in production]({% link soda/quick-start-prod.md %})|
| Invoke Soda data quality scans in a Databricks Notebook.| Programmatic |[Add Soda to a Databricks notebook]({% link soda/quick-start-notebook.md %})|
-->

## Next

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. **Set up Soda.** Select the setup instructions that correspond with your flavor of Soda:
* [Self-operated]({% link soda-library/install.md %})
* [Self-hosted agent]({% link soda-agent/deploy.md %})
* [Programmatic]({% link soda-library/programmatic.md %})
3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate


Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br/>

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No" popup_disabled="true"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}