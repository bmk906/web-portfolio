# Portfolio
Architecture portfolio of Benjamin Klinger — plain HTML/CSS/JS, no build step.
Live at https://bmk906.github.io/web-portfolio/ (GitHub Pages, deploys on push to `main`).

## Preview
Open `index.html` in a browser. Everything works from the file system, except CSS masks
(the Compression strip's road tint), which browsers block on `file://` — to see those,
serve the folder over http (e.g. `npx http-server` or any static server) instead.

## Files
- `index.html` — home: menu, project strips, and the resume at the bottom (edit the HTML directly; put the PDF at `assets/resume.pdf`)
- `project.html` — one template for every project (`project.html?p=<slug>`)
- `js/projects.js` — **all project content lives here**; the comment block at its top documents every layout and option
- `js/main.js` — renders the strips and project pages
- `css/style.css` — all styling
- `assets/img/` — images (`projects/<slug>/` per project); `og-image.png` is the 1200px link-preview image

## Adding or changing a project
Edit the `PROJECTS` list in `js/projects.js`. The order there is the order on the site.
To pick which detail a strip shows, set `stripFocus`
(`"0% 50%"` left edge, `"50% 50%"` centre, `"100% 50%"` right edge).

Originals live outside the repo in
`C:\Users\bmk90\Documents\Professional\portfolio\<academic|practice>\<NN-name>\`
(images, `strip`, `site-plan`, and an `info.txt` with title/year/location/type/
collaborators/description). Web copies go in `assets/img/projects/<slug>/`: JPG, up to
~2200–3200px wide, drawings with text at high quality (92–95). PDFs also get full-page
JPEG copies saved into the project's `jpeg ver` folder for Ben's own records.

Descriptions: rewrite Ben's `info.txt` text to read well but keep all his points; he
proofreads every change.

## How the site works (things not obvious from the code)
- **"Web version" / "mobile version"** = desktop / phone layout (phone ≤ 760px). Changes
  are often wanted on one only. "Sub heading" = the ARCHITECTURE | DESIGN | CONSTRUCTION
  line; "home page" = `index.html`.
- **Strip colours**: black-and-white strips get a Bauhaus colour (overlay blend), dealt
  from a shuffled deck per category so none repeat (6 colours: red, yellow, blue, orange,
  green, violet — a 7th tinted strip would repeat one). Colour strips can be shown in black
  and white with `stripMono`, or pre-processed (greyscale, tones squeezed, grain) so the
  tint covers them. `stripMask` (Compression) puts the colour only on part of the image.
- **Project colour**: the colour a strip got on the home page carries into that project's
  page as the colour of its code (A.01) above the title (sessionStorage); a project
  opened directly gets a fixed colour by its position in the list.
- **Site plan beside the text** (web): a single image with `besideText: "<crop>.jpg"`
  shows that crop (square, ~260px) beside the description, top level with its first line;
  on mobile the full site plan stays in the gallery. Used on Sinusoidal, Youth Center,
  Ziggurat, Wall of Flutes (Monti and Compression have their own site plan treatments).
  The details row spreads to the plan's right edge only when it has 4+ items.
- **Mobile descriptions** collapse to seven lines with a fade and a Read more button.
- **Captions** must line up with the visible edge of the drawing (crop to content, or
  `captionInset`) and sit close under images — Ben is particular about this.

## Image processing (Windows, no Python, no ImageMagick)
- Done with PowerShell + `System.Drawing` scripts (crop by pixel/fraction, resize, save
  JPEG at a set quality). For fast pixel work (ink bounds, finding frame lines, masks,
  greyscale + grain), compile a small C# helper with `Add-Type` using `LockBits`.
- **PDF → image**: no PDF tools are installed; use Windows' built-in renderer
  (`Windows.Data.Pdf` WinRT API) from `powershell.exe` 5.1, rendering page 1 at ~4000px.
- Node is installed (`C:\Program Files\nodejs`) — handy for a quick static server or
  syntax-checking `projects.js` / `main.js`.

## Checking changes before pushing
Take headless Edge screenshots and look at them:
`msedge.exe --headless=new --disable-gpu --hide-scrollbars --window-size=1440,1100 --virtual-time-budget=3000 --screenshot=out.png "file:///C:/Users/bmk90/web-portfolio/project.html?p=<slug>"`
Mobile: use a ~500px-wide window (headless Edge won't go narrower, so the right edge of
very narrow shots is clipped — that's the tool, not the site).

## Publishing changes
Commit and push to `main`; Ben checks the live site with Ctrl+F5.
When `css/style.css` or anything in `js/` changes, bump the `?v=` number on their
links in `index.html` and `project.html` so browsers fetch the new files instead
of a cached copy. When an image is replaced under the same file name, bump
`IMAGE_VERSION` at the top of `js/projects.js` for the same reason.

**Don't edit repo text files with PowerShell 5.1 `Get-Content`/`Set-Content`** — it
misreads UTF-8, adds a BOM and mangles curly quotes (e.g. "Dean’s List" in the resume).
Use `sed` in Bash or a proper editor.

## Status and open items
- Academic: all six done (A.01 Sinusoidal, A.02 North Beach Youth Center, A.03 Ziggurat
  of Leaves, A.04 Monti Prenestini, A.05 Wall of Flutes, A.06 Compression).
- Practice: two placeholders; Ben is gathering drawings from work.
- Ben is still deciding on the beside-text site plan treatment (square, 2:3 and 3:4 were
  tried; square with the plan starting at the first line of text is current).
- Wall of Flutes: "mirror 5" is the interior render; its board images still carry their
  own titles and the "ARC 583 / Benjamin Klinger" header (02) — could be painted out.
- Resume PDF download link not added yet; where to put his email is undecided;
  keep or drop Inter on the desktop resume is undecided.
- If the site moves to a custom domain, update `og:url` and `og:image` in both HTML files
  (and re-scrape with Facebook's Sharing Debugger).
