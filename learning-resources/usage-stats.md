---
description: >-
  To understand how users are using Soda Library, the Soda dev team added
  telemetry event tracking to Soda Library. See instructions to opt-out.
---

# Soda Library usage statistics

To understand how users are using Soda Library, and to proactively capture bugs and performance issues, the Soda development team has added telemetry event tracking to Soda Library.

Soda tracks usage statistics using the Open Telemetry Framework. The data Soda tracks is completely anonymous, does not contain any personally identifiying information (PII) in any form, and is purely for internal use.

## Opt out of usage statistics

Soda Library collects usage statistics by default. You can opt-out from sending Soda Library usage statistics at any time by adding the following to your `~/.soda/config.yml` or `.soda/config.yml` file:

```yaml
send_anonymous_usage_stats: false
```

Note, if you use a Soda Agent you deployed in a Kubernetes cluster, you _cannot_ opt out of sending usage statistics.

## Go further

* Learn [How Soda works](how-library-works.md).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
