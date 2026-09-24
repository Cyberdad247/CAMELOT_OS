#!/usr/bin/env python3
"""VFS preflight audit: deterministic inventory of the .agent/ tree.

Writes `.agent/vfs-manifest.json`: every file with its SHA-256 digest.
`--check` compares the live tree against the committed baseline and
reports drift (added / removed / modified). Drift is REPORTED, never
auto-repaired.

Stdlib only. Usage:
    python .agent/vfs-audit.py                  # (re)write baseline manifest
    python .agent/vfs-audit.py --check           # report drift vs baseline
    python .agent/vfs-audit.py --root PATH       # audit a different tree
"""

import argparse
import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

MANIFEST_NAME = "vfs-manifest.json"


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def inventory(root: Path):
    files = []
    for p in sorted(root.rglob("*")):
        if not p.is_file():
            continue
        if p.name == MANIFEST_NAME:
            continue  # the manifest describes the tree, not itself
        rel = p.relative_to(root).as_posix()
        files.append({
            "path": rel,
            "size": p.stat().st_size,
            "sha256": sha256_of(p),
        })
    return files


def main() -> int:
    ap = argparse.ArgumentParser(description="VFS preflight audit")
    ap.add_argument("--root", default=str(Path(__file__).resolve().parent),
                    help="VFS tree to audit (default: the .agent/ dir holding this script)")
    ap.add_argument("--check", action="store_true",
                    help="compare live tree against baseline manifest and report drift")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    manifest_path = root / MANIFEST_NAME
    files = inventory(root)
    by_path = {f["path"]: f for f in files}

    if not args.check:
        manifest = {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "root": root.as_posix(),
            "file_count": len(files),
            "files": files,
        }
        manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
        print(f"baseline written: {manifest_path} ({len(files)} files)")
        return 0

    # --check mode
    if not manifest_path.exists():
        print(f"no baseline manifest at {manifest_path}; run without --check first", file=sys.stderr)
        return 2
    baseline = json.loads(manifest_path.read_text(encoding="utf-8"))
    base_by_path = {f["path"]: f for f in baseline["files"]}

    added = sorted(set(by_path) - set(base_by_path))
    removed = sorted(set(base_by_path) - set(by_path))
    modified = sorted(p for p in set(by_path) & set(base_by_path)
                      if by_path[p]["sha256"] != base_by_path[p]["sha256"])

    if not (added or removed or modified):
        print(f"clean: {len(files)} files match baseline")
        return 0

    print(f"DRIFT DETECTED ({len(added)} added, {len(removed)} removed, {len(modified)} modified):")
    for p in removed:
        print(f"  - missing:   {p}")
    for p in added:
        print(f"  + untracked: {p}")
    for p in modified:
        print(f"  ~ changed:   {p}")
        print(f"      baseline {base_by_path[p]['sha256'][:16]}… -> live {by_path[p]['sha256'][:16]}…")
    print("No files were modified. Resolve by human review, then re-run without --check to set a new baseline.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
