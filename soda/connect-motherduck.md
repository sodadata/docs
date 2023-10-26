---
layout: default
title: Connect Soda to MotherDuck
description: Access reference configuration to connect Soda to a MotherDuck data source.
parent: Data source reference
---

# Connect Soda to MotherDuck
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Connection configuration reference

Install package: `soda-duckdb` <br />
Refer to <a href="https://motherduck.com/docs/getting-started/connect-query-from-python/installation-authentication/" target="_blank"> MotherDuck instructions</a> for further detail.


{% include code-header.html %}
```yaml
data_source quack:
  type: duckdb
  database: "md:sample_data?motherduck_token=eyJhbGciOxxxxx.eyJzZXxxxxx.l4sxxxxx"
  read_only: true
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required |                                                            |
| database | required |                                                            |
| read_only  | required |                                                          |


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