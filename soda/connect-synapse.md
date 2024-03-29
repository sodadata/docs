---
layout: default
title: Connect Soda to Synapse
description: Access configuration details to connect Soda to a Microsoft Azure Synapse data source.
parent: Data source reference
---

# Connect Soda to Azure Synapse
*Last modified on {% last_modified_at %}* <br />

{% include connect-to-intro.md %}


## Connection configuration reference

Because Synapse is compatible with MS SQL server wire protocol, Soda offers indirect support for Synapse data sources using the `soda-sqlserver` package. <br /> 
Soda also supports Azure Data Factory (ADF) with Airflow using this configuration. 

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: sqlserver
  driver: SQL Server Native Client 11.0
  host: my_server.sql.azuresynapse.net
  port: '1433'
  database: my_database
  username: simple
  password: simple_pass
  encrypt: true
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required | Identify the type of data source for Soda.                 |
| driver   | required | Use this config setting to specify the ODBC driver version you use, such as `SQL Server Native Client 11.0` |
| host     | required | Provide a host identifier.                                 |
| port     | optional | Provide a port identifier. You can remove the `port` config setting entirely. Default: `1433`.|
| database | required | Provide an identifier for your database.                   |
| username | required | Use system variables to retrieve this value securely.      |
| password | required | Use system variables to retrieve this value securely.      |
| encrypt  | optional | Indicate the encryption status by providing a boolean value: `true` or `false`. The default value is `false`. |


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