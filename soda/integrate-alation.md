---
layout: default
title: Integrate Soda Cloud with Alation
description: Integrate Soda with Alation to access details about the quality of your data from right within your data catalog. 
parent: Integrate Soda
redirect_from: /soda-cloud/integrate-alation.html
---

# Integrate Soda Cloud with Alation

Integrate Soda with Alation to access details about the quality of your data from within the data catalog.

* Run data quality checks using Soda and visualize quality metrics and rules within the context of a data source, dataset, or column in Alation. 
* Use Soda Cloud to flag poor-quality data in lineage diagrams and during live querying. 
* Give your Alation users the confidence of knowing that the data they are using is sound.
 
![alation-integration](/assets/images/alation-integration.png){:height="700px" width="700px"} 

<br />

Watch an video that demonstrates the integration between Soda and Alation.
<iframe src="https://player.vimeo.com/video/563765014?h=672726942b" width="680" height="440" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>


## Prerequisites

* You have a Soda Cloud account with [Admin permissions]({% link soda-cloud/roles-and-rights.md %}), [connected]({% link soda-core/connect-core-to-cloud.md %}) to an instance of Soda Core.
* You have [configured Soda Core]({% link soda-core/configuration.md %}) to access the data source on which you want to run quality checks.
* You have completed at least one [Soda scan]({% link soda-core/scan-core.md %}) to validate that the data source’s datasets appear in Soda Cloud as expected.
* You have an Alation account with the privileges necessary to allow you to add a data source, create custom fields, and customize templates.
* You have a git repository in which to store the integration project files.


## Set up the integration

1. Sign into your Soda Cloud account and confirm that you see the datasets you expect to see in the data source you wish to test for quality.
2. To connect your Soda Cloud account to your Alation Service Account, create an `.env` file in your integration project in your git repo and include details according to the example below. To obtain the values for your Soda API keys, refer to the [Connect to Soda Cloud documentation]({% link soda-core/connect-core-to-cloud.md %}). <br />
```yaml
ALATION_HOST=yourcompany.alationcatalog.com
ALATION_USER=<your username for your Alation account>
ALATION_PASSWORD=<your password for your Alation account>
SODA_HOST=cloud.soda.io
SODA_API_KEY_ID=<your Soda Cloud pubic key>
SODA_API_KEY_SECRET=<your Soda Cloud private key>
```
3. To sync a data source and schema in the Alation catalog to a data source in Soda Cloud, you must map it from Soda Cloud to Alation. Create a `.datasource-mapping.yml` file in your integration project and populate it with mapping data according to the following example. The table below describes where to retrieve the values for each field.<br />
```yaml
- name: Cars
  soda:
    datasource_id: 2d33bf0a-9a1c-4c4b-b148-b5af318761b3
    # optional dataset_mapping   soda: catalog
    dataset_mapping: 
       Cars_data: Cars
  catalog:
    type: "alation"
    datasource_id: "31"
    datasource_container_name: "soda"
- name: Soda Demo
  soda:
    datasource_id: 8505cbbd-d8b3-48a4-bad4-cfb0bec4c02f
  catalog:
    type: "alation"
    datasource_id: "37"
    datasource_container_name: "public"
```
<br />

| Field | Retrieve value from |
| ----- | ------------------- |
| name  | A name you choose as an identifier for an integration between Soda Cloud and a data catalog. |
|soda: <br />    datasource_id | The data source information panel in Soda Cloud. |
|soda: <br />    dataset_mapping | (Optional) When you run the integration, Soda automatically maps all of the datasets between data sources. However, if the names of the datasets differ in the tools you can use this property to manually map datasets between tools. <br /> |
|catalog: <br />    type:| The name of the cataloging software; in this case, “alation”. |
|catalog: <br />    datasource_id | Rhe URL on the data source page in the Alation catalog; see image below. |
|catalog: <br />    datasource_container_name | Effectively the schema of the data source, retrieve this value from the data source page in the Alation catalog under the subheading **Schemas**; see image below. |

Retrieve the Alation `datasource_id` from the URL <br />
![alation-figure-1-0](/assets/images/alation-figure-1-0.png){:height="300px" width="300px"} 

Retrieve the Alation `datasource_container_name` (schema) from the data source page <br />
![alation-figure-1-1](/assets/images/alation-figure-1-1.png){:height="400px" width="400px"} 


## Customize the catalog

1. Create custom fields in Alation that reference information that Soda Cloud pushes to the catalog. These are the fields the catalog users will see that will display Soda Cloud data quality details. 
<br />
In your Alation account, navigate to **Settings** > **Catalog Admin** > **Customize Catalog**. In the **Custom Fields** tab, create the following fields:
* Under the **Pickers** heading, create a field for “Has DQ” with Options “True” and “False”.
* Under the **Dates** heading, create a field for “Profile - Last Run”.
* Under the **Rich Texts** heading, create the following fields:
  * “Soda DQ Overview”
  * “Soda Data Quality Rules”
  * “Data Quality Metrics”
2. Add each new custom field to a **Custom Template** in Alation. In **Customize Catalog**, in the **Custom Templates** tab, select the **Table** template, then click **Insert...** to add a custom field to the template:
* "Soda DQ Overview"
3. In the **Table** template, click **Insert...** to add a **Grouping of Custom Fields**. Label the grouping “Data Quality Info”, then **Insert...** two custom fields:
* "Has DQ"
* "Profile - Last Run"
4. In the **Column** template, click **Insert...** to add a custom field to the template:
* "Has DQ"
5. In the **Column** template, click **Insert...** to add a **Grouping of Custom Fields**. Label the grouping “Soda Data Profile Information”, then **Insert...** two custom fields:
* Data Quality Metrics
* Soda Data Quality Rules

## Run the integration

Contact <a href="mailto:support@soda.io">Soda Support</a> directly to acquire the assets and instructions to run the integration and view Soda Cloud details in your Alation catalog.


## Use the integration

Access Soda Cloud to [create agreements]({% link soda-cloud/agreements.md %}) that execute checks against datasets in your data source each time you [run a Soda scan manually]({% link soda-core/scan-core.md %}#run-a-scan), or [orchestrate a scan]({% link soda-core/orchestrate-scans.md %}) using a data pipeline tool such as Airflow. Soda Cloud pushes data quality scan results to the corresponding data source in Alation so that users can review data quality information from within the catalog. 

In Alation, beyond reviewing data quality information for the data source, users can access the **Joins** and **Lineage** tabs of individual datasets to examine details and investigate the source of any data quality issues. 

### Open in Soda

In a dataset page in Alation, in the **Overview** tab, users have the opportunity to click links to directly access Soda Cloud to scrutinize data quality details; see image below. 
* Under the **Soda DQ Overview** heading in Alation, click **Open in Soda** to access the dataset page in Soda Cloud.  
* Under the **Dataset Level Monitors** heading in Alation, click the title of any monitor to access the check info page in Soda Cloud.

![alation-figure-1-2](/assets/images/alation-figure-1-2.png){:height="600px" width="600px"} 



## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}