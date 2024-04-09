---
layout: default
title: Connect Soda to Dremio
description: Access configuration details to connect Soda to a Dremio data source.
parent: Data source reference
---

# Connect Soda to Dremio
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Compatibility
Soda supports Dremio version 22 or greater.

## Connection configuration reference

Install package: `soda-dremio`

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: dremio
  host: 127.0.0.1
  port: 5432
  username: simple
  password: simple_pass
  schema: public
  use_encryption: "false"
  routing_queue: "queue"
  disable_certificate_verification: "false"

```

| Property                         | Required | Notes                                                                                          |
| -------------------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| type                             | required | Identify the type of data source for Soda.                                                     |
| host                             | required | Provide a host identifier.                                                                     |
| port                             | required | Provide a port identifier.                                                                     |
| username                         | required | Consider using system variables to retrieve this value securely.                               |
| password                         | required | Consider using system variables to retrieve this value securely.                               |
| schema                           | optional | Provide an identifier for the schema in which your dataset exists.                             |
| use_encryption                   | optional | Use encryption or not. False by default.                                                       |
| routing_queue                    | optional | Provide an identifier for the routing queue to use.                                            |
| disable_certificate_verification | optional | If true, Dremio does not verify the host certificate against the truststore. False by default. |


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
