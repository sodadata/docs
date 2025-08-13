# Soda Agent Extra

When you deploy a self-hosted Soda Agent to a Kubernetes cluster in your cloud service provider environment, you need to provide several key parameters and values to ensure optimal operation and to allow the agent to connect to your Soda Cloud account (API keys), and connect to your data sources (data source login credentials) so that Soda can run data quality scans on the data.\


## Handle sensitive values <a href="#handle-sensitive-values" id="handle-sensitive-values"></a>

By default, Soda uses [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) as part of the Soda Agent deployment. The agent automatically converts any sensitive values you add to a values YAML file, or directly via the CLI, into Kubernetes Secrets.

As these values are sensitive, you may wish to employ the following alternative strategies to keep them secure.

[Use a values YAML file to store API key values](https://docs.soda.io/soda-agent/extras.html#use-a-values-yaml-file-to-store-api-key-values)\
[Use a values file to store private key authentication values](https://docs.soda.io/soda-agent/extras.html#use-a-values-file-to-store-private-key-authentication-values)\
[Use environment variables to store data source connection credentials](https://docs.soda.io/soda-agent/extras.html#use-environment-variables-to-store-data-source-connection-credentials)\
[Integrate with a secrets manager](https://docs.soda.io/soda-agent/extras.html#integrate-with-a-secrets-manager)\
[Use Soda Cloud API Keys from an existing secret](https://docs.soda.io/soda-agent/extras.html#use-soda-cloud-api-keys-from-an-existing-secret)\
\


## Use a values YAML file to store API key values <a href="#use-a-values-yaml-file-to-store-api-key-values" id="use-a-values-yaml-file-to-store-api-key-values"></a>

When you deploy a self-hosted Soda Agent from the command-line, you provide values for the API key id and API key secret which the agent uses to connect to your Soda Cloud account. You can provide these values during agent deployment in one of two ways:

* directly in the `helm install` command that deploys the agent and stores the values as [Kubernetes secrets](https://kubernetes.io/docs/concepts/configuration/secret/) in your cluster; see [deploy using CLI only](https://docs.soda.io/soda-agent/deploy.html#deploy-using-cli-only)\
  OR
* in a `values.yml` file which you store locally but reference in the `helm install` command as in the example below.

```
soda:
  apikey:
    id: "***"
    secret: "***"
  agent:
    name: "myuniqueagent"
```

```
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```

Refer to the exhaustive [cloud service provider-specific instructions](https://docs.soda.io/soda-agent/deploy.html#deploy-a-soda-agent-in-a-kubernetes-cluster) for more detail on how to deploy an agent using a values YAML file.

#### Use a values file to store private key authentication values <a href="#use-a-values-file-to-store-private-key-authentication-values" id="use-a-values-file-to-store-private-key-authentication-values"></a>

If you use private key with Snowflake or BigQuery, you can provide the required private key values in a `values.yml` file when you deploy or redeploy the agent.

* [Private key authentication with Snowflake](https://docs.soda.io/soda/connect-snowflake.html#use-a-values-file-to-store-private-key-authentication-values)
* [Private key authentication with BigQuery](https://docs.soda.io/soda/connect-bigquery.html#use-a-file-reference-for-a-big-query-data-source-connection)

## Use environment variables to store data source connection credentials <a href="#use-environment-variables-to-store-data-source-connection-credentials" id="use-environment-variables-to-store-data-source-connection-credentials"></a>

When you, or someone in your organization, follows the guided steps to use a self-hosted Soda Agent to [add a data source](https://docs.soda.io/soda-agent/deploy.html#add-a-new-data-source) in Soda Cloud, one of the steps involves providing the connection details and credentials Soda needs to connect to the data source to run scans.

You can add those details directly in Soda Cloud, but because any user can then access these values, you may wish to store them securely in the values YAML file as environment variables.

1.  Create or edit your local values YAML file to include the values for the environment variables you input into the connection configuration.

    ```
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
2.  After adding the environment variables to the values YAML file, update the Soda Agent using the following command:

    ```
    helm upgrade soda-agent soda-agent/soda-agent \
      --values values.yml \
      --namespace soda-agent
    ```
3.  In [step 2](https://docs.soda.io/soda-agent/deploy.html#2-connect-the-data-source) of the add a data source guided steps, add data source connection configuration which look something like the following example for a PostgreSQL data source. Note the environment variable values for username and password.

    ```
    data_source local_postgres_test:
     type: postgres
     host: 172.17.0.7
     port: 5432
     username: ${POSTGRES_USER}
     password: ${POSTGRES_PASS}
     database: postgres
     schema: new_york
    ```
4. Follow the remaining guided steps to add a new data source in Soda Cloud. When you save the data source and test the connection, Soda Cloud uses the values you stored as environment variables in the values YAML file you supplied during redeployment.

## Integrate with a secrets manager <a href="#integrate-with-a-secrets-manager" id="integrate-with-a-secrets-manager"></a>

Use External Secrets Operator (ESO) to integrate your self-hosted Soda Agent with your secrets manager, such as a Hashicorp Vault, AWS Secrets Manager, or Azure Key Vault, and securely reconcile the login credentials that Soda Agent uses for your data sources.

Say you use a Hashicorp Vault to store data source login credentials and your security protocol demands frequent rotation of passwords. In this situation, the challenge is that apps running in your Kubernetes cluster, such as a Soda Agent, need access to the up-to-date passwords.

To address the challenge, you can set up and configure ESO in your Kubernetes cluster to regularly reconcile externally-stored password values so that your apps always have the credentials they need. Doing so obviates the need to manually redeploy a values YAML file with new passwords for apps running in the cluster each time your system refreshes the passwords.

The current integration of Soda Agent and a secrets manager _does not_ yet support the configuration of the Soda Cloud credentials. For those credentials, use a tool such as [helm-secrets](https://github.com/jkroepke/helm-secrets) or [vals](https://github.com/helmfile/vals).

To integrate Soda Agent with a secret manager, you need the following:

* **External Secrets Operator (ESO)** which is a Kubernetes operator that facilitates a connection between the Soda Agent and your secrets manager
* a **ClusterSecretStore** resource which provides a central gateway with instructions on how to access your secret backend
* an **ExternalSecret** resource which instructs the cluster on what values to fetch, and references the ClusterSecretStore

Read more about the [ESO’s Resource Model](https://external-secrets.io/latest/introduction/overview/).

The following procedure outlines how to use ESO to integrate with a **Hashicorp Vault** that uses a KV Secrets Engine v2. Extrapolate from this procedure to integrate with another secrets manager such as:

* [AWS Secrets Manager](https://external-secrets.io/latest/provider/aws-secrets-manager/)
* [Azure Key Vault](https://external-secrets.io/latest/provider/azure-key-vault/)

### **Prerequisites**

* You have set up a Kubernetes cluster in your cloud services environment and deployed a self-hosted Soda Agent in the cluster.
* For the purpose of this example procedure, you have set up and are using a Hashicorp Vault which contains a key-value pair for `POSTGRES_USERNAME` and `POSTGRES_PASSWORD` at the path `local/soda`.

### **Install and set up the External Secrets Operator**

Consider referencing the [use case guide](https://docs.soda.io/soda/quick-start-secrets.html) for integrating an External Secrets Manager with a Soda Agent which offers step-by-step instructions to set everything up locally to see the integration in action.

1.  Use helm to install the External Secrets Operator from the [Helm chart repository](https://charts.external-secrets.io/) into the same Kubernetes cluster in which you deployed your Soda Agent.

    ```
     helm repo add external-secrets https://charts.external-secrets.io

     helm install external-secrets \
        external-secrets/external-secrets \
         -n external-secrets \
         --create-namespace
    ```
2.  Verify the installation using the following command:

    ```
    kubectl -n external-secrets get all
    ```
3. Create a `cluster-secret-store.yml` file for the `ClusterSecretStore` configuration. The details in this file instruct the Soda Agent how to access the external secrets manager vault.\
   This example uses [Hashicorp Vault AppRole authentication](https://external-secrets.io/latest/provider/hashicorp-vault/#approle-authentication-example). AppRole authenticates with Vault using the [App Role auth mechanism](https://developer.hashicorp.com/vault/docs/auth/approle) to access the contents of the secret store. It uses the SecretID in the Kubernetes secret, referenced by `secretRef` and the `roleID`, to acquire a temporary access token so that it can fetch secrets.\
   Access external-secrets.io documentation for configuration examples for:
   * [AWS Secrets Manager](https://external-secrets.io/latest/provider/aws-secrets-manager/)
   *   [Azure Key Vault](https://external-secrets.io/latest/provider/azure-key-vault/)

       ```
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
4.  Deploy the `ClusterSecretStore` to your cluster.

    ```
    kubectl apply -f cluster-secret-store.yaml
    ```
5.  Create an `soda-secret.yml` file for the `ExternalSecret` configuration. The details in this file instruct the Soda Agent which values to fetch from the external secrets manager vault.

    ```
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
               POSTGRES_USERNAME={{ .POSTGRES_USERNAME }}
               POSTGRES_PASSWORD={{ .POSTGRES_PASSWORD }}
           engineVersion: v2
    ```

    This example identifies:

    * the `namespace` of the Soda Agent
    * two `remoteRef` configurations, including the file path in the vault, one each for `POSTGRES_USERNAME` and `POSTGRES_PASSWORD`, to detail what the `ExternalSecret` must fetch from the Hashicorp Vault
    * a `refreshInterval` to indicate how often the ESO must reconcile the `remoteRef` values; this ought to correspond to the frequency with which your passwords are reset
    * the `secretStoreRef` to indicate the `ClusterSecretStore` through which to access the vault
    * a `target template` that creates a file called `soda-agent.conf` into which it adds the username and password values in the dotenv format that the Soda Agent expects.
6.  Deploy the `ExternalSecret` to your cluster.

    ```
    kubectl  apply -n soda-agent -f soda-secret.yaml
    ```
7.  Use the following command to get the `ExternalSecret` to authenticate to the Hashicorp Vault using the `ClusterSecretStore` and fetch secrets.

    ```
    kubectl get secret -n soda-agent soda-agent-secrets
    ```

    Output:

    ```
    NAME                 TYPE     DATA   AGE
    soda-agent-secrets   Opaque   1      24h
    ```
8.  Prepare a `values.yml` file to deploy the Soda Agent with the `existingSecrets` parameter that instructs it to access the `ExternalSecret` file to fetch data source login credentials. Refer to complete [deploy instructions](https://docs.soda.io/soda-agent/deploy.html#deploy-using-a-values-yaml-file), or [redeploy instructions](https://docs.soda.io/soda/upgrade.html#redeploy-a-soda-agent) if you already have an agent running in a cluster.

    ```
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
       cloud:
         # Use https://cloud.us.soda.io for US region 
         # Use https://cloud.soda.io for EU region
         endpoint: "https://cloud.soda.io"
    ```
9.  Deploy the Soda Agent using the following command:

    ```
    helm install soda-agent soda-agent/soda-agent \
      --values values.yml \
      --namespace soda-agent
    ```

    Output:\


    ```
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

\


## Use Soda Cloud API Keys from an existing secret <a href="#use-soda-cloud-api-keys-from-an-existing-secret" id="use-soda-cloud-api-keys-from-an-existing-secret"></a>

By default, the Soda Agent creates a secret for storing the Soda Cloud API Key details securely in your cluster. If you want to use a different secret, you can point the Soda Agent to an existing Kubernetes Secret in your cluster using the `soda.apikey.existingSecret` property.

To use an existing Kubernetes secret for Soda Agent’s Cloud API credentials, add `existingSecret` and the `secretKeys` values to your agent’s values YAML file, as in the following example.

```
soda:
  apikey:
    existingSecret: "<existing-secret-name>"
    secretKeys:
      idKey: "<key-for-api-id>"
      secretKey: "<key-for-api-secret>"
```

## Optimize performance <a href="#optimize-performance" id="optimize-performance"></a>

The default Soda Agent settings balance performance and cost-efficiency. You can adjust these settings to better suit your needs, optimizing for larger datasets, faster scans, or improved resource management.

### Change sample data and failed rows memory limits <a href="#change-sample-data-and-failed-rows-memory-limits" id="change-sample-data-and-failed-rows-memory-limits"></a>

The hard query cursor limit setting controls how many rows Soda Library can store in memory during a scan. By default, this value is 10,000 rows, preventing Out-Of-Memory (OOM) errors by capping the number of rows Soda holds in memory at any given time.

If you need to work with larger sets of sample data or failed rows, you can raise the `query_cursor_hard_limit`. Be aware that if you increase or remove the limit, you must ensure that the Soda Agent has enough memory to prevent it from causing OOM errors.

To turn off the limit completely, set the value of `query_cursor_hard_limit` to `null`.

The example below demonstrates how you can clear the limit and increase the memory limit using settings in your `values.yml` file:

```
soda:
  scanlauncher:
    config:
      query_cursor_hard_limit: null
    resources:
      limits:
        memory: 2Gi
```
