---
layout: default
title: Data quality
parent: Soda
redirect_from: /soda-sql/documentation/data-monitoring.html
---

# Data quality 

*"Data teams are often flying blind. <br />We don’t have systems and processes in place to detect problems with data.  <br />As a result, data issues remain silent. <br />The software keeps on working, but on bad data."* <br />
 > –- Tom Baeyens, CTO and Co-founder, Soda

**Data quality** is all about making sure that people in an organization can trust the data they use to make decisions. Without data that is fit for purpose, complete, valid, and timely — essentially, good quality — analysts and engineers lack confidence in the data they need to do their jobs.

Ensuring and maintaining data quality in your organization involves layers of tools and best practices.

![data-quality](/assets/images/data-quality.png){:height="600px" width="600px"}

First, setting up a **data catalog** as an organized inventory of your data assets is critical to the overall practice of ensuring data quality. Data engineers and analysts need to be able to access a trusted catalog of data, a single source of truth, where they can search for and find the most appropriate data for their business needs. Basically, a data catalog enables teams to link datasets to business concepts and processes.

**Data testing** is the straightforward practice of checking data as it enters or is transformed within your systems. Are newly created datasets empty? Has the schema changed with new columns added to a dataset? Event-driven testing in staging and production environments is the most basic practice for ensuring that additions and transformations are not corrupting your data and causing issues that have an impact downstream.

Slightly different than testing, **data monitoring** is the practice of regularly and continually checking data to confirm that it meets previously established rules and business standards for quality. This practice involves calculating metrics that are not readily retrievable in a dataset as raw metadata, such as invalid, missing, or unexpected values. Set thresholds that establish acceptable parameters for “good quality” data, then frequently test your data against those thresholds to validate that it is sound. This schedule-driven practice ensures that the systems and people who use the data to take action or make decisions are working from a reliable foundation of good-quality data.

Having set up a data catalog and started testing and monitoring your data, you can begin the work of **data profiling**. This practice involves using the outcome of the testing and monitoring to review data structure, interrelationships, and quality to figure out how best to use it for a variety of business purposes. The output of data testing and monitoring, and any visualizations that accompany the output, can help you do things like, discover patterns in the data and identify opportunities to join or otherwise connect data, or tag the data and metadata to help identify and categorize information in an organization. Data profiling could even go so far as to recommend or suggest datasets best-suited to meet a particular business objective. With solid data profiling in place, teams across the organization are much better able to self-serve when it comes to finding, understanding, and using the right data.

**Data observability** is about leveraging the raw output of data systems – metrics, logs and traces – to gain continuous visibility into the overall health of data in your systems. Data warehouses and data transformation tools, for example, produce volumes of metadata about the activity that occurs in a dataset and you can use these metadata to continually check for and anticipate issues. Where data monitoring yields "There is a problem" output, data observability tools offer more detailed view of your system’s operations, health, and performance and produce insights such as, "This process failed because of an invalid row in dataset X". Ensuring data observability is like continually taking the pulse of the data in an organization to make sure it is alive and healthy.

## Use Soda SQL and Soda Cloud to ensure data quality

**Soda SQL** and **Soda Cloud** squarely address the challenges in testing, monitoring, profiling, and gaining observability into your data. Use built-in metrics to define tests in Soda SQL or Soda Cloud that test data against quality thresholds and surface issues that occur throughout your data pipeline. Integrate Soda scans with your existing data orchestration tools to test your data at regular intervals and before or after events such as a transformation.

Use Soda Cloud to monitor and automatically detect anomalies in your data, and to notify your DevOps or Data Quality teams when bad data triggers an alert. Set a scan schedule for Soda SQL to perform routine checks that "take the pulse" of data in your systems to gauge its health. Tag your datasets and add descriptions to monitors in Soda Cloud to make it easier for colleagues to locate and leverage the right data. Soda tools help you maintain healthy, good-quality data that is ready for teams throughout your organization to trust and use to make informed decisions.


## Go further

* Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Get started with Soda SQL in a few minutes with the [Quick start tutorial]({% link soda-sql/5_min_tutorial.md %}).
* Learn how to [configure programmatic scans]({% link soda-sql/programmatic_scan.md %}) or [integrate with your data orchestration tool]({% link soda-sql/orchestrate_scans.md %}).
* Create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
* Learn more about viewing [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.