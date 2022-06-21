---
layout: default
title: Data types
description: Access a data source-specific list of data types Soda supports in columns it scans. Soda does not support complex data types.
sidebar: sql
parent: Soda SQL
redirect_from: 
- /soda-sql/documentation/supported-data-types.html
- /soda/supported-data-types.html
---

# Data types

{% include banner-sql.md %}

Soda SQL supports the following data types in columns it scans.  <br />
Currently, Soda does *not* support complex data types. <br />
For Soda Core data types, see [Soda Core documentation]({% link soda-core/configuration.md %}).

[Amazon Athena](#amazon-athena) <br />
[Amazon Redshift](#amazon-redshift) <br />
[Apache Hive (Experimental)](#apache-hive-experimental) <br />
[Apache Spark](#apache-spark) <br />
[Google Cloud Platform Big Query](#google-cloud-platform-big-query) <br />
[Microsoft SQL Server (Experimental)](#microsoft-sql-server-experimental) <br />
[MySQL (Experimental)](#mysql-experimental) <br />
[Postgres](#postgres) <br />
[Snowflake](#snowflake) <br />
[Trino (Experimental)](#trino-experimental) <br />
<br />

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

### Apache Hive (Experimental)

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

{% include gcp-datasets.md %}

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

### MySQL (Experimental)

| Category | Data type | 
| ---- | --------- |
| text | CHAR, VARCHAR, BINARY, VARBINARY, BLOB, TEXT, ENUM, SET |
| number | INTEGER, INT, SMALLINT, TINYINT, MEDIUMINT, BIGINT, DECIMAL, NUMERIC, FLOAT, DOUBLE, REAL, DOUBLE PRECISION, DEC, FIXED |
| time | TIMESTAMP, DATE, DATETIME, YEAR, TIME |

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

### Trino (Experimental)

| Category | Data type | 
| ---- | --------- |
| text | VARCHAR, CHAR, VARBINARY, JSON  |
| number | BOOLEAN, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, DOUBLE, REAL, DECIMAL |
| time | DATE, TIME, TIMESTAMP, TIME WITH TIME ZONE, INTERVAL YEAR TO MONTH, INTERVAL DATE TO SECOND |

<br />

---
*Last modified on {% last_modified_at %}*
