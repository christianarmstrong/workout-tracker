"use client";
import ExerciseCard from "@/components/exercise-card";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const router = useRouter();
    return (
         <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50">
            <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between py-20 px-10 bg-zinc-50 items-start">
                <div className="grid grid-cols-9 gap-3 items-stretch text-start">
                    <h1 className="max-w-md col-span-9 text-3xl font-semibold leading-10 tracking-tight text-black">
                        {name}
                    </h1>
                    <p className="max-w-md col-span-6 text-sm font-normal text-black" > Select an exercise to log </p>
                    <ExerciseCard name="Flat Dumbell Bench Press" sets="3" reps="6-8" type="none" />
                    <ExerciseCard name="Incline Dumbell Bench Press" sets="3" reps="8-10" type="none" />
                    <ExerciseCard name="Machine Shoulder Press" sets="3" reps="8-10" type="none" />
                    <ExerciseCard name="Cable Chest Fly" sets="3" reps="8-10" type="none" />
                    <ExerciseCard name="Cable Lateral Shoulder Raise" sets="3" reps="8-10" type="none" />
                    <ExerciseCard name="Tricep Pulldown" sets="3" reps="8-10" type="none" />

                    <div className="col-span-8 mt-6">
                        <Button onClick={() => router.back()} > Back to workouts </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}