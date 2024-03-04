---
layout: default
title: Manage scheduled scans
description: 
parent: Run scans and view results
---

# Manage scheduled scans
*Last modified on {% last_modified_at %}*

From time to time, Soda may encounter runtime issues when it attempts to run a data quality scan on data in your data source. Issues such as unresponsive databases, or incorrectly defined checks may cause delays in the scan process which can result in excessive check execution times, sluggish database responsiveness due to heavy loads, or scheduling conflicts with other processes that cause bottlenecks.

You can view the status of scans that are in progress, queuing, completed, or partially complete with errors in the **Scans** dashboard in Soda Cloud.

![scan-mgmt](/assets/images/scan-mgmt.png){:height="700px" width="700px"}

[Set alert notifications](#set-alert-notifications)<br />
[Investigate scan issues](#investigate-scan-issues)<br />
[Cancel and restart scans](#cancel-and-restart-scans)<br />
[Configure scan timeouts](#configure-scan-timeouts)<br />
[Best practices for optimized scheduled scans](#best-practices-for-optimized-scheduled-scans)<br />
[Go further](#go-further)<br />
<br />

## Set alert notifications

To provide visibility into slow, incomplete, or failed Soda scans, you can set up customized alerts notifications for each **Scan Definition** that you created using Soda Cloud.

1. Log in to your Soda Cloud account, then navigate to **Scans**, and access the **Agents** tab. (You cannot set scan definition notifications for scans that you run using Soda Library.)
2. From the list, select one that uses the **Scan Definition** for which you wish to configure alerts.
3. On the scan definitions's page, click the stacked dots at right, then select **Edit Scan Definition**.
4. Adjust the settings in the **Notifications** section to customize your scan definition alerts, then **Save**. Refer to the table below for guidance.

| Field or checkbox | Guidance | 
| ----------------- | -------- |
| Send a notification when a scan fails. | Check this box to instruct Soda to send a notification when a scan fails to complete, or completes with errors. |  
| Send a notification when a scan does not occur according to the scan definition. | Check this box to instruct Soda to send a notification when a scan times out, meaning it does not complete within a specific time frame after the scheduled start time. See: [Configure scan timeouts](#configure-scan-timeouts). |
| Notify after | Use the dropdown to select the time delay between when a scheduled scan fails or does not complete within the expected timeframe, and when Soda sends an alert notification. For example, set this to `12h` to receive a notification 12 hours after Soda logged the failed or delayed scan. |
| Notify recipients | Use this field to identify to whom Soda sends scan failure or delay alert notifications. | 


## Investigate scan issues

{% include scan-logs.md %}


## Cancel and restart scans

Use the **Scans** page to access an overview of the executing and queuing scans in your Soda Cloud account. If you wish, you can cancel and restart a scan to manage the order in the queue.  

1. On the **Scans** page, select a scan that is in an `Executing` state. 
2. On the scan definition's page, click **Cancel Scan**.
3. When the scan state reads `Canceled`, you can click **Run Scan** from the same page to restart the scan.


## Configure scan timeouts

To prevent processing bottlenecks, configure a scan timeout on your Soda Agent to ensure that excessively long-running scans stop automatically. If you have configured a delayed completion alert using the procedure above, Soda uses this timeout value to trigger alert notifications.

By default, Soda sets the scan timeout to two hours; follow the steps below to adjust that value.

1. Log in to your Soda Cloud account, then navigate to **your avatar**, **Data Sources**, and access the **Agents** tab.
2. From the list of Agents, select the one for which you wish to adjust the timeout value.
3. On the agent's page, click the stacked dots at right, then select **Edit Agent**.
4. Use the dropdown to adjust the value of **Timeout Scans After**, then **Save**. Soda applies this timeout value to all scan definitions that use this Soda Agent. 


## Best practices for optimized scheduled scans

* Best practice dictates that to enhance scan efficiency, you avoid scheduling resource-intensive tasks, such as [data profiling]({% link soda-cl/profile.md %}), concurrently with checks. This practice minimizes the likelihood of delays caused by resource contention, ensuring smoother execution of scans.
* Do not set all of your scan definitions to run at the same time, particularly if the scans use the same Soda Agent. Mindfully stagger scan definition times to more evenly distribute executions and reduce the risk of bottlenecks, delays, and failed scans.
* As the volume of checks a scan executes organically increases over time, scans may take longer to execute. If your scans are timing out too frequently, adjust the [scan timeout](#configure-scan-timeouts) to a higher threshold.


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* [Set alert notification rules]({% link soda-cloud/notif-rules.md %}) for checks that fail or warn during a Soda scan.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}