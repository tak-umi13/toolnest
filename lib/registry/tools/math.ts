import type { Tool } from "../types";

// Math & Numbers category — universal, very-low-competition student/教育 terms
// validated across 10 English-speaking geographies (DataForSEO batch 9).
export const mathTools: Tool[] = [
  {
    slug: "percentage-difference-calculator",
    category: "math",
    name: "Percentage Difference Calculator",
    h1: "Percentage Difference Calculator",
    tagline: "Find the percentage difference and percentage change between two numbers.",
    title: "Percentage Difference Calculator — % Difference & Change",
    description:
      "Free percentage difference calculator. Find the percentage difference between two numbers (relative to their average) and the percentage change from one to the other.",
    intro:
      "Enter two numbers to get the percentage difference between them — measured symmetrically against their average, so the order doesn't matter — plus the percentage change from the first to the second, which is directional. People mean different things by 'percent difference', so both are shown with their formulas. Everything runs in your browser.",
    keywords: ["percentage difference calculator", "percent difference calculator", "percentage difference between two numbers", "percent change calculator"],
    component: "percentage-difference-calculator",
    volumeEstimate: 165000,
    howTo: [
      "Enter the first and second values.",
      "Read the percentage difference (symmetric) and percentage change (directional).",
      "Pick the one that matches what you need.",
    ],
    faqs: [
      { q: "What's the difference between percentage difference and percentage change?", a: "Percentage difference compares two values relative to their average, so it's symmetric (the order doesn't matter). Percentage change measures the move from a starting value to a new one and depends on which is the start." },
      { q: "How is percentage difference calculated?", a: "Percentage difference = |a − b| ÷ ((a + b) ÷ 2) × 100. The denominator is the average of the two values." },
      { q: "Which one should I use?", a: "Use percentage change when there's a clear 'before and after' (e.g. price went up). Use percentage difference when comparing two independent measurements neutrally." },
    ],
    related: ["percentage-calculator", "percentage-increase-calculator", "mean-median-mode-calculator"],
  },
  {
    slug: "decimal-to-fraction",
    category: "math",
    name: "Decimal to Fraction",
    h1: "Decimal to Fraction Converter",
    tagline: "Convert a decimal to a fraction in lowest terms — and fractions back to decimals.",
    title: "Decimal to Fraction Converter — and Fraction to Decimal",
    description:
      "Free decimal to fraction converter. Turn any terminating decimal into an exact fraction in lowest terms (with a mixed number), and convert fractions back to decimals.",
    intro:
      "Convert a decimal like 0.75 into an exact fraction in lowest terms (3/4), shown as a mixed number where it applies — or switch modes to turn a fraction such as 3/8 into its decimal value and reduced form. Handy for cooking, measurements, woodworking and math homework. Runs in your browser.",
    keywords: ["decimal to fraction", "decimal to fraction converter", "fraction to decimal", "convert decimal to fraction"],
    component: "decimal-to-fraction",
    volumeEstimate: 110000,
    howTo: [
      "Choose Decimal → Fraction or Fraction → Decimal.",
      "Type the decimal or the fraction.",
      "Read the result in lowest terms and copy it.",
    ],
    faqs: [
      { q: "How do you turn a decimal into a fraction?", a: "Write the decimal over a power of 10 (0.75 = 75/100), then divide top and bottom by their greatest common divisor to reduce it (75/100 = 3/4). The tool does this automatically." },
      { q: "Does it handle repeating decimals?", a: "It converts terminating decimals exactly. A repeating decimal entered with limited digits is treated as terminating, so it gives a very close fraction rather than the exact repeating one." },
      { q: "What's a mixed number?", a: "A whole number plus a fraction, like 1 1/4 for 1.25. The tool shows the mixed form when the fraction is greater than 1." },
    ],
    related: ["fraction-calculator", "percentage-calculator", "rounding-calculator"],
  },
  {
    slug: "fraction-calculator",
    category: "math",
    name: "Fraction Calculator",
    h1: "Fraction Calculator",
    tagline: "Add, subtract, multiply and divide fractions, reduced to lowest terms.",
    title: "Fraction Calculator — Add, Subtract, Multiply & Divide",
    description:
      "Free fraction calculator. Add, subtract, multiply and divide two fractions and get the answer in lowest terms, as a mixed number and as a decimal. Runs in your browser.",
    intro:
      "Enter two fractions and an operation (+, −, ×, ÷) to get the result automatically reduced to lowest terms, shown as a mixed number where possible and as a decimal. Perfect for homework, recipes and measurements. Everything runs in your browser.",
    keywords: ["fraction calculator", "adding fractions calculator", "multiplying fractions calculator", "fraction calculator with steps"],
    component: "fraction-calculator",
    volumeEstimate: 246000,
    howTo: [
      "Enter the numerator and denominator of each fraction.",
      "Choose add, subtract, multiply or divide.",
      "Read the answer in lowest terms, mixed and decimal forms.",
    ],
    faqs: [
      { q: "How do you add fractions with different denominators?", a: "Put them over a common denominator, add the numerators, then reduce. For example 1/2 + 1/3 = 3/6 + 2/6 = 5/6. The calculator handles the common denominator for you." },
      { q: "Does it simplify the answer?", a: "Yes — every result is reduced to lowest terms using the greatest common divisor, and shown as a mixed number when it's larger than 1." },
    ],
    related: ["decimal-to-fraction", "lcm-gcd-calculator", "percentage-calculator"],
  },
  {
    slug: "mean-median-mode-calculator",
    category: "math",
    name: "Mean, Median, Mode Calculator",
    h1: "Mean, Median & Mode Calculator",
    tagline: "Get mean, median, mode, range and standard deviation from a list of numbers.",
    title: "Mean Median Mode Calculator — Average & Std Dev",
    description:
      "Free mean, median and mode calculator. Paste a list of numbers to get the average (mean), median, mode, range, sum, count and standard deviation. Runs in your browser.",
    intro:
      "Paste or type a list of numbers to get the full set of basic statistics at once: mean (average), median, mode, range, minimum, maximum, sum, count, and both sample and population standard deviation. Numbers can be separated by commas, spaces or new lines. Great for school, data checks and reports. Runs in your browser.",
    keywords: ["mean median mode calculator", "average calculator", "standard deviation calculator", "mean median mode range calculator"],
    component: "mean-median-mode-calculator",
    volumeEstimate: 74000,
    howTo: [
      "Paste or type your numbers, separated by commas, spaces or new lines.",
      "Read the mean, median, mode, range and standard deviation.",
      "Use sample SD for a sample, population SD for a whole population.",
    ],
    faqs: [
      { q: "What's the difference between mean, median and mode?", a: "The mean is the average (sum ÷ count). The median is the middle value when sorted. The mode is the most frequent value. They can differ a lot when data is skewed." },
      { q: "Sample or population standard deviation?", a: "Use sample SD (divides by n−1) when your numbers are a sample of a larger group; use population SD (divides by n) when they're the entire population." },
      { q: "What if there's no mode?", a: "If no value repeats, there is no mode, and the tool says so. If several values tie for most frequent, all of them are shown." },
    ],
    related: ["percentage-difference-calculator", "rounding-calculator", "lcm-gcd-calculator"],
  },
  {
    slug: "lcm-gcd-calculator",
    category: "math",
    name: "LCM & GCD Calculator",
    h1: "LCM and GCD (HCF) Calculator",
    tagline: "Find the least common multiple and greatest common divisor of any numbers.",
    title: "LCM & GCD Calculator — Least Common Multiple & HCF",
    description:
      "Free LCM and GCD calculator. Find the least common multiple (LCM) and greatest common divisor (GCD / HCF) of two or more whole numbers instantly. Runs in your browser.",
    intro:
      "Enter two or more whole numbers to find their LCM (least common multiple) and GCD (greatest common divisor, also called HCF — highest common factor). Both are computed with the fast Euclidean algorithm. Useful for fractions, scheduling and number-theory homework. Runs in your browser.",
    keywords: ["lcm calculator", "gcd calculator", "hcf calculator", "least common multiple calculator"],
    component: "lcm-gcd-calculator",
    volumeEstimate: 49500,
    howTo: [
      "Enter two or more whole numbers, separated by commas or spaces.",
      "Read the GCD (HCF) and the LCM.",
      "Use them for reducing fractions or finding common denominators.",
    ],
    faqs: [
      { q: "What's the difference between LCM and GCD?", a: "The GCD (or HCF) is the largest number that divides all your numbers evenly. The LCM is the smallest number that all of them divide into evenly. They're related: for two numbers, LCM × GCD = the product of the numbers." },
      { q: "Is HCF the same as GCD?", a: "Yes. HCF (highest common factor) and GCD (greatest common divisor) are two names for the same thing." },
    ],
    related: ["fraction-calculator", "prime-number-checker", "decimal-to-fraction"],
  },
  {
    slug: "prime-number-checker",
    category: "math",
    name: "Prime Number Checker",
    h1: "Prime Number Checker",
    tagline: "Check if a number is prime, with its factors and the nearest primes.",
    title: "Prime Number Checker — Is It Prime? + Factorization",
    description:
      "Free prime number checker. Find out if a number is prime, see its prime factorization if it isn't, and get the previous and next prime numbers. Runs in your browser.",
    intro:
      "Enter a whole number to check whether it's prime. If it isn't, you get its prime factorization (e.g. 84 = 2² × 3 × 7), and either way you see the previous and next prime numbers. Useful for math homework, cryptography study and curiosity. Runs in your browser.",
    keywords: ["prime number checker", "is it a prime number", "prime factorization calculator", "prime number calculator"],
    component: "prime-number-checker",
    volumeEstimate: 49500,
    howTo: [
      "Enter a whole number.",
      "See whether it's prime, with its prime factors if not.",
      "Check the previous and next prime numbers.",
    ],
    faqs: [
      { q: "What is a prime number?", a: "A prime number is a whole number greater than 1 that has exactly two divisors: 1 and itself. 2, 3, 5, 7 and 11 are the first few. 1 is not prime." },
      { q: "What is prime factorization?", a: "Writing a number as a product of prime numbers — for example 84 = 2 × 2 × 3 × 7, or 2² × 3 × 7. Every whole number above 1 has a unique prime factorization." },
    ],
    related: ["lcm-gcd-calculator", "factorial-calculator", "square-root-calculator"],
  },
  {
    slug: "square-root-calculator",
    category: "math",
    name: "Square Root Calculator",
    h1: "Square Root Calculator",
    tagline: "Find the square root, cube root and any nth root of a number.",
    title: "Square Root Calculator — √, Cube Root & nth Root",
    description:
      "Free square root calculator. Find the square root, cube root and any nth root of a number, and check whether it's a perfect square. Runs in your browser.",
    intro:
      "Enter a number to get its square root and cube root, plus any nth root you choose by setting the degree. It also tells you when a number is a perfect square. Negative numbers have no real square root (or even root), which the tool indicates. Runs in your browser.",
    keywords: ["square root calculator", "square root of a number", "cube root calculator", "nth root calculator"],
    component: "square-root-calculator",
    volumeEstimate: 33100,
    howTo: [
      "Enter a number.",
      "Read the square root and cube root.",
      "Set the degree for any other nth root.",
    ],
    faqs: [
      { q: "What is a square root?", a: "The square root of a number x is the value that, multiplied by itself, gives x. For example √9 = 3 because 3 × 3 = 9." },
      { q: "Can you take the square root of a negative number?", a: "Not within the real numbers — there's no real value whose square is negative. The tool shows — for the square root (and even roots) of negatives." },
      { q: "What's a perfect square?", a: "A number whose square root is a whole number, like 16 (√16 = 4) or 81 (√81 = 9). The tool flags these." },
    ],
    related: ["prime-number-checker", "rounding-calculator", "percentage-calculator"],
  },
  {
    slug: "rounding-calculator",
    category: "math",
    name: "Rounding Calculator",
    h1: "Rounding Calculator",
    tagline: "Round numbers to decimals, significant figures or the nearest 10/100/1000.",
    title: "Rounding Calculator — Decimals, Sig Figs & Nearest",
    description:
      "Free rounding calculator. Round any number to a set number of decimal places or significant figures, or to the nearest 10, 100 or 1000, with round, floor and ceil modes.",
    intro:
      "Round a number however you need: to a chosen number of decimal places, to significant figures, or to the nearest 10, 100 or 1000. Switch between round-to-nearest, round down (floor) and round up (ceiling). Useful for reports, estimates and homework. Runs in your browser.",
    keywords: ["rounding calculator", "round to the nearest", "significant figures calculator", "round numbers calculator"],
    component: "rounding-calculator",
    volumeEstimate: 14800,
    howTo: [
      "Enter a number and pick round, floor or ceil.",
      "Choose decimal places or significant figures with the sliders.",
      "Read the rounded value, including to the nearest 10/100/1000.",
    ],
    faqs: [
      { q: "What are significant figures?", a: "The digits that carry meaning in a number's precision, starting from the first non-zero digit. Rounding 3.14159 to 3 significant figures gives 3.14." },
      { q: "What's the difference between floor and ceil?", a: "Floor always rounds down toward negative infinity; ceil always rounds up toward positive infinity; round goes to the nearest, with .5 rounding up." },
    ],
    related: ["decimal-to-fraction", "mean-median-mode-calculator", "percentage-calculator"],
  },
];
