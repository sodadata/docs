---
layout: default
title: Connect Soda to MS SQL Server
description: Access configuration details to connect Soda to an MS SQL Server data source.
parent: Connect a data source
---

# Connect Soda to MS SQL Server

{% include connect-to-intro.md %}

```yaml
data_source my_datasource_name:
  type: sqlserver
  host: host
  port: '1433'
  username: xxx
  password: ...
  database: 
  schema: dbo
  trusted_connection: false
  encrypt: false 
  trust_server_certificate: false
  driver: 
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required |                                                            |
| host     | required |                                                            |
| port     | optional | You can remove the `port` config setting entirely; defaults to `1433`.|
| username | required | Use system variables to retrieve this value securely.      |
| password | required | Use system variables to retrieve this value securely.      |
| database | required |                                                            |
| schema   | required |                                                            |
| trusted_connection | optional |  The default value is `false`. Set to `true` if using Active Directory authentication. |  
| encrypt | optional |   The default value is `false`.                             |
| trust_server_certificate | optional |   The default value is `false`.  |
| driver  | optional | Use this config setting to specify the ODBC driver version you use, such as `SQL Server Native Client 11.0` |

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