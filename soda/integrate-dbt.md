---
layout: default
title: Integrate Soda Core with dbt
description: Integrate Soda with dbt-core or dbt Cloud to access dbt test results from within your Soda Cloud account and leverage all its features.
parent: Integrate
---

# Integrate Soda Core with dbt

Integrate Soda with dbt to access dbt test results from within your Soda Cloud account.

Use Soda Core to ingest the results of your dbt tests and push them to Soda Cloud so you can leverage features such as:
* visualizing your data quality over time
* setting up notifications for your team when dbt tests fail
* creating and tracking data quality incidents 


[Prerequisites](#prerequisites)<br />
[Videos](#videos)<br />
[Ingest dbt test results from dbt-core into Soda Cloud](#ingest-dbt-test-results-from-dbt-core-into-soda-cloud)<br />
[Ingest results from dbt Cloud into Soda Cloud](#ingest-results-from-dbt-cloud-into-soda-cloud)<br />
[Ingestion notes and constraints](#ingestion-notes-and-constraints)<br />
[View dbt test results in Soda Cloud](#view-dbt-test-results-in-soda-cloud)<br />
[Go further](#go-further)<br />

<br />

## Prerequisites

* You have created a Soda Cloud account with [Admin, Manager, or Editor permissions]({% link soda-cloud/roles-and-rights.md %}).
* You have installed a [Soda Core package]({% link soda-core/installation.md %}) in your environment and [configured it]]({% link soda-core/configuration.md %}) to connect to a data source using a `configuration.yml` file. 
* You have [connected your Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to Soda Core.
* You use the open-source <a href="https://github.com/dbt-labs/dbt-core" target="_blank">dbt-core</a> version 1.0.0 or later or dbt Cloud.
* You have installed the optional `soda-core-dbt` sub-package in the Python environment that also runs `soda-core` by running `pip install soda-core-dbt`.

## Videos

Integrate dbt core with Soda.

<iframe width="660" height="415" src="https://www.youtube.com/embed/V4cGCniBpMg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

Integrate dbt Cloud with Soda.

<iframe width="660" height="415" src="https://www.youtube.com/embed/lcGHJxVLOLI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Ingest dbt test results from dbt-core into Soda Cloud

Every time you execute tests in dbt, dbt captures information about the test results. Soda Core can access this information and translate it into test results that Soda Cloud can display. You must first run your tests in dbt before Soda Core can find and translate test results, then push them to Soda Cloud. <br />

1. If you have not already done so, install the `soda-core-dbt` sub-package in the Python environment that also runs `soda-core` by running `pip install soda-core-dbt`.
2. Run your dbt pipeline using one of the following commands:
* <a href="https://docs.getdbt.com/reference/commands/build" target="_blank">`dbt build`</a>  
* <a href="https://docs.getdbt.com/reference/commands/test" target="_blank">`dbt test`</a>
3. To ingest dbt test results, Soda Core uses the files that dbt generates when it builds or tests models: `manifest.json` and `run_results.json`. Use Soda Core to execute *one* of the following ingest commands to ingest the JSON files into Soda Cloud.
* Specify the file path for the directory in which you store both the `manifest.json` and `run_results.json` files; Soda finds the files it needs in this directory.
```shell
soda ingest -d my_datasource_name --dbt-artifacts /path/to/files 
```
OR <br />
* Specify the path and filename for each individual JSON file that Soda Cloud must ingest.
```shell
soda ingest -d my_datasource_name --dbt-manifest path/to/manifest.json --dbt-run-results path/to/run_results.json>
```

Run `soda ingest --help` to review a list of all command options.

<br/>

## Ingest results from dbt Cloud into Soda Cloud

Every run that is part of a [Job on dbt Cloud](https://docs.getdbt.com/docs/dbt-cloud/cloud-quickstart#create-a-new-job) generates metadata about your dbt project as well as the results from the run. Use Soda Core to get this data directly from the dbt Cloud API. 

1. If you have not already done so, install the `soda-core-dbt` sub-package in the Python environment that also runs `soda-core` by running `pip install soda-core-dbt`.
2. Obtain a <a href="https://docs.getdbt.com/docs/dbt-cloud/dbt-cloud-api/service-tokens" target="_blank"> dbt Cloud Admin API Service Token</a>.
3. Add the following configuration in your Soda `configuration.yml` file as in the following example. Look for the `account ID` after the word "account" in a dbt Cloud URL. For example, `https://cloud.getdbt.com/#/accounts/840923545***/`
```yaml
dbt_cloud:
  account_id: account_id
  api_token: serviceAccountTokenFromDbt1234
```
4. From the command-line, run the `soda ingest` command to capture the test results from dbt Cloud and send them to Soda Cloud and include *one* of two identifiers from dbt Cloud. Refer to [dbt Cloud documentation](https://docs.getdbt.com/docs/dbt-cloud/cloud-overview) for more information. 
* Use the **run ID** from which you want Soda to ingest results. <br /> Look for the run ID at the top of any Run page "Run #40732579" in dbt Cloud, or in the URL of the Run page. For example, `https://cloud.getdbt.com/#/accounts/ 1234/projects/1234/runs/40732579/`
```bash
soda ingest -d my_datasource_name -c configuration.yml --dbt-cloud-run-id the_run_id
```
OR <br />
* Use the **job ID** from which you want Soda to ingest results. Using the job ID enables you to write the command once, and and know that Soda always ingests the latest run of the job, which is ideal if you perform ingests on a regular schedule via a cron job or other scheduler. <br /> Look for the job ID after the word "jobs" in the URL of the Job page in dbt Cloud. For example, `https://cloud.getdbt.com/#/accounts/ 1234/projects/5678/jobs/123445/`
```bash
soda ingest -d my_datasource_name -c configuration.yml --dbt-cloud-job-id the_job_id
```

<br/>

## Ingestion notes and constraints

* When you call the ingestion integration, Soda Core reads the information from `manifest.json` and `run_results.json` files (or gets them from the dbt Cloud API), then maps the information onto the corresponding datasets in Soda Cloud.  If the mapping fails, Soda Core creates a new dataset and Soda Cloud displays the dbt monitor results associated with the new dataset.
* In Soda Cloud, the displayed scan time of a dbt test is the time that Soda Core ingested the test result from dbt. The scan time in Soda Cloud *does not* represent the time that the dbt pipeline executed the test. If you want those times to be close to each other, we recommend running a `soda ingest` right after your dbt transformation or testing pipeline has completed.
* The command `soda scan` cannot trigger a dbt run, and the command `dbt run` cannot trigger a Soda scan. You must execute Soda scans and dbt runs individually, then ingest the results from a `dbt run` into Soda by explicitly executing a `soda ingest` command.



## View dbt test results in Soda Cloud

After completing the steps above to ingest dbt tests, log in to your Soda Cloud account, then navigate to the **Check Results** dashboard. 

Each row in the table of Check Results represents the result of a check that Soda Core executed,or the result of a dbt test that Soda Core ingested. dbt test results are prefixed with `dbt:` in the table of Check Results.

* Click the row of a dbt check result to examine visualized historic data for the test, details of the results, and information that can help you diagnose a data quality issue.
* Click the stacked dots at the far right of a dbt check result, then select **Create Incident** to begin [investigating a data quality issue]({% link soda-cloud/incidents.md %}) with your team.
* Click the stacked dots at the far right of a dbt check result, then select **Edit Check** to set up a [notification]({% link soda-cloud/edit-checks.md %}) that Soda Cloud sends when the dbt test fails. Send notifications to an individual or a team in [Slack]({% link soda/integrate-slack.md %}).



## Go further

* Learn more about [How Soda Core works]({% link soda-core/how-core-works.md %}).
* Read more about [running a Soda scan]({% link soda-core/scan-core.md %}#run-a-scan).
* Learn more about [creating agreements]({% link soda-cloud/agreements.md %}) in Soda Cloud.
* Learn more about creating, tracking, and resolving data quality [incidents]({% link soda-cloud/incidents.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
