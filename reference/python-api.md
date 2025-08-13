# Python API

This reference explains how to use the Soda Core Python API to generate, test, publish, and verify data contracts using local execution (Soda Core) or remote execution (Soda Agent).

***

## Installation

Install the Soda package for your data source:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-postgres
```

Replace `soda-postgres` with the appropriate package for your data source. See the [data-source-reference-for-soda-core](data-source-reference-for-soda-core/ "mention")for supported packages and configurations.

***

#### **Configure Logging**

To enable logging for contract operations, use:

```python
from soda_core import configure_logging

# Enable or disable verbose logging
configure_logging(verbose=True)
```

To access logs **after** a verification run:

```python
from soda_core.contracts import verify_contracts_on_agent

result = verify_contracts_on_agent(
    contract_file_paths="path/to/contract.yaml", 
    soda_cloud_file_path="path/to/soda_cloud.yml",
)

result.get_logs()
```

***

## Verify a local Contract with Soda Core

Use `verify_contracts_locally` to run the verification using local configuration and execution:

```python
from soda_core.contracts import verify_contracts_locally

result = verify_contracts_locally(
    data_source_file_path="path/to/data_source.yml",
    contract_file_paths=["contract1.yaml", "contract2.yaml"],
    soda_cloud_file_path="path/to/soda_cloud.yml",
    variables={"START_DATE": "2024-01-01"},
    publish=False,
)
```

<table><thead><tr><th width="199.44921875">Parameter</th><th>Required</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>data_source_file_path</code></td><td>Yes</td><td>str</td><td>Path(s) to data source file <a data-mention href="data-source-reference-for-soda-core/">data-source-reference-for-soda-core</a></td></tr><tr><td><code>contract_file_paths</code></td><td>Yes (or is <code>dataset_identifiers</code> required)</td><td>str or list[str]</td><td>Path(s) to local contract file(s)</td></tr><tr><td><code>dataset_identifiers</code></td><td>Yes (or is <code>contract_file_paths</code> required)</td><td>list[str]</td><td>Dataset identifiers to fetch contracts from Soda Cloud</td></tr><tr><td><code>variables</code></td><td>No</td><td>dict</td><td>Variables to override in contract</td></tr><tr><td><code>publish</code></td><td>No</td><td>bool</td><td>Push results to Soda Cloud</td></tr><tr><td><code>soda_cloud_file_path</code></td><td>No (unless publish is True)</td><td>str</td><td>Path to Soda Cloud config file</td></tr></tbody></table>

***

## Verify Contract with Soda Agent

Use `verify_contracts_on_agent` to run verification remotely via Soda Agent.

```python
from soda_core.contracts import verify_contracts_on_agent

result = verify_contracts_on_agent(
    contract_file_paths="path/to/contract.yaml",  # or list of paths
    soda_cloud_file_path="path/to/soda_cloud.yml",
    variables={"COUNTRY": "US"},
    publish=True,
)
```

<table><thead><tr><th width="199.44921875">Parameter</th><th>Required</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>contract_file_paths</code></td><td>Yes (or is <code>dataset_identifiers</code> required)</td><td>str or list[str]</td><td>Path(s) to local contract file(s)</td></tr><tr><td><code>dataset_identifiers</code></td><td>Yes (or is <code>contract_file_paths</code> required)</td><td>list[str]</td><td>Dataset identifiers to fetch contracts from Soda Cloud</td></tr><tr><td><code>variables</code></td><td>No</td><td>dict</td><td>Variables to override in contract</td></tr><tr><td><code>publish</code></td><td>No</td><td>bool</td><td>Push results to Soda Cloud</td></tr><tr><td><code>soda_cloud_file_path</code></td><td>Yes</td><td>str</td><td>Path to Soda Cloud config file</td></tr><tr><td><code>blocking_timeout_in_minutes</code></td><td>No</td><td>int</td><td>How long to wait for the agent to return results (default: 60 minutes)</td></tr></tbody></table>

***

## Result Object

Both `verify_contracts_on_agent` and `verify_contracts_locally` return a result object with the following methods:

```python
result.is_failed()     # Returns True if any check failed
result.get_logs()      # Returns log output (only if logging was enabled)
```
