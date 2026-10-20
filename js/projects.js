/*
  Project data — the only file you need to edit to add or change projects.

  strip       image used for the tall strip on the home page
  stripFocus  which part of that image the strip shows (CSS object-position):
              "0% 50%" = left edge, "50% 50%" = centre, "100% 50%" = right edge
  stripZoom   optional; zooms the strip in toward stripFocus (e.g. 1.3)
  shortTitle  optional; shorter name for the home page strip
  summary     one paragraph as a string, or several as a list of strings
  collaborators  optional; only shown when filled in
  images      shown in order on the project page; caption is optional. An entry can
              also be a group of images:
                { layout: "stack", images: [...] }   stacked with no gap, reads as one image
                { layout: "bands", ratio: "4 / 1", focus: "50% 87%", images: [...] }
                                                     each cropped to a thin band, stacked
                { layout: "grid", images: [...] }    two columns (one on mobile)
                { layout: "matrix", images: [...] }  three columns, on mobile too
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
                                                     width: "100%" sets the image width
              An image can open a carousel level on click (web): opens: { carousel: "x", level: 0 }
              stack, row and aside can take gap: "10px" (stack: sit close instead of touching).
              A single image can take note: "..." for a short description under its caption,
              and nativeWidth: 624 to never display wider than its source (desktop).
              Image options: captionInset: "7%" (indent the caption to where the drawing
              starts), hideOnMobile: true.
              A group can have a caption, and its images can have their own captions.
              labels: white text placed on top of an image, at x/y percentages of the
              (cropped) image; centred on that point unless align: "left". On mobile
              they're listed under the group instead.
              mobileList: lines listed under an image or group on mobile only (for
              text that's part of the image and too small to read on a phone).
*/

