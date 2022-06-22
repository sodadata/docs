---
layout: default
title: Release notes for Soda SQL
description: Review release notes for Soda SQL, an open-source tool for testing and monitoring data quality.
sidebar: sql
parent: Soda SQL
---

# Release notes for Soda SQL

{% include banner-sql.md %}

{% assign notes = site.release-notes | where_exp:"item","item.products contains 'soda-sql'" | sort:"date" | reverse %}
{% for release-note in notes %}
  <h2>[{{ release-note.products | join:', ' }}] {{ release-note.name }}</h2>
  <sup>{{ release-note.date | date_to_long_string }}</sup>
  {{ release-note.content }}
  <hr/>
{% endfor %}

*Last modified on {% last_modified_at %}*