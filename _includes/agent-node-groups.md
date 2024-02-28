Soda Agent 1.0.0 favors manged or self-managed node groups over AWS Fargate, AKS Virtual Nodes, or GKE Autopilot profiles. Though this version of the agent still works with those profiles, the scan performance is slower because the profiles provision new nodes for each scan. To migrate your agent to a managed node group: 
1. Add a managed node group to your Kubernetes cluster.
2. Check your cloud-services provider's recommendations for node size and adapt it for your needs based on volume of scans you anticipate. Best practice dictates that you set your cluster to have at least 2 CPU and 2GB of RAM, which, in general is sufficient to run up to six scans in parallel.
3. [Upgrade to Soda Agent 1.0.0]({% link soda/upgrade.md %}#upgrade-a-self-hosted-soda-agent), configuring the helm chart to *not* use Fargate, Virtual Nodes, or GKE Autopilot by:
      * removing the `provider.eks.fargate.enabled` property, or setting the value to `false`
      * removing the `provider.aks.virtualNodes.enabled` property, or setting the value to `false`
      * removing the `provider.gke.autopilot.enabled` property, or setting the value to `false`
      * removing the `soda.agent.target` property
4. Remove the Fargate profiles, and drain existing workloads from virtual nodes in the namespace in which you deployed the Soda Agent so that the agent uses the node group to execute scans, not the profiles.