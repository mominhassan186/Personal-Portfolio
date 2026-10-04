import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const passkey = body?.passkey || body?.password;
    const fileName = body?.fileName;

    const expectedKey = process.env.PRIVATE_ACCESS_KEY;

    if (!expectedKey) {
      return NextResponse.json({ error: "Server authentication error" }, { status: 500 });
    }

    // Verify secret passkey
    if (!passkey || String(passkey).trim() !== String(expectedKey).trim()) {
      return NextResponse.json({ error: "Incorrect passkey." }, { status: 401 });
    }

    // If only verifying password (unlocking the view)
    if (!fileName) {
      return NextResponse.json({ success: true });
    }

    // Sanitize fileName to allow subfolders while preventing directory traversal attacks
    const cleanPath = path.normalize(String(fileName)).replace(/^(\.\.(\/|\\|$))+/, "");
    const targetPath = path.join(process.cwd(), "protected-docs", cleanPath);

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json(
        { error: "Document is currently unavailable on server." },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(targetPath);
    const uint8Array = new Uint8Array(fileBuffer);
    const isImage = cleanPath.endsWith(".webp") || cleanPath.endsWith(".png") || cleanPath.endsWith(".jpg");

    return new Response(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": isImage ? "image/webp" : "application/pdf",
        "Content-Disposition": `inline; filename="${path.basename(cleanPath)}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}