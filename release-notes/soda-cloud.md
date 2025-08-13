---
description: >-
  Review release notes for Soda Cloud, a web app that enables you visualize data
  quality test results and set alerts and notifications.
---

# Release notes for Soda Cloud

### \[soda-cloud] Bulk-edit dataset responsibilities and attributes

<sup>17 October 2024</sup>

Soda’s newest feature enables you to apply attributes, or assign users or user groups, and set their permissions, for more than one dataset at a time. To do so, access the Datasets page in the UI, select multiple datasets, then select **Edit**. Changes you make apply to all the selected datasets.

***

### \[soda-cloud] Introducing custom roles

<sup>26 September 2024</sup>

To manage the actions of users that belong to a single organization, Soda Cloud uses roles, groups, and access permissions. These roles and groups and their associated permissions enforce limits on the abilities for users to access or make changes to resources, or to make additions and changes to organization settings and default access permissions.

New in Soda Cloud, you can create and edit new global or dataset roles to customize access to resources and functionalities in your organization.

See: [Manage global roles, user groups, and settings](../collaborate/roles-global.md)\
See: [Manage dataset roles](../collaborate/roles-dataset.md)

***

### \[soda-cloud] Sync user groups with IdP

<sup>25 July 2024</sup>

Soda Cloud introduces a new feature that enables Admins to regularly one-way sync the user groups you have defined in Okta or Azure Active Directory into Soda Cloud via SSO integration.

Doing so obviates the need to manually create user groups in Soda Cloud that you have already defined in your IdP, and enables your team to select an IdP-managed user groups when assigning ownership access permissions to a resource, in addition to any user groups you may have created manually in Soda Cloud.

