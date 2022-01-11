---
layout: default
title: Release notes 
description: Review release notes for all Soda data observability products.
parent: Release notes
---

# Release notes for Soda products

{% assign notes = site.release-notes | sort:"date" | reverse %}
{% for release-note in notes %}
  <h2>[{{ release-note.products | join:', ' }}] {{ release-note.name }}</h2>
  <sup>{{ release-note.date | date_to_long_string }}</sup>
  {{ release-note.content }}
  <hr/>
{% endfor %}

*Last modified on {% last_modified_at %}*