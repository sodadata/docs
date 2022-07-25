---
layout: default
title: Use variables in Soda Core
description: For Soda Core, use variables in your checks.yml file to resolve credentials in configuration files, or to define dynamic filters.
sidebar: core
parent: Soda Core
---

# Use variables in Soda Core


Use **variables** in your `checks.yml` file to resolve credentials in configuration files, or to define dynamic filters.

Use variables in `checks.yml` files with the following syntax and markers: `${VAR_NAME}`

* During a scan, variables resolve to environment variables, or you can specify variables in the scan command.
* By default, the variable `NOW` is the scan creation time as a string in ISO8601 format. For example: `2022-03-01T08:13:04.940634`
* For consistency, best practice dictate that you use upper case for variable names, though you can use lower case if you wish.
* Variables can be used in:
    * 1. Check name
    ```
    - row_count > 1:
        name: Row count in X ${VAR_1}
    ```
    This applies to `for each` as well e.g.
    ```
    for each dataset D:
        checks:
            - row_count > 1:
                name: Positive count in ${ D }
    ```
    * 2. Any sql in filter/sample query e.g.
    ```
    filter customers [daily]:
        where: ts >= timestamp '${ts_start}' and ts < timestamp '${ts_end}'
    checks for customers [daily]:
        - row_count = 10
    ```

Current limitations:
Variables cannot be part of the check definition or its threshold, e.g. the following is NOT possible:

checks for customers:
  - ${var_1} > ${var_2}


See also: [Scan reference]({% link soda-core/scan-reference.md %}#variables)


---
{% include docs-core-footer.md %}
