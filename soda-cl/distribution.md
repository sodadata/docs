---
layout: default
title: Distribution checks
description: 
sidebar: cl
parent: SodaCL
---

# Distribution checks ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

Use a distribution check to monitor the consistency of a column over time or between a known time, such as a reference, and a later point in time, such as "the latest data", or "the last *n* days".

For example, you can compare distributions of input features or predictions from the inception of a machine learning model onwards to prevent decaying or erroneous performance, something referred to as drift monitoring.

Distribution checks work for both continuous and categorical distributions; see the [Advanced configurations](#advanced-configuration) section.


## Configure the check and generate a DRO

The following example shows how to monitor the distribution of the `order_price` column of the `orders` dataset using the <a href="https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test" target="_blank">Kolmogorov–Smirnov test</a> which is currently the default algorithm for a continuous distribution. This test outputs a p-value. A p-value of 0.05 is a reliable signal that the two distributions have drifted.

1. Use the following example to prepare a distribution check for a table.
```yaml
checks for orders:
  - distribution_difference(order_price, my_reference_distribution) > 0.05:
      method: continuous
      distribution reference file: ./orders_dist_ref.yaml
```
The configuration above refers to a `distribution reference file`. This file contains a set of bins and weights that summarize the reference distribution to which SodaCL compares the `order_price` column.
2. Configure the following parameters to specify how Soda Core derives this reference. This example also uses a filter to capture a reference between a particular date range. It is optional, but best practice dictates that you use filters when comparing distributions that apply to the same column of the same dataset.
```yaml
table: orders
column: order_price
method: continuous
# (optional) filter to a specific point in time or any other dimension 
filter: "order_price between '2022-01-01' and '2022-02-01'"
```
3. Because you want to compare a distribution against a reference, you must generate a distribution reference object (DRO). Do this once, then update via filtering. To generate the DRO, run the following command.
```bash
soda update ./orders_dist_ref.yaml -c configuration.yaml -d datasource_name
```
Soda Core captures the data using the parameters in the distribution reference file in memory, and outputs a set of bins and weights to use in a `soda scan` as a reference. `soda update` persists those bins and weights in the distribution reference file for you. <br />
In this particular case, the SQL query that Soda COre prepares is similar to the following.
```sql
select order_price from orders where order_price between '2022-01-01' and '2022-02-01'
```
The distribution reference file's content now contains an additional key called `distribution reference` which contains a list of bins and weights similar to the following.

```yaml
table: orders
column: order_price
method: continuous
filter: "order_price between '2022-01-01' and '2022-02-01'"
distribution reference:
  - weights:
    - 0.7
    - 0.1
    - 0.2
  - bins:
    - 0
    - 10
    - 30
```

## Run a scan

Use the `soda scan` command to execute your distribution check using Soda Core.

```bash
soda scan -d datasource_name -c configuration.yml checks.yml
```

Because your `distribution_difference()` check points to the reference file, Soda Core first reads the DRO to generate the full reference distribution, then submits it to the Kolmogorov–Smirnov test along with the check distribution to assess whether they are the same or different distributions.

## Advanced configuration

The `distribution_difference()` configuration currently allows you to choose the distribution comparison algorithm that is most appropriate to the underlying distributions that you want to compare.

* **Kolmogorov–Smirnov** is best-suited for continuous distributions. To target this algorithm specifically, set `method: ks`. This is the algorithm to which the `method: continuous` configuration defaults.
- **Chi Square** is best-suited for categorical distributions. To target this algorithm, set `method: chi_square`. This is the algorithm to which the `method: categorical` configuration defaults.

---
{% include docs-footer.md %}