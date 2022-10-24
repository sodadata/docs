## Test the data source connection

To confirm that you have correctly configured the connection details for the data source(s) in your configuration YAML file, use the `test-connection` command. If you wish, add a `-V` option to the command to returns results in verbose mode in the CLI.

```shell
soda test-connection -d my_datasource -c configuration.yml -V
```
