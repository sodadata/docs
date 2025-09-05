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
  host: <your-sqlserver-hostname>
  port: 1433
  database: <your_database>
  user: ${env.USER}          # SEE NOTE
  password: ${env.PASSWORD}  # SEE NOTE

  # optional
  trusted_connection: false
  encrypt: false
  trust_server_certificate: false
  driver: ODBC Driver 18 for SQL Server
  scope: DW
  connection_parameters:
    multi_subnet_failover: true
  authentication: sql     # sql | activedirectoryinteractive | activedirectorypassword |
                          # activedirectoryserviceprincipal | activedirectory | auto |
                          # cli | environment | synapsespark | fabricspark |
```

{% hint style="info" %}
**Note:** depending on the authentication method that is used,  `user` and `password` may not be required (e.g. `activedirectoryserviceprincipal` requires `client_id` and `client_secret`).
{% endhint %}
