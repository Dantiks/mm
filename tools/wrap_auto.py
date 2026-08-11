# -*- coding: utf-8 -*-
"""
Второй проход обёртки: любые выражения {что-то.поле}, стоящие прямым потомком
JSX, заворачиваются в <EditableAuto>. Это покрывает элементы списков и данные
из массивов/объектов, объявленных внутри компонентов.

EditableAuto пропускает нестроковые значения без изменений, поэтому обёртка
безопасна даже там, где в выражении окажется число или готовая разметка.

    python tools/wrap_auto.py            # отчёт
    python tools/wrap_auto.py --apply
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "media-map-backend" / "frontend" / "src"
TARGETS = ["pages", "components", "layout"]
SKIP_PARTS = {"CMS", "Guards"}

# Явный белый список: файл -> какие выражения можно оборачивать.
#
# Список именно белый, а не чёрный. Под те же шаблоны попадают данные
# пользователей (город и комментарий заявителя), записи из БД (виды нарушений,
# новости) и результаты поиска. Обернуть их значило бы записывать чужой текст
# в тексты сайта — ключ считается от содержимого, и правка расползлась бы на
# все одинаковые строки.
ALLOW = {
    "pages/CategoryDetail.tsx": {"detail"},
    "pages/Home.tsx": {"r", "n"},
    "pages/NewReport.tsx": {"item", "method", "sub"},
    "pages/Useful.tsx": {"res"},
    "pages/Terms.tsx": {"step"},
    "components/Sidebar/AdminPanelSidebar.tsx": {"item"},
    "components/Sidebar/MobileSideBar.tsx": {"item"},
    "components/AI/AiAssistantWidget.tsx": {"preset"},
    "pages/AdminPanel/SiteTextsManagement.tsx": {"cat"},
}

# {expr.path} прямым потомком JSX
EXPR = re.compile(r"(>\s*)\{\s*([A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z0-9_$]+)+)\s*\}(\s*<)")


def process(path: Path, apply: bool):
    src = path.read_text(encoding="utf-8")
    original = src
    count = 0

    rel = str(path.relative_to(ROOT)).replace("\\", "/")
    allowed = ALLOW.get(rel)
    if not allowed:
        return 0

    base = rel.rsplit(".", 1)[0].split("/")[-1]
    base = base[0].lower() + base[1:]

    def repl(m):
        nonlocal count
        lead, expr, tail = m.groups()
        if expr.split(".")[0] not in allowed:
            return m.group(0)
        ns = f"{base}.{expr}"
        count += 1
        return f'{lead}<EditableAuto ns="{ns}" value={{{expr}}} />{tail}'

    src = EXPR.sub(repl, src)

    if count and "CMS/EditableAuto" not in original:
        depth = len(path.relative_to(ROOT).parts) - 1
        imp = f"import EditableAuto from '{'../' * depth}components/CMS/EditableAuto';"
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
                print(f"{str(p.relative_to(ROOT))}: +{n}")
    print(f"\nИТОГО: {total}")
    print("режим:", "ПРИМЕНЕНО" if apply else "только отчёт")


if __name__ == "__main__":
    main()
