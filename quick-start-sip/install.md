---
description: >-
  From your command-line interface, execute a pip install command to install
  Soda Library in your environment.
---

# Install Soda Library

{% hint style="warning" %}
The Soda environment has been updated since this tutorial.

> Refer to [v4 documentation](https://app.gitbook.com/s/A2PmHkO5cBgeRPdiPPOG/quickstart) for updated tutorials.
{% endhint %}

Soda Library is a Python library and command-line interface (CLI) tool that enables Data Engineers to test the data in a data source to surface invalid, missing, or unexpected data.

As a step in the **Get started roadmap**, this guide offers instructions to set up, install, and configure Soda in a [self-operated deployment model](setup-guide.md#self-operated).

#### Get started roadmap

1. ~~Choose a flavor of Soda~~
2. **Set up Soda: self-operated** 📍 You are here!\
   &#x20;    a. [Review requirements](install.md#requirements)\
   &#x20;    b. [Install Soda Library](install.md#install-soda-library)\
   &#x20;    c. [Configure Soda](install.md#configure-soda)\

3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate

> 💡 **TL;DR:** Follow a [15-min tutorial](./) to set up and run Soda with example data.

## Requirements

To use Soda Library, you must have installed the following on your system.

* Python 3.8, 3.9, or 3.10. To check your existing version, use the CLI command: `python --version` or `python3 --version`\
  If you have not already installed Python, consider using [pyenv](https://github.com/pyenv/pyenv/wiki) to manage multiple versions of Python in your environment.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`
* A Soda Cloud account; see next section.

<details>

<summary>Python versions Soda supports</summary>

Soda officially supports Python versions 3.8, 3.9, and 3.10.\
Though largely funcntional, efforts to fully support Python 3.11 and 3.12 are ongoing.

Using Python 3.11, some users might have some issues with dependencies constraints. At times, extra the combination of Python 3.11 and dependencies constraints requires that a dependency be built from source rather than downloaded pre-built.

The same applies to Python 3.12, although there is some anecdotal evidence that indicates that 3.12 might not work in all scenarios due to dependencies constraints.

</details>

## Create a Soda Cloud account

1. In a browser, navigate to [cloud.soda.io/signup](https://cloud.soda.io/signup?utm_source=docs) to create a new Soda account, which is free for a 45-day trial. If you already have a Soda account, log in.
2. Navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys.
3. Copy+paste the API key values to a temporary, secure place in your local environment.

<details>

<summary>Why do I need a Soda Cloud account?</summary>

To validate your account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library.

> [Learn more](get-started-roadmap.md#about-soda)

</details>

## Install Soda Library

{% tabs %}
{% tab title="MacOS, Linux" %}
1. Best practice dictates that you install the Soda Library CLI using a virtual environment. In your command-line interface tool, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command.

```shell
python -m venv .venv
source .venv/bin/activate
```

2. Upgrade pip inside your new virtual environment.

```shell
pip install --upgrade pip
```

3. Execute the following command, replacing `soda-postgres` with the install package that matches the type of data source you use to store data.

```shell
# For bash interactive shell
pip install -i https://pypi.cloud.soda.io soda-postgres
# For zsh interactive shell
pip install -i https://pypi.cloud.soda.io "soda-postgres"
```

| Data source                                                                     | Install package          |
| ------------------------------------------------------------------------------- | ------------------------ |
| Amazon Athena                                                                   | `soda-athena`            |
| Amazon Redshift                                                                 | `soda-redshift`          |
| <p>Apache Spark DataFrames<br>(For use with programmatic Soda scans, only.)</p> | `soda-spark-df`          |
| Azure Synapse                                                                   | `soda-sqlserver`         |
| ClickHouse                                                                      | `soda-mysql`             |
| Dask and Pandas                                                                 | `soda-pandas-dask`       |
| Databricks                                                                      | `soda-spark[databricks]` |
| Denodo                                                                          | `soda-denodo`            |
| Dremio                                                                          | `soda-dremio`            |
| DuckDB                                                                          | `soda-duckdb`            |
| GCP BigQuery                                                                    | `soda-bigquery`          |
| Google CloudSQL                                                                 | `soda-postgres`          |
| IBM DB2                                                                         | `soda-db2`               |
| Local file                                                                      | Use Dask.                |
| MotherDuck                                                                      | `soda-duckdb`            |
| MS SQL Server                                                                   | `soda-sqlserver`         |
| MySQL                                                                           | `soda-mysql`             |
| OracleDB                                                                        | `soda-oracle`            |
| PostgreSQL                                                                      | `soda-postgres`          |
| Presto                                                                          | `soda-presto`            |
| Snowflake                                                                       | `soda-snowflake`         |
| Trino                                                                           | `soda-trino`             |
| Vertica                                                                         | `soda-vertica`           |

To deactivate the virtual environment, use the following command:

```shell
deactivate
```

#### Troubleshoot <a href="#troubleshoot" id="troubleshoot"></a>

As of version 1.7.0, Soda Library packages include Pydantic version 2 for data validation. If your systems require the use of Pydantic version 1, you can install an extra package that uses Pydantic version 1. To do so, use the following command, adjusting the type of library to correspond with your data source.

```sh
#bash
pip install -i https://pypi.cloud.soda.io soda-postgres[pydanticv1]

#zsh
pip install -i https://pypi.cloud.soda.io  "soda-spark-df[pydanticv1]"
```
{% endtab %}

{% tab title="Windows" %}


1. Best practice dictates that you install the Soda Library CLI using a virtual environment. In your command-line interface tool, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command. Reference the [virtualenv documentation](https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script) for activating a Windows script.

```shell
python -m venv .venv
.venv\Scripts\activate
```

2. Upgrade pip inside your new virtual environment.

```shell
pip install --upgrade pip
```

3. Execute the following command, replacing `soda-postgres` with the install package that matches the type of data source you use to store data.

```shell
pip install -i https://pypi.cloud.soda.io soda-postgres
```

| Data source                                                                    | Install package          |
| ------------------------------------------------------------------------------ | ------------------------ |
| Amazon Athena                                                                  | `soda-athena`            |
| Amazon Redshift                                                                | `soda-redshift`          |
| <p>Apache Spark DataFrame<br>(For use with programmatic Soda scans, only.)</p> | `soda-spark-df`          |
| Azure Synapse                                                                  | `soda-sqlserver`         |
| ClickHouse                                                                     | `soda-mysql`             |
| Dask and Pandas                                                                | `soda-pandas-dask`       |
| Databricks                                                                     | `soda-spark[databricks]` |
| Denodo                                                                         | `soda-denodo`            |
| Dremio                                                                         | `soda-dremio`            |
| DuckDB                                                                         | `soda-duckdb`            |
| GCP BigQuery                                                                   | `soda-bigquery`          |
| Google CloudSQL                                                                | `soda-postgres`          |
| IBM DB2                                                                        | `soda-db2`               |
| MS SQL Server                                                                  | `soda-sqlserver`         |
| MySQL                                                                          | `soda-mysql`             |
| OracleDB                                                                       | `soda-oracle`            |
| PostgreSQL                                                                     | `soda-postgres`          |
| Snowflake                                                                      | `soda-snowflake`         |
| Trino                                                                          | `soda-trino`             |
| Vertica                                                                        | `soda-vertica`           |

To deactivate the virtual environment, use the following command:

```shell
deactivate
```

Reference the [virtualenv documentation](https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script) for activating a Windows script.

#### Troubleshoot <a href="#troubleshoot-1" id="troubleshoot-1"></a>

As of version 1.7.0, Soda Library packages include Pydantic version 2 for data validation. If your systems require the use of Pydantic version 1, you can install an extra package that uses Pydantic version 1. To do so, use the following command, adjusting the type of library to correspond with your data source.

```sh
#bash
pip install -i https://pypi.cloud.soda.io soda-postgres[pydanticv1]

#zsh
pip install -i https://pypi.cloud.soda.io  "soda-spark-df[pydanticv1]"
```

\

{% endtab %}

{% tab title="Docker" %}
Use Soda’s Docker image in which Soda Scientific is pre-installed. You need Soda Scientific to be able to use SodaCL [distribution checks](../sodacl-reference/distribution.md) or [anomaly detection checks](../sodacl-reference/anomaly-detection.md).

1. If you have not already done so, [install Docker](https://docs.docker.com/get-docker/) in your local environment.
2.  From Terminal, run the following command to pull Soda Library’s official Docker image; adjust the version to reflect the most [recent release](../release-notes/).

    ```sh
    docker pull sodadata/soda-library:v1.0.3
    ```
3.  Verify the pull by running the following command.

    ```sh
    docker run sodadata/soda-library:v1.0.3 --help
    ```

    Output:

    ```sh
     Usage: soda [OPTIONS] COMMAND [ARGS]...

       Soda Library CLI version 1.0.x, Soda Core CLI version 3.0.xx

     Options:
       --version  Show the version and exit.
       --help     Show this message and exit.

     Commands:
       ingest           Ingests test results from a different tool
       scan             Runs a scan
       suggest          Generates suggestions for a dataset
       test-connection  Tests a connection
       update-dro       Updates contents of a distribution reference file
    ```

    When you run the Docker image on a non-Linux/amd64 platform, you may see the following warning from Docker, which you can ignore.

    ```sh
    WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
    ```
4.  When you are ready to run a Soda scan, use the following command to run the scan via the docker image. Replace the placeholder values with your own file paths and names.

    ```sh
    docker run -v /path/to/your_soda_directory:/sodacl sodadata/soda-library scan -d your_data_source -c /sodacl/your_configuration.yml /sodacl/your_checks.yml
    ```

    Optionally, you can specify the version of Soda Library to use to execute the scan. This may be useful when you do not wish to use the latest released version of Soda Library to run your scans. The example scan command below specifies Soda Library version 1.0.0.

    ```sh
    docker run -v /path/to/your_soda_directory:/sodacl sodadata/soda-library:v1.0.0 scan -d your_data_source -c /sodacl/your_configuration.yml /sodacl/your_checks.yml
    ```

<details>

<summary>What does the scan command do?</summary>

* `docker run` ensures that the docker engine runs a specific image.
* `-v` mounts your SodaCL files into the container. In other words, it makes the configuration.yml and checks.yml files in your local environment available to the docker container. The command example maps your local directory to `/sodacl` inside of the docker container.
* `sodadata/soda-library` refers to the image that `docker run` must use.
* `scan` instructs Soda Library to execute a scan of your data.
* `-d` indicates the name of the data source to scan.
* `-c` specifies the filepath and name of the configuration YAML file.

</details>

**Error: Mounts denied**

If you encounter the following error, follow the procedure below.

```
docker: Error response from daemon: Mounts denied: 
The path /soda-library-test/files is not shared from the host and is not known to Docker.
You can configure shared paths from Docker -> Preferences... -> Resources -> File Sharing.
See https://docs.docker.com/desktop/mac for more info.
```

You need to give Docker permission to acccess your configuration.yml and checks.yml files in your environment. To do so:

1. Access your Docker Dashboard, then select Preferences (gear symbol).
2. Select Resources, then follow the [Docker instructions](https://www.docker.com/blog/file-sharing-with-docker-desktop/) to add your Soda project directory —the one you use to store your configuration.yml and checks.yml files— to the list of directories that can be bind-mounted into Docker containers.
3. Click Apply & Restart, then repeat steps 2 - 4 above.

&#x20;**Error: Configuration path does not exist**

If you encounter the following error, double check the syntax of the scan command in step 4 above.

* Be sure to prepend `/sodacl/` to both the congifuration.yml filepath and the checks.yml filepath.
* Be sure to mount your files into the container by including the `-v` option. For example, `-v /Users/MyName/soda_project:/sodacl`.

```
Soda Library 1.0.x
Configuration path 'configuration.yml' does not exist
Path "checks.yml" does not exist
Scan summary:
No checks found, 0 checks evaluated.
2 errors.
Oops! 2 errors. 0 failures. 0 warnings. 0 pass.
ERRORS:
Configuration path 'configuration.yml' does not exist
Path "checks.yml" does not exist
```
{% endtab %}

{% tab title="Soda Scientific" %}
Install Soda Scientific to be able to use SodaCL [distribution checks](../sodacl-reference/distribution.md) or [anomaly detection checks](../sodacl-reference/anomaly-detection.md).

You have two installation options to choose from:

* [Install Soda Scientific in a virtual environment (Recommended)](install.md#install-soda-scientific-in-a-virtual-environment-recommended)
* [Use Docker to run Soda Library with Soda Scientific](install.md#use-docker-to-run-soda-scientific)

#### &#x20;Install Soda Scientific in a virtual environment (Recommended) <a href="#install-soda-scientific-in-a-virtual-environment-recommended" id="install-soda-scientific-in-a-virtual-environment-recommended"></a>

1. Set up a virtual environment, and install Soda Library in your new virtual environment.
2. Use the following command to install Soda Scientific.

```
pip install -i https://pypi.cloud.soda.io soda-scientific
```

<details>

<summary>List of Soda Scientific dependencies</summary>

* pandas<2.0.0
* wheel
* pydantic>=1.8.1,<2.0.0
* scipy>=1.8.0
* numpy>=1.23.3, <2.0.0
* inflection==0.5.1
* httpx>=0.18.1,<2.0.0
* PyYAML>=5.4.1,<7.0.0
* cython>=0.22
* prophet>=1.1.0,<2.0.0

</details>

**Error: Library not loaded**

If you have defined an `anomaly detection` check and you use an M1 MacOS machine, you may get a`Library not loaded: @rpath/libtbb.dylib` error. This is a known issue in the MacOS community and is caused by issues during the installation of the [prophet library](https://github.com/facebook/prophet). There currently are no official workarounds or releases to fix the problem, but the following adjustments may address the issue.

1. Install `soda-scientific` as per the local environment installation instructions and activate the virtual environment.
2.  Use the following command to navigate to the directory in which the `stan_model` of the `prophet` package is installed in your virtual environment.

    ```sh
    cd path_to_your_python_virtual_env/lib/pythonyour_version/site_packages/prophet/stan_model/
    ```

    For example, if you have created a python virtual environment in a `/venvs` directory in your home directory and you use Python 3.9, you would use the following command.

    ```sh
    cd ~/venvs/soda-library-prophet11/lib/python3.9/site-packages/prophet/stan_model/
    ```
3.  Use the `ls` command to determine the version number of `cmndstan` that `prophet` installed. The `cmndstan` directory name includes the version number.

    ```sh
    ls
    cmdstan-2.26.1		prophet_model.bin
    ```
4.  Add the `rpath` of the `tbb` library to your `prophet` installation using the following command.

    ```sh
    install_name_tool -add_rpath @executable_path/cmdstanyour_cmdstan_version/stan/lib/stan_math/lib/tbb prophet_model.bin
    ```

    With `cmdstan` version `2.26.1`, you would use the following command.

    ```sh
    install_name_tool -add_rpath @executable_path/cmdstan-2.26.1/stan/lib/stan_math/lib/tbb prophet_model.bin
    ```

#### &#x20;Use Docker to run Soda Scientific <a href="#use-docker-to-run-soda-scientific" id="use-docker-to-run-soda-scientific"></a>

Use Soda’s Docker image in which Soda Scientific is pre-installed. You need Soda Scientific to be able to use SodaCL [distribution checks](../sodacl-reference/distribution.md) or [anomaly detection checks](../sodacl-reference/anomaly-detection.md).

1. If you have not already done so, [install Docker](https://docs.docker.com/get-docker/) in your local environment.
2.  From Terminal, run the following command to pull Soda Library’s official Docker image; adjust the version to reflect the most [recent release](../release-notes/).

    ```sh
    docker pull sodadata/soda-library:v1.0.3
    ```
3.  Verify the pull by running the following command.

    ```sh
    docker run sodadata/soda-library:v1.0.3 --help
    ```

    Output:

    ```sh
     Usage: soda [OPTIONS] COMMAND [ARGS]...

       Soda Library CLI version 1.0.x, Soda Core CLI version 3.0.xx

     Options:
       --version  Show the version and exit.
       --help     Show this message and exit.

     Commands:
       ingest           Ingests test results from a different tool
       scan             Runs a scan
       suggest          Generates suggestions for a dataset
       test-connection  Tests a connection
       update-dro       Updates contents of a distribution reference file
    ```

    When you run the Docker image on a non-Linux/amd64 platform, you may see the following warning from Docker, which you can ignore.

    ```sh
    WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
    ```
4.  When you are ready to run a Soda scan, use the following command to run the scan via the docker image. Replace the placeholder values with your own file paths and names.

    ```sh
    docker run -v /path/to/your_soda_directory:/sodacl sodadata/soda-library scan -d your_data_source -c /sodacl/your_configuration.yml /sodacl/your_checks.yml
    ```

    Optionally, you can specify the version of Soda Library to use to execute the scan. This may be useful when you do not wish to use the latest released version of Soda Library to run your scans. The example scan command below specifies Soda Library version 1.0.0.

    ```sh
    docker run -v /path/to/your_soda_directory:/sodacl sodadata/soda-library:v1.0.0 scan -d your_data_source -c /sodacl/your_configuration.yml /sodacl/your_checks.yml
    ```

<details>

<summary>What does the scan command do?</summary>

* `docker run` ensures that the docker engine runs a specific image.
* `-v` mounts your SodaCL files into the container. In other words, it makes the configuration.yml and checks.yml files in your local environment available to the docker container. The command example maps your local directory to `/sodacl` inside of the docker container.
* `sodadata/soda-library` refers to the image that `docker run` must use.
* `scan` instructs Soda Library to execute a scan of your data.
* `-d` indicates the name of the data source to scan.
* `-c` specifies the filepath and name of the configuration YAML file.

</details>

**Error: Mounts denied**

If you encounter the following error, follow the procedure below.

```sh
docker: Error response from daemon: Mounts denied: 
The path /soda-library-test/files is not shared from the host and is not known to Docker.
You can configure shared paths from Docker -> Preferences... -> Resources -> File Sharing.
See https://docs.docker.com/desktop/mac for more info.
```

You need to give Docker permission to acccess your configuration.yml and checks.yml files in your environment. To do so:

1. Access your Docker Dashboard, then select Preferences (gear symbol).
2. Select Resources, then follow the [Docker instructions](https://www.docker.com/blog/file-sharing-with-docker-desktop/) to add your Soda project directory—the one you use to store your configuration.yml and checks.yml files—to the list of directories that can be bind-mounted into Docker containers.
3. Click Apply & Restart, then repeat steps 2 - 4 above.

&#x20;**Error: Configuration path does not exist**

If you encounter the following error, double check the syntax of the scan command in step 4 above.

* Be sure to prepend `/sodacl/` to both the congifuration.yml filepath and the checks.yml filepath.
* Be sure to mount your files into the container by including the `-v` option. For example, `-v /Users/MyName/soda_project:/sodacl`.

```sh
Soda Library 1.0.x
Configuration path 'configuration.yml' does not exist
Path "checks.yml" does not exist
Scan summary:
No checks found, 0 checks evaluated.
2 errors.
Oops! 2 errors. 0 failures. 0 warnings. 0 pass.
ERRORS:
Configuration path 'configuration.yml' does not exist
Path "checks.yml" does not exist
```
{% endtab %}
{% endtabs %}

## Configure Soda

1. Soda Library connects with Spark DataFrames in a unique way, using programmtic scans.
   * If you are using Spark DataFrames, follow the configuration details in [Connect to Spark](../data-source-reference/connect-spark.md).
   * If you are _not_ using Spark DataFrames, continue to step 2.
2. In the same directory and environment in which you installed Soda Library, use a code editor to create a new `configuration.yml` file. This file stores connection details for your data sources and your Soda Cloud account.\
   Use the data source-specific connection configurations (see: [Data source reference](../data-source-reference/)) to copy+paste the connection syntax into your file, then adjust the values to correspond with your data source’s details, as in the following example for PostgreSQL.
   * You can use [system variables](install.md#provide-credentials-as-system-variables) to pass sensitive values, if you wish.
   *   If you want to run scans on multiple schemas in the data source, add one data source config block per schema.

       ```sh
        data_source my_datasource:
        type: postgres
        host: localhost
        username: postgres
        password: secret
        database: postgres
        schema: publi
       ```
3. Copy+paste the following `soda_cloud` configuration syntax into the `configuration.yml` file, as in the example below. Input the API key values you created in Soda CLoud.
   * _Do not_ nest the `soda_cloud` configuration under the `datasource` configuration.
   * For `host`, use `cloud.soda.io` for EU region; use `cloud.us.soda.io` for USA region, according to your selection when you created your Soda Cloud account.
   *   Optionally, provide a value for the `scheme` property to indicate which scheme to use to initialize the URI instance. If you do not explicitly include a `scheme` property, Soda uses the default `https`.

       ```
          soda_cloud:
            # Use cloud.soda.io for EU region
            # Use cloud.us.soda.io for US region
            host: https://cloud.soda.io
            api_key_id: 2e0ba0cb-your-api-key-7b
            api_key_secret: 5wd-your-api-key-secret-aGuRg
            scheme:
       ```
   *   Save the `configuration.yml` file. Run the following scan to confirm that Soda can successfully connect with your data source.

       ```
       soda test-connection -d my_datasource -c configuration.yml
       ```

## Provide credentials as system variables

If you wish, you can provide data source login credentials or any of the properties in the configuration YAML file as system variables instead of storing the values directly in the file. System variables persist only for as long as you have the terminal session open in which you created the variable. For a longer-term solution, consider using permanent environment variables stored in your `~/.bash_profile` or `~/.zprofile` files.

### For connection configuration values

1. From your command-line interface, set a system variable to store the value of a property that the configuration YAML file uses. For example, you can use the following command to define a system variable for your password.

```shell
export POSTGRES_PASSWORD=1234
```

2. Test that the system retrieves the value that you set by running an `echo` command.

```shell
echo $POSTGRES_PASSWORD
```

3. In the configuration YAML file, set the value of the property to reference the environment variable, as in the following example.

```yaml
data_source my_database_name:
  type: postgres
  host: soda-temp-demo
  port: '5432'
  username: sodademo
  password: ${POSTGRES_PASSWORD}
  database: postgres
  schema: public
```

4. Save the configuration YAML file, then run a scan to confirm that Soda Library connects to your data source without issue.

```shell
soda test-connection -d my_datasource -c configuration.yml
```

### For API key values

1. From your command-line interface, set a system variable to store the value of a property that the configuration YAML file uses. For example, you can use the following command to define a system variable for your password.

```shell
export API_KEY=1234
```

2. Test that the system retrieves the value that you set by running an `echo` command.

```shell
echo $API_KEY
```

3.  In the configuration YAML file, set the value of the property to reference the environment variable, as in the following example.

    ```yaml
    data_source my_database_name:
      type: postgres
      host: soda-temp-demo
      port: '5432'
      username: sodademo
      password: ${POSTGRES_PASSWORD}
      database: postgres
      schema: public

    soda_cloud:
      host: cloud.soda.io
      api_key_id: ${API_KEY}
      api_key_secret: ${API_SECRET}
    ```
4. Save the configuration YAML file, then run a scan to confirm that Soda Library connects to Soda Cloud without issue.

```shell
soda test-connection -d my_datasource -c configuration.yml
```

## Next

1. ~~Choose a flavor of Soda~~
2. ~~Set up Soda: self-operated~~
3. [Write SodaCL checks](../soda-cl-overview/)
4. Run scans and review results
5. Organize, alert, investigate

> Need help? Join the [Soda community on Slack](https://community.soda.io/slack).
