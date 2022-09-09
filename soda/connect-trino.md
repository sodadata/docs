---
layout: default
title: Connect Soda to Trino
description: Access configuration details to connect Soda to a Trino data source.
parent: Connect a data source
---

# Connect Soda to Trino

{% include connect-to-intro.md %}

Reference <a href="https://trino.io/docs/current/overview/concepts.html#" target="_blank">Trino documentation</a> for assistance.

```yaml
data_source my_datasource_name:
  type: trino
  host: 
  port: 
  username: 
  password: 
  catalog: 
  schema: 
```

| Property | Required | Notes |
| -------- | -------- | ----- |
| type     | required |       |
| host     | required |       |
| port     | optional |       |
| username | required | Consider using system variables to retrieve this value securely using, for example, `${TRINO_USER}`. |
| password | required | Consider using system variables to retrieve this value securely using, for example, `${TRINO_PASSWORD}`. |
| catalog  | required |       |
| schema   | required |       |

## Supported data types

| Category | Data type                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR                                                                          |
| number   | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time     | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT_LTZ, TIMESTAMP_NTZ, TIMESTAMP_TZ                                    |


<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}