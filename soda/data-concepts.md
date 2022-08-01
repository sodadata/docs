---
layout: default
title: Data concepts
description: Data quality is all about making sure that people can trust the data they use. Ensuring data reliability involves layers of tools and best practices.
parent: Reference
redirect_from: /soda/data-monitoring.html
---

# Data concepts

*"Data teams are often flying blind. <br />We don’t have systems and processes in place to detect problems with data.  <br />As a result, data issues remain silent. <br />The software keeps on working, but on bad data."* <br />
 > –- Tom Baeyens, CTO and Co-founder, Soda

<br />

Data reliability is all about making sure that people in an organization can trust the data they use to do their jobs. Without data that is fit for purpose, complete, valid, and timely — essentially, reliable — analysts and engineers lack confidence in the data they need in their daily operations.

## Data quality vs. data reliability

It's important, when thinking about meeting this need, to consider the similar, yet distinct types of issues: **data quality issues**, and **data reliability issues**. It is the context that reveals the difference between them. 

Within an enterprise, different teams or departments create, manage, and use data differently. 
* **Operational teams** use data to manage their everyday workflows and systems. For example, these teams create and manage data in Salesforce, Jira, and Workday in their daily operations. Generally speaking, this is where data quality issues arise. 
* **Analytical teams** build data products, such as reports or machine learning models. For example, these teams ingest data, transform it to prepare it for analysis, then query it and prepare visualizations for a report to inform decisions. These teams tend to surface data reliability issues.
 
In his book, <a href="https://www.google.ca/books/edition/Applied_Reliability_and_Quality/rRp7DkTegMEC" target="_blank">Applied Reliability and Quality: Fundamentals, Methods, and Procedures</a> (2007), Balbir S. Dhillon describes quality as “the degree to which an item, function, or process satisfies the needs of users and consumers” (pg.4). Within operational data systems, the following examples qualify as data quality issues:
* missing values in an operational system rendered a report incorrect
* new values in the system don’t follow the ISO3166 country code standards anymore
* the organization mistakenly introduced a new product category called “product_name_2”


By contrast, and according to Dr. Dhillon, reliability means “the probability that an item will perform its stated mission satisfactorily for the specified time period when used under the stated conditions” (pg.3). Within analytical data systems, the following examples qualify as data reliability issues:
* not all the data from an operational system was loaded into an analytical system
* because a column was removed from a dataset, an ingestion or transformation process failed
* a significant increase in data volume resulted in late delivery of the data


Establishing and maintaining both good-quality and reliable data involves several layers of tools and best practices, including data profiling, data cataloging, and data testing and monitoring. 
* Teams have to test data as it enters or is transformed within systems. Are newly created datasets empty? Has the schema changed with new columns added to a dataset? Event-driven testing in staging and production environments is the most basic practice for surfacing data reliability issues.
* Teams must regularly and continually check data to confirm that it meets previously established rules and business standards for good-quality. This practice involves calculating metrics that are not readily retrievable in a dataset as raw metadata, such as invalid, missing, or unexpected values.
* Teams should use the output of data testing and monitoring to review structure, interrelationships, and quality to figure out how best to use the data for business purposes. Testing and monitoring output, and any visualizations that accompany it, can help teams discover patterns in the data,  identify opportunities to join or otherwise connect data, or tag the data and metadata to help identify and categorize information in an organization.

## Data observability

Context within an organization is not only important when discussing data quality and reliability; context matters when thinking about **data observability**. 

Data observability is the practice of using all of the available organizational context to understand *why* an issue is happening, with the aim of reducing the time it takes to analyze, prioritize, and resolve a data quality or data reliability issue. Observability platforms often automatically correlate contextual information and perform a variety of automated analyses to help teams determine the root cause of an issue.

Observability data, such as metrics, logs, and service level agreements, facilitate automated analyses such as:
* data lineage, "Where did the problem first occur?"
* segment analysis, "Which segment of the data contributed most to the failing rows?"
* impact assessment, "Which data products are impacted by an issue?"

## How Soda can help

Soda OSS tools squarely address the challenges in testing, monitoring, profiling, and gaining observability into your data. Use built-in metrics to define checks that test data against quality thresholds and surface issues that occur throughout your data pipeline. Integrate Soda scans with your existing data orchestration tools to test your data at regular intervals and before or after events such as a transformation.

Use Soda Cloud to monitor and automatically detect anomalies in your data, and to notify teams when bad data triggers an alert. Set a scan schedule for Soda OSS tools to perform routine checks that "take the pulse" of data in your systems to gauge its health. Tag your datasets and add descriptions to checks in Soda Cloud to make it easier for colleagues to locate and leverage the right data. 

Soda tools help you maintain reliable, good-quality data that teams throughout your organization can trust to do their jobs.


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}