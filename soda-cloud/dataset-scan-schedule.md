---
layout: default
title: Adjust a dataset scan schedule
parent: Soda Cloud
---

# Adjust a dataset scan schedule 

By default, Soda Cloud conducts a scan of each dataset in your data source according to the schedule you set when you configured the data source connection. If you wish, you can set a scan schedule specific to an individual datasets. For example, you can specify a more frequent scan schedule for a dataset that changes often.

![onboarding-scan-schedules](/assets/images/onboarding-scan-schedules.png){:height="350px" width="350px"}
 
1. In the **Datasets** dashboard, click the stacked dots icon of the dataset you wish to edit.  You must have an Admin role for the dataset, or have a Manager or Editor role for the dataset, and be the Dataset Owner to make changes. See [Roles and rights]({% link soda-cloud/roles-and-rights.md %}) for details.
2. In the **Scan Schedule** tab, uncheck the box to **Use Data Source Default Schedule**, then adjust the scan schedule as needed.  
3. Save your changes, then wait for Soda Cloud to complete the next scan of your dataset according to the new scan schedule you set.

## Trigger a scan externally

Rather than defining a scan schedule in Soda Cloud, you can externally call the Soda Cloud API to trigger a Soda scan. You must have an Admin role for the dataset, or have a Manager or Editor role for the dataset, and be the Dataset Owner to make changes. See [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}) for details.

1. First, you must login to your Soda Cloud account via the Soda Cloud API to obtain a session token that you need to send further API requests. To do this, use your Soda Cloud login credentials to send a `login` POST request using curl or an API client.<br /><br />
Using curl from the command-line, replace the values for `YOUR_EMAIL` and `YOUR_PASSWORD`:
```shell
curl --request POST \
  -H "Content-Type: application/json" \
  --data '{"type":"login","username":"YOUR_EMAIL","password":"YOUR_PASSWORD"}' \
  https://YOUR_SODA_DOMAIN.soda.io/api/command
```
Using an API client such as <a href="http://postman.com" target="_blank"> Postman</a>, replace the values for `YOUR_EMAIL` and `YOUR_PASSWORD`:
```
#Send to URL: https://cloud.soda.io/api/command
POST /command
  Content-Type: application/json
  {
    "type": "login",
    "username": "YOUR_EMAIL",
    "password": "YOUR_PASSWORD"
  }
```
2. The Soda Cloud API responds with your profile information, including your session token. Copy the session token to a safe, temporary location in your local system.
```shell
{
    "token": "**hidden**",
    "organisationId": "06xxxx-xxxx-xxxx-fxxxxe88b",
    "user": {
        "id": "xxxx-8488-xxxx-xxxx-c06xxxxxxxxb",
        "firstName": "YOUR_FIRST_NAME",
        "lastName": "YOUR_LAST_NAME",
        "fullName": "YOUR_FULL_NAME",
        "email": "YOUR_EMAIL"
    },
    "organisations": [
        {
            "id": "0xxxx-05xxxx5f-xxxx-fxxxxxe88b",
            "name": "Shape Company",
            "settings": [
                "slack"
            ],
            "plan": "enterprise",
            "onboarded": true
        }
    ]
}
```
3. In the web application of your Soda Cloud account, navigate to the **Datasets** dashboard, then click the stacked dots icon of the dataset on which you wish to externally trigger a scan, then select **Edit**.  
4. In the **Scan Schedule** tab, uncheck the box to **Use Data Source Default Schedule**, then select **Schedule Externally** in the **Dataset Scan Schedule** field. 
5. Copy the JSON or curl snippet for the `launchscan` API command that you can use outside Soda Cloud to send a POST call to `https://cloud.soda.io/api/command`. **Save** the change to the dataset scan schedule.
6. Using the JSON snippet in an API client or the curl snippet in the command-line, test the `launchscan` command, replacing the value of the `token` field with the session token you obtained when you logged in via the `login` API command. Refer to the following examples.<br /><br />
Using curl:
```shell
curl 'https://cloud.soda.io/api/command' \
    -H 'content-type: application/json' \
    --data-raw '{ "type": "launchScan", "token": "****YOUR_TOKEN****", "datasetId": "152xxx-xxx-b4b9-xxxx9999xxx", "scanTime": "2020-01-01T16:00:00Z"}'
```
Using an API client:
```shell
  {
  "type": "launchScan",
  "token": "****YOUR_TOKEN****",
  "datasetId": "152xxx-xxx-b4b9-xxxx9999xxx",
  "scanTime": "2020-01-01T16:00:00Z"
}
```
The Soda Cloud API returns a `200` HTTP response status code and a value for a `jobReference`.<br />
```shell
{
    "jobReference": "497dc096-c3b5-4f1f-838b-259ac1c00a21"
}
```
8. Navigate to the web application of your Soda Cloud account to review the scan result in the **Monitors** dashboard.



## Go further

* Next step in Soda Cloud Onboarding: [Automatically detect anomalies]({% link soda-cloud/anomaly-detection.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.