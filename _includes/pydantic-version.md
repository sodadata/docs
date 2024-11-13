### Troubleshoot

As of version 1.7.0, Soda Library packages include Pydantic version 2 for data validation. If your systems require the use of Pydantic version 1, you can install an extra package that uses Pydantic version 1. To do so, use the following command, adjusting the type of library to correspond with your data source.
{% include code-header.html %}
```shell
#bash
pip install -i https://pypi.cloud.soda.io soda-postgres[pydanticv1]

#zsh
pip install -i https://pypi.cloud.soda.io  "soda-spark-df[pydanticv1]"
```