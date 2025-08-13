---
description: Access configuration details to connect Soda to an OracleDB data source.
---

# Connect Soda to OracleDB

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Compatibility

Soda supports Oracle version 21.3 or greater.

## Connection configuration reference

Install package: `soda-oracle`

```yaml
data_source my_datasource_name:
  type: oracle
  username: ${USARBIG_USER}
  password: ${USARBIG_PASSWORD}
  connectstring: "${USARBIG_HOST}:${UARBIG_PORT}/USARBIG_SID}"
```

Alternatively, you can configure a connection without a `connectstring`.

```yaml
data_source my_datasource_name:
  type: oracle
  username: simple
  password: simple_pass
  host: host
  service_name: service
```

| Property        | Required | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type            | required | Identify the type of data source for Soda.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| username        | required | Consider using system variables to retrieve this value securely.                                                                                                                                                                                                                                                                                                                                                                                            |
| password        | required | Consider using system variables to retrieve this value securely.                                                                                                                                                                                                                                                                                                                                                                                            |
| host            | optional | Provide a host identifier. Only used when connectstring is not provided.                                                                                                                                                                                                                                                                                                                                                                                    |
| port            | optional | Provide a port identifier. Default is 1523. Only used when connectstring is not provided.                                                                                                                                                                                                                                                                                                                                                                   |
| service\_name   | optional | Provide a service\_name. Only used when connectstring is not provided.                                                                                                                                                                                                                                                                                                                                                                                      |
| connectstring   | optional | Specify connection information for the Oracle database. Must be a semicolon-separated list of attribute name and value pairings. See [ConnectionString](https://docs.oracle.com/en/database/oracle/oracle-database/21/odpnt/ConnectionConnectionString.html#GUID-DF4ED9A3-1AAF-445D-AEEF-016E6CD5A0C0) in Oracle documentation. If you do not specify one, Soda attempts to construct a `connectstring` using `host`, `port` and `service_name` properties. |
| dataset\_prefix | optional | Added in 1.10.1. A list of strings to be used for prefixing datasets. Useful for catalog integrations. Example: `dataset_prefix: ["my_db", "my_schema"]`                                                                                                                                                                                                                                                                                                    |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT                                                                                  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL             |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |
