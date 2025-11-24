import ExerciseCard from "@/components/exercise-card";
import ModifyWorkout from "@/components/modify-workout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/utils/supabase/client";
import React from "react";
import CreateWorkoutClient from "./create-workout-client";

export default async function Page() {
    const supabase = await createClient();
    const userId = "9bf614f0-a576-4f0d-94f4-fb9dd72fe8aa";
    const { data: exercises} = await supabase.from("exercises").select("*").eq("created_by", userId);
    console.log(exercises)

    return (
        <CreateWorkoutClient initialExercises={exercises ?? []} />
    )
}