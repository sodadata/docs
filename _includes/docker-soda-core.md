Use <a href="https://hub.docker.com/repository/docker/sodadata/soda-core" target="_blank">Soda's Docker image</a> in which Soda Core Scientific is pre-installed.

1. If you have not already done so, <a href="https://docs.docker.com/get-docker/" target="_blank">install Docker</a> in your local environment. 
2. From Terminal, run the following command to pull the latest Soda Core's official Docker image.
```shell
docker pull sodadata/soda-core
```
3. Verify the pull by running the following command.
```shell
docker run sodadata/soda-core --help
```
Output:
```shell
    Usage: soda [OPTIONS] COMMAND [ARGS]...

    Soda Core CLI version 3.0.xxx

    Options:
    --help  Show this message and exit.

    Commands:
    scan    runs a scan
    update-dro  updates a distribution reference file
    ```
When you run the Docker image on a non-Linux/amd64 platform, you may see the following warning from Docker, which you can ignore.
```shell
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
```
4. When you are ready to run a Soda scan, use the following command to run the scan via the docker image. Replace the placeholder values with your own file paths and names.
```bash
docker run -v /path/to/your_soda_directory:/sodacl sodadata/soda-core scan -d your_data_source -c /sodacl/your_configuration.yml /sodacl/your_checks.yml
``` 
Optionally, you can specify the version of Soda Core to use to execute the scan. This may be useful when you do not wish to use the latest released version of Soda Core to run your scans. The example scan command below specifies Soda Core version 3.0.0.
```bash
docker run -v /path/to/your_soda_directory:/sodacl sodadata/soda-core:v3.0.0 scan -d your_data_source -c /sodacl/your_configuration.yml /sodacl/your_checks.yml
```

<details>
  <summary>What does the scan command do? </summary>
  <ul>
    <li><code>docker run</code> ensures that the docker engine runs a specific image.</li>
    <li><code>-v</code> mounts your SodaCL files into the container. In other words, it makes the configuration.yml and checks.yml files in your local environment available to the docker container. The command example maps your local directory to <code>/sodacl</code> inside of the docker container. </li>
    <li><code>sodadata/soda-core</code> refers to the image that <code>docker run</code> must use.</li>
    <li><code>scan</code> instructs Soda Core to execute a scan of your data. </li>
    <li><code>-d</code> indicates the name of the data source to scan.</li>
    <li><code>-c</code> specifies the filepath and name of the configuration YAML file.</li>
  </ul>
</details>

<br />

#### Error: Mounts denied

If you encounter the following error, follow the procedure below.

```shell
docker: Error response from daemon: Mounts denied: 
The path /soda-core-test/files is not shared from the host and is not known to Docker.
You can configure shared paths from Docker -> Preferences... -> Resources -> File Sharing.
See https://docs.docker.com/desktop/mac for more info.
```

You need to give Docker permission to acccess your configuration.yml and checks.yml files in your environment. To do so:
  1. Access your Docker Dashboard, then select Preferences (gear symbol).
  2. Select Resources, then follow the <a href="https://docs.docker.com/desktop/mac/#file-sharing" target="_blank">Docker instructions</a> to add your Soda project directory -- the one you use to store your configuration.yml and checks.yml files -- to the list of directories that can be bind-mounted into Docker containers. 
  3. Click Apply & Restart, then repeat steps 2 - 4 [above](#use-docker-to-run-soda-core).

<br />

#### Error: Configuration path does not exist

If you encounter the following error, double check the syntax of the scan command in step 4 [above](#use-docker-to-run-soda-core). 
* Be sure to prepend `/sodacl/` to both the congifuration.yml filepath and the checks.yml filepath. 
* Be sure to mount your files into the container by including the `-v` option.  For example, `-v /Users/MyName/soda_core_project:/sodacl`.

```shell
Soda Core 3.0.xxx
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

<br />
