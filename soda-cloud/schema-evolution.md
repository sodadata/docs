---
layout: default
title: Monitor schema evolution
description: Soda Cloud automatically creates a monitor that notifies you when columns in a dataset have been added, removed, or changed over time.
parent: Soda Cloud 
---

# Monitor schema evolution

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda Cloud with Soda SQL</label>
  <label class="tab" id="two-tab" for="two">Soda Cloud with Soda Core (Beta)</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

In Soda Cloud, you can create a monitor that automatically detects changes in your dataset's schema. 

**Schema Evolution** is a type of monitor that notifies you when columns in a dataset have been added, removed, or changed since the previous Soda scan of the dataset. You can set the type of alert – Warning or Critical – associated with each evolution event. For example, you can configure the monitor so that additions and changes to your dataset's schema issue a Warning, while a removal of a column in the dataset issues a Critical alert.  


## Use a schema evolution monitor

Soda Cloud automatically adds a schema evolution monitor to every new dataset you onboard using Soda SQL. In other words, when you use Soda SQL to connect to a new data source, then run `soda analyze` to discover all of its datasets, Soda SQL sends the dataset information to your Soda Cloud account. Soda Cloud then automatically creates a new schema evolution monitor for each of the datasets in your data source.

To manually create a schema evolution monitor, you must be an Admin of the organization, or have a Manager or Editor role for the monitor's dataset. See [Roles and rights]({% link soda-cloud/roles-and-rights.md %}) for details. 

1. Note that you can create only one Schema Evolution monitor per dataset. Follow the workflow in Soda Cloud to [create a new monitor]({% link soda-cloud/monitors.md %}) and, when prompted, select **Schema Evolution** as the **Monitor Type**. 
2. Complete the monitor creation flow, including the type of alert, Warning or Critical, that you wish to associate with each schema evolution event: column(s) added, column(s) removed, and column(s) changed.

When you access the **Monitors** dashboard to review the monitor's test results, the bar chart displays the volume of each type of event that has occurred in your schema. The **Diagnostics** and **Schema** tabs below the chart offer more granular insight into the events that occurred. Note that the monitor displays results only after Soda Cloud has collected at least two measurements, or in other words, after it has completed two scans of the same dataset.

  </div>
  <div class="panel" id="two-panel" markdown="1">

**Schema Evolution** is a type of check that you can use to monitor the columns in your dataset. You can set the type of alert – warn or fail – associated with each evolution event. For example, you can configure the check so that a change in the ordring of your columns triggers a warning, while a removal of a column in the dataset triggers a failure.  

In Soda Cloud, you can only create new schema evolution monitors for datasets connected to an instance of Soda SQL; you cannot create schema evolution monitors for datasets connected to Soda Core (Beta), yet. 

Instead, you can use SodaCL (Beta) to write <a href="https://docs.soda.io/soda-cl/schema.html" target="_blank">schema check</a> in a <a href="https://docs.soda.io/soda-core/first-scan.html#the-checks-yaml-file" target="_blank">checks YAML file</a><br /> for Soda Core to execute during a scan. You can <a href="https://docs.soda.io/soda-core/configure.html#connect-soda-core-to-soda-cloud" target="_blank">connect</a> Soda Core to your Soda Cloud account to see the check results after each scan. 

<a href="https://docs.soda.io/soda-core/overview.html" target="_blank">Soda Core (Beta) documentation</a><br />
<a href="https://docs.soda.io/soda-cl/soda-cl-overview.html" target="_blank">SodaCL (Beta) documentation</a>

  </div>
  </div>
</div>


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn how to [Create monitors and alerts]({% link soda-cloud/monitors.md %}).
* Learn more about automatically [detecting anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data. 
<br />

---
{% include docs-footer.md %}