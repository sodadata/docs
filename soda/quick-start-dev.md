---
layout: default
title: Test data quality during CI/CD development
description: Follow this guide to set up and run automated Soda scans for data quality during CI/CD development using GitHub Actions.
parent: Get started
---

# Test data quality during CI/CD development
*Last modified on {% last_modified_at %}*

Use this guide to install and set up Soda to test the quality of your data during your development lifecycle. Catch data quality issues in a GitHub pull request before merging data management changes, such as transformations, into production.

![gh-action-fail](/assets/images/gh-action-fail.png){:width="500px"}

**[01](#soda-basics)** Learn the basics of Soda<br />
**[02](#about-this-guide)** Get context for this guide<br />
**[03](#install-soda-from-the-command-line)** Install Soda from the command-line<br />
**[04](#connect-soda-to-your-data-source-and-platform-account)** Connect Soda to your data source and platform account<br />
**[05](#write-checks-for-data-quality)** Write checks for data quality<br />
**[06](#create-a-github-action-job)** Create a GitHub Action job<br />
**[07](#set-up-slack-integration-and-notification-rules)** Set up Slack integration and notification rules<br />
**[08](#trigger-a-scan-and-examine-the-scan-results)** Trigger a scan and examine the scan results<br />
<br />


## Soda basics

{% include about-soda.md %}

## About this guide

The instructions below offer Data Engineers an example of how to use <a href="https://docs.github.com/en/actions" target="_blank">GitHub Actions</a> to execute SodaCL checks for data quality on data in a Snowflake data source. 

For context, the example assumes that a team of people use GitHub to collaborate on managing data ingestion and transformation with dbt. In the same repo, team members can collaborate to write tests for data quality in SodaCL checks YAML files. With each new PR, or commit to an existing PR, in the repo that adds a transformation or makes changes to a dbt model, a GitHub Action executes a Soda scan for data quality and presents the results of the scan in a comment in the pull request, and in the Soda platform. 

Where the scan results indicate an issue with data quality, Soda notifies the team via a notification in Slack so that they can investigate and address any issues before merging the PR into production.

Borrow from this guide to connect to your own data source, set up a GitHub Action job, and execute your own relevant tests for data quality to prevent issues in production.

(Not quite ready for this big gulp of Soda? 🥤Try [taking a sip]({% link soda/quick-start-sip.md %}), first.)


## Install Soda from the command line

{% include quick-start-install.md %}

<br />


## Connect Soda to your data source and platform account

To connect to a data source such as Snowflake, PostgreSQL, Amazon Athena, or GCP Big Query, you use a `configuration.yml` file which stores access details for your data source. 

This guide also instructs you to connect to a Soda platform account using API keys that you create and add to the same `configuration.yml` file. Available for free as a 45-day trial, your Soda platform account gives you access to visualized scan results, tracks trends in data quality over time, enables you to set alert notifications, and much more.

1. In the GitHub repository in which you work with your dbt models, or ingest and transform data, create a directory to contain your Soda configuration and check YAML files.
2. Use <a href="https://docs.github.com/en/codespaces/managing-codespaces-for-your-organization/managing-encrypted-secrets-for-your-repository-and-organization-for-github-codespaces" target="_blank">GitHub Secrets</a> to securely store the values for your data source login credentials. Soda requires access to the credentials so it can access the data source to scan the data.
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
  host:
  api_key_id:
  api_key_secret:
```
6. In a browser, navigate to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account. If you already have a Soda account, log in. 
7. In your platform account, navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys.
  * Copy the **API Key ID**, then paste it into the `configuration.yml` as the value for `api_key_id`.
  * Copy the **API Key Secret**, then paste it into the `configuration.yml` as the value for `api_key_secret`.
  * Enter the value for `host` according to the region your Soda platform account uses: `cloud.soda.io` for EU region; `cloud.us.soda.io` for USA region.
8. Save the `configuration.yml` file and close the API modal in your Soda account.
9. In Terminal, run the following command to test Soda's connection to your data source, replacing the value of `my_datasource_name` with the name of your data source.<br />
```shell
soda test-connection -d my_datasource_name -c configuration.yml
```

## Write checks for data quality

A check is a test that Soda executes when it scans a dataset in your data source. The `checks.yml` file stores the checks you write using the [Soda Checks Language (SodaCL)]({% link soda-cl/soda-cl-overview.md %}). You can create multiple `checks.yml` files to organize your data quality checks and run all, or some of them, at scan time.

1. In the same directory in which you created the `configuration.yml`, create another file named `checks.yml`. 
2. Open the `checks.yml` file in your code editor, then copy and paste the following rather generic checks into the file. Note that the `row_count` check is written to fail to demonstrate alerting when a data quality check fails.
* Replace the value of `dataset_name` with the name of a dataset in your data source.
* Replace the value of `column1` with the name of a column in the dataset. <br />
        ```yaml
        checks for dataset_name:
        # Checks that dataset contains fewer than 2 rows; written to fail
          - row_count < 2:
              name: Dataset is unreasonably small
        # Checks that column contains no NULL values
          - missing_count(column1) = 0:
              name: No NULL values
        # Checks for columns removed or added, or change to index or type
          - schema:
              warn:
                when schema changes: any
              name: No changes to schema
        ```
3. Save the `checks.yml` file.

Learn more about [SodaCL]({% link soda/quick-start-sodacl.md %}). <br />
Learn more about using [multiple checks YAML files]({% link soda-core/scan-core.md %}#anatomy-of-a-scan-command). <br />


## Create a GitHub Action job

Use <a href="https://docs.github.com/en/actions" target="_blank">GitHub Actions</a> to execute a [Soda scan]({% link soda-core/scan-core.md %}) for data quality each time you create a new pull request or commit to an existing one. The GitHub action posts the data quality scan results in a PR comment.

* Be sure to trigger a Soda scan *after* you have completed a dbt run that executed your dbt tests. 
* Note that GitHub PR comments have a 4-byte unicode character limit of 65,536. If the GitHub Action tries to post a comment that exceeds this limit, the job completion may be impacted. 

<details>
    <summary style="color:#00BC7E">What does the GitHub Action do?</summary>
To summarize, the action completes the following tasks:

<ol>
  <li>Checks out the repo.</li>
  <li>Sets up Python 3.10, which Soda requires (In fact, the minimum version that Soda requires is Python 3.8.)</li>
  <li>Installs Soda via <code>pip install</code>.</li>
  <li>Uses the <code>configuration.yml</code> and <code>checks.yml</code> you created to run a scan of your data and save the results to a JSON file.</li>
  <li>Extracts and converts Soda scan results from JSON to a markdown table.</li>
  <li>Searches the PR for any existing comment containing "Soda Scan Summary".</li>
  <li>If no such comment exists, creates a new comment in the PR and posts "Soda Scan Summary" table of check results.</li>
  <li>If such a comment <i>does</i> already exist, updates the existing comment with the new "Soda Scan Summary" table of check results.</li>
  <li>In case the Soda scan failed, sets a comment to advise of scan failure and provides advice to check the job logs in step 4.</li>
</ol>
Steps 6 - 8 keep the check results in the same comment rather than posting a new comment containing scan results with each commit. If you prefer to have a new comment with each commit, remove steps 6 and 8 and adjust step 7 to remove the leading <code>if</code> instruction.
<br />
</details>
<br />

1. Create a file in the `.github/workflows` directory of your repository called `soda-actions.yml`. 
2. Copy and paste the example below into the new file, adjusting environment and data source-specific details as needed. You must adjust some of the values to apply to your own repo and your own data source, but the sequence of steps is suitable to copy+paste. 
3. Save the `soda-actions.yml` file.

{% include code-header.html %}
```yaml
# This GitHub Action runs a Soda scan on a Snowflake data source called reporting_api_marts.
# Best practice dictates that you set one action per data source and point to a folder that contains the relevant Soda files.
# This example sets up the action to run on a specific datasource and points `soda scan` to a folder of Soda check files.
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
      # This step determines whether to create a new comment, or update an existing.
      - name: Find comment
        uses: peter-evans/find-comment@v2
        id: fc
        with:
          issue-number: ${{ github.event.pull_request.number }}
          comment-author: 'github-actions[bot]'
          body-includes: 'Soda Scan Summary'
      # Step 7: If no comment with Soda scan results exists, create new.
      # The GITHUB_TOKEN variable is present out-of-the-box in all actions.
      # GH automatically has access to the variable in the container environment.
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

{% include quick-start-notifs.md %}


## Trigger a scan and examine the scan results

To trigger the GitHub Action job and initiate a Soda scan for data quality, create a new pull request in your repository. Be sure to trigger a Soda scan *after* you have completed a dbt run that executed your dbt tests. 

1. For the purposes of this exercise, create a new branch in your GitHub repo, then make a small change to an existing file and commit and push the change to the branch.
2. Execute a <a href="https://docs.getdbt.com/reference/commands/run" target="_blank">dbt run</a>.
3. Create a new pull request, then navigate to your GitHub account and review the PR you just created. Notice that the Soda scan action is queued and perhaps already running against your data to check for quality.
4. When the job completes, you can see a new comment in the PR with a table of checks that indicate which checks have passed and failed.<br />
![gh-action-fail](/assets/images/gh-action-fail.png){:width="500px"}
5. Access your Slack workspace, then navigate to the channel to which you directed Soda to send fail notifications in the **Notification Rule** you created. Notice the alert notification of the check that purposely failed during the Soda scan. <br />
![slack-alert](/assets/images/slack-alert.png){:width="500px"}
6. Navigate to your Soda platform account, then click **Checks** to access the **Check Results** page. The results from the scan that Soda performed during the GitHub Action job appear in the results table where you can click each line item to learn more about the results...  <br />
![gh-actions-check-results](/assets/images/gh-actions-check-results.png){:width="700px"}
...including, for some types of checks, samples of failed rows to help in your investigation of a data quality issue, as in the example below.
![quick-sip-failed-rows](/assets/images/quick-sip-failed-rows.png){:width="700px"}

<details>
  <summary style="color:#00BC7E">Troubleshoot Soda scan execution</summary>
  If the Soda scan did not complete successfully, you can review the scan logs to determine the cause of the problem. 
  <ol>
  <li>In the pull request in which the scan failed, navigate to <strong>Actions</strong> > <strong>Jobs</strong> > <strong>run</strong> > <strong>Perform scan</strong>. </li>
  <li>Expand the step to examine the scan logs.</li>
  <li>Access <a href="https://docs.soda.io/soda-cl/troubleshoot.html">Troubleshoot SocaCL</a> for help diagnosing issues.</li>
  </ol>
</details>


✨Well done!✨ You've taken the first step towards a future in which you and your colleagues prevent data quality issues from getting into production. Huzzah!

## Now what?
<div class="docs-html-content">
    <section class="docs-section" style="padding-top:0">
        <div class="docs-section-row">
            <div class="docs-grid-3cols">
                <div>
                    <img src="/assets/images/icons/icon-pacman@2x.png" width="54" height="40">
                    <h2>Experiment</h2>
                    <a href="/soda/quick-start-sodacl.html">SodaCL tutorial</a>                    
                    <a href="/soda-cl/metrics-and-checks.html">Study metrics and checks</a>
                    <a href="/soda-cl/user-defined.md">Write custom SQL checks</a>
                    <a href="/soda-cl/compare.html">Compare data</a>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-new@2x.png" width="54" height="40">
                    <h2>Sip more Soda</h2>
                    <a href="/soda/integrate-webhooks.html" target="_blank">Integrate with your tools</a>
                    <a href="/soda-cl/check-attributes.html">Add check attributes</a>
                    <a href="/soda-cloud/failed-rows.html">Examine failed row samples</a>
                    <a href="/api-docs/reporting-api-v1.html">Report on data health</a>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-dev-tools@2x.png" width="54" height="40">
                    <h2>Choose your adventure</h2>
                    <a href="/soda/quick-start-prod.html">Test data in your pipeline</a>
                    <a href="/soda/quick-start-end-user.html">Enable end-user testing</a>
                    <a href="/soda/integrate-alation.html">Integrate with Alation</a>
                </div>
            </div>
        </div>
    </section>
</div>



## Need help?

* <a href="https://www.soda.io/schedule-a-demo" target="_blank">Request a demo</a>. Hey, what can Soda do for you?
* Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}