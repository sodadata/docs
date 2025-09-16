---
description: >-
  Access configuration details to connect Soda to an Amazon Redshift data
  source.
---

# Redshift

### Connection configuration reference

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-redshift
```

#### Data source YAML

```yaml
type: redshift
name: my_redshift
connection:
  host: ${env.REDSHIFT_HOST}
  port: 5439
  database: ${env.REDSHIFT_DB}
  user: ${env.REDSHIFT_USER}
  
  # optional
  password: ${env.REDSHIFT_PW}
  access_key_id: ${env.REDSHIFT_AWS_ACCESS_KEY_ID}
  secret_access_key: ${env.REDSHIFT_AWS_SECRET_ACCESS_KEY}
  session_token: ${env.REDSHIFT_AWS_SESSION_TOKEN}
  role_arn: ${env.REDSHIFT_ROLE_ARN} # e.g., arn:aws:iam::123456789012:role/MyRole
  region: ${env.REDSHIFT_REGION} # e.g., us-east-1
  profile_name: ${env.REDSHIFT_AWS_PROFILE}
  cluster_identifier: ${env.REDSHIFT_CLUSTER_ID}
```

#### Connection test

Test the data source connection:

```bash
soda data-source test -ds ds.yml
```
