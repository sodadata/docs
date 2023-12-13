If your dataset names include white spaces or use special characters, you must wrap those dataset names in quotes whenever you identify them to Soda, such as in a checks YAML file. 

To add those necessary quotes to dataset names that Soda acts upon automatically -- discovering, profiling, or sampling datasets, or creating automated monitoring checks --  you can add a `quote_tables` configuration to your data source, as in the following example. 

{% include code-header.html %}
```yaml
data_source soda_demo:
  type: sqlserver
  host: localhost
  username: ${SQL_USERNAME}
  password: ${SQL_PASSWORD}
  quote_tables: true
```