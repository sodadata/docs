---
layout: default
title: Release notes for Soda Cloud Reporting API
description: Review release notes for Soda Cloud Reporting API.
parent: Release notes
---

# Release notes for Soda Cloud's Reporting API



{% assign notes = site.release-notes | where_exp:"item","item.products contains 'reporting-api'" | sort:"date" | reverse %}
{% for release-note in notes %}
  <h2>[{{ release-note.products | join:', ' }}] {{ release-note.name }}</h2>
  <sup>{{ release-note.date | date_to_long_string }}</sup>
  {{ release-note.content }}
  <hr/>
{% endfor %}

*Last modified on {% last_modified_at %}
