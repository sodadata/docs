---
layout: default
title: Get started
description: Install Soda Core (Beta), a CLI tool that enables you to scan the data in your data source to surface invalid, missing, or unexpected data.
sidebar: core
parent: Soda Core (Beta)
---

# Get started ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

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
{% include docs-core-footer.md %}