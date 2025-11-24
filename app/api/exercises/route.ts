import { NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { name, reps, sets } = await req.json();

    if (!name || !reps || !sets) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("exercises")
      .insert([{ name, reps, sets }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, exercise: data });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}