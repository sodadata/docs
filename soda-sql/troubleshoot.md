---
layout: default
title: Troubleshoot Soda SQL
description: Access an aggregated list of tips and solutions to problems using Soda.
sidebar: sql
parent: Soda SQL
redirect_from: 
- /soda-sql/documentation/troubleshoot.html
- /soda/troubleshoot.html
---

# Troubleshoot Soda SQL

{% include banner-sql.md %}

## Install and upgrade Soda SQL

{% include troubleshoot-install.md %}
<br />
<br />

**Problem:** When you run `soda analyze` you get an an authentication error. <br />
**Solution:** Check to see if you have another instance of Postgres already running on port 5432. If so, try stopping or uninstalling the Postgres instance, then run `soda analyze` again. 
<br />

## Scans and tests with Soda SQL

{% include troubleshoot-tests.md %}
<br />
<br />

{% include troubleshoot-historic-metrics.md %}
<br />

## Data source connections with Soda SQL

{% include troubleshoot-warehouses.md %}
<br />

## Soda Cloud

{% include troubleshoot-failed-rows.md %}
<br />

---
*Last modified on {% last_modified_at %}*