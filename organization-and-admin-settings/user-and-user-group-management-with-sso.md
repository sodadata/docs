# User and user group management  with SSO

Organizations that use a Security Assertion Markup Language (SAML) 2.0 single sign-on (SSO) identity provider (IdP) can add Soda Cloud as a service provider.

Once added, employees of the organization can gain authorized and authenticated access to the organization’s Soda Cloud account by successfully logging in to their SSO. This solution not only simplifies a secure login experience for users, it enables IT Admins to:

* grant their internal users’ access to Soda Cloud from within their existing SSO solution
* revoke their internal users’ access to Soda Cloud from within their existing SSO solution if a user leaves their organization or no longer requires access to Soda Cloud
* set up one-way user group syncing from their IdP into Soda Cloud (tested and documented for Azure Active Directory and Okta)

## Compatibility <a href="#compatibility" id="compatibility"></a>

Soda Cloud is able to act as a service provider for any SAML 2.0 SSO identity provider. In particular, Soda has tested and has written instructions for setting up SSO access with the following identity providers:

* [Azure Active Directory](user-and-user-group-management-with-sso.md#add-soda-cloud-to-azure-a-d)
* [Okta](user-and-user-group-management-with-sso.md#add-soda-cloud-to-okta)
* [Google Workspace](user-and-user-group-management-with-sso.md#add-soda-cloud-to-google-workspace)

Soda has tested and confirmed that SSO setup works with the following identity providers:

* OneLogin
* Auth0
* Patronus

## SSO access to Soda Cloud <a href="#sso-access-to-soda-cloud" id="sso-access-to-soda-cloud"></a>

When an employee uses their SSO provider to access Soda Cloud for the first time, Soda Cloud automatically assigns the new user to roles and groups according to the [global-and-dataset-roles.md](global-and-dataset-roles.md "mention")for any new users. Soda Cloud also notifies the Soda Cloud Admin that a new user has joined the organization, and the new user receives a message indicating that their Soda Cloud Admin was notified of their first login. A Soda Cloud Admin or user with the permission to do so can adjust users’ roles in Organization Settings. See [global-and-dataset-roles.md](global-and-dataset-roles.md "mention") for details.

When an organization’s IT Admin revokes a user’s access to Soda Cloud through the SSO provider, a Soda Cloud Admin is responsible for updating the resources and ownerships linked to the User.

Once your organization enables SSO for all Soda Cloud users, Soda Cloud blocks all non-SSO login attempts and password changes. If an employee attempts a non-SSO login or attempts to change a password using “Forgot password?”, Soda Cloud presents a message that explains that they must log in or change their password using their SSO provider.

Optionally, you can set up the SSO integration Soda to include a one-way sync of user groups from your IdP into Soda Cloud which synchronizes with each user login to Soda via SSO. [#sync-user-groups-from-an-idp](user-and-user-group-management-with-sso.md#sync-user-groups-from-an-idp "mention")

Soda Cloud supports both **Identity Provider Initiated (IdP-initiated)**, and **Service Provider Initiated (SP-initiated)** single sign-on integrations. Be sure to indicate which type of SSO your organization uses when setting it up with the Soda Support team.

## Add Soda Cloud to Azure AD <a href="#add-soda-cloud-to-azure-a-d" id="add-soda-cloud-to-azure-a-d"></a>

1. Email [support@soda.io](mailto:support@soda.io) to request SSO set-up for Soda Cloud and provide your Soda Cloud organization identifier, accessible via **your avatar** > **Organization Settings**, in the **Organization** tab.\
   Soda Support sends you the `samlUrl` that you need to configure the set up with your identity provider.
2. As a user with sufficient privileges in your organization’s Azure AD account, sign in through [portal.azure.com](http://portal.azure.com/), then navigate to **Enterprise applications**. Click **New application**.
3. Click **Create your own application**.
4. In the right pane that appears, provide a name for your app, such as Soda Cloud, then select the **(Non-gallery)** option. Click **Create**.
5. After Azure AD creates your app, click **Single sign-on** in the left nav under the **Manage** heading, then select the **SAML** tile.
6.  In the **Basic SAML Configuration** block that appears, click **Edit**.

    <figure><img src="https://docs.soda.io/assets/images/basic-saml.png" alt=""><figcaption></figcaption></figure>

    <figure><img src="../.gitbook/assets/image (60).png" alt=""><figcaption></figcaption></figure>
7. In the **Basic SAML Configuration** panel, there are two fields to populate:
   * **Identifier (Entity ID)**, which is the value of `samlUrl` from step 1.
   * **Reply URL**, which is the value of `samlUrl` from step 1.
8. Click **Save**, then close the confirmation message pop-up.
9. In the **User Attributes & Claims** panel, click **Edit** to add some attribute mappings.
10. Configure the claims as per the following example. Soda Cloud uses `familyname` and `givenname`, and maps `emailaddress` to `user.userprincipalname`.\
    (Optional) Follow the additional steps to enable one-way user group syncing to your SSO configuration; see [#set-up-user-group-sync-in-azure-a-d](user-and-user-group-management-with-sso.md#set-up-user-group-sync-in-azure-a-d "mention")).

    <figure><img src="https://docs.soda.io/assets/images/additional-claims.png" alt=""><figcaption></figcaption></figure>

    <figure><img src="../.gitbook/assets/image.avif" alt=""><figcaption></figcaption></figure>
11. Scroll down to collect the values of three fields that Soda needs to complete the Azure AD SSO integration:
    * **Azure AD Identifier** (Section 4 in Azure). This is the IdP entity, ID, or Identity Provider Issuer that Soda needs
    * **Login URL** (Section 4 in Azure). This is the IdP SSO service URL, or Identity Provider Single Sign-On URL that Soda needs.
    * **X.509 Certificate**. Click the **Download** link next to **Certificate (Base64)**.
12. Email the copied and downloaded values to [support@soda.io](mailto:support@soda.io). With those values, Soda completes the SSO configuration for your organization in cloud.soda.io and notifies you of completion.
    * Soda Cloud supports both Identity Provider Initiated (IdP-initiated), and Service Provider Initiated (SP-initiated) single sign-on integrations; be sure to indicate which type of SSO your organization uses.
    * (Optional) Ask Soda to enable one-way user group syncing to your SSO configuration; see [#set-up-user-group-sync-in-azure-a-d](user-and-user-group-management-with-sso.md#set-up-user-group-sync-in-azure-a-d "mention"))
13. Test the integration by assigning the Soda application in Azure AD to a single user, then requesting that they log in.
14. After a successful single-user test of the sign in, assign access to the Soda Azure AD app to users and/or user groups in your organization.

## Add Soda Cloud to Okta <a href="#add-soda-cloud-to-okta" id="add-soda-cloud-to-okta"></a>

1. Email [support@soda.io](mailto:support@soda.io) to request SSO set-up for Soda Cloud and provide your Soda Cloud organization identifier, accessible via **your avatar** > **Organization Settings**, in the **Organization** tab.\
   Soda Support sends you the `samlURL` that you need to configure the set up with your identity provider.
2. As an Okta Administrator, log in to Okta and navigate **Applications** > **Applications overview**, then click **Create App Integration**. Refer to [Okta documentation](https://help.okta.com/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm) for full procedure.
3. Select **SAML 2.0**.
4. Provide a name for the application, Soda Cloud, and upload the [Soda logo](https://docs.soda.io/soda-cloud/soda-logo.png).
5. Click **Next**. In the **Configure SAML** tab, there are two fields to populate:
   * **Single sign on URL**, which is the value of `samlUrl` from step 1.
   * **Audience URI (SP Entity ID)**, which is also the value of `samlUrl` from step 1.\
     The values for these fields are unique to your organization and are provided to you by Soda and they follow this pattern: `https://cloud.soda.io/sso/<your-organization-identifier>/saml`.
6. Be sure to use an email address as the application username.
7. Scroll down to **Attribute Statements** to map the following values, then click **Next** to continue.
   * map `User.GivenName` to `user.firstName`
   * map `User.FamilyName`to `user.lastName`
   * map `User.Email` to `user.email`
   * (Optional) Follow the additional steps to enable one-way user group syncing to your SSO configuration; [#set-up-user-group-sync-in-okta](user-and-user-group-management-with-sso.md#set-up-user-group-sync-in-okta "mention").
8. Select the following options, then click **Finish**.
   * I’m an Okta customer adding an internal app.
   * This is an internal app that we have created.
9. In the **Sign On** pane of the application, scroll down to click **View Setup Instructions**.
10. Collect the values of three fields that Soda needs to complete the Okta SSO integration:
    * **Identity Provider Single Sign-On URL**
    * **Identity Provider Issuer**
    * **X.509 Certificate**
11. Email the copied and downloaded values to [support@soda.io](mailto:support@soda.io). With those values, Soda completes the SSO configuration for your organization in cloud.soda.io and notifies you of completion.
    * Soda Cloud supports both Identity Provider Initiated (IdP-initiated), and Service Provider Initiated (SP-initiated) single sign-on integrations; be sure to indicate which type of SSO your organization uses.
    * (Optional) Ask Soda to enable one-way user group syncing to your SSO configuration; see [#set-up-user-group-sync-in-okta](user-and-user-group-management-with-sso.md#set-up-user-group-sync-in-okta "mention").
12. Test the integration by assigning the Soda application in Okta to a single user, then requesting that they log in.
13. After a successful single-user test of the sign in, assign access to the Soda Okta app to users and/or user groups in your organization.

## Add Soda Cloud to Google Workspace <a href="#add-soda-cloud-to-google-workspace" id="add-soda-cloud-to-google-workspace"></a>

1. Email [support@soda.io](mailto:support@soda.io) to request SSO set-up for Soda Cloud and provide your Soda Cloud organization identifier, accessible via **your avatar** > **Organization Settings**, in the **Organization** tab.\
   Soda Support sends you the `samlURL` that you need to configure the set up with your identity provider.
2. As an administrator in your Google Workspace, follow the instructions in [Google Workspace documentation](https://support.google.com/a/answer/6087519?hl=en\&ref_topic=7559288) to **Set up your own custom SAML application**.
3. Optionally, upload the [Soda logo](https://docs.soda.io/soda-cloud/soda-logo.png) so it appears in the app launcher with the logo instead of the first two letters of the app name.
4. On the **Google Identity Provider details** page, be sure to copy or download the following values:
   * **SSO URL**
   * **Entity ID**
   * **IDP metadata**
   * **Certificate**
5. On the **SAML Attribute mapping** page, add two Google directory attributes and map as follows:
   * Last Name → User.FamilyName
   * First Name → User.GivenName
6. Email the copied and downloaded values to [support@soda.io](mailto:support@soda.io). With those values, Soda completes the SSO configuration for your organization in cloud.soda.io and notifies you of completion. Soda Cloud supports both Identity Provider Initiated (IdP-initiated), and Service Provider Initiated (SP-initiated) single sign-on integrations; be sure to indicate which type of SSO your organization uses.
7. In the Google Workspace admin portal, use Google’s instructions to [Turn on your SAML app](https://support.google.com/a/answer/6087519?hl=en\&ref_topic=7559288) and verify that SSO works with the new custom app for Soda.

## Sync user groups from an IdP <a href="#sync-user-groups-from-an-idp" id="sync-user-groups-from-an-idp"></a>

If you wish, you can choose to regularly one-way sync the user groups you have defined in your IdP into Soda Cloud.

Doing so obviates the need to manually create user groups in Soda Cloud that you have already defined in your IdP, and enables your team to select an IdP-managed user groups when assigning ownership access permissions to a resource, in addition to any user groups you may have created manually in Soda Cloud. See: [#user-groups](user-management.md#user-groups "mention")

* Soda has tested and documented one-way syncing of user groups with Soda Cloud for Okta and Azure Active Directory. [Contact Soda](https://community.soda.io/slack) to request tested and documented support for other IdPs.
* Soda synchronizes user groups with the IdP every time a user in your organization logs in to Soda via SSO. Soda updates the user’s group membership according to the IdP user groups to which they belong at each log in.
* You cannot manage IdP user group settings or membership in Soda Cloud. Any changes that you wish to make to IdP-managed user groups must be done in the IdP itself.



### **Set up user group sync in Azure AD**

1. In step 10 of the SAML application setup procedure [above](https://docs.soda.io/soda-cloud/sso.html#add-soda-cloud-to-azure-ad), in the same **User Attributes & Claims** section of your Soda SAML Application in Azure AD, follow [Microsoft’s instructions](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-fed-group-claims#add-group-claims-to-tokens-for-saml-applications-using-sso-configuration) to add a group claim to your Soda SAML Application.
   * For the choice of which groups should be returned in the claim, best practice suggests selecting **Groups assigned to the application**.
   *   For the choice of Source attribute, select **Cloud-only group display names**.

       <figure><img src="https://docs.soda.io/assets/images/group-claims.png" alt="" width="375"><figcaption></figcaption></figure>

       <figure><img src="../.gitbook/assets/image (61).png" alt=""><figcaption></figcaption></figure>
2. After saving the group claim, navigate to **Users and Groups** in the left menu, and follow Microsoft’s instructions to [Assign a user or group to an enterprise application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal?pivots=portal). Add any existing groups to the Soda SAML Application that you wish to make available in Soda Cloud to manage access and permissions.
3. In your message to Soda Support or your Soda Customer Engineer, advise Soda that you wish to enable user group syncing. Soda adds a setting to your SSO configuration to enable it.
4. When the SSO integration is complete, you and your team can select your IdP user groups from the dropdown list of choices available when assigning ownership or permissions to resources.

\


### **Set up user group sync in Okta**

1. In step 7 of the SAML application integration procedure [above](https://docs.soda.io/soda-cloud/sso.html#add-soda-cloud-to-okta), follow Okta’s instructions to [Define group attribute statements](https://help.okta.com/en-us/content/topics/apps/define-group-attribute-statements.htm).
   * For the Name value, use **Group.Authorization**.
   * Leave the optional Name Format value as **Unspecified**.
   *   Use the Filter to find a group that you wish to make available in Soda Cloud to manage access and permissions. Exercise caution! A broad filter may include user groups you do not wish to include in the sync. Double-check that the groups you select are appropriate.

       <figure><img src="https://docs.soda.io/assets/images/group-attribute.png" alt="" width="375"><figcaption></figcaption></figure>

       <figure><img src="../.gitbook/assets/image (62).png" alt=""><figcaption></figcaption></figure>
2. Use the **Add Another** button to add as many groups as you wish to make available in Soda Cloud.
3. In your message to Soda Support or your Soda Customer Engineer, advise Soda that you wish to enable user group syncing. Soda adds a setting to your SSO configuration to enable it.
4. When the SSO integration is complete, you and your team can select your IdP user groups from the dropdown list of choices available when assigning ownership or permissions to resources.



### Renew SSO certificate

To renew an SSO certificate, **you need to provide Soda with the new X.509 certificate**, with which Soda will update your Soda organization's SSO configuration. Since Soda can only validate SSO against one certificate, there will be downtime between you deactivating the old certificate, and Soda updating the SSO configuration.

Depending on your organization's process of renewing the certificate, you could notify Soda (or arrange for a call) in advance of the specific datetime you want to renew, so Soda can be prepared for your update and minimize the mentioned downtime.\
