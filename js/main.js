(function () {
  const page = document.body.dataset.page;

  const inCategory = (id) => PROJECTS.filter((p) => p.category === id);

  // "A.01", "P.02" — index within its category
  function code(project) {
    const cat = CATEGORIES.find((c) => c.id === project.category);
    const n = inCategory(project.category).indexOf(project) + 1;
    return cat.prefix + "." + String(n).padStart(2, "0");
  }

  function setActiveMenu(id) {
    document.querySelectorAll(".menu a").forEach((a) => {
      a.classList.toggle("is-active", a.dataset.target === id);
    });
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  }

  /* ---------- Home ---------- */

  function renderIndex() {
    const root = document.getElementById("categories");

    root.innerHTML = CATEGORIES.map((cat, i) => {
      const items = inCategory(cat.id);
      const strips = items
        .map(
          (p) => `
        <li>
          <a class="strip" href="project.html?p=${p.slug}" aria-label="${escapeHTML(p.title)}">
            <span class="strip-frame">
              <img src="${p.strip}" alt="" loading="lazy" style="object-position:${p.stripFocus || "50% 50%"}">
              <span class="strip-title" aria-hidden="true">${escapeHTML(p.title)}</span>
            </span>
            <span class="strip-caption" aria-hidden="true">${escapeHTML(p.title)}</span>
            <span class="strip-code" aria-hidden="true">${code(p)}</span>
          </a>
        </li>`
        )
        .join("");

      return `
      <section class="category" id="${cat.id}" aria-labelledby="${cat.id}-label">
        <h2 class="category-head" id="${cat.id}-label">
          <span>${String(i + 1).padStart(2, "0")}</span>
          <span>${cat.label}</span>
          <span class="category-count">${items.length} projects</span>
        </h2>
        <ul class="strips">${strips}</ul>
      </section>`;
    }).join("");

    const sections = [...root.querySelectorAll(".category")];

    function activate(id) {
      sections.forEach((s) => {
        s.classList.toggle("is-active", s.id === id);
        s.classList.toggle("is-dim", s.id !== id);
      });
      setActiveMenu(id);
    }

    const fromHash = sections.find((s) => "#" + s.id === location.hash);
    activate((fromHash || sections[0]).id);

    // The section crossing a thin band ~1/3 down the viewport is the active one
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        const current = sections.filter((s) => visible.has(s)).pop();
        if (current) activate(current.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView();
    }
  }

  /* ---------- Project ---------- */

  function renderProject() {
    const root = document.getElementById("project");
    const slug = new URLSearchParams(location.search).get("p");
    const i = PROJECTS.findIndex((p) => p.slug === slug);

    if (i === -1) {
      root.innerHTML = `<p class="eyebrow">Not found</p><p><a class="text-link" href="index.html">Back to index</a></p>`;
      return;
    }

    const p = PROJECTS[i];
    const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    const cat = CATEGORIES.find((c) => c.id === p.category);

    document.title = p.title + " — " + document.title;
    setActiveMenu(p.category);

    const meta = [
      ["Year", p.year],
      ["Location", p.location],
      ["Type", p.type],
      [p.category === "academic" ? "Studio" : "Office / Role", p.context],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`)
      .join("");

    const gallery = p.images
      .map(
        (img) => `
      <figure>
        <img src="${img.src}" alt="${escapeHTML(img.caption || p.title)}" loading="lazy">
        ${img.caption ? `<figcaption>${escapeHTML(img.caption)}</figcaption>` : ""}
      </figure>`
      )
      .join("");

    root.innerHTML = `
      <header class="project-head">
        <p class="eyebrow">${code(p)} &nbsp;/&nbsp; ${cat.label}</p>
        <h1>${escapeHTML(p.title)}</h1>
        <dl class="meta">${meta}</dl>
        <p class="lede">${escapeHTML(p.summary)}</p>
      </header>
      <div class="gallery">${gallery}</div>
      <nav class="pager" aria-label="More projects">
        <a href="project.html?p=${prev.slug}"><span>Previous</span>${escapeHTML(prev.title)}</a>
        <a href="index.html#${p.category}" class="pager-index">Index</a>
        <a href="project.html?p=${next.slug}"><span>Next</span>${escapeHTML(next.title)}</a>
      </nav>`;
  }

  /* ---------- Header: stretch tagline to the width of the name ---------- */

  function fitTagline() {
    const name = document.querySelector(".name");
    const tagline = document.querySelector(".tagline");
    if (!name || !tagline) return;

    const textWidth = (el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return range.getBoundingClientRect().width;
    };

    // Blank space built into the first/last glyph, so we can align visible ink, not letter boxes
    const ctx = document.createElement("canvas").getContext("2d");
    const bearings = (el) => {
      const cs = getComputedStyle(el);
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const text = el.textContent.trim().toUpperCase();
      const first = ctx.measureText(text[0]);
      const last = ctx.measureText(text[text.length - 1]);
      return { left: -first.actualBoundingBoxLeft, right: last.width - last.actualBoundingBoxRight };
    };

    tagline.style.letterSpacing = "0px";
    tagline.style.marginLeft = "0px";
    const n = bearings(name);
    const t = bearings(tagline);
    const nameInk = textWidth(name) - n.left - n.right;
    const taglineInk = textWidth(tagline) - t.left - t.right;
    const gaps = tagline.textContent.length - 1; // spacing after the last letter doesn't count

    tagline.style.letterSpacing = Math.max(0, (nameInk - taglineInk) / gaps) + "px";
    tagline.style.marginLeft = n.left - t.left + "px";
  }

  fitTagline();
  document.fonts.ready.then(fitTagline);
  window.addEventListener("resize", fitTagline);

  if (page === "index") renderIndex();
  if (page === "project") renderProject();
  if (page === "resume") setActiveMenu("resume");
})();
