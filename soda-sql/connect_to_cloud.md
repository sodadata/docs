---
layout: default
title: Connect to Soda Cloud
description: To use all the features that Soda Cloud has to offer, you can install and configure the Soda SQL command-line tool, then connect it to your Soda Cloud account.
sidebar: sql
parent: Soda SQL
redirect_from: 
- /soda-sql/documentation/connect_to_cloud.html
- /soda-cloud/connect_to_cloud.html
---

# Connect to Soda Cloud

{% include banner-sql.md %}

To use all the [features and functionality]({% link soda/product-overview.md %}#compare-features-and-functionality) that **Soda Cloud** and **Soda SQL** have to offer, you can install and configure the Soda SQL command-line tool, then connect it to your Soda Cloud account.

Soda SQL uses an API to connect to Soda Cloud. To use the API, you must generate API keys in your Soda Cloud account, then add them to the [warehouse YAML]({% link soda-sql/warehouse.md %}) file that Soda SQL created. Note that the API keys you create do not expire. 


1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
2. Use the instructions in [Install Soda SQL]({% link soda-sql/installation.md %}) to install Soda SQL.
3. Follow steps in the [Quick start tutorial]({% link soda-sql/quick-start-soda-sql.md %}) to create your warehouse YAML file, connect to your [data source]({% link soda/glossary.md %}#data-source), analyze your [datasets]({% link soda/glossary.md %}#datasets), and run a [scan]({% link soda/glossary.md %}#scan) on the data.
4. Open the `warehouse.yml` file in a text editor, then add the following to the file:
```yaml
soda_account:
  host: cloud.soda.io
  api_key_id: env_var(API_PUBLIC)
  api_key_secret: env_var(API_PRIVATE)
```
5. Save the `warehouse.yml` file.
6. Open your `~/.soda/env_vars.yml` file in a text editor, then add `API_PUBLIC:` and `API_PRIVATE` as per the following:
```yaml
soda_sql_tutorial:
  POSTGRES_USERNAME: sodasql
  POSTGRES_PASSWORD: Eg abc123
  API_PUBLIC: 
  API_PRIVATE: 
```
7. In Soda Cloud, navigate to **your avatar** > **Profile** > **API Keys**, then click the plus icon to generate new API keys.
    * Copy the **API Key ID**, then paste it into the `env_vars.yml` file as the value for `API_PUBLIC`.
    * Copy the **API Key Secret**, then paste it into the `env_vars.yml` file as the value for `API_PRIVATE`.
8. Save the changes to the `env_vars.yml` file. Close the **Create API Key** dialog box in your Soda Cloud account.
9. From the command-line, use Soda SQL to scan the datasets in your data source again.
```shell
$ soda scan warehouse.yml tables/[datasetname].yml
```
10. Navigate to your Soda Cloud account in your browser and refresh the page. Review the results of your scan in **Monitor Results**.

## Go further

* Learn more about the [anatomy of a scan]({% link soda-sql/scan-yaml.md %}#anatomy-of-the-scan-yaml-file).
* Access [historic measurements]({% link soda-sql/metrics.md %}#historic-metrics) from the Cloud Metric Store in tests you define in your scan YAML file.
* Learn more about viewing [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
* Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).


<br />

---
*Last modified on {% last_modified_at %}*