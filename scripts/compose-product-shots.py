"""Knock out green (or reuse existing alpha) and place each SKU on a shared 1600x2400 canvas."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

CANVAS_W, CANVAS_H = 1600, 2400
# Product height as a fraction of canvas height. Cleanser is the tallest reference.
SCALE = {
    "cleanser": 0.82,
    "toner": 0.70,
    "cloud": 0.60,
    "dropper": 0.52,
    "jar50": 0.40,
    "jar15": 0.26,
}
MAX_WIDTH_FRAC = 0.84  # ~8% padding each side
ASSETS = Path(r"C:\Users\nnels\.cursor\projects\c-WebProjects-SkinProtocolRX\assets")
PUBLIC = Path(r"C:\WebProjects\SkinProtocolRX\public")
OUT_DIR = PUBLIC

PRODUCTS = [
    {
        "src": ASSETS / "chamomile-cream-cleanser-raw.jpg",
        "dst": "chamomile-cream-cleanser.png",
        "scale": "cleanser",
        "key": "green",
    },
    {
        "src": ASSETS / "clarifying-gel-cleanser-raw.jpg",
        "dst": "clarifying-gel-cleanser.png",
        "scale": "cleanser",
        "key": "green",
    },
    {
        "src": ASSETS / "tripleglow-exfoliating-cleanser-raw.jpg",
        "dst": "tripleglow-exfoliating-cleanser.png",
        "scale": "cleanser",
        "key": "green",
    },
    {
        "src": ASSETS / "niacinamide-rosewater-toner-raw.jpg",
        "dst": "niacinamide-rosewater-toner.png",
        "scale": "toner",
        "key": "green",
    },
    {
        "src": ASSETS / "brighten-glow-c-serum-5-raw.jpg",
        "dst": "brighten-glow-c-serum-5.png",
        "scale": "dropper",
        "key": "green",
    },
    {
        "src": ASSETS / "brighten-glow-c-serum-20-raw.jpg",
        "dst": "brighten-glow-c-serum-20.png",
        "scale": "dropper",
        "key": "green",
    },
    {
        "src": ASSETS / "hyaluronic-acid-serum-raw.jpg",
        "dst": "hyaluronic-acid-serum.png",
        "scale": "dropper",
        "key": "green",
    },
    {
        "src": ASSETS / "matrix-serum-raw.jpg",
        "dst": "matrix-serum.png",
        "scale": "dropper",
        "key": "green",
    },
    {
        "src": ASSETS / "tri-peptide-complex-serum-raw.jpg",
        "dst": "tri-peptide-complex-serum.png",
        "scale": "dropper",
        "key": "green",
    },
    {
        "src": ASSETS / "beauty-elixir-serum-raw.jpg",
        "dst": "beauty-elixir-serum.png",
        "scale": "dropper",
        "key": "green",
    },
    {
        "src": ASSETS / "bakuchiol-renewal-serum-raw.jpg",
        "dst": "bakuchiol-renewal-serum.png",
        "scale": "dropper",
        "key": "green",
    },
    {
        "src": ASSETS / "hydration-cloud-cream-raw.jpg",
        "dst": "hydration-cloud-cream.png",
        "scale": "cloud",
        "key": "green",
    },
    {
        "src": PUBLIC / "rich-barrier-cream.png",
        "dst": "rich-barrier-cream.png",
        "scale": "jar50",
        "key": "alpha",
    },
    {
        "src": ASSETS / "eye-recovery-complex-raw.jpg",
        "dst": "eye-recovery-complex.png",
        "scale": "jar15",
        "key": "green",
    },
    {
        "src": ASSETS / "the-holy-grail-oil-raw.jpg",
        "dst": "the-holy-grail-oil.png",
        "scale": "dropper",
        "key": "green",
    },
]


def inspect(path: Path) -> None:
    im = Image.open(path)
    arr = np.asarray(im)
    print(f"{path.name}: mode={im.mode} size={im.size} shape={arr.shape}", end="")
    if arr.ndim == 3 and arr.shape[2] == 4:
        a = arr[..., 3]
        print(f" alpha min={a.min()} max={a.max()} transparent={(a == 0).mean():.1%}")
    else:
        corners = [arr[0, 0], arr[0, -1], arr[-1, 0], arr[-1, -1]]
        print(f" corners={ [tuple(c[:3] if hasattr(c, '__len__') else c) for c in corners] }")


def key_green(rgb: np.ndarray) -> np.ndarray:
    """Return uint8 alpha. Green-dominant pixels become transparent."""
    r = rgb[..., 0].astype(np.float32)
    g = rgb[..., 1].astype(np.float32)
    b = rgb[..., 2].astype(np.float32)
    green_excess = g - np.maximum(r, b)
    # Strong green screen: G high and clearly greener than R/B.
    score = green_excess
    # Soft ramp so bottle edges are not a hard cut.
    alpha = np.clip((40.0 - score) / 28.0, 0.0, 1.0)
    # Pixels that are near-white or near-black stay opaque even if slightly green-tinted.
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    sat = (np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b))
    keep = ((luma > 210) & (sat < 35)) | ((luma < 45) & (sat < 40))
    alpha = np.where(keep, 1.0, alpha)
    # Despill: pull remaining green toward neighbor luminance on semi-transparent edges.
    return (alpha * 255.0).astype(np.uint8)


def despill(rgb: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    """Remove leftover green fringe on semi-transparent edges."""
    r = rgb[..., 0].astype(np.float32)
    g = rgb[..., 1].astype(np.float32)
    b = rgb[..., 2].astype(np.float32)
    a = alpha.astype(np.float32) / 255.0
    edge = (a > 0.05) & (a < 0.95)
    max_rb = np.maximum(r, b)
    g2 = np.minimum(g, max_rb + 8)
    g = np.where(edge, g2, g)
    out = np.stack([r, g, b], axis=-1)
    return np.clip(out, 0, 255).astype(np.uint8)


def to_rgba(path: Path, key: str) -> Image.Image:
    im = Image.open(path)
    if key == "alpha":
        rgba = im.convert("RGBA")
        arr = np.asarray(rgba)
        if arr[..., 3].max() == 255 and arr[..., 3].min() == 255:
            # Opaque file named PNG — treat near-white corners as backdrop if present.
            rgb = arr[..., :3]
            corners = np.stack([rgb[0, 0], rgb[0, -1], rgb[-1, 0], rgb[-1, -1]]).astype(np.float32)
            mean = corners.mean(axis=0)
            if mean.min() > 245:
                dist = np.linalg.norm(rgb.astype(np.float32) - mean, axis=-1)
                alpha = np.clip((dist - 8) / 18, 0, 1)
                arr = np.dstack([rgb, (alpha * 255).astype(np.uint8)])
                return Image.fromarray(arr, "RGBA")
        return rgba

    rgb = np.asarray(im.convert("RGB"))
    alpha = key_green(rgb)
    rgb = despill(rgb, alpha)
    return Image.fromarray(np.dstack([rgb, alpha]), "RGBA")


def tight_crop(im: Image.Image, pad: int = 4) -> Image.Image:
    arr = np.asarray(im)
    ys, xs = np.where(arr[..., 3] > 12)
    if len(xs) == 0:
        return im
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(im.width, x1 + pad)
    y1 = min(im.height, y1 + pad)
    return im.crop((x0, y0, x1, y1))


def place(im: Image.Image, scale_key: str) -> Image.Image:
    cropped = tight_crop(im)
    target_h = int(CANVAS_H * SCALE[scale_key])
    max_w = int(CANVAS_W * MAX_WIDTH_FRAC)
    ratio = target_h / cropped.height
    new_w = int(cropped.width * ratio)
    new_h = target_h
    if new_w > max_w:
        ratio = max_w / cropped.width
        new_w = max_w
        new_h = int(cropped.height * ratio)
    resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    x = (CANVAS_W - new_w) // 2
    y = (CANVAS_H - new_h) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas


def corner_opaque(path: Path) -> bool:
    arr = np.asarray(Image.open(path).convert("RGBA"))
    corners = [arr[0, 0, 3], arr[0, -1, 3], arr[-1, 0, 3], arr[-1, -1, 3]]
    return max(corners) > 8


def main() -> None:
    import sys

    wanted = set(sys.argv[1:])
    specs = [s for s in PRODUCTS if not wanted or s["dst"] in wanted]
    print("=== inspect sources ===")
    for spec in specs:
        inspect(spec["src"])

    print("\n=== compose ===")
    for spec in specs:
        rgba = to_rgba(spec["src"], spec["key"])
        out = place(rgba, spec["scale"])
        dest = OUT_DIR / spec["dst"]
        out.save(dest, "PNG", optimize=True)
        arr = np.asarray(out)
        opaque = (arr[..., 3] > 12).mean()
        bad = corner_opaque(dest)
        print(
            f"{spec['dst']}: {out.size} product_fill={opaque:.1%} "
            f"corners_clear={not bad} scale={spec['scale']}"
        )


if __name__ == "__main__":
    main()
