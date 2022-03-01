---
layout: default
title: Soda Core terminology
description: 160 char description
sidebar: core
parent: Soda Core
---

# Soda Core terminology

| Term | Description |
| ---- | ----------- |
| SodaCL | Soda Checks Language. The language in which checks can be expressed.|
| check | A check is a description to verify an assumption or property of data. |
| scan | A scan is a single execution of a collection of SodaCL files. To evaluate the checks in the SodaCL files, Soda Core will build and execute queries, extract the metrics, optionally fetch historic information from Soda Cloud and then and then evaluate the checks. See [Scan reference]({% link soda-core/scan-reference.md %}).|


---
{% include docs-core-footer.md %}