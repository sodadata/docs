---
description: >-
  Access configuration details to connect Soda to a Microsoft SQL Server data
  source.
---

# SQL Server

### Connection configuration reference

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-sqlserver
```

#### Data source YAML

```yaml
type: sqlserver
name: my_sqlserver
connection:
  host: ${env.SQLSERVER_HOST}
  port: 1433
  database: ${env.SQLSERVER_DB}
  username: ${env.SQLSERVER_USER}  # SEE NOTE
  password: ${env.SQLSERVER_PW}  # SEE NOTE
  authentication: sql  # activedirectoryserviceprincipal | activedirectoryinteractive | activedirectorypassword 
  # optional
  client_id: ${env.SQLSERVER_SERVICE_CLIENT_ID} # SEE NOTE
  client_secret: ${env.SQLSERVER_SERVICE_CLIENT_SECRET} # SEE NOTE
  driver: ODBC Driver 18 for SQL Server
  trusted_connection: false
  encrypt: false
  trust_server_certificate: false
```

{% hint style="info" %}
**Note:** depending on the authentication method that is used,  `user` and `password` may not be required (e.g. `activedirectoryserviceprincipal` requires `client_id` and `client_secret`).
{% endhint %}

#### Connection test

Test the data source connection:

```bash
soda data-source test -ds ds.yml
```
