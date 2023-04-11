---
layout: default
title: Single sign-on with Soda Cloud
description: Organizations that use a Security Assertion Markup Language (SAML) 2.0 single sign-on (SSO) identity provider can add Soda Cloud as a service provider.
parent: Soda Cloud
---

# Single sign-on with Soda Cloud
*Last modified on {% last_modified_at %}*

Organizations that use a Security Assertion Markup Language (SAML) 2.0 single sign-on (SSO) identity provider can add Soda Cloud as a service provider. 

Once added, employees of the organization can gain authorized and authenticated access to the organization's Soda Cloud account by successfully logging in to their SSO. This solution not only simplifies a secure login experience for users, it enables IT Admins to:

* grant their internal users' access to Soda Cloud from within their existing SSO solution, and
* revoke their internal users' access to Soda Cloud from within their existing SSO solution if a user leaves their organization or no longer requires access to Soda Cloud.

Soda Cloud is able to act as a service provider for any SAML 2.0 SSO identity provider (IdP). In particular, Soda has tested and has written instructions for setting up SSO access with the following identity providers: 

* [Azure Active Directory](#add-soda-cloud-to-azure-ad)
* [Okta](#add-soda-cloud-to-okta)
* [Google Workspace](#add-soda-cloud-to-google-workspace)

Soda has tested and confirmed that SSO setup works with the following identity providers:

* OneLogin
* Auth0 

## SSO access to Soda Cloud

When an employee uses their SSO provider to access Soda Cloud for the first time, Soda Cloud automatically assigns the new user to roles and groups according to the [Default roles and rights]({% link soda-cloud/roles-and-rights.md %}#default-roles-and-groups) for any new users. Soda Cloud also notifies the Soda Cloud Admin that a new user has joined the organization, and the new user receives a message indicating that their Soda Cloud Admin was notified of their first login. A Soda Cloud Admin can adjust users' roles in Organization Settings. See [Change organization roles and settings]({% link soda-cloud/roles-and-rights.md %}#change-organization-roles-and-settings) for details.

When an organization's IT Admin revokes a user's access to Soda Cloud through the SSO provider, a Soda cloud Admin is responsible for updating the resources and ownerships linked to the User. Refer to [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}) for details.

Once your organization enables SSO for all Soda Cloud users, Soda Cloud blocks all non-SSO login attempts and password changes via <a href="https://cloud.soda.io/login" target="_blank">cloud.soda.io/login<a/>. If an employee attempts a non-SSO login or attempts to change a password using "Forgot password?" on <a href="https://cloud.soda.io/login" target="_blank">cloud.soda.io/login<a/>, Soda Cloud presents a message that explains that they should log in or change their password using their SSO provider. 


## Add Soda Cloud to Azure AD

1. Email <a href="mailto:support@soda.io">support@soda.io</a> to request SSO set-up for Soda Cloud and provide your Soda Cloud organization identifier, accessible via **your avatar** > **Organization Settings**, in the **Organization** tab. <br />Soda Support sends you the URL that you need to configure the set up with your identity provider.
2. As a user with sufficient privileges in your organization's Azure AD account, sign in through <a href="http://portal.azure.com" target="_blank">portal.azure.com<a/>, then navigate to **Enterprise applications**. Click **New application**.
3. Click **Create your own application**.
4. In the right pane that appears, provide a name for your app, such as Soda Cloud, then select the **(Non-gallery)** option. Click **Create**.
5. After Azure AD creates your app, click **Single sign-on** in the left nav under the **Manage** heading, then select the **SAML** tile.
6. In the **Basic SAML Configuration** block that appears, click **Edit**.
<br />
<br />
![basic-saml](/assets/images/basic-saml.png){:height="700px" width="700px"}
<br />
<br />
7. In the **Basic SAML Configuration** panel, there are two fields to populate: 
* **Identifier** (your Soda Cloud organization identifier)
* **Reply URL** <br />
The values for these fields are unique to your organization and are provided to you by Soda and they follow this pattern: `https://cloud.soda.io/sso/<short-name>/saml`.
8. Click **Save**, then close the confirmation message pop-up.
9. In the **User Attributes & Claims** panel, click **Edit** to add some attribute mappings.
10. Configure the claims as per the following example. Soda Cloud uses `familyname` and `givenname`, and maps `emailaddress` to `user.userprincipalname`.
<br />
<br />
![additional-claims](/assets/images/additional-claims.png){:height="650px" width="650px"}
<br />
<br />
11. Scroll down to collect the values of three fields that Soda needs to complete the Azure AD SSO integration: 
* **Azure AD Identifier** (Section 4 in Azure). This is the IdP entity, ID, or Identity Provider Issuer that Soda needs
* **Login URL** (Section 4 in Azure). This is the IdP SSO service URL, or Identity Provider Single Sign-On URL that Soda needs.
* **X.509 Certificate**. Click the **Download** link next to **Certificate (Base64)**.
12. Email the copied and downloaded values to <a href="mailto:support@soda.io">support@soda.io</a>. With those values, Soda completes the SSO configuration for your organization in cloud.soda.io and notifies you of completion.
13. Test the integration by assigning the Soda application in Azure AD to a single user, then requesting that they log in.
14. After a successful single-user test of the sign in, assign access to the Soda Azure AD app to users and/or user groups in your organization.

## Add Soda Cloud to Okta

1. Email <a href="mailto:support@soda.io">support@soda.io</a> to request SSO set-up for Soda Cloud and provide your Soda Cloud organization identifier, accessible via **your avatar** > **Organization Settings**, in the **Organization** tab. <br />Soda Support sends you the URL that you need to configure the set up with your identity provider.
2. As an Okta Administrator, log in to Okta and navigate **Applications** > **Applications overview**, then click **Create App Integration**.
3. Select **SAML 2.0**.
4. Provide a name for the application, Soda Cloud, and upload the <a href="soda-logo.png" download>Soda logo</a>.
5. Click **Next**. In the **Configure SAML** tab, there are two fields to populate:
* **Single sign on URL**
* **Audience URI (SP Entity ID)** (your Soda Cloud organization identifier) <br />
The values for these fields are unique to your organization and are provided to you by Soda and they follow this pattern: `https://cloud.soda.io/sso/<your-organization-identifier>/saml`.
6. Be sure to use an email address as the application username.
7. Scroll down to **Attribute Statements** to map the following values, then click **Next** to continue.
* map `User.GivenName` to `user.firstName`
* map `User.FamilyName`to `user.lastName`. <br />
8. Select the following options, then click **Finish**.
* I'm an Okta customer adding an internal app.
* This is an internal app that we have created. <br />
9. In the **Sign On** pane of the application, scroll down to click **View Setup Instructions**.
10. Collect the values of three fields that Soda needs to complete the Okta SSO integration:
* **Identity Provider Single Sign-On URL**
* **Identity Provider Issuer**
* **X.509 Certificate**
11. Email the copied and downloaded values to <a href="mailto:support@soda.io">support@soda.io</a>. With those values, Soda completes the SSO configuration for your organization in cloud.soda.io and notifies you of completion.
12. Test the integration by assigning the Soda application in Okta to a single user, then requesting that they log in.
13. After a successful single-user test of the sign in, assign access to the Soda Okta app to users and/or user groups in your organization.


## Add Soda Cloud to Google Workspace

1. Email <a href="mailto:support@soda.io">support@soda.io</a> to request SSO set-up for Soda Cloud and provide your Soda Cloud organization identifier, accessible via **your avatar** > **Organization Settings**, in the **Organization** tab. <br />Soda Support sends you the URL that you need to configure the set up with your identity provider.
2. As an administrator in your Google Workspace, follow the instructions in <a href="https://support.google.com/a/answer/6087519?hl=en&ref_topic=7559288" target="_blank">Google Workspace documentation</a> to **Set up your own custom SAML application**.
3. Optionally, upload the <a href="soda-logo.png" download>Soda logo</a> so it appears in the app launcher with the logo instead of the first two letters of the app name.  
4. On the **Google Identity Provider details** page, be sure to copy or download the following values:
* **SSO URL**
* **Entity ID**
* **IDP metadata**
* **Certificate** 
5. On the **SAML Attribute mapping** page, add two Google directory attributes and map as follows:
* Last Name → User.FamilyName
* First Name → User.GivenName
6. Email the copied and downloaded values to <a href="mailto:support@soda.io">support@soda.io</a>. With those values, Soda completes the SSO configuration for your organization in cloud.soda.io and notifies you of completion.
7. In the Google Workspace admin portal, use Google's instructions to <a href="https://support.google.com/a/answer/6087519?hl=en&ref_topic=7559288" target="_blank">Turn on your SAML app</a> and verify that SSO works with the new custom app for Soda.


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn more about [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}).
* Learn more about creating and tracking [Incidents]({% link soda-cloud/incidents.md %}) in Soda Cloud.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}