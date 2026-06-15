import type { Tool } from "../types";

// Generators category — validated across US/UK/CA/AU/IN (DataForSEO batch 10).
// Barcode is the standout (IN 1.5M / KD 11). All run client-side.
export const generatorsTools: Tool[] = [
  {
    slug: "barcode-generator",
    category: "generators",
    name: "Barcode Generator",
    h1: "Barcode Generator",
    tagline: "Create scannable barcodes (CODE128, EAN, UPC) and download as PNG.",
    title: "Barcode Generator — Free CODE128, EAN & UPC Online",
    description:
      "Free barcode generator. Create real, scannable barcodes in CODE128, EAN-13, UPC, CODE39 and more, then download them as PNG. Runs in your browser — nothing uploaded.",
    intro:
      "Generate a real, scannable barcode from any text or numbers. Choose the format — CODE128 (letters and numbers), EAN-13 and UPC (retail products), CODE39 and others — toggle the caption, and download the result as a PNG. Everything is rendered in your browser, so your data is never uploaded.",
    keywords: ["barcode generator", "free barcode generator", "code 128 generator", "ean barcode generator"],
    component: "barcode-generator",
    volumeEstimate: 1500000,
    howTo: [
      "Type the data to encode.",
      "Pick a barcode format (CODE128 works for most text).",
      "Download the barcode as a PNG.",
    ],
    faqs: [
      { q: "Which barcode format should I use?", a: "CODE128 is the best default — it encodes letters, numbers and symbols. Use EAN-13 or UPC for retail products (they need a specific number of digits), and CODE39 for some industrial or ID uses." },
      { q: "Are the barcodes scannable?", a: "Yes. They're generated to spec and scan with standard barcode readers and phone apps. Download the PNG at full size and print without scaling for best results." },
      { q: "Why does my value show an error?", a: "Each format has rules — EAN-13 needs 12–13 digits, UPC needs 11–12 digits, and numeric-only formats reject letters. Switch to CODE128 if you need free-form text." },
    ],
    related: ["username-generator", "uuid-generator", "random-list-generator"],
  },
  {
    slug: "username-generator",
    category: "generators",
    name: "Username Generator",
    h1: "Username Generator",
    tagline: "Generate unique, memorable usernames in different styles.",
    title: "Username Generator — Unique & Cool Username Ideas",
    description:
      "Free username generator. Create memorable, unique usernames from adjectives and nouns in CamelCase, lowercase or snake_case, with optional numbers. Copy the list.",
    intro:
      "Generate memorable usernames built from an adjective and a noun, with an optional number on the end. Pick the style — CamelCase, lowercase or snake_case — and generate up to 100 ideas at once. Great for gaming, social media, email and sign-ups. Always check availability on the platform you want. Runs in your browser.",
    keywords: ["username generator", "username ideas", "cool username generator", "random username generator"],
    component: "username-generator",
    volumeEstimate: 90500,
    howTo: [
      "Pick a style and how many you want.",
      "Toggle whether to append a number.",
      "Generate and copy the usernames you like.",
    ],
    faqs: [
      { q: "Are the usernames available?", a: "We can't check availability — every site has its own taken list. Generate a batch and try your favourites on the platform you're signing up for." },
      { q: "Can I make them more unique?", a: "Turn on 'Append a number' and generate several batches. Adding digits greatly increases the chance a username is still free." },
    ],
    related: ["random-word-generator", "barcode-generator", "password-generator"],
  },
  {
    slug: "random-word-generator",
    category: "generators",
    name: "Random Word Generator",
    h1: "Random Word Generator",
    tagline: "Generate random words for games, brainstorming and prompts.",
    title: "Random Word Generator — Free Random Words Online",
    description:
      "Free random word generator. Generate random common English words for word games, brainstorming, writing prompts, passphrases and naming. Copy the list instantly.",
    intro:
      "Generate random common English words — one or many at a time, optionally capitalised. Useful for word games like Pictionary and charades, brainstorming and creativity exercises, writing prompts, memorable passphrases and naming. Click again for a fresh set. Runs in your browser.",
    keywords: ["random word generator", "random words", "word generator", "random word picker"],
    component: "random-word-generator",
    volumeEstimate: 135000,
    howTo: [
      "Choose how many words you want.",
      "Toggle capitalisation if needed.",
      "Generate and copy the words.",
    ],
    faqs: [
      { q: "What are random words good for?", a: "Word games (Pictionary, charades, Scattergories), brainstorming and lateral-thinking exercises, writing prompts, naming projects, and building memorable passphrases from several words." },
      { q: "How are the words chosen?", a: "Each word is picked at random from a curated pool of common English words, so results are easy to read and use." },
    ],
    related: ["username-generator", "random-letter-generator", "random-list-generator"],
  },
  {
    slug: "random-letter-generator",
    category: "generators",
    name: "Random Letter Generator",
    h1: "Random Letter Generator",
    tagline: "Generate random letters A–Z, with case and no-repeat options.",
    title: "Random Letter Generator — Random Letters A to Z",
    description:
      "Free random letter generator. Generate one or many random letters A–Z in uppercase, lowercase or mixed case, with an option for no repeats. Copy instantly.",
    intro:
      "Generate random letters from A to Z — a single letter or a whole sequence. Choose uppercase, lowercase or mixed case, and turn on 'no repeats' for a unique set. Handy for games, drawing or writing prompts, picking, and teaching the alphabet. Runs in your browser.",
    keywords: ["random letter generator", "random letter", "random letter picker", "pick a random letter"],
    component: "random-letter-generator",
    volumeEstimate: 40500,
    howTo: [
      "Choose how many letters and the case.",
      "Optionally turn on 'no repeats'.",
      "Generate and copy the letters.",
    ],
    faqs: [
      { q: "Can I get letters with no repeats?", a: "Yes — turn on 'no repeats' and the generator shuffles the alphabet and takes the number you ask for (up to 26 in a single case)." },
      { q: "What's it useful for?", a: "Word games, deciding a starting letter, drawing or writing prompts, random seating or grouping, and alphabet practice." },
    ],
    related: ["random-word-generator", "random-list-generator", "random-number-generator"],
  },
  {
    slug: "random-color-generator",
    category: "generators",
    name: "Random Color Generator",
    h1: "Random Color Generator",
    tagline: "Generate random hex colors and palettes, with one-click copy.",
    title: "Random Color Generator — Random HEX Colors & Palettes",
    description:
      "Free random color generator. Generate random hex colors and palettes for design, mockups, testing and inspiration, with one-click copy for each or all. Runs in your browser.",
    intro:
      "Generate random hex colors — a single color or a whole palette of up to 60 swatches. Each comes with its hex code and a one-click copy button, or copy them all at once. Great for design mockups, finding inspiration, generating test data and picking a color when you just need one. Runs in your browser.",
    keywords: ["random color generator", "random colour generator", "random hex color", "color palette generator"],
    component: "random-color-generator",
    volumeEstimate: 33100,
    howTo: [
      "Choose how many colors you want.",
      "Click Generate for a fresh set.",
      "Copy a single hex code or all of them.",
    ],
    faqs: [
      { q: "What format are the colors?", a: "Hex codes (like #3A8FD2), the standard format for web and design tools. You can paste them straight into CSS or a design app." },
      { q: "Can I get a matching palette?", a: "This tool produces fully random colors. For a coordinated set built from one base color, use the Color Shades Generator." },
    ],
    related: ["color-picker", "color-shades-generator", "hex-to-rgb"],
  },
  {
    slug: "random-list-generator",
    category: "generators",
    name: "Random List Picker",
    h1: "Random List Picker & Shuffler",
    tagline: "Pick random winners from a list, or shuffle it into a random order.",
    title: "Random List Picker — Pick Winners & Shuffle a List",
    description:
      "Free random list picker. Paste a list to pick random winners (raffles, giveaways) or shuffle the whole list into a fair random order. Unbiased Fisher–Yates. Runs in your browser.",
    intro:
      "Paste a list — names, entries, options — and either pick random winners or shuffle the whole list into a random order. Perfect for raffles and giveaways, deciding who goes first, assigning tasks or randomising any order. It uses an unbiased Fisher–Yates shuffle. Runs in your browser.",
    keywords: ["random list generator", "random picker", "random name picker", "list randomizer"],
    component: "random-list-generator",
    volumeEstimate: 14800,
    howTo: [
      "Paste your list, one item per line.",
      "Choose 'Pick winners' (and how many) or 'Shuffle all'.",
      "Read and copy the result.",
    ],
    faqs: [
      { q: "Is the pick fair?", a: "Yes. It uses a Fisher–Yates shuffle, which gives every item an equal chance — suitable for casual raffles, giveaways and decisions." },
      { q: "Can I pick more than one winner?", a: "Yes — choose 'Pick winners' and set how many. The tool returns that many distinct items from your list." },
    ],
    related: ["random-word-generator", "random-letter-generator", "random-number-generator"],
  },
];
