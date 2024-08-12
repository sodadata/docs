---
layout: default
title: Troubleshoot data source connections
description: 
parent: 
---

# Troubleshoot data source connections
Last modified on {% last_modified_at %}

[SSL certificate error](#ssl-certificate-error)<br />
[Snowflake proxy connection error](#go-further)<br />
[Spark DataFrame object error](#spark-dataframe-object-error)<br />
[ImportError during programmatic scan](#importerror-during-programmatic-scan)<br />
[Scan error with Soda Dask and Pandas](#scan-error-with-soda-dask-and-pandas)<br />
[Go further](#go-further)<br />
<br />

<hr/>

## SSL certificate error

**Problem:** You encounter an SSL certificate error while attempting to connect Soda to a data source.

**Solution:** Use `pip install pip-system-certs` to potentially resolve the issue. This install works to resolve the issue only on Windows machines where the Ops team installs all the certificates needed through Group Policy Objects, or similar. 

## Snowflake proxy connection error

{% include snowflake-proxy.md %}

## Spark DataFrame object error

**Problem:** Using a Soda package for Spark df, you encounter an error that reads, `ERROR  | Error occurred while executing scan. | 'DataFrame' object has no attribute 'offset'`.

**Solution:** Be sure to upgrade your version of PySpark to 3.4.0 or greater for compatibility with Soda packages.

## ImportError during programmatic scan

**Problem:** When importing Soda scan, you get an error that reads, `ImportError: cannot import name 'field_validator' from 'pydantic'...`.

**Solution:** This error typically emerges when your environment is using pydantic v1 instead of v2. Soda requires pydantic v2 to work and this is correctly set via installation requirements in the package, however Python allows you to override those requirements. Use `pip list | grep "pydantic"` to determine which version you are using and upgrade as necessary.

<br />

## Scan error with Soda Dask and Pandas

**Problem:** You encounter errors when trying to install `soda-dask-pandas` in an environment that uses Python 3.11. This may manifest as an issue with dependencies or as an error that reads, `Pre-scan validation failed, see logs for details.`

**Workaround:** Uninstall the `soda-dask-pandas` package, then downgrade the version of Python your environment uses to Python 3.9. Install the `soda-dask-pandas` package again. 

<br />

## Go further

* Access [Troubleshoot SodaCL]({% link soda-cl/troubleshoot.md %}) for help resolving issues running scans with SodaCL.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}