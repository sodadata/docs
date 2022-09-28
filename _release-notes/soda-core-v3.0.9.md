---
name: "3.0.9"
date: 2022-09-28
products:
  - soda-core
---

## Enhancements and bug fixes

* Limit failed rows sample limit to 1000 by @m1n0 in #1599
* Add scan result getter by @m1n0 in #1602
* BigQuery separate project for compute and storage. by @m1n0 in #1598
* Scan results file argument by @vijaykiran in #1603
* Chore/move snowflake account by @jmarien in #1607
* Use filename in check identity by @m1n0 in #1606

Refer to the <a href="https://github.com/sodadata/soda-core/releases" target="_blank">Soda Core Release Notes </a> for details.

## Troubleshoot

**Problem:** When you run a scan using Soda Core 3.0.9, you get an error message that reads, `from google.protobuf.pyext import _message ImportError: dlopen(.../site-packages/google/protobuf/pyext/_message.cpython-310-darwin.so, 0x0002): symbol not found in flat namespace`

**Solution:** This is the result of a transitive dependency from open telemetry that gathers OSS usage statistics. To resolve:
1. From the command-line, in the directory in which you installed your soda-core package, run `pip uninistall protobuf`.
2. Reinstall protobuf with the command `pip install protobuf==3.19.4`.

