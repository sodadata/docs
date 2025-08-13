---
description: Access configuration details to connect Soda to a Denodo data source.
---

# Connect Soda to Denodo

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-denodo`

```yaml
data_source my_datasource_name:
  type: denodo
  username: simple
  password: simple_pass
  host: 127.0.0.1
  port: 5432 
  sslmode: prefer
```

| Property            | Required | Notes                                                                                                                                                                                            |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type                | required | Identify the type of data source for Soda.                                                                                                                                                       |
| username            | required | Consider using system variables to retrieve this value securely.                                                                                                                                 |
| password            | required | Consider using system variables to retrieve this value securely.                                                                                                                                 |
| host                | required | Provide a host identifier.                                                                                                                                                                       |
| port                | optional | Provide a port identifier.                                                                                                                                                                       |
| database            | optional | Provide a virtual database (VDB) name.                                                                                                                                                           |
| connection\_timeout | optional | Provide an integer value to represent seconds.                                                                                                                                                   |
| sslmode             | optional | <p>Provide a value to indicate the type of SSL support:<br><code>prefer</code><br><code>require</code><br><code>allow</code><br><code>diable</code><br>Default value is <code>prefer</code>.</p> |

## Supported data types

| Category | Data type                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT                                                                                  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL             |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |
