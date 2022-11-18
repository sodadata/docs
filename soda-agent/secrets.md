---
layout: default
title: Manage sensitive values for a Soda Agent
description: Learn how to manage sensitive values using Kubernetes secrets and environment variables.
parent: Soda Agent
---

# Manage sensitive values for a Soda Agent

### Deploy using a values YAML file

The instructions to [Deploy a Soda Agent](#deploy-a-soda-agent) above use options with the `helm install` command to provide information that Helm needs to properly deploy the Soda Agent. However, you may wish to use a `values.yml` file to provide these details instead, for two reasons:
* You may wish to keep the sensitive API key values in this local file.
* You can also store the [data source login credentials](#use-environment-variables-for-data-source-connection-credentials) you need to provide when connecting to a data source in Soda Cloud as environment variables in this local file.

Therefore, instead of running the command in [step 2](#deploy-an-agent-to-the-cluster) above, take a couple extra steps and use a modified `helm install` command.
 1. Using a code editor, create a new YAML file called `values.yml`.
 2. To that file, copy+paste the content below, replacing the following values:
 * `id` and `secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account 
 * Replace the value of `soda.agent.name` with a custom name for you agent, if you wish <br />
 ```yaml
soda:
  apikey:
            id: "your-agent-api-key-id"
            secret: "your-agent-api-key-secret"
  agent:
            loglevel: "DEBUG"
            name: "myuniqueagent"
 ```
 3. Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
 ```shell
 helm install soda-agent soda-agent/soda-agent \
   --values values.yml \
   --namespace soda-agent
 ```
 4. Return to the procedure above and continue with step 3.




## Use environment variables for data source connection credentials

When you, or someone in your organization, follows the guided steps to [create a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud, one of the steps involves providing the connection details and credentials Soda needs to connect to the data source to run scans. You can add those details directly in Soda Cloud, but because any user can then access these values, you may wish to store them securely in the values YAML file as environment variables. 

1. In [step 2]({% link soda-cloud/add-datasource.md %}#2-connect-the-data-source) of the create a data source guided steps, add data source connection configuration which look something like the following example for a PostgreSQL data source. Note the environment variable values for username and password.
```yaml
data_source local_postgres_test:
    type: postgres
    connection:
        host: 172.17.0.7
        port: 5432
        username: ${ POSTGRES_USER }
        password: ${ POSTGRES_PASS }
        database: postgres
    schema: new_york
```
2. Create or edit your local values YAML file to include the values for the environment variables you input into the connection configuration. Reference the [section above](#deploy-using-a-values-yaml-file) for details.
```yaml
soda:
    apikey:
      id: "your-agent-api-key-id"
      secret: "your-agent-api-key-secret"
    agent:
      loglevel: "DEBUG"
      name: "your-unique-agent-name"
    env:
      POSTGRES_USER: "sodacore"
      POSTGRES_PASS: "sodacore"
```
3. After adding the environment variables to the values YAML file, update the Soda Agent using the following command:
```shell
helm upgrade soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
