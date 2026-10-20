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
              stack and row can take gap: "10px" (stack: sit close instead of touching).
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
const IMAGE_VERSION = 6;

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
    stripZoom: 1.55, // zoomed toward the top right so only the rings show
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
      {
        layout: "row",
        gap: "clamp(20px, 3vw, 48px)", // a little more air between the plans
        images: [
          { src: "assets/img/projects/youth-center/06.jpg", ratio: 1, caption: "Ground Level", captionInset: "7.5%" },
          { src: "assets/img/projects/youth-center/07.jpg", ratio: 1, caption: "5ft Level", captionInset: "4.9%" },
          { src: "assets/img/projects/youth-center/08.jpg", ratio: 1, caption: "Gym Level", captionInset: "5.9%" },
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
    slug: "academic-03",
    category: "academic",
    title: "Academic Project 03",
    year: "2020",
    location: "City, State",
    type: "Mixed Use",
    context: "Comprehensive Studio",
    strip: "assets/img/placeholder-3.svg",
    stripFocus: "20% 50%",
    summary:
      "Placeholder description. Two or three sentences on the site, the central idea, and what the building does with it.",
    images: [
      { src: "assets/img/placeholder-3.svg", caption: "Curtain wall" },
      { src: "assets/img/placeholder-1.svg" },
    ],
  },
  {
    slug: "academic-04",
    category: "academic",
    title: "Academic Project 04",
    year: "2019",
    location: "City, State",
    type: "Pavilion",
    context: "Design-Build",
    strip: "assets/img/placeholder-4.svg",
    stripFocus: "45% 50%",
    summary:
      "Placeholder description. Two or three sentences on the site, the central idea, and what the building does with it.",
    images: [
      { src: "assets/img/placeholder-4.svg", caption: "Board-formed concrete" },
      { src: "assets/img/placeholder-5.svg" },
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
