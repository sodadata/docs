---
layout: default
title: Connect Soda to Snowflake
description: Access configuration details to connect Soda to a Snowflake data source.
parent: Connect a data source
---

# Connect Soda to Snowflake
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

## Configuration

```yaml
data_source my_datasource_name:
  type: snowflake
  connection:
    username: 
    password: 
    account: 
    database: 
    warehouse:
    connection_timeout: 
    role: PUBLIC
    client_session_keep_alive: true
    authenticator: externalbrowser
    session_parameters:
      QUERY_TAG: soda-queries
      QUOTED_IDENTIFIERS_IGNORE_CASE: false
  schema: public
```

| Property | Required | Notes |
| -------- | -------- | ----- |
| type   | required |   |
| username | required | Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_USER}`. |
| password | required | Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_PASSWORD}`. |
| account| required | Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_ACCOUNT}`. |
| database| required | |
| schema | required | |
| warehouse| required | |
| connection_timeout| required | |
| role | optional | See <a href="https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles" target="_blank">Snowflake System-Defined Roles</a> for details. |
| client_session_keep_alive | optional | Use this parameter with a boolean option to keep the session active, even with no user activity. |
| authenticator <sup>1</sup> | optional | Add an authenticator paramater with value `externalbrowser` to authenticate the connection to your Snowflake data source using any SAML 2.0-compliant identity provider (IdP) such as Okta or OneLogin.  |
| other params | optional | You can pass any other Snowflake paramters you wish by adding the key:value pairs to your Snowflake connection configuration. See <a href="https://docs.snowflake.com/en/user-guide/python-connector-api.html#connect" target="_blank"> Snowflake Python Connector API documentation</a> for a list of passable parameters. |
| QUERY_TAG | optional | See <a href="https://docs.snowflake.com/en/sql-reference/parameters.html#query-tag" target="_blank">QUERY_TAG</a> in Snowflake documentation. |
| QUOTED_IDENTIFIERS_<br />IGNORE_CASE | optional | See <a href="https://docs.snowflake.com/en/sql-reference/parameters.html#quoted-identifiers-ignore-case" target="_blank">QUOTED_IDENTIFIERS_IGNORE_CASE</a> in Snowflake documentation. |
| schema | required |  |

<sup>1</sup> Use this parameter when adding Snowflake connection configurations to a `configuration.`yml file. However, if you are adding connection configuration details directly in Soda Cloud (connecting to your Snowflake data source via a Soda Agent) to authenticate using Okta, you must follow the instructions documented by Snowflake for <a href="https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-use.html#native-sso-okta-only" target="_blank">Native SSO - Okta Only</a>.
 

### Private key authentication

You can use the `private_key` parameter to specify key-value pairs for key pair authentication. In you configuration YML file, add the parameter as per the following example: 
```yml
  private_key: |
     -----BEGIN ENCRYPTED PRIVATE KEY-----
     MIIExxxxxxxxxxxxxxxxxxxxucRqSZaS
     ...

     -----END ENCRYPTED PRIVATE KEY-----
```

{% include test-connection.md %}

## Supported data types

| Category | Data type                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR, CHARACTER, STRING, TEXT                                                                          |
| number   | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time     | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT_LTZ, TIMESTAMP_NTZ, TIMESTAMP_TZ                                    |


<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}