---
layout: default
title: Connect Soda to Trino
description: Access configuration details to connect Soda to a Trino data source.
parent: Data source reference
---

# Connect Soda to Trino
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Connection configuration reference

Install package: `soda-trino`

Reference <a href="https://trino.io/docs/current/overview/concepts.html#" target="_blank">Trino documentation</a> for assistance.
{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: trino
  host: 127.0.0.1
  port: "5432"
  username: simple
  password: simple_pass
  catalog: hive
  schema: public
  source: 
  http_headers: 
  client_tags: ["test","test2"]
```

| Property | Required | Notes |
| -------- | -------- | ----- |
| type     | required | Identify the type of data source for Soda. |
| host     | required | Provide a host identifier.                 |
| port     | optional | Provide a port identifier.                 |
| username | required | Consider using system variables to retrieve this value securely using, for example, `${TRINO_USER}`. |
| password | required | Consider using system variables to retrieve this value securely using, for example, `${TRINO_PASSWORD}`. |
| catalog  | required | Provide an identifier for the catalog which contains schemas and which references a data source using a connector. See <a href="https://trino.io/docs/current/overview/concepts.html#catalog" target="_blank">Catalog</a> in the Trino documentation. |
| schema   | required | Provide an identifier for the schema in which your dataset exists. |
| source   | optional |  |
| http_headers | optional | Provide any HTTP headers as needed. See <a href="https://trino.io/docs/current/develop/client-protocol.html#client-request-headers" target="_blank">Trino documentation</a> for details.  |
| client_tags | optional |  Provide a list of tag strings to identify Trino resource groups. See <a href="https://trino.io/docs/current/develop/client-protocol.html#client-request-headers" target="_blank">Trino documentation</a> for details.  |


{% include test-connection.md %}


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
