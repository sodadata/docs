While installing Soda Core Scientific works on Linux, you may encounter issues if you install Soda Core Scientific on Mac OS (particularly, machines with the M1 ARM-based processor) or any other operating system. If that is the case, consider using one of the following alternative installation procedures.
* [Use Docker to run Soda Core (Recommended)](#use-docker-to-run-soda-core)
* [Install Soda Core locally (Limited support)](#install-soda-core-locally)

Need help? Ask the team in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

### Use Docker to run Soda Core

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

    Soda Core CLI version 3.0.0bxx

    Options:
    --help  Show this message and exit.

    Commands:
    scan    runs a scan
    update  updates a distribution reference file
    ```
When you run the Docker image on a non-Linux/amd64 platform, you may see the following warning from Docker, which you can ignore.
```shell
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
```
4. When you are ready to run a Soda scan, use the following command to run the scan via the docker image. Replace the placeholder values with your own file paths and names.
```bash
docker run -v /path/to/your_soda_directory:/sodacl sodadata/soda-core scan -d your_data_source -c /sodacl/your_configuration.yml /sodacl/your_checks.yml
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
Soda Core 3.0.0bxx
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

### Install Soda Core Scientific Locally 

The following works on Mac OS on a machine with the M1 ARM-based processor. Consult the sections below to troubleshoot errors that may arise.

From your command-line interface, use the following command to install Soda Core Scientific.
```bash
pip install soda-core-scientific
```

#### Error: No module named 'wheel'

If you encounter the following error, follow the procedure below. 

```bash
Collecting lightgbm>=2.2.3
  Using cached lightgbm-3.3.2.tar.gz (1.5 MB)
  Preparing metadata (setup.py) ... error
  error: subprocess-exited-with-error
  
  × python setup.py egg_info did not run successfully.
  │ exit code: 1
  ╰─> [6 lines of output]
      Traceback (most recent call last):
        File "<string>", line 2, in <module>
        File "<pip-setuptools-caller>", line 34, in <module>
        File "/private/var/folders/vj/7nxglgz93mv6cv472sl0pnm40000gq/T/pip-install-j0txphmm/lightgbm_327e689fd1a645dfa052e5669c31918c/setup.py", line 17, in <module>
          from wheel.bdist_wheel import bdist_wheel
      ModuleNotFoundError: No module named 'wheel'
      [end of output]
  
  note: This error originates from a subprocess, and is likely not a problem with pip.
error: metadata-generation-failed

× Encountered error while generating package metadata.
╰─> See above for output.

note: This is an issue with the package mentioned above, not pip.
hint: See above for details.
```
1. Install `wheel`.
```bash
pip install wheel
```
2. Run the command to install Soda Core Scientific, again.
```bash
pip install soda-core-scientific 
```

<br />

#### Error: RuntimeError: Count not find a 'llvm-config' binary

If you encounter the following error, follow the procedure below.

```bash
      RuntimeError: Could not find a `llvm-config` binary. There are a number of reasons this could occur, please see: https://llvmlite.readthedocs.io/en/latest/admin-guide/install.html#using-pip for help.
      error: command '/Users/yourname/Projects/testing/venv/bin/python3' failed with exit code 1
      [end of output]
  
  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for llvmlite
```

1. To install `llvmlite`, you must have a `llvm-config` binary file that the `llvmlite` installation process uses. In Terminal, use homebrew to run the following command.
```bash
brew install llvm@11
```
2. Homebrew installs this file in `/opt/homebrew/opt/llvm@11/bin/llvm-config`. To ensure that the `llvmlite` installation process uses this binary file, run the following command.
```bash
export LLVM_CONFIG=/opt/homebrew/opt/llvm@11/bin/llvm-config
```
3. Run the command to install Soda Core Scientific, again.
```bash
pip install soda-core-scientific 
```
