# -*- coding: utf-8 -*-
"""
Оборачивает статические тексты во фронтенде в <EditableText>, чтобы их можно
было править инлайн.

Обрабатывает только однозначные случаи — когда выражение стоит между '>' и '<'
как прямой потомок JSX. Всё остальное (пропсы title=, placeholder=, alt=,
тернарники, шаблонные строки) НЕ трогает и выводит списком для ручной работы.

Запуск:
    python tools/wrap_editable.py            # отчёт, ничего не меняет
    python tools/wrap_editable.py --apply    # применить
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "media-map-backend" / "frontend" / "src"
TARGET_DIRS = ["pages", "components", "layout"]

# Файлы, где инлайн-редактор не нужен или вреден.
SKIP_PARTS = {"CMS", "Guards", "Common"}
# ThemeSwitcher использует `t` как переменную цикла, а не словарь переводов —
# автоматика приняла бы её за текст и сломала типы.
SKIP_FILES = {"DesignKit.tsx", "ThemeSwitcher.tsx"}

IMPORT_LINE = "import EditableText from '{}components/CMS/EditableText';"

# {c.foo.bar} или {t.foo.bar} как прямой потомок JSX
EXPR_CHILD = re.compile(r"(>\s*)\{\s*([ct])\.([A-Za-z0-9_.]+)\s*\}(\s*<)")
# литеральный русский текст как прямой потомок JSX
TEXT_CHILD = re.compile(r"(>)(\s*)([А-ЯЁа-яё][^<>{}\n]{2,}?)(\s*)(<)")
# из какого словаря берётся c
DICT_DECL = re.compile(r"const\s+c\s*=\s*([A-Za-z0-9_]+)Content\s*\[")

# Не оборачиваем: разделители, числа, единицы
NOISE = re.compile(r"^[\s\W\d]+$")


def rel_import_prefix(path: Path) -> str:
    depth = len(path.relative_to(ROOT).parts) - 1
    return "../" * depth if depth else "./"


def slugify(text: str, used: set, base: str) -> str:
    key = f"{base}.raw{len(used) + 1}"
    while key in used:
        key = f"{base}.raw{len(used) + 1}_"
    return key


def process(path: Path, apply: bool):
    src = path.read_text(encoding="utf-8")
    original = src

    if "EditableText" in src and "textKey" not in src and "<EditableText" not in src:
        pass

    dict_match = DICT_DECL.search(src)
    dict_prefix = dict_match.group(1) if dict_match else None
    base = path.stem[0].lower() + path.stem[1:]

    used_keys = set(re.findall(r'textKey="([^"]+)"', src))
    wrapped_expr = 0
    wrapped_text = 0

    def repl_expr(m):
        nonlocal wrapped_expr
        lead, obj, prop, tail = m.groups()
        if obj == "c":
            if not dict_prefix:
                return m.group(0)
            key = f"{dict_prefix}.{prop}"
        else:
            key = prop
        if key in used_keys:
            return m.group(0)
        used_keys.add(key)
        wrapped_expr += 1
        return f'{lead}<EditableText textKey="{key}" value={{{obj}.{prop}}} />{tail}'

    src = EXPR_CHILD.sub(repl_expr, src)

    def repl_text(m):
        nonlocal wrapped_text
        gt, sp1, text, sp2, lt = m.groups()
        stripped = text.strip()
        if NOISE.match(stripped) or len(stripped) < 3:
            return m.group(0)
        key = slugify(stripped, used_keys, base)
        used_keys.add(key)
        wrapped_text += 1
        escaped = stripped.replace('"', "&quot;")
        return f'{gt}{sp1}<EditableText textKey="{key}" value="{escaped}" />{sp2}{lt}'

    src = TEXT_CHILD.sub(repl_text, src)

    total = wrapped_expr + wrapped_text
    if total and "components/CMS/EditableText" not in original:
        prefix = rel_import_prefix(path)
        line = IMPORT_LINE.format(prefix)
        lines = src.split("\n")
        # Импорты бывают многострочными — ориентируемся на строку, которая
        # ЗАВЕРШАЕТ import, иначе вставка попадёт внутрь фигурных скобок.
        last_import = max(
            (
                i
                for i, l in enumerate(lines)
                if re.match(r"^\s*(import .*)?from\s+['\"].*['\"];?\s*$", l)
                or re.match(r"^import\s+['\"].*['\"];?\s*$", l)
            ),
            default=0,
        )
        lines.insert(last_import + 1, line)
        src = "\n".join(lines)

    if apply and src != original:
        path.write_text(src, encoding="utf-8")

    return wrapped_expr, wrapped_text


def main():
    apply = "--apply" in sys.argv
    files = []
    for d in TARGET_DIRS:
        for p in (ROOT / d).rglob("*.tsx"):
            if SKIP_PARTS & set(p.parts) or p.name in SKIP_FILES:
                continue
            files.append(p)

    total_e = total_t = 0
    for p in sorted(files):
        e, t = process(p, apply)
        if e or t:
            total_e += e
            total_t += t
            print(f"{p.relative_to(ROOT)}: словарь +{e}, литералы +{t}")

    print()
    print(f"ИТОГО: из словарей {total_e}, литералов {total_t}, всего {total_e + total_t}")
    print("режим:", "ПРИМЕНЕНО" if apply else "только отчёт")


if __name__ == "__main__":
    main()
