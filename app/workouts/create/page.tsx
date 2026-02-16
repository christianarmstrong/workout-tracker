import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import CreateWorkoutClient from "./create-workout-client";

export default async function Page() {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      redirect("/");
    }
    const { data: exercises} = await supabase.from("exercises").select("*").eq("created_by", user?.id);
    console.log("Fetched exercises for user:", user);
    console.log(exercises)

    return (
        <CreateWorkoutClient initialExercises={exercises ?? []} />
    )
}