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
  {
    slug: "color-picker",
    category: "color",
    name: "Color Picker",
    h1: "Online Color Picker",
    tagline: "Pick a color and get HEX, RGB, HSL, HSV and CMYK instantly.",
    title: "Color Picker — Get HEX, RGB, HSL & CMYK Codes Online",
    description:
      "Free online color picker. Pick any color or enter a hex code to get HEX, RGB, HSL, HSV and CMYK values at once, with a live preview and one-click copy.",
    intro:
      "Pick a color with the visual swatch or type a hex code to read every common format at once: HEX, RGB, HSL, HSV and CMYK. A live preview shows the exact color and each value copies with one click — handy for CSS, design tools, print work and brand palettes. Everything runs in your browser.",
    keywords: ["color picker", "online color picker", "html color picker", "hex color picker"],
    component: "color-picker",
    volumeEstimate: 110000,
    howTo: [
      "Click the swatch to pick a color, or type a hex code.",
      "Read the HEX, RGB, HSL, HSV and CMYK values.",
      "Copy whichever format you need.",
    ],
    faqs: [
      { q: "What formats does the color picker output?", a: "HEX, RGB, HSL, HSV and CMYK — all updated live from the same color, so you can grab whichever your tool or stylesheet expects." },
      { q: "Can I enter a hex code directly?", a: "Yes. Type or paste a 3- or 6-digit hex code and the swatch and all other formats update instantly." },
      { q: "Is the CMYK value print-accurate?", a: "It's a standard mathematical conversion. Exact print color also depends on your printer's ICC profile and paper, so treat CMYK here as a close starting point." },
    ],
    related: ["hex-to-rgb", "rgb-to-hex", "hex-to-hsl"],
  },
  {
    slug: "color-contrast-checker",
    category: "color",
    name: "Color Contrast Checker",
    h1: "Color Contrast Checker (WCAG)",
    tagline: "Check text/background contrast against WCAG AA and AAA standards.",
    title: "Color Contrast Checker — WCAG AA & AAA Ratio Tool",
    description:
      "Free WCAG color contrast checker. Enter text and background colors to get the contrast ratio and instant AA/AAA pass-fail results for normal and large text.",
    intro:
      "Enter a text color and a background color to get the exact WCAG contrast ratio, with instant pass/fail badges for AA and AAA at both normal and large text sizes. A live preview shows the real pairing. Essential for accessible, readable interfaces and for meeting accessibility requirements. Calculated in your browser using the official relative-luminance formula.",
    keywords: ["color contrast checker", "wcag contrast checker", "contrast ratio calculator", "accessibility color checker"],
    component: "color-contrast-checker",
    volumeEstimate: 40500,
    updated: "2026-06-13",
    updateNote: "WCAG 2.1 thresholds",
    howTo: [
      "Set the text color and background color.",
      "Read the contrast ratio and the AA/AAA pass-fail badges.",
      "Adjust the colors until they pass for your text size.",
    ],
    faqs: [
      { q: "What contrast ratio do I need?", a: "WCAG 2.1 requires 4.5:1 for normal text (AA) or 7:1 (AAA). Large text — 18pt and up, or 14pt bold — needs 3:1 (AA) or 4.5:1 (AAA)." },
      { q: "How is the ratio calculated?", a: "From the relative luminance of each color: (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter color. This is the exact formula in the WCAG specification." },
      { q: "Does it cover non-text elements?", a: "The AA/AAA badges target text. For UI components and graphics, WCAG asks for at least 3:1 — use the 'Large text — AA' row as that benchmark." },
    ],
    related: ["color-picker", "color-blindness-simulator", "hex-to-hsl"],
  },
  {
    slug: "color-shades-generator",
    category: "color",
    name: "Color Shades Generator",
    h1: "Color Shades & Tints Generator",
    tagline: "Generate a tint-and-shade palette ramp from any base color.",
    title: "Color Shades Generator — Tints & Shades Palette Tool",
    description:
      "Free color shades generator. Enter a base color to get a full ramp of tints and shades (light to dark) with hex codes you can copy for your design system.",
    intro:
      "Enter a base color to instantly generate a ramp of tints (lighter) and shades (darker), holding the hue and saturation steady while stepping lightness from 95% to 5%. Copy any swatch or the whole set — perfect for building the 50–900 scale of a design system or finding hover and disabled states. Runs in your browser.",
    keywords: ["color shades generator", "tints and shades generator", "color palette generator", "shades of a color"],
    component: "color-shades-generator",
    volumeEstimate: 18100,
    howTo: [
      "Pick or type a base color.",
      "Read the light-to-dark ramp of tints and shades.",
      "Copy a single hex or the whole palette.",
    ],
    faqs: [
      { q: "What's the difference between a tint and a shade?", a: "A tint is the color mixed toward white (lighter); a shade is mixed toward black (darker). This tool generates both as one continuous lightness ramp." },
      { q: "Why keep hue and saturation fixed?", a: "Holding hue and saturation steady while only changing lightness keeps every step recognisably the same color — exactly what a design-system scale needs." },
    ],
    related: ["color-picker", "hex-to-hsl", "gradient-generator"],
  },
  {
    slug: "color-blindness-simulator",
    category: "color",
    name: "Color Blindness Simulator",
    h1: "Color Blindness Simulator",
    tagline: "Preview how a color looks with the main types of color blindness.",
    title: "Color Blindness Simulator — Check Colors for Accessibility",
    description:
      "Free color blindness simulator. See how any color appears to people with deuteranopia, protanopia and tritanopia so your color-coded UI stays distinguishable.",
    intro:
      "Enter a color to see how it shifts for the three main types of color-vision deficiency — deuteranopia (green-weak), protanopia (red-weak) and tritanopia (blue-yellow). Use it to check that color-coded elements like charts, status indicators and links remain distinguishable for the roughly 1 in 12 men and 1 in 200 women with color blindness. Runs in your browser.",
    keywords: ["color blindness simulator", "color blind test colors", "deuteranopia simulator", "accessible color checker"],
    component: "color-blindness-simulator",
    volumeEstimate: 12100,
    howTo: [
      "Pick or type the color you want to test.",
      "Compare the normal swatch with the three simulations.",
      "Pair colors that still look different in every swatch.",
    ],
    faqs: [
      { q: "What types of color blindness are simulated?", a: "The three most common red-green and blue-yellow types: deuteranopia (the most common), protanopia and tritanopia." },
      { q: "How accurate is the simulation?", a: "It's a fast in-browser matrix approximation — good for spotting risky color pairings, though clinical tools model individual vision more precisely." },
      { q: "How do I make a palette color-blind safe?", a: "Don't rely on hue alone: combine color with shape, labels or lightness differences, and make sure paired colors stay distinct across all three simulations." },
    ],
    related: ["color-contrast-checker", "color-picker", "color-shades-generator"],
  },
  {
    slug: "hex-to-hsl",
    category: "color",
    name: "HEX to HSL Converter",
    h1: "HEX to HSL Converter",
    tagline: "Convert a hex color code to HSL (hue, saturation, lightness).",
    title: "HEX to HSL Converter — Free Online Color Code Tool",
    description:
      "Free HEX to HSL converter. Turn any hex color code into HSL values (hue, saturation, lightness) with a live preview and ready-to-copy CSS hsl() string.",
    intro:
      "Enter a hex code to get its HSL values — hue in degrees, saturation and lightness as percentages — with a live preview and a ready-to-paste CSS hsl() string. HSL is far easier to tweak than hex: adjust lightness for tints and shades, or rotate the hue to build color schemes. Converted in your browser.",
    keywords: ["hex to hsl", "hex to hsl converter", "hex color to hsl", "convert hex to hsl"],
    component: "hex-to-hsl",
    volumeEstimate: 5400,
    howTo: [
      "Type or pick a hex color.",
      "Read the hue, saturation and lightness values.",
      "Copy the CSS hsl() string.",
    ],
    faqs: [
      { q: "What is HSL?", a: "HSL stands for hue (0–360°), saturation (0–100%) and lightness (0–100%). It maps to how people think about color, which makes adjustments more intuitive than editing hex digits." },
      { q: "Why convert hex to HSL?", a: "HSL makes it easy to create lighter/darker variants (change lightness) or harmonious schemes (rotate hue) while keeping the color recognisable." },
    ],
    related: ["hex-to-rgb", "color-picker", "color-shades-generator"],
  },
  {
    slug: "cmyk-to-rgb",
    category: "color",
    name: "CMYK to RGB Converter",
    h1: "CMYK to RGB Converter",
    tagline: "Convert CMYK print colors to RGB and HEX for screen use.",
    title: "CMYK to RGB Converter — Free Online Color Tool",
    description:
      "Free CMYK to RGB converter. Enter cyan, magenta, yellow and black percentages to get RGB and HEX values with a live preview. Great for bringing print colors on screen.",
    intro:
      "Enter CMYK percentages (cyan, magenta, yellow, key/black) to get the matching RGB and HEX values with a live preview and sliders. Useful when you have a color from a print or branding spec and need its on-screen equivalent for web or UI work. Calculated in your browser.",
    keywords: ["cmyk to rgb", "cmyk to rgb converter", "cmyk to hex", "convert cmyk to rgb"],
    component: "cmyk-to-rgb",
    volumeEstimate: 8100,
    howTo: [
      "Enter the C, M, Y and K percentages or drag the sliders.",
      "Read the RGB and HEX equivalents with a live preview.",
      "Copy the HEX or RGB value.",
    ],
    faqs: [
      { q: "Is CMYK to RGB conversion exact?", a: "No conversion is perfectly exact because CMYK (subtractive, for ink) and RGB (additive, for light) describe color differently. This uses the standard formula and gives a close on-screen match; true print color depends on the ICC profile." },
      { q: "What does the K stand for?", a: "K is the 'key' plate — black ink. It's used instead of B to avoid confusion with blue, and it deepens shadows while saving colored ink." },
    ],
    related: ["color-picker", "rgb-to-hex", "hex-to-rgb"],
  },
];
