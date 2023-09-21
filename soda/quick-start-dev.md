---
layout: default
title: Test data quality during CI/CD development
description: Follow this guide to set up and run automated Soda scans for data quality during CI/CD development using GitHub Actions.
parent: Use case guides
---

# Test data quality during CI/CD development
*Last modified on {% last_modified_at %}*

Use this guide to install and set up Soda to test the quality of your data during your development lifecycle. Catch data quality issues in a GitHub pull request before merging data management changes, such as transformations, into production.


(Not quite ready for this big gulp of Soda? 🥤Try [taking a sip]({% link soda/quick-start-sip.md %}), first.)

![cicd-pipeline](/assets/images/cicd-pipeline.png){:width="700px"}

[About this guide](#about-this-guide)<br />
[Add the GitHub Action for Soda to a Workflow](#add-the-github-action-for-soda-to-a-workflow)<br />
[Write checks for data quality](#write-checks-for-data-quality)<br />
[Trigger a scan and examine the scan results](#trigger-a-scan-and-examine-the-scan-results)<br />
[Go further](#go-further)<br />
<br />


## About this guide

The instructions below offer Data Engineers an example of how to use the <a href="https://github.com/marketplace/actions/soda-library-action" target="_blank">GitHub Action for Soda</a> to execute SodaCL checks for data quality on data in a Snowflake data source. 

For context, the example assumes that a team of people use GitHub to collaborate on managing data ingestion and transformation with dbt. In the same repo, team members collaborate to write tests for data quality in SodaCL checks YAML files. With each new pull request, or commit to an existing one, in the repository that adds a transformation or makes changes to a dbt model, the GitHub Action in Workflow executes a Soda scan for data quality and presents the results of the scan in a comment in the pull request, and in Soda Cloud. 

Where the scan results indicate an issue with data quality, Soda notifies the team via a notification in Slack so that they can investigate and address any issues before merging the PR into production.

Borrow from this guide to connect to your own data source, add the GitHub Action for Soda to a Workflow, and execute your own relevant tests for data quality to prevent issues in production.

## Add the GitHub Action for Soda to a Workflow

1. If you have not already done so, <a href="https://cloud.soda.io/signup" target="_blank">create a Soda Cloud account</a>, which is free for a 45-day trial. <br />
    <details>
        <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
    To validate your account license or free trial, the Soda Library Docker image that the GitHub Action uses to execute scans must communicate with a Soda Cloud account via API keys. <br />Create <a href="https://go.soda.io/api-keys" target="_blank">new API keys</a> in your Soda Cloud account, then use them to configure the connection between the Soda Library Docker image and your account in step 4 of this procedure. <br /><br />
    </details>
2. In the GitHub repository in which you wish to include data quality scans in a Workflow, create a folder named `soda` for the configuration files that Soda requires as input to run a scan. 
3. In this folder, create two files:
* a `configuration.yml` file to store the connection configuration Soda needs to connect to your data source and your Soda Cloud account.
* a `checks.yml` file to store the SodaCL checks you wish to execute to test for data quality; see [next section](#write-checks-for-data-quality).
4. Follow the [instructions]({% link soda-library/configure.md %}) to add connection configuration details for both your data source and your Soda Cloud account to the `configuration.yml`, as per the example below. 
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
      
      soda_cloud:
        host: cloud.us.soda.io
        api_key_id: ${SODA_CLOUD_API_KEY}
        api_key_secret: ${SODA_CLOUD_API_SECRET} 
  ```
5. In the `.github/workflows` folder in your GitHub repository, open an existing Workflow or <a href="https://docs.github.com/en/actions/using-workflows/about-workflows#create-an-example-workflow" target="_blank">create a new workflow</a> file.  
6. In your browser, navigate to the GitHub Marketplace to access the <a href="https://github.com/marketplace/actions/soda-library-action" target="_blank">Soda GitHub Action</a>. Click **Use latest version** to copy the code snippet for the Action.
7. Paste the snippet into your new or existing workflow as an independent step, then add the required action inputs and environment variable as in the following example. 
* Be sure to add the Soda Action *after* the step in the workflow that completes a dbt run that executes your dbt tests. 
* Best practice dictates that you configure sensitive credentials using GitHub secrets. Read more about <a href="https://docs.github.com/en/actions/security-guides/encrypted-secrets" target="_blank">GitHub encrypted secrets</a>. <br />
    ```yaml
    # This GitHub Action runs a Soda scan on a Snowflake data source called reporting_api_marts.
    name: Run Soda Scan on [reporting_api_marts]
    # GitHub triggers this job when a user creates or updates a pull request.
    on: pull_request
    jobs:
      soda_scan:
        runs-on: ubuntu-latest
        name: Run Soda Scan
        steps:
          - name: Checkout
            uses: actions/checkout@v3

          - name: Perform Soda Scan
            uses: sodadata/soda-github-action@main
            env:
              SODA_CLOUD_API_KEY: {% raw %}${{ secrets.SODA_CLOUD_API_KEY }}{% endraw %}
              SODA_CLOUD_API_SECRET: {% raw %}${{ secrets.SODA_CLOUD_API_SECRET }}{% endraw %}
              SNOWFLAKE_USERNAME: {% raw %}${{ secrets.SNOWFLAKE_USERNAME }}{% endraw %}
              SNOWFLAKE_PASSWORD: {% raw %}${{ secrets.SNOWFLAKE_PASSWORD }}{% endraw %}
            with:
              soda_library_version: v1.0.4
              data_source: snowflake_api_marts
              configuration: ./soda/configuration.yml
              checks: ./soda/checks.yml
    ```
9. Save the changes to your workflow file.

## Write checks for data quality

A check is a test that Soda executes when it scans a dataset in your data source. The `checks.yml` file stores the checks you write using the [Soda Checks Language (SodaCL)]({% link soda-cl/soda-cl-overview.md %}). You can create multiple `checks.yml` files to organize your data quality checks and run all, or some of them, at scan time.

1. In your `soda` folder, open the `checks.yml` file, then copy and paste the following rather generic checks into the file. 
* Replace the value of `dataset_name` with the name of a dataset in your data source.
* Replace the value of `column1` with the name of a column in the dataset. <br />
        ```yaml
        checks for dataset_name:
        # Checks that dataset contains rows
          - row_count > 0:
              name: Dataset contains data
        # Checks that column contains no NULL values
          - missing_count(column1) = 0:
              name: No NULL values
        ```
3. Save the `checks.yml` file.

Learn more about [SodaCL]({% link soda/quick-start-sodacl.md %}). <br />
Learn more about using [multiple checks YAML files]({% link soda-library/run-a-scan.md %}#anatomy-of-a-scan-command). <br />


## Trigger a scan and examine the scan results

To trigger the GitHub Action and initiate a Soda scan for data quality, create a new pull request in your repository. Be sure to trigger a Soda scan *after* the step in your Workflow that completes the dbt run that executed your dbt tests. 

<details>
    <summary style="color:#00BC7E">What does the GitHub Action do?</summary>
To summarize, the action completes the following tasks:
 <ol>
   <li>Checks to validate that the required Action input values are set.</li>
   <li>Builds a Docker image with a specific Soda Library version for the base image.</li>
   <li>Expands the environment variables to pass to the Docker run command as these variables can be configured in the workflow file and contain secrets.</li>
   <li>Runs the built image to trigger the Soda scan for data quality.</li>
   <li>Converts the Soda Library scan results to a markdown table using newest hash from 1.0.0 version.</li>
   <li>Creates a pull request comment.</li>
   <li>Posts any additional messages to make it clear whether or not the scan failed.</li>
  </ol>
See the public <a href="https://github.com/sodadata/soda-github-action" target="_blank">soda-github-action</a> repository for more detail. <br /><br />
</details>

1. For the purposes of this exercise, create a new branch in your GitHub repo, then make a small change to an existing file and commit and push the change to the branch.
2. Execute a <a href="https://docs.getdbt.com/reference/commands/run" target="_blank">dbt run</a>.
3. Create a new pull request, then navigate to your GitHub account and review the pull request you just created. Notice that the Soda scan action is queued and perhaps already running against your data to check for quality.
4. When the job completes, navigate to the pull request's **Conversation** tab to view the comment the Action posted via the github-action bot. The table indicates the states and volumes of the check results.x<br /> <br />
![github-comment-fail](/assets/images/github-comment-fail.png){:height="450px" width="450px"}
5. To examine the full scan report and troubleshoot any issues, click the link in the comment to **View full scan results**, then click **View Scan Log**. Use [Troubleshoot SocaCL]({% link soda-cl/troubleshoot.md %}) for help diagnosing issues. <br /> <br />
![scan-report-fail](/assets/images/scan-report-fail.png){:height="500px" width="500px"}


✨Well done!✨ You've taken the first step towards a future in which you and your colleagues prevent data quality issues from getting into production. Huzzah!


## Go further

* [Get organized]({% link soda-cloud/collaborate.md %}) in Soda!
* Not quite ready for this big gulp of Soda? Try [taking a sip]({% link soda/quick-start-sip.md %}), first.
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