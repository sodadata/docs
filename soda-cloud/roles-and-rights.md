---
layout: default
title: Roles and rights in Soda Cloud
description: To manage the actions of users that belong to a single organization, Soda Cloud uses roles and access rights. Admins can access an Audit Trail of user actions.
parent: Soda Cloud
---

# Roles and rights in Soda Cloud

To manage the actions of members that belong to a single organization, Soda Cloud uses roles and access rights. These roles and their associated rights of access enforce limits on the abilities for members to make additions and changes to datasets, to make changes to the Soda Cloud account, and to adjust the roles and rights of others.

[Roles and rights in your account](#roles-and-rights-in-your-account)<br />
[Change organization roles and settings](#change-organization-roles-and-settings)<br />
[Access an audit trail](#access-an-audit-trail)<br />
[Access to datasets and checks](#access-to-datasets-and-checks)<br />
[Default roles for datasets and checks](#default-roles-for-datasets-and-checks)<br />
[Change the default access to datasets](#change-the-default-access-to-datasets)<br />
[Change access to a dataset](#change-access-to-a-dataset)<br />
[Review member licenses](#review-member-licenses)<br />
[Data source, dataset, and check owners](#data-source-dataset-and-check-owners) <br />
[Go further](#go-further)<br />
<br />


## Roles and rights in your account

Anyone with access to your organization's Soda Cloud account is known as a **member**. The roles that define the type of access members have to your organization's Soda Cloud account are **Admin** and **User**. If you are the first member in your organization to sign up for Soda Cloud, you become the Admin for the account by default.

The following table outlines the rights of each role.

| Rights                                                                                                       | Admin | User |
|--------------------------------------------------------------------------------------------------------------|:-----:|:----:|
| Access the organization's Soda Cloud account as a member of the team                                         |   ✓   |   ✓  |
| Invite colleagues to join the organization's Soda Cloud account as members                                   |   ✓   |   ✓  |
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
| Define and adjust Attributes for datasets                                                                    |   ✓   |      |

## Change organization roles and settings

An Admin is the only role that can make changes to the **Organization Settings** and to the role assignments in the organization. Note, you can have more than one Admin associated with an organization in Soda Cloud.

As an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.

| Tab | Access |
| --- | ------ |
| **Organization** | Adjust the name of the organization and the type of Soda Cloud Plan to which your organization subscribes.|
| **Members** | View a list of people who have access to the Soda Cloud account. Use the dropdown next to each name to adjust their role to be either **Admin** or **User**. Review each member's **License** status as an **Author** or **Viewer**. Refer to [Review member licenses](#review-member-licenses). |
| **Attributes** | Create new attributes for datasets in your organization that your colleagues can use to categorize datasets. See [Organize datasets in Soda Cloud]({% link soda-cloud/organize-datasets.md %}). |
| **Responsibilities** | Adjust the default settings for accessing new datasets. See [Change the default access to datasets](#change-the-default-access-to-datasets). |
| **Integrations** | Connect Soda Cloud to your organization's Slack workspace. See how to [Integrate with Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack). |
| **Audit Trail** | Download a CSV file that contains user audit trail information. See [Access an audit trail](#access-an-audit-trail). |


## Access an audit trail

To meet your organization's regulatory and policy mandates, you can download a CSV file that contains an audit trail of activity on your Soda Cloud account for a date range you specify. The file contains details of each member's actions, their email and IP addresses, and a timestamp of the action. An Admin is the only role that can access an audit trail for a Soda Cloud account. 

1. As an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.
2. Access the **Audit Trail** tab, then set the date range of usage details you wish to examine and click **Download**.

Alternatively, you can use the [Audit Trail endpoint]({% link api-docs/reporting-api.md %}#/operations/audit_trail_v0_audit_trail_get) in Soda Cloud's Reporting API to access audit trail data. 


## Access to datasets and checks

The roles that define who can make changes to [datasets]({% link soda/glossary.md %}#dataset) and [checks]({% link soda/glossary.md %}#check) are **Manager**, **Editor**, and **Viewer**. Where the roles and rights described above apply to your organization's Soda Account, the roles and rights described in the table below apply to individual resources in your account, namely the datasets and checks. 

The following table outlines the rights of each role associated with individual datasets. Note that because of its universal access to all things in your Soda Cloud account, an **Admin** member as described above has all the rights of a **Manager** relative to datasets and checks.

| Rights                                                                     | Manager <br /> and Admin | Editor | Viewer |
|----------------------------------------------------------------------------|:------------------------:|:------:|:------:|
| View Check Results of checks associated with a dataset                     |             ✓            |    ✓   |    ✓   |
| Create and track Incidents associated with one or more check results       |             ✓            |    ✓   |    ✓   |
| Create checks associated with an agreement                                 |             ✓            |    ✓   |        |
| Edit checks associated with a dataset                                      |             ✓            |    ✓   |        |
| Add and edit dataset Attributes, such as Description or Tags               |             ✓            |    ✓   |        |
| Add Tags to a dataset                                                      |             ✓            |    ✓   |        |
| Control member access to a dataset and its checks (add or remove access)   |             ✓            |        |        |
| Change the roles of members with access to a dataset and its check         |             ✓            |        |        |


## Default roles for datasets and checks

When a new member accepts an invitation to join an existing organization, Soda Cloud applies the following defaults to the new member:
- the role of **User** in the organization
- membership in the **Everyone** group

By default, all members are included in the group identity called Everyone In the context of an individual dataset, Admins and Managers can use the Everyone group when [setting Responsibilities in a dataset](#change-access-to-a-dataset). In this early implementation of roles and groups, Everyone is the only group that exists in Soda Cloud. It is not possible to add or remove members from the group, or to create new groups, yet.

<details>
    <summary>For example...</summary>
    <p>For the Customers_EU dataset, Alice the Admin added the Everyone group to the dataset and assigned the group Editor privileges. </p>
    <img src="/assets/images/everyone-editor.png" style="height:250px">
    <p>When Bob joins his organization's Soda Cloud account as a User member, Soda Cloud automatically adds his name to the organization's Everyone group. Thus, Bob automatically has Editor level access to the Customers_EU dataset.</p>
</details>
<br />

By default, when a dataset's Admin or Manager grants another member or the Everyone group access to a dataset, Soda Cloud automatically assigns the new member or group the default role of Editor for the dataset.  You can adjust this setting to a different default role; see [Change the default access to datasets](#change-the-default-access-to-datasets).

<details>
    <summary>For example...</summary>
    <p>When Alice the Admin adds Carlos, a member of her Soda Cloud account, to the Customers_US dataset, Soda Cloud automatically assigns him the role of Editor for that dataset. </p>
    <img src="/assets/images/new-editor.png" style="height:250px">
</details>
<br />

By default, when any member adds a new dataset to the Soda Cloud account via Soda Core, Soda Cloud *does not* assign the **Everyone** group to the dataset. You can adjust this setting to automatically assign the **Everyone** group to each newly added dataset; see [Change the default access to datasets](#change-the-default-access-to-datasets).


## Change the default access to datasets

As an Admin you have the option of adjusting three default access settings:

* By default, when a dataset's Admin or Manager grants another member or the Everyone group access to a dataset, Soda Cloud automatically assigns the new member or group the [default role of Editor for the dataset](#default-roles-for-datasets-and-checks).  You can adjust this setting to a different default role.
* By default, when any member adds a new dataset to the Soda Cloud account via Soda Core, Soda Cloud *does not* assign the **Everyone** group to the dataset. You can adjust this setting to automatically assign the **Everyone** group to each newly added dataset.
* By default, Soda Cloud *does not* allow dataset owners to manage the responsibilites on the datasets they own. You can adjust this setting to automatically assign the role of Manager to all dataset owners, rather than Editor.

1. As an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.
2. Access the **Responsibilities** tab to adjust either of the two default settings:
* Use the dropdown to adjust the default role of new members and groups who are granted access to a dataset.
* Check the box for Soda Cloud to automatically assign the **Everyone** group to every new dataset that an Admin adds to the Soda Cloud account.  
* Check the box for Soda Cloud to allow all dataset owners to manage the responsibilities for datasets they own.

Note that by default, Soda Cloud automatically adds all new members to the organization's **Everyone** group. See [Default roles and group](#default-roles-and-groups). 

<details>
    <summary>Example of changed default settings</summary>
    <ol>
      <li>As an Admin, I individually edit the <strong>Responsibilities</strong> of Datasets A, B, and C and add the Everyone group as Editor to each.</li>
      <li>Then I access <strong>Organization Settings</strong> > <strong>Responsibilities</strong> and change the value of <strong>Default role when assigning a new user or group to a resource</strong> to <strong>Viewer</strong> and leave the check box <i>unchecked</i> for <strong>Automatically assign the "Everyone" group to the new resource</strong>.</li>
      <li>Then, using Soda Core, I connect to a new data source, and upload 20 new datasets to Soda Cloud.</li>
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

When any member uses Soda Core to add a new dataset to the Soda Cloud account, the Member automatically becomes the Dataset Owner. The new dataset can only be accessed by an Admin and the Dataset Owner, who automatically becomes a Manager of the dataset, until the Admin or Dataset Owner changes access to the dataset to grant other members access.

As an Admin or a Manager of a dataset, you can access the **Responsibilities** tab for an individual dataset to make changes to the default role assignments in the dataset. All members, regardless of their role assignment, can view the Responsibilities tab for a dataset.

1. As an Admin or Manager, login to your Soda Cloud account and navigate to the **Datasets** dashboard.
2. Click the stacked dots to the right of the dataset for which you wish to adjust the role assignments, then select **Edit Dataset**.
3. In the **Responsibilities** tab, use the search bar to find specific members to which you wish to assign a role other than the default, Editor, then use the dropdown next to each name to adjust their role. <br /> Alternatively, search for the group **everyone** and change the role of the group.


## Review member licenses

Each Soda Cloud Plan (Soda Teams or Soda Enterprise) includes a specific number of **Author** licenses for members of the Soda Cloud account. A member's license status controls whether they can make changes to any datasets and checks in the Soda Cloud account.
* **Authors** essentially have read-write access in Soda Cloud and maintain the role of Admin, Manager, or Editor relative to checks and datasets. See [Roles and rights](#roles-and-rights) above.
* **Viewers** essentially have read-only acecss in Soda Cloud and maintain the role of Viewer relative to checks and datasets. See [Roles and rights](#roles-and-rights) above.

1. To review the licenses that your members have, as an Admin, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Soda Cloud Admin members can view Organization Settings. 
2. Access the **Members** tab to view a list of people who have access to your Soda Cloud account, the role they have in the organization (Admin or User), and their License status (Author or Viewer). 
3. Click a member's **Author** or **Viewer** label in the License column to access a **Responsibilities** window that lists the member's access to resources (datasets and checks), the role they hold for each resource, and their license status relative to the resource.

## Data source, dataset, and check owners

There are three ownership roles in Soda Cloud that identify the member that owns a data source, a dataset, or a check. These ownership roles do not enforce any rights or permissions on these resources, they are simply identifiers.

* By default, the member who [created the data source]({% link soda-cloud/add-datasource.md %}) becomes the **Data Source Owner** and **Dataset Owner** of all datasets in that data source. The default role that Soda Cloud assigns to the Dataset Owner is that of Manager.
* By default, the member who [creates an agreement]({% link soda-cloud/agreements.md %}) become the **Check Owner**. 
<br />
<br />

#### Change the Dataset Owner

1. If you are the Admin of the organization, or have a Manager role for the dataset, login to your Soda Cloud account and navigate to the **Datasets** dashboard.
2. Click the stacked dots to the right of the dataset for which you wish to adjust the ownership, then select **Edit Dataset**.
3. In the **Attributes** tab, use the dropdown to select the name of another member to take ownership of the dataset, then **Save**.
4. Soda Cloud automatically assigns the role of Manager to the new Dataset Owner.
<br />
<br />

#### Change the Check Owner

1. If you are the Admin of the organization, or have a Manager or Editor role for the check's dataset, login to your Soda Cloud account and navigate to the **Checks** dashboard.
2. Click the stacked dots to the right of the check for which you wish to adjust the ownership, then select **Edit Check**.
3. In the **Attributes** tab, use the dropdown to select the name of another member to take ownership of the check, then **Save**.


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* [Organize your datasets]({% link soda-cloud/organize-datasets.md %}) in Soda Cloud to facilitate your search for the right data.
* [Invite colleagues]({% link soda-cloud/collaborate.md %}#invite-your-team-members) to join your organization's Soda Cloud account.
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}