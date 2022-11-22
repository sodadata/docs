**WIP**

To connect Soda Cloud to the data sources in which you wish to run data quality scans, you must use one of two methods:
1. Install Soda Core in your environment and configure it to connect to the data sources you wish to scan.
2. Deploy a Soda Agent in a kubernetes cluster in you cloud services provider environment, such as Amazon Elastic Kubernetes Service (EKS) or Microsoft Azure Kubernetes Service (AKS). 

Setting up an agent involves accessing your cloud services provider environment, creating a Kubernetes cluster, then deploying an agent to the cluster via the command-line. If you have access to those tools and environments, you can [Deploy a Soda Agent]({% link soda-agent/deploy.md %}); if not, you may require assistance from an IT or Database Administrator in your organization to set up and deploy a Soda Agent for you. In either case, once it is set up, you can use the same agent to access multiple data sources in your infrastructure yourself from within the Soda Cloud user interface. Deploying an agent ought to be something you do very infrequently, and perhaps not more than once.