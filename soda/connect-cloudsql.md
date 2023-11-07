---
layout: default
title: Connect Soda to Google CloudSQL
description: Access configuration details to connect Soda to a Google CloudSQL data source.
parent: Data source reference
---

# Connect Soda to Google CloudSQL
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Connection configuration reference

Because Google CloudSQL is compatible with PostgreSQL wire protocol, Soda offers support for Google CloudSQL data sources using the `soda-postgres` package.

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: postgres
  host: db
  port: "5432"
  username: simple
  password: simple_pass
  database: postgres
  schema: public
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required | Identify the type of data source for Soda.                 |
| host     | required | Provide a host identifier.                                 |
| port     | required | Provide a port identifier.                                 |
| username | required | Consider using system variables to retrieve this value securely. |
| password | required | Consider using system variables to retrieve this value securely. |
| database | required | Identify the name of your database.                        |
| schema   | required | Provide an identifier for the schema in which your table exists.|


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