# soda-library-1.0.0

### General availability release

Introducing the launch of Soda Library, a Python library and CLI tool for testing data quality.

Built on top of Soda Core, Soda Library leverages all the features and functionality of the open-source tool, with newly added features. \[Install Soda Library]\(

) from the command line, then configure it to connect to Soda Cloud using API keys that are valid for a free, 45-day trial.

```shell
pip install -i https://pypi.cloud.soda.io soda-postgres
```

If you already use Soda Core, you can seamlessly upgrade to Soda Library without changing any configurations, checks, or integrations. See \[Migrate from Soda Core]\(

\#migrate-from-soda-core) for details.

### Features

* Soda Library supports SodaCL’s newest checks: \[Group By]\() and \[Group Evolution]\().
  * For an individual dataset, add a **Group By** configuration to specify the categories into which Soda must group the check results. When you run a scan, Soda groups the results according to the unique values in the column you identified.
  * Use a **Group Evolution** check to validate the presence or absence of a group in a dataset, or to check for changes to groups in a dataset relative to their previous state.
* Soda Library supports **\[Check Suggestions]\()**, a helpful CLI tool that assists you in generating basic data quality checks. Instead of writing your own data quality checks from scratch, the check suggestions assisstant profiles your dataset, then prompts you through a series of questions so that it can leverage the built-in Soda metrics and auto-generate quality checks tailored to your data.
* Soda Library supports **\[Check template]\()** configurations that enable you to prepare a user-defined metric that you can reuse in checks in multiple checks YAML files.
