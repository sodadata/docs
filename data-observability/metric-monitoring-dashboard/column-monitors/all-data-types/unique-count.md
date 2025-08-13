# Unique count

### Definition

The number of distinct non-NULL values in the monitored column. Highlights unexpected changes in cardinality (e.g., new user IDs, codes).

### Source

data

### Computation

`COUNT(DISTINCT <column>`
