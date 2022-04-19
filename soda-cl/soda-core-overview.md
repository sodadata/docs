---
layout: default
title: Soda Core (Beta)
description: Open-source software that you install and use to run data quality tests from the command-line. Write human-readable checks in a YAML file using SodaCL. 
parent: SodaCL
---
<br />

![soda-core-logo](/assets/images/soda-core-logo.png){:height="235px" width="235px"} ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}
<br />
<br />

<p>&#10004;  <a href="https://github.com/sodadata/soda-core" target="_blank">Open-source software</a><br /></p>
<p>&#10004;  <a href="https://docs.soda.io/soda-core/get-started.html" target="_blank">Install</a> from the command-line<br /></p>
<p>&#10004;  <a href="https://docs.soda.io/soda-core/get-started.html" target="_blank">Compatible</a> with Snowflake, Amazon Redshift, BigQuery, and Postgres<br /></p>
<p>&#10004;  Write human-readable <a href="https://docs.soda.io/soda-cl/soda-cl-overview.html">SodaCL checks</a> in a YAML file<br /></p>
<p>&#10004;  Integrate with an <a href="https://docs.soda.io/soda-core/scans-pipeline.html" target="_blank">Airflow enviroment</a><br /></p>
Access the full [Soda Core documentation]({% link soda-core/overview.md %}).
<br />
<br />

#### Example checks.yml file
```yaml
# Checks for basic validations
checks for PRODUCTS:
  - row_count between 10 and 1000
  - missing_count(unit_cost) = 0
  - invalid_count(unit_cost) = 0
      valid min: 0.01
      valid max: 10000
  - invalid_percent(movement_date) < 1 %:
      valid format: date us
  - sum(units_in) > 50
  - duplicate_count(country, zip) = 0

# Checks for schema changes
  checks for PYMNT:
  - schema:
      fail:
        when required column missing: [finance_key]
        when wrong column index:
          finance_key: 0
        when forbidden column present: ["pii_*"]
      warn:
        when wrong column type:
          date_key: integer 
          amount: double precision 

# Check for freshness 
checks for PROSPECTS:
  - freshness using row_added_ts < 1d

# Check for reference between datasets

checks for PRODUCTS:
  - values in organization_key must exist in dim_organization organization_key
```

<div class="docs-html-content">
    <section class="docs-section" style="padding-top:0">
        <div class="docs-section-row">
            <div class="docs-grid-3cols">
                <div>
                    <img src="/assets/images/icons/icon-pacman@2x.png" width="54" height="40">
                    <h2>Learn</h2>
                    <a href="/soda-core/overview.html" target="_blank">Soda Core documentation</a>
                </div>
                 <div>
                    <img src="/assets/images/icons/icon-dev-tools@2x.png" width="54" height="40">
                    <h2>Install</h2>
                    <a href="/soda-core/get-started.html" target="_blank">Install Soda SQL</a>
                    <a href="/soda-core/first-scan.html" target="_blank">Run a scan</a>
                </div>
                 <div>
                    <img src="/assets/images/icons/icon-collaboration@2x.png" width="54" height="40">
                    <h2>Collaborate</h2>
                    <a href="https://community.soda.io/slack" target="_blank">Join us on Slack</a>
                    <a href="https://github.com/sodadata/soda-core/blob/main/CONTRIBUTING.md" target="_blank">Help develop Soda Core</a>
                </div>
            </div>
        </div>        
    </section>
</div>


---
{% include docs-footer.md %}