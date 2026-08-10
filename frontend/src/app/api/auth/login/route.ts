import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminByEmail } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ detail: "Email and password are required" }, { status: 400 });
    }

    const admin = await getAdminByEmail(email);
    if (!admin) {
      return NextResponse.json({ detail: "Incorrect email or password" }, { status: 401 });
    }

    const passwordMatch = bcrypt.compareSync(password, admin.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ detail: "Incorrect email or password" }, { status: 401 });
    }

    const token = signToken(admin.id, admin.email);

    const response = NextResponse.json({
      access_token: token,
      token_type: "bearer",
    });

    // Set HTTP-only cookie for server-side auth
    response.cookies.set("pellipatrika_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Internal server error" }, { status: 500 });
  }
}
