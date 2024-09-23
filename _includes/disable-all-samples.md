To prevent Soda Cloud from receiving any sample data or failed row samples for any datasets in any data sources to which you have connected your Soda Cloud account, proceed as follows:

1. As a user with [permission]({% link soda-cloud/roles-global.md %}#global-roles-and-permissions) to do so, log in to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**.
2. In the **Organization** tab, uncheck the box to **Allow Soda to collect sample data and failed row samples for all datasets**, then **Save**. 

Alternatively, if you use Soda Library, you can adjust the configuration in your `configuration.yml` to disable all samples for an individual data source, as in the following example.
{% include code-header.html %}
```yaml
data_source my_datasource:
  type: postgres
  ...
  sampler:
    disable_samples: True
```