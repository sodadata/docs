---
layout: default
title: Connect Soda to Dremio
description: Access configuration details to connect Soda to a Dremio data source.
parent: Connect a data source
---

# Connect Soda to Dremio

{% include connect-to-intro.md %}

```yaml
data_source my_datasource_name:
  type: dremio
  host: 
  port: 
  username:
  password: 
  schema:
```

| Property  | Required | Notes                                                            |
| --------- | -------- | -----------------------------------------------------------------|
| type      | required |                                                                  |
| host      | required |                                                                  |
| port      | required |                                                                  |
| username  | required | Consider using system variables to retrieve this value securely. |
| password  | required | Consider using system variables to retrieve this value securely. |
| schema    | optional |                                                                  |



## Supported data types

| Category | Data type                                                       |
| -------- | --------------------------------------------------------------- |
| text     | CHAR, VARCHAR, STRING                                           |
| number   | TINYINT, SMALLINT, INT, INTEGER, BIGINT, DOUBLE, FLOAT, DECIMAL |
| time     | DATE, TIMESTAMP                                                 |

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}