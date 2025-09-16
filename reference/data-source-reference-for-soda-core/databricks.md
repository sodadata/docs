---
description: Access configuration details to connect Soda to a Databricks SQL data source.
---

# Databricks

### Connection configuration reference

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-databricks
```

#### Data source YAML

```yaml
type: databricks
name: my_databricks
connection:
  host: ${env.DATABRICKS_HOST}
  http_path: ${env.DATABRICKS_SQL_HTTP_PATH}
  catalog: ${env.DATABRICKS_CATALOG}
  access_token: ${env.DATABRICKS_SQL_ACCESS_TOKEN}
  # optional
  # warehouse: <warehouse>
  # session_configuration: <Optional session configuration dict>
```

#### Connection test

Test the data source connection:

```bash
soda data-source test -ds ds.yml
```
