---
layout: default
title: Connect Soda to DuckDB (Experimental)
description: Access configuration details to connect Soda to a DuckDB data source.
parent: Connect a data source
---

# Connect Soda to DuckDB (Experimental)
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Configuration

Install package: `soda-duckdb`

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: duckdb
  path: filename.db
  read_only: true
  schema_name: public
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required |                                                            |
| path     | required | The location of the duckdb file. Refer to DuckDB documentation for details on <a href="https://duckdb.org/docs/api/python/overview#persistent-storage" target="_blank">persistent storage</a> and <a href="https://duckdb.org/docs/api/cli.html#getting-started" target="_blank">how to create a .db file</a>.                                                       |
| read_only | required | Value is boolean: `true` or `false`                       |
| schema_name | optional |                                                         |

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