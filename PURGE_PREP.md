# Camelot-OS v.100000.15 — File Audit & Purge Prep

**Date:** 2026-08-15
**Scope:** `C:\Users\vizio\Camelot-OS v.100000.15` (the v1.2 documentation package).
**Rule:** files whose content is fully *assimilated* into the canonical docs are prepared for purging — whether or not anything still references them. Nothing is deleted here; candidates are moved to `_purge_staging/` (reversible) and final deletion awaits operator confirmation.

---

## 1. Audit legend

| Status | Meaning |
|--------|---------|
| ✅ KEEP | Canonical or actively referenced; no change |
| 🔧 ENHANCE | Keep, with a concrete improvement opportunity |
| 🧹 PURGE-PREP | Content fully assimilated elsewhere; staged for deletion |

## 2. File-by-file audit (45 files)

### Top-level documents

| File | Size | Status | Rationale / enhancement |
|------|------|--------|--------------------------|
| `Camelot-OS SADD + LLDD v1.2.md` | 80 KB | ✅ KEEP | The authoritative source of truth; all other docs defer to it. |
| `Camelot-OS SADD + LLDD v1.1.pdf` | 826 KB | 🧹 PURGE-PREP | Fully superseded — the v1.2 changelog states "all other sections remain textually equivalent to v1.1". Largest single file; biggest win. Nothing references it. |
| `Camelot-OS Executive Summary v1.2.md` | 4.7 KB | 🧹 PURGE-PREP | Content is a condensation of the SADD v1.2 (problem, law, buyer views, risks) — fully assimilated. Nothing references it (verified by grep). |
| `custodial_assimilation.md` | 8.5 KB | ✅ KEEP | The assimilation crystal output; derived from the repo, not a source being assimilated. |

### docs/architecture/ (canonical files — the assimilation targets)

| File | Status | Rationale |
|------|--------|-----------|
| `glossary.md` | ✅ KEEP | Canonical source of Glossary / Appendix A |
| `northstar-size-budget.md` | ✅ KEEP | Canonical source of Appendix B |
| `trust-bands.md` | ✅ KEEP | Canonical source of §7.3 / Appendix C |
| `effect-classes.md` | ✅ KEEP | Canonical source of §5.5 / Appendix D |
| `open-questions.md` | ✅ KEEP | Canonical source of §27 |
| `repo-alignment.md` | ✅ KEEP | Canonical source of Appendix F; maps repo → SADD; D-1…D-5 register |

### docs/threat-models/

| File | Status | Rationale |
|------|--------|-----------|
| `stride.md` | ✅ KEEP | Canonical threat model; §16 fixture map ties to harness |

### packages/contracts/ (published contract family — 27 files)

| File | Status | Rationale |
|------|--------|-----------|
| `index.json` | ✅ KEEP | Catalog of all 26 schemas |
| 26 × `*.schema.json` | ✅ KEEP | The published `camelot-contracts/1` family referenced by §11; all meta-validated 2020-12 |

### harness/ (local verification harness)

