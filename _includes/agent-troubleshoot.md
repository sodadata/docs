**Problem:** Scans launched from Soda Cloud take an excessive amount of time to run.

**Solution:** Consider adjusting the number of replicas for idle workers with kubectl. Launch extra idle workers so at scan time, the agent can hand over instructions to an already running idle Scan Launcher to avoid the start-from-scratch setup time for a pod. 
1. Ensure that the agent was deployed with the `soda.core` configurations for `idle: true` and `replicas: 1` or more.
2. Run the following command to increase the number of active replicas to 2.
```shell
kubectl scale deployment/soda-agent-scanlauncher \
  --replicas 2 -n soda-agent
```