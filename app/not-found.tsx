import Link from "next/link";
import { trendingTools, toolPath } from "@/lib/registry";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
      <h1>Tool not found</h1>
      <p className="muted">That page doesn’t exist (yet). Try one of these popular tools:</p>
      <div className="tool-grid" style={{ marginTop: 24, textAlign: "left" }}>
        {trendingTools(4).map((t) => (
          <Link key={t.slug} href={toolPath(t)} className="tool-card">
            <h3>{t.name}</h3>
            <p>{t.tagline}</p>
          </Link>
        ))}
      </div>
      <p style={{ marginTop: 24 }}>
        <Link href="/" className="btn btn-primary">Back to home</Link>
      </p>
    </div>
  );
}
