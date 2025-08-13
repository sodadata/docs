---
title: What does the scan command do?
---

<details>

<summary>What does the scan command do?</summary>

* `docker run` ensures that the docker engine runs a specific image.
* `-v` mounts your SodaCL files into the container. In other words, it makes the configuration.yml and checks.yml files in your local environment available to the docker container. The command example maps your local directory to `/sodacl` inside of the docker container.
* `sodadata/soda-library` refers to the image that `docker run` must use.
* `scan` instructs Soda Library to execute a scan of your data.
* `-d` indicates the name of the data source to scan.
* `-c` specifies the filepath and name of the configuration YAML file.

</details>
