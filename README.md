# Ember & Oak Coffee Co. — private preview

Private website preview for Ember & Oak Coffee Co., a neighborhood coffee shop at 214 Maple Street in Clarksville, TN. This repository must stay private. Do not enable GitHub Pages, do not deploy this anywhere public, and do not contact the client unless Jalen says so in his own words.

The visual system uses the **restaurant / cafe** preset (`Table & Porch` in the style library: cream, burgundy, and brass; Cormorant Garamond and Outfit). There is no separate coffee-shop preset; Restaurant / cafe maps to that one.

## View the preview privately

The built site is in `preview-site/`. It is plain HTML and CSS, with relative links, so it opens from a local folder.

1. Clone or download this private repo, or unzip `ember-oak-preview-site.zip`.
2. Open `preview-site/index.html` in a browser (double-click the file, or use File → Open).
3. Optional, if you want a local server: from the `preview-site` folder run `python3 -m http.server 8080` and visit `http://localhost:8080`.

Screenshots (phone and desktop) are in `screenshots-shared/`.

## Edit hours, the menu, and events

The owner-facing content lives in data files, which Pages CMS can also edit (see `.pages.yml`):

| File | What it controls |
| --- | --- |
| `_data/site.yml` | Business name, city, address, hours, phone, email, parking, hero copy, footer credit |
| `_data/menu.yml` | Menu categories and items |
| `_data/events.yml` | Events list |

After you change those files, rebuild:

```bash
./scripts/build.sh
```

That refreshes `preview-site/` and `ember-oak-preview-site.zip`. You need Jekyll 3.10+ on your PATH (see the Gemfile).

## Placeholders

Anything the shop has not sent yet is marked on the page with a dashed **Placeholder** or **Sample** badge:

- Logo (text wordmark until a logo file arrives)
- Photos of the shop (tasteful placeholder blocks, not stock photos)
- Menu item names and prices (categories are real; items are labeled Sample)
- Shop phone and email
- Parking details

The top banner says **Preview, not live**.

## Branching

Work on a branch and open a pull request into `main`. Do not push to `main`. See `AGENTS.md`.
