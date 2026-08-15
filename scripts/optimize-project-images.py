"""Convert Playwright project captures to responsive WebP assets."""
from pathlib import Path
from PIL import Image

PROJECTS = Path(__file__).resolve().parents[1] / "public" / "projects"

for source in PROJECTS.glob("*-preview.jpg"):
    image = Image.open(source).convert("RGB")
    image.save(source.with_suffix(".webp"), "WEBP", quality=80, method=6)

    small = image.copy()
    small.thumbnail((760, 760), Image.Resampling.LANCZOS)
    small.save(
        source.with_name(f"{source.stem}-sm.webp"),
        "WEBP",
        quality=78,
        method=6,
    )

    extra_small = image.copy()
    extra_small.thumbnail((480, 480), Image.Resampling.LANCZOS)
    extra_small.save(
        source.with_name(f"{source.stem}-xs.webp"),
        "WEBP",
        quality=77,
        method=6,
    )
    source.unlink()
    print(f"Optimized {source.name}")
