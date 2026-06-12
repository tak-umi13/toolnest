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
    slug: "age-calculator",
    category: "convert",
    name: "Age Calculator",
    h1: "Age Calculator — Exact Age in Years, Months & Days",
    tagline: "Your exact age from your date of birth, plus days to your next birthday.",
    title: "Age Calculator — Calculate Exact Age from Date of Birth",
    description:
      "Free age calculator. Get your exact age in years, months and days from your date of birth — plus total months, weeks, days and a next-birthday countdown.",
    intro:
      "Enter a date of birth (and optionally a different \"as of\" date) to get the exact age in years, months and days, calculated against real calendar month lengths. You also get the age in total months, weeks and days, a countdown to the next birthday, and the day of the week you were born — useful for forms, school cut-offs, retirement dates and anniversaries.",
    keywords: ["age calculator", "calculate age from date of birth", "how old am i", "age in days calculator"],
    component: "age-calculator",
    volumeEstimate: 9140000,
    updated: "2026-06-13",
    howTo: [
      "Enter the date of birth.",
      "Optionally change the \"as of\" date (defaults to today).",
      "Read the exact age, totals, and the days until the next birthday.",
    ],
    faqs: [
      { q: "How is exact age calculated?", a: "By calendar borrowing: whole years first, then whole months, then leftover days against the actual length of the months involved — the same way ages are computed for official purposes, not a 365.25-day approximation." },
      { q: "Can I calculate age at a past or future date?", a: "Yes — set the \"as of\" date to any date on or after the birth date, e.g. an exam cut-off date or a retirement date." },
      { q: "Does it handle leap years?", a: "Yes. Calculations use real calendar dates, so February 29 birthdays and leap-year day counts come out correctly." },
    ],
    related: ["time-converter", "timestamp-converter"],
  },
];
