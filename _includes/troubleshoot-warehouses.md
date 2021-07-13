**Problem:** I get errors in the CLI when I run `soda analyze` on my MS SQL server data source.   <br />
**Solution:** Connecting Soda SQL to MS SQL servers is still in experimental phase. You may encounter errors before this data source connection type is stabilized.
<br />

**Problem:**  I use Amazon Athena and I'm having trouble connecting Soda SQL to data in an S3 bucket. <br />
**Solution:** If you have [followed the instructions]({% link soda-sql/configure.md %}#configuration-instructions) to configure your warehouse YAML and have added your AWS access key ID and secret access key to your env_vars YAML file but are still not connecting, you may need to adjust the S3 bucket setup and user profile permissions. 

When you connect Soda SQL to Athena to run scans on data in an S3 bucket, Soda SQL uses PyAthena (the Python DB API client for Amazon Athena) to output its scan results to the staging directory in the same S3 bucket. As such, the user profile that Soda SQL uses to connect to Athena (the Athena access keys you configured in your env_vars YAML files) must have write permission to the staging directory. If the user profile doesn't have the correct write permissions, the issue manifests in Soda SQL as a connection error. Instead, as best practice, separate the buckets.

1. Create a new Athena account and restrict the user profile with a policy that specifies that it can only write to the S3 bucket with the staging directory.
2. Create a new S3 bucket for your staging directory, then configure a separate warehouse YAML to access the staging directory. For example: 
```yaml
name: athena-query-results
connection:
    type: athena
    catalog: AwsDataCatalog
    database: test
    access_key_id: env_var(AWS_ACCESS_KEY_ID)
    secret_access_key: env_var(AWS_SECRET_ACCESS_KEY)
    role_arn: 
    region: eu-west-1
    staging_dir: <YOUR STAGING PATH IN AWS S3>
...
```

However, if you do not want to create a new S3 bucket for the staging directory, you can adjust the existing settings for the user profile you use to connect Soda SQL to Athena to include the following actions:
* `GetBucketLocation`
* `ListAllMyBuckets`
* `ListBucket`
* `GetObject`
* `ListBucketMultipartUploads`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`
* `PutObject`
 
<br />