---
description: Access configuration details to connect Soda to a Snowflake data source.
---

# Connect Soda to Snowflake

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-snowflake`

Core connection:

```yaml
data_source my_datasource_name:
  type: snowflake
  # Core
  account: ${SNOWFLAKE_ACCOUNT}
  database: <database>
  schema: <schema>
  warehouse: <warehouse>
  role: <role>                            # optional, strongly recommended
  connection_timeout: 240                 # optional
  client_session_keep_alive: false        # optional
```

<details>

<summary>Core connection properties</summary>

<table><thead><tr><th width="242.5">Property</th><th width="133.75">Required</th><th width="100">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>type</code></td><td>yes</td><td>string</td><td>Identify the type of data source for Soda. In this case, must be <code>snowflake</code>.</td></tr><tr><td><code>account</code></td><td>yes</td><td>string</td><td>Provide the unique value that identifies your account. Consider using system variables to retrieve this value securely using, for example, <code>${SNOWFLAKE_ACCOUNT}</code>. Note: Account sometimes needs to take the form of <code>&#x3C;account_identifier>-&#x3C;account_name></code> or <code>&#x3C;account_identifier>.&#x3C;region></code>.</td></tr><tr><td><code>database</code></td><td>yes</td><td>string</td><td>Provide an identifier for your database.</td></tr><tr><td><code>schema</code></td><td>yes</td><td>string</td><td>Identify the schema in the data source in which your tables exist.</td></tr><tr><td><code>warehouse</code></td><td>yes</td><td>string</td><td>Provide an identifier for the cluster of resources that is a Snowflake virtual warehouse. See <a href="https://docs.snowflake.com/en/user-guide/warehouses-overview">Overview of Warehouses</a>.</td></tr><tr><td><code>role</code><sup>1</sup></td><td>recommended</td><td>string</td><td>Specify a Snowflake role that has permission to access the <code>database</code> and <code>schema</code> of your data source.</td></tr><tr><td><code>connection_timeout</code></td><td>no</td><td>integer</td><td>Set the timeout period in seconds for an inactive login session.</td></tr><tr><td><code>client_session_keep_alive</code></td><td>no</td><td>boolean</td><td>Use this parameter to keep the session active, even with no user activity.<br>Default value: <code>false</code>.</td></tr><tr><td><code>session_parameters</code></td><td>no</td><td>object</td><td>Pass-through Snowflake session params (e.g., <code>QUERY_TAG</code>, <code>QUOTED_IDENTIFIERS_IGNORE_CASE</code>).</td></tr><tr><td><code>proxy_http</code></td><td>no</td><td>string</td><td>HTTP proxy (agent environments); see <a href="connect-snowflake.md#troubleshoot">Troubleshoot section</a>.</td></tr><tr><td><code>proxy_https</code></td><td>no</td><td>string</td><td>HTTPS proxy (agent environments); see <a href="connect-snowflake.md#troubleshoot">Troubleshoot section</a>.</td></tr></tbody></table>

<sup>1</sup> Though optional, best practice dictates that you provide a value for `role`. If you do not provide a role, and Snowflake has not assigned a [Snowflake System-Defined Role](https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles) to the user account, Snowflake may, confusingly, deny access to the data source.

#### Authenticator selector

<table><thead><tr><th width="154.75">Property</th><th width="113.5">Required</th><th>Values / Example</th><th>Description</th></tr></thead><tbody><tr><td><code>authenticator</code><sup>2</sup></td><td>no</td><td><code>externalbrowser</code> | <code>SNOWFLAKE_JWT</code> | <code>OAUTH_CLIENT_CREDENTIALS</code></td><td>Add an authenticator paramater with value <code>externalbrowser</code> to authenticate the connection to your Snowflake data source using any SAML 2.0-compliant identity provider (IdP) such as Okta or OneLogin.</td></tr></tbody></table>

<sup>2</sup> Use this parameter when adding Snowflake connection configurations to a `configuration.yml` file. However, if you are adding connection configuration details directly in Soda Cloud (connecting to your Snowflake data source via a Soda Agent) to authenticate using Okta, you must follow the instructions documented by Snowflake for [Native SSO - Okta Only](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-use.html#native-sso-okta-only).

</details>

Choose exactly **one authentication approach** below.

{% hint style="info" %}
**Notes**:

* Use **one** authentication method per connection.
* While `role` is technically optional, providing it avoids confusing access errors.
* Private key auth can use inline `private_key` (PEM) or `private_key_path`.
* `externalbrowser` SSO uses your SAML 2.0 IdP (e.g., Okta/OneLogin).
* Proxy parameters are supported when connecting via an agent behind a proxy.
{% endhint %}

### Username + password

```yaml
  # 1) Username + password
  username: ${SNOWFLAKE_USER}
  password: ${SNOWFLAKE_PASSWORD}
