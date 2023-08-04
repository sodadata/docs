---
layout: default
title: Integrate Soda with a GitHub Workflow
description: Use the GitHub Action for Soda to automatically scan for data quality during development.
parent: Integrate Soda
---

# Integrate Soda with a GitHub Workflow 
*Last modified on {% last_modified_at %}*

Add the **<a href="https://github.com/marketplace/actions/soda-library-action" target="_blank">GitHub Action for Soda</a>** to your GitHub Workflow to automatically execute scans for data quality during development.
{% include code-header.html %}
```yaml
name: Scan for data quality

on: pull_request
jobs:
  soda_scan:
    runs-on: ubuntu-latest
    name: Run Soda Scan
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Perform Soda Scan
        uses: sodadata/soda-github-action@v1
        env:
          SODA_CLOUD_API_KEY: {% raw %}${{ secrets.SODA_CLOUD_API_KEY }}{% endraw %}
          SODA_CLOUD_API_SECRET: {% raw %}${{ secrets.SODA_CLOUD_API_SECRET }}{% endraw %}
          SNOWFLAKE_USERNAME: {% raw %}${{ secrets.SNOWFLAKE_USERNAME }}{% endraw %}
          SNOWFLAKE_PASSWORD: {% raw %}${{ secrets.SNOWFLAKE_PASSWORD }}{% endraw %}
        with:
          soda_library_version: v1.0.4
          data_source: snowflake
          configuration: ./configuration.yaml
          checks: ./checks.yaml
```

