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

    const sections = [...document.querySelectorAll(".category")]; // project categories + resume

    function activate(id) {
      sections.forEach((s) => {
        s.classList.toggle("is-active", s.id === id);
        s.classList.toggle("is-dim", s.id !== id);
      });
      setActiveMenu(id);
    }

    const fromHash = sections.find((s) => "#" + s.id === location.hash);
    activate((fromHash || sections[0]).id);

    /* Desktop: the menu shrinks to project-page size on the way down to the resume.
       0 = full size, 1 = project-page size. Starts when the Practice strips are half
       hidden behind the header; ends when the resume becomes active (un-greyed). */
    const desktop = matchMedia("(min-width: 761px)");
    const menu = document.querySelector(".menu");
    const practiceStrip = document.querySelector("#practice .strip-frame");
    const resume = document.getElementById("resume");
    const ACTIVE_LINE = 0.35; // fraction of viewport height a section's top must pass to become active
    let menuLocked = false; // while a menu click animates the size, scrolling doesn't drive it

    function shrinkAt(y) {
      if (!desktop.matches || !practiceStrip || !resume) return 0;
      const strip = practiceStrip.getBoundingClientRect();
      const start = scrollY + strip.top + strip.height / 2 - header.getBoundingClientRect().bottom;
      const end = scrollY + resume.getBoundingClientRect().top - innerHeight * ACTIVE_LINE;
      if (end <= start) return y >= end ? 1 : 0;
      return Math.min(1, Math.max(0, (y - start) / (end - start)));
    }

    function setShrink(p) {
      document.documentElement.style.setProperty("--menu-shrink", p.toFixed(4));
    }

    function update() {
      const line = innerHeight * ACTIVE_LINE;
      const current = sections.filter((s) => s.getBoundingClientRect().top <= line).pop() || sections[0];
      activate(current.id);
      if (!menuLocked) setShrink(shrinkAt(scrollY));
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Menu click: animate straight to the destination's size (same timing as the
    // page transition) while the page scrolls, then hand control back to scrolling
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        const target = document.getElementById(a.dataset.target);
        if (!target || !desktop.matches) return;

        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        const maxY = document.documentElement.scrollHeight - innerHeight;
        const destY = Math.min(maxY, scrollY + target.getBoundingClientRect().top - margin);

        menuLocked = true;
        menu.classList.add("is-resizing");
        setShrink(shrinkAt(destY));

        const scrolled = new Promise((done) => {
          addEventListener("scrollend", done, { once: true });
          setTimeout(done, 1200); // no scrollend (already there, or unsupported)
        });
        const resized = new Promise((done) => setTimeout(done, 550));
        Promise.all([scrolled, resized]).then(() => {
          menuLocked = false;
          menu.classList.remove("is-resizing");
          update();
        });
      });
    });

    // Arriving from another page with #section: jump there now so the first frame
    // (and the page transition) shows the right menu size, then again once the
    // name font has loaded, since it changes the header height
    if (fromHash) {
      fromHash.scrollIntoView({ behavior: "instant" });
      document.fonts.ready.then(() => {
        setHeaderHeight();
        fromHash.scrollIntoView({ behavior: "instant" });
        update();
      });
    }
    update();
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

  // Sticky header (desktop): expose its height so the menu and scroll targets sit below it
  const header = document.querySelector(".site-header");
  function setHeaderHeight() {
    const sticky = getComputedStyle(header).position === "sticky";
    document.documentElement.style.setProperty("--header-h", sticky ? header.offsetHeight + "px" : "0px");
  }
  setHeaderHeight(); // now, so arriving at index.html#section lands below the header
  new ResizeObserver(setHeaderHeight).observe(header);

  if (page === "index") renderIndex();
  if (page === "project") renderProject();
})();
