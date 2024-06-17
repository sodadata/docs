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

**Solution:** When connecting to a Snowflake data source by proxyy, be sure to set the new proxy environment variables from the command-line using export statements, as in the following example.
```shell
export HTTP_PROXY=http://a-proxy-o-dd-dddd-net:8000
export HTTPS_PROXY=https://a-proxy-o-dd-dddd-net:8000
```