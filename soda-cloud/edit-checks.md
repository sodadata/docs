



In Soda Cloud, you can only create new monitors and alerts for datasets connected to an instance of Soda SQL; you cannot create monitors for datasets connected to Soda Core (Beta), yet.

Instead, you can use SodaCL (Beta) to write checks in a checks YAML file for Soda Core to execute during a scan. You can connect Soda Core to your Soda Cloud account to see the check results after each scan.

Consider following the Quick start for Soda Core with Soda Cloud to learn how to do so.

Soda Core documentation
SodaCL documentation

Edit checks in Soda Cloud
If you have connected Soda Core to your Soda Cloud account and run a scan, you can see check results in the list of Monitor Results in the Monitors dashboard. If you wish, you can edit the checks to add attributes.

In Soda Cloud, navigate to the Monitors dashboard, then click the stacked dots at the right of the check you wish to edit and select Edit monitor.
Navigate to the Attributes tab, then change the value for the Monitor Owner field and add any details to the Description field, then Save.