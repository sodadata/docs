---
layout: default
title: Use variables in Soda Core
description: 160 char description
sidebar: core
parent: Soda Core (Beta)
---

# Use variables in Soda Core ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

Use **variables** in your `checks.yml` file to resolve credentials in configuration files, or to define dynamic filters.

Use variables in `checks.yml` files with the following syntax and markers: `${VAR_NAME}`

* During a scan, variables resolve to environment variables, or you can specify variables in the scan command.
* By default, the variable `NOW` is the scan creation time as a string in ISO8601 format. For example: `2022-03-01T08:13:04.940634`
* For consistency, best practice dictate that you use upper case for variable names, though you can use lower case if you wish.

See also: [Scan reference]({% link soda-core/scan-reference.md %}#variables)


---
{% include docs-core-footer.md %}
