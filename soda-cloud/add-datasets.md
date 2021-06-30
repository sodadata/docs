---
layout: default
title: Detect anomalies
parent: Soda Cloud
---

# Add datasets in Soda Cloud

When you sign up for a new Soda Cloud account, the first thing to do is give Soda Cloud access to the data you wish to scan. To do so, you first connect Soda Cloud to your [data source]({% link soda/glossary.md %}#data-source), which is the storage location that contains your data such as a database. Inside the data source are [datasets]({% link soda/glossary.md %}#data-source), such as tables, which Soda Cloud dynamically discovers during its first scan of your data.

Overall, there are two steps in the process to add datasets to your Soda Cloud account. 

1. First, you connect to your data source and set a schedule for Soda Cloud to regularly scan your data. 
2. Then, after Soda Cloud has completed its first scheduled scan of data in your data source and has discovered its datasets, you can configure some optional settings pertaining to datasets such as enabling sample data capture, defining a custom scan schedule, and configuring time partioning parameters for discovering new rows.  

After Soda Cloud completes its next scan of your data using your new, individual dataset configurations, you can use the sample data to study the data in the dataset and [create a new monitor]({% link soda-cloud/monitors.md %}).


## Connect to your data source

In Soda Cloud, navigate to **Datasets**, then click **Add Datasets** and follow the guided steps to connect a data source and schedule scans of your data. Soda Cloud requires **Connection Details** and **Import Settings**.

### Connection Details

The Connection Details that Soda Cloud requires are specific to the type of data source you are connecting. For example, a Big Query data source connection requires slightly different information than a connection to an Amazon Redshift data source. Refer to [Data source configurations]({% link soda/warehouse_types.md %}) for details.

Regardless of data source type, Soda Cloud requires access credentials. Note that Soda Cloud stores your login credentials securely in an encrypyed store. TODO: verify storage location.

### Import Settings

Use the following table as reference for configuring the Import Settings.

| Import Setting | Required? | Description |
| -------------- | ----------- |
| Schedule the automatic import of new datasets | optional | Enable and configure this setting to instruct Soda Cloud to regularly check for, and add, new datasets as they are added to your data source. | 
| Import Only Datasets Matching Filters | optional | Enable and configure this setting to limit the datasets that Soda Cloud scans according to the filters that you define. If your data source contains a large volume of datasets, you may wish to limit your scans to specific datasets according to content. |
| Set the default scan schedule. | required | Define a regular scan schedule that applies, by default, to all datasets in the data source. | 

After Soda Cloud completes its first scan of your data according to the scan schedule you set, you can configure any of the following optional settings:
* display [column metrics](#enable-column-metrics-for-all-datasets) for all datasets
* present [sample data](#enable-sample-data-for-a-dataset) for individual datasets
* adjust the [scan schedule](#adjust-the-scan-schedule-for-a-dataset) for individual datasets
* define [time partitioning](#define-time-partitioning-for-a-dataset) for individual datasets
* define [attributes](#define-attributes-for-a-dataset) for individual datasets


## Enable column metrics for all datasets

Using the information Soda Cloud discovered about your datasets during its first scan of your data, you can optionally instruct it to capture **column metrics** for all datasets during the next scheduled scan. Enabling column metrics gives you at-a-glance information about your datasets in the **Datasets** dashboard and the dataset's **Column** tab. 

Datasets dashboard
![display-column-metrics](/assets/images/display-column-metrics.png){:height="650px" width="650px"}

Dataset's Column tab
![column-tab](/assets/images/column-tab.png){:height="650px" width="650px"}

Consider *not* enabling column metrics if your data source contains a large volume of datasets. Soda Cloud's performance may be affected if it must fetch and display metadata from a great number of datasets.

1. From the **Datasets** dashboard, click the link in the "Almost done!" banner, or click the gear icon.
2. When prompted, check the box to **Enable Column Metrics**, then save. If you see a message that asks you to review time partitioning settings before enabling, TODO: what now? do you have to review the time partitioning settings for each dataset?

During the next scheduled scan, Soda Cloud captures column metrics for each dataset and displays the information in the **Dataset** dashboard and in the dataset's **Column** tab. Use the column metrics to help you make informed choices when you [create a new monitor]({% link soda-cloud/monitors.md %}).

## Enable sample data for a dataset

Using the information Soda Cloud discovered about your datasets during its first scan of your data, you can optionally instruct it to capture **sample data** for specific datasets during the next scheduled scan. Enable sample data to display sample rows of data in Soda Cloud (maximum of 1000) so that you can make informed choices about the tests to run against your data when you create a monitor. 

DO NOT enable sample data if your dataset contains sensitive information or personally identifiable information (PII).

1. From the **Datasets** dashboard, open the dataset on which you want to enable sample data.
2. Click the **Sample data** tab, then check **Enable Sample Data** to enable Soda Cloud to capture sample data for the dataset during its next scan. If you see a message that asks you to review time partitioning settings before enabling, follow the [steps below](#define-time-partitioning-for-a-dataset) to review the settings for the dataset.

Use the sample data to gain some insight into the data contained in your dataset and help you determine the ways in which you want to test it when you [create a new monitor]({% link soda-cloud/monitors.md %}).

## Adjust the scan schedule for a dataset

By default, Soda Cloud conducts a scan of each dataset in your data source according to the schedule you set when you configured the data source connection. If you wish, you can set a scan schedule specific to an individual datasest. For example, you can specify a more frequent scan schedule for a dataset that changes often.
 
1. In the **Dataset** dashboard, click the stacked dots icon of the dataset you wish to edit. 
2. In the **Scan Schedule** tab, uncheck the box to **Use Data Source Default Schedule**, then adjust the scan schedule as needed.  <br > If you wish to trigger Soda scans externally, select **Schedule Externally** in the **Dataset Scan Schedule** field, then copy the JSON or CURL snippet to use outside Soda Cloud to send a POST call to https://cloud.soda.io/api/command. 
3. Save your changes, then wait for Soda Cloud to complete the next scan of your dataset according to the new scan schedule you set.

## Define time partitioning for a dataset

By default, Soda Cloud scans all the data in your datasets each time it conduct a scan. If you wish, you can adjust the time partitioning of a dataset to instruct Soda Cloud to scan *only* the data that has been added to the dataset since the time it last conducted a scan. For example, you can enable time partitioning on a dataset with a large volume of static data to which small volumes of data are regularly added.

1. In the **Datasets** dashboard, click the stacked dots icon of the dataset you wish to edit. 
2. In the **Time Partitioning** tab, use SQL syntax to define a time partition for scans using two variables: {% raw %} {{ `lastScanTime` }} {% endraw %} and {% raw %} {{ `scanTime` }} {% endraw %}. 
3. Save your changes, then wait for Soda Cloud to complete the next scan of your dataset according to its schedule.

## Define attributes for a dataset

Use the **Attributes** tab of the **Dataset** dashboard to define details of your dataset that you and your teammates can use to search for the dataset. 

You can define attributes such as:
* Data owner (By default, you are the owner of any dataset you add.)
* Business unit
* Data domain

You can also add tags and provide a description of the dataset for others to reference, and you can create new attributes that suit your business needs.


## Go further

* Start testing your data by [creating a new monitor]({% link soda-cloud/monitors.md %}).
* Examine the [failed rows]({% link soda-cloud/failed-rows.md %}) of any monitors with failed tests.
* Use automatated [anomaly detection]({% link soda-cloud/anomaly-detection.md %}) in your monitors.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.