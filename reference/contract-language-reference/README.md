# Contract Language Reference

A Soda data contract is a YAML document that contains data quality checks. The checks in a Soda data contract are similar to unit tests for testing software. Verifying a contract means evaluating the checks against the actual data. If contract verification fails, notifications can be sent out or the new data can be stopped from being released to users.

This page documents the necessary contract structure and the supported check types, filters, and configuration options available in Soda's Data Contract Language.

## Contract YAML document structure

### Example

A Soda data contract YAML must include the following blocks:

* A top-level `dataset:` key
* One of the following:
  * A `checks:` block, if you’re defining dataset-wide checks
  * A `columns:` list

```yaml
dataset: datasource/db/schema/dataset #mandatory dataset fully qualified name

checks: #dataset level checks
  - schema:
  - row_count: 

columns: #columns block
  - name: id
    checks: # column level checks (optional)
      - missing:
  - name: name
    checks:
      - missing:
          threshold:
            metric: percent
            must_be_less_than: 10
  - name: size
    checks:
      - invalid:
          valid_values: ['S', 'M', 'L'] 
```

### Dataset fully qualified name

Every contract must have the fully qualified name

```yaml
dataset: datasource/db/schema/dataset
```

Casing has to match the casing in the data source.

A dataset fully qualified name is composed of 3 parts, all slash-separated:

* The data source name: This is the name of the data source in which the dataset exists. The data source name is configured in a data source YAML configuration file or in Soda Cloud.
* A list of prefixes: Prefixes represent the full list of hierarchical elements of the data source like for example, the database name and the schema name. Postgres has a database name and a schema name as prefixes. Databricks has a catalog and schema as prefixes. Prefix names are also slash-separated.
* The dataset name: The name of the table or view.

### Columns

Every contract must include a list of columns. If a schema check is configured, this list can be used to validate the **presence, data type, and order** of columns.

Each column entry includes:

* `name`: the column name (required)
* `data_type` (optional): used by the schema check
* `character_maximum_length` (optional): used by the schema check
* `checks` (optional): a list of checks that apply only to that column
  * `type`
  * Threshold keys (for any check that _needs_ a threshold, such as `must_be`, `must_be_between`, etc.)

Example:

```yaml
# Example of fully operational contract with only column-level checks

dataset: datasource/db/schema/dataset
columns:
  - name: id
    data_type: varchar
    checks:    # Column-level checks definition
      - missing:
      - duplicate:
  - name: name
  - name: code
```

#### **Exception**

{% hint style="warning" %}
A contract can omit the list of columns only when it exclusively defines **dataset-level checks** that do not run against any specific column:
{% endhint %}

```yaml
# Example of fully operational contract with only dataset-level checks

dataset: datasource/db/schema/dataset

checks:    # Dataset-level checks definition
    schema: 
    row_count: 
```

### Checks

The `checks` section defines the quality rules and expectations for your dataset. Checks can be written at two levels:

* **Dataset-level**: Rules that apply to the dataset as a whole (e.g., row count, schema, freshness, duplicates across multiple columns).
* **Column-level**: Rules that apply to a specific column (e.g., missing, invalid, duplicate on a single column).



Each check entry includes:

* `type`
* `column:` (not required to compile)
* Threshold keys (for any check that _needs_ a threshold, such as `must_be`, `must_be_between`, etc.)

**Example of a dataset-level `checks` block:**

```yaml
checks: 
  - schema: 
  - row_count:  
```

***

**Example of column-level checks:**

```yaml
columns:
  - name: email
    checks:
      - missing:
      - invalid:
          invalid_format:
            name: Email format
            regex: ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
```

Each check defines what “good data” looks like, ensuring that your dataset meets the expected standards.

You can customize each check by adding filters, thresholds, or variable references depending on your specific use case. Learn more about the different check types on this page.

***

## Schema check

A Schema check verifies that the structure of a dataset matches the expectations defined in the contract—such as required columns, data types, and optional constraints. It ensures that changes to the dataset schema (like missing columns, unexpected data types, or reordered fields) are detected early, helping maintain stability and trust in your data.

**Example:**

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: id
  - name: last_name
  - name: address_line1

checks:
  - schema:
      allow_extra_columns: false
      allow_other_column_order: false
