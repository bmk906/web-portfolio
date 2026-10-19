/*
  Project data — the only file you need to edit to add or change projects.

  strip       image used for the tall strip on the home page
  stripFocus  which part of that image the strip shows (CSS object-position):
              "0% 50%" = left edge, "50% 50%" = centre, "100% 50%" = right edge
  images      shown in order on the project page; caption is optional
*/

const CATEGORIES = [
  { id: "academic", label: "Academic", prefix: "A" },
  { id: "practice", label: "Practice", prefix: "P" },
];

const PROJECTS = [
  {
    slug: "academic-01",
    category: "academic",
    title: "Academic Project 01",
    year: "2021",
    location: "City, State",
    type: "Cultural",
    context: "Graduate Studio",
    strip: "assets/img/placeholder-1.svg",
    stripFocus: "30% 50%",
    summary:
      "Placeholder description. Two or three sentences on the site, the central idea, and what the building does with it.",
    images: [
      { src: "assets/img/placeholder-1.svg", caption: "Exterior view" },
      { src: "assets/img/placeholder-4.svg", caption: "Facade detail" },
      { src: "assets/img/placeholder-5.svg" },
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
