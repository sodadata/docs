---
description: >-
  Integrate Soda with dbt-core or dbt Cloud to access dbt test results from
  within your Soda Cloud account and leverage all its features.
---

# Integrate Soda with dbt

Integrate Soda with dbt to access dbt test results from within your Soda Cloud account.

Use Soda Library to ingest the results of your dbt tests and push them to Soda Cloud so you can leverage features such as:

* visualizing your data quality over time
* setting up alert notifications for your team when dbt tests fail
* creating and tracking data quality incidents

\


✖️    Requires Soda Core Scientific (included in a Soda Agent)\
✔️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✖️    Supported in Soda Cloud + Self-hosted Soda Agent\
✖️    Supported in Soda Cloud + Soda-hosted Agent

## Prerequisites

* You have installed a [Soda Library package](../quick-start-sip/install.md) in your environment and have [configured it](../quick-start-sip/install.md#configure-soda) to connect to a data source and your Soda Cloud account using a `configuration.yml` file.
* You use dbt Cloud or [dbt-core](https://github.com/dbt-labs/dbt-core) version >= 1.5, <2.0. Note: As [dbt no longer supports v1.4](https://docs.getdbt.com/guides/migration/versions/upgrading-to-v1.4), Soda does not support that version.

## Videos

#### Integrate dbt core with Soda.

{% embed url="https://www.youtube.com/embed/V4cGCniBpMg" %}

#### Integrate dbt Cloud with Soda.

{% embed url="https://www.youtube.com/embed/lcGHJxVLOLI" %}

## Ingest dbt test results from dbt-core into Soda Cloud

Every time you execute tests in dbt, dbt captures information about the test results. Soda Library can access this information and translate it into test results that Soda Cloud can display. You must first run your tests in dbt before Soda Library can find and translate test results, then push them to Soda Cloud.\


1. First, ensure that your dbt tests results are available in your local filesystem.\
   You can generate the necessary files by running your dbt pipeline with one of the following commands:

* [`dbt build`](https://docs.getdbt.com/reference/commands/build)
* [`dbt test`](https://docs.getdbt.com/reference/commands/test)

2. If you have not already done so, install the `soda-dbt` package in the Python environment used for your Soda Library scans:

```shell
pip install -i https://pypi.cloud.soda.io soda-dbt
```

Note: It is recommended that you use separate Python environments for your dbt pipeline and Soda scans to avoid dependency conflicts.

3. Have a `configuration.yml` file that includes your Soda Cloud credentials and the Soda Datasource to be associated with the dbt tests.
4. To ingest dbt test results, Soda Library uses the files that dbt generates when it builds or tests models: `manifest.json` and `run_results.json`.\
   Use Soda Library to execute _one_ of the following ingest commands to ingest the JSON files into Soda Cloud.

* Specify the file path for the directory in which you store both the `manifest.json` and `run_results.json` files; Soda finds the files it needs in this directory.

```shell
soda ingest dbt -d my_datasource_name  -c /path/to/configuration.yml  --dbt-artifacts /path/to/files
```

OR\


* Specify the path and filename for each individual JSON file that Soda Cloud must ingest.

```shell
soda ingest dbt -d my_datasource_name  -c /path/to/configuration.yml  --dbt-manifest path/to/manifest.json --dbt-run-results path/to/run_results.json
```

Run `soda ingest --help` to review a list of all command options.

\


## Ingest results from dbt Cloud into Soda Cloud

Every run that is part of a [Job on dbt Cloud](https://docs.getdbt.com/docs/dbt-cloud/cloud-quickstart#create-a-new-job) generates metadata about your dbt project as well as the results from the run. Use Soda Library to get this data directly from the dbt Cloud API.

Note that you must use Soda Library to run the CLI command to ingest dbt test results into Soda Cloud from dbt cloud. You cannot configure the connection to dbt Cloud from within the Soda Cloud user interface, as with a new data source, for example.

1. If you have not already done so, install the `soda-dbt` package in the Python environment that also runs Soda Library scans:

```
pip install -i https://pypi.cloud.soda.io soda-dbt
```

2. Obtain a [dbt Cloud Admin API Service Token](https://docs.getdbt.com/docs/dbt-cloud/dbt-cloud-api/service-tokens).
3. Add the following configuration in your Soda `configuration.yml` file as in the following example. Look for the account ID after the word `account` in a dbt Cloud URL. For example, `https://cloud.getdbt.com/#/accounts/840923545***/` or navigate to your dbtCloud Account Settings page.

```yaml
dbt_cloud:
  account_id: account_id
  api_token: serviceAccountTokenFromDbt1234
```

Note that as of March 1, 2024, dbtCloud users must use region-specific access URLs for API connections. Because the Soda integration with dbtCloud interacts with dbt's admin API, users may have to specify the base URL of the admin api via the `access_url` property, as in the example below. Find your access URL in your dbtCloud account in Account Settings. If you do not provide this in your configuration, Soda defaults to `"cloud.getdbt.com"`. Find out more in [Access, Regions & IP Addresses](https://docs.getdbt.com/docs/cloud/about-cloud/access-regions-ip-addresses).

```yaml
dbt_cloud:
  account_id: account_id
  api_token: serviceAccountTokenFromDbt1234
  access_url: ab123.us1.dbt.com
```

4. From the command-line, run the `soda ingest` command to capture the test results from dbt Cloud and send them to Soda Cloud and include _one_ of two identifiers from dbt Cloud. Refer to [dbt Cloud documentation](https://docs.getdbt.com/docs/dbt-cloud/cloud-overview) for more information.

* Use the **run ID** from which you want Soda to ingest results.\
  Look for the run ID at the top of any Run page "Run #40732579" in dbt Cloud, or in the URL of the Run page. For example, `https://cloud.getdbt.com/#/accounts/ 1234/projects/1234/runs/40732579/`

```bash
soda ingest dbt -d my_datasource_name -c /path/to/configuration.yml --dbt-cloud-run-id the_run_id
```

OR\


* Use the **job ID** from which you want Soda to ingest results. Using the job ID enables you to write the command once, and and know that Soda always ingests the latest run of the job, which is ideal if you perform ingests on a regular schedule via a cron job or other scheduler.\
  Look for the job ID after the word "jobs" in the URL of the Job page in dbt Cloud. For example, `https://cloud.getdbt.com/#/accounts/ 1234/projects/5678/jobs/123445/`

```bash
soda ingest dbt -d my_datasource_name -c /path/to/configuration.yml --dbt-cloud-job-id the_job_id
```

\


## Ingestion notes and constraints

* When you call the ingestion integration, Soda Library reads the information from `manifest.json` and `run_results.json` files (or gets them from the dbt Cloud API), then maps the information onto the corresponding datasets in Soda Cloud. If the mapping fails, Soda Library creates a new dataset and Soda Cloud displays the dbt monitor results associated with the new dataset.
* In Soda Cloud, the displayed scan time of a dbt test is the time that Soda Library ingested the test result from dbt. The scan time in Soda Cloud _does not_ represent the time that the dbt pipeline executed the test. If you want those times to be close to each other, we recommend running a `soda ingest` right after your dbt transformation or testing pipeline has completed.
* The command `soda scan` cannot trigger a dbt run, and the command `dbt run` cannot trigger a Soda scan. You must execute Soda scans and dbt runs individually, then ingest the results from a `dbt run` into Soda by explicitly executing a `soda ingest` command.
* Soda can ingest dbt tests that:
  * have test metadata (`test_metadata` in the test node json)
  * have a run result

## View dbt test results in Soda Cloud

After completing the steps above to ingest dbt tests, log in to your Soda Cloud account, then navigate to the **Checks** dashboard.

Each row in the table of Check represents a check that Soda Library executed, or a dbt test that Soda Library ingested. dbt tests are prefixed with `dbt:` in the table of Checks.

* Click the row of a dbt test to examine visualized historic data for the test, details of the results, and information that can help you diagnose a data quality issue.
* Click the stacked dots at the far right of a dbt check, then select **Create Incident** to begin [investigating a data quality issue](../_release-notes/incidents.md) with your team.
* Set up an [alert notification rule](../collaborate/notif-rules.md) for checks with fail or warn results. Navigate to **your avatar** > **Notification Rules**, then click **New Notification Rule**. Follow the guided steps to complete the new rule. Send notifications to an individual or a team in [Slack](integrate-slack.md).

## Go further

* Learn more about [How Soda works](../learning-resources/how-library-works.md).
* Read more about [running a Soda scan](../run-a-scan/).
* As a business user, learn how to [create no-code checks](../soda-cl-overview/#define-sodacl-checks) in Soda Cloud.
* Learn more about creating, tracking, and resolving data quality [incidents](broken-reference) in Soda Cloud.
* Access a list of [all integrations](https://www.soda.io/integrations) that Soda Cloud supports.

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
