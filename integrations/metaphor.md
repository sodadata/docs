# Metaphor

Integrate Soda with Metaphor to access details about the quality of your data from within the data catalog. The following video illustrates how to take advantage of the integration.

{% embed url="https://player.vimeo.com/video/656375442?h=a811ec4d0f" %}

### Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* You have verified some contracts and published the results to Soda Cloud.
* You have a Metaphor account with the privileges necessary to allow you to add a data source.
* You have a git repository in which to store the integration project files.

### Set up the integration <a href="#set-up-the-integration" id="set-up-the-integration"></a>

1. Sign into your Soda Cloud account and confirm that you see the datasets you expect to see in the data source you wish to test for quality.
2.  To connect your Soda Cloud account to your Metaphor account, create an `.env` file in your integration project in your git repo and include details according to the example below. To obtain the values for your Soda API keys, refer to [generate-api-keys.md](../reference/generate-api-keys.md "mention")\


    ```
     SODA_HOST=cloud.soda.i
     SODA_API_KEY_ID
     SODA_API_KEY_SECRET
     METAPHOR_ACCESS_KEY_ID
     METAPHOR_SECRET_ACCESS_KEY
     # s3 bucker path without trailing slash
     METAPHOR_S3_PATH
     SODA_LOGGING_LEVEL=INF
    ```

### Run the integration <a href="#run-the-integration" id="run-the-integration"></a>

Contact [support@soda.io](mailto:support@soda.io) to acquire the assets and instructions to run the integration and view Soda Cloud details in your Metaphor catalog.





\
