---
layout: default
title: Add check attributes
description: Define and apply check attributes to categorize and organize SodaCL checks in Soda Cloud.
parent: Organize, alert, investigate
---

# Add check attributes
*Last modified on {% last_modified_at %}*

As a Soda Cloud Admin user, you can define **check attributes** that your team can apply to checks when they write them.
{% include code-header.html %}
```yaml
checks for dim_product:
  - missing_count(discount) < 10:
      attributes:
        department: Marketing
        priority: 1
        tags: [event_campaign, webinar]
        pii: true
        created_at: 2022-02-20
```

Use attributes to organize your checks and alert notifications in Soda Cloud.
* Apply attributes to checks to label and sort them by department, priority, location, etc.
* Add a check attribute to identify, for example, checks that execute against personally identifiable information (PII).
* Use the Reporting API to access information about checks according to their attributes.
* Define rules to route alert notifications according to check attributes.


[Prerequisites](#prerequisites)<br />
[Define a check attribute](#define-a-check-attribute)<br />
[Apply an attribute to one or more checks](#apply-an-attribute-to-one-or-more-checks)<br />
[Optional check attribute SodaCL configurations](#optional-check-attribute-sodacl-configurations)<br />
[Go further](#go-further)<br />
<br />


## Prerequisites

* To *define* new check attributes, you must have [Admin permissions]({% link soda-cloud/roles-and-rights.md %}) on your Soda Cloud account. Any Soda Cloud user or Soda Library user can *apply* existing attributes to new or existing checks.

## Define a check attribute

Note that you can only define or edit check attributes as an [Admin]({% link soda-cloud/roles-and-rights.md %}) in Soda Cloud. You cannot define new attributes in Soda Library. Once defined in Soda Cloud, any Soda Cloud or Soda Library user can [apply the attribute](#apply-an-attribute-to-one-or-more-checks) to new or existing checks.

1. In your Soda Cloud account, navigate to **your avatar** > **Attributes** > **New Attribute**. 
2. Follow the guided steps to create the new attribute. Use the details below for insight into the values to enter in the fields in the guided steps. 

| Field or Label  | Guidance |
| -----------------  | ----------- |
| Label | Enter the key for the key:value pair that makes up the attribute. In the example above, the check attribute's key is `department` and the value is `marketing`.<br /> Note that though you enter a value for label that may contain spaces or uppercase characters, users must use the attribute's **NAME** as the key, not the **Label** as Soda Cloud automatically formats the label into SodaCL-friendly syntax. Refer to the screenshot in the [section below](#apply-an-attribute-to-one-or-more-checks).|
| Resource Type |  Select `Check` to define an attribute for a check. |
| Type | Define the type of input a check author may use for the value that pairs with the attribute's key.<br /> &nbsp;&nbsp;&nbsp;&nbsp;- Single select<br /> &nbsp;&nbsp;&nbsp;&nbsp;- Multi select<br /> &nbsp;&nbsp;&nbsp;&nbsp;- Checkbox<br /> &nbsp;&nbsp;&nbsp;&nbsp;- Text<br /> &nbsp;&nbsp;&nbsp;&nbsp;- Number<br /> &nbsp;&nbsp;&nbsp;&nbsp;- Date |
| Allowed Values | Applies only to Single select and Multi select. Provide a list of values that a check author may use when applying the attribute key:value pair to a check. |
| Description | (Optional) Provide details about the check attribute to offer guidance for your fellow Soda users. |


### Adjust attributes

* Once created, you *cannot* change the type of your attribute. For example, you cannot change a checkbox attribute into a multi-select attribute.
* Once created, you can change the display name of an attribute.
* For a single- or multi-select attribute, you can remove, change, or add values to the list of available selections. However, if you remove or change values on such a list, you cannot use a previous value to route alert notifications. 


## Apply an attribute to one or more checks

While only a Soda Cloud Admin can define or revise check attributes, any Author user can apply attributes to new or existing checks when:
* writing or editing checks in an agreement in Soda Cloud
* creating or editing no-code checks in Soda Cloud
* writing or editing checks in a checks YAML file for Soda Library

Apply attributes to checks using key:value pairs, as in the following example which applies five Soda Cloud-created attributes to a new `row_count` check. 
{% include code-header.html %}
```yaml
checks for dim_product:
  - row_count = 10:
      attributes:
        department: Marketing
        priority: 1
        tags: [event_campaign, webinar]
        pii: true
        best_before: 2022-02-20
```

Optionally, you can add attributes to *all* the checks in a single `checks for dataset_name` block. Using the following example configuration, Soda applies the check attributes to the `duplicate_count`, `missing_percent` and `anomaly_score` checks.

```yaml
checks for dim_customer:
  - attributes:
      department: Marketing
      priority: 1
  - duplicate_count(last_name) < 10
  - missing_percent(phone) = 0
  - anomaly_score for row_count < default
```

During a scan, Soda validates the attribute's input – **NAME** (the key in the key:value pair), **Type**, **Allowed Values** – to ensure that the key:value pairs match the expected input. If the input is unexpected, Soda evaluates no checks, and the scan results in an error. For example, if your attribute's type is Number and the check author enters a value of `one` instead of `1`, the scan produces an error to indicate the incorrect attribute value.

The following table outlines the expected values for each type of attribute.

|Attribute type (key)| Attribute value |
|--------------------| --------------- |
| Single select | Any value that exactly matches the **Allowed Values** for the attribute as defined by the Soda Admin who created the attribute. Values are case sensitive.<br /> Refer to example above in which the `department` attribute is a Single select attribute.|
| Multi select | Any value(s) that exactly matches the **Allowed Values** for the attribute as defined by the Soda Admin who created the attribute. Values are case sensitive. <br />You must wrap input in square brackets, which indicates a list, when adding Multi select attribute key:value pair to a check. <br />Refer to example above in which the `tags` attribute is a Multi select attribute. |
| Checkbox | `true` or `false` |
| Text | string |
| Number | integer or float |
| Date | ISO-formatted date or datetime. |


Note that users must use the attribute's **NAME** as the attribute's key in a check, not the **LABEL** as defined by a Soda Admin in Soda Cloud. Refer to screenshot below. 

![name-not-label](/assets/images/name-not-label.png){:height="200px" width="200px"}

## Optional check attribute SodaCL configurations

Using SodaCL, you can use variables to populate either the key or value of an existing attribute, as in the following example. Refer to [Configure variables in SodaCL]({% link soda-cl/filters.md %}#configure-variables-in-sodacl) for further details.

You cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.  
{% include code-header.html %}
```yaml
checks for dim_product:
  - row_count = 10:
      attributes:
        department: ${DEPT}
        ${DEPT}_owner: Mohammed Patel
```

You can use attributes in checks that Soda executes as part of a for each configuration, as in the following example. Refer to [Optional check configuration]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) for further details on for each.
{% include code-header.html %}
```yaml
for each dataset T:
 datasets:
   - dim_customers
 checks:
   - row_count > 0:
        attributes:
          department: [Marketing]
          priority: 2
```


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Add [attributes to datasets]({% link soda-cloud/organize-datasets.md %}) to get organized in Soda Cloud.
* Add [Optional check configurations]({% link soda-cl/optional-config.md %}).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
