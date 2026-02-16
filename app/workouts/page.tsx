import ExerciseCard from "@/components/exercise-card";
import { Button } from "@/components/ui/button";
import WorkoutCard from "@/components/workout-card";
import { createClient } from "@/lib/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
        redirect("/");
    }

    const userId = userData.user.id;
    const { data: workouts } = await supabase
        .from("workout_templates")
        .select("*")
        .eq("user_id", userId);

    const { data: exercises } = await supabase
        .from("exercises")
        .select("*")
        .eq("created_by", userId);

    return (
        // Main page
        <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50">
            <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between py-20 px-10 bg-zinc-50 items-start">
                <div className="grid grid-cols-9 gap-3 items-start text-start">
                    <h1 className="max-w-md mb-3 col-span-3 text-3xl font-semibold leading-10 tracking-tight text-black">
                        Workouts
                    </h1>
                    {workouts?.map((workout: { id: string; name: string }) => (
                    <WorkoutCard key={workout.id} name={workout.name} id={workout.id} />
                    ))}

                    <div className="col-span-8 mt-6">
                        <Button><Link href="/workouts/create"> Create a workout </Link></Button>
                    </div>

                    <h1 className="max-w-md mb-3 col-span-3 mt-10 text-3xl font-semibold leading-10 tracking-tight text-black">
                        Exercises
                    </h1>
                    
                    {exercises?.map((exercise: { id: string; name: string; sets: string; reps: string }) => (
                    <ExerciseCard key={exercise.id} id={exercise.id} name={exercise.name} sets={exercise.sets} reps={exercise.reps} type="none" />
                    ))}

                    <div className="col-span-8 mt-6">
                        <Button><Link href="/exercises/create"> Create an exercise </Link></Button>
                    </div>
                </div>
            </main>
        </div>
    )
}