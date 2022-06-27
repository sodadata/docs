---
layout: default
title: Soda product comparison
description: Review a set of matrices that illustrate the features and functionality available with different Soda products.
parent: Get started
---

# Soda product comparison

Use these matrices to review the features and functionality that Soda products have to offer.

[Set up](#set-up)<br />
[Write checks](#write-checks)<br />
[Collaborate](#collaborate)<br />
[Run scans](#run-scans)<br />
[Integrate](#integrate)<br />
[Gain insight](#gain-insight)<br />
[Go further](#go-further)

![legend-matrix](/assets/images/legend-matrix.png){:height="120px" width="120px"}
<br />
<br />

## Set up

| Feature or functionality |  ![soda-core-logo](/assets/images/soda-core-logo.png){:height="110px" width="110px"} <br />**+** ![sodacl-logo](/assets/images/sodacl-logo.png){:height="75px" width="75px"} |![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="150px" width="150px"} | 
|--------|:---------:|:---------:|
| Install in your environment via `pip install`| ![done](/assets/images/done.png){:height="20px" width="20px"}  |  |
| Connect to a data source via configurations in a YAML file| ![done](/assets/images/done.png){:height="20px" width="20px"}  |  |
| Connect to a data source via a web app user interface| | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
| Manage user access to your organization's Soda Cloud account. | | ![done](/assets/images/done.png){:height="20px" width="20px"} | 
| Set up Single sign-on for Soda Cloud so that all users in your organization must use your IdP to access it | | ![done](/assets/images/done.png){:height="20px" width="20px"} | 

## Write checks

| Feature or functionality |  ![soda-core-logo](/assets/images/soda-core-logo.png){:height="110px" width="110px"} <br />**+** ![sodacl-logo](/assets/images/sodacl-logo.png){:height="75px" width="75px"} |![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="150px" width="150px"} | 
|--------|:---------:|:---------:|
| Discover datasets of a newly-connected data source |  | ![done](/assets/images/done.png){:height="20px" width="20px"} |
| Define new checks in a checks YAML file  | ![done](/assets/images/done.png){:height="20px" width="20px"} |  |
| Define new checks in a web app user interface  |  | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
| Use historic measurements of data when defining checks  | ![done](/assets/images/done.png){:height="20px" width="20px"} | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
| Use built-in metrics to write checks | ![done](/assets/images/done.png){:height="20px" width="20px"} | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
| Use your own custom metrics to write checks | ![done](/assets/images/done.png){:height="20px" width="20px"} | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
| Include SQL queries in checks for data quality  | ![done](/assets/images/done.png){:height="20px" width="20px"} | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
| Use SodaCL to write human-readable checks for data quality | ![done](/assets/images/done.png){:height="20px" width="20px"}  | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
| Define an anomaly detection check  | ![done](/assets/images/done.png){:height="20px" width="20px"} | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
| Define a schema check | ![done](/assets/images/done.png){:height="20px" width="20px"} | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
| Apply freshness checks, reference checks, and row-count comparisons between datasets  | ![done](/assets/images/done.png){:height="20px" width="20px"} | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |

## Collaborate

| Feature or functionality |  ![soda-core-logo](/assets/images/soda-core-logo.png){:height="110px" width="110px"} <br />**+** ![sodacl-logo](/assets/images/sodacl-logo.png){:height="75px" width="75px"} |![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="150px" width="150px"} | 
|--------|:---------:|:---------:|
| Invite colleagues to join your Soda Cloud account to collaborate on writing checks and monitoring data quality  |  | ![done](/assets/images/done.png){:height="20px" width="20px"} |
| Create and manage data quality incidents, including an integration with Slack to collaborate on investigations  |  | ![done](/assets/images/done.png){:height="20px" width="20px"} |
| Prepare service level agreements for data quality with stakeholders in your organization |  | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |

## Run scans

| Feature or functionality |   ![soda-core-logo](/assets/images/soda-core-logo.png){:height="110px" width="110px"} <br />**+** ![sodacl-logo](/assets/images/sodacl-logo.png){:height="75px" width="75px"} |![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="150px" width="150px"} | 
|--------|:---------:|:---------:|
| Run an *ad hoc* scan  | ![done](/assets/images/done.png){:height="20px" width="20px"} |  |
| Define a scan schedule  |  | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
|Configure programmatic scans | ![done](/assets/images/done.png){:height="20px" width="20px"} |  |
|Define filters to test specific portions of data for quality   | ![done](/assets/images/done.png){:height="20px" width="20px"} |![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |


## Integrate

| Feature or functionality |  ![soda-core-logo](/assets/images/soda-core-logo.png){:height="110px" width="110px"} <br />**+** ![sodacl-logo](/assets/images/sodacl-logo.png){:height="75px" width="75px"} |![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="150px" width="150px"} | 
|--------|:---------:|:---------:|
| Integrate with AirFlow to automate scans and actions proceeding from scan results  | ![done](/assets/images/done.png){:height="20px" width="20px"} |  |
| Integrate with Slack to send notifications of data quality issues and investigate incidents | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} | ![done](/assets/images/done.png){:height="20px" width="20px"} |
| Integrate with Alation or Metaphor to view data quality details from within your data catalog. |  | ![done](/assets/images/done.png){:height="20px" width="20px"} |
| Integrate with dbt to view dbt tests from within Soda Cloud. |  | ![done](/assets/images/done.png){:height="20px" width="20px"} |

## Gain insight

| Feature or functionality |  ![soda-core-logo](/assets/images/soda-core-logo.png){:height="110px" width="110px"} <br />**+** ![sodacl-logo](/assets/images/sodacl-logo.png){:height="75px" width="75px"} |![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="150px" width="150px"} | 
|--------|:---------:|:---------:|
| Take advantage of automatic data profiling for datasets and columns |  | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"} |
| View charts to gain visibility into stored measurements for a metric over time |  | ![done](/assets/images/done.png){:height="20px" width="20px"} |
| Set up notifications to alert your team of data quality failures and warnings | ![almost-done](/assets/images/almost-done.png){:height="20px" width="20px"}  | ![done](/assets/images/done.png){:height="20px" width="20px"} |
| View samples of rows that failed a check  |  | ![done](/assets/images/done.png){:height="20px" width="20px"} |
| Use an API to gain insight into the health of your dataset and your Soda Cloud account user activity  |  | ![done](/assets/images/done.png){:height="20px" width="20px"}  |



## Go further

* Learn more about [Soda products in general]({% link soda/product-overview.md %}) and how the work together to establish and maintain data reliability.
* Questions? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Get up and running in a few minutes using the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}).
<br />

---
{% include docs-footer.md %}