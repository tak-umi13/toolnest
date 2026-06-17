import type { Tool } from "../types";

// Social Media category — validated US/UK/IN/CA/AU (batch-12, 7/8 KD<35).
// youtube-money is intentionally omitted (covered by finance/youtube-earnings-calculator).
export const socialTools: Tool[] = [
  {
    slug: "hashtag-generator",
    category: "social",
    name: "Hashtag Generator",
    h1: "Hashtag Generator",
    tagline: "Generate relevant hashtags from your keywords and niche.",
    title: "Hashtag Generator — Free Hashtags for Instagram & More",
    description:
      "Free hashtag generator. Turn your keywords into a set of relevant hashtags, mixed with popular tags for your niche, for Instagram, TikTok and more. Copy in one click.",
    intro:
      "Generate a ready-to-use set of hashtags from your topic keywords, combined with popular tags for your niche (business, fitness, food, travel and more). Mix broad and specific tags, drop anything off-topic, and copy them straight into your caption. Instagram allows up to 30 per post. Built in your browser.",
    keywords: ["hashtag generator", "hashtag generator instagram", "free hashtag generator", "hashtags for reels"],
    component: "hashtag-generator",
    volumeEstimate: 49500,
    howTo: [
      "Enter your topic keywords.",
      "Pick the niche that fits your content.",
      "Copy the generated hashtags into your post.",
    ],
    faqs: [
      { q: "How many hashtags should I use?", a: "Instagram allows up to 30, but a focused set of about 5–15 relevant tags often performs as well or better. Mix popular, medium and niche tags." },
      { q: "Do these hashtags guarantee more reach?", a: "No tool can guarantee reach. Relevant, non-spammy hashtags help the right people discover your post; pair them with good content and consistent posting." },
    ],
    related: ["engagement-rate-calculator", "social-media-image-sizes", "tweet-character-counter"],
  },
  {
    slug: "engagement-rate-calculator",
    category: "social",
    name: "Engagement Rate Calculator",
    h1: "Engagement Rate Calculator",
    tagline: "Calculate your social media engagement rate by followers or reach.",
    title: "Engagement Rate Calculator — Instagram, TikTok & More",
    description:
      "Free engagement rate calculator. Work out your social media engagement rate from likes, comments, saves and shares, by followers or reach, with a benchmark rating.",
    intro:
      "Calculate your engagement rate — the share of your audience that interacts with a post. Enter your followers (or reach) and the likes, comments, saves and shares, and get the percentage plus a rough rating. Brands use this metric to value creators, so it often matters more than follower count. Calculated in your browser.",
    keywords: ["engagement rate calculator", "instagram engagement rate calculator", "engagement rate", "social media engagement calculator"],
    component: "engagement-rate-calculator",
    volumeEstimate: 2900,
    howTo: [
      "Choose followers or reach as the base.",
      "Enter the audience size and the interactions (likes, comments, etc.).",
      "Read your engagement rate and rating.",
    ],
    faqs: [
      { q: "What is a good engagement rate?", a: "It varies by platform and size, but 1–3% is broadly average and over 3% is strong. Smaller accounts typically post higher rates than large ones." },
      { q: "Should I use followers or reach?", a: "By followers is the common public metric. By reach (impressions) shows how engaging a post was for the people who actually saw it, which is often more meaningful." },
    ],
    related: ["instagram-money-calculator", "tiktok-money-calculator", "hashtag-generator"],
  },
  {
    slug: "tiktok-money-calculator",
    category: "social",
    name: "TikTok Money Calculator",
    h1: "TikTok Money Calculator",
    tagline: "Estimate TikTok earnings from views and sponsored posts.",
    title: "TikTok Money Calculator — Estimate Creator Earnings",
    description:
      "Free TikTok money calculator. Estimate potential earnings from the Creator Rewards program (per views) and from sponsored posts based on your follower count.",
    intro:
      "Estimate what a TikTok account could earn. Enter your monthly views for a Creator Rewards range (TikTok pays roughly $0.02–0.04 per 1,000 qualified views) and your follower count for a rough sponsored-post fee. Real earnings vary hugely with niche, region and engagement — this is a planning guide, not a guarantee. Calculated in your browser.",
    keywords: ["tiktok money calculator", "tiktok earnings calculator", "how much does tiktok pay", "tiktok creator fund calculator"],
    component: "tiktok-money-calculator",
    volumeEstimate: 2400,
    howTo: [
      "Enter your monthly views and follower count.",
      "Read the estimated Creator Rewards range and sponsored-post fee.",
      "Use it as a starting point, not a guarantee.",
    ],
    faqs: [
      { q: "How much does TikTok pay per view?", a: "The Creator Rewards program pays roughly $0.02–0.04 per 1,000 qualified views, depending on region, watch time and content type. Sponsorships usually earn far more than the fund." },
      { q: "Are these figures guaranteed?", a: "No. They're rough industry estimates. Actual payouts depend on eligibility, niche and engagement, so treat the numbers as a ballpark." },
    ],
    related: ["instagram-money-calculator", "youtube-earnings-calculator", "engagement-rate-calculator"],
  },
  {
    slug: "instagram-money-calculator",
    category: "social",
    name: "Instagram Money Calculator",
    h1: "Instagram Money Calculator",
    tagline: "Estimate sponsored-post earnings from followers and engagement.",
    title: "Instagram Money Calculator — Sponsored Post Earnings",
    description:
      "Free Instagram money calculator. Estimate sponsored-post earnings from your follower count and engagement rate, with a per-post and monthly range. Runs in your browser.",
    intro:
      "Estimate what your Instagram account could earn from sponsored posts. Enter your followers, engagement rate and how many sponsored posts you do a month. The estimate builds on the common benchmark of roughly $10 per 1,000 followers, scaled by engagement. Real rates vary widely with niche and audience — use it as a negotiation starting point. Calculated in your browser.",
    keywords: ["instagram money calculator", "instagram earnings calculator", "how much can i earn on instagram", "sponsored post rate calculator"],
    component: "instagram-money-calculator",
    volumeEstimate: 1900,
    howTo: [
      "Enter followers, engagement rate and sponsored posts per month.",
      "Read the per-post and monthly earning ranges.",
      "Use it as a guide when setting your rates.",
    ],
    faqs: [
      { q: "How much should I charge per sponsored post?", a: "A common starting benchmark is about $10 per 1,000 followers, adjusted up for strong engagement and a desirable niche. Many established creators charge more — this is a floor, not a ceiling." },
      { q: "Does engagement affect my rate?", a: "Yes. Brands pay for results, so a smaller account with high engagement can out-earn a larger one with low engagement. The calculator scales the estimate by your engagement rate." },
    ],
    related: ["engagement-rate-calculator", "tiktok-money-calculator", "youtube-earnings-calculator"],
  },
  {
    slug: "tweet-character-counter",
    category: "social",
    name: "Tweet Character Counter",
    h1: "Tweet Character Counter",
    tagline: "Count characters the way X (Twitter) does — 280 limit, links count as 23.",
    title: "Tweet Character Counter — X/Twitter 280 Limit Counter",
    description:
      "Free tweet character counter. Count your tweet the way X/Twitter does: 280-character limit, any link counts as 23, and CJK characters and emoji count as 2.",
    intro:
      "Count your tweet exactly the way X (Twitter) does. The limit is 280, but the count isn't a simple character count: any link counts as 23 characters regardless of length, and CJK characters and most emoji count as 2. This counter applies those rules and shows how many characters you have left. Runs in your browser.",
    keywords: ["tweet character counter", "twitter character counter", "x character counter", "tweet length checker"],
    component: "tweet-character-counter",
    volumeEstimate: 1600,
    howTo: [
      "Type or paste your tweet.",
      "Watch the weighted length and remaining count.",
      "Trim until you're within 280.",
    ],
    faqs: [
      { q: "Why does my tweet count differently here than a normal counter?", a: "X uses weighted counting: links always count as 23 characters (they're shortened to t.co), and CJK characters and emoji count as 2. A plain character counter ignores these rules." },
      { q: "What is the tweet character limit?", a: "280 for standard accounts. (X Premium subscribers can post much longer, but 280 remains the limit for everyone else and for maximum reach.)" },
    ],
    related: ["hashtag-generator", "character-counter", "engagement-rate-calculator"],
  },
  {
    slug: "social-media-image-sizes",
    category: "social",
    name: "Social Media Image Sizes",
    h1: "Social Media Image Size Guide",
    tagline: "Recommended image and video dimensions for every platform.",
    title: "Social Media Image Sizes — Cheat Sheet for Every Platform",
    description:
      "Free social media image size guide. Recommended image and video dimensions for Instagram, Facebook, X, YouTube, LinkedIn, TikTok and Pinterest — posts, stories, covers and profiles.",
    intro:
      "Look up the right image and video dimensions for every major platform — posts, stories, reels, covers, thumbnails and profile pictures for Instagram, Facebook, X/Twitter, YouTube, LinkedIn, TikTok and Pinterest. Upload at the recommended size so platforms downscale cleanly instead of cropping or blurring. Runs in your browser.",
    keywords: ["social media image sizes", "social media image size guide", "instagram post size", "youtube thumbnail size"],
    component: "social-media-image-sizes",
    volumeEstimate: 720,
    updated: "2026-06-15",
    updateNote: "Platform sizes",
    howTo: [
      "Pick a platform.",
      "Find the placement you're designing for.",
      "Export your image at the recommended pixel size.",
    ],
    faqs: [
      { q: "What size should an Instagram post be?", a: "1080 × 1080 for a square, 1080 × 1350 for a portrait (4:5, which takes up more screen), and 1080 × 1920 for a story or reel (9:16)." },
      { q: "What's the best YouTube thumbnail size?", a: "1280 × 720 pixels (16:9), under 2 MB. Use high contrast and large text so it's readable at small sizes." },
    ],
    related: ["hashtag-generator", "aspect-ratio-calculator", "engagement-rate-calculator"],
  },
];
