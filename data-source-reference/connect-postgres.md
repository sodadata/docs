---
description: Access configuration details to connect Soda to a PostgreSQL data source.
---

# Connect Soda to PostgreSQL

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-postgres`

```yaml
data_source my_datasource_name:
  type: postgres
  host: db
  port: "5432"
  username: soda
  password: secret
  database: postgres
  schema: public
  sslmode: prefer
```

| Property | Required | Notes                                                                                                                                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type     | required | Identify the type of data source for Soda.                                                                                                                                                       |
| host     | required | Provide a host identifier.                                                                                                                                                                       |
| port     | required | Provide a port identifier.                                                                                                                                                                       |
| username | required | Consider using system variables to retrieve this value securely.                                                                                                                                 |
| password | required | Consider using system variables to retrieve this value securely.                                                                                                                                 |
| database | required | Provide an identifier for your database.                                                                                                                                                         |
| schema   | optional | Provide an identifier for the schema in which your dataset exists.                                                                                                                               |
| sslmode  | optional | <p>Provide a value to indicate the type of SSL support:<br><code>prefer</code><br><code>require</code><br><code>allow</code><br><code>diable</code><br>Default value is <code>prefer</code>.</p> |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT                                                                                  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL             |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |
