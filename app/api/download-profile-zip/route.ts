import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import * as archiverModule from "archiver";

// Resolve CommonJS / ESM export structure cleanly
const archiver = ((archiverModule as any).default || archiverModule) as any;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const protectedDir = path.join(process.cwd(), "protected-docs");

  if (!fs.existsSync(protectedDir)) {
    return NextResponse.json({ error: "Protected directory not found" }, { status: 404 });
  }

  try {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const chunks: Buffer[] = [];

    archive.on("data", (chunk: Buffer) => chunks.push(chunk));

    const archivePromise = new Promise<Buffer>((resolve, reject) => {
      archive.on("end", () => resolve(Buffer.concat(chunks)));
      archive.on("error", (err: unknown) => reject(err));
    });

    // Bundles into a root "Momin Files" folder with all your subdirectories
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
  } catch (error) {
    console.error("ZIP Generation Error:", error);
    return NextResponse.json({ error: "Failed to create archive" }, { status: 500 });
  }
}