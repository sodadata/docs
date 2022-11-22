* Use `get pods` to retrieve a list of the pods running in your cluster, including some information about each.
```shell
kubectl get pods
```
Example output:
```
NAME                                       READY   STATUS             RESTARTS   AGE
nybusbreakdowns                            1/1     Running            0          10m
sa-job-3637cccd-bvp6p                      0/1     ImagePullBackOff   0          6m2s
soda-agent-orchestrator-5cd47d77b4-7c2jn   1/1     Running            0          42m
```
<br />
* Use `describe pods` to examine details about the pods running in your cluster.
```shell
kubectl describe pods
```
Example output:
```
Name:         nybusbreakdowns
Namespace:    soda-agent
Priority:     0
Node:         minikube/192.168.**.**
Start Time:   Thu, 17 Nov 2022 16:53:54 -0800
Labels:       app=nybusbreakdowns
Annotations:  <none>
Status:       Running
IP:           172.17.**.**
...
```
<br />

* Use `logs` to examine details of pod activity. Run `kubectl logs -h` for a full list of options to use with the `logs` command. <br />
For example, the following command reveals the activity during set up of the practice pod of `nybusbreakdown` data.
```
kubectl logs -l app=nybusbreakdowns --all-containers=true
```
Example output:
```
server stopped
PostgreSQL init process complete; ready for start up.
2022-11-21 21:44:49.438 UTC [1] LOG:  starting PostgreSQL 14.3 (Debian 14.3-1.pgdg110+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit
2022-11-21 21:44:49.438 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2022-11-21 21:44:49.438 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2022-11-21 21:44:49.442 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2022-11-21 21:44:49.448 UTC [65] LOG:  database system was shut down at 2022-11-21 21:44:49 UTC
2022-11-21 21:44:49.453 UTC [1] LOG:  database system is ready to accept connections
```
<br />

* Use `get pods` to get a list of pods running in the Soda Agent's namespace.
```shell
kubectl get pods --namespace soda-agent
```
Example output:
```shell
soda-agent-orchestrator-5975ddcd9-5b5qr                         2/2     Running     0          4h6m
```
<br />

* Use `get pods` to retrieve the name of the Orchestrator issuing the command.
```shell
kubectl get pods --no-headers -o custom-columns=":metadata.name" \
  -l agent.soda.io/component=orchestrator --namespace soda-agent
```
Example output:
```shell
soda-agent-orchestrator-fsnip-5g7tl
```
<br />

* Use `logs` to get and tail the logs from the Soda Agent Orchestrator's pod.
```shell
kubectl logs pods/soda-agent-orchestrator-5snip-5b5qr \
  --namespace soda-agent -f
```
Example output:
```shell
2022-11-22 00:29:53,128 - __main__ - INFO - <module> - Running Soda Orchestrator for agent james-bond
2022-11-22 00:29:53,164 - agent_id_fetcher - INFO - agent_id - Retrieved agent id from secrets: ''
2022-11-22 00:29:53,617 - soda_server_client - INFO - _execute_request - Cloud response: 200 {
  "token": "q6SV***Q",
  "organisationId": "20ab1338-e1d5-***",
  "organisations": [
    {
      "id": "20ab1338-e1d5-***",
      "name": "Soda",
      "created": "2021-09-08T23:01:46Z",
...
```
<br />

* In the example above that gets the pods of the soda-agent namespace, the output displays `2/2` which means that two containers are running in the pod. This indicates that a <a href="https://medium.com/bb-tutorials-and-thoughts/kubernetes-learn-sidecar-container-pattern-6d8c21f873d" target="_blank">sidecar</a> is deployed in the pod, which is the fluent-bit based log reader/forwarder. <br />
If you wish to get the logs from the sidecar, you can add the `-c` option to the `logs` command to specify the sidecar container in the pod.
```shell
kubectl logs pods/soda-agent-orchestrator-5975ddcd9-5b5qr \
  -c logging-sidecar \
  -n soda-agent -f
```
<br />