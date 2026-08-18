# Camelot-OS v.100000.15 — File Audit & Purge Prep

**Date:** 2026-08-15 (refreshed 2026-08-18)
**Scope:** `C:\Users\vizio\Camelot-OS v.100000.15` (the v1.2 documentation package).
**Rule:** files whose content is fully *assimilated* into the canonical docs are prepared for purging — whether or not anything still references them. Nothing is deleted here; candidates are moved to `_purge_staging/` (reversible) and final deletion awaits operator confirmation.

> **Refresh note (2026-08-18):** this audit now reflects the **current tracked state** —
> 61 tracked files, 359,956 B (~351 KB). Two trees landed after the original audit and
> are now covered: `.github/workflows/` (CI gate) and `ops/bifrost-hub/` (OCI bootstrap).
> Sizes below are measured bytes from the working tree. The purge described in §3–§6
> already executed on 2026-08-15 and is retained as a historical record.

---

## 1. Audit legend

| Status | Meaning |
|--------|---------|
| ✅ KEEP | Canonical or actively referenced; no change |
| 🔧 ENHANCE | Keep, with a concrete improvement opportunity |
| 🧹 PURGE-PREP | Content fully assimilated elsewhere; staged for deletion |

## 2. File-by-file audit (61 tracked files)

### Top-level documents

| File | Size | Status | Rationale / enhancement |
|------|------|--------|--------------------------|
| `Camelot-OS SADD + LLDD v1.2.md` | 80,894 B (~79 KB) | ✅ KEEP | The authoritative source of truth; all other docs defer to it. |
| `PURGE_PREP.md` | 9,823 B | ✅ KEEP | This audit. |
| `README.md` | 4,033 B (~3.9 KB) | ✅ KEEP | Landing page + gate badge + run instructions. |
| `custodial_assimilation.md` | 8,462 B (~8.3 KB) | ✅ KEEP | The assimilation crystal output; derived from the repo, not a source being assimilated. |
| `.gitignore` | 130 B | ✅ KEEP | Ignores `__pycache__/`, `*.py[cod]`, `harness/results/*.log`. |

### docs/architecture/ (canonical files — the assimilation targets)

| File | Size | Status | Rationale |
|------|------|--------|-----------|
| `glossary.md` | 3,787 B | ✅ KEEP | Canonical source of Glossary / Appendix A |
| `northstar-size-budget.md` | 2,405 B | ✅ KEEP | Canonical source of Appendix B |
| `trust-bands.md` | 2,261 B | ✅ KEEP | Canonical source of §7.3 / Appendix C |
| `effect-classes.md` | 3,016 B | ✅ KEEP | Canonical source of §5.5 / Appendix D |
| `open-questions.md` | 2,916 B | ✅ KEEP | Canonical source of §27 |
| `repo-alignment.md` | 13,998 B | ✅ KEEP | Canonical source of Appendix F; maps repo → SADD; D-1…D-5 register |
| `harness-gate.md` | 13,481 B | ✅ KEEP | Canonical source of the harness CI gate checklist (run history, failure modes) |

### docs/threat-models/

| File | Size | Status | Rationale |
|------|------|--------|-----------|
| `stride.md` | 32,564 B (~31.8 KB) | ✅ KEEP | Canonical threat model; §16 fixture map ties to harness |

### packages/contracts/ (published contract family — 27 files)

| File | Size | Status | Rationale |
|------|------|--------|-----------|
| `index.json` | 9,788 B (~9.6 KB) | ✅ KEEP | Catalog of all 26 schemas |
| 26 × `*.schema.json` | 1.4–10.0 KB each | ✅ KEEP | The published `camelot-contracts/1` family referenced by §11; all meta-validated 2020-12 |

### harness/ (local verification harness — 14 files)

| File | Size | Status | Rationale / enhancement |
|------|------|--------|--------------------------|
| `contracts/verify_receipt_chain.py` | 40,429 B (~39.5 KB) | ✅ KEEP | §11.3 verifier; signer key pinned + `--replay` + ledger anchoring (STEP 5) with ed25519-signed anchor records (tamper detection from the record alone, T-10/S-4 dual checks) and configurable `--anchor-every`/`--chain-size` (defaults 1000/2000). |
| `contracts/validate_contract_schemas.py` | 5,001 B (~4.9 KB) | ✅ KEEP | Meta-validates all 26 schemas vs Draft 2020-12 meta-schema + catalog conformance; 26/26 PASS. |
| `gate.sh` | 924 B (~0.9 KB) | ✅ KEEP | Harness CI gate — thin wrapper delegating to `run_all.py`; hard-fails on any check failure. |
| `run_all.py` | 8,978 B (~8.8 KB) | ✅ KEEP | Single run-all — replay-committed → build (+tamper battery +anchors) → replay-emitted (determinism) → schema-meta; per-check checklist table, aggregate exit code, `--check` filter, per-check logs under `results/`. |
| `results/.gitignore` | 145 B | ✅ KEEP | Keeps regenerable per-check logs (`*.log`) untracked; CI uploads them as artifacts. |
| `golden-receipts/chain.verified` | 329 B | ✅ KEEP | Committed golden-set marker (signer fingerprint + anchored-chain config + anchors line). |
| `golden-receipts/rcp_0000.json` | 1,186 B | ✅ KEEP | Committed golden receipt (genesis). |
| `golden-receipts/rcp_0001.json` | 1,296 B | ✅ KEEP | Committed golden receipt. |
| `golden-receipts/rcp_0002.json` | 1,205 B | ✅ KEEP | Committed golden receipt. |
| `golden-receipts/rcp_0003.json` | 1,264 B | ✅ KEEP | Committed golden receipt. |
| `golden-receipts/sentinel_test_public.pem` | 113 B | ✅ KEEP | Pinned TEST-ONLY public key — required by `--replay` signature checks. |
| `golden-receipts/anchor_0000.json` | 726 B | ✅ KEEP | Committed ledger-anchor record (tenant_ledger chain head @ height 0, ed25519-signed). |
| `golden-receipts/anchor_1000.json` | 729 B | ✅ KEEP | Committed ledger-anchor record (tenant_ledger chain head @ height 1000, ed25519-signed). |
| `golden-receipts/golden-anchor-0000.json` | 725 B | ✅ KEEP | Committed golden-set ledger-anchor record covering the demo chain genesis head (ed25519-signed). |

### ops/bifrost-hub/ (OCI control-plane bootstrap — 6 files, added 2026-08-15)

| File | Size | Status | Rationale |
|------|------|--------|-----------|
| `bootstrap.sh` | 6,318 B (~6.2 KB) | ✅ KEEP | OCI Always-Free bootstrap: base pkgs, Tailscale, SQLite layout, ufw deny, age backups, systemd units. |
| `init-receipt-db.sh` | 5,708 B (~5.6 KB) | ✅ KEEP | SQLite WAL init for the receipt service; tables mirror `receipt.schema.json` / `receipt-chain.schema.json`. |
| `README.md` | 4,131 B (~4.0 KB) | ✅ KEEP | Launch + cloud-init + verify instructions. |
| `receipt-service.service` | 1,931 B | ✅ KEEP | Hardened unit; inactive until binary exists (`ConditionPathExists`). |
| `registry-service.service` | 1,742 B | ✅ KEEP | Hardened unit; inactive until binary exists. |
| `scheduler-service.service` | 1,713 B | ✅ KEEP | Hardened unit; inactive until binary exists. |

### .github/workflows/ (CI — 1 file, added 2026-08-15)

| File | Size | Status | Rationale |
|------|------|--------|-----------|
| `harness-gate.yml` | 1,147 B | ✅ KEEP | Runs `bash harness/gate.sh` on every push / PR; uploads `harness/results/` as an artifact (`if: always()`). |

### Files added to the live repo `C:\Users\vizio\CAMELOT_OS` (not in this package)

These are all **used and referenced** — no purge candidates:
- `harness/fixtures/` — 29 fixture dirs (25 §22.1 + 4 operator-console), READMEs cite gate + SADD §
- `harness/contracts/` — 7 schemas (migrated; D-1/D-2 resolved; tests pass)
- `apps/bifrost/src/operator/` — contracts.ts, schemas.ts, sentinel, bff, gideon + tests

## 3. Purge candidates (staged to `_purge_staging/` — historical, executed)

| File | Size | Assimilated into |
|------|------|------------------|
| `Camelot-OS SADD + LLDD v1.1.pdf` | 826 KB | `Camelot-OS SADD + LLDD v1.2.md` (delta supersedes) |
| `Camelot-OS Executive Summary v1.2.md` | 4.7 KB | SADD v1.2 (problem/law/buyers/risks sections) |
| `harness/contracts/__pycache__/verify_receipt_chain.cpython-313.pyc` | 15 KB | regenerable artifact |

> **Superseded candidate:** the original audit also listed `harness/golden-receipts/` (5 files)
> as "regenerable harness outputs". That row predates the anchored golden set and is **no
> longer a purge candidate** — the committed golden set (now 9 files, see §2) is a required
> audit artifact per `docs/architecture/harness-gate.md` and must stay tracked.

**Estimated reclaimed:** ~857 KB (98% of it the v1.1 PDF).

## 4. Enhancement opportunities (kept files)

| File | Improvement |
|------|-------------|
| `harness/contracts/verify_receipt_chain.py` | ✅ **DONE (2026-08-15).** Signer key pinned: deterministic TEST-ONLY ed25519 seed (`sha256("camelot-verifier:test-sentinel-signing-key:v1")`), no more `Ed25519PrivateKey.generate()`. `--replay` mode now re-verifies the emitted golden receipts from disk (signature + self_hash + height + epoch); `sentinel_test_public.pem` + key fingerprint land in `chain.verified`. Verified: build & replay PASS, 7/7 tamper cases detected, receipts byte-identical across runs. |
| `docs/architecture/repo-alignment.md` | Add the new fixture/fixture-gate cross-link status (already updated 2026-08-15); review D-4/D-5 at next gate |
| `docs/threat-models/stride.md` | Already §16-linked to harness fixtures; regenerate fixture map when harness adds cases |
| `custodial_assimilation.md` | Re-assimilate if the repo HEAD advances materially (ledger hash must match) |
| `ops/bifrost-hub/receipt-service.service` | `TRUSTED_EPOCH=43` is a hardcoded placeholder; source it from `EnvironmentFile`/registry once the epoch service lands |

## 5. What happens next

1. Candidates are **moved** (not deleted) to `_purge_staging/` — reversible.
2. On operator confirmation, `_purge_staging/` contents are deleted (`rm`).
3. Nothing in `docs/`, `packages/`, or the authoritative SADD is touched.

## 6. Purge executed — 2026-08-15

Operator confirmed; `_purge_staging/` deleted in full (`rm -rf`). ~857 KB reclaimed (98% of it the v1.1 PDF).
Remaining package (refreshed 2026-08-18): SADD v1.2.md, PURGE_PREP.md, README.md, custodial_assimilation.md, `.gitignore`, `docs/`, `harness/`, `packages/`, `ops/bifrost-hub/`, `.github/workflows/` — **61 tracked files, 359,956 B (~351 KB)**.
