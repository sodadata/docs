---
description: >-
  This page provides detailed information about everything that happens while
  running and after running the Soda↔Collibra integration.
---

# Operations & advanced usage

Advanced usage focuses on **running and maintaining** the Soda↔Collibra bi-directional integration **after setup**. The goal is to equip technical implementers with the detail required to operate the integration efficiently, resolve issues quickly, and adapt it to complex environments.

***

## Performance & Monitoring

### **Performance Optimization**

#### **Caching System**

* **Domain Mappings**: Cached for the entire session
* **Asset Lookups**: LRU cache reduces repeated API calls
* **Configuration Parsing**: One-time parsing with caching

#### **Batch Processing**

* **Asset Operations**: Create/update multiple assets in single calls
* **Attribute Management**: Bulk attribute creation and updates
* **Relation Creation**: Batch relationship establishment

#### **Performance Results**

* **3-5x faster** execution vs. original implementation
* **60% fewer** API calls through caching
* **90% reduction** in rate limit errors
* **Improved reliability** with comprehensive error handling

### **Performance Benchmarks**

#### **Typical Performance**

* **Small datasets** (< 100 checks): 30-60 seconds
* **Medium datasets** (100-1000 checks): 2-5 minutes
* **Large datasets** (1000+ checks): 5-15 minutes

Performance varies based on:

* Network latency to APIs
* Number of existing vs. new assets
* Complexity of relationships
* API rate limits

### **Monitoring & Metrics**

#### **Integration Completion Report**

```
============================================================
🎉 INTEGRATION COMPLETED SUCCESSFULLY 🎉
============================================================
📊 Datasets processed: 15
⏭️  Datasets skipped: 2
✅ Checks created: 45
🔄 Checks updated: 67
📝 Attributes created: 224
🔄 Attributes updated: 156
🔗 Dimension relations created: 89
📋 Table relations created: 23
📊 Column relations created: 89
👥 Owners synchronized: 12
❌ Ownership sync failures: 1

🎯 Total operations performed: 693
============================================================
```

#### **Debug Logging**

Enable detailed logging for troubleshooting:

```bash
python main.py --debug
```

Debug output includes:

* Dataset processing details
* API call timing and results
* Caching hit/miss statistics
* Error context and stack traces
* Performance metrics per operation
* Ownership synchronization details

***

## Diagnostic Metrics Processing

The integration automatically extracts diagnostic metrics from Soda check results and populates detailed row-level statistics in Collibra.

### **Supported Metrics**

| Metric                             | Source                                   | Description                                 |
| ---------------------------------- | ---------------------------------------- | ------------------------------------------- |
| `check_loaded_rows_attribute`      | `checkRowsTested` or `datasetRowsTested` | Total number of rows evaluated by the check |
| `check_rows_failed_attribute`      | `failedRowsCount`                        | Number of rows that failed the check        |
| `check_rows_passed_attribute`      | **Calculated**                           | `check_loaded_rows` - `check_rows_failed`   |
| `check_passing_fraction_attribute` | **Calculated**                           | `check_rows_passed` / `check_loaded_rows`   |

### **Flexible Diagnostic Type Support**

The system automatically extracts metrics from **any diagnostic type**, making it future-proof:

#### **Current Soda Diagnostic Types**

```json
// Missing value checks
{
  "diagnostics": {
    "missing": {
      "failedRowsCount": 3331,
      "failedRowsPercent": 1.213,
      "datasetRowsTested": 274577,
      "checkRowsTested": 274577
    }
  }
}

// Aggregate checks  
{
  "diagnostics": {
    "aggregate": {
      "datasetRowsTested": 274577,
      "checkRowsTested": 274577
    }
  }
}
```

#### **Future Diagnostic Types (Automatically Supported)**

```json
// Hypothetical future types
{
  "diagnostics": {
    "valid": {
      "failedRowsCount": 450,
      "validRowsCount": 9550,
      "checkRowsTested": 10000
    },
    "duplicate": {
      "duplicateRowsCount": 200,
      "checkRowsTested": 8000
    }
  }
}
```

