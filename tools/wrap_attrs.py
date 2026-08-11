# -*- coding: utf-8 -*-
"""
Оборачивает поля с placeholder={c.X} в <EditableAttr>, чтобы подсказки
внутри инпутов тоже правились в режиме редактора.

Работает только с самозакрывающимися <input ... /> и <textarea ... />,
внутри которых нет вложенных тегов. Всё остальное пропускает.

    python tools/wrap_attrs.py           # отчёт
    python tools/wrap_attrs.py --apply
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "media-map-backend" / "frontend" / "src"
TARGETS = ["pages", "components"]
SKIP_PARTS = {"CMS", "Guards", "AdminPanel"}

DICT_DECL = re.compile(r"const\s+c\s*=\s*([A-Za-z0-9_]+)Content\s*\[")
# самозакрывающийся input/textarea с placeholder={c.X}
# Внутри тега встречаются стрелочные функции (onChange={(e) => ...}), поэтому
# '>' допустим внутри фигурных скобок, но не вне их.
ATTR = r"(?:[^<>{}]|\{[^{}]*\})"
FIELD = re.compile(
    rf"([ \t]*)(<(?:input|textarea)\b{ATTR}*?placeholder=\{{c\.([A-Za-z0-9_.]+)\}}{ATTR}*?/>)",
    re.S,
)


def process(path: Path, apply: bool):
    src = path.read_text(encoding="utf-8")
    original = src

    dm = DICT_DECL.search(src)
    if not dm:
        return 0
    prefix = dm.group(1)

    count = 0

    def repl(m):
        nonlocal count
        indent, element, prop = m.groups()
        key = f"{prefix}.{prop}"
        new_element = element.replace(f"placeholder={{c.{prop}}}", "placeholder={v}")
        count += 1
        return (
            f'{indent}<EditableAttr textKey="{key}" value={{c.{prop}}} label="подсказка поля">\n'
            f"{indent}  {{(v) => (\n"
            f"{indent}    {new_element}\n"
            f"{indent}  )}}\n"
            f"{indent}</EditableAttr>"
        )

    src = FIELD.sub(repl, src)

    if count and "CMS/EditableAttr" not in original:
        depth = len(path.relative_to(ROOT).parts) - 1
        imp = f"import EditableAttr from '{'../' * depth}components/CMS/EditableAttr';"
        lines = src.split("\n")
        last = max(
            (
                i
                for i, l in enumerate(lines)
                if re.match(r"^\s*(import .*)?from\s+['\"].*['\"];?\s*$", l)
            ),
            default=0,
        )
        lines.insert(last + 1, imp)
        src = "\n".join(lines)

    if apply and src != original:
        path.write_text(src, encoding="utf-8")
    return count


def main():
    apply = "--apply" in sys.argv
    total = 0
    for d in TARGETS:
        for p in sorted((ROOT / d).rglob("*.tsx")):
            if SKIP_PARTS & set(p.parts):
                continue
            n = process(p, apply)
            if n:
                total += n
                print(f"{p.relative_to(ROOT)}: +{n}")
    print(f"\nИТОГО подсказок: {total}")
    print("режим:", "ПРИМЕНЕНО" if apply else "только отчёт")


if __name__ == "__main__":
    main()
