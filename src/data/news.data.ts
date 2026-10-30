export type NewsCategory =
  | "academics"
  | "ict-innovation"
  | "sports"
  | "excursions"
  | "announcements"
  | "achievements";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; caption?: string }
  /** Side-by-side images */
  | { type: "images"; items: { src: string; caption?: string }[] }
  | { type: "list"; items: string[] };

export interface Article {
  slug: string;
  title: string;
  /** Short title for the breadcrumb, e.g. "Robotics Challenge" */
  shortTitle?: string;
  excerpt: string;
  category: NewsCategory;
  /** Optional second pill in the article header */
  secondaryCategory?: NewsCategory;
  /** Second (grey) pill on the card, e.g. "Campus Life" */
  tag: string;
  /** Small tags at the bottom of the article. Falls back to `tag`. */
  tags?: string[];
  /** 'YYYY-MM-DD' */
  date: string;
  readTime: number;
  /** Cloudinary link. Leave '' for the placeholder tile. */
  cover: string;
  author: string;
  featured?: boolean;
  /** Article page content. Falls back to the excerpt when missing. */
  body?: ArticleBlock[];
}

export const NEWS_CATEGORIES: { id: "all" | NewsCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "academics", label: "Academics" },
  { id: "ict-innovation", label: "ICT & Innovation" },
  { id: "sports", label: "Sports" },
  { id: "excursions", label: "Excursions" },
  { id: "announcements", label: "Announcements" },
  { id: "achievements", label: "Achievements" },
];

export const newsCategoryLabel = (id: NewsCategory) =>
  NEWS_CATEGORIES.find((c) => c.id === id)?.label ?? id;

const AUTHOR = "Zoe Media Desk";

