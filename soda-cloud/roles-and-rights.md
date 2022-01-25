---
layout: default
title: Roles and rights in Soda Cloud
description: To manage the actions of users that belong to a single organization, Soda Cloud uses roles and access rights. Admins can access an Audit Trail of user actions.
parent: Soda Cloud
---

# Roles and rights in Soda Cloud

To manage the actions of members that belong to a single organization, Soda Cloud uses roles and access rights. These roles and their associated rights of access enforce limits on the abilities for members to make additions and changes to datasets, to make changes to the Soda Cloud account, and to adjust the roles and rights of others.

[Roles and rights](#roles-and-rights)<br />
[Default roles and groups](#default-roles-and-groups)<br />
[Change organization roles and settings](#change-organization-roles-and-settings)<br />
[Review member licenses](#review-member-licenses)<br />
[Change access to a dataset](#change-access-to-a-dataset)<br />
[Change the default access to datasets](#change-the-default-access-to-datasets)<br />
[Dataset and monitor owners](#dataset-and-monitor-owners)<br />
[Access an audit trail](#access-an-audit-trail)<br />
[Go further](#go-further)<br />
<br />


## Roles and rights

Anyone with access to your organization's Soda Cloud account is known as a **member**. The roles that define the type of access members have to your organization's Soda Cloud account are **Admin** and **User**. The following table outlines the rights of each role.

| Rights                                                                                                       | Admin | User |
|--------------------------------------------------------------------------------------------------------------|-------|------|
| Access the organization's Soda Cloud account as a member of the team                                         |   ✓   |   ✓  |
| Invite colleagues to join the organization's Soda Cloud account as members                                   |   ✓   |   ✓  |
| View Organization Settings for a Soda Cloud account                                                          |   ✓   |      |
| Change the name of the organization                                                                          |   ✓   |      |
| Adjust the Soda Cloud Plan to which the organization subscribes                                              |   ✓   |      |
| Establish integrations with other tools, such as with Slack                                                  |   ✓   |      |
| View a list of members                                                                                       |   ✓   |      |
| Review the license status of members                                                                         |   ✓   |      |
| Set the default role for members granted access to a dataset                                                 |   ✓   |      |
| Adjust the default setting that automatically grants the **Everyone** group access to newly-added datasets   |   ✓   |      |
| Change the roles of members, including adding more Admins                                                    |   ✓   |      |
| Reset member passwords or deactivate members                                                                 |   ✓   |      |
| Download a CSV file of an audit trail of Soda Cloud usage                                                    |   ✓   |      |


The roles that define who can make changes to a [dataset]({% link soda/glossary.md %}#dataset) are **Manager**, **Editor**, and **Viewer**. The following table outlines the rights of each role associated with individual datasets.

Note that an **Admin** member as described above has all the rights of a **Manager** relative to a dataset.

| Rights                                                                   | Manager <br /> and Admin | Editor | Viewer |
|--------------------------------------------------------------------------|--------------------------|--------|--------|
| View Monitor Results of monitors associated with a dataset               |             ✓            |    ✓   |    ✓   |
| Create and track Incidents associated with one or more monitor results   |             ✓            |    ✓   |    ✓   |
| Create monitors associated with the dataset                              |             ✓            |    ✓   |        |
| Edit monitors associated with the dataset                                |             ✓            |    ✓   |        |
| Edit dataset Responsibilities                                            |             ✓            |        |        |
| Edit dataset Attributes                                                  |             ✓            |    ✓   |        |
| Edit dataset settings such as Enable Column Metrics or Sample Data       |             ✓            |    ✓   |        |
| Change the roles of members for an individual dataset                    |             ✓            |        |        |



## Default roles and groups

If you are the first member in your organization to sign up for Soda Cloud, you become the Admin for the account by default.

When a new member accepts an invitation to join an existing organization, Soda Cloud applies the following defaults to the new member:
- the role of **User** in the organization
- membership in the **Everyone** group

By default, all members are included in the group identity called **Everyone**. Admins and Managers can use the **Everyone** group when [setting Responsibilities in a dataset](#change-access-to-a-dataset). In this early implementation of roles and groups, **Everyone** is the only group that exists in Soda Cloud. It is not possible to add or remove members from the group, or to create new groups, yet.


## Change organization roles and settings

An Admin is the only role that can make changes to the **Organization Settings** and to the role assignments in the organization. Note, you can have more than one Admin associated with an organization in Soda Cloud.

1. As an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.
2. Access the **Organization** tab to adjust the name of the organization and the type of Soda Cloud plan to which your organization subscribes.
3. Access the **Members** tab to view a list of people who have access to the Soda Cloud account. Use the dropdown next to each name to adjust their role to be either **Admin** or **User**. Review each member's **License** status as an **Author** or **Viewer**. Refer to [Review member licenses](#review-member-licenses).
4. Access the **Integrations** tab to connect Soda Cloud to your organization's Slack workspace. See how to [Integrate with Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack).

## Review member licenses

Each Soda Cloud Plan (Soda Teams or Soda Enterprise) includes a specific number of **Author** licenses for members of the Soda Cloud account. A member's license status controls whether they can make changes to any datasets and monitors in the Soda Cloud account.
* **Authors** essentially have read-write access to elements in Soda Cloud and maintain the role of Admin, Manager, or Editor relative to monitors and datasets. See [Roles and rights](#roles-and-rights) above.
* **Viewers** essentially have read-only acess to elements in Soda Cloud and maintain the role of Viewer relative to monitors and datasets. See [Roles and rights](#roles-and-rights) above.

1. To review the licenses that your members have, as an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Soda Cloud Admin members can view Organization Settings. 
2. Access the **Members** tab to view a list of people who have access to your Soda Cloud account, the role they have in the organization (Admin or User), and their License status (Author or Viewer). 
3. Click a member's **Author** or **Viewer** label in the License column to access a **Responsibilities** window that lists the member's access to resources (datasets and monitors), the role they hold for each resource, and their license status relative to the resource.

## Change access to a dataset

As an Admin or a Manager of a dataset, you can access the **Responsibilities** tab for a dataset to make changes to the default role assignments in the dataset. All members, regardless of their role assignment, can view the Responsibilities tab for a dataset.

1. As an Admin or Manager, login to your Soda Cloud account and navigate to the **Datasets** dashboard.
2. Click the stacked dots to the right of the dataset for which you wish to adjust the role assignments, then select **Edit Dataset**.
3. In the **Responsibilities** tab, use the search bar to find specific members to which you wish to assign a role other than the default, Editor, then use the dropdown next to each name to adjust their role. <br /> Alternatively, search for the group **everyone** and change the role of the group.

## Change the default access to datasets

As an Admin you have the option of adjusting two default access settings:

* By default, when a dataset's Admin or Manager grants another member access to the dataset, Soda Cloud automatically assigns the new member the default role of Editor for the dataset.  
* By default, when an Admin adds a new dataset to the Soda Cloud account, Soda Cloud *does not* assign the **Everyone** group to the dataset. When freshly added, a new dataset can only be accessed by an Admin, until he or she [changes access to the dataset](#change-access-to-a-dataset) to grant other members access.

1. As an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.
2. Access the **Responsibilities** tab to adjust either of the two default settings:
* Use the dropdown to adjust the default role of members who are granted access to a dataset.
* Check the box for Soda Cloud to auomtatically assign the **Everyone** group to every new dataset that an Admin adds to the Soda Cloud account. Effectively, this means that every member in the organization has the rights of an Editor when making changes to a dataset or adding or editing monitors associated with the dataset. 

Note, by default, Soda Cloud automatically adds all new members to the organization's **Everyone** group. See [Default roles and group](#default-roles-and-groups). 

## Dataset and monitor owners

There are two ownership roles in Soda Cloud that identify the member that owns a dataset or monitor. These ownership roles do not enforce any rights or permissions on the datasets or monitors, they are simply identifiers.

* By default, the member who created the [API keys]({% link soda-cloud/connect_to_cloud.md %}) that link Soda SQL to Soda Cloud becomes the **Dataset Owner** of all onboarded datasets. The default role that Soda Cloud assigns to the Dataset Owner is that of Manager.
* By default, the member who creates a monitor become the **Monitor Owner**. 
<br />
<br />

#### Change the Dataset Owner

1. If you are the Admin of the organization, or have a Manager role for the dataset, login to your Soda Cloud account and navigate to the **Datasets** dashboard.
2. Click the stacked dots to the right of the dataset for which you wish to adjust the ownership, then select **Edit Dataset**.
3. In the **Attributes** tab, use the dropdown to select the name of another member to take ownership of the dataset, then **Save**.
4. Soda Cloud automatically assigns the role of Manager to the new Dataset Owner.
<br />
<br />

#### Change the Monitor Owner

1. If you are the Admin of the organization, or have a Manager or Editor role for the monitor's dataset, login to your Soda Cloud account and navigate to the **Monitors** dashboard.
2. Click the stacked dots to the right of the monitor for which you wish to adjust the ownership, then select **Edit Monitor**.
3. In the **Attributes** tab, use the dropdown to select the name of another member to take ownership of the monitor, then **Save**.

## Access an audit trail

To meet your organization's regulatory and policy mandates, you can download a CSV file that contains an audit trail of activity on your Soda Cloud account for a date range you specify. The file contains details of each member's actions, their email and IP addresses, and a timestamp of the action.

1. As an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.
2. Access the **Audit Trail** tab, then set the date range of usage details you wish to examine and click **Download**.

Alternatively, you can use the [Audit Trail endpoint]({% link api-docs/reporting-api.md %}#/operations/audit_trail_v0_audit_trail_get) in Soda Cloud's Reporting API to access audit trail data. 

## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* [Invite colleagues]({% link soda-cloud/collaborate.md %}#invite-your-team-members) to join your organization's Soda Cloud account.
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
<br />

---
{% include docs-footer.md %}