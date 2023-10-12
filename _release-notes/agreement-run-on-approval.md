---
name: "Soda Cloud agreements only run on approval"
date: 2023-08-23
products:
  - soda-cloud
---

The agreement behavior in Soda Cloud has been changed. 

As of this release, agreements do not run scans without stakeholder approval. When all stakeholders have approved an agreement, Soda Cloud begins running scans of your data according to the agreement's scan definition.  

Previously, Soda did not require stakeholder approval before running scans scheduled in an agreement. 

See: [Schedule a scan]({% link soda-library/run-a-scan.md %}scan-for-data-quality)