1. (Optional but recommended) Consider installing both the Soda Core Scientific packages in a virtual environment as described in the <a href="https://docs.soda.io/soda-core/get-started.html#install-the-soda-core-cli" target="_blank">Soda Core documentation</a>. 
2. From your command-line interface, use the following command to install Soda Core Scientific.

```bash
pip install soda-core-scientific
```

Note that installing the Soda Core Scientific package also installs a series of heavier scientific dependencies. See [soda-core-scientific Setup file for more details](https://github.com/sodadata/soda-core/blob/main/soda/scientific/setup.py)

## Troubleshooting Soda Core Scientific installation
The Soda Core Scientific package requires advanced scientific packages --see [requirements](https://github.com/sodadata/soda-core/blob/main/soda/scientific/setup.py).

While the installation steps described above are known to work in our Continuous Integration builds on Linux, if you try to install the package on Mac OS (especially the M1/ARM generations) or any other operating system, you may run into some issues. We offer the following alternatives:
- (Officially Supported and Tested) Run Soda Core in a Docker container
- Try one of the known-to-work-for-some-people recipes (limited customer support)

### Use Docker to run Soda Core (Recommended)
In case you run into installation issues via `pip`, we recommend using [Soda's Docker image](https://hub.docker.com/repository/docker/sodadata/soda-core) which comes with the Soda Core Scientific package pre-installed. This is actually how the Data Science team prefers to use during development and testing since Python scientific libraries are known to be a pain to install on all operating sytems.

1. Install the Docker engine (if you do not already have it on your system) by following [Docker's official installation guide](https://docs.docker.com/get-docker/)
2. Pull the latest [Soda Core's official Docker image](https://hub.docker.com/repository/docker/sodadata/soda-core) by running `docker pull sodadata/soda-core` in your terminal.
3. To verify that the image was correctly pulled run `docker run sodadata/soda-core --help`. If all goes well you should see a message that looks like:

    ```
    Usage: soda [OPTIONS] COMMAND [ARGS]...

    Soda Core CLI version 3.0.0b14

    Options:
    --help  Show this message and exit.

    Commands:
    scan    runs a scan
    update  updates a distribution reference file
    ```

4. To run a scan via the docker image you will need to do the following:

```bash
docker run -v /path/to/your/local/sodacl/files:/sodacl \
    sodadata/soda-core \
    scan -d <datasource name> -c /sodacl/<configuration YAML> /sodacl/<check file YAML>
```

The command above does a few things:
- `docker run` ensures that the docker engine is used to run a specific image
- the `-v` option ensures that your SodaCL files are "mounted" into the container. In simple terms, it makes the files on your local machine available to the docker container. In the command above, we map your local directory to `/sodacl` inside of the docker container. Feel free to change this if you prefer your files to reside somewhere else in your docker container.
- `sodadata/soda-core` refers to the image that `docker run` should use.
- from there on, the rest of the commands and options `scan`, `-d` and so on, correspond to the [Soda Core CLI commands]({% link soda-core/cli.md %}). Note that, when pointing to SodaCL files, you need to refer to the **container's** directory rather than you local directory (since we have mounted the files into the container --see above for an explanation).

**NOTE:**
- When running the Docker image on a non Linux/amd64 platform, you may see a warning from Docker that looks like this:

```
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
```
This warning can be ignored. However, if the Docker container does not run Soda Core, feel free to contact us for support.

### Install Locally with a few extra steps
The following steps are known to work on Mac OS that are running on the M1/ARM processors

During the installation process you might run into a few errors. If you come across the following

```bash
Collecting joblib>=0.16.0
  Using cached joblib-1.1.0-py2.py3-none-any.whl (306 kB)
Collecting scipy>=1.3.2
  Using cached scipy-1.8.0-cp39-cp39-macosx_12_0_arm64.whl (28.7 MB)
Collecting xarray>=0.17.0
  Using cached xarray-2022.3.0-py3-none-any.whl (870 kB)
Collecting statsmodels>=0.13.0
  Downloading statsmodels-0.13.2-cp39-cp39-macosx_11_0_arm64.whl (9.1 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 9.1/9.1 MB 52.4 MB/s eta 0:00:00
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

you can run the following command 

```bash
pip install wheel
```

If you now run

```bash
pip install soda-core-scientific 
```

you might bump into a few new errors. The one to consider is 

```bash
      RuntimeError: Could not find a `llvm-config` binary. There are a number of reasons this could occur, please see: https://llvmlite.readthedocs.io/en/latest/admin-guide/install.html#using-pip for help.
      error: command '/Users/tituskex/Projects/testing/venv/bin/python3' failed with exit code 1
      [end of output]
  
  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for llvmlite
```

To install `llvmlite`, you need to have a `llvm-config` binary file that is used during the installation process. To proceed with the next step, make sure that you have homebrew installed (see [here](https://brew.sh/)). With homebrew installed, run

```bash
brew install llvm@11
```

The `@11` part of this command indicates that homebrew should install `llvm` version 11. This is required because without this addition homebrew will install `llvm` version 13, which is incompatible with `llvmlite`. By installing `llvm`, a binary file called `llvm-config` will be installed. If you followed along and installed `llvm` using homebrew, this file will probably be located at `/opt/homebrew/opt/llvm@11/bin/llvm-config`. To ensure that this binary file is used during the installation of `llvmlite`, use the following command

```bash
export LLVM_CONFIG=/opt/homebrew/opt/llvm@11/bin/llvm-config
```

This will set the environment variable `LLVM_CONFIG` to the path where you installed the `llvm_config` binary. During the installation of `llvmlite` this environment variable will be used to locate the binary file. If you now run

```bash
pip install soda-core-scientific 
```

the installation should be successful. Since pip unsuccessfully tries to build a lot of the dependencies using wheels, you will get some errors and warnings.
