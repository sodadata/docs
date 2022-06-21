---
layout: default
title: Define programmatic scans
description: To automate the search for "bad" data, you can use the Soda Sore Python library to programmatically execute scans.
sidebar: core
parent: Soda Core 
---

# Define programmatic scans


{% include programmatic-basic.md %}

### Scan exit codes

Soda Core's scan output includes an exit code which indicates the outcome of the scan.

| 0 | all checks passed, all good from both runtime and Soda perspective |
| 1 | Soda issues a warning on a check(s) |
| 2 | Soda issues a failure on a check(s) |
| 3 | Soda encountered a runtime issue |

---
{% include docs-core-footer.md %}
