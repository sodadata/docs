---
description: Access configuration details to connect Soda to an Athena data source.
---

# Connect Soda to Amazon Athena

For Soda to run quality scans on your data, you must configure it to connect to your data source.\
To learn how to set up Soda and configure it to connect to your data sources, see [Get started](../quick-start-sip/setup-guide.md).

## Connection configuration reference

Install package: `soda-athena`

```yaml
data_source my_datasource_name:
  type: athena
  access_key_id: kk9gDU6800xxxx
  secret_access_key: 88f&eeTuT47xxxx
  region_name: eu-west-1
  staging_dir: s3://s3-results-bucket/output/
  schema: public
```

| Property            | Required              | Notes                                                                                                                                                                                                                                                              |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type                | required              | Identify the type of data source for Soda.                                                                                                                                                                                                                         |
| access\_key\_id     | required <sup>1</sup> | Consider using system variables to retrieve this value securely. See [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).                                                                         |
| secret\_access\_key | required <sup>1</sup> | Consider using system variables to retrieve this value securely. See [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).                                                                         |
| region\_name        | optional              | The endpoint your AWS account uses. Refer to [Amazon Athena endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/athena.html).                                                                                                                      |
| role\_arn           | optional <sup>2</sup> | Specify role to use for authentication and authorization.                                                                                                                                                                                                          |
| staging\_dir        | required              | Identify the Amazon S3 Staging Directory (the Query Result Location in AWS); see [Specifying a query result location](https://docs.aws.amazon.com/athena/latest/ug/querying.html#query-results-specify-location)                                                   |
| schema              | required              | Identify the schema in the data source in which your tables exist.                                                                                                                                                                                                 |
| catalog             | optional              | Identify the name of the Data Source, also referred to as a Catalog. The default value is `awsdatacatalog`.                                                                                                                                                        |
| work\_group         | optional              | Identify a non-default workgroup in your region. In your Athena console, access your current workgroup in the Workgroup option on the upper right. Read more about [Athena Workgroups](https://docs.aws.amazon.com/athena/latest/ug/user-created-workgroups.html). |
| session\_token      | optional              | Add a session Token to use for authentication and authorization.                                                                                                                                                                                                   |
| profile\_name       | optional              | Specify the profile Name from local AWS configuration to use for authentication and authorization.                                                                                                                                                                 |

<sup>1</sup> `access_key_id` and `secret_access_key` are required parameters to obtain an authentication token from Amazon Athena or Redshift. You can provide these key values in the configuration file or as environment variables.

<sup>2</sup>You may add the optional `role_arn` parameter which first authenticates with the access keys, then uses the role to access temporary tokens that allow for authentication. Depending on your Athena or Redshift setup, you may be able to use only the `role_arn` to authenticate, though **Athena still must access the keys from a config file or environment variables**. See [AWS Boto3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html) for details on the progressive steps it takes to access the credentials it needs to authenticate.

Some users who access their Athena or Redshift data source via a self-hosted Soda Agent deployed in a Kubernetes cluster have reported that they can use IAM roles for Service Accounts to authenticate, as long as the IAM role that the Kubernetes pod has from the Kubernetes Service Account has the permissions to access Athena or Redshift. See [Enable IAM Roles for Service Accounts (IRSA) on the EKS cluster](https://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/setting-up-enable-IAM.html).

## Test the data source connection <a href="#test-the-data-source-connection" id="test-the-data-source-connection"></a>

To confirm that you have correctly configured the connection details for the data source(s) in your configuration YAML file, use the `test-connection` command. If you wish, add a `-V` option to the command to returns results in verbose mode in the CLI.

```python
soda test-connection -d my_datasource -c configuration.yml -V
```

## Supported data types

| Category | Data type                                                       |
| -------- | --------------------------------------------------------------- |
| text     | CHAR, VARCHAR, STRING                                           |
| number   | TINYINT, SMALLINT, INT, INTEGER, BIGINT, DOUBLE, FLOAT, DECIMAL |
| time     | DATE, TIMESTAMP                                                 |
