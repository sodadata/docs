---
layout: default
title: Roles and rights in Soda Cloud
description: To manage the actions of users that belong to a single organization, Soda Cloud uses roles and access rights. Admins can access an Audit Trail of user actions.
parent: Organize, alert, investigate
---

# Roles and rights in Soda Cloud
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

To manage the actions of members that belong to a single organization, Soda Cloud uses roles and access rights. These roles and their associated rights of access enforce limits on the abilities for people to make additions and changes to datasets, to make changes to the Soda Cloud account, and to adjust the roles and rights of others.

[Roles and rights in your account](#roles-and-rights-in-your-account)<br />
[Change organization roles and settings](#change-organization-roles-and-settings)<br />
[Add multiple organizations](#add-multiple-organizations)<br />
[Access an audit trail](#access-an-audit-trail)<br />
[Access to resources](#access-to-resources)<br />
[Default roles for datasets and checks](#default-roles-for-datasets-and-checks)<br />
[Change the default access to datasets](#change-the-default-access-to-datasets)<br />
[Change access to a dataset](#change-access-to-a-dataset)<br />
[Review member licenses](#review-member-licenses)<br />
[Data source, dataset, agreement, and check owners](#data-source-dataset-agreement-and-check-owners) <br />
[Go further](#go-further)<br />
<br />


## Roles and rights in your account

Anyone with access to your organization's Soda Cloud account is known as a **member**. The roles that define the type of access members have to your organization's Soda Cloud account are **Admin** and **User**. If you are the first member in your organization to sign up for Soda Cloud, you become the Admin for the account by default.

The following table outlines the account-related rights of each role.

| Rights                                                                                                       | Admin | User |
|--------------------------------------------------------------------------------------------------------------|:-----:|:----:|
| Access the organization's Soda Cloud account as a member of the team                                         |   ✓   |   ✓  |
| Invite colleagues to join the organization's Soda Cloud account as members                                   |   ✓   |   ✓  |
| Set and edit notification rules                                                                              |   ✓   |   ✓  |
| Apply check attributes to checks                                                                             |   ✓   |   ✓  |
| Create no-code checks                                                                                        |   ✓   |   ✓  |
| Create or edit check attributes                                                                              |   ✓   |      |
| View Organization Settings for a Soda Cloud account                                                          |   ✓   |      |
| Change the name of the organization                                                                          |   ✓   |      |
| Adjust the Soda Cloud Plan to which the organization subscribes                                              |   ✓   |      |
| Establish integrations with other tools, such as with Slack                                                  |   ✓   |      |
| View a list of members                                                                                       |   ✓   |      |
| Review the license status of members                                                                         |   ✓   |      |
| Set the default role for members granted access to a dataset                                                 |   ✓   |      |
| Adjust the default setting that automatically grants the Everyone group access to newly-added datasets       |   ✓   |      |
| Change the roles of members, including adding more Admins                                                    |   ✓   |      |
| Reset member passwords or deactivate members                                                                 |   ✓   |      |
| Download a CSV file of an audit trail of Soda Cloud usage                                                    |   ✓   |      |
| Define and adjust dataset attributes                                                                         |   ✓   |      |


## Change organization roles and settings

An Admin is the only role that can make changes to the **Organization Settings** and to the role assignments in the organization. Note, you can have more than one Admin associated with an organization in Soda Cloud.

As an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.

| Tab | Access |
| --- | ------ |
| **Organization** | Adjust the name of the organization and the type of Soda Cloud Plan to which your organization subscribes.|
| **Members** | View a list of people who have access to the Soda Cloud account. Use the dropdown next to each name to adjust their role to be either **Admin** or **User**. Review each member's **License** status as an **Author** or **Viewer**. Refer to [Review member licenses](#review-member-licenses). |
| **Attributes** | Create new attributes for datasets in your organization that your colleagues can use to categorize datasets. See [Organize datasets]({% link soda-cloud/organize-datasets.md %}). |
| **Responsibilities** | Adjust the default settings for accessing new datasets. See [Change the default access to datasets](#change-the-default-access-to-datasets). |
| **Integrations** | Connect Soda Cloud to your organization's Slack workspace, MS Team channel, or other third-party tool via webhook. |
| **Audit Trail** | Download a CSV file that contains user audit trail information. See [Access an audit trail](#access-an-audit-trail). |


## Add multiple organizations

You may find it useful to set up multiple organizations in Soda Cloud so that each corresponds with a different environment in your network infrastructure, such as production, staging, and development. Such a setup makes it easy for you and your team to access multiple, independent Soda Cloud organizations using the same profile, or login credentials.

Note that Soda Cloud associates any [API keys]({% link soda-cloud/api-keys.md %}) that you generate within an organization with both your profile *and* the organization in which you generated the keys. API keys are not interchangeable between organizations.

Contact <a href="mailto:support@soda.io">support@soda.io </a> to request multiple organizations for Soda Cloud.


## Access an audit trail

To meet your organization's regulatory and policy mandates, you can download a CSV file that contains an audit trail of activity on your Soda Cloud account for a date range you specify. The file contains details of each member's actions, their email and IP addresses, and a timestamp of the action. An Admin is the only role that can access an audit trail for a Soda Cloud account. 

1. As an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.
2. Access the **Audit Trail** tab, then set the date range of usage details you wish to examine and click **Download**.

Alternatively, you can use the [Audit Trail endpoint]({% link api-docs/reporting-api-v1.md %}#/operations/audit_trail_v0_audit_trail_get) in Soda Cloud's Reporting API to access audit trail data. 


## Access to resources

Where the roles and rights described above apply to your organization's Soda Account, the roles and rights described in the table below apply to the following resources in your account:
* incidents
* checks
* agreements
* datasets
* data sources
* scan schedules
* agents

The roles that define who can make changes to resources in Soda Cloud are **Manager**, **Editor**, and **Viewer**. 

The following table outlines the rights of each role associated with each resource. Note that because of its universal access to all things in your Soda Cloud account, an **Admin** member as described above has all the rights of a **Manager** relative to resources. Learn more about [Soda architecture]({% link soda-cloud/soda-cloud-architecture.md %}) in general.

| Rights                                                                     | Admin | Manager  | Editor | Viewer |
|----------------------------------------------------------------------------|:-----:|:--------:|:------:|:------:|
| Create and track incidents associated with one or more check results       |   ✓   |    ✓     |    ✓   |    ✓   |
| Delete an incident                                                         |   ✓   |    ✓     |    ✓   |        |
| View scan results of checks associated with a dataset or agreement         |   ✓   |    ✓     |    ✓   |    ✓   |
| Edit individual checks associated with a dataset ingested via Soda Library |   ✓   |    ✓     |    ✓   |        |
| Delete a check                                                             |   ✓   |    ✓     |    ✓   |        |
| View agreements                                                            |   ✓   |    ✓     |    ✓   |    ✓   |
| Approve and reject agreements as a stakeholder                             |   ✓   |    ✓     |    ✓   |    ✓   |
| Create a new agreement                                                     |   ✓   |    ✓     |    ✓   |        |
| Edit an existing agreement, including adding a new scan schedule           |   ✓   |    ✓     |    ✓   |        |
| Create no-code checks                                                      |   ✓   |    ✓     |    ✓   |        |
| Add and edit dataset Attributes, such as Description or Tags               |   ✓   |    ✓     |    ✓   |        |
| Control member access to a dataset and its checks (add or remove access)   |   ✓   |    ✓     |        |        |
| Change the roles of members with access to a dataset and its checks        |   ✓   |    ✓     |        |        |
| Add, edit, or delete a data source                                         |   ✓   |          |        |        |
| Change the owner of a data source                                          |   ✓   |          |        |        |
| Add, edit, or delete a scan schedule                                       |   ✓   |          |        |        |
| Run a scan                                                                 |   ✓   |    ✓     |        |        |
| Add, edit, or delete an agent                                              |   ✓   |          |        |        |
| Begin or participate in a discussion                                       |   ✓   |    ✓     |    ✓   |    ✓   |
| Propose and test a check                                                   |   ✓   |    ✓     |    ✓   |    ✓   |
| Review & Add a check; execute a check                                      |   ✓   |    ✓     |    ✓   |        |
| Close a discussion                                                         |   ✓   |    ✓     |    ✓   |    ✓   |


## Default roles for datasets and checks

When a new member accepts an invitation to join an existing organization, Soda Cloud applies the following defaults to the new member:
- the role of **User** in the organization
- membership in the **Everyone** group

By default, all members are included in the group identity called Everyone In the context of an individual dataset, Admins and Managers can use the Everyone group when [setting Responsibilities in a dataset](#change-access-to-a-dataset). In this early implementation of roles and groups, Everyone is the only group that exists in Soda Cloud. It is not possible to add or remove members from the group, or to create new groups, yet.

<details>
    <summary style="color:#00BC7E">For example...</summary>
    <p>For the Customers_EU dataset, Alice the Admin added the Everyone group to the dataset and assigned the group Editor privileges. </p>
    <img src="/assets/images/everyone-editor.png" style="height:250px">
    <p>When Bob joins his organization's Soda Cloud account as a User member, Soda Cloud automatically adds his name to the organization's Everyone group. Thus, Bob automatically has Editor level access to the Customers_EU dataset.</p>
</details>
<br />

By default, when a dataset's Admin or Manager grants another member or the Everyone group access to a dataset, Soda Cloud automatically assigns the new member or group the default role of Editor for the dataset.  You can adjust this setting to a different default role; see [Change the default access to datasets](#change-the-default-access-to-datasets).

<details>
    <summary style="color:#00BC7E">For example...</summary>
    <p>When Alice the Admin adds Carlos, a member of her Soda Cloud account, to the Customers_US dataset, Soda Cloud automatically assigns him the role of Editor for that dataset. </p>
    <img src="/assets/images/new-editor.png" style="height:250px">
</details>
<br />

By default, when any member adds a new dataset to the Soda Cloud account via Soda Library, Soda Cloud *does not* assign the **Everyone** group to the dataset. You can adjust this setting to automatically assign the **Everyone** group to each newly added dataset; see [Change the default access to datasets](#change-the-default-access-to-datasets).


## Change the default access to datasets

As an Admin you have the option of adjusting three default access settings:

* By default, when a dataset's Admin or Manager grants another member or the Everyone group access to a dataset, Soda Cloud automatically assigns the new member or group the [default role of Editor for the dataset](#default-roles-for-datasets-and-checks).  You can adjust this setting to a different default role.
* By default, when any member adds a new dataset to the Soda Cloud account via Soda Library, Soda Cloud *does not* assign the **Everyone** group to the dataset. You can adjust this setting to automatically assign the **Everyone** group to each newly added dataset.
* By default, Soda Cloud *does not* allow dataset owners to manage the responsibilites on the datasets they own. You can adjust this setting to automatically assign the role of Manager to all dataset owners, rather than Editor.

1. As an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.
2. Access the **Responsibilities** tab to adjust either of the two default settings:
* Use the dropdown to adjust the default role of new members and groups who are granted access to a dataset.
* Check the box for Soda Cloud to automatically assign the **Everyone** group to every new dataset that an Admin adds to the Soda Cloud account.  
* Check the box for Soda Cloud to allow all dataset owners to manage the responsibilities for datasets they own.

Note that by default, Soda Cloud automatically adds all new members to the organization's **Everyone** group. See [Default roles and group](#default-roles-and-groups). 

<details>
    <summary style="color:#00BC7E">Example of changed default settings</summary>
    <ol>
      <li>As an Admin, I individually edit the <strong>Responsibilities</strong> of Datasets A, B, and C and add the Everyone group as Editor to each.</li>
      <li>Then I access <strong>Organization Settings</strong> > <strong>Responsibilities</strong> and change the value of <strong>Default role when assigning a new user or group to a resource</strong> to <strong>Viewer</strong> and leave the check box <i>unchecked</i> for <strong>Automatically assign the "Everyone" group to the new resource</strong>.</li>
      <li>Then, using Soda Library, I connect to a new data source, and upload 20 new datasets to Soda Cloud.</li>
      <li>Back in Soda Cloud, I see all the new datasets, and Soda Cloud automatically made me the Dataset Owner of all of them, which comes with the role of Manager.  None of the new datasets have any other members that can access them at present, except Admins who can access everything.</li>
      <li>Next, I edit the <strong>Responsibilities</strong> of new Datasets D, E, and F and add the Everyone group to those datasets and, because of my setting in Step 2, that group now has Viewer access to these three datasets.</li>
      <li>Datasets A, B, and C still have the Everyone group assigned to them, but those “Everyone” groups still have Editor access to these specific datasets.</li>
    </ol>
    <br />
    In other words, you cannot globally change the role for the Everyone group across resources. You can only change the role of Everyone by:<br />
    a) changing it individually on an individual dataset or check.<br />
    b) changing its default role in the Organization Settings which <i>only</i> applies when the Everyone group is added to a dataset or check on upload or creation.
</details>
 

## Change access to a dataset

When any member uses Soda Library to add a new dataset to the Soda Cloud account, the member automatically becomes the Dataset Owner. The new dataset can only be accessed by an Admin and the Dataset Owner, who automatically becomes a Manager of the dataset, until the Admin or Dataset Owner changes access to the dataset to grant other members access.

As an Admin or a Manager of a dataset, you can access the **Responsibilities** tab for an individual dataset to make changes to the default role assignments in the dataset. All members, regardless of their role assignment, can view the Responsibilities tab for a dataset.

1. As an Admin or Manager, login to your Soda Cloud account and navigate to the **Datasets** dashboard.
2. Click the stacked dots to the right of the dataset for which you wish to adjust the role assignments, then select **Edit Dataset**.
3. In the **Responsibilities** tab, use the search bar to find specific members to which you wish to assign a role other than the default, Editor, then use the dropdown next to each name to adjust their role. <br /> Alternatively, search for the group **everyone** and change the role of the group.


## Review member licenses

Some Soda Cloud licensing models include a specific number of **Author** licenses for members of the Soda Cloud account. A member's license status controls whether they can make changes to any datasets, checks, and agreements in the Soda Cloud account.
* **Authors** essentially have read-write access to Soda Cloud resources and maintain the role of Admin, Manager, or Editor. 
* **Viewers** essentially have read-only acecss to Soda Cloud resources and maintain the role of Viewer. 

1. To review the licenses that your members have, as an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Soda Cloud Admin members can view Organization Settings. 
2. Access the **Members** tab to view a list of people who have access to your Soda Cloud account, the role they have in the organization (Admin or User), and their License status (Author or Viewer). 
3. Click a member's **Author** or **Viewer** label in the License column to access a **Responsibilities** window that lists the member's access to resources (datasets, agreements, and checks), the role they hold for each resource, and their license status relative to the resource.

## Data source, dataset, agreement, and check owners

There are four ownership roles in Soda Cloud that identify the member that owns a data source, a dataset, an agreement, or a check. These ownership roles do not enforce any rights or permissions on these resources, they are simply identifiers.

* By default, the member who added the data source becomes the **Data Source Owner** and **Dataset Owner** of all datasets in that data source. The default role that Soda Cloud assigns to the Dataset Owner is that of Manager.
* By default, the member who creates an agreement becomes the **Check Owner** of all checks defined in the agreement. 
* By default, the member who creates a no-code check becomes its **Check Owner**.
* By default, all Owners use an Author license.
* You cannot change the Agreement Owner.
<br />
<br />

#### Change the Data Source Owner

1. If you are the Admin of the organization, login to your Soda Cloud account and navigate to **your avatar** > **Data Sources**.
2. In the **Data Sources** tab, click the stacked dots to the right of the data source for which you wish to adjust the ownership, then select **Edit Datasource**.
3. In the **Assign Owner** tab, use the dropdown to select the name of another member to take ownership of the data source, then **Save**.

<br />

#### Change the Dataset Owner

1. If you are the Admin of the organization, or have a Manager role for the dataset, login to your Soda Cloud account and navigate to the **Datasets** dashboard.
2. Click the stacked dots to the right of the dataset for which you wish to adjust the ownership, then select **Edit Dataset**.
3. In the **Attributes** tab, use the dropdown to select the name of another member to take ownership of the dataset, then **Save**.
4. Soda Cloud automatically assigns the role of Manager to the new Dataset Owner.

To bulk-change the owner of all new datasets added to a data source, follow the steps to [Change the Data Source Owner](#change-the-data-source-owner) and, in step 3, use the dropdown to change the owner of all the datsets in the data source.

<br />

#### Change the Check Owner

1. If you are the Admin of the organization, or have a Manager or Editor role for the check's dataset, login to your Soda Cloud account and navigate to the **Checks** dashboard.
2. Click the stacked dots to the right of the check for which you wish to adjust the ownership, then select **Edit Check**.
3. In the **Attributes** tab, use the dropdown to select the name of another member to take ownership of the check, then **Save**.

<br />

## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn more about [Soda architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
* [Organize your datasets]({% link soda-cloud/organize-datasets.md %}) to facilitate your search for the right data.
* [Invite colleagues]({% link soda-cloud/collaborate.md %}#invite-your-team-members) to join your organization's Soda Cloud account.
* Learn more about creating and tracking [Soda Incidents]({% link soda-cloud/incidents.md %}).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
