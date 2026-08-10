import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { getAdminById } from "./db";

const JWT_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || "pellipatrika-secret-key-change-in-production-2026-wedding";

export interface TokenPayload {
  sub: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export function signToken(adminId: string, email?: string): string {
  return jwt.sign({ sub: adminId, email }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getAuthAdmin(req: NextRequest) {
  let token: string | null = null;

  // Check Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  }

  // Fallback to cookie
  if (!token) {
    const cookie = req.cookies.get("pellipatrika_token");
    if (cookie) {
      token = cookie.value;
    }
  }

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload || !payload.sub) {
    return null;
  }

  const admin = await getAdminById(payload.sub);
  if (admin) return admin;

  return {
    id: payload.sub,
    email: payload.email || "admin@pellipatrika.com",
  };
}
