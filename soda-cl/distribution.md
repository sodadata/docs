---
layout: default
title: Distribution checks
description: Use a SodaCL (Beta) distribution check to monitor the consistency of a column over time.
parent: SodaCL
---

# Distribution checks ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

Use a distribution check to determine whether the distribution of a column has changed between two points in time. For example, if you trained a model at a particular moment in time, you can use a distribution check to find out how much the data in the column has changed over time, or if it has changed all. 

<details>
  <summary>What does a distribution check do?</summary>
  To detect changes in the distribution of a column between different points in time, Soda uses <a href="https://en.wikipedia.org/wiki/Statistical_hypothesis_testing" target="_blank"> statistical hypothesis testing</a>. In essence, a distribution check allows you to determine whether there exists enough evidence to conclude that the distribution of a column has changed. It returns the probability that the difference between samples taken at two points in time would have occurred if they came from the same distribution (see <a href="https://en.wikipedia.org/wiki/P-value" target="_blank">p-value</a>). If this probability is smaller than a threshold that you define, the test will warn you that the column's distribution has changed.
  <br /><br />
  Depending on whether your data is categorical or continuous, use the <a href="https://en.wikipedia.org/wiki/Chi-squared_test" target="_blank">chi-square</a> test or the <a href="https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test" target="_blank">Kolmogorov-Smirnov</a> test, respectively.
</details>


