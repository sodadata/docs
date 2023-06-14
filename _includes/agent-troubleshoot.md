**Problem:** Scans launched from Soda Cloud take an excessive amount of time to run.

**Solution:** Consider adjusting the number of replicas for idle scan workers. Launch extra idle workers so at scan time, the agent can hand over instructions to an already running idle scan launcher to avoid the start-from-scratch setup time for a pod. This is especially relevant in our outlined AWS EKS Fargate setup.
1. Ensure that the agent was deployed with the `soda.scanlauncher.idle` configurations for `enabled: true` and `replicas: 1` or more.
2. Run the following command to increase the number of active replicas to 2.
```shell
kubectl scale deployment/soda-agent-scanlauncher \
  --replicas 2 -n soda-agent
```
Please be aware that this will only increase the number of idle scan launchers until another configuration value is changed via helm.
