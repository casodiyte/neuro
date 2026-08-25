from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "public" / "images" / "neurosono"
CONTACT_SHEET = ROOT / ".tmp-neurosono-contact.png"

TARGETS = {
    "clinica-01-tecnica": (1800, 1200),
    "clinica-02-anatomia": (1400, 800),
    "clinica-03-practica": (1400, 800),
    "diferencial-cerebro": (1800, 1200),
    "recorrido-01-virtual": (1200, 900),
    "recorrido-02-presencial": (1200, 900),
    "recorrido-03-seguimiento": (1200, 900),
    "curso2-proximamente": (1000, 1000),
    "curso3-proximamente": (1000, 1000),
    "textura-doppler": (2400, 1000),
}


def prepare_asset(stem: str, size: tuple[int, int]) -> Image.Image:
    source = ASSET_DIR / f"{stem}.png"
    with Image.open(source) as image:
        image = image.convert("RGB")
        prepared = ImageOps.fit(
            image,
            size,
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )
        prepared.save(source, "PNG", optimize=True, compress_level=8)
        prepared.save(ASSET_DIR / f"{stem}.webp", "WEBP", quality=86, method=6)
        prepared.save(ASSET_DIR / f"{stem}.avif", "AVIF", quality=68, speed=6)
        return prepared.copy()


def make_contact_sheet(images: list[tuple[str, Image.Image]]) -> None:
    tile_width = 420
    tile_height = 300
    label_height = 34
    columns = 2
    rows = (len(images) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * tile_width, rows * (tile_height + label_height)), "#0A0A0B")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()

    for index, (stem, image) in enumerate(images):
        row, column = divmod(index, columns)
        tile = ImageOps.contain(image, (tile_width, tile_height), Image.Resampling.LANCZOS)
        x = column * tile_width + (tile_width - tile.width) // 2
        y = row * (tile_height + label_height) + (tile_height - tile.height) // 2
        sheet.paste(tile, (x, y))
        draw.text((column * tile_width + 12, row * (tile_height + label_height) + tile_height + 10), stem, fill="#E7E7EA", font=font)

    sheet.save(CONTACT_SHEET, "PNG", optimize=True)


def main() -> None:
    prepared = [(stem, prepare_asset(stem, size)) for stem, size in TARGETS.items()]
    make_contact_sheet(prepared)
    for stem, size in TARGETS.items():
        webp = ASSET_DIR / f"{stem}.webp"
        avif = ASSET_DIR / f"{stem}.avif"
        print(f"{stem}: {size[0]}x{size[1]} | WebP {webp.stat().st_size} B | AVIF {avif.stat().st_size} B")


if __name__ == "__main__":
    main()
