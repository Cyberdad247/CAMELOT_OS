# Camelot-OS v.100000.15 — Contracts, Harness & Architecture

[![harness-gate status](https://github.com/Cyberdad247/Camelot-Ecosystem/actions/workflows/harness-gate.yml/badge.svg)](https://github.com/Cyberdad247/Camelot-Ecosystem/actions/workflows/harness-gate.yml)

The v1.2 documentation, contract, and evaluation package of **Camelot-OS / Cybertronia** — a local-first, federated, policy-governed enterprise execution fabric. This repository ships the published contract schemas, the harness that verifies them, and the canonical architecture documents they implement.

> **Authoritative source of truth:** `Camelot-OS SADD + LLDD v1.2.md` — every other file defers to it. The SADD remains the authority for *what* the system must do; `docs/architecture/repo-alignment.md` records *where* the implementation lives.

## Repository layout

| Path | What it is |
|------|------------|
| `Camelot-OS SADD + LLDD v1.2.md` | Full System Architecture and Low-Level Design (v1.2) — the canonical source |
| `PURGE_PREP.md` | File-by-file audit of the package (keep / enhance / purge-prep register) |
| `custodial_assimilation.md` | Assimilation crystal output derived from the repo |
| `docs/architecture/` | Canonical architecture docs: repo alignment, harness gate checklist, open questions, trust bands, effect classes, glossary, northstar size budget |
| `docs/threat-models/` | STRIDE threat model with fixture → production-gate traceability |
| `packages/contracts/` | **26 published JSON Schemas** (Draft 2020-12, `camelot-*/1` families) + catalog `index.json` |
| `harness/` | Verification harness: receipt-chain verifier, schema meta-validator, run-all gate, committed golden set |
| `ops/bifrost-hub/` | Bifrost Hub control-plane bootstrap: init/bootstrap scripts, 3 hardened systemd services (registry, receipt, scheduler), deployment README |
| `.github/workflows/` | CI — `harness-gate.yml` runs the full gate on every push / PR |

### Where the fixtures live

The STRIDE model and the repo-alignment doc reference a fixture tree — **`harness/fixtures/`** — covering all 25 mandatory §22.1 adversarial fixtures plus 4 operator-console fixtures (29 dirs total, each with a README citing its production gate and SADD section). Those fixtures are part of the **live implementation repo**, not this package:

- **Local:** `C:\Users\vizio\CAMELOT_OS\harness\fixtures\`
- **GitHub:** `Cyberdad247/CAMELOT_OS` (the package's live home)
- **Canonical map:** [`docs/architecture/repo-alignment.md`](docs/architecture/repo-alignment.md) §3 and [`docs/threat-models/stride.md`](docs/threat-models/stride.md) §16

This package deliberately ships only the docs, contract schemas, and verification harness; the fixtures stay in the live tree they exercise.

## Contract schemas

All 26 schemas in `packages/contracts/` declare `$schema: https://json-schema.org/draft/2020-12/schema`, are self-contained (no external `$ref`s), and are cross-checked against the catalog. Families include `camelot-receipt/1`, `camelot-receipt-chain/1`, `camelot-task/1`, `camelot-tenant/1`, and more — covering receipts, ledger anchoring, workloads, policy decisions, personas, and the rest of the §11 contract catalog.

## The harness gate

Every build / PR / release must clear the gate before promotion. It backs the `receipt_chain_verified`, `tamper_detection_verified`, and `ledger_anchor_verified` production gates:

1. **replay-committed** — verify the committed golden receipts + ledger-anchor records from disk under the pinned TEST-ONLY signer key (a tampered/stale/missing artifact fails *before* any rebuild)
2. **build** — rebuild + emit: schema conformance, §11.3 rules, 7-case tamper battery, ed25519-signed ledger anchoring (anchors at every Nth entry, default N=1000)
3. **replay-emitted** — determinism loop (emitted set byte-identical to committed)
4. **schema-meta** — all 26 schemas meta-validate as Draft 2020-12 + catalog conformance

### Running it

```bash
# Full gate (all 4 checks, per-check logs under harness/results/)
python harness/run_all.py

# CI wrapper (same checks, hard-fail)
bash harness/gate.sh

# Individual checks
python harness/run_all.py --check schema-meta          # fast iteration
python harness/contracts/verify_receipt_chain.py --replay
python harness/contracts/validate_contract_schemas.py

# Stress-test anchoring (configurable interval / chain size)
bash harness/gate.sh --anchor-every 100 --chain-size 3000
```

**Dependencies:** Python 3.x with `cryptography` and `jsonschema` (installed by the CI workflow).

The documented checklist, acceptance criteria, failure modes, and gate run history live in [`docs/architecture/harness-gate.md`](docs/architecture/harness-gate.md).

## Northstar

A 16 MB Camelot control kernel for identity, policy, leases, scheduling, manifest verification, revocation, and evidence — not full LLM inference, browser rendering, vector databases, or large repositories. See Appendix B of the SADD for the size-budget boundary.
