import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from '@/lib/utils/supabase/server';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import UserSelect from "@/components/user-select";

export default async function Home() {
  const supabase = await createClient();
  const { data: users } = await supabase.from("users").select();
  console.log(users)
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

          <UserSelect users={users || []} />
        </div>
      </main>
    </div>


  );
}
