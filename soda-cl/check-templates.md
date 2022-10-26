---
layout: default
title: Custom check templates
description: If the built-in metrics that SodaCL offers do not quite cover your more specific or complex needs, you can define your own metrics. See examples to copy+paste.
parent: SodaCL
---

# Custom check templates

Out of the box, Soda Checks Language (SodaCL) makes several [built-in metrics and checks]({% link soda-cl/metrics-and-checks.md %}), such as `row_count`, available for you to use to define checks for data quality. If the built-in metrics that Soda offers do not quite cover some of your more specific or complex needs, you can use [user-defined]({% link soda-cl/user-defined.md %}) and [failed rows]({% link soda-cl/failed-rows-checks.md %}) checks. 

**User-defined checks** and **failed rows checks** enable you to define your own metrics that you can use in a SodaCL check. You can also use these checks to simply define SQL queries or Common Table Expressions (CTE) that Soda executes during a scan, which is what most of these templates do.

The templates below offer examples of how you can define user-defined checks in your checks YAML file, if using Soda Core, or within an [agreement]({% link soda-cloud/agreements.md %}), if using Soda Cloud, to extract more complex, customized, business-specific measurements from your data. 

[Set an acceptable threshold for row count delta](#set-an-acceptable-threshold-for-row-count-delta)<br />
[Find duplicates in a dataset without a unique ID column](#find-duplicates-in-a-dataset-without-a-unique-id-column)<br />
[Validate business logic at the row level](#validate-business-logic-at-the-row-level)<br />
[Check for incorrectly mapped values across columns](#check-for-incorrectly-mapped-values-across-columns)<br />
[Go further](#go-further)<br />

<br />

## Set an acceptable threshold for row count delta

Though you can use a built-in [cross check]({% link soda-cl/cross-row-checks.md %}) to compare row counts between dataset in the same, or different, data sources, you may wish to add a little more complexity to the comparison, as in the following example. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

If you want to compare row counts between two datasets and allow for some acceptable difference between counts, use the following query.


✅ Amazon Redshift  
✅ GCP Big Query  
✅ PostgreSQL  
✅ Snowflake

{% raw %}
```yaml
checks for dim_product:
  - row_delta > {{acceptance_threshold}}:
      row_delta query: |
        with table1 as (
          select count(*) as table_1_rows from {{ table_1 }}
        ), 
        table2 as (
          select count(*) as table_2_rows from {{ table_2 }}
        ),
        intermediate as (
          select 
            (select table_1_rows from table1) as table_1_rows,
            (select table_2_rows from table2) as table_2_rows
        ),
        difference_calculation as (
          select 
            ABS( table_1_rows - table_2_rows)
            as row_delta
          from intermediate
        )
        select 
          row_delta
        from difference_calculation
```
{% endraw %}


<details>
    <summary style="color:#00BC7E">Explain the SQL</summary>
    <ul>
        <li>First, the query counts the rows in each of two datasets.</li>
        <li>Next, it defines an intermediate table to store the temporary row count values for each table so it can use those values in a calculation.</li>
        <li>Then, the query uses the data in the intermediate table to perform a calculation that compares the row count values of the datasets and produces a value that represents the difference in the number of rows, which it labels <code>row_delta</code>.</li>
        <li>Lastly, it captures the value it calculated for <code>row_delta</code> to compare to the value you set for <code>acceptance_threshold</code> in the user-defined check, or the amount of row count inconsistency you are willing to accept between datasets. If you want the row count values to be equal, set the threshold to <code>0.0</code>. </li>
    </ul>
</details>


## Find duplicates in a dataset without a unique ID column

You can use the built-in [duplicate_count metric]({% link soda-cl/numeric-metrics.md %}) to check the contents of a column for duplicate values and Soda automatically sends any failed rows -- that is, rows containing duplicate values -- to Soda Cloud for you to [examine]({% link soda-cloud/failed-rows.md %}). 

However, if your dataset does not contain a unique ID column, as with a denormalized dataset or a dataset produced from several joins, you may need to define uniqueness using a combination of columns. This template uses a failed rows check with SQL queries to go beyond a simple, single-column check. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

Ideally, you would generate a <a href="https://en.wikipedia.org/wiki/Surrogate_key" target="_blank"> surrogate key</a> from the concatenation of columns as part of a transformation, such as with this dbt Core™ utility that <a href="https://github.com/dbt-labs/dbt-utils#surrogate_key-source" target="_blank"> generates a `surrogate_key`</a>. However, if that is not possible, you can use the following template to test for uniqueness using a <a href="https://en.wikipedia.org/wiki/Composite_key" target="_blank">composite key</a>.

✅ Amazon Redshift  
✅ GCP Big Query  
✅ PostgreSQL  
✅ Snowflake

{% raw %}
```yaml
checks for dim_product:
  - failed rows:
      fail query: |
        with duplicated_records as (
          select
            {{ column_a }},
            {{ column_b }}
          from {{ table }}
          group by {{ column_a }}, {{ column_b }}
          having count(*) > 1
        )
        select
          q.*
        from {{ table }} q
        join duplicated_records dup
          on q.{{ column_a }} = dup.{{ column_a }}
          and q.{{ column_b }} = dup.{{ column_b }}
```
{% endraw %}

<details>
    <summary style="color:#00BC7E">Explain the SQL</summary>
    <ul>
        <li>First, the <code>duplicated_records</code> <a href="https://en.wikipedia.org/wiki/Hierarchical_and_recursive_queries_in_SQL#Common_table_expression" target="_blank">common table expression (CTE)</a> lists all of the IDs that appear more than once in a dataset, allowing for a pattern that asserts uniqueness using more than one column. The template uses two columns but you can add as many as you need. If you add more, be sure to add them to the join at the end of the query.</li>
        <li>Next, it joins the <code>duplicated_records</code> back to the dataset itself so that it can identify and send the failed rows for those duplicate IDs to Soda Cloud. </li>
    </ul>
</details>


## Validate business logic at the row level

Use one of the following templates to validate that data in records in your data source match your expectations. 

The first example is a skeletal query into which you can insert a variety of conditions; the others offer examples of how you might use the query. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

✅ Amazon Redshift  
✅ GCP Big Query  
✅ PostgreSQL  
✅ Snowflake

{% raw %}
```yaml
checks for dim_product:
  - failed rows: 
      fail expression: not({{ condition_logic }})
```
{% endraw %}

<details>
    <summary style="color:#00BC7E">Explain the SQL</summary>
      The CTE identifies a dataset in which to find records that do not meet the conditions you set in the <code>not</code> expression.  
</details>

<br />

#### Check the sum of column values

✅ Amazon Redshift  
✅ GCP Big Query  
✅ PostgreSQL  
✅ Snowflake

{% raw %}
```yaml
checks for dim_product:
  - failed rows:
      fail expression: not(credit_card_amount + wire_tranfer = total_order_value)
```
{% endraw %}


<details>
    <summary style="color:#00BC7E">Explain the SQL</summary>
      The CTE validates that the sum of two columns in a dataset matches the value in a third column, and identifies those rows which do not match.
</details>
<br />

#### Confirm Paid in Full

✅ Amazon Redshift  
✅ GCP Big Query  
✅ PostgreSQL  
✅ Snowflake

{% raw %}
```yaml
checks for dim_product:
  - failed rows: 
      fail expression: not(full_payment_deadline < dateadd(month, number_of_installments, first_payment_date))
```
{% endraw %}

<details>
    <summary style="color:#00BC7E">Explain the SQL</summary>
      The CTE validates that an order that is being paid for in installments will be fully paid by its deadline, and identifies those rows which do not meet the deadline.
</details>


## Check for incorrectly mapped values across columns

Where a dataset does not validate its contents on entry, you may wish to assert that entries map correctly to standard values. For example, where end users enter a free-form value for a country field, you can use a SQL query to confirm that the entry maps correctly to an ISO country code, as in the following table. 

| country_name   | country_code | 
| ----------     | ------------ |
| Holland        | NL           |
| Netherlands    | NL           |
| Britain        | GB           |
| United states  | US           |


Use one of the following **data source-specific** custom metric templates in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.


✅ Amazon Redshift  
✅ PostgreSQL 

{% raw %}
```yaml
checks for dim_product:
  - failed rows:
      fail query: |
        //this query returns failed rows
        select 
            *
        from(
            select
                *,
                count({{ column_2 }}) over (
                  partition by {{column_1}}
                  ) as number_duplicated_records_per_key

            from {{ table }}
            ) as mapping_aggregations

        where number_duplicated_records_per_key > 1
        order by {{ column_1 }}, {{ column_2 }}
        ;

        // this query only returns the distinct failed mappings
        select distinct 
            {{ column_1 }}, 
            {{ column_2 }}
        from(
            select
                *,
                count({{ column_2 }}) over (
                  partition by {{ column_1 }}
                  ) as number_duplicated_records_per_key

            from {{ table }}
            ) as mapping_aggregations

        where number_duplicated_records_per_key > 1
        order by {{ column_1 }}, {{ column_2 }}
        ;
```
{% endraw %}

<details>
    <summary style="color:#00BC7E">Explain the SQL</summary>
    <ul>
        <li>The first query counts the number of rows in which the values in either column are distinct relative to the other column contents, and displays the full contents of the failed rows that contain distinct values. </li>
        <li>The second query is the same as the first, but displays only the distinct values that appear in either column.</li>
    </ul>
</details>

<br />


✅ GCP Big Query  

{% raw %}
```yaml
checks for dim_product:
  - failed rows:
      fail query: |
        //this query returns failed rows
        select
            *,
        from {{ table }}
        where 1 = 1
        qualify  count(*) over (partition by {{ column_1 }} order by {{ column_2 }}) > 1;

        // this query only returns the distinct failed mappings
        select distinct
            {{ column_1 }},
            {{ column_2 }}
        from {{ table }}
        where 1 = 1
        qualify  count(*) over (partition by {{ column_1 }} order by {{ column_2 }}) > 1;
```
{% endraw %}

<details>
    <summary style="color:#00BC7E">Explain the SQL</summary>
    <ul>
        <li>The first query counts the number of rows in which the values in either column are distinct relative to the other column contents, and displays the full contents of the failed rows that contain distinct values. </li>
        <li>The second query is the same as the first, but displays only the distinct values that appear in either column.</li>
    </ul>
</details>

<br />


✅ Snowflake

{% raw %}
```yaml
checks for dim_product:
  - failed rows:
      fail query: |
        //this query returns failed rows
        select
            *
        from {{ table }}
        qualify count(*) over (partition by {{ column_1 }} order by {{ column_2 }}) > 1

        // this query only returns the distinct failed mappings
        select
            distinct
            {{ column_1 }},
            {{ column_2 }}
        from {{ table }}
        qualify count(*) over (partition by {{ column_1 }} order by {{ column_2 }}) > 1
```
{% endraw %}

<details>
    <summary style="color:#00BC7E">Explain the SQL</summary>
    <ul>
        <li>The first query counts the number of rows in which the values in either column are distinct relative to the other column contents, and displays the full contents of the failed rows that contain distinct values. </li>
        <li>The second query is the same as the first, but displays only the distinct values that appear in either column.</li>
    </ul>
</details>



## Go further
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Read more about [Failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
