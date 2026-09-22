# IPPGOnline Visual System v6

This version converts the approved visual direction into HTML/CSS/JavaScript rather than a generated image.

## Repo placement
Merge these files into the existing IPPGOnline repo. Keep your existing `assets/` files.

Expected asset names:
- `assets/Spark_612x450.png`
- `assets/Sparklight(R)-purple-cmyk_AWFY.png`
- `assets/Sparklight_QR_60x60.jpg`
- `assets/SPK-_0001_persona-3MFree.png`
- `assets/mobile-unlimited-free-1-year.png` (rename the approved horizontal Mobile graphic to this)
- Effra webfont files can remain under `assets/fonts/`.

## Data
The renderer loads only `data/ippg-data.json`. `headlineMode`, `equipmentIncluded`, plan pricing, promo visibility, legal copy, and `filename` are data-driven.

The Print / Save PDF button invokes the browser print dialog. The document title is temporarily set from the data `filename`, which browsers commonly use as the suggested PDF filename.
