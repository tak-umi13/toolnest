import type { Article } from "../types";

// Supporting cluster for the high-CPC developer tools (json formatter $10+ CPC,
// jwt decoder $12+, url encode $15+). These keywords are high-KD, so the play
// is long-game topical authority: own the explainers, feed the tools.

export const devArticles: Article[] = [
  {
    slug: "how-to-fix-invalid-json",
    category: "dev",
    title: "How to Fix Invalid JSON: Common Errors and What They Mean",
    h1: "How to Fix Invalid JSON",
    description:
      "A practical guide to JSON parse errors: how to read the error message, the eight most common causes (trailing commas, single quotes, unquoted keys) and how to fix each.",
    keywords: ["json parse error", "how to fix invalid json", "unexpected token json", "json validator"],
    intro:
      "JSON is strict by design — one stray comma and the whole document refuses to parse. The good news: almost every 'invalid JSON' error is one of a handful of causes, and the error message tells you where to look.",
    sections: [
      {
        heading: "First, read the error properly",
        paragraphs: [
          "Parsers report a position, e.g. 'Unexpected token } in JSON at position 74' or a line/column pair. That position is where the parser gave up — the actual mistake is usually at or just before it. Paste the JSON into a formatter, jump to that spot, and the culprit is normally staring at you.",
        ],
      },
      {
        heading: "The usual suspects",
        paragraphs: ["In practice, these eight cause nearly every failure:"],
        bullets: [
          "Trailing comma — {\"a\": 1,} is invalid; JSON forbids a comma after the last item.",
          "Single quotes — strings and keys must use double quotes: 'name' fails, \"name\" works.",
          "Unquoted keys — {name: \"x\"} is a JavaScript object literal, not JSON.",
          "Comments — // and /* */ are not part of JSON at all.",
          "undefined and NaN — not valid JSON values; use null or a number.",
          "Smart quotes — copying from Word or chat apps swaps \" for curly quotes the parser rejects.",
          "Truncated data — a cut-off response loses its closing brackets; the error points at the very end.",
          "Invisible characters — a BOM or non-breaking space at the start fails with an error at position 0.",
        ],
      },
      {
        heading: "Why JSON is stricter than JavaScript",
        paragraphs: [
          "JSON looks like a JavaScript object literal but is a separate, deliberately tiny specification. The strictness is the feature: any parser in any language accepts exactly the same documents, with no dialect drift. When you want the relaxed version for config files, that's a different format (JSON5 or JSONC) — and standard parsers will still reject it.",
        ],
      },
      {
        heading: "The fast fix workflow",
        paragraphs: [
          "Paste the JSON into the formatter below, read the error position, fix that one spot, and re-validate — repeat until it pretty-prints. For machine-generated JSON that fails repeatedly, fix the generator (usually string concatenation that should be a serializer call).",
        ],
      },
    ],
    faqs: [
      { q: "Are comments allowed in JSON?", a: "No. The JSON spec has no comment syntax. Tooling-specific dialects like JSONC (used by VS Code config) allow them, but standard parsers — including JSON.parse — reject them." },
      { q: "Why does a trailing comma break JSON when JavaScript allows it?", a: "JavaScript's grammar tolerates trailing commas; the JSON spec, frozen and minimal on purpose, does not. Every compliant parser must reject it." },
      { q: "What does 'Unexpected token' actually mean?", a: "The parser met a character that can't legally appear at that point — often the visible symptom of an earlier mistake, like a missing quote or comma a few characters before the reported position." },
    ],
    relatedTools: ["json-formatter", "regex-tester"],
    relatedArticles: ["what-is-base64", "what-is-a-jwt"],
  },
  {
    slug: "what-is-base64",
    category: "dev",
    title: "What is Base64? Encoding Explained (and Why It's Not Encryption)",
    h1: "What is Base64 Encoding?",
    description:
      "Base64 explained: what it does, why binary data needs it, how the 3-bytes-to-4-characters scheme works, the = padding, URL-safe Base64 — and why it is not encryption.",
    keywords: ["what is base64", "base64 explained", "base64 encoding", "base64 vs encryption"],
    intro:
      "Base64 turns any data — images, files, arbitrary bytes — into plain ASCII text using just 64 safe characters. It exists because many systems (email, JSON, URLs, XML) can only carry text reliably. That's all it is: a text-safe wrapper, not a lock.",
    sections: [
      {
        heading: "The problem it solves",
        paragraphs: [
          "Binary data contains bytes that text-based protocols mangle: control characters, nulls, bytes that look like delimiters. Base64 re-expresses every 3 bytes of data as 4 characters drawn from A–Z, a–z, 0–9, + and / — characters that survive any text channel untouched. That's why email attachments (MIME), data: URIs in CSS, and binary blobs inside JSON all ride as Base64.",
        ],
      },
      {
        heading: "How the encoding works",
        paragraphs: [],
        bullets: [
          "Take 3 bytes (24 bits), split into four 6-bit groups, map each to one of 64 characters.",
          "Output is always a multiple of 4 characters; missing input bytes are signalled with = padding.",
          "Size cost: encoded data is ~33% larger than the original — Base64 is the opposite of compression.",
        ],
      },
      {
        heading: "Base64 is NOT encryption",
        paragraphs: [
          "Anyone can decode Base64 instantly — there is no key. Encoding credentials or secrets in Base64 (a depressingly common mistake) provides zero protection; it only makes them look scrambled. If data must be confidential, encrypt it; Base64 is only for transport-safety.",
        ],
      },
      {
        heading: "URL-safe Base64",
        paragraphs: [
          "Standard Base64 uses + and /, which collide with URL syntax. The URL-safe variant swaps them for - and _ and usually drops the = padding. You'll meet it everywhere in web auth — JWT header, payload and signature are each Base64URL-encoded.",
        ],
      },
    ],
    faqs: [
      { q: "Does Base64 compress data?", a: "No — it inflates it by about 33%. If size matters, compress first (gzip), then Base64-encode the compressed bytes if a text channel requires it." },
      { q: "What do the = signs at the end mean?", a: "Padding. Base64 works in 3-byte blocks; when the input isn't a multiple of 3, one or two = characters pad the final 4-character group." },
      { q: "Is it safe to put secrets in Base64?", a: "No. Base64 is reversible by anyone with zero effort. Treat Base64-encoded secrets exactly like plaintext secrets." },
    ],
    relatedTools: ["base64", "jwt-decoder"],
    relatedArticles: ["what-is-a-jwt", "url-encoding-explained"],
  },
  {
    slug: "what-is-a-jwt",
    category: "dev",
    title: "What is a JWT? JSON Web Tokens Explained Simply",
    h1: "What is a JWT (JSON Web Token)?",
    description:
      "JWTs explained: the header.payload.signature structure, what claims are, why signed is not encrypted, how verification works and where JWTs are used.",
    keywords: ["what is jwt", "jwt explained", "json web token", "jwt structure"],
    intro:
      "A JWT (JSON Web Token) is a compact, self-contained way to pass verified claims — like 'this is user 42 and the session expires at noon' — between systems. It looks like gibberish, but it's just three Base64URL-encoded parts joined by dots.",
    sections: [
      {
        heading: "The three parts",
        paragraphs: ["header.payload.signature — split any JWT at the dots and you get:"],
        bullets: [
          "Header — JSON naming the signing algorithm, e.g. {\"alg\": \"HS256\", \"typ\": \"JWT\"}.",
          "Payload — JSON of claims: registered ones like sub (subject), iss (issuer), exp (expiry), iat (issued-at), plus anything custom.",
          "Signature — a cryptographic signature over the first two parts, made with a secret (HMAC) or private key (RSA/ECDSA).",
        ],
      },
      {
        heading: "Signed, not encrypted — the critical distinction",
        paragraphs: [
          "The header and payload are merely Base64URL-encoded: anyone holding the token can read them in milliseconds. The signature stops tampering, not reading — change one character of the payload and verification fails. Never put passwords, card numbers or anything confidential inside a JWT payload.",
        ],
      },
      {
        heading: "How verification works",
        paragraphs: [
          "The receiving server recomputes the signature from the header and payload using the shared secret (or the issuer's public key) and compares it to the token's third part, then checks claims like exp. This must happen server-side on every request — decoding without verifying, as browser tools do, proves nothing about authenticity.",
        ],
      },
      {
        heading: "Where you meet JWTs",
        paragraphs: [
          "API authentication (the Authorization: Bearer header), OAuth 2.0 and OpenID Connect ID tokens, single sign-on, and service-to-service auth in microservices. Short expiry plus a refresh-token flow is the standard pattern for limiting the damage of a leaked token.",
        ],
      },
    ],
    faqs: [
      { q: "Can someone read my JWT if they intercept it?", a: "Yes — the payload is readable by anyone. HTTPS protects it in transit, and the signature prevents modification, but confidentiality of the contents is not a JWT feature." },
      { q: "What happens if I edit the payload?", a: "The signature no longer matches, and any properly verifying server rejects the token. That tamper-evidence is the whole point of the signature." },
      { q: "Where should a browser app store JWTs?", a: "An httpOnly, Secure cookie avoids JavaScript-readable storage (XSS risk) but needs CSRF defenses; localStorage avoids CSRF but is exposed to XSS. There is no perfect answer — minimize token lifetime either way." },
    ],
    relatedTools: ["jwt-decoder", "base64", "hash-generator"],
    relatedArticles: ["what-is-base64", "how-to-fix-invalid-json"],
  },
  {
    slug: "url-encoding-explained",
    category: "dev",
    title: "URL Encoding Explained: %20, Reserved Characters & Common Bugs",
    h1: "URL Encoding (Percent-Encoding), Explained",
    description:
      "Why URLs need percent-encoding, what %20 means, reserved vs unreserved characters, encodeURI vs encodeURIComponent, and the bugs (double-encoding) to avoid.",
    keywords: ["url encoding", "percent encoding", "%20 meaning", "encodeuricomponent vs encodeuri"],
    intro:
      "URLs can only safely carry a limited set of characters, and some of those — ? & = / # — have jobs in the URL's own grammar. Percent-encoding is how everything else (spaces, ampersands inside values, non-English text) travels without breaking the structure.",
    sections: [
      {
        heading: "The mechanics: %XX",
        paragraphs: [
          "Each unsafe byte is replaced by % followed by its two-digit hex value, using the character's UTF-8 bytes. A space becomes %20. An ampersand inside a value becomes %26. A é becomes %C3%A9 — two bytes, two escapes.",
        ],
      },
      {
        heading: "Reserved vs unreserved characters",
        paragraphs: [],
        bullets: [
          "Unreserved — letters, digits, - _ . ~ — never need encoding.",
          "Reserved — : / ? # [ ] @ ! $ & ' ( ) * + , ; = — legal in a URL but only in their structural roles; encode them when they appear inside a value.",
          "The classic failure: a search query like 'fish & chips' sent unencoded — the & silently splits it into two parameters.",
        ],
      },
      {
        heading: "encodeURI vs encodeURIComponent",
        paragraphs: [
          "JavaScript ships both. encodeURIComponent encodes everything reserved — use it for individual values you insert into a query string. encodeURI leaves the URL's structural characters (/ ? & =) intact — only for encoding a complete URL that is already structurally correct. Nine times out of ten, you want encodeURIComponent.",
        ],
      },
      {
        heading: "Two bugs to avoid",
        paragraphs: [],
        bullets: [
          "Double-encoding: encoding an already-encoded value turns %20 into %2520 — visible as literal '%20' text in the destination page. Encode exactly once, at the moment you build the URL.",
          "Decoding too early: decode a query string before splitting on &, and any encoded %26 inside a value becomes a real & that corrupts the parse. Split first, then decode each part.",
        ],
      },
    ],
    faqs: [
      { q: "What is the difference between %20 and + for spaces?", a: "%20 is the universal percent-encoding of a space. + means space only inside application/x-www-form-urlencoded data (classic HTML form submissions); elsewhere a + is a literal plus sign." },
      { q: "Why does é turn into %C3%A9?", a: "Percent-encoding works on bytes. é is two bytes in UTF-8 (0xC3 0xA9), so it encodes as two escapes." },
      { q: "When should I NOT encode?", a: "Don't encode the structural characters of a URL you're assembling (the / between path segments, the ? and & of the query). Encode the values you slot into that structure." },
    ],
    relatedTools: ["url-encode-decode", "base64"],
    relatedArticles: ["what-is-base64", "how-to-fix-invalid-json"],
  },
];
