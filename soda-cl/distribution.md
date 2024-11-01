---
layout: default
title: Distribution checks
description: Use a SodaCL distribution check to monitor the consistency of a column over time.
parent: SodaCL reference
---

# Distribution checks
*Last modified on {% last_modified_at %}*

Use a distribution check to determine whether the distribution of a column has changed between two points in time. For example, if you trained a model at a particular moment in time, you can use a distribution check to find out how much the data in the column has changed over time, or if it has changed all.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned) > 0.05:
      distribution reference file: ./cars_owned_dist_ref.yml
      method: chi_square
      # (optional) filter to a specific point in time or any other dimension 
      filter: purchase_date > 2022-10-01 and purchase_date < 2022-12-01
      # (optional) database specific sampling query for continuous columns. For 
      # example, for PostgreSQL the following query randomly samples 50% of the data 
      # with seed 61.
      sample: TABLESAMPLE BERNOULLI (50) REPEATABLE (61)
```
<small>✔️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br 
<small>✖️ &nbsp;&nbsp; Available as a no-code check</small>

[About distribution checks](#about-distribution-checks)<br />
[Install Soda Scientific](#install-soda-scientific)<br />
[Generate a distribution reference object (DRO)](#generate-a-distribution-reference-object-dro)<br />
[Define a distribution check](#define-a-distribution-check)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Distribution check details](#distribution-check-details)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Bins and weights](#bins-and-weights)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Define the sample size](#define-the-sample-size)<br />
[Distribution check examples](#distribution-check-examples)<br />
[Optional check configurations](#optional-check-configurations)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Troubleshoot Soda Scientific installation](#troubleshoot-soda-scientific-installation)<br />
[Go further](#go-further) <br />
<br />

## About distribution checks

To detect changes in the distribution of a column between different points in time, Soda uses approaches based on <a href="https://en.wikipedia.org/wiki/Statistical_hypothesis_testing" target="_blank">hypothesis testing</a> and based on metrics that quantify the distance between samples.  

When using hypothesis testing, a distribution check allows you to determine whether enough evidence exists to conclude that the distribution of a column has changed. It returns the probability that the difference between samples taken at two points in time would have occurred if they came from the same distribution (see <a href="https://en.wikipedia.org/wiki/P-value" target="_blank">p-value</a>). If this probability is smaller than a threshold that you define, the check warns you that the column's distribution has changed.

You can use the following statistical tests for hypothesis testing in your distribution checks.


* <a href="https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test" target="_blank">Kolmogorov-Smirnov</a> for continuous data
* <a href="https://en.wikipedia.org/wiki/Chi-squared_test" target="_blank">Chi-square</a> for categorical data

When using a metric to measure distance between samples, a distribution check returns the value of the distance metric that you chose based on samples taken at two points in time. If the value of the distance metric is larger than a threshold that you define, the check warns that the column's distribution has changed.

You can use the following distance metrics in your distribution checks.

* <a href="https://mwburke.github.io/data%20science/2018/04/29/population-stability-index.html" target="_blank">Population Stability Index (PSI)</a> for continuous or categorical data
* <a href="https://en.wikipedia.org/wiki/Wasserstein_metric" target="_blank">Standardized Wasserstein Distance (SWD) </a> (standardized using the sample standard deviation) for continuous or categorical data
* <a href="https://en.wikipedia.org/wiki/Earth_mover%27s_distance" target="_blank">Standardized Earth Mover's Distance</a> (standardized using the sample standard deviation, this metric is equal to the SWD) for continuous or categorical data

<details>
  <summary style="color:#00BC7E">Sample sizes in distribution checks</summary>
  In hypothesis testing, the <a href="https://en.wikipedia.org/wiki/Power_of_a_test" target="_blank">statistical power</a> of a test refers to its ability to reject the null hypothesis when it is false. Specifically, the power of a test tells you how likely it is that the null hypothesis will be rejected if the true difference with the alternative hypothesis were of a particular size; see <a href="https://en.wikipedia.org/wiki/Effect_size#Relationship_to_test_statistics" target="_blank">effect size</a>. A very powerful test is able to reject the null hypothesis even if the true difference is small.
  <br /><br />
  Since distribution checks issue warnings based on the p-value alone and do not take effect size into account, having too much power can make the results of the checks hard to interpret. An extremely powerful test rejects the null hypothesis for effect sizes that are negligible. Because the power of a test increases as its sample size increases, there is a sample size limit of one million in distribution checks. 
  <br /><br />
  The default sample size limit of 1 million rows is based on simulations that used the Kolmogorov-Smirnov test. The simulation generated samples from a normal distribution, an exponential distribution, a laplacian distribution, a beta distribution, and a mixture distribution (generated by randomly choosing between two normal distributions). The Kolmogorov-Smirnov test compared these samples to samples that came from the same distributions, but with different means. For example, it compared samples from a normal distribution to samples from another normal distribution with a different mean.
  <br /><br />
  For each distribution type, the Kolmogorov-Smirnov test rejected the null hypothesis 100% of the time if the effect size was equal to, or larger than, a shift to the mean of 1% of the standard deviation, when using a sample size of one million. Using such a sample size does not result in problems with local memory.<br /><br />
  If you wish, you can define your own sample size using a SQL query. See Define the sample size section, below.
</details>

<details>
  <summary style="color:#00BC7E">Distribution check thresholds for distance metrics</summary>
  The values of the Population Stability Index (PSI) and the Standardized Wasserstein Distance (SWD) can be hard to interpret. Consider carefully investigating which distribution thresholds make sense for your use case. <br />
  <br />
  Some common interpretations of the PSI result are as follows:
  <ul>
    <li> PSI < 0.1: no significant distribution change </li>
    <li> 0.1 < PSI < 0.2: moderate distribution change </li>
    <li> PSI >= 0.2: significant distribution change </li>
  </ul>
  During simulations, for a difference in mean between distributions of size relative to 10% of their standard deviation, the SWD value converged to approximately 0.1.
</details>

## Install Soda Scientific

To use a distribution check, you must install Soda Scientific in the same directory or virtual environment in which you installed Soda Library. Best practice recommends installing Soda Library and Soda Scientific in a virtual environment to avoid library conflicts, but you can [Install Soda Scientific locally](#install-soda-scientific-locally) if you prefer.

{% include install-soda-scientific.md %}

Refer to [Troubleshoot Soda Scientific installation](#troubleshoot-soda-scientific-installation) for help with issues during installation.

## Generate a distribution reference object (DRO)
<!--Linked to UI, access Shlink though actually embedded in CLI help-->
*Not yet supported in Soda Cloud*

Before defining a distribution check, you must generate a distribution reference object (DRO).

When you run a distribution check, Soda compares the data in a column of your dataset with a snapshot of the same column at a different point in time. This snapshot exists in the DRO, which serves as a point of reference. The distribution check result indicates whether the difference between the distributions of the snapshot and the actual datasets is statistically significant.

To create a DRO, you use the CLI command `soda update-dro`. When you execute the command, Soda stores the entire contents of the column(s) you specified in local memory. Before executing the command, examine the volume of data the column(s) contains and ensure that your system can accommodate storing it in local memory.

1. If you have not already done so, create a directory to contain the files that Soda uses for a distribution check.
2. Use a code editor to create a file called `distribution_reference.yml` (though, you can name it anything you wish) in your Soda project directory, then add the following example content to the file.

    ```yaml
    dataset: your_dataset_name
    column: column_name_in_dataset
    distribution_type: categorical
    # (optional) filter to a specific point in time or any other dimension 
    filter: "column_name between '2010-01-01' and '2020-01-01'"
    # (optional) database specific sampling query, for example for postgres\
    # the following query randomly samples 50% of the data with seed 61
    ```

   Optionally, you can define multiple DROs in your `distribution_reference.yml` file by naming them. The following example defines two DROs.

    ```yaml
    dro_name1:
      dataset: your_dataset_name
      column: column_name_in_dataset
      distribution_type: categorical
    dro_name2:
      dataset: your_dataset_name
      column: column_name2_in_dataset
      distribution_type: continuous
    ```

3. Change the values for `dataset` and `column` to reflect your own dataset's identifiers.
4. (Optional) Change the value for `distribution_type` to capture `categorical` or `continuous` data.
5. (Optional) Define the value of `filter` to specify the portion of the data in your dataset for which you are creating a DRO. If you trained a model on data in which the `date_first_customer` column contained values between 2010-01-01 and 2020-01-01, you can use a filter based on that period to test whether the distribution of the column has changed since then. <br/>
If you do not wish to define a filter, remove the key-value pair from the file.
6. (Optional) If you wish to define multiple DROs in a single `distribution_reference.yml` file, change the names `dro_name1` and `dro_name2`.
7. Save the file, then, while still in your Soda project directory, run the `soda update-dro` command to create a distribution reference object. For a list of options available to use with the command, run `soda update-dro --help`.

    ```bash
    soda update-dro -d your_datasource_name -c your_configuration_file.yml ./distribution_reference.yml 
    ```

    If you defined multiple DROs in your `distribution_reference.yml` file, specify which DRO you want to update using the `-n` argument. `-n` indicates name. When multiple DROs are defined in a single `distribution_reference.yml` file, Soda requires all of them to be named. Thus, you must provide the DRO name with the `-n` argument when using the `soda update-dro` command.

    ```bash
    soda update-dro -n dro_name1 -d your_datasource_name -c your_configuration_file.yml ./distribution_reference.yml 
    ```

8. Review the changed contents of your `distribution_reference.yml` file. The following is an example of the information that Soda added to the file.

    ```yaml
    dataset: dim_customer
    column: number_cars_owned
    distribution_type: categorical
    filter: date_first_purchase between '2010-01-01' and '2020-01-01'
    distribution reference:
      weights:
        - 0.34932914953473276
        - 0.2641744211209695
        - 0.22927937675827742
        - 0.08899588833585804
        - 0.06822116425016231
      bins:
        - 2
        - 1
        - 0
        - 3
        - 4
    ```

    Soda appended a new key called `distribution reference` to the file, together with an array of `bins` and a corresponding array of `weights`. [Read more](#bins-and-weights) about `bins` and `weights`, and how Soda computes the number of bins for a DRO.

## Define a distribution check

1. If you have not already done so, create a `checks.yml` file in your Soda project directory. The checks YAML file stores the Soda Checks you write, including distribution checks; Soda Library executes the checks in the file when it runs a scan of your data. 
2. In your new file, add the following example content.

    ```yaml
    checks for your_dataset_name:
      - distribution_difference(column_name, dro_name) > your_threshold:
          method: your_method_of_choice
          distribution reference file: ./distribution_reference.yml
          # (optional) filter to a specific point in time, or any other dimension 
          filter: column_name > min_allowed_column_value and column_name < max_allowed_value
          # (optional) database specific sampling query for continuous columns. For 
          # example, for PostgreSQL, the following query randomly samples 50% of the data 
          # with seed 61
          sample: TABLESAMPLE BERNOULLI (50) REPEATABLE (61)
    ```

3. Replace the following values with your own dataset and threshold details.
    * `your_dataset_name` - the name of your dataset
    * `column_name` - the column against which to compare the DRO
    * `dro_name` - the name of the DRO (optional, required if `distribution_reference.yml` contains named DROs)
    * `> your_threshold` - the threshold for the distribution check that you specify as acceptable

4. Replace the value of `your_method_of_choice` with the type of test you want to use in the distribution check. If you do not specify a `method`, the distribution check defaults to `ks` for continuous data, or `chi_square` for categorical data.
    * `ks` for the Kolmogorov-Smirnov test
    * `chi_square` for the Chi-square test
    * `psi` for the Population Stability Index metric
    * `swd` for the Standardized Wasserstein Distance (SWD) metric
    * `semd` for the Standardized Earth Mover's Distance (SEMD) metric<br />
    SWD and the SEMD are the same metric. <br>

5. (Optional), to filter the data in the distribution check, replace the value of `filter` with a filter that specifies the portion of the data in your dataset for which you are checking the distribution.

6. (Optional), to sample the data in the distribution check for **continuous columns** only, replace the value of `sample` with a query that specifies the portion of the data in your dataset for which you are checking the distribution. The data source you are using must support the query you write. <br />For example, for PostgreSQL, you can use the `TABLESAMPLE` clause to randomly sample 50% of the data with seed 61. Best practice dictates that you use sampling for large datasets that might not fit in memory. Refer to the [define the sample size](#define-the-sample-size) for details. If you do not use `sample` or `filter` in a distribution check for **continuous columns**, Soda fetches up to 1 million records by applying a `limit` clause for better memory management. For **categorical columns**, Soda does not support `sample`.

7. Run a soda scan of your data source to execute the distribution check(s) you defined. 

    ```bash
    soda scan -d your_datasource_name checks.yml -c /path/to/your_configuration_file.yml your_check_file.yml
    ```

    When Soda Library executes the distribution check above, it compares the values in `column_name` to a sample that Soda creates based on the `bins`, `weights`, and `data_type` in `dro_name` defined in the `distribution_reference.yml` file. Specifically, it checks whether the value of `your_method_of_choice` is larger than `0.05`.

### Distribution check details

* For continuous columns, When you execute the `soda scan` command, Soda stores up to one million records in local memory. If the column has more than one million records, then Soda applies `limit` SQL clause to make sure that your system can accommodate storing it in local memory.

* For continuous columns, as explained in [Generate a Distribution Reference Object (DRO)](#generate-a-distribution-reference-object-dro), Soda uses bins and weights to take random samples from your DRO. Therefore, it is possible that the original dataset that you used to create the DRO resembles a different underlying distribution than the dataset that Soda creates by sampling from the DRO. To limit the impact of this possibility, Soda runs the tests in each distribution check ten times and returns the median of the results, either as a p-value or a distance metric). <br/> <br/>
For example, if you use the Kolmogorov-Smirnov test and a threshold of 0.05, the distribution check uses the Kolmogorov-Smirnov test to compare ten different samples from your DRO to the data in your column.  If the median of the returned p-values is smaller than 0.05, the check issues a warning. This approach does change the interpretation of the distribution check results. For example, the probability of a type I error is multiple orders of magnitude smaller than the significance level that you choose.

* For categorical columns, Soda fetches the aggregated calculated value counts of each category. If there are more than one million distinct categories, Soda skips the distribution check and issues a warning.

### Bins and weights
<!--Linked to UI, access Shlink though actually embedded in CLI help-->

Soda uses the `bins` and `weights` to generate a sample from the reference distribution when it executes the distribution check during a scan. By creating a sample using the DRO's bins and weights, you do not have to save the entire – potentially very large - sample. The `distribution_type` value impacts how the weights and bins will be used to generate a sample, so make sure your choice reflects the nature of your data (continuous or categorical).

To compute the number of bins for a DRO, Soda uses different strategies based on whether outlier values are present in the dataset.

By default Soda automatically computes the number of bins for each DRO by taking the maximum of [Sturges](https://en.wikipedia.org/wiki/Histogram#Number_of_bins_and_width) and [Freedman Diaconis Estimator](https://en.wikipedia.org/wiki/Freedman%E2%80%93Diaconis_rule) methods. [numpy.histogram_bin_edges(data, bins='auto')](https://numpy.org/doc/stable/reference/generated/numpy.histogram_bin_edges.html#numpy.histogram_bin_edges) also applies this practice by default.

For datasets *with* outliers, such as in the example below, the default strategy does not work well. When taking the maximum of [Sturges](https://en.wikipedia.org/wiki/Histogram#Number_of_bins_and_width) and [Freedman Diaconis Estimator](https://en.wikipedia.org/wiki/Freedman%E2%80%93Diaconis_rule) methods, it produces a great number of bins, `3466808`, while there are only nine elements in the array. The outlier value `10e6` result in a misleading bin size.

```python
import numpy as np
arr = np.array([0, 0, 0, 1, 2, 3, 3, 4, 10e6])
number_of_bins = np.histogram_bin_edges(arr, bins='auto').size # return 3466808
```

If the number of bins is greater than the size of data, Soda uses [interquantile range (IQR)](https://en.wikipedia.org/wiki/Interquartile_range) to detect and filter the outliers. Basically, for data that is greater than `Q3 + 1.5 IQR` and less than `Q1 - 1.5 IQR` Soda removes the datasets, then recomputes the number of bins with the same method by taking the maximum of [Sturges](https://en.wikipedia.org/wiki/Histogram#Number_of_bins_and_width) and [Freedman Diaconis Estimator](https://en.wikipedia.org/wiki/Freedman%E2%80%93Diaconis_rule).

After removing the outliers, if the number of bins still exceeds the size of the filtered data, Soda takes the square root of the dataset size to set the number of bins. To cover edge cases, if the square root of the dataset size exceeds one million, then Soda sets the number of bins to one million to prevent it from generating too many bins.

### Define the sample size

You can add a `sample` parameter for both a distribution check and DRO to include a sample SQL clause that Soda passes when it executes the check during a scan.

#### Apply a sample to a distribution check for continuous columns

If the data to which you wish to apply distribution check does not fit in memory or involves a time constraint, use a `sample` to specify a SQL query that returns a sample of the data. The SQL query that you provide is specific to the type of data source you use. In the example below, the SQL query for a PostgreSQL data source randomly samples 50% of the data with seed 61. You can customize the `sample` SQL query to meet your needs.

Use `sample` for continuous values, only. For categorical values refer to [Distribution check details](#distribution-check-details).

{% include code-header.html %}

```yaml
checks for dim_customer:
  - distribution_difference(budget) < 0.05:
      distribution reference file: ./dro_dim_customer.yml 
      method: ks
      # (optional) data source-specific sampling query; for example for postgres\
      # the following query randomly samples 50% of the data with seed 61
      sample: TABLESAMPLE BERNOULLI (50) REPEATABLE (61)
```

#### Sampling Caveats

Some data sources do not have a built-in sampling function. For example, BigQuery does not support `TABLESAMPLE BERNOULLI`. In such a case, add a `filter` parameter to randomly obtain a sample of the data. The `filter` parameter applies a data source-specific SQL `WHERE` clause to the data. In the example below, the SQL query for a BigQuery data source randomly samples 50% of the data.


**Distribution Check**
{% include code-header.html %}
```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned) > 0.05:
      distribution reference file: ./cars_owned_dist_ref.yml 
      method: chi_square
      # (optional) data source-specific sampling query, for example for postgres\
      # the following query randomly samples 50% of the data
      filter: rand() < 0.5
```

**DRO**
{% include code-header.html %}
```yaml
dataset: your_dataset_name
column: column_name_in_dataset
distribution_type: categorical
# (optional) data source-specific sampling query; for example for postgres\
# the following query randomly samples 50% of the data
filter: rand() < 0.5
```


## Distribution check examples

You can define multiple distribution checks in a single `checks.yml` file. If you create a new DRO for another dataset and column in `sales_dist_ref.yml` for example, you can define two distribution checks in the same `checks.yml` file, as per the following.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned) > 0.05:
      method: chi_square
      distribution reference file: ./cars_owned_dist_ref.yml

checks for fact_sales_quota:
  - distribution_difference(calendar_quarter) < 0.2:
      method: psi
      distribution reference file: ./sales_dist_ref.yml
```

Alternatively you can define two DROs in `distribution_reference.yml`, naming them `cars_owned_dro` and `calendar_quarter_dro`, and use both in a single `checks.yml` file
{% include code-header.html %}
```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned, cars_owned_dro) > 0.05:
      method: chi_square
      distribution reference file: ./distribution_reference.yml

checks for fact_sales_quota:
  - distribution_difference(calendar_quarter, calendar_quarter_dro) < 0.2:
      method: psi
      distribution reference file: ./distribution_reference.yml
```

You can also define multiple checks for different columns in the same dataset by generating multiple DROs for those columns. Refer to the following example.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned, cars_owned_dro) > 0.05:
      method: chi_square
      distribution reference file: ./distribution_reference.yml
   - distribution_difference(total_children, total_children_dro) < 0.2:
      method: psi
      distribution reference file: ./distribution_reference.yml

checks for fact_sales_quota:
  - distribution_difference(calendar_quarter, calendar_quarter_dro) < 0.2:
      method: psi
      distribution reference file: ./distribution_reference.yml
```

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a distribution check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
|   | Define alert configurations to specify warn and fail thresholds. | - |
| ✓ | Apply an in-check filter to return results for a specific portion of the data in your dataset; see [example](#example-with-in-check-filter).| [Configure in-check filters]({% link soda-cl/filters.md %}#configure-in-check-filters) |
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. |  - |
| ✓ | Use for each to apply distribution checks to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |
| ✓ | Instruct Soda to collect random samples. Because sampling SQL clauses vary significantly between data sources, consult your data source's documentation; see [example](#example-with-in-check-sampling). | - |

#### Example with check name
{% include code-header.html %}
```yaml
checks for dim_customer:
- distribution_difference(number_cars_owned) > 0.05: 
    method: chi_square
    distribution reference file: dist_ref.yml
    name: Distribution check
```

#### Example with quotes
{% include code-header.html %}
```yaml
checks for dim_customer:
- distribution_difference("number_cars_owned") < 0.2:
    method: psi
    distribution reference file: dist_ref.yml
    name: Distribution check
```

#### Example with for each
{% include code-header.html %}
```yaml
for each dataset T:
    dataset:
        - dim_customer
    checks:
    - distribution_difference(number_cars_owned) < 0.15:
        method: swd
        distribution reference file: dist_ref.yml
```

#### Example with in-check filter
{% include code-header.html %}
```yaml
checks for dim_customer:
- distribution_difference(number_cars_owned) < 0.05: 
    method: swd
    distribution reference file: dist_ref.yml
    filter: date_first_purchase between '2010-01-01' and '2022-01-01'
```

#### Example with dataset filter
{% include code-header.html %}
```yaml
filter dim_customer [first_purchase]:
  where: date_first_purchase between '2010-01-01' and '2022-01-01' 

checks for dim_customer [first_purchase]:
- distribution_difference(number_cars_owned) < 0.05: 
    method: swd
    distribution reference file: dist_ref.yml
```

#### Example with in-check sampling
The following example works for PostgreSQL data sources. It randomly samples 50% of the dataset with seed value 61.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned) > 0.05:
      distribution reference file: ./cars_owned_dist_ref.yml
      method: chi_square
      sample: TABLESAMPLE BERNOULLI (50) REPEATABLE (61)
```

## List of comparison symbols and phrases

{% include list-symbols.md %}

## Troubleshoot Soda Scientific installation

While installing Soda Scientific works on Linux, you may encounter issues if you install Soda Scientific on Mac OS (particularly, machines with the M1 ARM-based processor) or any other operating system. If that is the case, consider using one of the following alternative installation procedures.

* [Install Soda Scientific locally](#install-soda-scientific-locally)
* [Use Docker to run Soda Library](#use-docker-to-run-soda-library)

Need help? Ask the team in the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

### Install Soda Scientific Locally

{% include install-soda-scientific.md %}

### Use Docker to run Soda Library

{% include docker-soda-library.md %}


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
* Use a [freshness check]({% link soda-cl/freshness.md %}) to gauge how recently your data was captured.
* Use [reference checks]({% link soda-cl/reference.md %}) to compare the values of one column to another.

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName[e](0);a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
