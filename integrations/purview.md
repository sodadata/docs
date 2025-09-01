# Purview

Integrate Soda with Microsoft’s Purview data catalog to access details about the quality of your data from within the catalog.

* Run data quality checks using Soda and visualize quality metrics and rules within the context of a table in Purview.
* Give your Purview-using colleagues the confidence of knowing that the data they are using is sound.
* Encourage others to add data quality checks using a link in Purview that connects directly to Soda.

In Purview, you can see all the Soda data quality checks and the value associated with the check’s latest measurement, the health score of the dataset, and the timestamp for the most recent update. Each of these checks listed in Purview includes a link that opens a new page in Soda Cloud so you can examine diagnostic and historic information about the check.

<figure><img src="../.gitbook/assets/image (5).avif" alt=""><figcaption></figcaption></figure>

Purview displays the latest check results according to the most recent Soda scan for data quality, where color-coded icons indicate the latest result. A gray icon indicates that a check was not evaluated as part of a scan.

<figure><img src="../.gitbook/assets/image-1 (3).avif" alt=""><figcaption></figcaption></figure>

If Soda is performing no data quality checks on a dataset, the instructions in Purview invite a catalog user to access soda and create new checks.

<figure><img src="../.gitbook/assets/image (6).avif" alt="" width="563"><figcaption></figcaption></figure>

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* You have verified some contracts and published the results to Soda Cloud.
* You have a Purview account with the privileges necessary to collect the information Soda needs to complete the integration.
* The data source that contains the data you wish to check for data quality is available in Purview.

## Set up the integration <a href="#set-up-the-integration" id="set-up-the-integration"></a>

1. Sign into your Soda Cloud account and confirm that you see the datasets you expect to see in the data source you wish to test for quality.
2. In your Soda Cloud account, navigate to **your avatar** > **Profile**, then navigate to the **API Keys** tab. Click the plus icon to generate new API keys.
3. Copy the following values and paste to a temporary, secure, local location.
   * API Key ID
   * API Key Secret
4. Access [Purview tutorial using REST APIs](https://learn.microsoft.com/en-us/purview/tutorial-using-rest-apis) for instructions on how to create the following values, then paste to a temporary, secure, local location.
   * `client_id`
   * `client_secret`
   * `tenant_id`
5. Copy the value of your purview endpoint from the URL (`https://XXX.purview.azure.com`) and paste to a temporary, secure, local location.
6. To connect your Soda Cloud account to your Purview Account, contact your Soda Account Executive or email [Soda Support](mailto:support@soda.io) with the details you collected in the previous steps to request Purview integration.
