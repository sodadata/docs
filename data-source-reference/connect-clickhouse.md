---
description: Access configuration details to connect Soda to a ClickHouse data source.
---

# Connect Soda to ClickHouse

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Because ClickHouse is compatible with MySQL wire protocol, Soda offers indirect support for ClickHouse data sources using the `soda-mysql` package.

```yaml
data_source my_datasource_name:
  type: mysql
  host: 127.0.0.1
  port: `9004`
  username: simple
  password: simple_pass
  database: customers
```

| Property | Required | Notes                                                 |
| -------- | -------- | ----------------------------------------------------- |
| type     | required | Identify the type of data source for Soda.            |
| host     | required | Provide a host identifier.                            |
| port     | required | Provide a port identifier.                            |
| username | required | Use system variables to retrieve this value securely. |
| password | required | Use system variables to retrieve this value securely. |
| database | required | Provide an identifier for your database.              |

## Test the data source connection <a href="#test-the-data-source-connection" id="test-the-data-source-connection"></a>

To confirm that you have correctly configured the connection details for the data source(s) in your configuration YAML file, use the `test-connection` command. If you wish, add a `-V` option to the command to returns results in verbose mode in the CLI.

```python
soda test-connection -d my_datasource -c configuration.yml -V
```

## Supported data types

| Category | Data type                                                                              |
| -------- | -------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR, TEXT                                                                    |
| number   | BIG INT, NUMERIC, BIT, SMALLINT, DECIMAL, SMALLMONEY, INT, TINYINT, MONEY, FLOAT, REAL |
| time     | DATE, TIME, DATETIME, DATETIMEOFFSET                                                   |
