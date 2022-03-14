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

Note that you can use the `-c` option to include multiple `configuration.yml` files in one scan execution.

---
{% include docs-core-footer.md %}
