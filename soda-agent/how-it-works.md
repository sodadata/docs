---
layout: default
title: How a Soda Agent works
description: 
parent: Soda Agent
---

# How a Soda Agent works ![preview](/assets/images/preview.png){:height="70px" width="70px"}

{% include banner-preview.md %}

To run scans against your data to check for quality, Soda Core needs to connect to the data sources (Snowflake, Amazon Athena, etc.). To send scan results to a Soda Cloud account, you connect Soda Core to Soda Cloud using API keys. 

If you deploy a Soda Agent in your local environment, Soda Cloud users can securely communicate with your data sources through the Agent. 

Soda Agent consists out of a Helm chart which deploys a single instance of Soda Agent's Orchestrator.
The Orchestrator will create Kubernetes Jobs and CronJobs, each using a container based on the [Soda Scan Launcher](https://github.com/sodadata/soda-scan-launcher) Docker image. That Scan Launcher is a wrapper around Soda Core and fetches instruction info from Soda Cloud and starts a Soda Core scan process.



The Soda Agent Helm chart deploys:
Orchestrator Deployment
A Kubernetes Deployment which launches a single copy for the Orchestrator. If the Orchestrator gets killed, it will automatically be re-created as part of the default Kubernetes Deployment behaviour.
> kubectl get deploy -n soda-agent
NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
soda-agent-orchestrator   1/1     1            1           27d
The orchestrator pod:
kubectl get pods  -n soda-agent
NAME                                                            READY   STATUS              RESTARTS   AGE
sa-cj-anotherxnycxbusxbreakdownxdailyxmidnight-27580440-5d7pl   0/2     Completed           0          10h
sa-cj-bastienxeveryxx-27581080-l2zhc                            0/2     Completed           0          13m
....
sa-cj-nyxbusxbreakdownxonxawsdev-27580320-ngjx4                 0/2     Completed           0          12h
sa-cj-redshiftxtickitxonxawsdev-27581047-qjt9h                  0/2     Completed           0          46m
sa-cj-redshiftxtickitxonxawsdevxxatttemptxx-27579850-z7pnw      0/2     Completed           0          20h
sa-cj-testingxdailyxmidnight-27580320-sfpjb                     0/2     Completed           0          12h
soda-agent-orchestrator-5975ddcd9-5b5qr                         2/2     Running             0          7h51m
ubuntu                                                          1/1     Running             2          17d
In the above list you see a number of jobs which were launched as part of a scheduled CronJob + a debug Ubuntu based container (see elsewhere in this doc).
You can get the Orchestrator pod using a more targeted query (using labels):
kubectl get pods -l agent.soda.io/component=orchestrator -n soda-agent
NAME                                      READY   STATUS    RESTARTS   AGE
soda-agent-orchestrator-5975ddcd9-5b5qr   2/2     Running   0          7h50m
Secrets
3 secrets are currently in use by the Agent:
> kubectl get secrets -n soda-agent
...
soda-agent-apikey                       Opaque                                2      27d
soda-agent-id                           Opaque                                3      27d
soda-agent-sa                           Opaque                                4      17d
soda-agent-apikey: stores the Soda Cloud API credentials
soda-agent-id: stores the Agent ID once registered (and DD API key if defined)
soda-agent-sa: stores user defined environment variables
ConfigMap
Two actively used ConfigMaps:
> kubectl get configmaps -n soda-agent
...
logging-config       2      15d
orchestrator-state   1      27d
logging-config: holds the fluent-bit logging sidecar config (if it is deployed)
orchestrator-state: holds a list of (active) submitted scan jobs on the cluster
Jobs and CronJobs
The Orchestrator will launch (based on the needs):
a Kubernetes Job for each ad-hoc scan being requested by Soda Cloud
a Kubernetes CronJob for each scheduled scan expected to exist by Soda Cloud
Example for getting the ad hoc scans (Jobs) launched by the Orchestrator :
kubectl get jobs -l agent.soda.io/component=job -n soda-agent
NAME              COMPLETIONS   DURATION   AGE
sa-job-621f3d9e   0/1           2m13s      2m13s
Please note: it gets the Jobs, which in turn create a pod. You can fetch the corresponding pods by issues (check the custom label):
kubectl get pods -l job-name=sa-job-621f3d9e -n soda-agent
NAME                    READY   STATUS    RESTARTS   AGE
sa-job-621f3d9e-699qq   2/2     Running   0          5m7s
Example for getting the scheduled scans (CronJobs) launched by the Orchestrator :
> kubectl get cronjobs -l agent.soda.io/component=cronjob -n soda-agent
NAME                                             SCHEDULE        SUSPEND   ACTIVE   LAST SCHEDULE   AGE
sa-cj-anotherxnycxbusxbreakdownxdailyxmidnight   0 2 * * *       False     0        11h             2d2h
sa-cj-bastienxeveryxx                            */10 * * * *    False     1        2m42s           2d2h
sa-cj-bastienxnyxbreakdownxdailyxmidnight        0 0 * * *       False     0        13h             2d2h
sa-cj-bastienxtestxprofxallxcolsxeveryxxx        */15 * * * *    False     1        2m42s           2d2h
sa-cj-bastienxtestxregxxxmin                     */10 * * * *    False     1        2m42s           2d2h
sa-cj-bbxhourly                                  0 * * * *       False     0        32m             2d2h
sa-cj-bbxxxxxxxxxeveryxxx                        */15 * * * *    False     1        2m42s           2d2h
sa-cj-benjaminsxtestxtestxdailyxmidnight         10 10 * * TUE   False     0        <none>          2d2h
sa-cj-benjaminxnyxbusxbreakdownxdailyxmidnight   1 * * * *       False     0        31m             2d2h
These CronJobs will in turn launch Jobs at the scheduled time, Jobs which will in turn launch a Pod.
For example to get all the jobs related to the cronjob named bastienxeveryxx, you can issue (see the label for filtering):
> kubectl get jobs -l cronjob_name=bastienxeveryxx -n soda-agent
NAME                             COMPLETIONS   DURATION   AGE
sa-cj-bastienxeveryxx-27581140   1/1           7m1s       13m
sa-cj-bastienxeveryxx-27581150   0/1           3m42s      3m42s
And for the corresponding pods (same label):
> kubectl get pods -l cronjob_name=bastienxeveryxx -n soda-agent
NAME                                   READY   STATUS      RESTARTS   AGE
sa-cj-bastienxeveryxx-27581140-zqss7   0/2     Completed   0          16m
sa-cj-bastienxeveryxx-27581150-bvtdq   0/2     Completed    0          6m33s

## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}