---
layout: default
title: Use variables in Soda Core
description: 160 char description
sidebar: core
parent: Soda Core
---

# Use variables in Soda Core

Variables can be used in SodaCL files to

* Resolve credentials in configuration files.
* Define dynamic filters

Variables will resolve to environment variables or can be specified as variables on the scan.

To use variables in SodaCL files, put them between markers `${` and `}` like this: `${VAR_NAME}`

Variable `NOW` is set by default to the scan creation time as a string in iso8601 format. Eg `2022-03-01T08:13:04.940634`

For consistency we recommend to use upper case for variable names, but lower case is also allowed.




---
{% include docs-core-footer.md %}