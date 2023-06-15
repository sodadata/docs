---
layout: default
title: Soda Core
description: Soda Core is an open-source library and CLI tool that enables you to use the Soda Checks Language to turn user-defined input into SQL queries.
parent: Reference
redirect_from: 
- /soda-core/
- /soda-core/overview.html
- /soda-cl/soda-core-overview.html
---

# Soda Core
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

**Soda Core** is a free, open-source Python library and CLI tool that enables data engineers to test data quality. Accessible on along with its documentation, you can download the CLI tool or import the Python library to prepare checks for data quality. 

<a href="https://github.com/sodadata/soda-core" target="_blank" class="signup-button">Soda Core on GitHub</a> &nbsp;&nbsp;&nbsp; <a href="https://github.com/sodadata/soda-core/blob/main/docs/overview-main.md" target="_blank" class="signup-button">Soda Core Docs</a>

<br />

**Soda Library**, an extension of Soda Core, enables users to connect to Soda Cloud and offers features and functionality not available with the open-source tool. [Install Soda Library]({% link soda-library/install.md %}) for a free, 45-day trial, or [migrate from Soda Core]({% link soda-library/install.md %}#migrate-from-soda-core) to Soda Library without changing checks or data source connections.


![done](/assets/images/done.png){:width="20px"} Supported<br />
![almost-done](/assets/images/almost-done.png){:width="20px"} Deprecating soon

| Feature or functionality | Soda Core OSS | Soda Library |
| ----------------------- | :-----------: | :----------: |
|Available for free, forever | ![done](/assets/images/done.png){:width="20px"} |  |
|Available for free for a 45-day free trial |  | ![done](/assets/images/done.png){:width="20px"}|
|Connect to Soda Cloud | ![almost-done](/assets/images/almost-done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
|Compatible with basic SodaCL checks and configurations | ![done](/assets/images/done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
|Supports Cloud Metric Store for historic metrics | ![almost-done](/assets/images/almost-done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
|Set alert notifications | ![almost-done](/assets/images/almost-done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
|Define check attributes | ![almost-done](/assets/images/almost-done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
|Profile data | ![almost-done](/assets/images/almost-done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
|Add automated monitoring checks | ![almost-done](/assets/images/almost-done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
|Use anomaly detection and schema evolution checks | ![almost-done](/assets/images/almost-done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
|Use change-over-time checks for relative measurements | ![almost-done](/assets/images/almost-done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
|Requires a Soda Cloud connection via API keys to validate licensing or trial status and run scans. |  | ![done](/assets/images/done.png){:width="20px"} |
|Compatible with Check Suggestions |  | ![done](/assets/images/done.png){:width="20px"} |
|Use Check Templates |  | ![done](/assets/images/done.png){:width="20px"} |
|Use Group By + Group Evolution checks |  | ![done](/assets/images/done.png){:width="20px"} |
|Access extensive documentation on docs.soda.io |  | ![done](/assets/images/done.png){:width="20px"} |


---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
