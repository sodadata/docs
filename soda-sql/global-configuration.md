---
layout: default
title: Config YAML
parent: Soda SQL
redirect_from: /soda-sql/documentation/config.html
---

## send_anonymous_usage_stats
The Soda Core team wants to build the best version of Soda SQL as possible. We want to understand how users use Soda SQL as well as proactively capture bugs and performance issues. To enable us to do just that we have added telemetry event tracking (using the Open Telemetry Framework). The data we track is completely anonymous, does not contain any for of personally identifiying data in any form and is purely for internal use.

Usage statistics are sent when Soda SQL is invoked via any of its commands. You can see exactly how usage statistics are collected in [soda_telemetry.py](https://github.com/sodadata/soda-sql/blob/main/core/sodasql/telemetry/soda_telemetry.py)

Here are the metrics and attributes that we currently track:

|      attribute_name      |                                                    derivation and notes                                                   |
|:------------------------:|:-------------------------------------------------------------------------------------------------------------------------:|
| `user_cookie_id`         | uuid generated once and stored in `~/.soda/config.yaml`                                                                   |
| `command_name`           | captured from click's command or API method name                                                                          |
| `command_options`        | captured from click's command or API method name                                                                          |
| `version`                | soda-sql version                                                                                                          |
| `datasource_type`        | name of the dialect/warehouse                                                                                             |
| `datasource_id`          | hash of: - host (Postgres, Redshift, Spark) - account (Snowflake) - project (BigQuery) - and so on for any other adaptors |
| `sql_metrics_count`      | count of custom sql metrics defined                                                                                       |
| `historic_metrics_count` | count of usage of the newly introduced `historic_metrics`                                                                 |
| `architecture`           | machine architecture                                                                                                      |
| `operating_system`       |                                                                                                                           |
| `python_version`         |                                                                                                                           |
| `python_implementation`  |                                                                                                                           |
| `invocation_start`       | span start from the OT framework                                                                                          |
| `invocation_end`         | span end from OT framework                                                                                                |

By default usage statistics sending is turned on. You can opt out-out at any time by adding the following to your `config.yml` file:
```
send_anonymous_usage_stats: False
```
