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

[Store Kubernetes secrets](#store-kubernetes-secrets)<br />
[Use a values YAML file to store API key values](#use-a-values-yaml-file-to-store-api-key-values)<br />
[Use environment variables to store data source connection credentials](#use-environment-variables-to-store-data-source-connection-credentials)<br />
<br />

## Store Kubernetes secrets

Kubernetes uses the concept of Secrets that the Soda Agent Helm chart employs to store connection secrets that you specify as values during the Helm release of the Soda Agent. Depending on your cloud provider, you can arrange to store these Secrets in a specialized storage such as <a href="https://learn.microsoft.com/en-us/azure/key-vault/general/basic-concepts" target="_blank">Azure Key Vault</a> or <a href="https://docs.aws.amazon.com/kms/latest/developerguide/overview.html" target="_blank">AWS Key Management Service (KMS)</a>.

## Use a values YAML file to store API key values 

When you deploy a Soda Agent from the command-line, you provide values for the API key id and API key secret which the agent uses to connect to your Soda Cloud account. You can provide these values during agent deployment in one of two ways:
* directly in the `helm install` command that deploys the agent and stores the values as <a href="https://kubernetes.io/docs/concepts/configuration/secret/" target="_blank">Kubernetes secrets</a> in your cluster; see [deploy using CLI only]({% link soda-agent/deploy.md %}#deploy-using-cli-only)<br />
OR
* in a values YAML file which you store locally but reference in the `helm install` command; see below

### Values YAML file

```yaml
soda:
  apikey:
    id: "your-agent-api-key-id"
    secret: "your-agent-api-key-secret"
  agent:
    name: "your-unique-agent-name"
#### helm install command

```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```

Refer to the exhaustive cloud service provider-specific instructions for more detail on how to deploy an agent using a values YAML file:
* [Deploy to EKS]({% link soda-agent/deploy-aws.md %}#deploy-using-a-values-yaml-file)
* [Deploy to AKS]({% link soda-agent/deploy-azure.md %}#deploy-using-a-values-yaml-file)


## Use environment variables to store data source connection credentials

When you, or someone in your organization, follows the guided steps to [create a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud, one of the steps involves providing the connection details and credentials Soda needs to connect to the data source to run scans. You can add those details directly in Soda Cloud, but because any user can then access these values, you may wish to store them securely in the values YAML file as environment variables. 

1. Create or edit your local [values YAML file]({% link soda-agent/deploy.md %}#deploy-using-a-values-yaml-file) to include the values for the environment variables you input into the connection configuration. 
```yaml
soda:
  apikey:
    id: "your-agent-api-key-id"
    secret: "your-agent-api-key-secret"
  agent:
    name: "your-unique-agent-name"
  env:
    POSTGRES_USER: "sodacore"
    POSTGRES_PASS: "sodacore"
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
* Consider completing the [Quick start for Soda Cloud (Preview)]({% link soda/quick-start-sodacloud.md %}) for more context around setting up a new data source and creating a new agreement.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}