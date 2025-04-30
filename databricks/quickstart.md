---
layout: default
title: Soda + Databricks Quickstart
description: Soda + Databricks Quickstart
nav_order: 300
---

<!-- temporal white space until we fix parent navegation -->
&nbsp;
&nbsp;

# Quickstart: Get Started with Soda

*Last modified on {% last_modified_at %}*

This quickstart shows how Soda **detects unexpected data issues** by leveraging AI powered Anonaly Detection and **prevents future problems** by using data contracts directly in Databricks.

## Scenario
This tutorial uses a demo dataset called `daily_sales`.

Imagine a data engineer at a retail company needs to maintain this dataset so their team can managa daily sales data from hundreds of stores across the country. The `daily_sales` dataset feeds executive dashboards and downstream ML models for inventory planning. Accuracy and freshness are critical.

## Set up
This tutorial is self-contained. To follow along with the demo dataset, sign up for [Soda Cloud (Beta Environment)](beta.soda.io/signup)


## Add a Data Source
[STEP BY STEP FLOW]

To follow every step of this quickstart, use the following credentials to connect your Soda instance to Databricks.

| Field            | Value   |
|------------------|---------|
| **Data Source Type** | Databricks |
| **Catalog**          | ?   |
| **Schema**           | ?   |
| **Host**             | ?   |
| **HTTP Path**        | ?   |
| **Token**            | ?   |

After the historical metric collection scan is complete (this usually takes just a few minutes), you can review the results.

## Part 1: Review Anomaly Detection Results

> **Goal:** Discover how Soda automatically detects data issues — even without prior setup — and how those issues may indicate deeper pipeline or ingestion problems.

We can start by "shifting right" and leverage Soda’s AI-powered metric observability to analyze historical data quality metrics. This helps identify anomalies that need further investigation.


### Step 1: Check `daily_sales` Metric Monitoring Dashboard
1. Go to the **Datasets** page in Soda Cloud.
2. Select the `daily_sales` dataset.
3. Open the **Metric Monitors** tab to view all automatically collected metrics.

We will focus on two metrics:
- Total Row Count
- Most Recent Timestamp (Freshness)

### Step 2: View "Total Row Count" Anomalies
[DISCUSS RESULTS, PLOT FUNCTIONALITIES, FLAG AS EXPECTED/ANOMALY ETC]

### Step 3: View "Most Recent Timestamp" Anomalies
[DISCUSS RESULTS, PLOT FUNCTIONALITIES, FLAG AS EXPECTED/ANOMALY ETC]

[HIGH-LEVEL ALGORITHM EXPLANATION DISCUSSION]


## Part 2: Atack the Issues at Source (No-Code)

Data observability and automatic metric monitoring revealed quality issues in the data. Since this data is critical, observability alone is not enough. You must define explicit rules that reflect business expectations to prevent future issues.

In this case, we can “Shift left” by defining what good data looks like. This enables proactive detection and prevention so similar issues don't happen next time.


### Step 1: Create a Data Contract.
Create a new data contract to define and enforce data quality expectations.

[UI DATA CONTRACT CREATION FLOW]

### Step 2: Publish the Contract and Verify the Data
Publish the contract and run a scan to evaluate current data against the defined rules.

[UI FLOW]

### Step 3: Review Checks Results
Review the outcomes of the contract checks to confirm whether the data meets expectations.

[UI FLOW]

## Part 3: Atack the Issues at Source (Code)

One of the beauties of Soda is its unified UI approach. It allows both business and technical users to collaborate on data quality. Where Each user can work from their preferred environment.

If you are a technical user, you can define or update data contracts from your favorite IDE using code. These changes automatically appear in Soda Cloud, where non-technical users can review results with just a few clicks.

[STEP BY STEP FLOW ON HOW TO DO THAT FROM A DATABRICKS NOTEBOOK]