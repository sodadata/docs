---
description: >-
  Access configuration details to connect Soda to an Azure Synapse Analytics
  data source.
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
  database: ${env.SYNAPSE_DB}
  username: ${env.SYNAPSE_USER}  # SEE NOTE
  password: ${env.SYNAPSE_PW}  # SEE NOTE
  authentication: sql  # activedirectoryserviceprincipal | activedirectoryinteractive | activedirectorypassword 
  # optional
  client_id: ${env.SYNAPSE_SERVICE_CLIENT_ID} # SEE NOTE
  client_secret: ${env.SYNAPSE_SERVICE_CLIENT_SECRET} # SEE NOTE
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
