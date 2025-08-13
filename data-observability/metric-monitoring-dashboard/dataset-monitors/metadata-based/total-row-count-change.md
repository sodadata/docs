# Total row count change

### Definition

The difference in total row count between the current scan and the immediately preceding scan (`current_count – previous_count`).

### Source

metadata

### Computation

Soda keeps track of the previous total row count, fetches total row count again at scan time and subtracts both.
