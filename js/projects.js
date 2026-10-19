/*
  Project data — the only file you need to edit to add or change projects.

  strip       image used for the tall strip on the home page
  stripFocus  which part of that image the strip shows (CSS object-position):
              "0% 50%" = left edge, "50% 50%" = centre, "100% 50%" = right edge
  summary     one paragraph as a string, or several as a list of strings
  collaborators  optional; only shown when filled in
  images      shown in order on the project page; caption is optional. An entry can
              also be a group of images:
                { layout: "stack", images: [...] }   stacked with no gap, reads as one image
                { layout: "bands", ratio: "4 / 1", focus: "50% 87%", images: [...] }
                                                     each cropped to a thin band, stacked
                { layout: "grid", images: [...] }    two columns (one on mobile)
*/

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
    strip: "assets/img/projects/sinusoidal/09.jpg",
    stripFocus: "50% 50%",
    summary: [
      "Set in a developing neighborhood in Toronto, Sinusoidal is a market hall: a floor of market stalls beneath a single undulating roof, with a mezzanine café above.",
      "The project is a study in thin-shell structures, aiming for a roof that is striking, efficient, and responsive to its site. It began as a field of modular cells shaped by the site. Layering sine waves across those cells produced a continuous shell, and varying the wave amplitudes from cell to cell let the roof meet the ground in a variety of ways. Stepping the heights of neighboring cells opens bands of clerestory light, and the troughs of the waves collect and store rainwater.",
    ],
    images: [
      { src: "assets/img/projects/sinusoidal/site-plan.jpg", caption: "Site plan" },
      {
        layout: "bands", // trimmed to just past the arrows so the two read as one diagram
        ratio: "2.2 / 1",
        focus: "50% 50%",
        images: [
          { src: "assets/img/projects/sinusoidal/01.jpg" },
          { src: "assets/img/projects/sinusoidal/02.jpg" },
        ],
      },
      {
        layout: "bands", // cropped to the building, stacked as one drawing
        ratio: "4 / 1",
        focus: "50% 87%",
        images: [
          { src: "assets/img/projects/sinusoidal/03.jpg" },
          { src: "assets/img/projects/sinusoidal/04.jpg" },
          { src: "assets/img/projects/sinusoidal/05.jpg" },
        ],
      },
      {
        layout: "grid",
        images: [
          { src: "assets/img/projects/sinusoidal/06.jpg" },
          { src: "assets/img/projects/sinusoidal/07.jpg" },
          { src: "assets/img/projects/sinusoidal/08.jpg" },
          { src: "assets/img/projects/sinusoidal/09.jpg" },
        ],
      },
      { src: "assets/img/projects/sinusoidal/10.jpg" },
    ],
  },
  {
    slug: "academic-02",
    category: "academic",
    title: "Academic Project 02",
    year: "2021",
    location: "City, State",
    type: "Residential",
    context: "Graduate Studio",
    strip: "assets/img/placeholder-2.svg",
    stripFocus: "65% 50%",
    summary:
      "Placeholder description. Two or three sentences on the site, the central idea, and what the building does with it.",
    images: [
      { src: "assets/img/placeholder-2.svg", caption: "Street elevation" },
      { src: "assets/img/placeholder-6.svg" },
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
