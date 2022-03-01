---
layout: default
title: Configure Soda Core
description: 160 char description
sidebar: core
parent: Soda Core
---

# Configure Soda Core

## Connect to Snowflake

TODO document supported data types per data source type.

## Connect to Redshift

## Connect to BigQuery

## Connect to Postgres

## Connect to Spark

## Connect to Databricks

## Resolving credentials

## Table prefixing

If you want your generated table names to be prefixed with the database name and or schema name, use the data source property `table_prefix` in the environment like this:

```yaml
data_source events:
  type: snowflake
  connection:
    host: ${SNOWFLAKE_HOST}
    username: ${SNOWFLAKE_USERNAME}
    password: ${SNOWFLAKE_PASSWORD}
  database: events
  schema: public
  table_prefix: "EVENTS"."PUBLIC".
```

With the `table_prefix` property configured like above, the SodaCL

```yaml
checks for "CUSTOMERS":
  - count > 0
```

will lead to a prefixed quoted table name in the generated queries like this:

```sql
SELECT
  COUNT(*)
FROM "EVENTS"."PUBLIC"."CUSTOMERS"
```

## Soda Cloud configuration

Only how to get and configure the Soda Cloud API key and other details in the configuration

## Webhooks

(Coming soon)

These notifications can be sent out at the end of each scan and do not interfere with the notification configurations in Soda Cloud.

```yaml
notifications:
  - webhook:
      url: https://myserver/api/soda_notifications
      headers:
        Authorization: Bearer ${NOTIFCATION_WEBHOOK_TOKEN}
```



---
{% include docs-core-footer.md %}