---
description: This page describes the bi-directional integration between Soda and Collibra.
hidden: true
noIndex: true
noRobotsIndex: true
---

# Collibra

The **Soda↔Collibra optimized integration** synchronizes data quality checks from Soda to Collibra, creating a unified view of your data quality metrics. The implementation is optimized for performance, reliability, and maintainability, with support for bi-directional ownership sync and advanced diagnostic metrics.

### Key features

* **High Performance**: 3-5x faster execution through caching, batching, and parallel processing
* **Custom Attribute Syncing**: Flexible mapping of Soda check attributes to Collibra attributes for rich business context
* **Ownership Synchronization**: Bi-directional ownership sync between Collibra and Soda
* **Diagnostic Metrics Processing**: Automatic extraction of diagnostic metrics from any Soda check type with intelligent fallbacks
* **Robust Error Handling**: Comprehensive retry logic and graceful error recovery
* **Advanced Monitoring**: Real-time metrics, performance tracking, and detailed reporting
* **CLI Interface**: Flexible command-line options for different use cases
* **Backward Compatibility**: Legacy test methods preserved for smooth migration

## Quickstart

> For technical details on how to configure the bi-directional Collibra integration, head to [setup-and-configuration.md](setup-and-configuration.md "mention").

### Prerequisites

* **Python 3.10+** required
* Valid Soda Cloud API credentials
* Valid Collibra API credentials
* Properly configured Collibra asset types and relations

### Basic Usage

```bash
# Run the integration with default settings
python main.py

# Run with debug logging for troubleshooting
python main.py --debug

# Use a custom configuration file
python main.py --config custom.yaml

# Show help and all available options
python main.py --help
```

### Advanced Usage

```bash
# Run legacy Soda client tests
python main.py --test-soda

# Run legacy Collibra client tests
python main.py --test-collibra

# Run with verbose logging (info level)
python main.py --verbose
```

## How It Works

### 1. **Optimized Dataset Processing**

* **Smart Filtering**: Only processes datasets marked for synchronization
* **Parallel Processing**: Handles multiple operations concurrently
* **Caching**: Reduces API calls through intelligent caching
* **Batch Operations**: Groups similar operations for efficiency

### 2. **Enhanced Check Processing**

For each check in a dataset:

#### **Asset Management**

* **Bulk Creation/Updates**: Processes multiple assets simultaneously
* **Duplicate Handling**: Intelligent naming to avoid conflicts
* **Status Tracking**: Monitors creation vs. update operations

#### **Attribute Processing**

* **Standard Attributes**: Evaluation status, timestamps, definitions
* **Diagnostic Metrics**: Automatically extracts and calculates diagnostic metrics from check results
* **Custom Attributes**: Flexible mappings for business context (see [Custom Attribute Syncing](https://github.com/sodadata/soda-collibra-integration/blob/main/documentation.md#-custom-attribute-syncing))
* **Batch Updates**: Groups attribute operations for performance

#### **Relationship Management**

* **Dimension Relations**: Links checks to data quality dimensions
* **Table/Column Relations**: Creates appropriate asset relationships
* **Error Recovery**: Graceful handling of missing or ambiguous assets

### 3. **Ownership Synchronization**

* **Collibra to Soda Sync**: Automatically syncs dataset owners from Collibra to Soda
* **User Mapping**: Maps Collibra users to Soda users by email address
* **Error Handling**: Tracks missing users and synchronization failures
* **Metrics Tracking**: Monitors successful ownership transfers

### 4. **Advanced Error Handling**

* **Retry Logic**: Exponential backoff for transient failures
* **Rate Limiting**: Intelligent throttling to avoid API limits
* **Error Aggregation**: Collects and reports all issues at the end
* **Graceful Degradation**: Continues processing despite individual failures

***

> Head to [setup-and-configuration.md](setup-and-configuration.md "mention") to learn how to integrate Collibra.
