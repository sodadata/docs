---
description: >-
  This page provides detailed information about how to configure the
  Soda↔Collibra integration.
---

# Setup & configuration

Both **Collibra** and **Soda** need to be configured so the integration can run successfully. This page covers both **Collibra** and **Soda** settings, including asset types, attribute types, relation types, and domain mappings. These settings establish the foundation for reliable synchronization of data quality checks and metadata between Soda and Collibra.

***

## Configuration Guide

### 1. Collibra Configuration

#### **Base Settings**

```yaml
collibra:
  base_url: "https://your-instance.collibra.com/rest/2.0"
  username: "your-username"
  password: "your-password"
  general:
    naming_delimiter: ">"  # Used to separate parts of asset names
```

#### **Asset Types**

Configure the different types of assets in Collibra:

```yaml
  asset_types:
    table_asset_type: "00000000-0000-0000-0000-000000031007"  # ID for Table assets
    soda_check_asset_type: "00000000-0000-0000-0000-000000031107"  # ID for Data Quality Metric type
    dimension_asset_type: "00000000-0000-0000-0000-000000031108"  # ID for Data Quality Dimension type
    column_asset_type: "00000000-0000-0000-0000-000000031109"  # ID for Column type
```

#### **Attribute Types**

Define the attributes that will be set on check assets:

```yaml
  attribute_types:
    # Standard Check Attributes
    check_evaluation_status_attribute: "00000000-0000-0000-0000-000000000238"  # Boolean attribute for pass/fail
    check_last_sync_date_attribute: "00000000-0000-0000-0000-000000000256"  # Last sync timestamp
    check_definition_attribute: "00000000-0000-0000-0000-000000000225"  # Check definition
    check_last_run_date_attribute: "01975dd9-a7b0-79fb-bb74-2c1f76402663"  # Last run timestamp
    check_cloud_url_attribute: "00000000-0000-0000-0000-000000000258"  # Link to Soda Cloud
    
    # Diagnostic Metric Attributes - Extracted from Soda check diagnostics
    check_loaded_rows_attribute: "00000000-0000-0000-0000-000000000233"      # Number of rows tested/loaded
    check_rows_failed_attribute: "00000000-0000-0000-0000-000000000237"      # Number of rows that failed
    check_rows_passed_attribute: "00000000-0000-0000-0000-000000000236"      # Number of rows that passed (calculated)
    check_passing_fraction_attribute: "00000000-0000-0000-0000-000000000240" # Fraction of rows passing (calculated)
```

#### **Diagnostic Attributes Behavior:**

* **Flexible Extraction**: Automatically extracts metrics from any diagnostic type (`missing`, `aggregate`, `valid`, etc.)
* **Future-Proof**: Works with new diagnostic types that Soda may introduce
* **Smart Fallbacks**: Falls back to `datasetRowsTested` if `checkRowsTested` is not available
* **Calculated Values**: Automatically computes `check_rows_passed` and `check_passing_fraction` when source data is available
* **Graceful Handling**: Leaves attributes empty when diagnostic data is not present in the check result

#### **Relation Types**

Define the types of relationships between assets:

```yaml
  relation_types:
    table_column_to_check_relation_type: "00000000-0000-0000-0000-000000007018"  # Relation between table/column and check
    check_to_dq_dimension_relation_type: "f7e0a26b-eed6-4ba9-9152-4a1363226640"  # Relation between check and dimension
```

#### **Responsibilities**

Configure ownership role mappings:

```yaml
  responsibilities:
    owner_role_id: "00000000-0000-0000-0000-000000005040"  # Collibra role ID for asset owners
```

#### **Domains**

Configure the domains where assets will be created:

```yaml
  domains:
    data_quality_dimensions_domain: "00000000-0000-0000-0000-000000006019"  # Domain for DQ dimensions
    soda_collibra_domain_mapping: '{"Sales": "0197377f-e595-7434-82c7-3ce1499ac620"}'  # Dataset to domain mapping
    soda_collibra_default_domain: "01975b4a-0ace-79f6-b5ec-68656ca60b11"  # Default domain if no mapping
```

### 2. Soda Configuration

#### **Base Settings**

```yaml
soda:
  api_key_id: "your-api-key-id"
  api_key_secret: "your-api-key-secret"
  base_url: "https://cloud.soda.io/api/v1"
```

#### **General Settings**

```yaml
  general:
    filter_datasets_to_sync_to_collibra: true  # Only sync datasets with sync attribute
    soda_no_collibra_dataset_skip_checks: false  # Skip checks if dataset not in Collibra
```

#### **Attributes**

Define Soda attributes and their mappings:

```yaml
  attributes:
    soda_collibra_sync_dataset_attribute: "collibra_sync"  # Attribute to mark datasets for sync
    soda_collibra_domain_dataset_attribute_name: "rulebook"  # Attribute for domain mapping
    soda_dimension_attribute_name: "dimension"  # Attribute for DQ dimension
```

***

## Custom Attribute Syncing

The integration supports syncing custom attributes from Soda checks to Collibra assets, allowing you to enrich your Collibra assets with business context and additional metadata from your data quality checks.

### How Custom Attribute Syncing Works

Custom attribute syncing enables you to map specific attributes from your Soda checks to corresponding attribute types in Collibra. When a check is synchronized, the integration will automatically extract the values of these attributes and set them on the created/updated Collibra asset.

### Configuration

To enable custom attribute syncing, add the `custom_attributes_mapping_soda_attribute_name_to_collibra_attribute_type_id` configuration to your `config.yaml` file:

