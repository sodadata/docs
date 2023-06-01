---
layout: default
title: Soda Library usage statistics
description: To understand how users are using Soda Library, the Soda dev team added telemetry event tracking to Soda Library. See instructions to opt-out.
parent: Reference
redirect_from: /soda-core/usage-stats.html
---

# Soda Library usage statistics
*Last modified on {% last_modified_at %}*

To understand how users are using Soda Library, and to proactively capture bugs and performance issues, the Soda development team has added telemetry event tracking to Soda Library. 

Soda tracks usage statistics using the Open Telemetry Framework. The data Soda tracks is completely anonymous, does not contain any personally identifiying information (PII) in any form, and is purely for internal use.

## Opt out of usage statistics

Soda Library collects usage statistics by default. You can opt-out from sending Soda Library usage statistics at any time by adding the following to your `~/.soda/config.yml` or `.soda/config.yml` file:
{% include code-header.html %}
```yaml
send_anonymous_usage_stats: false
```

## Go further

* Learn [How Soda Library works]({% link soda-library/how-library-works.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}