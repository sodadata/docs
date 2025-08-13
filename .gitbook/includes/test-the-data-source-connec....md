---
title: Test the data source connec...
---

# Test the data source connection <a href="#test-the-data-source-connection" id="test-the-data-source-connection"></a>

To confirm that you have correctly configured the connection details for the data source(s) in your configuration YAML file, use the `test-connection` command. If you wish, add a `-V` option to the command to return results in verbose mode in the CLI.

```sh
soda test-connection -d my_datasource -c configuration.yml -V
```