[Learn more](../integrate-soda/sso.md#sync-user-groups-from-an-idp)

***

### \[soda-cloud] User groups

<sup>08 July 2024</sup>

Create user groups in Soda Cloud to manage role-based permissions (**Admin**, **Manager**, **Editor**, **Viewer**) to resources. Once created, assign role-based permission to access a dataset to user groups, or assign user groups as alert notification rules recipients, and more.

Refer to [Create custom user groups](../collaborate/roles-global.md#manage-user-groups) for details.

***

### \[soda-cloud] Soda AI

<sup>30 May 2024</sup>

Announcing **Soda AI**, a suite of generative AI (GenAI) features made generally available, and available for preview upon request.

**Soda AI SQL Assistant** and **Soda AI Regex Assistant**\
Powered by OpenAI’s GPT-3.5 & GPT-4, the generative SQL and regular expression assistants available in Soda Cloud’s no-code checks helps you write the queries and expressions you can add to validity, missing, SQL failed rows, and SQL metric checks. The Soda AI SQL or Regex Assistants are enabled for _new_ Soda Cloud accounts by default. If you do not wish to use them, navigate to **your avatar** > **Organization Settings**, then click to remove the check from the box for **Enable SQL and Regex Assistants Powered By Powered by OpenAI**.\
Read more in [Write SodaCL checks](../soda-cl-overview/#about-soda-ai-assistants).

**Ask AI Assistant**\
Powered, in part, by kapa.ai, the Ask AI Assistant in Soda Cloud answers almost any question you have about Soda, from how to integrate with other tools, to writing SodaCL, to addressing errors, and beyond. [Request preview access](https://go.soda.io/join-soda-ai-preview) to begin experimenting with the power of GenAI-driven data quality testing.

***

### \[soda-cloud] Anomaly Dashboard

<sup>23 May 2024</sup>

Introducing Soda’s **Anomaly Dashboard for observability**. Use the dashboard driven by machine learning to get automated insights into basic data quality metrics for your datasets. [Learn more](../collaborate/anomaly-dashboard.md)

Supported by Soda deployments that use a self-hosted or Soda-hosted Agent to connect to data sources.

![profile-anomalies](https://docs.soda.io/assets/images/profile-anomalies.png)

***

### \[soda-cloud] Soda AI Assistants

<sup>28 March 2024</sup>

Powered by OpenAI’s GPT-3.5 & GPT-4, the generative SQL and regular expression assistants available in Soda Cloud’s no-code checks helps you write the queries and expressions you can add to validity, missing, SQL failed rows, and SQL metric checks.

Soda’s SQL or Regex assistants are enabled for new Soda Cloud accounts by default. If you do not wish to use them, navigate to **your avatar** > **Organization Settings**, then click to remove the check from the box for **Enable SQL and Regex Assistants Powered By Powered by OpenAI**.

Read more in [Write SodaCL checks](../soda-cl-overview/).

***

### \[soda-cloud] New Soda Cloud onboarding

<sup>29 February 2024</sup>

Leveraging the release of the new Soda-hosted Agent, the Soda Cloud onboarding experience for new users has changed to a more streamlined experience setting up a new data source connection and preparing OOTB automated-monitoring checks within a few minutes. [Sign up](https://cloud.soda.io/signup) for Soda Cloud, then click **Get Started** to quickly get set up in the user interface and start checking your data for quality.

Additionally, **schema checks** are now acessible via no-code check user interface in Soda Cloud.

***

### \[soda-cloud] Soda-hosted Agent

<sup>01 February 2024</sup>

Introducing a secure, out-of-the-box Soda-hosted Agent to manage access to data sources from within your Soda Cloud account. Quickly configure connections to your data sources in the Soda Cloud user interface, then empower all your colleagues to explore datasets, access check results, customize collections, and create their own no-code checks for data quality.

Learn how to [Set up a Soda-hosted agent](../quick-start-sip/managed-agent.md).

***

### \[soda-cloud] Soda Cloud offers no-code checks

<sup>07 December 2023</sup>

Soda Cloud now supports no-code check creation.

To create no-code checks, you must be working with a dataset that has been onboarded via a data source connected using a Soda Agent. You must also have Admin, Manager, or Editor rights to add a no-code check to a dataset.

See: [Define SodaCL checks](../soda-cl-overview/#define-sodacl-checks)

***

### \[soda-cloud] Manage scheduled scans

<sup>21 November 2023</sup>

Soda Cloud now supports scan failure alerts and improved scan visibility and management. Upgrade to Soda Agent v0.8.49 to access scan management features.

See [Manage scheduled scans](../run-a-scan/scan-mgmt.md) for details.

***

### \[soda-cloud] 90-day check history

<sup>13 October 2023</sup>

In addition to seven, 30, and 60 days, Soda Cloud now offers 90 days of check result history.

![90-day-history](https://docs.soda.io/assets/images/90-day-history.png)

***

### \[soda-cloud] Data quality dashboard

<sup>05 October 2023</sup>

Today marks the launch of the new Data Quality Dashboard in Soda Cloud. Get at-a-glance insight into check performance, overall data health, and activity information about users, active checks, and alert notifications. Access the **Dashboard** in the main navigation bar in Soda Cloud.

***

### \[soda-cloud] Soda Cloud agreements only run on approval

<sup>23 August 2023</sup>

The agreement behavior in Soda Cloud has been changed.

As of this release, agreements do not run scans without stakeholder approval. When all stakeholders have approved an agreement, Soda Cloud begins running scans of your data according to the agreement’s scan definition.

Previously, Soda did not require stakeholder approval before running scans scheduled in an agreement.

See: [Schedule a scan](../run-a-scan/#scan-for-data-quality)

***

### \[soda-cloud] Collections

<sup>10 August 2023</sup>

The **Checks** dashboard in Soda Cloud now offers a feature to save **Collections**. Craft a combination of Soda Cloud filters to display your ideal set of data quality checks, then click **Save Collection** to name the custom filtered view so you can quickly access it again in the future.

***

### \[soda-cloud] Checks dashboard

<sup>08 August 2023</sup>

Soda Cloud now uses a new **Checks** dashboard which displays checks and their latest scan results. This replaces the **Check Results** dashboard, that displayed all individual check results.

***

### \[soda-cloud] Regions and multiple organizations

<sup>02 May 2023</sup>

* Soda Cloud users may set up [multiple Soda Cloud organizations](../collaborate/roles-global.md) for use with different environments in a network infrastructure, such as staging and production.
* New Soda Cloud users must select a region in which to store their account data when creating a Soda Cloud account.

***

### \[soda-cloud] AWS PrivateLink

<sup>28 February 2023</sup>

Soda Cloud users may now set up private connectivity to a Soda Cloud account using [AWS PrivateLink](soda-cloud.md#soda-cloud-soda-agent-deploy-a-soda-agent-in-a-gke-cluster-preview).

***

### \[soda-cloud] Soda Agents made generally available

<sup>23 February 2023</sup>

Soda Agent deployment instructions have been made generally available, no longer in Preview state. See:

* [Deploy a Soda Agent in Azure AKS](../quick-start-sip/deploy.md#azure-aks)
* [Deploy a Soda Agent in Google GKE](../quick-start-sip/deploy.md#google-gke)

***

### \[soda-cloud] Scheme property for connecting Core to Cloud

<sup>30 January 2023</sup>

The connection configuration for connecting Soda Core to Soda Cloud now includes the option to add a scheme property. This property allows you to provide a value for the scheme property to indicate which scheme to use to initialize the URI instance.

***

### \[soda-cloud] Multiple owners of agreements

<sup>26 January 2023</sup>

For all our Soda Cloud Agreements users, we’ve made it possible to assign multiple owners to agreements.

***

### \[soda-cloud] Check attributes

<sup>26 January 2023</sup>

Soda Cloud added a new feature to define check attributes that your team can apply to checks when they write them in an agreement or in a checks YAML file for Soda Core.

Read more in [Add check attributes](../collaborate/check-attributes.md).

***

### \[soda-cloud] Notification rules made generally available

<sup>20 December 2022</sup>

Soda Cloud notification rules have been made generally available, no longer in Preview state. See [Set notification rules](../collaborate/notif-rules.md).

***

### \[soda-cloud, soda-agent] Deploy a Soda Agent in a GKE cluster (Preview)

<sup>20 December 2022</sup>

Released in Preview state, you can now deploy a Soda Agent in a Google Kubernetes Engine cluster.

Access the [documentation](../quick-start-sip/deploy.md) to learn how to set up a cluster, then deploy an agent that connects to your Soda Cloud via account API keys.

***

### \[soda-cloud] Disable or reroute failed row samples

<sup>15 December 2022</sup>

Use these new ways of managing exposure to sensitive data such as personally identifiable information (PII), when collecting failed row samples.

* Disable failed rows samples for specific columns to effectively “turn off” failed row collection for specific columns in datasets.
* Reroute any failed rows samples that Soda collects to a secure, internal location rather than Soda Cloud. To do so, add the storage configuration to your sampler configuration to specify the columns you wish to exclude.

***

### \[soda-cloud, soda-agent] Deploy a Soda Agent in a AKS cluster (Preview)

<sup>02 December 2022</sup>

Released in Preview state, you can now deploy a Soda Agent in an Azure Kubernetes Service cluster.

Access the [documentation](../quick-start-sip/deploy.md) to learn how to set up a regular or virtual cluster, then deploy an agent that connects to your Soda Cloud via account API keys.

***

### \[soda-cloud] Notification rules (Preview)

<sup>01 December 2022</sup>

Introducing the ability to set notification rules in your Soda Cloud account. Released as a Preview feature, you can define where and when to send multiple alert notifications when check results warn or fail.

[Read more](../collaborate/notif-rules.md) about how to set up and use notification rules.

***

### \[soda-cloud] Soda Cloud self-serve features, GA

<sup>26 October 2022</sup>

Introducing the general availability of the new self-serve features in Soda Cloud.

* [Deploy a Soda Agent](../quick-start-sip/deploy.md)
* [Add a data source in Soda Cloud](../quick-start-sip/deploy.md#add-a-new-data-source)
* [Create an agreement](../soda-cl-overview/#create-a-new-agreement)

Note that with this launch, all documentation now refers to “checks” as the replacement for “monitors” in Soda Cloud. Refer to [Glossary](../learning-resources/glossary.md) for details.

***

### \[soda-cloud] Customizable failed rows and samples

<sup>18 October 2022</sup>

Introducing the ability to prevent Soda Cloud from receiving any sample data or failed row samples for any datasets in any data sources to which you have connected your Soda Cloud account.

Alternatively, learn how to reroute sample data and failed row samples to a secure location within your organization’s infrastructure, such as an Amazon S3 bucket.

***

### \[soda-cloud] MS Teams integration

<sup>23 September 2022</sup>

Soda Cloud provides a built-in way to integration with Microsoft Teams so you can send alert notifications or incident events to MS Teams.

Read more in [Integrate with Microsoft Teams](../integrate-soda/integrate-msteams.md).

***

### \[soda-cloud] Webhooks and deletions

<sup>12 September 2022</sup>

Soda Cloud introduces two new features:

* Configure a [webhook](../integrate-soda/integrate-webhooks.md) in Soda Cloud to send alert notifications or incident updates to a third-party tool such as Jira, ServiceNow, PagerDuty and more.
* Clean up and organize your Soda Cloud account by deleting stale or unused resources such as old datasets. You can bulk delete your old resources.

***

### \[soda-cloud] Dataset and column profiling

<sup>20 July 2022</sup>

Released the discover datasets and/or profile columns configurations to send information about datasets and columns to Soda Cloud. Examine the profile information to gain insight into the type checks you can prepare to test for data quality.

Read more in [Display profile information in Soda Cloud](../soda-cl-overview/profile.md).

***

### \[soda-cloud] Automated monitoring

<sup>20 July 2022</sup>

When connecting a data source to your Soda Cloud account, you can add automated monitoring checks to instruct Soda to automatically check for row count anomalies and schema changes in datasets.

Read more in [Automated monitoring checks](../soda-cl-overview/automated-monitoring.md).

***

### \[soda-cloud] Soda Cloud self-serve features, preview

<sup>04 July 2022</sup>

Introducing the preview availability of the new self-serve features in Soda Cloud.

Contact [support@soda.io](mailto:support@soda.io) to request a demo or preview access to experiment with the latest and greatest.

* Deploy a Soda Agent
* Add a data source in Soda Cloud
* Create an agreement

Note that with this launch, all documentation now refers to “checks” as the replacement for “monitors” in Soda Cloud. Refer to [Glossary](../learning-resources/glossary.md) for details.

***

### \[soda-cloud] Default responsibility for dataset owner

<sup>29 June 2022</sup>

For datasets that are newly added to Soda Cloud, Soda Admins can define the default responsibility given to the data owner, either **Manager** or **Editor**.

Read more in [Roles and Rights in Soda Cloud](../collaborate/roles-global.md).

***

### \[soda-cloud] Display dataset for each Monitor Result

<sup>06 May 2022</sup>

In the [**Monitors**](https://cloud.soda.io/monitors) dashboard, the table of **Monitor Results** now includes the name of the dataset to which each monitor is associated.

***

### \[soda-cloud] Dataset health indicators

<sup>29 April 2022</sup>

Soda Cloud introduces a new feature that enables you to gauge a dataset’s overall health using graphic indicators. Access a set of three indicators in the **Dashboards** tab of the **Datasets** dashboard to see:

* the volume of monitors associated with the dataset(s)
* a chart that offers insight into the number of failed monitor results over time for the dataset(s)
* the volume of recent Incidents associated with the dataset(s)

Use the health indicators to prioritize your work in ameliorating the quality of data in datasets that need improvement.

***

### \[soda-cloud] Attributes and filtering

<sup>10 February 2022</sup>

Organize great volumes of datasets in your Soda Cloud account using [attributes and tags](../collaborate/organize-datasets.md). Coupled with the new feature that enables you to apply filters to the Datasets dashboard, you can more easily access the data quality information you’re looking for.

***

### \[soda-cloud] Change default access settings for datasets

<sup>12 January 2022</sup>

Change the default access settings for new datasets in to Soda Cloud. Access the Change the default access to datasets section in our documentation to learn more.

***

### \[soda-cloud] Integrate dbt with Soda

<sup>16 December 2021</sup>

Review dbt test results from within the Soda Cloud UI. Access the documentation to learn how to integrate [Soda with dbt](../integrate-soda/integrate-dbt.md).

***

### \[soda-cloud] Incidents

<sup>14 December 2021</sup>

Create an Incident in Soda Cloud to track your team’s investgation and resolution of a data quality issue. Use an Incident’s built-in ability to create an incident-specific Slack channel where you and your team can collaborate on the issue investigation.

See [Create and track incidents](broken-reference) for details.

***

### \[soda-cloud] Integrate Soda with Metaphor

<sup>13 December 2021</sup>

Review Soda data quality information from within the Metaphor catalog UI. Access the documentation to learn how to integrate [Soda with Metaphor](../integrate-soda/integrate-metaphor.md).

***

### \[soda-cloud] Audit Trail in Soda Cloud

<sup>06 December 2021</sup>

, you can download an Audit Trail that records the activities of all of the users in your Soda Cloud account. Read the [Download an audit trail docs](../collaborate/roles-global.md#access-an-audit-trail) to learn more.

***

### \[soda-cloud] Reporting API

<sup>23 November 2021</sup>

Introducing Soda Cloud Reporting API v0. This API enables you and your team to access Soda Cloud data to build reporting dashboards that share information about:

* Soda Cloud adoption throughout your organization
* test and monitor result status
* dataset test coverage, and dataset health

Access the [Soda Cloud Reporting API](../reporting-api-v1/) documentation to learn more. Read the [step-by-step guide](../use-case-guides/reporting-api-to-overview-dashboards.md) to learn how to build your own reporting dashboard.

***

### \[soda-cloud] Remove Add datasets feature

<sup>25 October 2021</sup>

Soda Cloud no longer offers the feature to Add datasets directly in Soda Cloud. Instead, users add datasets using Soda SQL. With the removal of this feature, users can no longer:

* edit data source connection details in Soda Cloud
* define data source or dataset scan schedules in Soda Cloud
* set time-partitioning parameters for scheduled scans

***

### \[soda-cloud] Schema Evolution Monitor in Soda Cloud

<sup>14 October 2021</sup>

New Schema Evolution monitor is now available in Soda Cloud.

***

### \[soda-cloud] Roles and rights in Soda Cloud

<sup>30 September 2021</sup>

Role-based user access control support is now available for Soda Cloud. Read the Roles and rights docs to learn more.

***

### \[soda-cloud] Single sign-on (SSO) with Soda Cloud

<sup>28 September 2021</sup>

Single sign-on support is now available for Soda Cloud with SAML 2.0 Identity Providers (IdP), Okta and Azure AD. Contact [Soda Support](mailto:support@soda.io) to set up Soda Cloud as a service provider in your SSO IdP so that users in your organization must log in to Soda Cloud via the IdP. Read the [Single sign-on docs](../integrate-soda/sso.md) to learn more about activating and using SSO with Soda Cloud.
