import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

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

function findFileInDirectory(dir: string, requestedFile: string): string | null {
  if (!requestedFile) return null;

  // Clean and sanitize requested file name
  const rawCleanName = path.basename(requestedFile);
  const cleanName = path.basename(requestedFile.replace(/[\\/:]/g, "-"));
  const normalizedRequested = cleanName.toLowerCase().replace(/[:/\\_\s-]/g, "");

  const search = (currentDir: string): string | null => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return null;
    }

    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        const found = search(fullPath);
        if (found) return found;
      } else if (entry.isFile()) {
        // Direct exact match
        if (entry.name === rawCleanName || entry.name === cleanName) {
          return fullPath;
        }

        // Case-insensitive exact match
        if (
          entry.name.toLowerCase() === rawCleanName.toLowerCase() ||
          entry.name.toLowerCase() === cleanName.toLowerCase()
        ) {
          return fullPath;
        }

        // Match base name without extension
        const entryBase = path.parse(entry.name).name.toLowerCase();
        const reqBase = path.parse(cleanName).name.toLowerCase();
        if (entryBase === reqBase) {
          return fullPath;
        }

        // Match normalized alphanumeric string
        const normalizedEntry = entry.name.toLowerCase().replace(/[:/\\_\s-]/g, "");
        if (normalizedEntry === normalizedRequested) {
          return fullPath;
        }
      }
    }
    return null;
  };

  return search(dir);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Access Denied: Please unlock private documents first." },
      { status: 401 }
    );
  }

  const fileName = req.nextUrl.searchParams.get("file");
  const isDownload =
    req.nextUrl.searchParams.get("download") === "1" ||
    req.nextUrl.searchParams.get("download") === "true";

  if (!fileName) {
    return NextResponse.json({ error: "File name is required" }, { status: 400 });
  }

  const protectedDir = path.join(process.cwd(), "public", "protected-docs");
  if (!fs.existsSync(protectedDir)) {
    return NextResponse.json(
      { error: "Protected directory not found on server" },
      { status: 404 }
    );
  }

  const filePath = findFileInDirectory(protectedDir, fileName);
  if (!filePath || !fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
    return NextResponse.json(
      { error: `Document "${fileName}" is currently unavailable on server.` },
      { status: 404 }
    );
  }

  const fileBuffer = fs.readFileSync(/*turbopackIgnore: true*/ filePath);
  const realFileName = path.basename(filePath);
  const ext = path.extname(realFileName).toLowerCase();

  let contentType = "application/octet-stream";
  if (ext === ".pdf") {
    contentType = "application/pdf";
  } else if (ext === ".jpg" || ext === ".jpeg") {
    contentType = "image/jpeg";
  } else if (ext === ".png") {
    contentType = "image/png";
  } else if (ext === ".webp") {
    contentType = "image/webp";
  }

  const dispositionType = isDownload ? "attachment" : "inline";

  return new Response(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `${dispositionType}; filename="${encodeURIComponent(realFileName)}"`,
      "Content-Length": fileBuffer.length.toString(),
      "Cache-Control": "private, max-age=3600",
    },
  });
}
