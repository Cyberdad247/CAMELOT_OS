# NotebookLM Cloudbrain

**Domain**: `Cloudbrain_Memory`
**Governor**: `Lady Mnemosyne_Ω (Arch-Librarian)`
**Sync Mechanism**: `Curated one-way reconciliation (human → NotebookLM → VFS)`

## Architecture
- The NotebookLM **"World Tree"** notebook is the **design-memory layer**: architecture baselines (SADD/LLDD), research, specs, audits, mission reports. It is curated by hand. There is no API, no background sync, no automation writing into it.
- The local VFS (`.agent/`) is the **operational layer**: agent personas, knight roster, skills, workflows, protocols, tasks.
- **Substance flows notebook → VFS, never the reverse.** Local files are fleshed out from notebook sources. The VFS holds no content the notebook needs.
- **Drift is measured, not wished away.** `vfs-audit.py` inventories the VFS (file list + SHA-256 per file) and reports gaps against the notebook source inventory (`worldtree-vfs-mapping.md`).

## What is NOT true (retired claims)
- ~~Bidirectional CRDT ledger replication~~ — no such mechanism exists.
- ~~Continuous background delta synchronization~~ — curation is manual.
- ~~Zero-drift guarantee~~ — drift is expected and reported; see VFS Preflight.

## Reconciliation protocol
1. Run the preflight audit (`python .agent/vfs-audit.py --check`).
2. Review the drift report: missing files, changed files, notebook sources with no VFS counterpart.
3. Human resolves: flesh out stub VFS files from notebook sources, or retire dead local files.
4. Commit the new manifest baseline.
