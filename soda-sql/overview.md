---
layout: default
title: Soda SQL
description: Open-source software that you install and use to run data quality tests from the command-line. Compatible with Snowflake, Amazon Redshift, BigQuery, and more.
sidebar: sql
parent: Soda SQL
---
<br />

![soda-sql-logo](/assets/images/soda-sql-logo.png){:height="200px" width="200px"} 
<br />
{% include banner-sql.md %}

<p>&#10004;  <a href="https://github.com/sodadata/soda-sql" target="_blank">Open-source software</a><br /></p>
<p>&#10004;  <a href="https://docs.soda.io/soda-sql/installation.html">Install</a> from the command-line<br /></p>
<p>&#10004;  Compatible with Snowflake, Amazon Redshift, BigQuery, <a href="https://docs.soda.io/soda-sql/installation.html#compatibility">and more</a><br /></p>
<p>&#10004;  <a href="https://docs.soda.io/soda-sql/tests.html">Write tests</a> in a YAML file<br /></p> 
<p>&#10004;  <a href="https://docs.soda.io/soda-sql/programmatic_scan.html">Run programmatic scans</a> to test data quality<br /></p>
<p>&#10004;  Deploy in an <a href="https://docs.soda.io/soda-sql/orchestrate_scans.html">Airflow enviroment</a><br /></p> 
<br />
<br />

#### Example scan YAML file
```yaml
table_name: breakdowns
metrics:
  - row_count
  - missing_count
  - missing_percentage
...
# Validates that a table has rows
tests:
  - row_count > 0

# Tests that numbers in the column are entered in a valid format as whole numbers
columns:
  incident_number:
    valid_format: number_whole
    tests:
      - invalid_percentage == 0

# Tests that no values in the column are missing
  school_year:
    tests:
      - missing_count == 0

# Tests for duplicates in a column
  bus_no:
    tests:
      - duplicate_count == 0

# Compares row count between datasets
sql_metric: 
  sql: |
    SELECT COUNT(*) as other_row_count
    FROM other_table
  tests:
    - row_count == other_row_count
```

<div class="docs-html-content">
    <section class="docs-section" style="padding-top:0">
        <div class="docs-section-row">
            <div class="docs-grid-3cols">
                <div>
                    <img src="/assets/images/icons/icon-pacman@2x.png" width="54" height="40">
                    <h2>Play</h2>
                    <a href="/soda-sql/landing.html">Interactive Soda SQL demo</a>
                    <a href="https://github.com/sodadata/tutorial-demo-project" target="_blank">Soda SQL playground in GitHub</a>
                </div>
                 <div>
                    <img src="/assets/images/icons/icon-dev-tools@2x.png" width="54" height="40">
                    <h2>Install</h2>
                    <a href="/soda-sql/installation.html">Install Soda SQL</a>
                    <a href="/soda/quick-start-soda-sql.html">Quick start for Soda SQL and Soda Cloud</a>
                </div>
                 <div>
                    <img src="/assets/images/icons/icon-collaboration@2x.png" width="54" height="40">
                    <h2>Collaborate</h2>
                    <a href="https://community.soda.io/slack" target="_blank">Join us on Slack</a>
                    <a href="https://github.com/sodadata/soda-sql/blob/main/CONTRIBUTING.md" target="_blank">Help develop Soda SQL</a>
                </div>
            </div>
        </div>        
    </section>
</div>


---
*Last modified on {% last_modified_at %}*