If you have defined an `anomaly detection` check and you use an M1 MacOS machine, you may get a`Library not loaded: @rpath/libtbb.dylib` error. This is a known issue in the MacOS community and is caused by issues during the installation of the <a href="https://github.com/facebook/prophet" target="_blank">prophet library</a>. There currently are no official workarounds or releases to fix the problem, but the following adjustments may address the issue.

1. Install `soda-scientific` as per the local environment installation instructions and activate the virtual environment.
2. Use the following command to navigate to the directory in which the `stan_model` of the `prophet` package is installed in your virtual environment.
```shell
cd path_to_your_python_virtual_env/lib/pythonyour_version/site_packages/prophet/stan_model/
  ```
For example, if you have created a python virtual environment in a `/venvs` directory in your home directory and you use Python 3.9, you would use the following command.
```shell
cd ~/venvs/soda-library-prophet11/lib/python3.9/site-packages/prophet/stan_model/
  ```
3. Use the `ls` command to determine the version number of `cmndstan` that `prophet` installed. The `cmndstan` directory name includes the version number.
```shell
ls
cmdstan-2.26.1		prophet_model.bin
```
4. Add the `rpath` of the `tbb` library to your `prophet` installation using the following command.
```shell
install_name_tool -add_rpath @executable_path/cmdstanyour_cmdstan_version/stan/lib/stan_math/lib/tbb prophet_model.bin
```
With `cmdstan` version `2.26.1`, you would use the following command.
```bash
install_name_tool -add_rpath @executable_path/cmdstan-2.26.1/stan/lib/stan_math/lib/tbb prophet_model.bin
```
