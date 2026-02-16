import { NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { name, exercises } = await req.json();

    const workoutName = typeof name === "string" ? name.trim() : "";
    const exerciseList = Array.isArray(exercises) ? exercises : [];

    if (!workoutName || !exerciseList.length) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${!workoutName ? "name" : ""} ${!exerciseList.length ? "exercises" : ""}`,
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: workoutTemplate, error: templateError } = await supabase
      .from("workout_templates")
      .insert([{ name: workoutName, user_id: user.id }])
      .select()
      .single();

    if (templateError) {
      console.error("Error inserting workout template:", templateError);
      return NextResponse.json({ error: templateError.message }, { status: 500 });
    }

    const workoutTemplateExercises = exerciseList.map((exercise, index) => ({
      user_id: user.id,
      template_id: workoutTemplate.id,
      exercise_id: exercise.id,
      position: index + 1,
    }));

    const { error: linkError } = await supabase
      .from("workout_template_exercises")
      .insert(workoutTemplateExercises);

    if (linkError) {
      console.error("Error inserting workout template exercises:", linkError);
      return NextResponse.json({ error: linkError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, workoutTemplate });
  } catch (err) {
    console.error("Error in POST /api/workouts/add:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}