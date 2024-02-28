---
name: "1.0.0"
date: 2024-02-29
products:
  - soda-agent
---

This release maps to [Soda Library 1.3.2]({% link release-notes/soda-library.md %}). <br />
Access [Soda documentation]({% link soda/upgrade.md %}#upgrade-a-soda-agent) for instructions to upgrade a Soda Agent helm chart to use the latest version of Soda Library.

#### Upgrade to 1.0.0

This release includes several key changes to the way the Soda Agent works. If you already use a Soda Agent, carefully consider the changes that Soda Agent 1.0.0 introduces and make appropriate changes to your configured parameters.

* Soda Agent 1.0.0 removes idle mode in the `scan-launcher`. The agent now starts a separate job for each scan, ensuring better concurrency and resource utilization and obviates the need for <a href="https://redis.io/docs/about/" target="_blank">Redis</a>. When you upgrade your agent, be sure to remove the following properties, if you have configured them, as they will not be supported in future releases:
    * `soda.core.idle` 
    * `soda.core.replicas`
    * `soda.scanlauncher.idle.*`
    * `soda.agent.redis.*`
    * `externalRedis`

<br />

* Soda Agent 1.0.0 no longer uses logging sidecars and, instead, offers the optional ability to produce logs as console output in plain text or JSON formats. Optionally, you can add the configure the `soda.agent.logFormat` and `soda.agent.loglevel` parameters to produce logs; see [Deploy a Soda Agent in a Kubernetes cluster]({% link soda-agent/deploy.md %}#deploy-a-soda-agent-in-a-kubernetes-cluster). When you upgrade your agent, be sure to remove the following properties, if you have configured them, as they will not be supported in future releases:
    * `loggingJsonOff`
    * `soda.agent.loggingSidecar`
    * `soda.scanlauncher.loggingSidecar` 

<br />

* Soda Agent 1.0.0 changed default value for `soda.polling.interval` to `5 seconds`. We do not recommend to change this value. if you have configured it we recommend to unset the value.

<br />

* Soda Agent 1.0.0 does not use Kubernetes Cron jobs for executing scans. When you upgrade your agent, be sure to remove the following properties, if you have configured them, as they will not be supported in future releases:
    * `soda.scanlauncher.failedJobsHistoryLimit`
    * `soda.scanlauncher.successfulJobsHistoryLimit` 

<br />

* {% include agent-fargate.md %}




