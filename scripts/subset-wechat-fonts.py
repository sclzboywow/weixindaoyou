import argparse
from pathlib import Path

from fontTools import subset


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "src"
FONT_ROOT = SOURCE_ROOT / "wechat-game" / "static" / "assets" / "fonts"
SOURCE_SUFFIXES = {".ts", ".tsx", ".css", ".json", ".md", ".js"}
BASE_CHARACTERS = (
    "\n\t "
    "0123456789"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    "，。！？；：、（）【】《》〈〉“”‘’「」『』—…·"
    "[]{}()<>+-=*/%#@&_|:;,.!?~`'\"￥¥"
)
STARTUP_BASE_CHARACTERS = " 0123456789%WANJIEDAOU◖，。！？；：、【】《》—…·"


def collect_startup_characters() -> str:
    startup = (FONT_ROOT.parents[2] / "startup.ts").read_text(encoding="utf-8")
    characters = set(STARTUP_BASE_CHARACTERS)
    characters.update(
        character for character in startup if "\u3400" <= character <= "\u9fff"
    )
    return "".join(sorted(characters))


def collect_characters(scan_root: Path = SOURCE_ROOT) -> str:
    characters = set(BASE_CHARACTERS)
    for path in scan_root.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in SOURCE_SUFFIXES:
            continue
        try:
            characters.update(path.read_text(encoding="utf-8"))
        except UnicodeDecodeError:
            continue
    return "".join(sorted(characters))


def subset_font(source_name: str, output_name: str, text: str) -> None:
    options = subset.Options()
    options.layout_features = ["*"]
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6]
    options.name_legacy = True
    options.name_languages = ["*"]
    font = subset.load_font(str(FONT_ROOT / source_name), options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    subset.save_font(font, str(FONT_ROOT / output_name), options)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--runtime-root",
        type=Path,
        help="Use the built WeChat runtime as the exact production glyph source.",
    )
    args = parser.parse_args()
    scan_root = args.runtime_root.resolve() if args.runtime_root else SOURCE_ROOT
    official_characters = collect_characters(scan_root)
    startup_characters = collect_startup_characters()
    subset_font(
        "LXGWWenKaiLite-Regular.ttf",
        "LXGWWenKaiLite-Regular.subset.ttf",
        official_characters,
    )
    subset_font(
        "MaShanZheng-Regular.ttf",
        "MaShanZheng-Regular.subset.ttf",
        official_characters,
    )
    subset_font(
        "LXGWWenKaiLite-Regular.ttf",
        "LXGWWenKaiLite-Startup.ttf",
        startup_characters,
    )
    subset_font(
        "MaShanZheng-Regular.ttf",
        "MaShanZheng-Startup.ttf",
        startup_characters,
    )
    print(
        f"[wechat-fonts] subset characters: {len(official_characters)}; "
        f"startup: {len(startup_characters)}"
    )
