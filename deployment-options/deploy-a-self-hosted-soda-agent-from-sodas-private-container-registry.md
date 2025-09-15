# Deploy a self-hosted Soda Agent from Soda's private container registry

## What has changed?

As of July 2025, the container images required for the self-hosted Soda agent will be distributed using private registries, hosted by Soda.

EU cloud customers will use the EU registry located at `registry.cloud.soda.io`. US cloud customers will use the US registry located at `registry.us.soda.io`.

The images currently distributed through Docker Hub will stay available there. New releases will only be available in the Soda-hosted registries.

Existing or new Soda cloud API keys can be used to authenticate to the Soda-hosted registries. Starting from version `1.2.0`, the `soda-agent` Helm chart offers supports working with Soda-hosted image registries.

In order to enjoy the latest features Soda has to offer, please upgrade any self-hosted Soda agent you manage using one of the following guides.

## How-to's

### Registry access using your existing API key

Follow the self-hosted Soda agent [upgrade](upgrade-soda-agent.md) or [redeployment](redeploy-soda-agent.md) guides. Don't execute the final `helm install` or `helm upgrade` step yet.

Ensure you retrieve the `soda.apikey.id` and `soda.apikey.secret` values first, by using\
`helm get values -n <namespace> <release_name>` .

Now pass these values back to the upgrade command via the CLI

```shell
helm upgrade <release> soda-agent/soda-agent
 --set soda.apikey.id=*** \
 --set soda.apikey.secret=****
```

or by using a values file:

```shell
> cat values-local.yaml
soda:
  apikey:
    id: ***
    secret: ***
> helm upgrade soda-agent soda-agent/soda-agent \
--values values-local.yml --namespace soda-agent
```

### Registry access using a separate API key

Ensure you have a new API key `id` and `secret` by following the [API key creation guide](https://app.gitbook.com/s/oV0A6Eua8LUIyWgHxsjf/use-case-guides/api-keys) .

Follow the self-hosted Soda agent [upgrade](https://app.gitbook.com/s/oV0A6Eua8LUIyWgHxsjf/quick-start-sip/upgrade#upgrade-a-self-hosted-soda-agent) or [redeployment](https://app.gitbook.com/s/oV0A6Eua8LUIyWgHxsjf/quick-start-sip/upgrade#redeploy-a-self-hosted-soda-agent) guides. Don't execute the final `helm install` or `helm upgrade` step yet.

Now pass the API keys to use for registry access in the upgrade command via the CLI, using the `imageCredentials.apikey.id` and `imageCredentials.apikey.secret` properties.\
Note that we're also still passing the `soda.apikey.id` and `soda.apikey.secret` values, which are still required for the agent to authenticate to Soda cloud.

```shell
helm upgrade <release> soda-agent/soda-agent
 --set soda.apikey.id=*** \
 --set soda.apikey.secret=****
 --set imageCredentials.apikey.id=*** \
 --set imageCredentials.apikey.secret=***
```

Or when using a values file:

```shell
> cat values-local.yaml
soda:
  apikey:
    id: ***
    secret: ***
imageCredentials:
  apikey:
    id: ***
    secret: ***
> helm upgrade soda-agent soda-agent/soda-agent \
--values values-local.yml --namespace soda-agent
```

### Using existing (external) secrets

You can also use a self-managed, existing secret to authenticate to the Soda-hosted our your self-hosted private container registry, e.g. when mirroring container images.

You can refer to existing secrets as follows for the CLI:

```shell
helm upgrade <release> soda-agent/soda-agent
 --set soda.apikey.id=*** \
 --set soda.apikey.secret=****
 --set existingImagePullSecrets[0].name=my-existing-secret  # Mind the array and indexing syntax!
```

Or using a values file:

```shell
> cat values-local.yaml
soda:
  apikey:
    id: ***
    secret: ***
existingImagePullSecrets
  - name: my-existing-secret
> helm upgrade soda-agent soda-agent/soda-agent \
--values values-local.yml --namespace soda-agent
```

### Using the US image registry

When you're onboarded on the US region of Soda Cloud, you'll have to use the container registry associated with that region.

You can alter the `soda.cloud.region` value to automatically render the correct container registry and Soda Cloud API endpoint. Simply follow any of the above instructions and include the `soda.cloud.region` value.

To do so in the CLI:

```shell
helm upgrade <release> soda-agent/soda-agent
 --set soda.apikey.id=*** \
 --set soda.apikey.secret=****
 --set soda.cloud.region=us
```

Or using a values file:

```shell
> cat values-local.yaml
soda:
  apikey:
    id: ***
    secret: ***
  cloud:
    region: "us"
> helm upgrade soda-agent soda-agent/soda-agent \
--values values-local.yml --namespace soda-agent
```

## FAQ

### Mirroring images

If you want to mirror the Soda images into your own registries, you'll need to login to the appropriate container registry. This will allow you to pull the images into your custom container image registry.

```shell
# For Soda Cloud customers in the EU region
docker login registry.cloud.soda.io -u <APIKEY_ID> -p <APIKEY_SECRET>

# For Soda Cloud customers in the US region
docker login registry.us.soda.io -u <APIKEY_ID> -p <APIKEY_SECRET>
```

The following `values.yaml` file illustrates the changes required for the Helm release to work with mirrored images:

```yaml
existingImagePullSecrets
  - name: my-existing-secret
soda:
  apikey:
    id: ***
    secret: ***
  agent:
    image:
      repository: custom.registry.org/sodadata/agent-orchestrator
  scanLauncher:
    image:
      repository: custom.registry.org/sodadata/soda-scan-launcher
  contractLauncher:
    image:
      repository: custom.registry.org/sodadata/soda-contract-launcher
  hooks:
    image:
      repository: custom.registry.org/sodadata/soda-agent-utils
```

### Do I have to upgrade? What if we can't do that right away?

Your existing Soda agent deployments will continue to function.

This does mean that your self-hosted agent will not be able to support features like collaborative data contracts and the fully revamped metric monitoring.

The images hosted on Dockerhub, required to run the self-hosted agent, will remain there in their current state for a grace period of 6 months. There will be no more maintenance (updates, bug fixes, security patches) for the old self-hosted agent versions.
