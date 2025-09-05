---
description: Access configuration details to connect Soda to a Synapse data source.
---

# Synapse

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-synapse
```

#### Data source YAML

```yaml
type: synapse
name: my_synapse
connection:
  host: <your-server>
  port: 1433
  database: <your_database>
  username: ${env.USERNAME}  # SEE NOTE
  password: ${env.PASSWORD}  # SEE NOTE

  # optional
  trusted_connection: false
  encrypt: true
  trust_server_certificate: false
  driver: ODBC Driver 18 for SQL Server
  scope: DW
  connection_parameters:
    multi_subnet_failover: true
  authentication: sql  # sql | activedirectoryinteractive | activedirectorypassword | 
                       # activedirectoryserviceprincipal | activedirectory | auto | 
                       # cli | environment | synapsespark | fabricspark
```

{% hint style="info" %}
**Note:** depending on the authentication method that is used,  `user` and `password` may not be required (e.g. `activedirectoryserviceprincipal` requires `client_id` and `client_secret`).
{% endhint %}
