import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (static files)
     * 3. /_static (if you use it)
     * 4. metadata files (favicon.ico, sitemap.xml, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Define your domains
  const coreTestDomain = process.env.NEXT_PUBLIC_CORE_URL!.replace(
    /https?:\/\//,
    ""
  );
  const ssoDomain = process.env.NEXT_PUBLIC_SSO_URL!.replace(/https?:\/\//, "");

  // Determine the path prefix based on the hostname
  let targetPath = "";
  if (hostname.includes(coreTestDomain)) {
    targetPath = `/core${url.pathname}`;
  } else if (hostname.includes(ssoDomain)) {
    targetPath = `/sso${url.pathname}`;
  }

  // Rewrite to the internal folder
  if (targetPath) {
    return NextResponse.rewrite(new URL(targetPath, req.url));
  }
  return NextResponse.rewrite(new URL("/route-not-found", req.url));
}
