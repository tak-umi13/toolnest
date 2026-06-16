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
  {
    slug: "faq-schema-generator",
    category: "seo",
    name: "FAQ Schema Generator",
    h1: "FAQ Schema Generator (JSON-LD)",
    tagline: "Turn questions and answers into valid FAQ structured data for rich results.",
    title: "FAQ Schema Generator — FAQPage JSON-LD for Rich Results",
    description:
      "Free FAQ schema generator. Enter questions and answers to produce valid FAQPage JSON-LD structured data you can paste into your page — eligible for FAQ rich results.",
    intro:
      "Add your questions and answers and get clean, valid FAQPage structured data (JSON-LD) ready to paste into your page. Marking up an on-page FAQ this way makes it eligible for FAQ rich results in Google. The matching Q&As must be visible on the page. Everything is generated in your browser.",
    keywords: ["faq schema generator", "faqpage json-ld", "faq structured data generator", "schema markup generator"],
    component: "faq-schema-generator",
    volumeEstimate: 1900,
    howTo: [
      "Add each question and its answer.",
      "Copy the generated JSON-LD.",
      "Paste it into the page where the same FAQ is visible.",
    ],
    faqs: [
      { q: "Where do I put the FAQ schema?", a: "Inside a <script type=\"application/ld+json\"> tag in the page's <head> or body. The questions and answers must also be visible on the page itself." },
      { q: "Will this guarantee FAQ rich results?", a: "No — valid schema makes a page eligible, but Google decides whether to show rich results. Follow Google's FAQ structured-data guidelines and use only genuine FAQs." },
    ],
    related: ["meta-tag-generator", "serp-simulator", "keyword-density-checker"],
  },
  {
    slug: "serp-simulator",
    category: "seo",
    name: "SERP Simulator",
    h1: "SERP Simulator — Google Snippet Preview",
    tagline: "Preview how your title and description appear in Google search results.",
    title: "SERP Simulator — Google Search Snippet Preview Tool",
    description:
      "Free SERP simulator. Preview how your page's title, URL and meta description appear in Google search results, with character limits and truncation warnings.",
    intro:
      "See how your page is likely to appear in Google's search results before you publish. Type your title tag, URL and meta description and the preview updates live, with character counts and warnings when a title (~60 chars) or description (~160 chars) will be cut off with an ellipsis. Google may rewrite snippets, so treat it as a guide. Runs in your browser.",
    keywords: ["serp simulator", "serp preview", "google snippet preview", "serp snippet generator"],
    component: "serp-simulator",
    volumeEstimate: 720,
    howTo: [
      "Enter your title tag, page URL and meta description.",
      "Watch the live Google-style preview and character counts.",
      "Trim anything flagged as too long to avoid truncation.",
    ],
    faqs: [
      { q: "How long should a title tag and meta description be?", a: "Aim for roughly 60 characters for the title and 160 for the description so they aren't truncated. Google actually measures pixel width, so very wide characters can be cut sooner." },
      { q: "Why might Google show a different title?", a: "Google sometimes rewrites titles and snippets using page content or the query. A clear, accurate title that matches the page reduces the chance of a rewrite." },
    ],
    related: ["meta-tag-generator", "faq-schema-generator", "keyword-density-checker"],
  },
  {
    slug: "canonical-tag-generator",
    category: "seo",
    name: "Canonical Tag Generator",
    h1: "Canonical Tag Generator",
    tagline: "Generate a rel=canonical link tag to prevent duplicate-content issues.",
    title: "Canonical Tag Generator — rel=canonical Link Tag",
    description:
      "Free canonical tag generator. Enter a URL to get a valid rel=canonical link tag for your page's <head>, preventing duplicate-content issues from URL variants.",
    intro:
      "Enter a page's absolute URL to get a ready-to-paste rel=canonical link tag. The canonical tag tells search engines which URL is the preferred version of a page, consolidating signals and avoiding duplicate-content problems caused by tracking parameters, www/non-www or trailing-slash variants. Runs in your browser.",
    keywords: ["canonical tag generator", "rel canonical generator", "canonical url tag", "canonical link generator"],
    component: "canonical-tag-generator",
    volumeEstimate: 720,
    howTo: [
      "Enter the page's full absolute URL.",
      "Copy the generated canonical tag.",
      "Paste it into that page's <head>.",
    ],
    faqs: [
      { q: "What is a canonical tag for?", a: "It marks the preferred (canonical) URL of a page so search engines consolidate ranking signals there instead of splitting them across duplicate or near-duplicate URLs." },
      { q: "Should a page point its canonical at itself?", a: "Usually yes. Most pages should have a self-referencing canonical with their own absolute URL; only point elsewhere when the page is genuinely a duplicate of another." },
    ],
    related: ["hreflang-tag-generator", "robots-txt-generator", "meta-tag-generator"],
  },
  {
    slug: "hreflang-tag-generator",
    category: "seo",
    name: "Hreflang Tag Generator",
    h1: "Hreflang Tag Generator",
    tagline: "Generate hreflang tags for multilingual and multi-region pages.",
    title: "Hreflang Tag Generator — Multilingual SEO Tags",
    description:
      "Free hreflang tag generator. Create rel=alternate hreflang link tags for each language/region version of a page, plus x-default, for international SEO.",
    intro:
      "Generate hreflang link tags that tell search engines which language or region version of a page to show each user. Add each version's hreflang code and URL, optionally set an x-default fallback, and copy the tags into the <head> of every version. Correct hreflang prevents the wrong-language page ranking in a given country. Runs in your browser.",
    keywords: ["hreflang tag generator", "hreflang generator", "hreflang tags", "international seo tags"],
    component: "hreflang-tag-generator",
    volumeEstimate: 480,
    howTo: [
      "Add each language/region version with its hreflang code and URL.",
      "Optionally set an x-default fallback URL.",
      "Copy the tags into the <head> of every version.",
    ],
    faqs: [
      { q: "What format are hreflang codes?", a: "An ISO 639-1 language code (e.g. en, fr, de), optionally with an ISO 3166-1 region (e.g. en-gb, en-us, pt-br). Use language only when the page targets a language regardless of country." },
      { q: "Do all versions need the tags?", a: "Yes. hreflang must be reciprocal — every version should list all versions including itself, otherwise search engines may ignore the annotations." },
      { q: "What is x-default?", a: "x-default specifies the fallback page for users whose language/region you don't explicitly target — often a language selector or your main international page." },
    ],
    related: ["canonical-tag-generator", "meta-tag-generator", "robots-txt-generator"],
  },
];
