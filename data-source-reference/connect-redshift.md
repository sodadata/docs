---
description: Access configuration details to connect Soda to a Redshift data source.
---

# Connect Soda to Amazon Redshift

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-redshift`

```yaml
data_source my_datasource_name:
  type: redshift
  host: 127.0.0.1
  user: simple
  password: simple_pass
  database: soda
  schema: public
  access_key_id: ${KEY_ID}
  secret_access_key: ${ACCESS_KEY}
  role_arn: arn:aws:ec2:us-east-1:123456789012:instance/i-012abcd34exxx56
  region: us-east-1
```

<table><thead><tr><th width="213.5333251953125">Property</th><th width="138.13330078125">Required</th><th>Notes</th></tr></thead><tbody><tr><td><code>type</code></td><td>required</td><td>Identify the type of data source for Soda.</td></tr><tr><td><code>host</code></td><td>required</td><td>Provide a host identifier.</td></tr><tr><td><code>user</code></td><td>required</td><td><p>If you provide a value for <code>user</code> and <code>password</code>:<br>1) the connection ignores cluster credentials<br>2) the username and password will be used to connect to the database</p><p><br>If you provide a value for <code>user</code>, <code>access_key_id</code> and <code>secret_access_key</code>:</p><p>1) the access key id and secret will be used to connect to the database</p></td></tr><tr><td><code>password</code></td><td>required<sup>(1)</sup></td><td>As above.<br><br>If password is not provided, then <code>access_key_id</code> and <code>secret_access_key</code> are required, and will be used to connect to the database</td></tr><tr><td><code>database</code></td><td>required</td><td>Provide an identifier for your database.</td></tr><tr><td><code>schema</code></td><td>required</td><td>Provide an identifier for the schema in which your dataset exists.</td></tr><tr><td><code>access_key_id</code></td><td>required<sup>(1)(2)</sup></td><td>Consider using system variables to retrieve this value securely.<br><br>If <code>access_key_id</code> and <code>secret_access_key</code> are not provided, then <code>password</code> is required.</td></tr><tr><td><code>secret_access_key</code></td><td>required<sup>(1)(2)</sup></td><td>Consider using system variables to retrieve this value securely.<br><br>If <code>access_key_id</code> and <code>secret_access_key</code> are not provided, then <code>password</code> is required.</td></tr><tr><td><code>role_arn</code></td><td>optional<sup>(3)</sup></td><td>Provide an Amazon Resource Name, which is a string that identifies an AWS resource such as an S3 bucket or EC2 instance. Learn how to <a href="https://docs.aws.amazon.com/managedservices/latest/userguide/find-arn.html">find your arn</a>.</td></tr><tr><td><code>region</code></td><td>optional</td><td>Provide an identifier for your geographic area.</td></tr><tr><td><code>session_token</code></td><td>optional</td><td>Add a session Token to use for authentication and authorization.</td></tr><tr><td><code>profile_name</code></td><td>optional</td><td>Specify the profile Name from local AWS configuration to use for authentication and authorization.</td></tr><tr><td><code>cluster_identifier</code></td><td>optional</td><td><p>Provide a <code>str</code> that represents the Redshift Cluster Identifier which is the name of the Redshift cluster. This parameter is  only used for AWS connection (<code>access_key_id</code> + <code>secret_access_key</code>) and ignored in user/password connection.</p><ul><li>If a <code>cluster_identifier</code> is not provided, Soda will attempt to extract it from the first segment of the <code>host</code>.</li><li><code>cluster_identifier</code> may be provided for nonstandard deployments.</li></ul></td></tr></tbody></table>

<sup>1</sup> One of the following is required for a successful connection:

* `password`
* `access_key_id` + `secret_access_key`

That means that `password` is optional only as long as `access_key_id` and `secret_access_key` are provided, and `access_key_id` and `secret_access_key` are optional as long as `password` is provided.

`cluster_identifier` is  ignored in user/password connections.

<sup>2</sup> `access_key_id` and `secret_access_key` are required parameters to obtain an authentication token from Amazon Athena or Redshift. You can provide these key values in the configuration file or as environment variables.

<sup>3</sup>You may add the optional `role_arn` parameter which first authenticates with the access keys, then uses the role to access temporary tokens that allow for authentication. Depending on your Athena or Redshift setup, you may be able to use only the `role_arn` to authenticate, though Athena still must access the keys from a config file or environment variables. See [AWS Boto3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html) for details on the progressive steps it takes to access the credentials it needs to authenticate.

Some users who access their Athena or Redshift data source via a self-hosted Soda Agent deployed in a Kubernetes cluster have reported that they can use IAM roles for Service Accounts to authenticate, as long as the IAM role that the Kubernetes pod has from the Kubernetes Service Account has the permissions to access Athena or Redshift. See [Enable IAM Roles for Service Accounts (IRSA) on the EKS cluster](https://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/setting-up-enable-IAM.html).

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                         |
| -------- | ----------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT, NCHAR, NVARCHAR, BPCHAR |
| number   | SMALLINT, INT2, INTEGER, INT, INT4, BIGINT, INT8                  |
| time     | DATE, TIME, TIMETZ, TIMESTAMP, TIMESTAMPTZ                        |
