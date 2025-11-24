import BackButton from "@/components/back-button";
import ExerciseCard from "@/components/exercise-card";
import LogExerciseForm from "@/components/log-exercise-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { set } from "zod";
export default async function Page({
    searchParams,
    }: {
    searchParams?: Promise<{ id?: string | string[]; name?: string | string[]; sets?: string | string[]; reps?: string | string[] }> | { id?: string | string[]; name?: string | string[]; sets?: string | string[]; reps?: string | string[] };
    }) {
    const params = await searchParams;
    const first = (v?: string | string[]) => Array.isArray(v) ? v[0] : (v ?? "");
    const id = first(params?.id);
    const name = first(params?.name);
    const reps = first(params?.reps);
    const sets = first(params?.sets);

    const setsFormCount = Math.max(0, Math.min(Number(sets), 10))
    return (
        <div className="min-h-screen bg-zinc-50 font-sans">
            <main className="mx-auto w-full max-w-3xl py-12 px-4 sm:px-10">
                <div className="items-start text-start">

                    <h1 className="max-w-md text-3xl font-semibold tracking-tight text-black">
                        Log Exercise
                    </h1>

                    <div className="mt-4">
                        <ExerciseCard id={id ?? ""} name={name ?? ""} reps={reps ?? ""} sets={sets ?? ""} type="none"/>
                    </div>

                    <LogExerciseForm id={id ?? ""} sets={setsFormCount} />
                </div>
            </main>
        </div>
    )
}