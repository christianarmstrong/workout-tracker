"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
  const router = useRouter();
  return (
    // Login Page
    <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-zinc-50 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            Workout Tracker
          </h1>

          <p className="max-w-md text-lg leading-8 text-black">
            Track your workouts, including exercises, sets, and reps.
          </p>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="christian">Christian</SelectItem>
              <SelectItem value="cheyenna">Cheyenna</SelectItem>
              <SelectItem value="devan">Devan</SelectItem>
            </SelectContent>
          </Select>

           <Button onClick={() => router.push('/workouts')}>Log in</Button>
        </div>
      </main>
    </div>


  );
}
