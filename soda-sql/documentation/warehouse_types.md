---
layout: default
title: Set warehouse configurations
parent: Documentation
nav_order: 4
---

# Set warehouse configurations

Soda SQL needs connection details in order to access your [warehouse]({% link soda-sql/documentation/glossary.md %}#warehouse) to scan your data. Each type of warehouse uses different configuration parameters. To set the warehouse configurations in your [warehouse YAML]({% link soda-sql/documentation/warehouse.md %}), use the following example configurations that correspond to each database type that Soda SQL supports.

**[Amazon Athena](#amazon-athena) <br />
[Amazon Redshift](#amazon-redshift) <br />
[Apache Hive](#apache-hive) <br />
[Google Cloud Platform BigQuery](#gcp-bigquery) <br />
[Microsoft SQL Server (Experimental)](#microsoft-sql-server-experimental) <br />
[PostgreSQL](#postgresql) <br />
[Snowflake](#snowflake) <br />
[Troubleshoot warehouse connections]({% link soda-sql/documentation/troubleshoot.md %}#warehouse-connections)**


## Amazon Athena

```yaml
name: my_athena_project
connection:
    type: athena
    catalog: AwsDataCatalog
    database: sodalite_test
    access_key_id: env_var(AWS_ACCESS_KEY_ID)
    secret_access_key: env_var(AWS_SECRET_ACCESS_KEY)
    role_arn: 
    region: eu-west-1
    staging_dir: <YOUR STAGING PATH IN AWS S3>
...
```

| Property  | Required | Notes |
| --------  | -------- |-------- |
| type | required |  |
| catalog |optional | Default is `AwsDataCatalog`. |
| database | required |  |
| staging_dir |  required |  |
| access_key_id |  optional | Use environment variables to retrieve this value securely. |
| secret_access_key | optional | Use environment variables to retrieve this value securely. |
| role_arn |optional | The [Amazon Resource Name](https://docs.aws.amazon.com/credref/latest/refdocs/setting-global-role_arn.html) of an IAM role that you want to use. | 
| region |  optional |  |

Access keys and IAM role are mutually exclusive: if you provide values for `access_key_id` and `secret_access_key`, you cannot use Identity and Access Management role; if you provide value for `role_arn`, then you cannot use the access keys. Refer to [Identity and Access Management in Athena](https://docs.aws.amazon.com/athena/latest/ug/security-iam-athena.html) for details.

Refer to [Troubleshoot warehouse connections]({% link soda-sql/documentation/troubleshoot.md %}#warehouse-connections) for help with Athena connection issues.

## Amazon Redshift

```yaml
name: my_redshift_project
connection:
    type: redshift
    host: <YOUR AMAZON REDSHIFT HOSTNAME>
    username: soda
    password: <YOUR AMAZON REDSHIFT PASSWORD>
    database: soda_agent_test
    schema: public
    access_key_id: env_var(AWS_ACCESS_KEY_ID)
    secret_access_key: env_var(AWS_SECRET_ACCESS_KEY)
    role_arn: 
    region: eu-west-1
...
```

| Property |  Required | Notes |
| -------- |  -------- | ----- |
| type    | required |  |
| host |  required |   |
| username  |  required |  |
| password  |  required |  |
| database  | required |  |
| schema    |  |  |
| access_key_id  | optional | Use environment variables to retrieve this value securely. |
| secret_access_key  | optional | Use environment variables to retrieve this value securely. |
| role_arn| optional | The [Amazon Resource Name](https://docs.aws.amazon.com/credref/latest/refdocs/setting-global-role_arn.html) of an IAM role that you want to use. |
| region | optional |  |

Access keys and IAM role are mutually exclusive: if you provide values for `access_key_id` and `secret_access_key`, you cannot use Identity and Access Management role; if you provide value for `role_arn`, then you cannot use the access keys. Refer to [Amazon Redshift Authorization parameters](https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-authorization.html) for details.

## Apache Hive

```yaml
name: my_hive_project
connection:
    type: hive
    host: localhost
    port: 10000
    username: env_var(HIVE_USERNAME)
    password: env_var(HIVE_PASSWORD)
    database: default
    configuration:
      hive.execution.engine: mr
      mapreduce.job.reduces: 2
...
```

| Property |  Required | Notes |
| -------- |  -------- | ----- |
| type  | required  |  |
| host  | required  |  |
| port  | required  |  |
| username  | required  | Use environment variables to retrieve this value securely. |
| password  | required  | Use environment variables to retrieve this value securely. |
| database | required | |
| hive.execution.engine | required | Input options are: <br /> `mr` (Map reduce, default) <br /> `tez` (Tez execution for Hadoop 2) <br /> `spark` (Spark execution for Hive 1.1.0 or later)|
| mapreduce.job.reduces | required | Sets the number of reduce tasks per job. Input `-1` for Hive to automatically determine the number of reducers. |


## GCP BigQuery


Use the values Google Cloud Platform provides when you [create a service account](https://cloud.google.com/iam/docs/creating-managing-service-account-keys). Use your BigQuery service account JSON key file. 

```yaml
name: my_bigquery_project
connection:
    type: bigquery
    account_info_json: >
      {
        "type": "service_account",
        "project_id": "...",
        "private_key_id": "...",
        "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
        "client_email": "...@project.iam.gserviceaccount.com",
        "client_id": "...",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
      }
    dataset: sodasql
...
```

| Property |  Required | 
| -------- |  -------- | 
| type | required | 
| project_id | required | 
| private_key_id | required |
| private_key | required |
| client_email | required |
| client_id | required |
| auth_uri | required |
| token_uri | required |
| auth_provider_x509_cert_url | required |
| client_x509_cert_url | required | 



## Microsoft SQL Server (Experimental)

Note: MS SQL Server support is experimental.


```yaml
name: my_sqlserver_project
connection:
  type: sqlserver
  host: <YOUR SQLServer HOSTNAME>
  username: env_var(SQL_SERVER_USERNAME)
  password: env_var(SQL_SERVER_PASSWORD)
  database: master
  schema: dbo
```

| Property |  Required | Notes |
| -------- |  -------- | ----- |
| type | required |  |
| host| required |  |
| username| required | Use environment variables to retrieve this value securely. |
| password| required | Use environment variables to retrieve this value securely. |
| database| required |  |
| schema | required | |


## PostgreSQL

```yaml
name: my_postgres_project
connection:
    type: postgres
    host: localhost
    username: sodasql
    password: sodasql
    database: sodasql
    schema: public
...
```

| Property |  Required | Notes |
| -------- |  -------- | ----- |
| type | required |  |
| host| required |  |
| username| required | Use environment variables to retrieve this value securely. |
| password| required | Use environment variables to retrieve this value securely. |
| database|  |  |
| schema |  | |

## Snowflake

```yaml
name: my_snowflake_project
connection:
    type: snowflake
    username: env_var(SNOWFLAKE_USERNAME)
    password: 
    database: 
    schema: PUBLIC
    role: PUBLIC
    passcode_in_password:
    private_key_passphrase: 
    private_key: 
    private_key_path: '/path/to/private_key/key.p8'
    authenticator: snowflake
```

| Property | Required | Notes |
| --------  | -------- | -----|
| type  | required |  The name of your Snowflake virtual warehouse. |
| username | required | Use environment variables to retrieve this value securely. |
| password | optional | Use environment variables to retrieve this value securely using `env_var(SNOWFLAKE_PASSWORD)`. Alternatively, authenticate using `private_key`, `private_key_passphrase`, or `private-key-path`. |
| database | optional |  |
| schema | required |  |
| role | optional | See <a href="https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles" target="_blank">Snowflake System-Defined Roles</a> for details.|
| passcode_in_password | optional | Default value is `false`. See <a href="https://docs.snowflake.com/en/user-guide/snowsql-start.html#mfa-passcode-in-password" target="_blank"> Snowflake documentation</a>.|
| private_key_passphrase | optional | Specify the value for the key-value pair. |
| private_key | optional | See [Private key authentication](#private-key-authentication) section below.|
| private_key_path | optional | Example: `private_key_path: '/path/to/private_key/key.p8'` |
| authenticator | optional | Default value is `snowflake`. See <a href="https://docs.snowflake.com/en/user-guide/snowsql-start.html#authenticator" target="_blank"> Snowflake documentation</a>. |


### Private key authentication

You can use the `private_key` parameter to specify key-value pairs for key pair authentication. In the warehouse YAML file, add the parameter as follows: 
```yml
  private_key: |
     -----BEGIN ENCRYPTED PRIVATE KEY-----
     MIIExxxxxxxxxxxxxxxxxxxxucRqSZaS
     ...

     -----END ENCRYPTED PRIVATE KEY-----
```
