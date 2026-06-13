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
  {
    slug: "utm-builder",
    category: "seo",
    name: "UTM Builder",
    h1: "UTM Campaign URL Builder",
    tagline: "Build trackable campaign URLs with UTM parameters for analytics.",
    title: "UTM Builder — Campaign URL Builder for Google Analytics",
    description:
      "Free UTM builder. Add utm_source, utm_medium, utm_campaign and more to any URL to track campaigns in Google Analytics. Live preview and one-click copy.",
    intro:
      "Add UTM parameters to any URL so Google Analytics and other tools can attribute traffic to the right campaign, source and medium. Fill in the fields, and the trackable URL builds live with proper encoding. Keep values lowercase and consistent so your reports stay clean. Built entirely in your browser.",
    keywords: ["utm builder", "utm campaign url builder", "utm link builder", "campaign url builder"],
    component: "utm-builder",
    volumeEstimate: 27100,
    howTo: [
      "Enter the destination website URL.",
      "Fill in source, medium and campaign (and optional term/content).",
      "Copy the generated tracking URL for your links.",
    ],
    faqs: [
      { q: "What do utm_source, utm_medium and utm_campaign mean?", a: "Source is where the traffic comes from (e.g. newsletter), medium is the channel type (e.g. email, cpc, social), and campaign is the specific promotion name (e.g. spring_sale)." },
      { q: "Should UTM values be lowercase?", a: "Yes. Analytics treats Email and email as different values, so sticking to lowercase with consistent naming prevents your campaign data from splitting." },
      { q: "Do UTM parameters affect SEO?", a: "Not negatively for the destination page, but avoid putting UTM links in internal navigation — use them for outbound campaign links so analytics stays accurate." },
    ],
    related: ["query-string-parser", "url-encode-decode", "meta-tag-generator"],
  },
  {
    slug: "meta-tag-generator",
    category: "seo",
    name: "Meta Tag Generator",
    h1: "Meta Tag Generator",
    tagline: "Generate SEO, Open Graph and Twitter meta tags for your page.",
    title: "Meta Tag Generator — SEO, Open Graph & Twitter Tags",
    description:
      "Free meta tag generator. Create title, description, canonical, Open Graph and Twitter Card tags from simple inputs, with length warnings. Copy ready for your <head>.",
    intro:
      "Fill in your page title, description, URL and social image to generate a complete set of meta tags — SEO basics, Open Graph for Facebook/LinkedIn and Twitter Card tags — ready to paste into your page's <head>. Live character counters warn you when titles or descriptions exceed what search results display. Runs in your browser.",
    keywords: ["meta tag generator", "open graph generator", "seo meta tags generator", "og tags generator"],
    component: "meta-tag-generator",
    volumeEstimate: 18100,
    howTo: [
      "Enter the title, description, canonical URL and social image URL.",
      "Toggle Twitter Card tags on or off.",
      "Copy the generated tags into your page's <head>.",
    ],
    faqs: [
      { q: "What is the ideal meta title and description length?", a: "Aim for under about 60 characters for the title and 160 for the description, so search engines don't truncate them. The counters turn red past those limits." },
      { q: "What are Open Graph tags for?", a: "Open Graph (og:) tags control how your page looks when shared on Facebook, LinkedIn and other platforms — the title, description and preview image." },
      { q: "Do I need both Open Graph and Twitter tags?", a: "Twitter falls back to Open Graph if Twitter tags are missing, but adding twitter:card gives you a large-image preview and more control on X/Twitter." },
    ],
    related: ["robots-txt-generator", "utm-builder", "keyword-density-checker"],
  },
];
