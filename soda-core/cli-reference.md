---
layout: default
title: Soda Core CLI Commands
description: Review the Soda Core command-line interface (CLI) commands.
parent: Soda Core
redirect_from: /soda-core/cli.html
---

# Soda Core CLI commands 


| Command               | Description |
| --------------------- | ----------- |
| `soda ingest` | Ingests dbt test results to display in Soda Cloud. See [Integrate with dbt]({% link soda/integrate-dbt.md %}). |
| `soda scan` | Uses the configurations in your checks YAML file to prepare, then run SQL queries against the data in your data source. See [Run a Soda Core scan]({% link soda-core/scan-core.md %}) for details. |
| `soda test-connection` | Tests the connection to the data sources for which you configured a connection in your configuration YAML file. |
| `soda update-dro` | Updates a distribution reference file that a [distribution check]({% link soda-cl/distribution.md %}) uses. |

## List of commands

To see a list of Soda Core command-line interface (CLI) commands, use the `soda` command.

Command:
```shell
soda
```

Output:
```shell
Usage: soda [OPTIONS] COMMAND [ARGS]...

  Soda Core CLI version 3.0.0xx

Options:
  --help  Show this message and exit.

Commands:
  scan    runs a scan
  update-dro  updates a distribution reference file
```

## List of command options

To see a list of configurable options for each command, use the command-line help.
```shell
soda scan --help
soda ingest --help
soda update-dro --help
```

Refer to [Add scan options]({% link soda-core/scan-core.md %}#add-scan-options) for more information.


## Go further

* Learn [How Soda Core works]({% link soda-core/how-core-works.md %}).
* Follow the [Quick start tutorial]({% link soda/quick-start-soda-core.md %}) to set up Soda Core and run your first scan!
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
