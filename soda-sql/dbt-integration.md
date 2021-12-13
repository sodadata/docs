---
layout: default
title: dbt Integration
parent: Soda SQL
redirect_from: /soda-sql/documentation/dbt-integration.html
---
<!--TODO: should this move to its own rubrik? Like under an integrations tab? It kind of spans across soda-sql and soda cloud so it could be confusing as to why we have it under either one of those products...-->

# dbt Integration
If you have devoted a lot of your time in implementing tests on your models in dbt, you might not want to have to implement them in soda-sql. Since the Soda Cloud ecosystem provides you with much more than testing such as visualizing your data quality over time, managing alerts and incidents and integrating with catalogs it's only natural that you should be able to make the results from the tests you wrote in dbt also flow into that ecosystem.

## Ingest dbt test results
Soda allows you to **ingest** the results of your dbt tests into Soda Cloud so you can leverage all of the Soda features.

Test ingestion works directly on the files that dbt gererates when it builds or tests models. When you call Soda's ingestion integration, it reads the information from there and maps it onto the relevant datasets in Soda Cloud.

If the datasets don't exist already, they will be created.

In the end, you will see very little difference between test results that are coming from Soda SQL vs. ingested from dbt.

<ADD A SCREEENCAP>

To ingest test results from dbt:
1. Run your dbt pipeline this could be via the [`dbt build`](https://docs.getdbt.com/reference/commands/build) or [`dbt test`](https://docs.getdbt.com/reference/commands/test) commands as they both make sure that your dbt tests are ran.
2. Call dbt ingest with the following command:
```
soda ingest --tool dbt --dbt-manifest <path to manifest.json> --dbt-run-results <path to run_results.json>
```

## View dbt test results in Soda Cloud
ADD STUFF HERE WHEN THE FRONTEND IS DONE


# Caveats & Gotchas
Here are a few things to know:

## The scan time of a test ingested from dbt is equal to its ingestion time.
Because of current technical limitations the "Scan Time" that you can see in Soda Cloud for a test that is ingested from dbt correspongs to the time at which `soda ingest` was called.

## Currently neither `soda scan` nor `dbt run` can trigger each other
In order to ingest your test results from dbt you will need to explicitly call `soda ingest`. There is currently no way to call an ingestion from a `dbt test` run or to call `dbt test` from a `soda scan` run. 

That being said, we're looking into the possibility of leveraging dbt's `post_hooks` mechanism. <ADD GITHUB ISSUE LINK>

# Go further
Now that you have ingested your dbt tests in the Soda Cloud platform, you might want to learn how to leverage the following:
- alerts (LINK)
- incident management (LINK)
