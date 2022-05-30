---
layout: default
title: Sample Datasets
description: Use a SodaCL (Beta) sample datasets to quickly see the example rows of your datasets
parent: SodaCL
---

# Sample Datasets![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}
Sample datasets sends last 100 rows to soda cloud for you to see the example rows of your datasets in the UI.

[Prerequisites](#prerequisites)<br />
[Connect Soda Core to Soda Cloud](#connect-soda-core-to-soda-cloud)<br />
[Define sample datasets](#define-sample-datasets)<br />
[Go further](#go-further) <br />
<br />


## Prerequisites
* You have installed a <a href="https://docs.soda.io/soda-core/get-started.html#requirements" target="_blank">Soda Core package</a> in your environment.
* You have <a href="https://docs.soda.io/soda-core/configure.html" target="_blank">configured Soda Core</a> to connect to a data source using a <a href="https://docs.soda.io/soda-core/first-scan.html#the-configuration-yaml-file" target="_blank">`configuration.yaml` file</a>.
* You <a href="https://docs.soda.io/soda-core/configure.html#connect-soda-core-to-soda-cloud" target="_blank">connect soda core to soda cloud</a>


## Define sample datasets
1. If you have not already done so, create a `checks.yaml` file in your Soda project directory. The checks YAML file stores the Soda Checks you write, including the `sample datasets`; Soda Core executes the checks in the file when it runs a scan of your data. Refer to more detailed instructions in the <a href="https://docs.soda.io/soda-core/first-scan.html#the-checks-yaml-file" target="_blank">Soda Core documentation</a>.
2. In your new file, add the following example content. For `tables` syntax, optionally you can use `include` or `exclude` tags together with `wildcards` to choose or ignore multiple tables. In this example, we will send sample data to soda cloud for the datasets; `your-dataset`, all datasets starting with `customer` and all datasets that start with `test` will be excluded from the `sample datasets`.
```yaml
sample datasets:
  tables:
    - your-dataset
    - include customer%
    - exclude test%
```
3. Run a soda scan of your data source to execute the sample datasets you defined. Refer to <a href ="https://docs.soda.io/soda-core/first-scan.html#run-a-scan" target="_blank">Soda Core documentation</a> for more details. After running the scan, the check results will be shared with soda cloud.
```bash
soda scan -d your_datasource_name -c path/to/configuration.yaml checks.yaml
```
5. From your browser, go to <a href="https://dev.sodadata.io/datasets/overview" target="_blank">soda cloud datasets</a> and sign in with your account to see the sent sample datasets. When you sign in, click any of your dataset that you defined in the `check.yaml`file from the UI. Then, click `Sample Data` from the dataset navigation bar to check your sample data.

![Example sample datasets screenshot](../assets/images/soda-sample-datasets.png)

<br />

## Go further
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Use a [freshness check]({% link soda-cl/freshness.md %}) to gauge how recently your data was captured.
* Use [reference checks]({% link soda-cl/reference.md %}) to compare the values of one column to another.
---
{% include docs-footer.md %}