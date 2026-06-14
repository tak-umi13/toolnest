import type { Tool } from "../types";

// Health & Fitness category — formula-based fitness/nutrition calculators
// validated across US/UK/CA/AU/IN (DataForSEO batch 10). YMYL: every tool names
// its established formula, and health-category pages show a disclaimer.
export const healthTools: Tool[] = [
  {
    slug: "bmr-calculator",
    category: "health",
    name: "BMR Calculator",
    h1: "BMR Calculator (with TDEE)",
    tagline: "Find your basal metabolic rate and daily calorie needs (TDEE).",
    title: "BMR Calculator — Basal Metabolic Rate & TDEE",
    description:
      "Free BMR calculator. Find your basal metabolic rate with the Mifflin-St Jeor equation and your TDEE (daily calories to maintain weight) by activity level. Metric or imperial.",
    intro:
      "Work out your BMR — the calories your body burns at complete rest — using the Mifflin-St Jeor equation, the most accurate of the common formulas. Then see your TDEE, the total daily energy you need to maintain your weight at your activity level. Enter your details in metric or imperial. A general estimate for information, not medical advice.",
    keywords: ["bmr calculator", "basal metabolic rate calculator", "tdee calculator", "maintenance calorie calculator"],
    component: "bmr-calculator",
    volumeEstimate: 110000,
    howTo: [
      "Pick metric or imperial and enter sex, age, weight and height.",
      "Choose your activity level.",
      "Read your BMR and TDEE (maintenance calories).",
    ],
    faqs: [
      { q: "What's the difference between BMR and TDEE?", a: "BMR is the energy your body uses at rest just to stay alive. TDEE (total daily energy expenditure) is BMR multiplied by an activity factor — roughly the calories you burn in a normal day, and what you'd eat to maintain weight." },
      { q: "Which formula does it use?", a: "The Mifflin-St Jeor equation, which research finds more accurate for most people than the older Harris-Benedict formula." },
      { q: "How do I lose or gain weight from this?", a: "Eat below your TDEE to lose weight or above it to gain — a deficit or surplus of about 500 calories a day changes weight by roughly 0.5 kg (1 lb) a week. Consult a professional for personalised advice." },
    ],
    related: ["macro-calculator", "protein-intake-calculator", "ideal-weight-calculator"],
  },
  {
    slug: "macro-calculator",
    category: "health",
    name: "Macro Calculator",
    h1: "Macro Calculator",
    tagline: "Split your daily calories into protein, carbs and fat in grams.",
    title: "Macro Calculator — Protein, Carbs & Fat from Calories",
    description:
      "Free macro calculator. Split your daily calorie target into grams of protein, carbs and fat using balanced, high-protein, low-carb, keto or endurance ratios.",
    intro:
      "Turn a daily calorie target into grams of protein, carbohydrate and fat. Choose a split that suits your goal — balanced, high-protein, low-carb, keto or endurance — and the calculator converts the percentages into grams (protein and carbs are 4 calories per gram, fat is 9). A general guide, not a prescribed diet.",
    keywords: ["macro calculator", "macronutrient calculator", "iifym calculator", "protein carb fat calculator"],
    component: "macro-calculator",
    volumeEstimate: 110000,
    howTo: [
      "Enter your daily calorie target (use the BMR/TDEE calculator if unsure).",
      "Pick a macro split for your goal.",
      "Read the grams of protein, carbs and fat.",
    ],
    faqs: [
      { q: "What are macros?", a: "Macronutrients — protein, carbohydrate and fat — the three nutrients that provide calories. 'Counting macros' means hitting daily gram targets for each rather than just total calories." },
      { q: "What's a good macro split?", a: "It depends on your goal and preference. A balanced 30/40/30 (protein/carb/fat) suits most people; higher protein helps when building or preserving muscle. There's no single right answer." },
    ],
    related: ["bmr-calculator", "protein-intake-calculator", "water-intake-calculator"],
  },
  {
    slug: "one-rep-max-calculator",
    category: "health",
    name: "One Rep Max Calculator",
    h1: "One Rep Max (1RM) Calculator",
    tagline: "Estimate your one-rep max from a set, with training percentages.",
    title: "One Rep Max Calculator — Estimate Your 1RM",
    description:
      "Free one rep max calculator. Estimate your 1RM from the weight and reps of a set using the Epley and Brzycki formulas, with a full table of training percentages.",
    intro:
      "Estimate your one-rep max — the most you could lift for a single repetition — from a set you've done, by averaging the Epley and Brzycki formulas. You also get a table of training percentages (60–100% of your 1RM) for planning working sets. Estimates are most accurate under about 10 reps. Warm up and use a spotter for heavy lifts.",
    keywords: ["one rep max calculator", "1rm calculator", "one rep max", "max bench calculator"],
    component: "one-rep-max-calculator",
    volumeEstimate: 90500,
    howTo: [
      "Enter the weight you lifted and the number of reps.",
      "Read your estimated 1RM.",
      "Use the percentage table to plan training sets.",
    ],
    faqs: [
      { q: "How accurate is an estimated 1RM?", a: "Quite accurate for sets of about 2–8 reps. Above ~10 reps the estimate drifts higher than reality, so use lower-rep sets for the best estimate." },
      { q: "What are training percentages for?", a: "Programmes prescribe loads as a percentage of your 1RM (e.g. 5 reps at 80%). The table converts your estimated max into those working weights." },
    ],
    related: ["bmr-calculator", "body-fat-calculator", "protein-intake-calculator"],
  },
  {
    slug: "body-fat-calculator",
    category: "health",
    name: "Body Fat Calculator",
    h1: "Body Fat Percentage Calculator",
    tagline: "Estimate body fat percentage with the U.S. Navy tape method.",
    title: "Body Fat Calculator — U.S. Navy Method",
    description:
      "Free body fat calculator. Estimate your body fat percentage from simple tape measurements using the U.S. Navy circumference method, with a category. Metric or imperial.",
    intro:
      "Estimate your body fat percentage with the U.S. Navy circumference method, which uses tape measurements of your neck, waist (and hips for women) plus your height. It's a quick, no-equipment estimate and shows a fitness category. Less precise than a DEXA scan, and not medical advice. Runs in your browser.",
    keywords: ["body fat calculator", "body fat percentage calculator", "navy body fat calculator", "bf% calculator"],
    component: "body-fat-calculator",
    volumeEstimate: 33100,
    howTo: [
      "Pick metric or imperial and select your sex.",
      "Measure and enter your height, neck and waist (and hips for women).",
      "Read your estimated body fat percentage and category.",
    ],
    faqs: [
      { q: "How accurate is the Navy method?", a: "It's typically within a few percentage points for most people — good enough to track changes over time, but not as precise as a DEXA or hydrostatic test. Measure consistently for the best comparisons." },
      { q: "Where do I measure?", a: "Neck just below the larynx, waist at the navel for men and the narrowest point for women, and hips at the widest point. Keep the tape snug and level." },
    ],
    related: ["ideal-weight-calculator", "bmr-calculator", "one-rep-max-calculator"],
  },
  {
    slug: "ideal-weight-calculator",
    category: "health",
    name: "Ideal Weight Calculator",
    h1: "Ideal Weight Calculator",
    tagline: "Estimate ideal body weight from height with four classic formulas.",
    title: "Ideal Weight Calculator — Devine, Robinson, Miller & Hamwi",
    description:
      "Free ideal weight calculator. Estimate your ideal body weight from height and sex using the Devine, Robinson, Miller and Hamwi formulas, as a range. Metric or imperial.",
    intro:
      "Estimate your ideal body weight from your height and sex using the four classic clinical formulas — Devine, Robinson, Miller and Hamwi — shown individually and as a range. These are rough guides: a healthy weight also depends on your build, muscle and body composition. Not medical advice. Runs in your browser.",
    keywords: ["ideal weight calculator", "ideal body weight calculator", "healthy weight calculator", "ibw calculator"],
    component: "ideal-weight-calculator",
    volumeEstimate: 14800,
    howTo: [
      "Pick metric or imperial and select your sex.",
      "Enter your height.",
      "Read the ideal weight range and each formula.",
    ],
    faqs: [
      { q: "Why do the formulas give different numbers?", a: "Each was derived from different data and assumptions, so they vary by a few kilograms. Treating them as a range is more realistic than picking one exact number." },
      { q: "Is ideal body weight the same as a healthy weight?", a: "Not exactly. These height-based formulas ignore muscle and frame size — a muscular person may be heavier yet perfectly healthy. Use it as a guide, not a target." },
    ],
    related: ["body-fat-calculator", "bmr-calculator", "body-surface-area-calculator"],
  },
  {
    slug: "protein-intake-calculator",
    category: "health",
    name: "Protein Intake Calculator",
    h1: "Protein Intake Calculator",
    tagline: "Find your daily protein target in grams based on weight and goal.",
    title: "Protein Intake Calculator — Daily Protein in Grams",
    description:
      "Free protein intake calculator. Find your daily protein target in grams based on your body weight and goal — general health, activity, building muscle or losing fat.",
    intro:
      "Find how much protein to eat each day, in grams, based on your body weight and goal. Active people and those building or preserving muscle need more than the basic RDA of 0.8 g per kg. The result is a sensible range to aim for, ideally spread across your meals. A general guide, not medical or dietary advice.",
    keywords: ["protein intake calculator", "protein calculator", "daily protein calculator", "how much protein do i need"],
    component: "protein-intake-calculator",
    volumeEstimate: 33100,
    howTo: [
      "Pick metric or imperial and enter your body weight.",
      "Choose your goal.",
      "Read your daily protein range in grams.",
    ],
    faqs: [
      { q: "How much protein do I need?", a: "The RDA is 0.8 g per kg of body weight for general health, but active people often aim for 1.2–1.6 g/kg, and those building or preserving muscle for 1.6–2.2 g/kg." },
      { q: "Can I eat too much protein?", a: "For healthy people, intakes up to around 2 g/kg are well tolerated. Those with kidney conditions should follow medical advice. Balance protein with overall calories and other nutrients." },
    ],
    related: ["macro-calculator", "bmr-calculator", "water-intake-calculator"],
  },
  {
    slug: "water-intake-calculator",
    category: "health",
    name: "Water Intake Calculator",
    h1: "Daily Water Intake Calculator",
    tagline: "Estimate how much water to drink each day from weight and activity.",
    title: "Water Intake Calculator — Daily Water Needs",
    description:
      "Free water intake calculator. Estimate how much water to drink each day from your body weight and exercise, in litres, fluid ounces and cups. Metric or imperial.",
    intro:
      "Estimate your daily water needs from your body weight (about 35 ml per kg) plus extra for exercise, shown in litres, fluid ounces and cups. Needs also rise with heat, altitude, illness and pregnancy, and water from food and other drinks counts too — so drink to thirst and check urine colour. A general guide, not medical advice.",
    keywords: ["water intake calculator", "daily water intake calculator", "how much water should i drink", "water calculator"],
    component: "water-intake-calculator",
    volumeEstimate: 18100,
    howTo: [
      "Pick metric or imperial and enter your body weight.",
      "Enter your typical daily exercise in minutes.",
      "Read your estimated daily water in litres, ounces and cups.",
    ],
    faqs: [
      { q: "How much water should I drink a day?", a: "A common guide is about 35 ml per kg of body weight, adjusted up for exercise and hot weather. The old 'eight glasses' rule is a rough average — your needs depend on your size and activity." },
      { q: "Does coffee or tea count?", a: "Yes — the fluid in tea, coffee, milk and food all contributes to hydration. The moderate caffeine in normal amounts doesn't dehydrate you." },
    ],
    related: ["protein-intake-calculator", "bmr-calculator", "macro-calculator"],
  },
  {
    slug: "body-surface-area-calculator",
    category: "health",
    name: "Body Surface Area Calculator",
    h1: "Body Surface Area (BSA) Calculator",
    tagline: "Calculate body surface area with Mosteller, Du Bois and Haycock.",
    title: "Body Surface Area Calculator — BSA (Mosteller)",
    description:
      "Free body surface area (BSA) calculator. Calculate BSA in m² from height and weight using the Mosteller, Du Bois and Haycock formulas. Metric or imperial.",
    intro:
      "Calculate body surface area (BSA) from your height and weight. BSA is used in medicine to dose some medications and assess metabolic needs. The Mosteller formula is the most widely used; the Du Bois and Haycock results are shown for comparison. An estimate for reference, not a prescription. Runs in your browser.",
    keywords: ["body surface area calculator", "bsa calculator", "mosteller bsa calculator", "body surface area"],
    component: "body-surface-area-calculator",
    volumeEstimate: 22200,
    howTo: [
      "Pick metric or imperial.",
      "Enter your weight and height.",
      "Read your BSA in m² from each formula.",
    ],
    faqs: [
      { q: "What is body surface area used for?", a: "BSA correlates with metabolic rate and organ size, so clinicians use it to calculate doses for some drugs (notably chemotherapy) and to index measurements like cardiac output." },
      { q: "Which BSA formula is best?", a: "Mosteller is the most common because it's simple and accurate; Du Bois is the classic original; Haycock works well across children and adults. They usually agree closely." },
    ],
    related: ["ideal-weight-calculator", "bmr-calculator", "body-fat-calculator"],
  },
];
