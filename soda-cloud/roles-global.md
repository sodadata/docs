---
layout: default
title: Manage global roles, user groups, and settings
description: To manage the actions of users that belong to a single organization, Soda Cloud uses roles and access permissions. Admins can access an Audit Trail of user actions.
parent: Organize, alert, investigate
redirect_from:
  - /soda-cloud/roles-and-rights.html 
---

# Manage global roles, user groups, and settings
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

To manage the actions of users that belong to a single organization, Soda Cloud uses roles, groups, and access permissions. 

These roles and groups and their associated permissions enforce limits on the abilities for users to access or make changes to resources, or to make additions and changes to organization settings and default access permissions.

[About roles, groups, and permissions](#about-roles-groups-and-permissions)<br />
[Global roles and permissions](#global-roles-and-permissions)<br />
[Manage organization settings](#manage-organization-settings)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Add multiple organizations](#add-multiple-organizations)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[View users](#View-users)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Manage user groups](#manage-user-groups)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Manage global roles](#manage-global-roles)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Access and audit trail](#access-an-audit-trail)<br />
[Go further](#go-further)<br />
<br />

## About roles, groups, and permissions

Soda Cloud makes use of roles, groups, and permissions to manage user access to functionalities, such as alert notifications, and resources, such as datasets and data sources, in the organization. The following table defines the terminology Soda Cloud uses.

| Term | Description | 
| ---- | ----------- | 
| User | Refers to anyone with access to a Soda Cloud account, or organization. Users may belong to multiple Soda Cloud organizations, as when teams set up separate organizations for staging, development, and production environments; see [Add multiple organizations](#add-multiple-organizations). You can invite a person to join your Soda Cloud account as a user (**your avatar** > **Invite Users**), or you can use an [SSO integration]({% link soda-cloud/sso.md %}) to manage your team's access to a Soda Cloud account.  | 
| User Group | Refers to a named collection of individual users in a Soda Cloud account. If you use an SSO integration to manage your team's access to Soda Cloud, you can optionally choose to synchronize the user groups you have defined in your identity provider (Okta, Azure AD, etc.) and assign roles to those synched user groups in Soda Cloud.|
| Role | Refers to a named set of permissions that, when assigned to a user or user group, define how the user or group may access or act upon resources or functionalities in Soda Cloud. Roles in Soda Cloud exist at either a global or dataset level. [Read more](#roles) | 
| Permission | Refers to a rule that governs an activity or access as it relates to a resource or functionality in Soda Cloud. |
| Permission group | Refers to a named set of permissions. When you create a new global or dataset role in Soda Cloud, you add permission groups, instead of individual, granular permissions. For example, you can assign the permission group , "Manage scan definitions" to a custom global role called "Engineers", giving users or user groups who are assigned this role the ability to create, edit, or delete scan definitions for a data source.|
| Responsibilities | Refers to a subset of role-based access controls for newly-onboarded datasets. These settings determine inclusion in the Everyone user group and the roles Dataset Owners get for newly-onboarded datasets; see [Assign dataset roles](#assign-dataset-roles). |
| License | Refers to a legacy billing model that encourages unlimited Viewers with read-only access to Soda Cloud, and some Authors with read-write access to resources and functionality. |

<br />

#### Roles

There are two type of roles that regulate permissions in Soda Cloud: **Global** and **Dataset**. You can assign each type of role to users or user groups in Soda Cloud to organize role-based access control to resources and functionality in your account. You can also customize the permissions of the out-of-the-box roles Soda Cloud includes, or you can create new roles and assign permissions to roles as you wish. 

| Type of role | Description | OOTB roles | Permissions |
| ------------ | ----------- | ---------- | ----------- |
| Global | Regulates permissions to access account-level functionalities and resources such as notification rules, integrations, and scan definitions. | Admin <br /> User | [Global roles and permissions](#global-roles-and-permissions)|
| Dataset | Regulates permissions to access, and act upon, individual datasets. | Manager <br />Editor <br />Viewer | [Dataset roles and permissions]({% link soda-cloud/roles-dataset.md %}#dataset-roles-and-permissions) |

<br />

## Global roles and permissions

By default, when a new user accepts an invitation to join an existing Soda Cloud organization, or when they gain access to an organization via SSO, Soda Cloud applies the the global role of **User** in the organization. If you are the first user in your organization to sign up for Soda Cloud, you become a global **Admin** for the account by default. Note, you can have more than one global Admin user in a Soda Cloud account.

The following table outlines the permission groups for each out-of-the-box global role.

| Permission group | Permissions | Admin | User |
|------------------| ------------|:-----:|:----:|
| Create agreements | • Create new agreements | ✓ | ✓ |
| Create new datasets <br />and data sources <br />with Soda Library | • Create datasets through Soda Library for an existing data source | ✓ | ✓ |
| Manage attributes | • Create, edit, or delete check attributes | ✓ |   |
| Manage data <br />sources and agents | • Add, edit, or delete a new data source in Soda Cloud <br />• Add, edit, or delete a new data source via Soda Library <br />• Add, edit, or delete a self-hosted Soda agent | ✓ |   |
| Manage <br />notification <br />rules | • Create, edit, or delete notification rules | ✓ | ✓ |
| Manage <br />organization <br />settings<br />[Read more](#manage-organization-settings) | • Manage organization settings <br />• Deactivate users <br />• Create, edit, or delete user groups <br />• Create, edit, or delete dataset roles  <br />• Create, edit, or delete global roles <br />• Assign global roles to users or user groups <br />• Add, edit, or delete integrations <br />• Access and download the audit trail | ✓ |   |
| Manage scan <br />definitions | • Create, edit, or delete scan definitions. | ✓ | ✓ |
| n/a <sup>1</sup> | • Read-write access to all agreements <br />• Read-write access to all datasets | ✓ |   |

<sup>1</sup> Global admin users have these permissions, but you cannot add this nameless permission group to a custom global role.

<br />

## Manage organization settings

As a user with the permission to do so, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Use the table below as reference for the tasks you can perform within each tab.

| Tab | Tasks |
| --- | ------ |
| **Organization** | • Adjust the name of the organization.<br/> • Review the type of Soda Cloud Plan to which your organization subscribes.<br/> • Adjust enablement settings for data sampling, access to a Soda-hosted Agent, and access to Soda AI features in your account.  |
| **Users** | • View a list of people who have access to the Soda Cloud account.<br /> • Review each user's **License** status as an **Author** or **Viewer**, their access to Admin permissions, and the user groups to which they belong.<br /> • Reset a user's password<br /> • Deactivate a user's account. |
| **User Groups** | Create and manage custom groups of users in your Soda Cloud organization; see [Create custom user groups](#create-custom-user-groups). |
| **Global Roles** | • View create, edit, or delete out-of-the-box or custom global roles. <br /> • View the users or user groups assigned to each global role. |
| **Dataset Roles** | • View create, edit, or delete out-of-the-box or custom dataset roles. <br /> • View or edit the datasets that use each dataset role. <br /> • Review or edit **Responsibilities** for newly onboarded datasets; see [Assign dataset roles]({% link soda-cloud/roles-dataset.md %}#assign-dataset-roles).|
| **Integrations** | Connect Soda Cloud to your organization's Slack workspace, MS Team channel, or other third-party tool via webhook. |
| **Audit Trail** | Download a CSV file that contains user audit trail information. |

<br />

### Add multiple organizations

You may find it useful to set up multiple organizations in Soda Cloud so that each corresponds with a different environment in your network infrastructure, such as production, staging, and development. Such a setup makes it easy for you and your team to access multiple, independent Soda Cloud organizations using the same profile, or login credentials.

Note that Soda Cloud associates any [API keys]({% link soda-cloud/api-keys.md %}) that you generate within an organization with both your profile *and* the organization in which you generated the keys. API keys are not interchangeable between organizations.

Contact <a href="mailto:support@soda.io">support@soda.io </a> to request multiple organizations for Soda Cloud.

<br />

### View users

A few Soda Cloud legacy licensing models include a specific number of **Author** licenses for users of the Soda Cloud account. A user's license status controls whether they can make changes to any datasets, checks, and agreements in the Soda Cloud account.
* **Authors** essentially have read-write access to Soda Cloud resources and functionalities, and maintain the dataset role of Admin, Manager, or Editor. 
* **Viewers** essentially have read-only access to Soda Cloud resources and maintain the dataset role of Viewer. 

1. To review the licenses that your users have, as a user with permission to do so, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. 
2. Access the **Users** tab to view a list of people who have access to your Soda Cloud account, including:
* the license each user has, if relevant
* the user groups they belong to
* if they have global Admin permissions
3. Click a user's **Author** or **Viewer** label in the License column to access a **Responsibilities** window that lists the user's access to resources (datasets, agreements, and checks), the role they hold for each resource, and their license status relative to the resource.

<br />

### Manage user groups

Create or edit user groups in Soda Cloud to manage global and dataset role-based permissions to resources. 

As a user with permission to do so, navigate to **your avatar** > **Organization Settings**, then access the **User Groups** tab. Click **Create User Group**, then follow the guided workflow to create a group and add individual members. Once created, assign the user group to any of the following resources.

* In the **User Groups** tab, assign an out-of-the-box or custom global role to user groups instead of individually assigning global roles to users.
* In **Edit Dataset Responsibilities**, add a user group as a member and [assign it a dataset role]({% link soda-cloud/roles-dataset.md %}#assign-dataset-roles) to control the way users in the group access or act upon the dataset.
* Assign user groups as alert [notification rules]({% link soda-cloud/notif-rules.md %}#set-new-rules) recipients to make sure the right team, with the right permissions for the dataset(s), gets notified when checks warn or fail.
* For redundancy, assign [dataset ownership]({link soda-cloud/roles-dataset.md}#change-the-dataset-owner) to user groups instead of individual users.
* Add a user group to a [discussion]({% link soda/quick-start-end-user.md %}#begin-a-discussion-and-propose-checks) in Soda Cloud so the whole team can review newly-proposed no-code checks.
* Add user groups as [stakeholders]({% link soda-cl/soda-cl-overview.md %}#define-sodacl-checks) in an agreement so that whole teams can collaborate on the expected state of data quality for one or more datasets.

If you use an SSO integration to manage your team's access to Soda Cloud, you can optionally choose to synchronize the user groups you have defined in your identity provider (Okta, Azure AD, etc.) and assign roles to those synched user groups in Soda Cloud. See: [Sync user groups from an IdP]({% link soda-cloud/sso.md %}#sync-user-groups-from-an-idp)

<br />

### Manage global roles

Create or edit global and dataset roles to assign to users or user groups in Soda Cloud.

As a user with permission to do so, navigate to **your avatar** > **Organization Settings**, then access the **Global Roles** tab. Click **Add Global Role**, then follow the guided workflow to name a role and add permissions groups. Refer to the [table above](#global-roles-and-permissions) for a list of permissions groups, and their associated permissions, that you can assign to global roles.

<br />

### Access an audit trail

To meet your organization's regulatory and policy mandates, you can download a CSV file that contains an audit trail of activity on your Soda Cloud account for a date range you specify. The file contains details of each user's actions, their email and IP addresses, and a timestamp of the action. An Admin is the only account-level role that can access an audit trail for a Soda Cloud account. 

1. As a user with the permission to do so, login to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**. Only Admins can view Organization Settings.
2. Access the **Audit Trail** tab, then set the date range of usage details you wish to examine and click **Download**.

Alternatively, you can use the [Audit Trail endpoint]({% link api-docs/reporting-api-v1.md %}#/operations/audit_trail_v0_audit_trail_get) in Soda Cloud's Reporting API to access audit trail data. 

<br />


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn more about the relationship between resources in [Soda's architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
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
