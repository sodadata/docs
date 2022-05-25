---
layout: default
title: Missing metrics
description: Use missing metrics in SodaCL checks to detect missing values in dataset.
parent: Soda CL (Beta)
---

# Missing metrics ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

```yaml
checks for dim_customer
  - missing_count(birth_date) = 0
  - missing_percent(gender) < 5%
    - missing_count(middle_name) = 0:
      missing regex: ^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$
  - missing_count(middle_name) < 5:
      missing values: [n/a, NA, none]
```

[Configure checks with missing metrics](#configure-checks-with-missing-metrics) <br />
[Optional configurations](#optional-configurations)<br />
[List of numeric metrics](#list-of-numeric-metrics)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Fixed and dynamic thresholds](#fixed-and-dynamic-thresholds)<br />
[Go further](#go-further)<br />
<br />


## Configure checks with missing metrics

## Optional configurations

## List of missing metrics

## List of comparison symbols and phrases

## Fixed and relative thresholds

## Go further

* Use missing metrics in checks with alert configurations to establish [warn and fail zones]({% link soda-cl/optional-config.md %}#define-zones-using-alert-configurations)
* Use missing metrics in checks to define ranges of acceptable thresholds using [boundary thresholds]({% link soda-cl/metrics-and-checks.md %}#define-boundaries-with-fixed-thresholds).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}