---
description: Access configuration details to connect Soda to a MySQL data source.
---

# Connect Soda to MySQL

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-mysql`

```yaml
data_source my_datasource_name:
  type: mysql
  host: 127.0.0.1
  username: simple
  password: simple_pass
  database: customers
```

| Property | Required | Notes                                                 |
| -------- | -------- | ----------------------------------------------------- |
| type     | required | Identify the type of data source for Soda.            |
| host     | required | Provide a host identifier.                            |
| username | required | Use system variables to retrieve this value securely. |
| password | required | Use system variables to retrieve this value securely. |
| database | required | Provide an identifier for your database.              |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                              |
| -------- | -------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR, TEXT                                                                    |
| number   | BIG INT, NUMERIC, BIT, SMALLINT, DECIMAL, SMALLMONEY, INT, TINYINT, MONEY, FLOAT, REAL |
| time     | DATE, TIME, DATETIME, DATETIMEOFFSET                                                   |