```yaml
soda:
  attributes:
    # ... other attributes ...
    custom_attributes_mapping_soda_attribute_name_to_collibra_attribute_type_id: '{"soda_attribute_id": "collibra_attribute_type_uuid", "another_soda_attribute": "another_collibra_uuid"}'
```

The configuration value is a **JSON string** containing key-value pairs where:

* **Key**: The name of the attribute in Soda (as it appears on your Soda checks)
* **Value**: The UUID of the corresponding attribute type in Collibra

### Step-by-Step Setup

#### **1. Identify Soda Attributes**

First, identify which attributes from your Soda checks you want to sync to Collibra. Common examples include:

* `description` - Check description
* `business_impact` - Business impact assessment
* `data_domain` - Data domain classification
* `criticality` - Data criticality level
* `owner_team` - Owning team information

#### **2. Find Collibra Attribute Type UUIDs**

For each Soda attribute, find the corresponding attribute type UUID in Collibra:

1. Navigate to your Collibra instance
2. Go to **Settings** → **Metamodel** → **Attribute Types**
3. Find or create the attribute types you want to map to
4. Copy the UUID of each attribute type

#### **3. Create the JSON Mapping**

Create a JSON object mapping Soda attribute names to Collibra attribute type UUIDs:

```yaml
{
  "description": "00000000-0000-0000-0000-000000003114",
  "business_impact": "01975f7b-0c04-7b98-9fb8-6635261a7c7b",
  "data_domain": "0197ca72-aee8-7259-9e88-5b98073147ed"
}
```

#### **4. Add to Configuration**

Add the JSON mapping to your `config.yaml` file as a single-line string:

```yaml
soda:
  attributes:
    custom_attributes_mapping_soda_attribute_name_to_collibra_attribute_type_id: '{"description": "00000000-0000-0000-0000-000000003114", "business_impact": "01975f7b-0c04-7b98-9fb8-6635261a7c7b", "data_domain": "0197ca72-aee8-7259-9e88-5b98073147ed"}'
```

### Complete Example

Here's a complete example showing how to configure custom attribute syncing:

**Soda Check with Custom Attributes:**

```yaml
checks for orders:
  - row_count > 0:
      attributes:
        description: "Ensures orders table is not empty"
        business_impact: "critical"
        data_domain: "sales"
        criticality: "high"
```

#### **Collibra Configuration:**

```yaml
soda:
  attributes:
    soda_collibra_sync_dataset_attribute: "collibra_sync"
    soda_collibra_domain_dataset_attribute_name: "rulebook"
    soda_dimension_attribute_name: "dimension"
    custom_attributes_mapping_soda_attribute_name_to_collibra_attribute_type_id: '{"description": "00000000-0000-0000-0000-000000003114", "business_impact": "01975f7b-0c04-7b98-9fb8-6635261a7c7b", "data_domain": "0197ca72-aee8-7259-9e88-5b98073147ed", "criticality": "0197f2a8-1234-5678-9abc-def012345678"}'
```

**Result:** When this check is synchronized, the integration will create a Collibra asset with these attributes automatically set:

* Description: "Ensures orders table is not empty"
* Business Impact: "critical"
* Data Domain: "sales"
* Criticality: "high"

### ⚠️ Important Notes

1. **JSON Format**: The mapping must be a valid JSON string enclosed in single quotes
2. **Attribute Type UUIDs**: Use the exact UUIDs from your Collibra metamodel
3. **Case Sensitivity**: Soda attribute names are case-sensitive and must match exactly
4. **Missing Attributes**: If a Soda check doesn't have an attribute defined in the mapping, it will be skipped (no error)
5. **Invalid UUIDs**: Invalid Collibra attribute type UUIDs will cause the sync to fail for that attribute

### Troubleshooting

**Common Issues:**

* **Invalid JSON**: Ensure the JSON string is properly formatted and enclosed in single quotes
* **Attribute Not Found**: Verify the Soda attribute names match exactly what's defined in your checks
* **UUID Errors**: Confirm the Collibra attribute type UUIDs are correct and exist in your instance
* **Permission Issues**: Ensure your Collibra user has permissions to set the specified attribute types

**Debug Mode:** Run with debug mode to see detailed logging about custom attribute processing:

```bash
python main.py --debug
```

Look for log messages like:

* `Processing custom attribute: attribute_name`
* `Successfully set custom attribute: attribute_name`
* `Skipping custom attribute (not found in check): attribute_name`

***

## Ownership Synchronization

The integration supports automatic synchronization of dataset ownership from Collibra to Soda.

### **How It Works**

1. **Asset Discovery**: For each dataset, finds the corresponding table asset in Collibra
2. **Responsibility Extraction**: Retrieves ownership responsibilities from Collibra
3. **User Mapping**: Maps Collibra users to Soda users by email address
4. **Ownership Update**: Updates the Soda dataset with synchronized owners
5. **Error Tracking**: Records any failures for monitoring

### **Configuration Requirements**

Ensure the following are configured in your `config.yaml`:

```yaml
collibra:
  responsibilities:
    owner_role_id: "00000000-0000-0000-0000-000000005040"  # Collibra owner role ID
```

### **Monitoring**

Ownership synchronization is tracked in the integration metrics:

* **👥 Owners synchronized**: Number of successful ownership transfers
* **❌ Ownership sync failures**: Number of failed synchronization attempts

### **Error Handling**

Common issues and their handling:

* **Missing Collibra Asset**: Skip ownership sync for that dataset
* **No Collibra Owners**: Log information message, continue processing
* **User Email Mismatch**: Track as error, continue with remaining users
* **Soda API Failures**: Retry with exponential backoff

***

> For advanced configuration details, head to [operations-and-advanced-usage.md](operations-and-advanced-usage.md "mention").
