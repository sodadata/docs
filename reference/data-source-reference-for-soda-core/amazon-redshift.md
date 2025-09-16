---
description: Access configuration details to connect Soda to an Amazon Athena data source.
---

# Athena

### Connection configuration reference

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-athena
```

#### Data source YAML

```yaml
type: athena
name: my_athena
connection:
  catalog: ${env.ATHENA_CATALOG}
  access_key_id: ${env.ATHENA_ACCESS_KEY_ID}
  secret_access_key: ${env.ATHENA_SECRET_ACCESS_KEY}
  staging_dir: ${env.ATHENA_STAGING_DIR}
  region_name: ${env.ATHENA_REGION}
  work_group: ${env.ATHENA_WOKRGROUP}
#  role_arn: <my_role_arn>
#  profile_name: <my_aws_profile>
#  session_token: <my_session_token>
```

#### Connection test

Test the data source connection:

```bash
soda data-source test -ds ds.yml
```