### **Intelligent Extraction Logic**

The system uses a **metric-focused approach** rather than type-specific logic:

1. **Scans All Diagnostic Types**: Iterates through every diagnostic type in the response
2. **Extracts Relevant Metrics**: Looks for specific metric fields regardless of diagnostic type name
3. **Applies Smart Fallbacks**: Uses `datasetRowsTested` if `checkRowsTested` is not available
4. **Calculates Derived Metrics**: Computes passing rows and fraction when source data is available
5. **Handles Missing Data**: Gracefully skips attributes when diagnostic data is unavailable

### **Fallback Mechanisms**

| Priority | Field Used          | Fallback Reason                                                     |
| -------- | ------------------- | ------------------------------------------------------------------- |
| 1st      | `checkRowsTested`   | Preferred - rows actually tested by the specific check              |
| 2nd      | `datasetRowsTested` | Fallback - total dataset rows when check-specific count unavailable |

### **Example Processing Flow**

**Input: Soda Check Result**

```json
{
  "name": "customer_id is present",
  "evaluationStatus": "fail",
  "lastCheckResultValue": {
    "value": 1.213,
    "diagnostics": {
      "missing": {
        "failedRowsCount": 3331,
        "checkRowsTested": 274577
      }
    }
  }
}
```

**Output: Collibra Attributes**

```json
Attributes Set:
  - check_loaded_rows_attribute: 274577           # From checkRowsTested
  - check_rows_failed_attribute: 3331             # From failedRowsCount  
  - check_rows_passed_attribute: 271246           # Calculated: 274577 - 3331
  - check_passing_fraction_attribute: 0.9879      # Calculated: 271246 / 274577
```

### **Benefits**

* ✅ **Future-Proof**: Automatically works with new diagnostic types Soda introduces
* ✅ **Comprehensive**: Provides both raw metrics and calculated insights
* ✅ **Flexible**: Handles partial data gracefully with intelligent fallbacks
* ✅ **Accurate**: Uses check-specific row counts when available
* ✅ **Transparent**: Detailed logging shows exactly which metrics were found and used

***

## Testing

### **Unit Tests**

```
# Run all tests
python -m pytest tests/ -v

# Run specific test file
python -m pytest tests/test_integration.py -v

# Run with coverage
python -m pytest tests/ --cov=integration --cov-report=html
```

### **Local Kubernetes Testing**

> Head to [deploy-on-kubernetes.md](deploy-on-kubernetes.md "mention") to learn more about the Kubernetes deployment.

```bash
# Comprehensive local testing (recommended)
python testing/test_k8s_local.py

# Docker-specific testing
./testing/test_docker_local.sh

# Quick validation
python testing/validate_k8s.py
```

### **Legacy Tests**

```bash
# Test Soda client functionality
python main.py --test-soda

# Test Collibra client functionality
python main.py --test-collibra
```

***

## &#x20;Advanced Configuration

### **Performance Tuning**

Modify `constants.py` for your environment:

<pre class="language-python"><code class="lang-python"><strong>class IntegrationConstants:
</strong>    MAX_RETRIES = 3              # API retry attempts
    BATCH_SIZE = 50              # Batch operation size
    DEFAULT_PAGE_SIZE = 1000     # API pagination size
    RATE_LIMIT_DELAY = 2         # Rate limiting delay
    CACHE_MAX_SIZE = 128         # LRU cache size
</code></pre>

### **Enhanced Configuration Options**

