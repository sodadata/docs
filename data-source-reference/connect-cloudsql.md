---
description: Access configuration details to connect Soda to a Google CloudSQL data source.
---

# Connect Soda to Google CloudSQL

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Because Google CloudSQL is compatible with PostgreSQL wire protocol, Soda offers support for Google CloudSQL data sources using the `soda-postgres` package.

```yaml
data_source my_datasource_name:
  type: postgres
  host: db
  port: "5432"
  username: simple
  password: simple_pass
  database: postgres
  schema: public
```

| Property | Required | Notes                                                            |
| -------- | -------- | ---------------------------------------------------------------- |
| type     | required | Identify the type of data source for Soda.                       |
| host     | required | Provide a host identifier.                                       |
| port     | required | Provide a port identifier.                                       |
| username | required | Consider using system variables to retrieve this value securely. |
| password | required | Consider using system variables to retrieve this value securely. |
| database | required | Identify the name of your database.                              |
| schema   | required | Provide an identifier for the schema in which your table exists. |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT                                                                                  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL             |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |
