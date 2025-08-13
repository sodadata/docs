---
description: Access configuration details to connect Soda to an MS SQL Server data source.
---

# Connect Soda to MS SQL Server

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-sqlserver`

```yaml
data_source my_datasource_name:
  type: sqlserver
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
```

| Property                   | Required | Notes                                                                                                                                                                                                                                                  |
| -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type                       | required | Identify the type of data source for Soda.                                                                                                                                                                                                             |
| host                       | required | Provide a host identifier.                                                                                                                                                                                                                             |
| port                       | optional | Provide a port identifier. You can remove the `port` config setting entirely. Default: `1433`.                                                                                                                                                         |
| username                   | required | Use system variables to retrieve this value securely.                                                                                                                                                                                                  |
| password                   | required | Use system variables to retrieve this value securely.                                                                                                                                                                                                  |
| database                   | required | Provide an identifier for your database.                                                                                                                                                                                                               |
| schema                     | required | Provide an identifier for the schema in which your dataset exists.                                                                                                                                                                                     |
| trusted\_connection        | optional | Indicate connection trustworthiness by providing a boolean value: `true` or `false`. The default value is `false`. Set to `true` if you are using Active Directory authentication.                                                                     |
| encrypt                    | optional | Indicate the encryption status by providing a boolean value: `true` or `false`. The default value is `false`.                                                                                                                                          |
| trust\_server\_certificate | optional | Specifies whether encryption occurs if there is no verifiable server certificate. Providing a boolean value: `true` or `false`. The default value is `false`.                                                                                          |
| driver                     | optional | Use this config setting to specify the ODBC driver version you use. For example, `SQL Server Native Client 11.0` or `ODBC Driver 18 for SQL Server`.                                                                                                   |
| scope                      | optional | Access token scope.                                                                                                                                                                                                                                    |
| `multi_subnet_failover`    | optional | Enable MultiSubnetFailover; see [MS documentation](https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/sql/sqlclient-support-for-high-availability-disaster-recovery#connecting-with-multisubnetfailover).                                  |
| authentication             | optional | Authentication method to use. Supported values: `sql`, `activedirectoryinteractive`, `activedirectorypassword`, `activedirectoryserviceprincipal`, `activedirectory`. The default value is `sql` which uses `username` and `password` to authenticate. |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                              |
| -------- | -------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR, TEXT, NCHAR, NVARCHAR, BINARY                                           |
| number   | BIG INT, NUMERIC, BIT, SMALLINT, DECIMAL, SMALLMONEY, INT, TINYINT, MONEY, FLOAT, REAL |
| time     | DATE, TIME, DATETIME, DATETIMEOFFSET                                                   |