| File | Size | Status | Rationale / enhancement |
|------|------|--------|--------------------------|
| `contracts/verify_receipt_chain.py` | ~20 KB | ✅ KEEP | §11.3 verifier; signer key pinned + `--replay` + ledger anchoring (STEP 5) with ed25519-signed anchor records (tamper detection from the record alone, T-10/S-4 dual checks) and configurable `--anchor-every`/`--chain-size` (defaults 1000/2000) — enhancement ✅ DONE 2026-08-15, see §4. |
| `contracts/validate_contract_schemas.py` | ~4 KB | ✅ KEEP | New 2026-08-15: meta-validates all 26 schemas vs Draft 2020-12 meta-schema + catalog conformance; 26/26 PASS. |
| `gate.sh` | ~1 KB | ✅ KEEP | New 2026-08-15: harness CI gate — thin wrapper delegating to `run_all.py`; hard-fails on any check failure. |
| `run_all.py` | ~6 KB | ✅ KEEP | New 2026-08-15: single run-all — replay-committed → build (+tamper battery +anchors) → replay-emitted (determinism) → schema-meta; per-check checklist table, aggregate exit code, `--check` filter, per-check logs under `results/`. Checklist documented in `docs/architecture/harness-gate.md`. |
| `results/.gitignore` | 60 B | ✅ KEEP | New 2026-08-15: keeps regenerable per-check logs (`*.log`) untracked; CI uploads them as artifacts. |
| `contracts/__pycache__/verify_receipt_chain.cpython-313.pyc` | 15 KB | 🧹 PURGE-PREP | Regenerable Python bytecode build artifact — pure garbage, no content. |
| `golden-receipts/chain.verified` | 55 B | ✅ KEEP | Committed golden-set marker (signer fingerprint + anchored-chain config + anchors line). |
| `golden-receipts/rcp_0000.json` | 1.2 KB | ✅ KEEP | Committed golden receipt (genesis). |
| `golden-receipts/rcp_0001.json` | 1.3 KB | ✅ KEEP | Committed golden receipt. |
| `golden-receipts/rcp_0002.json` | 1.2 KB | ✅ KEEP | Committed golden receipt. |
| `golden-receipts/rcp_0003.json` | 1.3 KB | ✅ KEEP | Committed golden receipt. |
| `golden-receipts/sentinel_test_public.pem` | 113 B | ✅ KEEP | Pinned TEST-ONLY public key — required by `--replay` signature checks. |
| `golden-receipts/anchor_0000.json` | ~0.7 KB | ✅ KEEP | Committed ledger-anchor record (tenant_ledger chain head @ height 0, ed25519-signed). |
| `golden-receipts/anchor_1000.json` | ~0.7 KB | ✅ KEEP | Committed ledger-anchor record (tenant_ledger chain head @ height 1000, ed25519-signed). |
| `golden-receipts/golden-anchor-0000.json` | ~0.7 KB | ✅ KEEP | Committed golden-set ledger-anchor record covering the demo chain genesis head (ed25519-signed). |

### Files added to the live repo `C:\Users\vizio\CAMELOT_OS` (not in this package)

These are all **used and referenced** — no purge candidates:
- `harness/fixtures/` — 29 fixture dirs (25 §22.1 + 4 operator-console), READMEs cite gate + SADD §
- `harness/contracts/` — 7 schemas (migrated; D-1/D-2 resolved; tests pass)
- `apps/bifrost/src/operator/` — contracts.ts, schemas.ts, sentinel, bff, gideon + tests

## 3. Purge candidates (staged to `_purge_staging/`)

| File | Size | Assimilated into |
|------|------|------------------|
| `Camelot-OS SADD + LLDD v1.1.pdf` | 826 KB | `Camelot-OS SADD + LLDD v1.2.md` (delta supersedes) |
| `Camelot-OS Executive Summary v1.2.md` | 4.7 KB | SADD v1.2 (problem/law/buyers/risks sections) |
| `harness/contracts/__pycache__/verify_receipt_chain.cpython-313.pyc` | 15 KB | regenerable artifact |
| `harness/golden-receipts/` (5 files) | ~5 KB | regenerable harness outputs |

**Estimated reclaimed:** ~851 KB (98% of it the v1.1 PDF).

## 4. Enhancement opportunities (kept files)

| File | Improvement |
|------|-------------|
| `harness/contracts/verify_receipt_chain.py` | ✅ **DONE (2026-08-15).** Signer key pinned: deterministic TEST-ONLY ed25519 seed (`sha256("camelot-verifier:test-sentinel-signing-key:v1")`), no more `Ed25519PrivateKey.generate()`. `--replay` mode now re-verifies the emitted golden receipts from disk (signature + self_hash + height + epoch); `sentinel_test_public.pem` + key fingerprint land in `chain.verified`. Verified: build & replay PASS, 7/7 tamper cases detected, receipts byte-identical across runs. |
| `docs/architecture/repo-alignment.md` | Add the new fixture/fixture-gate cross-link status (already updated 2026-08-15); review D-4/D-5 at next gate |
| `docs/threat-models/stride.md` | Already §16-linked to harness fixtures; regenerate fixture map when harness adds cases |
| `custodial_assimilation.md` | Re-assimilate if the repo HEAD advances materially (ledger hash must match) |

## 5. What happens next

1. Candidates are **moved** (not deleted) to `_purge_staging/` — reversible.
2. On operator confirmation, `_purge_staging/` contents are deleted (`rm`).
3. Nothing in `docs/`, `packages/`, or the authoritative SADD is touched.

## 6. Purge executed — 2026-08-15

Operator confirmed; `_purge_staging/` deleted in full (`rm -rf`). ~857 KB reclaimed (98% of it the v1.1 PDF).
Remaining package: SADD v1.2.md, PURGE_PREP.md, custodial_assimilation.md, `docs/`, `harness/`, `packages/` (336 KB total).
