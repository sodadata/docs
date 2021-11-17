---
layout: default
title: Soda SQL overview
parent: soda-sql
---

# Soda SQL overview

1. Install Soda SQL OSS from the command line. 
2. Run `soda create` to a connect to your data source -- Snowflake, Amazon Athena, Google Big Query, etc.
3. Run `soda analyze` to auto-generate YAML files for each table in your data source. Adjust the YAML file to prepare SQL queries that run tests on datasets in a data source to find invalid, missing, or unexpected data. 
4. Run `soda scan` to execute the tests on your table. When tests fail, they surface the data that you defined as “bad” in the tests. 

#### Example YAML file
```yaml
table_name: breakdowns
# Simple test to validate that a table has rows
tests:
  - row_count > 0

# Tests that numbers in the column are entered in a valid format as whole numbers
columns:
  incident_number:
    valid_format: number_whole
    tests:
      - invalid_percentage == 0

# Tests that no values in the column are missing
  bus_no:
    tests:
      - missing_count == 0
```



## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.