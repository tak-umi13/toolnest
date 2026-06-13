import type { Category } from "./types";

// Monetization tiers follow the brief's RPM guidance: SEO/Finance monetize best
// (high commercial intent + CPC), Dev is mid, Text/Color are ad-supported volume
// plays. Tiers drive which categories get lead-gen / premium upsells first.

export const categories: Category[] = [
  {
    id: "text",
    name: "Text Tools",
    title: "Free Online Text Tools — Counters, Cleaners & Converters",
    description:
      "Free text tools: word counter, case converter, duplicate line remover, slug generator and more. No signup, instant results in your browser.",
    intro:
      "Quick, no-nonsense text utilities for writers, students and developers. Everything runs locally in your browser — paste your text and get instant results.",
    emoji: "📝",
    monetization: { tier: "Medium", method: "AdSense (display)", note: "High volume, low intent — monetize via display ads and internal links to higher-RPM tools." },
  },
  {
    id: "dev",
    name: "Developer Tools",
    title: "Free Developer Tools — Formatters, Encoders & Generators",
    description:
      "Free developer utilities: JSON formatter, Base64 encoder/decoder, UUID generator and more. Fast, private, and browser-based — no signup.",
    intro:
      "A toolbox for everyday development tasks. Format, encode, decode and generate without leaving the browser or pasting sensitive data into sketchy sites.",
    emoji: "🛠️",
    monetization: { tier: "Medium", method: "AdSense + API upsell", note: "Devs block ads — monetize with a paid API tier and affiliate links to dev SaaS." },
  },
  {
    id: "color",
    name: "Color Tools",
    title: "Free Color Tools — HEX, RGB & Converters",
    description:
      "Free color tools: convert HEX to RGB, RGB to HEX, preview colors and grab codes instantly. Browser-based, no signup.",
    intro:
      "Convert and preview colors across formats designers and developers use every day. Instant, copy-ready output.",
    emoji: "🎨",
    monetization: { tier: "Low", method: "AdSense (display)", note: "Volume play; cross-link to dev and design affiliate offers." },
  },
  {
    id: "convert",
    name: "Unit Converters",
    title: "Free Unit Converters — Length, Weight, Speed, Data & More",
    description:
      "Free online unit converters for length, weight, data storage, speed, time and area. Instant, accurate conversions in your browser — no signup.",
    intro:
      "Convert between metric and imperial units in a click — length, weight, data, speed, time and area. Pick your units, type a number, get an instant answer.",
    emoji: "📐",
    monetization: { tier: "Medium", method: "AdSense (display)", note: "Steady evergreen volume; cross-link to finance and dev tools for higher RPM." },
  },
  {
    id: "datetime",
    name: "Date & Time",
    title: "Free Date & Time Calculators — Days, Hours, Age & More",
    description:
      "Free date and time tools: hours calculator, days until a date, age calculator, day of the week, business days, week number and leap year. Instant, in your browser.",
    intro:
      "Work out durations, deadlines and dates without the mental arithmetic — add up worked hours, count the days between two dates, find which day of the week a date falls on, and more. Each tool runs instantly in your browser.",
    emoji: "📅",
    monetization: { tier: "Medium", method: "AdSense (display)", note: "Evergreen, high-volume utility searches; cross-link to finance (payroll) and convert tools." },
  },
  {
    id: "math",
    name: "Math & Numbers",
    title: "Free Math Calculators — Fractions, Averages, Primes & More",
    description:
      "Free math tools: fraction calculator, decimal to fraction, mean/median/mode, percentage difference, LCM & GCD, prime checker, square root and rounding. Instant, in your browser.",
    intro:
      "Everyday number crunching without the manual arithmetic — work with fractions, averages and statistics, percentages, factors and roots. Each tool shows the result clearly and runs instantly in your browser.",
    emoji: "🔢",
    monetization: { tier: "Medium", method: "AdSense (display)", note: "Huge evergreen student/教育 volume at very low competition; display-ad play with cross-links to finance." },
  },
  {
    id: "finance",
    name: "Finance Calculators",
    title: "Free Finance Calculators (India) — EMI, SIP, GST & More",
    description:
      "Free finance calculators for India: EMI, SIP and GST. Accurate, instant, mobile-friendly — plan loans, investments and taxes in seconds.",
    intro:
      "Plain-English money calculators tuned for India — loans, investments and taxes. Each one explains the formula so you understand the number, not just see it.",
    emoji: "💰",
    monetization: { tier: "High", method: "Lead-gen + affiliate", note: "High CPC + commercial intent. Monetize via loan/MF affiliate and lead capture." },
  },
  {
    id: "seo",
    name: "SEO Tools",
    title: "Free SEO Tools — Keyword Density, Meta & More",
    description:
      "Free SEO tools: keyword density checker and on-page utilities to optimize content fast. Browser-based, no signup required.",
    intro:
      "Practical on-page SEO utilities for marketers and site owners. Analyze and optimize content without an expensive subscription.",
    emoji: "🔍",
    monetization: { tier: "Very High", method: "Affiliate + SaaS upsell", note: "Highest RPM. Audience buys SEO SaaS — affiliate + freemium upsell to a paid suite." },
  },
];
