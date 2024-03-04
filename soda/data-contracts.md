---
layout: default
title: Set up Soda data contracts
description: Use Soda to write data contracts that set data quality standards for data products.
parent: Create a data contract
redirect_from: 
- /data-contracts.html
---

# Set up data contracts 
<br />![experimental](/assets/images/experimental.png){:height="150px" width="150px"} <br />
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use Soda's data contracts to set data quality standards for data products. In a programmatic Soda scan, Soda executes the standards as data quality checks. 
{% include code-header.html %}
```yaml
dataset: CUSTOMERS

owner: mahalijones@example.com

pii_category: very sensitive

columns:

  - name: id
    data_type: VARCHAR
    checks:
      - type: duplicates_count

  - name: size
    data_type: VARCHAR
    checks:
      - type: invalid_count
        valid_values: ['S', 'M', 'L']
        fail_when_greater_than_or_equal: 10

  - name: distance
    checks:
      - type: invalid_count
        valid_min: 0
        valid_max: 1000

  - name: created
    optional: true

checks:
  - type: row_count
```
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✖️ &nbsp;&nbsp; Available as a no-code check</small>

[About data contracts](#about-data-contracts)<br />
[Prerequisites](#prerequisites)<br />
[Install data contracts](#install-data-contracts)<br />
[Go further](#go-further)<br />
<br />

## About data contracts

Soda data contracts is a Python library that verifies data quality standards as early and often as possible in a data pipeline so as to prevent negative downstream impact.

Begin by preparing a contract in a YAML file that stipulates the quality standards to which any newly ingested or transformed data must adhere, such as schema and column data type, freshness, and missing or validity standards. Each time the pipeline accepts or produces new data, Soda executes the checks in the contract; where a check fails, it indicates that new data does not meet the contract's data quality standards and warrants investigation or quarantining. 

If you consider a data pipeline as a set of components -- data transformations, and ingestions, etc. -- you can apply a data contract to each of these components to frequently guage data quality standards. Doing so frequently and consistently enables you to effectively break apart a dense data pipeline into manageable parts wherein data quality is verified before it moves into the next component. Use the same strategy of frequent verification in a CI/CD workflow to make sure that newly-committed code adheres to your stipulated data quality standards.


## Prerequisites
* Python 3.8 or greater
* Pip 21.0 or greater
* a text editor or IDE
* (optional) a local development environment in which to test data contract execution
* (optional) a git repository to store and control the versions of your data contract YAML files


## Install data contracts

Data contracts are only available for use in programmatic scans using Soda Core. <br />
Soda Core CLI *does not* support data contracts.

1. Best practice dictates that you install data contracts in a virtual environment. In your command-line interface tool, create and activate a <a  href="https://docs.python.org/3/tutorial/venv.html#creating-virtual-environments" target="_blank">Python virtual environment</a>.
2. Execute the following command, replacing the package name with the install package that matches the type of data source you use to store data; see the <a href="https://github.com/sodadata/soda-core/blob/main/docs/installation.md" target="_blank">complete list</a> of packages.
```shell
pip install soda-core-postgres
```
3. Use the following command to install `soda-core-contracts`
```shell
pip install -i https://pypi.cloud.soda.io soda-core-contracts
```
4. Validate the installation using the following command.
```shell
soda --help
```

To exit the virtual environment when you are done with this tutorial, use the command `deactivate`.



## Go further

* Next: [Write a data contract]({% link soda/data-contracts-write.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}