# VFS Preflight Ignition Protocol

**Domain**: `Governance_&_Integrity`
**Standard**: `Blueprint-OS v1.2 / Isomorphic FileTree Law`
**Target Node**: `C:\Users\vizio\CAMELOT_OS\.agent\` (Pewter live tree; repo clones are mirrors — audit the live tree when reachable, the clone otherwise)

## Execution Directives
- **Audit Engine**: `python .agent/vfs-audit.py --check` — deterministic inventory of the VFS: every file listed with its SHA-256 digest, compared against the committed baseline manifest (`.agent/vfs-manifest.json`).
- **Mandate**: Compare the manifest against the NotebookLM World Tree source inventory (`worldtree-vfs-mapping.md`). Drift is defined as:
  - files present in baseline but missing on disk,
  - files on disk but absent from baseline,
  - files whose SHA-256 no longer matches baseline,
  - notebook sources with no VFS counterpart, and VFS files with no notebook counterpart.
- **Action**: On drift, emit a reconciliation report for **human review**. There is no auto-repair: `//REZERO` and the Sir Syntax automated AST repair sequence are **retired** until a real, tested repair mechanism exists. No file is deleted, regenerated, or overwritten without human approval.
- **Integrity Assertion**: SHA-256 manifest of the VFS tree, regenerated on every preflight. Mismatches against baseline are **reported, never silently fixed**.

## Retired (do not invoke)
- `//REZERO` auto-trigger on Δ_drift > 0 — drift is normal; it triggers a report, not a wipe.
- SHA-256 "state tree matching on 20 sovereign manifests" — there are no sovereign manifests; the manifest is the file inventory itself.
