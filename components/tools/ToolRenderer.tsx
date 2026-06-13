"use client";

import type { ComponentType } from "react";
import { WordCounter } from "./WordCounter";
import { CaseConverter } from "./CaseConverter";
import { RemoveDuplicateLines } from "./RemoveDuplicateLines";
import { SlugGenerator } from "./SlugGenerator";
import { JsonFormatter } from "./JsonFormatter";
import { Base64Tool } from "./Base64Tool";
import { UuidGenerator } from "./UuidGenerator";
import { HexToRgb } from "./HexToRgb";
import { EmiCalculator } from "./EmiCalculator";
import { SipCalculator } from "./SipCalculator";
import { GstCalculator } from "./GstCalculator";
import { KeywordDensityChecker } from "./KeywordDensityChecker";
import { ReverseText } from "./ReverseText";
import { RemoveLineBreaks } from "./RemoveLineBreaks";
import { TextRepeater } from "./TextRepeater";
import { LoremIpsum } from "./LoremIpsum";
import { UrlEncoder } from "./UrlEncoder";
import { JwtDecoder } from "./JwtDecoder";
import { HashGenerator } from "./HashGenerator";
import { TimestampConverter } from "./TimestampConverter";
import { NumberBaseConverter } from "./NumberBaseConverter";
import { CompoundInterest } from "./CompoundInterest";
import { SimpleInterest } from "./SimpleInterest";
import { PercentageCalculator } from "./PercentageCalculator";
import { DiscountCalculator } from "./DiscountCalculator";
import { FdCalculator } from "./FdCalculator";
import { UnitConverter } from "./UnitConverter";
import { TemperatureConverter } from "./TemperatureConverter";
import { GratuityCalculator } from "./GratuityCalculator";
import { HraCalculator } from "./HraCalculator";
import { InflationCalculator } from "./InflationCalculator";
import { LumpsumCalculator } from "./LumpsumCalculator";
import { CagrCalculator } from "./CagrCalculator";
import { SwpCalculator } from "./SwpCalculator";
import { RegexTester } from "./RegexTester";
import { PasswordGenerator } from "./PasswordGenerator";
import { HtmlEntityTool } from "./HtmlEntityTool";
import { IncomeTaxCalculator } from "./IncomeTaxCalculator";
import { SalaryCalculator } from "./SalaryCalculator";
import { PpfCalculator } from "./PpfCalculator";
import { RdCalculator } from "./RdCalculator";
import { NpsCalculator } from "./NpsCalculator";
import { JsonCsvConverter } from "./JsonCsvConverter";
import { XmlFormatter } from "./XmlFormatter";
import { SqlFormatter } from "./SqlFormatter";
import { MarkdownToHtml } from "./MarkdownToHtml";
import { RgbToHex } from "./RgbToHex";
import { GradientGenerator } from "./GradientGenerator";
import { CronExpressionGenerator } from "./CronExpressionGenerator";
import { RobotsTxtGenerator } from "./RobotsTxtGenerator";
import { TipCalculator } from "./TipCalculator";
import { GpaCalculator } from "./GpaCalculator";
import { RandomNameGenerator } from "./RandomNameGenerator";
import { StepUpSipCalculator } from "./StepUpSipCalculator";
import { SsyCalculator } from "./SsyCalculator";
import { EpfCalculator } from "./EpfCalculator";
import { FireCalculator } from "./FireCalculator";
import { NetWorthCalculator } from "./NetWorthCalculator";
import { PercentageIncreaseCalculator } from "./PercentageIncreaseCalculator";
import { EmergencyFundCalculator } from "./EmergencyFundCalculator";
import { TokenCounter } from "./TokenCounter";
import { ZakatCalculator } from "./ZakatCalculator";
import { VatCalculator } from "./VatCalculator";
import { MortgageCalculator } from "./MortgageCalculator";
import { SuperannuationCalculator } from "./SuperannuationCalculator";
import { AgeCalculator } from "./AgeCalculator";
import { SalaryToHourlyCalculator } from "./SalaryToHourlyCalculator";
import { OvertimePayCalculator } from "./OvertimePayCalculator";
import { UkSalaryCalculator } from "./UkSalaryCalculator";
import { NationalInsuranceCalculator } from "./NationalInsuranceCalculator";
import { StudentLoanRepaymentCalculator } from "./StudentLoanRepaymentCalculator";
import { PdfMerge } from "./PdfMerge";
import { TdsCalculator } from "./TdsCalculator";
import { CapitalGainsTaxCalculator } from "./CapitalGainsTaxCalculator";
import { RetirementCalculator } from "./RetirementCalculator";
import { LoanPrepaymentCalculator } from "./LoanPrepaymentCalculator";
import { YoutubeEarningsCalculator } from "./YoutubeEarningsCalculator";
import { CharacterCounter } from "./CharacterCounter";
import { TextDiffChecker } from "./TextDiffChecker";
import { SortTextLines } from "./SortTextLines";
import { FindAndReplace } from "./FindAndReplace";
import { WordFrequencyCounter } from "./WordFrequencyCounter";
import { TitleCaseConverter } from "./TitleCaseConverter";
import { ColorPicker } from "./ColorPicker";
import { ColorContrastChecker } from "./ColorContrastChecker";
import { ColorShadesGenerator } from "./ColorShadesGenerator";
import { ColorBlindnessSimulator } from "./ColorBlindnessSimulator";
import { HexToHsl } from "./HexToHsl";
import { CmykToRgb } from "./CmykToRgb";
import { JsonToTypescript } from "./JsonToTypescript";
import { CssMinifier } from "./CssMinifier";
import { JsonEscape } from "./JsonEscape";
import { QueryStringParser } from "./QueryStringParser";
import { UtmBuilder } from "./UtmBuilder";
import { MetaTagGenerator } from "./MetaTagGenerator";
import { RomanNumeralConverter } from "./RomanNumeralConverter";
import { NumberToWords } from "./NumberToWords";
import { TextToBinary } from "./TextToBinary";
import { FuelEconomyConverter } from "./FuelEconomyConverter";
import { RandomNumberGenerator } from "./RandomNumberGenerator";
import { PasswordStrengthChecker } from "./PasswordStrengthChecker";
import { DiceRoller } from "./DiceRoller";
import { DateDifferenceCalculator } from "./DateDifferenceCalculator";
import { BusinessDaysCalculator } from "./BusinessDaysCalculator";
import { TimeDurationCalculator } from "./TimeDurationCalculator";

