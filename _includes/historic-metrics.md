When you run a scan using Soda SQL, it displays the scan results in the command-line where you can review the results of tests that passed or failed. These results are ephemeral; Soda SQL does not store them. 

If your Soda SQL instance is [connected to a Soda Cloud account]({% link soda-sql/connect_to_cloud.md %}), Soda SQL also pushes the scan results to Soda Cloud where they appear in a table of **Monitor Results**. Soda Cloud stores the measurements resulting from each test Soda SQL executes against the data in the Cloud Metric Store. It uses these stored measurements to display the metric's history in a graph that shows you changes over time.

In Soda SQL, you can define **historic metrics** so that you can write tests in scan YAML files that test data relative to the historic measurements contained in the Cloud Metric Store. Essentially, this type of metric allows you to use Soda SQL to access the historic measurements in the Cloud Metric Store and write tests that use those historic measurements. 

To use `historic_metrics`, refer to the following example scan YAML file and the table below.

```yaml
table_name: orders.yml
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - ...
columns:
  ID:
    metrics:
      - distinct
      - duplicate_count
      - valid_count
      - avg
    historic_metrics:
      #avg of last 7 measurements
      - name: avg_dup_7
        type: avg
        metric: duplicate_count
        count: 7
      # min of last 30 measurements
      - name: distinct_min_30
        type: min
        metric: distinct
        count: 30
      # single previous measurement
      - name: prev_valid_count
        type: prev
        metric: valid_count
        count: 1
      # 7 measurements ago
      - name: prev_valid_count_7
        type: prev
        metric: valid_count
        count: 7
    tests:
      - duplicate_count < avg_dup_7
      - distinct < distinct_min_30
      - valid_count > prev_valid_count_7
      - valid_count > prev_valid_count
```

| Historic metric property | Required? | Use                                                 | Accepted input |
| ------------------------ | --------- |---------------------------------------------------- | ----------------|
| `name`                   | required  | Provide a name for your metric. | string        | 
| `type`                   | required  | Identify the aggregation type.                      | `avg` <br /> `max` <br /> `min` <br /> `prev` |
| `metric`                 | required  | Identify the metric from which to aggregate measurements. | `avg` <br /> `distinct` <br /> `duplicate_value` <br /> `valid_count` |
| `count`                  | required  | Use with `avg`, `max`, or `min` to define the number of measurements to aggregate. <br /> <br /> Use with `prev` to define the number of previous measurements to count back to. For example, if the value is `7`, Soda Cloud counts back to the measurement that appeared as the result seven scans ago and uses that value as the historic measurement in the current test.| integer |

#### Troubleshoot

{% include troubleshoot-historic-metrics.md %}