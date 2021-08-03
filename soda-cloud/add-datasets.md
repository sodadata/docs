---
layout: default
title: Add datasets
parent: Soda Cloud
---

# Add datasets in Soda Cloud

When you sign up for a new Soda Cloud account, the first thing to do is give Soda Cloud access to the data you wish to scan. To do so, you first connect Soda Cloud to your [data source]({% link soda/glossary.md %}#data-source), which is the storage location that contains your data, such as a database. Inside the data source are [datasets]({% link soda/glossary.md %}#data-source), such as tables, which Soda Cloud dynamically discovers during its first scan of your data.

![onboarding-add-datasets](/assets/images/onboarding-add-datasets.png){:height="350px" width="350px"}


## Connect to your data source

Overall, there are two steps in the process to add datasets to your Soda Cloud account. 

1. First, you connect to your data source and set a schedule for Soda Cloud to regularly scan your data. 
2. Then, Soda Cloud runs its first scheduled scan of data in your data source and discovers all of its datasets.  

Alternatively, you can install Soda SQL, a command-line developer tool, and connect it to your Soda Cloud account to add datasets. See [Connect to Soda Cloud]({% link soda-cloud/connect_to_cloud.md %}) for details.


### Connection Details

In Soda Cloud, navigate to **Datasets**, then click **Add Datasets** and follow the guided steps to connect a data source and schedule scans of your data. Soda Cloud requires **Connection Details** and **Import Settings**.

The Connection Details that Soda Cloud requires are specific to the type of data source you are connecting. For example, a PostgreSQL data source connection requires slightly different information than a connection to an Amazon Redshift data source. Refer to [Data source configurations]({% link soda/warehouse_types.md %}) for details.

Regardless of the type of data source you are connecting, Soda Cloud requires access credentials. Note that Soda Cloud stores your login credentials securely in our database; passwords are encrypyed and can only be read by the components of Soda SQL that connect to perform scans of your data.

### Import Settings

Use the following table as reference for configuring the Import Settings.

| Import Setting | Required? | Description |
| -------------- | ----------- |
| Schedule the automatic import of new datasets | optional | Enable and configure this setting to instruct Soda Cloud to regularly check for, and add, new datasets as they are added to your data source. | 
| Import Only Datasets Matching Filters | optional | Enable and configure this setting to limit the datasets that Soda Cloud scans according to the filters that you define. If your data source contains a large volume of datasets, you may wish to limit your scans to specific datasets according to content. |
| Set the default scan schedule. | required | Define a regular scan schedule that applies, by default, to all datasets in the data source. | 

## After the first scan

After Soda Cloud completes its first scan of your data according to the scan schedule you set, the **Datasets** dashboard displays all the datasets it automatically discovered in your data source. 

Soda Cloud also automatically creates a **row count anomaly detection monitor** for each dataset that contains time-series data. This enables Soda Cloud to start learning row count patterns in your dataset over the course of the next few scheduled scans and surface anything it recognizes as anomalous. 

From the **Datasets** dashboard, click one of your time-series datasets to open it, then select the **Monitors** tab to review the monitor that Soda Cloud created for you. Learn more about creating [anomaly detection monitors]({% link soda-cloud/anomaly-detection.md %}).  

You can also examine each dataset and configure any of the following optional settings:
<!--* display [column metrics]({% link soda-cloud/display-column-metrics.md %}) for all datasets-->
<!--* display [sample data]({% link soda-cloud/display-samples.md %}) for individual datasets-->
* adjust the [scan schedule]({% link soda-cloud/dataset-scan-schedule.md %}) for individual datasets
<!--* define [time partitioning]({% link soda-cloud/time-partitioning.md %}) for individual datasets-->
* define attributes for individual datasets, including data owner, tags, and a description

## Go further

* Next step in Soda Cloud Onboarding: [Integrate with Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack).
* Add datasets and run *ad hoc* scans using Soda SQL, if you like. See [Connect to Soda Cloud]({% link soda-cloud/connect_to_cloud.md %}) for details.
* Start testing your data by [creating a new monitor]({% link soda-cloud/monitors.md %}).
* Use automatated [anomaly detection]({% link soda-cloud/anomaly-detection.md %}) in your monitors.
* Examine [failed rows]({% link soda-cloud/failed-rows.md %}#) for a scan that results in failed tests.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.