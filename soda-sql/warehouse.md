---
layout: default
title: Warehouse YAML
parent: Soda SQL
redirect_from: /soda-sql/documentation/warehouse.html
---

# Warehouse YAML

A **warehouse** represents a SQL engine or database such as Snowflake, Amazon Redshift, or PostgreSQL. You use a **warehouse YAML** file to configure connection details for Soda SQL to access your warehouse.

**[Create a warehouse YAML file](#create-a-warehouse-yaml-file)<br />
[Anatomy of the warehouse YAML file](#anatomy-of-the-warehouse-yaml-file)<br />
[Env-vars YAML file](#env_vars-yaml-file)<br />
[Go further](#go-further)<br />**


## Create a warehouse YAML file

You need to create a warehouse YAML file for every warehouse to which you want to connect. If your warehouse uses multiple schemas, you need to create one warehouse YAML file per schema and use unique names for each warehouse file.

You can create warehouse YAML files manually, but the CLI command `soda create yourwarehousetype` automatically prepares a warehouse YAML file and an env_vars YAML file for you. (Use the env-vars YAML to securely store warehouse login credentials. See [Env_vars YAML](#env_vars-yaml) below.)

When you execute the `soda create yourwarehousetype` command, you include options that instruct Soda SQL in the creation of the file, and you indicate the type of warehouse, a specification Soda SQL requires. Use `soda create --help` for a list of all available warehouse types and options.

The example below includes the following optional details:
* option `-d` provides the name of the database
* option `-u` provides the username to log in to the database
* option `-w` provides the name of the warehouse directory


Command:
```shell
$ soda create yourwarehousetype -d sodasql -u sodasql -w soda_sql_tutorial
```
Output:
```shell
  | Soda CLI version 2.x.xx
  | Creating warehouse YAML file warehouse.yml ...
  | Creating /Users/Me/.soda/env_vars.yml with example env vars in section soda_sql_tutorial
  | Review warehouse.yml by running command
  |   cat warehouse.yml
  | Review section soda_sql_tutorial in ~/.soda/env_vars.yml by running command
  |   cat ~/.soda/env_vars.yml
  | Then run the soda analyze command
```

In the above example, Soda SQL created a warehouse YAML file and put it in a **warehouse directory** which is the top directory in your Soda SQL project directory structure. (It put the env_vars YAML file in your local user home directory.)


## Anatomy of the warehouse YAML file

When it creates your warehouse YAML file, Soda SQL pre-populates it with the options details you provided. The following is an example of a warehouse YAML file that Soda SQL created and pre-populated.

```yaml
name: soda_sql_tutorial
connection:
  type: postgres
  host: localhost
  username: env_var(POSTGRES_USERNAME)
  password: env_var(POSTGRES_PASSWORD)
  database: sodasql
  schema: public
```

Notice that even though the command provided a value for `username`, Soda SQL automatically used `env_var(POSTGRES_USERNAME)` instead. By default, Soda SQL stores database login credentials in an env_vars YAML file so that this sensitive information stays locally stored. See [Env_vars YAML](#env_vars-yaml) below for details.

Each type of warehouse -- PostgreSQL, Athena, Big Query, etc. -- requires different configuration parameters. Refer to [Set warehouse configurations]({% link soda/warehouse_types.md %}) for details that correspond to the type of warehouse you are using.


## Env_vars YAML file

To keep your warehouse YAML file free of warehouse login credentials, Soda SQL references environment variables. When it creates a new warehouse YAML file, Soda SQL also creates an **env_vars YAML** file to store your database username and password values. Soda SQL does not overwrite or remove and existing environment variables, it only adds new.

When it [runs a scan]({% link soda/scan.md %}#run-a-scan), Soda SQL loads environment variables from your local user home directory where it stored your env_vars YAML file. 

Use the command `cat ~/.soda/env_vars.yml` to review the contents of your env_vars YAML file. Open this hidden file from your local user home directory to input the values for your database credentials.

```yaml
soda_sql_tutorial:
    POSTGRES_USERNAME: myexampleusername
    POSTGRES_PASSWORD: myexamplepassword

some_other_soda_project:
    SNOWFLAKE_USERNAME: someotherexampleusername
    SNOWFLAKE_PASSWORD: someotherexamplepassword
```

Beyond storing warehouse login credentials, you can use env_vars to securely store any parameter in the warehouse YAML file. Best practice dictates that you use env_vars to store login credentials and any other sensitive data such as API keys or tokens. Note, however, that it is not mandatory that you use this env_vars YAML file to store your credentials. The env_vars YAML is where Soda SQL looks first when it runs a scan, but if the file does not exist, it uses the runtime environment variables from the current shell. 

For example, if you use you Google Cloud Platform, you can [set runtime environment variables](https://cloud.google.com/functions/docs/env-var) in your cloud platform where Soda SQL will find the login credentials it needs to access your warehouse. Set a single variable in your cloud platform that Soda SQL can locate and use. Then, since you do not need it, locate and delete the env_vars YAML file that Soda SQL created in your local home directory.

## Go further

* Next, run [`soda analyze`]({% link soda-sql/scan-yaml.md %}#create-a-scan-yaml-file) to automatically prepare a scan YAML file for each table in your warehouse.
* Check the [warehouse configuration parameters]({% link soda/warehouse_types.md %}) for your type of database.
* Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Learn more about the [scan YAML]({% link soda-sql/scan-yaml.md %}) file.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
Last modified on {% last_modified_at %}

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.