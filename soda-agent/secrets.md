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

[Integrate with your secrets manager](#integrate-with-your-secrets-manager)<br />
[Use a values YAML file to store API key values](#use-a-values-yaml-file-to-store-api-key-values)<br />
[Use a values file to store private key authentication values](#use-a-values-file-to-store-private-key-authentication-values)<br />
[Use environment variables to store data source connection credentials](#use-environment-variables-to-store-data-source-connection-credentials)<br />
<br />

## Integrate with your secrets manager

Use External Secrets Operator (ESO) to integrate your Soda Agent with your secrets manager, such as a Hashicorp Vault, AWS Secrets Manager or Azure Key Vault, and securely reconcile the login credentials that Soda Agent uses for your data sources.

For example, imagine you use a Hashicorp Vault to store data source login credentials and your security protocol demands frequent rotation of passwords. The problem is that apps running in your Kubernetes cluster, like a Soda Agent, need access to those passwords. You can set up and configure ESO in your Kubernetes cluster to regularly reconcile externally-stored password values so that your the apps always have the credentials they need. Doing so subverts the need to manually redeploy a values YAML file with new passwords for apps like a Soda Agent, to use each time your system refreshes the passwords.

To integrate with a secret manager, you need:
* **External Secrets Operator (ESO)** which is an ECS that facilitates a connection between the Soda Agent and your secrets manager
* a **ClusterSecretStore** resource which provides all the namespaces in your Kubernetes cluster with instructions on how to access the secrets in the secrets manager
* an **ExternalSecret** resource which instructs the cluster on what values to fetch, and references the ClusterSecretStore

Read more about the <a href="https://external-secrets.io/latest/introduction/overview/" target="_blank">ESO's Resource Model</a>.

The following procedure outlines how to use ESO to integrate with a **Hashicorp Vault** that uses a KV Secrets Engine v2. Extrapolate from this procedure to integrate with another secrets manager such as <a href="https://external-secrets.io/latest/provider/aws-secrets-manager/" target="_blank">AWS Secrets Manager</a> or <a href="https://external-secrets.io/latest/provider/azure-key-vault/" target="_blank">Azure Key Vault</a>.

### Prerequisites
* You have set up a Kubernetes cluster in your cloud services environment and deployed a Soda Agent in the cluster.
* You have set up and are using a Hashicorp vault which contains the key-value pairs for your Soda Cloud account username and password: `SODA_USERNAME` and `SODA_PASSWORD`.

### Install and set up the External Secrets Operator
1. Use helm to install the External Secrets Operator from the <a href="https://charts.external-secrets.io" target="_blank">helm chart repository</a> into the same Kubernetes cluster in which you deployed your Soda Agent. 
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
3. Follow the <a href="https://developer.hashicorp.com/vault/tutorials/kubernetes/kubernetes-sidecar#install-the-vault-helm-chart" target="_blank">Hashicorp Vault instructions</a> to install the Hashicorp Vault helm chart. 
4. Follow the <a href="https://developer.hashicorp.com/vault/tutorials/kubernetes/kubernetes-sidecar#set-a-secret-in-vault" target="_blank">Hashicorp Vault instructions</a> to create a secret in which to store your Hashicorp Vault access credentials. The `ClusterSecretStore` uses this secret. This example uses a secret named `external-secrets-vault-app-role-secret-id`.
5. Create a `cluster-secret-store.yml` file for the `ClusterSecretStore` configuration. This example uses <a href="https://external-secrets.io/latest/provider/hashicorp-vault/#approle-authentication-example" target="_blank">Hashicorp Vault AppRole authentication</a>. AppRole authenticates with the vault using the <a href="https://developer.hashicorp.com/vault/docs/auth/approle" target="_blank">App Role auth mechanism</a> to access the contents of the vault. It uses the `secretRef` and `roleID` to acquire a temporary access token so that it can fetch secrets.
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
6. Deploy the `ClusterSecretStore` to your cluster.
```shell
kubectl apply -f cluster-secret-store.yaml
```
7. Create an `soda-secret.yml` file for the `ExternalSecret` configuration.
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
          property: SODA_USERNAME
        secretKey: SODA_USERNAME
  - remoteRef:
          key: local/soda
          property: SODA_PASSWORD
        secretKey: SODA_PASSWORD
  refreshInterval: 1m
  secretStoreRef:
        kind: ClusterSecretStore
        name: vault-app-role
  target:
        name: soda-agent-secrets
        template:
          data:
            soda-agent.conf: |
              SODA_USERNAME={% raw %}{{ .SODA_USERNAME }}{% endraw %}
              SODA_PASSWORD={% raw %}{{ .SODA_PASSWORD }}{% endraw %}
          engineVersion: v2
```
This example identifies:
* the `namespace` of the cluster
* two `remoteRef` configurations, including the filepath in the vault, one each for the Soda Cloud account username and password, to detail what the `ExternalSecret` must fetch from the Hashicorp Vault
* a `refreshInterval` to indicate how often the ESO must reconcile the `remoteRef` values
* the `secretStoreRef` to indicate the `ClusterSecretStore` through which to access the vault
* a `target template` that creates a file called `soda-agent.conf` into which it adds the username and password values in the `.env` format that the Soda Agent expects.
8. Deploy the `ExternalSecret` to your cluster.
```shell
kubectl -n external-secrets apply -f soda-secret.yaml
```
9. Use the following command to get the `ExternalSecret` to authenticate to the Hashicorp Vault using the `ClusterSecretStore`.
```shell
kubectl -n external-secrets get secret external-secrets-vault-app-role-secret-id
```
Output:
```shell
NAME                                        TYPE     DATA   AGE
external-secrets-vault-app-role-secret-id   Opaque   1      6h3m
```
10. Adjust ?? the Soda Agent values.yml file to use the ESO??

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


## Go further

* Learn more about [Soda Agent basic concepts]({% link soda-agent/basics.md %}).
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