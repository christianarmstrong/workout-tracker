"use client";
import ExerciseCard from "@/components/exercise-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type ModifyWorkoutProps = {
    type: "edit" | "create" | string,
    availableExercises: Array<any>,
    exercisesInWorkout: Array<any>,
    setExercisesInWorkout: React.Dispatch<React.SetStateAction<Array<any>>>
}

export default function ModifyWorkout({ type, availableExercises, exercisesInWorkout, setExercisesInWorkout }: ModifyWorkoutProps) {
    const router = useRouter();
    const mode = type ?? "create";
    const title = mode === "edit" ? "Edit workout" : "Create workout";
    const description = mode === "edit" ? "Change name and exercises" : "Choose a name and exercises";
    const [workoutName, setWorkoutName] = React.useState("");

    const saveWorkout = async () => {
        // save workout to supabase
        try {
            const res = await fetch("/api/workouts/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: workoutName, exercises: exercisesInWorkout }),
        });

        const body = await res.json();

        if (body.ok) {
            router.push("/workouts");
        } else {
            toast(body.error ?? "Failed to save workout");;
        }
        
        console.log("Saving workout with exercises:", exercisesInWorkout);
        } catch (err) {
            toast("Network error while saving workout");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50">
            <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between py-20 px-10 bg-zinc-50 items-start">
                <div className="grid grid-cols-9 gap-1 items-start text-start">
                    <h1 className="max-w-md col-span-6 text-3xl font-semibold tracking-tight text-black">
                        {title}
                    </h1>
                    <p className="max-w-md col-span-6 text-sm font-normal text-black" > {description} </p>
                    <h2 className="max-w-md col-span-8 text-xl font-semibold leading-10 tracking-tight text-black"> Name </h2>
                    <Input className="col-span-8" type="text" placeholder="workout name (e.g push 1)" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
                    <h2 className="max-w-md col-span-6 text-xl font-semibold leading-10 tracking-tight text-black" >
                        Exercises in Workout
                    </h2>
                    
                    {exercisesInWorkout && exercisesInWorkout?.map((exercise, index) => (
                        <ExerciseCard key={index} id={exercise.id} name={exercise.name} sets={exercise.sets} reps={exercise.reps} type="remove" exercisesInWorkout={exercisesInWorkout} setExercisesInWorkout={setExercisesInWorkout} />
                    ))}

                    <div className="col-span-8 mt-3">
                        <Button onClick={() => saveWorkout()} > Save workout </Button>
                    </div>

                    <h2 className="max-w-md col-span-6 mt-6 text-xl font-semibold leading-10 tracking-tight text-black" >
                        Available Exercises
                    </h2>

                    {availableExercises && availableExercises?.map((exercise, index) => (
                        <ExerciseCard key={index} id={exercise.id} name={exercise.name} sets={exercise.sets} reps={exercise.reps}  type="add" exercisesInWorkout={exercisesInWorkout} setExercisesInWorkout={setExercisesInWorkout} />
                    ))}

                    <div className="col-span-8 mt-3">
                        <Button onClick={() => router.push('/exercises/create')} > Create an exercise </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}