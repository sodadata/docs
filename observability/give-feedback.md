---
layout: default
title: Give feedback to improve detection
description: Give feedback to improve detection 
parent: Metric Monitors
nav_order: 562
---

# Give feedback to improve detection

Review and correct anomaly results by flagging individual measurements as either expected or anomaly. This feedback helps the model treat similar future values more intelligently.

![with-library](/assets/images/flag-measurements.png){:height="350" width="350"}

Use this to:

- Mark a detected anomaly as a false positive by clicking Flag as expected
- Confirm an anomaly is a true positive by clicking Flag as anomaly
- Mark a measurement as a false negative by clicking Flag as anomaly
- Confirm a measurement is a true negative by clicking Flag as expected

You can also link the measurement to an existing incident or create a new one. This helps track related anomalies and streamline investigations. To learn how to create and manage incidents check out the [Manage incidents guide]({% link observability/manage-incidents.md %})

## What's Next?

- [Explore how to manage incidents for a streamlined resolution.]({% link observability/manage-incidents.md %})