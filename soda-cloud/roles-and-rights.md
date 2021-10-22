---
layout: default
title: Roles and rights in Soda Cloud
parent: Soda Cloud
---

# Roles and rights in Soda Cloud

To manage the actions of users that belong to a single organization, Soda Cloud uses roles and access rights. These roles and their associated rights of access enforce limits on the abilities for users to make additions and changes to datasets, and to make changes to the Soda Cloud account and the roles and rights of others.

[Roles and rights](#roles-and-rights)<br />
[Default roles and groups](#default-roles-and-groups)<br />
[Change organization roles and settings](#change-organization-roles-and-settings)<br />
[Change access to a dataset](#change-access-to-a-dataset)<br />
[Dataset and monitor owners](#dataset-and-monitor-owners)<br />
[Go further](#go-further)<br />
<br />


## Roles and rights

The roles that define who has access to the organization's Soda Cloud account are **Admin** and **User**. The following table outlines the rights of each role.

| Rights                                                                 | Admin | User |
|------------------------------------------------------------------------|-------|------|
| Access the organization's Soda Cloud account as a member of the team   |   ✓   |   ✓  |
| Invite team members to join the organization's Soda Cloud account      |   ✓   |   ✓  |
| View Organization Settings for a Soda Cloud account                    |   ✓   |      |
| Change the name of the organization                                    |   ✓   |      |
| Adjust Soda Cloud Plan to which the organization subscribes            |   ✓   |      |
| Establish integrations, such as with Slack                             |   ✓   |      |
| View a list of Users                                                   |   ✓   |      |
| Change the roles of Users, including adding more Admins                |   ✓   |      |
| Reset User passwords or deactivate Users                               |   ✓   |      |


The roles that define who can add or make changes to a [dataset]({% link soda/glossary.md %}#dataset) are **Admin**, **Manager**, **Editor**, and **Viewer**. The following table outlines the rights of each role associated with individual datasets.

| Rights                                                                   | Admin | Manager | Editor | Viewer |
|--------------------------------------------------------------------------|-------|---------|--------|--------|
| View Monitor Results of monitors associated with the dataset             |   ✓   |    ✓    |    ✓   |    ✓   |
| Create monitors associated with the dataset                              |   ✓   |    ✓    |    ✓   |        |
| Edit monitors associated with the dataset                                |   ✓   |    ✓    |    ✓   |        |
| Edit dataset details such as scan schedule and attributes                |   ✓   |    ✓    |    ✓   |        |
| Edit dataset settings such as enable column metrics or sample data       |   ✓   |    ✓    |    ✓   |        |
| Change the roles of users in an individual dataset                       |   ✓   |    ✓    |        |        |
| Add a dataset                                                            |   ✓   |         |        |        |
| Connect to a new data source                                             |   ✓   |         |        |        |
| Make changes to the data source connection                               |   ✓   |         |        |        |


## Default roles and groups

If you are the first user in your organization to sign up for Soda Cloud, you become the Admin for the account by default.

When a new user accepts an invitation to join an existing organization, Soda Cloud applies the following defaults to the new user:
- the role of User in the organization
- membership in the **everyone** group

By default, all Admins and Users are included in the group identity called **everyone**. Admins and Managers can use the **everyone** group when [setting Responsibilities in a dataset](#change-access-to-a-dataset). In this early implementation of roles and groups, **everyone** is the only group that exists in Soda Cloud. It is not possible to add or remove members from the group, or to create new groups, yet.


## Change organization roles and settings

An Admin is the only role that can make changes to the **Organization Settings** and to the role assignments in the organization. Note, you can have more than one Admin associated with an organization in Soda Cloud.

1. As an Admin user, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.
2. Access the **Organization** tab to adjust the name of the organization and the type of Soda Cloud plan to which your organization subscribes.
3. Access the **Members** tab to view a list of people who have access to the Organization in Soda Cloud. Use the dropdown next to each name to adjust their role to be either **Admin** or **User**.
4. Access the **Integrations** tab to connect Soda Cloud to your organization's Slack workspace. See how to [Integrate with Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack).

## Change access to a dataset

By default, when an Admin adds a new dataset, Soda Cloud automatically adds the **everyone** group to the dataset and assigns the group the role of Editor. Effectively, this means that every user in the organization has the rights of an Editor when making changes to a dataset or adding or editing monitors associated with the dataset. The same default setting applies for any datasets added by a Soda SQL user who has connected their instance of the command-line tool to the Soda Cloud account.

As an Admin or a Manager of a dataset, you can access the **Responsibilities** tab to make changes to the role assignments in the dataset, including the role of the **everyone** group. All users, regardless of their role assignment, can view the Responsibilities tab.

1. As an Admin, login to your Soda Cloud account and navigate to the **Datasets** dashboard.
2. Click the stacked dots to the right of the dataset in which you wish to adjust the role assignments, then select **Edit Dataset**.
3. In the **Responsibilities** tab, use the search bar to find specific Users to which you wish to assign a role other than the default, Editor, then use the dropdown next to each name to adjust their role. <br /> Alternatively, search for the group **everyone** and change the default role of the group from Editor to Manager or Viewer.


## Dataset and monitor owners

There are two ownership roles in Soda Cloud that identify the user that owns a dataset or monitor. By default, the creator of the dataset or monitor becomes the **Dataset Owner** or **Monitor Owner**, respectively. These ownership roles do not enforce any rights or permissions on the datasets or monitors, they are simply identifiers.
<br />
<br />

#### Change the Dataset Owner

1. If you are the Admin of the organization, or have a Manager or Editor role for the dataset, login to your Soda Cloud account and navigate to the **Datasets** dashboard.
2. Click the stacked dots to the right of the dataset for which you wish to adjust the ownership, then select **Edit Dataset**.
3. In the **Attributes** tab, use the dropdown to select the name of another user to take ownership of the dataset, then **Save**.
<br />
<br />

#### Change the Monitor Owner

1. If you are the Admin of the organization, or have a Manager or Editor role for the monitor's dataset, login to your Soda Cloud account and navigate to the **Monitors** dashboard.
2. Click the stacked dots to the right of the monitor for which you wish to adjust the ownership, then select **Edit Monitor**.
3. In the **Attributes** tab, use the dropdown to select the name of another user to take ownership of the monitor, then **Save**.

## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* [Invite team members]({% link soda-cloud/collaborate.md %}#invite-your-team-members) to join your organization's Soda Cloud account.
* Learn how to [add a dataset]({% link soda-cloud/add-datasets.md %}) to your Soda Cloud account.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.