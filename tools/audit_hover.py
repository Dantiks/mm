# -*- coding: utf-8 -*-
"""
Ищет ховер-эффекты на элементах, по которым нельзя кликнуть, и отдельно
считает «красноту» ховеров. Ничего не меняет.

    python tools/audit_hover.py
    python tools/audit_hover.py --file pages/Home.tsx
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "media-map-backend" / "frontend" / "src"
TARGETS = ["pages", "components", "layout"]
SKIP_PARTS = {"CMS"}

# Открывающий тег целиком (атрибуты могут содержать фигурные скобки)
ATTR = r"(?:[^<>{}]|\{[^{}]*\}|\{\{[^{}]*\}\})"
TAG = re.compile(rf"<([A-Za-z][A-Za-z0-9.]*)((?:{ATTR})*?)/?>", re.S)

CLICKABLE_TAGS = {
    "a", "button", "input", "select", "textarea", "label", "summary",
    "Link", "NavLink", "EditableText", "EditableAttr",
}
CLICKABLE_ATTRS = re.compile(r"onClick|onMouseDown|onKeyDown|href=|to=|role=\"button\"")

HOVER = re.compile(r"(?:group-)?hover:[a-zA-Z0-9:./\[\]-]+")
# Эффекты, которые обещают нажатие: подъём, увеличение, курсор
AFFORDANCE = re.compile(r"hover:(?:-?translate|scale|shadow-(?:md|lg|xl|2xl))")
REDDISH = re.compile(r"hover:(?:text|bg|border)-(?:red|rose)-")


def main():
    only = None
    if "--file" in sys.argv:
        only = sys.argv[sys.argv.index("--file") + 1]

    bad_rows = []
    red_count = 0
    total_hover = 0

    for d in TARGETS:
        for p in sorted((ROOT / d).rglob("*.tsx")):
            if SKIP_PARTS & set(p.parts):
                continue
            rel = str(p.relative_to(ROOT)).replace("\\", "/")
            if only and only not in rel:
                continue
            src = p.read_text(encoding="utf-8")

            for m in TAG.finditer(src):
                tag, attrs = m.group(1), m.group(2)
                hovers = HOVER.findall(attrs)
                if not hovers:
                    continue
                total_hover += len(hovers)
                red_count += len([h for h in hovers if REDDISH.match(h)])

                clickable = tag in CLICKABLE_TAGS or bool(CLICKABLE_ATTRS.search(attrs))
                if clickable:
                    continue
                # Не кликается, но ведёт себя как кнопка
                affordance = [h for h in hovers if AFFORDANCE.match(h)]
                line = src[: m.start()].count("\n") + 1
                bad_rows.append((rel, line, tag, hovers, affordance))

    print("=== ХОВЕР НА НЕКЛИКАБЕЛЬНОМ ===")
    for rel, line, tag, hovers, aff in bad_rows:
        mark = "!!" if aff else "  "
        print(f"{mark} {rel}:{line} <{tag}> {' '.join(hovers[:5])}")

    print()
    print(f"всего ховер-правил: {total_hover}")
    print(f"из них красных: {red_count}")
    print(f"на некликабельном: {len(bad_rows)} (из них с эффектом нажатия: "
          f"{len([r for r in bad_rows if r[4]])})")


if __name__ == "__main__":
    main()
