---
description: Access configuration details to connect Soda to a Databricks data source.
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
  host: <server-hostname>
  http_path: <http-path>
  catalog: <unity-catalog>

  # optional
    warehouse:
    session_configuration:
    field_mapping: 
```
