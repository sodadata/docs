---
layout: default
title: Distribution Checks
description: 
sidebar: cl
parent: SodaCL
---

# Distribution checks (Experimental)

Use the `distribution_difference(column_name, distribution_difference_name)` check to monitor the consistency of a column over time or between a known time (i.e. a reference) and a later point in time (e.g., the latest data, the last n days etc.)

For example, comparing distributions of input features or predictions between the time a machine learning model is developed along its lifecycle in production can prevent machine learning models to suffer from decaying or erroneous performance. This is often referred to as **drift monitoring**.

Distribution checks work for both continuous and categorical (discrete) distributions --see [Advanced configurations](#advanced-configuration) section.

**NOTE:** This feature is still experimental. If you experience difficulties or issues, do not hesitate to get in touch with us or open a GitHub issue.

## Configure the check
The following example shows how to monitor the distribution of the `order_price` column of the `orders` dataset using the [Kolmogorov–Smirnov test](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test) (currently the default algorithm for a continuous distribution). This test outputs a p-value. A p-value below 0.05 is considered a reliable signal that the two distributions have drifted:

```yaml
checks for orders:
  - distribution_difference(order_price, my_reference_distribution) > 0.05:
      method: continuous
      distribution reference file: ./orders_dist_ref.yaml
```

The configuration above refers to a `distribution reference file`. This file holds a set of values (bins and weights) that summarize a the reference distribution to which the `order_price` column will be compared.

When setting up a distribution check you must also configure the following paramters to tell soda-core how to derive this reference:

```yaml
table: orders
column: order_price
method: continuous

# you can optionally filter to a specific point in time or any other dimension of your choosing.
filter: "order_price between '2022-01-01' and '2022-02-01'"
```

Note, the `filter` parameter although being indicated as optional is strongly recommended when comparing distributions that apply to the same column of the same dataset. The example above captures a reference between a certain date range.

## Generate the distribution reference object (DRO)

Because you want to compare a distribution against a reference, you will first need to generate a DRO. This is typically done once and potentially updated via filtering.

To generate the DRO run the following command:

```bash
soda update ./orders_dist_ref.yaml -c configuration.yaml -d datasource_name
```

Soda Core will perform capture the data using the parameters given in the distribution reference file in memory and output a set of bins and weights to use in `scan`s as a reference. `soda update` will persist those bins and weights in the distribution reference file for you.

In this particular case, the query will result in a query similar to the following one:

```sql
select order_price from orders where order_price between '2022-01-01' and '2022-02-01'
```

The `distribution reference file`'s content should now contain an additional key named `distribution reference` which contains a list of bins and weights similar to the following snippet:

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

## Run the check

Running a distribution check can be done via a regular scan command like so:

```bash
soda scan -d datasource_name -c configuration.yaml ./checks.yaml
```

Because your `distribution_difference()` check points to the reference file, soda-core will, first, read the DRO to generate the full reference distribution and sumbit it to the Kolmogorov–Smirnov test along with the check distribution to assess whether they are the same or different distributions.

## Advanced configuration

The `distribution_difference()` configuration currently allows users to choose the distribution comparison algorithm that is most appropriate to the underlying distributions they want to compare.

### Supported comparison algorithms:
- **Kolmogorov–Smirnov**: suited for **continuous** distributions. To target this algorithm specifically set `method: ks`. This is the algorithm that the `method: continuous` configuration defaults to.
- **Chi Square**: suited for categorical distributions. To target this algorithm set `method: chi_square`. This is the algorithm that the `method: categorical` configuration defaults to.
