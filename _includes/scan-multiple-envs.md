When you want to run a scan that executes the same checks on different environments or schemas, such as development, production, and staging, you must apply the following configurations to ensure that Soda Cloud does not incomprehensibly merge the checks results from scans of multiple environments. 

1. Ensure that you are using Soda Core 3.0.7 or later. See instructions for [upgrading]({% link soda-core/installation.md %}#upgrade).
2. In your `configuration.yml` file, provide separate connection configurations for each environment, as in the following example.
```yaml
data_source nyc_dev:
  type: postgres
  connection:
    host: host
    port: '5432'
    username: ${POSTGRES_USER}
    password: ${POSTGRES_PASSWORD}
    database: postgres
    schema: public
data_source nyc_prod:
  type: postgres
  connection:
    host: host
    port: '5432'
    username: ${POSTGRES_USER}
    password: ${POSTGRES_PASSWORD}
    database: postgres
    schema: public
```
3. Provide a `scan definition` name at scan time using the `-s` option. The [scan definition]({% link soda/glossary.md %}#scan-definition) helps Soda Cloud to distinguish different scan contexts and therefore plays a crucial role when the `checks.yml` file names and the checks themselves are the same. 
```shell
# for NYC data source for dev
soda scan -d nyc_dev -c configuration.yml -s nyc_a checks.yml
# for NYC data source for prod
soda scan -d nyc_prod -c configuration.yml -s nyc_b checks.yml
```

See also: [Troubleshoot missing check results]({% link soda-cl/troubleshoot.md %}#missing-check-results-in-soda-cloud)<br />
See also: [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity)
