---
layout: default
title: Manage resource permissions in Soda Cloud
description: Learn how to manage user access to datasets in an organization's Soda Cloud account.
parent: Organize, alert, investigate
---

# Manage resource permissions in Soda Cloud
*Last modified on {% last_modified_at %}*

To manage the resource-level permissions of users that belong to a single organization, Soda Cloud uses roles, groups, and access permissions. These role-based access permissions enforce limits on the abilities for people to make additions and changes to resources in Soda Cloud, including agents, data sources, and datasets.

See also: [Manage account roles and permissions in Soda Cloud]({% link soda-cloud/roles-and-rights.md %})
<br /><br />

[Resource-level roles and permissions](#resource-level-roles-and-permissions)<br />
[Change access to a dataset](#change-access-to-a-dataset)<br />

## Resource-level roles and permissions

Where [account-level]({% link soda-cloud/roles-and-rights.md %}) roles and permissions apply to your organization's Soda Account, the roles and access permissions described in the table below apply to the following resources in your account:

| agents<br/> data sources<br/> scan definitions<br/> datasets | checks<br/> agreements<br/> discussions<br/> incidents |

The roles that define who can make changes to resources in Soda Cloud are **Admin**, **Manager**, **Editor**, and **Viewer**. As an Admin, you can apply resource-level roles to both individual users and user groups. 

The following table outlines the permissions of each resource-level role. 

| Permissions                                                                | Admin | Manager  | Editor | Viewer |
|----------------------------------------------------------------------------|:-----:|:--------:|:------:|:------:|
| Add, edit, and delete a self-hosted Soda Agent                             |   ✓   |          |        |        |
| Add, edit, or delete a data source via a Soda-hosted or self-hosted agent  |   ✓   |          |        |        |
| Change the owner of a data source                                          |   ✓   |          |        |        |
| Add or adjust a data source's default scan definition                      |   ✓   |          |        |        |
| Add a scan definition in an agreement or during no-code check creation     |   ✓   |    ✓     |    ✓   |        |
| Delete a scan definition                                                   |   ✓   |          |        |        |
| Control user access to a dataset and its checks (add or remove access)     |   ✓   |    ✓     |        |        |
| Change the roles of users with access to a dataset and its checks          |   ✓   |    ✓     |        |        |
| Apply dataset attributes to datasets                                       |   ✓   |    ✓     |    ✓   |        |
| Configure Soda to collect sample data for a dataset                        |   ✓   |          |        |        |
| Configure Soda to profile datasets in a data source                        |   ✓   |          |        |        |
| Activate an anomaly dashboard for a dataset (preview access only)          |   ✓   |    ✓     |        |        |
| Add and edit dataset Attributes, such as Description or Tags               |   ✓   |    ✓     |    ✓   |        |
| Access a dataset's page to view metadata and checks, and dataset info      |   ✓   |    ✓     |    ✓   |    ✓   |
| Edit or delete a dataset                                                   |   ✓   |    ✓     |        |        |
| Run a scan                                                                 |   ✓   |    ✓     |        |        |
| View scan results of checks associated with a dataset or agreement         |   ✓   |    ✓     |    ✓   |    ✓   |
| Propose and test a no-code check                                           |   ✓   |    ✓     |    ✓   |    ✓   |
| Add, edit, or delete a no-code check                                       |   ✓   |    ✓     |    ✓   |        |
| Apply check attributes when proposing a check                              |   ✓   |    ✓     |    ✓   |    ✓   |
| Edit or delete individual checks associated with a dataset ingested via Soda Library |   ✓   |    ✓     |    ✓   |        |
| Access failed row samples for a check                                      |   ✓   |    ✓     |    ✓   |    ✓   |
| Create a new agreement                                                     |   ✓   |    ✓     |    ✓   |        |
| Approve and reject agreements as a stakeholder                             |   ✓   |    ✓     |    ✓   |    ✓   |
| Edit an existing agreement, including adding a new scan definition         |   ✓   |    ✓     |    ✓   |        |
| Apply check attributes in an agreement                                     |   ✓   |    ✓     |    ✓   |        |
| View agreements                                                            |   ✓   |    ✓     |    ✓   |    ✓   |
| Begin or participate in a discussion                                       |   ✓   |    ✓     |    ✓   |    ✓   |
| Close a discussion                                                         |   ✓   |    ✓     |    ✓   |    ✓   |
| Create and track incidents associated with one or more check results       |   ✓   |    ✓     |    ✓   |    ✓   |
| Delete an incident                                                         |   ✓   |    ✓     |    ✓   |        |
| Create, edit, or delete a notification rule                                |   ✓   |    ✓     |    ✓   |        |
| Set the status of a notification rule (Active or Paused)                   |   ✓   |    ✓     |    ✓   |        |

<br/>

## Change access to a dataset

When any user uses Soda Library to add a new dataset to the Soda Cloud account, the user automatically becomes the Dataset Owner. The new dataset can only be accessed by an Admin and the Dataset Owner, who automatically becomes a Manager of the dataset, until the Admin or Dataset Owner changes access to the dataset to grant other users access.

As an Admin or a Manager of a dataset, you can access the **Responsibilities** tab for an individual dataset to make changes to the default role assignments in the dataset. All users, regardless of their role assignment, can view the Responsibilities tab for a dataset.

1. As an Admin or Manager, login to your Soda Cloud account and navigate to the **Datasets** dashboard.
2. Click the stacked dots to the right of the dataset for which you wish to adjust the role assignments, then select **Edit Dataset**.
3. In the **Responsibilities** tab, use the search bar to find specific users or user groups to which you wish to assign a role other than the default, Editor, then use the dropdown next to each name to adjust their role. <br /> Alternatively, search for the group **everyone** and change the role of the group.

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