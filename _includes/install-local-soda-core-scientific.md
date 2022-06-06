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