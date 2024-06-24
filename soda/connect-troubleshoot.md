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