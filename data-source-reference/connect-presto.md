---
description: Access configuration details to connect Soda to a Presto data source.
---

# Connect Soda to Presto

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-presto`

```yaml
data_source my_datasource_name:
  type: presto
  host: 127.0.0.1
  username: simple
  password: simple_pass
  catalog: hive
  schema: public
```

| Property | Required | Notes                                                                                                                                                                                                                          |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type     | required | Identify the type of data source for Soda.                                                                                                                                                                                     |
| host     | required | Provide a host identifier.                                                                                                                                                                                                     |
| username | required | Consider using system variables to retrieve this value securely.                                                                                                                                                               |
| password | required | Consider using system variables to retrieve this value securely.                                                                                                                                                               |
| catalog  | optional | Provide an identifier for the catalog which contains schemas and which references a data source using a connector. See [Catalog](https://prestodb.io/docs/current/overview/concepts.html#catalog) in the Presto documentation. |
| schema   | optional | Provide an identifier for the schema in which your dataset exists.                                                                                                                                                             |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT                                                                                  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL             |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |
