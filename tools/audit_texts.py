# -*- coding: utf-8 -*-
"""
Инвентаризация: какой русский/кыргызский текст на страницах ещё НЕ обёрнут
в CMS-компоненты. Ничего не меняет, только считает и показывает.

    python tools/audit_texts.py            # сводка
    python tools/audit_texts.py --list     # с примерами строк
    python tools/audit_texts.py --file pages/Home.tsx
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "media-map-backend" / "frontend" / "src"
TARGETS = ["pages", "components", "layout"]
SKIP_PARTS = {"CMS", "Guards"}

CYR = r"[А-Яа-яЁёӨөҮүҢң]"

# Уже обёрнутые фрагменты вырезаем, чтобы не считать их дважды.
WRAPPED = re.compile(
    r"<Editable(?:Text|Image|Attr|RecordText)\b.*?(?:/>|</Editable(?:Text|Image|Attr|RecordText)>)",
    re.S,
)

PATTERNS = [
    ("текст в разметке", re.compile(rf">\s*({CYR}[^<>{{}}]{{2,}})\s*<")),
    ("пропс-литерал", re.compile(rf'\b[a-zA-Z]+=\s*"({CYR}[^"]{{2,}})"')),
    ("пропс-словарь", re.compile(r"\b[a-zA-Z]+=\{\s*(?:t|c)\.([A-Za-z0-9_.]+)\s*\}")),
    ("в объекте/массиве", re.compile(rf'\b[a-zA-Z]+:\s*[\'"]({CYR}[^\'"]{{2,}})[\'"]')),
    ("выражение в JSX", re.compile(rf"\{{\s*[\'\"]({CYR}[^\'\"]{{2,}})[\'\"]\s*\}}")),
    ("шаблонная строка", re.compile(rf"`([^`]*{CYR}[^`]*)`")),
]

NOISE = re.compile(r"^[\s\W\d]+$")


def audit(path: Path):
    src = path.read_text(encoding="utf-8")
    stripped = WRAPPED.sub("", src)

    found = {}
    for label, rx in PATTERNS:
        hits = []
        for m in rx.finditer(stripped):
            text = m.group(1).strip()
            if NOISE.match(text) or len(text) < 3:
                continue
            hits.append(text)
        if hits:
            found[label] = hits
    return found


def main():
    show_list = "--list" in sys.argv
    only = None
    if "--file" in sys.argv:
        only = sys.argv[sys.argv.index("--file") + 1]

    files = []
    for d in TARGETS:
        for p in sorted((ROOT / d).rglob("*.tsx")):
            if SKIP_PARTS & set(p.parts):
                continue
            files.append(p)

    grand = 0
    per_kind = {}
    rows = []

    for p in files:
        rel = str(p.relative_to(ROOT)).replace("\\", "/")
        if only and only not in rel:
            continue
        found = audit(p)
        n = sum(len(v) for v in found.values())
        if not n:
            continue
        grand += n
        for k, v in found.items():
            per_kind[k] = per_kind.get(k, 0) + len(v)
        rows.append((n, rel, found))

    for n, rel, found in sorted(rows, reverse=True):
        summary = ", ".join(f"{k}: {len(v)}" for k, v in found.items())
        print(f"{n:4d}  {rel}  ({summary})")
        if show_list or only:
            for k, v in found.items():
                for t in v[:40]:
                    print(f"        [{k}] {t[:80]}")

    print()
    print("ПО ТИПАМ:")
    for k, v in sorted(per_kind.items(), key=lambda x: -x[1]):
        print(f"  {v:4d}  {k}")
    print(f"\nВСЕГО НЕОБЁРНУТО: {grand}")


if __name__ == "__main__":
    main()
