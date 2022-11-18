## Review Soda Agent logs

To troubleshoot any issues you might encounter with a Soda Agent running on an EKS cluster, you can access some logs directly.

To get a list of pods running in the Soda Agent's namespace, use the following command.
```shell
kubectl get pods --namespace soda-agent
```

Example output:
```shell
soda-agent-orchestrator-5975ddcd9-5b5qr                         2/2     Running     0          4h6m
```

<br />

To get and tail the logs from the Soda Agent Orchestrator's pod, use the following command.
```shell
kubectl logs pods/soda-agent-orchestrator-5975ddcd9-5b5qr \
  --namespace soda-agent -f
```

<br />

To retrieve the name of the Orchestrator issuing the command, use the following.
```shell
kubectl get pods --no-headers -o custom-columns=":metadata.name" \
  -l agent.soda.io/component=orchestrator --namespace soda-agent
```

<br />

In the example above, the output displays `2/2` which means that two containers are running in the pod. This indicates that a <a href="https://medium.com/bb-tutorials-and-thoughts/kubernetes-learn-sidecar-container-pattern-6d8c21f873d" target="_blank">sidecar</a> is deployed in the pod, which is the fluent-bit based log reader/forwarder. 

If you wish to get the logs from the sidecar, you can add the `-c` option to the `logs` command to specify the sidecar container in the pod.
```shell
kubectl logs pods/soda-agent-orchestrator-5975ddcd9-5b5qr \
  -c logging-sidecar \
  -n soda-agent -f
```