```

**Column keys used by the schema check:**

The schema check uses the columns as specified in the contract and compares them with the measured dataset columns as as the expected columns.

| Key                        | Description                                                                                                                | Optional |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| `name`                     | The name of the column. The name is **case sensitive**.                                                                    | No       |
| `data_type`                | The data type of the column as is returned by the metadata from the data source. Data types are compared case insensitive. | Yes      |
| `character_maximum_length` | The character maximum length. This represents the maximum length for data types like `VARCHAR(255)`                        | Yes      |

**Check configuration keys:**

| Key                        | Description                                                                                                                                                                                                                | Optional |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `allow_extra_columns`      | Specifies if columns other than the ones listed in the contract are allowed in the dataset. Values are `true` or `false`. Default is false, which means that all columns in the dataset must be specified in the contract. | Yes      |
| `allow_other_column_order` | Specifies if column ordering must be exact the same as in the contract YAML document. Values are `true` or `false`. Default is false, which means that columns must appear in the order as in the contract.                | Yes      |
| `name`                     | [#check-names](./#check-names "mention")                                                                                                                                                                                   | Yes      |
| `qualifier`                | [#check-qualifiers](./#check-qualifiers "mention")                                                                                                                                                                         | Yes      |
| `attributes`               | [#check-attributes](./#check-attributes "mention")                                                                                                                                                                         | Yes      |

***

## Row count check

A Row Count check verifies that the dataset contains the expected number of rows. It ensures that the data source has at least a minimum number of records and no unexpected gaps. This is a fundamental check to confirm the presence and completeness of data in a dataset.

**Example**:

```yaml
dataset: datasource/db/schema/dataset
checks:
  - row_count:
```

**Check configuration keys**

| Key          | Description                                                                                                      | Optional |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | -------- |
| `name`       | [#check-names](./#check-names "mention")                                                                         | Yes      |
| `threshold`  | The default row count threshold verifies there is at least 1 row present. [#thresholds](./#thresholds "mention") | Yes      |
| `filter`     | [#configure-a-check-filter](./#configure-a-check-filter "mention")                                               | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                               | Yes      |
| `attributes` | [#check-attributes](./#check-attributes "mention")                                                               | Yes      |

***

## Freshness check

A freshness check verifies if data is not too old by measuring the period between the current time and the most recent timestamp present in a given column.

***

**Example:**&#x20;

```yaml
dataset: datasource/db/schema/dataset

checks:
  - freshness:
      column: created_at
      threshold:
        unit: hour
        must_be_less_than: 24
```

**Check configuration keys**

| Key          | Description                                                                                                                                                                                 | Optional |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `column`     | Specifies a timestamp column that represents the time of the row or                                                                                                                         | Yes      |
| `unit`       | Specifies a the unit of measure for the time period between the current time and the most recent timestamp in the column. Values are `hour`, `minute` & `day` Default threshold is 1 `hour` | Yes      |
| `name`       | [#check-names](./#check-names "mention")                                                                                                                                                    | Yes      |
| `threshold`  | The default freshness threshold verifies there are rows present that are less than 1 hour old. [#thresholds](./#thresholds "mention")                                                       | Yes      |
| `filter`     | [#configure-a-check-filter](./#configure-a-check-filter "mention")                                                                                                                          | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                                                                                                          | Yes      |
| `attributes` | [#check-attributes](./#check-attributes "mention")                                                                                                                                          | Yes      |

***

## Missing check

A Missing check verifies that a specific column does not contain null or empty values beyond an acceptable threshold. It ensures that critical fields are populated and helps catch incomplete or corrupted data that could impact downstream processes.

**Example:**

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: id
    checks:
      - missing:
```

***

**Check configuration keys**

