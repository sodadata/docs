
<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">MacOS, Linux</label>
  <label class="tab" id="two-tab" for="two">Windows</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

1. Ensure that you have the following prerequisites installed in your environment.
* Python 3.8 or greater. To check your existing version, use the CLI command: `python --version` or `python3 --version` <br /> 
If you have not already installed Python, consider using <a href="https://github.com/pyenv/pyenv/wiki" target="_blank">pyenv</a> to manage multiple versions of Python in your environment.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`
2. Best practice dictates that you install Soda using a virtual environment. In Terminal, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command.
```shell
python -m venv .venv
source .venv/bin/activate
```
3. Upgrade pip inside your new virtual environment.
```shell
pip install --upgrade pip
```
4. Execute the following command, replacing `soda-core-postgres` with the install package that matches the type of data source you use to store data; expand **Soda packages** link below for a complete list.
```shell
pip install soda-core-postgres
```
<details>
    <summary style="color:#00BC7E">Soda packages</summary>
<table>
<thead>
<tr>
<th>Data source</th>
<th>Install package</th>
</tr>
</thead>
<tbody>
<tr>
<td>Amazon Athena</td>
<td><code>soda-core-athena</code></td>
</tr>
<tr>
<td>Amazon Redshift</td>
<td><code>soda-core-redshift</code></td>
</tr>
<tr>
<td>Apache Spark DataFrames <br /> (For use with <a href="{% link soda-core/programmatic.md %}">programmatic Soda scans</a>, only.)</td>
<td><code>soda-core-spark-df</code></td>
</tr>
<tr>
<td>Azure Synapse (Experimental)</td>
<td><code>soda-core-sqlserver</code></td>
</tr>
<tr>
<td>ClickHouse (Experimental)</td>
<td><code>soda-core-mysql</code></td>
</tr>
<tr>
<td>Dask and Pandas (Experimental)</td>
<td><code>soda-core-pandas-dask</code></td>
</tr>
<tr>
<td>Databricks</td>
<td><code>soda-core-spark[databricks]</code></td>
</tr>
<tr>
<td>Denodo (Experimental)</td>
<td><code>soda-core-denodo</code></td>
</tr>
<tr>
<td>Dremio</td>
<td><code>soda-core-dremio</code></td>
</tr>
<tr>
<td>DuckDB (Experimental)</td>
<td><code>soda-core-duckdb</code></td>
</tr>
<tr>
<td>GCP Big Query</td>
<td><code>soda-core-bigquery</code></td>
</tr>
<tr>
<td>IBM DB2</td>
<td><code>soda-core-db2</code></td>
</tr>
<tr>
<td>Local file</td>
<td>Use Dask.</td>
</tr>
<tr>
<td>MS SQL Server</td>
<td><code>soda-core-sqlserver</code></td>
</tr>
<tr>
<td>MySQL</td>
<td><code>soda-core-mysql</code></td>
</tr>
<tr>
<td>OracleDB</td>
<td><code>soda-core-oracle</code></td>
</tr>
<tr>
<td>PostgreSQL</td>
<td><code>soda-core-postgres</code></td>
</tr>
<tr>
<td>Snowflake</td>
<td><code>soda-core-snowflake</code></td>
</tr>
<tr>
<td>Trino</td>
<td><code>soda-core-trino</code></td>
</tr>
<tr>
<td>Vertica (Experimental)</td>
<td><code>soda-core-vertica</code></td>
</tr>
</tbody>
</table>
</details>

To deactivate the virtual environment, use the following command:
```shell
deactivate
```


  </div>
  <div class="panel" id="two-panel" markdown="1">

1. Ensure that you have the following prerequisites installed in your environment.
* Python 3.8 or greater. To check your existing version, use the CLI command: `python --version` or `python3 --version` <br /> 
If you have not already installed Python, consider using <a href="https://github.com/pyenv/pyenv/wiki" target="_blank">pyenv</a> to manage multiple versions of Python in your environment.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`
2. Best practice dictates that you install Soda using a virtual environment. In Terminal, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command. Refer to the <a href="https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script" target="_blank">virtualenv documentation</a> for activating a Windows script.
```shell
python -m venv .venv
.venv\Scripts\activate
```
3. Upgrade pip inside your new virtual environment.
```shell
pip install --upgrade pip
```
4. Execute the following command, replacing `soda-core-postgres` with the install package that matches the type of data source you use to store data; expand **Soda packages** link below for a complete list.
```shell
pip install soda-core-postgres
```
<details>
    <summary style="color:#00BC7E">Soda packages</summary>
<table>
<thead>
<tr>
<th>Data source</th>
<th>Install package</th>
</tr>
</thead>
<tbody>
<tr>
<td>Amazon Athena</td>
<td><code>soda-core-athena</code></td>
</tr>
<tr>
<td>Amazon Redshift</td>
<td><code>soda-core-redshift</code></td>
</tr>
<tr>
<td>Apache Spark DataFrames <br /> (For use with <a href="{% link soda-core/programmatic.md %}">programmatic Soda scans</a>, only.)</td>
<td><code>soda-core-spark-df</code></td>
</tr>
<tr>
<td>Azure Synapse (Experimental)</td>
<td><code>soda-core-sqlserver</code></td>
</tr>
<tr>
<td>ClickHouse (Experimental)</td>
<td><code>soda-core-mysql</code></td>
</tr>
<tr>
<td>Dask and Pandas (Experimental)</td>
<td><code>soda-core-pandas-dask</code></td>
</tr>
<tr>
<td>Databricks</td>
<td><code>soda-core-spark[databricks]</code></td>
</tr>
<tr>
<td>Denodo (Experimental)</td>
<td><code>soda-core-denodo</code></td>
</tr>
<tr>
<td>Dremio</td>
<td><code>soda-core-dremio</code></td>
</tr>
<tr>
<td>DuckDB (Experimental)</td>
<td><code>soda-core-duckdb</code></td>
</tr>
<tr>
<td>GCP Big Query</td>
<td><code>soda-core-bigquery</code></td>
</tr>
<tr>
<td>IBM DB2</td>
<td><code>soda-core-db2</code></td>
</tr>
<tr>
<td>Local file</td>
<td>Use Dask.</td>
</tr>
<tr>
<td>MS SQL Server</td>
<td><code>soda-core-sqlserver</code></td>
</tr>
<tr>
<td>MySQL</td>
<td><code>soda-core-mysql</code></td>
</tr>
<tr>
<td>OracleDB</td>
<td><code>soda-core-oracle</code></td>
</tr>
<tr>
<td>PostgreSQL</td>
<td><code>soda-core-postgres</code></td>
</tr>
<tr>
<td>Snowflake</td>
<td><code>soda-core-snowflake</code></td>
</tr>
<tr>
<td>Trino</td>
<td><code>soda-core-trino</code></td>
</tr>
<tr>
<td>Vertica (Experimental)</td>
<td><code>soda-core-vertica</code></td>
</tr>
</tbody>
</table>
</details>

To deactivate the virtual environment, use the following command:
```shell
deactivate
```

Refer to the <a href="https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script" target="_blank">virtualenv documentation</a> for deactivating a Windows script.

  </div>
  </div>
</div>