# Troubleshoot data source connections

## SSL certificate error

**Problem:** You encounter an SSL certificate error while attempting to connect Soda to a data source.

**Solution:** Use `pip install pip-system-certs` to potentially resolve the issue. This install works to resolve the issue only on Windows machines where the Ops team installs all the certificates needed through Group Policy Objects, or similar.

## Snowflake proxy connection error

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

```sh
export HTTP_PROXY=http://a-proxy-o-dd-dddd-net:8000
export HTTPS_PROXY=https://a-proxy-o-dd-dddd-net:8000
```

## Spark DataFrame object error

**Problem:** Using a Soda package for Spark df, you encounter an error that reads, `ERROR | Error occurred while executing scan. | 'DataFrame' object has no attribute 'offset'`.

**Solution:** Be sure to upgrade your version of PySpark to 3.4.0 or greater for compatibility with Soda packages.

## ImportError during programmatic scan

**Problem:** When importing Soda scan, you get an error that reads, `ImportError: cannot import name 'field_validator' from 'pydantic'...`.

**Solution:** This error typically emerges when your environment is using pydantic v1 instead of v2. Soda requires pydantic v2 to work and this is correctly set via installation requirements in the package, however Python allows you to override those requirements. Use `pip list | grep "pydantic"` to determine which version you are using and upgrade as necessary.

\


## Scan error with Soda Dask and Pandas

**Problem:** You encounter errors when trying to install `soda-pandas-dask` in an environment that uses Python 3.11. This may manifest as an issue with dependencies or as an error that reads, `Pre-scan validation failed, see logs for details.`

**Workaround:** Uninstall the `soda-pandas-dask` package, then downgrade the version of Python your environment uses to Python 3.9. Install the `soda-pandas-dask` package again.

\


## Go further

* Access [Troubleshoot SodaCL](../sodacl-reference/troubleshoot.md) for help resolving issues running scans with SodaCL.

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
