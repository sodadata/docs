---
layout: default
title: Add anomaly detection dashboards
description: Use Soda's anomaly detection dashboard to get automated insights into your data quality.
parent: Run scans and view results
---

# Add anomaly detection dashboards
*Last modified on {% last_modified_at %}*

Use Soda's **anomaly detection dashboards** to get automated insights into basic data quality metrics for your datasets. 

![profile-anomalies](/assets/images/profile-anomalies.png){:height="700px" width="700px"}

To prepare this out-of-the-box dashboard, Soda learns enough about your data to automatically create checks that monitor several built-in metrics for anomalous measurements. To offer this observability into the basic quality of your data, the anomaly detection dashboard gauges:
* anomalies in a dataset's **row count** volume
* anomalies in the **timeliness** of new data in a dataset that contain a column with a TIME data type 
* evolutions in a dataset's **schemas**, monitoring columns that have been moved, added, or removed
* anomalies in the volume of **missing** values in columns in a dataset
* anomalies in the volume of **duplicate** values in columns in a dataset
* anomalies in the calculated **average** of ...

Using a Soda-hosted agent in your Soda Cloud account, you configure a data source to partition, then profile the datasets to which you wish to add an anomaly detection dashboard. Soda then leverages machine learning algorithms to run daily scans of your datasets to gather measurements which, after a few days, enables it to recognize patterns in your data. 

After establishing these patterns, Soda automatically detects anomalies relative to the patterns and flags them for your review in each dataset's anomaly detection dashboard.  

<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud + Self-hosted Soda Agent</small><br />
<small>✔️ &nbsp;&nbsp; Supported with a Soda-hosted Agent connected to a BigQuery, Databricks SQL, MS SQL Server,<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MySQL, PostgreSQL, Redshift, or Snowflake data source</small><br />
<br />

