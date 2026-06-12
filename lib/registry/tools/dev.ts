import type { Tool } from "../types";

export const devTools: Tool[] = [
  {
    slug: "json-formatter",
    category: "dev",
    name: "JSON Formatter",
    h1: "JSON Formatter & Validator",
    tagline: "Beautify, minify and validate JSON instantly in your browser.",
    title: "JSON Formatter & Validator — Free Online Beautify Tool",
    description:
      "Free JSON formatter and validator. Beautify (pretty-print), minify and validate JSON online. Clear error messages, no signup, fully private.",
    intro:
      "Paste messy JSON to pretty-print it with proper indentation, or minify it to a single line. Invalid JSON gets a clear error message pointing at the problem. Parsing happens entirely in your browser, so your data stays private.",
    keywords: ["json formatter", "json beautifier", "json validator", "format json online", "json prettifier"],
    component: "json-formatter",
    volumeEstimate: 246000,
    howTo: [
      "Paste your JSON into the input box.",
      "Choose an indent size, then click Beautify or Minify.",
      "If the JSON is invalid, read the error message and fix the highlighted issue.",
      "Copy the formatted output.",
    ],
    faqs: [
      { q: "Is my JSON sent to a server?", a: "No. Formatting and validation run locally using the browser's built-in JSON parser. Nothing is uploaded." },
      { q: "Why does it say my JSON is invalid?", a: "Common causes are trailing commas, single quotes instead of double quotes, or missing brackets. The error message includes the position to help you locate it." },
      { q: "What is the difference between beautify and minify?", a: "Beautify adds indentation and line breaks for readability; minify strips all unnecessary whitespace to make the JSON as small as possible for transport." },
    ],
    related: ["base64", "uuid-generator"],
  },
  {
    slug: "base64",
    category: "dev",
    name: "Base64 Encoder / Decoder",
    h1: "Base64 Encode & Decode",
    tagline: "Encode text to Base64 or decode Base64 back to text instantly.",
    title: "Base64 Encoder & Decoder — Free Online Tool",
    description:
      "Free Base64 encoder and decoder. Convert text to Base64 and decode Base64 to text instantly. UTF-8 safe, browser-based, no signup.",
    intro:
      "Encode any text or string to Base64, or decode a Base64 string back to readable text. The tool is UTF-8 safe, so emojis and non-English characters round-trip correctly. Everything runs in your browser.",
    keywords: ["base64 encode", "base64 decode", "base64 encoder", "base64 decoder online"],
    component: "base64",
    volumeEstimate: 18100,
    howTo: [
      "Paste your text or Base64 string into the input.",
      "Click Encode to convert text to Base64, or Decode to reverse it.",
      "Copy the result.",
    ],
    faqs: [
      { q: "Is Base64 encryption?", a: "No. Base64 is an encoding, not encryption — anyone can decode it. Never use it to protect secrets; use it to safely transport binary or text data in text-only systems." },
      { q: "Does it support emojis and non-ASCII text?", a: "Yes. The tool encodes via UTF-8 so characters like é, 日本語 and 😀 encode and decode without corruption." },
    ],
    related: ["json-formatter", "uuid-generator"],
  },
  {
    slug: "uuid-generator",
    category: "dev",
    name: "UUID Generator",
    h1: "UUID Generator (v4)",
    tagline: "Generate random RFC-4122 version-4 UUIDs in bulk.",
    title: "UUID Generator — Free Online v4 UUID / GUID Tool",
    description:
      "Free UUID generator. Create random RFC-4122 version-4 UUIDs (GUIDs) one or many at a time. Cryptographically random, copy with one click.",
    intro:
      "Generate cryptographically random version-4 UUIDs (also called GUIDs) one at a time or in bulk. Useful for database keys, request IDs and test data. Generation uses the browser's secure crypto API.",
    keywords: ["uuid generator", "guid generator", "generate uuid", "random uuid v4"],
    component: "uuid-generator",
    volumeEstimate: 22200,
    howTo: [
      "Choose how many UUIDs you need.",
      "Click Generate.",
      "Copy a single UUID or the whole list.",
    ],
    faqs: [
      { q: "Are these UUIDs unique?", a: "Version-4 UUIDs are random 122-bit values. The chance of a collision is astronomically small, so for practical purposes they are unique." },
      { q: "Are they cryptographically secure?", a: "Yes — generation uses crypto.randomUUID() / crypto.getRandomValues() in your browser, which is a cryptographically secure random source." },
    ],
    related: ["json-formatter", "base64"],
  },
  {
    slug: "url-encode-decode",
    category: "dev",
    name: "URL Encoder / Decoder",
    h1: "URL Encode & Decode",
    tagline: "Percent-encode text for URLs or decode it back to plain text.",
    title: "URL Encoder & Decoder — Free Online Percent-Encoding Tool",
    description:
      "Free URL encoder and decoder. Percent-encode text for safe use in URLs and query strings, or decode encoded URLs back to readable text.",
    intro:
      "Encode text so it's safe to put in a URL or query string (spaces become %20, and so on), or decode a percent-encoded URL back to readable text. Runs entirely in your browser.",
    keywords: ["url encode", "url decode", "url encoder", "percent encoding", "urlencode online"],
    component: "url-encode-decode",
    volumeEstimate: 18100,
    howTo: ["Paste your text or encoded URL.", "Click Encode or Decode.", "Copy the result."],
    faqs: [
      { q: "When do I need URL encoding?", a: "Whenever a value in a URL contains spaces or special characters like &, ?, = or /. Encoding prevents them from breaking the URL structure." },
      { q: "What's the difference from Base64?", a: "URL encoding keeps text mostly readable and only escapes unsafe characters; Base64 turns everything into an opaque ASCII blob. They solve different problems." },
    ],
    related: ["base64", "json-formatter"],
  },
  {
    slug: "jwt-decoder",
    category: "dev",
    name: "JWT Decoder",
    h1: "JWT Decoder",
    tagline: "Decode a JWT to inspect its header and payload claims.",
    title: "JWT Decoder — Free Online JSON Web Token Decoder",
    description:
      "Free JWT decoder. Paste a JSON Web Token to view its decoded header and payload claims instantly. Runs locally — your token never leaves your browser.",
    intro:
      "Paste a JSON Web Token (JWT) to decode and pretty-print its header and payload. Decoding happens entirely in your browser, so your token is never sent anywhere. Note: the signature is not verified.",
    keywords: ["jwt decoder", "decode jwt", "json web token decoder", "jwt parser"],
    component: "jwt-decoder",
    volumeEstimate: 27100,
    howTo: ["Paste your JWT.", "Read the decoded header and payload.", "Copy the payload if you need it."],
    faqs: [
      { q: "Is it safe to paste my JWT here?", a: "Decoding runs locally in your browser and the token is never uploaded. Still, avoid pasting production tokens that contain sensitive data on any website." },
      { q: "Does this verify the JWT signature?", a: "No. It only decodes the contents. Signature verification needs the secret/public key and must be done server-side." },
    ],
    related: ["base64", "json-formatter"],
  },
  {
    slug: "hash-generator",
    category: "dev",
    name: "Hash Generator",
    h1: "Hash Generator (SHA-256, SHA-1, SHA-512)",
    tagline: "Generate SHA-256, SHA-1, SHA-384 and SHA-512 hashes of text.",
    title: "Hash Generator — Free Online SHA-256 / SHA-512 Tool",
    description:
      "Free hash generator. Create SHA-256, SHA-1, SHA-384 or SHA-512 hashes of any text instantly in your browser using the Web Crypto API.",
    intro:
      "Generate a cryptographic hash (SHA-256, SHA-1, SHA-384 or SHA-512) of any text. Hashing uses the browser's built-in Web Crypto API, so input never leaves your device.",
    keywords: ["hash generator", "sha256 generator", "sha512 hash", "online hash tool"],
    component: "hash-generator",
    volumeEstimate: 1300,
    howTo: ["Paste the text to hash.", "Choose an algorithm (SHA-256 is the default).", "Generate and copy the hex hash."],
    faqs: [
      { q: "Why isn't MD5 available?", a: "The browser's Web Crypto API doesn't support MD5 (it's considered broken). SHA-256 is the recommended modern default." },
      { q: "Can I reverse a hash back to the text?", a: "No. Cryptographic hashes are one-way by design — you can't recover the original input from the hash." },
    ],
    related: ["base64", "uuid-generator"],
  },
  {
    slug: "timestamp-converter",
    category: "dev",
    name: "Unix Timestamp Converter",
    h1: "Unix Timestamp Converter",
    tagline: "Convert epoch timestamps to dates and dates back to epoch.",
    title: "Unix Timestamp Converter — Epoch to Date & Back (Free)",
    description:
      "Free Unix timestamp converter. Convert epoch (seconds or milliseconds) to a human date in UTC and local time, and convert any date back to a timestamp.",
    intro:
      "Convert a Unix/epoch timestamp into a human-readable date (UTC, ISO and your local time), or pick a date to get its epoch timestamp. Seconds vs milliseconds are auto-detected.",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "epoch to date"],
    component: "timestamp-converter",
    volumeEstimate: 8100,
    howTo: ["Paste a timestamp (or click Now) to see the date.", "Or pick a date to get its epoch value.", "Copy whichever value you need."],
    faqs: [
      { q: "What is a Unix timestamp?", a: "It's the number of seconds (or milliseconds) elapsed since 00:00:00 UTC on 1 January 1970, known as the Unix epoch." },
      { q: "How does it know seconds vs milliseconds?", a: "By length: 10-digit values are treated as seconds and 13-digit values as milliseconds, which covers current dates correctly." },
    ],
    related: ["number-base-converter", "json-formatter"],
  },
  {
    slug: "number-base-converter",
    category: "dev",
    name: "Number Base Converter",
    h1: "Number Base Converter",
    tagline: "Convert between binary, octal, decimal and hexadecimal.",
    title: "Number Base Converter — Binary, Hex, Octal, Decimal",
    description:
      "Free number base converter. Convert a value between binary, octal, decimal and hexadecimal instantly, with validation. Copy any result.",
    intro:
      "Enter a number in any base (binary, octal, decimal or hex) and instantly see it represented in all four. Invalid digits for the chosen base are flagged.",
    keywords: ["number base converter", "binary to decimal", "decimal to hex", "hex to binary"],
    component: "number-base-converter",
    volumeEstimate: 1900,
    howTo: ["Type your value.", "Select which base you entered it in.", "Read it in binary, octal, decimal and hex."],
    faqs: [
      { q: "Can it convert hex like FF or 0xFF?", a: "Yes. Pick Hex as the input base and enter FF (the optional 0x prefix is handled too) to get 255 in decimal." },
      { q: "Why is my input flagged invalid?", a: "It contains a digit that doesn't exist in the chosen base — e.g. the digit 2 isn't valid in binary, and G isn't valid in hex." },
    ],
    related: ["timestamp-converter", "base64"],
  },
  {
    slug: "regex-tester",
    category: "dev",
    name: "Regex Tester",
    h1: "Regex Tester (JavaScript)",
    tagline: "Test regular expressions against sample text with live matches.",
    title: "Regex Tester — Free Online Regular Expression Tool",
    description:
      "Free regex tester. Try JavaScript regular expressions against your text with live match results, group captures and clear error messages. Runs locally.",
    intro:
      "Type a pattern, set your flags and paste sample text — matches appear instantly with their positions and capture groups. Uses the JavaScript regex engine (the same flavor as browsers and Node.js), and your text never leaves the page.",
    keywords: ["regex tester", "regular expression tester", "test regex online", "javascript regex"],
    component: "regex-tester",
    volumeEstimate: 22200,
    howTo: [
      "Enter your regular expression pattern (without surrounding slashes).",
      "Set flags — g for all matches, i for case-insensitive, m for multiline.",
      "Paste test text and read the live match list with positions and groups.",
    ],
    faqs: [
      { q: "Which regex flavor does this use?", a: "JavaScript (ECMAScript) — the engine built into your browser, identical to Node.js. Most patterns port from PCRE, but lookbehind and some escapes can differ in older environments." },
      { q: "Why does my pattern say invalid?", a: "Common causes: an unescaped special character (., *, +, ?, (, ), [ need a backslash to match literally), an unclosed group or character class, or an invalid flag combination." },
      { q: "What do the g, i and m flags do?", a: "g finds every match instead of just the first; i ignores letter case; m makes ^ and $ match at each line break instead of only the start and end of the whole string." },
    ],
    related: ["json-formatter", "url-encode-decode", "remove-duplicate-lines"],
  },
  {
    slug: "password-generator",
    category: "dev",
    name: "Password Generator",
    h1: "Strong Password Generator",
    tagline: "Generate cryptographically random passwords with one click.",
    title: "Password Generator — Strong Random Passwords Online",
    description:
      "Free strong password generator. Create cryptographically random passwords with custom length and character sets, fully in your browser — nothing stored or sent.",
    intro:
      "Generate strong, random passwords using your browser's cryptographic random source. Choose the length and character sets, see the entropy estimate, and copy with one click. Nothing is transmitted or saved — generation happens entirely on your device.",
    keywords: ["password generator", "strong password generator", "random password", "secure password generator"],
    component: "password-generator",
    volumeEstimate: 246000,
    howTo: [
      "Choose a length (16+ recommended) and which character sets to include.",
      "Click Regenerate until you have one you like.",
      "Copy it straight into your password manager.",
    ],
    faqs: [
      { q: "Is this generator actually random?", a: "Yes — it uses crypto.getRandomValues(), your browser's cryptographically secure random source, not the predictable Math.random()." },
      { q: "How long should a password be?", a: "16 characters with mixed sets (~95+ bits of entropy) is a strong default for accounts; use longer for anything critical. Length beats complexity tricks." },
      { q: "Is it safe to generate passwords on a website?", a: "Here, yes: generation runs locally in your browser and nothing is sent or stored. Still, the safest home for any password is a password manager, not a notes app." },
    ],
    related: ["uuid-generator", "hash-generator", "base64"],
  },
  {
    slug: "html-entity-encoder",
    category: "dev",
    name: "HTML Entity Encoder / Decoder",
    h1: "HTML Entity Encode & Decode",
    tagline: "Escape HTML special characters or decode entities back to text.",
    title: "HTML Entity Encoder & Decoder — Free Online Tool",
    description:
      "Free HTML entity tool. Escape &, <, >, quotes for safe embedding in HTML, or decode named and numeric entities back to plain text instantly.",
    intro:
      "Encode text so it displays literally inside HTML (turning < into &lt; and so on), or decode a string full of entities back into readable text. Handles named and numeric entities, entirely in your browser.",
    keywords: ["html entity decoder", "html encode", "html escape", "html entities converter"],
    component: "html-entities",
    volumeEstimate: 140,
    howTo: [
      "Paste your text or entity-encoded HTML.",
      "Click Encode to escape special characters, or Decode to convert entities back.",
      "Copy the result.",
    ],
    faqs: [
      { q: "Which characters need escaping in HTML?", a: "The five with special meaning: & (&amp;), < (&lt;), > (&gt;), double quote (&quot;) and single quote (&#39;). Escaping them prevents text from being parsed as markup — the basis of XSS prevention." },
      { q: "Does decoding handle numeric entities like &#8364;?", a: "Yes — both named entities (&euro;) and numeric forms (decimal &#8364; or hex &#x20AC;) decode correctly." },
    ],
    related: ["url-encode-decode", "base64", "json-formatter"],
  },
];
