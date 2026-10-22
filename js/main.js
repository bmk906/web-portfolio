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

  // Crop of a strip image: which part shows (stripFocus), optionally zoomed in toward it
  function stripStyle(p) {
    const focus = p.stripFocus || "50% 50%";
    const zoom = p.stripZoom ? `transform:scale(${p.stripZoom});transform-origin:${focus};` : "";
    const mono = p.stripMono ? "filter:grayscale(1) contrast(1.1);" : ""; // colour image shown in black and white
    return `object-position:${focus};${zoom}${mono}`;
  }

  /* Bauhaus tints for the black-and-white strips: a colour laid over each one in
     "overlay" blend mode (see .strip-tint), dealt like cards on every page load: each
     category gets a freshly shuffled deck, so no colour repeats within it (until a
     category has more strips than colours). Colour strips (stripTint: false) and
     placeholders are left alone. */
  // red, yellow, blue, poster orange, green, violet
  const TINTS = ["#D8342A", "#F0B323", "#1E4FA0", "#E8732E", "#2F7D52", "#6A3D9A"];
  let deck = [];
  function shuffleTints() {
    deck = [...TINTS];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
  function nextTint() {
    if (!deck.length) shuffleTints();
    return deck.pop();
  }
  const tinted = (p) => p.stripTint !== false && !/.svg$/.test(p.strip);
  // stripMask: the colour goes only where the mask is opaque, as a flat colour, cropped
  // the same way as the strip image
  function tintHTML(p, tint) {
    if (!p.stripMask) return `<span class="strip-tint" style="--tint:${tint}"></span>`;
    const mask = `url('${asset(p.stripMask)}')`;
    const focus = p.stripFocus || "50% 50%";
    return `<span class="strip-tint strip-tint--mask" style="--tint:${tint};-webkit-mask-image:${mask};mask-image:${mask};-webkit-mask-position:${focus};mask-position:${focus}"></span>`;
  }

  /* A project's colour carries from its home page strip into its page (the project
     code above the title). The home page remembers the colours it
     dealt for this visit; a project opened directly gets a fixed colour of its own. */
  function rememberTints(tints) {
    try {
      sessionStorage.setItem("stripTints", JSON.stringify(tints));
    } catch (e) {}
  }
  function projectTint(p) {
    try {
      const tint = JSON.parse(sessionStorage.getItem("stripTints") || "{}")[p.slug];
      if (tint) return tint;
    } catch (e) {}
    return TINTS[PROJECTS.indexOf(p) % TINTS.length];
  }

  function renderIndex() {
    const root = document.getElementById("categories");

    const dealt = {}; // slug -> tint, remembered for the project pages
    root.innerHTML = CATEGORIES.map((cat, i) => {
      const items = inCategory(cat.id);
      shuffleTints(); // a fresh deck per category
      const strips = items
        .map((p) => {
          const tint = tinted(p) ? (dealt[p.slug] = nextTint()) : null;
          return `
        <li>
          <a class="strip" href="project.html?p=${p.slug}" aria-label="${escapeHTML(p.title)}">
            <span class="strip-frame">
              <img src="${asset(p.strip)}" alt="" loading="lazy" style="${stripStyle(p)}">
              ${tint ? tintHTML(p, tint) : ""}
              <span class="strip-title" aria-hidden="true">${escapeHTML(p.shortTitle || p.title)}</span>
            </span>
            <span class="strip-caption" aria-hidden="true">${escapeHTML(p.shortTitle || p.title)}</span>
            <span class="strip-code" aria-hidden="true">${code(p)}</span>
          </a>
        </li>`;
        })
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
    rememberTints(dealt);

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
      const start = scrollY + strip.top + strip.height / 2 - header.offsetHeight; // header is pinned at the top; offsetHeight ignores its slide
      const end = scrollY + resume.getBoundingClientRect().top - innerHeight * ACTIVE_LINE;
      if (end <= start) return y >= end ? 1 : 0;
      return Math.min(1, Math.max(0, (y - start) / (end - start)));
    }

    // The header slides away over the same distance, starting HEADER_DELAY px later
    // (about one mouse-wheel notch), so it lingers a little longer than the menu
    const HEADER_DELAY = 100;

    function setShrink(y) {
      const root = document.documentElement.style;
      root.setProperty("--menu-shrink", shrinkAt(y).toFixed(4));
      root.setProperty("--header-hide", shrinkAt(y - HEADER_DELAY).toFixed(4));
    }

    const PASSED = 0.85; // a project category also becomes active once the one above it is this far off screen

    function update() {
      const line = innerHeight * ACTIVE_LINE;
      const current = sections.filter((s, i) => {
        if (s.getBoundingClientRect().top <= line) return true;
        // not the resume: its switch stays tied to the line, where the menu finishes shrinking
        if (!i || s.id === "resume") return false;
        const prev = sections[i - 1].getBoundingClientRect();
        return prev.bottom <= prev.height * (1 - PASSED);
      }).pop() || sections[0];
      activate(current.id);
      if (!menuLocked) setShrink(scrollY);
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
        document.documentElement.classList.add("is-resizing"); // header slides in step
        setShrink(destY);

        const scrolled = new Promise((done) => {
          addEventListener("scrollend", done, { once: true });
          setTimeout(done, 1200); // no scrollend (already there, or unsupported)
        });
        const resized = new Promise((done) => setTimeout(done, 550));
        Promise.all([scrolled, resized]).then(() => {
          menuLocked = false;
          menu.classList.remove("is-resizing");
          document.documentElement.classList.remove("is-resizing");
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
      ["Status", p.status],
      [p.category === "academic" ? "Studio" : "Office / Role", p.context],
      ["Collaborators", p.collaborators],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`)
      .join("");

    const summary = [].concat(p.summary).map((para) => `<p>${escapeHTML(para)}</p>`).join("");

    // caption, optionally followed by a short descriptive note
    const caption = (text, note, inset) =>
      text
        ? `<figcaption${inset ? ` style="padding-left:${inset}"` : ""}>${escapeHTML(text)}${note ? `<span class="caption-note">${escapeHTML(note)}</span>` : ""}</figcaption>`
        : "";
    const centred = (l) => l.align !== "left";
    // mobile-only list of label text (on-image labels are too small to read on a phone)
    const labelList = (labels) =>
      labels && labels.length
        ? `<ul class="label-list">${labels.map((l) => `<li>${escapeHTML(l.text || l)}</li>`).join("")}</ul>`
        : "";

    // One image, with optional white labels on top and (inside a group) its own caption
    const image = (img, inGroup, ownList) => {
      // known ratio: reserve the image's shape before it loads, so layouts can be measured early
      const shape = img.ratio ? ` style="aspect-ratio:${img.ratio}"` : "";
      const imgTag = `<img src="${asset(img.src)}" alt="${escapeHTML(img.caption || p.title)}" loading="lazy"${shape}>`;
      // mobileSrc: a different file on phones (e.g. a tighter crop), its own ratio in mobileRatio
      const tag = img.mobileSrc
        ? `<picture${img.mobileRatio ? ` style="--m-ratio:${img.mobileRatio}"` : ""}><source media="(max-width: 760px)" srcset="${asset(img.mobileSrc)}">${imgTag}</picture>`
        : imgTag;
      const labels = (img.labels || [])
        .map(
          (l) =>
            `<span class="img-label${centred(l) ? " img-label--center" : ""}${l.dark ? " img-label--dark" : ""}${l.keep ? " img-label--keep" : ""}" style="left:${l.x};top:${l.y}">${escapeHTML(l.text)}</span>`
        )
        .join("");
      const inset = img.captionInset ? ` style="padding-left:${img.captionInset}"` : "";
      const ownCaption = inGroup && img.caption ? `<p class="item-caption"${inset}>${escapeHTML(img.caption)}</p>` : "";
      // in a row, each image's share of the width is its aspect ratio, so heights match
      const flex = img.ratio ? ` style="--r:${img.ratio}" data-ratio="${img.ratio}"` : "";
      const cls = ["gallery-item", img.hideOnMobile && "hide-mobile", img.opens && "opens-level"].filter(Boolean).join(" ");
      const link = img.opens ? ` data-carousel="${img.opens.carousel}" data-level="${img.opens.level}"` : "";
      return labels || ownCaption || flex || img.hideOnMobile || link
        ? `<div class="${cls}"${flex}${link}>${tag}${labels}${ownCaption}${ownList ? labelList(img.labels) : ""}</div>`
        : tag;
    };

    // Images inside a group. "aside": the first image on the left, the rest stacked in a
    // column on the right; the column's ratio is set so both sides end up the same height.
    const groupHTML = (block) => {
      // "place": each image at its own offset and width (percent of the column)
      if (block.layout === "place")
        return block.images.map((img) => `<div class="place-item" style="margin-left:${img.left || 0};width:${img.width}">${image(img, true)}</div>`).join("");
      if (block.layout !== "aside") return block.images.map((img) => image(img, true)).join("");
      const [first, ...rest] = block.images;
      const colRatio = 1 / rest.reduce((sum, img) => sum + 1 / img.ratio, 0);
      return `${image(first, true, true)}<div class="gallery-col" style="--r:${colRatio.toFixed(3)}">${rest
        .map((img) => image(img, true, true))
        .join("")}</div>`;
    };

    // Carousel (desktop): one image at a time between two arrows; a level selector named
    // with each image's `tab` appears in the left sidebar (see wireCarousels).
    // Mobile: all images stacked with their captions, no arrows or selector.
    const arrow = (dir) =>
      `<button type="button" class="carousel-arrow" data-step="${dir === "prev" ? -1 : 1}" aria-label="${
        dir === "prev" ? "Previous" : "Next"
      }"><svg viewBox="0 0 10 12" aria-hidden="true"><polygon points="${
        dir === "prev" ? "10,0 10,12 0,6" : "0,0 0,12 10,6"
      }"/></svg></button>`;
    const carouselHTML = (block) => {
      const slides = block.images
        .map((img, i) => {
          // block.note: a short description under every slide's caption
          const inset = img.captionInset ? ` style="padding-left:${img.captionInset}"` : "";
          const note = block.note ? `<p class="carousel-note"${inset}>${escapeHTML(block.note)}</p>` : "";
          return `<div class="carousel-slide${i ? "" : " is-active"}">${image(img, true)}${note}</div>`;
        })
        .join("");
      const names = block.images.map((img) => img.tab || img.caption);
      return `
      <figure class="gallery-carousel${block.arrowsOut ? " is-arrows-out" : ""}${block.hideOnMobile ? " hide-mobile" : ""}${block.mobileOnly ? " mobile-only" : ""}${block.mobileSwipe ? " is-swipe" : ""}${block.alignBottom ? " is-bottom" : ""}"${block.id ? ` data-id="${block.id}"` : ""}${
        block.list ? ` data-list="1"` : ""
      }${block.revealEarly ? ` data-early="${block.alignTo ?? 1}"` : ""}${block.mobileSwipe ? ` data-swipe="1"` : ""
      }${block.width || block.mobileSlide ? ` style="${block.width ? `--stage-w:${block.width};` : ""}${block.mobileSlide ? `--slide-w:${block.mobileSlide}` : ""}"` : ""} data-tabs="${escapeHTML(JSON.stringify(names))}">
        <div class="carousel-body">${arrow("prev")}<div class="carousel-stage">${slides}</div>${arrow("next")}</div>${
          block.mobileSwipe ? `<div class="carousel-dots" aria-hidden="true">${block.images.map(() => "<span></span>").join("")}</div>` : ""
        }
      </figure>`;
    };

    // An entry is a single image, or a group: { layout: "stack" | "bands" | "grid" | "matrix" | "row" | "aside" | "place" | "carousel", images }
    const gallery = p.images
      .map((block) => {
        if (block.layout === "carousel") return carouselHTML(block);
        if (block.divider)
          return `<div class="gallery-section"><div class="gallery-divider" role="separator"><span>${escapeHTML(block.divider)}</span></div>${
            block.note ? `<p class="divider-note">${escapeHTML(block.note)}</p>` : ""
          }</div>`;

        // mobile: on-image labels (and any mobileList lines) are listed below instead;
        // aside images list their own labels under each image
        const listed = [
          ...(block.layout === "aside" ? [] : block.layout ? block.images : [block]).flatMap((img) => (img.labels || []).filter((l) => !l.keep)),
          ...(block.mobileList || []),
        ];
        const list = labelList(listed);

        if (!block.layout) {
          // besideText: on desktop a crop of this image sits beside the description instead
          const cls = [block.nativeWidth && "is-native", block.hideOnMobile && "hide-mobile", (block.mobileOnly || block.besideText) && "mobile-only"].filter(Boolean);
          const attrs = (cls.length ? ` class="${cls.join(" ")}"` : "") + (block.nativeWidth ? ` style="--native-w:${block.nativeWidth}px"` : "");
          return `<figure${attrs}>${image(block)}${caption(block.caption, block.note, block.captionInset)}${list}</figure>`;
        }
        const vars = [
          block.layout === "bands" ? `--band-ratio:${block.ratio || "4 / 1"};--band-focus:${block.focus || "50% 50%"}` : "",
          block.gap ? `--group-gap:${block.gap}` : "",
          block.align ? `--group-align:${block.align}` : "",
          block.maxWidth ? `--group-max:${block.maxWidth}` : "",
        ]
          .filter(Boolean)
          .join(";");
        const style = vars ? ` style="${vars}"` : "";
        return `
      <figure class="gallery-${block.layout}${block.reverse ? " is-reverse" : ""}${block.mobileRow ? " is-mobile-row" : ""}${block.hideOnMobile ? " hide-mobile" : ""}"${style}>
        <div class="gallery-group">${groupHTML(block)}</div>
        ${caption(block.caption)}${list}
      </figure>`;
      })
      .join("");

    // desktop: a site plan crop beside the details and description (besideText)
    const beside = p.images.find((block) => block.besideText);
    const tint = projectTint(p);
    const besideHTML = beside
      ? `<figure class="head-beside"><img src="${asset(beside.besideText)}" alt="${escapeHTML(beside.caption || p.title)}">${caption(beside.caption)}</figure>`
      : "";

    root.innerHTML = `
      <header class="project-head${beside ? " has-beside" : ""}" style="--tint:${tint}">
        <p class="eyebrow"><span class="project-code">${code(p)}</span> &nbsp;/&nbsp; ${cat.label}</p>
        <h1>${escapeHTML(p.title)}</h1>
        <dl class="meta${(meta.match(/<div>/g) || []).length > 3 ? " meta--long" : ""}">${meta}</dl>
        <div class="lede">${summary}</div>
        <button type="button" class="lede-more" hidden>Read more</button>
        ${besideHTML}
      </header>
      <div class="gallery">${gallery}</div>
      <nav class="pager" aria-label="More projects">
        <a href="project.html?p=${prev.slug}"><span>Previous</span>${escapeHTML(prev.title)}</a>
        <a href="index.html#${p.category}" class="pager-index">Index</a>
        <a href="project.html?p=${next.slug}"><span>Next</span>${escapeHTML(next.title)}</a>
      </nav>`;

    wireCarousels(root);
    wireReadMore(root);
  }

  /* Mobile: the description starts collapsed (a few lines fading out) with a Read more
     button, so the images come sooner. Only when it's actually longer than that. */
  function wireReadMore(root) {
    const lede = root.querySelector(".lede");
    const button = root.querySelector(".lede-more");
    const phone = matchMedia("(max-width: 760px)");
    const setup = () => {
      lede.classList.remove("is-collapsed", "is-open");
      button.hidden = true;
      if (!phone.matches) return;
      lede.classList.add("is-collapsed");
      if (lede.scrollHeight - lede.clientHeight > 24) button.hidden = false;
      else lede.classList.remove("is-collapsed");
      button.textContent = "Read more";
    };
    button.addEventListener("click", () => {
      const open = lede.classList.toggle("is-open");
      lede.classList.toggle("is-collapsed", !open);
      button.textContent = open ? "Show less" : "Read more";
      // collapsing from far down: bring the button back on screen
      if (!open && button.getBoundingClientRect().top < 0) button.scrollIntoView({ block: "center" });
    });
    phone.addEventListener("change", setup);
    setup();
  }

  /* Carousel controls (desktop). The level selector lives in the left sidebar: hidden
     until the carousel is on screen, centred on it vertically, never riding up into the
     menu (it stops just below it), and gone once the carousel has scrolled past. */
  function wireCarousels(root) {
    const menu = document.querySelector(".menu");
    const controls = {}; // carousel id -> show(level)
    root.querySelectorAll(".gallery-carousel").forEach((carousel) => {
      const slides = [...carousel.querySelectorAll(".carousel-slide")];
      const stage = carousel.querySelector(".carousel-stage");
      const names = JSON.parse(carousel.dataset.tabs);

      const selector = document.createElement("div");
      selector.className = "level-select";
      // floor plans list the top level first, so they read like the building;
      // list carousels (people, routes) keep their own order
      const items = names.map((name, i) => `<button type="button" data-i="${i}">${escapeHTML(name)}</button>`);
      selector.innerHTML = (carousel.dataset.list ? items : items.reverse()).join("");
      document.body.appendChild(selector);
      const buttons = [...selector.querySelectorAll("button")];

      let current = 0;
      const show = (i) => {
        current = (i + slides.length) % slides.length;
        slides.forEach((s, j) => s.classList.toggle("is-active", j === current));
        buttons.forEach((b) => b.classList.toggle("is-active", +b.dataset.i === current));
      };
      show(0);
      if (carousel.dataset.id) controls[carousel.dataset.id] = show;
      // picking a name shows it and, if the carousel isn't centred yet, scrolls to it
      buttons.forEach((b) =>
        b.addEventListener("click", () => {
          show(+b.dataset.i);
          const s = stage.getBoundingClientRect();
          if (Math.abs(s.top + s.height / 2 - innerHeight / 2) > innerHeight * 0.15)
            stage.scrollIntoView({ behavior: "smooth", block: "center" });
        })
      );
      carousel.querySelectorAll(".carousel-arrow").forEach((a) => a.addEventListener("click", () => show(current + +a.dataset.step)));
      stage.addEventListener("click", () => show(current + 1));

      // Appears level with the top of the plan, slides to the plan's middle by the time the
      // plan is centred on screen, then holds there until the menu reaches it.
      // revealEarly: shows once the image above is half scrolled past, waiting at the
      // middle of the screen until the plan arrives.
      const early = carousel.dataset.early && carousel.previousElementSibling;
      const place = () => {
        // phones, or a carousel that isn't shown on this layout: no selector
        if (!matchMedia("(min-width: 761px)").matches || !carousel.offsetParent) return selector.classList.remove("is-visible");
        const s = stage.getBoundingClientRect();
        const h = selector.offsetHeight;
        const appear = innerHeight * 0.75; // plan top position when the selector shows up
        const centred = innerHeight / 2 - s.height / 2; // plan top position when centred
        const t = Math.min(1, Math.max(0, (appear - s.top) / (appear - centred)));
        const floor = menu.getBoundingClientRect().bottom + 28; // just below the menu
        let top = s.top + t * (s.height / 2 - h / 2);
        if (early) {
          top = Math.min(top, innerHeight / 2 - h / 2);
          // alignTo: sit beside that point of the image above (e.g. its legend) until it
          // has risen to the middle of the screen
          const a = early.getBoundingClientRect();
          if (+carousel.dataset.early < 1) top = Math.max(top, a.top + +carousel.dataset.early * a.height);
        }
        top = Math.max(top, floor);
        selector.style.top = `${top}px`;
        let start = s.top < appear;
        if (early) {
          const a = early.getBoundingClientRect();
          const f = +carousel.dataset.early;
          start = start || (f < 1 ? a.top + f * a.height < innerHeight * 0.8 : a.top + a.height / 2 < innerHeight / 2);
        }
        selector.classList.toggle("is-visible", start && s.bottom > top + h);
      };
      place();
      window.addEventListener("scroll", place, { passive: true });
      window.addEventListener("resize", place);

      // mobile swipe: dots follow the slide in view
      const dots = [...carousel.querySelectorAll(".carousel-dots span")];
      if (dots.length) {
        const mark = () => {
          const i = Math.round(stage.scrollLeft / (slides[1].offsetLeft - slides[0].offsetLeft || 1));
          dots.forEach((d, j) => d.classList.toggle("is-active", j === Math.min(i, dots.length - 1)));
        };
        mark();
        stage.addEventListener("scroll", mark, { passive: true });
      }
    });

    // desktop: clicking a linked plan opens that level in its carousel and brings it into view
    root.querySelectorAll("[data-carousel]").forEach((el) =>
      el.addEventListener("click", () => {
        const show = controls[el.dataset.carousel];
        if (!show || !matchMedia("(min-width: 761px)").matches) return;
        show(+el.dataset.level);
        root.querySelector(`[data-id="${el.dataset.carousel}"]`).scrollIntoView({ behavior: "smooth", block: "center" });
      })
    );
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
