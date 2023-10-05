If you wish to try creating a new data source in Soda Cloud using the agent you deployed, you can use the following command to create a PostgreSQL warehouse containing example data from the <a href="https://data.cityofnewyork.us/Transportation/Bus-Breakdown-and-Delays/ez4e-fazm" target="_blank">NYC Bus Breakdowns and Delay Dataset</a>.

From the command-line, copy+paste and run the following to create the data source as a pod on your new cluster.
{% include code-header.html %}
```shell
cat <<EOF | kubectl apply -n soda-agent -f -
---
apiVersion: v1
kind: Pod
metadata:
  name: nybusbreakdowns
  labels:
    app: nybusbreakdowns
spec:
  containers:
  - image: sodadata/nybusbreakdowns
    imagePullPolicy: IfNotPresent
    name: nybusbreakdowns
    ports:
    - name: tcp-postgresql
      containerPort: 5432
  restartPolicy: Always
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nybusbreakdowns
  name: nybusbreakdowns
spec:
  ports:
  - name: tcp-postgresql
    port: 5432
    protocol: TCP
    targetPort: tcp-postgresql
  selector:
    app: nybusbreakdowns
  type: ClusterIP
EOF
```
Output:
```shell
pod/nybusbreakdowns created
service/nybusbreakdowns created
```

<br />
Once the pod of practice data is running, you can use the following configuration details when you add a data source in Soda Cloud, in [step 2]({% link soda-cloud/add-datasource.md %}#2-connect-the-data-source), **Connect the Data Source**.
{% include code-header.html %}
```yaml 
data_source your_datasource_name:
  type: postgres
  host: nybusbreakdowns
  port: 5432
  username: sodacore
  password: sodacore
  database: sodacore
  schema: new_york
```
