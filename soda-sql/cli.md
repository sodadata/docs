---
layout: default
title: Soda SQL CLI commands
description: Access a table of Soda SQL command-line interface commands. Use soda --help to review commands and options in your command-line interface.
sidebar: sql
parent: Soda SQL
redirect_from: /soda-sql/documentation/cli.html
---

# Soda SQL CLI commands

{% include banner-sql.md %}

| Command               | Description |
| --------------------- | ----------- |
| `soda analyze` | Analyzes the contents of your data source and automatically prepares a scan YAML file for each dataset. Soda SQL puts the YAML files in the `/tables` directory inside the warehouse directory. See [Create a scan YAML file]({% link soda-sql/scan-yaml.md %}#create-a-scan-yaml-file) for details.|
| `soda create yourdatawarehouse` | Creates a new `warehouse.yml` file and prepares credentials in your `~/.soda/env_vars.yml`. Soda SQL does not overwrite or remove and existing environment variables, it only adds new. See [Create a warehouse YAML file]({% link soda-sql/warehouse.md %}#create-a-warehouse-yaml-file) for details. |
| `soda ingest` | Ingests test result details from other tools, such as dbt. |
| `soda scan` | Uses the configurations in your scan YAML file to prepare, then run SQL queries against the data in your data source. See [Run a scan]({% link soda-sql/scan.md %}#run-a-scan-in-soda-sql) for details. |

## List of commands

To see a list of Soda SQL command-line interface (CLI) commands, use the `soda` command.

Command:
```shell
$ soda
```

Output:
```shell
Usage: soda [OPTIONS] COMMAND [ARGS]...

  Soda CLI version 2.x.xxx

Options:
  --help  Show this message and exit.

Commands:
  analyze  Analyze tables and scaffold SCAN YAML
  create   Create a template warehouse.yml file
  ingest   Ingest test information from different tools
  scan     Compute metrics and run tests for a given table
```

## List of options

To see a list of configurable options for each command, use the command-line help.
```shell
$ soda create --help
$ soda analyze --help
$ ingest --help
$ soda scan --help
```

Refer to [Add analyze options]({% link soda-sql/configure.md %}#add-analyze-options) and [Add scan options]({% link soda-sql/scan.md %}#add-scan-options) for details and examples.


## Go further

* Soda collects anonymous Soda SQL usage statistics. Learn more about the [information]({% link soda-sql/global-configuration.md %}) Soda collects.
* Learn [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Follow the [Quick start tutorial]({% link soda-sql/quick-start-soda-sql.md %}) to set up Soda SQL and run your first scan!


<br />

---
**Last modified on {% last_modified_at %}**

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.