// Monetization placeholder. Real ad code (AdSense, Ezoic, etc.) drops in here
// later — keeping it a labeled placeholder now means layouts are already sized
// for ads, so adding them won't cause a jarring shift (good for Core Web Vitals).
export function AdSlot({ label = "Ad", style }: { label?: string; style?: React.CSSProperties }) {
  return (
    <div className="ad-slot" style={style} aria-hidden="true">
      {label} placeholder
    </div>
  );
}
