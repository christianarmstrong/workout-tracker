"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50">
            <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between py-20 px-10 bg-zinc-50 items-start">
                <div className="grid grid-cols-8 gap-1 items-start text-start">
                    <h1 className="max-w-md col-span-6 text-3xl font-semibold leading-10 tracking-tight text-black">
                        Create Exercise
                    </h1>
                    <p className="max-w-md col-span-6 text-sm font-normal text-black" > Add a name, reps, and sets </p>
                    <h2 className="max-w-md col-span-8 text-xl font-semibold leading-10 tracking-tight text-black"> Name </h2>
                    <Input className="col-span-8" type="exercise name" placeholder="workout name (e.g push 1)" />
                    <h2 className="max-w-md col-span-8 text-xl font-semibold leading-10 tracking-tight text-black"> Reps </h2>
                    <Input className="col-span-8" type="reps" placeholder="reps)" />
                    <h2 className="max-w-md col-span-8 text-xl font-semibold leading-10 tracking-tight text-black"> Sets </h2>
                    <Input className="col-span-8" type="sets" placeholder="sets" />
                    <div className="col-span-8 mt-6">
                        <Button onClick={() => router.back()} > Save exercise </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}