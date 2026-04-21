import { revalidateTag, revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

// On-demand revalidation: WP Admin's "Deploy Site" button POSTs here.
// Immediately invalidates every fetch tagged "wordpress" so the next page
// render pulls fresh data from WordPress instead of serving the ISR cache.
//
// Uses both revalidateTag (data cache) and revalidatePath (route cache).
// revalidateTag alone in Next.js 16 has stale-while-revalidate semantics —
// the first request after the call serves stale and kicks off a background
// re-fetch, so the edit only surfaces on the second visit. Pairing it with
// revalidatePath("/", "layout") forces immediate route-level invalidation
// so the very next request renders fresh data.
export async function POST(request: NextRequest) {
  const secret =
    request.headers.get("x-revalidate-secret") ??
    request.nextUrl.searchParams.get("secret");

  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || secret !== expected) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("wordpress", "default");
  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, at: Date.now() });
}

// Health probe — the WP plugin pings this to show the Deploy button status.
export async function GET() {
  return Response.json({ ok: true, endpoint: "/api/revalidate" });
}
