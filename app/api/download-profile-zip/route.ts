import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const archiver = require("archiver");

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getProtectedDir(): string | null {
  const possiblePaths = [
    path.join(process.cwd(), "public", "protected-docs"),
    path.join(process.cwd(), "protected-docs"),
    path.join(__dirname, "..", "..", "..", "public", "protected-docs"),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return null;
}

export async function GET() {
  const protectedDir = getProtectedDir();

  if (!protectedDir) {
    console.error("Protected documents folder not found. Searched from:", process.cwd());
    return NextResponse.json(
      { error: "Protected documents directory not found on server" },
      { status: 404 }
    );
  }

  try {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const chunks: Buffer[] = [];

    archive.on("data", (chunk: Buffer) => chunks.push(chunk));

    const archivePromise = new Promise<Buffer>((resolve, reject) => {
      archive.on("end", () => resolve(Buffer.concat(chunks)));
      archive.on("error", (err: unknown) => reject(err));
    });

    archive.directory(protectedDir, "Momin Files");
    await archive.finalize();

    const zipBuffer = await archivePromise;
    const uint8Array = new Uint8Array(zipBuffer);

    return new Response(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="Momin_Hassan_Profile.zip"',
        "Content-Length": uint8Array.byteLength.toString(),
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