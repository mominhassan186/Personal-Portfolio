import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const runtime = "nodejs";

export async function GET() {
  const protectedDir = path.join(process.cwd(), "protected-docs");

  try {
    await fs.access(protectedDir);
  } catch {
    return NextResponse.json({ error: "Protected directory not found" }, { status: 404 });
  }

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "profile-bundle-"));
  const wrapperDir = path.join(tempDir, "Momin Files");
  const archivePath = path.join(tempDir, "Momin_Hassan_Profile.zip");

  try {
    // 1. Copy the protected docs into a wrapper folder named "Momin Files"
    await fs.cp(protectedDir, wrapperDir, { recursive: true });

    // 2. Compress the "Momin Files" folder so unzipping unpacks the folder directly
    await execFileAsync("zip", ["-r", "-q", archivePath, "Momin Files"], {
      cwd: tempDir,
    });

    const archive = await fs.readFile(archivePath);

    return new Response(archive, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="Momin_Hassan_Profile.zip"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate ZIP archive" }, { status: 500 });
  } finally {
    // 3. Clean up temporary files
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}