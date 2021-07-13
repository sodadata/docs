| Column metric   | Description |  Applies to [data type]({% link soda/supported-data-types.md %}) | Column config key(s) / Validity Rule(s) |
| ----------------------- | ----------- | --------------------- | ----------------------------- |
| `avg` | The calculated average of the values in a numeric column. | number |  - |
| `avg_length` | The average length of string values in a column.  | text  |  -  |
| `invalid_count` | The number of rows that contain invalid values. | text  | `valid_format` <br /> `valid_regex` <br /> `valid_values` <br /> `valid_min_length` <br /> `valid_max_length`|
| `invalid_percentage` | The percentage of rows that contain invalid values.  | text  |  `valid_format` <br /> `valid_regex` <br />`valid_values`<br /> `valid_min_length` <br /> `valid_max_length` |
| `max` | The greatest value in a numeric column. |  number  |  -  |
| `max_length` | The maximum length of string values in a column. |  text  |  -  |
| `min` | The smallest value in a numeric column.  | number |  -  |
| `min_length` | The minimum length of string values in a column.  | text  |  -  |
| `missing_count` | The number of rows in a column that do not contain specific content. | text, number, date  | `missing_format` <br /> `missing_regex` <br /> `missing_values`  |
| `missing_percentage` | The percentage of rows in a column that do not contain specific content. | text, number, date  | `missing_format` <br /> `missing_regex` <br /> `missing_values`|
| `row_count` | The number of rows in a column. |  text, number, date | - |
| `stddev` |  The calculated standard deviation of values in a numeric column. | number | - |
| `sum` | The calculated sum of the values in a numeric column.   | number | -  |
| `valid_count` |  The number of rows that contain valid content.  | text  | `valid_format` <br /> `valid_regex` <br /> `valid_values` <br /> `valid_min_length` <br /> `valid_max_length` |
| `valid_percentage` | The percentage of rows that contain valid content.  |  text |  `valid_format` <br /> `valid_regex` <br /> `valid_values` <br /> `valid_min_length` <br /> `valid_max_length` |
| `values_count` | The number of rows that contain content included in a list of valid values. |  text | `valid_values` <br /> `valid_regex` |
| `values_percentage` | The percentage of rows that contain content identified by valid values. | text | `valid_values` <br /> `valid_regex` |
| `variance` | The calculated variance of the values in a numeric column.  | number  | - |