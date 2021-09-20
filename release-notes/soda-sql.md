---
layout: default
title: Soda SQL Release notes
parent: Release notes
---

# Soda SQL
{% assign notes = site.release-notes | where_exp:"item","item.products contains 'soda-sql'" | sort:"date" | reverse %}
{% for release-note in notes %}
  <h2>[{{ release-note.products | join:', ' }}] {{ release-note.name }}</h2>
  <sup>{{ release-note.date | date_to_long_string }}</sup>
  {{ release-note.content }}
  <hr/>
{% endfor %}