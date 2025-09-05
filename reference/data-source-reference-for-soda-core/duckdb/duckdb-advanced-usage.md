# DuckDB advanced usage

Soda supports DuckDB as a flexible, lightweight SQL engine that can be used with native `.duckdb` files, in-memory data, or external dataframes such as Pandas and Polars.

Install the following package:

```
pip install -i https://pypi.dev.sodadata.io/simple -U soda-duckdb
```



### Data from Parquet File

You can point directly to a `.parquet` file as a DuckDB "database":

```yaml
type: duckdb
name: contracts-duckdb
connection:
  database: "adventureworks.parquet"
```

Usage remains the same:

```bash
soda contract verify -ds ds.yml -c adventureworks.yml
```

***

### In-Memory with DuckDB SQL

```python
import duckdb

# Load data into in-memory DuckDB
db_connection = duckdb.connect(database=":memory:")
cursor = db_connection.cursor()

cursor.execute("CREATE SCHEMA analytics")
cursor.execute("CREATE TABLE analytics.adventureworks AS SELECT * FROM read_parquet('adventureworks.parquet')")
```

Run contract:

```python
from soda_core import configure_logging
from soda_core.contracts import verify_contracts_locally
from soda_duckdb import DuckDBDataSource

configure_logging(verbose=True)
result = verify_contracts_locally(
    data_sources=[DuckDBDataSource.from_existing_cursor(cursor, name="duckdb")],
    contract_file_paths=["adventureworks.yml"],
    soda_cloud_file_path="soda-cloud.yml",
    publish=True,
)
```



Contract YAML

```yaml
dataset: duckdb/analytics/adventureworks

columns:
  - name: id
    checks:
      - missing:
  - name: name
    checks:
      - missing:
          threshold:
            metric: percent
            must_be_less_than: 10
  - name: size
    checks:
      - invalid:
          valid_values: ['S', 'M', 'L']

checks:
  - schema:
  - row_count:
```

***

### Pandas Dataframe

```python
import pandas as pd
import duckdb

df = pd.read_parquet("adventureworks.parquet")
conn = duckdb.connect(database=":memory:")
cursor = conn.cursor()
cursor.register("adventureworks", df)

# This is only necessary if you want to use a custom schema. The default schema is "main"
cursor.execute("CREATE SCHEMA IF NOT EXISTS analytics")
cursor.execute("CREATE VIEW analytics.adventureworks AS SELECT * FROM adventureworks")

```

Run contract:

```python
from soda_core import configure_logging
from soda_core.contracts import verify_contracts_locally
from soda_duckdb import DuckDBDataSource

configure_logging(verbose=True)
result = verify_contracts_locally(
    data_sources=[DuckDBDataSource.from_existing_cursor(cursor, name="duckdb")],
    contract_file_paths=["adventureworks.yml"],
    soda_cloud_file_path="soda-cloud.yml",
    publish=True,
)
```

Contract YAML

```yaml
dataset: duckdb/analytics/adventureworks

columns:
  - name: id
    checks:
      - missing:
  - name: name
    checks:
      - missing:
          threshold:
            metric: percent
            must_be_less_than: 10
  - name: size
    checks:
      - invalid:
          valid_values: ['S', 'M', 'L']

checks:
  - schema:
  - row_count:
```

***

### Polars Dataframe

```python
import polars as pl
import duckdb

df = pl.read_parquet("adventureworks.parquet")
conn = duckdb.connect(database=":memory:")
cursor = conn.cursor()

cursor.register("adventureworks", df)

# This is only necessary if you want to use a custom schema. The default schema is "main"
cursor.execute("CREATE SCHEMA IF NOT EXISTS analytics")
cursor.execute("CREATE VIEW analytics.adventureworks AS SELECT * FROM adventureworks")
```

Run contract:

```python
from soda_core import configure_logging
from soda_core.contracts import verify_contracts_locally
from soda_duckdb import DuckDBDataSource

configure_logging(verbose=True)
result = verify_contracts_locally(
    data_sources=[DuckDBDataSource.from_existing_cursor(cursor, name="datasource")],
    contract_file_paths=["adventureworks.yml"],
    soda_cloud_file_path="soda-cloud.yml",
    publish=True,
)
```

Contract YAML

```yaml
dataset: datasource/analytics/adventureworks

columns:
  - name: id
    checks:
      - missing:
  - name: name
    checks:
      - missing:
          threshold:
            metric: percent
            must_be_less_than: 10
  - name: size
    checks:
      - invalid:
          valid_values: ['S', 'M', 'L']

checks:
  - schema:
  - row_count:
```
