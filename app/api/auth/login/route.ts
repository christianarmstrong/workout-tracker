import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (typeof username !== "string" || typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const envKey = `${username.toUpperCase()}_PASSWORD`;
    const expected = process.env[envKey];

    if (!expected) {
      return NextResponse.json({ ok: false, error: "Unknown user" }, { status: 404 });
    }

    if (password === expected) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}