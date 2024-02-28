Soda Agent 1.0.0 favors manged or self-managed node groups over AWS Fargate, AKS Virtual Nodes or GKE Autopilot profiles. Though this version still works with those, but it leads to slower scan times due to new node provisioning for each scan. To migrate your agent to a managed node group: 
1. Add a managed node group to your Kubernetes cluster.
2. Check Cloud provider recommendations for node size and adapt it for your needs based on volume of scans you anticipate. We recommend your cluster to have at least 2 CPU and 2GB of RAM, which in general is sufficient to run up to six scans in parallel.
3. [Upgrade to Soda Agent 1.0.0]({% link soda/upgrade.md %}#upgrade-a-soda-agent), configuring the helm chart to *not* use Fargate, Virtual Nodes or GKE Autopilot by:
   - removing the `provider.eks.fargate.enabled` property, or setting the value to `false`
   - removing the `provider.aks.virtualNodes.enabled` property, or setting the value to `false`
   - removing the `provider.gke.autopilot.enabled` property, or setting the value to `false`
   - removing the `soda.agent.target` property
4. Remove the Fargate profiles, Drain Existing Workloads from Virtual Nodes in the namespace in which you deployed the Soda Agent so that the agent uses the node group to execute scans.