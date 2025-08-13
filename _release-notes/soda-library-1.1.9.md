# Fix

Soda Library 1.1.9 includes a fix for reconciliation check results that have been overwriting historical results data in Soda Cloud.

Upon upgrading, Soda Cloud will archive any existing check history for reconciliation checks, only. With 1.1.9, reconciliation check results start collecting a fresh history of results with an improved check identify algorithm that properly retains check history.

## Action

1. Upgrade to Soda Library 1.1.9 to leverage the fix.
2. Initiate a new scan that involves your reconciliation checks.
3. Review the refreshed check results in Soda Cloud, the start of new, properly-retained historical results.
