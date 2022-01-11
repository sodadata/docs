---
layout: default
title: Release notes for Soda Cloud
description: Review release notes for Soda Cloud, a web app that enables you visualize data quality test results and set alerts and notifications.
parent: Release notes
redirect_from:
  - /soda-cloud/time-partitioning.html
  - /soda-cloud/add-datasets.html
  - /soda-cloud/dataset-scan-schedule.html
  - /soda-cloud/edit-data-source.html
---

# Release notes for Soda Cloud

{% assign notes = site.release-notes | where_exp:"item","item.products contains 'soda-cloud'" | sort:"date" | reverse %}
{% for release-note in notes %}
  <h2>[{{ release-note.products | join:', ' }}] {{ release-note.name }}</h2>
  <sup>{{ release-note.date | date_to_long_string }}</sup>
  {{ release-note.content }}
  <hr/>
{% endfor %}

*Last modified on {% last_modified_at %}*