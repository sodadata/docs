---
layout: default
title: How a Soda Agent works
description: 
parent: Soda Agent
---

# How a Soda Agent works![preview](/assets/images/preview.png){:height="70px" width="70px"}

{% include banner-preview.md %}

To run scans against your data to check for quality, Soda Core needs to connect to the data sources (Snowflake, Amazon Athena, etc.). To send scan results to a Soda Cloud account, you connect Soda Core to Soda Cloud using API keys. 

If you deploy a Soda Agent in your local environment, Soda Cloud users can securely communicate with your data sources through the Agent. 

Soda Agent consists out of a Helm chart which deploys a single instance of Soda Agent's Orchestrator.
The Orchestrator will create Kubernetes Jobs and CronJobs, each using a container based on the [Soda Scan Launcher](https://github.com/sodadata/soda-scan-launcher) Docker image. That Scan Launcher is a wrapper around Soda Core and fetches instruction info from Soda Cloud and starts a Soda Core scan process.

## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}