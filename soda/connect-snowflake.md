---
layout: default
title: Connect Soda to Snowflake
description: Access configuration details to connect Soda to a Snowflake data source.
parent: Data source reference
---

# Connect Soda to Snowflake
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

[Configuration](#configuration)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Private key authentication](#private-key-authentication)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Use a values file to store private key authenticaion values](#use-a-values-file-to-store-private-key-authentication-values) <br />
[Test the data source connection](#test-the-data-source-connection)<br />
[Supported data types](#supported-data-types)<br />
[Troubleshoot](#troubleshoot)<br />
<br />

## Connection configuration reference

Install package: `soda-snowflake`

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: snowflake
  username: ${SNOWFLAKE_USER}
  password: ${SNOWFLAKE_PASSWORD}
  account: ${SNOWFLAKE_ACCOUNT}
  database: soda
  warehouse: soda_wh
  connection_timeout: 240
  role: PUBLIC
  client_session_keep_alive: true
  authenticator: externalbrowser
  session_params:
    QUERY_TAG: soda-queries
    QUOTED_IDENTIFIERS_IGNORE_CASE: false
  schema: public
```

| Property | Required | Notes |
| -------- | -------- | ----- |
| type     | required | Identify the type of data source for Soda.|
| username | required | Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_USER}`. |
| password | required | Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_PASSWORD}`. |
| account| required | Provide the unique value that identifies your account. Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_ACCOUNT}`. |
| database| required | Provide an idenfier for your database. |
| warehouse| required | Provide an identifier for the cluster of resources that is a Snowflake virtual warehouse. See <a href="https://docs.snowflake.com/en/user-guide/warehouses-overview" target="_blank">Overview of Warehouses</a>.|
| connection_timeout| required | Set the timeout period in minutes for an inactive login session.  |
| role<sup>1</sup> | optional | Specify a Snowflake role that has permission to access the `database` and `schema` of your data source. |
| client_session_keep_alive | optional | Use this parameter to keep the session active, even with no user activity. Provide a boolean value: `true` or `false`|
| authenticator<sup>2</sup> | optional | Add an authenticator paramater with value `externalbrowser` to authenticate the connection to your Snowflake data source using any SAML 2.0-compliant identity provider (IdP) such as Okta or OneLogin.  |
| other params | optional | You can pass any other Snowflake paramters you wish by adding the key:value pairs to your Snowflake connection configuration. See <a href="https://docs.snowflake.com/en/user-guide/python-connector-api.html#connect" target="_blank"> Snowflake Python Connector API documentation</a> for a list of passable parameters. |
| QUERY_TAG | optional | See <a href="https://docs.snowflake.com/en/sql-reference/parameters.html#query-tag" target="_blank">QUERY_TAG</a> in Snowflake documentation. |
| QUOTED_IDENTIFIERS_<br />IGNORE_CASE | optional | See <a href="https://docs.snowflake.com/en/sql-reference/parameters.html#quoted-identifiers-ignore-case" target="_blank">QUOTED_IDENTIFIERS_IGNORE_CASE</a> in Snowflake documentation. |
| schema | required | Identify the schema in the data source in which your tables exist. |

<sup>1</sup> Though optional, best practice dictates that you provide a value for `role`. If you do not provide a role, and Snowflake has not assigned a <a href="https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles" target="_blank">Snowflake System-Defined Role</a> to the user account, Snowflake may, confusingly, deny access to the data source. 

<sup>2</sup> Use this parameter when adding Snowflake connection configurations to a `configuration.yml` file. However, if you are adding connection configuration details directly in Soda Cloud (connecting to your Snowflake data source via a Soda Agent) to authenticate using Okta, you must follow the instructions documented by Snowflake for <a href="https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-use.html#native-sso-okta-only" target="_blank">Native SSO - Okta Only</a>.
 

### Private key authentication

You can use the `private_key` and `private_key_passphrase` parameters to specify for key pair authentication. In you configuration YML file, add the parameters as per the following example. 
{% include code-header.html %}
```yaml
data_source snowflake:
  type: snowflake
  username: xxxyyyzzz
  ...
  client_session_keep_alive: true
  Authenticator: SNOWFLAKE_JWT
  schema: TPCH_SF1
  private_key_passphrase: "123xxx"
  private_key: |
    -----BEGIN ENCRYPTED PRIVATE KEY-----
    -----END ENCRYPTED PRIVATE KEY-----
```

###  Use a values file to store private key authentication values

If you use a private key authentication with Snowflake and have deployed a [Soda Agent]({% link soda-agent/deploy.md %}), you can provide the required private key values in a `values.yml` file when you deploy or redeploy the agent.

You can also use the `values.yml` file to store other environment variables for the Soda Agent to use, such as `SNOFLAKE_USER`, `SNOWFLAKE_ACCOUNT`, `SNOWFLAKE_PASSPHRASE`, etc.

1. First, run the following command to create a local path to the Snowflake private key. Replace the `local path to the Snowflake private key` with your own value.
```shell
kubectl create secret generic -n <soda-agent-namespace> snowflake-private-key --from-file=snowflake-private-key.pk8=<local path to the Snowflake private key>
```
2. Then, add the following to the your `values.yml` file, adjusting the values to your own specific details.
    ```yaml
    soda:
      scanlauncher:
        volumeMounts:
          - name: snowflake-private-key
            mountPath: /opt/soda/etc
        volumes:
          - name: snowflake-private-key
            secret:
              secretName: snowflake-private-key
              items:
                - key: snowflake-private-key.pk8
                  path: snowflake-private-key.pk8
    ```
3. Adjust the `configuration.yml` file to include the new path in the connection details, as in the following example.
    ```yaml
    data_source ltsnowflakecustomer:
      type: snowflake
      username: ${SNOWFLAKE_USER}
      password: password
      account: ${SNOWFLAKE_ACCOUNT}
      database: PUBLISH_DEV
      warehouse: ${SNOWFLAKE_WAREHOUSE}
      role: ${SNOWFLAKE_ROLE}
      client_session_keep_alive: true
      session_parameters:
        QUERY_TAG: soda-queries
        QUOTED_IDENTIFIERS_IGNORE_CASE: false
      schema: CUSTOMER
      private_key_passphrase: ${SNOWFLAKE_PASSPHRASE}
      private_key_path: /opt/soda/etc/snowflake-private-key.pk8
    ```
4. Deploy, or redeploy, the agent for the changes to take effect.

{% include test-connection.md %}

## Supported data types

| Category | Data type                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR, CHARACTER, STRING, TEXT                                                                          |
| number   | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time     | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT_LTZ, TIMESTAMP_NTZ, TIMESTAMP_TZ                                    |


## Troubleshoot
<!--Linked to UI, access Shlink-->
**Problem:** When testing the connection to your Snowflake data source, Snowflake returns an error message about using the `use database` command.

**Solution:** Use the `role` parameter to specify a Snowflake role that has permission to access the `database` and `schema` of your data source. <br />Though optional, best practice dictates that you provide a value for `role`. If you do not provide a role, and Snowflake has not assigned a <a href="https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles" target="_blank">Snowflake System-Defined Role</a> to the user account, Snowflake may, confusingly, deny access to the data source. 

<br />

**Problem:** When Soda attempts to connect to your Snowflake data source, it produces a connectivity error that includes something like `RunteimError: Command failed with exit code 2: ..... ocsp_response_validation_cash.lock`. 

**Solution:**
Use <a href="https://community.snowflake.com/s/article/How-to-Triage-OCSP-Related-Connectivity-Problems" target="_blank">Snowflake's troubleshooting guide</a> to triage OCSP-related connectivity issues.

<br />

**Problem:** You have defined a Group By check and the scan that executes the check yields an error.

**Solution:**  Be aware that, by default, Snowflake returns columns names in uppercase. Therefore, when defining a Group By check, you must specify the custom name of the check in uppercase as in the following example.
```yaml
checks for VOLUME:
  - group by:
      group_limit: 50
      query: |
        SELECT TRADER, count(*) as trader_row_count
        FROM TRADEVOLUME
        WHERE TRADE_DATE = '2023-01-01'
        GROUP BY TRADER
      fields:
        - TRADER
      checks:
        - TRADER_ROW_COUNT > 40:
            name: Trader row count
```

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}