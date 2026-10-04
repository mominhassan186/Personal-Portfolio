import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Block any direct public browser access to /protected-docs/*
  if (request.nextUrl.pathname.startsWith("/protected-docs")) {
    return new NextResponse("Access Denied: Protected Directory", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected-docs/:path*"],
};