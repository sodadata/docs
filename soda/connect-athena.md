---
layout: default
title: Connect Soda to Amazon Athena
description: Access configuration details to connect Soda to an Athena data source.
parent: Data source reference
---

# Connect Soda to Amazon Athena
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Connection configuration reference
Install package: `soda-athena`

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: athena
  access_key_id: kk9gDU6800xxxx
  secret_access_key: 88f&eeTuT47xxxx
  region_name: eu-west-1
  staging_dir: s3://s3-results-bucket/output/
  schema: public
```

| Property          | Required | Notes                                                      |
| ----------------- | -------- | ---------------------------------------------------------- |
| type              | required | Identify the type of data source for Soda.                 |
| access_key_id     | optional <sup>1</sup> | Consider using system variables to retrieve this value securely. See <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html" target="_blank">Manage access keys for IAM users</a>.|
| secret_access_key | optional <sup>1</sup> | Consider using system variables to retrieve this value securely. |
| region_name       | optional | The endpoint your AWS account uses. Refer to <a href="https://docs.aws.amazon.com/general/latest/gr/athena.html" target="_blank">Amazon Athena endpoints and quotas</a>. |
| staging_dir       | required | Identify the Amazon S3 Staging Directory (the Query Result Location in AWS); see <a href="https://docs.aws.amazon.com/athena/latest/ug/querying.html#query-results-specify-location" target="_blank">Specifying a query result location</a> |
| schema            | required | Identify the schema in the data source in which your tables exist. |
| catalog           | optional | Identify the name of the Data Source, also referred to as a Catalog. The default value is `awsdatacatalog`. |
| work_group        | optional | Identify a non-default workgroup in your region. In your Athena console, access your current workgroup in the Workgroup option on the upper right. Read more about <a href="https://docs.aws.amazon.com/athena/latest/ug/user-created-workgroups.html" target="_blank">Athena Workgroups</a>.
| role_arn          | optional | Role to use for authentication and authorization. |
| session_token     | optional | Session Token to use for authentication and authorization. |
| profile_name      | optional | Profile Name from local aws configuration to use for authentication and authorization. |

<sup>1</sup> Access keys and IAM role are mutually exclusive: if you provide values for `access_key_id` and `secret_access_key`, you cannot use Identity and Access Management role; if you provide value for `role_arn`, then you cannot use the access keys. Refer to [Identity and Access Management in Athena](https://docs.aws.amazon.com/athena/latest/ug/security-iam-athena.html) for details.

{% include test-connection.md %}

## Supported data types

| Category | Data type                                                       |
| -------- | --------------------------------------------------------------- |
| text     | CHAR, VARCHAR, STRING                                           |
| number   | TINYINT, SMALLINT, INT, INTEGER, BIGINT, DOUBLE, FLOAT, DECIMAL |
| time     | DATE, TIMESTAMP                                                 |

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
