---
layout: default
title: Connect Soda to ClickHouse
description: Access configuration details to connect Soda to a ClickHouse data source.
parent: Data source reference
---

# Connect Soda to ClickHouse
*Last modified on {% last_modified_at %}* <br />
*Experimental in Soda Core OSS*

{% include connect-to-intro.md %}


## Connection configuration reference

Because ClickHouse is compatible with MySQL wire protocol, Soda offers indirect, experimental support for ClickHouse data sources using the `soda-mysql` package. 

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: mysql
  host: 
  port: `9004`
  username: xxx
  password: ...
  database:
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required |                                                            |
| host     | required |                                                            |
| port     | required |                                                            |
| username | required | Use system variables to retrieve this value securely.      |
| password | required | Use system variables to retrieve this value securely.      |
| database | required |                                                            |


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