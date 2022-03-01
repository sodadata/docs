---
layout: default
title: Use Soda Core CLI
description: 160 char description
sidebar: core
parent: Soda Core
---

# Use Soda Core CLI

Just enter soda to get the list of available commands:

```shell
$ soda
Usage: soda [OPTIONS] COMMAND [ARGS]...

  Soda Core CLI version 0.0.1

Options:
  --help  Show this message and exit.

Commands:
  scan  Run checks from given SodaCL files
```

And run this to get help on the scan command

```shell
$ soda scan --help
Usage: soda scan [OPTIONS]

Options:
  -ch, --check PATH         [required]
  -d, --data-source TEXT    [required]
  -c, --configuration PATH
  -v, --verbose
  -var, --variables TEXT    Variables like -var today=2020-04-12 -var
                            yesterday=2020-04-11  Put values with spaces in
                            single or double quotes.
```

---
{% include docs-core-footer.md %}