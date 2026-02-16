import { NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("email:", email);
    console.log("password:", password);
    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Login error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
    }

    console.log("Login successful for user:", data.user);
    return NextResponse.json(
      {
        ok: true,
        user: data.user,
        session: data.session,
        weakPassword: data.weakPassword ?? null,
      },
      { status: 200 }
    );

  } catch (e) {
    console.error("Server error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}