---
description: >-
  Access configuration details to connect Soda to a Microsoft Fabric data
  source.
---

# Microsoft Fabric

### Connection configuration reference

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-fabric
```

#### Data source YAML

```yaml
type: fabric
name: my_fabric
connection:
  host: <your-fabric-sql-endpoint>
  user: ${env.USER}          # SEE NOTE
  password: ${env.PASSWORD}  # SEE NOTE
  database: <your_db>
  
  # optional
  port: 1433
  trusted_connection: false
  encrypt: true
  trust_server_certificate: false
  driver: ODBC Driver 18 for SQL Server
  scope: DW
  connection_parameters:
    multi_subnet_failover: true
  authentication: sql
```

{% hint style="info" %}
**Note:** depending on the authentication method that is used,  `user` and `password` may not be required (e.g. `activedirectoryserviceprincipal` requires `client_id` and `client_secret`).
{% endhint %}
