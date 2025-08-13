# Missing values percentage

### Definition

Number of missing values relative to the number of rows in the partition, expressed as percentage → `(number of null or missing values in column ÷ total rows in partition) × 100`

### Source

data

### Computation

`1 - (count(column) / count(*)) × 100`
