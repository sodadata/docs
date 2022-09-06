---
layout: default
title: Soda Cloud resources
description: Learn about the different parts, or resources, that make up your Soda Cloud account.
parent: Soda Cloud
---

# Soda Cloud resources

Soda Cloud is made up of several parts, or **resources**, that work together to define checks, execute scans, and display results that help you gauge the quality and reliability of your data. 

It is helpful to understand these resources and how they relate, or connect, to each other if you are establishing [role-based access rules]({% link soda-cloud/roles-and-rights.md %}) for your organization's Soda Cloud account, or if you are planning to delete an existing resource.

[Example Soda Cloud deployment](#example-soda-cloud-deployment)<br />
[Delete resources](#delete-resources)<br />
[Example deployment with Soda Cloud and Soda Core](#example-deployment-with-soda-cloud-and-soda-core)<br />
<br />

## Example Soda Cloud deployment

The following diagram illustrates an example deployment of a single Soda Cloud account with two Soda Agents, each of which connects to two data sources. A Soda Cloud Administrator has also created integrations with Slack, Jira (via a webhook), and MS Teams (coming soon).

![example-deployment](/assets/images/example-deployment.png){:height="700px" width="700px"}

* A **Soda Agent** is Soda Core that has been deployed in Kubernetes cluster in a cloud services provider environment. It enables Soda Cloud users to securely connect to data sources such as Snowflake, BigQuery, and PostgreSQL. [Read more]({% link soda-agent/basics.md %}).
* A **data source** in Soda Cloud is a representation of the connection to your data source. Notably, it does not contain any of your data<sup>†</sup>, only data source metadata that it uses to check for data quality. [Read more]({% link soda-cloud/add-datasource.md %}). <br />Within the context of Soda Cloud, a data source contains:
  * **datasets** which represent tabular structures with rows and columns in your data source; like data sources, they do not contain your data<sup>†</sup>, only metadata. Datasets can contain user-defined **attributes** that help filter and organize check results. [Read more]({% link soda-cloud/organize-datasets.md %}).
  * **scan definitions** which you use to define a Soda scan schedule for the data source. [Read more]({% link soda-cloud/add-datasource.md %}#1-attributes).
  * **agreements** in which you write **checks** to define what good data looks like. Agreements also specify where to send alert notifications when a check result warns or fails, such as to a Slack channel in your organization. [Read more]({% link soda-cloud/agreements.md %}).
* An **integration** is a built-in Soda Cloud feature that enables you to connect with a third-party service provider, such as Slack. [Read more]({% link soda/integrate-slack.md %}).

<sup>†</sup> An exception to this rule exists when you configure Soda Cloud to collect sample data from a dataset, or samples of failed rows from a dataset when a check result fails.

## Delete resources

As the example deployment diagram illustrates, the different resources in Soda Cloud have several connections to each other. You can responsibly delete resources in Soda Cloud -- it warns you about the relevant impact before executing a deletion! -- but it may help to visualize the impact a deletion may have on your deployment before proceeding.

The following non-exhaustive list of example deletions serve to illustrate the potential impact of deleting. 

### Delete a dataset

Deleting a dataset affects individual checks defined inside an agreement. If you have multiple agreements which contain checks against a particular dataset, all of those checks, and consequently the agreements they are in, are impacted when you delete a dataset. Further, if the dataset contains attributes, those attributes disappear with the dataset upon deletion.

![delete-dataset](/assets/images/delete-dataset.png){:height="500px" width="500px"}

### Delete a data source

Deleting a data source affects many other resources in Soda Cloud. As the following diagram illustrates, when you delete a data source, you delete all its datasets, scan definitions, agreements, and the checks in the agreements. 

If an agreement contains a [cross check]({% link soda-cl/cross-row-checks.md %}) that compares the row count of datasets between data sources (as does the agreement in Data source C in the diagram), deleting a data source affects more than the checks and agreements it contains.

![delete-datasource](/assets/images/delete-datasource.png){:height="700px" width="700px"}

### Delete a scan definition

Deleting a scan definition has the potential to impact multiple agreements in a data source. Among other things, the scan definition defines the schedule that Soda Cloud uses to execute scans of data in the data source. 

Any agreements that reference a deleted scan definition would no longer be scanned for data quality. Consequently, your **Check Results** dashboard in Soda Cloud no longer displays check results for the agreement, nor would Soda Cloud send alert notifications.

![delete-scan-def](/assets/images/delete-scan-def.png){:height="700px" width="700px"}

### Delete an integration

A Soda Cloud Administrator has the ability to add, edit, and delete integrations with third-party service providers. 

As the example diagram indicates, deleting a Slack integration prevents Soda Cloud from sending alert notifications to Slack when check results warn or fail, and prevents users from connecting an [incident]({% link soda-cloud/incidents.md %}) to a Slack channel to collaborate on data quality issue resolution.

![delete-integration](/assets/images/delete-integration.png){:height="700px" width="700px"}

## Example deployment with Soda Cloud and Soda Core

If your Soda Cloud account is also [connected to Soda Core]({% link soda-core/connect-core-to-cloud.md %}), your deployment may resemble something like the following diagram. 

Note that you can delete resources that appear in Soda Cloud as a result of a manual or programmatic Soda Core scan. However, unless you delete the reference to the resource at its source – the `checks.yml` file or `configuration.yml` file – the resource will reappear in Soda Cloud when Soda Core sends its next set of scan results.

For example, imagine you use Soda Core to run scans and send results to Soda Cloud. In the `checks.yml` file that you use to define your checks, you have the following configuration:
```yaml
checks for dataset-q:
  - missing_count(last_name) < 10
```

In Soda Cloud, you can see `dataset-q` because Soda Core pushed the scan results to Soda Cloud which resulted in the creation of a resource for that dataset. In Soda Cloud, you can use the UI to delete `dataset-q`, but unless you also remove the `checks for dataset-q` configuration from your `checks.yml` file, the dataset reappears in Soda Cloud the next time you run a scan. 


![example-cloud-with-core](/assets/images/example-cloud-with-core.png){:height="700px" width="700px"}

## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn more about [agreements (preview)]({% link soda-cloud/agreements.md %}).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}