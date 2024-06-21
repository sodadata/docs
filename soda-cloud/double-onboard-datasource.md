---
layout: default
title: Double-onboard a data source
description: Learn how to double-onboard a data source to leverage all the features supported by Soda Agents.
parent: Use case guides
---

# Double-onboard a data source 
*Last modified on {% last_modified_at %}*

To scan your data for quality, Soda must connect to a data source using connection configurations (host, port, login credentials, etc.) that you either define in Soda Cloud during onboarding using a Soda Agent, or in a configuration YAML file you reference during programmatic or CLI scans using Soda Library. Soda recognizes each data source you onboard as an independent resource in Soda Cloud, where it displays all scan results and failed row samples for all data sources regardless of onboarding method. 

However, data sources you connect via a Soda agent using the guided workflow in Soda Cloud support several features which data sources you connect via Soda Library do not, including: 
* [no-code checks]({% link soda-cl/soda-cl-overview.md %}#define-sodacl-checks)
* [Discussions]({% link soda/quick-start-end-user.md %}#begin-a-discussion-and-propose-checks)
* [scan scheduling]({% link soda-library/run-a-scan.md %}#scan-for-data-quality)
* [anomaly dashboards]({% link soda-cloud/anomaly-dashboard.md %}) ![preview](/assets/images/preview.png){:height="55px" width="55px"}

If you have onboarded a data source via Soda Library but you wish to take advantage of the features available to Soda Agent-onboarded data sources, you can double-onboard an existing data source.

See also: [Soda overview]({% link soda/product-overview.md %})<br />
See also: [Choose a flavor of Soda]({% link soda/setup-guide.md %})<br />
See also: [Add a new data source]({% link soda-agent/managed-agent.md %}) in Soda Cloud

## Prerequisites
* You [installed Soda Library]({% link soda-library/install.md %}), you have configured it to connect to your data source, and you have run at least one [scan]({% link soda-library/run-a-scan.md %}#scan-for-data-quality) programmatically or via the Soda Library CLI.
* You have deployed a [self-hosted Soda Agent]({% link soda-agent/deploy.md %}) helm chart in a Kubernetes cluster in your cloud services environment<br/>
OR<br/>
Someone with Soda Admin privileges in your organization's Soda Cloud account has navigated to **your avatar** > **Organization Settings** check the box to **Enable Soda-hosted Agent**; see [Set up a Soda-hosted agent]({% link soda-agent/managed-agent.md %}).
* You have access to the connection configurations (host, port, login credentials, etc.) for your data source.
* Your data source is compatible with a Soda Agent; refer to tables below.

#### Self-hosted agent
{% include compatible-cloud-datasources.md %}

#### Soda-hosted agent
{% include compatible-soda-hosted.md %}

<br />

## Onboard an existing data source

1. Log in to Soda Cloud, then navigate to **your avatar** > **Data Sources**.
2. From the list of data sources connected to your Soda Cloud account, click to select and open the one you onboarded via Soda Library and now wish to double-onboard via a Soda Agent.
3. Follow the guided workflow to onboard the existing data source via a Soda Agent, starting by using the dropdown to select the **Default Scan Agent** you wish to use to connect to the data source.
4. Complete the [guided steps]({% link soda-agent/managed-agent.md %}#add-a-new-data-source) to:
* define a schedule for your default scan definition
* provide connection configuration details for the data source such as name, schema, and login credentials, and test the connection to the data source
* profile the datasets in the data source to gather basic metadata about the contents of each
* identify the datasets to which you wish to apply automated monitoring for anomalies and schema changes
* assign ownership roles for the data source and its datasets
5. **Save** your changes, then navigate to the **Datasets** page and select a dataset in the data source you just double-onboarded.
6. (Optional) If you wish, and if you have <a href="https://go.soda.io/join-observability-preview" target="_blank">requested preview access</a> for the feature, you can follow the instructions to [activate the anomaly dashboard]({% link soda-cloud/anomaly-dashboard.md %}) for the dataset.
7. (Optional) Click **Add Check** and begin adding [no-code checks]({% link soda-cl/soda-cl-overview.md %}#define-sodacl-checks) to the dataset.

***Known issue***: <!--CLOUD-7929--> Double-onboarding a data source renders Soda Library API keys invalid. After double-onboarding a data source, if you run a programmatic or CLI scan of that data source using Soda Library, an error appears to indicate that the API keys are invalid. As a workaround, [generate new API keys]({% link soda-cloud/api-keys.md %}) in Soda Cloud, then, in your configuration YAML, replace the old API key values with the newly-generated ones.


## Go further

* Learn more about [automating anomaly detection]({% link soda-cloud/anomaly-dashboard.md %}) for observability.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}