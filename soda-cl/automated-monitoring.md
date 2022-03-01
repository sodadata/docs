---
layout: default
title: Automated monitoring
description: 
parent: SodaCL
---

# Automated monitoring

This feature requires Soda Cloud

The simplest form to configure automated monitoring for auto health dashboards. It activates automatic monitoring on all tables in the data source.
```yaml
automated monitoring:
  tables: ['%']
```

You can specify more precise which tables to include and exclude like this:
```yaml
automated monitoring:
  tables:
    - include SODATEST_%
    - exclude PROD%
```

By default row counts and schema will be automatically monitored. And you'll get warnings if row counts have anomalies or for any schema changes.

You can also specify what aspects to skip like this. If you skip all aspects like in the example below, nothing will be monitored of course :)
```yaml
automated monitoring:
  tables: ['%']
  find anomalies:
    row count: false
    schema: false
```
---
{% include docs-footer.md %}