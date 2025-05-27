---
layout: default
title: Git Managed Data Contracts 
description: Git Managed Data Contracts
parent: Data Testing
nav_order: 401
---

## Define, Version, and Test Contracts as Code

For teams that manage data like software, Git-managed data contracts offer a code-first way to define and enforce data quality expectations.

In this model, contracts are written in YAML and stored in your Git repository,  right alongside your data models, transformation logic, and CI/CD workflows. You write, version, test, and promote contracts just like any other code artifact.

This approach gives engineers full control, reproducibility, and integration into development pipelines. And with the right setup, you can still collaborate with non-technical users via Soda Cloud and even sync UI-authored changes into Git using our future proposal workflow.

## Why Git-Managed?

- **Full version control**Track every change, roll back when needed, and manage contracts with the same discipline as application code.
- **Code-first workflow**Keep contracts close to your data models and transformations for better alignment, automation, and traceability.
- **CI/CD integration**Run contract verifications in your existing pipelines—on every commit, PR, or deployment.
- **Team governance**Ensure all changes are reviewed, tested, and approved through standard Git workflows (pull requests, approvals, branching).
- **Hybrid collaboration**Combine Git workflows with Soda Cloud for monitoring, visualization, and cross-functional input via contract proposals.


If you're already managing your data infrastructure in Git, Git-managed contracts are the natural extension for bringing **data quality under control**—without adding friction or silos.

In the next sections, we’ll walk you through how to set up, author, and run Git-managed contracts using the Soda CLI.