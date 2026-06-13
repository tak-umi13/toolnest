import type { Tool } from "../types";

// Date & Time category. Four tools moved here from "convert" (age, date-diff,
// business-days, time-duration) — old /convert/... URLs 301-redirect to these
// in next.config.mjs — plus new date/time calculators.
export const datetimeTools: Tool[] = [
  {
    slug: "hours-calculator",
    category: "datetime",
    name: "Hours Calculator",
    h1: "Hours Calculator — Add Up Worked Hours",
    tagline: "Add up hours from multiple start/end times for timesheets and payroll.",
    title: "Hours Calculator — Work Hours & Time Card Calculator",
    description:
      "Free hours calculator. Add up worked hours from multiple start and end times, subtract breaks, handle overnight shifts, and get decimal hours and pay for timesheets.",
    intro:
      "Add up the hours you worked across several shifts or sessions. Enter each block's start and end time, set a break, and the calculator totals them — handling overnight shifts and showing decimal hours (e.g. 7.50) that payroll and timesheets expect. Add an hourly rate to estimate pay. A free time card / work hours calculator that runs entirely in your browser.",
    keywords: ["hours calculator", "work hours calculator", "time card calculator", "hours worked calculator"],
    component: "hours-calculator",
    volumeEstimate: 368000,
    updated: "2026-06-13",
    howTo: [
      "Add a row for each work session with its start and end time.",
      "Set the break per session and, optionally, your hourly rate.",
      "Read the total time, decimal hours and estimated pay.",
    ],
    faqs: [
      { q: "How do I add up hours from a time card?", a: "Enter each shift's start and end time on its own row. The calculator works out each duration, subtracts the break, and sums them into a total in hours-and-minutes and decimal hours." },
      { q: "What are decimal hours?", a: "Hours written as a decimal — 7 hours 30 minutes is 7.50. Most payroll systems and invoices use decimal hours, so the tool shows both formats." },
      { q: "Does it handle overnight shifts?", a: "Yes. If an end time is earlier than its start time, it's treated as the next day, so a 22:00–06:00 shift counts as 8 hours." },
    ],
    related: ["time-duration-calculator", "business-days-calculator", "salary-to-hourly-calculator"],
  },
  {
    slug: "days-until-calculator",
    category: "datetime",
    name: "Days Until Calculator",
    h1: "Days Until Calculator — Countdown to Any Date",
    tagline: "Count how many days until (or since) any date, plus the weekday.",
    title: "Days Until Calculator — How Many Days Until a Date",
    description:
      "Free days until calculator. Count how many days until a future date or how many days ago a past date was, with weeks and a calendar breakdown. Runs in your browser.",
    intro:
      "Pick any date to see how many days until it (or how many days ago it was), plus the number of weeks, a years/months/days breakdown, and the weekday it falls on. Perfect for counting down to holidays, deadlines, birthdays, exams and events. Everything runs in your browser.",
    keywords: ["days until calculator", "how many days until", "days until date", "days ago calculator"],
    component: "days-until-calculator",
    volumeEstimate: 14800,
    howTo: [
      "Pick the target date.",
      "Read the days until (future) or days ago (past).",
      "Check the weeks, breakdown and weekday it lands on.",
    ],
    faqs: [
      { q: "Does it count from today?", a: "Yes. It counts whole days between today and the date you pick. A future date shows 'days until'; a past date shows 'days ago'." },
      { q: "Can I count down to a holiday or birthday?", a: "Absolutely — set the date to the holiday, birthday, exam or deadline and you get a live day count plus the weekday it falls on." },
      { q: "Does it include today in the count?", a: "It counts the gap from today, so a date tomorrow shows 1 day. Today itself shows zero." },
    ],
    related: ["date-difference-calculator", "age-calculator", "day-of-week-calculator"],
  },
  {
    slug: "day-of-week-calculator",
    category: "datetime",
    name: "Day of the Week Calculator",
    h1: "Day of the Week Calculator",
    tagline: "Find which day of the week any date falls on — past or future.",
    title: "Day of the Week Calculator — What Day Was a Date?",
    description:
      "Free day of the week calculator. Find what day of the week any date falls on — past or future — plus the day of the year. Great for 'what day was I born?'.",
    intro:
      "Enter any date to find out which day of the week it falls on, whether it's in the past or the future. It also shows the day of the year and whether it's a weekday or weekend. Handy for answering 'what day was I born?', checking historical dates, and planning future events. Uses real calendar dates, so leap years are correct. Runs in your browser.",
    keywords: ["day of the week calculator", "what day of the week was i born", "what day of the week is", "day of week finder"],
    component: "day-of-week-calculator",
    volumeEstimate: 2400,
    howTo: [
      "Pick a date (or tap Today).",
      "Read the day of the week it falls on.",
      "See the day of the year and weekday/weekend.",
    ],
    faqs: [
      { q: "What day of the week was I born?", a: "Enter your date of birth and the calculator shows the exact weekday — for example, 1 January 2000 was a Saturday." },
      { q: "Does it work for future and historical dates?", a: "Yes. It uses real calendar dates, so it correctly handles past and future dates and leap years." },
    ],
    related: ["age-calculator", "days-until-calculator", "week-number-calculator"],
  },
  {
    slug: "week-number-calculator",
    category: "datetime",
    name: "Week Number Calculator",
    h1: "Week Number Calculator (ISO)",
    tagline: "Find the ISO week number for any date — what week of the year is it?",
    title: "Week Number Calculator — ISO Week of the Year",
    description:
      "Free week number calculator. Find the ISO 8601 week number for today or any date, plus the ISO week-year and weekday. Runs in your browser.",
    intro:
      "Find out which week of the year a date falls in, using the ISO 8601 standard (weeks start on Monday and week 1 contains the year's first Thursday). Enter any date or use today. The tool also shows the ISO week-year, which can differ from the calendar year around New Year. Useful for planning, payroll periods and project schedules. Runs in your browser.",
    keywords: ["week number calculator", "what week is it", "iso week number", "current week number"],
    component: "week-number-calculator",
    volumeEstimate: 1900,
    howTo: [
      "Pick a date (or tap This week).",
      "Read the ISO week number.",
      "Note the ISO week-year if it's near New Year.",
    ],
    faqs: [
      { q: "How is the week number calculated?", a: "By the ISO 8601 standard: weeks run Monday to Sunday, and week 1 is the week containing the year's first Thursday (equivalently, the week containing January 4th)." },
      { q: "Why does the week-year sometimes differ from the calendar year?", a: "Early January can belong to the last ISO week of the previous year, and late December can belong to week 1 of the next — so the ISO week-year occasionally differs from the calendar year." },
    ],
    related: ["day-of-week-calculator", "leap-year-calculator", "date-difference-calculator"],
  },
  {
    slug: "leap-year-calculator",
    category: "datetime",
    name: "Leap Year Calculator",
    h1: "Leap Year Calculator",
    tagline: "Check if a year is a leap year, with the next and previous ones.",
    title: "Leap Year Calculator — Is It a Leap Year?",
    description:
      "Free leap year calculator. Check whether any year is a leap year, see the previous and next leap years, and how many days the year has. Runs in your browser.",
    intro:
      "Check whether a year is a leap year and see the previous and next leap years plus how many days that year has (365 or 366). A year is a leap year if it's divisible by 4, except century years which must also be divisible by 400 — so 2000 was a leap year but 1900 wasn't. Runs in your browser.",
    keywords: ["leap year calculator", "is it a leap year", "leap year checker", "leap year list"],
    component: "leap-year-calculator",
    volumeEstimate: 1000,
    howTo: [
      "Enter a year.",
      "See whether it's a leap year and how many days it has.",
      "Check the previous and next leap years.",
    ],
    faqs: [
      { q: "What makes a year a leap year?", a: "It must be divisible by 4. Century years (divisible by 100) are an exception: they're only leap years if also divisible by 400. So 2000 was a leap year, but 1700, 1800 and 1900 were not." },
      { q: "Why do we have leap years?", a: "Earth's orbit takes about 365.24 days, so adding February 29 every four years (with the century rule) keeps the calendar aligned with the seasons." },
    ],
    related: ["day-of-week-calculator", "age-calculator", "week-number-calculator"],
  },
  {
    slug: "age-calculator",
    category: "datetime",
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
    related: ["days-until-calculator", "day-of-week-calculator", "date-difference-calculator"],
  },
  {
    slug: "date-difference-calculator",
    category: "datetime",
    name: "Date Difference Calculator",
    h1: "Date Difference Calculator — Days Between Dates",
    tagline: "Count the days, weeks, months and years between two dates.",
    title: "Date Difference Calculator — Days Between Two Dates",
    description:
      "Free date difference calculator. Find the exact number of days, weeks, months and years between two dates, with an option to include the end day. Runs in your browser.",
    intro:
      "Pick two dates to get the exact gap between them: total days, whole weeks, and a calendar breakdown in years, months and days that respects real month lengths and leap years. An option counts both endpoints — useful for hotel nights, leave days and project durations. Everything runs in your browser.",
    keywords: ["date difference calculator", "days between dates", "days between two dates", "date duration calculator"],
    component: "date-difference-calculator",
    volumeEstimate: 165000,
    howTo: [
      "Pick the start date and the end date.",
      "Optionally include the end day in the count.",
      "Read the total days, weeks and the years/months/days breakdown.",
    ],
    faqs: [
      { q: "Does it count the end date?", a: "By default it counts the gap between the dates. Tick 'Include the end day' to count both endpoints — for example, the number of nights vs days for a booking." },
      { q: "Does it handle leap years?", a: "Yes. It uses real calendar dates, so February 29 and leap-year day counts are handled correctly." },
      { q: "How is the months breakdown calculated?", a: "By calendar borrowing against the actual length of each month, the same way ages are computed — not by assuming every month is 30 days." },
    ],
    related: ["business-days-calculator", "days-until-calculator", "age-calculator"],
  },
  {
    slug: "business-days-calculator",
    category: "datetime",
    name: "Business Days Calculator",
    h1: "Business Days Calculator",
    tagline: "Count working days (Mon-Fri) between two dates, minus holidays.",
    title: "Business Days Calculator — Working Days Between Dates",
    description:
      "Free business days calculator. Count working days (Monday-Friday) between two dates, exclude weekends and subtract public holidays. Runs in your browser.",
    intro:
      "Count the working days between two dates — Monday to Friday, with weekends excluded automatically. Enter the number of public holidays in the range to subtract them too. Useful for delivery estimates, SLA deadlines, notice periods and leave planning. Both dates are included. Runs in your browser.",
    keywords: ["business days calculator", "working days calculator", "weekdays between dates", "working days between two dates"],
    component: "business-days-calculator",
    volumeEstimate: 40500,
    howTo: [
      "Pick the start and end dates.",
      "Optionally enter how many public holidays fall in the range.",
      "Read the business days, weekend days and total days.",
    ],
    faqs: [
      { q: "Which days count as business days?", a: "Monday through Friday. Saturdays and Sundays are treated as weekend days and excluded from the business-day count." },
      { q: "Does it know public holidays?", a: "Holidays vary by country and region, so you enter how many fall in your range and the tool subtracts them from the working-day total." },
      { q: "Are both dates included?", a: "Yes. The count is inclusive of the start and end dates." },
    ],
    related: ["date-difference-calculator", "hours-calculator", "days-until-calculator"],
  },
  {
    slug: "time-duration-calculator",
    category: "datetime",
    name: "Time Duration Calculator",
    h1: "Time Duration Calculator — Hours Between Times",
    tagline: "Work out hours and minutes between a start and end time, minus breaks.",
    title: "Time Duration Calculator — Hours Between Two Times",
    description:
      "Free time duration calculator. Find the hours and minutes between a start and end time, subtract a break, handle overnight shifts and get decimal hours.",
    intro:
      "Enter a start and end time to get the duration in hours and minutes, with a break deducted if you like. It handles overnight shifts (end time on the next day) and shows decimal hours — for example 7.50 — which is what payroll and timesheets usually need. For adding up several shifts, use the Hours Calculator. Runs entirely in your browser.",
    keywords: ["time duration calculator", "hours between two times", "time between two times", "duration calculator"],
    component: "time-duration-calculator",
    volumeEstimate: 60500,
    howTo: [
      "Enter the start and end times.",
      "Set any break in minutes and toggle overnight if the shift crosses midnight.",
      "Read the net duration and decimal hours.",
    ],
    faqs: [
      { q: "Can it handle overnight shifts?", a: "Yes. Tick the overnight option and an end time earlier than the start is treated as the next day, so a 22:00-06:00 shift comes out as 8 hours." },
      { q: "What are decimal hours?", a: "Hours expressed as a decimal — 7 hours 30 minutes becomes 7.50. Payroll systems and invoices usually expect this format." },
      { q: "How do I add up several time periods?", a: "Use the Hours Calculator, which sums multiple start/end rows. This tool focuses on a single start-to-end duration." },
    ],
    related: ["hours-calculator", "business-days-calculator", "date-difference-calculator"],
  },
];
