---
description: Access configuration details to connect Soda to an IBM DB2 data source.
---

# Connect Soda to IBM DB2

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Compatibility

Soda supports connections to IBM DB2 for Linux, UNIX, Windows (LUW).\
Soda does not support connections to IBM DB2 for z/OS. Refer to [IBM Developer documentation](https://developer.ibm.com/articles/dm-1108compdb2luwzos/) for more information.

## Connection configuration reference

Install package: `soda-db2`

```yaml
data_source my_datasource_name:
  type: db2
  host: 127.0.0.1
  port: 50000
  username: simple
  password: simple_pass
  database: database
  schema: public
```

| Property | Required | Notes                                                              |
| -------- | -------- | ------------------------------------------------------------------ |
| type     | required | Identify the type of data source for Soda.                         |
| host     | required | Provide a host identifier.                                         |
| port     | required | Provide a port identifier.                                         |
| username | required | Consider using system variables to retrieve this value securely.   |
| password | required | Consider using system variables to retrieve this value securely.   |
| database | required | Provide an identifier for your database.                           |
| schema   | optional | Provide an identifier for the schema in which your dataset exists. |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                   |
| -------- | --------------------------- |
| text     | VARCHAR                     |
| number   | INT, INTEGER, DOUBLE, FLOAT |
| time     | DATE, TIME, TIMESTAMP       |
