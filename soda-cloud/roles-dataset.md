---
layout: default
title: Manage dataset roles
description: Learn how to manage user access to datasets in an organization's Soda Cloud account.
parent: Organize, alert, investigate
redirect_from:
  - /soda-cloud/roles-resources.html
---

# Manage dataset roles
*Last modified on {% last_modified_at %}*

To manage the dataset-level permissions of users that belong to a single organization, Soda Cloud uses roles, groups, and access permissions. These role-based access permissions enforce limits on the abilities for people to make additions and changes to datasets in Soda Cloud.

There are two type of roles that regulate permissions in Soda Cloud: **Global** and **Dataset**. You can assign each type of role to users or user groups in Soda Cloud to organize role-based access control to resources and functionality in your account. You can also customize the permissions of the out-of-the-box roles Soda Cloud includes, or you can create new roles and assign permissions to roles as you wish. 

The content that follows offers information about dataset roles. For details on terminology, global roles, custom user groups, and organizational settings, see [Manage global roles, user groups, and settings]({% link soda-cloud/roles-global.md %}#about-roles-groups-and-permissions).

## Dataset roles and permissions

The out-of-the-box roles that define who has permission to access or make changes to datasets in your Soda Cloud account are **Admin**, **Manager**, **Editor**, and **Viewer**. An Admin role has all permissions to access or act upon a dataset; the following table outlines the permission groups for the remaining out-of-the-box dataset roles.

| Permission group  |  Manager | Editor | Viewer |
| ----------------  | :----: | :----: |:----: |
| [View dataset](#view-dataset) | ✓ | ✓ | ✓ |
| [Access dataset <br />profiling<br />and samples](#access-dataset-profiling-and-samples) | ✓ | ✓ | ✓ |
| [Access failed <br />row samples<br />for checks](#access-failed-row-samples-for-checks) | ✓ | ✓ | ✓ |
 [Configure dataset](#configure-dataset) | ✓ | ✓ |   |
| [Manage dataset responsibilities](#manage-dataset-responsibilities) | ✓ |  |  |
| [Propose checks](#propose-checks) | ✓ | ✓ | ✓ |
| [Manage checks](#manage-checks) | ✓ | ✓ |   |
| [Manage incidents](#manage-incidents) | ✓ | ✓ | ✓ |
| [Delete dataset](#delete-dataset) | ✓ |  |  |

<br />

#### View dataset 
This permission group cannot be removed from any of the out-of-the-box dataset roles.
* View a dataset in the list on the **Datasets** page 
* View a dataset's checks in the **Checks** page
* Access a dataset via API
* Access a dataset's checks via API
* View a dataset **Checks** tab
* View a dataset's **Anomalies** tab
* View a dataset's **Agreements** tab
* View a dataset's **Columns** tab, schema info only
* View the check history for a dataset's checks, though not failed row samples

#### Access dataset profiling and samples
* View a dataset's **Columns** tab, schema and profiling info
* View a dataset's **Samples** tab

#### Access failed row samples for checks
* View the check history for a dataset's checks, including failed row samples

#### Configure dataset
* Edit a dataset's attributes
* Edit a dataset's profiling configuration

#### Manage dataset responsibilities
* Edit a dataset's responsibilities

#### Propose checks
* Select a dataset in a **New Discussion** form
* Select a dataset in an **Add Check** form
* Click **Propose Check** when creating a no-code check 

#### Manage checks
* Push a dataset's check results from Soda Library scans to Soda Cloud. <br />At present, Soda Cloud does not reject check results from a Soda Library scan executed by a user without "Manage checks" permission for a dataset. Instead, Soda issues a soft warning to indicate that the user does not have permission to manage checks for the dataset. In future iterations, the warning will be changed to a rejection of any results pushed without proper permissions for the dataset.
* Edit the description of a dataset's checks
* Edit the owner of a dataset's checks
* Delete a dataset's checks
* Create no-code checks for a dataset
* Edit no-code checks for a dataset
* Delete no-code checks for a dataset
* Add proposed no-code checks to a dataset

#### Manage incidents
* Create an incident related to a dataset's check
* Update an incident related to a dataset's check
* Delete an incident related to a dataset's check

#### Delete dataset
* Delete a dataset

<br/><br/>

### Create dataset roles

You can create or edit dataset roles to assign to users or user groups in Soda Cloud.

As a user with permission to do so, navigate to **your avatar** > **Organization Settings**, then access the **Dataset Roles** tab. Click **Add Dataset Role**, then follow the guided workflow to name a role and add permissions groups. Refer to the [table above](#dataset-roles-and-permissions) for a list of permissions groups, and their associated permissions, that you can assign to global roles.

### Assign dataset roles 

When any user uses Soda Library or Soda Cloud to add a new data source, and its datasets, to the Soda Cloud account, the user automatically becomes the Dataset Owner of each dataset in the data source. Depending upon the **Responsibilities** settings in the **Dataset Roles** tab of **Organization Settings**, the Dataset Owner is assigned a role according to the **Default Dataset Owner Role** setting. Refer to [User groups and responsibilities]({% link soda-cloud/roles-global.md %}#user-groups-and-responsibilities) for details.

Beyond the default users and roles assigned to a dataset upon addition to Soda Cloud, you can edit the responsibilities for an individual dataset to make changes to the way users and user groups can access or act upon the dataset. 

1. As a user with the permission to do so, login to your Soda Cloud account and navigate to the **Datasets** dashboard.
2. Click the stacked dots to the right of the dataset for which you wish to adjust the role assignments, then select **Edit Responsibilities**.
3. Use the search bar to find specific users or user groups to which you wish to assign a role for the dataset, then use the dropdown next to each name to adjust their role, then **Save** your changes.

If you have added a user to a group to which you have assigned a level of permission for a dataset, then manually assigned a different level of permission to the individual user for a dataset, Soda honors the higher set of permissions.

For example, say you add Manny Jacinto to a user group called Marketing Team. For a new_signups dataset, you assign the Marketing Team the out-of-the-box role of Viewer. Then, for the same dataset, you assign Manny's individual user the out-of-the-box role of Manager. Soda honors the permissions of the higher role, Manager, for Manny's access to new_signups.

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