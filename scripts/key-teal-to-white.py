"""Replace the shaded teal studio backdrop of a portrait with pure white.

The backdrop is not a flat color (it gradients from a bright cyan to a dark
teal), so it is keyed on the blue-minus-red difference rather than on distance
to a single key color. Edge pixels are unspilled against a locally estimated
backdrop color so hair and skin edges blend into white instead of keeping a
cyan fringe.
"""

import sys

import numpy as np
from PIL import Image

# Below SOLID_FG the pixel is fully foreground, above SOLID_BG fully backdrop.
SOLID_FG = 15.0
SOLID_BG = 70.0
FILL_ITERATIONS = 60


def estimate_backdrop(rgb: np.ndarray, known: np.ndarray) -> np.ndarray:
    """Extend known backdrop colors into the foreground by neighbor averaging."""
    color = np.where(known[..., None], rgb, 0.0)
    weight = known.astype(np.float64)
    for _ in range(FILL_ITERATIONS):
        if weight.all():
            break
        acc_c = color.copy()
        acc_w = weight.copy()
        for axis, shift in ((0, 1), (0, -1), (1, 1), (1, -1)):
            acc_c += np.roll(color, shift, axis=axis)
            acc_w += np.roll(weight, shift, axis=axis)
        filled = acc_w > 0
        color = np.where(filled[..., None], acc_c / np.maximum(acc_w, 1e-9)[..., None], 0.0)
        weight = filled.astype(np.float64)
    return color


def main(src: str, dst: str) -> None:
    rgb = np.asarray(Image.open(src).convert("RGB"), dtype=np.float64)
    chroma = rgb[..., 2] - rgb[..., 0]

    alpha = 1.0 - np.clip((chroma - SOLID_FG) / (SOLID_BG - SOLID_FG), 0.0, 1.0)
    backdrop = estimate_backdrop(rgb, alpha <= 0.0)

    out = rgb + (1.0 - alpha)[..., None] * (255.0 - backdrop)
    out = np.clip(out, 0.0, 255.0).astype(np.uint8)

    image = Image.fromarray(out)
    if dst.lower().endswith((".jpg", ".jpeg")):
        image.save(dst, quality=92, subsampling=1, optimize=True)
    else:
        image.save(dst)
    print(f"wrote {dst} {image.size} backdrop pixels={(alpha <= 0).mean():.1%}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
