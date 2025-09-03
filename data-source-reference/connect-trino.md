---
description: Access configuration details to connect Soda to a Trino data source.
---

# Connect Soda to Trino

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Connection configuration reference

Install package: `soda-trino`

Reference [Trino documentation](https://trino.io/docs/current/overview/concepts.html) for assistance.

```yaml
data_source my_datasource_name:
  type: trino
  host: my.trino.host
  catalog: datalake
  schema: cw_dq
  auth_type: OAuth2ClientCredentialsAuthentication
  oauth:
    token_url: https://token-url.test.com/token
    client_id: XXX
    client_secret: YYY
    scope: "scope1 scope2" # optional, CSV
    grant_type: client_credentials # optional, this is default value
```

#### Core connection properties

<table><thead><tr><th width="176.76666259765625">Property</th><th width="111.75">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>type</code></td><td>yes</td><td>Identify the type of data source for Soda. Must be <code>trino</code> in this case.</td></tr><tr><td><code>host</code></td><td>yes</td><td>Provide a host identifier.</td></tr><tr><td><code>catalog</code></td><td>yes</td><td>Provide an identifier for the catalog which contains schemas and which references a data source using a connector. See <a href="https://trino.io/docs/current/overview/concepts.html#catalog">Catalog</a> in the Trino documentation.</td></tr><tr><td><code>schema</code></td><td>yes</td><td>Provide an identifier for the schema in which your dataset exists.</td></tr><tr><td><code>auth_type</code></td><td>yes</td><td><p>Authentication mode. Add <code>OAuth2ClientCredentialsAuthentication</code> to use OAuth 2.0 client credentials flow.</p><ul><li><code>BasicAuthentication</code> in combination of user + password, or</li><li><code>JWTAuthentication</code> in combination with <code>access_token</code> and optionally username.</li><li>Default: <code>BasicAuthentication</code>.</li></ul></td></tr></tbody></table>

#### OAuth (client credentials flow) properties

When `auth_type` is `OAuth2ClientCredentialsAuthentication`, configure the following nested properties under `oauth:`.

<table><thead><tr><th width="203.39996337890625">Property</th><th width="107.8333740234375">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>oauth.token_url</code></td><td>yes</td><td>The OAuth 2.0 token endpoint to obtain an access token.</td></tr><tr><td><code>oauth.client_id</code></td><td>yes</td><td>OAuth 2.0 client identifier.</td></tr><tr><td><code>oauth.client_secret</code></td><td>yes</td><td>OAuth 2.0 client secret.</td></tr><tr><td><code>oauth.scope</code></td><td>no</td><td><p>Space-delimited, case-sensitive list of strings per <a href="https://www.rfc-editor.org/rfc/rfc6749#section-3.3">RFC 6749</a> (e.g., <code>"scope1 scope2"</code>).</p><p>No default value.</p></td></tr><tr><td><code>oauth.grant_type</code></td><td>no</td><td>OAuth 2.0 grant type. Leave unset to use the default <code>client_credentials</code>flow.</td></tr></tbody></table>

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR                                                                                                   |
| number   | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time     | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT\_LTZ, TIMESTAMP\_NTZ, TIMESTAMP\_TZ                                 |
