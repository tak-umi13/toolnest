import type { Tool } from "../types";

// Every tool here shares ONE component (unit-converter), differing only by
// `params.set`. This is the programmatic-converter pattern: distinct URLs +
// keywords + content, zero new widget code.
function converter(
  slug: string,
  subject: string,
  set: string,
  examples: string,
  keywords: string[],
  volume: number
): Tool {
  const name = `${subject} Converter`;
  return {
    slug,
    category: "convert",
    name,
    h1: name,
    tagline: `Convert ${subject.toLowerCase()} units instantly — ${examples}.`,
    title: `${name} — Free Online ${subject} Unit Conversion`,
    description: `Free ${subject.toLowerCase()} converter. Convert ${examples} and more, instantly and accurately in your browser. No signup.`,
    intro: `Convert between ${subject.toLowerCase()} units such as ${examples}. Pick your "from" and "to" units, type a value, and the conversion updates instantly. Everything runs in your browser.`,
    keywords,
    component: "unit-converter",
    params: { set },
    volumeEstimate: volume,
    howTo: [
      "Enter the value you want to convert.",
      `Choose the "from" and "to" ${subject.toLowerCase()} units.`,
      "Read the converted result and copy it.",
    ],
    faqs: [
      { q: `How accurate is this ${subject.toLowerCase()} converter?`, a: "Conversions use exact standard factors, so results are precise to several decimal places — accurate enough for everyday and most technical use." },
      { q: "Is anything sent to a server?", a: "No. The conversion runs entirely in your browser with JavaScript; nothing is uploaded." },
    ],
  };
}

export const convertTools: Tool[] = [
  converter("length-converter", "Length", "length", "km, miles, meters, feet, inches", ["length converter", "meters to feet", "km to miles", "cm to inches"], 33100),
  converter("weight-converter", "Weight", "weight", "kg, pounds, grams, ounces", ["weight converter", "kg to lbs", "grams to ounces", "pounds to kg"], 6600),
  converter("data-storage-converter", "Data Storage", "data", "bytes, KB, MB, GB, TB", ["data storage converter", "mb to gb", "kb to mb", "bytes to gb"], 70),
  converter("speed-converter", "Speed", "speed", "km/h, mph, m/s, knots", ["speed converter", "kmh to mph", "mph to kmh", "m/s to km/h"], 590),
  converter("time-converter", "Time", "time", "seconds, minutes, hours, days", ["time converter", "minutes to hours", "seconds to minutes", "days to hours"], 49500),
  converter("area-converter", "Area", "area", "sq meters, sq feet, acres, hectares", ["area converter", "square feet to square meters", "acres to hectares", "sqm to sqft"], 27100),
  converter("volume-converter", "Volume", "volume", "liters, gallons, ml, cups", ["volume converter", "liters to gallons", "ml to cups", "gallons to liters"], 720),
  converter("pressure-converter", "Pressure", "pressure", "bar, psi, pascal, atm", ["pressure converter", "bar to psi", "psi to bar", "kpa to psi"], 590),
  converter("energy-converter", "Energy", "energy", "joules, calories, kWh", ["energy converter", "joules to calories", "kwh to joules", "calories to kj"], 1000),
  converter("power-converter", "Power", "power", "watts, kilowatts, horsepower, BTU/hour", ["power converter", "watts to horsepower", "kw to hp", "hp to kw"], 8100),
  converter("angle-converter", "Angle", "angle", "degrees, radians, gradians", ["angle converter", "degrees to radians", "radians to degrees", "deg to rad"], 5400),
  {
    slug: "temperature-converter",
    category: "convert",
    name: "Temperature Converter",
    h1: "Temperature Converter",
    tagline: "Convert between Celsius, Fahrenheit and Kelvin instantly.",
    title: "Temperature Converter — Celsius, Fahrenheit & Kelvin",
    description:
      "Free temperature converter. Convert Celsius to Fahrenheit, Fahrenheit to Celsius, and Kelvin instantly with exact formulas. No signup.",
    intro:
      "Convert temperatures between Celsius, Fahrenheit and Kelvin. Pick your scales, type a value, and get an instant, exact conversion — useful for cooking, science and weather.",
    keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "celsius to kelvin"],
    component: "temperature-converter",
    volumeEstimate: 8100,
    howTo: ["Enter the temperature.", "Choose the from and to scales.", "Read and copy the converted value."],
    faqs: [
      { q: "How do I convert Celsius to Fahrenheit?", a: "Multiply by 9/5 and add 32. For example, 100°C × 9/5 + 32 = 212°F." },
      { q: "What is the formula for Celsius to Kelvin?", a: "Add 273.15. For example, 25°C + 273.15 = 298.15 K." },
    ],
    related: ["length-converter", "weight-converter"],
  },
  {
    slug: "pdf-merge",
    category: "convert",
    name: "PDF Merge",
    h1: "Merge PDF Files — Private, In Your Browser",
    tagline: "Combine multiple PDFs into one file without uploading anything.",
    title: "Merge PDF Files Online Free — No Upload, 100% Private",
    description:
      "Free PDF merger that runs entirely in your browser — your files are never uploaded. Reorder pages, combine unlimited PDFs and download the merged file.",
    intro:
      "Combine two or more PDFs into a single file — contracts, scans, invoices, chapters — without your documents ever leaving your computer. Unlike upload-based merge sites, everything here runs locally in your browser, so it works on confidential files, needs no account, has no file-size tricks, and is exactly as private as opening the file yourself. Add files, drag them into order, merge, download.",
    keywords: ["pdf merge", "merge pdf files", "combine pdf", "pdf joiner", "merge pdf online free"],
    component: "pdf-merge",
    volumeEstimate: 1830000,
    updated: "2026-06-13",
    howTo: [
      "Click the file picker and add two or more PDF files.",
      "Reorder them with the ↑ ↓ buttons — the list order is the merge order.",
      "Click Merge & download to save the combined PDF.",
    ],
    faqs: [
      { q: "Are my PDFs uploaded to a server?", a: "No — that's the point of this tool. The merging runs in your browser with JavaScript (pdf-lib); your files never leave your device, so it's safe for contracts, medical and financial documents." },
      { q: "Is there a file size or page limit?", a: "Only your device's memory. Typical documents merge instantly; very large scanned files (hundreds of MB) depend on your browser's available RAM." },
      { q: "Can I merge password-protected PDFs?", a: "No — encrypted PDFs can't be read without the password. Remove the password first (e.g. print-to-PDF from the opened file), then merge." },
      { q: "Does it preserve quality?", a: "Yes. Pages are copied losslessly into the new document — no re-rendering, no compression, no watermarks." },
    ],
    related: ["age-calculator", "temperature-converter"],
  },
  {
    slug: "roman-numeral-converter",
    category: "convert",
    name: "Roman Numeral Converter",
    h1: "Roman Numeral Converter",
    tagline: "Convert numbers to Roman numerals and Roman numerals back to numbers.",
    title: "Roman Numeral Converter — Numbers to Roman & Back",
    description:
      "Free Roman numeral converter. Convert any number (1–3999) to Roman numerals and decode Roman numerals back to numbers, with validation of subtractive notation.",
    intro:
      "Convert a number to Roman numerals or a Roman numeral back to a number, both ways at once. Covers the standard range I (1) to MMMCMXCIX (3999) using correct subtractive notation (IV, IX, XL…), and rejects invalid forms like IIII or VV. Useful for dates, clock faces, names and movie/book numbering. Runs in your browser.",
    keywords: ["roman numeral converter", "number to roman numerals", "roman numerals to numbers", "roman numeral translator"],
    component: "roman-numeral-converter",
    volumeEstimate: 60500,
    howTo: [
      "Type a number to see its Roman numeral.",
      "Or type a Roman numeral to decode it back to a number.",
      "Copy whichever result you need.",
    ],
    faqs: [
      { q: "What's the largest number in standard Roman numerals?", a: "3999 (MMMCMXCIX). Numbers above that need overlines (vinculum) to multiply by 1,000, which isn't part of the basic notation this tool uses." },
      { q: "Why is 4 written IV and not IIII?", a: "Standard Roman numerals use subtractive notation: a smaller symbol before a larger one means subtraction, so IV = 5 − 1 = 4. IIII is sometimes seen on clock faces but isn't the standard form." },
      { q: "Is there a year zero in Roman numerals?", a: "No. Roman numerals have no symbol for zero, so the converter starts at 1." },
    ],
    related: ["number-to-words", "number-base-converter", "temperature-converter"],
  },
  {
    slug: "number-to-words",
    category: "convert",
    name: "Number to Words",
    h1: "Number to Words Converter",
    tagline: "Spell out any number in words — for cheques, contracts and invoices.",
    title: "Number to Words Converter — Spell Numbers in English",
    description:
      "Free number to words converter. Spell out any whole number in English words (lowercase and Title Case) for cheques, contracts and invoices. Runs in your browser.",
    intro:
      "Convert a number into its English words — for example 12,345 becomes 'twelve thousand three hundred forty-five'. Get both a lowercase version and a Title Case version, ready for cheques, legal documents, invoices and forms. Handles numbers up to 15 digits using the short scale (thousand, million, billion). Runs in your browser.",
    keywords: ["number to words", "number to words converter", "spell number in words", "amount in words"],
    component: "number-to-words",
    volumeEstimate: 40500,
    howTo: [
      "Type or paste a whole number (commas are ignored).",
      "Read the words in lowercase and Title Case.",
      "Copy the version you need.",
    ],
    faqs: [
      { q: "What number scale does it use?", a: "The short scale used in US and modern UK English: thousand, million, billion, trillion — where a billion is a thousand million." },
      { q: "Can it handle negative numbers and zero?", a: "Yes. Zero returns 'zero' and negatives are prefixed with 'negative'. It works on whole numbers up to 15 digits." },
      { q: "Does it add 'and', like 'one hundred and one'?", a: "It uses the American style without 'and' (one hundred one). You can insert 'and' manually if you prefer British cheque phrasing." },
    ],
    related: ["roman-numeral-converter", "number-base-converter", "percentage-calculator"],
  },
  {
    slug: "text-to-binary",
    category: "convert",
    name: "Text to Binary",
    h1: "Text to Binary Converter",
    tagline: "Convert text to binary and binary back to text (UTF-8, 8-bit).",
    title: "Text to Binary Converter — Encode & Decode Binary Online",
    description:
      "Free text to binary converter. Turn text into 8-bit binary and decode binary back to text, using UTF-8 so emoji and accented characters round-trip correctly.",
    intro:
      "Convert text into binary (8 bits per byte) or decode binary groups back into readable text. Encoding uses UTF-8, so emoji and accented letters convert correctly — some characters become several bytes. Great for learning how computers store text, puzzles and CS homework. Runs entirely in your browser.",
    keywords: ["text to binary", "binary to text", "text to binary converter", "binary translator"],
    component: "text-to-binary",
    volumeEstimate: 33100,
    howTo: [
      "Choose Text → Binary or Binary → Text.",
      "Type or paste your text or 8-bit binary groups.",
      "Copy the converted result.",
    ],
    faqs: [
      { q: "Why are some characters more than 8 bits?", a: "UTF-8 encodes common Latin characters in one byte (8 bits) but uses two to four bytes for accented letters, symbols and emoji — so they appear as multiple 8-bit groups." },
      { q: "What format should binary input be in?", a: "8-bit groups of 0s and 1s separated by spaces, e.g. 01001000 01101001 for 'Hi'." },
      { q: "Is my text uploaded?", a: "No. Encoding and decoding run entirely in your browser." },
    ],
    related: ["number-base-converter", "base64", "text-repeater"],
  },
  {
    slug: "fuel-economy-converter",
    category: "convert",
    name: "Fuel Economy Converter",
    h1: "Fuel Economy Converter — MPG, km/L & L/100km",
    tagline: "Convert between MPG (US/UK), km/L and L/100km accurately.",
    title: "Fuel Economy Converter — MPG to L/100km & km/L",
    description:
      "Free fuel economy converter. Convert between US MPG, UK MPG, km/L and L/100km, accounting for the different US and UK gallon sizes. Runs in your browser.",
    intro:
      "Convert a fuel economy figure between US MPG, UK (imperial) MPG, kilometres per litre and litres per 100 km — all four at once. It correctly handles the different US and UK gallon sizes and the inverse relationship of L/100km (where lower is better). Useful when comparing cars across regions. Calculated in your browser.",
    keywords: ["fuel economy converter", "mpg to l/100km", "mpg to km/l", "l/100km to mpg"],
    component: "fuel-economy-converter",
    volumeEstimate: 12100,
    howTo: [
      "Enter a value and choose its unit.",
      "Read the equivalent in US MPG, UK MPG, km/L and L/100km.",
      "Compare figures across regions.",
    ],
    faqs: [
      { q: "Why do US and UK MPG differ?", a: "The US gallon (3.785 L) is smaller than the UK imperial gallon (4.546 L), so the same car shows a lower number in US MPG than in UK MPG even though the fuel use is identical." },
      { q: "Why is lower better for L/100km?", a: "L/100km measures fuel used per distance, the inverse of MPG. Fewer litres to cover 100 km means a more efficient car." },
    ],
    related: ["speed-converter", "volume-converter", "length-converter"],
  },
];
