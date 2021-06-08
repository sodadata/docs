**Problem:** I get errors in the CLI when I run `soda analyze` on my MS SQL server warehouse.   <br />
**Solution:** Connecting Soda SQL to MS SQL servers is still in experimental phase. You may encounter errors before this warehouse connection type is stabilized.
<br />

**Problem:**  I use Amazon Athena and I'm having trouble connecting Soda SQL to data in an S3 bucket. <br />
**Solution:** If you have [followed the instructions]({% link soda-sql/getting-started/configure.md %}#configuration-instructions) to configure your warehouse YAML and have added your AWS access key ID and secret access key to your env_vars YAML file but are still not connecting, you may need to adjust the permissions of the user profile you are using to connect Soda SQL. PyAthena needs write permission for the S3 staging directory which is where Soda SQL outputs the results of its query. There are a few options to resolve the problem:
1. Give the user profile you use to connect Soda SQL to the S3 staging directory `AmazonS3FullAccess` permissions. However, in a production environment, this is not a practical solution.
2. Create a new account and restrict it with a policy that specifies that it can only read/write to the S3 staging directory. Use the credentials and keys for this new account to connect Soda SQL. 
3. Adjust the user settings for the profile you use to connect Soda SQL to the S3 staging directory to include the following actions:
* `GetBucketLocation`
* `ListAllMyBuckets`
* `ListBucket`
* `GetObject`
* `ListBucketMultipartUploads`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`
* `PutObject`
4. Create a new S3 bucket for the staging directory that Athena uses and give it a separate name and warehouse YAML file. For example: 
```yaml
name: aws-athena-query-results
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
<br />