---
layout: default
title: Install and Configure
description: Install and Configure
parent: Git Managed Data Contracts
nav_order: 402
---

# Install and Configure

Before you can define, test, or verify Git-managed data contracts, you need to install the Soda CLI and configure your environment.

This setup gives you full control over your contracts, letting you version them in Git, execute them locally or remotely, and integrate them into your CI/CD pipelines.


### Install the Soda CLI

Install the Soda Library using `pip`:

```
pip install -i https://pypi.dev.sodadata.io "soda-core>=4.0.0.dev1" -U
```

### Connect to Soda Cloud

If you want to **publish contracts** and **view verification results** in Soda Cloud, you’ll need to connect the CLI to your Soda Cloud account.

*Don’t have an account? [Sign up here](https://www.notion.so/1fe4e34b354b8018ba7cf4074091e87b?pvs=21) to get started.*

### Create the config file:

```
soda cloud create -f sc.yml
```

This generates a basic Soda Cloud configuration file.

### Add your API keys:

Open `sc.yml` and fill in your API key and organization details.

[Learn how to generate API keys](https://sodadata.slite.com/app/docs/TVVVH1gnAjzAQC)

### Test the connection:

```
soda cloud test -sc sc.yml
```

This ensures the CLI can authenticate and communicate with Soda Cloud.

### Configure Your Data Source

To verify a contract, Soda needs to know how to connect to your data source. You have **two options**:

### Connect with Soda Core

If you prefer to define your own connection locally (or aren’t using a Soda Agent), you can create a data source config file for **Soda Core**.

Install the required package for your data source.

For example, for PostgreSQL:

```
pip install -i https://pypi.dev.sodadata.io "soda-postgres>=4.0.0.dev1" -U
```

See the [full data source reference](https://sodadata.slite.com/app/docs/T5kBknwcgvw0ha) for supported packages and configurations.

Create the config file:

```
soda data-source create -f ds.yml
```

Open `sc.yml`  and provide the necessary credentials

For example with PostgreSQL

```
type: postgresname: postgres_dconnection:  host: localhost  port: 5432  user: soda  password:  database: default_db
```

Refer to the [Data Source Reference for Soda Core](https://slite.com/api/public/notes/T5kBknwcgvw0ha/redirect) for the configurations of each data source type.

*Avoid hardcoding secrets. Use environment variables or a secrets manager where possible.*

Test the connection:

```
soda data-source test -ds ds.yml
```

### Use an existing Data Source via Soda Agent

If your data source is already connected to Soda Cloud using a **Soda Agent** (hosted or self-hosted), you can reuse that connection without managing credentials or configs locally.

You just need to ensure you have set up the connection with Soda Cloud.

Choose the method that best fits your setup:

Use **Soda Agent** for a centralized, cloud-managed connection, or **local configuration** if you want full control within your environment.