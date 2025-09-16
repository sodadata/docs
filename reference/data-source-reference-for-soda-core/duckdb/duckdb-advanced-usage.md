# DuckDB advanced usage

Soda supports DuckDB as a flexible, lightweight SQL engine that can be used with files and in-memory  data frames such as Pandas and Polars.

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-duckdb
```

### From Pandas DataFrame

```python
import pandas as pd
import duckdb
from soda_core.contracts import verify_contracts_locally
from soda_duckdb import DuckDBDataSource

df = pd.read_parquet("adventureworks.parquet")
conn = duckdb.connect(database=":memory:")
cursor = conn.cursor()
cursor.register(view_name="adventureworks", python_object=df)

result = verify_contracts_locally(
    data_sources=[DuckDBDataSource.from_existing_cursor(cursor, name="duckdb")],
    contract_file_paths=["adventureworks.yml"]
)
```

***

### From Polars DataFrame

```python
import polars as pl
import duckdb
from soda_core.contracts import verify_contracts_locally
from soda_duckdb import DuckDBDataSource

df = pl.read_parquet("adventureworks.parquet")
conn = duckdb.connect(database=":memory:")
cursor = conn.cursor()
cursor.register(view_name="adventureworks", python_object=df)

result = verify_contracts_locally(
    data_sources=[DuckDBDataSource.from_existing_cursor(cursor, name="duckdb")],
    contract_file_paths=["adventureworks.yml"]
)
```

***

### In-Memory with DuckDB SQL

<pre class="language-python"><code class="lang-python"><strong>import duckdb
</strong>from soda_core.contracts import verify_contracts_locally
from soda_duckdb import DuckDBDataSource

db_connection = duckdb.connect(database=":memory:")
cursor = db_connection.cursor()

cursor.execute("CREATE SCHEMA analytics")
cursor.execute("CREATE TABLE analytics.adventureworks AS SELECT * FROM read_parquet('adventureworks.parquet')")

result = verify_contracts_locally(
    data_sources=[DuckDBDataSource.from_existing_cursor(cursor, name="duckdb")],
    contract_file_paths=["adventureworks.yml"]
)
</code></pre>

***

### Data from Parquet File

You can point directly to a `.parquet` file as a DuckDB "database":

```yaml
type: duckdb
name: duckdb
connection:
  database: "adventureworks.parquet"
```

Then you can verify a contract on this database using the CLI:

```bash
soda contract verify -ds ds.yml -c adventureworks.yml
```

Or Python API:

```
from soda_core.contracts import verify_contracts_locally

result = verify_contracts_locally(
    data_source_file_path="ds.yml",
    contract_file_paths=["adventureworks.yml"]
)
```
