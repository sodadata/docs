If you wish to set a limit on the samples that Soda implicitly collects for an entire data source, you can do so by adjusting the configuration YAML file, or editing the **Data Source** connection details in Soda Cloud, as per the following syntax. This configuration also applies to checks defined as no-code checks.
{% include code-header.html %}
```yaml
data_source soda_test:
  type: postgres
  host: xyz.xya.com
  port: 5432
  ...
  sampler:
    samples_limit: 50
```