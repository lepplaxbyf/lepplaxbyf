# Lepplax samlingshus

Website for the community house of Lepplax byaförening rf, built with [Hugo](https://gohugo.io/). The site is bilingual: Swedish (default) and Finnish.

## Requirements

- Hugo **extended**, v0.123 or newer. Install a recent release from the [Hugo releases page](https://github.com/gohugoio/hugo/releases) rather than a distro package if the `apt` version is outdated.

## Development

```sh
hugo server        # http://localhost:1313, live reload
hugo server -D     # also show drafts
hugo               # build the site into public/
```

## Structure

| Path | Purpose |
|---|---|
| `hugo.toml` | Site config and language setup |
| `content/` | Swedish pages (`bokningar`, `bilder`, home) |
| `content_fi/` | Finnish pages (`kalenteri`, `kuvat`, home) |
| `static/images/` | Photos |
| `data/gallery.toml` | Which images appear in which gallery section |
| `themes/lepplaxbyf/` | The site's own theme, with everything below |
| `themes/lepplaxbyf/layouts/` | Templates: `baseof.html`, `home.html`, `booking/`, `gallery/`, `_partials/` (header and footer) |
| `themes/lepplaxbyf/i18n/` | All UI text, in `sv.toml` and `fi.toml` |
| `themes/lepplaxbyf/static/` | CSS (`css/site.css`) and the gallery lightbox script (`js/gallery.js`) |

## Common tasks

- **Edit text:** change the strings in `themes/lepplaxbyf/i18n/sv.toml` and `fi.toml`. Keep both files in sync.
- **Add a photo:** put the file in `static/images/` and add its filename to a section in `data/gallery.toml`.
- **Change the page URLs:** the menu paths are set by `nav_booking_path` and `nav_gallery_path` in the i18n files, and the content folder names should match.
- **Booking calendar:** the page embeds a Google Calendar (`lepplaxbyf@gmail.com`) in `layouts/booking/list.html`. Contact details are in the i18n files.

## Deployment (Cloudflare)

The site is deployed from Git with Cloudflare Workers static assets. `wrangler.jsonc` runs the Hugo build (`hugo --gc --minify`) as part of `npx wrangler deploy` and publishes the `public/` folder. In the Cloudflare project settings:

- **Deploy command:** `npx wrangler deploy`
- **Build variable** (Settings → Build → Variables and secrets, not the runtime variables): `HUGO_VERSION` = `0.168.0`. The theme needs Hugo 0.160 or newer, which is newer than Cloudflare's default.

Set `baseURL` in `hugo.toml` to the real address; it is currently the placeholder `https://example.org/`.

## Credits

The base page template was originally derived from the [Ananke](https://github.com/gohugo-ananke/ananke) theme (MIT). Its license is kept in `themes/lepplaxbyf/licenses/`.
