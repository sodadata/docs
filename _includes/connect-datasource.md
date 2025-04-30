1. In Soda Cloud, go to **your avatar** > **Data Sources**.
2. Click **New Data Source**, then follow the guided steps to create the connection.
Use the table below to understand what each field means and how to complete it:
3. Complete the connection configuration. These settings are specific to each data source (PostgreSQL, MySQL, Snowflake, etc) and usually include connection details such as host, port, credentials, and database name.

####  New Data Source Attributes

| Field or Label            | Guidance |
| -----------------------   | ---------- |
| Data Source Label | Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.|
| Agent | Select the Soda-hosted agent, or the name of a Soda Agent that you have previously set up in your secure environment. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Check Schedule | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression. |
| Starting At (UTC) | Select the time of day to run the scan. The default value is midnight. |
| Custom Cron Expression | (Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a> to define the schedule Soda Cloud uses to run scans. |
| Column Profiling Scan Schedule | Specify the time of day at which Soda runs the Automation scan.|
| Automation Scan Schedule | Specify the time of day at which Soda runs the daily anomaly dashboard scan.|
| Partition column suggestion - Optional | Add any amount of partition column suggestions. If a suggested column name fully matches a column discovered during metric monitoring or profiling, that column will be used as the partition column. The order of the suggested columns matters, as they will be checked sequentially from top to bottom until a match is found. If no match is found, heuristics will be applied to determine the partition column. You can change the partition column at any time in the dataset settings.|