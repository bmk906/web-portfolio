# Portfolio
Architecture Portfolio — plain HTML/CSS/JS, no build step.

## Preview
Open `index.html` in a browser. Everything works from the file system.

## Files
- `index.html` — home: menu, project strips, and the resume at the bottom (edit the HTML directly; put the PDF at `assets/resume.pdf`)
- `project.html` — one template for every project (`project.html?p=<slug>`)
- `js/projects.js` — **all project content lives here**
- `js/main.js` — renders the strips and project pages
- `css/style.css` — all styling
- `assets/img/` — images (`projects/<slug>/` per project)

## Adding or changing a project
Edit the `PROJECTS` list in `js/projects.js`. The order there is the order on the site.
To pick which detail a strip shows, set `stripFocus`
(`"0% 50%"` left edge, `"50% 50%"` centre, `"100% 50%"` right edge).

## Publishing changes
When `css/style.css` or anything in `js/` changes, bump the `?v=` number on their
links in `index.html` and `project.html` so browsers fetch the new files instead
of a cached copy. When an image is replaced under the same file name, bump
`IMAGE_VERSION` at the top of `js/projects.js` for the same reason.
