import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("private_access")?.value;
  if (cookie === "granted") {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const passkey = body?.passkey || body?.password;

    const expectedKey = process.env.PRIVATE_ACCESS_KEY;

    if (!expectedKey) {
      return NextResponse.json({ error: "Server authentication error" }, { status: 500 });
    }

    if (!passkey || String(passkey).trim() !== String(expectedKey).trim()) {
      return NextResponse.json({ error: "Incorrect passkey." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("private_access", "granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Unlock Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}