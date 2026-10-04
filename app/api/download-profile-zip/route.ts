import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import JSZip from "jszip";

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

function addDirectoryToZip(zip: JSZip, folderPath: string) {
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subFolder = zip.folder(item);
      if (subFolder) {
        addDirectoryToZip(subFolder, fullPath);
      }
    } else {
      const fileData = fs.readFileSync(fullPath);
      zip.file(item, fileData);
    }
  }
}

export async function GET() {
  const protectedDir = getProtectedDir();

  if (!protectedDir) {
    console.error("Protected documents directory not found. Searched from:", process.cwd());
    return NextResponse.json(
      { error: "Protected documents directory not found on server" },
      { status: 404 }
    );
  }

  try {
    const zip = new JSZip();
    const rootFolder = zip.folder("Momin Files");

    if (rootFolder) {
      addDirectoryToZip(rootFolder, protectedDir);
    }

    const zipBuffer = await zip.generateAsync({
      type: "uint8array",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    return new Response(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="Momin_Hassan_Profile.zip"',
        "Content-Length": zipBuffer.byteLength.toString(),
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