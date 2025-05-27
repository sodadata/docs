---
layout: default
title: What is Soda?
description: What is Soda?
nav_order: 2
---

<!-- empty lines -->
&nbsp;
&nbsp;

# What is Soda?
*Last modified on {% last_modified_at %}*

**Soda helps data teams build reliable data products and pipelines** by making it easy to test and monitor data quality. Whether you're testing data during development with CI/CD tests, "starting right" with metrics observability, or "shifting left" with data testing and contracts to resolve issues upstream, Soda enables teams to detect issues early, collaborate on resolutions, and ensure trust in data across the entire organization.

## What is data quality?

Data quality refers to how well a dataset meets the expectations of completeness, accuracy, timeliness, uniqueness, and consistency. High-quality data supports business goals, drives confident decision-making, and underpins successful data products.
Poor data quality causes failed pipelines, incorrect reports, and broken AI models. Managing data quality means proactively validating assumptions and reactively monitoring for drift or degradation.

Soda helps you answer questions like:
- Is the data fresh and complete?
- Are there unexpected nulls or duplicates?
- Did values shift outside of expected ranges?
- Are schema or contract changes causing breakage?
- Are data quality metrics changing over time?

## Key Concepts

### Data Observability

Data observability is a reactive approach to monitor data in production and catch unexpected issues as they emerge. It helps answer the question: What is happening with my data right now, and how is that changing over time?

**Use data observability to:**

- Detect anomalies in data quality metrics such as freshness, row counts, or null values
- Monitor metric trends and seasonality
- Identify late-arriving or missing records
- Get alerted when values deviate from historical norms

### Data Testing

Data testing is a proactive approach that validates known expectations about your data during development, deployment, or transformation. It helps catch issues before they affect downstream systems.

Use data testing to:

- Enforce data contracts
- Validate assumptions in transformation logic
- Compare source and target datasets
- Integrate with CI/CD workflows

### Data Contracts

Data contracts define what a dataset should look like—its schema, types, ranges, and constraints. They form the agreement between producing and consuming teams. Testing and observability both help enforce and validate these contracts in development and production.

## Data Observability vs Data Testing

While data testing and observability are different in when and how they operate, they work best together as a **unified strategy**.

| **Approach**         | **Timing**                     | **Use Case**                                              |
|----------------------|--------------------------------|----------------------------------------------------------|
| Data Testing         | Pre-production / early pipeline | Validate known rules, enforce contracts, prevent breakages |
| Data Observability   | Production / runtime monitoring | Detect unknown unknowns, monitor trends, alert on anomalies |

Together, they enable end-to-end data quality management: testing prevents problems, and observability detects those that escape prevention. At the same time, observability can help prioritize which issues to address and shift left to resolve them upstream.

## Data quality at scale across the enterprise

### Divide and conquer

Managing data quality across hundreds or thousands of datasets requires a **scalable, federated approach**. Soda enables this through:

- CI/CD integration to validate pipelines automatically
- Metadata-driven observability that adapts to each dataset
- Declarative checks that scale across datasets

### Data quality as a team sport

Reliable data depends on collaboration across roles:

- **Data engineers** embed tests and monitor pipelines.
- **Data consumers** define tests, report issues and interpret metrics.
- **Governance teams** enforce contracts and standards.
- **Platform teams** deploy and secure the infrastructure.

Soda Cloud acts as the shared workspace where these roles collaborate, triage incidents, and resolve issues.

## Deployment options

Soda offers three deployment models, depending on your infrastructure and data privacy needs.

### Self-operated deployment

Install **Soda Core** locally and connect to Soda Cloud using API keys. Your data stays in your environment, while metadata and results are sent to Soda Cloud for monitoring, alerting, and collaboration.

By default, your data stays within your private network. See [Data security and privacy (missing)](https://deploy-preview-947--jovial-piroshki-65ff4d.netlify.app/soda/overview#) for more details. To learn more about how to set up a self-operated deployment check out [Self-operated deployment guide (missing)](https://deploy-preview-947--jovial-piroshki-65ff4d.netlify.app/soda/overview#)

Best for: Organizations prioritizing full control over data access.

![with-library](/assets/images/with-library.png){:height="500px" width="500px"}

### Soda-hosted deployment

Connect data sources directly to **Soda Cloud**, with Soda managing the scanning infrastructure. No code needed. Use the UI to define checks, monitor metrics, and share insights.

Best for: Fast setup, ease of use, and no infrastructure overhead.

![with-managed-agent](/assets/images/with-managed-agent.png){:height="60px" width="600px"}

### Self-hosted deployment

Run **Soda Library** in your own Kubernetes cluster, with Soda Cloud for UI and collaboration. This deployment option gives infrastructure teams full control over how Soda accesses data while still enabling Soda Cloud users to write and view checks. Checks can be written programmatically or through the UI.

To learn more about how to set up a self-hosted deployment check out [Self-hosted deployment guide (missing)](https://deploy-preview-947--jovial-piroshki-65ff4d.netlify.app/soda/overview#)

Best for: Enterprises needing full control within a managed Kubernetes environment.

![with-agent](/assets/images/with-agent.png){:height="60px" width="600px"}

## Supported data sources and integrations

Soda integrates with the modern data stack:

- **Data warehouses and databases**: BigQuery, Snowflake, Redshift, Databricks, PostgreSQL, Spark, Presto, DuckDB, and more.
- **Orchestration platforms**: Airflow, Dagster, Prefect, dbt, Azure Data Factory.
- **Metadata tools**: Atlan, Alation, Collibra, data.world, Zeenea.
- **Cloud providers**: AWS, Google Cloud, Azure.
- **BI tools**: Looker, Tableau, Power BI.
- **Messaging and ticketing**: Slack, Microsoft Teams, Jira, PagerDuty, ServiceNow, Opsgenie.

## What’s next?

- To get started with Soda, check out the end-to-end [Quickstart](quickstart.md) guide.