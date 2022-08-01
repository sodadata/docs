---
layout: default
title: Get started
description: Install Soda Core, a CLI tool that enables you to scan the data in your data source to surface invalid, missing, or unexpected data.
sidebar: core
parent: Soda Core 
---

# Get started 

Soda Core is a command-line interface (CLI) tool that enables you to scan the data in your data source to surface invalid, missing, or unexpected data.
<br />

[Compatibility](#compatibility)<br />
[Requirements](#requirements)<br />
[Install](#install)<br />
[Upgrade](#upgrade)<br />
[Use Docker to run Soda Core](#use-docker-to-run-soda-core)<br />
[Install Soda Core Scientific](#install-soda-core-scientific)<br />

{% include install-core.md %}

Next, [run your first scan]({% link soda-core/first-scan.md %}).

## Upgrade the Soda Core CLI

{% include upgrade-core.md %}

## Use Docker to run Soda Core

{% include docker-soda-core.md %}

## Install Soda Core Scientific

Install Soda Core Scientific to be able to use SodaCL [distribution checks]({% link soda-cl/distribution.md %}) or [anomaly score checks]({% link soda-cl/anomaly-score.md %}).

You have three installation options to choose from:
* [Install Soda Core Scientific in a virtual environment (Recommended)](#install-soda-core-scientific-in-a-virtual-environment-recommended)
* [Use Docker to run Soda Core with Soda Scientific](#use-docker-to-run-soda-core-scientific)
* [Install Soda Core Scientific locally](#install-soda-core-scientific-locally)

## Install Soda Core Scientific in a virtual environment (Recommended)

{% include install-soda-core-scientific.md %}

## Use Docker to run Soda Core Scientific

{% include docker-soda-core.md %}

## Install Soda Core Scientific locally

{% include install-local-soda-core-scientific.md %}


---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-core-footer.md %}