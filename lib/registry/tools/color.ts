import type { Tool } from "../types";

export const colorTools: Tool[] = [
  {
    slug: "hex-to-rgb",
    category: "color",
    name: "HEX to RGB Converter",
    h1: "HEX to RGB Converter",
    tagline: "Convert HEX color codes to RGB (and back) with a live preview.",
    title: "HEX to RGB Converter — Free Online Color Code Tool",
    description:
      "Free HEX to RGB converter. Turn any hex color code into RGB values with a live color preview, and convert RGB back to HEX. Copy with one click.",
    intro:
      "Enter a hex code like #2563eb to get its RGB values, or enter RGB to get the hex code. A live swatch previews the color as you type. Supports 3- and 6-digit hex. Handy for CSS, design systems and email templates.",
    keywords: ["hex to rgb", "rgb to hex", "hex color converter", "color code converter"],
    component: "hex-to-rgb",
    volumeEstimate: 9900,
    howTo: [
      "Type a hex code (with or without #) into the HEX field.",
      "The RGB values and a color preview update instantly.",
      "Edit the RGB fields to convert in the other direction.",
      "Copy the value you need.",
    ],
    faqs: [
      { q: "Does it support 3-digit shorthand hex?", a: "Yes. Shorthand like #f80 is expanded to #ff8800 automatically before converting." },
      { q: "How do I convert RGB back to HEX?", a: "Just edit the R, G and B fields — the hex code updates live in the other direction." },
    ],
    related: ["json-formatter"],
  },
];
