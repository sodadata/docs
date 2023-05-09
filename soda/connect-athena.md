---
layout: default
title: Connect Soda to Amazon Athena
description: Access configuration details to connect Soda to an Athena data source.
parent: Connect a data source
---

# Connect Soda to Amazon Athena
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Configuration
{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: athena
  connection:
    access_key_id: 
    secret_access_key: 
    region_name: eu-west-1
    staging_dir: 
    schema: 
```

| Property          | Required | Notes                                                      |
| ----------------- | -------- | ---------------------------------------------------------- |
| type              | required |                                                            |
| access_key_id     | optional <sup>1</sup> | Consider using system variables to retrieve this value securely. |
| secret_access_key | optional <sup>1</sup> | Consider using system variables to retrieve this value securely. |
| region_name       | optional |                                                            |
| staging_dir       | required |                                                            |
| schema            | required |                                                            |

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