---
layout: default
title: Use case guides
description: Access examples of Soda implmentations according to use case and data quality testing needs.
parent: Use case guides
---

# Use case guides
*Last modified on {% last_modified_at %}*

Use the following guides as example implementations based on how you intend to use Soda for data quality testing. For standard set up instructions, see [Get started]({% link soda/setup-guide.md %}).

<div class="docs-html-content">
    <section class="docs-section" style="padding-top:0">
        <div class="docs-section-row">
            <div class="docs-grid-3cols">
                <div>
                    <img src="/assets/images/icons/icon-dev-tools@2x.png" width="54" height="40">
                    <h2>Soda + dbt + Airflow</h2>
                    <a href="/soda/quick-start-prod.html" target="_blank">Test data in a pipeline</a>
                    <p>Use this guide as an example for how to set up and use Soda to test the quality of your data in an Airflow pipeline.</p>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-investigate.png" width="50" height="40">
                    <h2>Soda for data migration</h2>
                    <a href="/soda/quick-start-migration.md">Test before data migration</a>
                    <p>Use this guide to set up Soda to test before and after data migration.</p>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-collaboration@2x.png" width="54" height="40">
                    <h2>Self-serve Soda</h2>
                    <a href="/soda/quick-start-end-user.html" target="_blank">Self-serve data quality</a>
                    <p>Use this guide to set up Soda Cloud to enable users across your organization to serve themselves when it comes to testing data quality. </p>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-dev-tools@2x.png" width="50" height="40">
                    <h2>Soda + Databricks notebook</h2>
                    <a href="/soda/quick-start-migration.md">Invoke Soda in Databricks</a>
                    <p>Use this guide to invoke Soda data quality tests in a Databricks notebook.</p>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-new@2x.png" width="54" height="40">
                    <h2>Soda + GitHub</h2><br />
                    <a href="/soda-cloud/collaborate.html#invite-your-team-members">Test data during development</a>
                    <p>Use this guide to set up Soda to test the quality of your data during your development lifecycle in a GitHub Workflow.</p>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-pacman@2x.png" width="50" height="40">
                    <h2>Soda + automated monitoring</h2>
                    <a href="/soda/quick-start-migration.md">Automate monitoring</a>
                    <p>Use this guide to set up Soda to automatically monitor data quality.</p>
                </div>
            </div>
        </div>        
    </section>
</div>


Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}