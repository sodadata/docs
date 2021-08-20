---
layout: default
title: Custom metric templates
parent: Soda SQL
---

# Custom metric templates

A **metric** is a property of the data in your database. A **measurement** is the value for a metric that Soda checks against during a scan. You use metrics to define the tests that Soda executes against your data during a scan. For example, in a test defined as `row_count > 0`, `row_count` is the metric and `0` is the measurement. If the `row_count` of a dataset is not greater than `0`, the test fails. 

Out of the box, Soda make several built-in metrics,such as `row_count`, available for you to use to write tests. If the built-in metrics that Soda offers do not quite give you the information you need from a scan, you can create **custom metrics**. Custom metrics, also known as SQL metrics, enable you to define your own metric using SQL queries. Essentially, you use SQL to define your metric, then use your new, custom metric in a test that Soda executes during a scan.  

* Read more about using [custom metrics in Soda SQL]({% link soda-sql/sql_metrics.md %}#custom-metrics).
* Read more about using [custom metrics in Soda Cloud]({% link soda-cloud/monitors.md %}#metric-types).

The templates below offer examples of how you can define custom metrics in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file to extract more complex, customized measurements from your data. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own dataset values.

[Display duplicate values](#display-duplicate-values)<br />
[Go further](#go-further)<br />


## Display duplicate values

Though you can use the built-in metric `duplicate_count` to test the contents of a column of unique IDs for duplicate values, a test passes or fails according the number of duplicate values that exist. In other words, the metric reveals how many rows have duplicate content, but not which rows. (See an [example]({% link soda-sql/examples-by-metric.md %}#duplicate_count) of a test that uses `duplicate_count`.)

If you use Soda Cloud and have [connected it]({% link soda-cloud/connect_to_cloud.md %}) to your instance of Soda SQL, you can use a custom metric to explicitly send rows that contain duplicate IDs to Soda Cloud. (Learn how to [examine failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.) 

Use one of the following custom metric templates in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own dataset values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

#### Dataset contains a unique ID column

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>The first <a href="https://en.wikipedia.org/wiki/Hierarchical_and_recursive_queries_in_SQL#Common_table_expression" target="_blank">common table expression (CTE)</a> lists all the IDs in the <code>id_column</code> that appear more than once in the column. </li>
        <li>The second CTE joins those IDs, if any, back to the dataset itself so that it can identify and send the full row content for only those duplicate IDs to Soda Cloud. </li>
    </ul>
</details>

{% raw %}
```yaml
id_column:
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
          tests:
            - duplicated_records == 0
``` 
{% endraw %}

<br />
<br />

#### Dataset does not contain a unique ID column

If your dataset does not contain a unique ID column, as with a denormalized dataset or a dataset produced from several joins, you may need to define uniqueness using a combination of columns. Ideally, you would generate a <a href="https://en.wikipedia.org/wiki/Surrogate_key" target="_blank"> surrogate key</a> from the concatenation of columns as part of a transformation, but if that is not possible, you can use the following template to test for uniqueness across a <a href="https://en.wikipedia.org/wiki/Composite_key" target="_blank">composite key</a>.

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>The first <a href="https://en.wikipedia.org/wiki/Hierarchical_and_recursive_queries_in_SQL#Common_table_expression" target="_blank">common table expression (CTE)</a> lists all the IDs that appear more than once in a dataset, allowing for a pattern that asserts uniqueness using more than one column. The template uses two columns but you can add as many as you need.</li>
        <li>The second CTE joins those IDs, if any, back to the dataset itself so that it can identify and send the full row content for only those duplicate IDs to Soda Cloud. </li>
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
          tests:
            - duplicated_records == 0
```
{% endraw %}


## Confirm the referential integrity of IDs between datasets

You can define a custom metric that confirms referential integrity between identifiers in two separate datasets. For example, you may wish to confirm that the IDs in a column in a parent dataset match the IDs in a column in a child dataset. Sometimes, transactional databases with <a href="https://docs.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints?view=sql-server-ver15" target="_blank">primary and foreign key constraints</a> serve to maintain the integrity of the IDs between datasets, but where the constraints are not enforced, you can define a custom metric to compare IDs between datasets and surface any discrepancies.

If you use Soda Cloud and have [connected it]({% link soda-cloud/connect_to_cloud.md %}) to your instance of Soda SQL, you can use a custom metric to explicitly send rows that contain referential inconsistencies to Soda Cloud. (Learn how to [examine failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.) 

Use the following custom metric template in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own dataset values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>The first <a href="https://en.wikipedia.org/wiki/Hierarchical_and_recursive_queries_in_SQL#Common_table_expression" target="_blank">common table expression (CTE)</a> gets the IDs from the child, or target dataset. </li>
        <li>The second CTE gets the IDs from the parent, or reference dataset.</li>
        <li>The third CTE uses a <code>left join</code> to join the parent dataset onto the child dataset. If an ID exists in the child, but not in the parent, the record on the child dataset has a <code>null</code> value. Next, another <code>left join</code> joins the IDs back to the child/target dataset so that it can identify and send the full row content for the ID inconsistencies to Soda Cloud.</li>
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
          tests:
            - ??
```
{% endraw %}


## Compare values between datasets

To compare values in columns in different datasets in the same data source, use one of the following custom metric templates in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Use one of the following custom metric templates in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own dataset values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

#### Compare numerical values

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>The first <a href="https://en.wikipedia.org/wiki/Hierarchical_and_recursive_queries_in_SQL#Common_table_expression" target="_blank">common table expression (CTE)</a> joins the two datasets you wish to compare using a common numerical ID column, then calculates the difference between the two numerical values and returns a percentage that indicates how different the values are. The statement take into account the directionality of the calculation between datasets.</li>
        <li>The second CTE enables you to enter a value for <code>acceptance_threshold</code> so that you can set a limit on what is an acceptable difference between values in the columns. If you want the values of the IDs to be equal, set the threshold to <code>0.0</code>. </li>
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
          tests:
            -  ??
```
{% endraw %}

<br />
<br />

#### Compare non-numerical values

You can use this template for numerical values as well, but because it demands strict equality between ID values, it does not allow to you set an <code>acceptance_threshold</code> for acceptable discrepancy between values.  

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>The first <a href="https://en.wikipedia.org/wiki/Hierarchical_and_recursive_queries_in_SQL#Common_table_expression" target="_blank">common table expression (CTE)</a> defines a join, <code>dataset_join</code>, and the identifiers to use to conduct the comparison between datasets. Then, it defines how to compare values in the ID columns and that the result of the comparison, true or false, is named <code>is_equal</code>. Lastly, it identifies the datasets that contain the columns to compare.</li>
        <li>The second CTE collects all the rows from <code>dataset_join</code> that do not have equal values.</li>
        
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
          tests:
            -  ??
```
{% endraw %}


## Compare datasets for equality

You can use a custom metric to compare two datasets in the same data source to assert that they are strictly identical. This template identifies rows that are present in one dataset but not in the other, and vice-versa. 

Use the following custom metric template in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own dataset values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li>First, the query compares the values of the first dataset against the second to look for values that exist in the first dataset, but not the second. </li>
        <li>Next, the query compares the values of the second dataset against the first to look for values that exist in the second dataset, but not the first.  </li>
        <li>Lastly, the query adds another column to the dataset to indicate the direction of the inconsistency.</li>
    </ul>
</details>

{% raw %}
```yaml
    sql_metrics:
        - type: failed_rows
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
          tests:
            -  ??
```
{% endraw %}


## Validate business logic at row level



Use the following custom metric template in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own dataset values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</details>

{% raw %}
```yaml
    sql_metrics:
        - type: failed_rows
        - sql: |

          tests:
            -  ??
```
{% endraw %}


## Map values across columns



Use the following custom metric template in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own dataset values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</details>

{% raw %}
```yaml
    sql_metrics:
        - type: failed_rows
        - sql: |

          tests:
            -  ??
```
{% endraw %}



## Compare row count between datasets



Use the following custom metric template in your [scan YAML]({% link soda-sql/scan-yaml.md %}) file. Replace the values in the double curly braces {%raw %} {{ }} {% endraw %} with your own dataset values.

![template-compatible-1](/assets/images/template-compatible-1.png){:height="170px" width="170px"}

<details>
    <summary>Explain the SQL</summary>
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</details>

{% raw %}
```yaml
    sql_metrics:
        - type: failed_rows
        - sql: |

          tests:
            -  ??
```
{% endraw %}


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Read more about using [custom metrics in Soda SQL]({% link soda-sql/sql_metrics.md %}#custom-metrics) and [custom metrics in Soda Cloud]({% link soda-cloud/monitors.md %}#metric-types).
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.