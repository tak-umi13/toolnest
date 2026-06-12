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
  {
    slug: "robots-txt-generator",
    category: "seo",
    name: "Robots.txt Generator",
    h1: "Robots.txt Generator",
    tagline: "Create a valid robots.txt to control how crawlers index your site.",
    title: "Robots.txt Generator — Free Online SEO Tool",
    description:
      "Free robots.txt generator. Allow or block crawlers, disallow specific paths, set crawl-delay and add your sitemap URL. Copy a valid robots.txt in one click.",
    intro:
      "Generate a correct robots.txt file without memorising the syntax. Choose to allow everything, block everything, or disallow specific paths, optionally set a crawl-delay, and add your sitemap URL. Copy the result to your site root at /robots.txt.",
    keywords: ["robots txt generator", "robots.txt generator", "create robots txt", "robots txt file"],
    component: "robots-txt-generator",
    volumeEstimate: 4400,
    howTo: [
      "Pick a rule preset: allow all, block all, or custom.",
      "For custom, list the paths to disallow, one per line.",
      "Optionally add a crawl-delay and your sitemap URL.",
      "Copy the file and upload it to your site root as /robots.txt.",
    ],
    faqs: [
      { q: "Where do I put the robots.txt file?", a: "At the root of your domain, reachable at https://yourdomain.com/robots.txt. Crawlers always look there." },
      { q: "Does Disallow guarantee a page won't be indexed?", a: "No. Disallow stops crawling, but a blocked URL can still be indexed if linked elsewhere. Use a noindex meta tag to reliably keep a page out of search results." },
      { q: "Should I add my sitemap here?", a: "Yes — adding a Sitemap line helps search engines discover all your URLs, and it works alongside submitting the sitemap in Search Console." },
    ],
    related: ["keyword-density-checker", "slug-generator"],
  },
];
