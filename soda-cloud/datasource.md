---
layout: default
title: Add a data source
description: 
parent: Soda Cloud
---

# Add a data source

Data Source Label
Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.

Default Scan Definition Label
Provide a unique identifier for the scan definition. A scan definition is a collection of checks.yml files that Soda Cloud collects when it executes a scan on a data source. Each checks.yml file contains the checks you wish to execute to test for data quality.

Default Scan Definition Agent
Select the name of a Soda Agent that you have previously set up in your secure environment and connected to a specific data source. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan.

Schedule Definition
Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression.




## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}