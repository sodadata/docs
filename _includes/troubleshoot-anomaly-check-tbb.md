Several users have had issues running the `anomaly score` check on M1 MacOS machines and are getting a `Library not loaded: @rpath/libtbb.dylib` error. This issue is well known throughout the community and is due to a few issues during the installation of the [`prophet`](https://github.com/facebook/prophet) library. While there currently are no official workarounds or releases intended to fix the problem from the library we have found that doing the following has proven to help.

1. Install soda-core-scientific as you would normally and by following [virtual environment installation instructions](#install-soda-core-scientific-in-a-virtual-environment-recommended)
2. In a terminal, activate the virtual environment you've just created.
3. Navigate to the location where the `stan_model` of the `prophet` package is installed in your virtual environment using the following command:

  ```bash
  cd <path_to_your_python_virtual_env>/lib/python<your_version>/site_packages/prophet/stan_model/
  ```

  For example, if you have created a python virtual environment in a `/venvs` folder in your home folder and used Python 3.9, the command above would look like:

  ```bash
  cd ~/venvs/soda-core-prophet11/lib/python3.9/site-packages/prophet/stan_model/
  ```

4. Add the `rpath` of the `tbb` library to your `prophet` installation using the following command:

```bash
install_name_tool -add_rpath @executable_path/cmdstan<your_cmdstan_version>/stan/lib/stan_math/lib/tbb prophet_model.bin
```
To find out which version of `cmdstan` was installed by `prophet` doing `ls` in the `stan_model` directory you navigated to in step 4 should display a folder named `cmdstan-<version_number>`. At the time of writing, the installed version is `2.26.1` so we would run:
```bash
install_name_tool -add_rpath @executable_path/cmdstan-2.26.1/stan/lib/stan_math/lib/tbb prophet_model.bin
```

5. Use soda-core with an anomaly check as you normally would.
