---
layout: default
title: Organize datasets
description: Use attributes, tags, and filters to facilitate your search for the specific data quality status of your datasets.
parent: Organize, alert, investigate
---

# Organize datasets 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

With dozens, or even hundreds of datasets in your Soda Cloud account, it may be laborious to try to find the data quality information you're looking for. To facilitate your search for specific data quality status, consider defining your own **Attributes** and **Tags** for datasets, then use filters to narrow your search.


## Define dataset attributes

Define new attributes for datasets in your organization that your colleagues can use to categorize datasets for easy identification and discovery. Consider adding multiple attributes to access precise cross-sections of data quality.
* by organizational department: Product Marketing, Engineering-FE, Finance-AP, Customer Success
* by product
* by data domain: Customer data, Product data, Order & Fulfillment data
* by internal objectives and key results (OKR)

<br />

1. As an [Admin]({% link soda-cloud/roles-and-rights.md %}) of your Soda Cloud account, navigate to **your avatar** > **Attributes** > **New Attribute**.
2. Follow the guided steps to create the new attribute. Use the details below for insight into the values to enter in the fields in the guided steps. 

| Field or Label  | Guidance |
| -----------------  | ----------- |
| Label | Enter the key for the key:value pair that makes up the attribute. For example, if you define a dataset attribute's key  `department`, its value could be `marketing` or `finance`.  |
| Resource Type |  Select `Dataset` to define an attribute for a dataset. |
| Type | Define the type of input a dataset owner may use for the value that pairs with the attribute's key:<br /> Single select<br /> Multi select<br /> Checkbox<br /> Text<br /> Number<br /> Date<br /> Note that during a scan, Soda validates that the type of input for an attribute's value matches the expected type. For example, if your attribute's type is Number and the dataset owner enters a value of `one` instead of `1`, the scan produces an error to indicate the incorrect attribute value. |
| Allowed Values | Applies only to Single select and Multi select. Provide a list of values that a check author may use when applying the attribute key:value pair to a check. |
| Description | (Optional) Provide details about the check attribute to offer guidance for your fellow Soda users. |

### Adjust attributes

* Once created, you *cannot* change the type of your attribute. For example, you cannot change a checkbox attribute into a multi-select attribute.
* Once created, you can change the display name of an attribute.
* For a single- or multi-select attribute, you can remove, change, or add values to the list of available selections. However, if you remove or change values on such a list, you cannot search for the deleted or previous value in the dataset filter. 

## Apply an attribute to a dataset

While only a Soda Cloud Admin can define or revise dataset attributes, any Admin, Manager, or Editor for a dataset can apply attributes to it.

1. Navigate to the **Datasets** dashboard, click the stacked dots next to a dataset, then select **Edit Dataset**. Use the attributes fields to apply the appropriate attributes to the dataset. 
2. While editing a dataset, consider adding **Tags** to the dataset as well. Use tags to:
* identify datasets that are associated with a particular marketing campaign
* identify datasets that are relevant for a particular customer account
* identify datasets whose quality is critical to business operations, or to categorize datasets according to their criticality in general, such as "high", "medium", and "low".
* identify datasets that populate a particular report or dashboard 
3. After saving your changes and applying tags and attributes to multiple datasets, use the **Filters** in the **Datasets** dashboard to display the datasets that help narrow your study of data quality, then click **Save Collection** to name the custom filtered view.
4. In the future, use the dropdown in the **Checks** dashboard to quickly access your collection again.


## Go further

* Create [alerts]({% link soda-cloud/notif-rules.md %}) to notify your team of data quality issues.
* Learn how to create and track data quality [Incidents]({% link soda-cloud/incidents.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}