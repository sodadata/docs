---
layout: default
title: Release notes for Soda Core
description: Review release notes for Soda Core, an open-source tool for testing and monitoring data quality.
sidebar: core
parent: Soda Core 
---

# Release notes for Soda Core 




{% assign notes = site.release-notes | where_exp:"item","item.products contains 'soda-core'" | sort:"date" | reverse %}
{% for release-note in notes %}
  <h2>[{{ release-note.products | join:', ' }}] {{ release-note.name }}</h2>
  <sup>{{ release-note.date | date_to_long_string }}</sup>
  {{ release-note.content }}
  <hr/>
{% endfor %}

*Last modified on {% last_modified_at %}*