```

<details>

<summary>Username/password properties (when <em>no</em> <code>authenticator</code> is set)</summary>

<table><thead><tr><th width="120">Property</th><th width="104">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>username</code></td><td>yes</td><td>Snowflake user login.<br>Consider using system variables to retrieve this value securely using, for example, <code>${SNOWFLAKE_USER}</code>.</td></tr><tr><td><code>password</code></td><td>yes</td><td>Password for the user.<br>Consider using system variables to retrieve this value securely using, for example, <code>${SNOWFLAKE_PASSWORD}</code>.</td></tr></tbody></table>

</details>

### External browser SSO

```yaml
  # 2) External browser SSO (SAML 2.0 IdP such as Okta/OneLogin)
  authenticator: externalbrowser
```

<details>

<summary>External browser SSO properties (when <code>authenticator: externalbrowser</code>)</summary>

<table><thead><tr><th width="160.5">Property</th><th width="116.25">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>username</code></td><td>no</td><td>Depending on IdP settings, may be required.<br>Consider using system variables to retrieve this value securely using, for example, <code>${SNOWFLAKE_USER}</code>.</td></tr><tr><td><code>authenticator</code></td><td>yes</td><td>Must be <code>externalbrowser</code> to enable SAML 2.0 browser-based SSO.</td></tr></tbody></table>

</details>

### Private key authentication

You can use the `private_key` and `private_key_passphrase` parameters to specify for key pair authentication. In you configuration YML file, add the parameters as per the following example.

```yaml
  # 3) Key pair (JWT) authentication
  authenticator: SNOWFLAKE_JWT
  username: <user>
  private_key: |
    -----BEGIN ENCRYPTED PRIVATE KEY-----
    -----END ENCRYPTED PRIVATE KEY-----
  private_key_passphrase: ${SNOWFLAKE_PASSPHRASE}
  # or use a file path instead of inline key:
  private_key_path: /path/to/private-key.pk8
```

<details>

<summary>Key pair / JWT properties (when <code>authenticator: SNOWFLAKE_JWT</code>)</summary>

<table><thead><tr><th width="213.75">Property</th><th width="111.75">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>username</code></td><td>yes</td><td>Snowflake user that owns the key pair.</td></tr><tr><td><code>private_key</code></td><td>yes*</td><td>Inline PEM private key. Use either this <strong>or</strong> <code>private_key_path</code>.</td></tr><tr><td><code>private_key_path</code></td><td>yes*</td><td>Path to private key file (<code>.pk8</code>). Use either this <strong>or</strong> <code>private_key</code>.</td></tr><tr><td><code>private_key_passphrase</code></td><td>no</td><td>Passphrase for encrypted private key.</td></tr></tbody></table>

</details>

### OAuth 2.0 Client Credentials (NEW)

```yaml
  # 4) OAuth 2.0 Client Credentials
  authenticator: OAUTH_CLIENT_CREDENTIALS
  oauth_client_id: <client-id>
  oauth_client_secret: <client-secret>
  oauth_token_request_url: https://<idp>/oauth/token
  oauth_scope: "scope1 scope2"        # space-delimited; optional if derived by role
```

<details>

<summary>OAuth 2.0 client properties (when <code>authenticator: OAUTH_CLIENT_CREDENTIALS</code>)</summary>

<table><thead><tr><th width="231.75">Property</th><th width="93">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>oauth_client_id</code></td><td>yes</td><td>Client ID from the IdP for the Snowflake <strong>security integration</strong>.</td></tr><tr><td><code>oauth_client_secret</code></td><td>yes</td><td>Client secret from the IdP for the Snowflake <strong>security integration</strong>.</td></tr><tr><td><code>oauth_token_request_url</code></td><td>yes</td><td>IdP token endpoint that issues access tokens to the driver. (With Snowflake as IdP, derive from server/account parameters.)</td></tr><tr><td><code>oauth_scope</code></td><td>no</td><td>Space-delimited, case-sensitive scopes. Defaults may be derived from role; specify explicitly for multiple/custom scopes.</td></tr></tbody></table>

</details>

***

### Other parameters

```yaml
  # Optional Snowflake session parameters (passed through)
  session_parameters:
    QUERY_TAG: soda-queries
    QUOTED_IDENTIFIERS_IGNORE_CASE: false

  # Optional proxies (for agents behind proxy)
  proxy_http: http://host:port
  proxy_https: https://host:port
