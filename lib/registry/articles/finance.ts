import type { Article } from "../types";

// Supporting-content cluster for the India finance tools — the highest-value
// validated opportunities (gst calculator: 301k vol / KD 18; emi calculator:
// 2.74M vol / KD 23). Each guide targets an informational keyword orbiting the
// tool's commercial keyword and links back to the tool, building the topical
// authority that lets the tool pages rank.

export const financeArticles: Article[] = [
  {
    slug: "what-is-gst",
    category: "finance",
    title: "What is GST? India's Goods and Services Tax, Explained Simply",
    h1: "What is GST? A Plain-English Guide",
    description:
      "GST explained for India: how the Goods and Services Tax works, CGST vs SGST vs IGST, the current slabs, who must register and how input tax credit works.",
    keywords: ["what is gst", "gst meaning", "gst explained", "cgst sgst igst"],
    intro:
      "GST — the Goods and Services Tax — is India's single indirect tax on the supply of goods and services. Introduced on 1 July 2017, it replaced a patchwork of older taxes (VAT, service tax, central excise, octroi and more) with one nationwide system. This guide explains how it works in plain English.",
    sections: [
      {
        heading: "GST in one minute",
        paragraphs: [
          "GST is a consumption tax: it is charged at every stage of a supply chain, but businesses can claim back the tax they already paid on their inputs (called input tax credit). The result is that tax effectively applies only to the value each business adds, and the final consumer bears the full tax.",
          "It is also destination-based — the tax revenue goes to the state where the goods or services are consumed, not where they are produced.",
        ],
      },
      {
        heading: "CGST, SGST and IGST — what the split means",
        paragraphs: [
          "Every GST charge is collected under one of three heads, depending on where the buyer and seller are:",
        ],
        bullets: [
          "Within one state (intra-state): the rate is split equally into CGST (centre) and SGST (state). An 18% sale becomes 9% CGST + 9% SGST.",
          "Across states (inter-state) and imports: the full rate is collected as IGST by the centre, then settled with the destination state.",
          "For you as a buyer the total is the same either way — the split only changes which government receives it.",
        ],
      },
      {
        heading: "The current GST slabs",
        paragraphs: [
          "Since the rate rationalisation that took effect in September 2025 (often called 'GST 2.0'), the structure is much simpler than the original four-slab system:",
        ],
        bullets: [
          "0% — essential items such as unbranded food staples and many education and health services.",
          "5% — common mass-consumption goods and services.",
          "18% — the standard rate for most goods and services, including professional and IT services.",
          "40% — a demerit rate for items like tobacco, pan masala, aerated drinks and luxury cars.",
          "The older 12% and 28% slabs were largely merged into 5% and 18%, though you may still see them on older invoices.",
        ],
      },
      {
        heading: "Who has to register for GST",
        paragraphs: [
          "Registration becomes mandatory once your aggregate annual turnover crosses the threshold — broadly ₹40 lakh for goods and ₹20 lakh for services in most states (lower limits apply in special category states). Some activities, such as selling through e-commerce platforms or making inter-state supplies of goods, require registration regardless of turnover.",
          "Registered businesses receive a 15-character GSTIN and must file periodic returns. Small businesses can opt for the composition scheme, paying a low flat rate in exchange for simpler compliance (with restrictions, such as not collecting GST from customers or claiming input credit).",
        ],
      },
      {
        heading: "Input tax credit: why GST is not a tax on tax",
        paragraphs: [
          "Input tax credit (ITC) is the mechanism that prevents cascading. If a manufacturer pays ₹180 GST on raw materials and collects ₹360 GST on the finished product, it deposits only the difference (₹180) with the government.",
          "This is why valid GST invoices matter so much in B2B trade — without your supplier's invoice reported correctly, you cannot claim the credit.",
        ],
      },
    ],
    faqs: [
      { q: "Is GST a direct or indirect tax?", a: "Indirect. It is charged on the supply of goods and services and passed along the chain to the final consumer, unlike income tax, which you pay directly on earnings." },
      { q: "Do salaried employees have to pay GST?", a: "Not on a salary — employment services are outside GST. Everyone pays GST as a consumer, though, since it is built into the price of most goods and services." },
      { q: "What taxes did GST replace?", a: "Central excise duty, service tax, VAT, CST, octroi/entry tax, luxury tax and several cesses, among others — consolidated into one tax with a shared centre/state structure." },
    ],
    relatedTools: ["gst-calculator"],
    relatedArticles: ["gst-slab-rates-india", "how-to-calculate-gst", "gst-for-freelancers"],
  },
  {
    slug: "gst-slab-rates-india",
    category: "finance",
    title: "GST Slab Rates in India, Explained (with Examples)",
    h1: "GST Slab Rates in India, Explained",
    description:
      "Current GST slab rates in India after the 2025 rationalisation: what falls under 0%, 5%, 18% and the 40% demerit rate, how CGST/SGST split works, and how to find your rate.",
    keywords: ["gst rates india", "gst slab rates", "gst slabs", "18 percent gst items"],
    intro:
      "India's GST started with four main slabs (5%, 12%, 18%, 28%). The September 2025 rate rationalisation collapsed that into a much simpler structure built around two main rates. Here is what applies now, with examples.",
    sections: [
      {
        heading: "The slab structure after September 2025",
        paragraphs: ["The GST Council's 2025 reform moved most items into two rates:"],
        bullets: [
          "0% (exempt/nil) — unbranded food staples, many healthcare and education services, and individual life and health insurance premiums.",
          "5% (merit rate) — everyday mass-consumption items, many packaged foods, footwear and apparel in lower price bands, and other essentials.",
          "18% (standard rate) — the default for most goods and services: electronics, professional and IT services, restaurants outside composition, financial services and more.",
          "40% (demerit rate) — tobacco products, pan masala, aerated/sugary drinks and luxury vehicles.",
        ],
      },
      {
        heading: "What happened to 12% and 28%?",
        paragraphs: [
          "They were largely abolished: most 12% items moved down to 5% and most 28% items moved to 18%, with demerit goods moving up to the new 40% rate. You will still encounter 12% and 28% on invoices issued before the change, and a handful of transitional cases — which is why GST calculators (including ours) still support those rates.",
        ],
      },
      {
        heading: "How the rate splits into CGST and SGST",
        paragraphs: ["For a sale within one state, whatever the slab, the rate splits equally between centre and state:"],
        bullets: [
          "5% → 2.5% CGST + 2.5% SGST",
          "18% → 9% CGST + 9% SGST",
          "40% → 20% CGST + 20% SGST",
          "Inter-state sales charge the full rate as IGST instead.",
        ],
      },
      {
        heading: "How to find the rate for your product or service",
        paragraphs: [
          "Every product has an HSN code and every service a SAC code, and the GST rate is fixed per code. Search the official CBIC rate finder (cbic-gst.gov.in) or check your supplier's invoice, which must state the HSN/SAC and the rate. When in doubt for services, 18% is the safest working assumption.",
        ],
      },
    ],
    faqs: [
      { q: "What are the main GST slabs now?", a: "Two main rates — 5% and 18% — plus 0% for exempt essentials and a 40% demerit rate for goods like tobacco and luxury cars, following the September 2025 rationalisation." },
      { q: "Is there still a 28% GST slab?", a: "Mostly no. The 28% slab was dismantled in the 2025 reform: most items moved to 18%, while demerit goods moved to the new 40% rate. Legacy invoices may still show 28%." },
      { q: "What GST rate applies to IT and professional services?", a: "18% — they sit in the standard slab. Exported services are zero-rated if you file a Letter of Undertaking (LUT)." },
    ],
    relatedTools: ["gst-calculator"],
    relatedArticles: ["what-is-gst", "how-to-calculate-gst"],
  },
  {
    slug: "how-to-calculate-gst",
    category: "finance",
    title: "How to Calculate GST: Add & Remove GST with Examples",
    h1: "How to Calculate GST (Add and Remove)",
    description:
      "Step-by-step GST calculation: the formula to add GST to a base price, the reverse formula to remove GST from an inclusive price, worked examples and common mistakes.",
    keywords: ["how to calculate gst", "gst calculation formula", "reverse gst calculation", "remove gst from total"],
    intro:
      "GST maths comes in two directions: adding GST to a base price (exclusive → inclusive) and removing GST from a total (inclusive → exclusive). The second one is where most mistakes happen. Here are both formulas with worked examples.",
    sections: [
      {
        heading: "Adding GST to a base price",
        paragraphs: [
          "GST amount = base price × rate ÷ 100. Total = base price + GST amount.",
          "Example at 18%: base ₹1,000 → GST = 1,000 × 18 ÷ 100 = ₹180 → total ₹1,180. For an intra-state sale that is ₹90 CGST + ₹90 SGST.",
        ],
      },
      {
        heading: "Removing GST from an inclusive price (reverse GST)",
        paragraphs: [
          "Base price = total ÷ (1 + rate ÷ 100). GST amount = total − base price.",
          "Example at 18%: total ₹1,180 → base = 1,180 ÷ 1.18 = ₹1,000 → GST = ₹180.",
          "At 5%: total ₹2,100 → base = 2,100 ÷ 1.05 = ₹2,000 → GST = ₹100.",
        ],
      },
      {
        heading: "The classic mistake: subtracting the percentage directly",
        paragraphs: [
          "Taking 18% off ₹1,180 gives ₹212.40 — which is wrong, because the 18% was charged on the smaller base (₹1,000), not on the total. Whenever you start from a GST-inclusive figure, divide by (1 + rate/100); never multiply the total by the rate.",
        ],
      },
      {
        heading: "Do it instantly instead",
        paragraphs: [
          "Our GST calculator does both directions with the CGST/SGST split shown automatically — enter the amount, pick the slab, and choose add or remove.",
        ],
      },
    ],
    faqs: [
      { q: "What is the formula to remove GST from a total?", a: "Base = total ÷ (1 + rate/100). For 18% GST on a ₹1,180 total: 1,180 ÷ 1.18 = ₹1,000 base, so the GST portion is ₹180." },
      { q: "Why can't I just subtract 18% from the inclusive price?", a: "Because the 18% was calculated on the base price, which is smaller than the total. Subtracting 18% of the total removes too much — ₹212.40 instead of ₹180 in the ₹1,180 example." },
      { q: "How do I split GST into CGST and SGST?", a: "Divide the GST amount by two for an intra-state sale: ₹180 GST at 18% = ₹90 CGST + ₹90 SGST. Inter-state sales charge the whole amount as IGST instead." },
    ],
    relatedTools: ["gst-calculator", "percentage-calculator"],
    relatedArticles: ["what-is-gst", "gst-slab-rates-india"],
  },
  {
    slug: "gst-for-freelancers",
    category: "finance",
    title: "GST for Freelancers in India: Registration, Rates & Invoicing",
    h1: "GST for Freelancers in India: When You Must Register",
    description:
      "Do freelancers in India need GST registration? The ₹20 lakh threshold, export of services and LUT, the 18% rate, invoicing basics and returns — explained simply.",
    keywords: ["gst for freelancers", "freelancer gst registration", "gst on freelance income india", "export of services gst"],
    intro:
      "Freelancing income in India counts as a supply of services under GST. Whether you must register, charge GST, or can invoice foreign clients without it depends on your turnover and where your clients are. Here are the rules that matter.",
    sections: [
      {
        heading: "The registration threshold",
        paragraphs: [
          "As a service provider you must register for GST once your aggregate turnover in a financial year crosses ₹20 lakh (₹10 lakh in special category states). 'Aggregate' means all your freelance income across India combined — not per client.",
          "Below the threshold, registration is optional. Some freelancers register voluntarily anyway: it lets them claim input tax credit on business expenses and looks more established to corporate clients.",
        ],
      },
      {
        heading: "Foreign clients: export of services is zero-rated",
        paragraphs: [
          "Services delivered to clients outside India, paid in foreign currency, generally qualify as export of services — which is zero-rated, not exempt. That distinction matters: zero-rated means you charge 0% GST but can still claim input credit.",
          "To invoice exports without charging IGST, file a Letter of Undertaking (LUT) on the GST portal — a simple online declaration, renewed each financial year. Without an LUT you would have to charge IGST and claim a refund later, which ties up cash.",
        ],
      },
      {
        heading: "What rate applies to freelance services",
        paragraphs: [
          "Most professional services — software development, design, writing, marketing, consulting — fall in the standard 18% slab. For an Indian client in another state you charge 18% IGST; for a client in your own state, 9% CGST + 9% SGST.",
        ],
      },
      {
        heading: "Invoices and returns",
        paragraphs: [
          "Once registered you must issue GST-compliant invoices — your GSTIN, the client's GSTIN (for B2B), SAC code, rate and the tax broken out — and file returns (GSTR-1 for sales, GSTR-3B for summary and payment). Smaller taxpayers can use the quarterly QRMP scheme to reduce filing frequency.",
          "A composition-style scheme also exists for small service providers (6% up to ₹50 lakh turnover), but it bars you from claiming input credit and from inter-state supply, which rules it out for most freelancers with out-of-state or foreign clients.",
        ],
      },
    ],
    faqs: [
      { q: "I earn under ₹20 lakh from freelancing. Do I need GST?", a: "Generally no — registration becomes mandatory only past ₹20 lakh aggregate turnover (₹10 lakh in special category states). You can register voluntarily for input credit or client credibility." },
      { q: "Do I charge GST to clients in the US or Europe?", a: "No, if the work qualifies as export of services (client outside India, payment in foreign exchange). File a Letter of Undertaking (LUT) so you can invoice at 0% without paying and reclaiming IGST." },
      { q: "What SAC code and rate do most freelancers use?", a: "It depends on the service — e.g. IT/software services commonly fall under SAC 9983* codes at 18%. Your invoice must state the SAC and the rate." },
    ],
    relatedTools: ["gst-calculator"],
    relatedArticles: ["what-is-gst", "how-to-calculate-gst"],
  },
  {
    slug: "how-emi-is-calculated",
    category: "finance",
    title: "How EMI Is Calculated: Formula, Worked Example & What Changes It",
    h1: "How EMI Is Calculated, Step by Step",
    description:
      "The EMI formula explained with a worked home-loan example: how banks compute your monthly instalment, why early EMIs are mostly interest, and what changes your EMI.",
    keywords: ["how is emi calculated", "emi calculation formula", "emi formula", "loan amortization india"],
    intro:
      "Your EMI (Equated Monthly Instalment) looks like one flat number, but inside it the mix of interest and principal changes every month. Here is the exact formula banks use, a worked example, and the levers that move it.",
    sections: [
      {
        heading: "The formula",
        paragraphs: [
          "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of monthly instalments.",
          "This is the reducing-balance method: each month's interest is charged only on the principal still outstanding, which is why the same EMI slowly shifts from interest-heavy to principal-heavy.",
        ],
      },
      {
        heading: "Worked example: ₹30 lakh home loan",
        paragraphs: ["Take ₹30,00,000 at 8.5% per annum for 20 years (240 months). The monthly rate is 8.5 ÷ 12 ÷ 100 = 0.7083%."],
        bullets: [
          "EMI ≈ ₹26,035 per month",
          "Total paid over 20 years ≈ ₹62.5 lakh",
          "Total interest ≈ ₹32.5 lakh — more than the loan itself, which is normal at long tenures",
        ],
      },
      {
        heading: "Why early EMIs barely reduce your loan",
        paragraphs: [
          "In month one of the example, interest is 0.7083% of ₹30 lakh ≈ ₹21,250 — so only about ₹4,785 of the ₹26,035 EMI actually repays principal. Twenty years later the proportions are reversed. This is also why prepaying in the early years saves dramatically more interest than prepaying late.",
        ],
      },
      {
        heading: "What moves your EMI",
        paragraphs: ["Three inputs decide everything:"],
        bullets: [
          "Principal — EMI scales directly: borrow 10% less, pay 10% lower EMI.",
          "Rate — on the example loan, 8.5% → 8.0% drops the EMI from about ₹26,035 to about ₹25,093 and saves roughly ₹2.3 lakh of interest.",
          "Tenure — stretching the tenure lowers the EMI but raises total interest sharply; shortening does the reverse.",
        ],
      },
    ],
    faqs: [
      { q: "Does my EMI change when interest rates change?", a: "On a floating-rate loan, yes — though many banks keep the EMI fixed and stretch the tenure instead, unless you ask them to re-fix the EMI." },
      { q: "Is the EMI the same every month?", a: "On a fixed-rate loan, yes. What changes invisibly is the split inside it: early EMIs are mostly interest, later EMIs mostly principal." },
      { q: "What is reducing-balance interest?", a: "Interest charged each month only on the principal still outstanding, rather than on the original loan amount. Home, car and most bank loans in India use this method." },
    ],
    relatedTools: ["emi-calculator"],
    relatedArticles: ["how-to-reduce-home-loan-emi", "flat-vs-reducing-balance-interest"],
  },
  {
    slug: "how-to-reduce-home-loan-emi",
    category: "finance",
    title: "How to Reduce Your Home Loan EMI (or Pay Far Less Interest)",
    h1: "How to Reduce Your Home Loan EMI",
    description:
      "Practical ways to cut a home loan EMI or total interest in India: prepayment strategy, rate negotiation and balance transfer, and the EMI-vs-tenure trade-off explained.",
    keywords: ["how to reduce home loan emi", "reduce emi", "home loan prepayment", "home loan balance transfer"],
    intro:
      "There are two different goals people mix up: a lower monthly EMI (cash-flow relief) and lower total interest (real savings). Some levers achieve one at the cost of the other. Here are the moves that work, and the trade-offs behind each.",
    sections: [
      {
        heading: "Prepay principal — the biggest lever",
        paragraphs: [
          "Every rupee of prepayment goes straight to outstanding principal, and all future interest is computed on the smaller balance. Because early EMIs are interest-heavy, prepayments in the first third of the tenure save several times their value in interest.",
          "RBI rules bar prepayment penalties on floating-rate loans to individuals, so for most home loans prepaying is free.",
        ],
      },
      {
        heading: "When you prepay: cut tenure, not EMI",
        paragraphs: [
          "Banks will offer either a lower EMI for the same tenure, or the same EMI for a shorter tenure. If you can afford the current EMI, choose the shorter tenure — it removes the most interest-heavy months from the end of the schedule and saves far more in total.",
        ],
      },
      {
        heading: "Negotiate the rate or transfer the balance",
        paragraphs: [
          "Existing customers often pay more than new ones. Ask your bank to reset your spread (there is usually a small conversion fee), or move the loan to a cheaper lender via balance transfer.",
          "Even 0.5% matters: on a ₹30 lakh / 20-year loan, 8.5% → 8.0% lowers the EMI by roughly ₹950 a month and total interest by about ₹2.3 lakh. Weigh that against processing fees before switching.",
        ],
      },
      {
        heading: "Extending tenure: the emergency-only option",
        paragraphs: [
          "Stretching the remaining tenure lowers the EMI immediately, but every extra year adds interest-heavy months. Treat it as cash-flow first-aid during income shocks, not as savings — and shorten the tenure again once finances recover.",
        ],
      },
    ],
    faqs: [
      { q: "Is there a penalty for prepaying a home loan?", a: "Not on floating-rate loans to individuals — RBI rules prohibit it. Fixed-rate loans can carry a prepayment charge; check your sanction letter." },
      { q: "Should I reduce the EMI or the tenure when I prepay?", a: "Reduce the tenure if you can afford the current EMI. It eliminates the costliest months at the end of the schedule and saves substantially more interest than an EMI reduction." },
      { q: "Do small monthly prepayments help?", a: "Yes. Even one extra EMI per year, paid early in the tenure, can shave years off a 20-year loan because it compounds against the principal." },
    ],
    relatedTools: ["emi-calculator", "percentage-calculator"],
    relatedArticles: ["how-emi-is-calculated", "flat-vs-reducing-balance-interest"],
  },
  {
    slug: "flat-vs-reducing-balance-interest",
    category: "finance",
    title: "Flat Rate vs Reducing Balance Interest: the Trap, Explained",
    h1: "Flat Rate vs Reducing Balance: Why the 'Cheap' Loan Isn't",
    description:
      "Flat interest rates look about half the price of reducing-balance rates but cost nearly the same — or more. The difference explained with one worked example.",
    keywords: ["flat vs reducing interest rate", "flat interest rate", "reducing balance interest", "effective interest rate loan"],
    intro:
      "A '10% flat' loan sounds cheaper than a '15% reducing' loan. It usually isn't. Flat rates charge interest on the original loan amount for the whole tenure — even the part you have already repaid — and that accounting trick roughly doubles the effective cost.",
    sections: [
      {
        heading: "The two methods in one sentence each",
        paragraphs: [
          "Flat rate: interest = principal × rate × years, computed on the full original principal regardless of repayments.",
          "Reducing balance: interest accrues each month only on what you still owe — the method banks use for home and most personal loans.",
        ],
      },
      {
        heading: "Same 10%, very different bills",
        paragraphs: ["Borrow ₹1,00,000 for 2 years at '10%' under each method:"],
        bullets: [
          "Flat 10%: interest = 1,00,000 × 10% × 2 = ₹20,000. EMI = ₹5,000.",
          "Reducing 10%: EMI ≈ ₹4,614. Total interest ≈ ₹10,750.",
          "The flat loan costs almost twice as much for the same headline rate.",
        ],
      },
      {
        heading: "The conversion rule of thumb",
        paragraphs: [
          "For typical 1–5 year tenures, a flat rate is equivalent to roughly 1.8× the reducing-balance rate. So '10% flat' really costs about 18% reducing — useful mental math when a dealer quotes a suspiciously low rate.",
          "Flat rates are most common in vehicle loans, consumer-durable finance and some personal loans. Always ask which method applies and what the APR (annual percentage rate) is.",
        ],
      },
      {
        heading: "How to compare two loan offers fairly",
        paragraphs: [
          "Put both offers through an EMI calculator on reducing-balance terms, or simply compare the total amount payable over the tenure. The total rupee outflow cuts through every rate-quoting trick.",
        ],
      },
    ],
    faqs: [
      { q: "Is quoting a flat rate legal?", a: "Yes, but lenders must disclose terms, and comparing the APR or total payable exposes the real cost. Treat any quoted 'flat' rate as roughly 1.8× when comparing to bank loans." },
      { q: "Which method do banks use for home loans?", a: "Reducing balance (also called diminishing balance) — interest is charged monthly on the outstanding principal only." },
      { q: "How do I convert a flat rate to a reducing rate?", a: "Multiply by roughly 1.8 for typical tenures. A 9% flat ≈ 16% reducing. For precision, compute the EMI both ways and compare totals." },
    ],
    relatedTools: ["emi-calculator", "simple-interest-calculator"],
    relatedArticles: ["how-emi-is-calculated", "how-to-reduce-home-loan-emi"],
  },
  {
    slug: "simple-vs-compound-interest",
    category: "finance",
    title: "Simple vs Compound Interest: the Difference, with One Example",
    h1: "Simple vs Compound Interest: the Difference That Builds Wealth",
    description:
      "Simple and compound interest compared with the same numbers: formulas, a 10-year example, the rule of 72, and where each type shows up in real life.",
    keywords: ["simple interest vs compound interest", "difference between simple and compound interest", "compound interest explained", "rule of 72"],
    intro:
      "Simple interest pays you on your principal only. Compound interest pays you on your principal plus all the interest you have already earned — and that one difference is most of what people mean by 'making money work for you'.",
    sections: [
      {
        heading: "The formulas",
        paragraphs: [
          "Simple interest: SI = P × R × T ÷ 100 — the same rupee amount of interest every year.",
          "Compound interest: A = P × (1 + R/100)^T for annual compounding — each year's interest joins the base for the next year.",
        ],
      },
      {
        heading: "Same numbers, ten years apart",
        paragraphs: ["Invest ₹1,00,000 at 8% for 10 years:"],
        bullets: [
          "Simple interest: ₹8,000 every year → ₹80,000 total. Final amount ₹1,80,000.",
          "Compound (annual): final amount ≈ ₹2,15,892 — interest of ₹1,15,892, about 45% more.",
          "Stretch it to 20 years and compounding earns ₹3.66 lakh vs ₹1.6 lakh — the gap accelerates with time.",
        ],
      },
      {
        heading: "Compounding frequency and the rule of 72",
        paragraphs: [
          "More frequent compounding earns slightly more: 8% compounded quarterly is an effective 8.24% per year, which is why bank FDs (which compound quarterly) quote both a nominal rate and a higher annualised yield.",
          "The rule of 72 is the quick mental check: divide 72 by the annual rate to estimate doubling time. At 8%, money doubles in about 9 years; at 12%, about 6.",
        ],
      },
      {
        heading: "Where each shows up in real life",
        paragraphs: [],
        bullets: [
          "Simple interest: some short-term deposits and bonds, certain personal/gold loans, most penalty interest.",
          "Compound interest working for you: fixed deposits, reinvested mutual funds and SIPs, PPF/EPF.",
          "Compound interest working against you: credit card balances and unpaid loan interest — the same acceleration, in reverse.",
        ],
      },
    ],
    faqs: [
      { q: "What is the rule of 72?", a: "A quick estimate of doubling time: 72 ÷ annual rate ≈ years to double. At 8% your money doubles in roughly 9 years under compound interest." },
      { q: "Does compounding frequency really matter?", a: "Somewhat — 8% compounded quarterly is an effective 8.24% annually. Frequency matters less than the rate and far less than time invested." },
      { q: "Are SIP returns compound interest?", a: "Mutual fund returns are market-linked, not a fixed rate, but growth is reinvested so the compounding effect applies — which is why SIP projections use the compound formula." },
    ],
    relatedTools: ["simple-interest-calculator", "compound-interest-calculator", "fd-calculator", "sip-calculator"],
    relatedArticles: ["how-emi-is-calculated", "flat-vs-reducing-balance-interest"],
  },
  {
    slug: "what-is-sip",
    category: "finance",
    title: "What is a SIP? Systematic Investment Plans, Explained Simply",
    h1: "What is a SIP and How Does It Work?",
    description:
      "SIP (Systematic Investment Plan) explained: how monthly mutual fund investing works, rupee cost averaging, the role of compounding, and what SIPs do and don't guarantee.",
    keywords: ["what is sip", "sip meaning", "how sip works", "systematic investment plan"],
    intro:
      "A SIP — Systematic Investment Plan — is simply a standing instruction to invest a fixed amount into a mutual fund every month. It is not a product in itself, just a disciplined way of buying one. Here is how it works and why it became India's default way to invest.",
    sections: [
      {
        heading: "SIP in one minute",
        paragraphs: [
          "On a date you choose, a fixed amount (often as little as ₹500) moves from your bank account into a mutual fund of your choice, buying units at that day's NAV. That's the whole mechanism — repeated monthly, for years.",
          "The power is in what the repetition does: it removes the decision of when to invest, which is exactly the decision most investors get wrong.",
        ],
      },
      {
        heading: "Rupee cost averaging: buying more when it's cheap",
        paragraphs: ["Because the amount is fixed, your money automatically buys more units when prices fall and fewer when they rise:"],
        bullets: [
          "Month 1 — NAV ₹50: ₹5,000 buys 100 units",
          "Month 2 — NAV ₹40 (market dips): ₹5,000 buys 125 units",
          "Month 3 — NAV ₹55: ₹5,000 buys ~91 units",
          "Your average cost ends up below the average price — dips work for you instead of scaring you out.",
        ],
      },
      {
        heading: "Compounding needs time more than amount",
        paragraphs: [
          "A ₹10,000 monthly SIP at an assumed 12% annual return grows to roughly ₹1 crore in 20 years — of which only ₹24 lakh is money you put in; the rest is growth on growth. Halve the time and the corpus falls to about ₹23 lakh, not half. The years matter more than the monthly amount.",
        ],
      },
      {
        heading: "What a SIP does not do",
        paragraphs: [
          "A SIP does not guarantee returns, does not eliminate market risk, and does not magically beat lump-sum investing in every scenario — it smooths your entry price and automates discipline. The fund you choose still determines what you actually earn.",
          "SIPs are also flexible: you can pause, stop, increase (step-up SIP) or redeem without penalty in most open-ended funds (tax and exit loads aside).",
        ],
      },
    ],
    faqs: [
      { q: "What is the minimum SIP amount?", a: "Many funds accept SIPs from ₹500 a month (some from ₹100). The right amount is whatever you can sustain for years without pausing." },
      { q: "Does the SIP date matter?", a: "Studies of Indian market data show date-of-month effects are negligible over long periods. Pick a date just after your salary credit so the debit never fails." },
      { q: "Can I lose money in a SIP?", a: "Yes, especially over short periods — SIPs invest in market-linked funds. Historically, longer holding periods have sharply reduced the odds of loss in diversified equity funds, but nothing is guaranteed." },
    ],
    relatedTools: ["sip-calculator", "lumpsum-calculator"],
    relatedArticles: ["sip-vs-lumpsum", "sip-vs-fd", "simple-vs-compound-interest"],
  },
  {
    slug: "sip-vs-lumpsum",
    category: "finance",
    title: "SIP vs Lumpsum: Which Way Should You Invest?",
    h1: "SIP vs Lumpsum: Which Should You Choose?",
    description:
      "SIP or lumpsum? When each approach wins, what the math says about time in the market, and the practical answer for salaried investors and windfalls.",
    keywords: ["sip vs lumpsum", "lumpsum or sip", "sip vs one time investment", "stp mutual fund"],
    intro:
      "SIP and lumpsum are not rival products — they are two ways of feeding the same fund. Which one suits you depends on one question: is your money arriving monthly, or is it already sitting in your account?",
    sections: [
      {
        heading: "The core difference",
        paragraphs: [
          "A lumpsum puts the full amount to work on day one, so every rupee compounds for the whole period. A SIP staggers entries, so early instalments compound longest and later ones barely at all. In a steadily rising market, lumpsum mathematically wins — more time in the market beats timing the market.",
        ],
      },
      {
        heading: "When SIP wins",
        paragraphs: ["SIP earns its reputation in the real world, not the spreadsheet:"],
        bullets: [
          "Your income is monthly — there is no lumpsum to invest, so SIP vs lumpsum is moot.",
          "Markets fall after you start — staggered entries buy the dip automatically.",
          "Behaviour: a fixed auto-debit survives scary headlines; a big manual investment decision often doesn't.",
        ],
      },
      {
        heading: "When lumpsum wins",
        paragraphs: [
          "If you already hold investable cash (bonus, sale proceeds, maturity), historical market data mostly favours deploying it sooner rather than dripping it in — markets rise more often than they fall. The cost of waiting in cash is usually higher than the risk of a poor entry point.",
        ],
      },
      {
        heading: "The practical middle path: STP",
        paragraphs: [
          "Many investors with a windfall use a Systematic Transfer Plan (STP): park the lumpsum in a liquid fund and auto-transfer fixed amounts into equity weekly or monthly over 6–12 months. It captures most of the early-deployment benefit while softening entry-timing risk — and your cash earns liquid-fund returns meanwhile.",
          "Whichever route you choose, model both with the calculators and compare the outcomes for your own numbers.",
        ],
      },
    ],
    faqs: [
      { q: "Is SIP safer than lumpsum?", a: "SIP reduces entry-timing risk, not market risk — the invested corpus still moves with the market. 'Safer' applies to when you buy, not what you hold." },
      { q: "Can I do both at once?", a: "Yes, and most investors should: a monthly SIP from salary, plus lumpsum (or STP) deployment whenever a windfall arrives." },
      { q: "What is an STP?", a: "A Systematic Transfer Plan automatically moves a fixed amount from one fund (usually liquid) into another (usually equity) at set intervals — effectively a SIP funded by a lumpsum." },
    ],
    relatedTools: ["sip-calculator", "lumpsum-calculator"],
    relatedArticles: ["what-is-sip", "sip-vs-fd"],
  },
  {
    slug: "sip-vs-fd",
    category: "finance",
    title: "SIP vs FD: Returns, Risk, Liquidity and Tax Compared",
    h1: "SIP vs FD: Which Is Better for Your Money?",
    description:
      "SIP vs fixed deposit compared on returns, risk, liquidity and tax — and a simple rule for deciding which fits each financial goal.",
    keywords: ["sip vs fd", "fd or sip", "mutual fund vs fixed deposit", "fd vs sip returns"],
    intro:
      "An FD is a promise; a SIP is a probability. One pays a fixed, known interest rate; the other buys market-linked funds that have historically returned more over long periods — without a guarantee. The right choice depends on the job you need the money to do.",
    sections: [
      {
        heading: "Returns and risk",
        paragraphs: [],
        bullets: [
          "FD: a fixed rate (commonly in the 6–8% range) locked at booking, immune to markets. Bank deposits carry DICGC insurance up to ₹5 lakh per bank per depositor.",
          "SIP into equity funds: historically low-double-digit returns over long periods in India, but with real drawdowns along the way — values can and do fall.",
          "Inflation is the hidden risk of the FD: a 7% FD against 6% inflation grows purchasing power by barely 1% a year, before tax.",
        ],
      },
      {
        heading: "Liquidity",
        paragraphs: [
          "FDs can be broken early, usually at a small interest penalty. Open-ended mutual funds redeem in 1–3 working days at market value (watch exit loads in the first year; ELSS tax-saver funds lock for 3 years). Both are reasonably liquid — the difference is that the FD's value never dips when you need it, while a fund's might.",
        ],
      },
      {
        heading: "Tax treatment",
        paragraphs: [
          "FD interest is added to your income and taxed at your slab rate every year, even if you don't withdraw it — and banks deduct TDS past a threshold. Equity fund gains are taxed only when you redeem, under capital-gains rules that are generally lighter than slab rates for long holdings. For investors in higher tax brackets, this gap compounds meaningfully.",
        ],
      },
      {
        heading: "A simple rule by goal",
        paragraphs: [],
        bullets: [
          "Money needed within ~3 years, or your emergency fund → FD (certainty matters more than growth).",
          "Goals 5–7+ years away (retirement, education, wealth building) → SIP into diversified equity funds.",
          "In between → hybrid/debt funds or a split between both.",
          "Retirees often pair them: FDs for guaranteed income, an SWP from funds for growth-linked income.",
        ],
      },
    ],
    faqs: [
      { q: "Which gives higher returns, SIP or FD?", a: "Over long periods, equity SIPs have historically out-earned FDs in India — but with volatility and no guarantee. Over short periods, an FD's certainty frequently wins." },
      { q: "Can I lose money in an FD?", a: "Interest-rate-wise no — the rate is contractual. Bank failure is the only real risk, and DICGC insures up to ₹5 lakh per bank. The quieter loss is to inflation and tax." },
      { q: "Is a SIP tax-free?", a: "No. Redemptions are taxed under capital-gains rules (which depend on holding period and fund type), though usually more favourably than FD interest taxed at slab rate." },
    ],
    relatedTools: ["sip-calculator", "fd-calculator", "swp-calculator"],
    relatedArticles: ["what-is-sip", "sip-vs-lumpsum", "simple-vs-compound-interest"],
  },
];
