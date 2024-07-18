---
layout: default
title: Connect Soda to MySQL
description: Access configuration details to connect Soda to a MySQL data source.
parent: Data source reference
---

# Connect Soda to MySQL
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Connection configuration reference

Install package: `soda-mysql`

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: mysql
  host: 127.0.0.1
  username: simple
  password: simple_pass
  database: customers
```

| Property              | Required | Notes                                                      |
| --------------------- | -------- | ---------------------------------------------------------- |
| type                  | required | Identify the type of data source for Soda.                 |
| host                  | required | Provide a host identifier.                                 |
| username              | required | Use system variables to retrieve this value securely.      |
| password              | required | Use system variables to retrieve this value securely.      |
| database              | required | Provide an identifier for your database.                   |


{% include test-connection.md %}

## Supported data types

| Category | Data type  |
| -------- | ---------- |
| text     | CHAR, VARCHAR, TEXT  |
| number   | BIG INT, NUMERIC, BIT, SMALLINT, DECIMAL, SMALLMONEY, INT, TINYINT, MONEY, FLOAT, REAL  |
| time     | DATE, TIME, DATETIME, DATETIMEOFFSET |



<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}