---
layout: default
title: Integrate Soda with a GitHub Workflow
description: Use the GitHub Action for Soda to automatically scan for data quality during development.
parent: Integrate Soda
---

# Integrate Soda with a GitHub Workflow 
*Last modified on {% last_modified_at %}*

Add the **<a href="https://github.com/marketplace/actions/soda-library-action" target="_blank">GitHub Action for Soda</a>** to your GitHub Workflow to automatically execute scans for data quality during development.

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
          SODA_CLOUD_API_KEY: ${{ secrets.SODA_CLOUD_API_KEY }}
          SODA_CLOUD_API_SECRET: ${{ secrets.SODA_CLOUD_API_SECRET }}
          SNOWFLAKE_USERNAME: ${{ secrets.SNOWFLAKE_USERNAME }}
          SNOWFLAKE_PASSWORD: ${{ secrets.SNOWFLAKE_PASSWORD }}
        with:
          soda_library_version: v1.0.4
          data_source: snowflake
          configuration: ./configuration.yaml
          checks: ./checks.yaml
```

## About Soda and the GitHub Action for Soda

Soda works by taking the data quality checks that you prepare and using them to run a scan of datasets in a data source. A scan is a CLI command which instructs Soda to prepare optimized SQL queries that execute data quality checks on your data source to find invalid, missing, or unexpected data. When checks fail, they surface bad-quality data and present check results that help you investigate and address quality issues.

For example, in a repository in which are adding a transformation or making changes to a dbt model, you can access the <a href="https://github.com/marketplace/actions/soda-library-action" target="_blank">GitHub Marketplace</a> to add the GitHub Action for Soda to your workflow so that with each new PR, or commit to an existing PR, it executes a Soda scan for data quality and presents the results of the scan in a comment in the pull request, and in a report in Soda Cloud.

Where the scan results indicate an issue with data quality, Soda notifies you both in the PR comment, and by email so that you can investigate and address any issues before merging your PR into production.

![github-comment](/assets/images/github-comment.png){:height="550px" width="550px"}

Further, you can access a full report of the data quality scan results, including scan logs, in your Soda Cloud account via a link in the PR comment. 

![scan-report](/assets/images/scan-report.png){:height="700px" width="700px"}


## Prerequisites

* You have [installed]({% link soda-library/install.md %}) and Soda Library version 1.0.4 or greater, and [configured]({% link soda-library/configure.md %}) it to connect to your Soda Cloud account.
* You have a GitHub account, and are familiar with using <a href="https://docs.github.com/en/actions/using-workflows" target="_blank">GitHub Workflows</a> and <a href="https://docs.github.com/en/actions" target="_blank">Actions</a>.



## Add the Action to a Workflow

1. To Do

## Go further

* Learn more about general [webhooks]({% link soda/integrate-webhooks.md %}) to integrate Soda Cloud with other third-party service providers.
* Set [notification rules]({% link soda-cloud/notif-rules.md %}) that apply to multiple checks in your account. 
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