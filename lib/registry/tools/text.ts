import type { Tool } from "../types";

export const textTools: Tool[] = [
  {
    slug: "word-counter",
    category: "text",
    name: "Word Counter",
    h1: "Word Counter",
    tagline: "Count words, characters, sentences and reading time as you type.",
    title: "Word Counter — Free Online Word & Character Count Tool",
    description:
      "Free online word counter. Instantly count words, characters, sentences, paragraphs and estimated reading time. No signup, works in your browser.",
    intro:
      "Paste or type your text to instantly see the word count, character count (with and without spaces), sentences, paragraphs and an estimated reading time. Everything is calculated locally — your text never leaves your device.",
    keywords: ["word counter", "character counter", "word count tool", "count words online"],
    component: "word-counter",
    volumeEstimate: 1220000,
    howTo: [
      "Paste or type your text into the box.",
      "The counts update live as you type — no button needed.",
      "Use the stats for essays, SEO meta limits, tweets or assignments.",
    ],
    faqs: [
      { q: "Does the word counter count characters with spaces?", a: "Yes. It shows characters both including and excluding spaces, so you can match limits like Twitter (280) or meta descriptions (~160) precisely." },
      { q: "How is reading time estimated?", a: "Reading time uses an average of 200 words per minute, a common silent-reading speed. Divide your word count by 200 to sanity-check it." },
      { q: "Is my text stored or sent anywhere?", a: "No. All counting happens in your browser with JavaScript. Nothing is uploaded to a server." },
    ],
    related: ["character-counter", "remove-duplicate-lines", "case-converter", "keyword-density-checker"],
  },
  {
    slug: "case-converter",
    category: "text",
    name: "Case Converter",
    h1: "Case Converter",
    tagline: "Convert text to UPPERCASE, lowercase, Title Case or Sentence case.",
    title: "Case Converter — UPPERCASE, lowercase & Title Case Tool",
    description:
      "Free case converter. Change text to uppercase, lowercase, title case, sentence case or capitalize each word instantly. Copy with one click.",
    intro:
      "Switch your text between UPPERCASE, lowercase, Title Case, Sentence case and capitalized formats in one click. Useful for headlines, code, data cleanup and fixing accidental caps-lock.",
    keywords: ["case converter", "uppercase to lowercase", "title case converter", "text case changer"],
    component: "case-converter",
    volumeEstimate: 90500,
    howTo: [
      "Type or paste your text into the input box.",
      "Click the case you want: UPPERCASE, lowercase, Title Case or Sentence case.",
      "Copy the converted result with the Copy button.",
    ],
    faqs: [
      { q: "What is the difference between Title Case and Sentence case?", a: "Title Case capitalizes the first letter of every word (Great For Headlines). Sentence case only capitalizes the first letter of each sentence, like normal prose." },
      { q: "Will it fix my CAPS LOCK mistake?", a: "Yes — paste the shouty text and choose lowercase or Sentence case to instantly fix it." },
    ],
    related: ["word-counter", "remove-duplicate-lines", "slug-generator"],
  },
  {
    slug: "remove-duplicate-lines",
    category: "text",
    name: "Remove Duplicate Lines",
    h1: "Remove Duplicate Lines",
    tagline: "Delete repeated lines from any list, instantly and in order.",
    title: "Remove Duplicate Lines — Free Online Dedupe Tool",
    description:
      "Free tool to remove duplicate lines from a list. Keep order, ignore case or trim whitespace, then copy the clean result. No signup.",
    intro:
      "Paste a list and remove repeated lines while keeping the original order. Great for cleaning email lists, keywords, CSV columns or any line-separated data. Options let you ignore case and trim surrounding spaces.",
    keywords: ["remove duplicate lines", "delete duplicate lines", "dedupe list online", "remove repeated lines"],
    component: "remove-duplicate-lines",
    volumeEstimate: 480,
    howTo: [
      "Paste your line-separated list into the box.",
      "Toggle 'ignore case' or 'trim whitespace' if needed.",
      "The deduplicated list appears instantly — copy it out.",
    ],
    faqs: [
      { q: "Does it keep the original order of lines?", a: "Yes. The first occurrence of each line is kept in its original position; later duplicates are removed." },
      { q: "Can it ignore upper/lowercase differences?", a: "Enable 'ignore case' and lines like 'Apple' and 'apple' will be treated as duplicates." },
    ],
    related: ["word-counter", "case-converter", "slug-generator"],
  },
  {
    slug: "slug-generator",
    category: "text",
    name: "Slug Generator",
    h1: "URL Slug Generator",
    tagline: "Turn any title into a clean, SEO-friendly URL slug.",
    title: "Slug Generator — Free SEO-Friendly URL Slug Tool",
    description:
      "Free URL slug generator. Convert titles into clean, lowercase, hyphenated, SEO-friendly slugs. Removes accents and special characters instantly.",
    intro:
      "Convert a page title or heading into a clean URL slug: lowercase, hyphen-separated, with accents and special characters stripped. Perfect for blog posts, product pages and CMS entries.",
    keywords: ["slug generator", "url slug generator", "seo slug tool", "permalink generator"],
    component: "slug-generator",
    volumeEstimate: 1900,
    howTo: [
      "Type or paste your title into the input.",
      "The slug updates live, lowercased and hyphenated.",
      "Copy the slug into your CMS or code.",
    ],
    faqs: [
      { q: "What makes a good URL slug for SEO?", a: "Short, lowercase, hyphen-separated, and descriptive with your main keyword. Avoid stop words, dates and special characters where possible." },
      { q: "Does it handle accented characters?", a: "Yes — accented letters like é or ü are converted to their closest ASCII equivalent (e, u) so the slug stays URL-safe." },
    ],
    related: ["case-converter", "word-counter", "keyword-density-checker"],
  },
  {
    slug: "reverse-text",
    category: "text",
    name: "Reverse Text",
    h1: "Reverse Text Generator",
    tagline: "Flip text backwards by characters, words or lines.",
    title: "Reverse Text — Free Online Backwards Text Generator",
    description:
      "Free reverse text tool. Flip any text backwards by characters, reverse word order, or reverse line order instantly. Copy with one click.",
    intro:
      "Reverse any text three ways: flip the characters backwards, reverse the order of words, or reverse the order of lines. Useful for puzzles, mirror text and quick data flips.",
    keywords: ["reverse text", "backwards text generator", "reverse words", "flip text"],
    component: "reverse-text",
    volumeEstimate: 8100,
    howTo: ["Type or paste your text.", "Pick reverse by characters, words or lines.", "Copy the reversed result."],
    faqs: [
      { q: "What's the difference between reversing characters and words?", a: "Reversing characters flips the whole string letter-by-letter ('abc' → 'cba'). Reversing words keeps each word intact but flips their order ('one two' → 'two one')." },
      { q: "Does it work with emojis?", a: "Yes — character reversal is emoji-aware, so multi-byte characters won't be split or corrupted." },
    ],
    related: ["case-converter", "remove-line-breaks", "word-counter"],
  },
  {
    slug: "remove-line-breaks",
    category: "text",
    name: "Remove Line Breaks",
    h1: "Remove Line Breaks",
    tagline: "Strip line breaks and join text into a single clean block.",
    title: "Remove Line Breaks — Free Online Tool to Delete Breaks",
    description:
      "Free tool to remove line breaks from text. Join broken lines into one block, replace breaks with spaces and collapse extra spaces. Copy instantly.",
    intro:
      "Paste text with unwanted line breaks (often from PDFs or emails) and join it into a clean single block. Optionally replace breaks with spaces and collapse double spaces.",
    keywords: ["remove line breaks", "delete line breaks", "remove paragraph breaks", "join lines online"],
    component: "remove-line-breaks",
    volumeEstimate: 2900,
    howTo: ["Paste your text.", "Choose whether breaks become spaces and whether to collapse extra spaces.", "Copy the cleaned text."],
    faqs: [
      { q: "Why does pasted text have weird line breaks?", a: "Copying from PDFs, emails or fixed-width sources adds a line break at the end of every visual line. This tool removes those so the text reflows naturally." },
      { q: "Will it keep paragraph spacing?", a: "It joins all lines; if you need paragraphs preserved, paste and clean one paragraph at a time." },
    ],
    related: ["remove-duplicate-lines", "reverse-text", "word-counter"],
  },
  {
    slug: "text-repeater",
    category: "text",
    name: "Text Repeater",
    h1: "Text Repeater",
    tagline: "Repeat any text or word as many times as you want.",
    title: "Text Repeater — Free Online Repeat Text Generator",
    description:
      "Free text repeater. Repeat a word or phrase any number of times with your choice of separator (new line, space or none). Copy the result instantly.",
    intro:
      "Repeat a word or phrase as many times as you need, separated by a new line, a space, or nothing at all. Handy for testing, filler content and bulk lists.",
    keywords: ["text repeater", "repeat text", "repeat word generator", "copy paste repeat"],
    component: "text-repeater",
    volumeEstimate: 823000,
    howTo: ["Enter the text to repeat.", "Set how many times and pick a separator.", "Copy the repeated output."],
    faqs: [
      { q: "Is there a limit to how many times I can repeat?", a: "You can repeat up to 10,000 times. Very large outputs may be slow to render in the browser." },
      { q: "Can I repeat on separate lines?", a: "Yes — choose the 'New line' separator to put each repetition on its own line." },
    ],
    related: ["lorem-ipsum", "reverse-text", "word-counter"],
  },
  {
    slug: "lorem-ipsum-generator",
    category: "text",
    name: "Lorem Ipsum Generator",
    h1: "Lorem Ipsum Generator",
    tagline: "Generate placeholder text in paragraphs, sentences or words.",
    title: "Lorem Ipsum Generator — Free Placeholder Text Tool",
    description:
      "Free Lorem Ipsum generator. Create placeholder dummy text by paragraphs, sentences or words for mockups and designs. Copy with one click.",
    intro:
      "Generate classic Lorem Ipsum placeholder text for mockups, layouts and design comps. Choose how many paragraphs, sentences or words you need.",
    keywords: ["lorem ipsum generator", "dummy text generator", "placeholder text", "filler text generator"],
    component: "lorem-ipsum",
    volumeEstimate: 49500,
    howTo: ["Choose a count and unit (paragraphs, sentences or words).", "Click Generate.", "Copy the placeholder text into your design."],
    faqs: [
      { q: "What is Lorem Ipsum?", a: "Lorem Ipsum is scrambled Latin-like placeholder text used since the 1500s to show how a layout looks with content before the real copy is ready." },
      { q: "Why use placeholder text instead of real content?", a: "It lets designers focus on layout and typography without being distracted by the meaning of real words." },
    ],
    related: ["text-repeater", "word-counter", "case-converter"],
  },
];
