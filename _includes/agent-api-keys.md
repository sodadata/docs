The Soda Agent communicates with your Soda Cloud account using API public and private keys. Note that the keys a Soda Agent uses are *different* from the API keys Soda Library uses to connect to Soda Cloud. 

1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank"> cloud.soda.io</a>. If you already have a Soda account, log in.
2. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data**, then navigate to the **Agents** tab. Click **New Soda Agent**.
3. The dialog box that appears offers abridged instructions to set up a new Soda Agent from the command-line; more thorough instructions exist in this documentation, below. <br /><br />
For now, copy and paste the values for both the **API Key ID** and **API Key Secret** to a temporary, secure place in your local environment. You will need these values when you deploy the agent in your Kubernetes cluster.<br />
![deploy-agent](/assets/images/deploy-agent.png){:height="700px" width="700px"}
4. You can keep the dialog box open in Soda Cloud, or close it.