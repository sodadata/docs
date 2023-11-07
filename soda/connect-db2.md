---
layout: default
title: Connect Soda to IBM DB2
description: Access configuration details to connect Soda to an IBM DB2 data source.
parent: Data source reference
---

# Connect Soda to IBM DB2
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Connection configuration reference

Install package: `soda-db2`

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: db2
  host: 127.0.0.1
  port: 50000
  username: simple
  password: simple_pass
  database: database
  schema: public
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type      | required  | Identify the type of data source for Soda.               |
| host      | required  | Provide a host identifier.                               |
| port      | required  | Provide a port identifier.                               |
| username  | required | Consider using system variables to retrieve this value securely.      |
| password  | required | Consider using system variables to retrieve this value securely.      |
| database  | required | Provide an identifier for your database.                  |
| schema    | optional | Provide an identifier for the schema in which your dataset exists.|


{% include test-connection.md %}


## Supported data types

| Category | Data type  |
| -------- | ---------- |
| text     | VARCHAR  |
| number   | INT, INTEGER, DOUBLE, FLOAT  |
| time     | DATE, TIME, TIMESTAMP |

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}