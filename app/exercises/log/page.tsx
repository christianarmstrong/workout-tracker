"use client";
import ExerciseCard from "@/components/exercise-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const sets = searchParams.get("sets");
    const reps = searchParams.get("reps");
    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50">
            <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between py-20 px-10 bg-zinc-50 items-start">
                <div className="grid grid-cols-8 gap-3 items-start text-start">
                    <h1 className="max-w-md col-span-6 text-3xl font-semibold tracking-tight text-black">
                        Log Exercise
                    </h1>
                    <ExerciseCard name={name ?? ""} reps={reps ?? ""} sets={sets ?? ""} type="none"/>

                    <h1 className="max-w-md col-span-6 text-lg font-semibold leading-10 tracking-tight text-black">
                        Set 1
                    </h1>
                    <Input className="col-span-9" placeholder="enter reps"/>
                    <Input className="col-span-9" placeholder="enter weight"/>

                    <h1 className="max-w-md col-span-6 text-lg font-semibold leading-10 tracking-tight text-black">
                        Set 2
                    </h1>
                    <Input className="col-span-9" placeholder="enter reps"/>
                    <Input className="col-span-9" placeholder="enter weight"/>

                    <h1 className="max-w-md col-span-6 text-lg font-semibold leading-10 tracking-tight text-black">
                        Set 3
                    </h1>
                    <Input className="col-span-9" placeholder="enter reps"/>
                    <Input className="col-span-9" placeholder="enter weight"/>

                    <div className="col-span-8 mt-3">
                        <Button onClick={() => router.back()} > Log </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}