// Everything below is placeholder copy: replace with real stories.
export const articles: Article[] = [
  {
    slug: "zoe-students-win-gold-oyo-state-robotics-challenge",
    title: "Zoe Students Win Gold at the 2026 Oyo State Robotics Challenge",
    shortTitle: "Robotics Challenge",
    excerpt:
      "Our JSS 3 robotics team beat 40 schools across the state with an automated waste-sorting robot built entirely in our ICT lab.",
    category: "achievements",
    secondaryCategory: "ict-innovation",
    tag: "Robotics",
    tags: ["Robotics", "ICT", "JSS 3"],
    date: "2026-10-18",
    readTime: 5,
    cover: "",
    author: AUTHOR,
    featured: true,
    body: [
      {
        type: "p",
        text: "Our JSS 3 robotics team has done it again. Competing against more than 40 public and private schools at the 2026 Oyo State Robotics Challenge in Ibadan, the team took first place with an automated waste-sorting robot designed, coded and built in our ICT & Hybrid Learning lab.",
      },
      {
        type: "p",
        text: "The four-student team spent eight weeks prototyping, testing sensors and refining their code after school hours, supported by our ICT instructors and the wider Zoe community.",
      },
      { type: "h2", text: "From classroom idea to state champions" },
      {
        type: "p",
        text: "The project started as a simple class challenge: how might we keep our school compound cleaner? Students mapped the problem, sketched solutions and voted on the idea of a robot that separates plastic, paper and organic waste.",
      },
      {
        type: "quote",
        text: "We don’t just teach our children to use technology — we train them to build it.",
        cite: "Head of ICT, Zoe Schools",
      },
      {
        type: "images",
        items: [
          { src: "", caption: "Team photo" },
          { src: "", caption: "Robot close-up" },
        ],
      },
      { type: "h2", text: "What the students learned" },
      {
        type: "list",
        items: [
          "Designing with sensors, motors and microcontrollers",
          "Writing and debugging real code as a team",
          "Presenting their solution confidently to judges",
          "Turning a school problem into a working product",
        ],
      },
      {
        type: "p",
        text: "Congratulations to the team, their instructors and the parents who supported them. The robot will be on display at our Open Day on November 7 — come and see it in action.",
      },
    ],
  },
  {
    slug: "how-modern-classrooms-are-transforming-learning",
    title: "How Modern Classrooms Are Transforming Learning",
    excerpt:
      "Discover how smart technology and interactive teaching are shaping a better learning experience for every child.",
    category: "academics",
    tag: "Campus Life",
    date: "2026-10-12",
    readTime: 4,
    cover: "",
    author: AUTHOR,
  },
  {
    slug: "2026-2027-admission-entrance-exam-dates",
    title: "2026/2027 Admission: Entrance Exam Dates Announced",
    excerpt:
      "Key dates, requirements and registration details for prospective pupils and their parents.",
    category: "announcements",
    tag: "Campus Life",
    date: "2026-10-10",
    readTime: 2,
    cover: "",
    author: AUTHOR,
  },
  {
    slug: "inside-our-abacus-and-finger-maths-programme",
    title: "Inside Our Abacus & Finger Maths Programme",
    excerpt:
      "A look at how abacus and finger maths build speed, accuracy and confidence in young learners.",
    category: "academics",
    tag: "Campus Life",
    date: "2026-10-05",
    readTime: 6,
    cover: "",
    author: AUTHOR,
  },
  {
    slug: "sss-students-visit-ikogosi-warm-springs",
    title: "SSS Students Visit the Ikogosi Warm Springs",
    excerpt:
      "Our senior students spent a day exploring, learning and bonding at the Ikogosi Warm Springs.",
    category: "excursions",
    tag: "Campus Life",
    date: "2026-09-28",
    readTime: 3,
    cover: "",
    author: AUTHOR,
  },
  {
    slug: "why-every-child-at-zoe-learns-to-code",
    title: "Why Every Child at Zoe Learns to Code",
    excerpt:
      "From first lines of code to real projects, here is why coding has a place in our classrooms.",
    category: "ict-innovation",
    tag: "Campus Life",
    date: "2026-09-20",
    readTime: 5,
    cover: "",
    author: AUTHOR,
  },
  {
    slug: "community-service-day-ogbomoso-central-market",
    title: "Our Community Service Day at Ogbomoso Central Market",
    excerpt:
      "Pupils and staff gave back to the community with a service day at Ogbomoso Central Market.",
    category: "excursions",
    tag: "Community",
    date: "2026-09-12",
    readTime: 4,
    cover: "",
    author: AUTHOR,
  },
  // Filler entries so pagination has a second page. Delete or replace.
  {
    slug: "inter-house-sports-highlights",
    title: "Inter-House Sports: Highlights and Results",
    excerpt:
      "Relive the best moments from this year’s inter-house competition.",
    category: "sports",
    tag: "Campus Life",
    date: "2026-09-05",
    readTime: 3,
    cover: "",
    author: AUTHOR,
  },
  {
    slug: "inter-school-quiz-top-prizes",
    title: "Zoe Pupils Take Top Prizes at the Inter-School Quiz",
    excerpt:
      "Our young scholars showed what preparation and teamwork can do on a bigger stage.",
    category: "achievements",
    tag: "Academics",
    date: "2026-08-29",
    readTime: 3,
    cover: "",
    author: AUTHOR,
  },
];

export const sortedArticles = [...articles].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const featuredArticle =
  articles.find((a) => a.featured) ?? sortedArticles[0];

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);

/** Breadcrumb label: the short title, or the first five words of the title. */
export const breadcrumbTitle = (a: Article) => {
  if (a.shortTitle) return a.shortTitle
  const words = a.title.split(' ')
  return words.length > 5 ? `${words.slice(0, 5).join(' ')}…` : a.title
}
/** Same-category stories first, then the most recent others. */
export const getRelated = (article: Article, count = 3) => {
  const others = sortedArticles.filter((a) => a.slug !== article.slug);
  const same = others.filter((a) => a.category === article.category);
  const rest = others.filter((a) => a.category !== article.category);
  return [...same, ...rest].slice(0, count);
};
