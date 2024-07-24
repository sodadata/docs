**Problem:** Using an `invalid_count` check, the list of `valid_values` includes a value with a single quote, such as `Tuesday's orders`. During scanning, he check results in and error because it does not recognize the special character.

**Solution:** When using single-quoted strings, any single quote `'` inside its contents must be doubled to escape it. For example, `Tuesday''s orders`.