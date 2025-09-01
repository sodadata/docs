---
description: >-
  This reference explains how to use the Soda Core Python API to generate, test,
  publish, and verify data contracts using local execution (Soda Core) or remote
  execution (Soda Agent).
---

# Python API

## Installation

Install the Soda package for your data source:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-postgres
```

> Replace `soda-postgres` with the appropriate package for your data source. See the [data-source-reference-for-soda-core](data-source-reference-for-soda-core/ "mention")for supported packages and configurations.

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

Running a verification returns a **`ContractVerificationSessionResult`** that aggregates results for one or more contracts verified in a single session. Use it to read logs and errors across contracts and to compute high-level pass/fail counts. Each contract gets a **`ContractVerificationResult`** per-check **`CheckResult`** entries and derived counters.&#x20;

***

#### Contract Verification Session Result

Represents the overall verification session (may include multiple contracts).&#x20;

**Attributes**

* `contract_verification_results: list[ContractVerificationResult]` : all per-contract results.  See [#contract-verification-result](python-api.md#contract-verification-result "mention")

**Methods & Properties**

* `get_logs() -> list[str]` : concatenated logs from all contracts.&#x20;
* `get_logs_str() -> str` :  newline-joined logs.&#x20;
* `get_errors() -> list[str]` / `get_errors_str() -> str` : aggregated error lines from logs.&#x20;
* `number_of_checks: int` : sum across contracts.&#x20;
* `number_of_checks_passed: int` : sum across contracts.&#x20;
* `number_of_checks_failed: int` : sum across contracts.&#x20;
* `has_errors: bool` : true if any contract has execution errors.&#x20;
* `is_failed: bool` : true if any contract has failed checks. Ignores execution errors.&#x20;
* `is_passed: bool` : true if all contracts have no failed checks. Ignores execution errors.&#x20;
* `is_ok: bool` : true if all contracts are both not failed and have no errors.&#x20;
* `assert_ok() -> ContractVerificationSessionResult` : raises `SodaException` if not ok.&#x20;

***

#### ContractVerificationResult

Immutable outcome for a **single** contract: status, timing, measurements, and per-check results.&#x20;

**Attributes**

* `contract: Contract` :  See [#contract](python-api.md#contract "mention")
* `data_source: DataSource` :  See [#datasource](python-api.md#datasource "mention")
* `data_timestamp: Optional[datetime]` :  data time context (if any).&#x20;
* `started_timestamp: datetime` / `ended_timestamp: datetime` :  execution window.&#x20;
* `status: ContractVerificationStatus` : `FAILED`, `PASSED`, `ERROR`, or `UNKNOWN`.   See [#contractverificationresult](python-api.md#contractverificationresult "mention")
* `measurements: list[Measurement]` — See [#checkresult](python-api.md#checkresult "mention")
* `check_results: list[CheckResult]` — See [#check-result](python-api.md#check-result "mention")
* `sending_results_to_soda_cloud_failed: bool` : whether publishing failed.&#x20;
* `log_records: Optional[list[logging.LogRecord]]` : detailed logs.&#x20;

**Methods & Properties**

* `get_logs() -> list[str]` / `get_logs_str() -> str` : pull message text from log records.&#x20;
* `get_errors() -> list[str]` / `get_errors_str() -> str` : log lines at error level or higher.&#x20;
* `has_errors: bool` : true if status is `ERROR`.&#x20;
* `is_failed: bool` : true if status is `FAILED`. (Only checks, not execution errors.)&#x20;
* `is_passed: bool` : true if status is `PASSED`. (Ignores execution errors.)&#x20;
* `is_ok: bool` : not failed and not in error.&#x20;
* `number_of_checks: int` / `number_of_checks_passed: int` / `number_of_checks_failed: int` : counts derived from `check_results`.&#x20;

***

#### CheckResult

Represents the outcome of a single check in the contract.&#x20;



**Attributes & Convenience**

* `check: Check` :  See [#check](python-api.md#check "mention")
* `outcome: CheckOutcome` :  `PASSED`, `FAILED`, or `NOT_EVALUATED`.   See [#checkoutcome](python-api.md#checkoutcome "mention")
* `threshold_value: Optional[float|int]` : threshold applied.&#x20;
* `diagnostic_metric_values: Optional[dict[str, float|int|str]]` :  diagnostic metrics.&#x20;
* `autogenerate_diagnostics_payload: bool` : whether to auto-format diagnostics.&#x20;
* `is_passed: bool` / `is_failed: bool` / `is_not_evaluated: bool` : convenience flags.&#x20;
* `outcome_emoticon: str` : Unicode for quick visual status.&#x20;
* `log_table_row() -> dict` : compact, user-friendly log row (includes diagnostics).&#x20;
* `log_table_row_diagnostics(verbose: bool=True) -> str` : formatted diagnostic string; uses `_log_console_format(...)` for short form.&#x20;
* `diagnostics_to_camel_case() -> dict[str, Any]` : converts diagnostic metric keys to camelCase (useful for Soda Cloud).&#x20;

***

#### CheckOutcome

`PASSED`, `FAILED`, `NOT_EVALUATED`.&#x20;

***

#### Measurement

Metric container captured during verification.

**Attributes**

* `metric_id: str` : unique identifier of the metric.
* `metric_name: Optional[str]` :  name of the metric.
* `value: Any` : captured value of the metric.

***

#### ContractVerificationStatus

Execution status of a contract. Drives `is_failed`, `is_passed`, and `has_errors`.

**Values**

* `UNKNOWN` : status not determined.
* `FAILED` : contract executed and one or more checks failed.
* `PASSED` : contract executed and all checks passed.
* `ERROR` : execution error occurred.

***

#### Check

Represents the executed check definition (identity, type, threshold, etc.).

**Attributes**

* `type: str` : check type (e.g., `missing`, `row_count`).
* `name: Optional[str]` : ame of the check.
* `qualifier: Optional[str]` : string to distinguish multiple checks of same type.
* `identity: str` : unique identifier of the check, **used to correlate results in Soda Cloud**. It is **automatically generated based on the check path** in the contract.
* `column_name: Optional[str]` : column the check applies to (if applicable).
* `threshold: Optional[Threshold]` : threshold configuration for this check.
* `attributes: dict[str, Any]` : metadata attributes (for Soda Cloud, routing, etc.).
* `location: str` : where in the contract YAML the check is defined.

***

#### Threshold

Configured numeric boundaries for a check outcome.

**Attributes**

* `must_be: Optional[float|int]` : value must equal the configured number.
* `must_not_be: Optional[float|int]` : value must not equal the configured number.
* `must_be_greater_than: Optional[float|int]` : value must be strictly greater than.
* `must_be_greater_than_or_equal: Optional[float|int]` : value must be greater than or equal.
* `must_be_less_than: Optional[float|int]` : value must be strictly less than.
* `must_be_less_than_or_equal: Optional[float|int]` : value must be less than or equal.
* `must_be_between: Optional[dict]` : value must be within the specified range.
* `must_be_not_between: Optional[dict]` : value must not be within the specified range.

***

#### Contract

Describes the verified contract (dataset identity and source info).

**Attributes**

* `data_source_name  str` : name of the data source (as configured in Soda).
* `dataset_prefix: str` : hierarchical prefix (e.g., db, schema).
* `dataset_name: str` : name of the dataset (table/view).
* `soda_qualified_dataset_name: str` : full qualified dataset identifier.
* `source: YamlFileContentInfo` : reference to YAML source definition. See [#yamlfilecontentinfo](python-api.md#yamlfilecontentinfo "mention")

***

#### YamlFileContentInfo

Describes where the YAML was loaded from.

**Attributes**

* `inline_str: Optional[str]` : YAML provided inline.
* `local_path: Optional[str]` : local file path to the YAML.

***

#### DataSource

Represents the data source used for verification.

**Attributes**

* `name: str` : logical name of the data source.
* `type: str` : type of the data source (e.g., Postgres, Snowflake, BigQuery).

***

#### Error Handling

* **`assert_ok()`** (on both `ContractVerificationSessionResult` and `ContractVerificationResult`) raises **`SodaException`** with a human-readable error string if the verification is not OK. &#x20;
* **`SodaException`** carries the `contract_verification_result` for context.

