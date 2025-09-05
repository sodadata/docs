---
description: >-
  Review release notes for Soda Library, a Python library and CLI for testing
  data quality.
---

# Soda Library - Release notes

## v4 initial release

<sup>01 September, 2025</sup>

* Introduced support for `Fabric` data source.
* Enhanced quoting of identifiers with special characters.
* Fixed reconciliation checks on large MySQL tables. Previously this would result in `mysql.connector.errors.InternalError: Unread result found.`
* Fixed mix-up of group evolution checks. Previously multiple group evolution checks in a single SodaCL file would have their results mixed up.
* Removed SodaCL generator and related `ia-questionary` dependency.
