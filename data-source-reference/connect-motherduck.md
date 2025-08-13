---
description: Access reference configuration to connect Soda to a MotherDuck data source.
---

# Connect Soda to MotherDuck

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-duckdb`\
Refer to [MotherDuck instructions](https://motherduck.com/docs/getting-started/connect-query-from-python/installation-authentication/) for further detail.

```yaml
data_source quack:
  type: duckdb
  database: "md:sample_data?motherduck_token=eyJhbGciOxxxxx.eyJzZXxxxxx.l4sxxxxx"
  read_only: true
```

| Property   | Required | Notes                                                                                                                                                                             |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | required | Identify the type of data source for Soda.                                                                                                                                        |
| database   | required | <p>Provide an identifier for your database.<br>Some users have reported issues using the <code>database</code> key, but have been successful using <code>path</code> instead.</p> |
| read\_only | required | Indicate users' access by providing a boolean value: `true` or `false`                                                                                                            |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT                                                                                  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL             |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |
