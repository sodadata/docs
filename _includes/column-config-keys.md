| Column config key(s) / Validity Rule(s)  | Description  | Values |
| ------------------------- | ------------ | ------ |
| `metric_groups` | Only available in Soda SQL. <br />Specifies pre-defined groups of metrics that Soda computes for this column. See [Metric groups and dependencies]({% link soda-sql/sql_metrics.md %}#metric-groups-and-dependencies) for details.| `duplicates` <br /> `length` <br /> `missing`  <br /> `profiling` <br /> `statistics` <br /> `validity` |
| `missing_format` | Specifies missing values such as whitespace or empty strings.|   |
| `missing_regex` | Use regex expressions to specify your own custom missing values.| regex, no forward slash delimiters |
| `missing_values` | Specifies the values that Soda is to consider missing in list format.| values in a list |
| `valid_format` | Specifies a named valid text format. Can apply only to columns using data type TEXT. See [Data types]({% link soda/supported-data-types.md %}). | See [Valid format values](#valid-format-values) table.  |
| `valid_max` | Specifies a maximum value for valid values. | integer |
| `valid_max_length` | Specifies a maximum string length for valid values. | integer |
| `valid_min` | Specifies a minimum value for valid values. | integer |
| `valid_min_length` | Specifies a minimum string length for valid values. | integer |
| `valid_regex` | Use regex expressions to specify your own custom valid values. | regex, no forward slash delimiters |
| `valid_values` | Specifies several valid values in list format. | values in a list |
