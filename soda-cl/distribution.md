---
layout: default
title: Distribution checks
description: Use a SodaCL (Beta) distribution check to monitor the consistency of a column over time.
parent: SodaCL
---

# Distribution checks ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

Check whether the distribution of a column has changed between two points in time. One of the occasions where this could be useful is when you trained a model at a particular moment and want to find out if the distributions of the columns you used as features have changed since.  

To detect changes in the distribution of a column between different points in time, [hypothesis testing](https://en.wikipedia.org/wiki/Statistical_hypothesis_testing) is used. More specifically, a statistical test is employed to evaluate the difference between two samples. The distribution check will return the [p-value](https://en.wikipedia.org/wiki/P-value) corresponding to the null hypothesis that the two samples came from the same distribution. If the p-value is smaller than a user-specified threshold, the distribution check will return a warning. Depending on whether your data is categorical or continuous you should either use the [Chi-square](https://en.wikipedia.org/wiki/Chi-squared_test) test or the [Kolmogorov-Smirnov](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test) test.
## Setting up a Local Database (Optional)
To run the distribution checks you need to have access to a database. If you want to try out the steps on this page but do not have a database to connect to, you can go through the **Set up** section of [this workshop](https://github.com/sodadata/sodacl-workshop#set-up) to set up a demo PostgreSQL database. The steps outlined on this page will use tables and column names that exist in this PostgreSQL database.

## Distribution Checks and Local Memory Usage 
When you execute the `soda update` command or the `soda scan` command with a distribution check defined in the `checks.yml` file, the entire database column that you run the check on will be stored in local memory. Before running either one of those commands, examine the size of the column that you want to use the check on and make sure that your computer's memory is up for the task. The demo PostgreSQL database that was introduced in the previous section should not result in problems regardless of the machine you are using.

## Setting up a Configuration
To set up a distribution check, you first need to create a `configuration.yml` file. This file should contain a `data_source` name, the hostname, name, schema, and type of the database that you want to connect to, together with your user credentials. If you using the demo PostgreSQL database, your `configuration.yml` file could look something like this:
```yaml
data_source adventureworks:
  type: postgres
  connection:
    host: localhost
    username: postgres
    password: secret
  database: postgres
  schema: public
```
In this example the `data_source` is called `adventureworks`. The `data_source` key can be used to specify which database you want to connect in case you are using multiple. For example, suppose that you are also running a local MySQL database that you want to run distribution checks for. You could add a new `data_source` that contains the information and user credentials needed to make a connection to this database in the same configuration file as follows:
```yaml
data_source adventureworks:
  type: postgres
  connection:
    host: localhost
    username: postgres
    password: secret
  database: postgres
  schema: public

data_source my_sql_database:
  type: mysql
  connection:
    host: localhost
    username: mysql
    password: secret
  database: mysql
  schema: public
```
You can decide which database to use by passing the value of the corresponding `data_source` key to the `-d` option of the `soda scan` command - this command will be covered in more detail later, but for now you can run `soda scan --help` to find out what it does and which arguments it accepts. The next step in setting up your own distribution checks involves creating a Distribution Reference Object (DRO).

## Generating a Distribution Reference Object (DRO)
Before setting up your distribution check, you need to generate a Distribution Reference Object (DRO). When you run a distribution check you are comparing the data in a column of your database with a snapshot of the same column at a different point in time. This snapshot is the DRO, which serves as a point of reference. The distribution check will tell you if the difference between the distributions of the two dataset is statistically significant.  

To generate a DRO, you can create a file called `cars_owned_dist_ref.yml` that looks something like this
```yaml
table: dim_customer
column: number_cars_owned
method: chi_square
# (optional) filter to a specific point in time or any other dimension 
filter: "date_first_purchase between '2010-01-01' and '2020-01-01'"
```
The `column` and `table` keys are used to indicate for which column in which table of your database you want to create a DRO. The `method` key is used by the distribution check to determine what type of test should be used. The distribution checks currently support two values for the `method` key: *chi_square* and *ks*, which will result in using the [Chi-square](https://en.wikipedia.org/wiki/Chi-squared_test) and [Kolmogorov-Smirnov](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test) test respectively. Make sure that your choice here matches the data that is in the column specified in the `column` key, *chi_square* for categorical data and *ks* for continuous data. <br/>

The `filter` key can be used to specify which part of the data you want to use to create a DRO. If you trained a model on data where the `date_first_customer` column contained values between 2010-01-01 and 2020-01-01, you could create a DRO using a filter based on that period to test whether the distribution of the column has changed since. 

When you have created your `cars_owned_dist_ref.yml`, you can run the `soda update` command to create a DRO - to find out more about the `soda update` command, run `soda update --help`. The argument to `update` is the relative path and name of the `cars_owned_dist_ref.yml` file that you just created. By passing the optional arguments `-c configuration.yml` and `-d adventureworks` you ensure that a connection is made to the correct database. Running the entire command will look something like this
```bash
soda update ./cars_owned_dist_ref.yml -c configuration.yml -d adventureworks
```
You can check that the DRO is generated by opening up the `cars_owned_dist_ref.yml` file. If the `soda update` command was executed successfully, your `cars_owned_dist_ref.yml` file should now look something like this
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
A new key called `distribution reference` is appended to the file together with an array of `bins` and a corresponding array of `weights`. The `bins` and `weights` are used to generate a sample from the reference distribution when the distribution check is run. By creating a sample using the DRO's bins and weights you do not have to save the entire - potentially very large - sample.
## Setting up a Distribution Check
Now that the set up a configuration and created a DRO you can define your distribution check. Create a file called `checks.yml` that looks something like this
```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned, my_reference_distribution) > 0.05:
      distribution reference file: ./cars_owned_dist_ref.yml
```
This file defines the checks that you want to use. The `checks.yml` file configuration shown above defines a single distribution check for the `dim_customer` table: it compares the `number_cars_owned` column to a sample that will be created based on the `bins` and `weights` defined in the `cars_owned_dist_ref.yml` file. Specifically, it checks whether the p-value of the statistical test that is defined with the `method` key in `cars_owned_dist_ref.yml` is larger than 0.05.

It is possible to define multiple distribution checks in a single `checks.yml` file. If you create a new DRO for another table and column in `sales_dist_ref.yml` you could define two distributions checks in the same `checks.yml` file as follows

```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned, my_reference_distribution) > 0.05:
      distribution reference file: ./cars_owned_dist_ref.yml

checks for fact_sales_quota:
  - distribution_difference(calendar_quarter, my_reference_distribution) > 0.05:
      distribution reference file: ./sales_dist_ref.yml
```
Besides the check that you defined for the `dim_customer` table, a new check is added for the `calendar_quarter` column in the `fact_sales_table` table. You can define multiple tests for different columns in the same table by generating multiple DROs for those columns and using something like this
```yaml
checks for dim_customer:
  - distribution_difference(number_cars_owned, my_reference_distribution) > 0.05:
      distribution reference file: ./cars_owned_dist_ref.yml
  - distribution_difference(total_children, my_reference_distribution) > 0.05:
      distribution reference file: ./total_children_dist_ref.yml

checks for fact_sales_quota:
  - distribution_difference(calendar_quarter, my_reference_distribution) > 0.05:
      distribution reference file: ./sales_dist_ref.yml
```
This will define two distribution checks for the columns `number_cars_owned` and `total_children` in the `dim_customer` table, and one distribution check for the `calendar_quarter` column in the `fact_sales_quota` table.
## Run the Distribution Checks
Now that you have set up your configuration, generated a DRO, and defined your distribution checks in, you can run the `soda scan` command to evaluate your checks (you can run `soda scan --help` to get more information about this command). Continuing with the examples used in the previous sections, your `soda scan` command may look something like this
```bash
soda scan checks.yml -c configuration.yml -d adventureworks
```
Running this command evaluates the checks defined in the `checks.yml` file, using the data source `adventureworks` defined in the `configuration.yml` file. If you followed the previous steps using the local PostgresQL database, your command line output should look something like this
```bash
Soda Core 3.0.0b10
Scan summary:
3/3 checks PASSED: 
    dim_customer in adventureworks
      distribution_difference(number_cars_owned, my_reference_distribution) > 0.05 [PASSED]
      distribution_difference(total_children, my_reference_distribution) > 0.05 [PASSED]
    fact_sales_quota in adventureworks
      distribution_difference(calendar_quarter, my_reference_distribution) > 0.05 [PASSED]
All is good. No failures. No warnings. No errors.
```
As is shown in the scan summary all the tests you defined in the `checks.yml` file passed. To see what happens when a test fails, you can set the threshold of one of the checks defined in `checks.yml` to something close to 1. If you change the threshold for the check on `number_cars_owned` from 0.05 to 0.8 and run `soda scan checks.yml -c configuration.yml -d adventureworks`, you should see something like this
```bash
Soda Core 3.0.0b10
Scan summary:
2/3 checks PASSED: 
    dim_customer in adventureworks
      distribution_difference(total_children, my_reference_distribution) > 0.05 [PASSED]
    fact_sales_quota in adventureworks
      distribution_difference(calendar_quarter, my_reference_distribution) > 0.05 [PASSED]
1/3 checks FAILED: 
    dim_customer in adventureworks
      distribution_difference(number_cars_owned, my_reference_distribution) > 0.8 [FAILED]
Oops! 1 failures. 0 warnings. 0 errors. 2 pass.
```
Indicating that the test for the `number_cars_owned` column failed.
  

---
{% include docs-footer.md %}