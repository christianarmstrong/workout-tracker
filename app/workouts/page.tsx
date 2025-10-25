"use client";
import { Button } from "@/components/ui/button";
import WorkoutCard from "@/components/workout-card";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    
    return (
        // Main page
        <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50">
            <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between py-20 px-10 bg-zinc-50 items-start">
                <div className="grid grid-cols-8 gap-3 items-start text-start">
                    <h1 className="max-w-md mb-3 col-span-3 text-3xl font-semibold leading-10 tracking-tight text-black">
                        Workouts
                    </h1>
                    
                    {WorkoutCard("Push 1")}
                    {WorkoutCard("Pull 1")}
                    {WorkoutCard("Legs 1")}
                    {WorkoutCard("Push 2")}
                    {WorkoutCard("Pull 2")}
                    {WorkoutCard("Legs 2")}

                    <div className="col-span-8 mt-6">
                        <Button onClick={() => router.push('/workouts/create')} > Create a workout </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}