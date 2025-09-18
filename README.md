---
description: >-
  Soda is a data quality platform that provides tools to monitor, test, and
  improve data quality across all stacks.
---

# Soda v3 documentation

Welcome to the Soda documentation hub, your one-stop resource for everything you need to know about **Soda’s data quality platform**. Dive into our guides, tutorials, reference materials, and integration pages to learn how keep your data quality fresh across your entire stack.

<a href="quick-start-sip/" class="button primary" data-icon="glass">Get started!</a>

#### Soda v3 vs v4

{% hint style="success" %}
This is the documentation for **Soda v3**. If you are using Soda v4 or want to learn more about the next iteration of Soda, head to the [v4 documentation](https://app.gitbook.com/o/ig9n9VJPAFRSFLtZKVB2/s/A2PmHkO5cBgeRPdiPPOG/).
{% endhint %}

**Soda v3** is a checks-based, CLI-driven data quality tool.

**Soda v4** has incorporated collaborative data contracts and end-to-end observability features to become a unified data-quality platform for all.

<table><thead><tr><th width="143.86666870117188">Capability</th><th>Soda v3</th><th>Soda v4</th></tr></thead><tbody><tr><td><p><strong>Data Testing</strong></p><p><strong>(Checks)</strong></p></td><td>CLI-centric checks written in YAML/SodaCL, run via the Python library or Agent.</td><td><p>Still supports YAML/SodaCL checks.</p><p>Adds full Data Testing workflows in both CLI and Web UI.</p></td></tr><tr><td><p><strong>Data Observability</strong></p><p><strong>(Monitoring)</strong></p></td><td>Anomaly dashboards provide threshold-based monitoring configured via Soda Cloud.</td><td><strong>Metric Monitoring</strong> leverages an in-house anomaly detection algorithm to monitor data and metadata metric trends, and provide built-in alerts via Soda Cloud.</td></tr><tr><td><strong>Data Contracts</strong></td><td>File-based contracts executed via CLI/Git; verification via <code>soda scan</code>.</td><td><strong>Collaborative data contracts:</strong> file-based and UI-based, executed via CLI/Git or the Soda Cloud UI.</td></tr></tbody></table>

***

### 📚 Guides & Tutorials

Learn core concepts and best practices:

* <a href="use-case-guides/" class="button secondary" data-icon="map">Use case guides</a>: Practical Soda usage scenarios
* <a href="soda-cl-overview/" class="button secondary" data-icon="memo-circle-check">Write checks</a>: Define data quality checks
* <a href="run-a-scan/" class="button secondary" data-icon="nfc-magnifying-glass">Run scans</a>: Execute Soda data scans
* <a href="collaborate/" class="button secondary" data-icon="magnifying-glass-waveform">Organize, alert, investigate</a>: Check results and investigate issues

### 🔌 Integrations

Extend Soda into your existing tools and workflows:

<a href="integrate-soda/" class="button secondary" data-icon="circle-nodes">Integrations</a>

### 📖 Reference

Detailed command, API, and configuration docs:

<a href="sodacl-reference/" class="button secondary" data-icon="books">Reference</a>

***

### 💬 Community & Support

Need help or want to contribute?

* **Join our Slack Community**: [Soda Community](https://soda-community.slack.com/)
* **Browse GitHub Discussions**: [Soda on GitHub](https://github.com/sodadata/soda)

***

> **Still have questions?** Use the search bar above or reach out through our community channels for additional help.
