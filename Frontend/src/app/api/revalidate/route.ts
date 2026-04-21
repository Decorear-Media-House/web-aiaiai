import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

// On-demand revalidation: WP Admin's "Deploy Site" button POSTs here.
// Immediately invalidates every fetch tagged "wordpress" so the next page
// render pulls fresh data from WordPress instead of serving the ISR cache.
export async function POST(request: NextRequest) {
  const secret =
    request.headers.get("x-revalidate-secret") ??
    request.nextUrl.searchParams.get("secret");

  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || secret !== expected) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Next.js 16 requires a cache profile as the second arg — "default" uses
  // the default profile semantics, which matches our fetch `{ revalidate: 60 }`.
  revalidateTag("wordpress", "default");
  return Response.json({ revalidated: true, at: Date.now() });
}

// Health probe — the WP plugin pings this to show the Deploy button status.
export async function GET() {
  return Response.json({ ok: true, endpoint: "/api/revalidate" });
}
