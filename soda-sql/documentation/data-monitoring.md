---
layout: default
title: Data monitoring
parent: Documentation
---

# Data monitoring 

*"We’re not close to our data. <br />We don’t have systems and processes in place to detect problems with data.  <br />As a result, data issues remain silent. <br />The software keeps on working, but on bad data."* <br />
 > –- Tom Baeyens, CTO and Co-founder, Soda

## What is data monitoring?

To monitor data is to regularly and continually examine it to identify invalid, missing, or unexpected values. Set thresholds that establish acceptable parameters for "good quality" data, then frequently test your data against those thresholds to validate that it is sound. This practice ensures that the systems and people who use the data to take action or make decisions are working from a reliable foundation of good-quality data. 

## Soda for data monitoring

Soda squarely addresses two key challenges in data monitoring:
- **observability:** testing to detect "bad" data so it does not silently corrupt your systems
- **collaboration:** understanding quality expectations across teams and maintaining a level of trust in the data everyone uses

**Soda SQL** is a purpose-built tool for Data Engineers to detect data issues. Use it from the command-line to test data in your data warehouses for things you consider "bad" such as missing or null values in a table column, malformatted data, or values that are wildly inconsistent with expectations as when someone accidentally adds an extra zero to a number. Armed with these tests, you can set up Soda SQL to automatically scan data when events occur (new data comes into a database, a process transforms data) or integrate Soda SQL with your data orchestration tool to schedule automatic scans. 

**Soda Cloud** empowers people throughout the organization to collaborate on the meaning and maintenance of good quality data. The cloud-based web application enables any team member to apply tests to data for specific parameters without going through an intermediary such as a Data Engineer or IT Support. Teams and systems can also leverage historic testing data to start automatically detecting anomalies. 

If your enterprise makes data-driven decisions, you should be monitoring your data.

## Go further

* Learn more about [How Soda SQL works]({% link soda-sql/documentation/concepts.md %}).
* Get started in a few minutes with the [Quick start tutorial]({% link soda-sql/getting-started/5_min_tutorial.md %}).
* Learn how to [configure programmatic scans]({% link soda-sql/documentation/programmatic_scan.md %}) or [integrate with your data orchestration tool]({% link soda-sql/documentation/orchestrate_scans.md %}).

