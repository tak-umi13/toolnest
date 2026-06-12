// Serializes a structured-data object into a JSON-LD <script>. Rendered on the
// server so crawlers see it in the initial HTML. Pass null to render nothing.
export function JsonLd({ data }: { data: unknown }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