```

<details>

<summary>Other parameters properties</summary>

| Property                                  | Required | Notes                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| other params                              | optional | You can pass any other Snowflake parameters you wish by adding the key:value pairs to your Snowflake connection configuration. See [Snowflake Python Connector API documentation](https://docs.snowflake.com/en/user-guide/python-connector-api.html#connect) for a list of passable parameters. |
| QUERY\_TAG                                | optional | See [QUERY\_TAG](https://docs.snowflake.com/en/sql-reference/parameters.html#query-tag) in Snowflake documentation.                                                                                                                                                                              |
| <p>QUOTED_IDENTIFIERS_<br>IGNORE_CASE</p> | optional | See [QUOTED\_IDENTIFIERS\_IGNORE\_CASE](https://docs.snowflake.com/en/sql-reference/parameters.html#quoted-identifiers-ignore-case) in Snowflake documentation.                                                                                                                                  |

</details>

***

## Use a values file to store private key authentication values

If you use a private key authentication with Snowflake and have deployed a [Soda Agent](../quick-start-sip/deploy.md), you can provide the required private key values in a `values.yml` file when you deploy or redeploy the agent.

You can also use the `values.yml` file to store other environment variables for the Soda Agent to use, such as `SNOFLAKE_USER`, `SNOWFLAKE_ACCOUNT`, `SNOWFLAKE_PASSPHRASE`, etc.

1. First, run the following command to create a local path to the Snowflake private key. Replace the `local path to the Snowflake private key` with your own value.

```shell
kubectl create secret generic -n <soda-agent-namespace> snowflake-private-key --from-file=snowflake-private-key.pk8=<local path to the Snowflake private key>
```

2.  Then, add the following to the your `values.yml` file, adjusting the values to your own specific details.

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
3.  Adjust the `configuration.yml` file to include the new path in the connection details, as in the following example.

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

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR, CHARACTER, STRING, TEXT                                                                          |
| number   | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time     | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT\_LTZ, TIMESTAMP\_NTZ, TIMESTAMP\_TZ                                 |

## Troubleshoot

**Problem:** When testing the connection to your Snowflake data source, Snowflake returns an error message about using the `use database` command.

**Solution:** Use the `role` parameter to specify a Snowflake role that has permission to access the `database` and `schema` of your data source.\
Though optional, best practice dictates that you provide a value for `role`. If you do not provide a role, and Snowflake has not assigned a [Snowflake System-Defined Role](https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles) to the user account, Snowflake may, confusingly, deny access to the data source.

\


**Problem:** When Soda attempts to connect to your Snowflake data source, it produces a connectivity error that includes something like `RunteimError: Command failed with exit code 2: ..... ocsp_response_validation_cash.lock`.

**Solution:**\
Use [Snowflake's troubleshooting guide](https://community.snowflake.com/s/article/How-to-Triage-OCSP-Related-Connectivity-Problems) to triage OCSP-related connectivity issues.

\


**Problem:** You have defined a Group By check and the scan that executes the check yields an error.

**Solution:** Be aware that, by default, Snowflake returns columns names in uppercase. Therefore, when defining a Group By check, you must specify the custom name of the check in uppercase as in the following example.

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



**Problem:** While attempting to connect Soda to a Snowflake data source using proxy parameters, you encounter an error that reads something similar to `Could not connect to data source "name_db": 250001 (08001): Failed to connect to DB: mydb.eu-west-1.snowflakecomputing.com:443. Incoming request with IP/Token xx.xxx.xx.xxx is not allowed to access Snowflake.`

```yaml
data_source: my_data_source
  type: snowflake
  ...
  session_param:
    QUERY_TAG: soda-test
    QUOTED_IDENTIFIERS_IGNORE_CASE: false
  proxy_http: http://a-proxy-o-dd-dddd-net:8000
  proxy_https: https://a-proxy-o-dd-dddd-net:8000
```

**Solution:** When connecting to a Snowflake data source by proxy, be sure to set the new proxy environment variables from the command-line using export statements, as in the following example.

```sh
export HTTP_PROXY=http://a-proxy-o-dd-dddd-net:8000
export HTTPS_PROXY=https://a-proxy-o-dd-dddd-net:800
```