[Prerequisites](#prerequisites)<br />
[Install Soda Core Scientific](#install-soda-core-scientific)<br />
[Generate a distribution reference object (DRO)](#generate-a-distribution-reference-object-dro)<br />
[Define a distribution check](#define-a-distribution-check)<br />
[Distribution check examples](#distribution-check-examples)<br />
[Go further](#go-further) <br />
<br />

## Prerequisites
* You have installed a <a href="https://docs.soda.io/soda-core/get-started.html#requirements" target="_blank">Soda Core package</a> in your environment.
* You have <a href="https://docs.soda.io/soda-core/configure.html" target="_blank">configured Soda Core</a> to connect to a data source using a <a href="https://docs.soda.io/soda-core/first-scan.html#the-configuration-yaml-file" target="_blank">`configuration.yml` file</a>. 
* You have installed the [Soda Core Scientific](#install-soda-core-scientific) package in your environment.

## Install Soda Core Scientific

1. (Optional) Consider installing both the Soda Core and Soda Core Scientific packages in a virtual environment as described in the <a href="https://docs.soda.io/soda-core/get-started.html#install-the-soda-core-cli" target="_blank">Soda Core documentation</a>. 
2. From your command-line interface, use the following command to install Soda Core Scientific.
```bash
pip install soda-core-scientific
```
Note that installing Soda Core Scientific also installs the following dependencies:
* <a href="https://pypi.org/project/pandas/" target="_blank">pandas</a>
* <a href="https://pypi.org/project/pydantic/" target="_blank">pydantic</a>
* <a href="https://pypi.org/project/PyYAML/" target="_blank">pyyaml</a>
* <a href="https://pypi.org/project/scipy/" target="_blank">scipy</a>
* <a href="https://pypi.org/project/soda-core/" target="_blank">soda-core</a>

## Generate a distribution reference object (DRO)

Before defining a distribution check, you must generate a distribution reference object (DRO). 

When you run a distribution check, Soda compares the data in a column of your dataset with a snapshot of the same column at a different point in time. This snapshot exists in the DRO, which serves as a point of reference. The distribution check result indicates whether the difference between the distributions of the snapshot and the actual datasets is statistically significant.

To create a DRO, you use the CLI command `soda update`. When you execute the command, Soda stores the entire contents of the column(s) you specified in local memory. Before executing the command, examine the volume of data the column(s) contains and ensure that your system can accommodate storing it in local memory. 

1. If you have not already done so, create a directory to contain the files that Soda uses for a distribution check.
2. Use a code editor to create a file called `distribution_reference.yml` (though, you can name it anything you wish) in your Soda project directory, then add the following example content to the file.
```yaml
table: your_dataset_name
column: column_name_in_dataset
method: chi_square
# (optional) filter to a specific point in time or any other dimension 
filter: "column_name between '2010-01-01' and '2020-01-01'"
```
3. Change the values for `table` and `column` to reflect your own dataset's identifiers.
4. (Optional) Change the value for `method` to instruct the distribution check which type of test to use. 
* use `chi_square` for categorical data; see <a href="https://en.wikipedia.org/wiki/Chi-squared_test" target="_blank">chi-square</a>
* use `ks` for continuous data; see <a href="https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test" target="_blank">Kolmogorov-Smirnov</a>
5. (Optional) Define the value of `filter` to specify the portion of the data in your dataset for which you are creating a DRO. If you trained a model on data in which the `date_first_customer` column contained values between 2010-01-01 and 2020-01-01, you can use a filter based on that period to test whether the distribution of the column has changed since then. <br />
If you do not wish to define a filter, remove the key-value pair from the file.
6. Save the file, then, while still in your Soda project directory, run the `soda update` command to create a distribution reference object. For a list of options available to use with the command, run `soda update --help`. 
```bash
soda update -d your_datasource_name ./distribution_reference.yml 
```
7. Review the changed contents of your `distribution_reference.yml` file. This following is an example of the information that Soda added to the file.

```yaml
table: dim_customer
column: number_cars_owned
method: chi_square
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

Soda uses the `bins` and `weights` to generate a sample from the reference distribution when it executes the distribution check during a scan. By creating a sample using the DRO's bins and weights, you do not have to save the entire – potentially very large - sample.


## Define a distribution check

1. If you have not already done so, create a `checks.yml` file in your Soda project directory. The checks YAML file stores the Soda Checks you write, including distribution checks; Soda Core executes the checks in the file when it runs a scan of your data. Refer to more detailed instructions in the <a href="https://docs.soda.io/soda-core/first-scan.html#the-checks-yaml-file" target="_blank">Soda Core documentation</a>.
2. In your new file, add the following example content.
```yaml
checks for your_dataset_name:
  - distribution_difference(column_name) > 0.05:
      distribution reference file: ./distribution_reference.yml
```
3. Replace the following values with your own dataset and threshold details.
* `your_dataset_name` - the name of your dataset
* `column_name` - the column against which to compare the DRO
* `> 0.05` - the threshold for the p-value that you specify as acceptable
This example distribution check compares the values in `column_name` to a sample that Soda creates based on the `bins` and `weights` defined in the `distribution_reference.yml` file. Specifically, it checks whether the p-value of the statistical test is larger than `0.05`.
4. Run a soda scan of your data source to execute the distribution check(s) you defined. Refer to <a href ="https://docs.soda.io/soda-core/first-scan.html#run-a-scan" target="_blank">Soda Core documentation</a> for more details.
```bash
soda scan -d your_datasource_name checks.yml 
```
When you execute the `soda scan` command, Soda stores the entire contents of the column(s) you specified in local memory. Before executing the command, examine the volume of data the column(s) contains and ensure that your system can accommodate storing it in local memory. 

<br />

## Distribution check examples

You can define multiple distribution checks in a single `checks.yml` file. If you create a new DRO for another dataset and column in `sales_dist_ref.yml` for example, you can define two distribution checks in the same `checks.yml` file, as per the following.

```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned) > 0.05:
      distribution reference file: ./cars_owned_dist_ref.yml

checks for fact_sales_quota:
  - distribution_difference(calendar_quarter) > 0.05:
      distribution reference file: ./sales_dist_ref.yml
```

You can also define multiple checks for different columns in the same dataset by generating multiple DROs for those columns. Refer to the following example.

```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned) > 0.05:
      distribution reference file: ./cars_owned_dist_ref.yml
  - distribution_difference(total_children) > 0.05:
      distribution reference file: ./total_children_dist_ref.yml

checks for fact_sales_quota:
  - distribution_difference(calendar_quarter) > 0.05:
      distribution reference file: ./sales_dist_ref.yml
```

## Debug Installation Errors
During the installation process you might run into a few errors. If you come across the following
```bash
Collecting joblib>=0.16.0
  Using cached joblib-1.1.0-py2.py3-none-any.whl (306 kB)
Collecting scipy>=1.3.2
  Using cached scipy-1.8.0-cp39-cp39-macosx_12_0_arm64.whl (28.7 MB)
Collecting xarray>=0.17.0
  Using cached xarray-2022.3.0-py3-none-any.whl (870 kB)
Collecting statsmodels>=0.13.0
  Downloading statsmodels-0.13.2-cp39-cp39-macosx_11_0_arm64.whl (9.1 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 9.1/9.1 MB 52.4 MB/s eta 0:00:00
Collecting lightgbm>=2.2.3
  Using cached lightgbm-3.3.2.tar.gz (1.5 MB)
  Preparing metadata (setup.py) ... error
  error: subprocess-exited-with-error
  
  × python setup.py egg_info did not run successfully.
  │ exit code: 1
  ╰─> [6 lines of output]
      Traceback (most recent call last):
        File "<string>", line 2, in <module>
        File "<pip-setuptools-caller>", line 34, in <module>
        File "/private/var/folders/vj/7nxglgz93mv6cv472sl0pnm40000gq/T/pip-install-j0txphmm/lightgbm_327e689fd1a645dfa052e5669c31918c/setup.py", line 17, in <module>
          from wheel.bdist_wheel import bdist_wheel
      ModuleNotFoundError: No module named 'wheel'
      [end of output]
  
  note: This error originates from a subprocess, and is likely not a problem with pip.
error: metadata-generation-failed

× Encountered error while generating package metadata.
╰─> See above for output.

note: This is an issue with the package mentioned above, not pip.
hint: See above for details.
```
you can run the following command 
```bash
pip install wheel
```
If you now run
```bash
pip install soda-core-scientific 
```
you might bump into a few new errors. The important ones are 
```bash
Building wheels for collected packages: pystan, prophet, PyYAML, antlr4-python3-runtime, lightgbm, ephem, pymeeus, ruamel.yaml.clib, numba, llvmlite
  Building wheel for pystan (setup.py) ... error
  error: subprocess-exited-with-error
  
  × python setup.py bdist_wheel did not run successfully.
  │ exit code: 1
  ╰─> [1 lines of output]
      Cython>=0.22 and NumPy are required.
      [end of output]
  
  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for pystan
  Running setup.py clean for pystan
  Building wheel for prophet (setup.py) ... error
  error: subprocess-exited-with-error
  
  × python setup.py bdist_wheel did not run successfully.
```
and
```bash
      RuntimeError: Could not find a `llvm-config` binary. There are a number of reasons this could occur, please see: https://llvmlite.readthedocs.io/en/latest/admin-guide/install.html#using-pip for help.
      error: command '/Users/tituskex/Projects/testing/venv/bin/python3' failed with exit code 1
      [end of output]
  
  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for llvmlite
```
indicating that during the installation of `soda-core-scientific`, the installation of the dependencies `pystan` and `llvmlite` failed. To resolve these errors you have to install these dependencies separately. To install `pystan` first install `cython`, using
```bash
pip install cython
```
You should then be able to run 
```bash
pip install pystan
```
If the installation works as expected you should see something like this:
```bash
Successfully built pystan
Installing collected packages: pystan
Successfully installed pystan-2.19.1.1
```
To install `llvmlite`, you need to have a `llvm-config` binary file that is used during the installation process. To proceed with the next step, make sure that you have homebrew installed (see [here](https://brew.sh/)). With homebrew installed, run:
```bash
brew install llvm@11
```
The `@11` part of this command indicates that homebrew should install `llvm` version 11. This is required because without this addition homebrew will install `llvm` version 13, which is incompatible with `llvmlite`. By installing `llvm`, a binary file called `llvm-config` will be installed. If you followed along and installed `llvm` using homebrew, this file will probably be located at `/opt/homebrew/opt/llvm@11/bin/llvm-config`. To ensure that this binary file is used during the installation of `llvmlite`, use the following command
```bash
export LLVM_CONFIG=/opt/homebrew/opt/llvm@11/bin/llvm-config
```
This will set the environment variable `LLVM_CONFIG` to the path where you installed the `llvm_config` binary. During the installation of `llvmlite` this environment variable will be used to locate the binary file. If you now run 
```bash
pip install llvmlite
```
the package should be installed correctly. With `pystan` and `llvmlite` installed you can run
```bash
pip install soda-core-scientific 
```
and the installation should be successful.

## Go further

* Use a [freshness check]({% link soda-cl/freshness.md %}) to gauge how recently your data was captured.
* Use [reference checks]({% link soda-cl/reference.md %}) to compare the values of one column to another.

---
{% include docs-footer.md %}