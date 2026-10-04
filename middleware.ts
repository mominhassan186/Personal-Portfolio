import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only block raw direct browser hits to static /protected-docs/...
  if (request.nextUrl.pathname.startsWith("/protected-docs")) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected-docs/:path*"],
};