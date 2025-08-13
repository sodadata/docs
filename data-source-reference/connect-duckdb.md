---
description: Access configuration details to connect Soda to a DuckDB data source.
---

# Connect Soda to DuckDB

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-duckdb`

```yaml
data_source my_datasource_name:
  type: duckdb
  database: filename.db
  read_only: true
  schema_name: public
```

| Property     | Required | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type         | required | Identify the type of data source for Soda.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| database     | required | <p>Identify the location of the <a href="https://duckdb.org/docs/connect">duckdb database</a>. Refer to DuckDB documentation for details on <a href="https://duckdb.org/docs/api/python/overview#persistent-storage">persistent storage</a> and <a href="https://duckdb.org/docs/api/cli.html#getting-started">how to create a .db file</a>. This can also be a <a href="connect-motherduck.md">MotherDuck database</a>.<br>Some users have reported issues using the <code>database</code> key, but have been successful using <code>path</code> instead.</p> |
| read\_only   | required | Indicate users’ access by providing a boolean value: `true` or `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| schema\_name | optional | Provide an identifier for the schema in which your dataset exists.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## Test the data source connection <a href="#test-the-data-source-connection" id="test-the-data-source-connection"></a>

To confirm that you have correctly configured the connection details for the data source(s) in your configuration YAML file, use the `test-connection` command. If you wish, add a `-V` option to the command to returns results in verbose mode in the CLI.

```powershell
soda test-connection -d my_datasource -c configuration.yml -V
```

## Supported data types

| Category | Data type                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT                                                                                  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL             |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |
