---
layout: default
title: Distribution checks
description: Use a SodaCL distribution check to monitor the consistency of a column over time.
parent: SodaCL
---

# Distribution checks 

Use a distribution check to determine whether the distribution of a column has changed between two points in time. For example, if you trained a model at a particular moment in time, you can use a distribution check to find out how much the data in the column has changed over time, or if it has changed all.

*Soda Cloud does not support distribution checks.*<br />
*Requires Soda Core Scientific.*

```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned) > 0.05:
      distribution reference file: ./cars_owned_dist_ref.yml
      method: chi_square
```

[About distribution checks](#about-distribution-checks)<br />
[Prerequisites](#prerequisites)<br />
[Install Soda Core Scientific](#install-soda-core-scientific)<br />
[Generate a distribution reference object (DRO)](#generate-a-distribution-reference-object-dro)<br />
[Define a distribution check](#define-a-distribution-check)<br />
[Distribution check examples](#distribution-check-examples)<br />
[Optional check configurations](#optional-check-configurations)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Troubleshoot Soda Core Scientific installation](#troubleshoot-soda-core-scientific-installation)<br />
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
  <summary>Sample sizes in distribution checks</summary>
  In hypothesis testing, the <a href="https://en.wikipedia.org/wiki/Power_of_a_test" target="_blank">statistical power</a> of a test refers to its ability to reject the null hypothesis when it is false. Specifically, the power of a test tells you how likely it is that the null hypothesis will be rejected if the true difference with the alternative hypothesis were of a particular size; see <a href="https://en.wikipedia.org/wiki/Effect_size#Relationship_to_test_statistics" target="_blank">effect size</a>. A very powerful test is able to reject the null hypothesis even if the true difference is small.
  <br /><br />
  Since distribution checks issue warnings based on the p-value alone and do not take effect size into account, having too much power can make the results of the checks hard to interpret. An extremely powerful test rejects the null hypothesis for effect sizes that are negligible. Because the power of a test increases as its sample size increases, there is a sample size limit of one million in distribution checks. Soon, users will be able to define the sample size in a distribution check.
  <br /><br />
  The default sample size limit of 1 million rows is based on simulations that used the Kolmogorov-Smirnov test. The simulation generated samples from a normal distribution, an exponential distribution, a laplacian distribution, a beta distribution, and a mixture distribution (generated by randomly choosing between two normal distributions). The Kolmogorov-Smirnov test compared these samples to samples that came from the same distributions, but with different means. For example, it compared samples from a normal distribution to samples from another normal distribution with a different mean.
  <br /><br />
  For each distribution type, the Kolmogorov-Smirnov test rejected the null hypothesis 100% of the time if the effect size was equal to, or larger than, a shift to the mean of 1% of the standard deviation, when using a sample size of one million. Using such a sample size does not result in problems with local memory.
</details>
<details>
  <summary>Distribution check thresholds for distance metrics</summary>
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
## Prerequisites

* You have [installed Soda Core Scientific](#install-soda-core-scientific) in the same directory or virtual environment in which you [installed Soda Core]({% link soda-core/installation.md %}).


## Install Soda Core Scientific

To use a distribution check, you must install Soda Core Scientific in the same directory or virtual environment in which you installed Soda Core. Best practice recommends installing Soda Core and Soda Core Scientific in a virtual environment to avoid library conflicts, but you can [Install Soda Core Scientific locally](#install-soda-core-scientific-locally) if you prefer.

{% include install-soda-core-scientific.md %}

Refer to [Troubleshoot Soda Core Scientific installation](#troubleshoot-soda-core-scientific-installation) for help with issues during installation.

## Generate a distribution reference object (DRO)

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
```
Alternatively, you can define multiple DROs in your `distribution_reference.yml` file by naming them. The following example content defines two DROs
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
5. (Optional) Define the value of `filter` to specify the portion of the data in your dataset for which you are creating a DRO. If you trained a model on data in which the `date_first_customer` column contained values between 2010-01-01 and 2020-01-01, you can use a filter based on that period to test whether the distribution of the column has changed since then. <br />
If you do not wish to define a filter, remove the key-value pair from the file.
6. (Optional) If you wish to define multiple DROs in a single `distribution_reference.yml` file, change the names `dro_name1` and `dro_name2`.
7. Save the file, then, while still in your Soda project directory, run the `soda update-dro` command to create a distribution reference object. For a list of options available to use with the command, run `soda update-dro --help`. 
```bash
soda update-dro -d your_datasource_name -c your_configuration_file.yml ./distribution_reference.yml 
```
If you defined multiple DROs in your `distribution_reference.yml` file, specify which DRO you want to update using the `-n` argument. `-n` stands for name
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
Soda appended a new key called `distribution reference` to the file, together with an array of `bins` and a corresponding array of `weights`. 

Soda uses the `bins` and `weights` to generate a sample from the reference distribution when it executes the distribution check during a scan. By creating a sample using the DRO's bins and weights, you do not have to save the entire – potentially very large - sample. The `distribution_type` value impacts how the weights and bins will be used to generate a sample, so make sure your choice reflects the nature of your data (continuous or categorical).

When multiple DROs are defined in a single `distribution_reference.yml` file, Soda requires all of them to be named. In that case it is required to provide the DRO name with the `-n` argument when using `soda update-dro`.
## Define a distribution check

1. If you have not already done so, create a `checks.yml` file in your Soda project directory. The checks YAML file stores the Soda Checks you write, including distribution checks; Soda Core executes the checks in the file when it runs a scan of your data. Refer to more detailed instructions in the [Soda Core documentation]({% link soda-core/configuration.md %}).
2. In your new file, add the following example content.
```yaml
checks for your_dataset_name:
  - distribution_difference(column_name, dro_name) > your_threshold:
      method: your_method_of_choice
      distribution reference file: ./distribution_reference.yml
```
3. Replace the following values with your own dataset and threshold details.
* `your_dataset_name` - the name of your dataset
* `column_name` - the column against which to compare the DRO
* `dro_name` - the name of the DRO (optional, required if `distribution_reference.yml` contains named DROs)
* `> 0.05` - the threshold for the distribution check that you specify as acceptable
4. Replace the value of `your_method_of_choice` with the type of test you want to use in the distribution check. 
    * `ks` for the Kolmogorov-Smirnov test
    * `chi_square` for the Chi-square test
    * `psi` for the Population Stability Index metric
    * `swd` for the Standardized Wasserstein Distance (SWD) metric 
    * `semd` for the Standardized Earth Mover's Distance (SEMD) metric (the SWD and the SEMD are the same metric) <br /> 
If you do not specify a `method`, the distribution check defaults to `ks` for continuous data or `chi_square` for categorical data respectively.
5. Run a soda scan of your data source to execute the distribution check(s) you defined. Refer to [Soda Core documentation]({% link soda-core/scan-core.md %}) for more details.
```bash
soda scan -d your_datasource_name checks.yml -c /path/to/your_configuration_file.yml your_check_file.yml
```

When Soda Core executes the distribution check above, it compares the values in `column_name` to a sample that Soda creates based on the `bins`, `weights`, and `data_type` in `dro_name` defined in the `distribution_reference.yml` file. Specifically, it checks whether the value of `your_method_of_choice` is larger than `0.05`.

### For awareness

* When you execute the `soda scan` command, Soda stores the entire contents of the column(s) you specified in local memory. Before executing the command, examine the volume of data the column(s) contains and ensure that your system can accommodate storing it in local memory. 

* As explained in [Generate a Distribution Reference Object (DRO)](#generate-a-distribution-reference-object-dro), Soda uses bins and weights to take random samples from your DRO. Therefore, it is possible that the original dataset that you used to create the DRO resembles a different underlying distribution than the dataset that Soda creates by sampling from the DRO. To limit the impact of this possibility, Soda runs the tests in each distribution check ten times and returns the median of the results (either p-value or distance metric). <br /> 
For example, if you use the Kolmogorov-Smirnov test and a threshold of 0.05, the distribution check uses the Kolmogorov-Smirnov test to compare ten different samples from your DRO to the data in your column.  If the median of the returned p-values is smaller than 0.05, the check issues a warning. This approach does change the interpretation of the distribution check results. For example, the probability of a type I error is multiple orders of magnitude smaller than the signifance level that you choose. 

<br />

## Distribution check examples

You can define multiple distribution checks in a single `checks.yml` file. If you create a new DRO for another dataset and column in `sales_dist_ref.yml` for example, you can define two distribution checks in the same `checks.yml` file, as per the following.

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
|   | Define alert configurations to specify warn and fail thresholds. | - |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes) | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. |  - |
| ✓ | Use for each to apply distribution checks to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
|   | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |

#### Example with check name

```yaml
checks for dim_customer:
- distribution_difference(number_cars_owned) > 0.05: 
    method: chi_square
    distribution reference file: dist_ref.yml
    name: Distribution check
```

#### Example with quotes

```yaml
checks for dim_customer:
- distribution_difference("number_cars_owned") < 0.2:
    method: psi
    distribution reference file: dist_ref.yml
    name: Distribution check
```

#### Example with for each

```yaml
for each dataset T:
    dataset:
        - dim_customer
    checks:
    - distribution_difference(number_cars_owned) < 0.15:
        method: swd
        distribution reference file: dist_ref.yml
```

<br />

## List of comparison symbols and phrases

{% include list-symbols.md %}

## Troubleshoot Soda Core Scientific installation

While installing Soda Core Scientific works on Linux, you may encounter issues if you install Soda Core Scientific on Mac OS (particularly, machines with the M1 ARM-based processor) or any other operating system. If that is the case, consider using one of the following alternative installation procedures.
* [Use Docker to run Soda Core (Recommended)](#use-docker-to-run-soda-core)
* [Install Soda Core locally (Limited support)](#install-soda-core-locally)

Need help? Ask the team in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

### Use Docker to run Soda Core

{% include docker-soda-core.md %}

### Install Soda Core Scientific Locally 

{% include install-local-soda-core-scientific.md %}



## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
* Use a [freshness check]({% link soda-cl/freshness.md %}) to gauge how recently your data was captured.
* Use [reference checks]({% link soda-cl/reference.md %}) to compare the values of one column to another.

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
