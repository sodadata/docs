---
layout: default
title: Connect Soda to Microsoft Fabric
description: Access configuration details to connect Soda to a Microsoft Fabric data source.
parent: Data source reference
---

# Connect Soda to Microsoft Fabric
*Last modified on {% last_modified_at %}* <br />

{% include connect-to-intro.md %}


## Connection configuration reference

Soda support for Fabric data source is based on `soda-sqlserver` package.

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: fabric
  ... same as sqlserver
  authentication_method: fabric
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| authentication_method  | optional | Fabric authentication method. Supported values: 'auto', 'cli', 'environment', 'synapsespark' and 'fabricspark'. No default value. |


{% include test-connection.md %}

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
