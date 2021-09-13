---
layout: default
title: Single sign on with Soda Cloud
parent: Soda Cloud
---

# Single sign on with Soda Cloud

Organizations that use a SAML 2.0 single sign-on (SSO) identity provider can add Soda Cloud as a service provider. 

Once enabled, employees of the organization can gain authorized and authenticated access to the organization's Soda Cloud account by successfully logging in to their SSO. This solution not only simplifies a secure login experience for users, it enables IT Admins to:

* grant their internal users' access to Soda Cloud from within their existing SSO solution, and
* revoke their internal users' access to Soda Cloud from within their existing SSO solution if a user leaves their organization or no longer requires access to Soda Cloud.

## Request SSO set-up

Soda Cloud is able to act as a service provider for the following SAML 2.0 SSO identity providers: 

* Azure Active Directory
* Okta

If your organization uses one of these providers, please contact <a href="mailto:support@soda.io">Soda Support</a> to request SSO set-up for Soda Cloud. 


## SSO access to Soda Cloud

When an employee uses their SSO provider to access Soda Cloud for the first time, Soda Cloud automatically assigns the new user to roles and groups according to the [Default roles and rights]() for any new users. Soda Cloud also notifies the Soda Cloud Admin that a new user has joined the organization, and the new user receives a message indicating that their Soda Cloud Admin was notified of their first login. A Soda Cloud Admin can adjust users' roles in Organization Settings. See [Change organization roles and settings]() for details.

When an organization's IT Admin revokes a user's access to Soda Cloud through the SSO provider, a Soda cloud Admin is responsible for updating the resources and ownerships linked to the User. Refer to [Roles and rights in Soda Cloud]() for details.

Once your organization enables SSO for all Soda Cloud users, Soda Cloud blocks all non-SSO login attempts and password changes via <a href="cloud.soda.io/login" target="_blank">cloud.soda.io/login<a/>. If an employee attempts a non-SSO login or attempts to change a password using "Forgot password?" on <a href="cloud.soda.io/login" target="_blank">cloud.soda.io/login<a/>, Soda Cloud presents a message that explains that they should log in or change their password using their SSO provider. 



## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn more about [Roles and rights in Soda Cloud]().
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.