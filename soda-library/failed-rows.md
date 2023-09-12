### Configure a failed row sampler

Optionally, you can add a custom sampler to collect samples of rows with a `fail` check result. Refer to the following example that prints the failed row samples in the CLI.
{% include code-header.html %}
```python
from soda.scan import Scan
from soda.sampler.sampler import Sampler
from soda.sampler.sample_context import SampleContext


# Create a custom sampler by extending the Sampler class
class CustomSampler(Sampler):
    def store_sample(self, sample_context: SampleContext):
        # Retrieve the rows from the sample for a check
        rows = sample_context.sample.get_rows()
        # Check SampleContext for more details that you can extract
        # This example simply prints the failed row samples
        print(sample_context.query)
        print(sample_context.sample.get_schema())
        print(rows)


if __name__ == '__main__':
    # Create Scan object
    s = Scan()
    # Configure an instance of custom sampler
    s.sampler = CustomSampler()

    s.set_scan_definition_name("test_scan")
    s.set_data_source_name("aa_vk")
    s.add_configuration_yaml_str(f"""
    data_source test:
      type: postgres
      schema: public
      connection:
        host: localhost
        port: 5433
        username: ***
        password: ***
        database: postgres
    """)

    s.add_sodacl_yaml_str(f"""
    checks for dim_account:
        - invalid_percent(account_type) = 0:
            valid format: email

    """)
    s.execute()
    print(s.get_logs_text())
```


### Save failed row samples to an alternate destination

If you prefer to send the output of the failed row sampler to a destination other than Soda Cloud, you can do so by customizing the sampler as above, then using the Python API to save the rows to a JSON file. Refer to <a href="https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" target="_blank">docs.python.org</a> for details.