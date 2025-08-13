---
description: Access configuration details to connect Soda to a Vertica data source.
---

# Connect Soda to Vertica

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-vertica`

```yaml
data_source my_datasource_name:
  type: vertica
  host: 127.0.0.1
  port: "5433"
  username: ${VERTICA_USER}
  password: ${VERTICA_PASSWORD}
  database: vmart
  schema: public
```

| Property | Required | Notes                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| type     | required | Identify the type of data source for Soda.                                                                 |
| host     | required | Provide a host identifier.                                                                                 |
| port     | required | Provide a port identifier.                                                                                 |
| username | required | Consider using system variables to retrieve this value securely using, for example, `${VERTICA_USER}`.     |
| password | required | Consider using system variables to retrieve this value securely using, for example, `${VERTICA_PASSWORD}`. |
| database | required | Provide an identifier for your database.                                                                   |
| schema   | required | Provide an identifier for the schema in which your dataset exists.                                         |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT                                                                                  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL             |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |
