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
  {
    slug: "random-name-generator",
    category: "text",
    name: "Random Name Generator",
    h1: "Random Name Generator",
    tagline: "Generate random first and full names for testing, characters and more.",
    title: "Random Name Generator — Free Online Tool",
    description:
      "Free random name generator. Create random first or full names by gender, generate up to 100 at once, and copy them all. Great for test data, characters and signups.",
    intro:
      "Generate realistic random names instantly. Choose a gender (or any), pick first-name-only or full names, and generate up to 100 at a time. Copy the whole list with one click — handy for test data, sample users, character names and design mockups. Everything runs in your browser.",
    keywords: ["random name generator", "name generator", "random name picker", "fake name generator"],
    component: "random-name-generator",
    volumeEstimate: 201000,
    howTo: [
      "Choose a gender and the name style (first or full).",
      "Set how many names you want (up to 100).",
      "Click Generate, then copy the list.",
    ],
    faqs: [
      { q: "Are the names real people?", a: "No. Names are assembled randomly from common first- and last-name pools, so any resemblance to a real person is coincidental — ideal for test and sample data." },
      { q: "Can I generate many names at once?", a: "Yes. Generate up to 100 names per click and copy them all as a newline-separated list." },
    ],
    related: ["lorem-ipsum-generator", "slug-generator", "uuid-generator"],
  },
  {
    slug: "character-counter",
    category: "text",
    name: "Character Counter",
    h1: "Character Counter",
    tagline: "Count characters live and check against Twitter, SEO and SMS limits.",
    title: "Character Counter — Count Characters with Platform Limits",
    description:
      "Free character counter. Count characters, words and lines live, and see how many you have left for tweets, SMS, meta titles, meta descriptions and more.",
    intro:
      "Type or paste text to count characters (with and without spaces), words and lines in real time. Unlike a plain counter, it also shows how many characters you have left — or are over — for the limits that matter: X/Twitter posts, single SMS, SEO meta title and description, Instagram captions, LinkedIn headlines and YouTube titles. Everything runs in your browser.",
    keywords: ["character counter", "letter counter", "count characters online", "character count tool"],
    component: "character-counter",
    volumeEstimate: 246000,
    howTo: [
      "Type or paste your text into the box.",
      "Read the live character, word and line counts.",
      "Check the platform limit list to see how many characters remain.",
    ],
    faqs: [
      { q: "Does it count characters with or without spaces?", a: "Both. The counter shows characters including spaces and a separate count excluding spaces, so you can match whichever limit a platform uses." },
      { q: "Which platform limits are shown?", a: "X/Twitter (280), single SMS (160), SEO meta title (60), meta description (160), Instagram caption (2,200), Facebook post, LinkedIn headline (220) and YouTube title (100)." },
      { q: "Is my text uploaded anywhere?", a: "No. All counting runs locally in your browser with JavaScript — nothing is sent to a server." },
    ],
    related: ["word-counter", "title-case-converter", "remove-line-breaks"],
  },
  {
    slug: "text-diff-checker",
    category: "text",
    name: "Text Diff Checker",
    h1: "Text Diff Checker — Compare Two Texts",
    tagline: "Compare two blocks of text and highlight added and removed lines.",
    title: "Text Diff Checker — Compare Text & Find Differences Online",
    description:
      "Free text diff checker. Paste two versions of any text to see added and removed lines highlighted side by side. Runs in your browser — nothing uploaded.",
    intro:
      "Paste an original and a changed version of any text to see exactly what differs. A line-level diff aligns matching lines and highlights additions in green and deletions in red, so real changes stand out instead of being buried. Useful for comparing drafts, config files, code snippets, contracts and translations. Everything runs locally in your browser.",
    keywords: ["text diff checker", "compare text online", "text comparison tool", "find difference between two texts"],
    component: "text-diff-checker",
    volumeEstimate: 60500,
    howTo: [
      "Paste the original text in the left box.",
      "Paste the changed version in the right box.",
      "Read the diff: green lines were added, red lines were removed.",
    ],
    faqs: [
      { q: "How does the diff decide what changed?", a: "It uses a longest-common-subsequence algorithm to align unchanged lines first, then marks the remaining lines as added or removed — the same approach code-diff tools use, so inserts don't shift everything below them." },
      { q: "Can I compare code or config files?", a: "Yes. The diff is line-based and works on any plain text — code, JSON, CSV, contracts or prose." },
      { q: "Is my text sent to a server?", a: "No. The comparison runs entirely in your browser; neither version leaves your device." },
    ],
    related: ["remove-duplicate-lines", "word-counter", "find-and-replace"],
  },
  {
    slug: "sort-text-lines",
    category: "text",
    name: "Sort Text Lines",
    h1: "Sort Text Lines Alphabetically & Numerically",
    tagline: "Sort lines A–Z, numerically, by length, reverse or shuffle them.",
    title: "Sort Text Lines — Alphabetical & Numerical Line Sorter",
    description:
      "Free online line sorter. Sort text lines alphabetically, numerically, by length, reverse or shuffle them, with options to remove duplicates and empty lines.",
    intro:
      "Paste a list and sort the lines instantly: alphabetically (A–Z or Z–A), numerically, by length, in reverse, or shuffled randomly. Toggle case sensitivity, remove duplicate lines and strip empty lines in the same pass. Great for cleaning lists, keywords, names, CSV columns and any line-separated data — all in your browser.",
    keywords: ["sort text lines", "alphabetical order tool", "line sorter", "sort list alphabetically"],
    component: "sort-text-lines",
    volumeEstimate: 33100,
    howTo: [
      "Paste your line-separated list into the box.",
      "Pick a sort order: A–Z, numeric, by length, reverse or shuffle.",
      "Optionally remove duplicates or empty lines, then copy the result.",
    ],
    faqs: [
      { q: "Can it sort numbers correctly?", a: "Yes. The numeric sort reads the first number on each line, so '10' comes after '9' instead of before it as a plain text sort would do." },
      { q: "Does it remove duplicates while sorting?", a: "If you enable 'Remove duplicates', repeated lines are dropped (respecting the case-sensitivity setting) before the result is shown." },
      { q: "Is the random shuffle truly random?", a: "It uses a Fisher–Yates shuffle, which gives an unbiased random order. Click Shuffle again to re-roll." },
    ],
    related: ["remove-duplicate-lines", "remove-line-breaks", "word-counter"],
  },
  {
    slug: "find-and-replace",
    category: "text",
    name: "Find and Replace",
    h1: "Find and Replace Text Online",
    tagline: "Find and replace text in bulk, with case, whole-word and regex options.",
    title: "Find and Replace Text Online — Bulk Replace with Regex",
    description:
      "Free find and replace tool. Replace text in bulk with options for ignore case, whole word and regular expressions. Shows the match count. Runs in your browser.",
    intro:
      "Paste text and replace every occurrence of a word or pattern at once. Choose case-insensitive matching, whole-word only, or full regular expressions with capture groups in the replacement. The match count shows how many replacements were made. Useful for cleaning data, editing code and reformatting lists — all locally in your browser.",
    keywords: ["find and replace online", "replace text tool", "bulk find replace", "regex find and replace"],
    component: "find-and-replace",
    volumeEstimate: 14800,
    howTo: [
      "Paste your text into the box.",
      "Enter the text to find and what to replace it with.",
      "Toggle ignore case, whole word or regex, then copy the result.",
    ],
    faqs: [
      { q: "Does it support regular expressions?", a: "Yes. Enable Regex to use patterns like \\d+ or [A-Z], and reference capture groups as $1, $2 in the replacement field." },
      { q: "What does 'whole word' do?", a: "It only matches your term when it stands alone — so replacing 'cat' won't touch 'category'. It's available for plain (non-regex) searches." },
      { q: "Is my text uploaded?", a: "No. All find-and-replace runs in your browser; your text never leaves your device." },
    ],
    related: ["text-diff-checker", "remove-duplicate-lines", "case-converter"],
  },
  {
    slug: "word-frequency-counter",
    category: "text",
    name: "Word Frequency Counter",
    h1: "Word Frequency Counter",
    tagline: "Count how often each word appears, ranked most-common first.",
    title: "Word Frequency Counter — Count Word Occurrences Online",
    description:
      "Free word frequency counter. See how many times each word appears in your text, ranked by frequency, with options to ignore case and remove common stop words.",
    intro:
      "Paste text to see how often each word appears, ranked from most to least common with percentages. Ignore case, set a minimum word length, and remove common stop words (the, and, of…) to surface the meaningful keywords — handy for SEO content analysis, writing reviews and keyword research. Copy the full table as TSV. Everything runs in your browser.",
    keywords: ["word frequency counter", "word frequency analyzer", "count word occurrences", "most common words tool"],
    component: "word-frequency-counter",
    volumeEstimate: 9900,
    howTo: [
      "Paste your text into the box.",
      "Optionally remove common words or set a minimum word length.",
      "Read the ranked frequency table and copy it as a table.",
    ],
    faqs: [
      { q: "What are 'common words' / stop words?", a: "Stop words are high-frequency function words like 'the', 'and', 'of' and 'to' that carry little topical meaning. Removing them highlights the words your text is actually about." },
      { q: "How is the percentage calculated?", a: "Each word's count is divided by the total number of counted words (after any filters you apply), so the percentages reflect the filtered set." },
      { q: "Is there a word limit?", a: "No hard limit — it handles long articles easily since all processing happens locally in your browser." },
    ],
    related: ["word-counter", "keyword-density-checker", "character-counter"],
  },
  {
    slug: "title-case-converter",
    category: "text",
    name: "Title Case Converter",
    h1: "Title Case Converter",
    tagline: "Convert headlines to proper title case with correct small-word rules.",
    title: "Title Case Converter — Capitalize Titles Correctly Online",
    description:
      "Free title case converter. Capitalize headlines properly — small words like a, the, of and and stay lowercase unless first or last. Also UPPERCASE, lowercase and sentence case.",
    intro:
      "Convert headlines and titles to proper title case, where small words (a, an, the, of, and, to…) stay lowercase unless they begin or end the line — the rule plain 'capitalize each word' tools get wrong. Switch between Title Case, Sentence case, UPPERCASE and lowercase in one click. Ideal for article headlines, book and song titles, and headings. Runs in your browser.",
    keywords: ["title case converter", "capitalize title", "title case generator", "headline capitalization tool"],
    component: "title-case-converter",
    volumeEstimate: 27100,
    howTo: [
      "Type or paste your title into the box.",
      "Choose Title Case (or Sentence, UPPER, lower).",
      "Copy the correctly capitalized result.",
    ],
    faqs: [
      { q: "What is title case?", a: "Title case capitalizes the first letter of major words while keeping minor words — articles, short conjunctions and prepositions — lowercase, except when they are the first or last word of the title." },
      { q: "Which words stay lowercase?", a: "Short function words such as a, an, the, and, but, or, for, of, to, in, on, at, by and with — unless they fall at the start or end of the line, where they're always capitalized." },
      { q: "Does it handle multiple lines?", a: "Yes. Each line is treated as its own title, so the first and last word of every line is capitalized." },
    ],
    related: ["case-converter", "character-counter", "slug-generator"],
  },
  {
    slug: "emoji-remover",
    category: "text",
    name: "Emoji Remover",
    h1: "Emoji Remover",
    tagline: "Strip emoji and symbols from text — clean AI output, names and data.",
    title: "Emoji Remover — Remove Emoji from Text Online",
    description:
      "Free emoji remover. Strip emoji, flags and zero-width characters from any text, with options to tidy spaces and remove arrows and misc symbols. Runs in your browser.",
    intro:
      "Paste text to remove every emoji, flag and zero-width joiner in one pass, with optional cleanup of leftover double spaces and other decorative symbols. Useful for cleaning AI-generated copy, usernames, file names, spreadsheet data and anything you need in plain text. Everything runs in your browser.",
    keywords: ["emoji remover", "remove emoji from text", "strip emoji", "delete emoji online"],
    component: "emoji-remover",
    volumeEstimate: 5400,
    howTo: [
      "Paste the text containing emoji.",
      "Optionally tidy spaces or also remove arrows and symbols.",
      "Copy the cleaned, emoji-free text.",
    ],
    faqs: [
      { q: "Does it remove all emoji?", a: "Yes — it targets pictographic emoji, regional-indicator flags and the zero-width joiners that combine them, so multi-part emoji are removed cleanly without leftover fragments." },
      { q: "Will it remove normal punctuation?", a: "No. Letters, numbers and standard punctuation are kept. Only emoji (and, if you opt in, decorative arrows/symbols) are stripped." },
      { q: "Is my text uploaded?", a: "No. The cleanup runs entirely in your browser; nothing is sent to a server." },
    ],
    related: ["remove-line-breaks", "character-counter", "find-and-replace"],
  },
  {
    slug: "text-splitter",
    category: "text",
    name: "Text Splitter",
    h1: "Text Splitter — Split Text into Chunks",
    tagline: "Split long text into chunks by characters or words, breaking on spaces.",
    title: "Text Splitter — Split Long Text into Chunks Online",
    description:
      "Free text splitter. Break long text into numbered chunks by character or word limit, splitting on spaces so words stay whole. Ideal for chatbot and API context limits.",
    intro:
      "Paste a long document and split it into smaller chunks that fit a size limit — by character count or word count — breaking on whitespace so words aren't cut in half. Each chunk is numbered with its own copy button. Perfect for pasting long text into AI chatbots and APIs that have a context or character limit. Runs in your browser.",
    keywords: ["text splitter", "split text into chunks", "text chunker", "split long text"],
    component: "text-splitter",
    volumeEstimate: 1000,
    howTo: [
      "Paste your long text.",
      "Choose to split by characters or words and set the limit.",
      "Copy each numbered chunk in order.",
    ],
    faqs: [
      { q: "Does it cut words in half?", a: "No. It prefers to break on a space or line break near the limit, so words and (usually) sentences stay intact across chunks." },
      { q: "Why split text for AI chatbots?", a: "Chatbots and APIs accept only so much text at once. Splitting a long document into limit-sized chunks lets you feed it in sequentially without errors." },
      { q: "Character or word chunks — which should I use?", a: "Use characters to match a strict input limit, or words for a rough, more readable split. Tokens are roughly ¾ of a word, so leave headroom under a model's token limit." },
    ],
    related: ["character-counter", "word-counter", "token-counter"],
  },
];