export type ToolParams = Record<string, string | number | boolean>;

// Maps a registry `component` key to its interactive widget. Components may
// accept an optional `params` prop so one widget can back many tools.
const REGISTRY: Record<string, ComponentType<{ params?: ToolParams }>> = {
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "remove-duplicate-lines": RemoveDuplicateLines,
  "slug-generator": SlugGenerator,
  "json-formatter": JsonFormatter,
  base64: Base64Tool,
  "uuid-generator": UuidGenerator,
  "hex-to-rgb": HexToRgb,
  "emi-calculator": EmiCalculator,
  "sip-calculator": SipCalculator,
  "gst-calculator": GstCalculator,
  "keyword-density-checker": KeywordDensityChecker,
  "reverse-text": ReverseText,
  "remove-line-breaks": RemoveLineBreaks,
  "text-repeater": TextRepeater,
  "lorem-ipsum": LoremIpsum,
  "url-encode-decode": UrlEncoder,
  "jwt-decoder": JwtDecoder,
  "hash-generator": HashGenerator,
  "timestamp-converter": TimestampConverter,
  "number-base-converter": NumberBaseConverter,
  "compound-interest": CompoundInterest,
  "simple-interest": SimpleInterest,
  "percentage-calculator": PercentageCalculator,
  "discount-calculator": DiscountCalculator,
  "fd-calculator": FdCalculator,
  "unit-converter": UnitConverter,
  "temperature-converter": TemperatureConverter,
  "gratuity-calculator": GratuityCalculator,
  "hra-calculator": HraCalculator,
  "inflation-calculator": InflationCalculator,
  "lumpsum-calculator": LumpsumCalculator,
  "cagr-calculator": CagrCalculator,
  "swp-calculator": SwpCalculator,
  "regex-tester": RegexTester,
  "password-generator": PasswordGenerator,
  "html-entities": HtmlEntityTool,
  "income-tax-calculator": IncomeTaxCalculator,
  "salary-calculator": SalaryCalculator,
  "ppf-calculator": PpfCalculator,
  "rd-calculator": RdCalculator,
  "nps-calculator": NpsCalculator,
  "json-csv-converter": JsonCsvConverter,
  "xml-formatter": XmlFormatter,
  "sql-formatter": SqlFormatter,
  "markdown-to-html": MarkdownToHtml,
  "rgb-to-hex": RgbToHex,
  "gradient-generator": GradientGenerator,
  "cron-expression-generator": CronExpressionGenerator,
  "robots-txt-generator": RobotsTxtGenerator,
  "tip-calculator": TipCalculator,
  "gpa-calculator": GpaCalculator,
  "random-name-generator": RandomNameGenerator,
  "step-up-sip-calculator": StepUpSipCalculator,
  "ssy-calculator": SsyCalculator,
  "epf-calculator": EpfCalculator,
  "fire-calculator": FireCalculator,
  "net-worth-calculator": NetWorthCalculator,
  "percentage-increase-calculator": PercentageIncreaseCalculator,
  "emergency-fund-calculator": EmergencyFundCalculator,
  "token-counter": TokenCounter,
  "zakat-calculator": ZakatCalculator,
  "vat-calculator": VatCalculator,
  "mortgage-calculator": MortgageCalculator,
  "superannuation-calculator": SuperannuationCalculator,
  "age-calculator": AgeCalculator,
  "salary-to-hourly-calculator": SalaryToHourlyCalculator,
  "overtime-pay-calculator": OvertimePayCalculator,
  "uk-salary-calculator": UkSalaryCalculator,
  "national-insurance-calculator": NationalInsuranceCalculator,
  "student-loan-repayment-calculator": StudentLoanRepaymentCalculator,
  "pdf-merge": PdfMerge,
  "tds-calculator": TdsCalculator,
  "capital-gains-tax-calculator": CapitalGainsTaxCalculator,
  "retirement-calculator": RetirementCalculator,
  "loan-prepayment-calculator": LoanPrepaymentCalculator,
  "youtube-earnings-calculator": YoutubeEarningsCalculator,
  "character-counter": CharacterCounter,
  "text-diff-checker": TextDiffChecker,
  "sort-text-lines": SortTextLines,
  "find-and-replace": FindAndReplace,
  "word-frequency-counter": WordFrequencyCounter,
  "title-case-converter": TitleCaseConverter,
  "color-picker": ColorPicker,
  "color-contrast-checker": ColorContrastChecker,
  "color-shades-generator": ColorShadesGenerator,
  "color-blindness-simulator": ColorBlindnessSimulator,
  "hex-to-hsl": HexToHsl,
  "cmyk-to-rgb": CmykToRgb,
  "json-to-typescript": JsonToTypescript,
  "css-minifier": CssMinifier,
  "json-escape": JsonEscape,
  "query-string-parser": QueryStringParser,
  "utm-builder": UtmBuilder,
  "meta-tag-generator": MetaTagGenerator,
  "roman-numeral-converter": RomanNumeralConverter,
  "number-to-words": NumberToWords,
  "text-to-binary": TextToBinary,
  "fuel-economy-converter": FuelEconomyConverter,
  "random-number-generator": RandomNumberGenerator,
  "password-strength-checker": PasswordStrengthChecker,
  "dice-roller": DiceRoller,
  "date-difference-calculator": DateDifferenceCalculator,
  "business-days-calculator": BusinessDaysCalculator,
  "time-duration-calculator": TimeDurationCalculator,
};

export function ToolRenderer({ component, params }: { component: string; params?: ToolParams }) {
  const Tool = REGISTRY[component];
  if (!Tool) {
    return <p className="muted">This tool is coming soon.</p>;
  }
  return <Tool params={params} />;
}
