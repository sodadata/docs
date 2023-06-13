---
layout: default
title: SodaCL 
description: Soda Checks Language is a human-readable, domain-specific language for data reliability. You use SodaCL to define Soda Checks in a checks YAML file.
parent: SodaCL
redirect_from: 
- /soda-cl/
- /soda-core/soda-cl.html
---

# Soda Checks Language 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

<br />
<p>&#10004;  Soda Checks Language: a human-readable, domain-specific language for data reliability<br /></p>
<p>&#10004;  Compatible with <a href="">Soda Library</a>, <a href="https://docs.soda.io/soda-cloud/overview.html">Soda Cloud</a>, and <a href="https://github.com/sodadata/soda-core" target="_blank">Soda Core</a></p>
<p>&#10004;  Includes 25+ built-in metrics, plus the ability to <a href="https://docs.soda.io/soda-cl/user-defined.html">include SQL queries</a><br /></p>
<p>&#10004;  Includes checks with <a href="https://docs.soda.io/soda-cl/numeric-metrics.html#change-over-time-thresholds">change-over-time thresholds</a> to gauge changes to metrics over time<br /></p>
<p>&#10004;  Use SQL or CTE to <a href="https://docs.soda.io/soda-cl/user-defined.html">customize queries</a> tailored to your needs <br /></p>
<br />
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
```
{% include code-header.html %}
```yaml
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
```
{% include code-header.html %}
```yaml
# Check for freshness 
  - freshness (start_date) < 1d
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
                    <a href="https://docs.soda.io/soda-cl/check-suggestions.html" target="_blank">Auto-generate basic data quality checks</a>
                    <a href="https://docs.soda.io/soda/quick-start-sodacl.html" target="_blank">Follow a SodaCL tutorial</a>
                    <a href="https://docs.soda.io/soda-library/run-a-scan.html" target="_blank">Run a scan of your data</a>
                </div>
            </div>
        </div>        
    </section>
</div>


---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}