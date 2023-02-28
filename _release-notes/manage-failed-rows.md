---
name: "Disable or reroute failed row samples"
date: 2022-12-15
products:
  - soda-cloud
---

Use these new ways of managing exposure to sensitive data such as personally identifiable information (PII), when collecting failed row samples.
* Disable failed rows samples for [specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns) to effectively “turn off” failed row collection for specific columns in datasets.
* Reroute any failed rows samples that Soda collects to a secure, internal location rather than Soda Cloud. To do so, add the storage configuration to your [sampler configuration]({% link soda-cl/failed-rows-checks.md %}#reroute-failed-rows-samples) to specify the columns you wish to exclude.