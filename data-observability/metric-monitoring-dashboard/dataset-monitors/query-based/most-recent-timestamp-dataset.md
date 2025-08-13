# Most recent timestamp (dataset)

### Definition

The interval between scan time and the maximum timestamp in the partition column (within the latest partition).

### Source

data (time partition)

### Computation

Via `MAX(column)` for any time related column.

No sampling used.
