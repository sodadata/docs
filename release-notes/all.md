---
layout: default
title: Release notes 
description: Review release notes for all Soda data observability products.
parent: Release notes
---

# Release notes for Soda products

Join to the <a href="https://soda-community.slack.com/archives/C078NT3730W" target="_blank">#release-alerts</a> channel in Slack to get notifications of Soda product releases.

{% assign notes = site.release-notes | sort:"date" | reverse %}
{% for release-note in notes %}
  <h2>[{{ release-note.products | join:', ' }}] {{ release-note.name }}</h2>
  <sup>{{ release-note.date | date_to_long_string }}</sup>
  {{ release-note.content }}
  <hr/>
{% endfor %}

*Last modified on {% last_modified_at %}*