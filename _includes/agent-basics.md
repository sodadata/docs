> **Soda Agent Basics**
> <br />
> There are two types of Soda Agents:
> 1. **Soda-hosted Agent:** This is an out-of-the-box, ready-to-use agent that Soda provides and manages for you. It's the quickest way to get started with Soda as it requires no installation or deployment. It supports connections to specific data sources like BigQuery, Databricks SQL, MS SQL Server, MySQL, PostgreSQL, Redshift, and Snowflake. [Soda-hosted agent (missing)](#)
> 2. **Self-hosted Agent:** This is a version of the agent that you deploy in your own Kubernetes cluster within your cloud environment (like AWS, Azure, or Google Cloud). It gives you more control and supports a wider range of data sources. [Self-hosted agent (missing)](#)
> 
> A Soda Agent is essentially Soda Library (the core scanning technology) packaged as a containerized application that runs in Kubernetes. It acts as the bridge between your data sources and Soda Cloud, allowing users to:
> - Connect to data sources securely
> - Run scans to check data quality
> - Create and manage no-code checks directly in the Soda Cloud interface
>
> The agent only sends metadata (not your actual data) to Soda Cloud, keeping your data secure within your environment. Soda [Agent basic concepts (missing)](#)