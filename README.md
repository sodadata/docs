# What is Soda?

**Soda helps data teams make sure their data can be trusted. It makes it easy to find, understand, and fix problems in the data.**

\
You can use Soda to:

* **Monitor production data** with automated, ML-powered observability that spots unexpected changes without needing to define every rule up front.
* **Define data contracts,** making expectations explicit and enabling producers and consumers to collaborate on reliable data at the source.
* **Test data earlier in the pipeline**, as part of CI/CD workflows or during development, to prevent bad data from reaching production.

Soda helps teams to _start right_ and automatically detect anomalies in metrics that have already happened. And _shift left_ to prevent issues from happening again with collaborative data contracts.

### Soda v4 vs v3

{% hint style="success" %}
This is the documentation for Soda v4. If you are still using Soda v3, head to the [v3 documentation](https://app.gitbook.com/o/ig9n9VJPAFRSFLtZKVB2/s/oV0A6Eua8LUIyWgHxsjf/).
{% endhint %}

The new version of Soda has transformed the software into a **full data-quality platform** by layering on:

* **End-to-end data observability:** [data-observability](data-observability/ "mention")
* **Collaborative data contracts:**  [data-testing](data-testing/ "mention")

This marks the shift from a CLI-centric checks engine toward a unified, observability-driven data quality platform with a refined, three-tier **Core + Agent + Cloud** architecture, built-in contracts, orchestration, and deep integrations.

> <a href="https://www.soda.io/schedule-a-demo" class="button primary">Contact us</a> to learn more about Soda's capabilities.

### What is data quality?

**Data quality** refers to how well a dataset meets the expectations of completeness, accuracy, timeliness, uniqueness, and consistency. Good data supports business goals, drives confident decision-making, and is the base for great data products.

Poor data quality causes failed pipelines, incorrect reports, and broken AI models. Managing data quality means proactively validating assumptions and reactively monitoring for drift or degradation.

Soda helps you answer questions like:

* Is the data fresh and complete?
* Are there unexpected values or duplicates?
* Did values shift outside of expected ranges?
* Are schema or contract changes causing breakage?
* Are data quality metrics changing over time?

### Key Concepts

#### Data Observability

Data observability is a reactive approach to monitoring data in production and catching unexpected issues as they emerge. It helps answer the question: What is happening with my data right now, and how is that changing over time?

Use data observability to:

* Detect anomalies in data quality metrics such as freshness, row counts, null values or custom ones
* Monitor metric trends and seasonality
* Identify late-arriving or missing records
* Get alerted when values deviate from historical norms

#### Data Testing

Data testing is a proactive approach that validates known expectations about your data during development, deployment, or transformation. It helps you catch issues before they reach production, break reports, or impact downstream systems.

Use data testing to:

* Align on what “good data” looks like through data contracts
* Verify that your data meets those expectations, including schema, values, and transformations
* **Test data at every step of the pipeline** to prevent bad data from reaching downstream systems
* Integrate with CI/CD workflows for continuous quality checks during development

#### Data Contracts

**Data contracts define what a dataset should look like, including its schema, data types, value ranges, and other constraints.**\
They establish a shared agreement between data producers and consumers about what’s expected and what must be upheld.

Both **testing** and **observability** play a role in upholding data contracts:

* **Testing** validates that data meets the contract during development, pipeline execution, and on schedule.
* **Observability** monitors contract adherence in production and detects unexpected issues.

### Data Observability vs Data Testing

While data testing and observability are different in when and how they operate, they work best together as a **unified strategy**.

<table><thead><tr><th width="211.21875">Approach</th><th>Timing</th><th>Use case</th></tr></thead><tbody><tr><td><strong>Data Testing</strong></td><td>Proactive and preventative: Pre-production, during development or CI/CD</td><td>Prevent breakages before they happen: Validate known rules and enforce contracts</td></tr><tr><td><strong>Data Observability</strong></td><td>Reactive and adaptive: In production, runtime monitoring</td><td>Monitor data behavior and changes over time with automated detection of anomalies, schema changes, and other unexpected issues.</td></tr></tbody></table>

Together, they enable end-to-end data quality management: testing prevents problems, and observability detects those that escape prevention. At the same time, observability can help prioritize which issues to address and shift left to resolve them upstream.

### Data quality at scale across the enterprise

#### Divide and conquer

Managing data quality across hundreds or thousands of datasets requires a **scalable, federated approach**. Soda enables this through:

* **Metadata-driven observability** that adapts checks to each dataset's structure and context.
* **Role-based collaboration** so teams can take ownership of the data they know best.
* **An interface for both engineering and business users**, enabling collaboration through code, UI, or APIs, depending on user preference and role.
* **Integration with existing tools and workflows**, such as data catalogs and incident management systems.
* **Pipeline** **and** **CI/CD integration** to automate data quality checks.

#### Data quality as a team sport

Reliable data depends on collaboration across roles:

* **Data engineers** embed tests and monitor pipelines to catch issues early.
* **Data producers and consumers** align on expectations through data contracts.
* **Data consumers** report issues and collaborate with producers to interpret metrics and resolve problems.
* **Governance teams** define and enforce data quality standards.
* **Platform teams** deploy, manage, and secure the underlying infrastructure.



Soda Cloud acts as the shared workspace where these roles collaborate, triage incidents, and resolve issues.

### Deployment options

Soda offers three deployment models, depending on your infrastructure and data privacy needs.

| Deployment Model      | Description                                                                                                   | Ideal For                                                      | Key Features                                                                                                                                                                                  | Considerations                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Soda Core**         | Open-source Python library (with commercial extensions) and CLI for running Data Contracts in your pipelines. | Data engineers integrating Soda into custom workflows.         | Full control over orchestration, in-memory data support, contract verification.                                                                                                               | <p><strong>No observability features</strong>.<br><br>Required for in-memory sources (e.g., Spark, DataFrames).<br><br>Data source connections managed at the environment level.</p> |
| **Soda-hosted Agent** | Managed version of Soda that runs observability features, executes Data Contracts and scheduled them.         | Teams seeking a simple, managed solution for data quality.     | Centralized data source access, no setup required, observability features enabled. Enables users to create, test, execute, and schedule contracts and checks directly from the Soda Cloud UI. | <p><strong>Required for observability features</strong>.<br><br>Cannot scan in-memory sources like Spark or DataFrames.</p>                                                          |
| **Self-hosted Agent** | Same as Soda-hosted Agent, but deployed and managed in your own Kubernetes environment.                       | Teams needing full control over infrastructure and deployment. | Similar to Soda-hosted Agent, but deployed within the customer’s environment; data stays within your network.                                                                                 | <p><strong>Required for observability features.</strong></p><p></p><p>Cannot scan in-memory sources like Spark or DataFrames.</p><p><br>Kubernetes expertise required.</p>           |

Read more about [deployment-options](deployment-options/ "mention")

### Supported data sources and integrations

Soda integrates with the modern data stack:

* **Data warehouses and databases**: Databricks, Snowflake, BigQuery, Redshift, PostgreSQL, MySQL, Spark, Presto, DuckDB, and more.
* **Orchestration platforms**: Airflow, Dagster, Prefect, Azure Data Factory.
* **Metadata tools**: Atlan, Alation, Collibra, data.world, Zeenea.
* **Cloud providers**: AWS, Google Cloud, Azure.
* **BI tools**: Looker, Tableau, Power BI.
* **Messaging and ticketing**: Slack, Microsoft Teams, Jira, PagerDuty, ServiceNow, Opsgenie.

### What’s next?

* To get started with Soda, check out the end-to-end [quickstart.md](quickstart.md "mention") guide.
