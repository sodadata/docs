---
layout: default
title: SodaCL (Beta)
description: 

parent: SodaCL (Beta)
---

# SodaCL ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

Soda Checks Language is a domain-specific language for data reliability. 

You use SodaCL to define Soda Checks in a checks YAML file. A Soda Check is a test that Soda Core (Beta), Soda's open-source, command-line tool, executes when it scans a dataset in your data source. Technically, a check is a Python expression that, during a scan, checks metrics to see if they match the parameters you defined for a measurement. 

Designed as a human-readable language, SodaCL includes over 30 built-in metrics that you can use to write Soda Checks for data quality, including metrics for freshness, duplicates, missing values, and schema changes. Available for use with Soda Core, SodaCL enables Data Engineers and Analysts to collaborate to establish and maintain good-quality data.


---
{% include docs-footer.md %}