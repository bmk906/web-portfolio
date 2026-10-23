/*
  Project data — the only file you need to edit to add or change projects.

  strip       image used for the tall strip on the home page
  stripFocus  which part of that image the strip shows (CSS object-position):
              "0% 50%" = left edge, "50% 50%" = centre, "100% 50%" = right edge
  stripZoom   optional; zooms the strip in toward stripFocus (e.g. 1.3)
  shortTitle  optional; shorter name for the home page strip
  stripTint   false keeps a colour strip as it is (black-and-white strips get a random
              Bauhaus tint on the home page); stripMono: true shows a colour strip in
              black and white so it gets tinted too; stripMask: a PNG whose opaque parts
              take the tint as a flat colour (e.g. only the roads of a site plan)
  summary     one paragraph as a string, or several as a list of strings
  collaborators  optional; only shown when filled in
  status      optional (practice): Built, Under Construction, In Permitting, etc.
  images      shown in order on the project page; caption is optional. An entry can
              also be a group of images:
                { layout: "stack", images: [...] }   stacked with no gap, reads as one image
                { layout: "bands", ratio: "4 / 1", focus: "50% 87%", images: [...] }
                                                     each cropped to a thin band, stacked
                { layout: "grid", images: [...] }    two columns (one on mobile)
                { layout: "matrix", images: [...] }  three columns, on mobile too
                { layout: "pan", follows: "x", zoom: 2.5, images: [...] }
                                                     mobile only: the image for the slide in view in
                                                     carousel "x", enlarged, swiped sideways
                { layout: "place", images: [{ src, left: "7%", width: "26%" }, ...] }
                                                     side by side, each at its own offset and width
                                                     (percent of the column), e.g. to sit under a
                                                     drawing above
                { layout: "row", images: [{ src, ratio }, ...] }
                                                     side by side at equal heights (ratio =
                                                     width / height); stacked on mobile
                { layout: "aside", images: [single, ...stacked] }
                                                     one image beside a stacked column, equal
                                                     heights; reverse: true puts the column on
                                                     the left
                { layout: "carousel", images: [{ src, caption, tab }, ...] }
                                                     web: one at a time between arrows, levels
                                                     (tab names) in the sidebar; mobile: stacked.
                                                     id: "x" lets other images link to it, and
                                                     hideOnMobile: true makes it web-only,
                                                     list: true keeps the sidebar in list order
                                                     (default: reversed, top floor first),
                                                     width: "100%" sets the image width,
                                                     note: "..." a description under every slide,
                                                     mobileSlide: "70%" each swipe slide's share of
                                                     the phone width (default 86%),
                                                     alignBottom: true sits shorter slides on the
                                                     bottom edge instead of the top
              An image can open a carousel level on click (web): opens: { carousel: "x", level: 0 }
              Carousels and single images can also be mobileOnly: true; groups can be hideOnMobile: true.
              stack, row and aside can take gap: "10px" (stack: sit close instead of touching).
              row can take maxWidth: "930px" (desktop) so a small source is never blown up.
              row can take mobileRow: true to stay side by side on phones.
              A carousel can take arrowsOut: true (web) to fill the column, arrows in the margins.
              A pan can leave out follows: it then stands alone, swiped from one image to the next.
              Carousels, pans and single images can take spaceBefore / spaceAfter: true for extra
              room above / below (a new set of drawings), "half" for less, "large" for more (spaceAfter also "medium").
              sideIndex: true (project, desktop) lists the page's dividers under the menu, plus
              any block with index: "Name"; roomy: true (project, desktop) spaces drawings out.
  stripWash   true: a line drawing's white paper is greyed under the tint, so the strip
              reads as a field of colour (home page)
              Any image can take mobileSrc: "x.jpg" (+ mobileRatio) to use a different file on phones.
              { divider: "Title", note: "..." } adds a section break (rule, subheading, rule)
              with an optional description under it.
              revealEarly carousels can take alignTo: 0.13 to sit beside that point of the
              image above.
              A single image can take besideText: "crop.jpg" (web: that crop sits beside the
              description instead; mobile: the image stays in the gallery as it is).
              A single image can take note: "..." for a short description under its caption,
              and nativeWidth: 624 to never display wider than its source (desktop).
              Image options: captionInset: "7%" (indent the caption to where the drawing
              starts; single images too), hideOnMobile: true.
              A group can have a caption, and its images can have their own captions.
              labels: white text placed on top of an image, at x/y percentages of the
              (cropped) image; centred on that point unless align: "left". On mobile
              they're listed under the group instead (keep: true leaves a short label on the image).
              mobileList: lines listed under an image or group on mobile only (for
              text that's part of the image and too small to read on a phone).
*/

// Bump whenever an image file is replaced under the same name, so browsers fetch the new one
const IMAGE_VERSION = 43;

const CATEGORIES = [
  { id: "academic", label: "Academic", prefix: "A" },
  { id: "practice", label: "Practice", prefix: "P" },
];

