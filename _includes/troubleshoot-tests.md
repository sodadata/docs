**Problem:** Soda SQL scans produce errors in the CLI. <br />
**Solution:** Check your `warehouse.yml`, `env_vars.yml`, and scan YAML files for proper spacing, indentation, and verbiage. See [Warehouse YAML]({% link soda-sql/documentation/warehouse.md %}) and [Scan YAML]({% link soda-sql/documentation/scan-yaml.md %}).
<br />
<br />

**Problem:** When I run a scan, I get this error.
```shell
UnicodeEncodeError: 'latin-1' codec can't encode character '\u20ac' in position 431: ordinal not in range(256)
```
**Solution:** Soda SQL does not support scans of tables using Latin-1 encoding. Adjust the tables to UTF-8 encoding to run a scan.