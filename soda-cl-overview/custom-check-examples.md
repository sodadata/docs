---
description: >-
  If the built-in metrics that SodaCL offers do not quite cover your more
  specific or complex needs, you can define your own metrics. See examples to
  copy+paste.
---

# Custom check examples

Out of the box, Soda Checks Language (SodaCL) makes several built-in metrics and checks, such as `row_count`, available for you to use to define checks for data quality. If the built-in metrics that Soda offers do not quite cover some of your more specific or complex needs, you can use [user-defined](../sodacl-reference/user-defined.md) and [failed rows checks](../sodacl-reference/failed-rows-checks.md).

**User-defined checks** and **failed rows checks** enable you to define your own metrics that you can use in a SodaCL check. You can also use these checks to simply define SQL queries or Common Table Expressions (CTE) that Soda executes during a scan, which is what most of these examples do.

The examples below offer examples of how you can define user-defined checks in your checks YAML file, if using Soda Library or, if using Soda Cloud, within a no-code SQL Failed Rows check or an agreement, to extract more complex, customized, business-specific measurements from your data.

***

## Set an acceptable threshold for row count delta

Though you can use a built-in [cross check](../sodacl-reference/cross-row-checks.md) to compare row counts between dataset in the same, or different, data sources, you may wish to add a little more complexity to the comparison, as in the following example. Replace the values in the double curly braces \{{ \}} with your own relevant values.

If you want to compare row counts between two datasets and allow for some acceptable difference between counts, use the following query.

✅ Amazon Redshift  \
✅ GCP BigQuery  \
✅ PostgreSQL  \
✅ Snowflake

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

<details>

<summary>Explain the SQL</summary>

* First, the query counts the rows in each of two datasets.
* Next, it defines an intermediate table to store the temporary row count values for each table so it can use those values in a calculation.
* Then, the query uses the data in the intermediate table to perform a calculation that compares the row count values of the datasets and produces a value that represents the difference in the number of rows, which it labels `row_delta`.
* Lastly, it captures the value it calculated for `row_delta` to compare to the value you set for `acceptance_threshold` in the user-defined check, or the amount of row count inconsistency you are willing to accept between datasets. If you want the row count values to be equal, set the threshold to `0.0`.

</details>

## Find duplicates in a dataset without a unique ID column

You can use the built-in [duplicate\_count metric](../sodacl-reference/numeric-metrics.md) to check the contents of a column for duplicate values and Soda automatically sends any failed rows – that is, rows containing duplicate values – to Soda Cloud for you to [examine](../run-a-scan/failed-row-samples.md).

However, if your dataset does not contain a unique ID column, as with a denormalized dataset or a dataset produced from several joins, you may need to define uniqueness using a combination of columns. This example uses a failed rows check with SQL queries to go beyond a simple, single-column check. Replace the values in the double curly braces \{{ \}} with your own relevant values.

