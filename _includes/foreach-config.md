Add a **for each** section to your checks YAML file to specify a list of checks you wish to execute on multiple datasets. 

1. Add a `for each dataset T` section header anywhere in your YAML file. The purpose of the `T` is only to ensure that every `for each` configuration has a unique name. 
2. Nested under the section header, add two nested keys, one for `datasets` and one for `checks`. 
3. Nested under `datasets`, add a list of datasets against which to run the checks. Refer to the example below that illustrates how to use `include` and `exclude` configurations and wildcard characters {% raw %} (%) {% endraw %}.
4. Nested under `checks`, write the checks you wish to execute against all the datasets listed under `datasets`. 

```yaml
for each dataset T:
  datasets:
    # include the dataset 
    - dim_customers
    # include all datasets matching the wildcard expression
    - dim_products%
    # (optional) explicitly add the word include to make the list more readable
    - include dim_employee
    # exclude a specific dataset
    - exclude fact_survey_response
    # exclude any datasets matching the wildcard expression
    - exclude prospective_%
  checks:
    - row_count > 0
```


## Limitations and specifics

* For each is not compatible with dataset filters.
* Soda Core dataset names matching is case insensitive.
* If any of your checks specify column names as arguments, make sure the column exists in all datasets listed under the `datasets` heading.
* To add multiple for each configurations in your checks YAML file, configure another `for each` section header with a different letter identifier, such as `for each dataset R`.