For detailed information on configuring custom attribute syncing, see the [Custom Attribute Syncing](https://github.com/sodadata/soda-collibra-integration/blob/main/documentation.md#-custom-attribute-syncing) section above.

### **Custom Logging**

```python
# In your code
import logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

### **Environment Variables**

```python
# Set custom config path
export SODA_COLLIBRA_CONFIG=/path/to/custom/config.yaml

# Enable debug mode
export SODA_COLLIBRA_DEBUG=true
```

***

## Troubleshooting

### **Common Issues**

#### **Performance Issues**

* **Slow Processing**: Increase `BATCH_SIZE` and `DEFAULT_PAGE_SIZE`
* **Rate Limiting**: Increase `RATE_LIMIT_DELAY`
* **Memory Usage**: Decrease `CACHE_MAX_SIZE`

#### **Connection Issues**

* **API Timeouts**: Check network connectivity and API endpoints
* **Authentication**: Verify credentials and permissions
* **Rate Limits**: Monitor API usage and adjust delays

#### **Data Issues**

* **Missing Assets**: Ensure required asset types exist in Collibra
* **Relation Failures**: Verify relation type configurations
* **Domain Mapping**: Check domain IDs and JSON formatting

#### **Diagnostic Metrics Issues**

* **Missing Diagnostic Attributes**: Check if Soda checks have `lastCheckResultValue.diagnostics` data
* **Incomplete Metrics**: Some diagnostic types may only have partial metrics (e.g., `aggregate` checks lack `failedRowsCount`)
* **Attribute Type Configuration**: Verify diagnostic attribute type IDs are configured correctly in `config.yaml`
* **Zero Division Errors**: System automatically prevents division by zero when calculating fractions

### **Debug Commands**

```bash
# Full debug output
python main.py --debug 2>&1 | tee debug.log

# Verbose logging with timestamps
python main.py --verbose

# Test specific components
python main.py --test-soda --debug
python main.py --test-collibra --debug
```

### **Log Analysis**

Look for these patterns in debug logs:

#### **General Operation Patterns:**

* `Rate limit prevention`: Normal throttling behavior
* `Successfully updated/created`: Successful operations
* `Skipping dataset`: Expected filtering behavior
* `ERROR`: Issues requiring attention

#### **Diagnostic Processing Patterns:**

* `Processing diagnostics`: Diagnostic data found in check result
* `Found failedRowsCount in 'X'`: Successfully extracted failure count from diagnostic type X
* `Found checkRowsTested in 'X'`: Successfully extracted row count from diagnostic type X
* `Using datasetRowsTested from 'X' as fallback`: Fallback mechanism activated
* `No diagnostics found in check result`: Check has no diagnostic data (normal for some check types)
* `Calculated check_rows_passed`: Successfully computed passing rows
* `Added check_X_attribute`: Diagnostic attribute successfully added to Collibra

***

## Reference

### **Common Commands**

```bash
# Basic run with default config
python main.py

# Debug mode with detailed logging
python main.py --debug

# Use custom configuration file
python main.py --config custom.yaml

# Test individual components
python main.py --test-soda --debug
python main.py --test-collibra --debug
```

### **Key Configuration Sections**

* **Collibra Base**: `collibra.base_url`, `collibra.username`, `collibra.password`
* **Soda API**: `soda.api_key_id`, `soda.api_key_secret`
* **Custom Attributes**: `soda.attributes.custom_attributes_mapping_soda_attribute_name_to_collibra_attribute_type_id`
* **Domain Mapping**: `collibra.domains.soda_collibra_domain_mapping`
* **Ownership Sync**: `collibra.responsibilities.owner_role_id`

### **Essential UUIDs to Configure**

* Asset types (table, check, dimension, column)
* Attribute types (evaluation status, sync date, diagnostic metrics)
* Relation types (table-to-check, check-to-dimension)
* Domain IDs for asset creation



***

### Support

For issues and questions:

1. Check the [#troubleshooting](operations-and-advanced-usage.md#troubleshooting "mention") section
2. Enable [#debug-logging](operations-and-advanced-usage.md#debug-logging "mention") for detailed information
3. Review the performance metrics for bottlenecks
4. Consult the [#unit-tests](operations-and-advanced-usage.md#unit-tests "mention") for usage examples
5. Contact [support@soda.io](mailto:support@soda.io) for additional help
