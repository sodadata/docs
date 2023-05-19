# Check Suggestion CLI

The Check Suggestion CLI is a command-line interface tool designed to simplify the process of generating the basic data quality checks in SodaCL format. With this CLI tool, you can quickly walk through the process of creating a SodaCL YAML file that contains the basic data quality checks for your data.

## Check Suggestion Steps

- Schema Check
- Row Count Check
- Time based filtering suggestion
- Freshness Check
- Validity Check
- Missing Value Check
- Duplicate Value Check

## Features

**Automated YAML Generation**: The Check Suggestion CLI automates the generation of SodaCL YAML files for data quality checks. By providing relevant information and criteria during the suggestion flow, the CLI generates YAML templates that can be customized and used with Soda.

**Intuitive Command-Line Interface**: The CLI offers a user-friendly command-line interface, making it easy to interact with and generate YAML files by minimizing the YAML editing.

**Flexible Check Suggestions**: The Check Suggestion CLI provides a range of check suggestions to assist users in defining their data quality rules. These suggestions include commonly used data quality checks, such as detecting schema changes, missing value checks, uniqueness constraints, and more [[see here for full list](#check-suggestion-steps)].

**Customizable Templates**: The generated YAML files serve as templates that can be further customized to meet specific data quality requirements. Users have the freedom to modify and extend the suggested checks to suit their data validation needs.

## Installation

To install the Check Suggestion CLI, follow these steps:

1. **Prerequisites**: Ensure that you have Python >=3.10 installed on your system.
2. **Installation**: Run the following command to install the CLI:

    ```bash
    pip install soda-generator
    ```

3. **Verify Installation**: Run the following command to verify the installation:

    ```bash
    soda-generator --help
    ```

## Usage

Before calling the CLI, ensure that you have the `configuration.yaml` file to connect your data source. For more information, see [connect to a data source](https://docs.soda.io/soda/connect-postgres.html).

Once you have a `configuration.yaml` file, you can run the CLI using the following command:

```bash
soda-generator --configuration <path-to-configuration.yaml> --datasource <datasource-name>
```

The CLI will prompt you with a series of questions to gather information about your data and desired checks. Answer the questions accordingly, and the CLI will generate a YAML file with suggested checks based on your inputs.

### Optional Fields

**--output-dir**: Use `--output-dir` to specify the output directory for the generated SodaCL YAML file. If you do not specify the `--output-dir` flag, the YAML file is generated in the current working directory.

**--dataset**: Use `--dataset` to specify the dataset name for the generated SodaCL YAML file. If you do not specify `--dataset` field, the specific dataset name will be asked during the suggestion flow.

## Example

Here's an example of using the Check Suggestion CLI to generate a SodaCL YAML file:

```bash
soda-generator --configuration ./configuration.yaml --datasource my_datasource_name
```

## Steps in Suggestion Flow

### Selecting a Dataset

In case, `--dataset` is not provided, the CLI will prompt you to select a dataset from the list of available datasets in the data source.

### Select checks for basic data quality coverage

The CLI will prompt you to select the checks you want to include in the SodaCL YAML file. The available checks are:

- [Schema Check](#schema-check)
- [Row Count Check](#row-count-check)
- [Time Based Partitioning](#time-based-partitioning)
- [Freshness Check](#freshness-check)
- [Validity Check](https://docs.soda.io/soda-cl/validity.html)
- [Missing Value Check](https://docs.soda.io/soda-cl/missing-values.html)
- [Duplicate Value Check](https://docs.soda.io/soda-cl/duplicates.html)

### Set Column Filtering

If dataset has more than 20 columns, the CLI will prompt you to select the candidate column names you want to include in column based checks for missing and duplicate value checks to shorten the column list.

### Schema Check

This step involves validating the schema or structure of your data. It ensures that the expected columns or fields are present in the dataset and that they have the correct data types, locations and formats. The schema check helps identify any inconsistencies or missing information in the data structure. More specifically, in case you approve schema check the following checks will be applied;

```yaml
  # Add a schema check
  - schema:
      name: Any schema changes
      fail:
        when schema changes:
          - column delete
          - column add
          - column index change
          - column type change
```

- **Column Delete**: This check ensures that no columns are deleted from the dataset.
- **Column Add**: This check ensures that no new columns are added to the dataset.
- **Column Index Change**: This check ensures that the column index remains the same.
- **Column Type Change**: This check ensures that the column data type remains the same.

To read more about the schema check, see [schema check](https://docs.soda.io/soda-cl/schema.html).

### Row Count Check

The row count check consists of two parts;

```yaml
  # Add a row count check
  - row_count > 0
  - anomaly score for row_count < default
```

1. **Row Count > 0**: This check ensures that the dataset is not empty.
2. **Anomaly Check on Row Count**: This check ensures that the row count is not significantly different from the expected row count. The expected row count is calculated based on the previous row count values using a time series based anomaly detection model. If the row count is significantly different from the expected row count, an anomaly is detected.

To read more about row count checks, refer to [row count check](https://docs.soda.io/soda/quick-start-sodacl.html#row-count-and-cross-checks).

### Time Based Partitioning

This step suggests adding time-based filtering to your data checks. It prompts you to specify a time range for the filtering, by default it is 1 day interval. Time-based filtering helps focus the data quality checks on a particular timeframe, allowing you to assess data quality within that specific range.

While generating the candidate partition columns, the CLI automatically filters the time based columns and ranks the column names in relevant order using heuristic methods.

More specifically, in case you approve time based column name and choose the interval the SodaCL will be updated as follows;

```yaml
# Filter
filter customer [daily]:
where: created_at > TIMESTAMP '${NOW}' - interval '1d'

checks for customer [daily]:
# SodaCL Checks
...
```

### Freshness Check

The freshness check evaluates the timeliness of your data. It compares the timestamps or dates associated with the data to a specified threshold or expected freshness interval. This check helps ensure that the data is up-to-date and reflects the desired time window for analysis.

The CLI automatically ranks the candidate freshness columns in relevant order and compute the freshness interval based on the heuristic methods. You can always change the column name and the freshness interval manually after generating the SodaCL YAML file.

```yaml
  # Add freshness check
  - freshness(date_first_purchase) < 19h
```

### Validity Check

The validity check examines the content of dataset automatically to find specific semantic data types within your data (E.g. email, phone number, etc.). It verifies if the values in those columns adhere to predefined rules or constraints using regular expressions. For example, it can check if a column intended for UUID data only contains UUID strings or if a date column follows a specific format.

The CLI prompts you to select the relevant columns that are candidates for validity checks.

Note that validity check suggestion only works for the columns with string data type (E.g. VARCHAR, CHAR, TEXT, etc.).

The following formats are supported for the validity check:

- UUID
- Email
- Phone Number
- Credit Card Number
- IP Address (IPv4 and IPv6)
- Money
- Timestamp
- Date
- Time

In case you approve the validity check, the SodaCL will be updated as follows;

```yaml
  # Add validity checks
  - invalid_count(email_address) = 0:
      valid format: email
```

To read more about the validity check, see [validity check](https://docs.soda.io/soda-cl/validity-metrics.html).

### Missing Value Check

The missing value check identifies any missing or null values within your dataset. The CLI prompts you to select the column names that you want to apply missing value check. By default, the threshold is set to 0, meaning that the check will fail if there are any missing values in the selected columns.

In case you approve the missing value check for multiple columns, the SodaCL will be updated as follows;

```yaml
  # Add missing value checks
  - missing_count(customer_key) = 0
  - missing_count(geography_key) = 0
  - missing_count(customer_alternate_key) = 0
  - missing_count(title) = 0
  - missing_count(first_name) = 0
  - missing_count(middle_name) = 0
  - missing_count(last_name) = 0
  - missing_count(name_style) = 0
  - missing_count(birth_date) = 0
  - missing_count(marital_status) = 0
  - missing_count(suffix) = 0
  - missing_count(gender) = 0
```

To read more about the missing value check, see [missing value check](https://docs.soda.io/soda-cl/missing-metrics.html).

### Duplicate Value Check

The duplicate value check identifies duplicate records or entries within your dataset. It identifies instances where multiple rows have the same values across specified columns, indicating potential data duplication or data entry errors. By default, the duplicate value threshold is set to 0 meaning that the check will fail if there are any duplicate values in the selected columns.

In case you approve duplicate value check for multiple columns, the SodaCL will be updated as follows;

```yaml
  # Add duplicate value checks
  - duplicate_count(customer_key) = 0
  - duplicate_count(geography_key) = 0
  - duplicate_count(customer_alternate_key) = 0
  - duplicate_count(title) = 0
  - duplicate_count(first_name) = 0
  - duplicate_count(middle_name) = 0
  - duplicate_count(last_name) = 0
  - duplicate_count(name_style) = 0
  - duplicate_count(birth_date) = 0
  - duplicate_count(marital_status) = 0
  - duplicate_count(suffix) = 0
  - duplicate_count(gender) = 0
```

## Conclusion

By following these suggested steps in your Check Suggestion CLI, users can systematically generate a SodaCL YAML file that includes these basic data quality checks. This provides a starting point for users to ensure the quality and integrity of their data before further analysis or processing. After generating the SodaCL file, the users can manually add, remove or modify the checks based on their specific needs.
