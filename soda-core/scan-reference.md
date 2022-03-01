---
layout: default
title: Soda Core scan reference
description: 160 char description
sidebar: core
parent: Soda Core
---

# Soda Core scan reference

This section is the first reference section that explains all the ins and outs of a scan.

A scan is a single execution of a collection of SodaCL files on a datasource.

## SodaCL files

The check files themselves or directories containing check files.

CLI: `-ch ./your-snowflake-ds.yml -ch ./your-snowflake-dir-containing-sodacl-files`

## Configuration

* Declares the data sources and includes the credentials.
* Credentials for the optional Soda Cloud account

CLI: `-c ./your-soda-configuration.yml`

## Default data source
The name of a data source declared in configuration that is going to be used as the default.

CLI: `-d your_snowflake_ds`

## Variables
Variables are a set of key value pairs. Keys and values are strings. In SodaCL variables can be referred to as ${VAR} See

CLI: `-var today=2020-05-22 -var yesterday=2020-05-21`

SodaCL
```yaml
variables:
  hello: world
  sometime_later: ${now}
```



---
{% include docs-core-footer.md %}