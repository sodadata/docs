---
layout: default
title: Soda Librarby CLI Commands
description: Review the Soda Library command-line interface (CLI) commands.
parent: Soda Library
redirect_from:
- /soda-core/cli.html
- /soda-core/cli-reference.html
---

# Soda Library CLI commands 
*Last modified on {% last_modified_at %}*


| Command               | Description |
| --------------------- | ----------- |
| `soda ingest` | Ingests dbt test results to display in Soda Cloud. See [Integrate with dbt]({% link soda/integrate-dbt.md %}). |
| `soda scan` | Uses the configurations in your checks YAML file to prepare, then run SQL queries against the data in your data source. See [Run a Soda Core scan]({% link soda-library/run-a-scan.md %}) for details. |
| `soda suggest` | Generates a checks YAML file based on your responses to prompts in the Soda Library CLI. |
| `soda test-connection` | Tests the connection to the data sources for which you configured a connection in your configuration YAML file. |
| `soda update-dro` | Updates a distribution reference file that a [distribution check]({% link soda-cl/distribution.md %}) uses. |

## List of commands

To see a list of Soda Library command-line interface (CLI) commands, use the `soda` command.

Command:
```shell
soda
```

Output:
```shell
Usage: soda [OPTIONS] COMMAND [ARGS]...

  Soda Library CLI version 1.0.x

Options:
  --help  Show this message and exit.

Commands:
  ingest           Ingests test results from a different tool
  scan             Runs a scan
  test-connection  Tests a connection
  update-dro       Updates contents of a distribution reference file
```

## List of command options

To see a list of configurable options for each command, use the command-line help.
```shell
soda ingest --help
soda scan --help
soda suggest --help
soda update-dro --help
```

Refer to [Add scan options]({% link soda-library/run-a-scan.md %}#add-scan-options) for more information.


## Go further

* Learn [How Soda Library works]({% link soda-library/how-library-works.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
