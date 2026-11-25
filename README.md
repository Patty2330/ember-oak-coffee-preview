# Ember & Oak Coffee Co. — private preview

Private website preview for Ember & Oak Coffee Co., a neighborhood coffee shop at 214 Maple Street in Clarksville, TN. This repository must stay private. Do not enable GitHub Pages, do not deploy this anywhere public, and do not contact the client unless Jalen says so in his own words.

The current visual system is **Live Coal** (chosen by Jalen on 25 November 2026): charcoal `#0B0908`, cream text `#F3E6D0`, ember CTA `#FF6A21` with dark type `#140806`. Display type is **Instrument Serif**; UI, hours, and buttons are **IBM Plex Mono**. Concept photographs and the circular mark are Creative-generated placeholders, labeled on the page, until Sandy sends real assets.

Earlier directions:

- `preview/initial` (PR #1) — first preview, Table & Porch restaurant preset
- `design/ember-glow` (PR #2) — Ember Glow alternate, left untouched after Live Coal was chosen

## View the preview privately

The built site is in `preview-site/`. It is plain HTML and CSS, with relative links, so it opens from a local folder.

1. Clone or download this private repo, or unzip `ember-oak-preview-site.zip`.
2. Open `preview-site/index.html` in a browser (double-click the file, or use File → Open).
3. Optional, if you want a local server: from the `preview-site` folder run `python3 -m http.server 8080` and visit `http://localhost:8080`.

Screenshots are in `screenshots-shared/`, including `phone-live-coal.png` and `desktop-live-coal.png`.

## Contrast (WCAG 2.2 AA)

Checked 25 November 2026, America/Chicago, from sRGB relative luminance:

| Pair | Ratio | AA normal |
| --- | --- | --- |
| `#F3E6D0` on `#0B0908` (body) | 16.12 | Pass |
| `#CDB89A` on `#0B0908` (muted) | 10.33 | Pass |
| `#140806` on `#FF6A21` (CTA label) | 6.87 | Pass |
| `#FF6A21` on `#0B0908` (open pill) | 6.94 | Pass |
| `#F3E6D0` on `#120E0C` (text on panels) | 15.58 | Pass |
| `#FFFFFF` on `#FF6A21` | 2.86 | **Fail** — do not use white on the ember button |
| `#C43A0E` on `#0B0908` (deep ember) | 3.75 | Large marks only |

## Edit hours, the menu, and events

| File | What it controls |
| --- | --- |
| `_data/site.yml` | Business name, city, address, hours, phone, email, parking, hero copy, footer credit |
| `_data/menu.yml` | Menu categories and items |
| `_data/events.yml` | Events list |

`.pages.yml` is set up for Pages CMS. After you change those files, rebuild with `./scripts/build.sh`.

## Placeholders

- Logo: concept mark, labeled **Concept** (not a final mark)
- Photos: generated concept images, labeled **Placeholder image**
- Menu item names and prices (categories are real; items are labeled Sample)
- Shop phone and email
- Parking details

The top banner says **Preview, not live**. Pages are set to `noindex`.

## Branching

Work on a branch and open a pull request. Do not push to `main`. See `AGENTS.md`.
