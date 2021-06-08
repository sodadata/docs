---
layout: default
title: Connect to Soda Cloud
parent: Documentation
nav_order: 12
---

# Connect to Soda Cloud

To use the **Soda Cloud** web application to monitor your data, you must install and configure the **Soda SQL** command-line tool, then connect it to your Soda Cloud account.

Soda SQL uses an API to connect to Soda Cloud. To use the API, you must generate API keys in your Soda Cloud account, then add them to the [warehouse YAML]({% link soda-sql/documentation/warehouse.md %}) file that Soda SQL created.


1. If you have not already done so, create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup).
2. Use the instructions in [Install Soda SQL]({% link soda-sql/getting-started/installation.md %}) to install Soda SQL.
3. Follow steps in the [Quick start tutorial]({% link soda-sql/getting-started/5_min_tutorial.md %}) to create your warehouse YAML file, connect to your [warehouse]({% link soda-sql/documentation/glossary.md %}#warehouse), analyze your [tables]({% link soda-sql/documentation/glossary.md %}#table), and run a [scan]({% link soda-sql/documentation/glossary.md %}#scan) on the data.
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
7. In Soda Cloud, navigate to your **Profile** page to generate new API keys.
    * Copy the **API Key ID**, then paste it into the `env_vars.yml` file as the value for `API_PUBLIC`.
    * Copy the **API Key Secret**, then paste it into the `env_vars.yml` file as the value for `API_PRIVATE`.
8. Save the changes to the `env_vars.yml` file. Close the **Create API Key** dialog box in your Soda Cloud account.
9. From the command-line, use Soda SQL to scan the tables in your warehouse again.
```shell
$ soda scan warehouse.yml tables/[dbtablename].yml
```
10. Navigate to your Soda Cloud account in your browser and refresh the page. Review the results of your scan in Monitor Results.

## Go further

* Learn how to [create monitors and alerts]({% link soda-sql/documentation/monitors.md %}).
* Learn more about [Soda Cloud architecture]({% link soda-sql/documentation/soda-cloud-architecture.md %}).
* Learn more about the [warehouse yaml]({% link soda-sql/documentation/warehouse.md %}) file.
* Learn more about the [anatomy of a scan]({% link soda-sql/documentation/scan.md %}#anatomy-of-the-scan-yaml-file)
