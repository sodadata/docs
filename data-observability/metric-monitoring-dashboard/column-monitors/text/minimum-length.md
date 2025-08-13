# Minimum length

### Definition

The minimum (`minLength`) of non-NULL string values in the column.

### Source

data (value length in characters)

{% hint style="info" %}
SQLServer: instead of length in characters, it uses data length (number of bytes)
{% endhint %}

### Computation

For each value, Soda encapsulates the length in the aggregation metric: `AVG(LENGTH(column))`
