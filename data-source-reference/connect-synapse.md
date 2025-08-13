---
description: >-
  Access configuration details to connect Soda to a Microsoft Azure Synapse data
  source.
---

# Connect Soda to Azure Synapse

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Because Synapse is compatible with MS SQL server wire protocol, Soda offers indirect support for Synapse data sources using the `soda-sqlserver` package.\
Soda also supports Azure Data Factory (ADF) with Airflow using this configuration.

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

| Property | Required | Notes                                                                                                         |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| type     | required | Identify the type of data source for Soda.                                                                    |
| driver   | required | Use this config setting to specify the ODBC driver version you use, such as `SQL Server Native Client 11.0`   |
| host     | required | Provide a host identifier.                                                                                    |
| port     | optional | Provide a port identifier. You can remove the `port` config setting entirely. Default: `1433`.                |
| database | required | Provide an identifier for your database.                                                                      |
| username | required | Use system variables to retrieve this value securely.                                                         |
| password | required | Use system variables to retrieve this value securely.                                                         |
| encrypt  | optional | Indicate the encryption status by providing a boolean value: `true` or `false`. The default value is `false`. |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                              |
| -------- | -------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR, TEXT                                                                    |
| number   | BIG INT, NUMERIC, BIT, SMALLINT, DECIMAL, SMALLMONEY, INT, TINYINT, MONEY, FLOAT, REAL |
| time     | DATE, TIME, DATETIME, DATETIMEOFFSET                                                   |
