---
layout: default
title: Add check attributes
description: Define and apply check attributes to categorize and organize SodaCL checks in Soda Cloud.
parent: SodaCL
---

# Add check attributes
*Last modified on {% last_modified_at %}*

As a Soda Cloud Admin user, you can define **check attributes** that your team can apply to checks when they write them in an agreement or in a checks YAML file for Soda Core.

```yaml
checks for dim_product:
  - missing_count(discount) < 10:
      attributes:
        department: marketing
```

Use attributes to organize your checks and alert notifications in Soda Cloud.
* Apply attributes to checks to label and sort them by department, priority, location, etc.
* Add a check attribute to define, for example, whether a check executes against personally identifiable information (PII).
* Use the [Soda Cloud Reporting API]({% link api-docs/reporting-api-v1.md %}) to access information about checks according to their attributes.
<!--* Use attributes to filter results on the Check Results dashboard.-->
* Define rules to route alert notifications according to check attributes.


[Prerequisites](#prerequisites)<br />
[Define a check attribute](#define-a-check-attribute)<br />
[Apply an attribute to a check](#apply-an-attribute-to-a-check)<br />
[Optional check attribute SodaCL configurations](#optional-check-attribute-sodacl-configurations)<br />
[Go further](#go-further)<br />
<br />


## Prerequisites

* You have created a <a href="https://cloud.soda.io/signup" target="_blank">Soda Cloud account</a>.
* To *define* new check attributes, you must have [Admin rights]({% link soda-cloud/roles-and-rights.md %}) on your Soda Cloud account. Any Soda Cloud user or Soda Core user can *apply* existing attributes to new or existing checks.

## Define a check attribute

Note that you can only define or edit check attributes as an [Admin]({% link soda-cloud/roles-and-rights.md %}) in Soda Cloud. You cannot define new attributes in Soda Core. Once defined in Soda Cloud, any Soda Cloud or Soda Core user can [apply the attribute](#apply-an-attribute-to-a-check) to new or existing checks.

1. In your Soda Cloud account, navigate to **your avatar** > **Attributes** > **New Attribute**. 
2. Follow the guided steps to create the new attribute. Use the details below for insight into the values to enter in the fields in the guided steps. 

| Field or Label  | Guidance |
| -----------------  | ----------- |
| Label | Enter the key for the key:value pair that makes up the attribute. In the example above, the check attribute's key is `department` and the value is `marketing`.<br /> Note that though you enter a value for label that may contain spaces or uppercase characters, users must use the attribute's **NAME** as the key, not the **Label** as Soda Cloud automatically formats the label into SodaCL-friendly syntax. Refer to the screenshot in the [section below](#apply-an-attribute-to-a-check).|
| Resource Type |  Select `Check` to define an attribute for a check. |
| Type | Define the type of input a check author may use for the value that pairs with the attribute's key:<br /> Single select<br /> Multi select<br /> Checkbox<br /> Text<br /> Number<br /> Date |
| Allowed Values | Applies only to Single select and Multi select. Provide a list of values that a check author may use when applying the attribute key:value pair to a check. |
| Description | (Optional) Provide details about the check attribute to offer guidance for your fellow Soda users. |


### Adjust attributes

* Once created, you *cannot* change the type of your attribute. For example, you cannot change a checkbox attribute into a multi-select attribute.
* Once created, you can change the display name of an attribute.
* For a single- or multi-select attribute, you can remove, change, or add values to the list of available selections. However, if you remove or change values on such a list, you cannot use a previous value to route alert notifications. 


## Apply an attribute to a check

While only a Soda Cloud Admin can define or revise check attributes, any Author user can apply attributes to new or existing checks when:
* writing or editing checks in an agreement in Soda Cloud, <br />
OR <br />
* writing or editing checks in a checks YAML file for Soda Core.

Apply attributes to checks using key-value pairs, as in the following example which applies five Soda Cloud-created attributes to a new `row_count` check. 

```yaml
checks for dim_product:
  - row_count = 10:
      attributes:
        department: marketing
        priority: 1
        tags: [a, b, c]
        pii: true
        best_before: 2022-02-20
```


### Notes for applying attributes to checks

* During a scan, Soda validates the attribute's input – **NAME**, **Type**, **Allowed Values** – to ensure that the key:value pairs match the expected input. If the input is unexpected, Soda evaluates no checks, and the scan results in an error. For example, if your attribute's type is Number and the check author enters a value of `one` instead of `1`, the scan produces an error to indicate the incorrect attribute value.

* Note that users must use the attribute's **NAME** as the key, not the **Label** as defined by a Soda Admin in Soda Cloud. Refer to screenshot below. <br />
![name-not-label](/assets/images/name-not-label.png){:height="200px" width="200px"}

## Optional check attribute SodaCL configurations

Using SodaCL, you can use variables to populate either the key or value of an existing attribute, as in the following example. Refer to [Configure variables in SodaCL]({% link soda-cl/filters.md %}#configure-variables-in-sodacl) for further details. 

```yaml
attributes:
  department: ${DEPT}
  ${DEPT}_owner: Mohammed Patel
```

You can use attributes in checks that Soda executes as part of a for each configuration, as in the following example. Refer to [Optional check configuration]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) for further details on for each.

```yaml
for each dataset T:
 datasets:
   - dim_customers
 checks:
   - row_count > 0:
        attributes:
          department: marketing
          priority: 2
```


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Add [attributes to datasets]({% link soda-cloud/organize-datasets.md %}) to get organized in Soda Cloud.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
