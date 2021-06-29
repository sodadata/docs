---
layout: default
title: Detect anomalies
parent: Soda Cloud
---

# Add datasets in Soda Cloud

When you sign up for a new Soda Cloud account, the first thing to do is give Soda Cloud access to the data you wish to scan. To do so, you first connect Soda Cloud to your **data source**, which is the storage location that contains your data such as a database. Inside the data source are **datasets**, such as tables, which Soda Cloud dynamically discovers during its first scan of your data.

Overall, there are two steps in the process to add datasets to your Soda Cloud account. 

1. First, you connect to your data source and set a schedule for Soda Cloud to regularly scan your data. 
2. Then, after Soda Cloud has completed its first scan of data in your data source and has discovered its datasets, you can configure some optional settings specific to individual datasets such as, enabling sample data capture, defining a custom scan schedule, and configuring time partioning parameters for discovering new rows.  

After Soda Cloud completes its next scan of your data using your new, individual dataset configurations, you can use the sample data to study the data in the dataset and create a new monitor.


## Connect to your data source

In Soda Cloud, navigate to **Datasets**, then click **Add Datasets** and follow the guided steps to connect a data source and schedule scans of your data. 

Soda Cloud requires the following **Connection Details** and **Import Settings**.

| Connection detail | Value | 
| ----------------------- | ----- |
| Data source name  | Use the name of your data source. | 
| Data source type  | One of the [Soda Cloud-compatible]({% link soda-sql/installation.md %}#compatibility) data sources. |
| Host  | The IP address that identifies the location of your data source. |
| Username  | The username you use to log in to your data source. <sup>1</sup> |  
| Password  | The password you use to log in to your data source. <sup>1</sup> | 
| Database  | The name of your database |
| Schema  | The schema your database uses. |

<sup>1</sup> Soda Cloud stores your login credentials securely as environement variables.

| Import setting | Required? | Description |
| -------------- | ----------- |
| Schedule the automatic import of new datasets | optional | Enable and configure this setting to instruct Soda Cloud to regularly check for, and add, new datasets as they are added to your data source. | 
| Import Only Datasets Matching Filters | optional | Enable and configure this setting to limit the datasets that Soda Cloud scans according to the filters that you define. If your data source contains a large volume of datasets, you may wish to limit your scans to specific datasets according to content. |
| Set the default scan schedule. | required | Define a regular scan schedule that applies, by default, to all datasets in the data source. | 

After Soda Cloud completes its first scan of your data according to the scan schedule you set, you can configure any of the following optional, dataset-specific settings:
* column metrics
* sample data
* scan schedule
* time partitioning
* attributes


## Enable column metrics and sample data

Using the information Soda Cloud discovered about your datasets during its first scan of your data, you can optionally instruct it to capture column metrics and sample data of specific datasets during the next scheduled scan. 
* Enable **column metrics** to get at-a-glance insight about the data in your dataset in the **Datasets** view, such as row and column counts, and last arrival time of data.
* Enable **sample data** to display a few sample rows of data in Soda Cloud so that you can make informed choices about the tests to run against your data when you create a monitor.

1. From the **Datasets** dashboard, select a dataset from the data source you just connected. 
2. In the **Dataset** view, ... not sure how to trigger "enable column metrics"
3. Click the **Sample data** tab to enable Soda Cloud to capture sample data for the column during its next scan. Do not enable sample data if your data source contains sensitive information or personally identifiable information (PII).

After the next scheduled scan, use the sample data and column metrics Soda Cloud captured to create a new monitor.

## Adjust a scan schedule for a dataset

By default, Soda Cloud conducts a scan of each dataset in your data source according to the schedule you set when you configured the data source connection. If you wish, you can set a scan schedule specific to an individual datasest. For example, you can specify a more frequent scan schedule for a dataset that changes often.

1. From the **Datasets** dashboard, select a dataset from the data source you just connected. 
2. In the **Dataset** view, clicked the stacked dots icon for the dataset you wish to edit. 
3. In the **Scan Schedule** tab, uncheck the box to "Use Data Source Default Schedule", then adjust the scan schedule as needed.  If you wish to trigger Soda scans externally, select "Schedule Externally" in the **Dataset Scan Schedule** field, then copy the JSON or CURL snippet to use outside Soda Cloud to send a POST to the command API. 
4. Save your changes, then wait for Soda Cloud to complete the next scan of your dataset according to the new scan schedule you set.

## Define time partitioning for a dataset

By default, Soda Cloud scans all the data in your datasets each time it conduct a scan. If you wish, you can adjust the time partitioning of a dataset to instruct Soda Cloud to scan *only* the data that has been added to the dataset since the time it last conducted a scan. For example, you can enable time partitioning on a dataset with a large volume of static data to which small volumes of data are regularly added.

1. From the **Datasets** dashboard, select a dataset from the data source you just connected. 
2. In the **Dataset** view, clicked the stacked dots icon for the dataset you wish to edit. 
3. In the **Time Partitioning** tab, use SQL syntax to define a time partition for scans using two variables: {% raw %} {{ `lastScanTime` }} {% endraw %} and {% raw %} {{ `scanTime` }} {% endraw %}.
4. Save your changes, then wait for Soda Cloud to complete the next scan of your dataset according to the new scan schedule you set.

## Define attributes for a dataset

Use the **Attributes** tab of the **Dataset** view to define details of your dataset that you and your teammates can use to search for the dataset. 

You can define attributes such as:
* Data owner
* Business unit
* Data domain

You can also add tags and provide a description of the dataset for others to reference.