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
  {
    slug: "rgb-to-hex",
    category: "color",
    name: "RGB to HEX Converter",
    h1: "RGB to HEX Converter",
    tagline: "Convert RGB color values to a HEX code with live sliders and preview.",
    title: "RGB to HEX Converter — Free Online Color Code Tool",
    description:
      "Free RGB to HEX converter. Enter red, green and blue values (0–255) to get the hex color code instantly, with sliders and a live preview. Copy in one click.",
    intro:
      "Set the red, green and blue channels with inputs or sliders and get the matching hex color code instantly. A live swatch previews the color, and you can copy the HEX or RGB string with one click — handy for CSS, design tokens and email templates.",
    keywords: ["rgb to hex", "rgb to hex converter", "rgb color to hex", "color code converter"],
    component: "rgb-to-hex",
    volumeEstimate: 14800,
    howTo: [
      "Enter the R, G and B values (0–255), or drag the sliders.",
      "Watch the preview and HEX value update instantly.",
      "Copy the HEX or RGB string you need.",
    ],
    faqs: [
      { q: "How do I convert RGB to HEX manually?", a: "Convert each channel (0–255) to a two-digit hexadecimal number and concatenate them. For example rgb(37, 99, 235) → #2563eb." },
      { q: "Does it clamp out-of-range values?", a: "Yes. Values below 0 or above 255 are clamped to the valid range before conversion." },
    ],
    related: ["hex-to-rgb", "gradient-generator"],
  },
  {
    slug: "gradient-generator",
    category: "color",
    name: "CSS Gradient Generator",
    h1: "CSS Gradient Generator",
    tagline: "Build linear and radial CSS gradients visually and copy the code.",
    title: "CSS Gradient Generator — Free Online Background Tool",
    description:
      "Free CSS gradient generator. Pick two colors, choose linear or radial and an angle, preview live, and copy the ready-to-use CSS background rule. No signup.",
    intro:
      "Pick a start and end color, choose linear or radial, set the angle, and preview the gradient live. Copy the ready-to-paste CSS `background` rule for your website, button or hero section — all generated in your browser.",
    keywords: ["gradient generator", "css gradient generator", "linear gradient css", "background gradient generator"],
    component: "gradient-generator",
    volumeEstimate: 4400,
    howTo: [
      "Choose the from and to colors.",
      "Pick linear or radial, and set the angle for linear gradients.",
      "Preview the result and copy the CSS background rule.",
    ],
    faqs: [
      { q: "What CSS does it output?", a: "A single `background:` declaration using linear-gradient() or radial-gradient(), ready to paste into any stylesheet or inline style." },
      { q: "Can I use more than two colors?", a: "This generator focuses on clean two-color gradients. You can extend the copied CSS by adding more color stops inside the gradient function." },
    ],
    related: ["rgb-to-hex", "hex-to-rgb"],
  },
];
