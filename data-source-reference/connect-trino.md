---
description: Access configuration details to connect Soda to a Trino data source.
---

# Connect Soda to Trino

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-trino`

Reference [Trino documentation](https://trino.io/docs/current/overview/concepts.html) for assistance.

```yaml
data_source my_datasource_name:
  type: trino
  host: 127.0.0.1
  port: "5432"
  username: simple
  password: simple_pass
  catalog: hive
  schema: public
  source: 
  http_headers: 
  client_tags: ["test","test2"]
```

| Property      | Required | Notes                                                                                                                                                                                                                      |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | required | Identify the type of data source for Soda.                                                                                                                                                                                 |
| host          | required | Provide a host identifier.                                                                                                                                                                                                 |
| port          | optional | Provide a port identifier.                                                                                                                                                                                                 |
| auth\_type    | optional | `BasicAuthentication` in combination of user + password or `JWTAuthentication` in combination with `access_token` and optionally username. Default: `BasicAuthentication`.                                                 |
| access\_token | optional | Map to the JWT access token. Only applicable if auth\_type = `JWTAuthentication`.                                                                                                                                          |
| username      | required | Optional if auth\_type = `JWTAuthentication`. Consider using system variables to retrieve this value securely using, for example, `${TRINO_USER}`.                                                                         |
| password      | optional | Consider using system variables to retrieve this value securely using, for example, `${TRINO_PASSWORD}`. Only applicable for auth\_type = `BasicAuthentication`.                                                           |
| catalog       | required | Provide an identifier for the catalog which contains schemas and which references a data source using a connector. See [Catalog](https://trino.io/docs/current/overview/concepts.html#catalog) in the Trino documentation. |
| schema        | required | Provide an identifier for the schema in which your dataset exists.                                                                                                                                                         |
| source        | optional |                                                                                                                                                                                                                            |
| http\_headers | optional | Provide any HTTP headers as needed. See [Trino documentation](https://trino.io/docs/current/develop/client-protocol.html#client-request-headers) for details.                                                              |
| client\_tags  | optional | Provide a list of tag strings to identify Trino resource groups. See [Trino documentation](https://trino.io/docs/current/develop/client-protocol.html#client-request-headers) for details.                                 |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR                                                                                                   |
| number   | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time     | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT\_LTZ, TIMESTAMP\_NTZ, TIMESTAMP\_TZ                                 |
