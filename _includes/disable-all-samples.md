To prevent Soda Cloud from receiving any sample data or failed row samples for any datasets in any data sources to which you have connected your Soda Cloud account, proceed as follows:

1. As an Admin, log in to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**.
2. In the **Organization** tab, check the box to "Disable collecting samples and failed rows for metrics in Soda Cloud", then **Save**. 

Alternatively, if you use Soda Library, you can adjust the configuration in your `configuration.yml` to disable all samples, as in the following example.
{% include code-header.html %}
```yaml
data_source my_datasource:
  type: postgres
  ...
  sampler:
    disable_samples: True
```