# Partition row count

### Definition

The number of rows in the most recent time partition at scan time (e.g. all rows where `partition_col = current_partition`).

### Source

data (time partition)

### Computation

Through `count(*)` for the partition.
