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
  host: db
  username:
  password:
  database: 
  access_key_id:
  secret_access_key:
  role_arn:
  region: eu-west-1
  schema: public
```

| Property          | Required | Notes                    |
| ----------------- | -------- | ------------------------ |
| type              | required |                          |
| host              | required |                          |
| username          | required | If you provide a value for `username` and `password`, the connection ignores cluster credentials.          |
| password          | required | As above.                |
| database          | required |                          |
| schema            |          |                          |
| access_key_id     | optional <sup>1</sup> | Consider using system variables to retrieve this value securely.  |
| secret_access_key | optional <sup>1</sup>| Consider using system variables to retrieve this value securely.   |
| role_arn          | optional | The [Amazon Resource Name](https://docs.aws.amazon.com/credref/latest/refdocs/setting-global-role_arn.html) of an IAM role that you want to use. |
| region            | optional |                         |

<sup>1</sup> Access keys and IAM role are mutually exclusive: if you provide values for `access_key_id` and `secret_access_key`, you cannot use Identity and Access Management role; if you provide value for `role_arn`, then you cannot use the access keys. Refer to [Amazon Redshift Authorization parameters](https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-authorization.html) for details.


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