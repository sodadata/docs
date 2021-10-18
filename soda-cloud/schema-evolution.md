---
layout: default
title: Schema evolution monitor
parent: Soda Cloud 
---

# Schema evolution monitor

In Soda Cloud, you can create a monitor that automatically detects changes in your dataset's schema. 

**Schema Evolution** is a type of monitor that notifies you when columns in a dataset have been added, removed, or changed since the previous Soda scan of the dataset. You can set the type of alert - Warning or Critical - associated with each evolution event. For example, you can configure the monitor so that additions and changes to your dataset's schema issue a Warning, while a removal of a column in the dataset issues a Critical alert.  




## Use a schema evolution monitor

To create a schema evolution monitor, you must be an Admin of the organization, or have a Manager or Editor role for the monitor's dataset. See [Roles and rights]({% link soda-cloud/roles-and-rights.md %}) for details. 

1. Note that you can create only one Schema Evolution monitor per dataset. Follow the workflow in Soda Cloud to [create a new monitor]({% link soda-cloud/monitors.md %}) and, when prompted, select **Schema Evolution** as the **Monitor Type**. 
2. Complete the monitor creation flow, including the type of alert - Warning or Critical - that you wish to associate with each schema evolution event: column(s) added, column(s) removed, and column(s) changed.

When you access the **Monitors** dashboard to review the monitor's test results, the bar chart that displays the volume of each type of event that has occurred in your schema. The **Diagnostics** and **Schema** tabs below the chart offer more granular insight into the events that occurred. Note that the monitor displays results only after Soda Cloud has collected at least two measurements, or in other words, after it has completed two scans of the same dataset.


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn how to [Create monitors and alerts]({% link soda-cloud/monitors.md %}).
* Learn more about automatically [detecting anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data. 
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.