[About Soda and the GitHub Action for Soda](#about-soda-and-the-github-action-for-soda)<br />
[Prerequisites](#prerequisites)<br />
[Add the Action to a Workflow](#add-the-action-to-a-workflow)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Required Action input](#required-action-input)<br />
[Notes and limitations](#notes-and-limitations)<br />
[Go further](#go-further)<br />
<br />

## About Soda and the GitHub Action for Soda

**Soda** works by taking the data quality checks that you prepare and using them to run a scan of datasets in a data source. A scan is a CLI command which instructs Soda to prepare optimized SQL queries that execute data quality checks on your data source to find invalid, missing, or unexpected data. When checks fail, they surface bad-quality data and present check results that help you investigate and address quality issues.

For example, in a repository in which are adding a transformation or making changes to a dbt model, you can add the **GitHub Action for Soda** to your workflow, as above. With each new pull request, or commit to an existing one, it executes a Soda scan for data quality and presents the results of the scan in a comment in the pull request, and in a report in Soda Cloud.

Where the scan results indicate an issue with data quality, Soda notifies you in both a PR comment and by email so that you can investigate and address any issues before merging your PR into production.

![github-comment](/assets/images/github-comment.png){:height="550px" width="550px"}

Further, you can access a full report of the data quality scan results, including scan logs, in your Soda Cloud account via a link in the PR comment. 

![scan-report](/assets/images/scan-report.png){:height="700px" width="700px"}


## Prerequisites

* You have a GitHub account, and are familiar with using <a href="https://docs.github.com/en/actions/using-workflows" target="_blank">GitHub Workflows</a> and <a href="https://docs.github.com/en/actions" target="_blank">Actions</a>.
* You have access to the data source login credentials that Soda needs to access your data to run a scan for quality.



## Add the Action to a Workflow

1. If you have not already done so, <a href="https://cloud.soda.io/signup" target="_blank">create a Soda Cloud account</a>, which is free for a 45-day trial. You need a Soda Cloud account to be able to run scans. 
2. In the GitHub repository in which you wish to include data quality scans in a workflow, create a folder named `soda` for the configuration files that Soda requires as input to run a scan. 
3. In this folder, create two files:
* a `configuration.yml` file to store the connection configuration Soda needs to connect to your data source and your Soda Cloud account.
* a `checks.yml` file to store the SodaCL checks you wish to execute to test for data quality. A check is a test that Soda executes when it scans a dataset in your data source.
4. Follow the the [instructions]({% link soda-library/configure.md %}) to add connection configuration details for your data source and Soda Cloud account to the `configuration.yml`, and add two checks for data quality for a dataset to your `checks.yml`. Examples of each follow. <br />
```yaml
# configuration.yml file
data_source snowflake1:
  type: snowflake
  account: sp19295.eu-west-1
  username: ${SNOWFLAKE_USERNAME}
  database: my_database
  schema: public
  password: ${SNOWFLAKE_PASSWORD}
soda_cloud:
  host: cloud.us.soda.io
  api_key_id: ${SODA_CLOUD_API_KEY}
  api_key_secret: ${SODA_CLOUD_API_SECRET}
```
```yaml
# checks.yml file
checks for my_dataset_name:
  - row_count > 0:
          name: Dataset contains data
  - schema:
          warn:
            when schema changes: any
          name: No changes to schema
```
5. In the `.github/workflows` folder in your GitHub repository, open an existing worfklow or <a href="https://docs.github.com/en/actions/using-workflows/about-workflows#create-an-example-workflow" target="_blank">create a new workflow</a> file. Determine where you wish to add a Soda scan for data quality in your workflow. Refer to [Test data in development]({% link soda/quick-start-dev.md %}) for a recommended approach.
6. Access the GitHub Marketplace to access the <a href="https://github.com/marketplace/actions/soda-library-action" target="_blank">Soda GitHub Action</a>. Click **Use latest version** to copy the code snippet for the Action.
7. Paste the snippet into your new or existing workflow as an independent step, then add the required action inputs as in the following example. Refer to [table below](#required-action-inputs) for input details. 
```yaml
- name: Soda Library Action
     uses: sodadata/soda-github-action@v1.0.0
     with:
       soda_library_version: v1.0.4
       data_source: snowflake
       configuration: .soda/configuration.yaml
       checks: .soda/checks.yaml
```
8. Optionally, add a list of variables for sensitive login credentials and keys, as in the following example. Read more about <a href="https://docs.github.com/en/actions/security-guides/encrypted-secrets" target="_blank">GitHub encrypted secrets</a>.
```yaml
- name: Perform Soda Scan
     uses: sodadata/soda-github-action@v1
     env:
       SODA_CLOUD_API_KEY: {% raw %}${{ secrets.SODA_CLOUD_API_KEY }}{% endraw %}
       SODA_CLOUD_API_SECRET: {% raw %}${{ secrets.SODA_CLOUD_API_SECRET }}{% endraw %}
       SNOWFLAKE_USERNAME: {% raw %}${{ secrets.SNOWFLAKE_USERNAME }}{% endraw %}
       SNOWFLAKE_PASSWORD: {% raw %}${{ secrets.SNOWFLAKE_PASSWORD }}{% endraw %}
     with:
       soda_library_version: v1.0.4
       data_source: snowflake1
       configuration: .soda/configuration.yaml
       checks: .soda/checks.yaml
```
9. Save the changes to your workflow file, then test the action's functionality by triggering the event that workflow job in GitHub, such as creating a pull request. To monitor the progress of the workflow, access the **Actions** tab in your GitHub repository to find the run in **Workflow Runs**. 
10. When the job completes, navigate to the pull request's **Conversation** tab to view the comment the Action posted via the github-action bot. To examine the full scan report and troubleshoot any issues, click the link to Soda Cloud in the comment, then click **View Logs**. Use [Troubleshoot SocaCL]({% link soda-cl/troubleshoot.md %}) for help diagnosing issues.

**Next:**
* Add more SodaCL checks to your `checks.yml` file to validate data according to your own use cases and requirements. Refer to [SodaCL]({% link soda-cl/soda-cl-overview.md %}) reference documentation, and the [SodaCL tutorial]({% link soda/quick-start-sodacl.md %}).
* Follow the guide for [Test data during development]({% link soda/quick-start-dev.md %}) for more insight into a use case for the GitHub Action for Soda.x

<details>
    <summary style="color:#00BC7E">What does the GitHub Action do?</summary>
To summarize, the action completes the following tasks:
 <ol>
   <li>Checks to validate that the required Action input values are set.</li>
   <li>Builds a Docker image with a specific Soda Library version for the base image.</li>
   <li>Expands the environment variables to pass to the Docker run command as these variables can be configured in the workflow file and contain secrets.</li>
   <li>Runs the built image to trigger the Soda scan for data quality.</li>
   <li>Converts the Soda Library scan results to a markdown table using newest hash from 1.0.0 version.</li>
   <li>Creates the pull request comment.</li>
   <li>Posts any additional messages to make it clear whether or not the scan failed.</li>
  </ol>
See the public <a href="https://github.com/sodadata/soda-github-action" target="_blank">soda-github-action</a> repository for more detail. <br />
</details>

<br />

#### Required Action input

| Input | Description | Required |
| ----- | ----------- | :------: |
| `soda_library_version` | Version of the Soda Library that runs the scan. Supply a specific version, such as v1.0.4, or latest. <br />See <a href="https://hub.docker.com/r/sodadata/soda-library/tags" target="_blank">soda-library docker images</a> for possible versions. Compatible with Soda Library 1.0.4 and higher. | ✓ |
| `data_source` | Name of data source on which to perform the scan.	| ✓ |
| `configuration` | File path to configuration YAML file. See Soda docs.	| ✓ |
| `checks` | File path to checks YAML file. See Soda docs. Compatible with shell filename extensions. <br />Identify multiple check files, if you wish. For example: `./checks_*.yaml` or `./{check1.yaml,check2.yaml}`	| ✓ |


## Notes and limitations

* Be aware that for self-hosted runners in GitHub:
  * Windows runners are not supported, including the use of official Windows-based images such as windows-latest
  * MacOS runners require installation of Docker because macos-latest does not come with Docker pre-installed.
* The GitHub Action for Soda is designed to overwrite the comment it adds to your PR to indicate the status of the latest scan. Expect to see only ever see one comment displaying the output status of the latest data quality scan.
* Note that GitHub PR comments have a 4-byte unicode character limit of 65,536. If the GitHub Action tries to post a comment that exceeds this limit, the job completion may be impacted.

## Go further

* Learn how to [Test data in a pipeline]({% link soda/quick-start-prod.md %}).
* Learn more about using [webhooks]({% link soda/integrate-webhooks.md %}) to integrate Soda Cloud with other third-party service providers.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Access a list of <a href="https://www.soda.io/integrations" target="_blank">all integrations</a> that Soda Cloud supports.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}