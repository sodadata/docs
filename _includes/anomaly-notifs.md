The anomaly dashboard adheres to Soda's "no noise" policy when it comes to alert notifications for data quality issues. As such, the dashboard does not automatically send any notifications out of the box. If you wish to received alert notifications for any of the anomalies the dashboard detects, use the bell (🔔) icon. 

If your Soda Admin has integrated your Soda Cloud account with [Slack]({% link soda/integrate-slack.md %}) or [MS Teams]({% link soda/integrate-msteams.md %}) to receive check notifications, you can direct anomaly dashboard alerts to those channels. The dashboard does not support sending alerts via [webhook]({% link soda/integrate-webhooks.md %}). 

For a **Dataset Metric**, click the bell to follow the guided instructions to set up a rule that defines where to send an alert notification when Soda detects an anomalous measurement for the metric. 

![dataset-notifs](/assets/images/dataset-notifs.png){:height="500px" width="500px"}

For a **Column Metric**, click the bell next to an individual column name from those listed in the table below the three column metric tiles. Follow the guided instructions to set up a rule that defines where to send an alert notification when Soda detects an anomalous measurement for the metric. 

For example, if you want to receive notifications any time Soda detects an anomalous volume of duplicate values in an `order_id` column, click the **Duplicate** tile to display all the columns for which Soda automatically detects anomalies, then click the bell for `order_id` and set up a rule. If you also wish to receive notifications for anomalous volumes of missing values in the same column, click the **Missing** tile, then click the bell for `order_id` to set up a second rule. 

![column-notifs](/assets/images/column-notifs.png){:height="500px" width="500px"}
