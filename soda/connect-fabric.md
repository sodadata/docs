---
layout: default
title: Connect Soda to Microsoft Fabric
description: Access configuration details to connect Soda to a Microsoft Fabric data source.
parent: Data source reference
---

# Connect Soda to Microsoft Fabric
*Last modified on {% last_modified_at %}* <br />

{% include connect-to-intro.md %}


## Connection configuration reference

Soda support for Fabric data source is based on `soda-sqlserver` package.

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: fabric
  host: host
  port: '1433'
  username: simple
  password: simple_pass
  database: database
  schema: dbo
  trusted_connection: false
  encrypt: false
  trust_server_certificate: false
  driver: ODBC Driver 18 for SQL Server
  scope: DW
  connection_parameters:
    multi_subnet_failover: true
  authentication: sql
```

| Property | Required | Notes |
| -------- | -------- | ----- |
| type | required | Identify the type of data source for Soda. |
| host | required | Provide a host identifier. |
| port | optional | Provide a port identifier. You can remove the `port` config setting entirely. Default: `1433`. |
| username | required | Use system variables to retrieve this value securely. |
| password | required | Use system variables to retrieve this value securely. |
| database | required | Provide an identifier for your database. |
| schema | required | Provide an identifier for the schema in which your dataset exists. |
| trusted_connection | optional | Indicate connection trustworthiness by providing a boolean value: `true` or `false`. The default value is `false`. Set to `true` if you are using Active Directory authentication. |
| encrypt | optional | Indicate the encryption status by providing a boolean value: `true` or `false`. The default value is `false`. |
| trust_server_certificate | optional | Specifies whether encryption occurs if there is no verifiable server certificate. Provide a boolean value: `true` or `false`. The default value is `false`. |
| driver | optional | Use this config setting to specify the ODBC driver version you use. For example, `SQL Server Native Client 11.0` or `ODBC Driver 18 for SQL Server`. |
| scope | optional | Access token scope. |
| `multi_subnet_failover` | optional | Enable MultiSubnetFailover; see [MS documentation](https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/sql/sqlclient-support-for-high-availability-disaster-recovery#connecting-with-multisubnetfailover). |
| authentication | optional | Authentication method to use. Supported values: `sql`, `activedirectoryinteractive`, `activedirectorypassword`, `activedirectoryserviceprincipal`, `activedirectory`, `auto`, `cli`, `environment`, `synapsespark`, and `fabricspark`. The default value is `sql`, which uses `username` and `password` to authenticate. |



{% include test-connection.md %}

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
