---
layout: default
title: Adjust sensitivity
description: Adjust sensitivity
parent: Metric Monitors
nav_order: 560
---

# Adjust sensitivity

Use the sensitivity slider to control how strictly the algorithm detects anomalies. Higher sensitivity widens the expected range, making the algorithm less likely to flag anomalies. Lower sensitivity narrows the range, making it more likely to flag small variations as anomalies.

![with-library](/assets/images/sensitivity-slider.png){:height="350" width="350"}

By default, the sensitivity is set to 3, meaning values are considered anomalous if they fall outside three standard deviations from the predicted value. The lower and upper bounds of the expected range are calculated as:

```python
lower = point_forecast - z * sigma
upper = point_forecast + z * sigma
```

Click **Apply sensitivity** to update the setting for future scans. This does not affect past results.

## What's Next?

- [Explore how to define exclusion value rules]({% link observability/define-exclusion-values.md %})