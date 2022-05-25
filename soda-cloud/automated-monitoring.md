---
layout: default
title: Automated Monitoring
description: Use a SodaCL (Beta) automated monitoring to automatically check the row count anomalies and schema checks
parent: SodaCL
---

# Automated Monitoring![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

As in the name, automated monitoring automates common checks for the users. In the latest version, following checks are automated for the specified tables in your data source;

1. **Anomaly detection on row count**: Monitoring the number of rows after each scan and detects the anomalies if the latest row count behave abnormal.
2. **Schema checks**: Monitoring the schema changes including column addition, deletion, type changes and index changes. Default behavior is that soda scan will fail in case column deletion, type changes and index changes. For column addition, it will raise a warning.


[Prerequisites](#prerequisites)<br />
[Install Soda Core Scientific](#install-soda-core-scientific)<br />
[Connect Soda Core to Soda Cloud](#connect-soda-core-to-soda-cloud)<br />
[Define automated monitoring](#define-automated-monitoring)<br />
[Distribution check examples](#distribution-check-examples)<br />
[Troubleshoot Soda Core Scientific installation](#troubleshoot-soda-core-scientific-installation)<br />
[Go further](#go-further) <br />
<br />

## Prerequisites
* You have installed a <a href="https://docs.soda.io/soda-core/get-started.html#requirements" target="_blank">Soda Core package</a> in your environment.
* You have <a href="https://docs.soda.io/soda-core/configure.html" target="_blank">configured Soda Core</a> to connect to a data source using a <a href="https://docs.soda.io/soda-core/first-scan.html#the-configuration-yaml-file" target="_blank">`configuration.yml` file</a>. 
* You have [installed Soda Core Scientific](#install-soda-core-scientific) in the same directory or virtual environment in which you <a href="https://docs.soda.io/soda-core/get-started.html#requirements" target="_blank">installed Soda Core</a>.
* You <a href="https://docs.soda.io/soda-core/configure.html#connect-soda-core-to-soda-cloud" target="_blank">connect soda core to soda cloud</a>

## Install Soda Core Scientific

To use automated monitoring, you must install Soda Core Scientific in the same directory or virtual environment in which you installed Soda Core.

{% include install-soda-core-scientific.md %}

Refer to [Troubleshoot Soda Core Scientific installation](#troubleshoot-soda-core-scientific-installation) for help with issues during installation.



## Define automated monitoring check

1. If you have not already done so, create a `checks.yml` file in your Soda project directory. The checks YAML file stores the Soda Checks you write, including automated monitoring checks; Soda Core executes the checks in the file when it runs a scan of your data. Refer to more detailed instructions in the <a href="https://docs.soda.io/soda-core/first-scan.html#the-checks-yaml-file" target="_blank">Soda Core documentation</a>.
2. In your new file, add the following example content.
```yaml
automated monitoring:
  tables:
    - your-dataset
```
3. Replace the following values with your own dataset and threshold details.
* `your-dataset` - the name of your dataset that you want to apply automated monitoring

4. Run a soda scan of your data source to execute the automated monitoring you defined. Refer to <a href ="https://docs.soda.io/soda-core/first-scan.html#run-a-scan" target="_blank">Soda Core documentation</a> for more details.
```bash
soda scan -d your_datasource_name checks.yml 
```
Note that the number of rows for your table  `your-dataset` will be sent to Soda Cloud and the anomaly detection starts only after sending four scan results in four different days. For the schema check, the first `soda scan` will send the schema references. Starting from the second `soda scan`, the schema checks will be applied using the previous scan's schema reference. The schema reference is overwritten after completing the schema checks.

<br />

## Automated monitoring examples

You can include or exclude multiple tables from automated monitoring using the `include` or `exclude` tags as shown below. Let's say you have three different customer tables which are
`customer_1`, `customer_2` and `customer_3`. Also, your development team has three test tables; `test_1`, `test_2`, `test_3`. If you want to include customer tables and exclude test tables, you can simply run the following. `%` sign basically means `any`. It means that all tables that start with `customer` will be included into automated monitoring and tables starting with `test` will be excluded.

```yaml
automated monitoring:
  tables:
    - include customer%
    - exclude test%
```

If you have a custom table called `order`, you can still add this table into the automated monitoring as shown below;

You can also define multiple checks for different columns in the same dataset by generating multiple DROs for those columns. Refer to the following example.

```yaml
automated monitoring:
  tables:
    - include customer%
    - exclude test%
    - order
```

## Troubleshoot Soda Core Scientific installation

{% include troubleshoot-soda-core-scientific.md %}


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Use a [freshness check]({% link soda-cl/freshness.md %}) to gauge how recently your data was captured.
* Use [reference checks]({% link soda-cl/reference.md %}) to compare the values of one column to another.

---
{% include docs-footer.md %}
