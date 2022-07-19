---
layout: default
title: Release notes for Soda Agent 
description: Review release notes for Soda Agent, a Helm chart for deployment on EKS clusters.
parent: Release notes
---

# Release notes for Soda Agent ![preview](/assets/images/preview.png){:height="70px" width="70px" align="top"}



{% assign notes = site.release-notes | where_exp:"item","item.products contains 'soda-agent'" | sort:"date" | reverse %}
{% for release-note in notes %}
  <h2>[{{ release-note.products | join:', ' }}] {{ release-note.name }}</h2>
  <sup>{{ release-note.date | date_to_long_string }}</sup>
  {{ release-note.content }}
  <hr/>
{% endfor %}

*Last modified on {% last_modified_at %}*