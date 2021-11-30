---
layout: default
title: Data types
parent: Soda
redirect_from: /soda-sql/documentation/supported-data-types.html
---

# Data types

Soda supports the following data types in columns it scans.  <br />
Currently, Soda does *not* support complex data types.


### Amazon Athena

| Category | Data type | 
| ---- | --------- |
| text | CHAR, VARCHAR, STRING |
| number | TINYINT, SMALLINT, INT, INTEGER, BIGINT, DOUBLE, FLOAT, DECIMAL |
| time | DATE, TIMESTAMP |

### Amazon Redshift

| Category | Data type | 
| ---- | --------- |
| text | CHARACTER VARYING, CHARACTER, CHAR, TEXT, NCHAR, NVARCHAR, BPCHAR |
| number | SMALLINT, INT2, INTEGER, INT, INT4, BIGINT, INT8 |
| time | DATE, TIME, TIMETZ, TIMESTAMP, TIMESTAMPTZ |

### Apache Hive

| Category | Data type | 
| ---- | --------- |
| text | CHAR, VARCHAR |
| number | TINYINT, SMALLINT, INT, BIGINT, FLOAT, DOUBLE, DOUBLE PRECISION, DECIMAL, NUMERIC |

### Apache Spark

| Category | Data type | 
| ---- | --------- |
| text | CHAR, STRING, VARCHAR |
| number | TINYINT, SHORT, SMALLINT, INT, INTEGER, LONG, BIGINT, FLOAT, REAL, DOUBLE, DEC, DECIMAL, NUMERIC |
| time | DATE, TIMESTAMP |

### Google Cloud Platform Big Query

| Category | Data type | 
| ---- | --------- |
| text | STRING |
| number | INT64, DECIMAL, BINUMERIC, BIGDECIMAL, FLOAT64 |
| time | DATE, DATETIME, TIME, TIMESTAMP |

### Microsoft SQL Server

| Category | Data type | 
| ---- | --------- |
| text | VARCHAR, CHAR, TEXT, NVARCHAR, NCHAR, NTEXT |
| number | BIGINT, NUMERIC, BIT, SMALLINT, DECIMAL, SMALLMONEY, INT, TINYINT, MONEY, FLOAT, REAL |
| time | DATE, DATETIMEOFFSET, DATETIME2, SMALLDATETIME, DATETIME, TIME |

### Postgres

| Category | Data type | 
| ---- | --------- |
| text | CHARACTER VARYING, CHARACTER, CHAR, TEXT |
| number | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL |
| time | TIMESTAMPT, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |

### Snowflake

| Category | Data type | 
| ---- | --------- |
| text | CHAR, VARCHAR, CHARACTER, STRING, TEXT |
| number | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT_LTZ, TIMESTAMP_NTZ, TIMESTAMP_TZ |

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.
