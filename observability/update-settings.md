---
layout: default
title: Update settings
description: Settings for metrics monitoring
parent: Metric Monitors
nav_order: 565
---

# Update settings

You can update the settings of a dataset used in the **Metric Monitored** page. This includes editing dataset attributes, specifying a time partition column for metric calculations and profiling, and choosing whether to collect failed row samples.

## Edit dataset settings

To update dataset settings:

1. Go to the **Datasets** tab.
2. Click the **three-dot menu** next to the dataset you want to update.
3. Select **Edit settings**.

![with-library](/assets/images/dataset-settings.png){:height="350"}

The **Dataset Settings** panel opens with three tabs:

### Attributes

Update the dataset metadata:
- **Dataset label**: The display name of the dataset.
- **Source**: The location of the dataset.
- **Owned by**: The user responsible for the dataset.
- **Tags**: Add searchable tags to organize datasets.
- **Description**: Optionally provide context about the dataset’s purpose or usage.

### Profiling & Metric Monitoring

Set the **Time Partition Column** to enable time-based metric calculations and profiling. This column should contain timestamps without time zones and is typically required for daily-partitioned data.

### Failed Row Samples

Configure how to collect samples of rows that fail checks:
- **Failed rows sample collection**: Choose whether to inherit the organization-wide setting or override it.
- **Collect failed row samples for**: Choose which columns to include in the sample.

Click **Save** to apply your changes.