const PROJECTS = [
  {
    slug: "sinusoidal",
    category: "academic",
    title: "Sinusoidal",
    year: "2022",
    location: "Toronto, Canada",
    type: "Commercial",
    strip: "assets/img/projects/sinusoidal/07.jpg",
    stripFocus: "58% 50%", // centred on the mullion just right of the middle
    summary: [
      "Set in a developing neighborhood in Toronto, Sinusoidal is a market hall: a floor of market stalls beneath a single undulating roof, with a mezzanine café above.",
      "The project is a study in thin-shell structures, aiming for a roof that is striking, efficient, and responsive to its site. It began as a field of modular cells shaped by the site. Layering sine waves across those cells produced a continuous shell, and varying the wave amplitudes from cell to cell let the roof meet the ground in a variety of ways. Stepping the heights of neighboring cells opens bands of clerestory light, and the troughs of the waves collect and store rainwater.",
    ],
    images: [
      { src: "assets/img/projects/sinusoidal/site-plan.jpg", caption: "Site plan", besideText: "assets/img/projects/sinusoidal/site-plan-crop.jpg" },
      {
        src: "assets/img/projects/sinusoidal/01.jpg", // labels are part of the image; saved at high quality (95) for crisp text
        caption: "Form Exploration",
        mobileList: [
          "01 Cell Division",
          "02 Horizontal Sine Waves",
          "03 Vertical Sine Waves",
          "04 Lofting Into Waves",
          "05 Warp Waves to Bring Troughs to Ground",
          "06 Oscillating Mezzanine Added",
        ],
      },
      {
        layout: "bands", // cropped to the building, stacked as one drawing
        ratio: "4 / 1",
        focus: "50% 87%",
        images: [
          { src: "assets/img/projects/sinusoidal/03.jpg", labels: [{ text: "Elevation", x: "2.5%", y: "89%", align: "left" }] },
          { src: "assets/img/projects/sinusoidal/04.jpg", labels: [{ text: "Section 1", x: "2.5%", y: "89%", align: "left" }] },
          { src: "assets/img/projects/sinusoidal/05.jpg", labels: [{ text: "Section 2", x: "2.5%", y: "89%", align: "left" }] },
        ],
      },
      {
        layout: "grid",
        images: [
          { src: "assets/img/projects/sinusoidal/06.jpg", caption: "Oscillating Front Facade" },
          { src: "assets/img/projects/sinusoidal/07.jpg", caption: "Exterior Sinusoidal Crest" },
          { src: "assets/img/projects/sinusoidal/08.jpg", caption: "Mezzanine View Into Market Hall" },
          { src: "assets/img/projects/sinusoidal/09.jpg", caption: "Ground Level of Market Hall" },
        ],
      },
      { src: "assets/img/projects/sinusoidal/10.jpg" },
    ],
  },
  {
    slug: "youth-center",
    category: "academic",
    title: "North Beach Youth Center",
    shortTitle: "Youth Center", // used on the home page strip
    year: "2021",
    location: "Miami Beach, FL",
    type: "Civic",
    collaborators: "Anthony Venant",
    strip: "assets/img/projects/youth-center/strip.jpg",
    stripFocus: "100% 0%",
    stripZoom: 1.5, // zoomed toward the top right so only the rings show
    summary: [
      "North Beach Youth Center sits across the street from North Beach Oceanside Park, right beside the Miami Beach skate park. The program features a skate shop, gym hall, juice bar, classrooms, and changing rooms, with parking below.",
      "At its heart is an open-air gym hall beneath a figural canopy of layered rings that diffuse sunlight into tree-like shadows and create a dappled lighting effect across the floor. Open on all four sides, the hall is cooled by cross-ventilation, and everything except the parking and skate shop is raised above grade in anticipation of rising sea levels.",
    ],
    images: [
      { src: "assets/img/projects/youth-center/site-plan.jpg", caption: "Site plan", besideText: "assets/img/projects/youth-center/site-plan-crop.jpg" },
      { src: "assets/img/projects/youth-center/01.jpg", caption: "Site Axon" },
      {
        layout: "matrix",
        caption: "Form Finding Studies",
        images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({ src: `assets/img/projects/youth-center/massing/m${n}.jpg` })),
      },
      {
        layout: "matrix",
        caption: "Roof Iterations",
        images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({ src: `assets/img/projects/youth-center/massing/h${n}.jpg` })),
      },
      { src: "assets/img/projects/youth-center/02.jpg", caption: "Gym Floor Render" },
      {
        layout: "row",
        images: [
          { src: "assets/img/projects/youth-center/03.jpg", ratio: 1.4, caption: "Close Up View of Rings" },
          { src: "assets/img/projects/youth-center/04.jpg", ratio: 1.4, caption: "Classroom View" },
        ],
      },
      { src: "assets/img/projects/youth-center/05.jpg", caption: "Rendered Section Perspective" },
      { src: "assets/img/projects/youth-center/section-axon.jpg", caption: "Section Axon" },
      {
        layout: "row",
        gap: "clamp(20px, 3vw, 48px)", // a little more air between the plans
        images: [
          { src: "assets/img/projects/youth-center/06.jpg", ratio: 1.061, caption: "Ground Floor Plan", captionInset: "7.7%", opens: { carousel: "yc-plans", level: 0 } },
          { src: "assets/img/projects/youth-center/07.jpg", ratio: 1.061, caption: "+5' Floor Plan", captionInset: "7.7%", opens: { carousel: "yc-plans", level: 1 } },
          { src: "assets/img/projects/youth-center/08.jpg", ratio: 1.061, caption: "Gym Floor Plan", captionInset: "5.9%", opens: { carousel: "yc-plans", level: 2 } },
        ],
      },
      {
        // web only: a larger view of the plans above; clicking one opens it here
        layout: "carousel",
        id: "yc-plans",
        hideOnMobile: true,
        images: [
          { src: "assets/img/projects/youth-center/06.jpg", ratio: 1.061, caption: "Ground Floor Plan", tab: "Ground", captionInset: "7.7%" },
          { src: "assets/img/projects/youth-center/07.jpg", ratio: 1.061, caption: "+5' Floor Plan", tab: "+5'", captionInset: "7.7%" },
          { src: "assets/img/projects/youth-center/08.jpg", ratio: 1.061, caption: "Gym Floor Plan", tab: "Gym", captionInset: "5.9%" },
        ],
      },
      {
        layout: "stack",
        gap: "clamp(8px, 1vw, 14px)",
        images: [
          { src: "assets/img/projects/youth-center/09.jpg", caption: "Elevation" },
          { src: "assets/img/projects/youth-center/10.jpg", caption: "Section" },
        ],
      },
      {
        layout: "row",
        images: [
          { src: "assets/img/projects/youth-center/12.jpg", ratio: 1.104, caption: "Exploded Axonometric", captionInset: "4%" },
          { src: "assets/img/projects/youth-center/11.jpg", ratio: 0.3818, caption: "Wall Section", hideOnMobile: true },
        ],
      },
    ],
  },
  {
    slug: "ziggurat-of-leaves",
    category: "academic",
    title: "Ziggurat of Leaves",
    year: "2020",
    location: "Miami Beach, FL",
    type: "Civic",
    collaborators: "Anthony Venant",
    strip: "assets/img/projects/ziggurat-of-leaves/full-render-structure.jpg",
    stripFocus: "20% 0%", // from the top: branching canopy over the lit steel column
    stripZoom: 1.6,
    summary: [
      "Ziggurat of Leaves is a proposal for the Miami Beach Architecture Center at the corner of Lincoln Road and Alton Road. The form was conceived by studying the stepped ziggurat commonly used in South Beach's Art Deco architecture and inverting the structure to provide shade to the public plaza below.",
      "Midway through design, the pure ziggurat gave way to the idea of a tree carrying a canopy of exhibition spaces. The canopy breaks the building from a single mass into a web of smaller volumes whose plans echo the housing typologies of Miami Beach. The gaps between them draw daylight down to the fully open middle level and let hot air rise and escape, while openings in the sides cross-ventilate the building.",
    ],
    images: [
      { src: "assets/img/projects/ziggurat-of-leaves/site-plan.jpg", caption: "Site plan", besideText: "assets/img/projects/ziggurat-of-leaves/site-plan-crop.jpg" },
      { src: "assets/img/projects/ziggurat-of-leaves/concept-sketches.jpg", caption: "Initial Concept Sketches" },
      {
        src: "assets/img/projects/ziggurat-of-leaves/rendered-section.jpg",
        caption: "Rendered Section",
        note: "Axonometric section detailing the functions and circulation of the structure, from the lecture hall and outdoor classroom to the exhibitions and rooftop terrace.",
      },
      {
        layout: "aside", // progression on the left, light + wind stacked on the right
        images: [
          {
            src: "assets/img/projects/ziggurat-of-leaves/progression.jpg",
            ratio: 0.821,
            caption: "Progression Diagram",
            captionInset: "2.8%",
            labels: [
              { text: "01 Ziggurat", x: "34%", y: "25.6%", dark: true },
              { text: "02 Tree", x: "82.7%", y: "51.4%", dark: true },
              { text: "03 Ziggurat of Leaves", x: "51.5%", y: "93.2%", dark: true },
            ],
          },
          { src: "assets/img/projects/ziggurat-of-leaves/light.jpg", ratio: 1.816, caption: "Light Diagram", captionInset: "4.3%" },
          { src: "assets/img/projects/ziggurat-of-leaves/wind.jpg", ratio: 1.816, caption: "Wind Diagram", captionInset: "1.5%" },
        ],
      },
      {
        layout: "carousel", // web: one plan between arrows, levels in the sidebar; mobile: stacked
        images: [
          { src: "assets/img/projects/ziggurat-of-leaves/plan-ground.jpg", ratio: 1.2975, caption: "Ground Floor Plan", tab: "Ground", captionInset: "2.2%" },
          { src: "assets/img/projects/ziggurat-of-leaves/plan-1.jpg", ratio: 1.2975, caption: "Level 1 Floor Plan", tab: "Level 1", captionInset: "2.2%" },
          { src: "assets/img/projects/ziggurat-of-leaves/plan-2.jpg", ratio: 1.2975, caption: "Level 2 Floor Plan", tab: "Level 2", captionInset: "2.2%" },
        ],
      },
      {
        layout: "row",
        images: [
          { src: "assets/img/projects/ziggurat-of-leaves/render-1.jpg", ratio: 1.778, caption: "Circulation to Higher Exhibit Space" },
          { src: "assets/img/projects/ziggurat-of-leaves/render-2.jpg", ratio: 1.778, caption: "Interior View of Exhibit Space" },
        ],
      },
      { src: "assets/img/projects/ziggurat-of-leaves/full-render-structure.jpg" },
      // source is low-res: shown at its native width on desktop so it stays crisp
      { src: "assets/img/projects/ziggurat-of-leaves/axon-nw.jpg", caption: "Exploded Axonometric", nativeWidth: 611 },
    ],
  },
  {
    slug: "monti-prenestini",
    category: "academic",
    title: "Monti Prenestini",
    year: "2022",
    location: "Lazio, Italy",
    type: "Urban Planning",
    collaborators: "Isabella Andelsohn, Ethan Anderson, Lucas Rosen",
    strip: "assets/img/projects/monti-prenestini/strip.jpg", // pre-cut close-up of contours on the ridge's east flank, green to beige
    stripFocus: "50% 50%",
    stripMono: true, // shown in black and white so it takes a tint like the others
    summary: [
      "Monti Prenestini is a mountain range about an hour east of Rome, home to sweeping views, abundant wildlife, and a handful of medieval hill towns now at risk of depopulation. Our goal was a campaign to market the range to Romans as a destination for day trips. Using GIS, we mapped its points of interest and traced routes tailored to different visitors, from cyclists and hikers to horseback riders and pilgrims.",
      "Our second goal was to strengthen transit within the mountains, making it easier for residents to commute to Rome and travel between towns. We focused on the gateway to the range: Zagarolo, where trains from Rome arrive at an uninviting station. We redesigned the plaza outside it to mark the passage out of the city and into a new landscape, sinking the entire plaza into the ground. An oscillating staircase, part seating and part circulation, steps down into it. Built from locally sourced limestone, it echoes the ancient terraces found throughout the mountains.",
    ],
    images: [
      {
        src: "assets/img/projects/monti-prenestini/site-plan.jpg",
        caption: "Site plan",
        labels: [{ text: "Rome", x: "23%", y: "47%", dark: true, keep: true }],
      },

      // ----- mobile: everything condensed into two swipe carousels
      {
        layout: "carousel",
        mobileOnly: true,
        mobileSwipe: true,
        note: "Trails and transit routes mapped for different ways of exploring the range, from horseback riding and hiking to road cycling and bus travel.",
        images: [
          { src: "assets/img/projects/monti-prenestini/01.jpg", ratio: 1.4413, caption: "Monti Prenestini Map", tab: "Map" },
          { src: "assets/img/projects/monti-prenestini/routes/01-horseback-riding.jpg", ratio: 1.4413, caption: "Horseback Trails", tab: "Horseback" },
          { src: "assets/img/projects/monti-prenestini/routes/02-hiking-trails.jpg", ratio: 1.4413, caption: "Hiking Trails", tab: "Hiking" },
          { src: "assets/img/projects/monti-prenestini/routes/03-road-cycling.jpg", ratio: 1.4413, caption: "Road Cycling Routes", tab: "Road Cycling" },
          { src: "assets/img/projects/monti-prenestini/routes/04-existing-bus-route.jpg", ratio: 1.4413, caption: "Existing Bus Route", tab: "Existing Bus" },
          { src: "assets/img/projects/monti-prenestini/routes/05-proposed-bus-route.jpg", ratio: 1.4413, caption: "Proposed Bus Route", tab: "Proposed Bus" },
          { src: "assets/img/projects/monti-prenestini/02.jpg", ratio: 1.4413, caption: "Transit and Bus Routes", tab: "Transit" },
        ],
      },
      {
        layout: "carousel",
        mobileOnly: true,
        mobileSwipe: true,
        note: "User profiles tracing how different visitors move through and experience the mountain range.",
        images: [
          { src: "assets/img/projects/monti-prenestini/profiles/selection.jpg", ratio: 1.467, caption: "User Profiles", tab: "Overview", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/01-christiano.jpg", ratio: 1.467, caption: "Christiano, Horseback Rider", tab: "Christiano", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/02-giorgio.jpg", ratio: 1.467, caption: "Giorgio, Rock Climber", tab: "Giorgio", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/03-gianna.jpg", ratio: 1.467, caption: "Gianna, Biker", tab: "Gianna", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/04-fabrizio.jpg", ratio: 1.467, caption: "Fabrizio, National Hiker", tab: "Fabrizio", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/05-jan.jpg", ratio: 1.467, caption: "Jan, International Hiker", tab: "Jan", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/06-maria.jpg", ratio: 1.467, caption: "Maria, Person of Faith", tab: "Maria", captionInset: "1.1%" },
        ],
      },

      // ----- web: maps, then routes, then profiles
      { src: "assets/img/projects/monti-prenestini/01.jpg", caption: "Monti Prenestini Map", note: "This map shows towns, mountains, and points of interest.", hideOnMobile: true },
      {
        layout: "carousel", // routes by mode of travel; names in the sidebar
        list: true,
        width: "100%",
        revealEarly: true, // shows halfway down the map above
        hideOnMobile: true,
        note: "Trails and transit routes mapped for different ways of exploring the range, from horseback riding and hiking to road cycling and bus travel.",
        images: [
          { src: "assets/img/projects/monti-prenestini/02.jpg", ratio: 1.4413, caption: "Transit and Bus Routes", tab: "Combined" },
          { src: "assets/img/projects/monti-prenestini/routes/01-horseback-riding.jpg", ratio: 1.4413, caption: "Horseback Trails", tab: "Horseback" },
          { src: "assets/img/projects/monti-prenestini/routes/02-hiking-trails.jpg", ratio: 1.4413, caption: "Hiking Trails", tab: "Hiking" },
          { src: "assets/img/projects/monti-prenestini/routes/03-road-cycling.jpg", ratio: 1.4413, caption: "Road Cycling Routes", tab: "Road Cycling" },
          { src: "assets/img/projects/monti-prenestini/routes/04-existing-bus-route.jpg", ratio: 1.4413, caption: "Existing Bus Route", tab: "Existing Bus" },
          { src: "assets/img/projects/monti-prenestini/routes/05-proposed-bus-route.jpg", ratio: 1.4413, caption: "Proposed Bus Route", tab: "Proposed Bus" },
        ],
      },
      {
        layout: "carousel", // overview first, then one profile at a time
        list: true,
        width: "100%",
        hideOnMobile: true,
        note: "User profiles tracing how different visitors move through and experience the mountain range.",
        images: [
          { src: "assets/img/projects/monti-prenestini/profiles/selection.jpg", ratio: 1.467, caption: "Circulation Paths: User Profiles", tab: "Profiles", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/01-christiano.jpg", ratio: 1.467, caption: "Christiano, Horseback Rider", tab: "Christiano", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/02-giorgio.jpg", ratio: 1.467, caption: "Giorgio, Rock Climber", tab: "Giorgio", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/03-gianna.jpg", ratio: 1.467, caption: "Gianna, Biker", tab: "Gianna", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/04-fabrizio.jpg", ratio: 1.467, caption: "Fabrizio, National Hiker", tab: "Fabrizio", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/05-jan.jpg", ratio: 1.467, caption: "Jan, International Hiker", tab: "Jan", captionInset: "1.1%" },
          { src: "assets/img/projects/monti-prenestini/profiles/06-maria.jpg", ratio: 1.467, caption: "Maria, Person of Faith", tab: "Maria", captionInset: "1.1%" },
        ],
      },
      {
        divider: "Zagarolo Plaza Renovation",
        note: "Zagarolo's station is the gateway from Rome into the mountains, yet today it does little to mark that arrival. We set out to make it a true threshold between the city and the Italian countryside. The sunken plaza uncovers natural stone steps harvested from local quarries, evoking the sense of digging into the history and geology of the mountain range. It offers a shaded place to enjoy local shops and restaurants while waiting for the train.",
      },
      { src: "assets/img/projects/monti-prenestini/zag-site.jpg", caption: "Zagarolo Station: Site Plan" },
      { src: "assets/img/projects/monti-prenestini/zag-plaza-plan.jpg", caption: "Sunken Plaza Plan" },
      { src: "assets/img/projects/monti-prenestini/zag-day.jpg", caption: "Plaza by Day" },
      { src: "assets/img/projects/monti-prenestini/zag-night.jpg", caption: "Plaza by Night" },
      { src: "assets/img/projects/monti-prenestini/zag-plaza-section.jpg", caption: "Plaza Section" },
      { src: "assets/img/projects/monti-prenestini/zag-site-section.jpg", caption: "Site Section" },
      {
        divider: "Kit of Parts",
        note: "The Kit of Parts is a deployable booth designed to pop up in towns throughout Monti Prenestini. Its modular pieces combine to serve different needs, from bike rentals and tourist information to a snack bar, electric vehicle charging, and picnic areas.",
      },
      { src: "assets/img/projects/monti-prenestini/kit/sketch.jpg", caption: "Kit of Parts Sketch" },
      {
        layout: "carousel", // web and mobile: one drawing at a time
        list: true,
        width: "85%",
        mobileSwipe: true,
        images: [
          { src: "assets/img/projects/monti-prenestini/kit/axon.jpg", ratio: 2, caption: "Axonometric", tab: "Axon", captionInset: "1.9%" },
          { src: "assets/img/projects/monti-prenestini/kit/aerial.jpg", ratio: 2, caption: "Aerial View", tab: "Aerial", captionInset: "5.1%" },
          { src: "assets/img/projects/monti-prenestini/kit/elevation.jpg", ratio: 2, caption: "Elevation 1", tab: "Elevation 1" },
          { src: "assets/img/projects/monti-prenestini/kit/elevations.jpg", ratio: 2, caption: "Elevation 2", tab: "Elevation 2", captionInset: "0.8%" },
        ],
      },
    ],
  },
  {
    slug: "wall-of-flutes",
    category: "academic",
    title: "Wall of Flutes",
    year: "2021",
    location: "Coral Gables, FL",
    type: "Art Installation",
    strip: "assets/img/projects/wall-of-flutes/strip.jpg", // black and white, so it takes a tint
    stripFocus: "66% 50%", // the mirrored wall rather than the doorway: abstract on purpose
    summary: [
      "The Wall of Flutes is an exploration of wind and sound: an architecture that can be listened to, powered by the air. Its form was generated by testing how wind interacts with various shapes, using a Grasshopper plugin that maps wind direction and speed. Within this form sits an array of tubes that produce sound as the wind passes through them.",
      "I then studied the proportions between tube lengths and musical notes to form a scale. From it I could compose chords, groups of three notes played together in harmony. A telescoping mechanism adjusts the length of each tube, so the wall can play different chords for different musical effects.",
    ],
    images: [
      { src: "assets/img/projects/wall-of-flutes/site-plan.jpg", caption: "Site plan", besideText: "assets/img/projects/wall-of-flutes/site-plan-crop.jpg" },
      { src: "assets/img/projects/wall-of-flutes/01.jpg", caption: "Wind to Sound" },
      { src: "assets/img/projects/wall-of-flutes/02.jpg", caption: "Wind Matrix" },
      { src: "assets/img/projects/wall-of-flutes/03.jpg", caption: "Musical Scales Exploration" },
      { src: "assets/img/projects/wall-of-flutes/04.jpg" },
      { src: "assets/img/projects/wall-of-flutes/05.jpg", caption: "Pipe Mounting Detail" },
      {
        layout: "row", // equal heights; capped so the small axon (360px source) isn't blown up
        maxWidth: "930px",
        images: [
          { src: "assets/img/projects/wall-of-flutes/06.jpg", ratio: 1.5455, caption: "Context Render" },
          { src: "assets/img/projects/wall-of-flutes/07.jpg", ratio: 1, caption: "Axonometric Render" },
        ],
      },
      { src: "assets/img/projects/wall-of-flutes/mirror-5.jpg", caption: "Interior Render" },
    ],
  },
  {
    slug: "compression",
    category: "academic",
    title: "Compression",
    year: "2023",
    location: "New York, NY",
    type: "Mixed Use",
    strip: "assets/img/projects/compression/strip.jpg", // middle of the site plan with buildings, black and white, roads light grey
    stripFocus: "50% 50%",
    stripMask: "assets/img/projects/compression/strip-roads.png", // the tint goes on the roads only
    summary: [
      "In 2121, Lincoln Center has fallen into decay and is set to be redeveloped. New legislation has passed offering reparations for the demolition of the San Juan Hill neighborhood, which was cleared to build Lincoln Center in the 1960s. The new bill mandates that affordable housing be built alongside the new performing arts center.",
      "This project proposes merging the two programs architecturally. The new theater sits on the sixth floor of the housing complex. Its patrons exit the building alongside its residents. The structure physically compresses the theater while compressing two populations into one building, with the aim of reviving the neighborhood's identity in music and the arts.",
      "The project also improves on the tenements that once defined San Juan Hill, targeting their social isolation: few public spaces, tight corridors, and narrow stairs. The design overcorrects. Terraced lightwells become parks for residents, wide corridors spring from them to the facade as gathering spaces, and amenities from restaurants to gyms to a grocery store are spread across the floors. A rhythmic pattern of windows on the facade nods to the neighborhood's roots in jazz.",
    ],
    images: [
      {
        layout: "carousel", // web and mobile: the city fabric first, then the building alone in the street grid
        list: true,
        mobileSwipe: true,
        images: [
          { src: "assets/img/projects/compression/site-fabric.jpg", ratio: 1.7778, caption: "Site Plan: Urban Fabric", tab: "Fabric" },
          { src: "assets/img/projects/compression/site-figure.jpg", ratio: 1.7778, caption: "Site Plan: Figure", tab: "Figure" },
        ],
      },
      { src: "assets/img/projects/compression/axon.jpg", caption: "Axonometric Render" },
      { src: "assets/img/projects/compression/plan-1.jpg", caption: "Floor Plan: Symphony" },
      { src: "assets/img/projects/compression/plan-2.jpg", caption: "Floor Plan: Residential" },
      {
        layout: "carousel", // web and mobile
        list: true,
        arrowsOut: true, // web: full column width, arrows in the margins
        mobileSwipe: true,
        images: [
          // mobile: cropped to the building with the scale bar lifted, so it reads larger
          { src: "assets/img/projects/compression/elevation.jpg", mobileSrc: "assets/img/projects/compression/elevation-mobile.jpg", ratio: 3.019, mobileRatio: 2.4, caption: "Elevation", tab: "Elevation" },
          { src: "assets/img/projects/compression/elevation-diagram.jpg", mobileSrc: "assets/img/projects/compression/elevation-diagram-mobile.jpg", ratio: 3.019, mobileRatio: 2.4, caption: "Elevation: Facade Rhythm", tab: "Rhythm" },
        ],
      },
      { src: "assets/img/projects/compression/symphony-hall.jpg", caption: "Symphony Hall Render" },
      { src: "assets/img/projects/compression/ground-plaza.jpg", caption: "Ground Plaza Perspective" }, // white band under the render cropped off
      { src: "assets/img/projects/compression/solid-void.jpg", caption: "Solid vs. Void" },
      {
        layout: "row", // side by side on phones too
        mobileRow: true,
        images: [
          { src: "assets/img/projects/compression/compression-diagram.jpg", ratio: 1.5437, caption: "Compression Diagram" },
          { src: "assets/img/projects/compression/tenement-typologies.jpg", ratio: 1.9644, caption: "Tenement Typologies", captionInset: "2.72%" },
        ],
      },
    ],
  },
  {
    slug: "station-1",
    category: "practice",
    title: "Station 1",
    year: "2026",
    location: "Sonoma County, CA",
    type: "Civic",
    status: "Construction Documents",
    strip: "assets/img/projects/station-1/strip.jpg", // pre-cropped on the hose tower in the early east sketch
    stripFocus: "50% 50%",
    // stripWash: true, // paper greyed so the tint fills the strip; off for now (2026-10-22), he is comparing both
    stripMono: true,
    sideIndex: true, // desktop: the page's parts listed under the menu
    roomy: true, // desktop: more space between drawings
    summary: [
      "Station 1 is a multi-phase renovation of a working firehouse in Sonoma County. The fire district covers a rural area that is critically at risk of wildfire, which demands a well equipped fire department with updated facilities. The existing station suffers from limited sleeping quarters, no proper lobby or entrance, and a neglected, unpleasant day room for the firefighters.",
      "We are adding a new wing with a day room and an upstairs theater room, and building a new lobby onto the front with glass storefront windows. The existing fire pole moves into the lobby to form a sort of museum area. We believe a firehouse is essentially the public face of government in a small town, and the entry should reflect that. Upstairs is completely rearranged to go from three dorm rooms to six, meeting the district's increased demand for staffing, and the admin area is reorganized into a usable chief's office, conference room, and dedicated admin offices. The kitchen is being renovated as well, and at the apparatus bay we are building an entire new level on top of the existing workshop and storage wing.",
      "At the back of the site, a completely new building will house a gym, sauna, records room, and storage room, along with a garage for two new vehicles. The project is built in two phases so the station can keep running throughout. Phase 1 is the back building (Building B) and the second floor over the shop wing. Phase 2 is all of the work on the main firehouse (Building M), during which the firefighters live in temporary housing inside Building B and still have access to the apparatus bay.",
    ],
    images: [
      // drawings: title blocks and notes cropped off; street names, permit numbers and the district's name on the sign painted out
      {
        layout: "carousel", // construction management plans, which double as the site plans: one window, so the site stays put
        index: "Site",
        mobileSwipe: true,
        list: true,
        arrowsOut: true,
        images: [
          { src: "assets/img/projects/station-1/site-phase-1.jpg", ratio: 1.5052, tab: "Phase 1" },
          { src: "assets/img/projects/station-1/site-phase-2.jpg", ratio: 1.5052, tab: "Phase 2" },
        ],
      },
      {
        layout: "carousel", // enlarged site plans, west and east halves at the same scale
        mobileSwipe: true,
        list: true,
        arrowsOut: true,
        width: "81%", // smaller so it fits a 14" laptop screen
        images: [
          { src: "assets/img/projects/station-1/site-dev-west.jpg", ratio: 1.128, tab: "West" },
          { src: "assets/img/projects/station-1/site-dev-east.jpg", ratio: 1.128, tab: "East" },
        ],
      },
      { src: "assets/img/projects/station-1/landscape.jpg" },
      { divider: "Building M" },
      {
        layout: "carousel", // all six sheets cut with one window on the grid lines, so walls stay put between slides
        mobileSwipe: true,
        list: true,
        arrowsOut: true,
        width: "76%",
        images: [
          { src: "assets/img/projects/station-1/m-plan-ground.jpg", ratio: 1.126, tab: "Ground Floor" },
          { src: "assets/img/projects/station-1/m-plan-second.jpg", ratio: 1.126, tab: "Second Floor" },
          { src: "assets/img/projects/station-1/m-ceiling-ground.jpg", ratio: 1.126, tab: "Ground Ceiling" },
          { src: "assets/img/projects/station-1/m-ceiling-second.jpg", ratio: 1.126, tab: "Second Ceiling" },
          { src: "assets/img/projects/station-1/m-roof.jpg", ratio: 1.126, tab: "Tall Roof" },
          { src: "assets/img/projects/station-1/m-roof-flat.jpg", ratio: 1.126, tab: "Flat Roof" },
        ],
      },
      {
        layout: "carousel", // one elevation per slide at one scale, the F.F. 0 level line at the same height on every slide
        spaceBefore: "large", // set apart a little more
        mobileSwipe: true,
        list: true,
        arrowsOut: true,
        images: [
          { src: "assets/img/projects/station-1/m-elev-east.jpg", ratio: 3.3403, tab: "East" },
          { src: "assets/img/projects/station-1/m-elev-east-part.jpg", ratio: 3.3403, tab: "East, Part" },
          { src: "assets/img/projects/station-1/m-elev-north.jpg", ratio: 3.3403, tab: "North" },
          { src: "assets/img/projects/station-1/m-elev-west.jpg", ratio: 3.3403, tab: "West" },
          { src: "assets/img/projects/station-1/m-elev-west-shop.jpg", ratio: 3.3403, tab: "West, Shop Wing" },
          { src: "assets/img/projects/station-1/m-elev-south.jpg", ratio: 3.3403, tab: "South" }, // from A4.2
        ],
      },
      {
        layout: "carousel", // early elevation sketches by the project lead, after the drawn ones; kept small, at one scale
        mobileSwipe: true,
        list: true,
        alignBottom: true,
        arrowsOut: true,
        width: "60%",
        spaceAfter: "medium", // the room that was under the elevations
        images: [
          { src: "assets/img/projects/station-1/sketch-m-east.jpg", ratio: 3.4218, caption: "Early Sketch by Project Lead: East", captionInset: "11.9%", tab: "East" },
          { src: "assets/img/projects/station-1/sketch-m-north.jpg", ratio: 3.3044, caption: "Early Sketch by Project Lead: North", tab: "North" },
        ],
      },
      {
        layout: "carousel", // interior elevations, two rows of a sheet per slide, all at one scale
        spaceBefore: true,
        mobileSwipe: true,
        list: true,
        alignBottom: true,
        arrowsOut: true,
        images: [
          { src: "assets/img/projects/station-1/m-int-dayroom.jpg", ratio: 2.7586, tab: "Day Room" },
          { src: "assets/img/projects/station-1/m-int-lobby-hall.jpg", ratio: 2.8546, tab: "Lobby & Hall" },
          { src: "assets/img/projects/station-1/m-int-training-hall.jpg", ratio: 2.6316, tab: "Training Room & Hall" },
          { src: "assets/img/projects/station-1/m-int-offices.jpg", ratio: 2.8144, tab: "Offices & Copy" },
          { src: "assets/img/projects/station-1/m-int-common.jpg", ratio: 2.6316, tab: "Common Room" },
          { src: "assets/img/projects/station-1/m-int-hall-210.jpg", ratio: 3.3126, tab: "Upstairs Hall" },
          { src: "assets/img/projects/station-1/m-int-dorm-bath-205.jpg", ratio: 2.6981, tab: "Dorm, Laundry & Bath" },
          { src: "assets/img/projects/station-1/m-int-bath-217-toilet.jpg", ratio: 2.8571, tab: "Bath & Toilet" },
        ],
      },
      {
        layout: "carousel", // the kitchen's interior elevations (drawn at a larger scale), one row per slide
        spaceBefore: true,
        mobileSwipe: true,
        list: true,
        alignBottom: true,
        arrowsOut: true,
        images: [
          { src: "assets/img/projects/station-1/m-int-kitchen-1.jpg", ratio: 3.3791, tab: "Kitchen: West & North" },
          { src: "assets/img/projects/station-1/m-int-kitchen-2.jpg", ratio: 3.4115, tab: "Kitchen: East & South" },
          { src: "assets/img/projects/station-1/m-int-kitchen-3.jpg", ratio: 3.4188, tab: "Kitchen: Island" },
        ],
      },
      {
        layout: "carousel", // A7.1 and A7.2, each whole sheet on one slide
        spaceBefore: true,
        hideOnMobile: true,
        list: true,
        arrowsOut: true,
        width: "90%",
        images: [
          { src: "assets/img/projects/station-1/m-det-sheet-1.jpg", ratio: 1.351, tab: "Day Room Details" },
          { src: "assets/img/projects/station-1/m-det-sheet-2.jpg", ratio: 1.351, tab: "Shop Wing Details" },
        ],
      },
      {
        layout: "pan", // mobile: each whole detail sheet, swiped across so the columns run on from one another
        spaceBefore: true,
        label: "Details",
        zoom: 2.2,
        images: [
          { src: "assets/img/projects/station-1/m-det-sheet-1.jpg", ratio: 1.351, caption: "Day Room Details" },
          { src: "assets/img/projects/station-1/m-det-sheet-2.jpg", ratio: 1.351, caption: "Shop Wing Details" },
        ],
      },
      {
        layout: "carousel", // A7.3: the two balcony details in one frame, the training room exit in another, one scale
        hideOnMobile: true,
        list: true,
        alignBottom: true,
        arrowsOut: true,
        width: "85%",
        images: [
          { src: "assets/img/projects/station-1/m-add-balcony.jpg", ratio: 2.0579, tab: "Balcony" },
          { src: "assets/img/projects/station-1/m-add-exit.jpg", ratio: 2.454, tab: "Training Room Exit" },
        ],
      },
      {
        layout: "pan", // mobile: the same two frames, swiped across
        label: "Details",
        zoom: 2,
        images: [
          { src: "assets/img/projects/station-1/m-add-balcony.jpg", ratio: 2.0579, caption: "Balcony" },
          { src: "assets/img/projects/station-1/m-add-exit.jpg", ratio: 2.454, caption: "Training Room Exit" },
        ],
      },
      { src: "assets/img/projects/station-1/m-section-sketch.jpg" }, // hand section, rotated 1 degree so the slab line is level; the raised ceiling detail moved down beside it
      { divider: "Building B" },
      {
        layout: "carousel", // one window on the grid lines (the porch part plan under it on A2.3 left out)
        mobileSwipe: true,
        list: true,
        arrowsOut: true,
        images: [
          { src: "assets/img/projects/station-1/b-plan.jpg", ratio: 1.5052, tab: "Floor" },
          { src: "assets/img/projects/station-1/b-clerestory.jpg", ratio: 1.5052, tab: "Clerestory" },
          { src: "assets/img/projects/station-1/b-ceiling.jpg", ratio: 1.5052, tab: "Ceiling" },
          { src: "assets/img/projects/station-1/b-roof.jpg", ratio: 1.5052, tab: "Roof" },
        ],
      },
      {
        layout: "carousel", // same scale as Building M's elevations; the El. 236.25 level line at the same height on every slide
        spaceBefore: "large",
        mobileSwipe: true,
        list: true,
        arrowsOut: true,
        width: "78.2%",
        images: [
          { src: "assets/img/projects/station-1/b-elev-east.jpg", ratio: 3.6171, tab: "East" },
          { src: "assets/img/projects/station-1/b-elev-north.jpg", ratio: 3.6171, tab: "North" },
          { src: "assets/img/projects/station-1/b-elev-west.jpg", ratio: 3.6171, tab: "West" },
          { src: "assets/img/projects/station-1/b-elev-south.jpg", ratio: 3.6171, tab: "South" },
          { src: "assets/img/projects/station-1/b-elev-south-part.jpg", ratio: 3.6171, tab: "South, Part" },
        ],
      },
      {
        layout: "carousel", // early elevation sketches by the project lead, after the drawn ones; kept small, at one scale (East as reference)
        mobileSwipe: true,
        list: true,
        alignBottom: true,
        arrowsOut: true,
        width: "60%",
        images: [
          { src: "assets/img/projects/station-1/sketch-b-east.jpg", ratio: 3.4302, caption: "Early Sketch by Project Lead: East", tab: "East" },
          { src: "assets/img/projects/station-1/sketch-b-south.jpg", ratio: 4.4813, caption: "Early Sketch by Project Lead: South", captionInset: "19.3%", tab: "South" },
          { src: "assets/img/projects/station-1/sketch-b-north.jpg", ratio: 3.9499, caption: "Early Sketch by Project Lead: North", captionInset: "19.4%", tab: "North" },
        ],
      },
      {
        layout: "carousel", // interior elevations, up to two rows of a sheet per slide, all at one scale
        spaceBefore: true,
        spaceAfter: "large",
        mobileSwipe: true,
        list: true,
        alignBottom: true,
        arrowsOut: true,
        images: [
          { src: "assets/img/projects/station-1/b-int-exercise-306.jpg", ratio: 2.6381, tab: "Exercise" },
          { src: "assets/img/projects/station-1/b-int-sauna-bath.jpg", ratio: 2.8855, tab: "Sauna & Bathroom" },
          { src: "assets/img/projects/station-1/b-int-records.jpg", ratio: 5.8182, tab: "Records" },
          { src: "assets/img/projects/station-1/b-int-storage.jpg", ratio: 2.3392, tab: "Storage" },
          { src: "assets/img/projects/station-1/b-int-garage-309.jpg", ratio: 2.1843, tab: "Garage" },
        ],
      },
      {
        layout: "carousel", // A7.4 and A7.5, each whole sheet on one slide
        spaceBefore: true,
        hideOnMobile: true,
        list: true,
        arrowsOut: true,
        width: "90%",
        images: [
          { src: "assets/img/projects/station-1/b-det-sheet-1.jpg", ratio: 1.351, tab: "Primary Details" },
          { src: "assets/img/projects/station-1/b-det-sheet-2.jpg", ratio: 1.351, tab: "Additional Details" },
        ],
      },
      {
        layout: "pan", // mobile: each whole detail sheet, swiped across
        spaceBefore: true,
        label: "Details",
        zoom: 2.2,
        images: [
          { src: "assets/img/projects/station-1/b-det-sheet-1.jpg", ratio: 1.351, caption: "Building B Primary Details" },
          { src: "assets/img/projects/station-1/b-det-sheet-2.jpg", ratio: 1.351, caption: "Building B Additional Details" },
        ],
      },
    ],
  },
  {
    slug: "hummingbird",
    category: "practice",
    title: "Hummingbird",
    year: "2025",
    location: "Woodside, CA",
    type: "Single-Family Residence",
    status: "Schematic Design",
    strip: "assets/img/projects/hummingbird/strip.jpg", // pre-cropped on the tall stair window of the front elevation, shifted left (backups: strip-stair-centred.jpg; strip-gable.jpg, the right elevation's glass gable)
    stripFocus: "50% 50%",
    // stripWash: true, // paper greyed so the tint fills the strip; off for now (2026-10-22), he is comparing both
    summary: [
      "Hummingbird is a small compound tucked deep in the Santa Cruz Mountains: a main residence, a barn for gathering and creative work like painting and crafts, and a cottage for guests. The owners named it Hummingbird because they wanted the property to feel like a place where hummingbirds gather.",
      "The main house centers on a living room whose doors open out onto a terrace. Around it are the main bedroom and bathroom, a guest room, and a library with a hidden bookshelf door.",
      "The lot slopes steeply, so the topography is the big challenge. We plan to use retaining walls and grading to shape the land around the buildings, while still letting the house settle into the existing landscape.",
    ],
    images: [
      // drawings: title block cropped off; road names and the draft stamp removed from the site plan
      { src: "assets/img/projects/hummingbird/site-plan.jpg" },
      {
        layout: "carousel", // both floors cut with one window, so they line up
        mobileSwipe: true,
        alignBottom: true,
        images: [
          { src: "assets/img/projects/hummingbird/plan-first.jpg", ratio: 1.1883, tab: "First Floor" },
          { src: "assets/img/projects/hummingbird/plan-second.jpg", ratio: 1.1883, tab: "Second Floor" },
        ],
      },
      {
        layout: "carousel", // hand sketches of two elevations, cut with one window from the same sheet so they share a scale
        mobileSwipe: true,
        list: true,
        alignBottom: true,
        arrowsOut: true,
        images: [
          { src: "assets/img/projects/hummingbird/sketch-front.jpg", ratio: 3.08, caption: "Sketch: Front", captionInset: "6%", tab: "Front Sketch" },
          { src: "assets/img/projects/hummingbird/sketch-right.jpg", ratio: 3.08, caption: "Sketch: Right", captionInset: "7%", tab: "Right Sketch" },
        ],
      },
      {
        layout: "carousel", // one elevation per slide, all at the same scale
        hideOnMobile: true,
        list: true,
        alignBottom: true,
        arrowsOut: true,
        images: [
          { src: "assets/img/projects/hummingbird/elev-front.jpg", ratio: 2.7875, tab: "Front" },
          { src: "assets/img/projects/hummingbird/elev-right.jpg", ratio: 2.4261, tab: "Right" },
          { src: "assets/img/projects/hummingbird/elev-rear.jpg", ratio: 2.7875, tab: "Rear" },
          { src: "assets/img/projects/hummingbird/elev-left.jpg", ratio: 2.4279, tab: "Left" },
        ],
      },
      {
        layout: "carousel", // mobile: cropped to the building (no level marks), wider slides
        id: "hb-elev",
        mobileOnly: true,
        mobileSwipe: true,
        mobileSlide: "94%",
        list: true,
        images: [
          { src: "assets/img/projects/hummingbird/m-elev-front.jpg", ratio: 2.9963, caption: "Front", tab: "Front" },
          { src: "assets/img/projects/hummingbird/m-elev-right.jpg", ratio: 2.8951, caption: "Right", tab: "Right" },
          { src: "assets/img/projects/hummingbird/m-elev-rear.jpg", ratio: 2.9963, caption: "Rear", tab: "Rear" },
          { src: "assets/img/projects/hummingbird/m-elev-left.jpg", ratio: 2.864, caption: "Left", tab: "Left" },
        ],
      },
      {
        layout: "pan", // mobile: a close-up of the elevation in view above, swipe across it
        follows: "hb-elev",
        zoom: 2.5,
        images: [
          { src: "assets/img/projects/hummingbird/m-elev-front.jpg", ratio: 2.9963, caption: "Front" },
          { src: "assets/img/projects/hummingbird/m-elev-right.jpg", ratio: 2.8951, caption: "Right" },
          { src: "assets/img/projects/hummingbird/m-elev-rear.jpg", ratio: 2.9963, caption: "Rear" },
          { src: "assets/img/projects/hummingbird/m-elev-left.jpg", ratio: 2.864, caption: "Left" },
        ],
      },
      { src: "assets/img/projects/hummingbird/barn-plan.jpg" },
      {
        layout: "carousel", // the two barn roof options, same window so only the roof changes
        hideOnMobile: true,
        list: true,
        arrowsOut: true,
        width: "95%", // a little smaller so it fits a 14" laptop screen
        images: [
          { src: "assets/img/projects/hummingbird/barn-taller.jpg", ratio: 1.3687, tab: "Taller Pitch" },
          { src: "assets/img/projects/hummingbird/barn-lower.jpg", ratio: 1.3687, tab: "Lower Pitch" },
        ],
      },
      {
        layout: "carousel", // mobile: taller pitch barn, one elevation per frame (all eight at one scale)
        mobileOnly: true,
        mobileSwipe: true,
        list: true,
        images: [
          { src: "assets/img/projects/hummingbird/m-barn-taller-front.jpg", ratio: 1.4215, caption: "Taller Pitch: Front", tab: "Front" },
          { src: "assets/img/projects/hummingbird/m-barn-taller-right.jpg", ratio: 1.3063, caption: "Taller Pitch: Right", tab: "Right" },
          { src: "assets/img/projects/hummingbird/m-barn-taller-rear.jpg", ratio: 1.5004, caption: "Taller Pitch: Rear", tab: "Rear" },
          { src: "assets/img/projects/hummingbird/m-barn-taller-left.jpg", ratio: 1.5094, caption: "Taller Pitch: Left", tab: "Left" },
        ],
      },
      {
        layout: "carousel", // mobile: lower pitch barn, one elevation per frame (all eight at one scale)
        mobileOnly: true,
        mobileSwipe: true,
        list: true,
        images: [
          { src: "assets/img/projects/hummingbird/m-barn-lower-front.jpg", ratio: 1.4215, caption: "Lower Pitch: Front", tab: "Front" },
          { src: "assets/img/projects/hummingbird/m-barn-lower-right.jpg", ratio: 1.3063, caption: "Lower Pitch: Right", tab: "Right" },
          { src: "assets/img/projects/hummingbird/m-barn-lower-rear.jpg", ratio: 1.5004, caption: "Lower Pitch: Rear", tab: "Rear" },
          { src: "assets/img/projects/hummingbird/m-barn-lower-left.jpg", ratio: 1.5094, caption: "Lower Pitch: Left", tab: "Left" },
        ],
      },
    ],
  },
  {
    slug: "burlingame-adu",
    category: "practice",
    title: "Burlingame ADU",
    year: "2026",
    location: "Burlingame, CA",
    type: "Accessory Dwelling Unit",
    status: "Under Construction",
    strip: "assets/img/projects/burlingame-adu/strip.jpg", // pre-cropped from the chosen scheme's sketch (option 1), on the front door
    stripFocus: "50% 50%",
    // stripWash: true, // paper greyed so the tint fills the strip; off for now (2026-10-22), he is comparing both
    stripMono: true,
    summary: [
      "Part of a larger project to create a new dwelling unit in the backyard, a new garage, and a renovation of the existing bathrooms. We explored a multitude of options, including a one story scheme and two different two story schemes, and settled on a two story ADU to preserve as much yard space as possible.",
      "The new structure consists of living and dining on the first floor, along with a powder room. Upstairs sports a generous main bedroom with a large bathroom and walk-in closet. The design respects the existing house style and features a stucco facade with Spanish style accents and details. Large glass doors connect the living room to the yard and allow for a seamless blending of indoor and outdoor space. Upstairs, we use a dormer to create a large window in the main bedroom.",
      "The clients were excited about us picking fixtures and finishes in the bathrooms and have been extremely involved throughout the process. This project is currently under construction.",
    ],
    images: [
      // sketches: cropped to the drawing (the handwritten label carried the address)
      {
        layout: "carousel",
        list: true, // mobile: stacked (no swipe) so each sketch shows at full width
        alignBottom: true,
        arrowsOut: true,
        images: [
          { src: "assets/img/projects/burlingame-adu/option-2.jpg", ratio: 2.9144, caption: "Two Story ADU, Option 1", tab: "Two Story 1" },
          { src: "assets/img/projects/burlingame-adu/option-3.jpg", ratio: 3.7647, caption: "Two Story ADU, Option 2", tab: "Two Story 2" },
          { src: "assets/img/projects/burlingame-adu/option-1.jpg", ratio: 3.2553, caption: "Single Story ADU with Attached Garage", tab: "Single Story" },
        ],
      },
      {
        layout: "place", // web: each floor sits under its elevation in Two Story Option 1 above, at that sketch's scale
        hideOnMobile: true,
        images: [
          { src: "assets/img/projects/burlingame-adu/sketch-plan-1.jpg", ratio: 1.0336, caption: "Ground Floor", captionInset: "8.9%", left: "7.06%", width: "25.9%" },
          { src: "assets/img/projects/burlingame-adu/sketch-plan-2.jpg", ratio: 1.0336, caption: "Second Floor", captionInset: "8.9%", left: "27.75%", width: "25.9%" },
        ],
      },
      {
        layout: "carousel", // mobile: the same two plans, one at a time
        mobileOnly: true,
        mobileSwipe: true,
        mobileSlide: "69%", // about 0.8x the usual size; the sketches show their flaws when large
        list: true,
        images: [
          { src: "assets/img/projects/burlingame-adu/sketch-plan-1.jpg", ratio: 1.0336, caption: "Ground Floor", captionInset: "8.9%", tab: "Ground Floor" },
          { src: "assets/img/projects/burlingame-adu/sketch-plan-2.jpg", ratio: 1.0336, caption: "Second Floor", captionInset: "8.9%", tab: "Second Floor" },
        ],
      },
      // drawings: title block and notes cropped off, each drawing on its own at one scale per sheet;
      // address painted out of the east elevation
      {
        layout: "carousel",
        mobileSwipe: true,
        alignBottom: true,
        images: [
          // all four cropped with one window placed from the A1 / AA grid lines, so walls stack slide to slide
          { src: "assets/img/projects/burlingame-adu/plan-ground.jpg", ratio: 1.1307, tab: "Ground Floor" },
          { src: "assets/img/projects/burlingame-adu/plan-second.jpg", ratio: 1.1307, tab: "Second Floor" },
          { src: "assets/img/projects/burlingame-adu/plan-ceiling.jpg", ratio: 1.1307, tab: "Ceiling" },
          { src: "assets/img/projects/burlingame-adu/plan-roof.jpg", ratio: 1.1307, tab: "Roof" },
        ],
      },
      {
        layout: "carousel",
        list: true,
        mobileSwipe: true,
        alignBottom: true,
        images: [
          { src: "assets/img/projects/burlingame-adu/elev-south.jpg", ratio: 1.3992, tab: "South" },
          { src: "assets/img/projects/burlingame-adu/elev-east.jpg", ratio: 1.3974, tab: "East" },
          { src: "assets/img/projects/burlingame-adu/elev-north.jpg", ratio: 1.3974, tab: "North" },
          { src: "assets/img/projects/burlingame-adu/elev-west.jpg", ratio: 1.3974, tab: "West" },
        ],
      },
      {
        layout: "row", // the sheet's two sections, side by side at the same scale
        hideOnMobile: true,
        images: [
          { src: "assets/img/projects/burlingame-adu/section-1.jpg", ratio: 1.2516 },
          { src: "assets/img/projects/burlingame-adu/section-2.jpg", ratio: 1.2516 },
        ],
      },
      {
        layout: "carousel",
        mobileOnly: true,
        mobileSwipe: true,
        list: true,
        images: [
          { src: "assets/img/projects/burlingame-adu/section-1.jpg", ratio: 1.2516, tab: "Section 1" },
          { src: "assets/img/projects/burlingame-adu/section-2.jpg", ratio: 1.2516, tab: "Section 2" },
        ],
      },
      {
        layout: "carousel", // web: a room's drawing lines stacked, all slides at the same scale
        hideOnMobile: true,
        list: true,
        alignBottom: true,
        arrowsOut: true,
        images: [
          { src: "assets/img/projects/burlingame-adu/int-kitchen.jpg", ratio: 1.8401, tab: "Kitchen / Living" },
          { src: "assets/img/projects/burlingame-adu/int-bath-bedroom.jpg", ratio: 1.6352, tab: "Bath / Bedroom" },
          { src: "assets/img/projects/burlingame-adu/int-stair.jpg", ratio: 2.502, tab: "Stair" },
          { src: "assets/img/projects/burlingame-adu/int-main-house.jpg", ratio: 1.7307, tab: "Main House Baths" },
        ],
      },
      {
        layout: "carousel", // mobile: one or two walls per slide so they read larger, all at the same scale
        mobileOnly: true,
        mobileSwipe: true,
        list: true,
        images: [
          { src: "assets/img/projects/burlingame-adu/m-kitchen-n.jpg", ratio: 2.0921, caption: "Kitchen / Living: North", tab: "Kitchen / Living: North" },
          { src: "assets/img/projects/burlingame-adu/m-kitchen-w.jpg", ratio: 2.0921, caption: "Kitchen / Living: West", tab: "Kitchen / Living: West" },
          { src: "assets/img/projects/burlingame-adu/m-kitchen-e.jpg", ratio: 2.2857, caption: "Kitchen / Living: East", tab: "Kitchen / Living: East" },
          { src: "assets/img/projects/burlingame-adu/m-kitchen-s.jpg", ratio: 2.2857, caption: "Kitchen / Living: South", tab: "Kitchen / Living: South" },
          { src: "assets/img/projects/burlingame-adu/m-bath-1.jpg", ratio: 2.0986, caption: "Bath: North and East", tab: "Bath: North and East" },
          { src: "assets/img/projects/burlingame-adu/m-bath-2.jpg", ratio: 2.0964, caption: "Bath: South and West", tab: "Bath: South and West" },
          { src: "assets/img/projects/burlingame-adu/m-bed-s.jpg", ratio: 2.0243, caption: "Bedroom: South", tab: "Bedroom: South" },
          { src: "assets/img/projects/burlingame-adu/m-bed-e.jpg", ratio: 2.0243, caption: "Bedroom: East", tab: "Bedroom: East" },
          { src: "assets/img/projects/burlingame-adu/m-bed-w.jpg", ratio: 2.0243, caption: "Bedroom: West", tab: "Bedroom: West" },
          { src: "assets/img/projects/burlingame-adu/m-stair-n.jpg", ratio: 1.5349, caption: "Stair: North", tab: "Stair: North" },
          { src: "assets/img/projects/burlingame-adu/m-stair-e.jpg", ratio: 1.5349, caption: "Stair: East", tab: "Stair: East" },
          { src: "assets/img/projects/burlingame-adu/m-ba1-1.jpg", ratio: 2.1692, caption: "Main House BA#1: North and East", tab: "Main House BA#1: North and East" },
          { src: "assets/img/projects/burlingame-adu/m-ba1-2.jpg", ratio: 2.2497, caption: "Main House BA#1: South and West", tab: "Main House BA#1: South and West" },
          { src: "assets/img/projects/burlingame-adu/m-ba2-1.jpg", ratio: 2.2247, caption: "Main House BA#2: North and East", tab: "Main House BA#2: North and East" },
          { src: "assets/img/projects/burlingame-adu/m-ba2-2.jpg", ratio: 2.2247, caption: "Main House BA#2: South and West", tab: "Main House BA#2: South and West" },
        ],
      },
    ],
  },
  {
    slug: "concord-way",
    category: "practice",
    title: "Concord Way",
    year: "2024",
    location: "Burlingame, CA",
    type: "Single-Family Renovation",
    status: "Built",
    strip: "assets/img/projects/concord-way/strip.jpg", // pre-cropped close on one railing panel against the sky (alternative: strip-bluesky.jpg, black and white partly from the blue channel for more contrast under the darker tints; tried and set aside, it loses the grit)
    stripFocus: "50% 50%",
    stripMono: true, // shown in black and white so it takes a tint like the others
    summary: [
      "Concord Way is the renovation of a classic 1920s home in Burlingame that had fallen into disrepair and needed some love. The work was practical rather than transformative: remodeled bathrooms and a new toilet room, a refreshed kitchen, replacement windows, new paint inside and out, and a rebuilt deck off the back of the house.",
      "The deck railing served as a crash course in architectural detailing. I had to learn the process of taking an architectural idea and crafting it into a built reality. It began with a pattern, square panels of crossed diagonals set between trimmed posts, which I then translated into a set of instructions a contractor could build from: sections through the post and rail showing how each layer of trim goes together, an enlarged panel with every member dimensioned, and elevations of each run. The finished railing, shown below, was built from those drawings.",
    ],
    images: [
      {
        layout: "carousel", // drawings: title block and notes cropped off; the sheet's own drawing label stands in for a caption
        mobileSwipe: true,
        images: [
          { src: "assets/img/projects/concord-way/plan-1.jpg", ratio: 1.1495, tab: "First Floor" },
          { src: "assets/img/projects/concord-way/plan-2.jpg", ratio: 1.1495, tab: "Second Floor" },
        ],
      },
      {
        layout: "carousel",
        list: true,
        mobileSwipe: true,
        images: [
          { src: "assets/img/projects/concord-way/elev-1.jpg", ratio: 1.2204, tab: "Front & Right" },
          { src: "assets/img/projects/concord-way/elev-2.jpg", ratio: 1.2204, tab: "Rear & Left" },
        ],
      },
      {
        divider: "Railing",
        note: "From drawing to built: the detail sheet issued to the contractor, then the finished railing.",
      },
      { src: "assets/img/projects/concord-way/railing-detail.jpg", caption: "Railing Details" },
      {
        layout: "carousel",
        list: true,
        mobileSwipe: true,
        images: [
          { src: "assets/img/projects/concord-way/railing-2.jpg", ratio: 1.3333, caption: "Deck from the Garden", tab: "Garden" },
          { src: "assets/img/projects/concord-way/railing-1.jpg", ratio: 1.3333, caption: "Deck from the Side Yard", tab: "Side Yard" },
          { src: "assets/img/projects/concord-way/railing-3.jpg", ratio: 1.3333, caption: "Railing Panel", tab: "Panel" },
          { src: "assets/img/projects/concord-way/railing-4.jpg", ratio: 1.3285, caption: "Deck", tab: "Deck" },
        ],
      },
      { divider: "Finished House" },
      {
        layout: "carousel",
        list: true,
        mobileSwipe: true,
        images: [
          { src: "assets/img/projects/concord-way/exterior-2.jpg", ratio: 1.3285, caption: "Front", tab: "Front" },
          { src: "assets/img/projects/concord-way/exterior-1.jpg", ratio: 1.3285, caption: "Garage Approach", tab: "Garage" },
          { src: "assets/img/projects/concord-way/interior-1.jpg", ratio: 1.3333, caption: "Living Room", tab: "Living Room" },
          { src: "assets/img/projects/concord-way/interior-2.jpg", ratio: 1.3285, caption: "Hall to Dining Room", tab: "Hall" },
          { src: "assets/img/projects/concord-way/interior-3.jpg", ratio: 1.3285, caption: "Dining Room", tab: "Dining Room" },
          { src: "assets/img/projects/concord-way/kitchen.jpg", ratio: 1.3285, caption: "Kitchen", tab: "Kitchen" },
        ],
      },
    ],
  },
  {
    slug: "hillsborough",
    category: "practice",
    title: "Hillsborough",
    year: "2024",
    location: "Hillsborough, CA",
    type: "Single-Family Residence",
    status: "Built",
    strip: "assets/img/projects/hillsborough/strip.jpg", // pre-cropped from the island photo, centred between the range hood and the skylight
    stripFocus: "50% 50%",
    stripMono: true,
    summary: [
      "Renovation of a traditional California ranch house. This project includes a full kitchen renovation, including the creation of two new box bay windows and a shift from a somewhat traditional style, with coffers accented by crown moulding, to a contemporary ceiling grid of stained faux wood beams on a cream colored ceiling.",
      "The new ceiling grid responds to elements of the room, like the kitchen island in the middle. It also serves to frame the new range and hood, with a new skylight sitting above, centered in the grid, to provide light from all sides while cooking.",
      "This project showcases the urge for creative pursuit contrasted against the reality of a client with budget concerns. A large part of the scope was initially dedicated to rebuilding the rear roof, which sat over the patio, to better frame the incredible view of San Francisco Bay. However, as architects we had to weigh the actual cost of such a renovation against the benefits gained for the client, and as such this scope was cut from the final project.",
    ],
    images: [
      // drawings: title block and notes cropped off (scheme sketch rotated to read landscape)
      { src: "assets/img/projects/hillsborough/kitchen-scheme.jpg", caption: "Initial Kitchen Scheme", captionInset: "4.4%" },
      {
        layout: "carousel",
        list: true,
        mobileSwipe: true,
        alignBottom: true, // the roof plan is shorter than the two floor plans
        images: [
          { src: "assets/img/projects/hillsborough/plan.jpg", ratio: 1.087, tab: "Floor Plan" },
          { src: "assets/img/projects/hillsborough/ceiling.jpg", ratio: 1.087, tab: "Ceiling Plan" },
          { src: "assets/img/projects/hillsborough/roof.jpg", ratio: 1.3652, tab: "Roof Plan" },
        ],
      },
      { divider: "Finished Kitchen" },
      {
        layout: "carousel",
        list: true,
        mobileSwipe: true,
        images: [
          { src: "assets/img/projects/hillsborough/kitchen-1.jpg", ratio: 1.3333, caption: "Kitchen", tab: "Kitchen" },
          { src: "assets/img/projects/hillsborough/kitchen-2.jpg", ratio: 1.3333, caption: "Island and Range Wall", tab: "Island" },
          { src: "assets/img/projects/hillsborough/skylight.jpg", ratio: 1.3333, caption: "Skylight in the Beam Grid", tab: "Skylight" },
          { src: "assets/img/projects/hillsborough/range.jpg", ratio: 1.3333, caption: "Range", tab: "Range" },
          { src: "assets/img/projects/hillsborough/box-bay.jpg", ratio: 1.3333, caption: "Box Bay Window", tab: "Box Bay" },
          { src: "assets/img/projects/hillsborough/kitchen-3.jpg", ratio: 1.3333, caption: "Sink in the Box Bay", tab: "Sink" },
          { src: "assets/img/projects/hillsborough/kitchen-4.jpg", ratio: 1.3333, caption: "Sink Wall", tab: "Sink Wall" },
        ],
      },
      {
        layout: "row",
        caption: "Built-in Cabinets",
        images: [
          { src: "assets/img/projects/hillsborough/built-in-1.jpg", ratio: 0.75 },
          { src: "assets/img/projects/hillsborough/built-in-2.jpg", ratio: 1.3333 },
        ],
      },
      {
        layout: "carousel",
        list: true,
        mobileSwipe: true,
        arrowsOut: true, // full column width so the elevations read
        images: [
          { src: "assets/img/projects/hillsborough/elev-front.jpg", ratio: 2.0847, tab: "Front" },
          { src: "assets/img/projects/hillsborough/elev-rear.jpg", ratio: 2.0025, tab: "Rear" },
        ],
      },
      { src: "assets/img/projects/hillsborough/details.jpg" },
    ],
  },
];
