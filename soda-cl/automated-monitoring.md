---
layout: default
title: Automated monitoring
description: 
parent: SodaCL
---

# Automated monitoring

This feature requires Soda Cloud.

Configure automated monitoring to activate health dashboards in Soda Cloud. Add the following to ensure that Soda Core sends automated monitoring details to Soda Cloud for all tables in the data source.

```yaml
automated monitoring:
  tables: ['%']
```

Use the following to specify the tables to include and exclude in automated monitoring.

```yaml
automated monitoring:
  tables:
    - include SODATEST_%
    - exclude PROD%
```

By default, Soda Core sends row count and schema information to Soda Cloud for every table in your data source. Soda Cloud issues warnings if row counts have anomalies, or if there is any change to a schema.

Use the following to specify any automated monitoring aspects you do not wish to send to Soda Cloud. 

```yaml
automated monitoring:
  tables: ['%']
  find anomalies:
    row count: false
    schema: false
```
---
{% include docs-footer.md %}