| Key              | Description                                                                                                                    | Optional |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `missing_values` | The list of values is considered missing. NULL is always considered a missing value and doesn't need to be included            | No\*     |
| `missing_format` | A SQL regex that matches with missing values. (Advanced)                                                                       | No\*     |
| `name`           | [#check-names](./#check-names "mention")                                                                                       | Yes      |
| `threshold`      | The default missing check threshold verifies there are no missing values in the column. [#thresholds](./#thresholds "mention") | Yes      |
| `filter`         | [#configure-a-check-filter](./#configure-a-check-filter "mention")                                                             | Yes      |
| `qualifier`      | [#check-qualifiers](./#check-qualifiers "mention")                                                                             | Yes      |
| `attributes`     | [#check-attributes](./#check-attributes "mention")                                                                             | Yes      |

\* there are several configuration keys to configure the missing values. At least one missing configuration is required.&#x20;



***

**Configure extra missing values in a list**

Configure a list of values that, apart from NULL, must also be considered as missing values. Typical examples are `'-'`, `'No value'`, `'N/A'`, `'None'`, `'null'`, `-1`, `999`

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: id
    checks:
      - missing:
          missing_values: ['N/A', '-']
```

The `missing_values` configuration is only supported on string and numeric data types.

***

**Configure extra missing values with a regular expression**

Configure a SQL regular expression that, apart from NULL, also matches values that are considered as missing values. Only supported for columns having a text data type

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: id
    checks:
      - missing:
          missing_format:
            name: All dashes
            regex: ^[-]+$
```

The `regex` syntax must match the SQL engine of the data source.

The `name` is a human-readable description of what the regex does. It helps explain the purpose of the pattern, making it easier for others to understand the intent of the check.

***

## Invalid check

An Invalid check verifies that the values in a column conform to a set of allowed formats, values, or constraints. It helps catch data that does not meet the expected standards, such as incorrect formats, out-of-range values, or entries that violate business rules.

Example:

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: size
    checks:
      - invalid:
          valid_values: ['S', 'M', 'L']
```

**Check configuration keys**

| Key                    | Description                                                                                                              | Optional |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| `valid_values`         | A list of valid values                                                                                                   | No\*     |
| `valid_format`         | A SQL regular expression that matches with valid values                                                                  | No\*     |
| `valid_reference_data` | References a dataset and column that contains valid values                                                               | No\*     |
| `valid_min`            | Valid values must be greater or equal than the configured value                                                          | No\*     |
| `valid_max`            | Valid values must be less or equal than the configured value                                                             | No\*     |
| `valid_length`         | The fixed length of valid values                                                                                         | No\*     |
| `valid_min_length`     | The minimum length of valid values                                                                                       | No\*     |
| `valid_max_length`     | The maximum length of valid values                                                                                       | No\*     |
| `invalid_values`       | A list of invalid values                                                                                                 | No\*     |
| `invalid_format`       | A SQL regular expression that matches with invalid values                                                                | No\*     |
| `name`                 | [#check-names](./#check-names "mention")                                                                                 | Yes      |
| `threshold`            | The default invalid check threshold ensures there must not be any invalid values. [#thresholds](./#thresholds "mention") | Yes      |
| `filter`               | [#configure-a-check-filter](./#configure-a-check-filter "mention")                                                       | Yes      |
| `qualifier`            | [#check-qualifiers](./#check-qualifiers "mention")                                                                       | Yes      |
| `attributes`           | [#check-attributes](./#check-attributes "mention")                                                                       | Yes      |

\* there are several configuration keys to configure the invalid values. At least one validity configuration is required. Multiple validity configurations can be combined.

**Example with a regular expression**

Format is only supported for string data type.

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: code
    checks:
      - invalid:
          valid_format:
            name: Alpha Code
            regex: \^[A-Z]{3}$\
```

The `regex` syntax must match the SQL engine of the data source.

The `name` is a human-readable description of what the regex does. It helps explain the purpose of the pattern, making it easier for others to understand the intent of the check.

***

**Example with a reference dataset:**

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: code
    checks:
      - invalid:
          valid_reference_data:
            dataset: data_source/db/schema/reference_dataset
            column: valid_code
```

`valid_reference_data` has 2 nested configurations:

* `dataset`: fully qualified dataset name. Limitation: The reference dataset must be in the same data source.
* `column`: the name of the column containing the valid values

***

**Example minimum and maximum values:**

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: code
    checks:
      - invalid:
          valid_min: 1
          valid_max: 100
```

`valid_min` and `valid_max` can be used independently.

It's supported on columns with numerical data types.

***

**Example minimum and maximum values length:**

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: code
    checks:
      - invalid:
          valid_length: 2
          valid_min_length: 1
          valid_max_length: 5
```

`valid_length` , `valid_min_length` and `valid_max_length` can be used independently.

***

## Duplicate check

A Duplicate check ensures that values in a column or combination of columns are unique, helping prevent data integrity issues. It can be used at the **column level** or **dataset level**.

### Single column duplicate check

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: id
    checks:
      - duplicate:
```

**Configuration keys:**

| Key          | Description                                                                                                       | Optional |
| ------------ | ----------------------------------------------------------------------------------------------------------------- | -------- |
| `name`       | [#check-names](./#check-names "mention")                                                                          | Yes      |
| `threshold`  | The default duplicate check threshold requires that all values are unique. [#thresholds](./#thresholds "mention") | Yes      |
| `filter`     | Check filter                                                                                                      | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                                | Yes      |
| `attributes` | [#check-attributes](./#check-attributes "mention")                                                                | Yes      |

### Multi-column duplicate check

```yaml
dataset: datasource/db/schema/dataset
checks:
  - duplicate:
      columns: ['col1', 'col2']
```

**Configuration keys:**

| Key          | Description                                                                                                   | Optional |
| ------------ | ------------------------------------------------------------------------------------------------------------- | -------- |
| `columns`    | List of column names                                                                                          | No       |
| `name`       | [#check-names](./#check-names "mention")                                                                      | Yes      |
| `threshold`  | The default duplicate check threshold requires that all values are unique. Data Contract Language Reference ✅ | Yes      |
| `filter`     | [#configure-a-check-filter](./#configure-a-check-filter "mention")                                            | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                            | Yes      |
| `attributes` | [#check-attributes](./#check-attributes "mention")                                                            | Yes      |

***

## Aggregate check

An Aggregate check verifies that the result of an aggregate function, such as `avg`, `sum`, `min`, `max`, or `count`—meets the expected thresholds. It helps ensure that summary statistics over a column remain within acceptable ranges and that key metrics derived from your data stay accurate and consistent.

**Example:**

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: age
    checks:
      - aggregate:
          function: avg
          threshold:
            must_be_between:
              greater_than: 20
              less_than: 50
```

**Check configuration keys**

| Key          | Description                                                                                         | Optional |
| ------------ | --------------------------------------------------------------------------------------------------- | -------- |
| `function`   | Supported by all data sources: `avg`, `avg_length`, `max`, `min`, `max_length`, `min_length`, `sum` | No       |
| `name`       | [#check-names](./#check-names "mention")                                                            | Yes      |
| `threshold`  | [#thresholds](./#thresholds "mention")                                                              | No       |
| `filter`     | [#configure-a-check-filter](./#configure-a-check-filter "mention")                                  | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                  | Yes      |
| `attributes` | [#check-attributes](./#check-attributes "mention")                                                  | Yes      |

***

## Metric check

A Metric check validates the result of a custom SQL expression or query against a threshold. It supports complex business logic, calculated metrics, or cross-column relationships. Metric checks can be defined at the dataset level (across multiple columns) or column level (single column).

For better performance, we recommend SQL expressions over full SQL queries—they’re simpler to write and can be combined with other checks in a single query.

### Verify a SQL expression value against a threshold

**Example at the dataset level:**

```yaml
dataset: datasource/db/schema/dataset
checks:
  - metric:
      expression: AVG("end" - "start")
      threshold:
        must_be_between:
          greater_than: 3
          less_than: 8
```

**Example at the column level:**

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: end
    checks:
      - metric:
          expression: AVG("end" - "start")
          threshold:
            must_be_between:
              greater_than: 3
              less_than: 8
```

***

**Check configuration keys**

| Key          | Description                                                                                        | Optional |
| ------------ | -------------------------------------------------------------------------------------------------- | -------- |
| `expression` | A SQL expression that produces the numeric metric value that will be compared with the threshold.  | No       |
| `name`       | [#check-names](./#check-names "mention")                                                           | Yes      |
| `threshold`  | [#thresholds](./#thresholds "mention")                                                             | No       |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                 | Yes      |
| `attributes` | [#check-attributes](./#check-attributes "mention")                                                 | Yes      |

### Verify a SQL query value against a threshold

**Example at the dataset level:**

```yaml
dataset: datasource/db/schema/dataset
checks:
  - metric:
      query: |
        SELECT AVG("end" - "start")
        FROM datasource.db.schema.table
      threshold:
        must_be_greater_than: 3
```

**Example at the column level:**

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: end
    checks:
      - metric:
          query: |
            SELECT AVG("end" - "start")
            FROM datasource.db.schema.table
          threshold:
            must_be_greater_than: 3
```

| Key          | Description                                                                                        | Optional |
| ------------ | -------------------------------------------------------------------------------------------------- | -------- |
| `query`      | A SQL query that produces a single numeric metric value that will be compared with the threshold.  | No       |
| `name`       | [#check-names](./#check-names "mention")                                                           | Yes      |
| `threshold`  | [#thresholds](./#thresholds "mention")                                                             | No       |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                 | Yes      |
| `attributes` | [#check-attributes](./#check-attributes "mention")                                                 | Yes      |

***

## Failed rows check

A Failed Rows check identifies rows that violate a specific condition, such as a filter or SQL expression. It helps pinpoint problematic data like outliers or rule violations and can save references for further review.

Failed Rows checks can apply at the dataset level (testing conditions across multiple columns) or at the column level (validating individual column values).

We recommend using SQL expressions over full SQL queries for simplicity and efficiency—they allow combining multiple checks into a single query for better performance.

### Verify failed rows with a SQL expression

**Example at the dataset level:**

```yaml
dataset: datasource/db/schema/dataset
checks:
  - failed_rows:
      expression: ("end" - "start") > 5
```

**Example at the column level:**

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: end
    data_type: DATE
    checks:
      - failed_rows:
          expression: ("end" - "start") > 0
```

**Check configuration keys**

| Key          | Description                                                                                                                                                                                  | Optional |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `Expression` | A SQL expression, used as the WHERE clause, that produces any tabular data indicating failures with the data. An expression returning zero rows indicates there is no problem with the data. | No       |
| `name`       | [#check-names](./#check-names "mention")                                                                                                                                                     | Yes      |
| `threshold`  | The default is that there should be no failed rows.[#thresholds](./#thresholds "mention")                                                                                                    | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                                                                                                           | Yes      |
| `attributes` | [#check-attributes](./#check-attributes "mention")                                                                                                                                           | Yes      |

### Verify and visualize failed rows with a SQL query

**Example at the dataset level:**

```yaml
dataset: datasource/db/schema/dataset
checks:
  - failed_rows:
      query: |
        SELECT * FROM datasource.db.schema.table WHERE ("end" - "start") > 5
```

**Example at the column level:**

```yaml
dataset: datasource/db/schema/dataset
columns:
  - name: end
    data_type: DATE
    checks:
      - failed_rows:
        query: |
          SELECT * FROM datasource.db.schema.table WHERE ("end" - "start") > 0
```

**Check configuration keys**

| Key          | Description                                                                                                                                                             | Optional |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `query`      | A SQL query that produces any tabular data indicating failures with the data. An expression returning zero rows indicates there is no problem with the data. I          | No       |
| `name`       | [#check-names](./#check-names "mention")                                                                                                                                | Yes      |
| `threshold`  | The default is that there should be no failed rows. The threshold can only be count-based. Percent thresholds are not supported. [#thresholds](./#thresholds "mention") | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                                                                                      | Yes      |
| `attributes` | [#check-attributes](./#check-attributes "mention")                                                                                                                      | Yes      |

***

## Reconciliation checks

Documentation for reconciliation checks is available in [reconciliation-checks.md](reconciliation-checks.md "mention")

## Common check configurations

### Configure a check filter

Most checks support a `filter` to limit the rows on which the check applies:

```yaml
dataset: datasource/db/schema/dataset

columns:
  - name: id
    checks:
      - missing:
          filter: "country = 'USA'"
```

Note: If a dataset filter is configured, both the dataset and the check filter will be applied.

### Thresholds

Every check (except the schema check) has a metric value that is evaluated and produces a check outcome. The threshold is the check part that specifies which numeric values make the check pass or fail.

An example threshold is: "The missing count metric value must be less than 5."

```yaml
dataset: datasource/db/schema/dataset

columns:
  - name: status
    checks:
      - missing:
          threshold:
            must_be_less_than: 0
```

Use one of the following threshold configuration keys to specify an open range.

| Key                             | Description                                                                                                                                                                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `must_be`                       | The metric value must be equal to the configured value                                                                                                                                                                                                                                                                       |
| `must_not_be`                   | The metric value must be different from the configured value                                                                                                                                                                                                                                                                 |
| `must_be_greater_than`          | The metric value must be greater than the configured value                                                                                                                                                                                                                                                                   |
| `must_be_greater_than_or_equal` | The metric value must be greater than or equal to the configured value                                                                                                                                                                                                                                                       |
| `must_be_less_than`             | The metric value must be less than the configured value                                                                                                                                                                                                                                                                      |
| `must_be_less_than_or_equal`    | The metric value must be less than or equal to the configured value                                                                                                                                                                                                                                                          |
| `must_be_between`               | The metric value must be between the acceptable bounds for a metric. The bounds must be expressed as either a **strict** range (`greater_than` / `less_than`) or an **inclusive** range (`greater_than_or_equal` / `less_than_or_equal`). The bounds are specified as **nested properties** under `must_be_between`.         |
| `must_be_not_between`           | The metric value must not be between the acceptable bounds for a metric. The bounds must be expressed as either a **strict** range (`greater_than` / `less_than`) or an **inclusive** range (`greater_than_or_equal` / `less_than_or_equal`). The bounds are specified as **nested properties** under `must_not_be_between`. |

Use a closed range to ensure metric values are between 2 boundaries.

**Example:**&#x20;

```yaml
dataset: datasource/db/schema/dataset

columns:
  - name: success_ratio
    checks:
      - missing:
          threshold:
            must_be_between:
              greater_than: 0
              less_than: 100
```

* Use `greater_than` or `greater_than_or_equal` to specify the lower bound
* Use `less_than` or `less_than_or_equal` to specify the upper bound

Use an open range to ensure metric values are outside 2 boundaries.

**Example:**

```yaml
dataset: datasource/db/schema/dataset

columns:
  - name: success_ratio
    checks:
      - missing:
          threshold:
            must_be_not_between:
              less_than: 0
              greater_than: 100
```

* Use `less_than` or `less_than_or_equal` to specify the lower bound
* Use `greater_than` or `greater_than_or_equal` to specify the upper bound

**Set a threshold as a percentage**

To specify a threshold as a percentage of the total, add `metric: percent` to the threshold.

The `metric` The property has 2 possible values: `count` is the default and `percentage` can be configured.

Percentage-based thresholds are only available on checks where the metric value can be expressed as a percentage of a total value. These are missing, invalid, duplicate, and failed\_rows (expression) checks.

Note that the total value refers to the total number of rows checked. In case of a dataset filter or a check filter, the total refers to the number of rows passing the filters.

**Example:**&#x20;

```yaml
dataset: datasource/db/schema/table
columns:
  - name: status
    checks:
      - missing:
          threshold:
            metric: percent
            must_be_less_than: 5
```

### Check names

The `name` property provides a human-readable description for a check. It helps explain the purpose of the check in plain language, making it easier for users to understand the intent behind each rule, especially when reviewing results in Soda Cloud.

For example, instead of relying on technical details like a regex pattern or threshold, a well-written `name` offers a simple summary, such as:

```yaml
dataset: datasource/db/schema/dataset

columns:
  - name: status
    checks:
      - missing:
          name:  The missing count metric value must be less than 5%
          threshold:
            metric: percent
            must_be_less_than: 5
```

In this example, the `name` ("Email format") clarifies the purpose of the regex. This is particularly helpful for non-technical users reviewing the contract or verification results.

**Best Practices for Check Names:**

* Write check names in plain language.
* Focus on the intent or business rule the check enforces.
* Avoid repeating technical details already visible in the check configuration.

The `name` Property is optional but highly recommended for improving clarity and collaboration.

By default, the check name is the check type.



### Check Attributes

Use attributes to **label**, **sort**, and **route** your checks in Soda Cloud. Attributes help you organize checks by properties such as domain, priority, location, and sensitivity (e.g., PII).

> Learn how to leverage attributes with [notifications.md](../../manage-issues/notifications.md "mention") and [browse-datasets.md](../../manage-issues/browse-datasets.md "mention").&#x20;

**Apply Attributes to Checks**

You can add attributes directly to individual checks. For example:

```yaml
dataset: datasource/db/schema/dataset

columns:
  - name: customer_email
    data_type: VARCHAR
    checks:
      - missing:
          attributes:
            domain: Sales
            pii: True
            dimension: completeness
```



**Set Default Attributes at the Top Level**

You can also define default attributes at the dataset level. These attributes apply to **all checks**, unless overridden at the individual check level.

```yaml
dataset: datasource/db/schema/dataset

check_attributes:
  domain: Sales
  
columns
  - name: customer_email
    data_type: VARCHAR
    checks:
      - missing:
          attributes:
            pii: True
            dimension: completeness
```



#### **Attribute Validation in Soda Cloud**

When publishing contract results to Soda Cloud, **all check attributes must be pre-defined in Soda Cloud**. If any attribute used in a contract is not registered in your Soda Cloud environment, the results will **not be published**, and the data contract scan will be **marked as failed**.

> Learn how to configure attributes in Soda Cloud: [check-and-dataset-attributes.md](../../manage-issues/check-and-dataset-attributes.md "mention").&#x20;

### Check qualifiers

When sending results to Soda Cloud, check qualifiers ensure that the checks in the source YAML document can be correlated with the checks in Soda Cloud.

Most checks don't need a qualifier because there is only one check in a `checks` section of the same type. If you have multiple checks of the same type in a `checks` section, you need to ensure that each check has a distinct string `qualifier` value.

Keep in mind that if you change the qualifier, the historical information of this check on Soda Cloud is lost.

We want to ensure that all contracts are Soda Cloud ready so we have made it mandatory to specify qualifiers where needed.

In case two checks have the same identity, contract verification will complain with an error `Duplicate identity`

Configure distinct qualifiers to create unique check identities:

```yaml
dataset: datasource/db/schema/table
columns:
  - name: status
    checks:
      - invalid:
          valid_values: ["C", "A", "D"]
      - invalid:
          qualifier: c2
          valid_format:
            regex: ^[CAD]$
            name: Characters format
```

Any text or numeric value is allowed as the qualifier. No qualifier is considered different from other checks with a qualifier like in the example above.

## Configure a filter for all checks

A dataset filter ensures that all checks in the contract are only applied to a subset of the rows in the dataset.

This is most commonly used to apply all checks to the latest time partition of the data. Each time new data is appended to an incremental dataset, the contract verification should evaluate the checks only on the rows in the latest time partition.

```yaml
dataset: datasource / db / schema / dataset;

filter: "created_at >= CURRENT_DATE - INTERVAL '1 day'";
```

## Make contracts dynamic with variables

Variables allow dynamic substitution of values in contracts. They help you:

* **Parameterize** values that differ across environments, datasets, or schedules.
* **Reuse values** in multiple places within the same contract to reduce duplication and improve maintainability.

Variables can be used in filters, checks, thresholds, and more.

Declare variables at the top of the contract:

```yaml
dataset: datasource/db/schena/dataset

variables:
  COUNTRY:
    default: France
```

The default value is optional. Variables without a `default` are required when verifying a contract (see below).

If you don't specify a default value, don't forget the colon (`:`) after the variable name.

Use variables in other places in the contract with syntax: `${var.VARIABLE_NAME}`

Variables are case sensitive. We recommend always using upper case and underscores for variable names.

```yaml
dataset: datasource/db/schena/dataset

filter: "created_at >= '${var.START_DATE}'"

columns:
  - name: status
    checks:
      - missing:
```

Specify variables values when verifying a contract:

Variables can be overridden at verification time:

```bash
soda contract verify --set START_DATE=2024-05-19T14:30:00Z
```

Setting a variable overrides the default value configured in the contract.

#### Soda variables

`${soda.NOW}` is a built-in variable that provides the current timestamp at the moment of scan execution, allowing you to create dynamic filters relative to the time of scan execution—for example, to check for records in the last 24 hours..

***

## Schedule a contract verification

Soda Cloud can execute the contract verification on a time schedule.

First, configure the time schedule in the contract.

```yaml
dataset: datasource/db/schema/dataset
soda_agent:
  checks_schedule:
    cron: 0 0 * * *
    timezone: UTC
```

* This defines a cron-based schedule to trigger contract **verification**
* Requires the data source to be configured in Soda Cloud with Soda Agent

Second, publish the contract to Soda Cloud.
