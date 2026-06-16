import type { Article } from "../types";

// Supporting guides for the Health & Fitness tools. YMYL: every figure cites an
// established formula or guideline, and the tone stays general (not medical advice).
export const healthArticles: Article[] = [
  {
    slug: "bmr-vs-tdee",
    category: "health",
    title: "BMR vs TDEE: How Many Calories Should You Eat?",
    h1: "BMR vs TDEE: How Many Calories Should You Eat?",
    description:
      "BMR and TDEE explained in plain English: what each means, how the Mifflin-St Jeor formula and activity multipliers work, and how to set calories to lose, gain or maintain weight.",
    keywords: ["bmr vs tdee", "how many calories should i eat", "what is tdee", "maintenance calories"],
    intro:
      "BMR and TDEE are the two numbers behind every calorie target. BMR is what your body burns at complete rest; TDEE is what you burn in a whole day once movement is added. Get these right and a weight goal becomes simple arithmetic — eat below TDEE to lose, above it to gain, around it to maintain.",
    sections: [
      {
        heading: "What BMR is",
        paragraphs: [
          "Your basal metabolic rate (BMR) is the energy your body uses just to keep you alive at rest — breathing, circulation, organ function, maintaining temperature. It's the single biggest part of what you burn, typically 60–70% of daily calories.",
          "The most accurate everyday estimate is the Mifflin-St Jeor equation, which uses your weight, height, age and sex. It's the formula our BMR calculator uses, and research finds it closer to measured values than the older Harris-Benedict equation for most people.",
        ],
      },
      {
        heading: "What TDEE is",
        paragraphs: [
          "Total daily energy expenditure (TDEE) is BMR plus everything else you do: walking, workouts, fidgeting and even digesting food. It's estimated by multiplying BMR by an activity factor.",
        ],
        bullets: [
          "Sedentary (little exercise): BMR × 1.2",
          "Light (1–3 days/week): BMR × 1.375",
          "Moderate (3–5 days/week): BMR × 1.55",
          "Active (6–7 days/week): BMR × 1.725",
          "Very active (hard daily training or physical job): BMR × 1.9",
        ],
      },
      {
        heading: "Turning TDEE into a weight goal",
        paragraphs: [
          "Roughly 7,700 calories equals one kilogram of body fat (about 3,500 per pound). So a daily deficit of ~500 calories below TDEE trends toward losing about 0.5 kg (1 lb) a week; the same surplus trends toward gaining.",
          "Eat at TDEE to maintain. For fat loss, a 10–20% deficit is sustainable for most people; for lean gains, a 5–15% surplus limits fat gain. Re-estimate your TDEE as your weight changes, since a lighter body burns less.",
        ],
      },
      {
        heading: "Where the estimate goes wrong",
        paragraphs: [
          "TDEE formulas are starting points, not lab measurements. The most common errors are over-rating your activity level, then 'eating back' exercise calories on top — double-counting movement the multiplier already included.",
          "Use the number for two to three weeks, track your weight trend, and adjust by 100–200 calories based on what actually happens. Real-world results beat any formula.",
        ],
      },
    ],
    faqs: [
      { q: "Should I eat below my BMR to lose weight faster?", a: "Generally no. Eating below BMR for long periods is hard to sustain and can cost you muscle and energy. A moderate deficit from TDEE (10–20%) is more sustainable. For very low-calorie plans, get professional guidance." },
      { q: "How accurate is a TDEE calculator?", a: "It's a solid estimate, usually within a few hundred calories. Bodies vary, so treat it as a starting point: track your weight for 2–3 weeks and fine-tune your intake from the trend." },
      { q: "Does TDEE change over time?", a: "Yes. As you lose or gain weight your BMR shifts, and activity changes too. Recalculate every few kilograms and whenever your routine changes." },
    ],
    relatedTools: ["bmr-calculator", "macro-calculator", "protein-intake-calculator"],
    relatedArticles: ["how-much-protein-per-day"],
    updated: "2026-06-15",
  },
  {
    slug: "how-much-protein-per-day",
    category: "health",
    title: "How Much Protein Do You Need a Day?",
    h1: "How Much Protein Do You Need a Day?",
    description:
      "How much protein to eat per day, by goal: the 0.8 g/kg RDA, 1.2–1.6 g/kg for active people, and 1.6–2.2 g/kg for building or preserving muscle — plus sources, timing and myths.",
    keywords: ["how much protein per day", "daily protein intake", "protein per kg", "how much protein to build muscle"],
    intro:
      "Protein builds and repairs muscle, keeps you full, and preserves lean mass when you're losing fat. How much you need depends mostly on your body weight and what you're training for — not a single 'one size' number.",
    sections: [
      {
        heading: "The numbers, by goal",
        paragraphs: [
          "Protein targets are set per kilogram of body weight so they scale to your size:",
        ],
        bullets: [
          "General health (the RDA): 0.8 g per kg — the minimum to avoid deficiency, not an optimum.",
          "Active and recreational: 1.2–1.4 g per kg.",
          "Building muscle: 1.6–2.2 g per kg.",
          "Losing fat while keeping muscle: 1.8–2.4 g per kg — higher protein protects lean mass in a deficit.",
          "Endurance athletes: 1.2–1.6 g per kg.",
        ],
      },
      {
        heading: "How to actually hit it",
        paragraphs: [
          "Spread protein across the day rather than loading it into one meal — roughly 0.4 g per kg per meal across three to four meals covers most people and maximises muscle-protein synthesis at each sitting.",
          "Good sources include chicken, fish, eggs, dairy and lean meat; plant eaters can combine legumes, tofu, tempeh, seitan and a wider variety of grains and pulses to get all the essential amino acids.",
        ],
      },
      {
        heading: "Common myths",
        paragraphs: [
          "\"High protein damages your kidneys.\" For people with healthy kidneys, higher protein intakes within the ranges above are well tolerated by the research. Those with existing kidney disease should follow medical advice.",
          "\"More is always better.\" Beyond roughly 2.2 g/kg there's little extra muscle benefit for most people — the surplus is just used for energy. Balance protein with enough carbs and fats and overall calories.",
        ],
      },
    ],
    faqs: [
      { q: "Is there an upper limit on protein?", a: "For healthy adults, intakes up to about 2 g/kg (and often higher for athletes) are considered safe in the literature. Extremely high intakes offer little added benefit. People with kidney conditions should follow their doctor's guidance." },
      { q: "Is plant protein as good as animal protein?", a: "Yes, with a little planning. Animal proteins are 'complete', but a varied plant-based diet (legumes, soy, grains, nuts) easily supplies all essential amino acids. You may aim slightly higher on total grams to account for digestibility." },
      { q: "Does protein timing matter?", a: "Total daily intake matters most. That said, spreading protein across meals — and including some after training — modestly helps muscle building compared with one large serving." },
    ],
    relatedTools: ["protein-intake-calculator", "macro-calculator", "bmr-calculator"],
    relatedArticles: ["bmr-vs-tdee"],
    updated: "2026-06-15",
  },
];
