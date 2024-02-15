---
layout: default
title: Connect Soda to Amazon Redshift
description: Access configuration details to connect Soda to a Redshift data source.
parent: Data source reference
---

# Connect Soda to Amazon Redshift
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Connection configuration reference

Install package: `soda-redshift`

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: redshift
  host: 127.0.0.1
  username: simple
  password: simple_pass
  database: soda
  schema: public
  access_key_id: ${KEY_ID}
  secret_access_key: ${ACCESS_KEY}
  role_arn: arn:aws:ec2:us-east-1:123456789012:instance/i-012abcd34exxx56
  region: us-east-1
```

| Property          | Required | Notes                    |
| ----------------- | -------- | ------------------------ |
| type              | required | Identify the type of data source for Soda.|
| host              | required | Provide a host identifier. |
| username          | required | If you provide a value for `username` and `password`, the connection ignores cluster credentials. |
| password          | required | As above.                |
| database          | required | Provide an idenfier for your database. |
| schema            | required | Provide an identifier for the schema in which your dataset exists. |
| access_key_id     | required <sup>1</sup> | Consider using system variables to retrieve this value securely.  |
| secret_access_key | required <sup>1</sup>| Consider using system variables to retrieve this value securely.   |
| role_arn          | optional <sup>1</sup>| Provide an Amazon Resource Name, which is a string that identifies an AWS resource such as an S3 bucket or EC2 instance. Learn how to <a href="https://docs.aws.amazon.com/managedservices/latest/userguide/find-arn.html" target="_blank">find your arn</a>.|
| region            | optional | Provide an identifier for your geographic area. |
| session_token     | optional | Add a session Token to use for authentication and authorization. |
| profile_name      | optional | Specify the profile Name from local AWS configuration to use for authentication and authorization. |

{% include access-keys-role-arn.md %}

{% include test-connection.md %}

## Supported data types

| Category | Data type                                                         |
| -------- | ----------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT, NCHAR, NVARCHAR, BPCHAR |
| number   | SMALLINT, INT2, INTEGER, INT, INT4, BIGINT, INT8                  |
| time     | DATE, TIME, TIMETZ, TIMESTAMP, TIMESTAMPTZ                        |


<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}