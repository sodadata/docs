| Threshold key | Expected value | Example |
| -------------- | ------------- | ------- |
| `must_be`                          | number            | `must_be: 0`                            |
| `must_not_be`                      | number            | `must_not_be: 0`                        |
| `must_be_greater_than`             | number            | `must_be_greater_than: 100`             |
| `must_be_greater_than_or_equal_to` | number            | `must_be_greater_than_or_equal_to: 100` |
| `must_be_less_than`                | number            | `must_be_less_than: 100`                |
| `must_be_less_than_or_equal_to`    | number            | `must_be_less_than_or_equal_to: 100`    |
| `must_be_between`                  | list of 2 numbers | `must_be_between: [0, 100]`             |
| `must_be_not_between`              | list of 2 numbers | `must_be_not_between: [0, 100]`         |


#### Threshold boundaries

When you use `must_be_between` threshold keys, Soda includes the boundary values as acceptable. In the following example, a check result of `100` or `120` each passes.

```yaml
dataset: dim_customer

columns:
- name: first_name
- name: middle_name
- name: last_name

checks:
- type: row_count
  must_be_between: [100, 120]
```
<br />

When you use `must_be_between` threshold keys, Soda includes the boundary values as acceptable. In the following example, a check result of `0` or `120` each fails.

```yaml
dataset: dim_customer

columns:
- name: first_name
- name: middle_name
- name: last_name

checks:
- type: row_count
  must_be_not_between: [0, 120]
```

<br />

Use multiple thresholds to adjust the inclusion of boundary values.

```yaml
dataset: dim_customer

columns:
- name: total_children
  # check passes if values are outside the range, inclusive of 20 
  checks:
  - type: avg
    must_be_less_than: 10
    must_be_greater_than_or_equal_to: 20
- name: yearly_income
  # check passes if values are inside the range, inclusive of 100
  checks:
  - type: avg
    must_be_greater_than_or_equal_to: 100
    must_be_less_than: 200
```