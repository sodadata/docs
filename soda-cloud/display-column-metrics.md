---
layout: default
title: Display column metrics
description: Instruct Soda SQL to send column metrics for your dataset to Soda Cloud. Column metrics give you at-a-glance information about the data in your dataset.
parent: Soda Cloud
---

# Display column metrics

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda Cloud with Soda Core (Beta)</label>
  <label class="tab" id="two-tab" for="two">Soda Cloud with Soda SQL</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

Column profile information is unavailable for datasets added to Soda Cloud via Soda Core (Beta).

Soon, you will be able to configure Soda Core to automatically send column profile information to your Soda Cloud account. 

[Soda Core documentation]({% link soda-core/overview-main.md %})<br />

  </div>
  <div class="panel" id="two-panel" markdown="1">

{% include banner-sql.md %}

Using the information Soda SQL discovered about your [datasets]({% link soda/glossary.md %}#dataset), you can optionally instruct it to capture and send **column metrics** to Soda Cloud for individual datasets during the next [scan]({% link soda-sql/scan.md %}). Enabling column metrics gives you at-a-glance information about your datasets in the **Datasets** dashboard and in the dataset's **Column** tab, as in the images below. 

Datasets dashboard
![display-column-metrics](/assets/images/display-column-metrics.png){:height="650px" width="650px"}

A dataset's **Columns** tab
![column-tab](/assets/images/column-tab.png){:height="650px" width="650px"}


1. If you are the [Admin]({% link soda-cloud/roles-and-rights.md %}) of the organization, or have a Manager or Editor role for the dataset, navigate to the **Datasets** dashboard, then open the dataset for which you want to enable column metrics.
2. Click the gear icon on the right in the table header row in the **Columns** tab.
3. When prompted, check the box to **Enable Column Metrics**, then save. 

During the next scan of your dataset, Soda SQL captures and sends column metrics for each dataset to Soda Cloud where you can access the information in the **Dataset** dashboard and in the dataset's **Column** tab. Use the column metrics to help you make informed choices when you [create a new monitor]({% link soda-cloud/monitors.md %}).

  </div>
  </div>
</div>


## Go further

* [Organize your datasets]({% link soda-cloud/organize-datasets.md %}) in Soda Cloud to facilitate your search for the right data.
* [Create monitors and alerts]({% link soda-cloud/monitors.md %}) in Soda Cloud.
* Learn how to display [sample data]({% link soda-cloud/display-samples.md %}) for individual datasets.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}