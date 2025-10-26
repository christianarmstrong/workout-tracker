"use client";
import ExerciseCard from "@/components/exercise-card";
import { Button } from "@/components/ui/button";
import WorkoutCard from "@/components/workout-card";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    
    return (
        // Main page
        <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50">
            <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between py-20 px-10 bg-zinc-50 items-start">
                <div className="grid grid-cols-9 gap-3 items-start text-start">
                    <h1 className="max-w-md mb-3 col-span-3 text-3xl font-semibold leading-10 tracking-tight text-black">
                        Workouts
                    </h1>
                    
                    <WorkoutCard name="Push 1" />
                    <WorkoutCard name="Pull 1" />
                    <WorkoutCard name="Legs 1" />
                    <WorkoutCard name="Push 2" />
                    <WorkoutCard name="Pull 2" />
                    <WorkoutCard name="Legs 2" />

                    <div className="col-span-8 mt-6">
                        <Button onClick={() => router.push('/workouts/create')} > Create a workout </Button>
                    </div>

                    <h1 className="max-w-md mb-3 col-span-3 mt-10 text-3xl font-semibold leading-10 tracking-tight text-black">
                        Exercises
                    </h1>
                    
                    <ExerciseCard name="Flat Dumbell Bench Press" sets="3" reps="6-8" type="none" />
                    <ExerciseCard name="Incline Dumbell Bench Press" sets="3" reps="8-10" type="none" />
                    <ExerciseCard name="Machine Shoulder Press" sets="3" reps="8-10" type="none" />
                    <ExerciseCard name="Cable Chest Fly" sets="3" reps="8-10" type="none" />
                    <ExerciseCard name="Cable Lateral Shoulder Raise" sets="3" reps="8-10" type="none" />
                    <ExerciseCard name="Tricep Pulldown" sets="3" reps="8-10" type="none" />

                    <div className="col-span-8 mt-6">
                        <Button onClick={() => router.push('/exercises/create')} > Create an exercise </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}