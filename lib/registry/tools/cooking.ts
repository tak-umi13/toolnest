import type { Tool } from "../types";

// Cooking & Kitchen category — the strongest low-KD cluster found yet (validated
// US/UK/IN/CA/AU). tablespoons-to-cups reuses the shared unit-converter via a
// "cookingvolume" set; the rest are dedicated components.
export const cookingTools: Tool[] = [
  {
    slug: "tablespoons-to-cups",
    category: "cooking",
    name: "Tablespoons to Cups Converter",
    h1: "Tablespoons to Cups Converter (Kitchen Volumes)",
    tagline: "Convert between teaspoons, tablespoons, cups, fluid ounces and millilitres.",
    title: "Tablespoons to Cups Converter — Kitchen Volume Conversions",
    description:
      "Free kitchen volume converter. Convert tablespoons to cups, teaspoons to tablespoons, cups to ml and more — instantly and accurately in your browser.",
    intro:
      "Convert between US kitchen volume units — teaspoons, tablespoons, fluid ounces, cups, pints, quarts and millilitres. Pick your 'from' and 'to' units, type an amount, and the answer updates instantly. There are 16 tablespoons in a cup and 3 teaspoons in a tablespoon. Everything runs in your browser.",
    keywords: ["tablespoons to cups", "how many tablespoons in a cup", "teaspoons to tablespoons", "cups to ml"],
    component: "unit-converter",
    params: { set: "cookingvolume" },
    volumeEstimate: 301000,
    howTo: [
      "Enter the amount to convert.",
      "Choose the from and to units (e.g. tablespoons → cups).",
      "Read the converted amount.",
    ],
    faqs: [
      { q: "How many tablespoons are in a cup?", a: "16 tablespoons make one US cup. So half a cup is 8 tablespoons and a quarter cup is 4 tablespoons." },
      { q: "How many teaspoons in a tablespoon?", a: "3 teaspoons equal 1 tablespoon. That means there are 48 teaspoons in a cup." },
      { q: "Are these US or metric measures?", a: "These are US customary volumes (1 cup = 236.6 ml). UK/Australian cups and tablespoons differ slightly, so adjust if a recipe specifies them." },
    ],
    related: ["cups-to-grams", "recipe-converter", "oven-temperature-converter"],
  },
  {
    slug: "cups-to-grams",
    category: "cooking",
    name: "Cups to Grams Converter",
    h1: "Cups to Grams Converter (by Ingredient)",
    tagline: "Convert cups to grams (and back) for flour, sugar, butter and more.",
    title: "Cups to Grams Converter — by Ingredient (Flour, Sugar…)",
    description:
      "Free cups to grams converter. Convert cups, tablespoons or millilitres to grams (and back) for flour, sugar, butter, rice and other ingredients — accurate by density.",
    intro:
      "Convert cups to grams and grams to cups for common baking ingredients. Because cups measure volume and grams measure weight, the conversion depends on the ingredient — a cup of flour is about 125 g but a cup of honey is about 340 g. Pick the ingredient, enter the amount, and get the weight (or volume) instantly. Runs in your browser.",
    keywords: ["cups to grams", "grams to cups", "flour cups to grams", "ml to grams"],
    component: "cups-to-grams",
    volumeEstimate: 110000,
    howTo: [
      "Pick the conversion direction (cups → grams or grams → cups).",
      "Choose the ingredient.",
      "Enter the amount and read the converted weight or volume.",
    ],
    faqs: [
      { q: "How many grams are in a cup of flour?", a: "About 125 g of all-purpose flour per US cup, spooned and levelled. Packing the cup can push it to 150 g or more, which is why weighing is more accurate for baking." },
      { q: "Why isn't there one cups-to-grams number?", a: "Cups measure volume and grams measure weight, so the answer depends on how dense the ingredient is. A cup of sugar (≈200 g) weighs more than a cup of flour (≈125 g)." },
      { q: "Are these US cups?", a: "Yes — 1 US cup = 236.6 ml. The gram values are typical averages; for precision in baking, a kitchen scale beats any cup measure." },
    ],
    related: ["tablespoons-to-cups", "recipe-converter", "weight-converter"],
  },
  {
    slug: "recipe-converter",
    category: "cooking",
    name: "Recipe Converter",
    h1: "Recipe Converter & Scaler",
    tagline: "Scale a recipe up or down to any number of servings.",
    title: "Recipe Converter — Scale Ingredients to Any Servings",
    description:
      "Free recipe converter and scaler. Paste your ingredient list and change the servings — every quantity is rescaled and rounded to friendly fractions. Runs in your browser.",
    intro:
      "Scale any recipe to the number of servings you need. Enter the original and desired servings, paste your ingredient list (one per line, quantity first), and every amount is multiplied by the right factor and rounded to friendly fractions like ½ and ¾. Lines without a number pass through untouched. Runs in your browser.",
    keywords: ["recipe converter", "recipe scaler", "recipe multiplier", "scale recipe calculator"],
    component: "recipe-converter",
    volumeEstimate: 3600,
    howTo: [
      "Enter the original and desired servings.",
      "Paste the ingredients, one per line with the quantity first.",
      "Copy the rescaled recipe.",
    ],
    faqs: [
      { q: "Does it handle fractions like 1 1/2 cups?", a: "Yes. It understands whole numbers, decimals, fractions (3/4), mixed numbers (1 1/2) and unicode fractions (½), and rounds results to the nearest friendly cooking fraction." },
      { q: "Does it scale cooking times too?", a: "No — and you shouldn't scale times linearly. Doubling a recipe rarely doubles the cook time; adjust temperature and time by eye and check doneness." },
    ],
    related: ["cups-to-grams", "tablespoons-to-cups", "oven-temperature-converter"],
  },
  {
    slug: "oven-temperature-converter",
    category: "cooking",
    name: "Oven Temperature Converter",
    h1: "Oven Temperature Converter (°C, °F, Gas Mark)",
    tagline: "Convert oven temperatures between Celsius, Fahrenheit, gas mark and fan.",
    title: "Oven Temperature Converter — °C, °F, Gas Mark & Fan",
    description:
      "Free oven temperature converter. Convert between Celsius, Fahrenheit and UK gas marks, with the fan/convection equivalent. Runs in your browser.",
    intro:
      "Convert oven temperatures between Celsius, Fahrenheit and UK gas marks, and see the fan (convection) equivalent. Enter a temperature in any of the three and get the others instantly — handy when a recipe uses units your oven doesn't. For fan ovens, reduce the conventional Celsius by about 20°C. Runs in your browser.",
    keywords: ["oven temperature converter", "celsius to gas mark", "fahrenheit to celsius oven", "fan oven conversion"],
    component: "oven-temperature-converter",
    volumeEstimate: 8100,
    howTo: [
      "Enter a temperature and choose its unit (°C, °F or gas mark).",
      "Read the Celsius, Fahrenheit, gas mark and fan equivalents.",
      "For a fan oven, use the fan value shown.",
    ],
    faqs: [
      { q: "What is gas mark 4 in Celsius?", a: "Gas mark 4 is about 180°C (350°F), a common moderate baking temperature. Each gas mark step is roughly 14°C." },
      { q: "How do I convert a conventional oven temperature to fan?", a: "Reduce the conventional Celsius temperature by about 20°C (and check a little earlier), since fan ovens circulate heat more efficiently." },
    ],
    related: ["tablespoons-to-cups", "cups-to-grams", "temperature-converter"],
  },
];
