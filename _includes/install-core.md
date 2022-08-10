## Compatibility

Use Soda Core to scan a variety of data sources.<br />

<table>
  <tr>
    <td>Amazon Athena<br /> Amazon Redshift<br />  Apache Spark DataFrames<sup>1</sup><br /> GCP Big Query<br /> IBM DB2</td>
    <td>MS SQL Server<br /> MySQL<br > PostgreSQL<br /> Snowflake<br /> </td>
  </tr>
</table>
<sup>1</sup> For use with [programmatic Soda scans]({% link soda-core/programmatic.md %}), only.

## Requirements

To use Soda Core, you must have installed the following on your system.

* Python 3.8 or greater. To check your existing version, use the CLI command: `python --version` or `python3 --version` <br /> 
If you have not already installed Python, consider using <a href="https://github.com/pyenv/pyenv/wiki" target="_blank">pyenv</a> to manage multiple versions of Python in your environment.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`

## Install

1. Best practice dictates that you install the Soda Core CLI using a virtual environment. In your command-line interface tool, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command.
```shell
python -m venv .venv
source .venv/bin/activate
```
2. Upgrade pip inside your new virtual environment.
```shell
pip install --upgrade pip
```
3. Execute the following command, replacing `soda-core-postgres` with the install package that matches the type of data source you use to store data.
```shell
pip install soda-core-postgres
```

| Data source | Install package | 
| ----------- | --------------- | 
| Amazon Athena | soda-core-athena |
| Amazon Redshift | soda-core-redshift | 
| Apache Spark Dataframe <br /> (For use with [programmatic Soda scans]({% link soda-core/programmatic.md %}), only.) | soda-core-spark-df |
| GCP Big Query | soda-core-bigquery | 
| IBM DB2 | soda-core-db2 |
| MS SQL Server<sup>2</sup> | soda-core-sqlserver |
| MySQL | soda-core-mysql |
| PostgreSQL | soda-core-postgres |
| Snowflake | soda-core-snowflake | 

<sup>2</sup> *Known issue:* Connections to MS SQL Server do not support checks that use regex, such as with [missing metrics]({% link soda-cl/missing-metrics.md %}#list-of-missing-metrics) or [validity metrics]({% link soda-cl/validity-metrics.md %}#list-of-validity-metrics). <!--CORE-211-->

To deactivate the virtual environment, use the following command:
```shell
deactivate
```

