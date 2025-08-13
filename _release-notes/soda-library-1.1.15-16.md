# Fixes and features

* Change dbt version marker in extras\_reqiure. To install soda-dbt, use either `pip install -i https://pypi.cloud.soda.io "soda-dbt[ver16]"` or `pip install -i https://pypi.cloud.soda.io "soda-dbt[ver15]"`.
* Fix error on invalid check attributes by @vijaykiran in #117
* CLOUD-5705 Fix schema attributes validation by @vijaykiran in #118
* Add attributes to checks level by @vijaykiran in #119
* Add tests for reconciliation checks, minor bugfixes by @m1n0 in #122
