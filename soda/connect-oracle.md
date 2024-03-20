---
layout: default
title: Connect Soda to OracleDB
description: Access configuration details to connect Soda to an OracleDB data source.
parent: Data source reference
---

# Connect Soda to OracleDB
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Compatibility
Soda supports Oracle version 21.3 or greater.

## Connection configuration reference

Install package: `soda-oracle`

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: oracle
  username: ${USARBIG_USER}
  password: ${USARBIG_PASSWORD}
  connectstring: "${USARBIG_HOST}:${UARBIG_PORT}/USARBIG_SID}"
```
Alternatively, you can configure a connection without a `connectstring`.

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: oracle
  username: simple
  password: simple_pass
  host: host
  service_name: service
```

| Property      | Required | Notes                                                      |
| ------------- | -------- | ---------------------------------------------------------- |
| type          | required |  Identify the type of data source for Soda.                |
| username      | required | Consider using system variables to retrieve this value securely.      |
| password      | required | Consider using system variables to retrieve this value securely.      |
| host          | optional | Provide a host identifier. Only used when connectstring is not provided. |
| port          | optional | Provide a port identifier. Default is 1523. Only used when connectstring is not provided.|
| service_name  | optional | Provide a service_name. Only used when connectstring is not provided. |
| connectstring | optional | Specify connection information for the Oracle database. Must be a semicolon-separated list of attribute name and value pairings. See <a href="https://docs.oracle.com/en/database/oracle/oracle-database/21/odpnt/ConnectionConnectionString.html#GUID-DF4ED9A3-1AAF-445D-AEEF-016E6CD5A0C0" target="_blank">ConnectionString</a> in Oracle documentation. If you do not specify one, Soda attempts to construct a `connectstring` using `host`, `port` and `service_name` properties. |


{% include test-connection.md %}

## Supported data types

| Category | Data type  |
| -------- | ---------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL  |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |


<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
