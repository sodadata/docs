| Column metric<br /> in Soda SQL | Column metric<br /> in Soda Cloud |Description |  Applies to [data type]({% link soda-sql/supported-data-types.md %}) | Column config key(s) / Validity Rule(s) | 
| ----------------------- | ----------- | --------------------- | ----------------------------- | ----------------------------- |
| `avg`| Average | The calculated average of the values in a numeric column. | number |  - | 
| `avg_length` | Average Length | The average length of string values in a column.  | text  |  -  |
| `distinct`<sup>1</sup> | Distinct Values | The number of rows that contain distinct values, relative to the column. | number | - | 
| `duplicate_count`<sup>1</sup>| Duplicate Values | The number of rows that contain duplicate values, relative to the column. | text, number, time  | - |
| `frequent_values`<sup>1</sup> | Top Values | A list of values in the column and the frequency with which they occur. | text, number, time  | - |
| `histogram`<sup>1</sup> | Histogram | A list of values to use to create a histogram that represents the contents of the column. | number | - |
| `invalid_count` | Invalid Values | The number of rows that contain invalid values. | text, number, time  | `valid_format` <br /> `valid_regex`<sup>2</sup> <br /> `valid_values` <br /> `valid_min_length` <br /> `valid_max_length`|
| `invalid_percentage` | Invalid Values (%) |The percentage of rows that contain invalid values.  | text, number, time  |  `valid_format` <br /> `valid_regex`<sup>2</sup> <br />`valid_values`<br /> `valid_min_length` <br /> `valid_max_length` |
| `max` | Maximum Value | The greatest value in a numeric column. |  number, time  |  -  |
| `max_length` | Maximum Length | The maximum length of string values in a column. |  text  |  -  |
| `maxs`<sup>1</sup> | Maxs | A list of values that qualify as maximum relative to other values in the column. | text, number, time | - |
| `min` | Minimum Value | The smallest value in a numeric column.  | number, time |  -  |
| `min_length` | Minimum Length | The minimum length of string values in a column.  | text  |  -  |
| `mins`<sup>1</sup> | Mins | A list of values that qualify as minimum relative to other values in the column. | text, number, time | - |
| `missing_count` | Missing Values | The number of rows in a column that do not contain specific content. | text, number, time  | `missing_format` <br /> `missing_regex`<sup>2</sup>  <br /> `missing_values`  |
| `missing_percentage` | Missing Values (%) | The percentage of rows in a column that do not contain specific content. | text, number, time  | `missing_format` <br /> `missing_regex`<sup>2</sup>  <br /> `missing_values`|
| `row_count` | n/a | The number of rows in a column. |  text, number, time | - |
| `stddev` | Standard Deviation | The calculated standard deviation of values in a numeric column. | number | - |
| `sum` | Sum | The calculated sum of the values in a numeric column.   | number | -  |
| `unique_count`<sup>1</sup> | Unique Values | The number of rows in which a value appears exactly only once in the column. | text, number, time | - |
| `uniqueness`<sup>1</sup> | Uniqueness (%) | A ratio that produces a number between 0 and 100 that indicates how unique the data in a column is. 0 indicates that all the values are the same; 100 indicates that all the values in the column are unique. | text, number, time | - |
| `valid_count` |  Valid Values | The number of rows that contain valid content.  | text, number, time  | `valid_format` <br /> `valid_regex`<sup>2</sup>  <br /> `valid_values` <br /> `valid_min_length` <br /> `valid_max_length` |
| `valid_percentage` | n/a | The percentage of rows that contain valid content.  |  text, number, time |  `valid_format` <br /> `valid_regex`<sup>2</sup>  <br /> `valid_values` <br /> `valid_min_length` <br /> `valid_max_length` |
| `values_count` | Values | The number of rows that contain content included in a list of valid values. |  text, number, time | `valid_values` <br /> `valid_regex`<sup>2</sup>  |
| `values_percentage` | Values (%) | The percentage of rows that contain content identified by valid values. | text, number, time | `valid_values` <br /> `valid_regex`<sup>2</sup>  |
| `variance` | Variance | The calculated variance of the values in a numeric column.  | number, time  | - |

<sup>1</sup> When configuring these metrics in Soda SQL, you must also define a [metric group]({% link soda-sql/sql_metrics.md %}#metric-groups-and-dependencies) in the scan YAML file. <br />
<sup>2</sup> Learn more about [using regex with column metrics](#using-regex-with-column-metrics).