---
layout: default
title: Integrate Soda with dbt
parent: Integrate
---

# Integrate Soda with dbt

Integrate Soda with dbt to access dbt test results from within your Soda Cloud account.

Use Soda SQL to ingest the results of your dbt tests and push them to Soda Cloud so you can leverage features such as:
* visualizing your data quality over time
* setting up notifications for your team when tests fail
* creating and tracking data quality incidents 

![dbt-test-in-soda-cloud](/assets/images/dbt-test-in-soda-cloud.png){:height="700px" width="700px"} 


## Prerequisites

* You have a Soda Cloud account with [Admin, Manager, or Editor permissions]({% link soda-cloud/roles-and-rights.md %}).
* You have [connected your Soda Cloud account]({% link soda-cloud/connect_to_cloud.md %}) to an instance of Soda SQL.
* You use the open-source <a href="https://github.com/dbt-labs/dbt-core" target="_blank">dbt-core</a> version 1.0.0 or later. Soda support for dbt Cloud is currently under investigation.
* You execute Soda commands from the same machine that executes the dbt pipeline. 


## Ingest dbt tests into Soda Cloud

1. Every time you execute tests in dbt, dbt captures information about the test results. Soda SQL can access this information and translate it into test results that Soda Cloud can display. You must first run your tests in dbt before Soda SQL can find and translate test results, then push them to Soda Cloud. <br />
<br />
Run your dbt pipeline using one of the following commands:
* <a href="https://docs.getdbt.com/reference/commands/build" target="_blank">`dbt build`</a>  
* <a href="https://docs.getdbt.com/reference/commands/test" target="_blank">`dbt test`</a>
<br/>
<br/>

2. To ingest dbt test results, Soda SQL uses the files that dbt generates when it builds or tests models: `manifest.json` and `run_results.json`. <br />
<br />
Use Soda SQL to execute the following ingest command.
```shell
soda ingest dbt --dbt-manifest <path to manifest.json> --dbt-run-results <path to run_results.json>
```

<br/>

### Ingestion notes and constraints

* When you call the ingestion integration, Soda SQL reads the information from these files, then maps the information onto the corresponding datasets in Soda Cloud.  If the mapping fails, Soda SQL creates a new dataset and Soda Cloud displays the dbt monitor results associated with the new dataset.
* In Soda Cloud, the displayed scan time of a dbt test is the time that Soda SQL ingested the test result from dbt. The scan time in Soda Cloud *does not* represent the time that the dbt pipeline executed the test. If you want those times to be close to each other, we recommend running a `soda ingest` right after your dbt transformation or testing pipeline has completed.
* The command `soda scan` cannot trigger a dbt run, and the command `dbt run` cannot trigger a Soda scan. You must execute Soda scans and dbt runs individually, then ingest the results from a `dbt run` into Soda by explicitly executing a `soda ingest` command.




## View dbt test results in Soda Cloud

After completing the steps above to ingest dbt tests, log in to your Soda Cloud account, then navigate to the **Monitor Results** dashboard. Each row in the table of Monitor Results represents the result of a test that Soda SQL executed or a the result of a dbt test that Soda SQL ingested. Refer to image above for an example.

* Click the row of a dbt monitor result to examine visualized historic data for the test, details of the results, and information that can help you diagnose a data quality issue.
* Click the stacked dots at the far right of a dbt monitor result, then select **Create Incident** to begin [investigating a data quality issue]({% link soda-cloud/incidents.md %}) with your team.
* Click the stacked dots at the far right of a dbt monitor result, then select **Edit Monitor** to set up a [notification]({% link soda-cloud/monitors.md %}#3-notifications) that Soda Cloud sends when the dbt test fails. Send notifications to an individual or a team in [Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack).


## Go further

* Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Read more about [running a Soda scan]({% link soda/scan.md %}#run-a-scan).
* Learn more about [creating alerts and notifications]({% link soda-cloud/monitors.md %}) in Soda Cloud.
* Learn more about creating, tracking, and resolving data quality [Incidents]({% link soda-cloud/incidents.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.
