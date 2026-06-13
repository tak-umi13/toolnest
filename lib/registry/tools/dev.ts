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
  {
    slug: "json-to-csv",
    category: "dev",
    name: "JSON to CSV Converter",
    h1: "JSON to CSV Converter",
    tagline: "Turn a JSON array of objects into clean, spreadsheet-ready CSV.",
    title: "JSON to CSV Converter — Free Online Tool",
    description:
      "Free JSON to CSV converter. Paste a JSON array of objects and get clean CSV with a header row, proper quoting and escaping. Browser-based and private.",
    intro:
      "Paste a JSON array of objects to convert it into CSV with a header row built from the object keys. Commas, quotes and newlines inside values are escaped per RFC 4180, and nested values are JSON-encoded so nothing breaks in Excel or Google Sheets. Everything runs in your browser.",
    keywords: ["json to csv", "json to csv converter", "convert json to csv", "json array to csv"],
    component: "json-csv-converter",
    params: { direction: "json-to-csv" },
    volumeEstimate: 6600,
    howTo: [
      "Paste a JSON array of objects into the input box.",
      "Click Convert to CSV.",
      "Copy the CSV and open it in Excel or Google Sheets.",
    ],
    faqs: [
      { q: "What JSON shape does it expect?", a: "An array of objects, like [{\"name\":\"Ada\"},{\"name\":\"Linus\"}]. The CSV header is the union of all object keys." },
      { q: "How are commas and quotes handled?", a: "Any value containing a comma, double quote or line break is wrapped in quotes, with embedded quotes doubled — the standard CSV escaping rules (RFC 4180)." },
      { q: "Is my data uploaded?", a: "No. The conversion runs entirely in your browser; nothing is sent to a server." },
    ],
    related: ["csv-to-json", "json-formatter"],
  },
  {
    slug: "csv-to-json",
    category: "dev",
    name: "CSV to JSON Converter",
    h1: "CSV to JSON Converter",
    tagline: "Convert CSV (with a header row) into a clean JSON array of objects.",
    title: "CSV to JSON Converter — Free Online Tool",
    description:
      "Free CSV to JSON converter. Paste CSV with a header row and get a typed JSON array of objects. Handles quoted fields, commas and numbers. Private and browser-based.",
    intro:
      "Paste CSV where the first row is the header to get a JSON array of objects keyed by column name. Quoted fields, embedded commas and quoted newlines are parsed correctly, and obvious numbers and booleans are typed automatically. The conversion happens locally in your browser.",
    keywords: ["csv to json", "csv to json converter", "convert csv to json", "csv to json array"],
    component: "json-csv-converter",
    params: { direction: "csv-to-json" },
    volumeEstimate: 4400,
    howTo: [
      "Paste CSV with a header row into the input box.",
      "Click Convert to JSON.",
      "Copy the JSON array for your code or API.",
    ],
    faqs: [
      { q: "Does the first row need to be a header?", a: "Yes. The first CSV row becomes the object keys; each following row becomes one object." },
      { q: "Are numbers converted to real numbers?", a: "Yes. Cells that look like numbers or true/false are typed accordingly; everything else stays a string." },
      { q: "Does it handle quoted fields with commas?", a: "Yes. The parser honours double-quoted fields, escaped quotes (\"\") and newlines inside quotes." },
    ],
    related: ["json-to-csv", "json-formatter"],
  },
  {
    slug: "xml-formatter",
    category: "dev",
    name: "XML Formatter",
    h1: "XML Formatter & Beautifier",
    tagline: "Beautify or minify XML with proper indentation, validated in-browser.",
    title: "XML Formatter & Beautifier — Free Online Tool",
    description:
      "Free XML formatter. Pretty-print (beautify) or minify XML with clean indentation. Well-formedness is checked in your browser. No signup, fully private.",
    intro:
      "Paste messy XML to pretty-print it with consistent indentation, or minify it to a single line. The browser's XML parser checks that your document is well-formed and reports the first error if not. Everything runs locally — your data never leaves the page.",
    keywords: ["xml formatter", "xml beautifier", "format xml online", "xml pretty print", "xml validator"],
    component: "xml-formatter",
    volumeEstimate: 22200,
    howTo: [
      "Paste your XML into the input box.",
      "Choose an indent size, then click Beautify or Minify.",
      "If the XML is malformed, read the error and fix it.",
      "Copy the formatted output.",
    ],
    faqs: [
      { q: "Does it validate against a schema?", a: "It checks well-formedness (correct nesting and syntax), not validity against a DTD or XSD schema. Most formatting errors are well-formedness issues." },
      { q: "Is my XML sent anywhere?", a: "No. Parsing and formatting run entirely in your browser." },
    ],
    related: ["json-formatter", "sql-formatter", "html-entities"],
  },
  {
    slug: "sql-formatter",
    category: "dev",
    name: "SQL Formatter",
    h1: "SQL Formatter & Beautifier",
    tagline: "Format messy SQL into readable, indented queries instantly.",
    title: "SQL Formatter & Beautifier — Free Online Tool",
    description:
      "Free SQL formatter. Beautify and indent SQL queries with keywords on new lines and aligned columns. Works in your browser, no signup, nothing uploaded.",
    intro:
      "Paste a single-line or messy SQL query to format it with clause keywords (SELECT, FROM, WHERE, JOIN…) on their own lines and the column list indented for readability. Useful for code review, debugging and documentation. Formatting runs locally in your browser.",
    keywords: ["sql formatter", "sql beautifier", "format sql online", "sql pretty print"],
    component: "sql-formatter",
    volumeEstimate: 12100,
    howTo: [
      "Paste your SQL query into the input box.",
      "Choose an indent size and click Format SQL.",
      "Copy the formatted query.",
    ],
    faqs: [
      { q: "Which SQL dialects are supported?", a: "It formats standard clause keywords common to most dialects (MySQL, PostgreSQL, SQL Server, SQLite). It re-indents rather than rewriting your SQL, so dialect-specific syntax is preserved." },
      { q: "Does it change my query's meaning?", a: "No. It only adjusts whitespace and capitalises recognised keywords — the query logic is untouched." },
    ],
    related: ["json-formatter", "xml-formatter"],
  },
  {
    slug: "markdown-to-html",
    category: "dev",
    name: "Markdown to HTML Converter",
    h1: "Markdown to HTML Converter",
    tagline: "Convert Markdown to clean HTML with a live preview.",
    title: "Markdown to HTML Converter — Free Online Tool",
    description:
      "Free Markdown to HTML converter. Turn Markdown into clean, safe HTML with a live preview. Supports headings, lists, links, bold, italic, code and blockquotes.",
    intro:
      "Type or paste Markdown to get clean HTML and a live preview side by side. Supports headings, bold, italic, inline and fenced code, links, ordered and unordered lists, blockquotes and horizontal rules. Input is HTML-escaped first, so the output is safe to use. Runs entirely in your browser.",
    keywords: ["markdown to html", "markdown to html converter", "convert markdown to html", "md to html"],
    component: "markdown-to-html",
    volumeEstimate: 2400,
    howTo: [
      "Type or paste Markdown into the input box.",
      "Watch the HTML and live preview update as you type.",
      "Copy the HTML for your blog, CMS or email.",
    ],
    faqs: [
      { q: "Which Markdown features are supported?", a: "Headings, bold, italic, inline code, fenced code blocks, links, ordered/unordered lists, blockquotes and horizontal rules — the common CommonMark basics." },
      { q: "Is the HTML safe to paste?", a: "Yes. Your input is HTML-escaped before conversion, so raw HTML or scripts in the source are rendered as text, not executed." },
    ],
    related: ["html-entities", "json-formatter"],
  },
  {
    slug: "cron-expression-generator",
    category: "dev",
    name: "Cron Expression Generator",
    h1: "Cron Expression Generator",
    tagline: "Build and understand cron schedules with presets and a plain-English description.",
    title: "Cron Expression Generator — Free Online Tool",
    description:
      "Free cron expression generator. Build cron schedules from presets or fields and get a plain-English description. For crontab, CI pipelines and schedulers.",
    intro:
      "Create cron expressions without memorising the five-field syntax. Start from a preset (every 5 minutes, daily at 9am, every Monday…) or set each field, and read a plain-English description of when it runs. Copy the expression for crontab, CI pipelines, Kubernetes CronJobs and other schedulers.",
    keywords: ["cron expression generator", "cron generator", "crontab generator", "cron schedule generator"],
    component: "cron-expression-generator",
    volumeEstimate: 1600,
    howTo: [
      "Pick a preset, or set the minute, hour, day, month and weekday fields.",
      "Read the plain-English description to confirm the schedule.",
      "Copy the cron expression into your crontab or scheduler.",
    ],
    faqs: [
      { q: "What do the five fields mean?", a: "In order: minute (0–59), hour (0–23), day-of-month (1–31), month (1–12) and day-of-week (0–6, Sunday=0). An asterisk means 'every'." },
      { q: "What does */5 mean?", a: "A step value: */5 in the minute field means 'every 5 minutes'. The same /N syntax works in other fields." },
    ],
    related: ["timestamp-converter", "number-base-converter"],
  },
  {
    slug: "token-counter",
    category: "dev",
    name: "AI Token Counter",
    h1: "AI Token Counter — Estimate LLM Tokens & Cost",
    tagline: "Estimate how many tokens your prompt uses and what it costs.",
    title: "Token Counter — Estimate LLM Tokens & API Cost",
    description:
      "Free AI token counter. Paste text to estimate its token count for ChatGPT, Claude and other LLMs, plus the API cost at your model's price. Private, in-browser.",
    intro:
      "Paste a prompt, document or transcript to estimate its token count — the unit LLM APIs like OpenAI's and Anthropic's bill by — along with word and character counts. Enter your model's price per million tokens to see the estimated cost of the text. Estimates use the standard ~4-characters-per-token heuristic and run entirely in your browser, so your prompts stay private.",
    keywords: ["token counter", "ai token counter", "llm token counter", "token cost calculator", "chatgpt token counter"],
    component: "token-counter",
    volumeEstimate: 5400,
    updated: "2026-06-13",
    howTo: [
      "Paste your prompt or document into the box.",
      "Read the estimated tokens, words and characters.",
      "Optionally set your model's price per 1M input tokens to see the estimated cost.",
    ],
    faqs: [
      { q: "What is a token?", a: "The unit LLMs read and bill by — a chunk of characters produced by the model's tokenizer. In English, one token averages about 4 characters or ¾ of a word; 1,000 tokens is roughly 750 words." },
      { q: "How accurate is this estimate?", a: "Within roughly ±10–15% for typical English prose. Code, dense punctuation and non-Latin scripts use more tokens per character, so for billing-exact numbers use the provider's own tokenizer or token-count API." },
      { q: "Is my text uploaded anywhere?", a: "No. The estimate is computed locally in your browser — important when your prompts contain confidential material." },
    ],
    related: ["word-counter", "json-formatter", "case-converter"],
  },
  {
    slug: "json-to-typescript",
    category: "dev",
    name: "JSON to TypeScript",
    h1: "JSON to TypeScript Interface Generator",
    tagline: "Generate TypeScript interfaces from a JSON sample instantly.",
    title: "JSON to TypeScript — Generate Interfaces from JSON Online",
    description:
      "Free JSON to TypeScript converter. Paste a JSON sample to generate typed TypeScript interfaces, including nested objects and arrays. Copy the result instantly.",
    intro:
      "Paste a JSON object and get ready-to-use TypeScript interfaces, with nested objects extracted into their own named interfaces and arrays typed from their items. Saves you from hand-typing types for API responses and config files. Everything runs in your browser — your JSON is never uploaded.",
    keywords: ["json to typescript", "json to typescript interface", "generate typescript types from json", "json to ts"],
    component: "json-to-typescript",
    volumeEstimate: 22200,
    howTo: [
      "Paste a representative JSON sample.",
      "Optionally rename the root interface.",
      "Copy the generated TypeScript interfaces.",
    ],
    faqs: [
      { q: "How are nested objects handled?", a: "Each nested object becomes its own named interface, referenced from the parent — the idiomatic way to model structured data in TypeScript." },
      { q: "How are arrays typed?", a: "Arrays are typed from their first element, so [\"a\", \"b\"] becomes string[]. For arrays of objects, paste a sample whose first item has every field for the most complete type." },
      { q: "Is my JSON sent to a server?", a: "No. Parsing and type generation run entirely in your browser." },
    ],
    related: ["json-formatter", "json-to-csv", "json-escape"],
  },
  {
    slug: "css-minifier",
    category: "dev",
    name: "CSS Minifier",
    h1: "CSS Minifier",
    tagline: "Minify CSS by stripping comments and whitespace to shrink file size.",
    title: "CSS Minifier — Free Online CSS Compressor Tool",
    description:
      "Free CSS minifier. Remove comments and unnecessary whitespace to compress your stylesheet and reduce load time. Shows how much smaller it got. Copy instantly.",
    intro:
      "Paste your CSS to strip comments and collapse whitespace, producing a smaller file that loads faster. The tool reports the before/after size and the percentage saved, and keeps your rules intact — no renaming or risky restructuring. Runs entirely in your browser.",
    keywords: ["css minifier", "minify css", "css compressor", "css minify online"],
    component: "css-minifier",
    volumeEstimate: 33100,
    howTo: [
      "Paste your CSS into the box.",
      "Read the size saved and review the minified output.",
      "Copy the minified CSS into your build or stylesheet.",
    ],
    faqs: [
      { q: "Is minified CSS safe to use?", a: "Yes. This minifier only removes comments and redundant whitespace and tightens punctuation; it doesn't rename classes or reorder rules, so behaviour is unchanged." },
      { q: "How much smaller will my CSS get?", a: "Typically 10–30%, depending on how many comments and how much indentation the source has. The tool shows the exact percentage." },
      { q: "Should I keep an unminified copy?", a: "Yes — keep your readable source for editing and minify as a build step. Minified CSS is hard to maintain by hand." },
    ],
    related: ["json-formatter", "html-entity-encoder", "sql-formatter"],
  },
  {
    slug: "json-escape",
    category: "dev",
    name: "JSON Escape / Unescape",
    h1: "JSON Escape & Unescape",
    tagline: "Escape text into a JSON string value, or unescape it back.",
    title: "JSON Escape / Unescape — Free Online Tool",
    description:
      "Free JSON escape and unescape tool. Turn any text into a safe JSON string (quotes, newlines, backslashes encoded) or decode an escaped string back to plain text.",
    intro:
      "Escape text so it can be safely embedded inside a JSON string — quotes, backslashes, newlines and control characters are encoded correctly — or unescape an existing JSON string back to readable text. Handy for writing JSON config by hand, building API payloads and debugging. Runs in your browser.",
    keywords: ["json escape", "json escape online", "escape json string", "json unescape"],
    component: "json-escape",
    volumeEstimate: 9900,
    howTo: [
      "Choose Escape or Unescape.",
      "Paste your text or escaped string.",
      "Copy the converted result.",
    ],
    faqs: [
      { q: "What characters get escaped?", a: "Double quotes, backslashes, newlines, tabs and other control characters are encoded with backslash sequences so the result is a valid JSON string value." },
      { q: "When do I need this?", a: "Whenever you embed arbitrary text inside JSON — config files, API request bodies, or log messages — escaping prevents the text from breaking the JSON syntax." },
    ],
    related: ["json-formatter", "json-to-typescript", "html-entity-encoder"],
  },
  {
    slug: "query-string-parser",
    category: "dev",
    name: "Query String Parser",
    h1: "Query String Parser",
    tagline: "Decode a URL's query string into a readable key/value table and JSON.",
    title: "Query String Parser — Decode URL Parameters Online",
    description:
      "Free query string parser. Paste a URL to decode its query parameters into a clean key/value table and JSON, with URL-decoding and repeated-key handling. Runs in your browser.",
    intro:
      "Paste a full URL or a raw query string to see its parameters decoded into a clean table and as JSON. Values are URL-decoded (so %20 and + become spaces) and repeated keys are grouped into arrays. Great for debugging links, analytics URLs and API requests. Everything runs in your browser.",
    keywords: ["query string parser", "url parameter parser", "parse query string", "decode url parameters"],
    component: "query-string-parser",
    volumeEstimate: 5400,
    howTo: [
      "Paste a URL or query string.",
      "Read the decoded key/value table.",
      "Copy the parameters as JSON if you need them in code.",
    ],
    faqs: [
      { q: "Does it URL-decode the values?", a: "Yes. Percent-encoding like %20 and + are decoded to their real characters, so you see the actual values." },
      { q: "What happens with repeated keys?", a: "Keys that appear more than once (e.g. tags=a&tags=b) are grouped into an array in the JSON output, matching how most servers interpret them." },
    ],
    related: ["url-encode-decode", "json-formatter", "utm-builder"],
  },
];
