---
layout: default
title: Manage sensitive data
description: 
parent: Learning resources
---

# Manage sensitive data 
*Last modified on {% last_modified_at %}*

Soda provides several capabilities and configurable settings that help you manage access to sensitive data. What follows are several options that you can implement to guard against unauthorized access to sensitive data that Soda may check for data quality.

[Utilize roles and permissions in Soda Cloud](#utilize-roles-and-permissions-in-soda-cloud)<br />
[Deploy a self-hosted Soda Agent](#deploy-a-self-hosted-soda-agent)<br />
[Limit data sampling](#limit-data-sampling)<br />
[Limit data profiling](#limit-data-profiling)<br />
<br />

## Utilize roles and permissions in Soda Cloud
Soda Cloud employs roles and rights that apply to users of an organization's account. These basic access controls enable you to define who can access, add, change, or delete metadata or access to data in the account.  

Refer to [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}) for much more detail and guidance on how to limit access.


## Deploy a self-hosted Soda Agent
The self-hosted Soda Agent is a containerized Soda Library deployed in a Kubernetes cluster in your cloud services provider environment, such as Azure or AWS. It enables users of Soda Cloud to securely access data sources so it can perform data quality scanning while meeting infrastructure team’s security rules and requirements that  protect credentials and record-level data from exposure.

Consider [deploying a self-hosted agent]({% link soda-agent/deploy.md %}) in your own infrastructure to securely manage access to your data sources. See also: [Soda architecture]({% link soda-cloud/soda-cloud-architecture.md %})

Further, if you use an external secrets manager such as Hashicorp Vault or AWS Secrets Manager, you may wish to [integrate]({% link soda-agent/secrets.md %}#integrate-with-a-secrets-manager) your self-hosted Soda Agent with your secrets manager to securely and effeciently grant Soda access to data sources that use frequently-rotated login credentials.


## Limit data sampling

During the data source onboarding process, you have the option to [configure Soda]({% link soda-cl/sample-datasets.md %}) to collect and store 100 rows of sample data for the datasets in the data source. This is a feature you must implicitly configure; Soda does not collect sample rows of data by default. 

Available to access in Soda Cloud as in the example below, these samples enable users to gain insight into the data's characteristics, facilitating the formulation of data quality rules.

![sample-rows](/assets/images/sample-rows.png){:width="700px"}

### Turn off sample data collection
Where your datasets contain sensitive or private information, you may *not* want to send samples from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}


### Limit sample data collection
If you wish to provide sample rows for some datasets and only wish to limit the ones for which Soda collects samples, you can add a `sample datasets` configuration to your data source. 

Navigate to **your avatar** > **Data Sources** > **New Data Source**, or select an existing data source, to begin. You can add this configuration to one of two places:
* to either step [3. Discover Datasets]({% link soda-agent/deploy.md %}#3-discover-datasets) <br />
OR<br />
*   or step [4. Profile Datasets]({% link soda-agent/deploy.md %}#4-profile-datasets) 

The example configuration below uses a wildcard character (`%`) to specify that collects sample rows for all datasets with names that begin with `region`, and *not* to send samples for any other datasets in the data source.
{% include code-header.html %}
```yaml
sample datasets:
  datasets:
    - include region%
```

The following example excludes a list of datasets from any sampling, and implicitly collects samples for all other datasets in the data source.
{% include code-header.html %}
```yaml
sample datasets:
  datasets:
    - exclude [credit_card, birth_date]
```

* If you configure `sample datasets` to include specific datasets, Soda implicitly *excludes* all other datasets from sampling. 
* If you combine an include config and an exclude config and a dataset fits both patterns, Soda excludes the dataset from sampling.
* For excluded datasets, Soda does not generate, store, or offer visualizations of sample rows anywhere. For those datasets without sample rows, users must use another tool, such as a query builder for a data source, to collect any sample data they require.
* No other functionality within Soda relies on these sample rows; if you exclude a dataset in a sample configuration, you can still configure individual failed row checks which collect independent failed row samples at scan time.


## Limit data profiling

During the data source onboarding process, you have the option to [configure Soda]({% link soda-cl/profile.md %}) to profile the datasets, and/or their columns, when it connects to the data source. 

When it **discovers datasets**, as in the example below, Soda captures only the names of the datasets in the data source, each dataset's schema, and the data type of each column.
![discover-dataset](/assets/images/discover-dataset.png){:width="700px"}

<br />

When it **profiles datasets**, as in the example below, Soda automatically evaluates several data quality metrics for each column of a dataset based on the column's data type, such as missing and distinct values, calculated statistical metrics, and frequently occurring values. The majority of these metrics are aggregated which safeguards against the exposure of record-level data. 

In instances where a column contains categorical data, profiling provides insights into the most extreme and frequent values, which could potentially reveal information about the data. However, as Soda only exposes individual values, end-users cannot link these calculated values to specific records.

![profile-dataset](/assets/images/profile-dataset.png){:width="700px"}


### Limit or turn off dataset discovery
If you wish to limit the profiling that Soda performs on datasets in a data source, or limit the datasets which it discovers, you can do so at the data source level as part of the guided workflow to create or edit a data source. Navigate to **your avatar** > **Data Sources** > **New Data Source**, or select an existing data source, to begin. 

In step 3 of the guided workflow, **Discover**, you have the option of listing the datasets you wish to discover, as in the example below. Refer to [Add dataset discovery]({% link soda-cl/profile.md %}#add-dataset-discovery) for many examples and variations of this configuration.
{% include code-header.html %}
```yaml
discover datasets:
  datasets:
    - include %
    - exclude test%
```


To avoid discovering *any* datasets in your data source, use the following configuration.
{% include code-header.html %}
```yaml
discover datasets:
  datasets:
    - exclude %
```

### Limit or turn off dataset profiling
If you wish to limit the profiling that Soda performs on datasets in a data source, or limit the datasets which it profiles, you can do so at the data source level as part of the guided workflow to create or edit a data source. Navigate to **your avatar** > **Data Sources** > **New Data Source**, or select an existing data source, to begin. 

In step 4 of the guided workflow, **Profile**, you have the option of listing the datasets you wish to profile, as in the example below which excludes columns that begin with `pii` and any columns that contain `email` in their names. Refer to [Add column profiling]({% link soda-cl/profile.md %}#add-column-profiling) for many examples and variations of this configuration.
{% include code-header.html %}
```yaml
profile columns:
  columns:
    - exclude %.pii_%
    - exclude %.%email%
```

To avoid profiling *any* datasets in your data source, use the following configuration.
```yaml
profile columns:
  columns:
    - exclude %.% 
```

Dataset profiling can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. Refer to [Compute consumption and cost considerations]({% link soda-cl/profile.md %}#compute-consumption-and-cost-considerations) for more detail.

## Failed Records
Docs: https://docs.soda.io/soda-cl/failed-rows-checks.html#about-failed-row-samples 

When a Soda scan results in a failed check, Soda will gather the essential diagnostic information to assist the customer in analyzing the root cause of the issue. The diagnostic information is dynamic, varying based on the type of check being executed. However, it typically includes the metric value, metric history, details of the exact failing records where applicable, and optionally, additional information such as detected schema changes in the case of a schema evolution check.

By default, Soda will store and visualize a sample of the failed records, along with the actual SQL queries used to retrieve the full set of failing records from your own system, directly within Soda's platform.

### Manage sensitive data for failed records

There are multiple ways to make sure no sensitive record-level data is being exposed as part of the failing records captured by Soda:

Exclude columns from the failed records

Soda provides a configuration option that facilitates the exclusion of sensitive columns from the collected failing records, ensuring that no sensitive record-level data is exposed to Soda.

Example of failed rows configuration:

In this configuration example, we exclude columns starting with "pii" and any columns containing "email" in their names from the collected failed records.

sampler:
  exclude_columns:
    prod_*: [*email*, pii_*]


Disable collecting failed records as part of the admin organization settings

As a Soda Admin, you have the capability to deactivate the collection of samples and failed rows for check failures in Soda, applicable to scans conducted with both Soda Agent and Soda Library. This feature ensures that no record-level data is collected, stored, or visualized within Soda.

This setting is frequently utilized alongside the rerouting of failed records back into the customer's system. Refer to the section below for more details.

### Reroute failing records back into your own systems

In addition to excluding sensitive columns from collected failing records or disabling this feature entirely, Soda provides customers with the option to redirect failing records back to their system, such as a specific schema in the data warehouse. This ensures that failing records are still gathered and accessible for root cause analysis purposes, while maintaining the confidentiality of record-level data within the customer environment.

To accomplish this, you can define a 'CustomSampler' as part of the data source configuration. This enables you to set up a webhook handler capable of capturing events that reveal failing records triggered during every Soda scan with check failures. You can utilize the webhook handler to push these records back into the customer's system and take advantage of existing access control policies.

For more detailed information, please refer to the following link: https://docs.soda.io/soda-cl/failed-rows-checks.html#reroute-failed-rows-samples 

Here's an example of a `CustomSampler` configuration:

  sampler:
    samples_limit: 10000
    storage:
      type: http
      url: https://webhook.site/1a27e512-53e2-4f06-b648-f4141fb1c763
      message: Kindly use the link below to access the location where the failed records are stored.
      link_text: Amazon S3 Bucket
      link: https://s3.amazonaws.com/soda-failed-records



By implementing this approach, the failed records will not be transmitted, stored, or visualized within Soda's platform. Instead, end-users will receive instructions on accessing the failed records within the customer's own system, empowering them to utilize the data for root cause analysis purposes.

As part of Soda's product roadmap, our team will focus on developing a more user-friendly solution to establish the diagnostics warehouse directly within the customer's warehouse, eliminating the requirement for implementing the necessary webhook logic.


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}