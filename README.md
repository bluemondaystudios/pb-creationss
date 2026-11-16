# PB_Creationss · Happy Stitches

Website for **PB_Creationss**: custom-made clothing by Pebetse, Jane Furse, Limpopo (est. 2016).

Live at **https://pb-creationss.co.za** (GitHub Pages, custom domain set in `CNAME`).

## Structure
- `index.html`: single-page site (hero, lookbook, services, process, measuring guide, about, order form)
- `assets/css/style.css`, `assets/js/main.js`
- `assets/img/looks/`: lookbook photos as WebP (`-800` for the grid, `-1400` for the lightbox)
- `404.html`, `robots.txt`, `sitemap.xml`, `CNAME`, `.nojekyll`

## Adding a new look
1. Export two WebP versions, about 800px and 1400px wide, into `assets/img/looks/`.
2. Copy one `<figure class="look">` block in `index.html`, then update `data-cat` (`occasion` | `traditional` | `group`), the image paths, the alt text and the caption.

The order form sends no data to a server. It opens WhatsApp (+27 79 103 9855) with the client's request already written out.
