---
description: Access configuration details to connect Soda to a PostgreSQL data source.
---

# PostgreSQL

### Connection configuration reference

Install the package `soda-postgres`:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-postgres
```

#### Data source YAML

```yaml
type: postgres
name: my_postgres
connection:
  user: ${env.USERNAME}
  host: <your-postgresql-host>
  port: 5432
  password: ${env.PASSWORD}
  database: <your_database>
```
