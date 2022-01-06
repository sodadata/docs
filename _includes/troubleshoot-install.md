**Problem:** There are known issues on Soda SQL when using pip version 19. <br />
**Solution:** Upgrade `pip` to version 20 or greater using the following command:
```shell
$ pip install --upgrade pip
```
<br />

**Problem:** Upgrading Soda SQL does not seem to work. <br />
**Solution:** Run the following command to skip your local cache when upgrading your Soda SQL version:
```shell
$ pip install --upgrade --no-cache-dir soda-sql-yourdatasource
```
<br />

**Problem:** I can't run the `soda` command in my CLI. It returns `command not found: soda`. <br />
**Solution:** If you followed the instructions to [install Soda SQL]({% link soda-sql/installation.md %}) and still received the error, you may need to adjust your `$PATH` variable. 
1. Run the following command to find the path to your installation of Python, replacing `soda-sql-postgresql` with the install package that matches the type of warehouse you use if not PostgreSQL:<br />
`pip show soda-sql-postgresql`
<br /> <br /> The output indicates the Location that looks something like this example:
```shell
...
Location: /Users/yourname/Library/Python/3.8/lib/python/site-packages
...
```
2. Add the location to your `$PATH` variable using the `export PATH` command as follows:<br />
`'export PATH=$PATH:/Users/yourname/Library/Python/3.8/bin soda'`
3. Run the `soda` command again to receive the following output:<br />
```shell
Usage: soda [OPTIONS] COMMAND [ARGS]...
  Soda CLI version 2.1.xxx
Options:
  --help  Show this message and exit.
Commands:
  analyze  Analyze tables and scaffold SCAN YAML
  create   Create a template warehouse.yml file
  ingest   Ingest test information from different tools
  scan     Compute metrics and run tests for a given table
```

