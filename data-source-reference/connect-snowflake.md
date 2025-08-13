---
description: Access configuration details to connect Soda to a Snowflake data source.
---

# Connect Soda to Snowflake

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-snowflake`

```yaml
data_source my_datasource_name:
  type: snowflake
  host: localhost
  port: 5432
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

| Property                                  | Required | Notes                                                                                                                                                                                                                                                                                           |
| ----------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                                      | required | Identify the type of data source for Soda.                                                                                                                                                                                                                                                      |
| host                                      | optional | Provide host at which to connect to the data source.                                                                                                                                                                                                                                            |
| port                                      | optional | Provide the port through which to connect to the data source.                                                                                                                                                                                                                                   |
| username                                  | required | Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_USER}`.                                                                                                                                                                                        |
| password                                  | required | Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_PASSWORD}`.                                                                                                                                                                                    |
| account                                   | required | Provide the unique value that identifies your account. Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_ACCOUNT}`. Note: Account sometimes needs to take the form of `<account_identifier>-<account_name>` or `<account_identifier>.<region>`.  |
| database                                  | required | Provide an idenfier for your database.                                                                                                                                                                                                                                                          |
| warehouse                                 | required | Provide an identifier for the cluster of resources that is a Snowflake virtual warehouse. See [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview).                                                                                                           |
| connection\_timeout                       | required | Set the timeout period in seconds for an inactive login session.                                                                                                                                                                                                                                |
| role<sup>1</sup>                          | optional | Specify a Snowflake role that has permission to access the `database` and `schema` of your data source.                                                                                                                                                                                         |
| client\_session\_keep\_alive              | optional | Use this parameter to keep the session active, even with no user activity. Provide a boolean value: `true` or `false`                                                                                                                                                                           |
| authenticator<sup>2</sup>                 | optional | Add an authenticator paramater with value `externalbrowser` to authenticate the connection to your Snowflake data source using any SAML 2.0-compliant identity provider (IdP) such as Okta or OneLogin.                                                                                         |
| other params                              | optional | You can pass any other Snowflake paramters you wish by adding the key:value pairs to your Snowflake connection configuration. See [Snowflake Python Connector API documentation](https://docs.snowflake.com/en/user-guide/python-connector-api.html#connect) for a list of passable parameters. |
| QUERY\_TAG                                | optional | See [QUERY\_TAG](https://docs.snowflake.com/en/sql-reference/parameters.html#query-tag) in Snowflake documentation.                                                                                                                                                                             |
| <p>QUOTED_IDENTIFIERS_<br>IGNORE_CASE</p> | optional | See [QUOTED\_IDENTIFIERS\_IGNORE\_CASE](https://docs.snowflake.com/en/sql-reference/parameters.html#quoted-identifiers-ignore-case) in Snowflake documentation.                                                                                                                                 |
| schema                                    | required | Identify the schema in the data source in which your tables exist.                                                                                                                                                                                                                              |

<sup>1</sup> Though optional, best practice dictates that you provide a value for `role`. If you do not provide a role, and Snowflake has not assigned a [Snowflake System-Defined Role](https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles) to the user account, Snowflake may, confusingly, deny access to the data source.

<sup>2</sup> Use this parameter when adding Snowflake connection configurations to a `configuration.yml` file. However, if you are adding connection configuration details directly in Soda Cloud (connecting to your Snowflake data source via a Soda Agent) to authenticate using Okta, you must follow the instructions documented by Snowflake for [Native SSO - Okta Only](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-use.html#native-sso-okta-only).

### Private key authentication

You can use the `private_key` and `private_key_passphrase` parameters to specify for key pair authentication. In you configuration YML file, add the parameters as per the following example.

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

### Use a values file to store private key authentication values

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
