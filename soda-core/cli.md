---
layout: default
title: Use Soda Core CLI
description: To see a list of Soda Core (Beta) command-line interface (CLI) commands, use the soda command.
sidebar: core
parent: Soda Core (Beta)
---

# Use Soda Core CLI ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

To see a list of Soda Core command-line interface (CLI) commands, use the `soda` command.


```shell
$ soda
```
```shell
Usage: soda [OPTIONS] COMMAND [ARGS]...

  Soda Core CLI version 3.0.xx

Options:
  --help  Show this message and exit.

Commands:
  scan    runs a scan
  update  updates a distribution reference file
```

To see a list of configurable options for the command, use the command-line help.

```shell
$ soda scan --help
```

Note that you can use the `-c` option to include multiple `configuration.yml` files in one scan execution.

---
{% include docs-core-footer.md %}