// Bump whenever an image file is replaced under the same name, so browsers fetch the new one
const IMAGE_VERSION = 9;

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
      { src: "assets/img/projects/sinusoidal/site-plan.jpg", caption: "Site plan" },
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
      { src: "assets/img/projects/youth-center/site-plan.jpg", caption: "Site plan" },
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
          { src: "assets/img/projects/youth-center/06.jpg", ratio: 1.061, caption: "Ground Floor Plan", tab: "Ground" },
          { src: "assets/img/projects/youth-center/07.jpg", ratio: 1.061, caption: "+5' Floor Plan", tab: "+5'" },
          { src: "assets/img/projects/youth-center/08.jpg", ratio: 1.061, caption: "Gym Floor Plan", tab: "Gym" },
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
          { src: "assets/img/projects/youth-center/12.jpg", ratio: 1.104, caption: "Exploded Axonometric" },
          { src: "assets/img/projects/youth-center/11.jpg", ratio: 0.402, caption: "Wall Section", hideOnMobile: true },
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
      { src: "assets/img/projects/ziggurat-of-leaves/site-plan.jpg", caption: "Site plan" },
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
            labels: [
              { text: "01 Ziggurat", x: "34%", y: "25.6%", dark: true },
              { text: "02 Tree", x: "82.7%", y: "51.4%", dark: true },
              { text: "03 Ziggurat of Leaves", x: "51.5%", y: "93.2%", dark: true },
            ],
          },
          { src: "assets/img/projects/ziggurat-of-leaves/light.jpg", ratio: 1.816, caption: "Light Diagram" },
          { src: "assets/img/projects/ziggurat-of-leaves/wind.jpg", ratio: 1.816, caption: "Wind Diagram" },
        ],
      },
      {
        layout: "carousel", // web: one plan between arrows, levels in the sidebar; mobile: stacked
        images: [
          { src: "assets/img/projects/ziggurat-of-leaves/plan-ground.jpg", ratio: 1.2975, caption: "Ground Floor Plan", tab: "Ground" },
          { src: "assets/img/projects/ziggurat-of-leaves/plan-1.jpg", ratio: 1.2975, caption: "Level 1 Floor Plan", tab: "Level 1" },
          { src: "assets/img/projects/ziggurat-of-leaves/plan-2.jpg", ratio: 1.2975, caption: "Level 2 Floor Plan", tab: "Level 2" },
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
      { src: "assets/img/projects/ziggurat-of-leaves/axon-nw.jpg", caption: "Exploded Axonometric", nativeWidth: 624 },
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
    strip: "assets/img/projects/monti-prenestini/strip.jpg", // pre-cut slice on the right third line, through the ridge
    stripFocus: "50% 50%",
    summary: [
      "Monti Prenestini is a mountain range about an hour east of Rome, home to sweeping views, abundant wildlife, and a handful of medieval hill towns now at risk of depopulation. Our goal was a campaign to market the range to Romans as a destination for day trips. Using GIS, we mapped its points of interest and traced routes tailored to different visitors, from cyclists and hikers to horseback riders and pilgrims.",
      "Our second goal was to strengthen transit within the mountains, making it easier for residents to commute to Rome and travel between towns. We focused on the gateway to the range: Zagarolo, where trains from Rome arrive at an uninviting station. We redesigned the plaza outside it to mark the passage out of the city and into a new landscape, sinking the entire plaza into the ground. An oscillating staircase, part seating and part circulation, steps down into it. Built from locally sourced limestone, it echoes the ancient terraces found throughout the mountains.",
    ],
    images: [
      { src: "assets/img/projects/monti-prenestini/site-plan.jpg", caption: "Site plan" },
      { src: "assets/img/projects/monti-prenestini/01.jpg", caption: "Towns, Peaks and Points of Interest" },
      { src: "assets/img/projects/monti-prenestini/02.jpg", caption: "Transit and Bus Routes" },
      { src: "assets/img/projects/monti-prenestini/profiles/selection.jpg", caption: "Circulation Paths: User Profiles" },
      {
        layout: "carousel", // web: one profile at a time, names in the sidebar; mobile: stacked
        list: true,
        width: "100%",
        images: [
          { src: "assets/img/projects/monti-prenestini/profiles/01-christiano.jpg", ratio: 1.414, caption: "Christiano, Horseback Rider", tab: "Christiano" },
          { src: "assets/img/projects/monti-prenestini/profiles/02-giorgio.jpg", ratio: 1.414, caption: "Giorgio, Rock Climber", tab: "Giorgio" },
          { src: "assets/img/projects/monti-prenestini/profiles/03-gianna.jpg", ratio: 1.414, caption: "Gianna, Biker", tab: "Gianna" },
          { src: "assets/img/projects/monti-prenestini/profiles/04-fabrizio.jpg", ratio: 1.414, caption: "Fabrizio, National Hiker", tab: "Fabrizio" },
          { src: "assets/img/projects/monti-prenestini/profiles/05-jan.jpg", ratio: 1.414, caption: "Jan, International Hiker", tab: "Jan" },
          { src: "assets/img/projects/monti-prenestini/profiles/06-maria.jpg", ratio: 1.414, caption: "Maria, Person of Faith", tab: "Maria" },
        ],
      },
      {
        layout: "carousel", // routes by mode of travel
        list: true,
        width: "100%",
        images: [
          { src: "assets/img/projects/monti-prenestini/routes/01-horseback-riding.jpg", ratio: 1.414, caption: "Horseback Trails", tab: "Horseback" },
          { src: "assets/img/projects/monti-prenestini/routes/02-hiking-trails.jpg", ratio: 1.414, caption: "Hiking Trails", tab: "Hiking" },
          { src: "assets/img/projects/monti-prenestini/routes/03-road-cycling.jpg", ratio: 1.414, caption: "Road Cycling Routes", tab: "Road Cycling" },
          { src: "assets/img/projects/monti-prenestini/routes/04-existing-bus-route.jpg", ratio: 1.414, caption: "Existing Bus Route", tab: "Existing Bus" },
          { src: "assets/img/projects/monti-prenestini/routes/05-proposed-bus-route.jpg", ratio: 1.414, caption: "Proposed Bus Route", tab: "Proposed Bus" },
        ],
      },
      { src: "assets/img/projects/monti-prenestini/zag-site.jpg", caption: "Zagarolo Station: Site Plan" },
      { src: "assets/img/projects/monti-prenestini/zag-site-section.jpg", caption: "Site Section" },
      { src: "assets/img/projects/monti-prenestini/zag-plaza-plan.jpg", caption: "Sunken Plaza Plan" },
      { src: "assets/img/projects/monti-prenestini/zag-plaza-section.jpg", caption: "Plaza Section" },
      {
        layout: "row",
        images: [
          { src: "assets/img/projects/monti-prenestini/zag-day.jpg", ratio: 1.414, caption: "Plaza by Day" },
          { src: "assets/img/projects/monti-prenestini/zag-night.jpg", ratio: 1.414, caption: "Plaza by Night" },
        ],
      },
    ],
  },
  {
    slug: "practice-01",
    category: "practice",
    title: "Practice Project 01",
    year: "2024",
    location: "City, State",
    type: "Private Residence",
    context: "Firm Name — Project Designer",
    strip: "assets/img/placeholder-6.svg",
    stripFocus: "70% 50%",
    summary:
      "Placeholder description. Scope, your role, and what you were responsible for through construction.",
    images: [{ src: "assets/img/placeholder-6.svg" }],
  },
  {
    slug: "practice-02",
    category: "practice",
    title: "Practice Project 02",
    year: "2023",
    location: "City, State",
    type: "Commercial Interior",
    context: "Firm Name — Designer",
    strip: "assets/img/placeholder-5.svg",
    stripFocus: "80% 50%",
    summary:
      "Placeholder description. Scope, your role, and what you were responsible for through construction.",
    images: [{ src: "assets/img/placeholder-5.svg" }],
  },
];
