---
layout: default
title: Organize datasets in Soda Cloud
description: 
parent: Soda Cloud
---

# Organize datasets in Soda Cloud

With dozens, or even hundreds of datasets in your Soda Cloud account, it may be laborious to try to find the data quality information you're looking for. To facilitate your search for specific data quality status, consider defining **custom attributes** and **tags** for datasets and using filters to narrow your search.


## Get organized

1. Start by creating attributes for datasets that are relevant to your organization. If you are an [Admin member]({% link soda-cloud/roles-and-rights.md %}) of your Soda Cloud account, navigate to **your avatar** > **Organization Settings** > **Custom Attributes**.
2. Create new attributes that your colleagues can apply to datasets to categorize them for easy identification and discovery. What follows are a few examples for how to define attributes; consider adding multiple attributes to access precise cross-sections of data quality.
* by organizational department: Product Marketing, Engineering-FE, Finance-AP, Customer Success
* by product
* by data domain: Customer data, Product data, Order & Fulfillment data
* by access-level or sensitivity: Admin, Executive, Director, Employee
* by internal objectives and key results (OKR)
* 
3. As an Admin, Manager, or Editor in your Soda Cloud account, navigate to the **Datasets** dashboard, click the stacked dots next to a dataset, then select **Edit Dataset**. Use the custom attributes fields to apply the appropriate custom attributes to the dataset. 
4. While editing a dataset, consider adding **Tags** to the dataset as well. Use tags to:
* identify datasets that are associated with a particular marketing campaign
* identify datasets that are relevant for a particular customer account
* identify datasets whose quality is critical to business operations, or to categorize datasets according to their criticality in general, such as "high", "medium", and "low".
* identify datasets that populate a particular report or dashboard 
5. After saving your changes and applying tags and attributes to multiple datasets, use the **Filters** in the **Datasets** dashboard to display the datasets that help narrow your study of data quality. 


## Go further

* Create [alerts]({% link soda-cloud/monitors.md %}) to notify your team of data quality issues.
* Learn how to create and track data quality [Incidents]({% link soda-cloud/incidents.md %}).
* Use Soda SQL or Soda Spark to [add datasets]({% link soda-sql/configure.md %}) to your Soda Cloud account.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}