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
  user: ${env.POSTGRES_USER}
  host: ${env.POSTGRES_HOST}
  port: 5432
  password: ${env.POSTGRES_PW}
  database: ${env.POSTGRES_DB}
```

#### Connection test

Test the data source connection:

```bash
soda data-source test -ds ds.yml
```
