---
layout: default
title: Soda Library overview
description: Soda Library is Python library and CLI tool that enables you to use the Soda Checks Language to turn user-defined input into SQL queries.
parent: Soda Library
redirect_from: 
- /soda-core/
- /soda-core/overview.html
- /soda-cl/soda-core-overview.html
---

# Soda Library
*Last modified on {% last_modified_at %}*
<!--Linked to UI, access Shlink-->
<div class="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
  🎉 Introducing <strong>Soda Library</strong>, a new extension of the Soda Core open-source Python library and CLI tool. <br /> <br />
  Leveraging all the power of Soda Core and SodaCL, the extension offers new features and functionality for Soda customers. <br /><br />
  <strong>New with Soda Library</strong><br/>
  <ul>
    <li>Run <a href="https://docs.soda.io/soda-cl/check-suggestions.html">Check Suggestions</a> in the Soda Library CLI to profile your data and auto-generate basic checks for data quality.</li>
    <li>Use <a href="https://docs.soda.io/soda-cl/group-by.html">Group By</a> configuration and <a href="https://docs.soda.io/soda-cl/group-evolution.html">Group By Evolution</a> checks to organize data qaulity check results by category.</li>
    <li>Configure a <a href="https://docs.soda.io/soda-cl/check-template.html">Check Template</a> to customize a metric you can reuse in multiple checks.</li>
  </ul>
  New users can <a href="https://docs.soda.io/soda-library/install.html" target="_blank">install Soda Library</a> for a free, 45-day trial.<br />
  Existing customers can seamlessly <a href="https://docs.soda.io/soda-library/install.html#migrate-from-soda-core">migrate</a> from Soda Core to Soda Library.
</div>

<br />
&#10004;  A Python library and CLI tool for data quality testing<br /> <br />
&#10004;  Compatible with [Soda Checks Language (SodaCL)]({% link soda-cl/soda-cl-overview.md %}) and [Soda Cloud]({% link soda-cloud/overview.md %}) <br /> <br />
&#10004;  Supports [Check suggestions]({% link soda-cl/check-suggestions.md %}) to auto-generate basic quality checks tailored to your data <br /> <br />
&#10004;  Enables data quality testing both in your [data pipeline]({% link soda/quick-start-prod.md %}) and [development workflows]({% link soda/quick-start-dev.md %}) <br /> <br />
&#10004;  Extended from Soda Core, a free, open-source CLI and Python library in <a href="https://github.com/sodadata/soda-core" targt="_blank">GitHub</a> <br /> <br />

<br />

#### Example checks
{% include code-header.html %}
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
```
{% include code-header.html %}
```yaml
# Check for schema changes
checks for dim_product:
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
```
{% include code-header.html %}
```yaml
# Check for freshness 
checks for dim_product:
  - freshness(start_date) < 1d
```
{% include code-header.html %}
```yaml
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
                    <a href="https://docs.soda.io/soda-library/install.html" target="_blank">Download and install Soda Library </a> 
                    <a href="https://docs.soda.io/soda-library/configure.html" target="_blank">Prepare a configuration.yml file</a>
                    <a href="https://docs.soda.io/soda-cl/check-suggestions.html" target="_blank">Auto-generate data quality check suggestions</a>
                    <a href="https://docs.soda.io/soda-library/run-a-scan.html" target="_blank">Run a scan</a>
                </div>
            </div>
        </div>        
    </section>
</div>

## Why Soda Library?

Simplify the work of testing and maintaining good-quality data.
* Download the Soda Library (free a 45-day trial!) and configure settings and data quality checks in two simple YAML files to start scanning your data within minutes.
* Connect Soda Library to over a dozen data sources to scan volumes of data for quality.
* Write data quality checks using SodaCL, a low-code, human-readable, domain-specific language for data quality management.
* Use the Soda Library to build programmatic scans that you can use in conjunction with orchestration tools like Airflow or Prefect to automate pipeline actions when data quality checks fails.
* Run the same scans for data quality in multiple environments such as development, staging, and production.

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}