---
layout: default
title: Run your first scan
description: 160 char description
sidebar: core
parent: Run your first scan
---

# Run your first scan

Soda Core evaluates checks that are written in SodaCL, Soda's checks language. A collection of SodaCL files can be executed in one scan. A scan will build and execute the necessary queries, extract the metrics and evaluate the checks. A scan is typically embedded into a data pipeline or executed on a time based schedule to ensure that new data is continuously checked.

Soda Example Demo DB
In order to learn about Soda Core, we recommend you to start running your first scans

## Soda Example Demo DB

 insert drawing

Launching the Soda Example Demo DB docker container Explain what the docker container contains: a postgres db preloaded with the demo data. The shell command to launch the docker container Ideally show a command how users can actually see the data inside the postgres container.

## The configuration file

Setting up ~/.soda/configuration.yml Explain that configurations mostly contain the configurations and credentials for the data sources used in a Soda Core scan. Point out that in the later configuration section there is more about the other details in the configuration file. Provide the contents of the file and instructions on where to put it Explain that the contents given points to the postgres database on the Soda Example Demo DB docker container. And that later we will provide instructions on how to connect to your data

## The SodaCL file

A first, minimal and simple check file example that users should copy and paste.

## Run your first scan

The scan command

## Next, scan your own data

a) Provide instructions and examples for the all supported databases on how to add a data source to the ~/.soda/configuration.yml

b) Create a new SodaCL file for your warehouse

c) Run the first scan on your warehouse

---
{% include docs-core-footer.md %}