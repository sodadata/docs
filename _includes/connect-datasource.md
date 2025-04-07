1. In Soda Cloud, go to **your avatar** > **Data Sources**.
2. Click **New Data Source**, then follow the guided steps to create the connection.
Use the table below to understand what each field means and how to complete it:

####  Attributes

| Field or Label            | Guidance |
| -----------------------   | ---------- |
| Data Source Label | Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.|
| Default Scan Agent | Select the Soda-hosted agent, or the name of a Soda Agent that you have previously set up in your secure environment. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Check Schedule | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression. |
| Starting At (UTC) | Select the time of day to run the scan. The default value is midnight. |
| Custom Cron Expression | (Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a> to define the schedule Soda Cloud uses to run scans. |
| Anomaly Dashboard Scan Schedule <br />![available-2025](/assets/images/available-2025.png){:height="150px" width="150px"} <br /> | Provide the scan frequency details Soda Cloud uses to execute a daily scan to automatically detect anomalies for the anomaly dashboard. |

{:start="3"}
3. Complete the connection configuration. These settings are specific to each data source (PostgreSQL, MySQL, Snowflake, etc) and usually include connection details such as host, port, credentials, and database name.

Use the appropriate guide below to complete the connection:
*  [Connect to BigQuery]({% link soda/connect-bigquery.md %})
*  [Connect to Databricks SQL]({% link soda/connect-spark.md %}#connect-to-spark-for-databricks-sql)
*  [Connect to MS SQL Server]({% link soda/connect-mssql.md %})
*  [Connect to MySQL]({% link soda/connect-mysql.md %})
*  [Connect to PostgreSQL]({% link soda/connect-postgres.md %})
*  [Connect to Redshift]({% link soda/connect-redshift.md %})
*  [Connect to Snowflake]({% link soda/connect-snowflake.md %})