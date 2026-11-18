import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const privateDocumentsDirectory = path.join(process.cwd(), "protected-docs");

function getExpectedToken(secret: string): string {
  return crypto.createHash("sha256").update(`auth-token-${secret}`).digest("hex");
}

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.PRIVATE_ACCESS_KEY;
  const cookieToken = req.cookies.get("private_session")?.value;

  if (!secret || !cookieToken) return false;

  const expectedToken = getExpectedToken(secret);
  const cookieBuffer = Buffer.from(cookieToken);
  const expectedBuffer = Buffer.from(expectedToken);
  return (
    cookieBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(cookieBuffer, expectedBuffer)
  );
}

async function findFile(directory: string, fileName: string): Promise<string | null> {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      const match = await findFile(fullPath, fileName);
      if (match) return match;
    } else if (entry.isFile() && entry.name === fileName) {
      return fullPath;
    }
  }

  return null;
}

async function addDirectoryToZip(
  zip: JSZip,
  directory: string,
  relativeDirectory = "",
): Promise<void> {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const fullPath = path.join(directory, entry.name);
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) {
      await addDirectoryToZip(zip, fullPath, relativePath);
    } else if (entry.isFile()) {
      zip.file(
        path.posix.join("Momin Files", relativePath.split(path.sep).join("/")),
        await fs.readFile(/*turbopackIgnore: true*/ fullPath),
      );
    }
  }
}

function getContentType(fileName: string): string {
  switch (path.extname(fileName).toLowerCase()) {
    case ".pdf":
      return "application/pdf";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

function getContentDisposition(fileName: string, disposition: "inline" | "attachment"): string {
  const fallbackName = fileName.replace(/[^\x20-\x7E]|["\\]/g, "_");
  return `${disposition}; filename="${fallbackName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { authenticated: false, error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const { searchParams } = req.nextUrl;
  const fileParam = searchParams.get("file");
  const isZip = searchParams.get("zip") === "1";
  const isDownload = searchParams.get("download") === "1";

  if (isZip) {
    if (fileParam !== null || isDownload) {
      return NextResponse.json({ error: "ZIP requests cannot include file parameters" }, { status: 400 });
    }

    try {
      const zip = new JSZip();
      await addDirectoryToZip(zip, privateDocumentsDirectory);
      const archive = await zip.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });

      return new Response(new Uint8Array(archive), {
        status: 200,
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": 'attachment; filename="Momin_Hassan_Complete_Profile.zip"',
          "Content-Length": archive.length.toString(),
          "Cache-Control": "private, no-store",
        },
      });
    } catch (error) {
      console.error("Failed to generate confidential documents ZIP:", error);
      return NextResponse.json({ error: "Failed to create archive" }, { status: 500 });
    }
  }

  if (fileParam === null) {
    if (isDownload) {
      return NextResponse.json({ error: "A file name is required" }, { status: 400 });
    }

    return NextResponse.json(
      { authenticated: true },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (
    !fileParam ||
    fileParam === "." ||
    fileParam === ".." ||
    fileParam.includes("/") ||
    fileParam.includes("\\") ||
    fileParam.includes("\0")
  ) {
    return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
  }

  try {
    const filePath = await findFile(privateDocumentsDirectory, fileParam);
    if (!filePath) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(/*turbopackIgnore: true*/ filePath);
    return new Response(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": getContentType(fileParam),
        "Content-Disposition": getContentDisposition(
          fileParam,
          isDownload ? "attachment" : "inline",
        ),
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return NextResponse.json({ error: "Protected documents are unavailable" }, { status: 404 });
    }

    console.error("Failed to read confidential document:", error);
    return NextResponse.json({ error: "Failed to read document" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const expectedKey = process.env.PRIVATE_ACCESS_KEY;
  if (!expectedKey) {
    return NextResponse.json({ error: "Server authentication error" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const passkey =
    body && typeof body === "object" && "passkey" in body
      ? body.passkey
      : body && typeof body === "object" && "password" in body
        ? body.password
        : undefined;

  if (!passkey || String(passkey).trim() !== expectedKey.trim()) {
    return NextResponse.json({ error: "Incorrect passkey." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set("private_session", getExpectedToken(expectedKey), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
