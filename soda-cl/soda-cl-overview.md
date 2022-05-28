---
layout: default
title: SodaCL (Beta)
description: Soda Checks Language (Beta) is a human-readable, domain-specific language for data reliability. You use SodaCL to define Soda Checks in a checks YAML file.
parent: SodaCL
---
<br />

![soda-cl-logo](/assets/images/sodacl-logo.png){:height="185px" width="185px"} ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}
<br />
<br />

<p>&#10004;  Human-readable, domain-specific language for data reliability<br /></p>
<p>&#10004;  Compatible with <a href="https://docs.soda.io/soda-core/overview.html" target="_blank">Soda Core (Beta)</a> and <a href="https://docs.soda.io/soda-cloud/overview.html">Soda Cloud</a><br /></p>
<p>&#10004;  Includes 25+ built-in metrics, plus the ability to <a href="https://docs.soda.io/soda-cl/user-defined.html">include SQL queries</a><br /></p>
<p>&#10004;  Includes checks with <a href="https://docs.soda.io/soda-cl/numeric-metrics.html#fixed-and-dynamic-thresholds">dynamic thresholds</a> to gauge changes to metrics over time<br /></p>
<p>&#10004;  Collaborate with your team to write SodaCL checks in a YAML file<br /></p>
<br />


#### Example checks
```yaml
# Checks for basic validations
checks for PRODUCTS:
  - row_count between 10 and 1000
  - missing_count(unit_cost) = 0
  - invalid_count(unit_cost) = 0:
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

# Check for referential integrity
checks for PRODUCTS:
  - values in organization_key must exist in dim_organization organization_key
```
<br />

<div class="docs-html-content">
    <section class="docs-section" style="padding-top:0">
        <div class="docs-section-row">
            <div class="docs-grid-3cols">
                <div>
                    <img src="/assets/images/icons/icon-pacman@2x.png" width="54" height="40">
                    <h2>Get started</h2>
                    <a href="https://docs.soda.io/soda-core/get-started.html" target="_blank">Download and install Soda Core (Beta)</a> 
                    <a href="https://docs.soda.io/soda-core/first-scan.html#the-checks-yaml-file" target="_blank">Write checks in a checks.yml file</a>
                    <a href="https://docs.soda.io/soda-core/first-scan.html#run-a-scan" target="_blank">Run a scan of your data to discover any data quality issues</a>
                </div>
            </div>
        </div>        
    </section>
</div>


---
{% include docs-footer.md %}