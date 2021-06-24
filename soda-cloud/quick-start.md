---
layout: default
title: Quick start for Soda Cloud
parent: Soda Cloud
redirect_from: /soda-cloud.html
---

# Quick start tutorial for Soda Cloud

Sign up for a new Soda Cloud account, then **connect** to Soda SQL, **create a new monitor** that notifies your team when "bad" data surfaces, then **run a scan** to see results in the Soda Cloud web application.
<br />

![cloud-tutorial-happy-path](/assets/images/cloud-tutorial-happy-path.png){:height="650px" width="650px"}

## Connect to Soda SQL

Soda Cloud and Soda SQL work together to help you monitor your data and alert you when there are issues with your data.  

* **Soda SQL** is an open-source command line tool that does the work of scanning the data in your database. You can use this as a stand-alone tool to scan your data and review the scan results in your command-line interface..
* **Soda Cloud** is the web application to which Soda SQL pushes the results of its scans. Log in to the free web app to examine the visualized results of Soda SQL scans, view historical scan data, and set up alerts that automatically notify your team when there is an issue with your data. 

1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
2. From your command-line interface (CLI), follow the instructions to [install Soda SQL]({% link soda-sql/installation.md %}) in your local or development environment. 
3. Follow the [Quick start tutorial for Soda SQL]({% link soda-sql/5_min_tutorial.md %}) that uses a demo data source and guides you through configuration and scanning.
4. Soda SQL uses an API to connect to Soda Cloud. Follow the instructions to [connect Soda SQL to your Soda Cloud account]({% link soda-cloud/connect_to_cloud.md%}). When complete, you can see the results of your Soda SQL scan appear as a row in the **Monitor Results** table in Soda Cloud.


## Create a monitor and alert

A monitor is a set of details you define in Soda Cloud which Soda SQL uses when it runs a scan. Soda Cloud guides you through the steps to define a monitor, create alert triggers, then specify notification instructions. 

1. In Soda Cloud, navigate to your **avatar** > **Organization Settings** > **Integrations**, then follow the guided steps to authorize Soda Cloud to connect to your Slack workspace.
2. In Soda Cloud, navigate to the **Datasets** dashboard, then select **demodata** to open the dataset. Go to the **Monitors** tab, then click the stacked dots to select **Create monitor**. Follow the guided steps to complete the setup using the values below to fill in the fields. These values will yield a failed test result so you can witness Soda Cloud's ability to send a notification to your team.
* Monitor type: Metric
* Dataset: demodata 
* Metric type: Average 
* Column: size
* Evaluation type: Threshold 
* Alerts: Critical Alert; is greater than; 4000
3. Specify the Slack notifications you want to send when bad data triggers the Critical Alert you set up, then **Save** your monitor. 


## Run a scan

1. Access your command line tool, then use Soda SQL to scan your data again.
```shell
soda scan warehouse.yml tables/demodata.yml
```
2. When the scan finishes running, check your Slack channel: Soda Cloud has sent a notification! 
3. Navigate to the **Monitor Results** dashboard and refresh the page in your browser. New rows appear in the table of Monitor Results, one of which is associated with the monitor you just created. Each row in this table represents the result of a test that passed or failed during the scan you ran using Soda SQL. Click the row for the monitor you created to see details about the scan result.  

![cloud-tutorial-result](/assets/images/cloud-tutorial-result.png){:height="500px" width="500px"}


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn more about [Soda Cloud Architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
* Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Use Soda Cloud to [examine failed rows]({% link soda-cloud/failed-rows.md %}).
* Use Soda Cloud to automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data.
