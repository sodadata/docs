# Duplicate percentage

{% hint style="info" %}
This metric is a work in progress.
{% endhint %}

### Definition

Percentage of all duplicate non-NULL records in a column.

***

For example: `duplicate_percent(id)` on this table is 0.66 (or 66%):

| id   | name |
| ---- | ---- |
| 1    | a    |
| 1    | b    |
| 2    | c    |
| null | d    |
| null | e    |

### Source

data

