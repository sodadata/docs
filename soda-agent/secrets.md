---
layout: default
title: Manage sensitive values for a Soda Agent
description: Learn how to manage sensitive values using Kubernetes secrets and environment variables.
parent: Soda Agent
---

# Manage sensitive values for a Soda Agent
*Last modified on {% last_modified_at %}*

When you deploy a Soda Agent to a Kubernetes cluster in your cloud service provider environment, you need to provide a few essential values that the agent needs to connect to your Soda Cloud account (API keys), and connect to your data sources (data source login credentials) so that Soda can run data quality scans on the data.

As these values are sensitive, you may wish to employ the following strategies to keep them secure.

[Use a values YAML file to store API key values](#use-a-values-yaml-file-to-store-api-key-values)<br />
[Use a values file to store private key authentication values](#use-a-values-file-to-store-private-key-authentication-values)<br />
[Use environment variables to store data source connection credentials](#use-environment-variables-to-store-data-source-connection-credentials)<br />
[Integrate with a secrets manager](#integrate-with-a-secrets-manager)<br />
<br />


## Use a values YAML file to store API key values 

When you deploy a Soda Agent from the command-line, you provide values for the API key id and API key secret which the agent uses to connect to your Soda Cloud account. You can provide these values during agent deployment in one of two ways:
* directly in the `helm install` command that deploys the agent and stores the values as <a href="https://kubernetes.io/docs/concepts/configuration/secret/" target="_blank">Kubernetes secrets</a> in your cluster; see [deploy using CLI only]({% link soda-agent/deploy.md %}#deploy-using-cli-only)<br />
OR
* in a values YAML file which you store locally but reference in the `helm install` command; see below

### Values YAML file
{% include code-header.html %}
```yaml
soda:
  apikey:
    id: "***"
    secret: "***"
  agent:
    name: "myuniqueagent"
```

#### helm install command
{% include code-header.html %}
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```

Refer to the exhaustive cloud service provider-specific instructions for more detail on how to deploy an agent using a values YAML file:
* [Deploy a Soda Agent in Amazon EKS]({% link soda-agent/deploy-aws.md %}#deploy-using-a-values-yaml-file)
* [Deploy a Soda Agent in Azure AKS]({% link soda-agent/deploy-azure.md %}#deploy-using-a-values-yaml-file)
* [Deploy a Soda agent in Google GKE]({% link soda-agent/deploy-google.md %}#deploy-using-a-values-yaml-file)


## Use a values file to store private key authentication values

If you use private key with Snowflake or Big Query, you can provide the required private key values in a `values.yml` file when you deploy or redeploy the agent.
* [Private key authentication with Snowflake]({% link soda/connect-snowflake.md %}#use-a-values-file-to-store-private-key-authentication-values)
* [Private key authentication with Big Query]({% link soda/connect-bigquery.md %}#use-a-file-reference-for-a-big-query-data-source-connection)


## Use environment variables to store data source connection credentials

When you, or someone in your organization, follows the guided steps to [create a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud, one of the steps involves providing the connection details and credentials Soda needs to connect to the data source to run scans. 

You can add those details directly in Soda Cloud, but because any user can then access these values, you may wish to store them securely in the values YAML file as environment variables. 

1. Create or edit your local [values YAML file]({% link soda-agent/deploy.md %}#deploy-using-a-values-yaml-file) to include the values for the environment variables you input into the connection configuration. 
```yaml
soda:
    apikey:
      id: "***"
      secret: "***"
    agent:
      name: "myuniqueagent"
    env:
      POSTGRES_USER: "sodalibrary"
      POSTGRES_PASS: "sodalibrary"
```
2. After adding the environment variables to the values YAML file, update the Soda Agent using the following command:
```shell
helm upgrade soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
3. In [step 2]({% link soda-cloud/add-datasource.md %}#2-connect-the-data-source) of the create a data source guided steps, add data source connection configuration which look something like the following example for a PostgreSQL data source. Note the environment variable values for username and password.
```yaml
data_source local_postgres_test:
    type: postgres
    connection:
        host: 172.17.0.7
        port: 5432
        username: ${POSTGRES_USER}
        password: ${POSTGRES_PASS}
        database: postgres
    schema: new_york
```
4. Follow the remaining guided steps to add a new data source in Soda Cloud. When you save the data source and test the connection, Soda Cloud uses the values you stored as environment variables in the values YAML file you supplied during redeployment.

## Integrate with a secrets manager

Use External Secrets Operator (ESO) to integrate your Soda Agent with your secrets manager, such as a Hashicorp Vault, AWS Secrets Manager, or Azure Key Vault, and securely reconcile the login credentials that Soda Agent uses for your data sources.

For example, imagine you use a Hashicorp Vault to store data source login credentials and your security protocol demands frequent rotation of passwords. In this situation, the challenge is that apps running in your Kubernetes cluster, such as a Soda Agent, need access to the up-to-date passwords. 

To address the challenge, you can set up and configure ESO in your Kubernetes cluster to regularly reconcile externally-stored password values so that your apps always have the credentials they need. Doing so obviates the need to manually redeploy a values YAML file with new passwords for apps running in the cluster each time your system refreshes the passwords.

The current integration of Soda Agent and a secrets manager *does not* yet support the configuration of the Soda Cloud credentials. For those credentials, use a tool such as <a href="https://github.com/jkroepke/helm-secrets" target="_blank">helm-secrets</a> or <a href="https://github.com/helmfile/vals" target="_blank">vals</a>.

To integrate Soda Agent with a secret manager, you need the following:
* **External Secrets Operator (ESO)** which is a Kubernetes operator that facilitates a connection between the Soda Agent and your secrets manager
* a **ClusterSecretStore** resource which provides a central gateway with instructions on how to access your secret backend
* an **ExternalSecret** resource which instructs the cluster on what values to fetch, and references the ClusterSecretStore

Read more about the <a href="https://external-secrets.io/latest/introduction/overview/" target="_blank">ESO's Resource Model</a>.

The following procedure outlines how to use ESO to integrate with a **Hashicorp Vault** that uses a KV Secrets Engine v2. Extrapolate from this procedure to integrate with another secrets manager such as:
* <a href="https://external-secrets.io/latest/provider/aws-secrets-manager/" target="_blank">AWS Secrets Manager</a> 
* <a href="https://external-secrets.io/latest/provider/azure-key-vault/" target="_blank">Azure Key Vault</a>

### Prerequisites
* You have set up a Kubernetes cluster in your cloud services environment and deployed a Soda Agent in the cluster.
* For the purpose of this example procedure, you have set up and are using a Hashicorp Vault which contains a key-value pair for `POSTGRES_USERNAME` and `POSTGRES_PASSWORD` at the path `local/soda`.

### Install and set up the External Secrets Operator
1. Use helm to install the External Secrets Operator from the <a href="https://charts.external-secrets.io" target="_blank">Helm chart repository</a> into the same Kubernetes cluster in which you deployed your Soda Agent. 
    ```shell
    helm repo add external-secrets https://charts.external-secrets.io

    helm install external-secrets \
       external-secrets/external-secrets \
        -n external-secrets \
        --create-namespace
    ```
2. Verify the installation using the following command:
```shell
kubectl -n external-secrets get all
```
3. Create a `cluster-secret-store.yml` file for the `ClusterSecretStore` configuration. The details in this file instruct the Soda Agent how to access the external secrets manager vault. <br />This example uses <a href="https://external-secrets.io/latest/provider/hashicorp-vault/#approle-authentication-example" target="_blank">Hashicorp Vault AppRole authentication</a>. AppRole authenticates with Vault using the <a href="https://developer.hashicorp.com/vault/docs/auth/approle" target="_blank">App Role auth mechanism</a> to access the contents of the secret store. It uses the SecretID in the Kubernetes secret, referenced by `secretRef` and the `roleID`, to acquire a temporary access token so that it can fetch secrets.<br /> Access external-secrets.io documentation for configuration examples for:
* <a href="https://external-secrets.io/latest/provider/aws-secrets-manager/" target="_blank">AWS Secrets Manager</a> 
* <a href="https://external-secrets.io/latest/provider/azure-key-vault/" target="_blank">Azure Key Vault</a>
    ```yaml
    apiVersion: external-secrets.io/v1beta1
    kind: ClusterSecretStore
    metadata:
      name: vault-app-role
    spec:
      provider:
        vault:
          auth:
            appRole:
              path: approle
              roleId: 3e****54-****-936e-****-5c5a19a5eeeb
              secretRef:
                key: appRoleSecretId
                name: external-secrets-vault-app-role-secret-id
                namespace: external-secrets
          path: kv
          server: http://vault.vault.svc.cluster.local:8200
          version: v2
    ```
4. Deploy the `ClusterSecretStore` to your cluster.
```shell
kubectl apply -f cluster-secret-store.yaml
```
5. Create an `soda-secret.yml` file for the `ExternalSecret` configuration. The details in this file instruct the Soda Agent which values to fetch from the external secrets manager vault.
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: soda-agent
  namespace: soda-agent
spec:
  data:
  - remoteRef:
          key: local/soda
          property: POSTGRES_USERNAME
        secretKey: POSTGRES_USERNAME
  - remoteRef:
          key: local/soda
          property: POSTGRES_PASSWORD
        secretKey: POSTGRES_PASSWORD
  refreshInterval: 1m
  secretStoreRef:
        kind: ClusterSecretStore
        name: vault-app-role
  target:
        name: soda-agent-secrets
        template:
          data:
            soda-agent.conf: |
              POSTGRES_USERNAME={% raw %}{{ .POSTGRES_USERNAME }}{% endraw %}
              POSTGRES_PASSWORD={% raw %}{{ .POSTGRES_PASSWORD }}{% endraw %}
          engineVersion: v2
```
This example identifies:
* the `namespace` of the Soda Agent
* two `remoteRef` configurations, including the file path in the vault, one each for `POSTGRES_USERNAME` and `POSTGRES_PASSWORD`, to detail what the `ExternalSecret` must fetch from the Hashicorp Vault
* a `refreshInterval` to indicate how often the ESO must reconcile the `remoteRef` values; this ought to correspond to the frequency with which your passwords are reset
* the `secretStoreRef` to indicate the `ClusterSecretStore` through which to access the vault
* a `target template` that creates a file called `soda-agent.conf` into which it adds the username and password values in the dotenv format that the Soda Agent expects.
6. Deploy the `ExternalSecret` to your cluster.
```shell
kubectl  apply -n soda-agent -f soda-secret.yaml
```
7. Use the following command to get the `ExternalSecret` to authenticate to the Hashicorp Vault using the `ClusterSecretStore` and fetch secrets.
```shell
kubectl get secret -n soda-agent soda-agent-secrets
```
Output:
```shell
NAME                 TYPE     DATA   AGE
soda-agent-secrets   Opaque   1      24h
```
8. Prepare a `values.yml` file to deploy the Soda Agent with the `existingSecrets` parameter that instructs it to access the `ExternalSecret` file to fetch data source login credentials. Refer to complete [deploy instructions]({% link soda-agent/deploy.md %}deploy-using-a-values-yaml-file), or [redeploy instructions]({% link soda-agent/redeploy.md %}) if you already have an agent running in a cluster.
    ```yaml
    soda:
      apikey:
        id: "154k***889"
        secret: "9sfjf****ff4"
      agent:
        name: "my-soda-agent-external-secrets"
      scanlauncher:
        existingSecrets:
          # from spec.target.name in the ExternalSecret file
          - soda-agent-secrets 
        idle:
          enabled: true
          replicas: 1
      cloud:
        # Use https://cloud.us.soda.io for US region 
        # Use https://cloud.soda.io for EU region
        endpoint: "https://cloud.soda.io"
    ```
9. Deploy the Soda Agent using the following command:
   ```bash
   helm install soda-agent soda-agent/soda-agent \
     --values values.yml \
     --namespace soda-agent
   ```
   Output:<br />
   ```shell
  NAME: soda-agent
  LAST DEPLOYED: Tue Aug 29 13:08:51 2023
  NAMESPACE: soda-agent
  STATUS: deployed
  REVISION: 1
  TEST SUITE: None
  NOTES:
  Success, the Soda Agent is now running. 
  You can inspect the Orchestrators logs if you like, but if all was configured correctly, the Agent should show up in Soda Cloud. 
  Check the logs using:
        kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent
   ```

## Go further

* Learn more about [Soda Agent basic concepts]({% link soda-agent/basics.md %}).
* Add a [new data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud that accesses your data source via a Soda Agent.
* Consider completing the [Enable end-user data quality testing]({% link soda/quick-start-end-user.md %}) guide for more context around setting up a new data source and creating a new agreement.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}