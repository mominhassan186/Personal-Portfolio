import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { ZipArchive } from "archiver";
import { PassThrough, Readable } from "node:stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(req: NextRequest): boolean {
  const cookie = req.cookies.get("private_access")?.value;
  if (cookie === "granted") return true;

  const keyParam = req.nextUrl.searchParams.get("key");
  const expectedKey = process.env.PRIVATE_ACCESS_KEY;
  if (expectedKey && keyParam === expectedKey) return true;

  // Fallback: If no key configured in environment, allow
  if (!expectedKey) return true;

  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Access Denied: Please unlock private documents first." },
      { status: 401 }
    );
  }

  const protectedDir = path.join(process.cwd(), "public", "protected-docs");

  if (!fs.existsSync(protectedDir)) {
    console.error("Protected documents directory not found at:", protectedDir);
    return NextResponse.json(
      { error: "Protected documents directory not found on server" },
      { status: 404 }
    );
  }

  try {
    const archive = new ZipArchive({ zlib: { level: 6 } });
    const passThrough = new PassThrough();
    archive.pipe(passThrough);

    archive.directory(protectedDir, "Momin Hassan Confidential Documents", (entry) => {
      // Exclude hidden files and OS metadata like .DS_Store
      const basename = path.basename(entry.name);
      if (basename.startsWith(".") || entry.name.includes(".DS_Store")) {
        return false;
      }
      return entry;
    });

    archive.on("error", (err) => {
      console.error("Archive error:", err);
      passThrough.destroy(err);
    });

    // Finalize the archive stream
    archive.finalize().catch((err) => {
      console.error("Archive finalize error:", err);
    });

    const webStream = Readable.toWeb(passThrough);

    return new Response(webStream as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="Momin_Hassan_Complete_Profile.zip"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    console.error("ZIP Generation Error:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to create archive", details: String(error) },
      { status: 500 }
    );
  }
}