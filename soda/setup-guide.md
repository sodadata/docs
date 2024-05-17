---
layout: default
title: Choose a flavor of Soda
description: Use this guide to help you decide which Soda deployment model best fits your data quality testing needs.
parent: Get started
redirect_from:
- /soda-core/community.html
- /soda-cloud/overview.html
---

# Choose a flavor of Soda
*Last modified on {% last_modified_at %}*

A lightweight, versatile tool for testing and monitoring data quality, you have several options for deploying Soda in your environment.

As the first step in the **Get started roadmap**, this guide helps you decide how to set up Soda to best meet your data quality testing and monitoring needs. After choosing a flavor of Soda (type of deployment model), access the corresponding [Set up Soda](#next) instructions below.
<br />

#### Get started roadmap

1. **Choose a flavor of Soda** 📍 You are here!
2. Set up Soda: sign up and install, deploy, or invoke
3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate



## Choose a flavor of Soda

This guide helps you decide how to set up Soda to best meet your data quality testing and monitoring needs. See also: [Soda product overview]({% link soda/product-overview.md %}).

You can set up Soda in one of four flavors: 

| Flavor | Description | Soda<br />Library | Soda<br />Agent | Soda<br />Cloud |
| ----- | ----------- | :--: | :--: | :--: |
| [Self-operated](#self-operated) | A simple setup in which you install Soda Library locally and connect it to Soda Cloud via API keys. | ![done](/assets/images/done.png){:width="20px"} |   | ![done](/assets/images/done.png){:width="20px"} |
| [Soda-hosted agent](#soda-hosted-agent) | ***Recommended*** <br />A setup in which you manage data quality entirely from your Soda Cloud account. |  | ![done](/assets/images/done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
| [Self-hosted agent](#self-hosted-agent)<br /> | A setup in which you deploy a Soda Agent in a Kubernetes cluster in a cloud-services environment and connect it to Soda Cloud via different API keys. |   | ![done](/assets/images/done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
| [Programmatic](#programmatic) | A setup in which you invoke Soda Library programmatically. | ![done](/assets/images/done.png){:width="20px"} |   | ![done](/assets/images/done.png){:width="20px"} |

<details>
    <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
To validate your account license or free trial, Soda Library or a Soda Agent must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library or a Soda Agent. <br /><a href="https://docs.soda.io/soda/get-started-roadmap.html#about-soda">Learn more</a><br /><br />
</details>

<br />

#### Self-operated 

This simple setup enables you to `pip install` Soda Library from the command-line, then prepare YAML files to:
* configure connections to your data sources to run scans
* configure the connection to your Soda Cloud account to validate your license and visualize and share data quality check results
* write data quality checks

Use this setup for: <br />
✅ **A small team**: Manage data quality within a small data engineering team or data analytics team who is comfortable working with the command-line and YAML files to design and execute scans for data quality. <br />
✅ **POC**: Conduct a proof-of-concept evaluation of Soda as a data quality testing and monitoring tool. See: [Take a sip of Soda]({% link soda/quick-start-sip.md %})<br />
✅ **Basic DQ**: Start from scratch to set up basic data quality checks on key datasets. See: [Check suggestions]({% link soda-library/check-suggestions.md %})<br />
✅ **Data migration**: Migrate good-quality data from one data source to another. See: [Test before data migration]({% link soda/quick-start-migration.md %})<br />

Requirements:
* Python 3.8 or greater
* Pip 21.0 or greater
* Login credentials for your data source (Snowflake, Athena, MS SQL Server, etc.)

![with-library](/assets/images/with-library.png){:height="500px" width="500px"}

<br />

#### Soda-hosted agent
*Recommended*

This setup provides a secure, out-of-the-box Soda Agent to manage access to data sources from within your Soda Cloud account. Quickly configure connections to your data sources in the Soda Cloud user interface, then empower all your colleagues to explore datasets, access check results, customize collections, and create their own no-code checks for data quality.

Use this setup for:<br /> 
✅ **A quick start**: Use the out-of-the-box agent to start testing data quality right away from within the Soda Cloud user interface, without the need to install or deploy any other tools. <br />
✅ **Anomaly detection dashboard**: ![preview](/assets/images/preview.png){:height="45px" width="45px" style="vertical-align:baseline"} Use Soda's out-of-the-box **anomaly dashboards** to get automated insights into basic data quality metrics for your datasets. See: [Add anomaly dashboards]({% link soda-cloud/anomaly-dashboard.md %})<br /><a href="https://go.soda.io/join-observability-preview" target="_blank">Request preview access</a><br />
✅ **Automated data monitoring**: Set up data profiling and automated data quality monitoring. See: [Automate monitoring]({% link soda/quick-start-automate.md %})<br />
✅ **Self-serve data quality**: Empower data analysts and scientists to self-serve and create their own no-code checks for data quality. See: [Self-serve Soda]({% link soda/quick-start-end-user.md %})<br />
✅ **Data migration**: Migrate good-quality data from one data source to another. See: [Test before data migration]({% link soda/quick-start-migration.md %})<br />
✅ **Data catalog integration**: Integrate Soda with a data catalog such as Atlan, Alation, or Metaphor. See: [Integrate Soda]({% link soda/integrate-alation.md %})<br />

Soda hosts agents in a secure environment in Amazon AWS. As a SOC 2 Type 2 certified business, Soda responsibly manages Soda-hosted agents to ensure that they remain private, secure, and independent of all other hosted agents. See [Data security and privacy]({% link soda/data-privacy.md %}#using-a-soda-hosted-agent) for details.

Requirements:
* Login credentials for your data source (BigQuery, Databricks SQL, MS SQL Server, MySQL, PostgreSQL, Redshift, or Snowflake)

![with-managed-agent](/assets/images/with-managed-agent.png){:height="60px" width="600px"}

<br />

#### Self-hosted agent

This setup enables a data or infrastructure engineer to deploy Soda Library as an agent in a Kubernetes cluster within a cloud-services environment such as Google Cloud Platform, Azure, or AWS. 

The engineer can manage access to data sources while giving Soda Cloud end-users easy access to Soda check results and enabling them to write their own checks for data quality. Users connect to data sources and create no-code checks for data quality directly in the Soda Cloud user interface.

Use this setup for:<br />
✅ **Self-serve data quality**: Empower data analysts and scientists to self-serve and create their own checks for data quality. See: [Self-serve Soda]({% link soda/quick-start-end-user.md %})<br />
✅ **Data migration**: Migrate good-quality data from one data source to another. See: [Test before data migration]({% link soda/quick-start-migration.md %})<br />
✅ **Anomaly detection dashboard**: ![preview](/assets/images/preview.png){:height="45px" width="45px" style="vertical-align:baseline"} Use Soda's out-of-the-box **anomaly dashboards** to get automated insights into basic data quality metrics for your datasets. See: [Add anomaly dashboards]({% link soda-cloud/anomaly-dashboard.md %})<br /><a href="https://go.soda.io/join-observability-preview" target="_blank">Request preview access</a><br />
✅ **Automated data monitoring**: Set up data profiling and automated data quality monitoring. See: [Automate monitoring]({% link soda/quick-start-automate.md %})<br />
✅ **Data catalog integration**: Integrate Soda with a data catalog such as Atlan, Alation, or Metaphor. See: [Integrate Soda]({% link soda/integrate-alation.md %})<br />
✅ **Secrets manager integration**: Integrate your Soda Agent with an external secrets manager to securely access frequently-rotated data source login credentials. See: [Integrate with a Secrets Manager]({% link soda-agent/secrets.md %}#integrate-with-a-secrets-manager)

Requirements:
* Access to your cloud-services environment, plus the authorization to deploy containerized apps in a new or existing Kubernetes cluster
* Login credentials for your data source (Snowflake, Athena, MS SQL Server, etc.)

![with-agent](/assets/images/with-agent.png){:height="60px" width="600px"}

<br />


#### Programmatic 

Use this setup to invoke Soda programmatically in, for example, and Airflow DAG or GitHub Workflow. You provide connection details for data sources and Soda Cloud inline or in external YAML files, and similarly define data quality checks inline or in a separate YAML file.

Use this setup for:<br />
✅ **Testing during development**: Test data before and after ingestion and transformation during development.  See: [Test data during development]({% link soda/quick-start-dev.md %}) <br />
✅ **Circuit-breaking in a pipeline**: Test data in a pipeline so as to enable circuit breaking that prevents bad-quality data from having a downstream impact. See: [Test data in production]({% link soda/quick-start-prod.md %})<br />
✅ **Databricks Notebook**: Invoke Soda data quality scans in a Databricks Notebook. See: [Add Soda to a Databricks notebook]({% link soda/quick-start-databricks.md %})<br />

Requirements:
* Python 3.8 or greater
* Pip 21.0 or greater
* Login credentials for your data source (Snowflake, Athena, MS SQL Server, etc.)

![programmatic](/assets/images/programmatic.png){:height="500px" width="500px"}

<br />

## Next

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. **Set up Soda.** Select the setup instructions that correspond with your flavor of Soda:
* [Self-operated]({% link soda-library/install.md %})
* [Soda-hosted agent]({% link soda-agent/managed-agent.md %})
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