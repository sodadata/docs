# Schema changes

### Definition

The count of schema alterations (column additions, removals, or data-type changes) detected since the previous scan. Any schema change is treated as an anomaly.

### Source

metadata

### Computation

No sampling used. The value is calculated through the difference of two full table definitions.
