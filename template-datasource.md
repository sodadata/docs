---
layout: default
title: Connect Soda to datasource-name
description: Access configuration details to connect Soda to a NAME data source.
parent: Connect a data source
---

# Connect Soda to datasource-name

{% include connect-to-intro.md %}

```yaml
data_source my_datasource_name:
  type: xxxx
  connection:
 
```

| Property          | Required | Notes                                                      |
| ----------------- | -------- | ---------------------------------------------------------- |
| type              | required |                                                            |



## Supported data types

| Category | Data type                                                       |
| -------- | --------------------------------------------------------------- |
| text     |                                                                 |
| number   |                                                                 |
| time     |                                                                 |

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}