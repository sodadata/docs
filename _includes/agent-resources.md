To specify resources, add the following parameters to your `values.yml` file during deployment. Refer to Kubernetes documentation for <a href="https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/" target="_blank">Resource Management for Pods and Containers</a> for information on values to supply for `x`.

{% include code-header.html %}
```yaml
soda:
  agent:
    resources:
      limits:
        cpu: x
        memory: x
      requests:
        cpu: x
        memory: x
  scanlauncher:
    resources:
      limits:
        cpu: x
        memory: x
      requests:
        cpu: x
        memory: x
```

For reference, a Soda-hosted agent specifies resources as follows:
```yaml
soda:
  agent:
    resources:
      limits:
        cpu: 250m
        memory: 250Mi
      requests:
        cpu: 250m
        memory: 250Mi
```
