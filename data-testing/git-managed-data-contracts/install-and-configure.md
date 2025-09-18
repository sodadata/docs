# Install and configure

Before you can define, test, or verify Git-managed data contracts, you need to install the Soda CLI and configure your environment.

This setup gives you full control over your contracts, letting you version them in Git, execute them locally or remotely, and integrate them into your CI/CD pipelines.

## Install the Soda CLI

Install the Soda Core using `pip`:

```javascript
pip install -i https://pypi.dev.sodadata.io/simple soda-postgres
```

{% hint style="info" %}
Replace `postgres` with the name of your data source type, e.g., `snowflake`, `databricks`, etc. See [here](../../reference/data-source-reference-for-soda-core/) for a list of supported data source types.&#x20;
{% endhint %}

### Connect to Soda Cloud (optional)

If you want to interact with Soda Cloud to **publish contracts** and **view verification results**, or to **use Soda Agent**, you’ll need to connect the CLI to your Soda Cloud account.

> Don’t have an account? [Sign up here](https://beta.soda.io) to get started.

### **Create the config file**

```javascript
soda cloud create -f sc.yml
```

This generates a basic Soda Cloud configuration file.

### **Add your API keys**

Open `sc.yml` and fill in your API key and organization details.

> Learn more about how to generate keys: [generate-api-keys.md](../../reference/generate-api-keys.md "mention")

### **Test the connection**

```javascript
soda cloud test -sc sc.yml
```

This ensures the CLI can authenticate and communicate with Soda Cloud.

## Configure Your Data Source

To verify a contract, Soda needs to know how to connect to your data source. You have **two options**:

### **Connect with Soda Core**

If you prefer to define your own connection locally (or aren’t using a Soda Agent), you can create a data source config file for **Soda Core**.

Install the required package for your data source.\
For example, for PostgreSQL:

```javascript
pip install -i https://pypi.dev.sodadata.io "soda-postgres>=4.0.0.dev1" -U
```

> See the [data-source-reference-for-soda-core](../../reference/data-source-reference-for-soda-core/ "mention") for supported packages and configurations.

#### Create the config file

```javascript
soda data-source create -f ds.yml
```

Open `ds.yml` and provide the necessary credentials.

For example with PostgreSQL:

```javascript
type: postgres
name: postgres
connection:
  host: host_name
  port: 5432
  user: user_name
  password: ${env.SODA_DEMO_POSTGRES_PW}
  database: db_name
```

> Refer to the [data-source-reference-for-soda-core](../../reference/data-source-reference-for-soda-core/ "mention") for the configurations of each data source type.

{% hint style="info" %}
Avoid hardcoding secrets. Use environment variables or a secrets manager where possible.
{% endhint %}

#### Test the connection:

```javascript
soda data-source test -ds ds.yml
```

### **Use an existing Data Source via Soda Agent**

If your data source is already connected to Soda Cloud using a **Soda Agent** (hosted or self-hosted), you can reuse that connection without managing credentials or configs locally.

You just need to ensure you have set up the connection with Soda Cloud.

***

Choose the method that best fits your setup:

Use **Soda Agent** for a centralized, cloud-managed connection, or **local configuration** if you want full control within your environment.
