---
layout: default
title: Custom metric templates
parent: Soda SQL
redirect_from: /soda-sql/example-compare-rowcounts.html
---

# Custom metric templates

Out of the box, Soda make several [built-in metrics]({% link soda/metrics.md %}), such as `row_count`, available for you to use to write [tests]({% link soda/glossary.md %}#test). If the built-in metrics that Soda offers do not quite give you the information you need from a scan, you can use custom metrics. 

**Custom metrics**, also known as SQL metrics, enable you to define your own metric that you can use in a test in Soda SQL or Soda Cloud; refer to [this example below](#validate-that-row-counts-are-equal). You can also use custom metrics to simply define SQL queries that Soda executes during a scan, which is what most of these templates do.  

* Read more about using [custom metrics in Soda SQL]({% link soda-sql/sql_metrics.md %}#custom-metrics).
* Read more about using [custom metrics in Soda Cloud]({% link soda-cloud/monitors.md %}#metric-types).

The templates below offer examples of how you can define custom metrics in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file to extract more complex, customized measurements from your data. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

[Find and display duplicate values](#find-and-display-duplicate-values)<br />
[Confirm the referential integrity of IDs between datasets](#confirm-the-referential-integrity-of-ids-between-datasets)<br />
[Compare values between datasets](#compare-values-between-datasets)<br />
[Compare datasets for equality](#compare-datasets-for-equality)<br />
[Validate business logic at the row level](#validate-business-logic-at-the-row-level)<br />
[Check for incorrectly mapped values across columns](#check-for-incorrectly-mapped-values-across-columns)<br />
[Compare row count between datasets](#compare-row-count-between-datasets)<br />
[Go further](#go-further)<br />


## Find and display duplicate values

Though you can use the built-in metric `duplicate_count` to test the contents of a column of unique IDs for duplicate values, a test passes or fails according to the number of duplicate values that exist. In other words, the metric reveals how many rows have duplicate content, but not which rows. (See an [example]({% link soda-sql/examples-by-metric.md %}#duplicate_count) of a test that uses `duplicate_count`.)

If you use Soda Cloud and have [connected it]({% link soda-cloud/connect_to_cloud.md %}) to your instance of Soda SQL, you can use a custom metric to explicitly send failed rows that contain duplicate IDs to Soda Cloud. (Learn how to [examine failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.) 

Use one of the following custom metric templates in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

#### Dataset contains a unique ID column

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>First, the query lists all the IDs in the <code>id_column</code> that appear more than once in the column and labels the list <code>duplicated_records</code>. </li>
        <li>Next, it joins the <code>duplicated_records</code>, if any, back to the dataset itself so that it can identify and send the failed rows for those duplicate IDs to Soda Cloud. </li>
    </ul>
</details>

{% raw %}
```yaml
sql_metrics:
    - type: failed_rows
    - sql: |
        with duplicated_records as (
        select
            {{ id_column }}
        from {{ table }}
        group by {{ column }}
        having count(*) > 1
        )
        select
          q.*
        from {{ table }} q
        join duplicated_records dup
          on q.{{ id_column }} = dup.{{ id_column }}
``` 
{% endraw %}

<br />

#### Dataset does not contain a unique ID column

If your dataset does not contain a unique ID column, as with a denormalized dataset or a dataset produced from several joins, you may need to define uniqueness using a combination of columns. Ideally, you would generate a <a href="https://en.wikipedia.org/wiki/Surrogate_key" target="_blank"> surrogate key</a> from the concatenation of columns as part of a transformation, but if that is not possible, you can use the following template to test for uniqueness using a <a href="https://en.wikipedia.org/wiki/Composite_key" target="_blank">composite key</a>.

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>First, the query lists all the IDs that appear more than once in a dataset, allowing for a pattern that asserts uniqueness using more than one column. The template uses two columns but you can add as many as you need. It labels the list <code>duplicated_records</code>.</li>
        <li>Next, it joins the <code>duplicated_records</code>, if any, back to the dataset itself so that it can identify and send the failed rows for those duplicate IDs to Soda Cloud. </li>
    </ul>
</details>

{% raw %}
```yaml
sql_metrics:
    - type: failed_rows
    - sql: |
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


## Confirm the referential integrity of IDs between datasets

You can use a custom metric to confirm <a href="https://en.wikipedia.org/wiki/Referential_integrity" target="_blank">referential integrity</a> between identifiers in two separate datasets. For example, you may wish to confirm that the IDs in a column in a parent dataset match the IDs in a column in a child dataset. Sometimes, transactional databases with <a href="https://docs.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints?view=sql-server-ver15" target="_blank">primary and foreign key constraints</a> serve to maintain the integrity of the IDs between datasets, but where the constraints are not enforced, you can define a custom metric to compare IDs between datasets and surface any discrepancies.

If you use Soda Cloud and have [connected it]({% link soda-cloud/connect_to_cloud.md %}) to your instance of Soda SQL, you can use a custom metric to explicitly send rows that contain referential inconsistencies to Soda Cloud. (Learn how to [examine failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.) 

Use the following custom metric template in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>First, the query gets the IDs from the child, or target dataset. </li>
        <li>Next, it gets the IDs from the parent, or reference dataset.</li>
        <li>Then, the query uses a <code>left join</code> to join the parent dataset onto the child dataset. If an ID exists in the child, but not in the parent, the record on the child dataset has a <code>null</code> value. Next, another <code>left join</code> joins the IDs back to the child/target dataset so that it can identify and send the failed rows for the ID inconsistencies to Soda Cloud.</li>
    </ul>
</details>

{% raw %}
```yaml
sql_metrics:
    - type: failed_rows
    - sql: |
        with target_table as (
          select
            {{column}} as id
          from {{ table_1 }}
        ),
        reference_table as (
          select
            {{column}} as id
          from {{ table_2 }}
        )
        select *
        from {{table_1}} as t
        left join reference_table p
          on trim(t.id) = trim(p.id)
        left join target_table tt
            on trim(tt.id) = trim(p.id)
        where p.id is null
```
{% endraw %}


## Compare values between datasets

To compare values in columns in different datasets in the same data source, use one of the following custom metric templates in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Use one of the following custom metric templates in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

If you use Soda Cloud and have [connected it]({% link soda-cloud/connect_to_cloud.md %}) to your instance of Soda SQL, you can use these custom metrics to explicitly send failed rows to Soda Cloud. (Learn how to [examine failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.) 

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

#### Compare numerical values

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>First, the query joins the two datasets whose contents you wish to compare using a common numerical ID column, then calculates the difference between the two numerical values and returns a percentage that indicates how different the values are. The statement takes into account the directionality of the calculation between datasets. It labels the join <code>dataset_join</code>, and the result of the calculation, <code>pcent_difference</code>. </li>
        <li>Then, it gets all the rows from <code>dataset_join</code> for which the calculated <code>pcent_difference</code> value exceeds the value you set for <code>acceptance_threshold</code>. This enables you to set a limit on what is an acceptable difference between values in the columns. If you want the values of the IDs to be equal, set the threshold to <code>0.0</code>. </li>
    </ul>
</details>

{% raw %}
```yaml
sql_metrics:
    - type: failed_rows
    - sql: |
        with dataset_join as (
            select
                d1.{{id_column_to_join_tables_on}} as row_id,
                d1.{{column}} as d1_column,
                d2.{{column}} as d2_column,
                case
                  when d1.{{column}} >= d2.{{column}}
                  then (d1.{{column}} - d2.{{column}})
                      / nullif(abs(d1.{{column}}::numeric), 0) * 100
                  when d1.{{column}} < d2.{{column}}
                  then (d2.{{column}} - d1.{{column}})
                      / nullif(abs(d2.{{column}}::numeric), 0) * 100
                  end
                as pcent_difference

            from {{table_1}} d1
            join {{table_2}} d2
                on d1.{{id_column_to_join_tables_on}} = d2.{{id_column_to_join_tables_on}}
        )
        select * from dataset_join
        where pcent_difference > {{acceptance_threshold}};
```
{% endraw %}

<br />

#### Compare non-numerical values

You can use this template for numerical values as well, but because it demands strict equality between ID values, it does not allow you to set an <code>acceptance_threshold</code> for acceptable discrepancy between values.  

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>First, the query joins the two datasets whose contents you wish to compare, then defines the identifiers to use to conduct the comparison between datasets. It labels the join <code>dataset_join</code>.</li>
        <li>Next, it defines how to compare values in the ID columns and that the result of the comparison, true or false, is named <code>is_equal</code>.</li>
        <li>Then, it identifies the datasets that contain the columns to compare.</li>
        <li>The test at the end collects all the rows from <code>dataset_join</code> that do not have equal values.</li>
        
    </ul>
</details>

{% raw %}
```yaml
sql_metrics:
    - type: failed_rows
    - sql: |
        with dataset_join as (
            select
                d1.{{id_column_to_join_on}} as row_id,
                d1.{{column}} as d1_column,
                d2.{{column}} as d2_column,
                case
                  when d1.{{column}} != d2.{{column}}
                  then False
                  else True
                  end
                as is_equal

            from {{table_1}} d1
            join {{table_2}} d2
                on d1.{{id_column_to_join_on}} = d2.{{id_column_to_join_on}}
        )
        select * from dataset_join where is_equal = False
```
{% endraw %}


## Compare datasets for equality

You can use a custom metric to compare two datasets in the same data source to assert that they are strictly identical. This template identifies rows that are present in one dataset but not in the other, and vice-versa. 

Use the following custom metric template in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>First, the query compares the values of the first dataset against the second to look for values that exist in the first dataset, but not the second. </li>
        <li>Next, the query compares the values of the second dataset against the first to look for values that exist in the second dataset, but not the first.  </li>
        <li>Lastly, the query adds another column to the dataset associated with the scan YAML file to indicate the direction of the inconsistency.</li>
    </ul>
</details>

{% raw %}
```yaml
sql_metrics:
    - sql: |
        with table_1_not_in_table_2 as (
          select 
            *
          from {{ table_1 }}
          except (distinct) //distinct is needed for Big Query
          select 
            *
          from {{ table_2 }}
        )
        , table_2_not_in_table_1 as (
          select
            *
          from {{ table_2 }}
          except (distinct) //distinct is needed for Big Query
          select
            *
          from {{ table_1 }}
        )
        select
          'found in table 1 but missing in table 2' as directionality,
          *
        from table_1_not_in_table_2
        union all
        select
          'found in table 2 but missing in table 1' as directionality,
          *
        from table_2_not_in_table_1
```
{% endraw %}


## Validate business logic at the row level

Use one of the following custom metric templates in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file to validate that data in records in your data source match your expectations. The first example is a skeletal query into which you can insert a variety of conditions; the others offer examples of how you might use the query. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

<details>
    <summary>Explain the SQL</summary>
      The query identifies a dataset in which to find records that do not meet the conditions you set. 
</details>

{% raw %}
```yaml
sql_metrics:
    - sql: |
        select 
          *
        from {{ table }}
        where not({{ condition_logic }})
```
{% endraw %}

<br />

#### Check the sum of column values

<details>
    <summary>Explain the SQL</summary>
      The query validates that the sum of two columns in a dataset matches the value in a third column, and identifies those rows which do not match.
</details>

{% raw %}
```yaml
sql_metrics:
    - sql: |
        select
          *
        from {{ table }}
        where not(credit_card_amount + wire_tranfer = total_order_value)
```
{% endraw %}

<br />

#### Confirm Paid in Full

<details>
    <summary>Explain the SQL</summary>
      The query validates that an order that is being paid for in installments will be fully paid by its deadline, and identifies those rows which do not meet the deadline.
</details>

{% raw %}
```yaml
sql_metrics:
    - sql: |
        select
          *
        from {{ table }}
        where not(
          full_payment_deadline < dateadd(
            month, number_of_installments, first_payment_date
            )
        )
```
{% endraw %}



## Check for incorrectly mapped values across columns

Where the contents of a dataset are not validated on entry, you may wish to assert that entries map correctly to standard values. For example, where end users enter a free-form value for a country field, you can use a SQL query to confirm that the entry maps correctly to an ISO country code, as in the following table. 

| country_name | country_code | 
| ----------   | ------------ |
| Holland      | NL |
| Netherlands  | NL  |
| Britain      | UK |
| United states  | USA |

If you use Soda Cloud and have [connected it]({% link soda-cloud/connect_to_cloud.md %}) to your instance of Soda SQL, you can use these custom metrics to explicitly send failed rows that contain distinct values in either column to Soda Cloud. (Learn how to [examine failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.) 

Use one of the following dialect-specific custom metric templates in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

![template-compatible-2](/assets/images/template-compatible-2.png){:height="112px" width="112px"}

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>The first query counts the number of rows in which the values in either column are distinct relative to the other column contents, and displays the number of distinct values (mappings that failed), or the full contents of the failed rows that contain distinct values. </li>
        <li>The second query is the same as the first, but displays only the distinct values that appear in either column.</li>
    </ul>
</details>

{% raw %}
```yaml
sql_metrics:
    - type: failed_rows
    - sql: |
        //this query returns distinct failed mappings or failed rows
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

<br />


![template-compatible-3](/assets/images/template-compatible-3.png){:height="155px" width="155px"}

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>The first query counts the number of rows in which the values in either column are distinct relative to the other column contents, and displays the number of distinct values (mappings that failed), or the full contents of the failed rows that contain distinct values. </li>
        <li>The second query is the same as the first, but displays only the distinct values that appear in either column.</li>
    </ul>
</details>

{% raw %}
```yaml
sql_metrics:
    - type: failed_rows
    - sql: |
        //this query returns failed rows
        select
            *,
        from {{table}}
        where 1 = 1
        qualify  count(*) over (partition by {{column_1}} order by {{column_2}}) > 1;

        // this query only returns the distinct failed mappings
        select distinct
            {{column_1}},
            {{column_2}}
        from {{table}}
        where 1 = 1
        qualify  count(*) over (partition by {{column_1}} order by {{column_2}}) > 1;
```
{% endraw %}

<br />


![template-compatible-4](/assets/images/template-compatible-4.png){:height="175px" width="175px"}

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>The first query counts the number of rows in which the values in either column are distinct relative to the other column contents, and displays the number of distinct values (mappings that failed), or the full contents of the failed rows that contain distinct values. </li>
        <li>The second query is the same as the first, but displays only the distinct values that appear in either column.</li>
    </ul>
</details>

{% raw %}
```yaml
sql_metrics:
    - type: failed_rows
    - sql: |
        //this query returns failed rows
        select 
            *
        from(
            select
                *,
                count({{column_2}}) over (partition by {{column_1}}) as number_duplicated_records_per_key
            from public.child_table
            ) as mapping_aggregations
        where number_duplicated_records_per_key > 1
        order by {{column_1}}, {{column_2}}
        ;

        // this query only returns the distinct failed mappings
        select distinct 
            {{column_1}}, 
            {{column_2}}
        from(
            select
                *,
                count({{column_2}}) over (partition by {{column_1}}) as number_duplicated_records_per_key
            from public.child_table
            ) as mapping_aggregations
        where number_duplicated_records_per_key > 1
        order by {{column_1}}, {{column_2}}
        ;
```
{% endraw %}


## Compare row count between datasets

You can use custom metrics to compare row counts between datasets in the same data source. Use one of the following custom metric templates in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own relevant values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

#### Validate that row counts are equal

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>First, the query counts the number of rows in another dataset in your data source, and labels the value <code>other_row_count</code>. This example uses SQL metrics to create a new, custom metric, <code>other_row_count</code>, that it will use in a Soda test immediately following.</li>
        <li>Then, the Soda test compares the row count value of the dataset associated with the scan YAML file to the row count value of the other table that the custom query collected. If the two are not equal, the test fails.</li>
        <li></li>
    </ul>
</details>

```yaml
sql_metric: 
  sql: |
    SELECT COUNT(*) as other_row_count
    FROM other_table
  tests:
    - row_count == other_row_count
```

<br />

#### Set an acceptable threshold for row count delta

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>First, the query counts the rows in each of two datasets.</li>
        <li>Next, it defines an intermediate table to store the temporary row count values for each table so it can use those values in a calculation.</li>
        <li>Then, the query uses the data in the intermediate table to perform a calculation that compares the row count values of the datasets and produces a value that represents the difference in the number of rows, which it labels <code>row_delta</code>.</li>
        <li>Lastly, it compares the value it calculated for <code>row_delta</code> to the value you set for <code>acceptance_threshold</code>, or the amount of row count inconsistency you are willing to accept between datasets. If you want the row count values to be equal, set the threshold to <code>0.0</code>. </li>
    </ul>
</details>

{% raw %}
```yaml
    sql_metrics:
        - type: failed_rows
        - sql: |
            with table1 as (
              select count(*) as table_1_rows from {{table_1}}
            ), 
            table2 as (
              select count(*) as table_2_rows from {{table_2}}
            ),
            intermediate as (
              select 
                (select table_1_rows from table1) as table_1_rows,
                (select table_2_rows from table2) as table_2_rows
            ),
            difference_calculation as (
              select 
                case 
                  when table_1_rows >= table_2_rows
                    then table_1_rows - table_2_rows
                  when table_1_rows < table_2_rows
                    then table_2_rows - table_1_rows
                  end
                as row_delta
              from intermediate
            )
            select row_delta
            from difference_calculation
            where row_delta > {{ acceptance_threshold }}
```
{% endraw %}


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Read more about using [custom metrics in Soda SQL]({% link soda-sql/sql_metrics.md %}#custom-metrics) and [custom metrics in Soda Cloud]({% link soda-cloud/monitors.md %}#metric-types).
* See [Examples of tests using built-in metrics]({% link soda-sql/examples-by-metric.md %})
* Read more about [Failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.