---
layout: default
title: Manage sensitive data
description: Learn how to mitigate the exposure of sensitive information in Soda Cloud. 
parent: Use case guides
---

# Manage sensitive data 
*Last modified on {% last_modified_at %}*

Soda provides several capabilities and configurable settings that help you manage access to sensitive data. What follows are several options that you can implement to guard against unauthorized access to sensitive data that Soda may check for data quality.

[Utilize roles and permissions in Soda Cloud](#utilize-roles-and-permissions-in-soda-cloud)<br />
[Deploy a self-hosted Soda Agent](#deploy-a-self-hosted-soda-agent)<br />
[Limit data sampling](#limit-data-sampling)<br />
[Limit data profiling](#limit-data-profiling)<br />
[Limit failed row sampling](#limit-failed-row-sampling)<br />
[Go further](#go-further)<br />
<br />

## Utilize roles and permissions in Soda Cloud
Soda Cloud employs roles and permissions that apply to users of an organization's account. These access controls enable you to define who can access, add, change, or delete metadata or access to data in the account.  

Refer to [Manage roles and permissions in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}) for much more detail and guidance on how to manage and limit access.


## Deploy a self-hosted Soda Agent
Soda's self-hosted agent is a containerized Soda Library deployed in a Kubernetes cluster in your cloud services provider environment, such as Azure or AWS. It enables users of Soda Cloud to securely access your data sources so it can perform data quality scanning while meeting your infrastructure team’s security rules and requirements that protect credentials and record-level data from exposure.

Consider [deploying a self-hosted agent]({% link soda-agent/deploy.md %}) in your own infrastructure to securely manage access to your data sources. See also: [Soda architecture]({% link soda-cloud/soda-cloud-architecture.md %})

Further, if you use an external secrets manager such as Hashicorp Vault or AWS Secrets Manager, you may wish to [integrate]({% link soda-agent/secrets.md %}#integrate-with-a-secrets-manager) your self-hosted Soda Agent with your secrets manager to securely and efficiently grant Soda access to data sources that use frequently-rotated login credentials.


## Limit data sampling

During the data source onboarding process, you have the option to [configure Soda]({% link soda-cl/sample-datasets.md %}) to collect and store 100 rows of sample data for the datasets in the data source. This is a feature you must implicitly configure; Soda does not collect sample rows of data by default. 

These samples, accessible in Soda Cloud as in the example below, enable users to gain insight into the data's characteristics, facilitating the formulation of data quality rules.

![sample-rows](/assets/images/sample-rows.png){:width="700px"}

### Turn off sample data collection
Where your datasets contain sensitive or private information, you may not want to collect, send, store, or visualize *any* samples from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}


### Limit sample data collection
If you wish to provide sample rows for some datasets and only wish to limit the ones for which Soda collects samples, you can add a `sample datasets` configuration to your data source. 

Navigate to **your avatar** > **Data Sources** > **New Data Source**, or select an existing data source, to begin. You can add this configuration to one of two places:
* to either step [3. Discover]({% link soda-agent/deploy.md %}#3-discover) <br />
OR<br />
*   or step [4. Profile]({% link soda-agent/deploy.md %}#4-profile) 

The example configuration below uses a wildcard character (`%`) to specify that Soda collects sample rows for all datasets with names that begin with `region`, and *not* to send samples for any other datasets in the data source.
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

<br />

* If you configure `sample datasets` to include specific datasets, Soda implicitly *excludes* all other datasets from sampling. 
* If you combine an include config and an exclude config and a dataset fits both patterns, Soda excludes the dataset from sampling.
* For excluded datasets, Soda does not generate, store, or offer visualizations of sample rows anywhere. For those datasets without sample rows, users must use another tool, such as a query builder for a data source, to collect any sample data they require.
* No other functionality within Soda relies on these sample rows; if you exclude a dataset in a sample configuration, you can still configure individual failed row checks which collect independent failed row samples at scan time. Learn more about [managing failed row samples]({% link soda-cl/failed-row-samples.md %}).


## Limit data profiling

During the data source onboarding process, you have the option to [configure Soda]({% link soda-cl/profile.md %}) to profile the datasets, and/or their columns, when it connects to the data source. 

When it **discovers datasets**, as in the example below, Soda captures only the names of the datasets in the data source, each dataset's schema, and the data type of each column.
![discover-dataset](/assets/images/discover-dataset.png){:width="700px"}

<br />

When it **profiles datasets**, as in the example below, Soda automatically evaluates several data quality metrics for each column of a dataset based on the column's data type, such as missing and distinct values, calculated statistical metrics, and frequently occurring values. The majority of these metrics are aggregated which safeguards against the exposure of record-level data. 

In instances where a column contains categorical data, profiling provides insights into the most extreme and frequent values, which could potentially reveal information about the data. However, as Soda only exposes individual metric values, end-users cannot link these calculated metrics to specific records.

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
{% include code-header.html %}
```yaml
profile columns:
  columns:
    - exclude %.% 
```

Dataset profiling can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. Refer to [Compute consumption and cost considerations]({% link soda-cl/profile.md %}#compute-consumption-and-cost-considerations) for more detail.

## Limit failed row sampling 

When a scan results in a failed check, the CLI output displays information about the check that failed and why, including the [actual SQL queries]({% link soda-cl/failed-row-samples.md %}#about-failed-row-sampling-queries) that retrieve failed row samples. To offer more insight into the data that failed a check, Soda Cloud displays failed row samples in a check result’s measurement history, as in the example below.

There are two ways Soda collects and sends failed row samples to your Soda Cloud account:

1. Implicitly: For [reference checks]({% link soda-cl/reference.md %}), [duplicate_count or duplicate_percent metrics]({% link soda-cl/numeric-metrics.md %}#failed-row-samples), [missing metrics]({% link soda-cl/missing-metrics.md %}#failed-row-samples), and [validity metrics]({% link soda-cl/validity-metrics.md %}#failed-row-samples), Soda automatically sends 100 failed row samples to your Soda Cloud account.
2. Explicitly: When you define a [failed rows check]({% link soda-cl/failed-rows-checks.md %}) or a [reconciliation check]({% link soda-cl/recon.md %}) which borrows from the failed rows check syntax, you explicitly ask Soda to send failed row samples to Soda Cloud.

![failed-rows](/assets/images/failed-rows.png){:width="700px"}

### Turn off failed row sampling

Where your datasets contain sensitive or private information, you may not want to collect, send, store, or visualize *any* samples from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud. 

{% include disable-all-samples.md %} 

Users frequently disable failed row sampling in Soda Cloud and, instead, reroute failed row samples to an internal database; see [Reroute failed row samples](#reroute-failed-row-samples).

### Customize failed row sampling 

For checks which implicitly or explicitly collect failed rows samples, you can add a configuration to prevent Soda from collecting those samples from specific columns or datasets that contain sensitive data. For example, you may wish to exclude a column that contains personal identifiable information (PII) such as credit card numbers from the Soda query that collects samples.

Refer to [manage failed row samples]({% link soda-cl/failed-row-samples.md %}#determine-which-sampling-method-to-use) for instructions on how to custonize the way Soda collects and displays samples.

### Reroute failed row samples

{% include reroute-failed-rows.md %}

Learn how to define custom samplers in [Manage failed rows samples]({% link soda-cl/failed-row-samples.md %}#reroute-failed-row-samples).

<br />

## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn more about how to [manage failed row samples]({% link soda-cl/failed-row-samples.md %}).
* Run scans locally to prevent Soda Library from pushing results to Soda Cloud. Access the **Prevent pushing scan results to Soda Cloud** in the [Run a scan]({% link soda-library/run-a-scan.md %}#scan-for-data-quality) tab.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