Ideally, you would generate a [surrogate key](https://en.wikipedia.org/wiki/Surrogate_key) from the concatenation of columns as part of a transformation, such as with this dbt Core™ utility that [generates a `surrogate_key`](https://github.com/dbt-labs/dbt-utils#surrogate_key-source). However, if that is not possible, you can use the following example to test for uniqueness using a [composite key](https://en.wikipedia.org/wiki/Composite_key).

✅ Amazon Redshift  \
✅ GCP BigQuery  \
✅ PostgreSQL  \
✅ Snowflake

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

<details>

<summary>Explain the SQL</summary>

* First, the `duplicated_records` [common table expression (CTE)](https://en.wikipedia.org/wiki/Hierarchical_and_recursive_queries_in_SQL#Common_table_expression) lists all of the IDs that appear more than once in a dataset, allowing for a pattern that asserts uniqueness using more than one column. The example uses two columns but you can add as many as you need. If you add more, be sure to add them to the join at the end of the query.
* Next, it joins the `duplicated_records` back to the dataset itself so that it can identify and send the failed rows for those duplicate IDs to Soda Cloud.

</details>

## Validate business logic at the row level

Use one of the following examples to validate that data in records in your data source match your expectations.

The first example is a skeletal query into which you can insert a variety of conditions; the others offer examples of how you might use the query. Replace the values in the double curly braces \{{ \}} with your own relevant values.

✅ Amazon Redshift   ✅ GCP BigQuery   ✅ PostgreSQL   ✅ Snowflake

```yaml
checks for dim_product:
  - failed rows: 
      fail condition: not({{ condition_logic }})
```

<details>

<summary>Explain the SQL</summary>

The CTE identifies a dataset in which to find records that do not meet the conditions you set in the `not` expression.

</details>

#### Check the sum of column values

✅ Amazon Redshift   ✅ GCP BigQuery   ✅ PostgreSQL   ✅ Snowflake

```yaml
checks for dim_product:
  - failed rows: 
      fail condition: not(full_payment_deadline < dateadd(month, number_of_installments, first_payment_date))
```

<details>

<summary>Explain the SQL</summary>

The CTE validates that the sum of two columns in a dataset matches the value in a third column, and identifies those rows which do not match.

</details>

**Confirm Paid in Full**

✅ Amazon Redshift   ✅ GCP BigQuery   ✅ PostgreSQL   ✅ Snowflake

```yaml
checks for dim_product:
  - failed rows: 
      fail condition: not(full_payment_deadline < dateadd(month, number_of_installments, first_payment_date))
```

<details>

<summary>Explain the SQL</summary>

The CTE validates that an order that is being paid for in installments will be fully paid by its deadline, and identifies those rows which do not meet the deadline.

</details>

### Check for incorrectly mapped values across columns <a href="#check-for-incorrectly-mapped-values-across-columns" id="check-for-incorrectly-mapped-values-across-columns"></a>

Where a dataset does not validate its contents on entry, you may wish to assert that entries map correctly to standard values. For example, where end users enter a free-form value for a country field, you can use a SQL query to confirm that the entry maps correctly to an ISO country code, as in the following table.

| country\_name | country\_code |
| ------------- | ------------- |
| Holland       | NL            |
| Netherlands   | NL            |
| Britain       | GB            |
| United states | US            |

Use one of the following **data source-specific** custom metric examples in your checks YAML file. Replace the values in the double curly braces \{{ \}} with your own relevant values.

✅ Amazon Redshift   ✅ PostgreSQL

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

<details>

<summary>Explain the SQL</summary>

* The first query counts the number of rows in which the values in either column are distinct relative to the other column contents, and displays the full contents of the failed rows that contain distinct values.
* The second query is the same as the first, but displays only the distinct values that appear in either column.

</details>

\


✅ GCP BigQuery  

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

<details>

<summary>Explain the SQL</summary>

* The first query counts the number of rows in which the values in either column are distinct relative to the other column contents, and displays the full contents of the failed rows that contain distinct values.
* The second query is the same as the first, but displays only the distinct values that appear in either column.

</details>

\


✅ Snowflake

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

<details>

<summary>Explain the SQL</summary>

* The first query counts the number of rows in which the values in either column are distinct relative to the other column contents, and displays the full contents of the failed rows that contain distinct values.
* The second query is the same as the first, but displays only the distinct values that appear in either column.

</details>

### Compare dates to validate event sequence <a href="#compare-dates-to-validate-event-sequence" id="compare-dates-to-validate-event-sequence"></a>

You can use a user-defined metric to compare date values in the same dataset. For example, you may wish to compare the value of `start_date` to `end_date` to confirm that an event does not end before it starts, as in the second line, below.

```
index ; start_date ; end_date
1 ; 2020-01-01 ; 2021-03-13
2 ; 2022-01-01 ; 2019-03-13
```

✅ GCP BigQuery  

```yaml
checks for exchange_operations:
  - UpdatedDateOk = 1:
    name: Verify that, if there is an update date, it is grater than the creation date
    UpdatedDateOk query: |
        SELECT
            CASE
            WHEN (updated_at_ts > '2017-10-01' AND updated_at_ts < current_timestamp AND updated_at_ts >= created_at_ts) OR updated_at_ts is NULL THEN 1
            ELSE 0
            END as rdo
        FROM exchange_operations
```

### Go further <a href="#go-further" id="go-further"></a>

* Learn more about [Comparing data using SodaCL](compare.md).
* Read more about [Failed row samples](../run-a-scan/failed-row-samples.md) in Soda Cloud.

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
