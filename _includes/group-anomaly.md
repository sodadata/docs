You can use a group by configuration to detect anomalies by category, and monitor relative changes over time in each category. 

The following example includes three checks grouped by `gender`.
* The first check uses the custom metric `average_children` to collect measurements and gauge them against an absolute threshold of `2`. <br />Soda Cloud displays the check results grouped by gender.
* *Requires Soda Scientific* The second check uses the same custom metric to **detect anomalous measurements** relative to previous measurements. Soda must collect a minimum of four, regular-cadence, measurements to have enough data from which to gauge an anomolous measurement. Until it has enough measurements, Soda returns a check result of `[NOT EVALUATED]`.<br /> Soda Cloud displays any detected anomalies grouped by gender.
* The third check uses the same custom metric to **detect changes over time** in the calculated average measurement, and gauge the measurement against a threshold of `between -5 and 5` relative to the previously-recorded measurement. See [Change-over-time thresholds]({% link soda-cl/numeric-metrics.md %}#change-over-time-thresholds) for supported syntax variations for change-over-time checks.<br /> Soda Cloud displays any detected changes grouped by gender.

{% include code-header.html %}
```yaml
checks for dim_customer:
  - group by:
      name: Group by gender
      query: |
        SELECT gender, AVG(total_children) as average_children
        FROM dim_customer
        GROUP BY gender
      fields:
        - gender
      checks:
        - average_children > 2:
            name: Average children per gender should be more than 2
        - anomaly detection for average_children:
            name: Detect anomaly for average children
        - change for average_children between -5 and 5:
            name: Detect unexpected changes for average children
```

![group-anomaly](/assets/images/group-anomaly.png){:height="700px" width="700px"}