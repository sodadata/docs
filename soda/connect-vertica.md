---
layout: default
title: Connect Soda to Vertica (Experimental)
description: Access configuration details to connect Soda to a Vertica data source.
parent: Connect a data source
---

# Connect Soda to Vertica (Experimental)
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Configuration

```yaml
data_source my_datasource_name:
  type: vertica
  connection:
    host: abc
    port: "5433"
    username: ***
    password: ***
    database: vmart
    schema: public
```

| Property | Required | Notes                                              |
| -------- | -------- | -------------------------------------------------- |
| type     | required |                                                    |
| host     | required |                                                    |
| port     | required |                                                    |
| username | required | Consider using system variables to retrieve this value securely using, for example, `${VERTICA_USER}`. |
| password | required | Consider using system variables to retrieve this value securely using, for example, `${VERTICA_PASSWORD}`. |
| database| required |                                                     |
| schema | required |                                                      |

{% include test-connection.md %}

## Supported data types

| Category | Data type  |
| -------- | ---------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL  |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |


<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}