# Manage scheduled scans

From time to time, Soda may encounter runtime issues when it attempts to run a data quality scan on data in your data source. Issues such as unresponsive databases, or incorrectly defined checks may cause delays in the scan process which can result in excessive check execution times, sluggish database responsiveness due to heavy loads, or scheduling conflicts with other processes that cause bottlenecks.

You can view the status of scans that are in progress, queuing, completed, or partially complete with errors in the **Scans** dashboard in Soda Cloud.

<figure><img src="../.gitbook/assets/scan-mgmt.png" alt=""><figcaption></figcaption></figure>

## Set alert notifications

To provide visibility into slow, incomplete, or failed Soda scans, you can set up customized alerts notifications for each **Scan Definition** that you created using Soda Cloud.

1. Log in to your Soda Cloud account, then navigate to **Scans**, and access the **Agents** tab. (You cannot set scan definition notifications for scans that you run using Soda Library.)
2. From the list, select one that uses the **Scan Definition** for which you wish to configure alerts.
3. On the scan definition's page, click the stacked dots at right, then select **Edit Scan Definition**.
4. Adjust the settings in the **Notifications** section to customize your scan definition alerts, then **Save**. Refer to the table below for guidance.

| Field or checkbox                                                                | Guidance                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Send a notification when a scan fails.                                           | Check this box to instruct Soda to send a notification when a scan fails to complete, or completes with errors.                                                                                                                                                                              |
| Send a notification when a scan does not occur according to the scan definition. | Check this box to instruct Soda to send a notification when a scan times out, meaning it does not complete within a specific time frame after the scheduled start time. See: [Configure scan timeouts](scan-mgmt.md#configure-scan-timeouts).                                                |
| Notify after                                                                     | Use the dropdown to select the time delay between when a scheduled scan fails or does not complete within the expected timeframe, and when Soda sends an alert notification. For example, set this to `12h` to receive a notification 12 hours after Soda logged the failed or delayed scan. |
| Notify recipients                                                                | Use this field to identify to whom Soda sends scan failure or delay alert notifications.                                                                                                                                                                                                     |

## Investigate scan issues

When you notice or receive a notification about a scan failure or delay, you can access the scan’s logs to investigate what is causing the issue.

1. Log in to your Soda Cloud account, then navigate to **Scans**, and access the **Agents** tab.
2. From the list of scan definitions, select the one that failed or timed out.
3. On the scan definitions’s page, in the list of scan results, locate the one that failed or timed out, then click the stacked dots to its right and select **Scan Logs**.
4. Review the scan log, using the filter to show only warning or errors if you wish, or downloading the log file for external analysis.

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

* Best practice dictates that to enhance scan efficiency, you avoid scheduling resource-intensive tasks, such as [data profiling](../soda-cl-overview/profile.md), concurrently with checks. This practice minimizes the likelihood of delays caused by resource contention, ensuring smoother execution of scans.
* Do not set all of your scan definitions to run at the same time, particularly if the scans use the same Soda Agent. Mindfully stagger scan definition times to more evenly distribute executions and reduce the risk of bottlenecks, delays, and failed scans.
* As the volume of checks a scan executes organically increases over time, scans may take longer to execute. If your scans are timing out too frequently, adjust the [scan timeout](scan-mgmt.md#configure-scan-timeouts) to a higher threshold.

## Go further

* [Set alert notification rules](../collaborate/notif-rules.md) for checks that fail or warn during a Soda scan.

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
