# Webhook API

Webhook integrations allow your system to receive real-time notifications from Soda Cloud when certain events occur, such as check evaluations, incident changes, or contract updates.

***

## Setup

To create a Webhook integration, you must have **Organization Settings** permissions.

#### Add Integration

1. Go to **Organization Settings > Integrations**
2. Click **Add Integration**
3. Choose **Webhook** as the integration type

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 4.17.18 PM (1).png" alt=""><figcaption></figcaption></figure>

### Configure Webhook

Provide the required fields:

* **Name** – The name of your integration
* **Webhook URL** – The endpoint to send the events to
* **Secret (optional)** – Used to sign the payload

<figure><img src="../.gitbook/assets/Screenshot 2025-06-05 at 3.17.30 PM (2).png" alt="" width="362"><figcaption></figcaption></figure>

### Event Testing

After creation, you can simulate payloads for development and testing.

This allows you to preview example payloads for each event type using random values.

<figure><img src="../.gitbook/assets/Screenshot 2025-06-05 at 3.17.40 PM.png" alt="" width="361"><figcaption></figcaption></figure>

### Scopes

Webhooks can be configured to listen for one or more **event scopes**:

| Scope                   | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| **Alert Notifications** | Triggered when a check result causes an alert (based on notification rules) |
| **Incidents**           | Triggered when incidents are created or updated in Soda Cloud               |
| **Contracts**           | Triggered when a data contract is published (created or updated)            |

Alert Notifications require active **notification rules**. Learn more about [notifications.md](../manage-issues/notifications.md "mention")

<figure><img src="../.gitbook/assets/Screenshot 2025-06-05 at 3.17.48 PM.png" alt="" width="363"><figcaption></figcaption></figure>

***

## Event Types and Payloads

Depending on the selected scope, one or more of the following event types will be sent to your endpoint:

***

#### Check Evaluation

Scope: `alert_notification`\
Triggered when a check result triggers an alert.

Alert Notifications require active **notification rules to use the webhook as a recipient**. See Notification Configuration →

**Payload structure:**

```bash
{
  "event": "checkEvaluation",
  "checkResults": [CheckResult, ...]
}
```

`CheckResult` **object**

| Field           | Type   | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| `id`            | string | Unique ID of the check result                      |
| `sodaCloudUrl`  | string | Link to the check result in Soda Cloud             |
| `definition`    | string | YAML check definition                              |
| `datasets`      | array  | List of associated datasets (see `Dataset` object) |
| `column`        | string | Column associated with the check                   |
| `outcome`       | string | `pass`, `fail`, or `error`                         |
| `dataTimestamp` | string | ISO 8601 timestamp of data                         |
| `diagnostics`   | object | Check result value(s)                              |
| `agreement`     | object | Information about the linked agreement (optional)  |
| `name`          | string | Name of the check                                  |

***

**Incident Created**

Scope: `incidents`\
Triggered when a new incident is reported

```bash
{
  "event": "incidentCreated",
  "incident": Incident
}
```

`Incident`  **object**

| Field                     | Type   | Description                                             |
| ------------------------- | ------ | ------------------------------------------------------- |
| `id`                      | string | Incident ID                                             |
| `sodaCloudUrl`            | string | URL to view the incident                                |
| `number`                  | number | Human-readable incident number                          |
| `title`                   | string | Incident title                                          |
| `description`             | string | Incident description                                    |
| `severity`                | string | `low`, `medium`, `high`, `critical`                     |
| `status`                  | string | `reported`, `in_progress`, `resolved`, etc.             |
| `created`                 | string | ISO timestamp                                           |
| `lastUpdated`             | string | ISO timestamp                                           |
| `reporter`                | object | User who reported the incident                          |
| `checkResults`            | array  | List of related `CheckResult` objects                   |
| `incidentLinkCallbackUrl` | string | Link to update or interact with the incident (optional) |

**IncidentLinkCallBackUrl**

This property allows you to add links to incidents that can point to external integrations. To add a link, do a POST call with the following body:

```bash
{
  "url": string,
  "text": string
}
```

#### Incident Updated

Same structure as `incidentCreated`, but triggered when an incident is updated.

```bash
{
  "event": "incidentUpdated",
  "incident": Incident
}
```

#### Contract Published

Scope: `contracts`\
Triggered when a contract is published or updated.

```bash

{
  "event": "contractPublished",
  "contract": Contract
}
```

`Contract` **object**

| Field          | Type      | Description                                                   |
| -------------- | --------- | ------------------------------------------------------------- |
| `dataset`      | string    | Fully qualified name of the dataset the contract applies to   |
| `prefixes`     | string\[] | _(Deprecated)_ – Use `dataset` instead to identify the target |
| `datasource`   | string    | Name of the data source                                       |
| `author`       | object    | Information about the user who published the contract         |
| `author.id`    | string    | Soda Cloud user ID                                            |
| `author.email` | string    | Email of the user who published the contract                  |
| `contents`     | string    | The full YAML content of the contract as a string             |
