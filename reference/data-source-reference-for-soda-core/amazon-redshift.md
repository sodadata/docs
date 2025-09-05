---
description: Access configuration details to connect Soda to a Redshift data source.
---

# Amazon Redshift

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
  host: <your-redshift-hostname>
  port: 5439
  database: <your_database>
  user: ${env.USER}
  
  # optional
  password: ${env.PASSWORD}
  access_key_id: ${AWS_ACCESS_KEY_ID}
  secret_access_key: ${AWS_SECRET_ACCESS_KEY}
  session_token: ${AWS_SESSION_TOKEN}
  role_arn: <arn:aws:iam::123456789012:role/MyRole>
  region: us-east-1
  profile_name: <my_aws_profile>
  cluster_identifier: <my-redshift-cluster>
```
