---
layout: default
title: Use Soda Core CLI
description: 160 char description
sidebar: core
parent: Soda Core
---

# Use Soda Core CLI

To see a list of Soda Core command-line interface (CLI) commands, use the `soda` command.


```shell
$ soda
```
```shell
Usage: soda [OPTIONS] COMMAND [ARGS]...

  Soda Core CLI version 0.0.x

Options:
  --help  Show this message and exit.

Commands:
  scan  runs a scan
```

To see a list of configurable options for the command, use the command-line help.

```shell
$ soda scan --help
```
```shell
Usage: soda scan [OPTIONS] [SODACL_PATHS]...

  soda scan will   * Parse the SodaCL files and report any errors   
  ...

Options:
  -d, --data-source TEXT      [required]
  -s, --scan-definition TEXT
  -v, --variable TEXT
  -c, --configuration PATH
  -V, --verbose
  --help                      Show this message and exit.

```

Use the `-c` option to include multiple `configuration.yml` files in one scan execution.

---
{% include docs-core-footer.md %}
