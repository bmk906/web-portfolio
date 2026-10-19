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

  // Image URL with the current IMAGE_VERSION, so replaced images aren't served from cache
  const asset = (src) => `${src}?v=${typeof IMAGE_VERSION === "undefined" ? 1 : IMAGE_VERSION}`;

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
              <img src="${asset(p.strip)}" alt="" loading="lazy" style="object-position:${p.stripFocus || "50% 50%"}">
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
      document.title = id === "resume" ? "Resume" : "Portfolio"; // tab shows what is on screen
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

    // Resume extends left to sit beside the small menu, the same distance a project
    // sits from the menu on a project page
    function setResumePull() {
      if (!desktop.matches) return document.documentElement.style.setProperty("--resume-pull", "0px");
      // offsetWidth is the layout width, unaffected by the page-change scale animation
      // (getBoundingClientRect would measure the menu mid-scale in Firefox)
      const menuLeft = menu.getBoundingClientRect().left; // scale origin is top-left, so left is stable
      const fontNow = parseFloat(getComputedStyle(menu.querySelector("a")).fontSize);
      const fontSmall = parseFloat(getComputedStyle(document.querySelector(".name")).fontSize);
      const smallRight = menuLeft + menu.offsetWidth * (fontSmall / fontNow);
      const gap = parseFloat(getComputedStyle(menu.parentElement).columnGap);
      const pull = resume.parentElement.getBoundingClientRect().left - (smallRight + gap);
      document.documentElement.style.setProperty("--resume-pull", Math.max(0, pull) + "px");
    }
    setResumePull();
    document.fonts.ready.then(setResumePull);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", () => {
      setResumePull();
      update();
    });

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

    document.title = p.title; // tab shows the project; link previews keep the HTML title
    setActiveMenu(p.category);

    const meta = [
      ["Year", p.year],
      ["Location", p.location],
      ["Type", p.type],
      [p.category === "academic" ? "Studio" : "Office / Role", p.context],
      ["Collaborators", p.collaborators],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`)
      .join("");

    const summary = [].concat(p.summary).map((para) => `<p>${escapeHTML(para)}</p>`).join("");

    const caption = (text) => (text ? `<figcaption>${escapeHTML(text)}</figcaption>` : "");
    const centred = (l) => l.align !== "left";

    // One image, with optional white labels on top and (inside a group) its own caption
    const image = (img, inGroup) => {
      const tag = `<img src="${asset(img.src)}" alt="${escapeHTML(img.caption || p.title)}" loading="lazy">`;
      const labels = (img.labels || [])
        .map(
          (l) =>
            `<span class="img-label${centred(l) ? " img-label--center" : ""}" style="left:${l.x};top:${l.y}">${escapeHTML(l.text)}</span>`
        )
        .join("");
      const ownCaption = inGroup && img.caption ? `<p class="item-caption">${escapeHTML(img.caption)}</p>` : "";
      return labels || ownCaption ? `<div class="gallery-item">${tag}${labels}${ownCaption}</div>` : tag;
    };

    // An entry is a single image, or a group: { layout: "stack" | "bands" | "grid", images }
    const gallery = p.images
      .map((block) => {
        if (!block.layout) return `<figure>${image(block)}${caption(block.caption)}</figure>`;
        const style =
          block.layout === "bands"
            ? ` style="--band-ratio:${block.ratio || "4 / 1"};--band-focus:${block.focus || "50% 50%"}"`
            : "";
        // mobile: labels are listed below the group instead of sitting on the image
        const listed = block.images.flatMap((img) => img.labels || []);
        const list = listed.length
          ? `<ul class="label-list">${listed.map((l) => `<li>${escapeHTML(l.text)}</li>`).join("")}</ul>`
          : "";
        return `
      <figure class="gallery-${block.layout}"${style}>
        <div class="gallery-group">${block.images.map((img) => image(img, true)).join("")}</div>
        ${list}${caption(block.caption)}
      </figure>`;
      })
      .join("");

    root.innerHTML = `
      <header class="project-head">
        <p class="eyebrow">${code(p)} &nbsp;/&nbsp; ${cat.label}</p>
        <h1>${escapeHTML(p.title)}</h1>
        <dl class="meta">${meta}</dl>
        <div class="lede">${summary}</div>
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

  /* ---------- Page-change animation for browsers without cross-page View Transitions ----------
     Chrome/Edge/Safari animate the menu between pages natively (see style.css). Elsewhere
     (e.g. Firefox): remember the menu's size when leaving a page. On arrival, the inline
     script in <head> has already drawn the menu at that size (class "menu-entering"), so
     here we switch to this page's size once, visually scale the menu back up to match,
     and ease the scale to 1. Animating transform rather than font-size keeps the rest of
     the page from re-laying out every frame. */

  const nativePageTransitions = "PageRevealEvent" in window;
  const isDesktop = () => matchMedia("(min-width: 761px)").matches;
  const MENU_KEY = "menuSizeOnLeave"; // also read by the inline script in <head>

  if (!nativePageTransitions) {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || !isDesktop() || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const to = new URL(a.href, location.href);
      const sameDocument = to.pathname === location.pathname && to.search === location.search;
      if (to.origin !== location.origin || sameDocument) return; // in-page links animate on their own
      const size = parseFloat(getComputedStyle(document.querySelector(".menu a")).fontSize);
      try {
        sessionStorage.setItem(MENU_KEY, JSON.stringify({ size, at: Date.now() }));
      } catch (err) {}
    });

    try {
      sessionStorage.removeItem(MENU_KEY);
    } catch (err) {}

    const root = document.documentElement;
    if (root.classList.contains("menu-entering")) {
      const menu = document.querySelector(".menu");
      const word = menu.querySelector("a");
      const from = parseFloat(getComputedStyle(word).fontSize);
      root.classList.remove("menu-entering"); // menu and layout take this page's size, once
      const to = parseFloat(getComputedStyle(word).fontSize);
      document.body.classList.add("page-enter");

      if (Math.abs(from - to) > 0.5) {
        menu.style.transform = `scale(${from / to})`; // looks the same as the previous page
        void menu.offsetWidth; // commit before turning the transition on
        menu.classList.add("menu-scaling");
        menu.style.transform = ""; // ease to this page's size
      }

      setTimeout(() => {
        menu.classList.remove("menu-scaling");
        document.body.classList.remove("page-enter");
      }, 700);
    }
  }
})();
