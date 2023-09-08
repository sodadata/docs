---
layout: default
title: Soda Set up guide
description: TBD
parent: Get started
redirect_from: /soda-core/community.html
---

# Soda set up guide
*Last modified on {% last_modified_at %}*

**Soda** enables Data Engineers to test data in a data source to surface invalid, missing, or unexpected data. 

The following outlines the steps for how to get started with Soda; the first two steps are documented below.

[![step1](/assets/images/step1.png){:height="300px" width="300px"}](#learn-the-basics)<br />
[![step2](/assets/images/step2.png){:height="300px" width="300px"}](#choose-a-flavor-of-soda)<br />
[![step3](/assets/images/step3.png){:height="300px" width="300px"}]({% link soda-library/install.md%})<br />
[![step4](/assets/images/step4.png){:height="300px" width="300px"}]({% link soda-cl/soda-cl-overview.md%})<br />
[![step5](/assets/images/step5.png){:height="300px" width="300px"}]({% link soda-library/run-a-scan.md%})<br />
[![step6](/assets/images/step6.png){:height="300px" width="300px"}]({% link soda-cloud/roles-and-rights.md%})

<!--
1. Learn the basics
2. Choose a flavor of Soda
3. Set up Soda
4. Write SodaCL checks
5. Run scans, review results
6. Organize, alert, investigate
-->

**TL;DR:** [Take a sip of Soda]({% link soda/quick-start-sip.md %})

## Learn the basics

{% include about-soda.md %}

## Choose a flavor of Soda

This guide helps you decide how to set up Soda to best meet your data quality testing and monitoring needs. After choosing your flavor of Soda (type of deployment model), access the corresponding [Set up instructions](#setup-instructions) below.

You can set up Soda in one of three flavors: 

| Flavor | Description | ![soda-library-logo](/assets/images/soda-library-logo.png){:height="175px" width="175px"} | ![soda-agent-logo](/assets/images/soda-agent-logo.png){:height="150px" width="150px"} | ![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="150px" width="150px"} |
| ----- | ----------- | :----------: | :--------: | :--------: |
| [Local](#local-setup) | A simple setup in which you install Soda Library locally and connect it to Soda Cloud via API keys. | ![done](/assets/images/done.png){:width="20px"} |   | ![done](/assets/images/done.png){:width="20px"} |
| [Agent](#agent-setup) | A setup in which you deploy a Soda Agent in a Kubernetes cluster in a cloud-services environment and connect it to Soda Cloud via different API keys. |   | ![done](/assets/images/done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
| [Programmatic](#programmatic-setup) | A setup in which you invoke Soda Library programmatically. | ![done](/assets/images/done.png){:width="20px"} |   | ![done](/assets/images/done.png){:width="20px"} |

<details>
    <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
To validate your account license or free trial, Soda Library or a Soda Agent must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection between Soda Library or a Soda Agent. <br /><a href="https://docs.soda.io/soda/about.html">Learn more</a>.<br /><br />
</details>

<br />

#### Local 

This simple setup enables you to `pip install` Soda Library from the command-line, then prepare YAML files to:
* configure connections to your data sources to run scans
* configure the connection to your Soda Cloud account to validate your license and visualize and share data quality check results
* write data quality checks

<!--
Use this setup to: 
* manage data quality within a small data engineering team or data anlytics team who is comfortable working with the command-line and YAML files to design and execute scans for data quality. 
* conduct a proof-of-concept evaluation of Soda as a data quality testing and monitoring tool. Example setup: [Take a sip of Soda]({% link soda/quick-start-sip.md %})
* migrate good-quality data from one data source to another. Example setup: [Test during data migration]({% link soda/quick-start-migration.md %})
* start from scratch to set up basic data quality checks on key datasets. Example setup: TBD w/ check suggetions
-->

![with-library](/assets/images/with-library.png){:height="500px" width="500px"}

<br />

#### Agent 

This setup enables a data or infrastructure engineer to deploy Soda Libary as an agent within a cloud-services environment such as Google Cloud Platform, Azure, or AWS. 

The engineer can manage access to data sources while giving Soda Cloud end-users easy access to Soda check results and enabling to write their own checks for data quality. Users connect to data sources and write checks for data quality directly in the Soda Cloud user interface.

<!--
Use this setup to:
* empower data analysts and scientists to self-serve and write their own checks for data quality. Example setup: [Self-serve data quality]({% link soda/quick-start-end-user.md %})
* test data products to ensure clients, customers, or downstream users can trust the data they use for analysis and decisions. Example setup: [Test data as a product]({% link soda/quick-start-product.md %})
* set up data profiling and automated data quality monitoring. Example setup: [Automate data quality tests]({% link soda/quick-start-automate.md %})
* integrate Soda with a data catalog such as Atlan, Alation, or Metaphor. Example setup: [Add Soda to a data catalog]({% link soda/quick-start-catalog.md %})
-->

![with-agent](/assets/images/with-agent.png){:height="60px" width="600px"}


<br />

#### Programmatic 

Use this setup to invoke Soda programmatically in, for example, and Airflow DAG or GitHub Workflow. You provide connection details for data sources and Soda Cloud inline or in external YAML files, and similarly define data quality checks inline or in a separate YAML file.

<!--
Use this setup to:
* test data before and after ingestion and transformation during development.  Example setup: [Test data during development]({% link soda/quick-start-dev.md %})
* test data in a pipeline so as enable circuit breaking that prevents bad-quality data from having a downstream impact. Example setup: [Test data in production]({% link soda/quick-start-prod.md %})
* invoke Soda data quality scans in a Databricks Notebook. Example setup: [Add Soda to a Databricks notebook]({% link soda/quick-start-notebook.md %})
-->

![programmatic](/assets/images/programmatic.png){:height="500px" width="500px"}

<br />

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


## Setup instructions

Navigate to the setup instructions that correspond with your flavor of Soda.
* **Local**: [Install Soda Library]({% link soda-library/install.md %})
* **Agent**: [Deploy a Soda Agent]({% link soda-agent/deploy.md %})
* **Programmatic**: [Invoke Soda Library]({% link soda-library/programmatic.md %})




---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No" popup_disabled="true"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}