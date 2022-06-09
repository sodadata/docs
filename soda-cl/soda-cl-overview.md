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
checks for dim_customer:
  - row_count between 10 and 1000
  - missing_count(birth_date) = 0
  - invalid_percent(phone) < 1 %:
      valid format: phone number
  - invalid_count(number_cars_owned) = 0:
      valid min: 1
      valid max: 6
  - duplicate_count(phone) = 0

checks for dim_product:
  - avg(safety_stock_level) > 50
# Checks for schema changes
  - schema:
      name: Find forbidden, missing, or wrong type
      warn:
        when required column missing: [dealer_price, list_price]
        when forbidden column present: [credit_card]
        when wrong column type:
          standard_cost: money
      fail:
        when forbidden column present: [pii*]
        when wrong column index:
          model_name: 22
# Check for freshness 
  - freshness (start_date) < 1d

# Check for referential integrity
checks for dim_department_group:
  - values in (department_group_name) must exist in dim_employee (department_name)
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