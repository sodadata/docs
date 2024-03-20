**Problem:** After setting up a cluster and deploying the agent, you are unable to see the agent running in Soda Cloud.

**Solution:** The value you specify for the `soda-cloud-enpoint` must correspond with the region you selected when you signed up for a Soda Cloud account: 
* Use`https://cloud.us.soda.io` for the United States
* Use `https://cloud.soda.io` for all else

<br />

**Problem:** You need to define the outgoing port and IP address with which a self-hosted Soda Agent can communicate with Soda Cloud. Soda Agent does not require setting any *inbound* rules as it only polls Soda Cloud looking for instruction, which requires only *outbound* communication. When Soda Cloud must deliver instructions, the Soda Agent opens a bidirectional channel. 

**Solution:** Use port `443` and passlist the fully-qualified domain names for Soda Cloud:  
* `cloud.us.soda.io` for Soda Cloud account created in the US region<br />
OR <br />
* `cloud.soda.io` for Soda Cloud account created in the EU region<br />
AND<br />
* `collect.soda.io`

<br />

Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
