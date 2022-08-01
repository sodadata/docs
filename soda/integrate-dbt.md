---
layout: default
title: Integrate Soda SQL with dbt
description: Integrate Soda with dbt-core or dbt Cloud to access dbt test results from within your Soda Cloud account and leverage all its features.
parent: Integrate
---

# Integrate Soda SQL with dbt

{% include banner-dbt.md %}

Integrate Soda with dbt to access dbt test results from within your Soda Cloud account.

Use Soda SQL to ingest the results of your dbt tests and push them to Soda Cloud so you can leverage features such as:
* visualizing your data quality over time
* setting up notifications for your team when tests fail
* creating and tracking data quality incidents 

![dbt-test-in-soda-cloud](/assets/images/dbt-test-in-soda-cloud.png){:height="700px" width="700px"} 


[Prerequisites](#prerequisites)<br />
[Videos](#videos)<br />
[Ingest dbt test results from dbt-core into Soda Cloud](#ingest-dbt-test-results-from-dbt-core-into-soda-cloud)<br />
[Ingest results from dbt Cloud into Soda Cloud](#ingest-results-from-dbt-cloud-into-soda-cloud)<br />
[Ingestion notes and constraints](#ingestion-notes-and-constraints)<br />
[View dbt test results in Soda Cloud](#view-dbt-test-results-in-soda-cloud)<br />
[Go further](#go-further)<br />

<br />

## Prerequisites

* You have a Soda Cloud account with [Admin, Manager, or Editor permissions]({% link soda-cloud/roles-and-rights.md %}).
* You have [connected your Soda Cloud account]({% link soda-sql/connect_to_cloud.md %}) to an instance of Soda SQL.
* You use the open-source <a href="https://github.com/dbt-labs/dbt-core" target="_blank">dbt-core</a> version 1.0.0 or later or dbt Cloud.
* You execute Soda commands from the same machine that executes the dbt pipeline.
* You have installed the optional `soda-sql-dbt` sub-package in the Python environment that also runs `soda-sql` by running `pip install soda-sql-dbt`.

## Videos

Integrate dbt core with Soda.

<iframe width="660" height="415" src="https://www.youtube.com/embed/V4cGCniBpMg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

Integrate dbt Cloud with Soda.

<iframe width="660" height="415" src="https://www.youtube.com/embed/lcGHJxVLOLI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Ingest dbt test results from dbt-core into Soda Cloud

Every time you execute tests in dbt, dbt captures information about the test results. Soda SQL can access this information and translate it into test results that Soda Cloud can display. You must first run your tests in dbt before Soda SQL can find and translate test results, then push them to Soda Cloud. <br />

1. If you have not already done so, install the `soda-sql-dbt` sub-package in the Python environment that also runs `soda-sql` by running `pip install soda-sql-dbt`.
2. Run your dbt pipeline using one of the following commands:
* <a href="https://docs.getdbt.com/reference/commands/build" target="_blank">`dbt build`</a>  
* <a href="https://docs.getdbt.com/reference/commands/test" target="_blank">`dbt test`</a>
3. To ingest dbt test results, Soda SQL uses the files that dbt generates when it builds or tests models: `manifest.json` and `run_results.json`. Use Soda SQL to execute the following ingest command.
```shell
soda ingest dbt --warehouse-yml-file <path to warehouse.yml> --dbt-manifest <path to manifest.json> --dbt-run-results <path to run_results.json>
```

<br/>

## Ingest results from dbt Cloud into Soda Cloud

Every run that is part of a [Job on dbt Cloud](https://docs.getdbt.com/docs/dbt-cloud/cloud-quickstart#create-a-new-job) generates metadata about your dbt project as well as the results from the run. Use Soda SQL to get this data directly from the dbt Cloud API. 

1. If you have not already done so, install the `soda-sql-dbt` sub-package in the Python environment that also runs `soda-sql` by running `pip install soda-sql-dbt`.
2. Obtain a <a href="https://docs.getdbt.com/docs/dbt-cloud/dbt-cloud-api/service-tokens" target="_blank"> dbt Cloud Admin API Service Token</a>.
3. Paste this token in your Soda `env_vars.yml` file. See [Env_vars YAML file]({% link soda-sql/warehouse.md %}#env_vars-yaml-file) for more information.
```yaml
DBT_CLOUD_API_TOKEN: serviceAccountTokenFromDbt1234
```
4. Add an entry in your Soda `warehouse.yml` file. Refer to the last line in the following example. See [Warehouse YAML file]({% link soda-sql/warehouse.md %}) for more information.
```yaml
name: snowflake
connection:
  type: snowflake
  username: env_var(SNOWFLAKE_USERNAME)
  password: env_var(SNOWFLAKE_PASSWORD)
  account: your.snowflake.account
  database: database_where_your_dbt_tables_are
  warehouse: some_compute_warehouse
  schema: schema_where_your_dbt_tables_are
soda_account:
  host: cloud.soda.io
  api_key_id: env_var(API_PUBLIC)
  api_key_secret: env_var(API_PRIVATE)
dbt_cloud_api_token: env_var(DBT_CLOUD_API)
```
5. From the command-line, call `soda ingest` to capture the test results from dbt Cloud and send them to Soda Cloud. To do so, you need two identifiers from dbt Cloud. Refer to [dbt Cloud documentation](https://docs.getdbt.com/docs/dbt-cloud/cloud-overview) for more information. 

| Identifier | Location | Notes |
| ---------- | -------- | ----- |
| your dbt Cloud account ID | Look for the account ID after the word "account" in a dbt Cloud URL. For example, `https://cloud.getdbt.com/#/accounts/ A_NUMBER/` | Required |
| the run ID from which you want Soda to ingest results | Look for the run ID at the top of any Run page "Run #40732579" in dbt Cloud, or in the URL of the Run page. For example, `https://cloud.getdbt.com/#/accounts/ 1234/projects/1234/runs/40732579/` | Use either run ID or job ID; you do not need both. |
| the job ID from which you want Soda to ingest result | Look for the job ID after the word "jobs" in the URL of the Job page in dbt Cloud. For example, `https://cloud.getdbt.com/#/accounts/ 1234/projects/5678/jobs/123445/`| Use either run ID or job ID; you do not need both. <br /> <br />Use the job ID to retrieve the latest run for a specific job. Using the job ID enables you to write the command once, and and know that Soda always ingests the latest run of the job, which is ideal if you perform ingests on a regular schedule via a cron job or other scheduler. |

### Ingest a specific run
```bash
soda ingest dbt --warehouse-yml-file <path_to_warehouse.yml> --dbt-cloud-account-id <your_dbt_cloud_account_id> --dbt-cloud-run-id <the_run_id_from_a_dbt_Cloud_job>
```

### Ingest the latest run from a job
```bash
soda ingest dbt --warehouse-yml-file <path_to_warehouse.yml> --dbt-cloud-account-id <your_dbt_cloud_account_id> --dbt-cloud-job-id <the_run_id_from_a_dbt_Cloud_job>
```

## Ingestion notes and constraints

* When you call the ingestion integration, Soda SQL reads the information from `manifest.json` and `run_results.json` files (or gets them from the dbt Cloud API), then maps the information onto the corresponding datasets in Soda Cloud.  If the mapping fails, Soda SQL creates a new dataset and Soda Cloud displays the dbt monitor results associated with the new dataset.
* In Soda Cloud, the displayed scan time of a dbt test is the time that Soda SQL ingested the test result from dbt. The scan time in Soda Cloud *does not* represent the time that the dbt pipeline executed the test. If you want those times to be close to each other, we recommend running a `soda ingest` right after your dbt transformation or testing pipeline has completed.
* The command `soda scan` cannot trigger a dbt run, and the command `dbt run` cannot trigger a Soda scan. You must execute Soda scans and dbt runs individually, then ingest the results from a `dbt run` into Soda by explicitly executing a `soda ingest` command.



## View dbt test results in Soda Cloud

After completing the steps above to ingest dbt tests, log in to your Soda Cloud account, then navigate to the **Monitor Results** dashboard. Each row in the table of Monitor Results represents the result of a test that Soda SQL executed or a the result of a dbt test that Soda SQL ingested. Refer to image above for an example.

* Click the row of a dbt monitor result to examine visualized historic data for the test, details of the results, and information that can help you diagnose a data quality issue.
* Click the stacked dots at the far right of a dbt monitor result, then select **Create Incident** to begin [investigating a data quality issue]({% link soda-cloud/incidents.md %}) with your team.
* Click the stacked dots at the far right of a dbt monitor result, then select **Edit Monitor** to set up a [notification]({% link soda-cloud/agreements.md %}#3-notifications) that Soda Cloud sends when the dbt test fails. Send notifications to an individual or a team in [Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack).

Refer to image above for an example.

  </div>
  <div class="panel" id="two-panel" markdown="1">

The integration with dbt is not available for **Soda Core**, yet.

Soda Core is a free, open-source, command-line tool that enables you to use the Soda Checks Language to turn user-defined input into aggregated SQL queries.

[Soda Core documentation]({% link soda-core/overview-main.md %})

  </div>
  </div>
</div>

## Go further

* Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Read more about [running a Soda scan]({% link soda-sql/scan.md %}#run-a-scan).
* Learn more about [creating agreements]({% link soda-cloud/agreements.md %}) in Soda Cloud.
* Learn more about creating, tracking, and resolving data quality [Incidents]({% link soda-cloud/incidents.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
