import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const passkey = body?.passkey || body?.password;
    const fileName = body?.fileName;

    const expectedKey = process.env.PRIVATE_ACCESS_KEY;

    if (!expectedKey) {
      return NextResponse.json({ error: "Server authentication error" }, { status: 500 });
    }

    if (!passkey || String(passkey).trim() !== String(expectedKey).trim()) {
      return NextResponse.json({ error: "Incorrect passkey." }, { status: 401 });
    }

    if (!fileName) {
      return NextResponse.json({ success: true });
    }

    const cleanPath = path.normalize(String(fileName)).replace(/^(\.\.(\/|\\|$))+/, "");
    const targetPath = path.join(process.cwd(), "public", "protected-docs", cleanPath);

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json(
        { error: "Document is currently unavailable on server." },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(targetPath);
    const cleanFileName = path.basename(cleanPath);
    const isImage = cleanFileName.endsWith(".webp") || cleanFileName.endsWith(".png") || cleanFileName.endsWith(".jpg");

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": isImage ? "image/webp" : "application/pdf",
        "Content-Disposition": `inline; filename="${cleanFileName}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Unlock Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}