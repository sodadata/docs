---
description: Access configuration details to connect Soda to a SQL Server data source.
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
  host: <your-sqlserver-host-name>
  port: 1433
  database: <your_database>
  username: ${env.USERNAME}  # SEE NOTE
  password: ${env.PASSWORD}  # SEE NOTE
  authentication: sql  # activedirectoryserviceprincipal | activedirectoryinteractive | activedirectorypassword 
  # optional
  client_id: <service_principle_client_id> # SEE NOTE
  client_secret: <service_principle_client_secret> # SEE NOTE
  driver: ODBC Driver 18 for SQL Server
  trusted_connection: false
  encrypt: false
  trust_server_certificate: false
```

{% hint style="info" %}
**Note:** depending on the authentication method that is used,  `user` and `password` may not be required (e.g. `activedirectoryserviceprincipal` requires `client_id` and `client_secret`).
{% endhint %}