[Set up anomaly detection dashboards](#set-up-anomaly-detection-dashboards)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Add an anomaly dashboard to an existing dataset](#add-an-anomaly-dashboard-to-an-existing-dataset)<br />
[About the anomaly detection dashboard](#about-the-anomaly-detection-dashboard)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Empty metrics tiles](#empty-metrics-tiles)<br />
[Add anomaly notifications](#add-anomaly-notifications)<br />
[About profiling and partitioning](#about-profiling-and-partitioning)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Change the time partitioning column](#change-the-time-partitioning-column)<br />
[Go further](#go-further)<br />
<br />

## Set up anomaly detection dashboards

Add an anomaly detection dashboard to one or more datasets by configuring profiling for a new data source in Soda Cloud. Refer to the [Get started]({% link soda-agent/managed-agent.md %}#add-a-new-data-source) documentation for full data source onboarding instructions. 

1. As a Soda Admin in your Soda Cloud account, navigate to **your avatar** > **Organization Settings** to validate that the checkbox for **Enable Soda-hosted Agent** is checked. 
2. If your data source is [compatible]({% link soda-agent/managed-agent.md %}#compatibility) with a Soda-hosted agent, navigate to **your avatar** > **Data Sources**, then click **Add New** to begin the guided data source onboarding workflow. 
3. In the editing panel of **4. Profile**, use the include and exclude syntax to indicate which datasets Soda must profile and prepare an anomaly detection dashboard. The default syntax in the editing panel instructs Soda to profile every column of every dataset in the data source, and, superfluously, all datasets with names that begin with prod. The `%` is a wildcard character. See [Add column profiling]({% link soda-cl/profile.md %}#add-column-profiling) for more detail on profiling syntax.
    ```yaml
    profile columns:
      columns:
        - "%.%"  # Includes all your datasets
        - prod%  # Includes all datasets that begin with 'prod'
    ```
3. Continue the remaining steps to add your new data source, then **Test Connection**, if you wish, and **Save** the data source configuration. Soda begins profiling the datasets according to your **Profile** configuration while the algorithm uses the first measurements collected from a scan of your data to begin the work of identifying patterns in the data. 
4. After approximately five days, during which Soda's machine learning studies your data, you can navigate to the **Dataset** page for a dataset you included in profiling. Click the **Anomalies** tab to view the issues Soda automatically detected.
5. (Optional) Consider setting up a notification for any of the automated anomaly detection checks in the dashboard; see [Add anomaly notification](#add-anomaly-notifications).
6. (Optional) If you wish, you can adjust the time of day that the daily anomaly detection scan definition runs to collect its measurements. To do so, navigate to ...


### Add an anomaly dashboard to an existing dataset

Use the following procedure to activate the anomaly detection dashboard for an existing dataset in a data source you already connected to your Soda Cloud account via the Soda-hosted agent.

1. If you have Admin, Manager, or Editor rights to a dataset, navigate to the **Datasets** dashboard, then open the dataset to which you wish to activate an anomaly detection dashboard. 
2. Navigate to the **Anomalies** tab where a message appears that advises you that the anomaly detection dashboard has not been activated for this dataset. Click **Activate**. 
3. Follow the guided steps and carefully read the warnings about the changes to any existing profiling you have configured for the data source. The changes you make to activate the anomaly detection dashboard on one dataset changes any profiling you have configured for all datasets in the data source. If you accept the irreversible changes, click to proceed.
> To activate the Anomaly Detection Dashboard for this data source, Soda creates a new, dedicated scan definition that runs dataset discovery, profiling, and anomaly detection on a daily schedule. With this activation, be aware that the following consequences are irreversible:
* any dataset [discovery and profiling](https://go.soda.io/display-profile) that you configured for this data source no longer applies; dataset discovery and profiling actions become a part of the new scan definition
* any [automated monitoring](https://go.soda.io/auto-monitoring) checks you previously configured cease to exist; the new scan definition runs all automated anomaly detection checks
* all non-automated checks for datasets on this data source remain intact
4. After approximately five days, during which Soda's machine learning studies your data, you can return to the **Anomalies** tab on the **Dataset** page to view the issues Soda automatically detected.
5. (Optional) Consider setting up a notification for any of the automated anomaly detection checks in the dashboard; see [Add anomaly notification](#add-anomaly-notifications).
6. (Optional) If you wish, you can adjust the time of day that the daily anomaly detection scan definition runs to collect its measurements. To do so, navigate to ...


## About the anomaly detection dashboard

To access a dataset's anomaly dashboard in Soda Cloud, navigate to the **Datasets** dashboard, then select a dataset from the presented list to open an individual dataset page. Navigate to the **Anomalies** tab. 

![profile-anomalies](/assets/images/profile-anomalies.png){:height="700px" width="700px"}

The three **Dataset Metrics** tiles represent the most recent measurement or, in other words, one day's worth of data anomaly detection. The three **Column Metrics** tiles display the last seven days' worth of measurements and any anomalies that Soda detected. 

When you click a **Column Metrics** tile to access more information, the list below details which columns contained anomalies. A grayed-out icon for a column indicates that ... 

Click a Dataset Metric tile or the column name for a Column Metric to open the **Check History** for the anomaly detection check. Optionally, you can add feedback to individual data points in the check history graph to help refine the anomaly detection's algorithm pattern recognition and its ability to recognize anomalies. 

![check-feedback](/assets/images/check-feedback.png){:height="600px" width="600px"}


### Empty metrics tiles

If, after the anomaly detection algorithm has completed its pattern training, the anomaly detection dashboard does *not* display anomaly info in one or more tiles, it may be for one of a couple of reasons.
* There is no column that contains TIME type data (TIMESTAMP, DATE, DATETIME, etc.) which a freshness check requires. Where it cannot detect a column with the necessary data type, Soda leaves the **Freshness** tile blank.
* There is no column that contains NUMBER type data (INT, FLOAT, etc.) which an average metric check requires. Where it cannot detect a column with the necessary data type, Soda leaves the **Average** tile blank.


## Add anomaly notifications

The anomaly detection dashboard adheres to Soda's "no noise" policy when it comes to alert notifications for data quality issues. As such, the dashboard does not automatically send any notifications out of the box. If you wish to received alert notifications for any of the anomalies the dashboard detects, use the bell (🔔) icon. 

If your Soda Admin has integrated your Soda Cloud account with [Slack]({% link soda/integrate-slack.md %}) or [MS Teams]({% link soda/integrate-msteams.md %}) to receive check notifications, you can direct anomaly detection dashboard alerts to those channels. The dashboard does not support sending alerts via [webhook]({% link soda/integrate-webhooks.md %}). 

For a **Dataset Metric**, click the bell to follow the guided instructions to set up a rule that defines where to send an alert notification when Soda detects an anomalous measurement for the metric. 

![dataset-notifs](/assets/images/dataset-notifs.png){:height="500px" width="500px"}

For a **Column Metric**, click the bell next to an individual column name from those listed in the table below the three column metric tiles. Follow the guided instructions to set up a rule that defines where to send an alert notification when Soda detects an anomalous measurement for the metric. 

For example, if you want to receive notifications any time Soda detects an anomalous volume of duplicate values in an `order_id` column, click the **Duplicate** tile to display all the columns for which Soda automatically detects anomalies, then click the bell for `order_id` and set up a rule. If you also wish to receive notifications for anomalous volumes of missing values in the same column, click the **Missing** tile, then click the bell for `order_id` to set up a second rule. 

![column-notifs](/assets/images/column-notifs.png){:height="500px" width="500px"}

<br />

## About profiling and partitioning

The anomaly detection dashboard is powered by a machine learning algorithm that works with measured values for a metric that occurs over time. Soda leverages the <a href="https://facebook.github.io/prophet/" target="_blank">Facebook Prophet</a> algorithm to learn patterns in your data so it can identify and flag anomalies.

As the checks in the dashboard track and analyze metrics over time, the algorithm learns from historical patterns in your data, including trends and seasonal variations in the measurements it collects. After learning the normal behavior of your data, the checks become capable of detecting variations from the norm which it flags as anomalies.

Notably, it takes some time – approximately five or more days – for the anomaly detection dashboard to learn the patterns of your data before it can display meaningful results. 
 
When you set up or activate the anomaly detection dashboard, Soda begins by partitioning your data. To maximize efficiency, Soda does not profile the *entirety* of data in a dataset; instead, it partitions your data so that it profiles only a sample of the data. 

First, Soda detects a column that contains TIME type data that it can use to partition the data to only the last 30 days' worth of data. If it does not detect a column of TIME type data, it uses one million rows of data against which to perform its profiling. If there are fewer than one million rows in a dataset, it profiles all the data; if there are more than a million rows, it selects a random sample of a million rows to use to profile the data.

After partitioning a sample of data, Soda begins profiling your data. The profiling activity collects metadata for your datasets such as the names of the columns in the datasets you configured for profiling, and the type of data that each contains. After profiling the data, Soda automatically creates relevant anomaly detection checks for the dataset and some of its columns.

### Change the time partitioning column

If you wish, you can change the column which Soda automatically selected to partition your data. For example, if Soda selected a column with TIMESTAMP data labeled `created_at` to partition your data, but you would prefer that it use a `last_updated` column instead, you can make the change in Soda Cloud.

When you choose a new time partition column, the anomaly detection dashboard algorithm *resets*, freshly partitioning the data based on the new column, then profiling the data and training on at least five days of measurements before displaying new results. The dashboard does not persist any existing anomaly detection dashboard measurements.

1. With Admin, Manager, or Editor rights to a dataset in Soda Cloud, navigate to the **Dataset** page, then access the **Anomalies** tab.
2. Click the stacked dots at the upper right of the page, then select **Edit dataset**. 
3. In the dialog box that appears, access the **Profiling** tab, then use the dropdown list of columns to select the one that you want Soda to use to partition your data for profiling for use in the anomaly detection dashboard.
4. Carefully read the warning message about the consequences of the change, then **Save**.


## Go further

* Add your own [anomaly detection checks]({% link soda-cl/anomaly-detection.md %}) for other metrics for your data.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}