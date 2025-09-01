# Alation

Soda with Alation to access details about the quality of your data from within the data catalog.

* Run data quality checks using Soda and visualize quality metrics and rules within the context of a data source, dataset, or column in Alation.
* Use Soda Cloud to flag poor-quality data in lineage diagrams and during live querying.
* Give your Alation users the confidence of knowing that the data they are using is sound.
* 🎥 Watch a [5-minute overview](https://vimeo.com/563765014) showcasing the integration of Soda and Alation.

<figure><img src="../.gitbook/assets/image (1).avif" alt=""><figcaption></figcaption></figure>

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* You have verified some contracts and published the results to Soda Cloud.
* You have an Alation account with the privileges necessary to allow you to add a data source, create custom fields, and customize templates.
* You have a git repository in which to store the integration project files.

## Set up the integration <a href="#set-up-the-integration" id="set-up-the-integration"></a>

🎥 Watch a 5-minute video that demonstrates how to integrate Soda and Alation.

{% embed url="https://player.vimeo.com/video/563765014?h=672726942b" %}



1. Sign into your Soda Cloud account and confirm that you see the datasets you expect to see in the data source you wish to test for quality.
2.  To connect your Soda Cloud account to your Alation Service Account, create an `.env` file in your integration project in your git repo and include details according to the example below. Refer to [Generate API keys](https://docs.soda.io/soda-cloud/api-keys.html) to obtain the values for your Soda API keys.\


    ```
    ALATION_HOST=yourcompany.alationcatalog.com
    ALATION_USER=<your username for your Alation account>
    ALATION_PASSWORD=<your password for your Alation account>
    SODA_HOST=cloud.soda.io
    SODA_API_KEY_ID=<your Soda Cloud pubic key>
    SODA_API_KEY_SECRET=<your Soda Cloud private key>
    ```
3.  To sync a data source and schema in the Alation catalog to a data source in Soda Cloud, you must map it from Soda Cloud to Alation. Create a `.datasource-mapping.yml` file in your integration project and populate it with mapping data according to the following example. The table below describes where to retrieve the values for each field.

    ```
     - name: Cars
       soda:
         datasource_id: 2d33bf0a-9a1c-4c4b-b148-b5af318761b3
         datasource_name: adventureworks
         # optional dataset_mapping   soda: catalog
         dataset_mapping:
            Cars_data: Cars
       catalog:
         type: "alation"
         datasource_id: "31"
         datasource_container_name: "soda"
         datasource_container_id: "1"
     - name: Soda Demo
       soda:
         datasource_id: 8505cbbd-d8b3-48a4-bad4-cfb0bec4c02f
       catalog:
         type: "alation"
         datasource_id: "37"
         datasource_container_name: "public"
         datasource_container_id: "2"
    ```

| Field                                                                  | Retrieve value from                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                                                                 | A name you choose as an identifier for an integration between Soda Cloud and a data catalog.                                                                                                                                                      |
| <p><code>soda:</code><br><code>datasource_id</code></p>                | The data source information panel in Soda Cloud.                                                                                                                                                                                                  |
| <p><code>soda:</code><br><code>datasource_name</code></p>              | The data source information panel in Soda Cloud.                                                                                                                                                                                                  |
| <p><code>soda:</code><br><code>dataset_mapping</code></p>              | <p>(Optional) When you run the integration, Soda automatically maps all of the datasets between data sources. However, if the names of the datasets differ in the tools you can use this property to manually map datasets between tools.<br></p> |
| <p><code>catalog:</code><br><code>type:</code></p>                     | The name of the cataloging software; in this case, “alation”.                                                                                                                                                                                     |
| <p><code>catalog:</code><br><code>datasource_id</code></p>             | Retrieve this value from the URL on the data source page in the Alation catalog; see image below.                                                                                                                                                 |
| <p><code>catalog:</code><br><code>datasource_container_name</code></p> | The schema of the data source; retrieve this value from the data source page in the Alation catalog under the subheading **Schemas**. See image below.                                                                                            |
| <p><code>catalog:</code><br><code>datasource_container_id</code></p>   | The ID of the `datasource_container_name` (the schema of the data source); retrieve this value from the schema page in the Alation catalog. See image below                                                                                       |

Retrieve the Alation `datasource_id` from the URL

<figure><img src="../.gitbook/assets/image (64).png" alt="" width="375"><figcaption></figcaption></figure>

<figure><img src="https://docs.soda.io/assets/images/alation-figure-1-0.png" alt=""><figcaption></figcaption></figure>

Retrieve the Alation `datasource_container_name` (schema) from the data source page

<figure><img src="../.gitbook/assets/image (2).avif" alt="" width="375"><figcaption></figcaption></figure>

Retrieve the Alation `datasource_container_id` for the `datasource_container_name` from the URL in the **Schema** page.

<figure><img src="../.gitbook/assets/image-1 (1).avif" alt="" width="563"><figcaption></figcaption></figure>

## Enable API access to Alation with SSO <a href="#enable-api-access-to-alation-with-sso" id="enable-api-access-to-alation-with-sso"></a>

If your Alation account employs single sign-on (SSO) access, you must [Create an API service account](https://developer.alation.com/dev/docs/creating-an-api-service-account) for Soda to integrate with Alation.

If your Alation account does not use SSO, skip this step and proceed to [Customize the catalog](https://docs.soda.io/soda/integrate-alation.html#customize-the-catalog).

## Customize the catalog <a href="#customize-the-catalog" id="customize-the-catalog"></a>

1. Create custom fields in Alation that reference information that Soda Cloud pushes to the catalog. These are the fields the catalog users will see that will display Soda Cloud data quality details.\
   In your Alation account, navigate to **Settings** > **Catalog Admin** > **Customize Catalog**. In the **Custom Fields** tab, create the following fields:
   * Under the **Pickers** heading, create a field for “Has DQ” with Options “True” and “False”. The Alation API is case sensitive so be sure to use these exact values.
   * Under the **Dates** heading, create a field for “Profile - Last Run”.
   * Under the **Rich Texts** heading, create the following fields:
     * “Soda DQ Overview”
     * “Soda Data Quality Rules”
     * “Data Quality Metrics”
2. Add each new custom field to a **Custom Template** in Alation. In **Customize Catalog**, in the **Custom Templates** tab, select the **Table** template, then click **Insert…** to add a custom field to the template:
   * “Soda DQ Overview”
3. In the **Table** template, click **Insert…** to add a **Grouping of Custom Fields**. Label the grouping “Data Quality Info”, then **Insert…** two custom fields:
   * “Has DQ”
   * “Profile - Last Run”
4. In the **Column** template, click **Insert…** to add a custom field to the template:
   * “Has DQ”
5. In the **Column** template, click **Insert…** to add a **Grouping of Custom Fields**. Label the grouping “Soda Data Profile Information”, then **Insert…** two custom fields:
   * Data Quality Metrics
   * Soda Data Quality Rules

## Run the integration <a href="#run-the-integration" id="run-the-integration"></a>

Contact [support@soda.io](mailto:support@soda.io) directly to acquire the assets and instructions to run the integration and view Soda Cloud details in your Alation catalog.

## Use the integration <a href="#use-the-integration" id="use-the-integration"></a>

Access Soda Cloud to [create no-code checks](https://docs.soda.io/soda-cl/soda-cl-overview.html#define-sodacl-checks) or [create agreements](https://docs.soda.io/soda-cl/soda-cl-overview.html#define-sodacl-checks) that execute checks against datasets in your data source each time you [run a Soda scan manually](https://docs.soda.io/soda-library/run-a-scan.html#run-a-scan), or [orchestrate a scan](https://docs.soda.io/soda-library/orchestrate-scans.html) using a data pipeline tool such as Airflow. Soda Cloud pushes data quality scan results to the corresponding data source in Alation so that users can review data quality information from within the catalog.

In Alation, beyond reviewing data quality information for the data source, users can access the **Joins** and **Lineage** tabs of individual datasets to examine details and investigate the source of any data quality issues.

#### Open in Soda <a href="#open-in-soda" id="open-in-soda"></a>

In a dataset page in Alation, in the **Overview** tab, users have the opportunity to click links to directly access Soda Cloud to scrutinize data quality details; see image below.

* Under the **Soda DQ Overview** heading in Alation, click **Open in Soda** to access the dataset page in Soda Cloud.
* Under the **Dataset Level Monitors** heading in Alation, click the title of any monitor to access the check info page in Soda Cloud.

<figure><img src="../.gitbook/assets/image (3).avif" alt=""><figcaption></figcaption></figure>
