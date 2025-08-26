# Copy of Upgrade guide

## Upgrading from 1.1.x to 1.2.x

Starting from version 1.2.0 all images required for the Soda Agent are distributed using a Soda-hosted image registry.&#x20;

For more information, see [deploy-a-self-hosted-soda-agent-from-sodas-private-container-registry.md](deploy-a-self-hosted-soda-agent-from-sodas-private-container-registry.md "mention").

### Set up authentication for the Soda image registry

#### Using your exising Soda API key and secret

By default we'll use your existing Soda API key and secret values to perform the authentication to the Soda image registry.&#x20;

Ensure these values are still present in your `values.yaml` , no further action is required.

```yaml
soda:
  # These values will also be used to authenticate to the Soda image registry
  apikey:
    id: existing-key-id
    secret: existing-key-secret
```

#### Using a separate Soda API key and secret

You might also opt to use a new, separate Soda API key and secret to perform the authentication to the Soda image registry.

In this case, ensure the `imageCredentials.apikey.id` and `imageCredentials.apikey.secret` values are set to these new values:

```yaml
soda:
  apikey:
    id: existing-key-id
    secret: existing-key-secet
imageCredentials:
  apikey:
    id: my-new-key-id
    secret: my-new-key-secret
```

### Specify existing `imagePullSecrets`&#x20;

If you're providing your own `imagePullSecrets` on the cluster, e.g. when you're pulling images from your own mirroring image registry, you must modify your existing values file.&#x20;

The `imagePullSecrets` property that was present in versions `1.1.x` has been renamed to the more standard `existingImagePullSecrets` .&#x20;

If applicable to you, please perform the following rename in your values file:

```yaml
soda:
  apikey:
    id: ***
    secret: ***
    
# This is no longer supported
# imagePullSecrets
#   - name: my-existing-secret

# Instead, use this!
existingImagePullSecrets
  - name: my-existing-secret
```

For more information on setting up image mirroring, see [#mirroring-images](deploy-a-self-hosted-soda-agent-from-sodas-private-container-registry.md#mirroring-images "mention")&#x20;

### Update the `region`&#x20;

If you are a customer using the US instance of Soda Cloud, you'll have to configure your Agent setup accordingly. Otherwise you can ignore this section.

In version `1.2.0` we're introducing a `soda.cloud.region` property, that will be used to determine which registry and Soda Cloud endpoint to use. Possible values are `eu` and `us`. When the `soda.cloud.region` property is not set explicitly, it defaults to the value of `eu`.

If applicable to you, please perform the following changes in your values file:

```yaml
soda:
  apikey:
    id: ***
    secret: ***
  cloud:
    # This also sets the correct endpoint under the covers.
    region: "us"
    
    # This can be removed now, as the region property sets this up correctly. 
    # endpoint: https://cloud.us.soda.io
```

For more information about using the US region, see [#using-the-us-image-registry](deploy-a-self-hosted-soda-agent-from-sodas-private-container-registry.md#using-the-us-image-registry "mention").
