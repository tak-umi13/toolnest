import type { Tool } from "../types";

export const seoTools: Tool[] = [
  {
    slug: "keyword-density-checker",
    category: "seo",
    name: "Keyword Density Checker",
    h1: "Keyword Density Checker",
    tagline: "Find your most-used words and phrases and their density %.",
    title: "Keyword Density Checker — Free On-Page SEO Tool",
    description:
      "Free keyword density checker. Paste your content to see top keywords, 2- and 3-word phrases, counts and density %. Spot keyword stuffing instantly.",
    intro:
      "Paste your article or page copy to see which words and phrases you use most, with their frequency and density percentage. Use it to confirm your target keyword is present without over-optimizing (keyword stuffing). Common stop words are filtered out so the signal is clearer.",
    keywords: ["keyword density checker", "keyword density tool", "keyword frequency counter", "seo keyword density"],
    component: "keyword-density-checker",
    volumeEstimate: 5400,
    howTo: [
      "Paste your content into the box.",
      "Review the top single words and 2- and 3-word phrases.",
      "Check that your target keyword appears naturally — aim for a low, natural density rather than a fixed percentage.",
    ],
    faqs: [
      { q: "What is a good keyword density?", a: "There's no magic number. Modern SEO favors natural language over hitting a target percentage — keeping a primary keyword roughly around 0.5–2% usually reads naturally, but write for humans first." },
      { q: "Does this tool count phrases or just single words?", a: "Both. It reports the most frequent single words plus 2-word and 3-word phrases (bigrams and trigrams), which better reflect how people search." },
      { q: "Are common words ignored?", a: "Yes. Stop words like 'the', 'and' and 'of' are filtered from the single-word list so your meaningful terms stand out." },
    ],
    related: ["slug-generator", "word-counter"],
  },
];
