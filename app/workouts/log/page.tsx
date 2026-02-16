import BackButton from "@/components/back-button";
import ExerciseCard from "@/components/exercise-card";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function Page({
    searchParams,
}: {
    searchParams?: Promise<{ id?: string | string[] }> | { id?: string | string[] };
}) {
    const params = await searchParams;
    const first = (v?: string | string[]) => Array.isArray(v) ? v[0] : (v ?? "");
    const workoutTemplateId = first(params?.id);
    
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
        redirect("/");
    }

    const { data: workoutName } = await supabase
        .from("workout_templates")
        .select("name")
        .eq("id", workoutTemplateId)
        .single();

    const { data: exercises } = await supabase
        .from("workout_template_exercises")
        .select("id, template_id, exercise_id, position, exercises!inner (name, sets, reps)")
        .eq("template_id", workoutTemplateId)
        .order("position", { ascending: true });

    console.log("exercises", exercises);

    return (
         <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50">
            <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between py-20 px-10 bg-zinc-50 items-start">
                <div className="grid grid-cols-9 gap-3 items-stretch text-start">
                    <h1 className="max-w-md col-span-9 text-3xl font-semibold leading-10 tracking-tight text-black">
                        {workoutName?.name ?? "Workout"}
                    </h1>
                    <p className="max-w-md col-span-6 text-sm font-normal text-black" > Select an exercise to log </p>

                    {exercises?.map((exercise) => {
                    const exerciseDetails = Array.isArray(exercise.exercises)
                        ? exercise.exercises[0]
                        : exercise.exercises;

                    return (
                    <ExerciseCard
                        key={exercise.id}
                        id={exercise.exercise_id}
                        name={exerciseDetails?.name ?? ""}
                        sets={exerciseDetails?.sets ?? ""}
                        reps={exerciseDetails?.reps ?? ""}
                        type="none"
                    />
                    );
                    })}

                    <div className="col-span-8 mt-6">
                        <BackButton> Back to workouts </BackButton>
                    </div>
                </div>
            </main>
        </div>
    )
}