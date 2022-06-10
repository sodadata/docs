---
layout: default
title: Connect Soda Core to Soda Cloud
description: To use all the features that Soda Cloud has to offer, you can install and configure the Soda Core CLI tool, then connect it to your Soda Cloud account.
parent: Soda Core
---

# Connect Soda Core to Soda Cloud ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

To use all the [features and functionality]({% link soda/product-matrix.md %}) that **Soda Cloud** and **Soda Core** have to offer, you can install and configure the Soda Core command-line tool, then connect it to your Soda Cloud account.

Soda Core uses an API to connect to Soda Cloud. To use the API, you must generate API keys in your Soda Cloud account, then add them to the configuration YAML file that Soda Core uses to connect to your data sources. Note that the API keys you create do not expire. 

## Prerequisites

* You have [installed]({% link soda-core/installation.md %}) and [configured]({% link soda-core/configuration.md %}) Soda Core and run at least one scan of your data.<br /> OR 
* You followed steps in the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}) to set up Soda Core and run at least one scan of your data.

## Connect

1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
2. Open your `configuration.yml` file in a text editor, then add the following to the file. Be sure to add the syntax for `soda_cloud` at the root level of the YAML file, *not* nested under any other `data_source` syntax.
```yaml
soda_cloud:
  host: cloud.soda.io
  api_key_id:
  api_key_secret:
```
3. In your Soda Cloud account, navigate to **your avatar** > **Profile** > **API Keys**, then click the plus icon to generate new API keys.
  * Copy the **API Key ID**, then paste it into the `configuration.yml` as the value for `api_key_id`.
  * Copy the **API Key Secret**, then paste it into the `configuration.yml` as the value for `api_key_secret`.
4. Save the changes to the `configuration.yml` file. Close the **Create API Key** dialog box in Soda Cloud.
5. From the command-line, use Soda Core to scan the datasets in your data source again.
```shell
soda scan -d your_datasource_name -c configuration.yml checks.yml
```
6. Navigate to your Soda Cloud account in your browser review the results of your latest scan in **Monitor Results**.

## Go further

* Learn more about using [SodaCL]({% link soda-cl/soda-cl-overview.md %}) to write checks for data quality.
* Learn more about viewing [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
* Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
{% include docs-footer.md %}