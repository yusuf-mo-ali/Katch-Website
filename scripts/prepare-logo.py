"""Prepare transparent brand assets from the supplied Katch artwork."""
from pathlib import Path
from PIL import Image, ImageDraw
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "uploads" / "WhatsApp Image 2026-08-11 at 11.03.44 AM.jpeg"
PUBLIC = ROOT / "public"

image = Image.open(SOURCE).convert("RGB")
array = np.asarray(image).astype(np.float32)

# Coordinates are taken from the supplied 1600 × 1600 artwork.
CROP = (145, 600, 1455, 928)
TRIANGLE = [(571, 608), (413, 885), (730, 885)]
BACKGROUND_LUMINANCE = 244.0
INK_LUMINANCE = 32.0
INK = np.array([32, 32, 32], dtype=np.uint8)


def extract(crop, include_triangle=True, dark_x_bounds=None):
    left, top, right, bottom = crop
    source = array[top:bottom, left:right]
    luminance = source.mean(axis=2)

    # Recover smooth alpha from the flattened JPEG's ink-to-background blend.
    alpha = np.clip((BACKGROUND_LUMINANCE - luminance) / (BACKGROUND_LUMINANCE - INK_LUMINANCE), 0, 1)
    alpha[luminance > 231] = 0
    alpha[alpha < 0.025] = 0
    if dark_x_bounds:
        x_min, x_max = dark_x_bounds
        x_coordinates = np.arange(left, right)
        alpha[:, (x_coordinates < x_min) | (x_coordinates > x_max)] = 0

    rgba = np.zeros((*alpha.shape, 4), dtype=np.uint8)
    rgba[:, :, :3] = INK
    rgba[:, :, 3] = np.rint(alpha * 255).astype(np.uint8)
    result = Image.fromarray(rgba, "RGBA")

    if include_triangle:
        scale = 4
        triangle_mask = Image.new("L", (result.width * scale, result.height * scale), 0)
        points = [((x - left) * scale, (y - top) * scale) for x, y in TRIANGLE]
        ImageDraw.Draw(triangle_mask).polygon(points, fill=255)
        triangle_mask = triangle_mask.resize(result.size, Image.Resampling.LANCZOS)

        # Remove the reconstructed dark layer beneath the white triangle, then add it.
        cleared = result.copy()
        cleared_alpha = np.asarray(cleared.getchannel("A")).astype(np.float32)
        triangle_alpha = np.asarray(triangle_mask).astype(np.float32) / 255
        cleared.putalpha(Image.fromarray(np.rint(cleared_alpha * (1 - triangle_alpha)).astype(np.uint8)))

        white = Image.new("RGBA", result.size, (255, 255, 255, 0))
        white.putalpha(triangle_mask)
        result = Image.alpha_composite(cleared, white)

    return result


logo = extract(CROP)
logo.save(PUBLIC / "katch-logo.png", optimize=True)
logo.save(PUBLIC / "katch-logo.webp", "WEBP", lossless=True, method=6)

# Create a square brand mark from the central shape for browser and device icons.
mark_crop = (395, 598, 744, 930)
mark = extract(mark_crop, dark_x_bounds=(415, 725))

icon = Image.new("RGBA", (512, 512), (243, 241, 235, 255))
mark.thumbnail((400, 400), Image.Resampling.LANCZOS)
icon.alpha_composite(mark, ((512 - mark.width) // 2, (512 - mark.height) // 2))
icon.save(PUBLIC / "katch-mark.png", optimize=True)
icon.resize((180, 180), Image.Resampling.LANCZOS).save(PUBLIC / "apple-touch-icon.png", optimize=True)
icon.resize((64, 64), Image.Resampling.LANCZOS).save(PUBLIC / "favicon.png", optimize=True)

print(f"Created {PUBLIC / 'katch-logo.png'} ({logo.width}×{logo.height})")
