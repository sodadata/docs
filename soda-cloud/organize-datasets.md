---
layout: default
title: Organize datasets in Soda Cloud
description: Use attributes, tags, and filters to facilitate your search for the specific data quality status of your datasets.
parent: Soda Cloud
---

# Organize datasets in Soda Cloud

With dozens, or even hundreds of datasets in your Soda Cloud account, it may be laborious to try to find the data quality information you're looking for. To facilitate your search for specific data quality status, consider defining your own **Attributes** and **Tags** for datasets, then use filters to narrow your search.


## Get organized

1. Start by creating attributes for datasets that are relevant to your organization. If you are an [Admin member]({% link soda-cloud/roles-and-rights.md %}) of your Soda Cloud account, navigate to **your avatar** > **Organization Settings** > **Attributes**.
2. Create new attributes for datasets in your organization that your colleagues can use to categorize datasets for easy identification and discovery. What follows are a few examples for how to define attributes; consider adding multiple attributes to access precise cross-sections of data quality.
* by organizational department: Product Marketing, Engineering-FE, Finance-AP, Customer Success
* by product
* by data domain: Customer data, Product data, Order & Fulfillment data
* by internal objectives and key results (OKR)
3. As an Admin, Manager, or Editor in your Soda Cloud account, navigate to the **Datasets** dashboard, click the stacked dots next to a dataset, then select **Edit Dataset**. Use the attributes fields to apply the appropriate attributes to the dataset. 
4. While editing a dataset, consider adding **Tags** to the dataset as well. Use tags to:
* identify datasets that are associated with a particular marketing campaign
* identify datasets that are relevant for a particular customer account
* identify datasets whose quality is critical to business operations, or to categorize datasets according to their criticality in general, such as "high", "medium", and "low".
* identify datasets that populate a particular report or dashboard 
5. After saving your changes and applying tags and attributes to multiple datasets, use the **Filters** in the **Datasets** dashboard to display the datasets that help narrow your study of data quality. 
6. Share a filtered view of your datasets with colleagues by sharing the URL of your narrowed search. 

## Adjust attributes

* Once created, you *cannot* change the type of your attribute. For example, you cannot change a checkbox attribute into a multi-select attribute.
* Once created, you can change the display name of an attribute.
* For a single- or multi-select attribute, you can remove, change, or add values to the list of available selections. However, if you remove or change values on such a list, you cannot search for the deleted or previous value in the dataset filter. 


## Go further

* Create [alerts]({% link soda-cloud/agreements.md %}) to notify your team of data quality issues.
* Learn how to create and track data quality [Incidents]({% link soda-cloud/incidents.md %}).
* Use Soda Core to [add datasets]({% link soda-core/configuration.md %}) to your Soda Cloud account.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}