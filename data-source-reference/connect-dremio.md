---
description: Access configuration details to connect Soda to a Dremio data source.
---

# Connect Soda to Dremio

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Compatibility

Soda supports Dremio version 22 or greater.

## Connection configuration reference

Install package: `soda-dremio`

```yaml
data_source my_datasource_name:
  type: dremio
  host: 127.0.0.1
  port: 5432
  username: simple
  password: simple_pass
  schema: public
  use_encryption: "false"
  routing_queue: queue
  disable_certificate_verification: "false"

```

| Property                           | Required | Notes                                                                                                                                                                                                                                            |
| ---------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type                               | required | Identify the type of data source for Soda.                                                                                                                                                                                                       |
| host                               | required | Provide a host identifier.                                                                                                                                                                                                                       |
| port                               | required | Provide a port identifier.                                                                                                                                                                                                                       |
| username                           | required | Consider using system variables to retrieve this value securely.                                                                                                                                                                                 |
| password                           | required | Consider using system variables to retrieve this value securely.                                                                                                                                                                                 |
| schema                             | optional | Provide an identifier for the schema in which your dataset exists.                                                                                                                                                                               |
| use\_encryption                    | optional | Specify a boolean value to use, or not use, encryption. Default is `false`. Value requires double quotes.                                                                                                                                        |
| routing\_queue                     | optional | Provide an identifier for the routing queue to use.                                                                                                                                                                                              |
| disable\_certificate\_verification | optional | Specify a boolean value to demand that Dremio verify the host certificate against the truststore. If set to `true`, Dremio does _not_ verify the host certificate. Default value is `false` to verify certificate. Value requires double quotes. |

## Test the data source connection <a href="#test-the-data-source-connection" id="test-the-data-source-connection"></a>

To confirm that you have correctly configured the connection details for the data source(s) in your configuration YAML file, use the `test-connection` command. If you wish, add a `-V` option to the command to returns results in verbose mode in the CLI.

```sh
soda test-connection -d my_datasource -c configuration.yml -V
```

## Supported data types

| Category | Data type                                                       |
| -------- | --------------------------------------------------------------- |
| text     | CHAR, VARCHAR, STRING                                           |
| number   | TINYINT, SMALLINT, INT, INTEGER, BIGINT, DOUBLE, FLOAT, DECIMAL |
| time     | DATE, TIMESTAMP                                                 |
