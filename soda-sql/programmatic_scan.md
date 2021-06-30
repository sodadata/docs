---
layout: default
title: Configure programmatic scans
parent: Soda SQL
redirect_from: /soda-sql/documentation/programmatic_scan.html
---

# Configure programmatic scans

To automate the search for "bad" data, you can use the **Soda SQL Python library** to programmatically execute [scans]({% link soda/glossary.md %}#scan).

Based on a set of conditions or a specific event schedule, you can instruct Soda SQL to automatically scan a [warehouse]({% link soda/glossary.md %}#warehouse) [table]({% link soda/glossary.md %}#table) for “bad” data. For example, you may wish to scan your data at several points along your data pipeline, perhaps when new data enters a warehouse, after it is transformed, and before it is exported to another warehouse.

You can save Soda SQL scan results anywhere in your system; the `scan_result` object contains all the scan result information.

Execute a programmatic scan based on Soda SQL's default directory structure:

```python
scan_builder = ScanBuilder()
scan_builder.scan_yml_file = 'tables/my_table.yml'
# scan_builder automatically finds the warehouse.yml in the parent directory of the scan YAML file
# scan_builder.warehouse_yml_file = '../warehouse.yml'
scan = scan_builder.build()
scan_result = scan.execute()
if scan_result.has_test_failures():
    print('Scan has test failures, stop the pipeline')
```

Execute a programmatic scan using dicts:

```python
scan_builder = ScanBuilder()
scan_builder.warehouse_yml_dict = {
    'name': 'my_warehouse_name',
    'connection': {
        'type': 'snowflake',
        ...
    }
}
scan_builder.scan_yml_dict = {
    ...
}
scan = scan_builder.build()
scan_result = scan.execute()
if scan_result.has_test_failures():
    print('Scan has test failures, stop the pipeline')
```

## Go further

- Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).
- Learn more about [Warehouse]({% link soda-sql/warehouse.md %}) and [Scan]({% link soda-sql/scan-yaml.md %}) YAML files.
- Learn how to integrate Soda SQL with a [data orchestration tool]({% link soda-sql/orchestrate_scans.md %}).
- Need help? <a href="http://community.soda.io/slack" target="_blank">Join our Slack community</a> to ask a question.

<br />

---
Last modified on {% last_modified_at %}

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.