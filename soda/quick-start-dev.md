---
layout: default
title: Test data quality during CI/CD development
description: 
parent: Get started
---

# Test data quality during CI/CD development
*Last modified on {% last_modified_at %}*

Use this guide to install and set up Soda to test the quality of your data during your development lifecycle. Catch data quality issues in a GitHub pull request before merging data management changes, such as transformations, into production.

![gh-action-fail](/assets/images/gh-action-fail.png){:width="500px"}

1. Learn the basics of Soda in [two minutes](#soda-basics).
2. [Get context](#about-this-guide) for this tutorial.
3. [Install Soda from the command-line](#install-soda-from-the-command-line).
4. [Connect Soda](#connect-soda-to-a-data-source-and-a-platform-account) to your data source and platform account.
5. [Write checks](#write-checks-for-data-quality) for data quality.
6. Create a [GitHub Action job](#create-a-github-action-job).
7. Set up [Slack integration and notification rules](#set-up-slack-integration-and-notification-rules).
8. [Trigger a scan](#trigger-a-scan-and-examine-results) and examine the results.
<br />


## Soda basics

{% include about-soda.md %}

## About this guide

The instructions below offer Data Engineers an example of how to use <a href="https://docs.github.com/en/actions" target="_blank">GitHub Actions</a> to execute SodaCL checks for data quality on data in a Snowflake data source. 

For context, the example assumes that a team of people with access to a GitHub repository can collaborate to write tests for data quality in SodaCL checks YAML files. With each new PR, or commit to an existing PR, in the repo that adds a transformation or makes changes to a dbt model, for example, a GitHub Action executes a Soda scan for data quality and presents the results of the scan in a comment in the pull request, and in the Soda platform. 

Where the scan results indicate an issue with data quality, Soda notifies the team via a notification in Slack so that they can investigate and address any issues before merging the PR into production.

Borrow from this tutorial to connect to your own data source, set up a GitHub Action job, and execute your own relevant tests for data quality.

(Not quite ready for this big gulp of Soda? Try [taking a sip]({% link soda/quick-start-sip.md %}) first.)


## Install Soda from the command line

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">MacOS, Linux</label>
  <label class="tab" id="two-tab" for="two">Windows</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

1. Ensure that you have the following prerequisites installed in your environment.
* Python 3.8 or greater. To check your existing version, use the CLI command: `python --version` or `python3 --version` <br /> 
If you have not already installed Python, consider using <a href="https://github.com/pyenv/pyenv/wiki" target="_blank">pyenv</a> to manage multiple versions of Python in your environment.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`
2. Best practice dictates that you install Soda using a virtual environment. In Terminal, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command.
```shell
python -m venv .venv
source .venv/bin/activate
```
3. Upgrade pip inside your new virtual environment.
```shell
pip install --upgrade pip
```
4. Execute the following command, replacing `soda-core-postgres` with the install package that matches the type of data source you use to store data; expand **Soda packages** link below for a complete list.
```shell
pip install soda-core-postgres
```
<details>
    <summary style="color:#00BC7E">Soda packages</summary>
<table>
<thead>
<tr>
<th>Data source</th>
<th>Install package</th>
</tr>
</thead>
<tbody>
<tr>
<td>Amazon Athena</td>
<td><code>soda-core-athena</code></td>
</tr>
<tr>
<td>Amazon Redshift</td>
<td><code>soda-core-redshift</code></td>
</tr>
<tr>
<td>Apache Spark DataFrames <br /> (For use with <a href="{% link soda-core/programmatic.md %}">programmatic Soda scans</a>, only.)</td>
<td><code>soda-core-spark-df</code></td>
</tr>
<tr>
<td>Azure Synapse (Experimental)</td>
<td><code>soda-core-sqlserver</code></td>
</tr>
<tr>
<td>ClickHouse (Experimental)</td>
<td><code>soda-core-mysql</code></td>
</tr>
<tr>
<td>Dask and Pandas (Experimental)</td>
<td><code>soda-core-pandas-dask</code></td>
</tr>
<tr>
<td>Databricks</td>
<td><code>soda-core-spark[databricks]</code></td>
</tr>
<tr>
<td>Denodo (Experimental)</td>
<td><code>soda-core-denodo</code></td>
</tr>
<tr>
<td>Dremio</td>
<td><code>soda-core-dremio</code></td>
</tr>
<tr>
<td>DuckDB (Experimental)</td>
<td><code>soda-core-duckdb</code></td>
</tr>
<tr>
<td>GCP Big Query</td>
<td><code>soda-core-bigquery</code></td>
</tr>
<tr>
<td>IBM DB2</td>
<td><code>soda-core-db2</code></td>
</tr>
<tr>
<td>Local file</td>
<td>Use Dask.</td>
</tr>
<tr>
<td>MS SQL Server</td>
<td><code>soda-core-sqlserver</code></td>
</tr>
<tr>
<td>MySQL</td>
<td><code>soda-core-mysql</code></td>
</tr>
<tr>
<td>OracleDB</td>
<td><code>soda-core-oracle</code></td>
</tr>
<tr>
<td>PostgreSQL</td>
<td><code>soda-core-postgres</code></td>
</tr>
<tr>
<td>Snowflake</td>
<td><code>soda-core-snowflake</code></td>
</tr>
<tr>
<td>Trino</td>
<td><code>soda-core-trino</code></td>
</tr>
<tr>
<td>Vertica (Experimental)</td>
<td><code>soda-core-vertica</code></td>
</tr>
</tbody>
</table>
</details>

To deactivate the virtual environment, use the following command:
```shell
deactivate
```


  </div>
  <div class="panel" id="two-panel" markdown="1">

1. Ensure that you have the following prerequisites installed in your environment.
* Python 3.8 or greater. To check your existing version, use the CLI command: `python --version` or `python3 --version` <br /> 
If you have not already installed Python, consider using <a href="https://github.com/pyenv/pyenv/wiki" target="_blank">pyenv</a> to manage multiple versions of Python in your environment.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`
2. Best practice dictates that you install Soda using a virtual environment. In Terminal, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command. Refer to the <a href="https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script" target="_blank">virtualenv documentation</a> for activating a Windows script.
```shell
python -m venv .venv
.venv\Scripts\activate
```
3. Upgrade pip inside your new virtual environment.
```shell
pip install --upgrade pip
```
4. Execute the following command, replacing `soda-core-postgres` with the install package that matches the type of data source you use to store data; expand **Soda packages** link below for a complete list.
```shell
pip install soda-core-postgres
```
<details>
    <summary style="color:#00BC7E">Soda packages</summary>
<table>
<thead>
<tr>
<th>Data source</th>
<th>Install package</th>
</tr>
</thead>
<tbody>
<tr>
<td>Amazon Athena</td>
<td><code>soda-core-athena</code></td>
</tr>
<tr>
<td>Amazon Redshift</td>
<td><code>soda-core-redshift</code></td>
</tr>
<tr>
<td>Apache Spark DataFrames <br /> (For use with <a href="{% link soda-core/programmatic.md %}">programmatic Soda scans</a>, only.)</td>
<td><code>soda-core-spark-df</code></td>
</tr>
<tr>
<td>Azure Synapse (Experimental)</td>
<td><code>soda-core-sqlserver</code></td>
</tr>
<tr>
<td>ClickHouse (Experimental)</td>
<td><code>soda-core-mysql</code></td>
</tr>
<tr>
<td>Dask and Pandas (Experimental)</td>
<td><code>soda-core-pandas-dask</code></td>
</tr>
<tr>
<td>Databricks</td>
<td><code>soda-core-spark[databricks]</code></td>
</tr>
<tr>
<td>Denodo (Experimental)</td>
<td><code>soda-core-denodo</code></td>
</tr>
<tr>
<td>Dremio</td>
<td><code>soda-core-dremio</code></td>
</tr>
<tr>
<td>DuckDB (Experimental)</td>
<td><code>soda-core-duckdb</code></td>
</tr>
<tr>
<td>GCP Big Query</td>
<td><code>soda-core-bigquery</code></td>
</tr>
<tr>
<td>IBM DB2</td>
<td><code>soda-core-db2</code></td>
</tr>
<tr>
<td>Local file</td>
<td>Use Dask.</td>
</tr>
<tr>
<td>MS SQL Server</td>
<td><code>soda-core-sqlserver</code></td>
</tr>
<tr>
<td>MySQL</td>
<td><code>soda-core-mysql</code></td>
</tr>
<tr>
<td>OracleDB</td>
<td><code>soda-core-oracle</code></td>
</tr>
<tr>
<td>PostgreSQL</td>
<td><code>soda-core-postgres</code></td>
</tr>
<tr>
<td>Snowflake</td>
<td><code>soda-core-snowflake</code></td>
</tr>
<tr>
<td>Trino</td>
<td><code>soda-core-trino</code></td>
</tr>
<tr>
<td>Vertica (Experimental)</td>
<td><code>soda-core-vertica</code></td>
</tr>
</tbody>
</table>
</details>

To deactivate the virtual environment, use the following command:
```shell
deactivate
```

Refer to the <a href="https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script" target="_blank">virtualenv documentation</a> for deactivating a Windows script.

  </div>
  </div>
</div>

<br />


## Connect Soda to your data source and platform account

To connect to a data source such as Snowflake, PostgreSQL, Amazon Athena, or GCP Big Query, you use a `configuration.yml` file which stores access details for your data source. 

This guide also instructs you to connect to a Soda platform account using API keys that you create and add to the same `configuration.yml` file. Available for free as a 45-day trial, your Soda platform account gives you access to visualized scan results, tracks trends in data quality over time, set alert notifications, and much more.

1. In the GitHub repository in which you work with your dbt models, or ingest and transform data, create a directory to contain your Soda configuration and check YAML files.
2. Something about setting up GitHub secrets.
3. In your new directory, create a new file called `configuration.yml`. 
4. Open the `configuration.yml` file in a code editor, then copy and paste the data source connection configuration for the [data source]({% link soda/connect-athena.md %}) that you use. The example below is the connection configuration for a Snowflake data source.
```yaml
data_source my_datasource_name:
  type: snowflake
  connection:
    username: ${SNOWFLAKE_USER}
    password: ${SNOWFLAKE_PASS}
    account: plu449.us-west-1
    database: sodadata_test
    warehouse: compute_wh
    role: analyst
    session_parameters:
      QUERY_TAG: soda-queries
      QUOTED_IDENTIFIERS_IGNORE_CASE: false
  schema: public
```
5. Next, add the following configuration that connects Soda to your new platform account, leaving the values blank for a moment. Be sure to add the syntax for `soda_cloud` at the root level of the YAML file, *not* nested under the `data_source` syntax.
```yaml
soda_cloud:
  host: cloud.soda.io
  api_key_id:
  api_key_secret:
```
6. In a browser, navigate to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account. If you already have a Soda account, log in. 
7. In your new account, navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys.
  * Copy the **API Key ID**, then paste it into the `configuration.yml` as the value for `api_key_id`.
  * Copy the **API Key Secret**, then paste it into the `configuration.yml` as the value for `api_key_secret`.
8. Save the `configuration.yml` file and close the API modal in your Soda account.

## Write checks for data quality

A check is a test that Soda executes when it scans a dataset in your data source. The `checks.yml` file stores the checks you write using the [Soda Checks Language (SodaCL)]({% link soda-cl/soda-cl-overview.md %}). You can create multiple `checks.yml` files to organize your data quality checks and run all, or some of them, at scan time.

Learn more about [SodaCL]({% link soda/quick-start-sodacl.md %}).

1. In the same directory in which you created the `configuration.yml`, create another file named `checks.yml`. 
2. Open the `checks.yml` file in your code editor, then copy and paste the following rather generic checks into the file. Note that the `row_count` check is written to fail to demonstrate alerting when a data quality check fails.
* Replace the value of `dataset_name` with the name of a dataset in your data source.
* Replace the value of `column1` with the name of a column in the dataset. <br />
        ```yaml
        checks for dataset_name:
        # Checks that dataset contains fewer than 2 rows; written to fail
          - row_count < 2
              name: Dataset is unreasonably small
        # Checks that column contains no NULL values
          - missing_count(column1) = 0:
              name: No NULL values
        # Checks for columns removed or added, index or type changed
          - schema:
              warn:
                when schema changes: any
              name: No changes to schema
        ```
3. Save the `checks.yml` file.


## Create a GitHub Action job

Use <a href="https://docs.github.com/en/actions" target="_blank">GitHub Actions</a> to execute a [Soda scan]({% link soda-core/scan-core.md %}) for data quality each time you create a new pull request or commit to an existing one, and *after* you have completed a dbt run that executed your dbt tests. 

You must adjust some of the values to apply to your own repo and your own data source, but the sequence of steps is suitable to copy+paste. 

Create a file in the `.github/workflows` directory of your repository called `soda-actions.yml`. Copy and paste the example below into the new file, adjusting environment and data source-specific details as needed.

{% include code-header.html %}
```yaml
# This GitHub Action runs a Soda scan on a Snowflake data source called reporting_api_marts.
# Best practice dictates that you set one action per data source and point to a folder that contains the relevant Soda files.
# This examples sets up the action to run on a specific datasource and points `soda scan` to a folder of Soda check files.
name: Run Soda Scan on [reporting_api__marts]
# GitHub triggers this job when a user creates or updates a pull request.
on:
  pull_request:
jobs:
  run:
    # The job runs on the latest Docker image for Ubuntu.
    runs-on: ubuntu-latest
    steps:
      # Step 1: Checkout the repository code into the container.
      - name: Checkout
        uses: actions/checkout@v2
      # Step 2: Setup Python 3.10, which Soda requires.
      - uses: actions/setup-python@v2
        with:
          python-version: '3.10'
      # Step 3: Install Soda package via pip.
      # Be sure to install the package that corresponds to your specific datasource
      # This example connects to Snowflake
      - name: Install Soda
        run: pip install -U pip && pip install -q soda-core-snowflake
      # Step 4: Perform a Soda scan on the dataset and save the result as ci_scan_results.json.
      # Store sensitive information such as credentials in the GitHub repository secrets.
      # The configuration.yaml file expects the username and password to come from the environment
      # variables `SNOWFLAKE_USER` and `SNOWFLAKE_PASS`
      - name: Perform Soda scan
        id: soda_scan
        env:
          SNOWFLAKE_USER: ${{ secrets.SNOWFLAKE_USER }}
          SNOWFLAKE_PASS: ${{ secrets.SNOWFLAKE_PASS }}
        run: soda scan -d reporting_api__marts -c ./soda_checks/configs/configuration.yml ./soda_checks/checks -srf ci_scan_results.json
        # This option allows the rest of the steps to run even if the scan fails.
        # The action as a whole will still results as failed if the scan fails; see last step of action
        continue-on-error: true
      # Step 5: Extract and convert Soda scan results from JSON to a markdown table stored in checks_markdown_table.md.
      # This step uses a CLI JSON processor application available on dockerhub (https://github.com/stedolan/jq)
      # However, you can implement your own custom script in your preferred language to use in its place.
      - name: Convert JSON to markdown
        id: convert
        run: |
          MESSAGE_HEADER="**Soda Scan Summary**:\n"
          TABLE_HEADER="| Dataset | Name | Type | Definition | Outcome | Value |\n|------|---------|------|------------|---------|-------|\n"
          TABLE_CONTENT=$(cat ci_scan_results.json | docker run --rm -i stedolan/jq -r '.checks[] | "| \(.table) | \(.name) | \(.type) | \(.definition | gsub("\n"; " ")) | \(.outcome) | \(.diagnostics.value) |"')
          if [ -z "$TABLE_CONTENT" ]; then
            echo "😿 No scan results found. Check the logs of the 'Perform Soda scan' step in your GitHub action" > checks_markdown_table.md
          else
            if [ "${{ steps.soda_scan.outcome }}" == "success" ]; then
              echo -e "✅ All checks passed.\n$MESSAGE_HEADER$TABLE_HEADER$TABLE_CONTENT" > checks_markdown_table.md
            else
              echo -e "❌ Some checks failed.\n$MESSAGE_HEADER$TABLE_HEADER$TABLE_CONTENT" > checks_markdown_table.md
            fi
          fi
      # Step 6: Find an existing comment by GitHub Actions bot containing 'Soda Scan Summary'.
      # This steps determines whether to create a new comment, or update an existing.
      - name: Find comment
        uses: peter-evans/find-comment@v2
        id: fc
        with:
          issue-number: ${{ github.event.pull_request.number }}
          comment-author: 'github-actions[bot]'
          body-includes: 'Soda Scan Summary'
      # Step 7: If no comment with Soda scan results exists, create new.
      - name: Create comment
        if: steps.fc.outputs.comment-id == ''
        uses: peter-evans/create-or-update-comment@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          issue-number: ${{ github.event.pull_request.number }}
          body-path: 'checks_markdown_table.md'
          edit-mode: replace
      # Step 8: If a comment with Soda scan results exists, update existing comment.
      - name: Update comment
        if: steps.fc.outputs.comment-id != ''
        uses: peter-evans/create-or-update-comment@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          issue-number: ${{ github.event.pull_request.number }}
          comment-id: ${{ steps.fc.outputs.comment-id }}
          body-path: 'checks_markdown_table.md'
          edit-mode: replace
      # Step 9: Fail the job if the Soda scan did not complete successfully.
      - name: Fail job if Soda scan failed
        if: steps.soda_scan.outcome != 'success'
        run: echo "Soda scan failed. Check the logs of the 'Perform Soda scan' step." && exit 1
```



## Set up Slack integration and notification rules

Use this integration to enable Soda to send alert notifications to a Slack channel to notify your team of warn and fail check results. If your team does not use Slack, you can skip this step and Soda sends alert notifications via email.

Learn more about [Integrating with Slack]({% link soda/integrate-slack.md %}).<br />
Learn more about [Setting notification rules]({% link soda-cloud/notif-rules.md %}).

1. As an [Admin]({% link soda-cloud/roles-and-rights.md %}), login to your Soda platform account and navigate to **your avatar** > **Organization Settings**, then navigate to the **Integrations** tab and click the **+** icon to add a new integration.
2. Follow the guided steps to authorize Soda to connect to your Slack workspace. If necessary, contact your organization's Slack Administrator to approve the integration with Soda. 
* **Configuration** tab: select the public channels to which Soda can post messages; Soda cannot post to private channels.
* **Scope** tab: select the Soda features, both alert notifications and incidents, which can access the Slack integration. 
3. To dictate where Soda should send alert notifications for checks that warn or fail, create a new notification rule. Navigate to **your avatar** > **Notification Rules**, then click **New Notification Rule**. Follow the guided steps to complete the new rule directly Soda to send check results that fail to a specific channel in your Slack workspace.


## Trigger a scan and examine results

To trigger the GitHub Action job and initiate a Soda scan for data quality, create a new pull request in your repository. 

1. For the purposes of this exercise, create a new branch in your GitHub repo, then make a small change to an existing file and commit and push the change to the branch.
2. Execute a <a href="https://docs.getdbt.com/reference/commands/run" target="_blank">dbt run</a>.
3. Create a new pull request, then navigate to your GitHub account and review the PR you just created. Notice that the Soda scan action is queued and perhaps already running against your data to check for quality.
4. When the job completes, you can see a new comment in the PR with a table of checks that indicate which checks have passed and failed.<br />
![gh-action-fail](/assets/images/gh-action-fail.png){:width="500px"}
5. Access your Slack workspace, then navigate to the channel to which you directed Soda to send fail notifications in the **Notification Rule** you created. Notice the alert notification of the check that purposely failed during the Soda scan. <br />
![slack-alert](/assets/images/slack-alert.png){:width="500px"}
6. Navigate to your Soda platform account, then click **Checks** to access the **Check Results** page. The results from the scan that Soda performed during the GitHub Action job appear in the results table where you can click each line item to learn more about the results...  <br />
![gh-actions-check-results](/assets/images/gh-actions-check-results.png){:width="700px"}
...including, for some types of checks, samples of failed rows to help in your investigation of a data quality issue.
![gh-failed-rows](/assets/images/gh-failed-rows.png){:width="700px"}

## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}